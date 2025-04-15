import { CollectionConfig } from "payload";

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
            name: "name",
            label: "Nom",
            type: "text",
        },
    ]
};

export default Medias;