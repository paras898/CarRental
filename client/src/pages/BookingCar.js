import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner';
import { Row,Col ,Divider,DatePicker, Checkbox, Modal} from 'antd';
import moment from 'moment'
import DefaultLayout from '../components/DefaultLayout'
import { bookCar } from '../redux/actions/bookingActions';
import AOS from 'aos';
import 'aos/dist/aos.css';
const {RangePicker} = DatePicker
function BookingCar({match}){
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const [car,setcar] = useState(0)
  const dispatch = useDispatch()
  const [from,setFrom] = useState()
  const [to,setTo] = useState()
  const [totalHours,setTotalHours] = useState()
  const {carid}= useParams()
  const [driver,setDriver] = useState(false)
  const [totalAmount,setTotalAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  useEffect(()=> {
    if(cars.length==0){
      dispatch(getAllCars())
    }
    else{
      setcar(cars.find(o=>o._id==carid))
    }
  },[cars])
  useEffect(()=> {
    setTotalAmount((totalHours*car.rentPerHour))
    if(driver){
       setTotalAmount(totalAmount+ (totalHours*30))  
    }
  },[driver,totalHours])
  function selectTimeSlots(values){
    setFrom(moment(values[0]).format('MM DD yyyy HH:mm'))
    setTo(moment(values[1]).format('MM DD yyyy HH:mm'))
    setTotalHours(values[1].diff(values[0],'hours'))
  }
  function bookNow(){
    const reqObj={
      user:JSON.parse(localStorage.getItem('user'))._id,
      car:car._id,
      totalHours,
      totalAmount,
      driverRequired:driver,
      bookedTimeSlots:{
        from,
        to,
      }
    }
    dispatch(bookCar(reqObj))
  }
  return (
    <DefaultLayout>
      {loading && (<Spinner/>)}
      <Row justify='center'  className='d-flex align-items-center' style={{minHeight:'90vh'}}>
        <Col lg={10} sm={24} xs={24}className='p-2'>
          <img src={car.image} className='carimg2 bs1 w-100 ' data-aos='flip-left' data-aos-duration='1500'  />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type='horizontal'dashed >Car Info</Divider>
          <div className='text-right'>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Person : {car.capacity}</p>
          </div>

          <Divider type='horizontal'dashed >Select Time Slots</Divider>
          <div className='text-right' >
            <RangePicker showTime={{format:'HH:mm'}} format='MM DD yyyy HH:mm' onChange={selectTimeSlots}/>
            <br/>
            <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}> See Booked Slots</button>
            {from && to && (
              <div>
                <p>Total Hours: <b>{totalHours}</b></p>
                <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                <Checkbox onChange={(e)=>{
                  if(e.target.checked){
                    setDriver(true);
                  }
                  else {
                    setDriver(false)
                  }
                }}>Driver Required</Checkbox>
                <h3>Total Amount: {totalAmount}</h3>

                <button className='btn1' onClick={bookNow}>Book Now</button>
              </div>
            )}
          </div>
          
        </Col>
        {car.name &&(
          <Modal visible={showModal} closable={false} footer={false} title='Booked time Slots' >
            <div className='p-2'> 
            {car.bookedTimeSlots.map((slots)=>{
              return <button className='btn1 mt-2' >{slots.from}-{slots.to}</button>
            })}
            <div className='text-right mt-5'>
              <button className='btn1' onClick={()=>{setShowModal(false)}} >CLOSE</button>
            </div>
          </div>
  
          </Modal>
        )}
      </Row>
        
      
    </DefaultLayout>
  )
} 

export default BookingCar