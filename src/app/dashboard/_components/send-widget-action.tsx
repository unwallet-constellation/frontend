import { ArrowUpFromDot } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export const SendWidgetAction = () => {
  return (
    <Button type="button" onClick={() => toast('Coming soon ser! 🚀')} variant="brand">
      <ArrowUpFromDot size={16} className="mr-2" />
      Send
    </Button>
  )
}
