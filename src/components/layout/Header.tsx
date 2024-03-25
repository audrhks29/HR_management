import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/hr'>
              인사관리
            </Link>
          </li>
          <li>
            <Link to='/salary'>
              급여관리
            </Link>
          </li>
          <li>메뉴 1</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;