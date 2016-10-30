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

/**
 * JSCPD Reporter
 */
module.exports = function(grunt) {

    function jscpdReporter() {


        // ############################################## Attributes // ################################################

        /**
         * Configuration object
         * @var {object} config
         */
        var config = grunt.config.get('jscpdReporter');

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
         * Get beautify js
         * @type {object} js-beautify'
         */
        var beautifyJs = require('js-beautify');

        /**
         * syntaxhighlighter
         * @var {object} node-syntaxhighlighter
         */
        var nsh =  require('node-syntaxhighlighter');

        /**
         * mkdirp
         * @var {object} mkdirp
         */
        var mkdirp = require('mkdirp');

        /**
         * Template path
         * @var {string} templatePath
         */
        var templatePath = path.join(__dirname) + '/../templates/';

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
            _item: '',
            _file: ''
        };


        // ################################################ Methods // #################################################

        /**
         * Init function
         */
        function init() {

            //ensure output dir exists
            if (!grunt.file.exists(process.cwd() + '/' + config.options.outputDir)) {
                grunt.file.mkdir(process.cwd() + '/' + config.options.outputDir);
            }

            //cleanup report
            fs.unlink(process.cwd() + '/' + config.options.outputDir + '/index.html');

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
            cpdOutput = fs.readFileSync(process.cwd() + '/' + config.options.sourcefile).toString();

            //parse output xml
            xml2js.parseString(cpdOutput, function(err, result){
                cpdOutput = result;
            });
        }


        /**
         * Render HTML Output
         */
        function renderHtmlOutput() {

            //Init
            var i = 0;

            if (cpdOutput['pmd-cpd'].duplication !== undefined) {
                for (var key in cpdOutput['pmd-cpd'].duplication) {

                    //make item global for run
                    var item = cpdOutput['pmd-cpd'].duplication[key];


                    for (var prop in item) {
                        if(item.hasOwnProperty(prop)){

                            //init
                            var filesHtml = '';


                            //set lines
                            if (item[prop].lines !== undefined) {
                                itemsHTML += templates._item.replace('{{lines}}', item[prop].lines);
                            }

                            //set tokens
                            if (item[prop].tokens !== undefined) {
                                itemsHTML = itemsHTML.replace('{{tokens}}', item[prop].tokens);
                            }

                            // set items counter
                            //make this line exec only one time
                            itemsHTML = itemsHTML.replace('{{itemCounter}}', (i + 1) + '/' + cpdOutput['pmd-cpd'].duplication.length);

                            //set codefragment
                            if (item.codefragment !== undefined) {

                                itemsHTML = itemsHTML.replace(
                                    '{{codeFragment}}',
                                    nsh.highlight(
                                        beautifyJs.js_beautify(String(item.codefragment)),
                                        nsh.getLanguage('js'),
                                        { 'gutter': false }
                                    )
                                );
                            }

                            //get files
                            if (item.file !== undefined) {
                                for (var fileId in item.file) {
                                    if(item.hasOwnProperty(prop)){
                                        filesHtml += templates._file.replace('{{line}}', item.file[fileId]['$'].line);
                                        filesHtml = filesHtml.replace('{{filePath}}', item.file[fileId]['$'].path);
                                    }
                                }

                                itemsHTML = itemsHTML.replace('{{files}}', filesHtml);
                            }

                        }
                    }

                    i++;
                }
            }

            //render items into layout
            outputHTML += templates.layout.replace('{{content}}', itemsHTML);
        }


        /**
         * Create report
         */
        function createReport() {

            //set nsh styles
            //set nsh styles
            mkdirp.sync(process.cwd() + '/' + config.options.outputDir + 'css/', function(err){
                console.log(err);
            });

            mkdirp.sync(process.cwd() + '/' + config.options.outputDir + 'css/nsh/', function(err){
                console.log(err);
            });

            fs.appendFileSync(process.cwd() + '/' + config.options.outputDir + 'css/nsh/default.css',
                fs.readFileSync(path.join(__dirname) + '/../node_modules/node-syntaxhighlighter/lib/styles/shCoreDefault.css').toString()
                + fs.readFileSync(path.join(__dirname) + '/../node_modules/node-syntaxhighlighter/lib/styles/shCore.css').toString()
                + fs.readFileSync(path.join(__dirname) + '/../templates/css/jscpd-reporter.css').toString());

            fs.appendFileSync(process.cwd() + '/' + config.options.outputDir + '/index.html', outputHTML );
        }


        //run
        init();
    }

    // grunt jscpd reporter task
    grunt.registerTask('grunt-jscpd-reporter', jscpdReporter);
};