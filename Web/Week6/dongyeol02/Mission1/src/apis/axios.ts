import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 알려주는 플래그
}
//전역 변수로 refresh요청의 promise를 저장해서 중복 요청 방지
let refreshPromise: Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터 : 모든 요청전에 accessToken을 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//응답 인터셉터 : 401에러 발생 -> refresh토큰을 통한 토큰 갱신

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    //401+아직 재시도 안함
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh end point에서 401에러가 발생 한 경우 , 중복 재시도 방지를 위한 로그아웃 처리
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      //재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 리프레시 요청 진행중이면 그 promise를 재사용
      if (!refreshPromise) {
        //refresh 요청 실행 후 프라미스를 전역변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          //새 토큰 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      } // 진행중인 refreshPromise가 해결될때 까지 기다린다
      return refreshPromise.then((newAccessToken: string) => {
        //원본요청의 autorization 헤어 갱신된 토큰 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance.request(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
