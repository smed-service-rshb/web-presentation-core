import {bindGetProp, findComponent, bindSimulate, EnzymeComponentWrapper} from './utils'

class CellWrapper extends EnzymeComponentWrapper {
    constructor(reactWrapper) {
        super(reactWrapper);
        ['click'].forEach(bindSimulate(this));
    }
}

class RowWrapper extends EnzymeComponentWrapper {
    constructor(grid, reactWrapper) {
        super(reactWrapper);
        this.grid = grid;
    }

    cells = () => {
        const cells = this.find("TableRowColumn");
        const columns = this.grid.prop('columns');
        const result = {};
        for (let i = 0; i < columns.length; i++) {
            result[`${columns[i].key}Cell`] = new CellWrapper(cells.at(i + 1));
        }
        return result;
    }
}

class RowsWrapper extends EnzymeComponentWrapper {
    constructor(grid, reactWrapper) {
        super(reactWrapper);
        this.grid = grid;
        this.reactWrapper = reactWrapper;
    }

    at = (...args) => new RowWrapper(this.grid, this.reactWrapper.at(...args))
}

class GridWrapper extends EnzymeComponentWrapper {
    constructor(component) {
        super(component);
        [
            "columns",
            'emptyMessage'
        ].forEach(bindGetProp(this));
    }

    getRows = () => {
        const rows = this.find("TableBody TableRow");
        return new RowsWrapper(this, rows);
    };
}


export default originalComponent => {
    originalComponent.findGrid = id => new GridWrapper(findComponent(originalComponent, 'Grid', id));
    return originalComponent;
}
