import {Component, View,boostrap, For} from 'angular2/angular2'
import {TodoFactory} from 'todos-factory'

@Component({
    selector:'todo-app'
})
@View({
    templateUrl :'components/todo-app/todo-app.html',
    directives:[For]
})
class TodoAppComponent{
    todo: Array;

    constructor(){
        this.todos = [];
        TodoFactory.getAll().then((data) => {
            this.todos = data;
        });

    }

    addTodo($event, todoText){
        if($event.which === 13){
            var _todo = {
                text: todoText.value,
                isCompleted: false
            }

            TodoFactory.save(_todo).then((data) => {
                this.todos.push(data);
                todoText.value = '';
            });
        }
    }

    updateTodoText($event, todo){
        if($event.which === 13){
            todo.text = $event.target.value;
            var _todo = {
                _id :todo._id,
                text: todo.text,
                isComplete: todo.isCompleted
            };

            TodoUpdate(_todo).then((data)=>this.setEditstate (todo,false));
        }

    }

    updateStatus(todo){
        var _todo = {
            _id: todo._id,
            text : todo.text,
            isCompleted : !todo.isCompleted
        }

        // TodoFactory.update(_todo).then((data)=>{
        //     if (data.n == 1) {
        //         for(var i = 0; i < todos.length; i++){
        //
        //         }
        //     }
        // })
        TodoFactory.update(_todo).then((data) => {
            todo.isCompleted = !todo.isCompleted
        })
    }

    delete(todo){
        var todos = this.todos;

        TodoFactory.delete(todo.id).then((data) => {
            if (data.n == 1) {
                for ( var i = 0; i < todos.length; i++){
                    if (todos[i]._id == todo._id){
                        todos.slice(i,1);
                    }
                }
            }
        })

    }

    setEditState(todo, state){
        if (state) {
            todo.isCompleted = state
        } else {
            delete todo.isEditMode;
        }
    }
}

boostrap(TodoAppComponent);
