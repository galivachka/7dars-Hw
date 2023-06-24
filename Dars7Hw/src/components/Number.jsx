import { useState } from 'react'

const Todos = () => {
    // const [count, dispatch] = useReducer(reducer, initialState);

    const [newTodo, setNewTodo] = useState('');

    const [editingTodo, setEditingTodo] = useState(null);
    const [button, setButton] = useState('Submit');


    const [todos, setTodos] = useState(() => {
        const storeTodo = localStorage.getItem('todos');
        return storeTodo ? JSON.parse(storeTodo) : [];
    });

    const handleNewToDoChange = (e) => {
        setNewTodo(e.target.value);
    };
  

    const handleNewToDoSubmit2 = (e) => {
        e.preventDefault();

        if (!newTodo.trim()) return;


        if(editingTodo !== null){
            const updateToDo = todos.map((todo) => {
                if(todo.id === editingTodo){
                    return { ...todo, text: newTodo}
                }else{
                    return todo;
                }

            })
            setNewTodo(updateToDo)
            setEditingTodo(null);
            setNewTodo('')
            setButton('Submit')
        }else {
            setTodos([...todos, { id: Date.now(), text: newTodo }]);
            setNewTodo('')
        }

    }
   

    localStorage.setItem('todos', JSON.stringify(todos));

    const handleDeleteToDo = (id) => {
        const updtToDo = todos.filter((item) => item.id !== id);
        setTodos(updtToDo);
    }
    const handleEditToDo = (id) => {
        const ToDoEdit = todos.find((todo) => todo.id !== id);
        setEditingTodo(id);
        setNewTodo(ToDoEdit.text)
        setButton('Save')
    }
    return (
        <div>
           
            <form onSubmit={handleNewToDoSubmit2}>
                <label>
                    Number:
                    <input type="number" value={newTodo} onChange={handleNewToDoChange} />
                    
                </label>
                <button type='submit'>{button}</button>
                {
                    editingTodo !== null && (
                        <button type='button' onClick={() => setEditingTodo}>Cancel
                        </button>
                    )
                }
                
            </form>
           
            <ul>
                
                {
                    todos.map((item) => (
                        <li key={item.id}>
                            <span>{item.text}</span>
                            <button onClick={() => handleDeleteToDo(item.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todos;