import React from "react";

interface Props {
  label: string;
  size?: string | number;
  disabled?: boolean;
  onClick?: () => void;
  ariaControls?: string;
  ariaExpanded?: boolean;
  children: React.ReactNode;
}

const IconButton = ({
  label,
  size = 9,
  disabled = false,
  onClick = () => {},
  ariaControls = undefined,
  ariaExpanded = undefined,
  children,
}: Props) => (
  <button
    aria-label={label}
    className={`btn btn-icon w-${size} h-${size}`}
    type="button"
    onClick={onClick}
    aria-controls={ariaControls}
    aria-expanded={ariaExpanded}
    disabled={disabled}
  >
    {children}
  </button>
);

export default IconButton;
