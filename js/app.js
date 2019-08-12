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

        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox', id: 'cbx'});

        const labelForCheckbox = createElement('label',{for: 'cbx', className: 'check'});
        labelForCheckbox.innerHTML =
            `  <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
               </svg>`;
        const label = createElement('label', {innerText: title, className: 'title'});

        const editInput = createElement('input', {type: 'text', className: 'textfield'});

        const editButton = createElement('button', {innerText: 'Изменить', className: 'edit'});

        const deleteButton = createElement('button', {innerText: 'Удалить', className: 'delete'});

        const listItem = createElement('li', {className: 'todo-item'}, checkbox, labelForCheckbox, label, editInput, editButton, deleteButton);

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
            if(listItem.offsetX) {
                console.log(`підарюга обнаружен і обезоружен`);
                return;
            }
            if (listItem.classList.contains('completed')) {
                setTimeout(
                    () => {
                        if (listItem.classList.contains('completed')) {
                            listItem.className =`${listItem.className} slideOutRight animated`;
                            setTimeout(
                                ( ) => {
                              listItem.remove();
                                }, 700
                            );
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
            }, 2000
        );
    }

    function deleteTodoButton() {
        const listItem = this.parentNode;
        listItem.remove();
    }

    function bindEvents(todoItem) {
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






