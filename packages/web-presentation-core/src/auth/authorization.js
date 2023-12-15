export default rights => right => {
    if (!right) {
        throw new Error("Не задан right")
    }
    return (rights || []).some(data => data === right);
}
