export default {
    input: 'dist/index.js',
    output:{
        file: 'dist/bundles/yeahmaker.umd.js',
        format: 'umd',
    },
    sourceMap: false,
    name: 'ng.yeahmaker',
    globals: {
      '@angular/core': 'ng.core',
    },
    external: [ '@angular/core' ]
  }