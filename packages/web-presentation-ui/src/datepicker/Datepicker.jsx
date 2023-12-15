import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import Button from '../button';
import {locale, LABELS,  localeUtils, CalendarHeader} from './common/DatepickerCommon';

import './styles.css';
import 'react-day-picker/lib/style.css';

export default class Datepicker extends React.Component {


    handleDayClick = day => {
        this.props.onChange(moment(day).format('DD.MM.YYYY'));
    };

    chooseToday = () => {
        this.handleDayClick();
    };

    renderDay(day) {
        const date = day.getDate();
        return (
            <div className="day-wrapper">
                {date}
            </div>
        );
    }

    render() {
        return (
            <div className="calendar-container" data-id={this.props.dataId}>
                <DayPicker
                    className="simpleCalendar"
                    enableOutsideDays
                    month={this.getDateFromString(this.props.value)}
                    onDayClick={this.handleDayClick}
                    selectedDays={this.getDateFromString(this.props.value)}
                    labels={LABELS[locale]}
                    locale={locale}
                    localeUtils={localeUtils}
                    modifiers={{
                        sunday: day => day.getDay() === 0,
                        saturday: day => day.getDay() === 6
                }}
                    captionElement={<CalendarHeader/>}
                    renderDay={this.renderDay}
                >
                </DayPicker>

                <div className="datepicker-buttons">
                    <span className="inline-buttons">
                        <Button name="Сегодня" type={Button.buttonTypes.secondary} onClick={this.chooseToday} dataId={this.props.dataId + '-datepickerTodayButton'}/>
                    </span>
                </div>
            </div>
        );
    }

    getDateFromString (value) {
        let date = moment(value, 'DD.MM.YYYY', true);
        if (date.isValid()) {
            return date._d;
        }
        return undefined;
    }

    static propTypes = {
        /**
         * Выбранная дата.
         * Если не задана, то выставляется сегодняшняя дата
         */

        value: PropTypes.string,

        /**
         * Обработчик изменений
         */
        onChange: PropTypes.func.isRequired,

        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired
    }
}