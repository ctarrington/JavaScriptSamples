angular.module('chatter.service', []).
    value('messageService', {
        socket: io.connect(),
        addMessage: function(msg) {
            this.socket.emit('send', msg);
        },
        onUpdate: function(callback) {
            this.socket.on('update', callback);
        }
    });

angular.module('ChatterApp', ['chatter.service']);

function ChatterCtrl($rootScope, $scope, messageService) {

    $scope.chatter = {
        name:null,
        newMessage:null,
        messages:[]
    };

    $scope.addMessage = function () {
        var msg = {
          name: $scope.chatter.name,
          text: $scope.chatter.newMessage
        };
        messageService.addMessage(msg);
        $scope.chatter.messages.push(msg);
    };

    messageService.onUpdate(function (msg) {
        $rootScope.$apply(function() {
            $scope.chatter.messages.push(msg);
        });
    });

}