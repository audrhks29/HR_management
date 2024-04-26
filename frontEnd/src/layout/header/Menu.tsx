import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { includeHashArray, someHashArray } from "@/assets/excludeHashList";
import menuList from "../../assets/menuList.json";

const Menu = memo(() => {
  const location = useLocation();
  const [hashName, setHashName] = useState(location.pathname);

  useEffect(() => {
    setHashName(location.pathname);
  }, [location]);

  const handleClickSubMenu = (link: React.SetStateAction<string>) => setHashName(link);
  return (
    <>
      {!includeHashArray.some(item => location.pathname.includes(item)) &&
        !someHashArray.some(item => item === location.pathname) && (
          <div className="min-w-[250px] border-r border-primary/20">
            <Link
              to="/home"
              className={`${hashName === "/home" ? "bg-primary-foreground border-primary/20 border-b border-l" : ""} text-sm font-bold h-11 translate-x-1 flex flex-col px-6 justify-center hover:bg-primary-foreground rounded-l-2xl`}>
              <span>메인</span>
            </Link>
            <nav className="text-sm font-medium pl-4 pt-2">
              {menuList.map(menu => (
                <React.Fragment key={menu.id}>
                  <div className="h-10 font-bold flex justify-between items-center px-3 hover:bg-secondary cursor-pointer">
                    <span>{menu.title}</span>
                  </div>

                  <ul>
                    {menu.submenu.map(submenu => (
                      <Link
                        key={submenu.id}
                        to={submenu.link}
                        className={`${hashName.includes(submenu.link) ? "bg-primary-foreground border-primary/20 border-y border-l" : ""} translate-x-1 h-11 flex flex-col justify-center px-6 hover:bg-primary-foreground rounded-l-2xl`}
                        onClick={() => handleClickSubMenu(submenu.link)}>
                        <li>{submenu.title}</li>
                      </Link>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}
    </>
  );
});

export default Menu;
