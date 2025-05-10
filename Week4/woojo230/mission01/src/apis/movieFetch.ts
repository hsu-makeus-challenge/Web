const moviefetchData = async (category: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_MOVIE_API_URL}/movie/${category}?language=ko-KR`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return { results: [], total_pages: 0 };
  }
};

export default moviefetchData;
