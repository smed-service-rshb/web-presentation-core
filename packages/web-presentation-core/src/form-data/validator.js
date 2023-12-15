import moment from 'moment'

const success = value => ({
    value,
    success: true,
});
const error = errorMsg => ({
    error: errorMsg,
    success: false,
});

const validatorBuilder = cb => value => {
    return cb(success, error)(value)
};

export default (validation, name) => (success, error, value) => {
    const validators = (validation && validation({validator: validatorBuilder})) || [];
    for (let validator of validators) {
        const result = validator(value);
        if (result.success) {
            value = result.value;
        }
        else {
            error(name, result.error);
            return
        }
    }
    success(name, value)
}


validatorBuilder.required = error => value => ({
    value,
    success: !!value && value !== '',
    error
});

validatorBuilder.rangeLength = (errorMsg, min = 0, max) => value => {
    if (!value) {
        return success(value);
    }
    if (value.length < min) {
        return error(errorMsg);
    }
    if (max && value.length > max) {
        return error(errorMsg);
    }
    return success(value);
};

validatorBuilder.typeNumeric = errorMsg => value => {
    if (!value) {
        return success(value);
    }
    let numericValue = parseFloat(value);
    if (!numericValue) {
        return error(errorMsg);
    }
    return success(numericValue);
};

validatorBuilder.rangeNumeric = (errorMsg, minValue, maxValue) => value => {
    if (!value) {
        success(value);
    }
    let numericValue = typeof value === 'number' ? value : parseFloat(value);
    if (!numericValue) {
        return error(errorMsg);
    }
    if (numericValue < minValue || numericValue > maxValue) {
        return error(errorMsg)
    }
    return success(numericValue);
};

validatorBuilder.minLength = (errorMsg, min = 0) => value => {
    if (!value) {
        return success(value);
    }
    if (value.length < min) {
        return error(errorMsg);
    }
    return success(value);
};

validatorBuilder.maxLength = (errorMsg, max) => value => {
    if (!value) {
        return success(value);
    }
    if (max && value.length > max) {
        return error(errorMsg);
    }
    return success(value);
};

validatorBuilder.typeDate = (errorMsg, template='DD.MM.YYYY') => date => {
    if (!date) {
        return success(date);
    }
    let momentDate = moment(date, template, true);
    if (!momentDate.isValid()) {
        return error(errorMsg);
    }
    return success(date);
};

validatorBuilder.sameDate = (errorMsg, value, template='DD.MM.YYYY') => date => {
    if (!date) {
        return success(date);
    }
    let momentValueDate= moment(value, template, true);
    let momentDate = moment(date, template, true);
    if (!momentValueDate.isSame(momentDate)) {
        return error(errorMsg);
    }
    return success(date);
}

validatorBuilder.minDate = (errorMsg, min, template='DD.MM.YYYY') => date => {
    if (!date) {
        return success(date);
    }
    let momentMinDate= moment(min, template, true);
    let momentDate = moment(date, template, true);
    if (momentMinDate.isAfter(momentDate)) {
        return error(errorMsg);
    }
    return success(date);
};

validatorBuilder.maxDate = (errorMsg, max, template='DD.MM.YYYY') => date => {
    if (!date) {
        return success(date);
    }
    let momentMaxDate= moment(max, template, true);
    let momentDate = moment(date, template, true);
    if (momentMaxDate.isBefore(momentDate)) {
        return error(errorMsg);
    }
    return success(date);
};

validatorBuilder.regexp = (errorMsg, regexp = /.*/) => value => {
    if (!value || regexp.test(value)) {
        return success(value);
    }
    return error(errorMsg)
};
//TODO покрыть тестами