let $input = document.querySelector('.todo-form__input'),
incompleteTasks,
completeTasks;

window.addEventListener('load', function() {
    incompleteTasks = window.localStorage.getItem('incompleteTasks') ? window.localStorage.getItem('incompleteTasks').split(',') : new Array();
    completeTasks = window.localStorage.getItem('completeTasks') ? window.localStorage.getItem('completeTasks').split(',') : new Array();

    if (!incompleteTasks.length && !completeTasks.length) {
        document.querySelector('.todo-tasks').classList.add('is--empty')
    } else {
        if (incompleteTasks.length) {
            incompleteTasks.forEach(task => appendTask(task, 'incomplete'))
        }
    
        if (completeTasks.length) {
            completeTasks.forEach(task => appendTask(task, 'complete'))
        }
    }

})

$input.addEventListener('change', function() {
    var taskVal = this.value;
    this.value = '';
    storeNewTask(taskVal, 'incomplete');
})

let storeNewTask = (task, div) => {
    if (incompleteTasks.indexOf(task)) {
        (div == 'incomplete') ? incompleteTasks.push(task) : completeTasks.push(task);
        window.localStorage.clear();
        window.localStorage.setItem('incompleteTasks', incompleteTasks);
        window.localStorage.setItem('completeTasks', completeTasks);
        (incompleteTasks.length || completeTasks.length) ? document.querySelector('.todo-tasks').classList.remove('is--empty') : null;
        appendTask(task, div);
    } else {
        alert('Tarefa já cadastrada');
    }
}

let appendTask = (task, div) => {
    var $task = document.createElement('div'),
    $checkbox = document.createElement('span');

    $checkbox.classList.add('task-checkbox');
    $task.classList.add('task');
    $task.textContent = task;
    $checkbox.addEventListener('click', function() {
        toggleTask(this);
    })
    $task.insertBefore($checkbox, $task.firstChild);

    (div == 'incomplete') ? document.querySelector('.todo-tasks__incomplete').appendChild($task) : document.querySelector('.todo-tasks__complete').appendChild($task);
}

let toggleTask = checkbox => {
    var section = checkbox.closest('.todo-tasks__incomplete') || false,
    parent = checkbox.parentNode,
    task = checkbox.nextSibling.textContent,
    index;

    if (section) {
        index = incompleteTasks.indexOf(task);
        incompleteTasks.splice(index, 1);
        parent.remove();
        storeNewTask(task, 'complete');
    } else {
        index = completeTasks.indexOf(task);
        completeTasks.splice(index, 1);
        parent.remove();
        storeNewTask(task, 'incomplete');
    }
}