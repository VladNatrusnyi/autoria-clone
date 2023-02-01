import {useMatch} from "react-router";
import {Link} from "react-router-dom";

export const CustomLink = (props) => {

  const match = useMatch(props.to)

  return (
    <Link
      to={props.to}
      {...props}
    >
      {props.children}
    </Link>
  )
}