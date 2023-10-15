var config = {
    apiKey: "AIzaSyDafK_Fk0gXKC5zEgXdUGNpIT_s_aSexGs",
    authDomain: "firetodo666.firebaseapp.com",
    databaseURL: "https://firetodo666.firebaseio.com",
    storageBucket: "firetodo666.appspot.com",
};

firebase.initializeApp(config);
var TodosRef = firebase.database().ref('Todolist');
var todoList = new Vue({
    el: '#todolistApp',
    data: {
        todos: [],
        newTodo: '',
        editOption: false,
        tempKey: '',
        warningLabel: '',
        redWarning: false,
    },
    methods: {
        testt() {
            console.log(this.getDate(todo.time))
        },
        inputTyping() {
            this.warningLabel = '';
            this.redWarning = false;
        },
        submitHandler() {
            if (this.newTodo.length == 0
                || this.newTodo.length == ""
                || this.redWarning == "true"
            ) {
                this.warningLabel = 'Todo can not be empty!';
                this.redWarning = true;
                return
            }
            else {
                let newTodoList = {
                    newTodo: this.newTodo, 
                    newTime: firebase.database.ServerValue.TIMESTAMP, 
                };
                TodosRef.push(newTodoList)
                this.newTodo = '';
                this.warningLabel = '';
                this.redWarning = false;
            }
        },

        
        removeHandler(idx) {
            if (this.newTodo.length != 0
                || this.newTodo.length != ""
            ) {
                return
            } else {
                let target = this.todos[idx];
                if (confirm(`Delete ? \n" ${target.newTodo} " ?`)) {
                    TodosRef.child(idx).remove()
                }
            }
        },

      
    },

    mounted() {
        TodosRef.on('value', (snapshot) => {
            todoList.todos = snapshot.val();
        })
    },
})