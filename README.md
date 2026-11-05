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

## Login routing

The login document is published at `/signup/login` and contains the `commerce-login` block. Use `CUSTOMER_LOGIN_PATH` from `scripts/constants.js` with `rootLink()` for login navigation, including logout redirects and checkout registration links. Other customer account and password-recovery paths remain under `/customer`.
