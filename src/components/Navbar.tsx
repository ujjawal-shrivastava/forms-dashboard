import React, { useState, useContext } from 'react'
import NavbarItem from './NavbarItem';
import { Link, withRouter,useLocation} from 'react-router-dom';
import {UserContext} from '../UserContext'
import { toast as superToast } from 'bulma-toast'
import { useMutation } from 'react-apollo-hooks';
import {gql} from 'apollo-boost'

const LOGOUT= gql`
  mutation logout {
    logout
  }
`;

function Navbar(props: any) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation()
  const [user, setUser] = useContext(UserContext)
  
  const [api_logout, {loading}] = useMutation(LOGOUT, { errorPolicy: 'all'});

  document.body.className = "has-navbar-fixed-top";

  const changePage = () => {
    setIsActive(false)
  }

  const logout = ()=>{
    api_logout().then(({data, errors}) => {
      if(!errors){
        setUser({
          email:"",
          token:"",
          name:"",
          auth:false,
          long:""
      })
      sessionStorage.clear()
      localStorage.clear()
      superToast({
          message: `Good Bye! You are successfully logged out!`,
          type: "is-black",
          position: "top-center",
          duration: 2000,
          animate: { in: 'fadeIn', out: 'fadeOut' },
          dismissible: true,
          pauseOnHover: true
        });
      }
      
    });
    
  }


  return (
    <nav id="navbar" className="navbar is-fixed-top navshadow" role="navigation" aria-label="main navigation" style={{ top: `${props.hidden ? '-60px' : '0'}` }}>
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <strong className="is-size-5 footer-logo mx-5"><span className="has-text-silver">De</span><span className="has-text-dark">Form</span></strong>
        </Link>

        <p role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={
          () => {
            setIsActive(!isActive)
          }
        }>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </p>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <NavbarItem title="Dashboard" change={changePage} isActive={location.pathname === "/"} route="/" />
          <NavbarItem title="Forms" change={changePage} isActive={location.pathname === "/forms"} route="/forms" />
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown  is-hoverable">
            <p className="navbar-link has-text-weight-bold">
              {user.name||user.email}
        </p>

            <div className="navbar-dropdown is-right is-boxed">
              <a href="http://deform.ujjawal.co/about" target="_blank" rel="noopener noreferrer" className="navbar-item">
                About
          </a>
              <a href="https://linkedin.com/in/ujjawalshrivastava" target="_blank" rel="noopener noreferrer" className="navbar-item">
                Developer
          </a>
              <hr className="navbar-divider" />
              <Link to="/settings" onClick={() => {
                setIsActive(false)
              }} className="navbar-item">
                Settings
          </Link>
            </div>
          </div>
          <Link to="/create" className="navbar-item" title="Create New Form">
            <button className="button is-dark is-focused is-rounded is-small" onClick={() => {
              setIsActive(false)
            }}>
              <span className="icon is-small">
                <i className="fa fa-plus-square-o"></i>
              </span>
              <span>Create Form</span>
            </button>
          </Link>
          <Link to="/login" className="navbar-item">
            <button className="button is-danger is-focused is-rounded is-small" onClick={logout} disabled={loading}>
              <span className="icon is-small">
                <i className="fa fa-sign-out"></i>
              </span>
          <span>{loading?"Logging out...":"Logout"}</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>

  )
}

export default withRouter(Navbar)
