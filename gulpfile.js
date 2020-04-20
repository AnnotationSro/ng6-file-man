const gulp = require('gulp');
const rename = require('gulp-rename');
const exec = require('child_process').exec;

gulp.task('prod', function (cb) {
  exec('./node_modules/@angular/cli/bin/ng build file-manager --prod', function (err, stdout, stderr) {

    console.log('## Copying styles..');
    gulp.src('./projects/file-manager/src/styles.scss')
      .pipe(rename('ng6-file-man-styles.scss'))
      .pipe(gulp.dest('../file-manager-lib/assets'));
    console.log('## Done..');

    console.log('## Copying README.md..');
    gulp.src('./README.md')
      .pipe(gulp.dest('../file-manager-lib/'));
    console.log('## Done..');

    console.log('## Copying LICENSE.md..');
    gulp.src('./LICENSE.md')
      .pipe(gulp.dest('../file-manager-lib/'));
    console.log('## Done..');

    console.log('## Copying i18n..');
    gulp.src('./projects/file-manager/src/assets/sk.json')
      .pipe(gulp.dest('../file-manager-lib/assets'));
    gulp.src('./projects/file-manager/src/assets/i18n')
      .pipe(gulp.dest('../file-manager-lib/assets'));
    console.log('## Done..');

    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
