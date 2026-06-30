import Link from 'next/link'

interface Props {
  linkURL: string
  linkText?: string
}

export default function Return({ linkURL, linkText = 'Retour' }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const href = linkURL.startsWith('http') ? linkURL : `${linkURL}`

  return (
    <div className="fixed top-0 left-20 z-[999] h-20 flex items-center pl-4 pr-4 bg-nav/90 backdrop-blur-sm" style={{ maxWidth: 'calc(100vw - 5rem)' }}>
      <Link
        href={href}
        className="text-secondary/70 text-sm uppercase tracking-widest no-underline flex items-center gap-2 hover:text-secondary transition-colors truncate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
        {linkText}
      </Link>
    </div>
  )
}
