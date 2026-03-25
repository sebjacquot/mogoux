/**
 * Convertit du contenu RichText Lexical (Payload CMS v3) en HTML.
 */
export function renderLexicalToHTML(lexicalJSON: any[]): string {
  return lexicalJSON
    .map((block) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const content = block.children
          .map((child: { type: string; text: string; format: any }) => {
            if (child.type !== 'text') return ''
            let text = child.text || ''
            const fmt = child.format
            if ((fmt & 1) === 1) text = `<strong>${text}</strong>`
            if ((fmt & 2) === 2) text = `<i>${text}</i>`
            if ((fmt & 4) === 4) text = `<u>${text}</u>`
            if ((fmt & 8) === 8) text = `<s>${text}</s>`
            return text
          })
          .join('')
        return `<p>${content}</p>`
      }
      return ''
    })
    .join('')
}
