import * as React from "react";

type Breakpoint = "mobile" | "large-mobile" | "x-large-mobile";
const MOBILE_BREAKPOINT = 768;
const LARGE_MOBILE_BREAKPOINT = 1024;
const X_LARGE_MOBILE_BREAKPOINT = 1280;

const breakpointMap: Record<Breakpoint, number> = {
  mobile: MOBILE_BREAKPOINT,
  "large-mobile": LARGE_MOBILE_BREAKPOINT,
  "x-large-mobile": X_LARGE_MOBILE_BREAKPOINT,
};

export function useIsMobile(breakpoint: Breakpoint): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  const BREAKPOINT = breakpointMap[breakpoint];

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    const onChange = ({ matches }: MediaQueryListEvent) => {
      setIsMobile(matches);
    };
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [BREAKPOINT]);

  return !!isMobile;
}
