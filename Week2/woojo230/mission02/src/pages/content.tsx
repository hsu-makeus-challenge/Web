import { useTheme, THEME } from '../contexts/darkModeContext';
import clsx from 'clsx';
import ChangeBtn from '../components/changeBtn';
import { useEffect } from 'react';

const Content = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className =
      theme === THEME.LIGHT ? 'light-theme' : 'dark-theme';
  }, [theme]);

  return (
    <div className={clsx('p-4 w-full flex justify-center')}>
      <ChangeBtn />
    </div>
  );
};

export default Content;
