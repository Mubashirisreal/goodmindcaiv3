'use client';
import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Conversation() {
  const router = useRouter();
  const conversation = useConversation({
    onConnect: () => {},
    onDisconnect: () => {
      router.push('/feedback');
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMessage: (_message) => {},
    onError: (error: unknown) => {
      console.error('Conversation API error:', error);
      setError(`Connection error: ${
        typeof error === 'string' ? error : 
        error instanceof Error ? error.message : 
        'Unknown error occurred'
      }`);
    },
  });

  const [error, setError] = useState('');

  const startConversation = useCallback(async () => {
    setError('');
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 'KbLyizMyiFyi3w7hWVCz',
      });
    } catch (error) {
      console.error('Conversation error:', error);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone access to continue.');
      } else if (error instanceof DOMException && error.name === 'NotFoundError') {
        setError('No microphone detected. Please connect a microphone and try again.');
      } else {
        setError('Failed to start conversation. Please try again later.');
      }
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[80vh]">
      <div className="flex justify-center">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className={`w-80 h-80 rounded-full bg-[var(--button-bg)] text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all ${
            conversation.status === 'connected' && conversation.isSpeaking ? 'animate-pulse' : ''
          }`}
        >
          Start Conversation
        </button>
      </div>
      <div className="flex flex-col items-center text-gray-800">
        <p className="text-xs">Status: {conversation.status}</p>
        <p className="text-xs">Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>
    </div>
  );
}