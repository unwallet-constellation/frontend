import { NextRequest, NextResponse } from 'next/server'

import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { z } from 'zod'

import { openai } from '@/config/openai'
import { getAndValidateRequestData } from '@/utils/get-and-validate-request-data'

export const runtime = 'edge'

const getUserPrompt = (
  amount: number,
) => `Custom Instruction: Craft Web3 usernames that can be loosely related to one of the following projects: 
- Chainlink (the decentralized Web3 oracle network),
- ENS (the Ethereum Name Service),
- Account Abstraction (the new wallet standard on EVM networks),
- Crypto Memes (e.g. pepe, degen, wojak, etc.).

Disallowed Results: linkoracle,enshandle,chainfeed,ethnamer,ensvision,linknode,oraclechain

Amount: ${amount}`

const SYSTEM_PROMPT = `# Instruction

You are a helpful assistant that replies with a list of creative social handles. You are always strictly following the requirements and defined output format below.

# Requirements

## Usernames

- Usernames should be between 4 and 12 characters long
- Usernames should only contain alphanumerical characters (lowercased) and optionally hyphens in between
- Usernames should adhere to the "Custom Instruction" provided
- Usernames should never contain the word "username" (this is just the example format)

## List

- The length of the list should be exactly equal to the "Amount" provided
- Comma-seperated list of usernames
- DO NOT include spaces after commas
- DO NOT use line breaks
- DO NOT enumerate the list

### Format

username1,username2,username3,username4,username5,...

# Examples

## Example 1

### User

Custom Instruction: Craft usernames that resonate with trending topics in blockchain, web3, and the cultural nuances of the crypto space, ensuring a modern and insightful connection to the digital frontier.

Input: web3

Quantity: 5

### Assistant

web3-degen,w3bthree,wizard3,hodl3r,web69

## Example 2

### User

Custom Instruction: Craft usernames that resonate with trending topics in blockchain, web3, and the cultural nuances of the crypto space, ensuring a modern and insightful connection to the digital frontier.

Quantity: 9

### Assistant

min3r,chainrider,cryptoninja,ethlord,digitrailblazer,tokenwhisperer,degen3,web3guru,decentralizoor`

const schema = z.object({
  amount: z.number().int().min(1).max(10),
})
export async function POST(req: NextRequest) {
  try {
    // Get and validate the request data.
    const { data, error } = await getAndValidateRequestData(req, schema)
    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
    const { amount } = data

    // Check if ideas are cached
    const cacheKey = `name-ideas-${amount}`
    const cached = await kv.get(cacheKey)
    if (cached) {
      const chunks = (cached as string).split('')
      const stream = new ReadableStream({
        async start(controller) {
          for (const chunk of chunks) {
            const bytes = new TextEncoder().encode(chunk)
            controller.enqueue(bytes)
          }
          controller.close()
        },
      })
      return new StreamingTextResponse(stream)
    }

    // Stream the ideas via OpenAI
    const USER_PROMPT = getUserPrompt(amount)

    const response = await openai.createChatCompletion({
      model: 'gpt-4-1106-preview',
      stream: true,
      temperature: 0.75,
      max_tokens: 250,
      frequency_penalty: 0.25,
      top_p: 1,
      presence_penalty: 0,
      n: 1,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: USER_PROMPT,
        },
      ],
    })

    // Convert the response to a text stream
    const stream = OpenAIStream(response, {
      onCompletion: async (completion: string) => {
        // Cache the ideas
        await kv.set(cacheKey, completion)
        await kv.expire(cacheKey, 10) // Expire in 10 seconds
      },
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
  }
}
