var gulp = require('gulp'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    imageop = require('gulp-image-optimization'),
	  bundle = browserify('./src/app.js').bundle();

//Jade task
gulp.task('jade', function(){
  return gulp.src('src/**/*.jade')
    .pipe(jade({pretty: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build'));
});

//Style task
gulp.task('styles', function() {
  return gulp.src('src/css/app.less')
    .pipe(less({compress: false}).on('error', gutil.log))
    //.pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('./build/css/'));
}); 

//Images optimizer task
gulp.task('images', function(cb) {
    gulp.src(['src/img/**/*.png','src/img/**/*.jpg','src/img/**/*.gif','src/img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./build/img')).on('end', cb).on('error', cb);
});

gulp.task('browserify', function() {
    return browserify('./src/app.js')
        .bundle().on('error', gutil.log)
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', [], function() {
  // Watch our scripts
  gulp.watch(['src/img/**/*.png','src/img/**/*.jpg','src/img/**/*.gif','src/img/**/*.jpeg'],[
    'images'
  ]);
  gulp.watch(['src/**/*.less'],[
    'styles'
  ]);
  gulp.watch(['src/**/*.js'],[
    'browserify'
  ]);
  gulp.watch(['src/**/*.jade'],[
    'jade'
  ]);
});

//Browsersync and static server
gulp.task('server', ['watch'], function() {
  require('./server');
});

// use default task
gulp.task('default', ['server']);