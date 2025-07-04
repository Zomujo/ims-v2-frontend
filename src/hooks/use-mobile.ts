import * as React from "react";

const MOBILE_BREAKPOINT = 768;

const LARGE_MOBILE_BREAKPOINT = 1024;

export function useIsMobile(
  breakpoint: "mobile" | "large-mobile" = "mobile",
): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  const BREAKPOINT =
    breakpoint === "mobile" ? MOBILE_BREAKPOINT : LARGE_MOBILE_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
