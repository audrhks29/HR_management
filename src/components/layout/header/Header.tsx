import { Button } from "../../ui/button";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="h-screen p-4">
      <div className="border-b border-b-secondary h-10 flex justify-between items-center p-1">
        <div>이름</div>
        <Button
          variant="secondary"
          className="h-7"
        >로그인</Button>
      </div>
      <Menu />
    </header>
  );
};

export default Header;