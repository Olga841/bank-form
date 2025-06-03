
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://olga841.github.io/bank-form/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/bank-form"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23728, hash: 'cf815256bbeb391eba466fed0ff399b13e4712ab3f8f39a031e848ada2519013', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17136, hash: 'ece75f214e79da78e359ab238e6e32ce8cf66efeebef3e1d0d58d2c35ca2a8c8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 152820, hash: 'e4e5357b9d41d2111aaaa29580b1114b8079f00800f7dc10d0129f628a1d7d0f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-URF4TVC7.css': {size: 7147, hash: 'keGu+H2ZGCI', text: () => import('./assets-chunks/styles-URF4TVC7_css.mjs').then(m => m.default)}
  },
};
