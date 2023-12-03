'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

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
import { ensRegistryABI, ensRegistryAddress } from '@/wagmi.generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { namehash } from 'viem'
import { mainnet } from 'viem/chains'
import { useContractRead } from 'wagmi'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
})
type FormSchema = z.infer<typeof formSchema>

export default function PickDomainStep() {
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })
  const domainName = form.watch('name')

  // TODO
  // Fetch domain name availability from PublicResolver
  const contractRead = useContractRead({
    chainId: mainnet.id,
    address: ensRegistryAddress[1],
    abi: ensRegistryABI,
    enabled: !!domainName && !form.formState.errors.name,
    functionName: 'recordExists',
    args: [namehash(`${domainName}.eth`)],
  })

  const domainNameState: DomainNameInputProps['state'] = useMemo(() => {
    if (contractRead.isLoading) return 'loading'
    if (contractRead.isError || form.formState.errors.name) return 'invalid'
    if (domainName && contractRead.data) return 'invalid'
    if (domainName && !contractRead.data) return 'valid'
    return undefined
  }, [
    domainName,
    contractRead.data,
    contractRead.isLoading,
    contractRead.isError,
    form.formState.errors.name,
  ])

  async function onSubmit({ name }: FormSchema) {
    const searchParams = new URLSearchParams({ domainName: name })
    router.push(`/onboard/2?${searchParams}`)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex grow flex-col">
          <CardContent>
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
                  ) : contractRead.isLoading ? (
                    <FormDescription>Availabiltity is fetched…</FormDescription>
                  ) : contractRead.isError ? (
                    <FormDescription className="text-sm font-medium text-destructive">
                      Error while fetching name status.
                    </FormDescription>
                  ) : (
                    contractRead.data && (
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
