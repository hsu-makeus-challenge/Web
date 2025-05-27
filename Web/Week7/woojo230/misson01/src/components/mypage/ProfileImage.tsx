import ProfileDefaultIcon from './ProfileDefaultIcon';

interface ProfileImageProps {
  avatar: string;
  tempAvatar: string;
  isEdit: boolean;
  onProfileClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({
  avatar,
  tempAvatar,
  isEdit,
  onProfileClick,
  fileInputRef,
  onProfileChange,
}: ProfileImageProps) => {
  return (
    <>
      <div
        className={`w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${
          isEdit ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
        onClick={onProfileClick}
      >
        {tempAvatar || avatar ? (
          <img
            src={tempAvatar || avatar}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <ProfileDefaultIcon />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onProfileChange}
      />
    </>
  );
};

export default ProfileImage;
