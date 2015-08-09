# App builder boilerplate

After rewriting this boilerplate build and watch scripts over and over again, I've finally compiled it into a cloneable repo.

Original inspiration from [Task Automation with Npm Run](http://substack.net/task_automation_with_npm_run). Lots of improvements and further inspiration from [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

## How to use

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
- sed

