import React, { useState } from "react";
import { FaUser, FaUserCircle, FaLock, FaUserEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const SideMenu = () => {
  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: <FaUser />,
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: <FaUserEdit />,
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: <FaUserCircle />,
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: <FaLock />,
    },
  ];
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(menuItem.url) ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          {/* Render the icon directly as a component and add a span for spacing */}
          <span className="me-2">{menuItem.icon}</span> {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
