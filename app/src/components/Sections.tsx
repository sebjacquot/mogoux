import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface Thematic {
  id: string
  title: string
  slug: string
}

interface Props {
  title: string
  sectionId: string
  color: string
  thematics: Thematic[]
}

export default function Sections({ title, sectionId, color, thematics }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <span
          className="inline-block w-4 h-4 rounded-sm flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-2xl font-bold text-secondary">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-3 pl-8">
        {Array.isArray(thematics) &&
          thematics.map((t: any, i: number) => {
            const slug = t.slug || t.id
            const label = t.title || t.value
            return (
              <Link
                key={i}
                href={`/thematiques/${slug}?section=${sectionId}`}
                className="px-4 py-2 rounded text-sm font-semibold no-underline text-secondary hover:opacity-80 transition-opacity"
                style={{ backgroundColor: color + 'CC' }}
              >
                {label}
              </Link>
            )
          })}
      </div>
    </div>
  )
}
