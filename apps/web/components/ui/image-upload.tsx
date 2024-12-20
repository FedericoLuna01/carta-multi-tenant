/* eslint-disable no-unused-vars */
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, Trash } from "lucide-react"

import { Button } from "./button"

interface ImageUploadProps {
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      {value.map((url) => (
        <div
          key={url}
          className="relative aspect-[16/11] w-[300px] h-[200px] rounded-md overflow-hidden mb-2"
        >
          <div
            className="z-10 absolute top-2 right-2"
          >
            <Button
              size='icon'
              variant='destructive'
              type='button'
              onClick={() => onRemove(url)}
            >
              <Trash
                className="w-4 h-4"
              />
            </Button>
          </div>
          <Image
            fill
            className="object-cover"
            alt='image'
            src={url}
          />
        </div>
      ))}
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="il9ksh2s"
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <Button
              type='button'
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Subir una imagen
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload