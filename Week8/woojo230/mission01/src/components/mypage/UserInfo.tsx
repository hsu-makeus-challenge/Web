interface UserInfoProps {
  isEdit: boolean;
  name: string;
  bio: string;
  email: string;
  tempname: string;
  tempbio: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfo = ({
  isEdit,
  name,
  bio,
  email,
  tempname,
  tempbio,
  onNameChange,
  onBioChange,
}: UserInfoProps) => {
  return (
    <div className="flex flex-col justify-center flex-1">
      {isEdit ? (
        <>
          <input
            type="text"
            value={tempname}
            onChange={onNameChange}
            className="flex items-center gap-2 border border-white rounded-lg px-2 py-2 text-xl font-bold mb-2 bg-transparent text-white"
          />
          <input
            type="text"
            value={tempbio}
            onChange={onBioChange}
            className="border border-white rounded-lg px-4 py-1 text-sm mb-3 bg-transparent text-white"
          />
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 border border-white rounded-lg px-4 py-2 text-xl font-bold mb-2 bg-transparent text-white">
            {name}
          </div>
          <div className="border border-white rounded-lg px-4 py-1 text-sm mb-3 bg-transparent text-white">
            {bio || '자기소개가 없습니다.'}
          </div>
        </>
      )}
      <div className="text-base text-white">{email}</div>
    </div>
  );
};

export default UserInfo;
