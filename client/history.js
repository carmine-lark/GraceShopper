// import createHistory from 'history/createBrowserHistory'
// import createMemoryHistory from 'history/createMemoryHistory'
const createHistory = require("history").createBrowserHistory
const createMemoryHistory = require("history").createMemoryHistory

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history


// Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.
// printWarning @ warnAboutDeprecatedCJSRequire.js:17
// ./node_modules/history/warnAboutDeprecatedCJSRequire.js.module.exports @ warnAboutDeprecatedCJSRequire.js:30
// ./node_modules/history/createBrowserHistory.js @ createBrowserHistory.js:2
// __webpack_require__ @ bootstrap:19
// ./client/history.js @ history.js:1
// __webpack_require__ @ bootstrap:19
// ./client/index.js @ index.js:1
// __webpack_require__ @ bootstrap:19
// 0 @ index.js:68
// __webpack_require__ @ bootstrap:19
// (anonymous) @ bootstrap:83
// (anonymous) @ bootstrap:83
// warnAboutDeprecatedCJSRequire.js:17 Warning: Please use `require("history").createMemoryHistory` instead of `require("history/createMemoryHistory")`. Support for the latter will be removed in the next major release.
