"use client";
import { Switch } from "@features/ui/switch";
import { Checkbox } from "@features/ui/checkbox";
import { Label } from "@features/ui/label";
import { useEffect, useRef, useState } from "react";
import {
  addSettings,
  findSettings,
} from "@features/shared/actions/user.actions";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { handleRequestState } from "@/lib/utils";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";
import { useGlobalNotifications } from "@features/notifications/notifications-context";

const emailNotificationOptions = [
  {
    id: "departmentRequests",
    label: "Department Requests",
    description: "Stay informed about department requests",
  },
  {
    id: "restocked",
    label: "Restocked",
    description: "Stay informed about items restocked",
  },
  {
    id: "lowStocks",
    label: "Low Stocks",
    description: "Stay informed about items low in stock",
  },
  {
    id: "outOfStock",
    label: "Item out of stock",
    description: "Stay informed about items that are out of stock",
  },
];

type EmailNotificationOptionsId =
  (typeof emailNotificationOptions)[number]["id"];

export default function SettingsNotification() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [emailNotification, setEmailNotification] = useState(true);
  const { isConnected } = useGlobalNotifications();
  const [emailNotificationOptionsState, setEmailNotificationOptionsState] =
    useState<Record<EmailNotificationOptionsId, boolean>>({
      departmentRequests: true,
      restocked: true,
      lowStocks: true,
      outOfStock: true,
    });
  const { data, loading } = useFetchData({
    fetchFn: findSettings,
    cacheKey: CacheKey.NotificationSettings,
  });

  const submitEmailNotificationOptions = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const res = addSettings({
        emailItemStocked: emailNotificationOptionsState.restocked,
        emailItemOutOfStock: emailNotificationOptionsState.outOfStock,
        emailDepartmentRequests:
          emailNotificationOptionsState.departmentRequests,
        emailItemLowStocks: emailNotificationOptionsState.lowStocks,
      });
      handleRequestState({
        res,
        successMsg: "Email notification settings updated successfully",
        errorMsg: "Failed to update email notification settings",
        loadingMsg: "Updating email notification settings...",
      });
    }, 2000);
  };

  useEffect(() => {
    if (data?.data) {
      const {
        emailItemLowStocks,
        emailItemOutOfStock,
        emailDepartmentRequests,
        emailItemStocked,
      } = data?.data;
      setEmailNotificationOptionsState({
        departmentRequests: emailDepartmentRequests,
        restocked: emailItemStocked,
        lowStocks: emailItemLowStocks,
        outOfStock: emailItemOutOfStock,
      });
      const atLeastOneTrue =
        emailItemLowStocks ||
        emailItemOutOfStock ||
        emailDepartmentRequests ||
        emailItemStocked;
      setEmailNotification(atLeastOneTrue);
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <span className="text-gray-500">
            Manage your notification settings
          </span>
          <div className="mt-11 flex gap-x-24 gap-y-8 max-lg:flex-col">
            <div>
              <span className="font-medium">Email Notifications</span>
              <p className="text-gray-500">
                Manage your preferences anytime to tailor your email experience.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <Switch
                checked={emailNotification}
                size={"xl"}
                disabled={!isConnected}
                onClick={() => {
                  setEmailNotification((prev) => {
                    if (prev) {
                      setEmailNotificationOptionsState({
                        departmentRequests: false,
                        restocked: false,
                        lowStocks: false,
                        outOfStock: false,
                      });
                    }
                    return !prev;
                  });
                  if (!emailNotification) {
                  }
                  void submitEmailNotificationOptions();
                }}
              />
              <div className="flex flex-col gap-6">
                {emailNotificationOptions.map(({ label, id, description }) => (
                  <div key={id} className="flex gap-3">
                    <Checkbox
                      id="terms-2"
                      disabled={!isConnected || !emailNotification}
                      checked={emailNotificationOptionsState[id]}
                      onClick={() => {
                        setEmailNotificationOptionsState((prev) => ({
                          ...prev,
                          [id]: !prev[id],
                        }));
                        void submitEmailNotificationOptions();
                      }}
                    />
                    <div className="grid -translate-y-1 gap-2">
                      <Label
                        className="text-base font-medium"
                        htmlFor="terms-2"
                      >
                        {label}
                      </Label>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
