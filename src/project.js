;
const createProject = (name) => {
  const todos = [];

  const addTodo = (todo) => {
    todos.push(todo);

  };

  const removeTodo = (title) => {
    const index = todos.findIndex(t => t.title === title);
    if (index !== -1) {
      todos.splice(index, 1);
    }

  };

  const getTodos = () => [...todos]; 

  return {
    name,
    addTodo,
    removeTodo,
    getTodos,
  };
};

export default createProject;