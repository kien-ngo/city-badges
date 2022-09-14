import { ReactElement, ReactFragment } from "react";
import { PageName } from "../classes/pages";
import Navbar from "./Navbar";
type Props = {
  pageName: PageName;
  children: ReactElement | ReactFragment | string | boolean;
};
const Container = (props: Props) => {
  const { pageName } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "60px" }}
    >
      <Navbar pageName={pageName}>
        
      </Navbar>
      {props.children}
    </div>
  );
};

export default Container;
