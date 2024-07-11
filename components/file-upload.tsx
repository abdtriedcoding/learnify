'use client'

import toast from 'react-hot-toast'
import '@uploadthing/react/styles.css'
import { UploadDropzone } from '@/lib/uploadthing'
import { type FileUploadProps } from '@/types/index'

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
    />
  )
}
