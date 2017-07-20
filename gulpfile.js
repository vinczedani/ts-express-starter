const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('tsconfig.json');
const reporter = ts.reporter.defaultReporter();

const output = 'build';

gulp.task('start', function () {
  nodemon({
    script: 'build/main.js',
    ext: 'js json',
    watch: ['./build'],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('transpile', function() {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(tsProject(reporter));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest(output)),
        tsResult.js.pipe(gulp.dest(output))
    ]);
});

gulp.task('watch', ['transpile'], function() {
    gulp.watch('src/**/*.ts', ['transpile']);
});

gulp.task('default', ['watch', 'start']);