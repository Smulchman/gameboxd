import { getGames } from '../API/rawgapi';
import { useEffect, useState } from 'react';


function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getGames();
      setGames(data.results);
    }
    fetchData();
    
  }, []);

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}
export default GameList ;
