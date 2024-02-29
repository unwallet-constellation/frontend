import { FC, useEffect, useMemo } from 'react'

import { ensRegistryCcipAbi, ensRegistryCcipAddress } from '@/wagmi.generated'
import { useQueryClient } from '@tanstack/react-query'
import { cva } from 'class-variance-authority'
import { Loader } from 'lucide-react'
import { namehash } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useBlockNumber, useReadContract } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { domainTld } from '@/config/domain-tld'

import { useAINameIdeas } from '../_hooks/use-ai-name-ideas'

const nameButtonVariants = cva('min-w-[7rem] grow font-mono', {
  variants: {
    isLoading: {
      true: 'pointer-events-none animate-pulse',
    },
    isTaken: {
      true: 'pointer-events-none text-muted-foreground line-through',
    },
  },
})

interface AiDomainIdeasListProps {
  onNameSelected: (name: string) => void
}
export default function AINameIdeasList({ onNameSelected }: AiDomainIdeasListProps) {
  const { nameIdeas, isLoading } = useAINameIdeas(6)

  return (
    <div className="mb-4 flex flex-col gap-3">
      <Label className="flex items-center justify-between">
        <span>Ideas by AI 💡</span>
        {isLoading && (
          <Loader className="animate-spin text-muted-foreground/50 ease-in-out" size={14} />
        )}
      </Label>
      <div className="flex flex-wrap gap-2 [&>*:nth-child(n+4)]:hidden [&>*:nth-child(n+4)]:sm:flex">
        {nameIdeas.map((name, index) => (
          <AINameIdeaButton key={`idea-${name}-${index}`} {...{ name, onNameSelected }} />
        ))}
      </div>
    </div>
  )
}

interface AINameIdeaButtonProps extends AiDomainIdeasListProps {
  name: string
}
const AINameIdeaButton: FC<AINameIdeaButtonProps> = ({ name, onNameSelected }) => {
  // Fetch domain name availability
  const query = useReadContract({
    chainId: avalancheFuji.id,
    address: ensRegistryCcipAddress[avalancheFuji.id],
    abi: ensRegistryCcipAbi,
    query: { enabled: !!name },
    functionName: 'recordExists',
    args: [namehash(`${name}.${domainTld}`)],
  })

  // Watch query
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: query.queryKey })
  }, [blockNumber, queryClient])

  const isLoading = useMemo(() => !name, [name])
  const isTaken = useMemo(() => !query.isLoading && query.data, [query.data, query.isLoading])

  return (
    <Button
      type="button"
      onClick={() => onNameSelected(name)}
      variant="outline"
      size="sm"
      disabled={isLoading || isTaken}
      className={nameButtonVariants({ isLoading, isTaken })}
    >
      {name}
    </Button>
  )
}
