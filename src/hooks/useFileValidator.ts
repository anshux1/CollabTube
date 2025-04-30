import { useCallback } from "react"

export type FileValidationOptions = {
  maxSize?: number // in bytes
  accept?: string // e.g., "image/png,.jpg,image/*"
}

export const useFileValidator = (options: FileValidationOptions = {}) => {
  const { maxSize = Infinity, accept = "*" } = options

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return `File exceeds size limit (${maxSize} bytes)`
      }

      if (accept !== "*") {
        const allowed = accept.split(",").map((t) => t.trim().toLowerCase())
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase() || ""}`

        const isValid = allowed.some((type) => {
          if (type.startsWith(".")) return type === fileExt
          if (type.endsWith("/*")) return file.type.startsWith(type.split("/")[0])
          return file.type === file.type.toLowerCase()
        })

        if (!isValid) {
          return `File type not allowed: ${file.name}`
        }
      }

      return null
    },
    [accept, maxSize],
  )

  return validateFile
}
