import React from 'react';
 
function CreateMedicine({medicinename}){
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