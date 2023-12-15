import * as Utils from './FileUtils'

export default () => ({

    validate: file => {
        if (!/(jpeg)|(jpg)/.test(file.type)) {
            return false;
        }

        // TODO доработать проверки по размеру
        return true;
    },

    download: file => Utils.readAsDataURL(file)
        .then(action => {
            const _window = window.open();
            _window.document.write(`<img src=${action} style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">`);
            _window.document.body.style.background = "#0e0e0e";
            return _window;
        })
})