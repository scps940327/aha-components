import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbyD96mL0RIt0_nWv7gGSlBHvAsmLTc4kGq6HMQX1VZTTTpHahsjRcWrOWVD96BuM_pXdA/exec';

const googleSheetAPI = {
  get: fetchBaseQuery({
    baseUrl: BASE_URL,
    redirect: "follow",
    method: "GET",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
}

export default googleSheetAPI;