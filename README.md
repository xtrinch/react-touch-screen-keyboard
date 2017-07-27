Boilerplate for developing ReactJS modules using Babel.

## Installation

`git clone --depth=1 --branch=master https://github.com/lassegit/npm-react-module CustomReactModule && cd $_ && sudo rm -r .git/`

Remove the `.git` folder and rename the component in `src/index.js`. Styles resides in `src/style.css`.

## Commands
- `npm run dev` - start webpack for module development. You can open `examples/index.html` and customize `examples/index.js` to test your code. Webpack config resides in `examples/webpack.config.js`.

- `npm run lint` - lint your code

- `npm run build` - build `/lib` folder

- `npm publish` - publish your package to npmjs.com. Remember to customize `package.json` to suit your custom module.

## Thanks

Build on top of: https://github.com/Travelport-Ukraine/npm-module-boilerplate
