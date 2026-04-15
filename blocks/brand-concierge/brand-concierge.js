import { loadScript } from '../../scripts/aem.js';

/** Default Brand Concierge styling / copy; override with `window.styleConfiguration` before decorate. */
const brandConciergeStyleConfiguration = {
  metadata: {
    brandName: 'Fréscopa',
    version: '1.0.0',
    language: 'en-US',
    namespace: 'brand-concierge',
  },
  behavior: {
    multimodalCarousel: {
      cardClickAction: 'openLink',
    },
    input: {
      enableVoiceInput: false,
      disableMultiline: true,
      /** Pinned composer: adds `input-align-page-bottom` in the concierge UI (see Adobe main.js). */
      alignPageBottom: false,
      showAiChatIcon: {
        icon: 'test',
      },
    },
    chat: {
      messageAlignment: 'normal',
      messageWidth: '100%',
    },
    privacyNotice: {
      title: 'Privacy Notice',
      text: 'Your use of this automated chatbot constitutes your consent that the personal information you provide in the chat session \n      can be collected, used, disclosed, and retained by Frescopa and service providers acting on Frescopa\'s behalf \n      in accordance with the Frescopa {Privacy Policy}. Please do not provide sensitive personal information \n      (such as financial or health information) in the chatbot.',
      links: [
        {
          text: 'Privacy Policy',
          url: 'https://www.adobe.com/privacy/policy.html',
        },
      ],
    },
    meetingForm: {
      fieldsPerRow: 2,
      fieldLayoutRules: {
        textInputs: {
          allowTwoColumns: true,
          fieldTypes: ['string', 'email', 'tel', 'number'],
        },
        dropdowns: {
          allowTwoColumns: false,
          fieldTypes: ['select'],
          identifyBy: 'hasOptions',
        },
        checkboxes: {
          allowTwoColumns: false,
          fieldTypes: ['boolean', 'checkbox'],
        },
      },
      title: {
        text: 'Schedule meeting',
        alignment: 'left',
      },
      subtitle: {
        text: 'I\'d be happy to help you schedule a meeting! Please fill out the form below, and \n        we\'ll follow up with a calendar to confirm your day and time.',
        alignment: 'left',
      },
      buttons: {
        submit: {
          text: 'Schedule meeting',
          alignment: 'left',
        },
        cancel: {
          text: 'Cancel',
          alignment: 'left',
        },
      },
    },
    calendarWidget: {
      title: {
        text: 'Book a meeting',
        alignment: 'left',
      },
      subtitle: {
        text: 'Thanks! Here\'s a calendar where you can choose a time that works best for your schedule:',
        alignment: 'left',
      },
      postTitle: {
        text: 'Once confirmed, you\'ll receive a calendar invite with all the details. The specialist will already have this conversation context, \n        so no need to repeat anything. Looking forward to connecting you with the right expert!',
        alignment: 'left',
      },
      buttons: {
        confirm: {
          text: 'Schedule a meeting',
          alignment: 'left',
        },
        cancel: {
          text: 'Cancel',
          alignment: 'left',
        },
      },
    },
    productCard: {
      actionButtonSize: 'S',
    },
  },
  disclaimer: {
    text: 'AI responses may be inaccurate. Check answers and sources. {Terms}',
    links: [
      {
        text: 'Terms',
        url: 'https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html',
      },
    ],
  },
  text: {
    'welcome.heading': 'Explore what you can do with Fréscopa.',
    'welcome.subheading': 'Choose an option or tell us what interests you and we\'ll point you in the right direction.',
    'input.placeholder': 'Tell us what you\'re looking for today',
    'input.messageInput.aria': 'Message input',
    'input.send.aria': 'Send message',
    'input.aiChatIcon.tooltip': 'Ask AI',
    'input.mic.aria': 'Voice input',
    'card.aria.select': 'Select example message',
    'carousel.prev.aria': 'Previous cards',
    'carousel.next.aria': 'Next cards',
    'scroll.bottom.aria': 'Scroll to bottom',
    'error.network': 'I\'m sorry, I\'m having trouble connecting to our services right now.',
    'loading.message': 'Generating response from our knowledge base',
    'feedback.dialog.title.positive': 'Your feedback is appreciated',
    'feedback.dialog.title.negative': 'Your feedback is appreciated',
    'feedback.dialog.question.positive': 'What went well? Select all that apply.',
    'feedback.dialog.question.negative': 'What went wrong? Select all that apply.',
    'feedback.dialog.notes': 'Notes',
    'feedback.dialog.submit': 'Submit',
    'feedback.dialog.cancel': 'Cancel',
    'feedback.dialog.notes.placeholder': 'Additional notes (optional)',
    'feedback.toast.success': 'Thank you for the feedback.',
    'feedback.thumbsUp.aria': 'Thumbs up',
    'feedback.thumbsDown.aria': 'Thumbs down',
  },
  arrays: {
    'welcome.examples': [
      {
        text: 'Show me Medium Roast Coffees',
        image: 'https://www.frescopacommerce.com/media/catalog/product/c/o/coffee_medium_roast_1_sbustew17q0lohoy.png',
        backgroundColor: '#FFFFFF',
      },
      {
        text: 'Tell me about Sunshine Meadow Tea',
        image: 'https://www.frescopacommerce.com/media/catalog/product/s/u/sunshine_meadow-2_yb5bn29z0rh4nxap.png',
        backgroundColor: '#FFFFFF',
      },
      {
        text: 'Explore Single Serve Coffee Machines',
        image: 'https://www.frescopacommerce.com/media/catalog/product/m/a/machine_original_wszdikys0qwthqns.jpg',
        backgroundColor: '#FFFFFF',
      },
      {
        text: 'Show me Cappuccino Mugs',
        image: 'https://www.frescopacommerce.com/media/catalog/product/c/a/cappuccino_mug-3.png',
        backgroundColor: '#FFFFFF',
      },
    ],
    'feedback.positive.options': [
      'Helpful and relevant recommendations',
      'Clear and easy to understand',
      'Friendly and conversational tone',
      'Visually appealing presentation',
      'Other',
    ],
    'feedback.negative.options': [
      'Not helpful or relevant',
      'Confusing or unclear',
      'Too formal or robotic',
      'Poor visual presentation',
      'Other',
    ],
  },
  assets: {
    icons: {
      company: '',
    },
  },
  theme: {
    '--welcome-input-order': '3',
    '--welcome-cards-order': '2',
    '--welcome-heading-text-color': '#58181D',
    '--font-family': 'Baskerville, serif',
    '--color-primary': '#007bff',
    '--card-background-placeholder': '#FFFFFF',
    '--color-text': '#131313',
    '--line-height-body': '1.75',
    '--main-container-background': '#FFFFFF',
    '--input-height': '52px',
    '--input-height-mobile': '52px',
    '--input-border-radius': '12px',
    '--input-border-radius-mobile': '12px',
    '--input-background': '#FFFFFF',
    '--input-outline-color': 'linear-gradient(98.11deg,rgb(223, 138, 35) -4.21%,rgb(215, 211, 215) 35.46%,#592b02 68.67%,rgb(117, 54, 11) 104.7%)',
    '--input-outline-width': '2px',
    '--input-box-shadow': '0 4px 16px 0 #00000029',
    '--input-focus-outline-width': '2px',
    '--input-focus-outline-color': 'rgb(13, 12, 13)',
    '--input-font-size': '16px',
    '--input-text-color': '#292929',
    '--input-button-height': '32px',
    '--input-button-width': '32px',
    '--submit-button-fill-color': '#FFFFFF',
    '--submit-button-fill-color-disabled': '#C6C6C6',
    '--color-button-submit': '#292929',
    '--color-button-submit-hover': '#292929',
    '--input-button-border-radius': '8px',
    '--button-disabled-background': '#FFFFFF',
    '--disclaimer-color': '#4B4B4B',
    '--disclaimer-font-size': '12px',
    '--disclaimer-font-weight': '400',
    '--message-user-background': '#A33532',
    '--message-user-text': '#FFFFFF',
    '--message-border-radius': '10px',
    '--message-padding': '8px 16px',
    '--message-concierge-background': '#FFFFFF',
    '--message-concierge-text': '#292929',
    '--message-max-width': '100%',
    '--chat-interface-max-width': '768px',
    '--message-blocker-height': '105px',
    '--citations-text-font-weight': '700',
    '--citations-desktop-button-font-size': '14px',
    '--feedback-icon-btn-background': '#FFFFFF',
    '--feedback-icon-btn-hover-background': '#FFFFFF',
    '--feedback-icon-btn-size-desktop': '32px',
    '--feedback-container-gap': '4px',
    '--multimodal-card-box-shadow': 'none',
    '--border-radius-card': '16px',
    '--button-height-s': '30px',
    '--button-primary-background': '#3B63FB',
    '--button-primary-text': '#FFFFFF',
    '--button-primary-hover': '#274dea',
    '--button-secondary-border': '#2C2C2C',
    '--button-secondary-text': '#2C2C2C',
    '--button-secondary-hover': '#000',
    '--color-button-secondary-hover-text': '#FFFFFF',
    '--privacy-notice-background': '#FFFFFF',
    '--privacy-notice-padding': '10px 12px',
    '--privacy-notice-text-font-size': '12px',
    '--privacy-notice-title-font-size': '12px',
    '--message-concierge-link-decoration': 'underline',
  },
};

