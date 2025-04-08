import { THEME, useTheme } from '../context/ThemeProvider'
import clsx from 'clsx';

export default function ThemeContent() {
    const { theme } = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div 
            className={clsx(
            'p-6 h-dvh w-full flex flex-col items-center justify-center',
            isLightMode ? 'bg-white' : 'bg-gray-800'
             )}
        >
            <div className={clsx(
                'max-w-md p-6 rounded-lg shadow-lg',
                isLightMode ? 'bg-gray-100' : 'bg-gray-900'
            )}>
                <h1
                    className={clsx(
                        'text-2xl font-bold mb-4',
                        isLightMode ? 'text-black' : 'text-white'
                    )}
                >
                    Theme Content
                </h1>
                <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                    너무 어려워요
                </p>
            </div>
        </div>
    );
}