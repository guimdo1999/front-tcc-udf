import { useState } from "react";

const UseVisibilityToggler = (component, visibility = false) => {
  const [visible, setVisibility] = useState(() => visibility);
  return [
    visible ? component : null,
    () => setVisibility((v) => !v),
    () => setVisibility(true),
    () => setVisibility(false),
  ];
};

export default UseVisibilityToggler;
