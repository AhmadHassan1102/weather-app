import { API_KEY, API_URL } from "@env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: ({ location, days }) => `forecast.json?key=${API_KEY}&days=${days}&q=${location}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery } = api;

export default api;
