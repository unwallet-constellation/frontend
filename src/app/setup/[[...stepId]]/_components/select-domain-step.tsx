'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { ensRegistryCcipAbi, ensRegistryCcipAddress } from '@/wagmi.generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { namehash } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { normalize } from 'viem/ens'
import { useBlockNumber, useReadContract } from 'wagmi'
import * as z from 'zod'

import { DomainNameInput, DomainNameInputProps } from '@/components/domain-name-input'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { domainTld } from '@/config/domain-tld'

import { OnboardingStepComponentProps } from '../types'
import AINameIdeasList from './ai-name-ideas-list'

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .refine((name) => {
      try {
        return normalize(name) === name
      } catch (_) {
        return false
      }
    }, 'Name must be a valid ENS name.'),
})
type FormSchema = z.infer<typeof formSchema>

export default function SelectDomainStep(_: OnboardingStepComponentProps) {
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })
  const domainName = form.watch('name')

  // Fetch domain name availability
  const query = useReadContract({
    chainId: avalancheFuji.id,
    address: ensRegistryCcipAddress[avalancheFuji.id],
    abi: ensRegistryCcipAbi,
    query: { enabled: !!domainName && !form.formState.errors.name },
    functionName: 'recordExists',
    args: [namehash(`${domainName}.${domainTld}`)],
  })

  // Watch query
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: query.queryKey })
  }, [blockNumber, queryClient])

  const domainNameState: DomainNameInputProps['state'] = useMemo(() => {
    if (query.isLoading) return 'loading'
    if (query.isError || form.formState.errors.name) return 'invalid'
    if (domainName && query.data) return 'invalid'
    if (domainName && !query.data) return 'valid'
    return undefined
  }, [domainName, query.data, query.isLoading, query.isError, form.formState.errors.name])

  async function onSubmit({ name }: FormSchema) {
    const searchParams = new URLSearchParams({ domainName: name })
    router.push(`/setup/2?${searchParams}`)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex grow flex-col">
          <CardContent>
            <AINameIdeasList onNameSelected={(name) => form.setValue('name', name)} />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <DomainNameInput
                      placeholder="vitalik"
                      suffix={`.${domainTld}`}
                      state={domainNameState}
                      {...field}
                    />
                  </FormControl>

                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : query.isLoading ? (
                    <FormDescription>Availabiltity is fetched…</FormDescription>
                  ) : query.isError ? (
                    <FormDescription className="text-sm font-medium text-destructive">
                      Error while fetching name status.
                    </FormDescription>
                  ) : (
                    query.data && (
                      <FormDescription className="text-sm font-medium text-destructive">
                        Name is already taken.
                      </FormDescription>
                    )
                  )}
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-auto flex-col items-stretch gap-2">
            <Button
              type="submit"
              size="lg"
              disabled={domainNameState !== 'valid'}
              className="group"
            >
              <Sparkles size={16} className="mr-2 group-enabled:text-brand" />
              Select Domain
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}
