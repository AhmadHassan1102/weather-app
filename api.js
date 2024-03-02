import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.weatherapi.com/v1/" }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (location) => `forecast.json?key=462691efff054d478a7140508242302&days=1&q=${location}`,
    }),
  }),
});

export const { useGetCurrentWeatherQuery } = api;

export default api;
