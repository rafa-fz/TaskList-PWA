const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

//Botones a las tareas
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        const newRow = document.createElement('tr');

        const actionsCell = document.createElement('td');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.classList.add('complete-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');

        actionsCell.appendChild(completeButton);
        actionsCell.appendChild(deleteButton);

        const taskTextCell = document.createElement('td');
        taskTextCell.textContent = taskText;

        newRow.appendChild(taskTextCell);
        newRow.appendChild(actionsCell);

        taskList.appendChild(newRow);
        taskInput.value = '';

        // Event listener para marcar como completada
        completeButton.addEventListener('click', () => {
            taskTextCell.classList.toggle('completed');
        });

        // Event listener para eliminar tarea
        deleteButton.addEventListener('click', () => {
            newRow.remove();
        });
    }
});


// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}
