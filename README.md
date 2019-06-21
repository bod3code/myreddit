# recentReactReader
A reader of recent content in react

# installation
`npm install`

# development
This includes a live reload development environment.
`npm run start` and look for your browser to open to `localhost:8080`

#tests
`jest`

#comments
This uses Babel for JavaScript compilation and Webpack for module bundling.
The source code is in `src/` and it gets built into the `dist/` folder.

The bulk of the code is in App.js

This uses React Hooks, `useState` and `useEffect` which are used to retrieve data and store the API response in `state` so that React can do its magic and update anything that needs to be updated by diffing the virtual dom.

