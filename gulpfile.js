const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('tsconfig.json');
const reporter = ts.reporter.defaultReporter();

const output = 'build';

let process;

gulp.task('start', function () {
  process = nodemon({
    script: 'build/main.js',
    ext: 'js json',
    watch: ['./invalid'],
    env: { 'NODE_ENV': 'development' }
  });
})

gulp.task('watch', ['transpile'], function() {
  gulp.watch('src/**/*.ts', ['transpile', 'restart']);
});

gulp.task('transpile', function() {
  const tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject(reporter));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
    tsResult.dts.pipe(gulp.dest(output)),
    tsResult.js.pipe(gulp.dest(output))
  ]);
});

gulp.task('restart', function() {
  if (!process) {
    return;
  }
  process.emit('restart');
});

gulp.task('default', ['watch', 'start']);