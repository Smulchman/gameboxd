// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// our auth and query imports for getting user info
import Auth from '../utils/auth';
import { GET_USER, GET_ENTRIES_BY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
// component to display reviews
import SingleUserEntries from '../components/SingleUserEntries';

export default function Profile() {
  const [userEntries, setUserEntries] = useState([]);
  // decode JWT token
  const me = Auth.getProfile();
  // initiate variable to store name from query results
  let myName;
  // nested two layers in is email
  const myEmail = me.data.email;
  // get user by email query
  const userQuery = useQuery(GET_USER, {
    variables: { email: me.data.email },
  });

  // take the email from decoded jwt and query user
  const entryQuery = useQuery(GET_ENTRIES_BY_USER, {
    variables: { email: myEmail },
  });
  // if query for user info works, set profile username
  if (userQuery.data && !userQuery.loading) {
    myName = userQuery.data.user.username;
  }

  const getEntries = () => {
      const entries = entryQuery.data.user;
      setUserEntries(entries.entries);
  };

  useEffect(() => {
    if (entryQuery.data && !entryQuery.loading) {
      getEntries();
    }
  }, [entryQuery.data, entryQuery.loading]);

  console.log(userEntries);

  // the JSX
  return (
    <div
      style={{
        backgroundColor: '#282827',
        height: '100%',
        padding: '1em',
        marginBottom: '1em',
      }}
    >
      <Card
        sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}
        style={{
          backgroundColor: '#282827',
          color: 'white',
          border: '2px solid white',
        }}
      >
        <CardContent>
          <h2>Welcome to your profile:</h2>
          <h2>{myName}</h2>
          <h3>{myEmail}</h3>
        </CardContent>
      </Card>
      {entryQuery.data && (
        <div>
          <h2
            style={{
              textAlign: 'center',
              backgroundColor: '#292827',
              color: 'white',
              fontSize: '2em',
            }}
          >
            Your saved games and reviews:
          </h2>

          {userEntries.map((entry, index) => (
            <SingleUserEntries
              key={index}
              image={entry.gameData.background_image}
              game={entry.gameData.name}
              description={entry.gameData.description_raw}
              platform={entry.platform}
              review={entry.review}
              createdAt={entry.createdAt}
            />
          ))}
        </div>
      )}
      <div
        style={{
          marginBottom: '2em',
        }}
      ></div>
    </div>
  );
}
