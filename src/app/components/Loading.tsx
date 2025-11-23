'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const Loading: React.FC = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const backgroundStyle =
        mounted && theme === 'dark'
            ? {
                backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(88, 81, 219, 0.3) 0%, rgba(88, 81, 219, 0) 25%),
            radial-gradient(circle at 85% 75%, rgba(217, 70, 239, 0.2) 0%, rgba(217, 70, 239, 0) 30%)
          `,
            }
            : {
                backgroundImage: `linear-gradient(to top, #e2e8f0, #f8fafc)`,
            };

    return (
        <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden font-sans dark:bg-[#0d0b1a] bg-slate-100 p-4 transition-colors duration-300"
            style={backgroundStyle}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 animate-pulse">Loading editor...</p>
            </div>
        </div>
    );
};

export default Loading;
