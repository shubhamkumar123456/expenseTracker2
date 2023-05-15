
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DummyPage from './pages/DummyPage';
import ForgetPassword from './components/ForgetPassword';
import ExpensePage from './pages/ExpensePage';

function App() {

    const authToken = localStorage.getItem('authToken');
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dummypage' element={<DummyPage/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/expensepage' element={<ExpensePage/>}/>

      </Routes>
 
 
      </BrowserRouter>
    </div>
  );
}

export default App;
