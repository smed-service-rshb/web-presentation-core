import React from 'react';

import {withAuthContext} from '../../../auth'

import './styles.css'

const header = props => {
    const handleExit = e => {
        e.preventDefault();
        props.authContext.logout().then(result => {
            window.location.reload();
            return result;
        });
    };

    const userData = props.authContext.userData || {};
    return (
        <div className="header">
            <div className="header-wrapper">
                <a className="header-actions-exit" data-id="exit" href="#exit" onClick={handleExit}>Выход</a>

                <div className="header-user-info">
                    <span>Операционист:</span> {userData.surname}
                </div>
            </div>
        </div>
    )
};

export default withAuthContext(header)

//TODO покрыть тестами