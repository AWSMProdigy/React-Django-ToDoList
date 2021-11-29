import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import axios from 'axios';
import { render } from 'react-dom';

function App() {

  const[todoList, setList] = useState([])

  React.useEffect(() => {
    refreshList();
  }, [])

  function refreshList(){
    axios.get("/api/todos")
    .then(res => {
      console.log(res.data)
      setList(res.data);
    }).catch(err => {})
  }

  function handleDelete(item) {
    axios.delete(`/api/todos/${item.id}/`)
    .then(res => {
      refreshList();
    }).catch(err => {})
  }

  function handleCreate(event) {
    event.preventDefault();
    console.log("kekw")
    var title = event.target[0].value;
    var description = event.target[1].value;
    if(title === "" || description === ""){
      console.log("Task must be fulfilled");
      return;
    }
    document.getElementById("createTaskForm").reset();
    const item = {title: title, description: description, completed: false};
    console.log(item);
    axios.post('/api/todos/', item)
    .then(res => {
      refreshList();
    })
  }

  function handleSuccess(item) {
    if(item.completed === true){
      alert("Already completed");
    }
    axios.put(`/api/todos/${item.id}/`, {title: item.title, description: item.description, completed: true})
    .then(res => {
      refreshList();
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
            <form onSubmit={handleCreate} id="createTaskForm">
              <label htmlFor="todoTitle">Title of task: <input type="text" id="todoTitle"/></label><br></br>
              <label htmlFor="todoDescription">Description of task: <input type="text" id="todoDescription"/></label><br></br>
              <input type="submit" value="Submit"></input>
            </form>
            </div>
            {todoList.map((todo) =>  (
            <div key={todo.id} className="loc">
                  <div className="loc">
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                         <h3>Completed: {todo.completed.toString()}</h3>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(todo)}
                          ></button>
                          <button
                            className="btn btn-success"
                            onClick={() => handleSuccess(todo)}
                          ></button>
                  </div>
            </div>
            )
        )}
          </div>
        </div>
      </div>
    </main>
    );
  }

export default App;
