import GoogleIcon from '../../assets/google.png'

const Google = () =>{
    return(
        <button className="btn  relative justify-center items-center flex">
            <img src={GoogleIcon} alt="구글아이콘" className='w-5 absolute left-4' />
            <span className='font-semibold'>구글 로그인</span>
        </button>
    )
}

export default Google;