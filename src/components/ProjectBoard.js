import React from 'react'
import {Link} from "react-router-dom"
import ProjectTaskItem from "./ProjectTask/ProjectTaskItem"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {fetchTasks} from "../actions/projectTaskAction"
import {useEffect} from "react"
import projectTaskReducer from '../reducers/projectTaskReducer'


const ProjectBoard = (props) => {
    
    useEffect(() => {
        props.fetchTasks();
    }, [])

    const {project_tasks}=props.project_tasks

    let Board;
    let toDoItems=[]
    let doneItems=[]
    let inProgressItems=[]
    //let task;

    const BoardAlgorithm=project_tasks=>{
        if(project_tasks.length<1) 
            return <div className="alert alert-info text-center" role="alert">No Project Tasks</div>
        else{
            const tasks=project_tasks.map(task=>(
                <ProjectTaskItem key={task.id} task={task}/>
            ));

            for(let i=0;i<tasks.length;i++){
                if(tasks[i].props.task.status=='TO_DO') toDoItems.push(tasks[i]);
                else if(tasks[i].props.task.status=='DONE') doneItems.push(tasks[i]);
                else inProgressItems.push(tasks[i]);
            }

            return (<React.Fragment>
                <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {toDoItems}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inProgressItems}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneItems}                 
                </div>
            </div>
        </div>
            </React.Fragment>)
        }
    }

    Board=BoardAlgorithm(project_tasks)

    return (
        <div className="container">
        <Link to="/addProjectTask" className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {Board}
    </div>
    )
}

ProjectBoard.propTypes={
    fetchTasks: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    project_tasks: state.project_tasks
})

export default connect(mapStateToProps,{fetchTasks})(ProjectBoard)
