"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { settingPagesDescription } from "@features/settings/settings.data";

type TitleFromPath = keyof typeof settingPagesDescription;

export const pageHeadingMap = {
  items: {
    title: "Items",
    description: "Manage your items here.",
  },
  categories: {
    title: "Categories",
    description: "Manage your categories here.",
  },
  "stock-adjustment": {
    title: "Stock Adjustment",
    description: "Manage your stock adjustments here.",
  },
  expiry: {
    title: "Expiry Items",
    description: "View items that are nearing their expiry date.",
  },
  suppliers: {
    title: "Suppliers",
    description: "Manage your suppliers here.",
  },
};

interface PageHeadingContextType {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  updateCustomHeading: (options: UpdateHeadingOptions) => void;
  routeLevel: number;
  setRouteLevel: (level: number) => void;
}

interface UpdateHeadingOptions {
  title?: string;
  description?: string;
}

const PageHeadingContext = createContext<PageHeadingContextType | undefined>(
  undefined,
);

export function PageHeadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [routeLevel, setRouteLevel] = useState(1);
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const updateCustomHeading = useCallback(
    ({ title, description }: UpdateHeadingOptions) => {
      if (title !== undefined) setCustomTitle(title);
      if (description !== undefined) setCustomDescription(description);
    },
    [],
  );

  useEffect(() => {
    const paths = pathname.split("/");
    const titleFromPath = paths[3] ?? paths[2] ?? paths[1];
    const headingMaps = { ...pageHeadingMap, ...settingPagesDescription };
    const title =
      headingMaps[titleFromPath as TitleFromPath]?.title ??
      (customTitle ? customTitle : titleFromPath);
    const description =
      headingMaps[titleFromPath as TitleFromPath]?.description ??
      (customDescription ? customDescription : "");
    setPageTitle(title);
    setPageDescription(description);
  }, [pathname, customTitle, customDescription, pageTitle, pageDescription]);

  return (
    <PageHeadingContext.Provider
      value={{
        title: pageTitle,
        description: pageDescription,
        setTitle: setPageTitle,
        setDescription: setPageDescription,
        updateCustomHeading,
        routeLevel,
        setRouteLevel,
      }}
    >
      {children}
    </PageHeadingContext.Provider>
  );
}

export function usePageHeading(
  initTitle = "",
  initDescription = "",
  routeLevel = 1,
) {
  const context = useContext(PageHeadingContext);

  if (!context) {
    throw new Error("usePageHeading must be used within a PageHeadingProvider");
  }

  useEffect(() => {
    context.setRouteLevel(routeLevel);
    if (initTitle && !context.title) {
      context.setTitle(initTitle);
    }
    if (initDescription && !context.description) {
      context.setDescription(initDescription);
    }
  }, [initTitle, initDescription, context]);

  return context;
}
