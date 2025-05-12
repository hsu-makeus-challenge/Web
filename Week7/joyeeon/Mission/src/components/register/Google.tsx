import GoogleIcon from '../../assets/google.png'
import React from 'react';

const Google = () =>{
    const Googlehandler = () =>{
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google/login`;
    };

    return(
        <button 
        onClick={Googlehandler}
        className="cursor-pointer btn  relative justify-center items-center flex ">
            <img src={GoogleIcon} alt="구글아이콘" className='w-5 absolute left-4' />
            <span className='font-semibold'>구글 로그인</span>
        </button>
    )
}

export default Google;