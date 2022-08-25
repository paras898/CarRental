
import './App.css';
import {Routes,BrowserRouter, Route}  from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route  path='/booking/:carid' element={<BookingCar/>} exact/>
          <Route path="/userbookings" element={<UserBookings />}></Route>
          <Route path="/addcar" element={<AddCar />}></Route>
          <Route path="/editcar/:carid" element={<EditCar />}></Route>
          <Route path="/admin" element={<AdminHome />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

