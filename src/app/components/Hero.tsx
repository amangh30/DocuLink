'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Pusher from 'pusher-js';
import { useQuill } from 'react-quilljs';
import type Delta from 'quill-delta'; // Delta typing
import 'quill/dist/quill.snow.css';

const generateCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const Hero: React.FC = () => {
  const { theme } = useTheme();

  const [isConnected, setIsConnected] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [sendCode, setSendCode] = useState('');
  const [receiveCode, setReceiveCode] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]],
    },
  });

  // Unique client ID for this tab
  const clientIdRef = useRef<string>(Math.random().toString(36).substring(2, 10));

  // Generate code for sending
  useEffect(() => {
    setSendCode(generateCode());
  }, []);

  // Setup Pusher subscription
  useEffect(() => {
    if (!isConnected || !roomCode || !quill) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`doc-channel-${roomCode}`);

    const handleDocUpdate = (data: { delta: Delta; clientId: string }) => {
      if (!quill) return;
      if (data.clientId === clientIdRef.current) return; // Ignore own updates

      console.log('📥 Received update from other client');
      quill.updateContents(data.delta, 'api'); // ✅ typed correctly now
    };

    channel.bind('doc-update', handleDocUpdate);

    return () => {
      channel.unbind('doc-update', handleDocUpdate);
      pusher.unsubscribe(`doc-channel-${roomCode}`);
      pusher.disconnect();
    };
  }, [isConnected, roomCode, quill]);

  // Sync theme with Quill
  useEffect(() => {
    if (!quillRef?.current) return;
    if (theme === 'dark') {
      quillRef.current.classList.add('quill-dark');
    } else {
      quillRef.current.classList.remove('quill-dark');
    }
  }, [theme, quillRef]);

  // Send updates when editing
  useEffect(() => {
    if (!quill || !isConnected) return;

    const handleTextChange = (delta: Delta, _oldDelta: Delta, source: string) => {
      if (source !== 'user') return;

      console.log('📤 Sending update:', delta);

      fetch('/api/pusher/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode, delta, clientId: clientIdRef.current }),
      });
    };

    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('text-change', handleTextChange);
    };
  }, [quill, isConnected, roomCode]);

  // Copy sharing code
  const handleCopy = () => {
    navigator.clipboard.writeText(sendCode).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  const handleStartSharing = () => {
    setRoomCode(sendCode);
    setIsConnected(true);
  };

  const handleConnect = () => {
    if (receiveCode.trim()) {
      setRoomCode(receiveCode);
      setIsConnected(true);
    } else {
      alert('Please enter a code to connect.');
    }
  };

  const backgroundStyle =
    theme === 'dark'
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
      {isConnected ? (
        <div className="w-full max-w-4xl h-[80vh] flex flex-col">
          <h3 className="text-center text-foreground mb-4 text-lg">
            Connected to room: {roomCode}
          </h3>
          <div className="flex-grow bg-white rounded-lg shadow-lg overflow-hidden">
            <div ref={quillRef} style={{ height: '100%' }} />
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">Welcome</h2>
          <div className="flex w-full max-w-md flex-col rounded-3xl bg-gradient-to-b from-[#1e1c32] from-50% to-[#f0f0f5] to-50% shadow-2xl dark:shadow-black/40 lg:h-[320px] lg:w-[600px] lg:max-w-none lg:flex-row lg:bg-gradient-to-r">
            {/* SEND */}
            <div className="flex w-full flex-col p-8 lg:w-1/2 text-neutral-200">
              <h2 className="text-center text-2xl font-bold tracking-wider">SHARE</h2>
              <div className="mx-auto mt-2 h-[3px] w-5 rounded-full bg-[#a9a3c7]"></div>
              <div className="my-auto mt-6 flex h-12 items-center justify-center rounded-lg border border-solid border-white/20 bg-white/5 font-mono text-sm">
                <span>{sendCode}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-neutral-400">Your Room Code</span>
                <button
                  onClick={handleCopy}
                  className="rounded-md border border-solid border-white/20 bg-transparent px-3 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/10"
                >
                  {copyStatus}
                </button>
              </div>
              <button
                onClick={handleStartSharing}
                className="mt-4 w-full rounded-lg bg-indigo-500 py-2.5 font-semibold text-white transition-transform hover:scale-105"
              >
                Start Sharing
              </button>
            </div>

            {/* RECEIVE */}
            <div className="flex w-full flex-col p-8 lg:w-1/2 text-neutral-800">
              <h2 className="text-center text-2xl font-bold tracking-wider">JOIN</h2>
              <div className="mx-auto mt-2 h-[3px] w-5 rounded-full bg-[#a9a3c7]"></div>
              <div className="my-auto mt-6 flex h-12 items-center justify-center rounded-lg border border-solid border-black/10 bg-black/5 px-2">
                <input
                  type="text"
                  value={receiveCode}
                  onChange={(e) => setReceiveCode(e.target.value.toUpperCase())}
                  placeholder="Paste code here..."
                  className="h-full w-full bg-transparent text-center font-mono text-sm text-neutral-800 placeholder-neutral-500/80 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-neutral-500">Enter room code</span>
              </div>
              <button
                onClick={handleConnect}
                className="mt-4 w-full rounded-lg bg-gray-700 py-2.5 font-semibold text-white transition-transform hover:scale-105"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
