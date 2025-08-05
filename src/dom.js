// src/dom.js
import App from './app';
import createProject from './project';
import createTodo from './todo';

const DOM = (() => {
  const projectListEl = document.getElementById('project-list');
  const todoListEl = document.getElementById('todo-list');
  const projectTitleEl = document.getElementById('project-title');

  const renderProjects = () => {
    projectListEl.innerHTML = '';

    App.getAllProjects().forEach(project => {
      const container = document.createElement('div');
      container.classList.add('project');

      const button = document.createElement('button');
      button.textContent = project.name;
      button.addEventListener('click', () => {
        App.setActiveProject(project.name);
        renderTodos();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.classList.add('deleteEmoji');
      deleteBtn.addEventListener('click', () => {
        App.removeProject(project.name);
        App.save();
        renderProjects();
        renderTodos();
      });

      container.appendChild(button);
      container.appendChild(deleteBtn);
      projectListEl.appendChild(container);
    });
  };

  const renderTodos = () => {
    const project = App.getActiveProject();
    if (!project) return;

    projectTitleEl.textContent = project.name;
    todoListEl.innerHTML = '';

    project.getTodos().forEach(todo => {
      const item = document.createElement('div');
      item.classList.add('todo');

      const title = document.createElement('h3');
      title.textContent = todo.title;

      const desc = document.createElement('p');
      desc.textContent = todo.description;

      const due = document.createElement('p');
      due.textContent = `Due: ${todo.dueDate}`;

      const priority = document.createElement('p');
      priority.textContent = `Priority: ${todo.priority}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete');
      deleteBtn.addEventListener('click', () => {
        project.removeTodo(todo.title);
        App.save();
        renderTodos();
      });

      item.appendChild(title);
      item.appendChild(desc);
      item.appendChild(due);
      item.appendChild(priority);
      item.appendChild(deleteBtn);

      todoListEl.appendChild(item);
    });
  };

  const setupEventListeners = () => {
    const projectForm = document.getElementById('project-form');
    const projectInput = document.getElementById('project-name');

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = projectInput.value.trim();
      if (name && !App.getProject(name)) {
        const newProject = createProject(name);
        App.addProject(newProject);
        App.setActiveProject(name);
        App.save();
        render();
        projectInput.value = '';
      }
    });

    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('todo-title').value.trim();
      const desc = document.getElementById('todo-desc').value.trim();
      const date = document.getElementById('todo-date').value;
      const priority = document.getElementById('todo-priority').value;

      if (title) {
        const newTodo = createTodo(title, desc, date, priority);
        App.getActiveProject().addTodo(newTodo);
        App.save();
        render();
        todoForm.reset();
      }
    });
  };

  const render = () => {
    renderProjects();
    renderTodos();
  };

  return {
    render,
    setupEventListeners,
  };
})();

export default DOM;
