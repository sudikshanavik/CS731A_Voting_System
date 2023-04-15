import React from 'react';
import { CircularProgress } from '@mui/material';

export default function LoadingPage() {
    return (
        <div className='loadingpage'>
            <CircularProgress size={40} style={{ color: 'white' }} />
        </div>
    )
}