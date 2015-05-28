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

This copies current directory `.` to `~/cassandra` at remote host.

    $ scp -r . g05@tp-demo1.tech-mail.ru:cassandra

Logging in to remote machine.

    $ ssh -lg05 tp-demo1.tech-mail.ru

Starting server.

    $ cd cassandra
    $ java -jar Cassandra.jar 9085
