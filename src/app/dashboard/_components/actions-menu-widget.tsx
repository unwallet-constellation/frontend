import { FC } from 'react'

import { Coins, Gamepad2, LucideIcon, Shapes, Users } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function ActionsMenuWidget() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MenuAction title="Invest" icon={Coins} />
      <MenuAction title="Collect" icon={Shapes} />
      <MenuAction title="Social" icon={Users} />
      <MenuAction title="Gaming" icon={Gamepad2} />
    </div>
  )
}

interface MenuActionProps {
  title: string
  icon: LucideIcon
}
const MenuAction: FC<MenuActionProps> = ({ title, icon: Icon }) => {
  return (
    <Button
      type="button"
      onClick={() => toast('Coming soon ser! 🚀')}
      className="group h-auto rounded-lg border bg-card py-4 shadow-sm hover:bg-gray-900"
      variant="secondary"
    >
      <div className="mr-3 shrink-0 rounded bg-gray-900 p-2 transition-colors group-hover:bg-brand">
        <Icon size={18} className="text-brand transition-colors group-hover:text-gray-900" />
      </div>
      <div className="transition-colors group-hover:text-white">{title}</div>
    </Button>
  )
}
