'use client'
import React from 'react'

const AdminIcon: React.FC = () => {
    return (
        <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: '#e22b40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        }}>
            <span style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
            }}>
                MO
            </span>
        </div>
    )
}

export default AdminIcon
