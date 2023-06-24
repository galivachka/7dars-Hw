import { useState } from 'react'

const Todos = () => {
    // const [count, dispatch] = useReducer(reducer, initialState);

    const [newTodo, setNewTodo] = useState('');
    const [newTodo2, setNewTodo2] = useState('');

    const [editingTodo, setEditingTodo] = useState(null);
    const [button, setButton] = useState('Submit');


    const [todos, setTodos] = useState(() => {
        const storeTodo = localStorage.getItem('todos');
        return storeTodo ? JSON.parse(storeTodo) : [];
    });

    const handleNewTodoChange = (e) => {
        setNewTodo(e.target.value);
    };
    const handleNewTodoChange2 = (e) => {
        setNewTodo2(e.target.value);
    };

    const handleNewToDoSubmit = (e) => {
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
    // const handleNewToDoSubmit2 = (e) => {
    //     e.preventDefault();
    //     if (!newTodo2.trim()) return;


    //     if(editingTodo !== null){
    //         const updateToDo = todos.map((todo) => {
    //             if(todo.id === editingTodo){
    //                 return { ...todo, text: newTodo2}
    //             }else{
    //                 return todo;
    //             }

    //         })
    //         setNewTodo(updateToDo)
    //         setEditingTodo(null);
    //         setNewTodo('')
    //         setButton('Submit')
    //     }else {
    //         setTodos([...todos, { id: Date.now(), text: newTodo2 }]);
    //         setNewTodo('')
    //     }
    // }

    localStorage.setItem('todos', JSON.stringify(todos));

    const handleDeleteToDo = (id) => {
        const updtToDo = todos.filter((item) => item.id !== id);
        setTodos(updtToDo);
    }
    
    return (
        <div>
            <h1>User</h1>
            <form onSubmit={handleNewToDoSubmit}>
                <label>
                    Name:
                    <input type="text" value={newTodo} onChange={handleNewTodoChange} />
                    
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
                            {/* <button onClick={() => handleEditToDo(item.id)}>Edit</button> */}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todos;