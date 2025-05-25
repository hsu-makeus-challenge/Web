const UserNickName = () => {
  const nickname = localStorage.getItem("nickname");

  return (
    <span className="text-xs text-white mt-1">{nickname ?? "닉네임"}</span>
  );
};

export default UserNickName;
