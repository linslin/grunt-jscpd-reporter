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
    function jsCpdReporter() {


        // ############################################## Attributes // ################################################

        /**
         * Configuration object
         * @var {object} config
         */
        var config = grunt.config.get('jscpdreporter');

        /**
         * Get path object
         * @var {object} path
         */
        var path = require('path');

        /**
         * Get fs object
         * @var {object} fs
         */
        var fs = require('fs');

        /**
         * Template path
         * @var {string} templatePath
         */
        var templatePath = path.join(__dirname) + '/templates/';

        /**
         * Copy- / Past detection output holder
         * @var {string} cpdOutput
         */
        var cpdOutput = '';

        /**
         * Templates
         * @var {object} templates
         */
        var templates = {
            layout: '',
            _item: ''
        };



        // ################################################ Methods // #################################################

        /**
         * Init function
         */
        function init() {

            loadTemplates();

            console.log(templates);

            var parseString = require('xml2js').parseString;
            var xml = "<root>Hello xml2js!</root>"
            parseString(xml, function (err, result) {
                console.dir(result);
            });
        }


        /**
         * Load html template files
         *
         */
        function loadTemplates() {
            for (var template in templates) {
                templates[template] = fs.readFileSync(templatePath + template + '.html').toString();
            }
        }

        //run
        init();
    }


    // Default task.
    grunt.registerTask('default', jsCpdReporter);

};
