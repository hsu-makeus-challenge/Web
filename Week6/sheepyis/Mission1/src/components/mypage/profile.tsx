type ProfileProps = {
    email: number;
    name: string;
};
  
const Profile = ({ email, name }: ProfileProps) => {
    return (
      <div className="flex flex-col gap-[1vw] w-[100%] items-center">
        <p className="text-[1vw] font-bold">마이페이지</p>
  
        <div className="bg-blue-700 w-[80%] h-[15vw] rounded-[1vw] flex flex-col justify-center items-center gap-[0.5vw]">
          <p className="text-white text-[1.2vw]">닉네임: {name}</p>
          <p className="text-white text-[1.2vw]">이메일: {email}</p>
        </div>
      </div>
    );
  };
  
  export default Profile;
  