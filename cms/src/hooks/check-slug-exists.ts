import type { FieldHook } from "payload/types";
import payload from "payload";
import { ValidationError } from "payload/errors";

const formatSlug = (value: string): string => {
    return value
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "");
};

const checkSlugExists: FieldHook = async ({ value, req, operation }) => {
    if (operation === "create" || operation === "update") {
        if (!value || typeof value !== "string") {
            throw new ValidationError([{
                message: "Le slug est requis et doit être une chaîne de caractères.",
                field: "slug"
            }]);
        }

        if (/[^a-zA-Z0-9 -]/.test(value)) {
            throw new ValidationError([{
                message: "Le slug ne doit contenir que des lettres, des chiffres et des tirets (-).",
                field: "slug"
            }]);
        }

        const formattedSlug = formatSlug(value);

        // Récupérer l'ID du document en cours d'update
        let documentId = null;
        if (operation === "update" && req.params.id) {
            const existingDoc = await payload.findByID({
                collection: "medias",
                id: req.params.id,
            });
            documentId = existingDoc?.id;
        }

        const existingEntry = await payload.find({
            collection: "medias",
            where: {
                slug: { equals: formattedSlug },
                ...(documentId ? { id: { not_equals: documentId } } : {}), // Ignore l'élément actuel
            },
        });

        if (existingEntry.docs.length > 0) {
            throw new ValidationError([{
                message: `Le slug "${formattedSlug}" existe déjà. Veuillez en choisir un autre.`,
                field: "slug"
            }]);
        }

        return formattedSlug;
    }

    return value;
};

export default checkSlugExists;