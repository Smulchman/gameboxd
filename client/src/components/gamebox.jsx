import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { getGames } from '../API/rawgapi';
import { useEffect, useState } from 'react';
import "../assets/css/gamebox.css"

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const data = await getGames();
        setGames(data.results);
      }
      fetchData();
    }, []);
  return (
    <div className="gamebox">
    <ImageList
      sx={{ width: "60%", height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {games.map((game) => (
        <ImageListItem
          key={game.img}
          cols={Math.floor(Math.random() * 3)  || 1} 
          rows={Math.floor(Math.random() * 3)  || 1}
        >
          <img
            {...srcset(game.background_image, 121, game.rows, game.cols)}
            alt={game.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}



