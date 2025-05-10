import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/users';

interface UserInfo {
    id: number;
    email: string;
    name: string;
    bio?: string;
    avatar?: string;
}

const Mypage = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getMyInfo();
                setUserInfo(data);
                console.log("사용자 정보 마이페이지에 가져오기",data);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>마이 페이지</h3>
            {/* <p>이메일: {userInfo.email}</p>
            <p>이름: {userInfo.name}</p>
            {userInfo.bio && <p>소개: {userInfo.bio}</p>}
            {userInfo.avatar && <img src={userInfo.avatar} alt="프로필 이미지" />} */}
        </div>
    );
};

export default Mypage;