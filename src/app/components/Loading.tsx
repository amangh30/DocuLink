'use client';

import React from 'react';

const Loading: React.FC = () => {
    return (
        <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden font-sans 
            bg-slate-100 bg-[linear-gradient(to_top,#e2e8f0,#f8fafc)]
            dark:bg-[#0d0b1a] dark:bg-[radial-gradient(circle_at_15%_25%,rgba(88,81,219,0.3)_0%,rgba(88,81,219,0)_25%),radial-gradient(circle_at_85%_75%,rgba(217,70,239,0.2)_0%,rgba(217,70,239,0)_30%)]
            p-4 transition-colors duration-300"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 animate-pulse">Loading editor...</p>
            </div>
        </div>
    );
};

export default Loading;
