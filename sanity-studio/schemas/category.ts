import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required().min(2).max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 32 },
      description:
        'Identificador URL-safe. Mantener valores estables: platos, pizzas, milanesas, guarniciones, sandwich.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      description: 'Orden de aparición (menor = primero).',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
