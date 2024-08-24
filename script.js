document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = { id: Date.now(), text: taskText, completed: false };
            tasks.push(newTask);
            renderTasks();
            taskInput.value = '';
        }
    });

    // Render the tasks
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(li);

            // Mark task as completed or undo completion
            li.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks(filter);
            });

            // Delete task
            li.querySelector('.delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks(filter);
            });

            // Edit task
            li.querySelector('.edit-btn').addEventListener('click', () => {
                const newTaskText = prompt('Edit task:', task.text);
                if (newTaskText !== null && newTaskText.trim() !== '') {
                    task.text = newTaskText.trim();
                    renderTasks(filter);
                }
            });
        });
    };

    // Filter tasks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(btn.getAttribute('data-filter'));
        });
    });

    // Initial render
    renderTasks();
});