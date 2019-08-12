(document => {
    const todoForm = document.querySelector('#todo-form');
    const addInput = document.querySelector('#add-input');
    const todoList = document.querySelector('#todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach(key => {
            element[key] = props[key];
        });

        if (children.length > 0) {
            children.forEach(child => {
                element.appendChild(child);
            })

        }

        return element;
    }


    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
        toHide();
    }


    function createTodoItem(title) {

        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});

        const label = createElement('label', {innerText: title, className: 'title'});

        const editInput = createElement('input', {type: 'text', className: 'textfield'});

        const editButton = createElement('button', {innerText: 'Изменить', className: 'edit'});

        const deleteButton = createElement('button', {innerText: 'Удалить', className: 'delete'});

        const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, editButton, deleteButton);

        addInput.value = '';

        bindEvents(listItem);

        return listItem;

    }

    function addTodoItem(evt) {
        evt.preventDefault(); //Cancel the submit event and don't reload the page
        if (!addInput.value) {
            return alert(`Please enter the name of task.`);
        }

        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
    }

    function toggleTodoItem() {
        const listItem = this.parentNode;
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.checked = !checkbox.checked;
        listItem.classList.toggle('completed');
        hideElement(listItem);
    }

    function editTodoButton() {
        const listItem = this.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');
        if (isEditing) {
            title.innerHTML = editInput.value;
            this.innerText = 'Изменить';
        } else {
            editInput.addEventListener('keydown', function (event) {
                if (event.code === 'Enter') {
                    title.innerHTML = editInput.value;
                    this.parentNode.querySelector('.edit').innerText = 'Изменить';
                    listItem.classList.remove('editing');
                }
            });
            editInput.value = title.innerHTML;
            this.innerText = 'Сохранить';
        }
        listItem.classList.toggle('editing');
    }

    function hideElement(listItem) {
            if (listItem.classList.contains('completed')) {
                setTimeout(
                    () => {
                        if (listItem.classList.contains('completed')) {
                            listItem.remove();
                            console.log(`element was deleted`);
                            console.log('Вадос лох))))))))))))))))))))');
                        }
                    },
                    2000
                );
            }
    }
    function toHide() {
        setTimeout(
            () => {
                document.querySelector('.toHide').remove()
            },2000
        );
    }
    function deleteTodoButton() {
        const listItem = this.parentNode;
        listItem.remove();
    }

    function bindEvents(todoItem) {
        console.log('bindEvents');
        const title = todoItem.querySelector('.title');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        title.addEventListener('click', toggleTodoItem);
        title.addEventListener('click', hideElement);

        editButton.addEventListener('click', editTodoButton);
        deleteButton.addEventListener('click', deleteTodoButton);
    }

    return main();

})(document);






