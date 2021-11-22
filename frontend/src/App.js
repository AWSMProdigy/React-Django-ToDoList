import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import axios from 'axios';
import { render } from 'react-dom';

function App() {

  const[todoList, setList] = useState([])

  function renderList(){

    axios.get("http://localhost:8000/api/todos")
    .then(res => {
      setList(res.data);
    }).catch(err => {})
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
              >
                Add task
              </button>
            </div>
            <ul className="list-group list-group-flush border-top-0">
              {todoList}
            </ul>
          </div>
        </div>
      </div>
    </main>
    );
  }

export default App;
