import PropTypes from 'prop-types';

const lazy = f => ((...args) => f().apply(this, args));

const MenuItemPropType = PropTypes.shape({
    /**
     * название пункта меню
     */
    name: PropTypes.string.isRequired,

    /**
     * обработчик нажатия
     */
    onClick: PropTypes.func.isRequired,

    /**
     * Признак активного
     */
    active: PropTypes.bool,

    /**
     * Дочерние элементы
     */
    children: PropTypes.arrayOf(lazy(() => MenuItemPropType))
});

export default MenuItemPropType