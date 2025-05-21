import { RefObject, useCallback } from "react";

type Position = {
  top: number;
  left: number;
};

/**
 * Calculates the best position for a floating element based on the given ref.
 * Automatically handles horizontal overflow and applies padding if needed.
 */
export const useFloatPosition = (
  ref: RefObject<HTMLElement | null>,
  refWidth: number,
  refPadding: number = 8
) => {
  const getPosition = useCallback((): Position => {
    if (!ref?.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Try placing it directly below the element
    // If overflowing right, shift it to the left
    if (left + refWidth > window.innerWidth - refPadding) {
      left = rect.right + window.scrollX - refWidth;
      // If still overflowing left, clamp to window with padding
      if (left < refPadding) {
        left = window.innerWidth - refWidth - refPadding;
      }
    }

    // Clamp left to avoid minor overflows
    if (left < refPadding) {
      left = refPadding;
    }

    return { top, left };
  }, [ref, refWidth, refPadding]);

  return getPosition();
};
