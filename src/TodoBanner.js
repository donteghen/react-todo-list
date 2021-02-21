import react, { Component } from "react";

export class TodoBanner extends Component{
    render = () => 
        <div className="text-center bg-primary text-white">
            <h5 className="p-2">{ this.props.name }'s To Do List ({this.props.tasks.filter(item => item.done != true).length} items to do)</h5>
        </div>
    
}