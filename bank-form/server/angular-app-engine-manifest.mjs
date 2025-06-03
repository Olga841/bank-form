
export default {
  basePath: 'https://olga841.github.io/bank-form',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
