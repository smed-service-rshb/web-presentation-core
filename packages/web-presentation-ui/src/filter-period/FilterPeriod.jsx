import React from 'react'
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import moment from 'moment';
import InputDatepicker from '../datepicker-input'
import Button from '../button';
import './styles.css';

class FilterPeriod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePeriod: false,
            start: this.props.start,
            end: this.props.end
        }
    }

    selectPeriod = () => {
        this.setState({
            activePeriod: true
        });
    };

    selectLastMonth = () => {
        if(!this.state.activePeriod) {
            return
        }

        var prevMonth = moment().subtract(1, 'months').format('DD.MM.YYYY');
        var currentDay =  moment().format('DD.MM.YYYY');

        this.props.onChange({end: currentDay, start: prevMonth});
        this.setState({
            activePeriod: false
        });
    };

    onChangePeriodStart = start => {
        this.setState({start});
    };

    onChangePeriodEnd = end => {
        this.setState({end})
    };

    handleClick = () => {
        this.props.onChange({end:this.state.end, start:this.state.start});
    };


    monthClick= (e) => {
        if (e.which === 13 || e.which === 32) {
            this.selectLastMonth();
        }
    };
    periodClick= (e) => {
        if (e.which === 13 || e.which === 32) {
            this.selectPeriod();
        }
    };

    render () {

        return (
            <div className="period-filter" data-id={this.props.dataId}>
                <div tabIndex={0} className={classNames('period-filter-tab period-filter-tab-last-month', {active: !this.state.activePeriod})} onClick={this.selectLastMonth} data-id={`month-${this.props.dataId}`} onKeyPress={this.monthClick}>
                    <span className="period-filter-tab-text">За последний месяц</span>
                </div>
                <div tabIndex={0} className={classNames('period-filter-tab period-filter-tab-date', {active: this.state.activePeriod})} onClick={this.selectPeriod} data-id={`period-${this.props.dataId}`} onKeyPress={this.periodClick}>
                    <span className="period-filter-tab-text">За период</span>

                    {this.state.activePeriod &&
                        <div className="period-filter-tab-dates">
                            <div className="inline-block period-filter-tab-dates-start"><InputDatepicker value={this.state.start} onChange={this.onChangePeriodStart} dataId={`period-start-${this.props.dataId}`}/></div>
                            <div className="dash">‒</div>
                            <div className="inline-block period-filter-tab-dates-end"><InputDatepicker value={this.state.end} onChange={this.onChangePeriodEnd} dataId={`period-end-${this.props.dataId}`}/></div>

                            <div className="period-filter-tab-button">
                                <Button name="Показать" onClick={this.handleClick} type="additional" dataId={`button-${this.props.dataId}`}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }

    static propTypes = {
        /**
         * Начальная дата
         */
        start: PropTypes.string,
        /**
         * Конечная дата
         */
        end: PropTypes.string,
        /**
         * Обработчик нажатия на кнопку
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired
    };

    static defaultProps = {
        start: '',
        end: ''
    };
}



export default FilterPeriod;