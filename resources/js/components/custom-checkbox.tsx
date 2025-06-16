import React, { useRef, useEffect, ChangeEvent } from 'react';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  [key: string]: any; // To allow any other props (like className, id, etc.)
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  onChange,
  indeterminate = false,
  ...props
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  // Set the indeterminate state when the component mounts or when indeterminate prop changes
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      {...props}
      ref={checkboxRef}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default CustomCheckbox;
