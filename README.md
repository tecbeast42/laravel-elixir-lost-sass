# laravel-elixir-lost-sass

Laravel Elixir extension which compiles sass and lost in one go. Uses all of the typical elixir goodies like minify with gulp --production.

Pro
- no tempfiles
- faster because no tempfiles are written to disk
Cons
- depend on me to keep it up to date :)

# Usage

```js
var elixir = require('laravel-elixir');

require('laravel-elixir-lost-sass');

elixir(function(mix) {
    mix.sassAndLost(src,output,baseDir);
});
```