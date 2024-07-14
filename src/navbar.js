import React, { useEffect, useState } from 'react';
import { getMenus } from './api';

const Navbar = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const menuData = await getMenus();
      setMenus(menuData);
    };
    fetchMenus();
  }, []);

  return (
    <nav>
      <ul>
        {menus.filter(menu => menu.menu_under === 'header' && menu.enable_yn === 'Y').map(menu => (
          <li key={menu.menuid}>{menu.menu_heading}</li>
        ))}
      </ul>
      <ul>
        {menus.filter(menu => menu.menu_under !== 'header' && menu.enable_yn === 'Y').map(menu => (
          <li key={menu.menuid}>{menu.menu_heading}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
