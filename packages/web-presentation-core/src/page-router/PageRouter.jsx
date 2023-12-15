import React from 'react';
import PropTypes from 'prop-types';
import URLUtil from './URLUtil'

export const pageRouterPropType = PropTypes.shape({
    /**
     * Метод открытия страницы
     * Входные параметры: (key, params = {})
     *    key - ключ страницы
     *    params - параметры страницы
     * Возвращаемое значение:
     *    true - страница найдена
     *    false - не найдена
     */
    open: PropTypes.func.isRequired,
    /**
     * Метод открытия внешней страницы
     * Входные параметры: (path)
     *    path - адрес страницы
     */
    openExternalPage: PropTypes.func.isRequired,

    /**
     * Метод открытия страницы по умолчанию
     * Входные параметры: отсутствуют
     * Возвращаемое значение:
     *    true - страница по умолчанию задана и корректна
     *    false - страница по умолчанию не задана и ли некорректна
     */
    openIndex: PropTypes.func.isRequired,

    /**
     * Метод возврата к предыдущей странице или помеченной ранее странице, если передана метка
     * Входные параметры:
     *      название метки (если не передать, то сработает как переход назад)
     *      callback который выполняется если передана метка которой не существует (необязательный параметр)
     * Возвращаемое значение: отсутствует
     */
    back: PropTypes.func.isRequired,

    /**
     * Метод, возвращающий текущую страницу.
     * Входные параметры: отсутствуют
     * Возвращаемое значение: {key: 'string', params: {}}
     *    key - ключ страницы
     *    params - параметры страницы
     */
    currentPage: PropTypes.func.isRequired,

    /**
     * Метод, помечающий текущую страницу.
     * Входные параметры: имя метки
     * Возвращаемое значение: отсутствуют
     */
    markPage: PropTypes.func.isRequired,

    /**
     * Метод, помечающий предыдущую страницу.
     * Входные параметры: имя метки
     * Возвращаемое значение: отсутствуют
     */
    markPrevPage: PropTypes.func.isRequired,

});
const PageNotFound = () => (<div>Страница не найдена.</div>);

/**
 * Формат страницы
 */
export const pagePropType = PropTypes.shape({
    /**
     * Уникальный ключ страницы
     */
    key: PropTypes.string.isRequired,

    /**
     * Уникальный path страницы
     */
    path: PropTypes.string.isRequired,

    /**
     * Описание параметров страницы.
     * Пример:
     * paramTypes: {
             *   id: {
             *      parse: value => parseInt(value),
             *      format: value => value
             *   }
             * }
     */
    paramTypes: PropTypes.objectOf(PropTypes.shape({
        parse: PropTypes.func,
        format: PropTypes.func
    })),

    /**
     * Компонент, соотвествующий странице
     */
    component: PropTypes.func.isRequired,
});

export default class PageRouter extends React.Component {
    static propTypes = {
        /**
         * История
         */
        history: PropTypes.object.isRequired,
        /**
         * Функция возвращающая контейнер страниц
         * shape({
         * Поиск первой подходящей страницы по критерию
         * Параметры: predicate
         *    predicate - функция принимающая в качестве параметра страницу
         * Возвращаемое значение:
         *    первая страница, для которой predicate вернул значение отличное, от null или undefined.
         *    если такой страницы нет - то null
         * findApplicable: PropTypes.func.isRequired,
         * Получение страницы по ключу
         * Параметры: ключ
         * Возвращаемое значение:
         *   страница, если найдена, иначе null
         * get: PropTypes.func.isRequired,
         * Страница по умолчанию, открываемая при недоступном
         * Параметры: отсутсвуют
         * Возвращаемое значение: {key:'string', params{}}
         *   key: ключ страницы
         *   params: праметры, передаваемые странице
         * index: PropTypes.func.isRequired
         * })
         */
        pages: PropTypes.func,

    };
    static defaultProps = {
        pages: () => ({
            findApplicable: () => (null),
            get: () => (null),
            index: () => (null)
        }),
    };

