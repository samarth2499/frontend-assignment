import React, { useState } from 'react';
import TodoItem from '../types/TodoItemType'
import dataTodos from '../data/TodoItemData';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>(dataTodos);
    const [fruits, setFruits] = useState<TodoItem[]>([]);
    const [vegetables, setVegetables] = useState<TodoItem[]>([]);

    //  add item to fruits/vegetables column
    const addItemToColumn = (item: TodoItem) => {
        if (item.type === 'Fruit') {
            setFruits((prev) => [...prev, item]);
        } else {
            setVegetables((prev) => [...prev, item]);
        }

        // Remove the item from the main list
        setTodos((prev) => prev.filter(todo => todo.name !== item.name));

        // Once moved, each button will have 5 seconds on the screen and then will be moved back to the bottom of the main list.
        setTimeout(() => {

            setTodos((prev) => {
                if (prev.some(todo => todo.name === item.name) == false) {
                    return [...prev, item];
                }
                return prev;
            });
            if (item.type === 'Fruit') {
                setFruits((prev) => prev.filter(fruit => fruit.name !== item.name));
            } else {
                setVegetables((prev) => prev.filter(veg => veg.name !== item.name));
            }
        }, 5000);
    };

    // remove item to main column
    const removeItemToMain = (item: TodoItem) => {
        setTodos((prev) => [...prev, item]);
        setFruits((prev) => prev.filter(fruit => fruit.name !== item.name));
        setVegetables((prev) => prev.filter(veg => veg.name !== item.name));
    };

    return (
        <div className="flex flex-1 w-full flex-row">
            <div className="card bg-base-200 rounded-box  h-lvh  flex-grow gap-2">
                <h1><strong>Main List</strong></h1>
                <div className="space-y-2 flex flex-col align-top">
                    {todos.map((todo) => (
                        <>
                            <button
                                key={todo.name}
                                onClick={() => addItemToColumn(todo)}
                                className="btn  p-4 bg-blue-200 rounded-md"
                            >
                                {todo.name}
                            </button>
                        </>
                    ))}
                </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>
            <div className="card bg-base-200 rounded-box  h-lvh  flex-grow gap-2">
                <h1><strong>Fruit List</strong></h1>
                <div className="space-y-2 flex flex-col align-top">
                    {fruits.map((fruit) => (
                        <button
                            key={fruit.name}
                            onClick={() => removeItemToMain(fruit)}
                            className="btn bg-orange-200"
                        >
                            {fruit.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>
            <div className="card bg-base-200 rounded-box  h-lvh  flex-grow  gap-2">
                <h1><strong>Vegetable List</strong></h1>
                <div className="space-y-2 flex flex-col align-top">
                    {vegetables.map((fruit) => (
                        <button
                            key={fruit.name}
                            onClick={() => removeItemToMain(fruit)}
                            className="btn bg-green-200"
                        >
                            {fruit.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
