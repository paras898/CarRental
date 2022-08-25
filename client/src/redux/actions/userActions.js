import axios from 'axios';
import { message } from 'antd';
export const userLogin=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await axios.post('/api/users/login',reqObj)
        localStorage.setItem('user',JSON.stringify(response.data))
        setTimeout(()=>{
            window.location.href='/'
            message.success('Login successfull')
        },500)
        dispatch({type: 'LOADING' ,payload:false})
    } catch (error) {
        console.log(error)
        message.error("Something went wrong")
        dispatch({type:'LOADING',payload:false})
    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await axios.post('/api/users/register',reqObj)
        setTimeout(()=>{
            window.location.href='/login'
            message.success('Registration successfull')
        },500)
        
        dispatch({type: 'LOADING' ,payload:false})
    } catch (error) {
        console.log(error)
        message.error("Something went wrong")
        dispatch({type:'LOADING',payload:false})
    }
}