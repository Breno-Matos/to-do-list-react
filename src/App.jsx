import './index.css';
import './App.css';
import AddTodo from './components/AddToDo';
import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([])

  // Sempre que a aplicação for carregada iremos buscar e verificar se há informação no local storage, caso haja iremos setar as informações do localStorage para ser exibidas na aplicação
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTodos(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Salvando as tarefas no localStorage sempre que haja alguma alteração na lista de tarefas
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo])
  }

  // Função para remover um item da lista
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)) // Para cada item da lista vamos criar uma nova lista mas sem aquele que tem o mesmo id que foi clicado
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo) // Vai percorre o array e onde o id for igual ao id do elemento que clicado irá mudar o alternar o completed
    )
  }

  return (
    <div className='container'> 
      <h1 className='app-title'>Lista de Tarefas</h1>
     <AddTodo onAddTodo={addTodo}/>
      
      <TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo}/>
    </div>
  )
}

export default App
