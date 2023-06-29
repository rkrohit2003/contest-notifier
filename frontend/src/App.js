import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Platform } from './components/platform/Platform';
import { Contest } from './components/contests/Contest'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import './App.css';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import { useEffect, useState } from 'react';
import { Profile } from './components/profile/Profile';
import { UserNameProvider } from './UserNameContext';
import { Error } from './components/error/Error';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedLog = localStorage.getItem('isLoggedIn');
    if (storedLog !== '') {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <BrowserRouter basename="/contest-notifier">
      <UserNameProvider>
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
    <Route path='/' element={<Platform/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='contact' element={<Contact/>}></Route>
    <Route path='/contestpage/:Val' element={<Contest/>}></Route>
    <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn}/>}></Route>
    <Route path='/signin' element={<SignIn setIsLoggedIn={setIsLoggedIn}/>}></Route>
    {isLoggedIn && <Route path='/profile' element={<Profile/>}></Route>}
    <Route path='*' element={<Error/>}></Route>
    </Routes>
    <Footer/>
    </UserNameProvider>
    </BrowserRouter>
  );
}

export default App;
