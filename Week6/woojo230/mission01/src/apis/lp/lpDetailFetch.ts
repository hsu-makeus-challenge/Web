export const LpDetailFetch = async (Lpid: number) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/v1/lps/${Lpid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();
    return data.data || null;
  } catch {}
};
