import { useAuthFetch } from "../../hooks/useAuthFetch";
import Profile from "../../components/mypage/profile";

const Mypage = () => {
    const { data } = useAuthFetch("/users/me");
    console.log(data);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <Profile email={data?.data?.email} name={data?.data?.name} />
        </div>
    )
}

export default Mypage;