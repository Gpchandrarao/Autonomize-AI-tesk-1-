import React, { useState } from "react";

import { TiPencil } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";

import "./App.css";

const getTodoFromLocal = () => {
  const storedTodo = localStorage.getItem("save");
  return storedTodo ? JSON.parse(storedTodo) : [];
};

const App = () => {
  const [inputElement, setInputElement] = useState("");
  const [updateInputElement, setUpdateInputElement] = useState({
    id: null,
    text: "",
  });

  const [addTodo, setAddTodo] = useState(getTodoFromLocal());
  const [addCount, setAddCount] = useState({});
  const [showUpdateInput, setShowUpdateInput] = useState(false);

  const heandelOnchange = (e) => {
    setInputElement(e.target.value);
  };

  const saveTodoLocal = (todos) => {
    localStorage.setItem("save", JSON.stringify(todos));
  };

  const heandelOnsubmit = (e) => {
    e.preventDefault();
    const preTodo = inputElement.trim();

    if (!preTodo) {
      return;
    }

    const existTodo = addTodo.findIndex((todo) => todo.text === preTodo);

    if (existTodo !== -1) {
      const newAddCount = { ...addCount };
      newAddCount[preTodo] = (newAddCount[preTodo] || 0) + 1;
      setAddCount(newAddCount);
      setInputElement("");
      return;
    }

    const newTodos = { text: preTodo, id: Math.random(), addCount: 0 };

    setAddTodo([...addTodo, newTodos]);
    saveTodoLocal([...addTodo, newTodos]);
    setInputElement("");
  };

  const heandelDelete = (id) => {
    const deleteTodo = addTodo.filter((todo) => todo.id !== id);
    saveTodoLocal(deleteTodo);
    setAddTodo(deleteTodo);
  };

  const heandelUpdateTodo = (e) => {
    setUpdateInputElement({ ...updateInputElement, text: e.target.value });
  };

  const showupdate = () => {
    setShowUpdateInput(!showUpdateInput);
  };

  const updataButton = (id) => {
    const updataTodo = addTodo.map((todo) =>
      todo.id === id ? { ...todo, text: updateInputElement.text } : todo
    );
    setAddTodo(updataTodo);
    saveTodoLocal(updataTodo);
    setUpdateInputElement({ id: null, text: "" });
  };

  return (
    <div className="app-container">
      <h1>Day Goals!</h1>
      <div className="todo-container">
        <form className="input-container" onSubmit={heandelOnsubmit}>
          <input
            type="text"
            value={inputElement}
            placeholder="Type here..."
            onChange={heandelOnchange}
          />
          <button type="submit">Add Todo</button>
        </form>

        <ul className="ul-container">
          {addTodo.map((eachTodo, index) => (
            <li key={eachTodo.id}>
              <p>
                {eachTodo.text}
                {addCount[eachTodo.text] > 0 &&
                  `(change ${addCount[eachTodo.text] + 1} Times)`}
              </p>
              <div>
                <TiPencil
                  className="update-icon"
                  onClick={() => showupdate()}
                />
                {showUpdateInput ? (
                  <div>
                    <input
                      type="text"
                      value={updateInputElement.text}
                      id={eachTodo.id}
                      onChange={heandelUpdateTodo}
                      className="update-input"
                    />
                    <button
                      type="button"
                      className="update-button"
                      onClick={() => updataButton(eachTodo.id)}
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <MdDeleteForever
                  className="cross-icon"
                  onClick={() => heandelDelete(eachTodo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
