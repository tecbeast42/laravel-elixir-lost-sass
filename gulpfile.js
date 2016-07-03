var elixir = require('laravel-elixir');

require('./dist/index.js');

elixir.config.assetsPath = 'test/sample-sass-lost';
elixir.config.publicPath = 'test/output';

elixir(function(mix) {
    mix.sassAndLost('test.scss');
});
