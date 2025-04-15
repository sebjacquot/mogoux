import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  labels: {
    singular: {
      en: 'User',
      fr: 'Utilisateur',
    },
    plural: {
      en: 'Users',
      fr: 'Utilisateurs',
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "username",
      label: "Nom d'utilisateur",
      type: "text",
    },
  ],
}
