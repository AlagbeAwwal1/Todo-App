// we need useState and useEffect hooks
import { useState, useEffect } from "react";

// icons from react icons kit
// main Icon component
import { Icon } from "react-icons-kit";

// icons themselves
import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

export const Form = () => {
  const [todoValue, setTodoValue] = useState("");

  // todo value state

  const getTodosFromLS = () => {
    const data = localStorage.getItem("Todos");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [todos, setTodos] = useState(getTodosFromLS());

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();

    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };

    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });

    setTodos(filtered);
  };

  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState();

  const handleEdit = (todo, index) => {
    setEditForm(true);
    setId(index);
    setTodoValue(todo.TodoValue);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setTodoValue("");
    setEditForm(false);
  };

  const handleCheckbox = (id)=>{
    let todoArray = [];
    todos.forEach((todo)=>{
        if (todo.ID===id){
            if (todo.completed===false){
                todo.completed=true;
            }
            else if(todo.completed===true){
                todo.completed=false
            }
        }
        todoArray.push(todo)
        setTodos(todoArray)
    })
  }
  return (
    <>
      {/* form component */}
      {editForm === false && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Add an Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              <div className="button">
                <button type="submit">
                  <Icon icon={plus} size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* end of form component */}

      {/* edit form component */}
      {editForm === true && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Add an Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              <div className="button edit">
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* end of form component */}

      {todos.length > 0 && (
        <>
          {todos.map((individualTodo, index) => (
            <div className="todo" key={individualTodo.ID}>
              <div>
                {editForm === false && (<input type="checkbox" onChange={()=>handleCheckbox(individualTodo.ID)} checked={individualTodo.completed}/>)}
                <span style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>{individualTodo.TodoValue}</span>
              </div>

              {editForm === false && (
                <div className="edit-and-delete">
                  <div
                    style={{ marginRight: 7 + "px" }}
                    onClick={() => handleEdit(individualTodo, index)}
                  >
                    <Icon icon={edit2} size={18} />
                  </div>
                  <div onClick={() => handleDelete(individualTodo.ID)}>
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                setTodos([]);
              }}
              className="delete-all"
            >
              DELETE ALL{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
};
