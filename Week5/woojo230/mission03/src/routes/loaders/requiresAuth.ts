import { redirect } from 'react-router-dom';

export interface User {
  name: string;
}

export const getUser = async () => {
  const token = localStorage.getItem('accessToken');
  const name = localStorage.getItem('name');

  if (token) return { name: name ?? '유저 이름 호출 오류' } satisfies User;
  return null;
};

export const requiresAuth = async ({ request }: { request: Request }) => {
  const user = await getUser();
  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    // console.log('리다이렉트중');
    return redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }
  return user;
};
