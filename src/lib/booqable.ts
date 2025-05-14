// lib/booqable.ts
import axios from 'axios';

export const booqable = axios.create({
  // ← .booqable.com  (NOT .booqableshop.com)
  baseURL: 'https://alljoy-bike-and-beach-rental.booqable.com/api/4',
  headers: {
    Authorization: `Bearer ${process.env.BOOQABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
