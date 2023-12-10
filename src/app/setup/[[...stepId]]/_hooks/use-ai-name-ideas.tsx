import { useEffect, useState } from 'react'

import { useCompletion } from 'ai/react'

export const useAINameIdeas = (amount: number) => {
  const { completion, complete, isLoading, error, stop } = useCompletion({
    api: '/api/openai/name-ideas',
  })

  const [nameIdeas, setNameIdeas] = useState<string[]>(Array(amount).fill(''))

  useEffect(() => {
    complete('', { body: { amount } })
    return stop
  }, [amount])

  useEffect(() => {
    const namesFromCompletion = parseDomainNamesFromCompletion(completion)
    setNameIdeas((_nameIdeas) => overrideArray(_nameIdeas, namesFromCompletion, !isLoading))
  }, [completion, isLoading])

  return { nameIdeas, isLoading, error }
}

/**
 * Parses the completion string from the OpenAI API into an array of domain names.
 */
function parseDomainNamesFromCompletion(completion: string): string[] {
  const parsedPrompt = completion.replaceAll(',,', ',').split(',')

  // Sanitize the domain name strings
  const names = parsedPrompt.map((name) => {
    let _name = name || ''
    _name = _name.trim()
    _name = _name.toLowerCase()
    _name = _name.replaceAll('_', '-')
    _name = _name = _name.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '')
    return _name
  })

  return names
}

/**
 * Overrides the values of an array with the values of another array in-place.
 */
function overrideArray(
  arrayToOverride: string[],
  overwritingArray: string[],
  done: boolean,
): string[] {
  return arrayToOverride.map((item1, i) => {
    const item2 = overwritingArray[i]
    // Check if arr2 has a value at the current index
    if (item2) {
      // Check if arr2 has a value at the current index + 1
      if (overwritingArray[i + 1] || done) {
        // If so return the value of arr2 at the current index
        return item2
      }
      // If not, override the string at the current index of arr1 with the string at the current index of arr2
      if (item2.length > item1.length) {
        return item2
      }
      const sub = item1.substring(item2.length)
      return item2 + sub
    }
    // If not, just return the item
    return item1
  })
}
