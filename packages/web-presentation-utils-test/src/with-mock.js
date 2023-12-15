import express from 'express';

export const MOCK_PORT = 9999;

export default (...args) => () => new Promise((resolve, reject) => {
    const app = express();
    const cb = args.pop();

    const router = express.Router();
    args.forEach(mock => mock(router));
    app.use('/api', router); //TODO

    const server = app.listen(MOCK_PORT, () => {
        const close = func => result => server.close(() => func(result));
        try {
            const result = cb();
            !result && close(reject)("Callback функции withMock должен вернуть promise. Исправьте тест.");
//todo ЕСЛИ КАКОЙ-ТО РОУТ НЕ БЫЛ ВЫЗВАН, ФЕЙЛИТЬ ТЕСТ
            result && result
                .then(close(resolve))
                .catch(close(reject))
        }
        catch (error) {
            close(reject)(error)
        }
    }).on('error', error => {
        server.close(() => {
            console.log(error);
            reject(error);
        })
    })
})
