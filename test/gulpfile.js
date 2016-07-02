var elixir = require('laravel-elixir');

require('../index.js');

elixir.config.assetsPath = 'input';
elixir.config.publicPath = 'output';

elixir(function(mix) {
    mix.sassAndLost('test.scss');
});
