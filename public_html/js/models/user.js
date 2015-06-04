define([
    'backbone'
], function(
    Backbone
){

    var User = Backbone.Model.extend({

        defaults: {
            id: 0,
            loggedIn: false,
            name: '',
            email: '',
            password: '',
            role: 'viewer',
            score: 0
        },

        urlMap: {
            'configuration': '/api/v1/configuration/',
            'signin': '/api/v1/auth/signin/',
            'signup': '/api/v1/auth/signup/',
            'signout': '/api/v1/auth/signout/'
        },

        initialize: function() {
            this.on('player_status', _.bind( (this.setStatus) , this));
            this.on('viewer_status', _.bind( (this.setStatus) , this));
        },

        clear: function() {
            this.set({
                loggedIn: false,
                name: '',
                email: '',
                password: '',
                role: 'viewer',
                score: 0
            });
        },

        fetch: function (options, url) {
            options = options || {};
            options.url = this.urlMap[url];
            return Backbone.Model.prototype.fetch.call(this, options);
        },

        getOnSocketError: function (user) {
            return function () {
                console.log('socket error', this, arguments);
                user.trigger('socketError');
            };
        },

        getOnSocketClose: function (user) {
            return function () {
                user.socket = null;
                console.log('socket closed');
                user.trigger('socketClose');
            };
        },

        getOnSocketMessage: function (user) {
            return function (event) {            
                message = JSON.parse(event.data);
                console.log('Recieved: ');
                console.log(message);
                if ((message.type == 'chat_message') || 
                    (message.type == 'prompt_status') ||
                    (message.type == 'cassandra_decided'))    
                    user.trigger('message', {'type': message.type, 'body': message.body});                
                user.trigger(message.type, message.body);
            };
        },

        parse: function(response, options) {
            response = response.body;
            var user = response.user || response;
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                score: user.score
            };
        },

        save: function (options, url) {
            attributes = this.attributes;
            options = options || {};
            options.url = this.urlMap[url];
            return Backbone.Model.prototype.save.call(this, attributes, options);
        },

        sendChatMessage: function (messageBody) {
            var type = 'chat_message'
            if (this.get('role') == 'artist')
                type = 'prompt_status'
            else if (this.get('role') == 'cassandra')
                type = 'cassandra_decided'
            this.sendMessage(type, messageBody);
            return type;
        },

        sendMessage: function (type, body) {
            var messageJSON = {
                type: type,
                body: body
            };
            console.log('Sending: ');
            console.log(messageJSON);
            this.socket.send(JSON.stringify(messageJSON));
        },

        setStatus: function (event) {
            this.attributes['role'] = event['role'];
            this.attributes['secret'] = event['secret'];
            this.trigger('change');
            this.trigger('status_changed', {role: event['role'], secret: event['secret']});
        },

        startGame: function () {
            this.socket = new WebSocket(this.get('gameWebSocketUrl'));
            this.socket.onerror = this.getOnSocketError(this);
            this.socket.onclose = this.getOnSocketClose(this);
            this.socket.onmessage = this.getOnSocketMessage(this);
        },

        stopGame: function () {
            console.log('Stopping game');
            if (this.socket) {
                console.log('Closing socket');
                this.socket.close();
            }
        }
    });

    return User;
});
