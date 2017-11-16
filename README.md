// GENERAL EXPLANATION FOR CONFIGS (PACKAGE, TSCONFIG, ROLLUP) TO CREATE AN NPM COMPATIBLE ANGULAR MODULE/LIBRARY
// Based on:
// https://medium.com/@cyrilletuzi/how-to-build-and-publish-an-angular-module-7ad19c0b4464
// https://hackernoon.com/how-to-create-library-in-angular-2-and-publish-to-npm-from-scratch-f2b1272d6266

// PACKAGE = Project definition (version, authors, dependencies, entry point (module))...
{
  "name": "angular-yeahmaker",
  "version": "1.0.0",
  "description": "An yeahmaker module for Angular.",
  // Distribution files
  "main": "bundles/yeahmaker.umd.js", // Universal
  "module": "index.js", // ES2015
  "typings": "index.d.ts", // Where live the typings for our project
  "keywords": ["angular"],
  "author": "Jorge & Aleix",
  "license": "MIT",
  "peerDependencies": { // Dependencies needed and versions compatibility
    "@angular/core": ">= 5.0.0"
  },
  "devDependencies": {
    "@angular/compiler": "^5.0.1",
    "@angular/compiler-cli": "^5.0.1",
    "@angular/core": "^5.0.1",
    "rollup": "^0.51.5",
    "rxjs": "^5.5.2",
    "typescript": "2.4.2",
    "uglify-js": "^3.1.9",
    "zone.js": "^0.8.18"
  },
  "scripts": { // Actions Index
    "transpile": "ngc", // AOT: Angular compiles the code before
    "package": "rollup -c", // Creates the bundle
    "minify": "uglifyjs dist/bundles/yeahmaker.umd.js --screw-ie8 --compress --mangle --comments --output dist/bundles/yeahmaker.umd.min.js",
    "build": "npm run transpile && npm run package && npm run minify"
  },
  "dependencies": {}
}

// TSCONFIG = Typescript configuration
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "module": "es2015", // Use ES2015 (ES6) Modules to allow bundlers tree shaking 
    "target": "es5", // Compile to ES5, broadly supported
    "outDir": "dist", // Where the bundle will go
    "sourceMap": true, // Allows easy debugging
    "declaration": true, // Emit types to allow the library users consume it
    "moduleResolution": "node",
    "stripInternal": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true, 
    "strictNullChecks": true,
    "noImplicitAny": true,
    "paths": {
      "@angular/core": ["node_modules/@angular/core"]
    },
    "inlineSources": true,
    "skipLibCheck": true,
    "lib": [
      "es2015", 
      "dom"
    ]
  },
  "files": [
    "index.ts" // File that will be generated
  ],
  "angularCompilerOptions": {
    "strictMetadataEmit": true // Make it AOT compatible
  }
}

// ROLLUP.CONFIG (BUNDLER)
export default {
  input: 'dist/index.js', // Where is the code to bundle
  output:{
      file: 'dist/bundles/yeahmaker.umd.js', // Bundle in UMD (broadly compatible)
      format: 'umd',
  },
  sourceMap: false, // Allow to easy debug
  name: 'ng.yeahmaker',
  globals: {
    '@angular/core': 'ng.core', // This source will be readed from the global space
  },
  external: [ '@angular/core' ] // This source will be provided in runtime
}

// STEPS

/* 
1 - npm install (will install devDependencies)
2 - npm run build
3 - npm adduser (or login in npm)
4 - Add packaje.json to /dist
5 - cd dist && npm publish
In the project where you want to use it:
5 - npm install angular-yeahmaker --save
6 - Import and include it in "imports" in the module you want to use it
    import { YeahMakerModule } from 'angular-yeahmaker';
*/

