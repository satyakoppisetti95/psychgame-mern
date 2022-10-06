
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateGame from './pages/CreateGame'

function App() {
  return (
    <>
      <Router>
        <Header />
        
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreateGame />} />
        </Routes>
        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
