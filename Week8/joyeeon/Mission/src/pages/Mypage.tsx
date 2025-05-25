import { useEffect, useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import LpPlusModal from '../components/mypages/LpPlusModal';
import { useMypageStore } from '../stores/MypageStore';
import MydataComp from '../components/mypages/MydataComp';

const Mypage = () => {
    //const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    //const { mutate, data, isPending, isError, error } = useMyInfo();
    const { userInfo, fetchUserInfo } = useMypageStore();

    const openModal = () => {
        setModalOpen(true);     
    }
        const closeModal = () => {
        setModalOpen(false);
    }    

    useEffect(() => {
        fetchUserInfo(); // 페이지 로드 시 사용자 정보 요청
    }, [fetchUserInfo]);


    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <h3>마이 페이지</h3>
            <p>이메일: {userInfo.data.email}</p>
            <p>이름: {userInfo.data.name}</p>
            {<p>소개: {userInfo.data.bio}</p>}
            {userInfo.data.avatar && (
                <img src={userInfo.data.avatar} alt="프로필 이미지" />
            )} */}
            <MydataComp />

            <FaCirclePlus
                onClick={() => openModal()}
                className={
                    "absolute right-4 bottom-4 text-5xl text-yellow-500 hover:text-gray-700 cursor-pointer"
                }
                />

               <LpPlusModal
                isOpen={modalOpen}
                onRequestClose={closeModal} />
        </div>

        
    );
};

export default Mypage;