const menuReplicator = (primaryMenu, secondaryMenu) => {
    const result = [];
    let secondaryMenuItems = [...(secondaryMenu || [])];

    (primaryMenu || []).forEach(item => {
        const sameItem = secondaryMenuItems.find(candidate => candidate.name === item.name);

        if (!sameItem) {
            result.push({...item});
            return
        }

        if (!item.children && sameItem.children) {
            console.warn(`Пункт меню '${item.name}' не имеет дочерних элементов, а в дбо имеет (считаем, что не совпали).`);
            result.push({...item});
            return
        }

        if (item.children && !sameItem.children) {
            console.warn(`Пункт меню '${item.name}' имеет дочерние элементы, а в дбо не имеет (считаем, что не совпали).`);
            result.push({...item});
            return
        }

        if (!item.children && !sameItem.children) {
            console.warn(`Пункт меню '${item.name}' не имеет дочерние элементы и в дбо не имеет (мержить не можем).`);
            result.push({...item});
            return
        }

        secondaryMenuItems = secondaryMenuItems.filter(candidate => candidate !== sameItem);

        const children = menuReplicator(item.children, sameItem.children);
        result.push({...item, children});
    });

    return result.concat(secondaryMenuItems);
};

export default menuReplicator;
