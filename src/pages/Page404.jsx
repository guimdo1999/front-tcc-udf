import { Image } from "antd";
import React from "react";
import img from "../Assets/004.jpg";

const Page404 = () => {
  return (
    <>
      <Image src={img} alt="404" preview={false}></Image>
    </>
  );
};

export default Page404;
