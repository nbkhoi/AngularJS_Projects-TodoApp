angular.module('TodoApp',[])
.controller 'TodoAppController', ['$scope', ($scope) ->
    $scope.tasksTodo = ['task 1', 'task 2']
    $scope.error = false
    $scope.addTask = (task) ->
        if not task
            $scope.error = true
        else
            $scope.tasksTodo.push(task)
            $scope.newTask = ''
            $scope.error = false
        
]