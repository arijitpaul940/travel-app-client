import React, { useState } from "react";
import classNames from "classnames";

import { Hero, Container, UserDataTable, Destinations } from "../../components";

const USERS_TAB = "users";
const DESTINATIONS_TAB = "destinations";
const tabs = [USERS_TAB, DESTINATIONS_TAB];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(USERS_TAB);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Hero />

      <Container>
        <div className="my-10 flex justify-center">
          <div className="flex justify-between text-[0.6rem] font-medium text-white xs:text-xs md:text-base">
            {tabs.map((tab, index) => (
              <span
                onClick={() => handleTabChange(tab)}
                className={classNames(
                  "select-none border px-4 py-2 capitalize transition-all duration-200 lg:px-6",
                  {
                    "rounded-l-full": index === 0,
                  },
                  {
                    "rounded-r-full": index === tabs?.length - 1,
                  },
                  {
                    "cursor-default": tab === activeTab,
                  },
                  {
                    "cursor-pointer bg-black": tab !== activeTab,
                  }
                )}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {activeTab === USERS_TAB ? <UserDataTable /> : <Destinations />}
      </Container>
    </div>
  );
};

export default HomePage;
