import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const DOGS_API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311';

// interface Breed {
//   id: string;
//   name: string;
//   image: {
//     url: string;
//   }
// }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints(builder) {
    return {
      // fetchBreeds: builder.query<Breed[], number | void>({
      fetchWeather: builder.query({
        query(location) {
          return `/forecast?q=${location}&APPID=05ef4f751c33a79728695c6582a3340a&cnt=40`
        }
      })
    };
  },
});

export const { useFetchWeatherQuery } = apiSlice;
