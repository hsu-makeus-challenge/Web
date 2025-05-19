import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEY } from "../constants/key"
import { useNavigate } from "react-router-dom"

const GoogleLoginRedirectPage = () =>{
    const [, setAccessToken] = useLocalStorage<string>(LOCAL_STORAGE_KEY.accessToken, "");
    const [, setRefreshToken] = useLocalStorage<string>(LOCAL_STORAGE_KEY.refreshToken, "");
    const [, setUserName] = useLocalStorage<string>(LOCAL_STORAGE_KEY.name, "");
    const [, setUserId] = useLocalStorage<string>(LOCAL_STORAGE_KEY.id, "");

    const navigate = useNavigate();

    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const name = urlParams.get('name');
        const id = urlParams.get('id');


        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken ?? "");
            setUserName(name ?? "");
            setUserId(id ?? "");
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