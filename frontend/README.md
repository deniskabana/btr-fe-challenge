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

### Pending work

- **Important - Implement [gql error handling](https://www.apollographql.com/docs/apollo-server/data/errors/)**
- Husky pipelines (not important tbh)

---

### Notes for reviewers

- I **intentionally** chose to use BT's requested frameworks and tech, since I found it to be a fun little challenge to push myself. It worked, I had fun!
- I use yarn@4.0.2 (stable) as my go-to package manager and Node.js v20.6.0 (stable)
- I changed the default port from 3000 to 3091 on the frontend, so that it doesn't conflict with my other projects. This wouldn't have been done in a team environment.
- In any real project, I would **always** end up with CSS-in-JS approach for it's flexible nature and DX/UX benefits. Sass modules do not offer any type safety or auto-completion.
- Known bug: transition of button icons

---

### Developer notes

- Decision to use `pages` instead of `app router` is due to stability concerns.
- I added `cors` middleware to express backend
- This is my first time using GQL in years, so I'd very much appreciate feedback
  - If I had the freedom to use REST API, I would use `@tanstack/query` and would implement `redux-persist` (or `localStorage` implementation) to allow for persisten caching, offline support and pre-loading. I would not use `WebWorkers`
- Using `@carbon/react` for the first time, due to time constraints I didn't have time to make it proper UI - with theme switching, proper design and DX/UX based layout planning
  - In my own projects, I mostly use `@mui/material` v5.x or css modules
- I hate myself for the regex I've written for scss classNames, but before I realized my fuck-up I already had way too much stuff going on and chose to not refactor this.
- Light and dark mode can be switched manually (with no support for remembering choices - like local/session storage) but **is derived from the client machine dark-mode preference**.
