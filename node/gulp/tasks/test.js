'use strict';

import Helper from '../utils/Helper';

/**
 * ONLY IN STAGE ENV
 * Task to execute BACK-END unit tests
 * - Coverage with Istanbul
 * - Tests with Mocha
 * - Push coverage on coveralls
 * @param plugins
 * @returns {Function}
 */
export const test = (plugins) => {
  plugins.gulp.task('test', () => {
    let result = false;
    if (!Helper.isDev()) {
      result = plugins.gulp
        .src([
          './app/**/*.js',
          '!./app/Application.js',
        ])
        .pipe(plugins.istanbul({ includeUntested: true }))
        .pipe(plugins.istanbul.hookRequire())
        .on('finish', () => plugins.gulp.src('./tests/index.js')
          .pipe(plugins.mocha({
            reporter: 'spec',
            compilers: ['js:babel-core/register'],
          }))
          .pipe(plugins.istanbul.writeReports({ dir: './coverage' }))
          .on('end', () => {
            process.exit(0);
          })
        )
        .on('error', plugins.gutil.log);
    }
    return result;
  });
};
