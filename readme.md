# Grunt JSCPD Reporter
=======================

[![NPM](https://nodei.co/npm/grunt-jscpd-reporter.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-jscpd-reporter/)

## What is it?
This grunt task extension is able to create different report output formats based on JavaScript Copy- Past- Detector reports.
JSCPD Reporter just creates readable output formats. Use https://github.com/mazerte/grunt-jscpd to detect Copy- Past- errors.

Hint: Currently only HTML-Output is supported.

### Screenshot
![Screenshot-1](http://linslin.org/grunt-jscpd-reporter/images/screen-1.png "Screenshot-1")

### Demo
Take a look at the [Demo](http://linslin.org/grunt-jscpd-reporter/demo/)

## Requirement dependency
By using grunt-jscpd this extension will create an readable HTML file which is based on grunt-jscpd xml-output.

#### Build for grunt-jscpd  0.0.11 
Grunt task https://github.com/mazerte/grunt-jscpd is required.


## Release log

#### 0.1.3 alpha release
- Added demo link and screenshots.

#### 0.1.2 alpha release

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