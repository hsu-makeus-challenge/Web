import { useTheme, THEME } from '../contexts/darkModeContext';
import clsx from 'clsx';

const ChangeBtn = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <button
      onClick={changeTheme}
      className={clsx(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      )}
    >
      {theme === THEME.LIGHT ? '다크모드전환' : '라이트모드전환'}
    </button>
  );
};

export default ChangeBtn;
