import React from "react";
import ThoughtList from "../components/Thoughtlist";
import AuthService from "../utils/auth";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import FriendList from "../components/Friendslist";
import { useQuery } from "@apollo/client";

const Home = (props) => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  console.log(data);

  const { data: userData } = useQuery(QUERY_ME_BASIC);
  console.log(userData); //this returns undefined...
  const thoughts = data?.thoughts || [];
  const loggedIn = AuthService.loggedIn(); //this should be true or false..boolean
  console.log(loggedIn); // this returns true or false appropriately...

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
