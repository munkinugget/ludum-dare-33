module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './deploy'
                }
            }
        },
        copy: {
          main: {
            src: 'node_modules/phaser/dist/phaser.js',
            dest: 'deploy/js/phaser.js',
          },
        },
        /*concat: {
            dist: {
                src: [
                  "node_modules/phaser/dist/phaser.js",
                  "src/*.js"
                ],
                dest: 'deploy/js/<%= pkg.name %>.js'
            }
        },*/
        typescript: {
          base: {
            src: ['src/**/*.ts'],
            dest: 'deploy/js/<%= pkg.name %>.js',
            options: {
              module: 'commonjs', //or commonjs
              target: 'es5', //or es3
              basePath: 'path/to/typescript/files',
              sourceMap: true,
              declaration: true
            }
          }
        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['concat']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });

    grunt.registerTask('default', ['copy', 'typescript', /*'concat',*/ 'connect', 'open', 'watch']);

}
