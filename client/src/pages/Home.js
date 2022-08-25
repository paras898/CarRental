import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Row,Col ,DatePicker} from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import moment from 'moment';
const {RangePicker} = DatePicker
const Home = () => {
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
  function setFilter(values){
    var selectedFrom = moment(values[0],'MM DD yyyy HH:mm')
    var selectedTo = moment(values[1],'MM DD yyyy HH:mm')
    var temp=[]
    for(let car of cars){
      if(car.bookedTimeSlots.length==0){
        temp.push(car)
      }
      else{
        for(let booking of car.bookedTimeSlots){
          if(selectedFrom.isBetween(booking.from , booking.to) || 
           selectedTo.isBetween(booking.from , booking.to) || 
           moment(booking.from).isBetween(selectedFrom,selectedTo) ||
           moment(booking.to).isBetween(selectedFrom,selectedTo)
           )
            {

            }
          else{
            temp.push(car)
          }
        }
      }
    }
    setTotalcars=temp
  }
  return (
    <DefaultLayout>
      <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker showTime={{format:'HH:mm'}} format='MM DD yyyy HH:mm' onChange={setFilter}/>
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
                <div>
                  <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                </div>
              </div>
            </div> 
          </Col>
        })}
      </Row>
    </DefaultLayout>
  )
}

export default Home