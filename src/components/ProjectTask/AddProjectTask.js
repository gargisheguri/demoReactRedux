import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'   //to connect to redux store
import {addProjectTask} from '../../actions/projectTaskAction'

const AddProjectTask = (props) => {

    const [summary, setSummary]= useState("");
    const [acceptanceCriteria, setAcceptanceCriteria]= useState("");
    const [status, setStatus]= useState("");
    const [errors, setErrors]= useState({});

    // componentWillRecieveProps=(nextProps)=>{
    //     if(nextProps.errors) setErrors(nextProps.errors);     
    // }

    useEffect(() => {
        setErrors(props.errors)
    }, [props.errors])

    const onSubmit=(e)=>{
        e.preventDefault();
        const newProjectTask={
            summary: summary,
            acceptanceCriteria: acceptanceCriteria,
            status: status
        }
        props.addProjectTask(newProjectTask, props.history);
    }

    return (
        <div className="addProjectTask">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/" className="btn btn-light">
                        Back to Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" value={summary} name="summary" placeholder="Project Task summary" onChange={(e)=>setSummary(e.target.value)}/>
                            <p>{errors.summary}</p>
                        
                        </div>
                        

                        <div className="form-group">
                            <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" value={acceptanceCriteria} name="acceptanceCriteria" onChange={(e)=>setAcceptanceCriteria(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" value={status} name="status" onChange={(e)=>setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

AddProjectTask.propTypes={
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

//if store state changes, update errors
const mapStateToProps=state=>({
    errors: state.errors
})

//By passing action creator (addProjectTask) to connect, AddProjectTask comp. receives it as a prop, 
//and it will automatically dispatch the action when it’s called.

//equivalent to connect(mapStateToProps, mapDispatchToProps)(Component)
export default connect(mapStateToProps, {addProjectTask}) (AddProjectTask);
