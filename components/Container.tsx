import { ReactElement, ReactFragment } from "react";
import Navbar from "./Navbar/Navbar";

const Container = (props: { children: ReactElement | ReactFragment }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "60px" }}
    >
      <Navbar>

      </Navbar>
      {props.children}
    </div>
  );
};

export default Container;
