import React from 'react';
import {compose, PropTypes, withActions, withFormData, withModals, withPageRouter} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Checkbox,
    Field,
    FileDownload,
    FileUpload,
    Form,
    Input,
    InputDatepicker,
    Panel,
    Textarea,
    Toggle,
    Avatar
} from '@efr/medservice-web-presentation-ui';
import {EntitiesDetailsAction, EntityCreateAction, EntitySaveAction, SaveAvatar} from '../../../actions'
import {LIST_PAGE_KEY} from '../page-keys'

const FIELDS = {
    avatar: 'avatar',
    name: 'name',
    calculated: 'calculated',
    calculatedFromOutside: 'calculatedFromOutside',
    description: 'description',
    needDescription: 'needDescription',
    inputDate: 'date',
    inputDatepicker: 'datepicker',
    validatedField: 'validatedField',
    validatedFieldOutside: 'ValidatedFieldOutside'
};

const regexpField = /^([1-5]{5,})$/;

const nameOnFocusChange = (valueSetter, value) => focused => {
    if (!focused) {
        valueSetter(FIELDS.calculatedFromOutside, `(${value})`);
    }
};

const startsWithOneValidator = (success, error) => value => {
    if (value.startsWith('1')) {
        return success(value)
    }
    return error('Валидное значение должно начинаться с 1')
};

const icon = '/ib6/img/logo-rshb.svg';

const AvatarField = withFormData.createField(
    FIELDS.avatar,
    ({setValue, errorMessage}, {owner}) => (
        <Field title={'Аватар'} error={errorMessage} required>
            <Avatar ref={ref => owner.avatar = ref}
                    editable
                    icon={icon}
                    dataId={'client-avatar-id1'}
                    onFileChange={setValue}
                    name={'filename'}
            />
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле обязательно для заполнения."),
    ])
);

const NameField = withFormData.createField(
    FIELDS.name,
    ({value, setValue, setFieldValue, errorMessage}, {title = 'Наименование', disabled = false, required = true}) => (
        <Field title={title} error={errorMessage} required={required}>
            <Input type='text' value={value} onChange={setValue} disabled={disabled} dataId="field-name"
                   onFocusChange={nameOnFocusChange(setFieldValue, value)}/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Наименование' обязательно для заполнения."),
        validator.rangeLength("Длина поля должна быть от 3 до 6.", 3, 6),
        validator(startsWithOneValidator)
    ])
);

const calculatedField = withFormData.createField(
    FIELDS.calculated,
    ({onChange, errorMessage}, {nameValue}) => (
        <Field title="Наименование, деленное на 1000" error={errorMessage}>
            <Input type='text' value={(nameValue / 1000).toString()} onChange={onChange} dataId="field-name"/>
        </Field>
    )
);

const calculatedFromOutsideField = withFormData.createField(
    FIELDS.calculatedFromOutside,
    ({onChange, errorMessage, value}) => (
        <Field title="Поле меняется по снятию фокуса с наименования (берется в скобки)" error={errorMessage}>
            <Input type='text' onChange={onChange} value={value} dataId="field-name"/>
        </Field>
    )
);

const NeedDescriptionField = withFormData.createField(
    FIELDS.needDescription,
    ({value, onChange, errorMessage}) => (
        <Field title='Отобразить описание' error={errorMessage}>
            <Checkbox checked={value} onChange={onChange} dataId="field-need-description"/>
        </Field>
    )
);

const DescriptionField = withFormData.createField(
    FIELDS.description,
    ({value, onChange, errorMessage}) => (
        <Field title='Описание' error={errorMessage} required>
            <Textarea value={value} onChange={onChange} dataId="field-description"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Описание' обязательно для заполнения."),
        validator.regexp("Поле 'Описание' должно удовлетворять регекспу /^([1-5]{5,})$/", regexpField),
    ])
);

const InputDateField = withFormData.createField(
    FIELDS.inputDate,
    ({value, setValue, setFieldValue, errorMessage}, {title = 'Дата', disabled = false, required = true}) => (
        <Field title={title} error={errorMessage} required={required}>
            <Input type='text' value={value} onChange={setValue} disabled={disabled} dataId="field-test"
                   onFocusChange={nameOnFocusChange(setFieldValue, value)}/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Дата' обязательно для заполнения."),
        validator.typeDate("Дата должна быть в формате 'DD/MM/YYYY'", 'DD/MM/YYYY'),
    ])
);

const InputDatepickerField = withFormData.createField(
    FIELDS.inputDatepicker,
    ({value, setValue, setFieldValue, errorMessage, validate}, {title = 'Календарь', disabled = false, required = true}) => (
        <Field title={title} required={required}>
            <InputDatepicker value={value}
                             onChange={setValue}
                             dataId=""
                             onInputFocusChange={v => !v && validate()}
                             error={!!errorMessage}/>
            {errorMessage && <div className="errors deep-red">
                {errorMessage}
            </div>}
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Календарь' обязательно для заполнения."),
        validator.minDate('Поле не может быть меньше 22.12.2030', '22.12.2030'),
    ])
);

