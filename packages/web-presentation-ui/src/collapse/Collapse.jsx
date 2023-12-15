import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'
import Collapsible from 'react-collapsible';

class Collapse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled
        }
    }

    static collapseTypes = {
        primary: 'primary',
        secondary: 'secondary',
        additional: 'additional',
        suggestion: 'suggestion'
    };

    handleClick = (e) => {
        if (this.state.disabled){
            //вызываем обработчик только для незаблокированнго элемента
            e.preventDefault();
            return
        }

        this.props.onClick(this.props.isOpened);
    };

    rightDataOnClick = (e) => {
        e.stopPropagation();
    };

    collapseOpen = () => {
        if(!this.props.unclosed || this.props.children){
            return
        }

        this.setState({ disabled: true});
    };

    updateDimensions = () => {
        let hintWrapperWidth = this.el.parentNode.clientWidth - 6;
        let hintTextWrapperWidth = this.el.offsetWidth;

        if(this.props.children){
            this.setState({ showArrow: true});
        }else{
            var showArrow = hintWrapperWidth <= hintTextWrapperWidth;
            this.setState({ showArrow });
        }
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        let rightData;
        if (this.props.rightData) {
            if(this.props.rightDataWidth){
                rightData = <div className="collapse-right-text black" onClick={this.rightDataOnClick} style={{'width' : this.props.rightDataWidth}}>{this.props.rightData}</div>;
            }else {
                rightData = <div className="collapse-right-text black" onClick={this.rightDataOnClick}>{this.props.rightData}</div>;
            }
        }

        let leftData = this.props.leftData && <div className="collapse-left-text">{this.props.leftData}</div>;

        const collapseTrigger  = (text) => <div className="collapse-title">{leftData}<div className="collapse-title-cell"><span className="collapse-title-text" ref={el => {this.el = el;}}>{text}</span></div>{rightData}</div>;

        let triggerDisabled = this.state.disabled || (this.props.unclosed && this.props.isOpened) ||  (this.props.isOpened && !this.props.children);

        return (
            <div className={classNames('collapse', `collapse-${this.props.type}`, {'collapse-opened': this.props.isOpened}, {disabled: triggerDisabled}, {unclosed: this.props.unclosed || (this.props.isOpened && !this.props.children)}, {hideArrow: !this.state.showArrow || (this.props.isOpened && !this.props.children)})}
                 tabIndex={this.props.tabIndex}
                 data-id={this.props.dataId}
            >
                <Collapsible trigger={collapseTrigger(this.props.openText)}
                             triggerWhenOpen={collapseTrigger(this.props.hideText)}
                             triggerDisabled={triggerDisabled}
                             handleTriggerClick={this.handleClick}
                             open={this.props.isOpened}
                             onOpen={this.collapseOpen}
                             overflowWhenOpen= 'visible'
                >
                    {this.props.children &&
                        <div className="Collapsible__contentInner_style">
                            {this.props.children}
                        </div>
                    }
                </Collapsible>
            </div>
        );
    }

    static propTypes = {
        /**
         * Текст для закрытого компонента
         */
        openText: PropTypes.string.isRequired,
        /**
         * Текст для открытого компонента
         */
        hideText: PropTypes.string.isRequired,
        /**
         * Признак отображения контента
         */
        isOpened: PropTypes.bool.isRequired,
        /**
         * Тип компонента
         */
        type: PropTypes.oneOf(['primary', 'secondary', 'additional', 'suggestion']).isRequired,
        /**
         * Признак невозможности свернуть раскрытый элемент
         */
        unclosed: PropTypes.bool,
        /**
         * Обработчик изменений
         */
        onClick: PropTypes.func.isRequired,
        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Дополнительные нескрываемые элементы слева
         */
        leftData: PropTypes.node,
        /**
         * Дополнительные нескрываемые элементы справа
         */
        rightData: PropTypes.node,
        /**
         * Ширина блока элементов справа
         */
        rightDataWidth: PropTypes.string
    };

    static defaultProps = {
        isOpened: false,
        type: Collapse.collapseTypes.primary,
        disabled: false,
        onClick: (() =>{}),
        unclosed: false
    };
}

export default Collapse