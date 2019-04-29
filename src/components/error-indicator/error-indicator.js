import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <span className="oops">OOPS!</span>
      <span>
        something has gone terribly wrong
      </span>
    </div>
  );
};

export default ErrorIndicator;
