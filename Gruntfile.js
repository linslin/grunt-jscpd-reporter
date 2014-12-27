/**
 * Grunt JSCPD Reporter exporter
 *
 * @name      grunt-jscpd-reporter
 * @package   grunt-jscpd-reporter
 * @author    Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @copyright 2014-2015 Nils Gajsek <nils.gajsek@glanzkinder.com>
 * @version   1.0.0
 * @license   http://opensource.org/licenses/MIT MIT Public
 * @link      http://www.linslin.org
 *
 */

//export module
module.exports = function (grunt) {

    // ########################################## Object attributes // #############################################

    //use strict -> ECMAScript5 error reporting
    'use strict';

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Project configuration.
    grunt.initConfig({

        jscpdreporter: {
            sourcefile: 'mocks/output.xml',
            output: 'report/index.html'
        }
    });


    /**
     * JSCP Reporter
     */
    function jscpdreporter() {

        /**
         * @var {object} config
         */
        var config = grunt.config.get('jscpdreporter');

        console.log(grunt.config.get('jscpdreporter'));

        var parseString = require('xml2js').parseString;
        var xml = "<root>Hello xml2js!</root>"
        parseString(xml, function (err, result) {
            console.dir(result);
        });
    }


    // Default task.
    grunt.registerTask('default', jscpdreporter);

};
