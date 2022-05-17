import React, { useState } from 'react'

function Medicine({user}){
    return (
        <div>
            <b>{user}</b>
        </div>

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