import writeText from 'copy-to-clipboard'
import { toast } from 'sonner'

export const copyToClipboard = (value?: string, title?: string) => {
  try {
    if (!value?.length) {
      toast.error('Cannot copy empty value to clipboard.')
      return
    }

    const normalizedValue = value?.toString()
    writeText(normalizedValue)
    toast.success(title ? `${title} copied` : 'Copied to clipboard')
  } catch (error) {
    toast.error('Sorry, copying to clipboard failed')
  }
}
