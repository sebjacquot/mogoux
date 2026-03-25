'use client'
import React, { useEffect, useState } from 'react'

type Stat = {
    label: string
    count: number | null
    href: string
    color: string
    emoji: string
}

const collections: Stat[] = [
    { label: 'Documents',        count: null, href: '/admin/collections/documents',                  color: '#e22b40', emoji: '📄' },
    { label: 'Médias',           count: null, href: '/admin/collections/medias',                     color: '#ff7979', emoji: '🖼️' },
    { label: 'Thématiques',      count: null, href: '/admin/collections/thematics',                  color: '#4a9eff', emoji: '🏷️' },
    { label: 'Lieux',            count: null, href: '/admin/collections/reference-locations',        color: '#50c878', emoji: '📍' },
    { label: 'Sections',         count: null, href: '/admin/collections/sections',                   color: '#f4a020', emoji: '📂' },
    { label: 'Utilisateurs',     count: null, href: '/admin/collections/users',                      color: '#9b59b6', emoji: '👤' },
]

const endpoints: Record<string, string> = {
    'Documents':    'documents',
    'Médias':       'medias',
    'Thématiques':  'thematics',
    'Lieux':        'reference-locations',
    'Sections':     'sections',
    'Utilisateurs': 'users',
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stat[]>(collections)

    useEffect(() => {
        const fetchStats = async () => {
            const updated = await Promise.all(
                stats.map(async (s) => {
                    try {
                        const res = await fetch(`/api/${endpoints[s.label]}?limit=0`, { credentials: 'include' })
                        const data = await res.json()
                        return { ...s, count: data?.totalDocs ?? null }
                    } catch {
                        return s
                    }
                })
            )
            setStats(updated)
        }
        fetchStats()
    }, [])

    return (
        <div style={{ padding: '0 0 48px 0', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

            {/* Bandeau d'en-tête */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1215 100%)',
                border: '1px solid #3a2020',
                borderRadius: '12px',
                padding: '32px 36px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
            }}>
                <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '12px',
                    background: '#e22b40',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 800, color: '#fff', flexShrink: 0,
                    letterSpacing: '-0.03em',
                }}>MO</div>
                <div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#f3f3f3', lineHeight: 1.2 }}>
                        Mémoires Ouvrières
                    </div>
                    <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                        Administration du webdocumentaire — Jean-Paul Goux
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '8px 16px',
                            background: '#e22b40', color: '#fff',
                            borderRadius: '8px', textDecoration: 'none',
                            fontSize: '13px', fontWeight: 600,
                            transition: 'opacity 0.15s',
                        }}
                    >
                        Voir le site ↗
                    </a>
                </div>
            </div>

            {/* Titre section stats */}
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contenu
            </div>

            {/* Grille de stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '32px',
            }}>
                {stats.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            borderRadius: '10px',
                            background: 'var(--theme-elevation-50, #1e1e1e)',
                            border: '1px solid var(--theme-elevation-100, #2a2a2a)',
                            textDecoration: 'none',
                            transition: 'border-color 0.15s, transform 0.15s',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color
                            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--theme-elevation-100, #2a2a2a)'
                            ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                        }}
                    >
                        <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.emoji}</div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 800,
                            color: s.color,
                            lineHeight: 1,
                            marginBottom: '4px',
                        }}>
                            {s.count === null ? '…' : s.count}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--theme-elevation-800, #aaa)', fontWeight: 500 }}>
                            {s.label}
                        </div>
                    </a>
                ))}
            </div>

            {/* Actions rapides */}
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Actions rapides
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                    { label: '+ Ajouter un document',  href: '/admin/collections/documents/create',            bg: '#e22b40' },
                    { label: '+ Ajouter un média',     href: '/admin/collections/medias/create',               bg: '#333' },
                    { label: '+ Ajouter une thématique', href: '/admin/collections/thematics/create',          bg: '#333' },
                    { label: '↩ Import documents',     href: '/admin/import-documents',                        bg: '#333' },
                ].map((btn) => (
                    <a
                        key={btn.label}
                        href={btn.href}
                        style={{
                            padding: '10px 18px',
                            borderRadius: '8px',
                            background: btn.bg,
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        {btn.label}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default AdminDashboard
