/**
 * Génère un chemin d'URL correct en ajoutant le préfixe défini dans `PUBLIC_BASE_URL`.
 *
 * Cette fonction est utilisée pour gérer les chemins des fichiers statiques (images, icônes, audio, etc.)
 * lorsque le site est hébergé sous un sous-chemin (ex: `/memoires-ouvrieres/`).
 *
 * @param path - Chemin relatif du fichier (ex: "/images/logo.png", "/audio/sample.wav").
 * @returns Le chemin complet avec le sous-chemin ajouté si défini (ex: "/memoires-ouvrieres/images/logo.png").
 *
 * Exemple d'utilisation :
 * asset("/images/logo.png") -> "/memoires-ouvrieres/images/logo.png" (si PUBLIC_BASE_URL = "/memoires-ouvrieres")
 * asset("/images/logo.png") -> "/images/logo.png" (si PUBLIC_BASE_URL est vide)
 */
export function asset(path: string): string {
  const base = import.meta.env.PUBLIC_BASE_URL || '';
  return `${base}${path}`;
}