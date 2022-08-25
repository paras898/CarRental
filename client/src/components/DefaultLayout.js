import React from 'react'
import { Button, Dropdown, Menu,Row,Col } from 'antd';
import {Link} from 'react-router-dom'
const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">
          Bookings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">
          Admin
        </a>
      </Menu.Item>
      <Menu.Item onClick={()=>{
        localStorage.removeItem('user');
        window.location.href='/login'
      }} >
        <li style={{color:'orangered'}}>
          Logout
        </li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
        <div className='header bs1'>
          <Row gutter={16} justify='center'>
            <Col lg={20} sm={24} sx={24} >
              <div  className='d-flex justify-content-between'>

                <h1 style={{color:'orangered'}}><Link to='/' style={{color:'orangered'}}>CarRental</Link></h1>
                <Dropdown overlay={menu} placement="bottom" arrow>
                  <Button>{user.username}</Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
            
        </div>
        <div className='content'>
            {props.children}
        </div>
        <div className='footer text-center'>
        <hr/>
          <p>Designed and Developed By</p>
          
          <p>PARAS</p>
        </div>

    </div>
  )
}

export default DefaultLayout