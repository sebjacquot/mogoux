import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    try {
        const res = await fetch(`${baseUrl}/api/medias/${id}`, {
            cache: 'no-store',
        })

        if (!res.ok) {
            return new NextResponse('Image introuvable', { status: 404 })
        }

        const media = await res.json()
        const url: string | undefined = media?.url

        if (!url) {
            return new NextResponse('Image introuvable', { status: 404 })
        }

        const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

        return NextResponse.redirect(absoluteUrl, {
            status: 301,
            headers: {
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch {
        return new NextResponse('Erreur serveur', { status: 500 })
    }
}
