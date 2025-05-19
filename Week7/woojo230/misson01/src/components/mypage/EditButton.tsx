import SettingIcon from './SettingIcon';

interface EditButtonProps {
  isEdit: boolean;
  onClick: () => void;
}

const EditButton = ({ isEdit, onClick }: EditButtonProps) => {
  return (
    <button
      className="absolute top-4 right-4 p-2 rounded-full hover:bg-lime-700 transition cursor-pointer text-white text-xl"
      onClick={onClick}
    >
      {isEdit ? '✅' : <SettingIcon />}
    </button>
  );
};

export default EditButton;
