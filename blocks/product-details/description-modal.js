const CLOSE_SVG = '<svg class="product-details__description-modal__close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/></svg>';

const MODAL_ID = 'product-details-description-modal';

/**
 * Renders a trigger that opens a modal with the product description. Neither
 * the modal nor the description content exist in the DOM until the user clicks
 * the trigger. On close, the overlay is removed from the DOM (removeChild), so
 * the modal and description are no longer in the document.
 *
 * @param {HTMLElement} container - Element to mount the trigger into
 * @param {Object} options
 * @param {string} [options.title='More details'] - Modal title and trigger label
 * @param {boolean} [options.visible=true] - If false, container is hidden
 * @param {(el: HTMLElement) => Promise<void>} options.renderContent - First open only; mount into
 *   `el`.
 */
export default function renderDescriptionModal(container, options = {}) {
  const {
    title = 'More details',
    visible = true,
    renderContent,
  } = options;

  if (!container || !renderContent) {
    return;
  }

  container.classList.add('product-details__description-modal');

  if (!visible) {
    container.hidden = true;
    return;
  }

  let contentRendered = false;
  let contentRenderPromise = null;
  let currentOverlay = null;
  let closeModalRef = null;

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'product-details__description-modal__trigger';
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.textContent = title;

  const contentSlot = document.createElement('div');
  contentSlot.className = 'product-details__description-modal__content';

  function clearContent() {
    contentSlot.replaceChildren();
    contentRendered = false;
    contentRenderPromise = null;
  }

  function handleEscape(e) {
    if (e.key === 'Escape' && closeModalRef) {
      closeModalRef();
    }
  }

  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.id = MODAL_ID;
    overlay.className = 'product-details__description-modal__overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'product-details-description-modal-title');

    const dialog = document.createElement('div');
    dialog.className = 'product-details__description-modal__dialog';

    const header = document.createElement('div');
    header.className = 'product-details__description-modal__header';
    const titleEl = document.createElement('h2');
    titleEl.id = 'product-details-description-modal-title';
    titleEl.className = 'product-details__description-modal__title';
    titleEl.textContent = title;
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'product-details__description-modal__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = CLOSE_SVG;

    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    dialog.appendChild(header);
    dialog.appendChild(contentSlot);
    overlay.appendChild(dialog);

    function closeModal() {
      trigger.setAttribute('aria-expanded', 'false');
      document.body.removeEventListener('keydown', handleEscape);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      clearContent();
      currentOverlay = null;
      closeModalRef = null;
    }

    closeModalRef = closeModal;
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    return overlay;
  }

  async function openModal() {
    if (!currentOverlay) {
      currentOverlay = buildOverlay();
      document.body.appendChild(currentOverlay);
      document.body.addEventListener('keydown', handleEscape);
    }

    if (!contentRendered) {
      trigger.disabled = true;
      try {
        contentRenderPromise = contentRenderPromise ?? renderContent(contentSlot);
        await contentRenderPromise;
        contentRendered = true;
      } finally {
        trigger.disabled = false;
      }
    }

    currentOverlay.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    const closeBtn = currentOverlay.querySelector('.product-details__description-modal__close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  trigger.addEventListener('click', () => openModal());
  container.appendChild(trigger);
}
