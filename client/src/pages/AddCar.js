import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch,useSelector} from 'react-redux'
import Spinner from '../components/Spinner';
import {addCar} from '../redux/actions/carsActions'
function AddCar(){
    const {loading} = useSelector(state=>state.alertsReducer)
    const dispatch= useDispatch()
    function onFinish(values){
        values.bookedTimeSlots=[]
        dispatch(addCar(values))
        
        console.log(values)
    }
  return (
    <DefaultLayout>
        {loading && (<Spinner/>)}
        <Row justify='center mt-5'>
            <Col lg={12} sm={24} xs={24} className='p-2'>
                <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                    <h3>Add New Car</h3>
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
                    <div className='text-right'><button className='btn1'>ADD CAR</button></div>
                </Form>
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddCar