async function getGames() {
  const apiKey = '5cb5074085274b3aab2431311200438c';
  const endpointUrl = 'https://rawg-video-games-database.p.rapidapi.com/games';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '87cdee1fecmsha53138e19c8fc31p120979jsnc537093c677e',
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
