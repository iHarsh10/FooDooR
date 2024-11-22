import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { Mail, Lock, User } from 'lucide-react';


const Navbar = ({setShowLogin}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  const [menu, setMenu] = useState("menu");

    const {getTotalCartAmount} = useContext(StoreContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignupModal(false);  // This line was missing
  };



  const handleLogout = () => {
    setIsLoggedIn(false);
  };

    

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <div>
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <button 
            className="btn btn-orange"
            onClick={() => {
              setShowLoginModal(true);
              setShowSignupModal(false);
            }}
          >
            Login
          </button>
          <button 
            className="btn btn-green"
            onClick={() => {
              setShowSignupModal(true);
              setShowLoginModal(false);
            }}
          >
            Signup
          </button>
        </div>
      ) : (
        <button 
          className="btn btn-orange"
          onClick={handleLogout}
        >
          Logout 
        </button>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="modal-close"
            >
              ✕
            </button>
            
            <h2 className="modal-title modal-title-login">Login</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }} className="form-container">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input input-login"
                />
                <Mail className="input-icon input-icon-login" />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input input-login"
                />
                <Lock className="input-icon input-icon-login" />
              </div>

              <button 
                type="submit" 
                className="submit-btn submit-btn-login"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button 
              onClick={() => setShowSignupModal(false)}
              className="modal-close"
            >
              ✕
            </button>
            
            <h2 className="modal-title modal-title-signup">Create Account</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSignup();  // Changed from handleLogin to handleSignup
            }} className="form-container">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input input-signup"
                />
                <User className="input-icon input-icon-signup" />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input input-signup"
                />
                <Mail className="input-icon input-icon-signup" />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input input-signup"
                />
                <Lock className="input-icon input-icon-signup" />
              </div>

              <button 
                type="submit" 
                className="submit-btn submit-btn-signup"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
      </div>
    </div>



  )
}

export default Navbar
