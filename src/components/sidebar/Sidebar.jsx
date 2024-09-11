import { NavLink } from 'react-router-dom'
import { sidebarLinks } from '../../constants'
// eslint-disable-next-line react/prop-types
const Sidebar = ({ sidebarRef }) => {
  return (
    <div
      ref={sidebarRef}
      className=" min-h-[calc(100vh-70px)] bg-menuColor left-[-800px] md:left-0 md:relative w-16 md:w-56 p-5 truncate z-50"
    >
      {/* links */}
      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.key}>
            {/* link */}
            <NavLink to={link.href} className="menu-link flex items-center gap-5 px-0 mb-2">
              {/* icon link */}
              <div className="text-mainColor text-2xl">{link.icon}</div>
              {/* text link */}
              <span>{link.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
