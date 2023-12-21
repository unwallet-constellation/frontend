/**
 * Get the URL of the current environment.
 */
export const getUrl = (withTrailingSlash?: boolean) => {
  let url =
    process?.env?.NEXT_PUBLIC_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000'

  // Include `https://` if not localhost
  url = url.includes('http') ? url : `https://${url}`

  // Append/remove trailing `/` if not present
  if (withTrailingSlash) {
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  } else {
    url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url
  }

  return url
}

/**
 * Helper that converts a relative path to an absolute URL.
 */
export const toAbsoluteUrl = (path: string) => {
  const url = getUrl()
  const _path = path.charAt(0) === '/' ? path.slice(1) : path
  return `${url}${_path}`
}
