'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';

import tasks from './tasks';

/**
 * Launch gulp application
 */
class GulpApplication {
  constructor() {
    this.plugins = {};
    this.tasks = {};
  }

  /**
   * Initialize gulp
   */
  initialize() {
    this.registerPlugins();
    this.registerTasks();
  }

  /**
   * @private
   */
  registerPlugins() {
    this.plugins = { gulp, gutil, istanbul, mocha };
  }

  /**
   * @private
   */
  registerTasks() {
    this.plugins.gulp.task('default', ['']);

    tasks.forEach((task) => {
      task(this.plugins);
    });
  }
}

export default GulpApplication;
