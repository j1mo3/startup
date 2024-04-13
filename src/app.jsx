import React from 'react';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Index } from './index/index';
import { Home } from './home/home';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { SignUp } from './signup/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <div className='body bg-dark text-light'></div>
//   </BrowserRouter>
// );

function App() {
  return (
    <BrowserRouter>
        <div className="mainJSX">
            <header>
                <NavLink to='/'><div id="home-icon" className="picture-box"><img src="missionary-connect-logo.png" alt="profile picture" /></div></NavLink>
                {/* <a href="index.html"><div id="home-icon" className="picture-box"><img src="static/missionary-connect-logo.png" alt="profile picture" /></div></a> */}
                <nav>
                    <li><NavLink className='button' to='create'>Sign Up</NavLink></li>
                    <li><NavLink className='normal-link' to='login'>Sign In</NavLink></li>
                </nav>
                <div id="social-media-icon" className="picture-box"><img src="social-media-icon.png" alt="social-icon"/></div>
                <div id="social-media-icon" className="picture-box"><img src="social-media-icon.png" alt="social-icon"/></div>
                <div id="social-media-icon" className="picture-box"><img src="social-media-icon.png" alt="social-icon"/></div>

            </header>

            <Routes>
                <Route path='/' element={<Index />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<SignUp />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <p>A website created by <a href="https://github.com/j1mo3/startup">j1mo3</a> (click for startup repo)</p>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  
export default App;


/* <Route
    path='/'
    element={
    <Login
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
        setAuthState(authState);
        setUserName(userName);
        }}
    />
    }
    exact
    />
    <Route path='/play' element={<Play userName={userName} />} />
    <Route path='/signup' element={<Scores />} /> */