import React, { useState, useEffect } from 'react';

function ProfilePage(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user data here, e.g. using the user ID passed via props
    const userId = props.match.params.userId;
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [props.match.params.userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p>{user.entries}</p>
    </div>
  );
}

export default ProfilePage;
