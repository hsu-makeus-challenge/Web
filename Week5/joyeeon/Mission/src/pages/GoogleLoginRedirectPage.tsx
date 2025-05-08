import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEY } from "../constants/key"
import { useNavigate } from "react-router-dom"

const GoogleLoginRedirectPage = () =>{
    const [, setAccessToken] = useLocalStorage<string>(LOCAL_STORAGE_KEY.accessToken, "");
    const [, setRefreshToken] = useLocalStorage<string>(LOCAL_STORAGE_KEY.refreshToken, "");

    const navigate = useNavigate();

    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken ?? "");
            navigate('/');
        }

    }, [setAccessToken,setRefreshToken, navigate]);
    return(
        <>
        리다이렉트 페이지
        </>
    )
}

export default GoogleLoginRedirectPage