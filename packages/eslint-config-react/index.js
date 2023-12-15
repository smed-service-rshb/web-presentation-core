module.exports = {
    extends: [
        'eslint-config-react-app',
    ].map(require.resolve),
    rules: {
        "jsx-a11y/img-has-alt": "off",
        "jsx-a11y/href-no-hash": "off"
    }
};