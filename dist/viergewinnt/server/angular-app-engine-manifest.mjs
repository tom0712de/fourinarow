
export default {
  basePath: 'https://tom0712de.github.io/fourinarow',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
