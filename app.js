// Tworzymy moduł aplikacji
var myApp = angular.module('userApp', []);

// Tworzymy kotroler UserCtrl
    myApp.controller('UserCtrl', ['$scope', '$http', function($scope, $http) {  

    // tworzymy model
    $scope.users = [];
    $scope.newUser = {};  

    // zasilamy danymi z pliku JSON  
        $http({
            method: 'get', 
            url: 'users.json'
        }).then(function (response) {
            $scope.users = response.data;
            _setIndexes()
        },function (error){
            console.log(error, 'no data.')
        }
        )
        $scope.addUser = function() {
            var newUser = $scope.newUser
            newUser.state = "normal"
            newUser.index = $scope.users.length
            $scope.users.push(newUser) 
            $scope.newUser = {}
        }  
        
        $scope.deleteUser = function(user) {
         $scope.users.splice(user.index, 1) 
         _setIndexes()
        }

        $scope.editUser = function(user) {
            user.oldImie = user.imie
            user.oldIndeks = user.indeks
            user.oldJavascript = user.javascript
            user.oldJquery = user.jquery
            user.oldPhp = user.php
            user.state = "edit"
        }

        $scope.saveUser = function(user) {
            // tu możemy użyć Ajaxowego  POST do zapisu danych 
        user.state = "normal"
        }

        $scope.cancelEdit = function(user) { 
            user.imie = user.oldImie
            user.indeks = user.oldIndeks
            user.javascript = user.oldKavascript
            user.php = user.oldPhp

            user.state = "normal" }

        // metody prywatne
        function _setIndexes() { 
        $scope.users.forEach(function(user, index) {
            user.index = index 
            }) 
        }

        //wszytkie poniższe funkcje są zrobione tak samo lub analogicznie jak na zajęciach jednak nie działają
        //Niestety nie udało mi się ustalić przyczyny czemu tak jest
        $scope.sumujJavascript = function () {
            sum = 0;
            $scope.users.forEach(function (user){
                sum += user.javascript
            })
            return sum;
        }

        $scope.sumujJquery = function() {
            sum = 0;
            $scope.users.forEach(function (user) {
                sum += user.jquery
            })
            return sum;
        }

        $scope.sumujPhp = function() {
            sum = 0;
            $scope.users.forEach(function (user) {
                sum += user.php
            })
            return sum;
        };
        

    }
])
