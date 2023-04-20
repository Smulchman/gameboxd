import React, { useState, useEffect } from 'react';
import { getGames } from '../API/rawgapi';
import { useEffect, useState } from 'react';

function RandomImage() {
  const [game, setGame] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getGames();
      setGame(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h2>{game.name}</h2>
        </div>
      ))}
    </div>
  );
}
export default RandomImage;
