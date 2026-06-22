import { CollectionConfig } from "payload";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {SlateToLexicalFeature} from "@payloadcms/richtext-lexical/migrate";
import path from 'path';

export const Medias: CollectionConfig = {
    slug: "medias",
    admin: {
        useAsTitle: "filename",
    },
    defaultSort: "filename",
    labels: {
        singular: {
            en: 'Media',
            fr: 'Média',
        },
        plural: {
            en: 'Medias',
            fr: 'Médias',
        },
    },
    access: {
        read: () => true,
    },
    upload: {
        staticDir: path.resolve(process.cwd(), 'storage/medias'),
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/*"],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 140,
                height: undefined,
            },
            {
                name: "preview",
                width: 500,
                height: undefined,
            }
        ],
    },
    fields: [
        {
            name: "legende",
            label: "Légende",
            type: "richText",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})],
            }),
        },
    ]
};

export default Medias;
