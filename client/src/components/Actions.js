import React from 'react';
import {
    FaHeart,
    FaRegThumbsUp,
    FaRegThumbsDown,
    FaClinicMedical
} from "react-icons/fa"


function Actions({onActionClick}) {
    return (
        <div className="actions-container">
            <div className="action" onClick={()=>onActionClick('LIKE')}>
                <FaRegThumbsUp size={30} color="#3498db"/>
            </div>
            <div className="action" onClick={()=>onActionClick('DISLIKE')}>
                <FaRegThumbsDown size={30} color="#bdc3c7"/>
            </div>
            <div className="action" onClick={()=>onActionClick('HEART')}>
                <FaHeart size={30} color="#e74c3c"/>
            </div>
            <div className="action" onClick={()=>onActionClick('STAYHOME')}>
                <FaClinicMedical size={30} color="#2ecc71"/>
            </div>
        </div>
    )
}

export default Actions;
