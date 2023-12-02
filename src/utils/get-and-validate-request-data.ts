import { ZodObject, ZodRawShape, z } from 'zod'

type Request = {
  json: () => Promise<unknown>
}

/**
 * Get and validate data provided in the request of a nextjs api route.
 *
 * @param req The nextjs request object.
 * @param schema The zod schema to validate the data against.
 * @returns Promise resolving to the data if successful, or an error if not.
 */
export async function getAndValidateRequestData<T extends ZodObject<ZodRawShape>>(
  req: Request,
  schema: T,
  /* This typescript syntax will show data as defined if the error is undefined, and vice versa. */
): Promise<{ data: z.infer<T>; error: undefined } | { data: undefined; error: Error }> {
  try {
    const data = await req.json()

    /* Validate the data, not using safeParse since req.json() could also throw an error. */
    schema.parse(data)

    return { data: data as z.infer<T>, error: undefined }
  } catch (error: any) {
    return { data: undefined, error }
  }
}
