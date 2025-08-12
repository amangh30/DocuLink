'use client'

// src/components/Hero.tsx

import React, { useState } from 'react';
import { useTheme } from 'next-themes';

export const Hero: React.FC = () => {
  const { theme } = useTheme();

  // State for the codes
  const [sendCode] = useState('A1B2C3D4E5F67890');
  const [receiveCode, setReceiveCode] = useState('');

  // State for button labels to provide user feedback
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [pasteStatus, setPasteStatus] = useState('Paste');

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sendCode).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy'), 2000);
      });
    } else {
      console.warn("Clipboard API not available.");
    }
  };

  const handlePaste = async () => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        setReceiveCode(text);
        setPasteStatus('Pasted!');
        setTimeout(() => setPasteStatus('Paste'), 2000);
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    } else {
      console.warn("Clipboard API not available.");
    }
  };

  const darkBackgroundStyle = {
    backgroundImage: `
      radial-gradient(circle at 15% 25%, rgba(88, 81, 219, 0.3) 0%, rgba(88, 81, 219, 0) 25%),
      radial-gradient(circle at 85% 75%, rgba(217, 70, 239, 0.2) 0%, rgba(217, 70, 239, 0) 30%)
    `,
  };

  const lightBackgroundStyle = {
    backgroundImage: `linear-gradient(to top, #e2e8f0, #f8fafc)`,
  };

  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden font-sans dark:bg-[#0d0b1a] bg-slate-100 p-4"
      style={theme === 'dark' ? darkBackgroundStyle : lightBackgroundStyle}
    >
      <div className="flex w-full flex-col items-center gap-6 md:gap-8">
        <h2 className="text-4xl font-bold text-foreground md:text-5xl">
          Welcome
        </h2>

        <div className="flex w-full max-w-md flex-col rounded-3xl bg-gradient-to-b from-[#1e1c32] from-50% to-[#f0f0f5] to-50% shadow-2xl dark:shadow-black/40 lg:h-[280px] lg:w-[600px] lg:max-w-none lg:flex-row lg:bg-gradient-to-r">
          
          {/* === Send Panel (Left) === */}
          <div className="flex w-full flex-col p-8 lg:w-1/2 text-neutral-200">
            <h2 className="text-center text-2xl font-bold tracking-wider">SEND</h2>
            <div className="mx-auto mt-2 h-[3px] w-5 rounded-full bg-[#a9a3c7]"></div>
            <div className="my-auto mt-10 flex h-12 items-center justify-center rounded-lg border border-solid border-white/20 bg-white/5 font-mono text-sm">
              <span>{sendCode}</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-neutral-400">Sending Code</span>
              <button
                onClick={handleCopy}
                className="rounded-md border border-solid border-white/20 bg-transparent px-3 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/10"
              >
                {copyStatus}
              </button>
            </div>
          </div>

          {/* === Receive Panel (Right) === */}
          <div className="flex w-full flex-col p-8 lg:w-1/2 text-neutral-800">
            <h2 className="text-center text-2xl font-bold tracking-wider">RECEIVE</h2>
            <div className="mx-auto mt-2 h-[3px] w-5 rounded-full bg-[#a9a3c7]"></div>
            <div className="my-auto mt-10 flex h-12 items-center justify-center rounded-lg border border-solid border-black/10 bg-black/5 px-2">
              <input
                type="text"
                value={receiveCode}
                onChange={(e) => setReceiveCode(e.target.value)}
                placeholder="Paste code here..."
                className="h-full w-full bg-transparent text-center font-mono text-sm text-neutral-800 placeholder-neutral-500/80 focus:outline-none"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-neutral-500">Enter receiving code</span>
              <button
                onClick={handlePaste}
                className="rounded-md border border-solid border-black/10 bg-transparent px-3 py-1 text-xs text-neutral-500 transition-colors hover:bg-black/10"
              >
                {pasteStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;