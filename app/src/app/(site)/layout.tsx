import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Webdocumentaire Mémoires Ouvrières, Jean-Paul Goux',
  description:
    "Ce webdocumentaire présente une vaste documentation textuelle, photographique et sonore inédite autour de la mémoire ouvrière du Pays de Montbéliard et de l'ouvrage Mémoires de l'Enclave de Jean-Paul Goux.",
  keywords:
    "mémoire ouvrière, Jean-Paul Goux, histoire industrielle, Montbéliard, Japy, Peugeot, Sochaux, désindustrialisation",
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col min-h-screen bg-primary">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
