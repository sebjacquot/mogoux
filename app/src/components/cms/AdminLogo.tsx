'use client'
import React from 'react'

const AdminLogo: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '4px 0',
            gap: '2px',
            userSelect: 'none',
        }}>
            <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#f3f3f3',
                lineHeight: 1,
            }}>
                Mémoires Ouvrières
            </span>
            <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: '#e22b40',
                lineHeight: 1,
            }}>
                Jean-Paul Goux — Administration
            </span>
        </div>
    )
}

export default AdminLogo
