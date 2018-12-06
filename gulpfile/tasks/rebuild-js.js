/**
 * Rebuild all JS Files
 * Copy to distribution
 */

import gulp from 'gulp'
import runSequence from 'run-sequence'

const rebuildJsTask = (cb) => {
  runSequence(['copy:js'], cb)
}

gulp.task('rebuild:js', rebuildJsTask)
module.exports = rebuildJsTask
