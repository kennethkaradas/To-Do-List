(function () {
  'use strict';

  angular
    .module('todoList')
    .controller('todoListCtrl', todoListCtrl);

  todoListCtrl.$inject = ['TodoListService'];

  function todoListCtrl(TodoListService) {

    var vm = this;
    var corkboard;
    vm.addTodo = addTodo;

    // Set up the draggable corkboard

    TodoListService.getTodos().then(function(data){
      corkboard = Draggable.create('.todo-items__wrapper', { type:'scroll', edgeResistance: 1 })[0];
      vm.items = data;
    });

    function addTodo(e) {

      var todo = {
        UserID: '666',
        Status: true,
        Priority: 'high',
        Desc: 'My new todo',
        Xcoord: e.clientX - 110 + (corkboard.x * -1),
        Ycoord: e.clientY + (corkboard.y * -1),
      };

      TodoListService.addTodo(todo).then(function(data) {
        vm.items.push(todo);
      });

    };

  }

})();