/**
 * Convertit du contenu RichText au format Lexical (Payload CMS v3) en HTML brut.
 *
 * ⚠ Cette fonction ne gère actuellement que les paragraphes et le formatage simple (gras, italique, souligné, barré).
 *
 * @param lexicalJSON - Un tableau de nœuds Lexical JSON (contenu du champ `richText`)
 * @returns Une chaîne HTML formatée, prête à être injectée dans Astro avec `set:html`
 *
 */
export function renderLexicalToHTML(lexicalJSON: any[]): string {
    return lexicalJSON.map((block) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
            const content = block.children.map((child: { type: string; text: string; format: any; }) => {
                if (child.type !== 'text') return '';

                let text = child.text || '';

                const format = child.format;

                if ((format & 1) === 1) text = `<strong>${text}</strong>`; // Gras
                if ((format & 2) === 2) text = `<i>${text}</i>`;         // Italique
                if ((format & 4) === 4) text = `<u>${text}</u>`;           // Souligné
                if ((format & 8) === 8) text = `<s>${text}</s>`;           // Barré

                return text;
            }).join('');

            return `<p>${content}</p>`;
        }

        return '';
    }).join('');
}