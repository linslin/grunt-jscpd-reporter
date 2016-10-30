/**
 * Grunt JSCPD Reporter exporter
 *
 * @name      grunt-jscpd-reporter
 * @package   grunt-jscpd-reporter
 * @author    Nils Gajsek <info@linslin.org>
 * @copyright 2014-2016 Nils Gajsek <info@linslin.org>
 * @version   0.2.0
 * @license   http://opensource.org/licenses/MIT MIT Public
 * @link      http://www.linslin.org
 *
 */

//export module
module.exports = function (grunt) {

    // ########################################## Object attributes // #############################################

    //use strict -> ECMAScript5 error reporting
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jscpdReporter: {
            src : ['Gruntfile.js', 'tasks/*.js'],
            options: {
                sourcefile: 'mocks/output.xml',
                outputDir: 'report/'
            }
        }
    });

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', ['grunt-jscpd-reporter']);
};
