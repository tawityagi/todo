import React, { useState } from "react";
import ToDo from "./Todo";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(localStorage.getItem('itemsLS') ? JSON.parse(localStorage.getItem('itemsLS')) : []);
  React.useEffect(() => {
    localStorage.setItem('itemsLS', JSON.stringify(items));
  }, [items]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    if(inputText !== ""){
      setItems((prevItems) => {
        return [...prevItems, inputText];
      });
    }
    setInputText("");
  }
  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDo
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
