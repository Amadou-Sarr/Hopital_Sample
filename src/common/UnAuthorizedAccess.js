import React, { Component } from 'react';
import './UnAuthorizedAccess.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class UnAuthorizedAccess extends Component {
    render() {
        return (
            <div className="unAuthorized">
            <h1 className="title">
            403
            </h1>
            <div className="desc">
            The Page you're looking for is unauthorized.
        </div>
        <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
        </div>
    );
    }
}

export default UnAuthorizedAccess;