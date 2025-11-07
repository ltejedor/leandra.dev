import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Extension, Node } from '@tiptap/core';
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

// Custom HTML block extension
export const RawHTML = Node.create({
  name: 'rawHTML',
  
  group: 'block',
  
  atom: true,
  
  addAttributes() {
    return {
      html: {
        default: '',
        parseHTML: element => element.getAttribute('data-html'),
        renderHTML: attributes => {
          if (!attributes.html) {
            return {};
          }
          return {
            'data-html': attributes.html,
          };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-raw-html]',
        getAttrs: element => {
          const div = element as HTMLElement;
          return {
            html: div.getAttribute('data-html') || div.innerHTML,
          };
        },
      },
    ];
  },
  
  renderHTML({ node }) {
    // Return a DOMOutputSpec that works for both client and server
    // Store the HTML in a data attribute for post-processing
    return [
      'div',
      {
        'data-raw-html': '',
        'data-html': node.attrs.html,
        class: 'raw-html-block',
      },
    ];
  },
  
  addNodeView() {
    return ({ node, editor }) => {
      const dom = document.createElement('div');
      dom.classList.add('raw-html-block', 'border', 'border-gray-600', 'rounded-lg', 'p-4', 'my-4', 'bg-gray-900');
      dom.setAttribute('data-raw-html', '');
      dom.setAttribute('data-html', node.attrs.html || '');
      
      // Render the HTML
      dom.innerHTML = node.attrs.html || '<p class="text-gray-400 italic">Empty HTML block</p>';
      
      return {
        dom,
        contentDOM: null,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'rawHTML') return false;
          dom.innerHTML = updatedNode.attrs.html || '<p class="text-gray-400 italic">Empty HTML block</p>';
          dom.setAttribute('data-html', updatedNode.attrs.html || '');
          return true;
        },
      };
    };
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
