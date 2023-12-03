'use client'

import { useRouter } from 'next/navigation'

import { DomainNameInput } from '@/components/domain-name-input'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  username: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
})

export default function PickDomainStep() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data })
    router.push('/onboard/2')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex grow flex-col gap-y-6">
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <DomainNameInput
                      placeholder="shadcn"
                      suffix=".unwallet"
                      state="invalid"
                      {...field}
                    />
                  </FormControl>
                  {!!form.formState.isValid && (
                    <FormDescription>Availabiltity is fetched…</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-auto flex-col items-stretch gap-2">
            <Button type="submit" size="lg">
              Register Domain
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}
