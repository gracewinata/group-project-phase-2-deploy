import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useContext } from "react";
import { themeContext } from "../context/themeContext";
export default function BaseLayout() {

  const {currentTheme, theme} = useContext(themeContext)

  return (
    <>
      <div id={theme[currentTheme].bgColor}>
        <Nav />
        <Outlet />
      </div>
    </>
  );
}
