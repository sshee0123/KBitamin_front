import React, { useState } from 'react'

function Medicine({user}){
    const { username, id} = user;
    return (
        <div>
            <b>{username}</b>
        </div>

    )
}

function MedicineList({users}) {
    console.log('MedicineList',users)
    return (
        <div>
        {
            users.map(
                user => (<Medicine user={user} key={user.id}/>)
            )
        }
        </div>
    )
}
 
export default MedicineList;