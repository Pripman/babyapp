var server = 'http://localhost:4001'

var BabyApp = angular.module('BabyApp', []);

BabyApp.factory('Messages', function($http){
        var messages = [];
        messages.refresh = function(jsonlist){
            for(i in jsonlist){
                    var found = false;
                for(x in messages){
                    if(jsonlist[i].id == messages[x].id){
                            found = true;
                    }
                }
                if(found !== true){
                        messages.push(jsonlist[i])
                }
            }
        };

        messages.query = function(){
                var response = $http.get(server + "messages");
                response.success(function(data, status, headers, config){
                        messages.refresh(data);
                });
          
                response.error(function(data, status, headers, config){
                        alert("An error occurred getting the messagges, but the error was unclear");
                });
        }

        messages.post = function(obj){
                var response = $http.post(server + 'messages', obj)
                response.error(function(data, status, headers, config){
                        alert("An error occurred posting the message");
                });
        }
        
        return messages;                
});


BabyApp.factory('Users', function(){
        var users = [{ID:"0", name:"Sanne"}, {ID:'1', name:"Stine"}];
        return  users;
});

function messageController($scope, $interval, Messages){
   $scope.messages = Messages;
        function addmessagesToView(){
        $scope.messages = Messages;
    }
    $interval(function(){$scope.messages.query();addmessagesToView()}, 1000);
}

function manageController($scope, Messages, Users){
    $scope.users= Users;
    $scope.addmessage = function(){
                Messages.post({"message":$scope.message, "name": $scope.selectedUser.name});
            }
}


