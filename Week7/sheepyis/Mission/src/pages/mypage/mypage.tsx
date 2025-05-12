import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";
import Profile from "../../components/mypage/profile";

const Mypage = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await AuthAPI.get("/users/me");
      return res.data;
    },
  });

  const user = data?.data;

  return (
    <div className="w-full h-full flex flex-col items-center">
      {user && (
        <Profile
          email={user.email}
          name={user.name}
          bio={user.bio}
          avatar={user.avatar}
        />
      )}
    </div>
  );
};

export default Mypage;
