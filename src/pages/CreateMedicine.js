import React from 'react';
 
function CreateMedicine({medicinename}){
    return (
        <div>
            <text 
                name="medicinename" 
                value={medicinename}
            />
        </div>
    )
}
 
export default CreateMedicine;