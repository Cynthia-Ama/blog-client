import {Routes, Route} from 'react-router-dom'
import { useGlobalContext } from './components/Context'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import WritePost from './pages/WritePost'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'

function App() {
  const { currentuser } = useGlobalContext()
  return (
    <div className="App">
      <div className="container">
        <Navbar/>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/post/:id' element={<SinglePost/>}></Route>
          <Route path='/write' element={<WritePost/>}></Route>
          <Route path='/register' element={currentuser ? <Home/> : <Register/>}></Route>
          <Route path='/login' element={currentuser ? <Home/> : <Login/>}></Route>
          <Route path='*' element={<Error/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
