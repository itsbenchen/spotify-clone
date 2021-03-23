import React from 'react';
import "./SidebarOption.css";

function SidebarOption({ optionName, Icon }) {
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption-icon" />}
            {Icon ? <h4>{optionName}</h4> : <p>{optionName}</p>}
        </div>
    );
}

export default SidebarOption;
