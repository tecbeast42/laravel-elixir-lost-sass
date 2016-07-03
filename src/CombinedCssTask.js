class CombinedCssTask extends Elixir.Task {
    
    /**
     * Create a new CombinedCssTask instance.
     *
     * @param {string}      name
     * @param {GulpPaths}   paths
     * @param {object|null} options
     */
    constructor(name, paths, options) {
        super(name, null, paths);

        this.options = options;
    }


    /**
     * Build the Gulp task.
     */
    gulpTask() {
        return (
            gulp
            .src(this.src.path)
            .pipe(this.initSourceMaps())
            .pipe(this.compile())
            .on('error', this.onError())
            .pipe(this.compileLost())
            .on('error', this.onError())
            .pipe(this.autoPrefix())
            .pipe(this.concat())
            .pipe(this.minify())
            .on('error', this.onError())
            .pipe(this.writeSourceMaps())
            .pipe(this.saveAs(gulp))
            .pipe(this.onSuccess())
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.baseDir + Elixir.config.css['sass'].search)
            .ignore(this.output.path);
    }


    /**
     * Compile the CSS.
     */
    compile() {
        this.recordStep('Compiling Sass');

        let plugin = Elixir.Plugins['sass'] ||
                     Elixir.config.css['sass'].plugin;

        return plugin(
            this.options || Elixir.config.css['sass'].pluginOptions
        );
    }
    
    compileLost() {
        this.recordStep('Compiling Post Css');
        return require('gulp-postcss')([require('lost')]);
    }

    /**
     * Apply CSS auto-prefixing.
     */
    autoPrefix() {
        if (! Elixir.config.css.autoprefix.enabled) {
            return this.stream();
        }

        this.recordStep('Autoprefixing CSS');

        return Elixir.Plugins.autoprefixer(
            Elixir.config.css.autoprefix.options
        );
    }
}

export default CombinedCssTask;