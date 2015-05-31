# Today

A TODO app with [React](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/) just for Today

## Running

You must have [nodejs](https://nodejs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build and run the project, run this command:

    gulp

To execute the unit test run:

    npm test

## Dependencies

The implementation uses:
- [Underscore](http://underscorejs.org/) to aid with functional programming
- [Gulp](http://gulpjs.com/) to build the project and run the server
- [Browserify](http://browserify.org/) to 'require' modules in the browser
- [Reactify](https://www.npmjs.com/package/reactify) to transform JSX into JS
- [Watchify](https://github.com/substack/watchify) to listen to changes in the code and re-run the build process
- [Jest](https://facebook.github.io/jest/) for unit testing
