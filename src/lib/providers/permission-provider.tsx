"use client";
import React from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@/features/shared/types/auth-action.types";
import Image from "next/image";
import permissionBlock from "@public/images/permission-block.png";
import { useRouter } from "next/navigation";
import { ImsButton } from "@features/shared/components/ims-button";

interface PermissionProviderProps {
  permission: PermissionModules | string;
  freePass?: string[];
  children: React.ReactNode;
}

const ForbiddenPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-4 text-center">
      <div className="mb-8">
        <Image src={permissionBlock} alt={""} />
      </div>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">Access Denied</h1>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        You don't have permission to access this page. Please contact your
        administrator if you believe this is an error.
      </p>
      <ImsButton onClick={handleGoBack}>Go Back</ImsButton>
    </div>
  );
};

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  permission,
  children,
  freePass,
}) => {
  const { hasPermission, isLoading } = useSessionData();

  if (isLoading) {
    return (
      <div className="mt-32 flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!freePass?.includes(permission) && !hasPermission(permission)) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};
