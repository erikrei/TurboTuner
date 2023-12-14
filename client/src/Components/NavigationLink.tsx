import React from "react";
import { Link } from "react-router-dom";

type Props = {
  path: string;
  linkName: string;
  icon: React.ReactNode;
};

export default function NavigationLink({ linkName, icon, path }: Props) {
  return (
    <Link to={path}>
      {icon}
      {linkName}
    </Link>
  );
}
