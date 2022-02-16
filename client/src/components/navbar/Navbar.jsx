import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { WindowSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  // set isScrolled true if the navbar is on the top and the class of navbar will contain scrolled, otherwise false
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => Window.onscroll = null
  }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="Netflix 2015 logo.svg" />
          <Link to="/" className="link" ><span>Home</span></Link>
          <Link to="/series" className="link" ><span>Series</span></Link>
          <Link to="/movies" className="link" ><span>Movies</span></Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon className='icon' />
          <span>KID</span>
          <NotificationsIcon className='icon' />
          <img src="https://cdn.pixabay.com/photo/2020/05/07/22/08/lotus-5143420_1280.jpg" alt="" />
          <div className="profile">
            <ArrowDropDownIcon className='icon' />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar