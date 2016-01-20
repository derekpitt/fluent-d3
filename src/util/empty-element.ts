export default function empty(node: Element) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
