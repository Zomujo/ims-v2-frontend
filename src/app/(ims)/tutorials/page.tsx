"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Tutorials = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tutorials = [
    {
      id: 1,
      title: "Inventory Dashboard Overview",
      description: "Learn how to navigate and use the main inventory dashboard",
      videoId: "dQw4w9WgXcQ",
      duration: "8:45",
      icon: "mdi:view-dashboard",
    },
    {
      id: 2,
      title: "Adding New Products",
      description: "Step-by-step guide to adding products to your inventory",
      videoId: "dQw4w9WgXcQ",
      duration: "12:30",
      icon: "mdi:package-variant-plus",
    },
    {
      id: 3,
      title: "Managing Stock Levels",
      description: "How to update and track your inventory quantities",
      videoId: "dQw4w9WgXcQ",
      duration: "15:20",
      icon: "mdi:warehouse",
    },
    {
      id: 4,
      title: "Generating Inventory Reports",
      description: "Create and export detailed inventory reports",
      videoId: "dQw4w9WgXcQ",
      duration: "10:15",
      icon: "mdi:file-chart",
    },
    {
      id: 5,
      title: "Barcode Scanning Setup",
      description: "Configure and use barcode scanning features",
      videoId: "dQw4w9WgXcQ",
      duration: "7:50",
      icon: "mdi:barcode-scan",
    },
    {
      id: 6,
      title: "Low Stock Alerts",
      description: "Set up and manage automatic restocking alerts",
      videoId: "dQw4w9WgXcQ",
      duration: "9:30",
      icon: "mdi:alert-box",
    },
  ];

  const categories = [
    { name: "Getting Started", icon: "mdi:rocket-launch" },
    { name: "Products", icon: "mdi:package-variant" },
    { name: "Stock", icon: "mdi:palette" },
    { name: "Reports", icon: "mdi:chart-box" },
    { name: "Integrations", icon: "mdi:connection" },
    { name: "Settings", icon: "mdi:cog" },
  ];

  const openVideoModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="overflow-y-auto bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Inventory Management Tutorials
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Learn how to get the most out of your inventory management system
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex h-48 items-center justify-center bg-blue-50">
                <div className="p-4 text-center">
                  <Icon
                    icon={tutorial.icon}
                    className="mx-auto h-12 w-12 text-blue-500"
                  />
                  <p className="mt-2 text-sm font-medium text-blue-600">
                    Inventory Tutorial
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {tutorial.title}
                  </h2>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                    {tutorial.duration}
                  </span>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  {tutorial.description}
                </p>
                <button
                  onClick={() => openVideoModal(tutorial.videoId)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  <Icon icon="mdi:play-circle" className="mr-2 -ml-1 h-4 w-4" />
                  Watch Tutorial
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedVideo && (
          <div className="fixed inset-0 z-[50] ml-64 flex items-center justify-center bg-black/75 p-4">
            <div className="relative w-full max-w-4xl rounded-lg bg-white">
              <button
                onClick={closeVideoModal}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <Icon icon="mdi:close" className="h-6 w-6" />
              </button>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  className="h-96 w-full rounded-t-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <button
                  onClick={closeVideoModal}
                  className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              >
                <Icon
                  icon={category.icon}
                  className="mb-1 h-5 w-5 text-blue-500"
                />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
          <div className="text-center">
            <Icon
              icon="mdi:headset"
              className="mx-auto h-12 w-12 text-blue-500"
            />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Need more help?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Our support team is ready to assist you with any inventory
              management questions.
            </p>
            <button className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700">
              <Icon icon="mdi:message-text" className="mr-2 -ml-1 h-4 w-4" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
