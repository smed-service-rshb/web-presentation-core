import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Badge =(props) => (
    <div className="badge">
        {props.children}
    </div>
);
Badge.propTypes = {
    /**
     * Содержимое уведомления
     */
    children: PropTypes.number.isRequired
};
export default Badge