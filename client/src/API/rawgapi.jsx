async function getGames() {
  const apiKey = process.env.RAWG_API_KEY;
  const endpointUrl = 'https://rawg-video-games-database.p.rapidapi.com/games';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
    Authorization: `Bearer ${apiKey}`,
  };

  const response = await fetch(`${endpointUrl}?key=${apiKey}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  const data = await response.json();
  console.log(data);
  return data;
}
export { getGames };
