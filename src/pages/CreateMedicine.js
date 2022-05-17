import React from 'react';
 
function CreateMedicine({medicinename}){
    // console.log('CreateMedicine', {medicinename})
    return (
        <div>
            <input 
                name="medicinename" 
                value={medicinename}
            />
        </div>
    )
}
 
export default CreateMedicine;