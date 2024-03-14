
import React from 'react';
import Order from "../components/Order";
import UserStatus from "../components/AdminStatus";
import Analytics from "../components/Analytics";
import Users from "../components/Users";
import Inbox from "../components/Inbox";

const MainContent = () => {

  return (
      <>
         <Analytics />
          <UserStatus />
          <Order />
          <Users />
          <Inbox />

      </>
  );
};

export default MainContent;
