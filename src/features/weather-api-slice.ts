import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints(builder) {
    return {
      // fetchBreeds: builder.query<Breed[], number | void>({
      fetchWeather: builder.query({
        query(queryString) {
          return `/forecast?${queryString}`
        }
      })
    };
  },
});

export const { useFetchWeatherQuery } = apiSlice;
