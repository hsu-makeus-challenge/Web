import Google from "../../assets/google.png";

const GoogleButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BACKEND_URL}/auth/google/login`;
    };
      
    return (
        <button className="w-full h-[3vw] items-center outline-white outline-[0.1vw] rounded-[0.4vw]" onClick={handleGoogleLogin}>
            <div className="relative flex items-center justify-center h-[3vw]">
                    <img 
                        src={Google} 
                        className="absolute left-[1vw] w-[2vw] h-[2vw]"
                    />
                    <p className="text-[1.2vw] font-bold">구글 로그인</p>
                </div>
        </button>
    )
}

export default GoogleButton;