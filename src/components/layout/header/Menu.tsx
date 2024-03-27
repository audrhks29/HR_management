import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <div className="w-full grid gap-1 py-1">
        <Link
          to="/hr"
          className="h-10 inline-flex items-center border px-3 hover:bg-secondary rounded-md">
          인사관리
        </Link>

        <Link
          to="/salary"
          className="h-10 inline-flex items-center border px-3 hover:bg-secondary rounded-md">
          급여관리
        </Link>

        <Link
          to=""
          className="h-10 inline-flex items-center border px-3 hover:bg-secondary rounded-md">
          메뉴3
        </Link>
      </div>
    </nav>
  );
};

export default Menu;