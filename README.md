# My React + TypeScript + Vite Template

When building projects, I often find myself repeating the same setup process, taking me about a day to actually start developing the app. Using the `react-ts` Vite template helps, but it's missing the tools I love to use on a daily basis.

This is where this template comes in, it's my personal setup for a React application built with TypeScript. It was bootstrapped with the [react-ts template](https://vitejs.dev/guide/), and is essentially a modified version of the template with tools and rules I use on a daily basis.

This `README` will cover the tools use and general purpose of each one and why I chose to use them.

## Table Of Contents

- [Techstack](#techstack)
- [Installing the Template](#installing-the-template)
- [Project Configuration](#project-configuration)
  - [ESLint](#eslint)
  - [Cypress](#cypress)
  - [Vite && Vitest](#vite--vitest)
  - [Linting + Husky](#linting--husky)
  - [Stylelint](#stylelint)
- [Other Tools](#other-tools)
  - [PostCSS](#postcss)
- [Conclusion](#conclusion)

## Techstack

The following are tools used to configure this application:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress](https://www.cypress.io/)
- [Vitest](https://vitest.dev/)
- [Stylelint](https://stylelint.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Vite](https://vitejs.dev/)
- [PostCSS](https://postcss.org/)

This template is used to build a product-ready Application with TypeScript, if your reading this I'm assuming you have experience with both React and TypeScript.

## Installing the Template

Simply cloning the repository is not a ideal since you will also end up cloning the project history, you don't want to see my terrible commit statements!

You can instead use the [degit](https://github.com/Rich-Harris/degit) tool to scaffhold the project, for example:

```bash
npx degit JorgeAMendoza/vite-react
```

Running the command above will essentially copy the repository to your machine without my terrible commit history. Please check out the documentation for `degit` to find other options to apply when cloning the repo.

## Project Configuration

This seciton will dicuss the configuration tools for this project, the settings made, and the reasons for their implementation.

### ESLint

ESlint is one of the most important linting tools we have, allowing us to provide strucutre and syntax rules on our code base to catch errors or bad practices being implemented by whoever is working on the project.

The ruleset provided by `react-ts` gives us a good base to work on, but other rule's I've picked up during my jourey have become essential to my workflow. I would like thank the [Top Ten ESLint Rules for any TypeScript Codebase](https://blog.stackademic.com/top-ten-lint-rules-for-any-typescript-codebase-cb3148e67aca) article, for providing recommendations for other ESLint rules.

Some of the plugins used include:

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react), provides us React speicfic rules
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), catch accessibility issues in React applications
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), enforce best practices for using hooks in React
- [plugin:@typescript-eslint/recommended-type-checked](https://typescript-eslint.io/linting/typed-linting/), enforce recommended TypeScript rules based on our `tsconfig.json` file an other recommended rules.

Other plugins include rules that has [ESLint play better with Prettier](eslint-config-prettier) and [lint cypress files](https://www.npmjs.com/package/eslint-plugin-cypress).

#### Personal Choices

Some other linting rules I implemented include:

- `no-console`, indicate an error when console logs are used
- `@typescript-eslint/naming-convention`, define struture of function, varible, and type names
- `semi`, never allow semi-colons
- `no-nested-ternary`, never allow nested ternaray options (it wracks my brain to read those so generally I don't prefer them!)
- `no-shadow`, never allow shadow variables (variables that share a name the function scope above it)

### Cypress

Cypress is my personal choice for end-to-end testing, [Playwright](https://playwright.dev/) is another great tool to use, but Cypress is test-runner I've grown accustomed to.

#### Cypress.config.ts

The Cypress configuration is relatively simple, these settings can be expanded for your preferences. See the code snippet for the `cypress.config.ts` below.

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents() {},
  },
})
```

- When running the Cypress application, tests will only be attempted once, while running it the command line will have it check one more time after a failed assertion.
- Our base URL is set to `localhost:3000`, Vite is also configured to open this port automatically in `dev` mode.

#### Typescript

When using Cypress with TypeScript, it is recommended to define another `tsconfig.json` file within your `/cypress` directory [in the documentation](https://docs.cypress.io/guides/tooling/typescript-support). It simply defines the target module, the types to check, and what files to target.

```typescript
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"],
  },
  "include": ["**/*.ts"],
}
```

### Vite && Vitest

The default Vite configuration has been modified to the following settings:

- In `dev` mode, open in port `3000`.
- In `production` mode, open the port `8080`
- An `@` alias has been defined to provide cleaner file importing when we are nested deeply in a file.

#### vite-imagetools

One of the best things about Vite is that there are a plethora of official and community plugins we can run through our application. I didn't want to overload the template with plugins that one may not use, but I wanted to recommend the [vite-imagetools](https://www.npmjs.com/package/vite-imagetools) plugin which allows one to optimize project image assets.

For example, in the `app.tsx`, we render a `blaze.jpg` image, but instead of rendering the base `.jpg` we provide the the following import statement.

```ts
import blazeImage from './assets/blaze.jpg?w=300&h=300&format=webp&imagetools'
```

This will generate a web optimzied `.webp` image that is _imported_ instead. So instead of having to convert and generate multiple images in your `/assets` folder, we can just have one base image, and generate multiple versions based on the args provided. Neat!

##### TypeScript Issues

When originally implementing the plugin, I ran into the issue where TypeScript recognized the import type of `any`. To solve this, the declaration file [global.d.ts](/src/global.d.ts) contains type information based on the module being imported. So if we end our import text with the string `&imagetools`, TypeScript knows a string is being returned.

Thank you [GitHub user albehrens](https://github.com/albehrens) for this contribution to the ["how to use typescript" discussion](https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1717056556) issue!

#### Vitest

Unit testing is another important step to code health. Sure, end-to-end test may cover more, but unit testing allow us to validate specific behaviors in our application in a more efficient manner. You'll see later that I have Vitest run on every `pre-commit`.

```ts
export default mergeConfig(
  config,
  defineConfig({
    resolve: {
      alias: {
        '@test': path.resolve(__dirname, './test'),
      },
    },
    test: {
      globals: true,
      setupFiles: path.resolve(__dirname, './test/setup.ts'),
      exclude: [...defaultExclude],
      environmentMatchGlobs: [
        ['**/*.test.tsx', 'jsdom'],
        ['**/*.component.test.tsx', 'jsdom'],
      ],
    },
  }),
)
```

From the `vitest.config.ts`, we define the alias `@test`, allowing us to easily access the setup and utility files within. For our testing options, we set our global jets variaables, define a setup file to be used, and set what files should be searched by Vitest. In this case `.tsx` and `test.tsx` fiels should be run using [jsdom](https://www.npmjs.com/package/jsdom).

#### Vitest Setup & Utilities

The `setup.ts` is empty since I want to keep it as basic as possible. The `utitilies.ts` file contains the `render` method, which wraps the `render` method from `@testing-library-react` into a function that does the following:

1. Takes in a ui element and render options to pass into the testing library `render` (which is now named `renderComponent).
2. Returns the `userEvent` setup result from the testing library.

Instead of having to import `userEvent` into every test file, we can now just import `render` from this utility file and get the user event object as well. We can also import all `@testing-library/library` methods from this module.

I first learned of this pattern from [Steve Kinney](https://github.com/stevekinney) in his awesome [Enterprise UI Development: Testing & Code Code Quality course](https://frontendmasters.com/courses/enterprise-ui-dev/) on [FrontendMasters](https://frontendmasters.com/). I highly recommend it!

I really like this pattern because it makes rendering components more organized, allows us to group renders if needed, and provides us a way wrap a component within a Context or Reducer.

### Linting + Husky

Before merging code into our repository, we would like to avoid inserting lint-errors, style errors, and other bad practices into our code-base. With the use of `lintstaged` and `husky` pre-commmits, we can can lint our staged files before a commit.

#### lint-staged

The lint-staged file `.lintstagedrc.cjs` is relatively simple:

1. Every JavaScript, JSX, TypeScript, and TypeScript file is ran through `eslint` and `prettier`, with each one fixing what it can.
2. CSS and SCSS files are ran through `stylelint` (discussed later) and fixed as well.
3. When input files are specified in the command line, the `tsconfig.json` file is ignored, this means we have to pass in a function that runs our script, which in this case is `npm run check:types` to validate our TS types.

#### Husky

A simple `pre-commit` is implemented and executes the following:

1. `npm test:changed`, runs Vitest, which will execute all test files in our project.
2. `npx lint-staged`, which runs lint-staged with the configuration provided in `.lintstagedrc.cjs`

The process is relatively fast, but the more files and test we add will make this process longer. However, the lint-staged configuration file provices the `--cache` option for some of the options to ensure we are only running the check on files that were modified.

The script `test:changed`, when used with Husky, will have the pre-commit only run test files that which have been modified or what they are testing has been modified. We can avoid running unit and component test again on commits where the files were not modified.

#### Stylelint

I'm a huge fan of CSS, I love writing my own CSS, but sometimes I implement bad practices or just write some bad CSS from time to time. Running `lint-staged` with `stylelint` allows our pre-commit to lint and fix our CSS and SCSS files. Again, we provide the `--cache` option to have it only run when `.CSS` or `SCSS` files were changed.

The `stylelintrc.json` implements a couple of rules.

- Do not display a warning when the `composes` keyword is used (for CSS Modules)
- Extend the recommended and prettier ruleset.
- Define a pattern that CSS class names should be written in.

## Other Tools

Some other configuration tools that are not discussed in this `README` include:

### PostCSS

PostCSS takes our CSS and modifies them with the plugins we provide, in this case:

1. [autoprefixer](https://www.npmjs.com/package/autoprefixer), which adds vendor prefixes to our CSS.
2. [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env), which allows us to use modern CSS features and have them transpiled to older CSS versions.
3. [postcss-focus](https://github.com/postcss/postcss-focus), provide `focus` pseudo-class for elements that have `:hover` as well.

## Conclusion

Generally, this is the setup I would use when developing a single-page React application. Libraries such as Redux and React-router should be simple to integrate into this set up.

In the future, I plan to develop templates for Next JS, Vanilla, and Web Component setups. Thank you for taking the time to read this `README`, I hope you find this template usefule! If you have any suggestions or recommendations, please feel free to open an issue or pull request!
