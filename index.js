const gulp = require('gulp');
const Elixir = require('laravel-elixir');
const lost = require('lost');

const $ = Elixir.Plugins;
const config = Elixir.config;

/*
 * Lost Module Config
 */
config.css.lost = {
	tempFile: config.publicPath+'/'+config.css.outputFolder+'/lost.css',

	pluginOptions: [
		lost(),
	],
};


Elixir.extend('sassAndLost',function(src, output, baseDir, options) {
	const paths = prepGulpPaths(src, output);
		return new Elixir.Task('sassAndLost', function () {

		return compile({
			name: 'Sass and Lost',
			src: paths.src,
			output: paths.output,
			task: this,
			pluginOptions: config.css.lost.pluginOptions,
		});
	})
    .watch(paths.src.baseDir + '/**/*.+(sass|scss)')
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.sass.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};

const compile = function(options) {
    const name = options.name;

    loadPlugins();

    options.task.log(options.src, options.output);

    return (
        gulp
        .src(options.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe(require('gulp-sass')(options.pluginOptions))
        .on('error', function(e) {
            new Elixir.Notification().error(e, name + ' Compilation Failed');
            this.emit('end');
        })
        .pipe(require('gulp-postcss')(options.pluginOptions))
        .on('error', function(e) {
            new Elixir.Notification().error(e, name + ' Compilation Failed');
            this.emit('end');
        })
        .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
        .pipe($.concat(options.output.name))
        .pipe($.if(config.production, minify()))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(options.output.baseDir))
        .pipe(new Elixir.Notification(name + ' Compiled!'))
    );
};

/**
 * Prepare the minifier instance.
 */
const minify = function () {
    return map(function (buff, filename) {
        return new CleanCSS(config.css.minifier.pluginOptions)
            .minify(buff.toString())
            .styles;
    });
};

/**
 * Load the required Gulp plugins on demand.
 */
const loadPlugins = function () {
    map = require('vinyl-map');
    CleanCSS = require('clean-css');
};