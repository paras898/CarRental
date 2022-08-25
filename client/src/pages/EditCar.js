import React, { useEffect,useState } from 'react'
import { Col, Form, Input, Row } from 'antd'
import { useParams } from 'react-router-dom'
import { getAllCars } from '../redux/actions/carsActions'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch,useSelector} from 'react-redux'
import Spinner from '../components/Spinner';
import {editCar} from '../redux/actions/carsActions'
function EditCar(){
    const {cars}= useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const dispatch= useDispatch()
    const [ car,setcar]= useState()
    const [totalcars, settotalcars] = useState([])
    const {carid}= useParams()
    useEffect(()=> {
        
        if(cars.length==0){
            dispatch(getAllCars())
          }
          else{
            settotalcars(cars)
            setcar(cars.find(o=>o._id==carid))
            console.log(car)
          }
    },[cars])
    function onFinish(values){
        values._id=car._id
        dispatch(editCar(values))
        
        console.log(values)
    }
  return (
    <DefaultLayout>
        {loading && (<Spinner/>)}
        <Row justify='center mt-5'>
            <Col lg={12} sm={24} xs={24} className='p-2'>
                {totalcars.length>0 && (<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                    <h3 className='align-items-center justify-center'>Edit Car</h3>
                    <Form.Item name='name' label='Car Name' rules={[{required:true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='image' label='Image URL' rules={[{required:true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{required:true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='capacity' label='Capacity' rules={[{required:true}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name='fuelType' label='Fuel Type' rules={[{required:true}]}>
                        <Input></Input>
                    </Form.Item>
                    <div className='text-right'><button className='btn1'>EDIT CAR</button></div>
                </Form>)}
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default EditCar