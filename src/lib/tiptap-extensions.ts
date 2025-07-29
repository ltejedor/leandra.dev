import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Extension } from '@tiptap/core';
import type { TocHeading } from './toc-utils';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

const HeadingWithId = Extension.create({
  name: 'headingWithId',
  
  addGlobalAttributes() {
    return [
      {
        types: ['heading'],
        attributes: {
          id: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.id) {
                return {};
              }
              return { id: attributes.id };
            },
          },
        },
      },
    ];
  },
});

export function getExtensionsWithIds(headings: TocHeading[]) {
  // Create a map of heading text to IDs for quick lookup
  const headingIdMap = new Map<string, string>();
  headings.forEach(({ text, id }) => {
    headingIdMap.set(text.trim(), id);
  });

  return [
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          class: 'scroll-mt-8', // Add scroll margin for better anchor positioning
        },
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-xl max-w-full h-auto my-8 border border-[var(--color-border)] shadow-xl hover:shadow-2xl transition-shadow duration-300 relative',
        style: 'box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 107, 53, 0.1);'
      },
    }),
    HeadingWithId,
  ];
}

export const defaultExtensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-xl max-w-full h-auto my-8 border border-[var(--color-border)] shadow-xl hover:shadow-2xl transition-shadow duration-300 relative',
      style: 'box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 107, 53, 0.1);'
    },
  }),
];
