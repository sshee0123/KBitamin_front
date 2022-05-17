import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Medicine({user}){
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 2, width: '40ch', height: '5ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField
            label="약 이름"
            color="warning"
            focused
            value={user}
            margin="normal"
            style ={{height: '5ch'}}
        />
        </Box>
    )
}

function MedicineList({users}) {
    return (
        <div>
        {
            users.map(
                
                user => (<Medicine user={user}/>)
            )
        }
        </div>
    )
}

export default MedicineList;