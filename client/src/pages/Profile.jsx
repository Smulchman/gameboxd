// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Auth from '../utils/auth';
import { GET_USER, GET_ENTRIES_BY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
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
    variables: {email: me.data.email}
  })

  const entryQuery = useQuery(GET_ENTRIES_BY_USER, {
    variables: {email: myEmail}
  })
  // check if the'res data (if query worked) and set name variable 
  if (userQuery.data && !userQuery.loading) {
  // console.log(userQuery.data);
  // console.log(entryQuery.data)
  myName = userQuery.data.user.username
  }

  useEffect(() => {
    const getEntries = () => {
      if (entryQuery.data && !entryQuery.loading) {
        const entries = entryQuery.data.user;
        setUserEntries(entries.entries);
      }
    };
    if(entryQuery.data) {
      getEntries();
    }
  }, [entryQuery.data, entryQuery.loading] );

  console.log(userEntries);

  // the JSX
  return (
    <div
    style={{backgroundColor: '#282827', height: '100vh', padding: '1em'}} 
    >
      <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center' }}
      style={{backgroundColor: '#282827', color: 'white', border: '2px solid white'}}
      >
        <CardContent>
          <h2>
            Welcome to your profile:
          </h2>
          <h2>
            {myName}
          </h2>
          <h3>
            {myEmail}
          </h3>
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
    </div>
  );
}
