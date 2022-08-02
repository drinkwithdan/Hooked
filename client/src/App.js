import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Products from './components/Products/Products'
import Checkout from './components/Checkout/Checkout'
import Show from './components/Show/Show'
import Create from './components/Create/Create'
import Footer from './components/Footer/Footer'
import SignIn from './components/User/SignIn'
import SignUp from './components/User/SignUp'
import SignOut from './components/User/SignOut'
import Cart from './components/Checkout/Cart/Cart'

const App = () => {
  const [fishList, setFishList] = useState(null)
  const [authorised, setAuthorised] = useState(null)
  const navigate = useNavigate()

  const getFish = async() => {
    const url = 'http://localhost:4000/fish'
    const res = await fetch(url)
    const data = await res.json()
    setFishList(data)
  }

  const handleAuth = (authed) => {
    setAuthorised(authed)
    navigate("/")
  }

  const handleLogout = () => {
    setAuthorised(false)
    navigate("/")
  }

  // Activate once login route is working
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch('/users/isauthorised')
      const data = await res.json()
      console.log(data.msg)
      setAuthorised(data.authorised)
    }
    checkIfLoggedIn()
  }, [])

  useEffect(() => {
    getFish()
  },[])

  return (
    <div>
      {fishList &&
        <Navbar fishList={fishList}/>
      }

      <Routes>
        <Route 
          path='/' 
          element={fishList && <Products
            fishList={fishList} 
          />}
        />
        <Route 
          path='/:fishID' 
          element={fishList && <Show
            fishList={fishList}
          />}
        />
        <Route 
          path="/new"
          element= {<Create />}
        />
        <Route
          path='/cart' 
          element={fishList && <Cart
            fishList={fishList}
          />}
        />
        <Route
          path='/checkout' 
          element={fishList && <Checkout
            fishList={fishList}
          />}
        />
         <Route 
          path='/signin' 
          element={ <SignIn handleLogin={handleAuth} />}
        />
        <Route 
          path='/signup' 
          element={ <SignUp handleRegister={handleAuth}/>}
        />
        <Route 
          path="/signout"
          element={<SignOut handleSignout={handleLogout}/>}
        />
      </Routes>
      <Footer/>
        
    </div>
  )
}

export default App