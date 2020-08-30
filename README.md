# Project Title

assets-entities, its a web app to fetch data from an endpoint and display as a grid view assets and entities related

![GIF](/Excelsensedemo.gif)

# Features

- Node server API and React Redux application
- Node with ES6 features (uses import statements)
- Separeted config for build react and node with babel
- Webpack builds vendor an main css and js hashed files to prevent browser future updates chaching
- Client side with React + Redux with Redux Thunk, components with prop-types
- eslint custom config
- Uses pm2 for production start, forks one app instance for each core avaiable in deployment server
- Builds webpack and build version directly on depployment server
- Documented following JSdoc standard

## Getting Started

### Installing

To download the project use git clone

```
Git clone https://github.com/carloscorti/assets-entities.git
```

On projects root folder, install dependencies

```
npm i
```

### Development

First

```
npm run webpack
```

Starts webpack watching file for development

Then

```
npm run dev
```

Runs the app in the development mode. Open http://localhost:5000 to view it in the browser. The page will reload if you make edits.

### Production (follow the order below)

First

```
npm run build-webpack
```

Builds the app for production in ./public/build folder. The build is minified and the filenames include the hashes to prevent bowser cache in future updates.

Secondly

```
npm run build-node
```

Builds the node server with ES6 features. It builds server aplication on ./build

Finally

```
npm start
```

Starts app for production (uses pm2 for core load optimization)

## Deployment

Production version deployed at https://excelsense-assets-entities.herokuapp.com/

## Built With

- Dependency Manager: npm
- Server side: Node + Express
- Bundler: webpack + babel
- Client side: React + Redux with Redux Thunk

## Author

- **Carlos Corti**
