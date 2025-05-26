import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuth();
  
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 성공");
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

export default useLogout;
