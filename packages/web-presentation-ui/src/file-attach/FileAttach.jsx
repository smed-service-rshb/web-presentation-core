import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../file-upload/FileUpload'
import FileDownload from '../file-download/FileDownload'
import FileHandlers from './FileHandlers'
import './styles.css';
import '../file-download/styles.css';
import '../file-upload/styles.css';

export default class FileAttach extends React.Component {

    static propTypes = {
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,

        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,

        /**
         * Наименование элемента
         */
        name: PropTypes.string,

        /**
         * URL, по которому будет скачиваться файл
         */
        action: PropTypes.string,

        /**
         * Обработчик нажатия на кнопку
         */
        onFileChange: PropTypes.func,

        /**
         * Вызывается при неуспешном приложении файла
         */
        attachError: PropTypes.func,

        /**
         * Имя прикрпления скана
         */
        attachName: PropTypes.string,

        /**
         * Признак прикрепления скана
         */
        editable: PropTypes.bool,

        /**
         * Признак удаления прикрепленного файла
         */
        removable: PropTypes.bool
    };

    static defaultProps = {
        action: '',
        attachName: "Прикрепить файл",
        onFileChange: () => (null),
        attachError: () => (null)
    };

    constructor(props) {
        super(props);
        this.fileHandlers = FileHandlers.map(h => h(this));
        this.state = {
            file: !!props.action && {}
        }
    }

    getFile = () => this.state.file;

    render = () => <div className="file-attach-wrapper">
        {this.state.file && <FileDownload
            dataId={`${this.props.dataId}-file-download`}
            name={this.props.name}
            action={this.props.action}
            download={this.download}/>
        }
        <div className={`input-display-${!this.state.file}`}>
            <FileUpload
                ref={ref => this.fileUpload = ref}
                onFileChange={this.onFileChange}
                dataId={`${this.props.dataId}-file-upload`}
                name={this.props.attachName}
                tabIndex={this.props.tabIndex}
            />
        </div>
        {this.state.file && <div className={"span-wrapper"}>
            {this.props.editable && <span className={"span-edit"} onClick={this.edit}>Изменить</span>}
            {this.props.removable && <span className={"span-reset"} onClick={this.reset}>Удалить</span>}
        </div>}
    </div>;

    download = () => {
        const handler = this.state.file && this.fileHandlers.find(handler => handler.validate(this.state.file));
        if (handler) {
            handler.download(this.state.file);
        } else {
            window.open(this.props.action, '_blank')
        }
    };

    onFileChange = file => {
        const exist = !!file;
        if (!exist) {
            this.props.onFileChange();
            return;
        }

        if (this.fileHandlers.find(handler => handler.validate(file))) {
            this.setState({
                file
            }, () => this.props.onFileChange(file));
        } else {
            this.props.attachError();
            this.reset();
        }
    };

    reset = () => this.setState({file: null}, this.fileUpload.reset);

    edit = () => this.fileUpload.input.click();
}