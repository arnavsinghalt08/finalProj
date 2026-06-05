import Anthropic from '@anthropic-ai/sdk'
import type { Config } from '@netlify/functions'

const anthropic = new Anthropic()

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let imageData: string
  try {
    const body = await req.json()
    imageData = body.imageData
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!imageData) {
    return Response.json({ error: 'No image data provided' }, { status: 400 })
  }

  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 64,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/png',
              data: base64Data,
            },
          },
          {
            type: 'text',
            text: 'This is a whiteboard drawing from a drawing-guessing game. What single object or concept does this drawing represent? Reply with ONLY the object name, 1-3 words, nothing else.',
          },
        ],
      },
    ],
  })

  const guess =
    message.content[0].type === 'text' ? message.content[0].text.trim() : 'Something mysterious'

  return Response.json({ guess })
}

export const config: Config = {
  path: '/api/guess-drawing',
}
