import { useRef, useState } from 'react'
import logo from '/logo.png'
import { navLinks, icons } from '../../constants'
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const linksMenu = useRef()
  const [menuStatus, setmenuStatus] = useState(false)
  const handelMenu = () => {
    linksMenu.current.classList.toggle('top-menu')
    if (linksMenu.current.classList.contains('top-menu')) {
      setmenuStatus(true)
    } else {
      setmenuStatus(false)
    }
  }
  const handelLink = () => {
    if (menuStatus) {
      linksMenu.current.classList.remove('top-menu')
      setmenuStatus(false)
    }
  }
  return (
    <nav className="">
      <div className="container h-[70px] flex justify-between items-center relative">
        {/* logo */}
        <Link className="block md:h-40 h-28" to="/">
          <img src={logo} alt="logo" className="w-full h-full" />
        </Link>
        {/* links */}
        <ul ref={linksMenu} className="menu-links">
          {navLinks.map((link) => (
            <li key={link.key} onClick={handelLink}>
              <NavLink to={link.href} className="menu-link">
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* button & Icon */}
        <div className="flex items-center gap-5">
          {/* signin Button */}
          <Link to="/login" className="btn truncate">
            Sign in
          </Link>
          {/* Icon => Menu links */}
          {!menuStatus ? (
            <div
              className="text-3xl lg:hidden cursor-pointer menu-icon-hover"
              onClick={handelMenu}
            >
              {icons.menu3Line}
            </div>
          ) : (
            <div
              className="text-3xl lg:hidden cursor-pointer menu-icon-hover"
              onClick={handelMenu}
            >
              {icons.menuClose}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
