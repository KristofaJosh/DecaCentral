import React from "react";
import { Link } from "react-router-dom";
export default function MenuLinks({ img, text, color, LinkTo }) {
  let c = "";
  if (color) {
    c = color;
  }
  return (
    <Link
      className="onhover"
      style={{ display: "block", textDecoration: "none", color: `${c}` }}
      to={LinkTo || "#"}
    >
      <span>
        <img src={img} alt="icon"></img>
      </span>
      <span style={{ fontSize: "1.8rem", fontWeight: "500" }}>{text}</span>
    </Link>
  );
}
