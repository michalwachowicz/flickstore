import { useEffect, useState } from "react";

export default function useParentVisibility(element: HTMLElement | null) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!element || !element.parentElement) return () => {};
    const parent = element.parentElement;

    const updateVisibility = () => {
      setHidden(parent.getAttribute("aria-hidden") === "true");
    };
    updateVisibility();

    const observer = new MutationObserver(() => {
      updateVisibility();
    });

    observer.observe(parent, {
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return hidden;
}
