import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { nanoid } from "nanoid";
import { useAutoAnimate } from '@formkit/auto-animate/react'


export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [animationParent] = useAutoAnimate()

  const todayDate = new Date().toLocaleDateString("tr-TR", {});


  useEffect(() => {
    // Load todos from localStorage on mount
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("Lütfen bir todo giriniz");
    } else {
      setTodos([...todos, { id: nanoid(), title: todo }]);
      setTodo("");
    }
  };

  const deleteTodo = (i) => {
    const newTodos = todos.filter((todo) => todo.id !== i);
    setTodos(newTodos);
  };

  return (
    <div className="container mx-auto p-12">
      <form
        className="w-full flex justify-start items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="focus:shadow-[0px_20px_50px_rgba(8,_112,_184,_0.1)] transition-shadow w-full p-4 rounded-tl-lg rounded-bl-lg focus:outline-none text-white font-poppins font-bold tracking-wider  bg-gray-700"
        />
        <button
          className="bg-gray-700/50 text-green-200 flex-1 justify-center items-center  p-4 rounded-tr-lg rounded-br-lg hover:bg-gray-700/10 transition-colors "
          type="submit"
        >
          Ekle
        </button>
      </form>

      <ul className="mt-6 flex flex-col gap-y-5 " ref={animationParent}>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="px-2 py-3 w-full bg-gray-700/50 text-white font-poppins font-medium rounded-md flex justify-between items-center"
          >
            <div>
              <span className="bg-gray-800 py-3 mr-5 px-3 rounded-md">
                {todayDate}
                </span>
              {todo.title}
            </div>
            <button
              className="text-xl mr-5"
              onClick={() => deleteTodo(todo.id)}
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
