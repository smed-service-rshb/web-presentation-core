import React from 'react';
import PropTypes from 'prop-types';

import createValidator from './validator'

const buildPropTypes = originalPropTypes => ({
    ...originalPropTypes,

    formData: PropTypes.shape({

        /**
         * Функция инициализации формы данными.
         * Входные параметры: данные формы.
         * Например:
         *   {
             *       "name": "blah-blah-blah",
             *       "description": "Какое-то описание"
             *    }
         */
        init: PropTypes.func.isRequired,

        /**
         * Функция рендеринга поля
         */
        renderField: PropTypes.func.isRequired,

        /**
         * Функция валидации формы
         */
        validate: PropTypes.func.isRequired,

        /**
         * Объект, содержащий функции для вывода ошибок
         */
        errors: PropTypes.shape({

            /**
             * Функция возвращающая список ошибок полей и формы
             * return список ошибок (без повторений) типа - string
             */
            list: PropTypes.func.isRequired,

            /**
             * Функция возвращающая список ошибок формы
             * return список ошибок типа - string
             */
            formErrors: PropTypes.func.isRequired
        }).isRequired,

        /**
         * Объект, содержащий вырые знаяения полей или пустой объект...
         * Пример
         *   {
         *       "name": "blah-blah-blah",
         *       "description": "Какое-то описание"
         *    }
         */
        rawValues: PropTypes.object.isRequired,
    }),
});

const withFormData = Component => {
    const originalComponentPropTypes = {
        ...Component.propTypes
    };

    Component.propTypes = buildPropTypes(originalComponentPropTypes);

    return class C extends React.Component {
        static displayName = `withFormData(${Component.displayName || Component.name})`;

        static propTypes = originalComponentPropTypes;
        static defaultProps = Component.defaultProps;

        constructor(props) {
            super(props);
            this.state = {data: {}, fieldErrors: [], formErrors: []};
        }

        render = () => <Component {...this.props} formData={this._buildFormData()}/>;

        _getFieldsData = state => state.data || {};

        _getFieldData = state => name => this._getFieldsData(state)[name] || {};

        _getFieldValue = state => name => this._getFieldData(state)(name).value;

        _setFieldValue = name => value => this.setState(state => {
            const data = {...state.data};
            data[name] = {...data[name]};
            data[name].value = value;
            return {data};
        });

        _getError = state => name => this._getFieldData(state)(name).error;

        _initData = data => {
            const stateData = {};
            for (const fieldName of Object.keys(data)) {
                stateData[fieldName] = {
                    value: data[fieldName]
                }
            }
            this.setState({data: stateData});
        };

        _buildFormData = () => {
            const errors = {};
            const rawValues = {};
            for (const fieldName of Object.keys(this._getFieldsData(this.state))) {
                rawValues[fieldName] = this._getFieldValue(this.state)(fieldName);
            }

            errors.list = () => this._distinctStrings(
                Array.concat(this._getValidatedFieldsError().map(error => error.message), this._getValidatedFormErrors())
            );
            errors.formErrors = () => this._getValidatedFormErrors();

            return {
                errors,
                rawValues,
                renderField: this._renderField,
                validate: this._validate,
                init: this._initData,
            };
        };

        _getValidatedFieldsError = () => this.state.fieldErrors;

        _getValidatedFormErrors = () => this.state.formErrors;

        _distinctStrings = (strings = []) => strings.filter((v, i, a) => a.indexOf(v) === i);

        _validate = (validationForm, scb, ecb) => () => this.setState(state => {
            const data = {...state.data};
            const values = {};
            const fieldErrors = [];
            const getFieldValue = this._getFieldValue(state);

            const resetError = fieldName => {
                data[fieldName] = {
                    value: getFieldValue(fieldName)
                };
            };

            const success = (fieldName, value) => {
                resetError(fieldName);
                values[fieldName] = value;
            };
            const error = (fieldName, error) => {
                data[fieldName] = {
                    value: getFieldValue(fieldName),
                    error
                };
                fieldErrors.push({
                    field: fieldName,
                    message: error
                });
            };
            for (const field of validationForm.fields) {
                const rawFieldValue = getFieldValue(field.name);
                field.validator(success, error, rawFieldValue);
            }

            for (const fieldName of Object.keys(this._getFieldsData(state))) {
                const field = validationForm.fields.find(field => field.name === fieldName);
                if (!field) {
                    resetError(fieldName)
                }
            }

            const formValidatorSuccess = () => (null);
            const formErrors = [];
            const formValidatorError = message => {
                formErrors.push({message});
            };

            const formValidators = validationForm.form || [];
            for (const formValidator of formValidators) {
                formValidator(formValidatorSuccess, formValidatorError)(values);
            }

            const errors = [...fieldErrors, ...formErrors];
            if (errors.length === 0) {
                scb(values)
            }
            else {
                ecb(errors)
            }

            return {
                data,
                fieldErrors,
                formErrors: formErrors.map(error => error.message)
            }
        });

        _validateField = field => this.setState(state => {
            const data = {...state.data};
            const fieldName = field.name;
            const getFieldValue = this._getFieldValue(state);

            const success = () => {
                data[fieldName] = {value: getFieldValue(fieldName)};
            };
            const error = (fieldName, error) => {
                data[fieldName] = {
                    value: getFieldValue(fieldName),
                    error
                };
            };
            field.validator(success, error, getFieldValue(fieldName));
            return {data}
        });

        _clearError = fieldName => this.setState(state => {
            const data = {...state.data};
            data[fieldName] = {value: this._getFieldValue(state)(fieldName)};
            return {data};
        });

        _renderField = (field, params = {}) => {
            const value = this._getFieldValue(this.state)(field.name);
            const setValue = this._setFieldValue(field.name);
            const setFieldValue = (fieldName, value) => this._setFieldValue(fieldName)(value);
            const errorMessage = this._getError(this.state)(field.name);
            const validate = () => this._validateField(field);
            const clearError = () => this._clearError(field.name);
            const clearFieldError = fieldName => this._clearError(fieldName);

            return field.render(
                {
                    value,
                    onChange: setValue, //Устаревшее поле. Оставлено для совместимости. Рекомендуется использовать setValue
                    setValue,
                    setFieldValue,
                    errorMessage,
                    validate,
                    clearError,
                    clearFieldError
                },
                params
            );
        };
    }
};

withFormData.createValidationForm = (fields, form) => ({
    fields,
    form
});

withFormData.createField = (name, render, validation) => ({
    name,
    render,
    validator: createValidator(validation, name)
});

export default withFormData
//TODO покрыть тестами
