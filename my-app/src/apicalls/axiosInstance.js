import React from 'react'
import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        // for protected routes the header is required
        //after login user is valid or not backend is validate 
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
})