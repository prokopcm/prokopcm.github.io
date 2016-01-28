module.exports = function(grunt) {

    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    
    var findup = require('findup-sync');
    var path = require('path');

    var debugMode = !grunt.option('release');
    
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean', 'less:game', 'copy:main', 'typescript', 'success-file']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    grunt.registerTask('success-file', function() {
        // In the deployer it can be hard to tell if the build actually got to the end.
        // So, this file is written as the last step of the build. 
        grunt.file.write(path.join(grunt.config.get('distdir'), 'success'), 'build succeeded');
    });

    // Project configuration.
    grunt.initConfig({
        /**
         * Final output directory.
         * @type {String}
         */
        distdir: 'dist',
        
        pkg: grunt.file.readJSON('package.json'),

        src: {
            hint: ['<%= distdir %>/**/*.js']
        },

        clean: ['<%= distdir %>'],
        
        copy: {
            main: {
                files: [{
                    expand: true, 
                    src: ['libs/*'], 
                    dest: '<%= distdir %>',
                }, {
                    src: 'tradesim-ts.html', 
                    dest: '<%= distdir %>',
                    expand: true
                }]
            }
        },

        less: {
            options: {
                cleancss: true
            },
            game: {
                files: {
                    "<%= distdir %>/assets/css/style.css": "assets/less/style.less"
                }
            }
        },

        jshint: {
            ids: {
                files: {
                    src: ['gruntFile.js', '<%= src.hint %>']
                },
                options: {
                    browser: true,
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: false, // have to disable this one because AE does not use camelcase for non Constructor functions
                    noarg: true,
                    sub: true,
                    boss: true,
                    eqnull: true,
                    undef: true,
                    indent: 4,
                    //camelcase: true,
                    //unused: 'vars', // check if variables are declared but never used, can be a bit annoying during development.
                    globals: {
                        module: true,
                        MD5: true,
                        hex_md5: true,

                        console: true
                    }
                }
            }
        },

        typescript: {
            base: {
                src: ['ts/TradeGame.ts'],
                dest: '<%= distdir %>/js' + (debugMode ? '' : '/trade.js'),
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'ts',
                    sourceMap: debugMode,
                    declaration: debugMode
                }
            }
        }
    });

};