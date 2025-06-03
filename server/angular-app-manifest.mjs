
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/bank-form/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/bank-form"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23703, hash: '5cf371572379eb21361012e16fd903aeb10724a2d1dee732f191633750a452d7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17111, hash: '18e95ee60db07fdf77d50c989f6d3709c41d8fbd468eccbd7b35168df7abde14', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 152795, hash: 'dac2452e47eb6943c70a139a5777a781d49f8ffb05944d6efb231834e3781319', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-URF4TVC7.css': {size: 7147, hash: 'keGu+H2ZGCI', text: () => import('./assets-chunks/styles-URF4TVC7_css.mjs').then(m => m.default)}
  },
};
