"use client"

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react"
import type React from "react"
import { deleteBlob } from "@/action/azure"
import { BlobGetPropertiesResponse, RestError } from "@azure/storage-blob"
import { containerClient } from "@/lib/services/azure"
import { useFileValidator } from "./useFileValidator"

export type FileWithMeta = {
  file: File
  id: string
  preview?: string
  progress?: number
  url?: string
  error?: string
  properties?: BlobGetPropertiesResponse
}

export type FileUploadOptions = {
  maxSize?: number // in bytes
  accept?: string
  onFileChange?: (file: FileWithMeta | null) => void
}

export type FileUploadState = {
  file: FileWithMeta | null
  isDragging: boolean
  isUploading: boolean
  error?: string
}

export type FileUploadActions = {
  setFile: (file: File) => void
  clearFile: () => void
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDrop: (e: DragEvent<HTMLElement>) => void
  handleDragEnter: (e: DragEvent<HTMLElement>) => void
  handleDragLeave: (e: DragEvent<HTMLElement>) => void
  handleDragOver: (e: DragEvent<HTMLElement>) => void
  openFileDialog: () => void
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> }
}

export const useFileUpload = (
  options: FileUploadOptions = {},
): [FileUploadState, FileUploadActions] => {
  const { maxSize = Infinity, accept = "*", onFileChange } = options

  const validateFile = useFileValidator({
    maxSize: maxSize,
    accept: accept,
  })

  const [state, setState] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isUploading: false,
    error: undefined,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const generateId = (file: File) =>
    `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  const uploadToAzure = useCallback(
    async (fileMeta: FileWithMeta) => {
      try {
        const blobName = `${Date.now()}-${fileMeta.file.name}`
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)

        await blockBlobClient.uploadData(fileMeta.file, {
          blobHTTPHeaders: { blobContentType: fileMeta.file.type },
          onProgress: ({ loadedBytes }) => {
            setState((prev) => ({
              ...prev,
              file:
                prev.file?.id === fileMeta.id
                  ? {
                      ...prev.file,
                      progress: Math.round((loadedBytes / fileMeta.file.size) * 100),
                    }
                  : prev.file,
            }))
          },
        })

        const props = await blockBlobClient.getProperties()

        setState((prev) => ({
          ...prev,
          file: {
            ...fileMeta,
            progress: 100,
            url: blockBlobClient.url,
            properties: props,
          },
          isUploading: false,
        }))

        onFileChange?.({
          ...fileMeta,
          progress: 100,
          url: blockBlobClient.url,
          properties: props,
        })
      } catch (err) {
        const message =
          err instanceof RestError ? err.message.split("\n")[0] : "Upload failed"
        setState((prev) => ({
          ...prev,
          error: message,
          isUploading: false,
        }))
      }
    },
    [onFileChange],
  )

  const setFile = useCallback(
    async (file: File) => {
      const error = validateFile(file)
      if (error) {
        setState({ file: null, isDragging: false, isUploading: false, error })
        onFileChange?.(null)
        return
      }

      // Delete previous file from Azure if exists
      const prevUrl = state.file?.url
      if (prevUrl) await deleteBlob({ url: prevUrl })

      const id = generateId(file)
      const preview = URL.createObjectURL(file)
      const fileMeta: FileWithMeta = { file, id, preview, progress: 0 }

      setState({ file: fileMeta, isDragging: false, isUploading: true })
      onFileChange?.(fileMeta)

      uploadToAzure(fileMeta)
    },
    [onFileChange, state.file, uploadToAzure, validateFile],
  )

  const clearFile = () => {
    if (state.file?.preview) URL.revokeObjectURL(state.file.preview)
    setState({ file: null, isDragging: false, isUploading: false, error: undefined })
    onFileChange?.(null)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
    setState((prev) => ({ ...prev, isDragging: false }))
  }

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setState((prev) => ({ ...prev, isDragging: true }))
  }

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setState((prev) => ({ ...prev, isDragging: false }))
  }

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
  }

  const openFileDialog = () => inputRef.current?.click()

  const getInputProps = (props: InputHTMLAttributes<HTMLInputElement> = {}) => ({
    ...props,
    type: "file",
    accept: props.accept || accept,
    onChange: handleFileChange,
    ref: inputRef,
  })

  return [
    state,
    {
      setFile,
      clearFile,
      handleFileChange,
      handleDrop,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      openFileDialog,
      getInputProps,
    },
  ]
}