const ALLOY_SRC = 'https://d37g5vf7fkpdn6.cloudfront.net/alloy.js';
const CONCIERGE_MAIN_SRC = 'https://experience.adobe.net/solutions/experience-platform-brand-concierge-web-agent/static-assets/main.js';
const ALLOY_INSTANCE = 'alloy';

/**
 * The Web SDK bundle only attaches `window.alloy` after it reads `window.__alloyNS`
 * and upgrades each name’s pre-created queue (`window.alloy.q`). Without this stub
 * running *before* alloy.js loads, `window.alloy` stays undefined.
 * @see https://experienceleague.adobe.com/docs/experience-platform/edge/fundamentals/installing-the-sdk.html
 */
function ensureAlloyQueue() {
  if (
    window.__alloyNS?.includes(ALLOY_INSTANCE)
    && typeof window[ALLOY_INSTANCE] === 'function'
    && Array.isArray(window[ALLOY_INSTANCE].q)
  ) {
    return;
  }
  window.__alloyNS = [ALLOY_INSTANCE];
  window[ALLOY_INSTANCE] = function alloyQueue() {
    const args = Array.from(arguments);
    return new Promise((resolve, reject) => {
      window[ALLOY_INSTANCE].q.push([resolve, reject, args]);
    });
  };
  window[ALLOY_INSTANCE].q = [];
}

