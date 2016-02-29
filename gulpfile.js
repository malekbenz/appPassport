var gulp = require('gulp');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  // place code for your default task here
  console.log("Gulp is runnung");
});

var jsFiles = ['*.js', './public/lib/**/*.js'];
var libJsFiles = './public/lib/**/*.js';
var libCssFiles = './public/lib/**/*min.css';

gulp.task('inject', function () {
  var target = gulp.src('./views/partials/head.ejs');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([libJsFiles, libCssFiles], {read: false}, {relative: false} );

  return target.pipe(inject(sources, {ignorePath: 'public'} ))
    .pipe(gulp.dest('./views/partials/'));
});


gulp.task('serve', ['inject'], function() {
    var options = {
      script : 'server.js',
      delayTime : 1,
      env : {
        port :3000
      },
      watch : jsFiles
    }
    return nodemon(options)
            .on('restart', function(ev){
              console.log('Restarting ....')
            });

  });
