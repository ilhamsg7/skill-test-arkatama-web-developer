import { FilePicker } from '@/components/file-picker';
import { Button } from '@/components/ui';
import clsx from 'clsx';
import { IconDownload } from 'justd-icons';
import React from 'react';
import { Link } from 'react-aria-components';

type FilePickerLayoutProps = {
  label: string;
  name: string;
  value?: string | null;
  onChange: (files: FileList | null) => void;
  accept?: string;
  isRequired?: boolean;
  prefix?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string | null;
};

export const FilePickerDownload: React.FC<FilePickerLayoutProps> = ({
  label,
  name,
  value,
  onChange,
  accept,
  isRequired,
  prefix,
  ref,
  className
}) => {
  const computedIsRequired = !value && isRequired;

  


  return (
    <div className={clsx('col-span-6 flex items-end gap-4', className)}>
      <div className="flex-grow">
        <FilePicker
          className="w-full"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          accept={accept}
          isRequired={computedIsRequired}
          prefix={prefix}
          ref={ref}
        />
      </div>
      {value && <FileDownload href={value} />}
    </div>
  );
};

type FileDownloadProps = {
  href: string;
};

const FileDownload: React.FC<FileDownloadProps> = ({ href }) => (
  <Link className="mt-2" href={href} target="_blank">
    <Button size="medium" intent="outline" className="whitespace-nowrap">
      <IconDownload />
      Download
    </Button>
  </Link>
);
