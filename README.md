# Is your UUID unique?

Find out if your UUID is unique using this simple website.

## Features

* Uses an in-memory cache to make the API 🔥BLAZINGLY FAST🔥
* Limits the cache size so the program only uses about 250 MB in memory
* Doesn't actually store any data, so I can run it forever without someone
  flooding the database.
* Uses the user's `localStorage` to store their list of queries so if they spam
  the same URL repeatedly it won't overload the server as much.
* Shhhhhh don't tell anyone that it's fake.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

* Why would you want to?
* If you still want to, use Docker, there's a `docker-compose.yml` for your
  deployment enjoyment.
