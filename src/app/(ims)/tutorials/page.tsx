"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Video = {
  id: number;
  title: string;
  description?: string;
  src: string; // local path
  duration?: string;
  icon: string;
};

type Category = {
  name: string;
  icon: string;
  videos: Video[];
};

const Tutorials = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories: Category[] = [
    {
      name: "Activities",
      icon: "mdi:clipboard-list",
      videos: [
        {
          id: 1,
          title: "Audit Logs",
          description: "Learn how to check activity audit logs",
          src: "/videos/activities/Activities-Audit_logs .mp4",
          icon: "mdi:file-search",
        },
      ],
    },
    {
      name: "Inventory",
      icon: "mdi:package-variant",
      videos: [
        {
          id: 1,
          title: "Overview",
          src: "/videos/Inventory/1. Inventory - overview.mp4",
          icon: "mdi:view-dashboard",
        },
        {
          id: 2,
          title: "Add Category",
          src: "/videos/Inventory/2. Inventory - Add Category.mp4",
          icon: "mdi:shape",
        },
        {
          id: 3,
          title: "Add New Drug or Product",
          src: "/videos/Inventory/3. Inventory - add new drug or medical product.mp4",
          icon: "mdi:pill",
        },
        {
          id: 4,
          title: "Add New Batch",
          src: "/videos/Inventory/4. Inventory - add new Batch.mp4",
          icon: "mdi:layers-plus",
        },
        {
          id: 5,
          title: "Stock Adjustment Overview",
          src: "/videos/Inventory/5. Inventory - stock adjustment overview.mp4",
          icon: "mdi:warehouse",
        },
        {
          id: 6,
          title: "Expiry",
          src: "/videos/Inventory/6. Inventory - expiry.mp4",
          icon: "mdi:calendar-alert",
        },
      ],
    },
    {
      name: "Orders",
      icon: "mdi:cart",
      videos: [
        {
          id: 1,
          title: "Suppliers",
          src: "/videos/Orders/1. Orders - suppliers.mp4",
          icon: "mdi:truck",
        },
        {
          id: 2,
          title: "Items Orders",
          src: "/videos/Orders/2. Orders - items orders.mp4",
          icon: "mdi:cart-arrow-down",
        },
      ],
    },
    {
      name: "Sales",
      icon: "mdi:currency-usd",
      videos: [
        {
          id: 1,
          title: "Dispense a Drug or Medical Record",
          src: "/videos/Sales/Depense a drug or Medical record.mp4",
          icon: "mdi:medical-bag",
        },
      ],
    },
  ];

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

        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
              <Icon
                icon={category.icon}
                className="mr-2 h-6 w-6 text-blue-500"
              />
              {category.name}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.videos.map((video) => (
                <div
                  key={video.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="flex h-32 items-center justify-center bg-blue-50">
                    <Icon
                      icon={video.icon}
                      className="h-12 w-12 text-blue-600"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {video.description}
                      </p>
                    )}
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                      <Icon icon="mdi:play-circle" className="mr-2 h-4 w-4" />
                      Watch Tutorial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedVideo && (
          <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/75 p-4">
            <div className="relative w-full max-w-4xl rounded-lg bg-white">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <Icon icon="mdi:close" className="h-6 w-6" />
              </button>
              <video
                key={selectedVideo.src}
                className="w-full rounded-t-lg"
                controls
                autoPlay
              >
                <source src={selectedVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
