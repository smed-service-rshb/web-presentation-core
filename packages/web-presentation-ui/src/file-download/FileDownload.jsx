import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import './styles.css';

class FileDownload extends React.Component {
    render = () => (
        <span className={classNames('download-filename', {disabled: this.props.disabled})}
              onClick={this._download}>
            <span className="download-empty-border">{this.props.name}</span></span>
    );

    _download = e => {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.download(this.props.action);
        }
    };

    static propTypes = {
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Наименование файла
         */
        name: PropTypes.string.isRequired,
        /**
         * URL, по которому будет скачиваться файл
         */
        action: PropTypes.string.isRequired,
        /**
         * Признак заблокированного элемента
         */
        disabled: PropTypes.bool,

        /**
         * Обработчик на просмотр файла, передается аргумент window новой вкладки
         */
        download: PropTypes.func
    };

    static defaultProps = {
        download: action => window.open(action, "_blank")
    }
}

export default FileDownload