"use client"
import { convertFileToBase64 } from '@/lib/utils';
import { UploadCloud, X } from 'lucide-react';
import {useDropzone} from 'react-dropzone';
import {
  useRef,
  FC,
  useState,
  useCallback,
} from 'react';

interface IProps {
  value: string;
  onChange: (value?: string) => void;
  name: string;
}

// TODO сделать прогресс бар

export const FileUploader: FC<IProps> = ({
  name,
  value,
  onChange
}) => {
  const [file, setFile] = useState<File | null>();
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpenFileUploader = () => {
    inputRef?.current?.click();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const image = acceptedFiles[0];
    if (+parseFloat(`${image.size / (1024 * 1024)}`).toFixed(2) > 4) {
      setError('Ошибка загрузки файла');
      return;
    }
    setFile(image);
    setError('');
    const f = new FileReader();
    f.onload = () => {
      setPreview(f.result);
    };
    f.readAsDataURL(image);
    const imageBase64 = await convertFileToBase64(image);
    if (onChange) {
      onChange(imageBase64);
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteFile = () => {
    setFile(null);
    setPreview(null);
    if (onChange) {
      onChange('');
    }
  };

  return (
    <>
    {!file ? (
      <div
        className="border-dashed border-2 border-gray-400 px-6 py-3 w-full mt-3 cursor-pointer"
        onClick={handleOpenFileUploader}
        {...getRootProps()}
      >
        <input
          {...getInputProps()}
          type="file"
          className="hidden"
          name={name}
          accept="image/*"
          ref={inputRef}
          value={value}
        />
        <div className="flex items-center justify-center mt-2 mb-2">
          <UploadCloud />
        </div>
        {
        isDragActive ?
          (<p className='text-indigo-400 text-center'>Drop the files here ...</p>) : (
            <div>
              <div className="text-blue-500">Choose files or drag and drop</div>
              <div>Image (4MB)</div>
            </div>
          )
        }
        </div>
      ) : (
        <div className='relative'>
          <button
            onClick={handleDeleteFile}
            type="button"
            className="bg-rose-500 text-file p-1 rounded-full absolute top-0 right-0 shadow-sm"
          >
            <X className='h-4 w-4' />
          </button>
          <img
            src={preview as string || ''}
            alt="image"
            className="flex justify-center items-center rounded-full object-cover"
            width={150}
            height={150}
          />
        </div>
      )}
      {error ? <div className="text-red-500">Error load image</div> : null}
    </>
  );
};
