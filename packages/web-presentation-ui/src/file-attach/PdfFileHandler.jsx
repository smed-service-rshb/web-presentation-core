import * as Utils from './FileUtils'

const hasMsSaveOrOpenBlob = window.navigator && window.navigator.msSaveOrOpenBlob;

export default () => ({

    validate: file => {
        if (!/pdf/.test(file.type)) {
            return false;
        }

        // TODO доработать проверки по размеру
        // Utils.readAsText(file)
        //     .then(res => {
        //         console.log('Number of Pages:', res.match(/\/Type[\s]*\/Page[^s]/g).length )
        //     });
        return true;
    },

    download: file => Utils.readAsDataURL(file)
        .then(action => {
            const _window = window.open();
            if (hasMsSaveOrOpenBlob) {
                const convertDataURIToBinary = base64 => {
                    const raw = atob(base64);
                    const rawLength = raw.length;
                    const array = new Uint8Array(new ArrayBuffer(rawLength));
                    for (let i = 0; i < rawLength; i++) {
                        array[i] = raw.charCodeAt(i);
                    }
                    return array;
                };
                const pdfAsArray = convertDataURIToBinary(action.replace(/^data:application\/pdf;base64,/, ''));
                const blob = new Blob([pdfAsArray], {type: 'application/pdf'});
                _window.navigator.msSaveOrOpenBlob(blob, 'test.name');
            } else {
                const template = `<embed width=100% height=100% type="application/pdf" src=${action}>`;
                _window.document.write(template);
            }
            return _window;
        })
})