import React, { useState, useEffect } from "react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error(
                "LocalStoragedan ma'lumotni yuklashda xatolik:",
                error
            );
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("todos", JSON.stringify(todos));
        } catch (error) {
            console.error(
                "LocalStoragega ma'lumotni saqlashda xatolik:",
                error
            );
        }
    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Todo List
                </h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Yangi todo qo'shing..."
                        className="border p-2 rounded-l-lg w-full"
                    />
                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
                    >
                        Qo'shish
                    </button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center mb-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <span
                                onClick={() => toggleTodo(todo.id)}
                                className={`flex-grow cursor-pointer ${
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : "text-black"
                                }`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                O'chirish
                            </button>
                        </li>
                    ))}
                </ul>
                {todos.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        Todo ro'yxati bo'sh.
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;
