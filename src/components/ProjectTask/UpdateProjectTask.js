import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProjectTask, addProjectTask} from '../../actions/projectTaskAction'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import classnames from 'classnames'

const UpdateProjectTask = (props) => {

    const {pid}=props.match.params; //pid from Route props in App.js
    const [status, setStatus]=useState("")
    const [summary, setSummary]=useState("")
    const [acceptanceCriteria, setAcceptanceCriteria]=useState("")
    const [errors, setErrors]=useState({})
    const [id, setId]=useState("")

    useEffect(() => {
        props.getProjectTask(pid)
    }, [])

    useEffect(() => {

        if(props.errors){
            setErrors(props.errors);
        }

        setId(props.project_task.id);
        setSummary(props.project_task.summary);
        setAcceptanceCriteria(props.project_task.acceptanceCriteria);
        setStatus(props.project_task.status);
    }, [props.project_task, props.errors])

    const onClickSubmit=(e)=>{
        e.preventDefault();
        const updatedTask={
            id: id,
            summary: summary, 
            acceptanceCriteria: acceptanceCriteria,
            status: status
        }
        // console.log(updatedTask);
        props.addProjectTask(updatedTask, props.history);
    }

    return (
        <div className="updateProjectTask">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/" className="btn btn-light">
                        Back to Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <form onSubmit={onClickSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" name="summary" placeholder="Project Task summary" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
                            <p>{errors.summary}</p>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria" value={acceptanceCriteria} onChange={(e)=>setAcceptanceCriteria(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

UpdateProjectTask.propTypes={
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addProjectTask: PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    project_task: state.project_tasks.project_task,
    errors: state.errors
})

export default connect(mapStateToProps, {getProjectTask, addProjectTask})(UpdateProjectTask)
