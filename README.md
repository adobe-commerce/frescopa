# Frescopa Site Project

Code repo powering https://www.frescopacommerce.com which is to be used for Adobe Summit 2026 for Lab 321

The code in this repo is based on an older version of adobe-rnd/aem-boilerplate-xcom which is based on an older version of hlxsites/aem-boilerplate-commerce (commits unknown). Treat it as a "real" customer site in every way.

## Environments / Links

- Live: https://www.frescopacommerce.com/
- EDS: https://main--frescopa--adobe-commerce.aem.live/
- [DNS (Alex Jose's Account)](https://dash.cloudflare.com/97b0b4ad5b3fc87255d457b0d2d548f6/frescopacommerce.com)
- [Content (AEM Author) home page](https://author-p186773-e1975122.adobeaemcloud.com/ui#/@adobeshowcase/aem/universal-editor/canvas/author-p186773-e1975122.adobeaemcloud.com/content/frescopa/en/index.html)
- Prerender Repo: https://github.com/vjdandu/prerender-frescopacommerce
- [Prerender Deploy (staging)](https://developer.adobe.com/console/projects/1172492/4566206088345615860/workspaces/4566206088345650129/runtime/details) 
- LLMO: https://llmo.now/frescopacommerce.com/overview

## Login authoring

The `commerce-login` block already includes Universal Editor instrumentation and renders the Adobe Commerce authentication drop-in. It is available as **Account → Login** when adding a component to a section.

After deploying the authoring configuration, open the existing login page in Universal Editor, select a section (or add one to the empty page), and add **Account → Login**. Preview the sign-in form, then publish the page; a code deployment alone does not add or publish AEM content.

The section allowlist is maintained in `models/_section.json`. Run `npm run build:json` after editing authoring definitions, models, or filters, and commit the generated root `component-*.json` files. See [Creating Blocks Instrumented for use with the Universal Editor](https://www.aem.live/developer/universal-editor-blocks).
