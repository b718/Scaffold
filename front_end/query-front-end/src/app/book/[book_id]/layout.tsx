import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children, modal }) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default layout;
