# Typescript Lib with Storybook

This project is a template to build a TypeScript library (either in React or with any other library) pre-configured to run a Storybook and to produce a library file with types definitions. Tests engine also included, provided by Jest.

## Overview

The usual development flow involves starting a Storybook server which serves as a playground for the components in the library and start hacking in a new or existent element in the `src` folder. It is possible to work on a component without making use of Storybook at all by setting up an `npm link` (more notes on that below).

This project is prepared to run tests using the power of [Jest](https://jestjs.io) and its [snapshots](https://jestjs.io/docs/en/snapshot-testing). Please refer to the docs or inspect the tests folders to get an idea of how they work.

As part of the `build` process ESLint is run, and errors and unsatisfied linting rules do break the build. It is highly recommended to use VSCode with the settings described below.

## Setup

First you need to make sure you are using the `node` version specified in the `.nvmrc` file. This is very important in case you want to develop a new component using `npm link` to test it directly in your host project. Run `nvm use` to switch to the version this project needs. After that, you only need to run `npm ci` to install the project.

```
nvm use && npm ci
```

Why `npm ci` and not `npm install`? As this project relies on React and some other peer dependencies, it is safer to use `npm ci`, which uses the `package-lock.json` file to download dependencies that in turns adheres to the versions defined in this file. That means that all the developers in the team will share exactly the same versions of all the dependencies in the project. Save `npm install` for cases in which you need to install new dependencies and when you DO want to modify the `package-lock.json`.

## Running the Storybook

The most usual way to develop is to run the Storybook server and add new stories here, which will make use of your component. For this, just run `npm run storybook`. The dev server will start and you can use the other components currently present as a reference to start a new one.

## Tests

If your component/module is new, you only have to create a `__tests__` folder to start adding tests. Whenever your tests are run for the first time, `Jest` will create snapshots with the output of such tests. Read the docs about snapshot testing in [Jest's website](https://jestjs.io/docs/en/snapshot-testing). There are a few commands related to tests:

- `npm run test:dev`: run existent tests against their previous snapshots
- `npm run test:coverage`: reports coverage on current code base.
- `npm run test:update`: update tests snapshots. Be careful about this one, before commiting your changes to `git` make sure that you are only updating the snapshots for YOUR tests, otherwise it would mean that you are changing others' components behavior. Refer to jest docs for more information.

## Running with `npm link`

You can test any component in the context of the host project by using `npm link`.

- Check that both projects have a `.nvmrc` file and that both versions are the same. This is the most important step, otherwise the `link` won't work, as the sym link is created within the folder of the current `node` version.
- Inside this project's folder, run `npm link` (you'll see that a sym link is created with its path)
- Go to the host project. Run `nvm use` to make sure you are using the proper node version (remember, **it needs to be** the same version as in this project!).
- Now run: `npm link <this package.json name property>`.

Now you should be able to start the host project. Everytime you make an edition in any of the files of `<this project>` you could run `npm build` (slow) or just run once `npm build-watch` (faster, but keep reading to see the caveats) and code normally.

The difference between `npm build` and `npm build-watch` is that the later just runs the TypeScript compiler while the former also copies static files like images from the source folder to the build folder. Unless you are working in a component that relies on the static files (and you are changing those files) the `build-watch` command should be enough most of the time.

## Build

Once your component/module is finished, you can try that the publishing of the whole library will be succesful and that the `import` statements from the host project will work as expected (with the types properly exported and so on). To do so, a quick way that does not involves actual publishing to the NPM registry is by the usage of the command `npm pack`.

```
# In <this project folder> folder
$ npm run build
# ...Wait for above command to be succesful
$ npm pack
```

This will create a file called something like `<this project name>-0.0.1.tgz`. Put it in your home folder:

```
$ mv ./<this project name>-0.0.1.tgz ~/
```

Now go to your host project, eg: `host-project`. Open its `package.json` and remove the `<this project name>` entry from there if it is present. Go to the same folder in your terminal and run the following:

```
# in host-project folder
$ rm -rf ./node_modules
$ npm install ~/<this project name>-0.0.1.tgz --save-dev
$ npm install
```

You might want to check that your `./node_modules` folder has the dependency installed. VSCode will start showing you errors/suggestions on any TypeScript file in that project that makes use of components/modules in `<this project name>`. **Important:** for the types to work as expected you must use `<this project name>` from TypeScript files! If your file ends in `.js` or `.jsx` rename it to `.ts` or `.tsx` (if contains JSX tags). This is not mandatory, though, as components imported from this library will still work (it's just plain JavaScript after all), but you won't have static type checking.

## Publishing

If the library is ready to be published to the NPM Registry, do the following.

- Make sure you are in `master` branch.
- Increment version in `package.json`, commit, but **DO NOT PUSH YET**.
- Make sure there are no other pending files or changes to be commited/pushed besides the previous change in the version.
- Run `npm publish --access=public`
- Wait for it to be succesful. If it fails, revert your local commit and troubleshoot the problem before trying again.
- If it was succesful, now create a git tag for the version that was just-published.
- `git tag v0.x.x` (replace with proper version).
- `git push origin HEAD --tags`
- Go to your host project and update the version for `<this project name>`.

## VSCode Settings

VSCode is not required to run the project. You can run the code using whatever editor suits you, but the lint warnings and `prettier` strictness will bother you everytime you try to build the code. To avoid these annoyances, you can set up VSCode with the following settings.

- Make sure to download the following extensions for VSCode (in brackets is the package name for reference, so you don't install a different extension with a similar name)
  - ESLint (`dbaeumer.vscode-eslint`)
  - AutoTrim (`nathanridley.autotrim`)
- With the project folder open in VSCode, save the workspace somewhere in your disk (press `Cmd + Shift + P` and type "Save workspace as").
- Open the workspace file in whatever editor you want. VSCode itself can be used for this.
- Add the following settings to your `settings` section in the workspace file. They will allow the ESLint plugin to validate your code and apply corrections automatically (when possible).

Example of a `workspace.code-workspace` file:

```json
{
  "settings": {
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      {
        "language": "typescript",
        "autoFix": true
      },
      {
        "language": "typescriptreact",
        "autoFix": true
      }
    ],
    "editor.renderControlCharacters": true,
    "javascript.implicitProjectConfig.checkJs": false,
    "editor.renderWhitespace": "all",
    "vetur.format.defaultFormatter.js": "prettier-eslint",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "javascript.format.enable": true,
    "typescript.format.enable": true,
    "vetur.format.defaultFormatter.ts": "prettier",
    "eslint.enable": true,
    "javascript.validate.enable": true,
    "typescript.validate.enable": true,
    "editor.formatOnSave": true
  }
}
```

Most settings are self explanatory but `renderWhitespace` and `renderControlCharacters` will help you a lot when Prettier reports whitespace violations. Feel free to make any change, this setup is provided as a reference.

## Post Install Step

The library `styled-components` doesn't play well with TypeScript definitions. A simple hack described in https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311#issuecomment-560230205 runs on the package's `postinstall` script and deletes ReactNative's module definitions.
