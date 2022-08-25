import React, { useEffect, useState } from 'react'
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Row,Col} from 'antd';
import Spinner from '../components/Spinner';
import { message, Popconfirm } from 'antd';
import { deleteCar } from '../redux/actions/carsActions';
import { Link } from 'react-router-dom';
import moment from 'moment';
const AdminHome = () => {
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const dispatch = useDispatch()
  var [totalCars, setTotalcars] = useState([])
  useEffect(()=> {
    dispatch(getAllCars())
  },[])
  
  useEffect(()=> {
    setTotalcars(cars)
  },[cars])
  
  return (
    <DefaultLayout>
        <Row gutter={16} className='mt-2'>
            <Col lg={20} sm={24}>
                <div className='d-flex justify-content-between align-items-center'>
                  <h3 className='m-1 mr-2'>Admin Panel</h3>
                  <button className='btn1'><a href='/addcar'>ADD CAR</a></button>
                </div>
            </Col>
        </Row>
      {loading===true && (<Spinner/>)}
      <Row justify='center' gutter={16} >
        {totalCars.map(car=>{
          return <Col lg={5} sm={24} xs={24}>
            <div className='car p-2 bs1' >
              <img src={car.image} className="carimg" />
              <div className='car-content d-flex align-items-center justify-content-between'>
                <div className='text-left pl-2'>
                  <p>{car.name}</p>
                  <p>Rent Per Hour {car.rentPerHour} /-</p>
                </div>
                <div className='mr-4'>
                    <Link to= {`/editcar/${car._id}`}><EditOutlined className='mr-3' style={{color:'green',cursor:'pointer'}} /></Link>
                    <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={()=>{dispatch(deleteCar({carid:car._id}))}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{color:'red',cursor:'pointer'}}/>
                    </Popconfirm>
                    
                </div>
              </div>
            </div> 
          </Col>
        })}
      </Row>
    </DefaultLayout>
  )
}

export default AdminHome