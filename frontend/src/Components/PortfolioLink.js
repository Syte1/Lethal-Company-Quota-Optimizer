import React from 'react';

const PortfolioLink = ({ url }) => {
    return (
        <div className="text-center my-4">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src="Portfolio-logo.png" alt="Portfolio Logo" className="w-20 inline-block" />
            </a>
        </div>
    );
};

export default PortfolioLink;
