import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../assets/css/gamebox.css';
import { GET_GAMES } from '../utils/queries';
import { useQuery } from '@apollo/client';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const { loading, error, data } = useQuery(GET_GAMES, {
    fetchPolicy: 'no-cache',
  });
  const games = data?.games || [];
  const handleClick = (game) => {
    // handle the click event here, for example, navigate to a different page
    window.location.href = `https://rawg.io/games/${game.id}`;
  };
  return (
    <div className="gamebox">
      <ImageList
        sx={{ width: '60%', height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {games.map((game, index) => (
          <ImageListItem
            key={`game${index}`}
            cols={Math.floor(Math.random() * 3) || 1}
            rows={Math.floor(Math.random() * 3) || 1}
          >
            <img
              {...srcset(game.background_image, 121, game.rows, game.cols)}
              alt={game.name}
              loading="lazy"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(game)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
