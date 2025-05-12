import useGetuserData from '../hooks/queries/user/useGetuserData';
import LoadingSpinner from '../components/loading';
import { useEffect, useRef, useState } from 'react';
import useUpdateUserData from '../hooks/queries/user/useUpdateUserData';
import { handleThumbnailChange } from '../utils/lpModal/lpModalUtils';
import ProfileImage from '../components/mypage/ProfileImage';
import UserInfo from '../components/mypage/UserInfo';
import EditButton from '../components/mypage/EditButton';
import { validateUserInfo } from '../utils/user/userUtils';

const MyPage = () => {
  const { data: userData, isLoading } = useGetuserData();
  const updateUserData = useUpdateUserData();

  const [isEdit, setIsEdit] = useState(false);
  const [tempname, setTempname] = useState('');
  const [tempbio, setTempbio] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 데이터가 변경될 때마다 지역 상태 업데이트
  useEffect(() => {
    if (userData) {
      setTempname(userData.data.name || '');
      setTempbio(userData.data.bio || '');
      setTempAvatar(userData.data.avatar || '');
    }
  }, [userData]);

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

    const updatedData = {
      name: tempname,
      bio: tempbio,
      avatar: tempAvatar,
    };

    updateUserData.mutate(updatedData, {
      onSuccess: () => {
        setIsEdit(false);
      },
    });
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

  if (isLoading || !userData) return <LoadingSpinner />;

  const { name, email, bio, avatar } = userData.data;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-[500px] h-[250px] bg-lime-600 rounded-2xl shadow-xl flex items-center gap-8 px-8 py-6">
        <EditButton
          isEdit={isEdit}
          onClick={
            isEdit
              ? updateUserData.isPending
                ? handleCancel
                : handleSubmit
              : handleEdit
          }
        />

        {isEdit && (
          <button
            className="absolute top-4 right-16 p-2 rounded-full hover:bg-lime-700 transition cursor-pointer text-white text-xl"
            onClick={handleCancel}
          >
            ❌
          </button>
        )}

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

        {updateUserData.isPending && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
