import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import homeIcon from '../../assets/home.png'; // Path to your home icon image

const CustomBreadCrumb = ({ model }) => {
    // Define the home icon with custom image
    const home = { icon: <img src={homeIcon} alt="Home" style={{ width: '24px', height: '24px' }} /> };

    return (
        <div className="breadcrumb-container">
            <BreadCrumb model={model} home={home} />
        </div>
    );
};

export default CustomBreadCrumb;
