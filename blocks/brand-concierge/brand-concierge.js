import { loadScript } from '../../scripts/aem.js';
import { brandConciergeStyleConfiguration } from './brand-concierge-config.js';

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
  const mount = document.createElement('div');
  mount.id = 'brand-concierge-mount';
  mount.className = 'personalization-container';
  block.append(mount);

  try {
    await getAlloyInitPromise();
    const { alloy } = window;
    const stylingConfigurations = brandConciergeStyleConfiguration;
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
