import { revalidatePage } from '@/hooks/revalidatePage'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ req }) => req.user?.id,
    },
  ],
  upload: true,
  // upload: {
  //   adminThumbnail: 'thumbnail',
  //   imageSizes: [
  //     {
  //       name: 'thumbnail',
  //       width: 300,
  //     },
  //     {
  //       name: 'square',
  //       width: 500,
  //       height: 500,
  //     },
  //     {
  //       name: 'small',
  //       width: 600,
  //     },
  //     {
  //       name: 'medium',
  //       width: 900,
  //     },
  //     {
  //       name: 'large',
  //       width: 1400,
  //     },
  //   ],
  // },
}
