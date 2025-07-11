"use client";
import { WifiOff } from "lucide-react";
import React from "react";

const Offline = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md text-center">
        <WifiOff className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500" />
        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          You're Currently Offline
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          It seems you've lost your internet connection. Please check your
          network settings and try again.
        </p>
        <button
          onClick={handleRetry}
          className="mt-8 inline-flex transform items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-transform hover:scale-105 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Offline;