const onChangeValidateInputField = (id) => withFormData.createField(
    `field${id}`,
    ({value, setValue, errorMessage, validate, clearError, setFieldValue}, {title = `Поле ${id}`, disabled = false, required = true}) => (
        <Field title={title} error={errorMessage} required={required}>
            <Input type='text' value={value} onChange={setValue} disabled={disabled} dataId={`field-input${id}`}
                   onFocusChange={v => {
                       !v && validate()
                   }}/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле обязательно для заполнения."),
        validator.rangeLength("Длина поля должна быть от 3 до 6.", 3, 6),
        validator(startsWithOneValidator)
    ])
);

const ToggleField = (id, validate) => withFormData.createField(
    `Toggle${id}`,
    ({value, setValue}) => {
        return <Field title={`Поле ${id}`}>
            <Toggle checked={value}
                    onChange={v => (!v || validate()) && setValue(v)}
                    dataId={`field-toggle${id}`}/>
        </Field>
    },
    () => {
    }
);

const ValidatedField = withFormData.createField(
    FIELDS.validatedField,
    ({value, setValue, errorMessage, setFieldValue, validate}) => (
        <Field title='Валидируемое поле 1' error={errorMessage} required>
            <Input value={value}
                   onChange={v => {
                       setValue(v);
                       setFieldValue(FIELDS.validatedFieldOutside, v)
                   }}
                   onFocusChange={v => !v && validate()}
                   dataId="field-description"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Валидируемое поле 1' обязательно для заполнения."),
        validator.regexp("Поле 'Валидируемое поле 1' должно удовлетворять регекспу /^([1-5]{5,})$/", regexpField),
    ])
);

const ValidatedFieldOutside = withFormData.createField(
    FIELDS.validatedFieldOutside,
    ({value, setValue, errorMessage, setFieldValue, validate, clearFieldError}) => {
        const check = () => regexpField.test(value) && clearFieldError(FIELDS.validatedField);

        return <Field title='Валидируемое поле 2' error={errorMessage} required>
            <Input value={value}
                   onChange={v => {
                       setValue(v);
                       setFieldValue(FIELDS.validatedField, v)
                   }}
                   onFocusChange={v => !v && (validate() || check())}
                   dataId="field-description"/>
        </Field>
    },
    ({validator}) => ([
        validator.required("Поле 'Валидируемое поле 2' обязательно для заполнения."),
        validator.regexp("Поле 'Валидируемое поле 2' должно удовлетворять регекспу /^([1-5]{5,})$/", regexpField),
    ])
);

const UploadFileField = withFormData.createField(
    "uploadFile",
    ({value, setValue, errorMessage}, {owner}) => (
        <Field title='Файл, будь он неладен!' required error={errorMessage}>
            {!value && <FileDownload dataId="fileDownload" name="filename.txt" action={owner.downloadUrl}/>}
            <FileUpload.IFrame ref={ref => owner.uploader = ref}
                               dataId="fileUpload"
                               name="filename"
                               onFileChange={setValue}
                               description={'Прикрепить файл'}/>
            <div className="button-file-name">{value}</div>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле обязательно для заполнения."),
    ])
);

const validationForm = (needDescription) => {
    const fields = [
        NameField,
        NeedDescriptionField,
        InputDateField,
        InputDatepickerField,
        onChangeValidateInputField(0),
        UploadFileField,
        AvatarField
    ];
    if (needDescription) {
        fields.push(DescriptionField);
    }

    const formValidators = [];
    if (needDescription) {
        formValidators.push((success, error) => values => {
                if (values[FIELDS.name] !== values[FIELDS.description]) {
                    return success()
                }
                return error('Описание не должно быть равно имени!')
            }
        );
    }

    return withFormData.createValidationForm(
        fields,
        formValidators
    );
};

const toggleCount = 3;

const validateToggle = (props) => () => {
    for (let i = 0; i < toggleCount; i++) {
        if (!!props.formData.rawValues[ToggleField(i).name]) {
            props.modals.alert({
                okButtonName: 'OK',
                message: "Выбран может быть только один элемент"
            });
            return false;
        }
    }
    return true;
};

class EntityEditComponent extends React.Component {
    constructor(props) {
        super(props);
        const buildBackendUrl = props.buildBackendUrl;
        this.uploadUrl = buildBackendUrl(`/upload`);
        this.downloadUrl = buildBackendUrl(`/download`);
    }

