const ICON_CLASS = 'product-details__description-accordion__icon';

const PLUS_SVG = `<svg class="${ICON_CLASS}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/></svg>`;

const MINUS_SVG = `<svg class="${ICON_CLASS}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/></svg>`;

const TRIGGER_ID = 'product-details-description-trigger';
const PANEL_ID = 'product-details-description-panel';

/**
 * Renders the product description inside an accordion. The description content
 * is not in the DOM until the user expands the accordion (clicks +). When the
 * user closes the accordion, the content is removed from the DOM and will be
 * re-rendered on the next expand.
 *
 * @param {HTMLElement} container - Element to mount the accordion into
 * @param {Object} options
 * @param {string} [options.title='Description'] - Accordion section title
 * @param {boolean} [options.visible=true] - If false, container is hidden
 * @param {(el: HTMLElement) => Promise<void>} options.renderContent - Called on each expand
 */
export default function renderDescriptionAccordion(container, options = {}) {
  const {
    title = 'Description',
    visible = true,
    renderContent,
  } = options;

  if (!container || !renderContent) {
    return;
  }

  container.classList.add('product-details__description-accordion');

  if (!visible) {
    container.hidden = true;
    return;
  }

  let contentRendered = false;
  let contentRenderPromise = null;

  const header = document.createElement('button');
  header.type = 'button';
  header.className = 'product-details__description-accordion__trigger';
  header.setAttribute('aria-expanded', 'false');
  header.setAttribute('aria-controls', PANEL_ID);
  header.id = TRIGGER_ID;
  header.innerHTML = `<span class="product-details__description-accordion__icon-wrap">${PLUS_SVG}</span><span class="product-details__description-accordion__title">${escapeHtml(title)}</span>`;

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.className = 'product-details__description-accordion__panel';
  panel.hidden = true;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', TRIGGER_ID);

  const contentSlot = document.createElement('div');
  contentSlot.className = 'product-details__description-accordion__content';
  panel.appendChild(contentSlot);

  function clearContent() {
    contentSlot.replaceChildren();
    contentRendered = false;
    contentRenderPromise = null;
  }

  function setExpanded(open) {
    const isOpen = open === true;
    header.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
    const iconWrap = header.querySelector('.product-details__description-accordion__icon-wrap');
    if (iconWrap) {
      iconWrap.innerHTML = isOpen ? MINUS_SVG : PLUS_SVG;
    }
    if (!isOpen) {
      clearContent();
    }
  }

  header.addEventListener('click', async () => {
    const isCurrentlyOpen = header.getAttribute('aria-expanded') === 'true';

    if (isCurrentlyOpen) {
      setExpanded(false);
      return;
    }

    if (!contentRendered) {
      header.disabled = true;
      try {
        contentRenderPromise = contentRenderPromise ?? renderContent(contentSlot);
        await contentRenderPromise;
        contentRendered = true;
      } finally {
        header.disabled = false;
      }
    }

    setExpanded(true);
  });

  container.appendChild(header);
  container.appendChild(panel);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
