export default function renderAttributes(container, attributes = []) {
  const attributesDiv = document.createElement('div');
  const attributesHEader = document.createElement('h3');
  attributesHEader.textContent = 'Attributes:';
  container.appendChild(attributesHEader);
  attributesDiv.className = 'pdp-attributes';
  container.appendChild(attributesDiv);
  attributes
    .filter((attribute) => Boolean(attribute?.value))
    .forEach((attribute) => {
      const attributeDiv = document.createElement('ul');
      attributeDiv.innerHTML = `<li class="">
      ${attribute.label}:
      <span>${attribute.value}</span>
      </li>
    `;
      attributesDiv.appendChild(attributeDiv);
    });
}
