# App builder boilerplate

`npm run test` runs all in `src` which matches `*.spec.js` with [tape](https://npmjs.com/package/tape).

`npm run build` makes a build with `NODE_ENV=production`.

`npm run watch` builds with `NODE_ENV=dev`. Rebuilds on every change.

Files are built with a version suffix into `pub/`, e.g. `pub/bundle-1.0.0.js`.

## Bundled deps

- [debug](https://npmjs.com/package/debug)

## Tools used in build

### CSS

- [postcss](https://npmjs.com/package/postcss)
    - [cssnext](https://npmjs.com/package/cssnext)

### JavaScript

- [browserify](https://npmjs.com/package/browserify)
    - [babelify](https://npmjs.com/package/babelify)
    - [envify](https://npmjs.com/package/envify)

### HTML

Only `__VERSION__` in the source is replace with version number from `package.json`.

- find
- send

