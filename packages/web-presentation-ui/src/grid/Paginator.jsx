import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

let rowQuantity = [
    10, 20, 50
];

class Paginator extends React.Component {
    state = {isOpen: false};

    handlePageChange = (event, page) => {
        event.preventDefault();
        this.props.onPageChange(page)
    };

    handleNextPage = event => {
        event.preventDefault();
        if (!this.props.hasMore) {
            return;
        }
        this.handlePageChange(event, this.props.page + 1)
    };

    handlePrevPage = event => {
        event.preventDefault();
        if (this.props.page <= 1) {
            return;
        }
        this.handlePageChange(event, this.props.page - 1)
    };

    handleChangeSize = quantity => event => {
        event.preventDefault();
        this.props.onSizeChange(parseInt(quantity, 10))
    };

    _handleClick = () => {
        if (!this.state.isOpen) {
            // добавляем/удаляем обработчик события onClick
            window.addEventListener('click', this._handleOutsideClick, false);
        } else {
            window.removeEventListener('click', this._handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    _handleOutsideClick = e => {
        // игнорируем клики на самом компоненте
        if (this.node.contains(e.target)) {
            return;
        }

        this._handleClick();
    };

    render() {
        let {page, hasMore} = this.props;

        let paging = rowQuantity.map(quantity => (
            <div className="pagination-quantity-items" key={'quantity-item-' + quantity}>
                <span key={'quantity-' + quantity}
                     className="pagination-quantity-items-text"
                     data-id={'quantity-' + quantity}
                     onClick={this.handleChangeSize(quantity)}
                >
                    Показывать по {quantity}
                </span>
            </div>
        ));

        return (
            <div className="pagination">
                <div className="pagination-arrows">
                    <a href="#prev"
                       className={classNames('pagination-arrows-prev pagination-arrow', {'inactive': page <= 1})}
                       onClick={this.handlePrevPage} data-id="gridPrevIcon"> </a>
                    <a href="#next"
                       className={classNames('pagination-arrows-next pagination-arrow', {'inactive': !hasMore})}
                       onClick={this.handleNextPage} data-id="gridNextIcon"> </a>
                </div>
                <div className="pagination-quantity" ref={node => {this.node = node;}}>
                    <div className="pagination-quantity-description" onClick={this._handleClick}>
                        <span className={classNames('pagination-quantity-selected', {'pagination-quantity-open': this.state.isOpen})}>Показывать по {this.props.size}</span>
                        {this.state.isOpen && <div className="pagination-quantity-wrapper">{paging}</div>}
                    </div>
                </div>
            </div>
        )
    }

    static propTypes = {
        /**
         * Номер текущей страницы
         */
        page: PropTypes.number.isRequired,

        /**
         * Размер страницы
         */
        size: PropTypes.number.isRequired,

        /**
         * Есть ли еще данные
         */
        hasMore: PropTypes.bool.isRequired,

        /**
         * хендлер изменения текущей страницы
         *      onPageChange(page).
         */
        onPageChange: PropTypes.func.isRequired,

        /**
         * хендлер изменения размера страницы
         *      onSizeChange(size).
         */
        onSizeChange: PropTypes.func.isRequired
    }
}

export default Paginator

//TODO Покрыть тестами