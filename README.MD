# Small tips

##gulp tasks commands:

- `build` 
- `inject` - inject all packages into client/index.html
- `server` / `webserver` / `dev-server` - start gulp-server-livereload
- `ngdoc` - generate docs and serve by connect.server

##Adding documentation 

`component` page contain all added to `components.route.js` documentation.  
Documentation page consist from two parts for now:
 - `component@components` route contain template and controller for demonstration
 - `doc@components` route contain documentation in html (it is possible to add mardown
in `<marked>` tag for now)

routeProvider `storyBook.provider.js` added, example of usage you can see in 
./client/app/components/action-button/actionButton.doc.js 

```js
  angular.module('app.components')
    .config(
    /* @ngInject */
    function(storyBookProvider){
      storyBookProvider
        .Story('chapter name')
        .add({
          name: 'story name'
          templateUrl: 'path to template url'
          controllerAs: 'optional, default is vm'
          controller: 'controller name'
          documentationUrl: 'path to md file with documentation of that story'
        })
        .publish(); //add paths to routeProvider
    });
```

> section add is too big with all paths, maybe need some functional to add story by passing
> path of element and name of story (or maybe some kind of story id pass additional to prevent ugly stories names)

```js
  .add({
    name: 'story name',
    id: 'story identifier',
    path: 'path/to/component/directory'
    controller: 'controller name in directory'
  })
  // it still pretty ugly :E
  // 4 params to add one example ..
```

