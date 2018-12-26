angular.module('TodoApp', []).controler('TodoAppController', [
  $scope,
  function($scope) {
    $scope.tasksTodo = ['task 1',
  'task 2'];
    $scope.error = false;
    return $scope.addTask = function(task) {
      if (!task) {
        return $scope.error = true;
      } else {
        $scope.tasksTodo.push(task);
        $scope.newTask = '';
        return $scope.error = false;
      }
    };
  }
]);
