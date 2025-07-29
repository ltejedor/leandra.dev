export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

function extractTextFromNode(node: any): string {
  let text = '';
  
  if (node.type === 'text') {
    return node.text || '';
  }
  
  if (node.content) {
    for (const child of node.content) {
      text += extractTextFromNode(child);
    }
  }
  
  return text;
}

export function extractHeadings(content: any): TocHeading[] {
  const headings: TocHeading[] = [];
  const usedIds = new Set<string>();

  function traverse(node: any) {
    if (node.type === 'heading' && node.attrs?.level && node.content) {
      const level = node.attrs.level;
      const text = extractTextFromNode(node);
      
      if (text.trim()) {
        let baseId = generateSlug(text);
        let id = baseId;
        let counter = 1;
        
        // Ensure unique IDs
        while (usedIds.has(id)) {
          id = `${baseId}-${counter}`;
          counter++;
        }
        
        usedIds.add(id);
        headings.push({ id, text: text.trim(), level });
      }
    }

    if (node.content) {
      for (const child of node.content) {
        traverse(child);
      }
    }
  }

  if (content?.content) {
    for (const node of content.content) {
      traverse(node);
    }
  }

  return headings;
}
