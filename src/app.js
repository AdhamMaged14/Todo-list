// src/app.js
import createProject from './project';
import createTodo from './todo';
import { saveProjects, loadProjects } from './storage';

const App = (() => {
 let rawProjects = loadProjects();

  let projects = rawProjects.map(p => {
    const project = createProject(p.name);
    p.todos?.forEach(t => {
      project.addTodo(createTodo(t.title, t.description, t.dueDate, t.priority));
    });
    return project;
  });


  let activeProject = projects[0] || null;

  const addProject = (project) => {
    projects.push(project);
    if (!activeProject) activeProject = project;
    saveProjects(projects);
  };

  const removeProject = (name) => {
    const index = projects.findIndex(p => p.name === name);
    if (index !== -1) {
      projects.splice(index, 1);
      if (activeProject?.name === name) {
        activeProject = projects[0] || null;
      }
      saveProjects(projects);
    }
  };

  const getProject = (name) => {
    return projects.find(p => p.name === name);
  };

  const getAllProjects = () => [...projects];

  const setActiveProject = (name) => {
    const found = getProject(name);
    if (found) activeProject = found;
  };

  const getActiveProject = () => activeProject;

  const save = () => {
  const raw = projects.map(p => ({
    name: p.name,
    todos: p.getTodos(), // assumes project.js has getTodos()
  }));
  saveProjects(raw);
};


  return {
    addProject,
    removeProject,
    getProject,
    getAllProjects,
    setActiveProject,
    getActiveProject,
    save, // expose save so you can call App.save() from anywhere
  };
})();

export default App;
