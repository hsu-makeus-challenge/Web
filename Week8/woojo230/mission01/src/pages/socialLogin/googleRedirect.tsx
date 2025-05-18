import React, { useEffect } from 'react';
import {
  useLocalStorage,
  useSessionStorage,
} from '../../hooks/useLocalStorage';
import useLoginStore from '../../stores/login';

export const GoogleRedirect = () => {
  const { toggleLogin } = useLoginStore();
  const { set: setLocal } = useLocalStorage();
  const { set: setSession } = useSessionStorage();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    //console.log(urlParams);

    if (accessToken) {
      setLocal('accessToken', accessToken ?? '');
      setSession('refreshToken', refreshToken ?? '');
      toggleLogin();
      window.location.href = '/home';
    }
  }, [setLocal, setSession]);

  return <div></div>;
};
