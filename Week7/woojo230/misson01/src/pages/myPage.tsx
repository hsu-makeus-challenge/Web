import useGetuserData from '../hooks/queries/user/useGetuserData';
import LoadingSpinner from '../components/loading';
import { useRef, useState } from 'react';
import useUpdateUserData from '../hooks/queries/user/useUpdateUserData';
import { handleThumbnailChange } from '../utils/lpModal/lpModalUtils';
import ProfileImage from '../components/mypage/ProfileImage';
import UserInfo from '../components/mypage/UserInfo';
import EditButton from '../components/mypage/EditButton';
import { validateUserInfo } from '../utils/user/userUtils';

const MyPage = () => {
  const { data: userData } = useGetuserData();
  const { mutate } = useUpdateUserData();

  const [isEdit, setIsEdit] = useState(false);
  const [tempname, setTempname] = useState(userData?.data.name || '');
  const [tempbio, setTempbio] = useState(userData?.data.bio || '');
  const [tempAvatar, setTempAvatar] = useState(userData?.data.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setTempname(userData?.data.name || '');
    setTempbio(userData?.data.bio || '');
    setTempAvatar(userData?.data.avatar || '');
  };

  const handleSubmit = () => {
    if (!validateUserInfo(tempname)) {
      return;
    }
    mutate(
      {
        name: tempname,
        bio: tempbio,
        avatar: tempAvatar,
      },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      }
    );
  };

  const handleProfileClick = () => {
    if (isEdit) {
      fileInputRef.current?.click();
    }
  };

  const onProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleThumbnailChange(file, setTempAvatar, setTempAvatar);
    }
  };

  if (!userData) return <LoadingSpinner />;

  const { name, email, bio, avatar } = userData.data;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-[500px] h-[250px] bg-lime-600 rounded-2xl shadow-xl flex items-center gap-8 px-8 py-6">
        <EditButton
          isEdit={isEdit}
          onClick={isEdit ? handleSubmit : handleEdit}
        />

        <ProfileImage
          avatar={avatar}
          tempAvatar={tempAvatar}
          isEdit={isEdit}
          onProfileClick={handleProfileClick}
          fileInputRef={fileInputRef}
          onProfileChange={onProfileChange}
        />

        <UserInfo
          isEdit={isEdit}
          name={name}
          bio={bio}
          email={email}
          tempname={tempname}
          tempbio={tempbio}
          onNameChange={(e) => setTempname(e.target.value)}
          onBioChange={(e) => setTempbio(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MyPage;
