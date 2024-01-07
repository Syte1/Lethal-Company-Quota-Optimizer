import React from 'react';

const GitHubLink = ({ url }) => {
    return (
        <div className="text-center my-4">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src="GitHub-logo.png" alt="GitHub Logo" className="w-20 inline-block" />
            </a>
        </div>
    );
};

export default GitHubLink;
