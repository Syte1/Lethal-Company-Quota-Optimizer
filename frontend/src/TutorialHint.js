import React from 'react';
import Cookies from 'js-cookie';

const TutorialHint = ({ onTutorialClick }) => {
    // Check if the tutorial has been clicked before
    const hasClickedTutorial = Cookies.get('hasClickedTutorial');

    // if (hasClickedTutorial) return null;

    const handleClick = () => {
        Cookies.set('hasClickedTutorial', 'true');
        onTutorialClick();
    };

    return (
        <div className="flex justify-center items-center mt-4" onClick={handleClick}>
            <svg className="animate-bounce w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
};

export default TutorialHint;
