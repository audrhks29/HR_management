import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IoMdArrowDropdown } from "react-icons/io";

import menuList from "../../assets/menuList.json";

const Menu = memo(() => {
  const [activeMenus, setActiveMenus] = useState<number[]>([]);
  const [height, setHeight] = useState(window.innerHeight);

  const location = useLocation();
  const [hashName, setHashName] = useState(location.pathname);

  const screenHeight = window.innerHeight;

  useEffect(() => {
    setHeight(screenHeight);
  }, [screenHeight]);

  useEffect(() => {
    setHashName(location.pathname);
  }, [location]);

  const handleClickMenu = (id: number) => {
    activeMenus.includes(id) ? setActiveMenus(activeMenus.filter(item => item !== id)) : setActiveMenus([...activeMenus, id]);
  };

  const handleClickSubMenu = (link: React.SetStateAction<string>) => setHashName(link);
  return (
    <div className="border-r border-primary/40" style={{ height: height - 60 }}>
      <nav className="text-sm font-medium px-4 grid gap-1 pt-2">
        {menuList.map(menu => (
          <React.Fragment key={menu.id}>
            <div
              className="h-10 flex justify-between items-center border dark:border-primary/20 px-3 hover:bg-secondary rounded-md cursor-pointer"
              onClick={() => handleClickMenu(menu.id)}>
              <span>{menu.title}</span>
              <i
                className="text-[25px] duration-500"
                style={{
                  transform: activeMenus.includes(menu.id) ? "rotate(180deg)" : "",
                }}>
                <IoMdArrowDropdown />
              </i>
            </div>

            <ul>
              {menu.submenu.map(submenu => (
                <Link
                  key={submenu.id}
                  to={submenu.link}
                  className="h-10 flex flex-col justify-center px-6 duration-1000 hover:bg-secondary rounded-md"
                  onClick={() => handleClickSubMenu(submenu.link)}
                  style={{
                    opacity: activeMenus.includes(menu.id) ? "100%" : "0%",
                    maxHeight: activeMenus.includes(menu.id) ? "80px" : "0px",
                    overflow: "hidden",
                    transition: "opacity 0.7s ease",
                    backgroundColor: hashName.includes(submenu.link) ? "rgba(0,0,0,0.5)" : "",
                  }}>
                  <li>{submenu.title}</li>
                </Link>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
});

export default Menu;
