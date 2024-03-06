
import React from 'react';
import Order from "../components/Order";
import Users from "../components/Users";
import Analytics from "../components/Analytics";

const MainContent = () => {

  return (
      <>
         <Analytics />
          <Users />
          <Order />
      </>
  );
};

export default MainContent;
