import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import './styles/buttons.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/About'
import 'react-toastify/dist/ReactToastify.css';
import Tasks from './pages/Tasks';

function App() {
 

  return (
    <>
   
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/about" element={<About />} />
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
