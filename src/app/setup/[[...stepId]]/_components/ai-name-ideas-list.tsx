import { FC, useMemo } from 'react'

import { ensRegistryCcipABI, ensRegistryCcipAddress } from '@/wagmi.generated'
import { cva } from 'class-variance-authority'
import { namehash } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useContractRead } from 'wagmi'

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
  const { nameIdeas } = useAINameIdeas(6)

  return (
    <div className="mb-4 flex flex-col gap-3">
      <Label>Ideas by AI 💡</Label>
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
  const contractRead = useContractRead({
    chainId: avalancheFuji.id,
    address: ensRegistryCcipAddress[avalancheFuji.id],
    abi: ensRegistryCcipABI,
    enabled: !!name,
    watch: true,
    functionName: 'recordExists',
    args: [namehash(`${name}.${domainTld}`)],
  })

  const isLoading = useMemo(() => !name, [name])
  const isTaken = useMemo(
    () => !contractRead.isLoading && contractRead.data,
    [contractRead.data, contractRead.isLoading],
  )

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
