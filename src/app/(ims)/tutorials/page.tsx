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
  const firebaseS3bucket = process.env.NEXT_PUBLIC_FIREBASE_S3_STORAGE;

  const categories: Category[] = [
    {
      name: "Activities",
      icon: "mdi:clipboard-list",
      videos: [
        {
          id: 1,
          title: "Audit Logs",
          description: "Learn how to check activity audit logs",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2FActivities%20-%20Audit%20logs%20.mp4?alt=media&token=2688603f-9011-4bd8-96a4-a88895fc9a25`,
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
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F1.%20Inventory%20-%20overview.mp4?alt=media&token=13724a78-3f85-42d4-b066-cf342c10f9d9`,
          icon: "mdi:view-dashboard",
        },
        {
          id: 2,
          title: "Add Category",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F2.%20Inventory%20-%20Add%20Category.mp4?alt=media&token=90d9fbc0-2b53-4897-a7b3-6924b85bcdff`,
          icon: "mdi:shape",
        },
        {
          id: 3,
          title: "Add New Drug or Product",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F3.%20Inventory%20-%20add%20new%20drug%20or%20medical%20product.mp4?alt=media&token=d679902e-5afe-4431-848f-f439f37ff96a`,
          icon: "mdi:pill",
        },
        {
          id: 4,
          title: "Add New Batch",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F4.%20Inventory%20-%20add%20new%20Batch.mp4?alt=media&token=77dee032-a4a2-45c2-a4d9-5b4e8795e7f6`,
          icon: "mdi:layers-plus",
        },
        {
          id: 5,
          title: "Stock Adjustment Overview",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F5.%20Inventory%20-%20stock%20adjustment%20overview.mp4?alt=media&token=0e5db502-b3f9-4afc-b499-8730ad6e9e5b`,
          icon: "mdi:warehouse",
        },
        {
          id: 6,
          title: "Expiry",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F6.%20Inventory%20-%20expiry.mp4?alt=media&token=2b3f355b-efa8-42a8-a903-31a0274a6e9c`,
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
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F1.%20Orders%20-%20suppliers.mp4?alt=media&token=f8ac803c-02fb-4194-a11b-f201c18a8a88`,
          icon: "mdi:truck",
        },
        {
          id: 2,
          title: "Items Orders",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2F2.%20Orders%20-%20items%20orders.mp4?alt=media&token=bf7796c7-681f-48b7-b69d-b1f757273128`,
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
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2FDepense%20a%20drug%20or%20Medical%20record.mp4?alt=media&token=0ba5fef9-a7d1-4d77-aa80-8455a8702f55`,
          icon: "mdi:medical-bag",
        },
      ],
    },
    {
      name: "Offline",
      icon: "mdi:wifi-off",
      videos: [
        {
          id: 1,
          title: "Overview",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Foffline%20-%20overview.mp4?alt=media&token=e042a3ff-4d0b-48e1-b15d-83e29c1518ef`,
          icon: "mdi:signal-off",
        },
      ],
    },
    {
      name: "Report an Incident",
      icon: "mdi:file-document-alert",
      videos: [
        {
          id: 1,
          title: "Report an incident",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Freport%20an%20incident.mp4?alt=media&token=1b853ce2-0ae9-4ad8-8c4b-8cc72da4371f`,
          icon: "mdi:alert-octagon",
        },
      ],
    },
    {
      name: "Ussd ",
      icon: "mdi:phone-outline",
      videos: [
        {
          id: 1,
          title: "Overview",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Fussd-overview.MP4?alt=media&token=734f9ea9-9104-4d80-b4c9-b2c61e4fd102`,
          icon: "mdi:view-dashboard",
        },
        {
          id: 2,
          title: "Query a drug",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Fussd-query%20a%20drug.MP4?alt=media&token=930067aa-ac30-4372-8f32-15cee6ee70f4`,
          icon: "mdi:pill",
        },
        {
          id: 3,
          title: "Dispense a drug",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Fussd-dispense%20a%20drug.MP4?alt=media&token=f99c6b8c-66bb-4280-8761-93a18a432fcb`,
          icon: "mdi:hand-coin",
        },
        {
          id: 4,
          title: "Stock a drug",
          src: `${firebaseS3bucket}IMS%20tutorial%20videos%2Fussd-dispense%20a%20drug.MP4?alt=media&token=f99c6b8c-66bb-4280-8761-93a18a432fcb`,
          icon: "mdi:package-variant",
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
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedVideo?.title || "Tutorial"}
                </h2>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
                >
                  <Icon icon="mdi:close" className="h-6 w-6" />
                </button>
              </div>

              <video
                key={selectedVideo.src}
                className="max-h-[70vh] w-full bg-black"
                controls
                preload="metadata"
                poster={selectedVideo.src}
              >
                <source src={selectedVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-md bg-gray-200 px-5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-300"
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
