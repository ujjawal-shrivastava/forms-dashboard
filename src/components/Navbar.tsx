import React,{useState} from 'react'
import NavbarItem from './NavbarItem';
import { Link } from 'react-router-dom';

export default function Navbar(props:any) {
    const [isActive, setIsActive] = useState(false);
    const [currentPage, setCurrentPage]=useState(window.location.pathname)
    console.log(window.location.pathname)
    document.body.className="has-navbar-fixed-top";

    const changePage=(page:string)=>{
      setIsActive(false)
      setCurrentPage(page)
    }

    return (
        <nav className="navbar is-fixed-top navshadow" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link className="navbar-item" to="/">
    <strong className="is-size-5 footer-logo mx-5">DeForm™</strong>
    </Link>

    <a role="button" className= {`navbar-burger burger ${isActive ? 'is-active' :''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={
        ()=>{
            setIsActive(!isActive)
        }
    }>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' :''}`}>
    <div className="navbar-start">
      <NavbarItem title="Dashboard" change={changePage} isActive={currentPage==="/"} route="/"/>
      <NavbarItem title="Forms" change={changePage} isActive={currentPage==="/forms"} route="/forms"/>
      <NavbarItem title="Responses" change={changePage} isActive={currentPage==="/responses"} route="/responses"/>
    </div>

    <div className="navbar-end">
    <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link has-text-weight-bold">
          Ujjawal Shrivastava
        </a>

        <div className="navbar-dropdown is-right is-boxed">
          <a href="http://deform.ujjawal.co/about" target="_blank" className="navbar-item">
            About
          </a>
          <a href="https://linkedin.com/in/ujjawalshrivastava" target="_blank" className="navbar-item">
            Developer
          </a>
          <hr className="navbar-divider" />
          <Link to="/settings" onClick={()=>{
            setCurrentPage("Settings")
            setIsActive(false)
            }} className="navbar-item">
            Settings
          </Link>
        </div>
      </div>
      <div className="navbar-item">
          <button className="button is-danger">
            Logout
          </button>
      </div>
    </div>
  </div>
</nav>

    )
}