function getAlloyInitPromise() {
  if (!window.frescopaAlloyInitPromise) {
    window.frescopaAlloyInitPromise = (async () => {
      ensureAlloyQueue();
      await loadScript(ALLOY_SRC);
      const { alloy } = window;
      if (typeof alloy !== 'function') {
        throw new Error('Adobe Experience Platform Web SDK (alloy) failed to load.');
      }
      alloy('configure', {
        defaultConsent: 'in',
        edgeDomain: 'edge.adobedc.net',
        edgeBasePath: 'ee',
        datastreamId: 'e2729b7e-73d6-460f-af4c-0d9193b4c161',
        orgId: '20BC21DB696622C60A495EE0@AdobeOrg',
        debugEnabled: true,
        idMigrationEnabled: false,
        thirdPartyCookiesEnabled: false,
        prehidingStyle: '.personalization-container { opacity: 0 !important }',
      });
    })();
  }
  return window.frescopaAlloyInitPromise;
}

export default async function decorate(block) {
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'Frescopa Commerce home');
  logoLink.className = 'brand-concierge-logo-link';

  const logo = document.createElement('img');
  logo.className = 'frescopa-logo';
  logo.src = '/icons/frescopa_logo.svg';
  logo.alt = 'Frescopa Commerce';
  logoLink.append(logo);

  const mount = document.createElement('div');
  mount.id = 'brand-concierge-mount';
  mount.className = 'personalization-container';

  block.replaceChildren(logoLink, mount);

  try {
    await getAlloyInitPromise();
    const { alloy } = window;
    const stylingConfigurations = window.styleConfiguration ?? brandConciergeStyleConfiguration;
    window.styleConfiguration = stylingConfigurations;
    await alloy('sendEvent', {
      conversation: { fetchConversationalExperience: true },
    });
    await alloy('bootstrapConversationalExperience', {
      selector: '#brand-concierge-mount',
      src: CONCIERGE_MAIN_SRC,
      stylingConfigurations,
      stickySession: false,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Brand Concierge failed to initialize.', err);
  }
}
