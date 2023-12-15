import React from 'react';
const locale = 'ru';
const weekdaysLong = {
    ru: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ]
};

const weekdaysShort = {
    // Idem
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};

const months = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
};
const firstDayOfWeek = {
    ru: 1
};

const LABELS = {
    ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' }
};


const localeUtils = {
    formatDay: (d, locale = 'en') =>
        `${weekdaysLong[locale][d.getDay()]}, ${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`,
    formatWeekdayShort: (index, locale = 'en') => weekdaysShort[locale][index],
    formatWeekdayLong: (index, locale = 'en') => weekdaysLong[locale][index],
    getFirstDayOfWeek: locale => firstDayOfWeek[locale],
    getMonths: locale => months[locale],
    formatMonthTitle: (d, locale) =>
        `${months[locale][d.getMonth()]} ${d.getFullYear()}`

};

/* Заголовок календаря */
function CalendarHeader({ date, localeUtils }) {
    return (
        <div className="DayPicker-Caption">
            <div className="DayPicker-Caption-data">
                <div id="month">{localeUtils.getMonths(locale)[date.getMonth()]}</div>
                <div id="year">{date.getFullYear()}</div>
            </div>
        </div>
    );
}


export {locale, weekdaysLong, weekdaysShort, months, firstDayOfWeek, LABELS, localeUtils, CalendarHeader}