"use server"

import { messages } from "@/config/messages"
import { createActionWithAuth } from "@/lib/safe-action"
import { containerClient } from "@/lib/services/azure"
import { deleteBlobSchema } from "./schema"
import { InputTypeDeleteBlob, ReturnTypeDeleteBlob } from "./types"

const deleteBlobHandler = async (
  input: InputTypeDeleteBlob,
): Promise<ReturnTypeDeleteBlob> => {
  try {
    const url = new URL(input.url)
    const blobName = decodeURIComponent(url.pathname.split("/").slice(2).join("/"))
    const blobClient = containerClient.getBlockBlobClient(blobName)
    const res = await blobClient.deleteIfExists()
    if (res._response.status !== 202) {
      return { error: "Failed to delete image" }
    }
    return { data: messages.DELETE_BLOB.success }
  } catch {
    return { error: messages.DELETE_BLOB.success }
  }
}

export const deleteBlob = createActionWithAuth(deleteBlobSchema, deleteBlobHandler)
