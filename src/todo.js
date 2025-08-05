const createTodo=(title,description,dueDate,priority)=>{
    let completed = false;
    const toggleCompleted = () => {
        completed = !completed;
    };
    return {
        title,
        description,
        dueDate,
        priority,
        getCompleted(){
            return completed;
        },
        toggleCompleted,
    };
}
export default createTodo;