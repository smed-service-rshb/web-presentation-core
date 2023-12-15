import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css'
import StandardIcons from "../standard-icons/index";

export default class Avatar extends Component {

    static avatarGender = {
        male: 'male',
        female: 'female'
    };

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: props.icon
        };
    }

    /**
     * Метод для загрузки файла на сервер
     * @param action функция, используется в браузерах, кроме IE9
     * @returns возвращается промис
     */
    upload = action => action({file: this.state.file, image: this.state.imagePreviewUrl});

    handleChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            }, this.props.onFileChange(file));
        };
        reader.readAsDataURL(file)
    };

    handleRemove = e => {
        e.preventDefault();
        this.setState({
            file: '',
            imagePreviewUrl: ''
        }, this.props.onFileChange(null));
    };

    buttonOnClick= (e) => {
        if (e.which === 13 || e.which === 32) {
            this.inputElement.click();
        }
    };

    _handleMouseDown = () => {
        this.setState({pressed: true});
    };

    _handleMouseUp = () => {
        this.state.pressed && this.inputElement.click();
        this.setState({pressed: false})
    };

    getImagePreview = () => this.state.imagePreviewUrl
        ? {backgroundImage: `url(${this.state.imagePreviewUrl})`}
        : null;

    getButton = () => {
        if (!this.props.editable) {
            return null;
        }

        const exist = !!this.state.file || !!this.state.imagePreviewUrl;
        const suffix = exist ? 'editable' : 'download';
        return (
            <div className="inline-block">
                <button
                    className={classNames(`avatar-button avatar-button-${suffix}`, {pressed: this.state.pressed})}
                    tabIndex={this.props.tabIndex}
                    onMouseDown={this._handleMouseDown}
                    onMouseUp={this._handleMouseUp}
                    onKeyPress={this.buttonOnClick}
                    ref={button => this.button = button}>
                    <input className="file-input" type="file"
                           onChange={this.handleChange}
                           data-id={`${this.props.dataId}-${suffix}`}
                           tabIndex={-1}
                           ref={input => this.inputElement = input}/>
                    <img src={exist ? StandardIcons.editButton : StandardIcons.addButton} alt="" className="avatar-button-img"/>
                </button>
                {exist && this.props.remove &&
                    <button
                        className={classNames('avatar-button avatar-button-remove',  {pressed: this.state.pressed})}
                        tabIndex={this.props.tabIndex}
                        onClick={this.handleRemove}>
                        <img src={StandardIcons.deleteButton} alt="" className="avatar-button-img"/>
                    </button>
                }
            </div>
        );
    };

    render = () => <div className={classNames('avatar-container', `avatar-size-${this.props.size}`)}>
        <div className={classNames({'avatar-empty': !this.state.file && !this.state.imagePreviewUrl}, `avatar-empty-${this.props.gender}`)}>
            <div className={classNames("avatar-user-image")} style={this.getImagePreview()}></div>
            <div className="avatar-button-area">{this.getButton()}</div>
        </div>
    </div>;

    static propTypes = {
        /**
         * Внешний вид заглушки. По умолчанию male
         */
        gender: PropTypes.oneOf(['male', 'female']).isRequired,
        /**
         * Загруженный аватар клиента
         */
        icon: PropTypes.string,
        /**
         * Признак редактируемости аватара. По умолчанию false
         */
        editable: PropTypes.bool,
        /**
         * Признак отображения кнопки удаления аватара.
         */
        remove: PropTypes.bool,
        /**
         * Размер аватара. По умолчанию big
         */
        size: PropTypes.oneOf(['big', 'medium', 'small']).isRequired,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Обработчик выбора изображения
         */
        onFileChange: PropTypes.func,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Наименование поля c загружаемым файлом (используется для IE9)
         */
        name: PropTypes.string
    };

    static defaultProps = {
        gender: Avatar.avatarGender.male,
        size: 'big',
        name: 'content',
        onFileChange: () => (null)
    };
}