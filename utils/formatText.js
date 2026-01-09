export function formatText(content) {
  if (!content) return '';
  
  return content.replace(/&nbsp;/g, ' ');
}