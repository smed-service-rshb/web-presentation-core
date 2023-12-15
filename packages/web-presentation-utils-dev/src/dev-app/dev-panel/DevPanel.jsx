import React from 'react';
import './styles.css'

class DevPanel extends React.Component {
    render = () => (
        <div className="dev-panel-container">
            <div className="dev-panel-content">
                Actions
                <ul>
                    {this.props.actions.map(action => (<li key={action.name}>{action.name}</li>))}
                </ul>
                Pages
                <ul>
                    {
                        this.props.pages.map(page =>
                            (<li key={page.key}>
                                <a data-page-key={page.key} href={page.path}>{`${page.key} (${page.path})`}</a>
                            </li>)
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default DevPanel