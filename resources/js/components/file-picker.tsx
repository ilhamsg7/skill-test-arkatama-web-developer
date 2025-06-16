import { IconFile } from 'justd-icons';
import React from 'react';
import { TextField as TextFieldPrimitive } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { composeTailwindRenderProps, FieldGroup, Label } from './ui';

type FilePickerProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  onChange: (files: FileList | null) => void;
  ref: React.RefObject<HTMLInputElement>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  className?: string;
  value?: string;
};

export const FilePicker = ({
  label,
  name,
  isRequired,
  onChange,
  ref,
  accept,
  multiple,
  className,
  value
}: FilePickerProps) => {
  const getFileName = () => {
    if (!value) return ''; // No file selected, show generic placeholder
    if (typeof value === 'string') return value.split('/').pop() || 'No file selected';
    if (value && typeof value === 'object' && 'name' in value) return (value as File).name;
    return '';
  };

  return (
    <TextFieldPrimitive className={composeTailwindRenderProps(className, 'group flex flex-col gap-y-1')}>
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <span className="ml-2 text-muted-fg">
          <IconFile />
        </span>
        <input
          type="file"
          name={name}
          className={twJoin(
            'w-full min-w-0 [&::-ms-reveal]:hidden bg-transparent py-2 px-2.5 text-base text-fg placeholder-muted-fg outline-hidden data-focused:outline-hidden sm:text-sm'
          )}
          ref={ref}
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            const files = e.target.files;
            onChange(files);
          }}
          required={isRequired}
          title={getFileName() || 'Select a file to upload'} // Tooltip to show file name or a hint
          placeholder={getFileName() || 'Select a file'} // Placeholder text when no file is selected
        />
        {getFileName() && (
          <span className="mt-2 text-sm text-muted-fg">{`${getFileName()}`}</span> // Display selected file name
        )}
      </FieldGroup>
    </TextFieldPrimitive>
  );
};
