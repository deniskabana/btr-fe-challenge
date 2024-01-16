# Pokedex FE app

### Pending work

- **Important - Implement [gql error handling](https://www.apollographql.com/docs/apollo-server/data/errors/)**
- Husky pipeline

---

### Notes for reviewers

To test this application:

- I use yarn@4.0.2 (stable) as my go-to package manager and Node.js v20.6.0 (stable)
- I changed the default port from 3000 to 3091 on the frontend, so that it doesn't conflict with my other projects. This wouldn't have been done in a team environment.
- In any real project, I would **always** end up with CSS-in-JS approach for it's flexible nature and DX/UX benefits. Sass modules do not offer any type safety or auto-completion.

---

### Developer notes

- Decision to use `pages` instead of `app router` is due to stability concerns.
- I added `cors` middleware to express backend
- This is my first time using GQL in years, so I'd very much appreciate feedback
  - If I had the freedom to use REST API, I would use `@tanstack/query` and would implement `redux-persist` (or `localStorage` implementation) to allow for persisten caching, offline support and pre-loading. I would not use `WebWorkers`
- Using `@carbon/react` for the first time, due to time constraints I didn't have time to make it proper UI - with theme switching, proper design and DX/UX based layout planning
  - In my own projects, I mostly use `@mui/material` v5.x or css modules
