const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('tsconfig.json');
const reporter = ts.reporter.defaultReporter();

gulp.task('start', function () {
  nodemon({
    script: 'release/main.js',
    ext: 'js',
    watch: ['./release'],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('scripts', function() {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(tsProject(reporter));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest('release')),
        tsResult.js.pipe(gulp.dest('release'))
    ]);
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch', 'start']);