    handleSave = data => {
        const {entitySave, entityCreate, saveAvatar} = this.props.actions;
        const action = this.props.id ? entitySave : entityCreate;
        const actionAvatar =({file, image}) => saveAvatar({
            name: file.name,
            type: file.type,
            image: image
        });
        Promise.all([this.avatar.upload(actionAvatar, this.uploadUrl), this.uploader.upload(this.uploadUrl)])
            .then(results => {
                return new Promise(resolve => {
                    this.props.modals.alert({message: JSON.stringify(results, null, 2)})
                        .on('success', () => resolve(results));
                })
            })
            .then(() => action({...data, id: this.props.id}))
            .then(() => this.props.pageRouter.open(LIST_PAGE_KEY))
            .catch(error => {
                console.log(error);
                this.props.modals.alert({message: "Ошибка сохранения сущности " + error});
                throw error
            })
    };

    goToList = () => {
        this.props.pageRouter.open(LIST_PAGE_KEY)
    };

    goToIndex = () => {
        this.props.pageRouter.openIndex()
    };

    initEntityData = entity => {
        this.props.formData.init({
            [NameField.name]: entity.name,
            [DescriptionField.name]: entity.description,
            [NeedDescriptionField.name]: entity.needDescription,
            [InputDateField.name]: entity.date,
            [InputDatepickerField.name]: entity.datepicker,
        })
    };

    componentDidMount = () => {
        if (!this.props.id) { //Это создание новой записи...
            return
        }
        const {entityDetails} = this.props.actions;
        entityDetails(this.props.id)
            .then(entity => this.initEntityData(entity))
            .catch(error => {
                this.props.modals.alert({message: "Ошибка получения информации о сущности " + error});
                throw error
            })
    };

    render = () => {
        const {validate, errors, renderField, rawValues} = this.props.formData;

        const withDescription = rawValues[NeedDescriptionField.name];
        const nameValue = rawValues[NameField.name];

        let toggles = [];
        for (let i = 0; i < toggleCount; i++)
            toggles[i] = <div key={i}>{renderField(ToggleField(i, validateToggle(this.props)))}</div>

        const fromButtons = [
            <Button key="save"
                    name="Сохранить"
                    dataId="button-save"
                    onClick={validate(validationForm(withDescription), this.handleSave, data => {
                        console.log("Ошибки валидации", JSON.stringify(data, null, 2))
                    })}/>,
            <Button key="to-list"
                    dataId="button-list"
                    name="К списку"
                    onClick={this.goToList}
                    type={Button.buttonTypes.secondary}
            />,
            <Button key="to-index"
                    dataId="button-index"
                    name="На дефолтную страницу"
                    onClick={this.goToIndex}
                    type={Button.buttonTypes.secondary}/>
        ];

        return (
            <Panel label="Entity EDIT" dataId="entity-edit-panel">
                id: <span id="entity-id">{this.props.id}</span>
                <Form buttons={fromButtons} errors={errors.list()} dataId="entity-edit-form">
                    {renderField(AvatarField, {owner: this})}
                    {renderField(NameField)}
                    {renderField(calculatedField, {nameValue})}
                    {renderField(NameField, {
                        disabled: true,
                        required: false,
                        title: 'Ридонли копия поля наименование'
                    })}
                    {renderField(calculatedFromOutsideField)}
                    {renderField(NeedDescriptionField)}
                    {withDescription && renderField(DescriptionField)}
                    {renderField(InputDateField)}
                    {renderField(InputDatepickerField)}
                    <Panel label="Валидация полей при снятии фокуса, очистка ошибки при фокусе"
                           dataId="entity-edit-panel-onblur-fields">
                        {renderField(onChangeValidateInputField(0))}
                        {renderField(onChangeValidateInputField(1))}
                        {renderField(onChangeValidateInputField(2))}
                    </Panel>
                    <Panel label="Зависимые поля, проставлено может быть одно" dataId="entity-edit-panel-select-one">
                        {toggles}
                    </Panel>
                    <Panel label="Валидация поля и очиска ошибки" dataId="entity-edit-panel-validate-clear-error">
                        {renderField(ValidatedField)}
                        {renderField(ValidatedFieldOutside)}
                    </Panel>

                    <Panel label="Загрузка файлов" dataId="file-uploads">
                        {renderField(UploadFileField, {owner: this})}
                    </Panel>
                </Form>
            </Panel>
        )
    }
}

EntityEditComponent.propTypes = {
    id: PropTypes.number,
};

export default compose(
    withPageRouter,
    withFormData,
    withModals(),
    withActions(
        {
            entityDetails: EntitiesDetailsAction.name,
            entitySave: EntitySaveAction.name,
            entityCreate: EntityCreateAction.name,
            saveAvatar: SaveAvatar.name
        }
    )
)(EntityEditComponent)