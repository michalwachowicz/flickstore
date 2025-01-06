import { RefObject, useEffect } from "react";

const useClosePopup = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void,
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = ref.current;

      if (element === null || target === null || !element.contains(target)) {
        onClose();
      }
    };

    setTimeout(() => {
      window.addEventListener("click", clickHandler);
    }, 0);

    return () => {
      setTimeout(() => {
        window.removeEventListener("click", clickHandler);
      }, 0);
    };
  }, [onClose]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [onClose]);
};

export default useClosePopup;