    constructor(props) {
        super(props);
        this.state = {location: this.props.history.location};
    }

    componentDidMount = () => {
        this._checkLocationPatchPages(this.props.pages);
    };

    _checkLocationPatchPages = pages => {
        const matchResult = this._matchPage(pages, this.state.location);
        if (!matchResult) {
            this._openIndexPage()
        }
    };

    UNSAFE_componentWillReceiveProps = nextProps => {
        this._checkLocationPatchPages(nextProps.pages);
    };

    UNSAFE_componentWillMount = () => {
        this.unlistenHistory = this.props.history.listen((location, action) => {
            if (action === 'REPLACE') {
                return
            }
            const {history, pages} = this.props;
            this.setState({location: history.location});
            const matchResult = this._matchPage(pages, history.location);
            if (!matchResult) {
                this._openIndexPage()
            }
        })
    };

    componentWillUnmount = () => {
        this.unlistenHistory()
    };

    render = () => {
        const matchResult = this._matchPage(this.props.pages, this.state.location);
        if (!matchResult) {
            return <PageNotFound/>
        }
        return <matchResult.page.component {...matchResult.params}/>
    };

    _matchPage = (pages, location) => pages().findApplicable(page => {
        const matchResult = URLUtil.matchURL(location, page.path, page.paramTypes);
        if (matchResult) {
            return {
                page,
                params: matchResult.params
            }
        }
        return null;
    });

    _openPage = (key, params = {}) => {
        const {pages, history} = this.props;
        const page = pages().get(key);
        if (!page) {
            return false
        }
        const state = history.location.state;
        for (let letter in state) {
            state[letter] = state[letter] + 1;
        }
        history.push(URLUtil.buildUrl(page.path, params, page.paramTypes), state);
        return true
    };

    _openPageNewTab = (key, params = {}, newTabKey = "_blank") => {
        const {pages} = this.props;
        const page = pages().get(key);
        if (!page) {
            return false
        }
        window.open(URLUtil.buildUrl(page.path, params, page.paramTypes), newTabKey);
        return true
    };

    _openExternalPage = path => {
        window.location = path;
    };

    _openIndexPage = () => {
        const indexPage = this.props.pages().index();
        if (indexPage) {
            return this._openPage(indexPage.key, indexPage.params)
        }
        return false
    };

    _prevPage = (letter, cb) => {
        const state = this.props.history.location.state;
        if (!letter) {
            this.props.history.goBack();
            return;
        }
        if (!state) {
            cb && cb();
            return;
        }
        const delta = this.props.history.location.state[letter];
        if (delta) {
            this.props.history.go(-delta);
        }
        else {
            cb && cb();
        }
    };

    _currentPage = () => {
        const matchResult = this._matchPage(this.props.pages, this.props.history.location);
        if (!matchResult) {
            return null
        }
        return {
            key: matchResult.page.key,
            params: matchResult.params
        }
    };

    _markPage = (initialValue = 0) => letter => {
        if (!window.history.replaceState) {
            console.warn("Браузер не поддерживает History API. Пометка страниц недоступна.");
            return;
        }
        const {history} = this.props;
        const state = history.location.state || {};
        state[letter] = initialValue;
        history.replace(history.location.pathname + history.location.search, state);
    };

    static childContextTypes = {
        pageRouter: pageRouterPropType.isRequired
    };

    getChildContext = () => {
        const open = this._openPage;
        const openNewTab = this._openPageNewTab;
        const openExternalPage = this._openExternalPage;
        const openIndex = this._openIndexPage;
        const back = this._prevPage;
        const currentPage = this._currentPage;
        const markPage = this._markPage(0);
        const markPrevPage = this._markPage(1);
        return {
            pageRouter: {
                open,
                openNewTab,
                openExternalPage,
                openIndex,
                back,
                currentPage,
                markPage,
                markPrevPage
            }
        };
    }
}