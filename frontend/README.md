# Pokedex FE app

### Getting started

Assumed `cwd` is the `./frontend` directory

- Getting started
  - verify correct yarn version: `yarn --version # 4.0.2`
  - if you don't have yarn, install it: `npm i -g yarn`
  - if you have yarn, update it: `yarn set version 4.0.2`
  - some users might need to run `enable corepack` first
  - install dependencies: `yarn`
- Starting the app: `yarn dev`
  - if you are developing actively, also run `cd ../backend/ && npm i && npm start` to start the backend server
  - if you are working with graphql queries, run `yarn codegen` or consider even `--watch` flag

---

### Missing in this demo...

As it is with PoCs, prototypes and demo projects, I decided to cut some corners and not implement some features. Here's a list of things I would have done in a real project:

- **Important [gql error handling](https://www.apollographql.com/docs/apollo-server/data/errors/)**
- Modal for quick view of pokemon details
  - This one is easy and I've done it many times. I would've created a `uniModal` context and component (either Carbon's implementation or `createPortal`) and created new query to get pokemonById with limited subset of data
  - Upon clicking a pokemon card, I would've dispatched an action to open the modal, fetch a tad bit more info about pokemon (so detail page doesn't lose purpose) and then just shown some extra data.
- Husky pipelines (not important tbh)

#### Known bugs

- Button>Icon transitions are botched due to my pseudo-successful attempt to override Carbon's default theme (this turned out to be a fucking nightmare)
- _Backend bug_ - when retrieving Pokemon by name, requesting `evolutions` should return `[Pokemon!]!`, but it returns a limited subset (**not documented**). This means `pokemonByName("Bulbasaur") { evolutions { types } }` throws 500.

---

### Notes for reviewers

- I **intentionally** chose to use your requested frameworks and tech, since I found it to be a fun little challenge to push myself. It worked, I had fun! Disclaimer: I had prior real-world experience with Next.js and Node.js, but nothing else used here!
- I'm using yarn@4.0.2 (stable) as my go-to package manager and Node.js v20.6.0 (stable) as the engine
- I changed the default port from 3000 to 3091 on the frontend, so that it doesn't conflict with my other projects. This wouldn't have been done so abruptly in a team environment.
- My go-to structure in Next.js project is **feature-splitting**. Encapsulating and isolating most logic of a tuple in a single place (e.g. `@/src/components/pokemon/*`)
- In a real project, I would personally end up using CSS-in-JS approach for it's flexible nature and DX/UX benefits. Sass modules do not offer any type safety or auto-completion and using it feels very 2012 - or I just haven't found those since it's my first time using Sass in **years**. Wasn't suicide inducing, actually. In contrast with some other methodologies...

---

### Author's notes

- Decision to use `/pages` instead of `/app` router is due to future stability concerns.
- I added `cors` middleware to the express backend
- I decided not to use any state management library or methodology. If it wasn't a test project I'd implement a simple `React.context` to store in-session data.
- This is my first time using GQL in years, so I'd very much appreciate feedback
  - If I had the freedom to use REST API, I would use `@tanstack/query` and would implement `redux-persist` (or `localStorage` implementation) to allow for effective caching, offline support and pre-loading. I would not use `WebWorkers`, I can do this all reliably in the main thread.
- I am using `@carbon/react` for the first time. In my own projects, I mostly use `@mui/material` v5.x or css modules. **My opinion about carbon so far** is that it's oxymoronically too ridgid and flexible at the same time, with poor and often times incoherent documentation and is very obviously not written with first-class TS support - as my `tsc` built the app, but console gave me some `propTypes` error. Also, too much flexibility warrants for a lot tighter QA and UI control processes. I would not use this in a real project if I wouldn't be instructed to.
- I hate myself for the regex I've written for scss classNames, but before I realized my fuck-up I already had way too much stuff going on and chose to not refactor this.
- Light and dark mode can be switched manually (with no support for remembering choices - like local/session storage) but **is derived from the client machine dark-mode preference**.
- You can find a lot of inline comments, often highlighting how I would've created a proper implementation or use the correct techniques.
