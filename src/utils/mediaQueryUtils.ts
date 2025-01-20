import VisibleCountObject from "../interfaces/VisibleCountObject";

const getBreakpointValue = (visibleCount: VisibleCountObject): number => {
  const breakpoints: { width: number; key: keyof VisibleCountObject }[] = [
    { width: 1280, key: "xl" },
    { width: 1024, key: "lg" },
    { width: 768, key: "md" },
    { width: 640, key: "sm" },
  ];

  for (let i = 0; i < breakpoints.length; i += 1) {
    const { width, key } = breakpoints[i];
    const count = visibleCount[key];

    if (window.innerWidth >= width && count !== undefined) return count;
  }

  return visibleCount.sm || 1;
};

export default getBreakpointValue;
