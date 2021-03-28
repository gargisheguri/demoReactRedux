import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {deleteProjectTask} from '../../actions/projectTaskAction'
import {connect} from 'react-redux'

const ProjectTaskItem = (props) => {

    const onDeleteClick=(pid)=>{
        props.deleteProjectTask(pid)
    }

    return (
        <div className="card mb-1 bg-light">

            <div className="card-header text-primary">{props.key}</div>
            <div className="card-body bg-light">
            <h5 className="card-title">{props.task.summary}</h5>
            <p className="card-text text-truncate ">
                {props.task.acceptanceCriteria}
                </p>
                <Link to={`updateProjectTask/${props.task.id}`} className="btn btn-primary">
                    View / Update
                </Link>

                <button className="btn btn-danger ml-4" onClick={onDeleteClick.bind(this, props.task.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

ProjectTaskItem.propTypes={
    deleteProjectTask: PropTypes.func.isRequired
}

//we don't need new state data returned
export default connect(null, {deleteProjectTask})(ProjectTaskItem)
