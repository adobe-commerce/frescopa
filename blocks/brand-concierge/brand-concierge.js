export default function decorate(_block) {
  const brandConcierge = document.createElement('div');

  brandConcierge.textContent = 'Brand Concierge';

  _block.append(brandConcierge);
}
