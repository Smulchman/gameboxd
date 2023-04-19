import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { getGames } from '../API/rawgapi';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

export default function BasicImageList() {
  const classes = useStyles();
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getGames();
      setGames(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {games.map((game) => (
          <ImageListItem key={game.id} cols={Math.floor(Math.random() * 3)}>
            <img src={game.background_image} alt={game.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
