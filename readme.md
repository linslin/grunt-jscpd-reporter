# Grunt JSCPD Reporter
=======================

## What is it?
This grunt task extension is able to create different report output formats based on JavaScript Copy- Past- Detector reports.
JSCPD Reporter just creates readable output formats. Use https://github.com/mazerte/grunt-jscpd to detect Copy- Past- errors.

Hint: Currently only HTML-Output is supported.

## Requirement dependency
By using grunt-jscpd this extension will create an readable HTML file which is based on grunt-jscpd xml-output.

#### Build for grunt-jscpd  0.0.11 
Grunt task https://github.com/mazerte/grunt-jscpd is required.


## Release log

- 0.1.2 alpha release

## Install

    npm install grunt-jscpd-reporter
    
## Configuration

Gruntfile

    // Gruntfile.js
    grunt.loadNpmTasks('grunt-jscpd-reporter');

Configure sourceFile and outputDir in grunt.initConfig();

    jscpdreporter: {
        options: {
            sourcefile: '<grunt-jscpd>/output.xml',
            outputDir: 'report/'
        }
    }