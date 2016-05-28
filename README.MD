# Small tips

##gulp tasks commands:

- `build` 
- `inject` - inject all packages into client/index.html
- `server` / `webserver` / `dev-server` - start gulp-server-livereload
- `ngdoc` - generate docs and serve by connect.server

##Components list status

`components` route contain all added to `components.route.js` documentation
documentation page contains from two parts for now:
 - `component@components` route contain template and controller for demonstration
 - `doc@components` route contain documentation in html it is possible to add mardown
in `<marked>` tag

when cokmponents page loading it retrive information about routes under starts from
`'controller.'`, then use them to build components tree
