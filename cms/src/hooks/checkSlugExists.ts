import type { FieldHookArgs, PayloadRequest } from "payload";

const formaterSlug = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const generateUniqueSlug = async (baseSlug: string, req: PayloadRequest, documentId?: string): Promise<string> => {
  let uniqueSlug = baseSlug;
  let count = 1;

  while (true) {
    const existingEntry = await req.payload.find({
      collection: "medias",
      where: {
        slug: { equals: uniqueSlug },
        ...(documentId ? { id: { not_equals: documentId } } : {}),
      },
    });

    if (existingEntry.docs.length === 0) break; // Slug unique trouvé

    uniqueSlug = `${baseSlug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

const checkSlugExists = async ({ value, data, req, operation, originalDoc }: FieldHookArgs<any>): Promise<string> => {

  let slugValue = value;

  const title = data?.title || data?.identification?.title;

  if (!slugValue && title) {
    slugValue = formaterSlug(title);
  } else {
    slugValue = formaterSlug(slugValue || "");
  }

  // Vérifier et forcer un slug unique avant l'enregistrement
  const uniqueSlug = await generateUniqueSlug(slugValue, req, operation === "update" ? originalDoc?.id : undefined);

  return uniqueSlug;
};

export default checkSlugExists;