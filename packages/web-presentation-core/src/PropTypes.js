import RealPropTypes from 'prop-types';

const PropTypes = {};
//У реакта в режиме продакшен сборки все проптайпсы ссылаются на 1 функу (prop-types/factoryWithThrowingShims.js).
//Поэтому создаем для кажого свойства новую функу, делегируя ее оригиналу.
const wrap = key => {
    const result = (...args) => RealPropTypes[key](...args);
    result.isRequired = (...args) => RealPropTypes[key].isRequired(...args);
    return result;
};

for (const key of Object.keys(RealPropTypes)) {
    PropTypes[key] = wrap(key);
}

const injectParse = (key, cb) => {
    PropTypes[key].parse = cb;
    PropTypes[key].isRequired.parse = cb;
};

injectParse("number", value => (parseInt(value, 10)));

export default PropTypes