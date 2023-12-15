export const SharedAction = {
    name: 'provider-test-module.shared-action',
    action: (meta, arg) => console.log(`Привет! Я поставляемый экшен. Меня вызвали с параметром ${arg}.`),
};

export const PrivateAction = {
    name: 'provider-test-module.private-action',
    action: (meta, arg) => console.log(`Привет! Я внутренний экшен. Меня вызвали с параметром ${arg}.`),
};
