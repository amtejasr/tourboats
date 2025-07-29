
"use client";

import { useState, useCallback } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ImageUploadProps {
  onChange: (base64: string) => void;
  value: string;
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        onChange(base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

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
          className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors border-input'
        >
          <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
            </div>
            <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </Label>
        </div>
      )}
    </div>
  );
}
