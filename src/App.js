//import logo from './logo.svg';
//import './App.css';
import react, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "Donald",
      toDoList : [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
      showCompleted:true
    }
  }
  UpdateNewItemText = (event) => {
    this.setState({newToDoItemText: event.target.value });
    }

    createNewTodo = (task) =>{
    
    if(!this.state.toDoList.find(item => item.action === task)){
      this.setState({
        toDoList:[...this.state.toDoList, {action:task, done:false}],
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }
  toggleTodo = (todo) =>{
    this.setState({
      toDoList : this.state.toDoList.map(item => item.action === todo.action ? {...item, done : !item.done} : item)
    })
  }

  todoTableRows = (doneState) =>
    this.state.toDoList.filter(item => item.done == doneState).map(item =>
     <TodoRow key={item.action} item ={item} callback={this.toggleTodo}></TodoRow>
    )
    componentDidMount = () => {
      let data = localStorage.getItem("todos");
      this.setState(data != null
      ? JSON.parse(data)
      : {
      userName: "Adam",
      todoItems: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
      showCompleted: true
      });
      }

  render = () => {
   return(
    <div>

      <TodoBanner name={this.state.name} tasks ={this.state.toDoList}></TodoBanner>
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo}></TodoCreator>
     
      <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Description</th><th>Done</th></tr>
        </thead>
        <tbody>{ this.todoTableRows(false) }</tbody>
      </table>
      <div className="bg-secondary text-center text-white m-2">
        <VisibilityControl isChecked={this.state.showCompleted} callback={(checkState) => this.setState({showCompleted : checkState})}></VisibilityControl>
        
      </div>
      <div >
      {
          this.state.showCompleted && 
        <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Description</th><th>Done</th></tr>
        </thead>
        <tbody>{ this.todoTableRows(true) }</tbody>
      </table>
        }
      </div>
    </div>
    </div>
   )
  };
}


