"use client";

import { JSX, useEffect, useState } from "react";
import {
  mockNotifications,
  NotificationPayload,
} from "../shared/types/notifications.types";
import { ImsButton } from "@features/shared/components/ims-button";
import { cn, getRelativeTime } from "@/lib/utils";
import { ImsAvatar } from "@features/shared/components/ims-avatar";
import Link from "next/link";

export default function RealtimeNotifications(): JSX.Element {
  const [notifications, setNotifications] =
    useState<NotificationPayload[]>(mockNotifications);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  return (
    <div className="w-[470px] text-[#111111]">
      <div className="w-full px-6 pt-7 pb-4">
        <span className="text-2xl font-bold">Notification</span>
        <div className="mt-8 flex items-center justify-between">
          <span className="font-bold">
            All{" "}
            <span className="bg-primary-light inline-block h-6 w-6 rounded-full text-center text-sm leading-6 font-medium">
              {notifications.length}
            </span>
          </span>
          <div className="space-x-4">
            <ImsButton
              className="text-base font-medium underline"
              variant="link"
            >
              Mark all as read
            </ImsButton>
            <ImsButton className="font-medium" variant="secondary">
              View All
            </ImsButton>
          </div>
        </div>
      </div>
      <div className="max-h-[500px] overflow-y-scroll font-normal">
        {notifications.map(
          ({ message, id, createdAt, status, linkName, linkRoute }) => (
            <div
              key={id}
              className={cn(
                "flex gap-x-3 p-6 text-[#000000]",
                status === "UNREAD" && "bg-[#F6F7FE]",
              )}
            >
              <div className="relative">
                <ImsAvatar src={""} alt={"Profile Image"} fallback={""} />
                {status === "UNREAD" && (
                  <span className="bg-warning-400 absolute top-0 left-1 h-3 w-3 rounded-full"></span>
                )}
              </div>

              <div>
                <p className="text-sm font-light">{message}</p>
                <span className="text-sm font-light text-gray-500">
                  {getRelativeTime(createdAt)}
                </span>
                <div className="mt-5">
                  <Link href={linkRoute}>
                    <ImsButton variant="imsPrimary">{linkName}</ImsButton>
                  </Link>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
