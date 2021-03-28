import axios from 'axios'
import {DELETE_PROJECT_TASK, GET_ERRORS} from "./types"
import {GET_PROJECT_TASKS, GET_PROJECT_TASK} from "./types"

//history-> props from Route
//async dispatch-> thunk
export const addProjectTask=(projectTask, history)=>async dispatch=>{
    try{
        await axios.post("http://localhost:8080/api/board", projectTask);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const fetchTasks=()=>async dispatch=>{
    const res=await axios.get("http://localhost:8080/api/board/all");
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    });
}

export const deleteProjectTask=(pid)=>async dispatch=>{
    if(window.confirm(`You are deleting project task: ${pid}`)) 
        await axios.delete(`http://localhost:8080/api/board/${pid}`);
    dispatch({
        type: DELETE_PROJECT_TASK,
        payload: pid
    })
}

export const getProjectTask=(pid, history)=>async dispatch=>{
    try{
        const res=await axios.get(`http://localhost:8080/api/board/${pid}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        })
    }
    catch(error){
        history.push("/")
    }
}