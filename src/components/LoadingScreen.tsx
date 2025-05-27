import React from 'react';

export function LoadingScreen({ fullScreen = true }: LoadingScreenProps) {
  return (
    <div className={`${fullScreen ? 'fixed inset-0' : 'relative min-h-[200px]'} bg-white bg-opacity-90 z-50 flex items-center justify-center`}>
      <div className="text-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-white"></div>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}