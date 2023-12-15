import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

import FileUploadIFrame from './FileUploadIFrame'

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fileName: ''};
    }

    handleChange = e => {
        e.preventDefault();

        if (!this.props.disabled) {
            let file = this.input.files[0];
            this.setState({fileName: file.name}, () => this.props.onFileChange(file));
        }
    };

    reset = () => {
        this.input.value = null;
        this.setState({fileName: ''}, this.props.onFileChange);
    };

    render() {
        return (
            <div className={classNames('upload-container', {disabled: this.props.disabled})}>
                <div className="upload-button" tabIndex={this.props.tabIndex}>
                    {!this.state.fileName &&
                    <span className="upload-empty"><span className="upload-empty-border">{this.props.name}</span></span>
                    }
                    {this.state.fileName &&
                    <span className="upload-filename"><span className="upload-empty-border">{this.state.fileName}</span></span>
                    }
                    <input type="file" onChange={this.handleChange} ref={input => this.input = input}
                           data-id={this.props.dataId} disabled={this.props.disabled}/>
                </div>
            </div>
        )
    }

    static propTypes = {
        /**
         * Обработчик нажатия на кнопку
         */
        onFileChange: PropTypes.func,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Наименование элемента
         */
        name: PropTypes.string.isRequired,
        /**
         * Признак заблокированного элемента
         */
        disabled: PropTypes.bool,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number
    };

    static defaultProps = {
        onFileChange: () => (null)
    };

    static IFrame = FileUploadIFrame
}

export default FileUpload