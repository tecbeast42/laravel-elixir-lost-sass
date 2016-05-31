# laravel-elixir-lost-sass

Laravel Elixir extension which compiles sass and lost in one go. Uses all of the typical elixir goodies like minify with gulp --production.

# Usage

```js
var elixir = require('laravel-elixir');

require('laravel-elixir-lost-sass');

elixir(function(mix) {
    mix.sassAndLost(src,output,baseDir);
});
```