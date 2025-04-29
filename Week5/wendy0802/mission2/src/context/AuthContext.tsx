import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage'; 
import { AuthProvider } from './context/AuthContext';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;

}

export const AuthContext :  React.Context<AuthContextType> = createContext<AuthCOntextType>({
    accessToken:null,
    refreshToken:null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({chidren}: PropsWithChildren) => {
    const navigate : NavigateFunction = useNavigate();
    const {
        getitem: getAccessTokenFromStorage,
        setitem: setAccessTokenInStorage,
        removeitem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

const { 
    getItem: getRefreshTokenFromStorage, 
    setItem: setRefreshTokenInStorage, 
    removeItem: removeRefreshTokenStorage 
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  


const [accessToken, setAccessToken] = useState<string | null>(getAccessTOkenFromStorage());
const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

    const login = async (signinData: RequestSigninDto) => {
       try{ const {} = await postSignin(signinData);

        if(data) {
            const newAccessToken : string = data.accessToken;
            const newRefrexhToken : string = data.refeshToken;

            setAccessTokenInStorage(newwAccessToken);
            setRefreshTokenInStrage(newRefreshToken);

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
        }
    }catch (error) {
        console.log("로그인 오류", error);
        alert("로그인 실패");
    }
}
 const logout = async() => {
    try{
        await postLogout();
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStrage();

        setAccessToken(null);
        setRefreshToken(null);

        alert("로그아웃 성공");
        navigate("/my");
    } catch (error){
        console.error("로그아웃 오류", error);
        alert("로그아웃 실패");
    }
 };

 return (
    <AuthContext.Provider value = {{accessToken, login,logout}}>
    {children}
    </AuthContext.Provider>
 );
};

export const useAuth = () => {
    const context : AuthContextType = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다");
    }

    return context;
}