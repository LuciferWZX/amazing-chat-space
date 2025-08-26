const EMOJI_CACHE_NAME = 'emoji-images-v1'
/**
 * 初始化emoji缓存
 * @returns
 */
export async function initEmojiCache() {
  const cache = await caches.open(EMOJI_CACHE_NAME)
  return cache
}

/**
 * 缓存emoji图片
 * @param url
 * @returns
 */
export async function cacheEmojiImage(url: string) {
  const cache = await caches.open(EMOJI_CACHE_NAME)
  try {
    const response = await fetch(url)
    if (response.ok) {
      await cache.put(url, response)
    }
    return response
  }
  catch (error) {
    console.error(`Failed to cache emoji image: ${url}`, error)
  }
}
/**
 * 获取缓存的emoji图片
 * @param url
 * @returns
 */
export async function getCachedEmojiImage(url: string) {
  const cache = await caches.open(EMOJI_CACHE_NAME)
  return await cache.match(url)
}
