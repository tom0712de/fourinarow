
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/fourinarow"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 506, hash: '5ae332a1a8b532078ca1fe5e403b655d49f0244704c4d41000dd15497c74df83', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1019, hash: '356c1563581f3d41d89589732d644629de596c4f54b1f08b88d1ea63d0d74562', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'fourinarow/index.html': {size: 10285, hash: 'b8669dff5b17983c7c0010f11582964e0c6835b0faf54c1c69556a2661628f58', text: () => import('./assets-chunks/fourinarow_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
