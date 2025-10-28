import React, { useState } from "react"
import "./AddToDo.css";

export function AddTodo({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value)
        if (errorMessage) setErrorMessage(''); // Caso o usuário comece a digitar algo vamos setar o errorMessage como falso para retirarmos a mensagem da tela
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") { // Quando o usuario apertar o botão de submit e ele não tenha digitado nada vamos setar uma mensagem de erro
            setErrorMessage("Digite uma tarefa antes de adicionar")
        } else {
            // Adicionar a tarefa
            onAddTodo(inputValue.trim()); // Vamos passar o que foi digitado como props para ser utilizado no componente de lista
            setInputValue('');
            setErrorMessage('');
        }
    }

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input type="text"
                    placeholder="Digite uma nova tarefa..."
                    className="todo-input"
                    onChange={handleChange}
                    value={inputValue}
                />

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <button type="submit" className="add-button">Adicionar</button>
        </form>

    )
}

export default AddTodo