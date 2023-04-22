import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TWITTER_SHARE } from '../utils/constants';
import { Hidden, Menu, MenuItem } from '@mui/material';
import '../assets/css/rcard.css'


//for review modal
import TextField from '@mui/material/TextField';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function GameReviewCard({
  title,
  imageUrl,
  gameId,
  released,
  genres,
  platform,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  const handleShareClick = () => {
    // Build the tweet text
    const tweetText = encodeURIComponent('Check out this game!');

    // Build the tweet URL with the game URL and the tweet text
    const tweetUrl = `${TWITTER_SHARE}?text=${tweetText}&url=${imageUrl}`;

    // Open the Twitter share URL in a new window
    window.open(tweetUrl, '_blank');
  };
  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Container >
      <Card id="r-card">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {title && title.hasOwnProperty('length') && title.length > 0
                ? title[0]
                : 'No game found'}
            </Avatar>
          }
          action={
            <React.Fragment>
              <IconButton aria-label="settings" onClick={handleSettingsClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>add it to library</MenuItem>
                <MenuItem onClick={handleMenuClose}>add it to played</MenuItem>

                <MenuItem onClick={handleMenuClose}>add a review</MenuItem>
              </Menu>
            </React.Fragment>
          }
          title={
            title && title.hasOwnProperty('length') && title.length > 0
              ? title
              : 'No game found'
          }
          subheader={
            released && released.hasOwnProperty('length') && released.length > 0
              ? released
              : 'No game found'
          }
        />
        <a href={`https://rawg.io/games/${gameId}`}>
          <CardMedia
            component="img"
            height="194"
            image={imageUrl}
            alt={title}
          />
        </a>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={handleFavoriteClick}
            aria-label="add to favorites"
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={handleShareClick} aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
            >
              Name:{title}
            </Typography>
            <Typography paragraph>
              Genre :{' '}
              {genres.map((genre, index) => {
                return (
                  <span key={index}>
                    {genre.name}
                    {genres.length > 1 && ', '}
                  </span>
                );
              })}
            </Typography>
            <Typography paragraph>
              Platform :{' '}
              {platform.map((platform, index) => {
                return (
                  <span key={index}>
                    {platform.platform.name}
                    {', '}
                  </span>
                );
              })}
            </Typography>          
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
