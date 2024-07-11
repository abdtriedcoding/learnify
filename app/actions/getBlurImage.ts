'use server'

import { getPlaiceholder } from 'plaiceholder'

export const getBase64 = async (imgsrc: string) => {
  try {
    const buffer = await fetch(imgsrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    )

    const { base64 } = await getPlaiceholder(buffer)
    return base64
  } catch (error: unknown) {
    return error
  }
}
