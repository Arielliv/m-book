'use strict';

'use strict';

/** app level module which depends on services and controllers */
angular.module('sseChat', ['sseChat.services', 'sseChat.controllers']);

/** Controllers */
angular.module('sseChat.controllers', ['sseChat.services']).
    controller('ChatCtrl', function ($scope, $http, chatModel) {
        $scope.rooms = chatModel.getRooms();
        $scope.msgs = [];
        $scope.inputText = "";
        $scope.user = "Jane Doe #" + Math.floor((Math.random() * 100) + 1);
        $scope.currentRoom = $scope.rooms[0];

        /** change current room, restart EventSource connection */
        $scope.setCurrentRoom = function (room) {
            $scope.currentRoom = room;
            $scope.chatFeed.close();
            $scope.msgs = [];
            $scope.listen();
        };

        /** posting chat text to server */
        $scope.submitMsg = function () {
            $http.post("/chat", { text: $scope.inputText, user: $scope.user,
                time: (new Date()).toUTCString(), room: $scope.currentRoom.value });
            $scope.inputText = "";
        };

        /** handle incoming messages: add to messages array */
        $scope.addMsg = function (msg) {
            $scope.$apply(function () { $scope.msgs.push(JSON.parse(msg.data)); });
        };

        /** start listening on messages from selected room */
        $scope.listen = function () {
            $scope.chatFeed = new EventSource("/chatFeed/" + $scope.currentRoom.value);
            $scope.chatFeed.addEventListener("message", $scope.addMsg, false);
        };

        $scope.listen();
    });

'use strict';

/** chatModel service, provides chat rooms (could as well be loaded from server) */
angular.module('sseChat.services', []).service('chatModel', function () {
    var getRooms = function () {
        return [ {name: 'Room 1', value: 'room1'}, {name: 'Room 2', value: 'room2'},
            {name: 'Room 3', value: 'room3'}, {name: 'Room 4', value: 'room4'},
            {name: 'Room 5', value: 'room5'} ];
    };
    return { getRooms: getRooms };
});