import PropTypes from 'prop-types';

export default {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    })
};
