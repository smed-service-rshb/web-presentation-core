import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import Badge  from '../badge'
import './styles.css';

export const Item = props => {
    return (
        <li className={classNames({"tab-disabled": props.disabled})}>
            <a href=""
               className={classNames({active:props.active})}
               onClick={props.onClick}
               onMouseLeave={props.onMouseLeave}
               data-id={props.dataId}
               tabIndex={props.tabIndex}
            >
                <span className="tabs-name">
                    {props.label}
                    {props.badge && <Badge>{props.badge}</Badge>}
                </span>
            </a>
        </li>
    );
};

Item.propTypes = {
    /**
     * Обработчик нажатия на Tab
     */
    onClick: PropTypes.func.isRequired
};

class Tabs extends React.Component {
    static TabTypes = {
        primary: 'primary',
        secondary: 'secondary'
    };

    handleClick = (index, disabled) => event => {
        event.preventDefault();

        if (disabled) {
            return;
        }
        this.props.onChange && this.props.onChange(index);
    };

    _handleMouseLeave = (e) => {
        e.currentTarget.blur();
    };

    isSelected = index => this.props.selected === index;

    render() {
        return (
            <div className={classNames('tabs', `tab-${this.props.type}`)}>
                <ul className="tabs__labels">
                    {
                        React.Children.map(this.props.children, (tab, index)=>{
                            return (
                                <Item label={tab.props.label}
                                    active={this.isSelected(index)}
                                    onClick={this.handleClick(index, tab.props.disabled)}
                                    onMouseLeave={this._handleMouseLeave}
                                    dataId={tab.props.dataId}
                                    badge={tab.props.badge}
                                    tabIndex={tab.props.tabIndex}
                                    key={tab.props.dataId}
                                    disabled={tab.props.disabled}
                                />
                            )
                        })
                    }
                </ul>
                <div className="tabs__content">
                    {React.Children.toArray(this.props.children).filter((node, index) => this.isSelected(index))}
                </div>
            </div>
        );
    }

    static propTypes = {
        /**
         * Дочерние элементы. По умолчанию активным становится первый.
         */
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.element
        ]).isRequired,
        /**
         * Тип табов
         */
        type: PropTypes.oneOf(['primary', 'secondary']).isRequired
    };

    static defaultProps = {
        type: Tabs.TabTypes.primary,
        selected: 0
    };

}
export default Tabs