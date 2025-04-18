import type { FieldHook, FieldHookArgs, PayloadRequest } from 'payload';

export const formatSlug = (value: string): string =>
    value
        .trim()
        .replace(/\s+/g, '-')          // remplace les espaces par des tirets
        .replace(/[^A-Za-z0-9-]/g, ''); // supprime les caractères spéciaux (majuscules conservées)

/**
 * Génère un slug unique dans une collection donnée
 */
const generateUniqueSlug = async (
    baseSlug: string,
    req: PayloadRequest,
    collection: string,
    documentId?: string
): Promise<string> => {
  let uniqueSlug = baseSlug;
  let count = 1;

  while (true) {
    const existingEntry = await req.payload.find({
      // @ts-ignore
      collection: collection,
      where: {
        slug: { equals: uniqueSlug },
        ...(documentId ? { id: { not_equals: documentId } } : {}),
      },
    });

    if (existingEntry.docs.length === 0) break;

    uniqueSlug = `${baseSlug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

/**
 * Hook réutilisable pour générer un slug unique pour n'importe quelle collection
 */
export const checkSlug = (collection: string): FieldHook => {
  return async ({ value, data, req, operation, originalDoc }: FieldHookArgs<any>) => {
    const base =
        value || data?.title || data?.identification?.title || '';

    const rawSlug = formatSlug(base);

    const uniqueSlug = await generateUniqueSlug(
        rawSlug,
        req as PayloadRequest,
        collection,
        operation === 'update' ? originalDoc?.id : undefined
    );

    return uniqueSlug;
  };
};