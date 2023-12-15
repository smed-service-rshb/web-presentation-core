import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import Hint from '../hint'
import Divider from '../divider'
import './styles.css'

class Field extends React.Component {

    static aligns = {
        right: 'right',
        left: 'left'
    };

    static fieldTypes = {
        default: 'default',
        formField: 'formField'
    };

    render = () => {
        return <div className={classNames ('field', `${this.props.customSelector}`)}>
            {this.props.type === 'default' && <div>
                    <div className={classNames ({'field-selected': this.props.selected})}>
                        <div className={classNames ('field-title', `field-title-${this.props.align}`)}>
                            {this.props.hint && <Hint>{this.props.hint}</Hint>}
                            <div className={classNames ('field-title-text', `field-title-text-${this.props.align}`)}>
                                <span className={classNames (`field-title-text-${this.props.align}-item gray`, this.props.styleTitle)}>{this.props.title}</span>
                                {this.props.required && <span className="red">*</span>}
                            </div>
                        </div>
                        <div className="field-value">
                            {this.props.children}
                            <Divider type="clear"/>
                            {this.props.error &&
                                <div className="errors deep-red">
                                    {this.props.error}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }

            {this.props.type === 'formField' && <div className="form-field">
                   <div className="form-field-title">{this.props.title}</div>{this.props.hint && <Hint>{this.props.hint}</Hint>}
                   <div className="form-field-value">
                       {this.props.children}
                       {this.props.error &&
                       <div className="form-errors deep-red">
                           {this.props.error}
                       </div>
                       }
                   </div>
               </div>

            }
        </div>
    }

    static propTypes = {
        /**
         * Тип поля
         */
        type: PropTypes.oneOf(['default', 'formField']).isRequired,
        /**
         * Заголовок поля
         */
        title: PropTypes.string,
        /**
         * Текст подсказки к полю
         */
        hint: PropTypes.string,
        /**
         * Дополнительный стиль заголовка поля
         */
        styleTitle: PropTypes.string,
        /**
         * Выравнивание заголовка поля
         */
        align: PropTypes.oneOf(['left', 'right']),
        /**
         * Признак обязательного поля
         */
        required: PropTypes.bool,
        /**
         * Отображение ошибки валидации
         */
        error: PropTypes.string,
        /**
         * Отображение класса для дополнительной кастомизации
         */
        customSelector: PropTypes.string,
        /**
         * Выделение поля
         */
        selected: PropTypes.bool
    };

    static defaultProps = {
        align: Field.aligns.right,
        type: Field.fieldTypes.default
    };

}
export default Field