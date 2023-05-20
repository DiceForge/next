import Image from "next/image";

import logo from "../../../public/logo-horizontal.svg";

export default function Logo() {
  return <Image priority alt="Logo" height={40} src={logo} />;
}
