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

    // Project configuration.
    grunt.initConfig({

        jscpdreporter: {
            sourcefile: 'mocks/output.xml',
            outputDir: 'report/'
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
         * Get xml2js object
         * @var {object} fs
         */
        var xml2js = require('xml2js');

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
         * Rendered HTML output string
         * @var {string} outputHTML
         */
        var outputHTML = '';

        /**
         * Rendered HTML item output string
         * @var {string} outputHTML
         */
        var itemsHTML = '';

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

            //load templates and output xml
            loadTemplates();
            loadOutputXml();

            //render output
            renderHtmlOutput();

            //create report
            createReport();

        }


        /**
         * Load html template files
         */
        function loadTemplates() {
            for (var template in templates) {
                templates[template] = fs.readFileSync(templatePath + template + '.html').toString();
            }
        }


        /**
         * Load cpd output xml and parse it to an js object
         */
        function loadOutputXml() {

            //read output file
            cpdOutput = fs.readFileSync(path.join(__dirname) + '/' + config.sourcefile).toString();

            //parse output xml
            xml2js.parseString(cpdOutput, function(err, result){
                 cpdOutput = result;
            });
        }


        /**
         * Render HTML Output
         */
        function renderHtmlOutput () {

            if (cpdOutput['pmd-cpd'].duplication !== undefined) {
                for (var key in cpdOutput['pmd-cpd'].duplication) {

                    //make item global for run
                    var item = cpdOutput['pmd-cpd'].duplication[key];

                    for (var prop in item) {
                        if(item.hasOwnProperty(prop)){

                            //set lines
                            if (item[prop].lines !== undefined) {
                                itemsHTML += templates._item.replace('{{lines}}', item[prop].lines)
                            }
                        }
                    }
                }
            }

            //render items into layout
            outputHTML += templates.layout.replace('{{content}}', itemsHTML);
        }


        /**
         * Create report
         */
        function createReport () {
            fs.appendFileSync(path.join(__dirname) + '/' + config.outputDir + '/index.html', outputHTML );
        }


        //run
        init();
    }


    // Default task.
    grunt.registerTask('default', jsCpdReporter);

};
