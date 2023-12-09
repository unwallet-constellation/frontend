import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils/cn'

import { useAINameIdeas } from '../_hooks/use-ai-name-ideas'

interface AiDomainIdeasListProps {
  onNameSelected: (name: string) => void
}
export default function AiNameIdeasList({ onNameSelected }: AiDomainIdeasListProps) {
  const { nameIdeas } = useAINameIdeas(6)

  return (
    <div className="mb-4 flex flex-col gap-3">
      <Label>Ideas by AI 💡</Label>
      <div className="flex flex-wrap gap-2 [&>*:nth-child(n+4)]:hidden [&>*:nth-child(n+4)]:sm:flex">
        {nameIdeas.map((name, index) => (
          <Button
            type="button"
            onClick={() => onNameSelected(name)}
            key={`idea-${name}-${index}`}
            variant="outline"
            size="sm"
            className={cn('min-w-[7rem] grow font-mono', !name && 'animate-pulse')}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
