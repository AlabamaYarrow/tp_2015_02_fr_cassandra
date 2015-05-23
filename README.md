# Cassandra

## Installation

1. Install Node.js

1. Execute this from project directory:

        # npm install
   
    Or:     
  
        # npm install -g grunt-cli  
        $ npm install grunt --save-dev  
        $ npm install grunt-shell --save-dev  
        $ npm install grunt-fest --save-dev  
        $ npm install grunt-contrib-watch --save-dev  
        $ npm install grunt-concurrent --save-dev  

## Launching

This will start development server at http://127.0.0.1:8100

    $ grunt

If you want to disable browser caching by adding new attribute to every static file each time add this to the beginning of `public_html/main.js`:
```javascript
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
```

## Deploying

Remote server's shell:

    $ ssh -lg05 tp-demo1.tech-mail.ru

Remote server's MySQL shell:

    $ mysql -ujava_2015_02_g05 -p # password: java_2015_02_g05

Copying current directory `.` to `~/cassandra` at remote host:

    $ scp -r . g05@tp-demo1.tech-mail.ru:cassandra
