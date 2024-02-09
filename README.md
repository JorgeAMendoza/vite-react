# My React + TypeScript + Vite Template

When building projects, I often find myself repeating the same setup process, taking me about a day to actually start developing the app. Using the `react-ts` Vite template helps, but it's missing the tools I love to use on a daily basis.

This is where this template comes in, its my personal setup for a React application built with TypeScript. It was bootstrapped with the [react-ts template](https://vitejs.dev/guide/), it's essentially a modified version of the template with tools and rules I use on a daily basis.

This `README` will cover the tools use and general purpose of each one and why I chose to use them.

# Techstack

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

This template is meant to build a product-ready Application with TypeScript, if your reading this I'm assuming you have experience with both React and TypeScript so there isn't a need to explain those two.

# Installing the Template

Simply cloning the repository is not a ideal solution since you will also end up cloning the project history, you don't want to see my terrible commit statments.

You can instead use the [degit](https://github.com/Rich-Harris/degit) tool to scaffhold the project, for example:

```bash
npx degit JorgeAMendoza/vite-react
```

Running the command above will essentially copy the repository to your machine without my terrible commit history. Please check out the documentation for `degit` to find other options to apply when cloning the repo.

# Project Configuration

This seciton will dicuss the configuration tools for this project, the settings made, and the reasons for their implementation.

## ESLint

ESlint is one of the most important linting tools we have, allowing us to provide strucutre and syntax rules on our code that allow us to catch errors or bad practices being implemented by people working on the project.

The ruleset provided by `react-ts` already gives us a good base to work on, but other rule's I've picked up during my jourey have become essential to my workflow. I would like thank the [Top Ten ESLint Rules for any TypeScript Codebase](https://blog.stackademic.com/top-ten-lint-rules-for-any-typescript-codebase-cb3148e67aca) article, for providing recommendations for other ESLint rules.

Some of the plugins used include:

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react), provides us React speicfic rules
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), catch accessibility issues in React applications
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), enforce best practices for using hooks in React
- [plugin:@typescript-eslint/recommended-type-checked](https://typescript-eslint.io/linting/typed-linting/), enforce recommended TypeScript rules based on our `tsconfig.json` file an other recommended rules.

Other plugins include those to have [ESLint play better with Prettier](eslint-config-prettier) and [linting cypress files](https://www.npmjs.com/package/eslint-plugin-cypress).

### Personal Choices

Some other linting rules I implemented include:

- `no-console`, indicate an error when console logs are used
- `@typescript-eslint/naming-convention`, define struture of function, varible, and type names
- `semi`, never allow semi-colons
- `no-nested-ternary`, never allow nested ternaray options (it wracks my brain to read those so generally I don't prefer them!)
- `no-shadow`, never allow shadow variables (variables that share a name the function scope above it)

## Cypress

Cypress is my personal choice for end-to-end testing, [Playwright](https://playwright.dev/) is another great tool to use, but Cypress is test-runner i've grown accustomed to at this point.

### Cypress.config.ts

Nothing too complex setup for the Cypress configuration, these general rules can be expanded for your preferred settings. See the code snippet for the `cypress.config.ts` below.

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

- When running the Cypress application, test will only attempt once, while running it the command line will have it check again if the test fails.
- Our base URL is set to `localhost:3000`, Vite is also configured to open this port automatically in `dev` mode.

### Typescript

When using Cypress with TypeScript, it is recommended to define another `tsconfig.json` file within your `/cypress` directory. It simply defines the target module, the types to check, and what files to target.

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

## Vite && Vitest

The default Vite configuration has been changed to the following preferred settings.

- In `dev` mode, open in port `3000`.
- In `production` mode, open the port `8080`
- An `@` alias has been defined to provide cleaner file importing when we are nested deeply in a file.

### vite-imagetools

One of the best things about Vite is that there are a plethora of official and community plugins we can run through our application. I didn't want to overload the template with plugins that one may not use, but I wanted to recommend the [vite-imagetools](https://www.npmjs.com/package/vite-imagetools) plugin which allows one to optimize project image assets.

For example, in the `app.tsx`, we render a `blaze.jpg` image, but instead of rendering the base `.jpg` we provide the the following import statement.

```ts
import blazeImage from './assets/blaze.jpg?w=300&h=300&format=webp&imagetools'
```

This will generate a web optimzied `webp` image that is rendered instead. So instead of having to convert and generate multiple images in your `/assets` folder, we can just have one base image, and generate multiple versions based on the args.

#### TypeScript Issues

When originally implementing the plugin, I ran into the issue where TypeScript recognized the import type of `any`. To solve this, the declaration file [global.d.ts](/src/global.d.ts) contains type information based on the module being imported. So if we end our import text with the string `&imagetools`, TypeScript knows a string is being returned.

Thank you [GitHub user albehrens](https://github.com/albehrens) for this contribution to the the ["how to use typescript" discussion](https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1717056556)!

### Vitest

Unit testing is another important process we must handle during development. Sure, end-to-end test may cover more, but unit testing allow us to validate specific behaviors in our application in a more efficient manner. You'll see later that I have Vitest run on every `pre-commit`.

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

From the `vitest.config.ts`, note that we define the alias `@test`, allowing us to easily access the files within. For our testing options, we set our global jets variaables, define a setup file to be used if we want other options, and set what files should be searched by Vitest. In this case `.tsx` and `test.tsx` fiels should be run through [jsdom](https://www.npmjs.com/package/jsdom).

#### Vitest Setup & Utilities

The `setup.ts` is empty since I want to keep it as basic as possible. The `utitilies.ts` file contains the `render` method, which wraps the `render` methon from `@testing-library-react` into a function that does the following:

1. Takes in a ui element and render options to pass into the testing library `render` (which is now named `renderComponent).
2. Returns the `userEvent` setup result from the testing library.

Instead of having to import `userEvent` into every test file, we can now just import `render` from this utility file and get the user event object as well. We can also import all `@testing-library/library` methods from this file as well.

I first learned of this pattern from [Steve Kinney](https://github.com/stevekinney) in his awesome [Enterprise UI Development: Testing & Code Code Quality course](https://frontendmasters.com/courses/enterprise-ui-dev/) on [FrontendMasters](https://frontendmasters.com/). I highly recommend it!

I really like this pattern because it makes rendering components more organized, allows us to group renders if needed, and provides us a way wrap a component within a Context or Reducer.

## Linting + Husky

Before merging code into our repository, we would like to avoid inserting lint-errors, style errors, and general bad practices into our code-base. With the use of `lintstaged` and `husky` pre-commmits, we can can lint our staged files before a commit.

### lint-staged

The lint-staged file `.lintstagedrc.cjs` is relatively simple:

1. Every JavaScript, JSX, TypeScript, and TypeScript file is ran through `eslint` and `prettier`, with each one fixing what it can.
2. CSS and SCSS files are ran through `stylelint` (discussed later) and fixed as well.
3. When input files are specified in the command line, the `tsconfig.json` file is ignored, this means we have to pass in a functoin that runs our script, which in this case is `npm run check:types` to validate our TS types.

### Husky

A simple `pre-commit` is implemented and executes the following:

1. `npm test`, runs Vitest, which will execute all test files in our project.
2. `npx lint-staged`, which runs lint-staged with the configuration provided in `.lintstagedrc.cjs`

The process is relatively fast, but the more files and test we add will make this process longer. However, the lint-staged configuration file provices the `--cache` option for some of the options to ensure we are only running the check on files that were modified.

This configuration doesn't cache our test, so every Vitest test will run on a commit, I plan to research ways to implement this feature.
test the commit.

### Stylelint
