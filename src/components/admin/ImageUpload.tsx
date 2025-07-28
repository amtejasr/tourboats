
"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onChange: (base64: string) => void;
  value: string;
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64String = event.target?.result as string;
        onChange(base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onChange('');
  };

  return (
    <div>
      {preview ? (
        <div className="relative h-64 w-full rounded-md overflow-hidden">
          <Image src={preview} alt="Upload preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors',
            isDragActive ? 'border-primary bg-primary/10' : 'border-input'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
          </div>
        </div>
      )}
    </div>
  );
}
