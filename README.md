# brainyio.github.com

## development

the default Grunt task creates a static server, opens the server's root in your browser, and enables [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei). simply install grunt, the brainyio.github.com dependencies, and execute Grunt.

```
$ npm install grunt -g
$ git clone git@github.com:brainyio/brainyio.github.com.git
$ cd brainyio.github.com
$ npm install
$ grunt
  Running "default" task

  Running "express" task
  ... Starting Express server on 8000 ...

  Running "livereload-start" task
  ... Starting Livereload server on 35729 ...

  Running "open:server" (open) task

  Running "watch" task
  Watching .html,.css
```