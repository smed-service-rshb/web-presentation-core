import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Link extends React.Component {

    static linkTypes = {
        general: 'general',
        pseudo: 'pseudo',
        external: 'external',
        additional: 'additional'
    };

    _handleMouseLeave = (e) => {
        e.currentTarget.blur();
    };

    _handleClick = (e) => {
        if (this.props.disabled){
            //вызываем обработчик только для незаблокированной ссылки
            e.preventDefault();
            return
        }
        this.props.onClick(e);
    };

    render() {
        return <a href={this.props.href}
                  onClick={this._handleClick}
                  className={classNames('link', {disabled: this.props.disabled}, `link-${this.props.type}`, {'link-icon': this.props.icon})}
                  target={this.props.target}
                  onMouseLeave={this._handleMouseLeave}
                  data-id={this.props.dataId}
                  tabIndex={this.props.tabIndex}
        >
            {this.props.icon && <div className="link-icon-item" alt="" style={{backgroundImage: 'url(' + this.props.icon + ')'}}/>}
            <span className="link-text">{this.props.children}</span>
        </a>
    }

    static propTypes = {
        /**
         * Адрес перехода по ссылке
         */
        href: PropTypes.string,
        /**
         * Обработчик нажатия на ссылку
         */
        onClick: PropTypes.func,
        /**
         * Способ перехода по ссылке. Использовать при необходимости вместе с href.
         */
        target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
        /**
         * Признак заблокированного элемента
         */
        disabled: PropTypes.bool.isRequired,
        /**
         * Тип ссылки:
         * pseudo - псевдо-ссылка, external - открывается в новом окне
         */
        type: PropTypes.oneOf(['general', 'pseudo', 'external', 'additional']).isRequired,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Иконка
         */
        icon: PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        onClick: ()=>(null),
        type: Link.linkTypes.general,
        tabIndex: 0
    };

}
export default Link