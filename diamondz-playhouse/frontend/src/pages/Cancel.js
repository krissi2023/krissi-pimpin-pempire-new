import React from 'react';
import { Link } from 'react-router-dom';
import './Cancel.css';

function Cancel() {
  return (
    <div className="cancel-page">
      <div className="cancel-card card">
        <div className="cancel-icon">❌</div>
        <h1>Payment Cancelled</h1>
        <p>Your purchase was not completed.</p>
        
        <div className="cancel-actions">
          <Link to="/comics" className="btn btn-primary">
            Back to Comics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
