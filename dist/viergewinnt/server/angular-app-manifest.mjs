
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://tom0712de.github.io/fourinarow/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/fourinarow"
  },
  {
    "renderMode": 2,
    "route": "/fourinarow/game"
  },
  {
    "renderMode": 2,
    "route": "/fourinarow/party"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7580, hash: '561df0e7c3d6feb65e521c7d5ce6693c31f6bb922a8e13a75b38f307ce4abd1c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1047, hash: '9596afc6749b772e1e5b8f125b3539e21b284d500645da1b6dab00e44ec19900', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'game/index.html': {size: 25876, hash: 'da6d61989a2b16aed4b6f4c6369e636d4de70af8c5f49db9c48442e0e2a01278', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)},
    'index.html': {size: 29342, hash: '772d0533f5605c4a946625a6c9a4fad4878bcae6c398565e5bcde1184f66b540', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'party/index.html': {size: 30115, hash: '8b62fa7c5761e81ec8f2f831d31f6191a477568896a6759a3b376295d3d938f1', text: () => import('./assets-chunks/party_index_html.mjs').then(m => m.default)},
    'styles-VS7IRY2H.css': {size: 16950, hash: '2swwnPjxong', text: () => import('./assets-chunks/styles-VS7IRY2H_css.mjs').then(m => m.default)}
  },
};
