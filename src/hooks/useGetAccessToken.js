import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useErrorCode } from '../context/ErrorContext';

export const useGetAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const axiosApiInstance = axios.create();
  const { setLoading } = useLoading();
  const { setErrorCode } = useErrorCode();

  useEffect(() => {
    setLoading(true);
    axiosApiInstance.interceptors.request.use(
      async config => {
        config.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    const getAccessToken = async () => {
      const params = new URLSearchParams();
      params.append('client_id', process.env.REACT_APP_CLIENT_ID);
      params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
      params.append('grant_type', 'password');
      params.append('username', process.env.REACT_APP_USERNAME);
      params.append('password', process.env.REACT_APP_PASSWORD);
      params.append('scope', 'read_station');

      await axiosApiInstance
        .post('https://api.netatmo.com/oauth2/token', params)
        .then(res => {
          setAccessToken(res.data.access_token);
          setRefreshToken(res.data.refresh_token);
        })
        .catch(() => setErrorCode(1));
    };
    getAccessToken();

    // refresh the access token
    const refreshedAccessToken = async () => {
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', refreshToken);
      params.append('client_id', '6287e28c9124d371e6519b57');
      params.append('client_secret', 'xO0NQ80TFLzumHzZh2eluL915ZhWNb36KquuIDK');

      await axiosApiInstance
        .post('https://api.netatmo.com/oauth2/token', params)
        .then(res => {
          setAccessToken(res.data.access_token);
          setRefreshToken(res.data.refresh_token);
        })
        .catch(() => {
          setErrorCode(1);
        });
    };

    // intercept the response based on error status
    axiosApiInstance.interceptors.response.use(
      response => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshedAccessToken();
          return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    setLoading(false);
  }, [axiosApiInstance, refreshToken, setErrorCode, setLoading]);

  return { accessToken };
};
