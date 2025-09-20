"use client";
import { WifiOff } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Offline = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md text-center">
        <WifiOff className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500" />
        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          The resource you are trying to access requires internet access.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Please press the button below to go back.
        </p>
        <button
          onClick={goBack}
          className="mt-8 inline-flex transform items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-transform hover:scale-105 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Offline;
