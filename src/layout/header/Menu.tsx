import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import menuList from '../../assets/menuList.json'
import { IoMdArrowDropdown } from "react-icons/io";

const Menu = memo(() => {
  const [activeMenus, setActiveMenus] = useState<number[]>([]);

  const handleClickMenu = (id: number) => {
    if (activeMenus.includes(id)) {
      setActiveMenus(activeMenus.filter(item => item !== id));
    } else {
      setActiveMenus([...activeMenus, id]);
    }
  }

  return (
    <nav>
      <div className="w-full grid gap-1 py-2">
        {menuList.map(menu => (
          <React.Fragment key={menu.id}>
            <div
              className="h-10 flex justify-between items-center border px-3 hover:bg-secondary rounded-md cursor-pointer"
              onClick={() => handleClickMenu(menu.id)}
            >
              <span>{menu.title}</span>
              <i
                className="text-[25px] duration-500"
                style={{
                  transform: activeMenus.includes(menu.id) ? "rotate(180deg)" : "",
                }}><IoMdArrowDropdown /></i>
            </div>

            <ul>
              {menu.submenu.map(submenu => (
                <Link
                  key={submenu.id}
                  to={submenu.link}
                  className="h-10 flex flex-col justify-center px-6 duration-1000 hover:bg-secondary rounded-md"
                  style={{
                    opacity: activeMenus.includes(menu.id) ? "100%" : "0%",
                    maxHeight: activeMenus.includes(menu.id) ? "80px" : "0px",
                    overflow: "hidden",
                    transition: "opacity 0.7s ease"
                  }}>
                  <li>{submenu.title}</li>
                </Link>
              ))}
            </ul>
          </React.Fragment>
        )
        )}
      </div>
    </nav>
  );
});

export default Menu;