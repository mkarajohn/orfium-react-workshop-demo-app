# Orfium React Workshop Demo App

First make sure you have installed the project dependencies

```bash
npm install
```

## Development

After all dependencies are installed, run 

```bash
node src/backend/api.cjs
```

or the equivalent

```bash
npm run api
```

in order to run the API server for posting and getting our blog posts.

Finally, run

```bash
npm run dev
```

in order to start our auto-refreshing development server.

## Production

To build your app and serve it from a content delivery server you first need to run

```bash
npm run build
```

and after that operation has completed run

```bash
node src/backend/server.cjs
```

or the equivalent

```bash
npm run server
```

to start the content server.

Don't forget that your API server must be running as well.