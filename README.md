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
● How is your code structured, and why?
This uses Babel for JavaScript compilation and Webpack for module bundling.
The source code is in `src/` and it gets built into the `dist/` folder.

The bulk of the code is in App.js

This uses React Hooks, `useState` and `useEffect` which are used to retrieve data and store the API response in `state` so that React can do its magic and update anything that needs to be updated by diffing the virtual dom.

I've started a `src/components` directory as a place to put our components that we build for this app

I'm using functional components instead of what has traditionally been React class components, using the Hooks with functional components has simplified the code considerably.

● How does updated data change your application’s state?
When the user changes the search field (no debounce has been implemented, the response is fast on a good connection, but should be for production use)
● In your opinion, what are the pros and cons of how your views are rendered?
I'm using Material UI components.  I like how the `DataCards` component is the only component actually using the data.  With it separated out, it can be tested and used elsewhere as well.
● If you were going to add a feature like login, how would your app’s architecture change?
There are pretty simple to use services available like `Auth0` and AWS's `Cognito`.  I would probably use `Cognito` and deploy to AWS, they have a simple check that runs before rendering and if the user doesn't have the right role, the app kicks back to a login screen.