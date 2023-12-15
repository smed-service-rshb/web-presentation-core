import React from 'react';
import {compose} from '@efr/medservice-web-presentation-core';

class PrivatePageComponent extends React.Component {
    render = () => (
        <div>
            <div>Привет! Я внутренняя страница.</div>
            <div>Опять работа?!</div>
        </div>
    );
}

export default compose(
)(PrivatePageComponent);
