## Компонент таблица


Пример использования:
```
const Table = require('./Table').default;
const TableHeader = require('./TableHeader').default;
const TableRow = require('./TableRow').default;
const TableHeaderColumn = require('./TableHeaderColumn').default;
const TableBody = require('./TableBody').default;
const TableRowColumn = require('./TableRowColumn').default;

class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            cellColor: {color: 'green'},
            cellColor3: {width: '90px', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block'},
            rowColor: {color: 'red'},
            activeColumn: 'nakop',
        };
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeRowColor = this.handleChangeRowColor.bind(this);
        this.activeColumn = this.activeColumn.bind(this);
    }

    handleChangeColor() {
        this.setState({
          cellColor: this.state.cellColor? undefined : {color: 'green'}
        });
      }

      handleChangeRowColor() {
        this.setState({
          rowColor: this.state.rowColor? undefined : {color: 'red'}
        });
      }


      activeColumn(activeColumn) {
         var changeActiveColumn = function(){
            this.setState({
              activeColumn
            });
        }
        return changeActiveColumn.bind(this);
      }

    render () {
        return(
            <div>
                <Table  width="500px">
                   <TableHeader>
                       <TableRow onClick={this.handleChangeRowColor} dataId="gridTableHeaderRow5">
                           <TableHeaderColumn dataId="tableHeaderColumnRow1">
                              <div style={this.state.rowColor}>Столбец 1</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 2</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2" colSpan="3">
                               <div style={this.state.rowColor}>Столбец 3 растянутый</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 6</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 7</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 8</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 9</div>
                           </TableHeaderColumn>
                           <TableHeaderColumn dataId="tableHeaderColumnRow2">
                               <div style={this.state.rowColor}>Столбец 10</div>
                           </TableHeaderColumn>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       <TableRow dataId="gridTableHeaderRow6">
                           <TableRowColumn onClick={this.handleChangeColor} dataId="TableRowColumn1">
                               <div style={this.state.cellColor}>Я меняю цвет яичейки</div>
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn2">
                               Первая строка второго столбца
                           </TableRowColumn>
                       </TableRow>
                       <TableRow dataId="gridTableHeaderRow7">
                           <TableRowColumn dataId="TableRowColumn3">
                              Вторая строка первого столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4" colSpan="3">
                              Растянутая ячейка
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn4">
                              Вторая строка второго столбца
                           </TableRowColumn>
                       </TableRow>
                       <TableRow dataId="gridTableHeaderRow8">
                           <TableRowColumn dataId="TableRowColumn5">
                              Третья строка первого столбца!!!
                              <Hint full>
                                  <Table width="auto">
                                      <TableHeader>
                                          <TableRow dataId="gridTableHeaderRow9">
                                              <TableHeaderColumn dataId="tableHeaderColumnRow3" >
                                                  <span className="uppercase">Название</span>
                                              </TableHeaderColumn>
                                              <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow4" >
                                                  <span style={this.state.cellColor3}>Инвестиционный</span>
                                              </TableHeaderColumn>
                                              <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow5">
                                                  Накопительный
                                              </TableHeaderColumn>
                                              <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow6">
                                                  Накопи на <br/> мечту
                                              </TableHeaderColumn>
                                              <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow7">
                                                  Максимальные <br/> накопления
                                              </TableHeaderColumn>
                                              <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow8">
                                                  Классический
                                              </TableHeaderColumn>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          <TableRow dataId="gridTableHeaderRow101">
                                              <TableRowColumn dataId="TableRowColumn7">
                                                  Процентная ставка
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn88" align="center">
                                                  19%
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn89" align="center">
                                                  19%
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn80" align="center">
                                                  19%
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn81" align="center">
                                                  19%
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn82" align="center">
                                                  19%
                                              </TableRowColumn>
                                          </TableRow>
                                          <TableRow dataId="gridTableHeaderRow112">
                                              <TableRowColumn dataId="TableRowColumn9">
                                                  Неснижаемый остаток
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn100" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn101" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn102" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn103" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn104" align="center">
                                                  3000
                                              </TableRowColumn>
                                          </TableRow>
                                          <TableRow dataId="gridTableHeaderRow112">
                                              <TableRowColumn dataId="TableRowColumn9">
                                                  Неснижаемый остаток
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn105" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn106" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn107" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn108" align="center">
                                                  3000
                                              </TableRowColumn>
                                              <TableRowColumn dataId="TableRowColumn109" align="center">
                                                  3000
                                              </TableRowColumn>
                                          </TableRow>
                                      </TableBody>
                                  </Table>
                              </Hint>
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                           </TableRowColumn>
                           <TableRowColumn dataId="TableRowColumn6">
                              Первая строка второго столбца
                              <Hint full>
                                <Table width="500px">
                                    <TableHeader>
                                        <TableRow dataId="gridTableHeaderRow9">
                                            <TableHeaderColumn dataId="tableHeaderColumnRow3" >
                                                <span className="uppercase">Название</span>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow4" >
                                                <span style={this.state.cellColor3}>Инвестиционный</span>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow5">
                                                Накопительный
                                            </TableHeaderColumn>
                                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow6">
                                                Накопи на <br/> мечту
                                            </TableHeaderColumn>
                                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow7">
                                                Максимальные <br/> накопления
                                            </TableHeaderColumn>
                                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow8">
                                                Классический
                                            </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow dataId="gridTableHeaderRow101">
                                            <TableRowColumn dataId="TableRowColumn7">
                                                Процентная ставка
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn88" align="center">
                                                19%
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn89" align="center">
                                                19%
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn80" align="center">
                                                19%
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn81" align="center">
                                                19%
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn82" align="center">
                                                19%
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow dataId="gridTableHeaderRow112">
                                            <TableRowColumn dataId="TableRowColumn9">
                                                Неснижаемый остаток
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn100" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn101" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn102" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn103" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn104" align="center">
                                                3000
                                            </TableRowColumn>
                                        </TableRow>
                                        <TableRow dataId="gridTableHeaderRow112">
                                            <TableRowColumn dataId="TableRowColumn9">
                                                Неснижаемый остаток
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn105" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn106" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn107" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn108" align="center">
                                                3000
                                            </TableRowColumn>
                                            <TableRowColumn dataId="TableRowColumn109" align="center">
                                                3000
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Hint>
                           </TableRowColumn>
                       </TableRow>
                   </TableBody>
                </Table>
                <br />
                <br/>
                <Table width="auto">
                    <TableHeader>
                        <TableRow onClick={this.handleChangeRowColor} dataId="gridTableHeaderRow9">
                            <TableHeaderColumn dataId="tableHeaderColumnRow3" onClick={this.activeColumn}>
                                <span className="uppercase">Название</span>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow4" active={this.state.activeColumn==='invest'} onClick={this.activeColumn('invest')}>
                                <span style={this.state.cellColor3}>Инвестиционный</span>
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow5" active={this.state.activeColumn==='nakop'} onClick={this.activeColumn('nakop')}>
                                Накопительный
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow6" active={this.state.activeColumn==='dream'} onClick={this.activeColumn('dream')}>
                                Накопи на <br/> мечту
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow7" active={this.state.activeColumn==='max'} onClick={this.activeColumn('max')}>
                                Максимальные <br/> накопления
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{cursor: 'pointer'}} dataId="tableHeaderColumnRow8" active={this.state.activeColumn==='classic'} onClick={this.activeColumn('classic')}>
                                Классический
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow dataId="gridTableHeaderRow101">
                            <TableRowColumn onClick={this.handleChangeColor} dataId="TableRowColumn7">
                                Процентная ставка
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn88" active={this.state.activeColumn==='invest'}  align="center">
                                19%
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn89" active={this.state.activeColumn==='nakop'} align="center">
                                19%
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn80" active={this.state.activeColumn==='dream'} align="center">
                                19%
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn81" active={this.state.activeColumn==='max'} align="center">
                                19%
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn82" active={this.state.activeColumn==='classic'} align="center">
                                19%
                            </TableRowColumn>
                        </TableRow>
                        <TableRow dataId="gridTableHeaderRow112">
                            <TableRowColumn dataId="TableRowColumn9">
                                Неснижаемый остаток
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn100" active={this.state.activeColumn==='invest'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn101" active={this.state.activeColumn==='nakop'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn102" active={this.state.activeColumn==='dream'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn103" active={this.state.activeColumn==='max'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn104" active={this.state.activeColumn==='classic'} align="center">
                                3000
                            </TableRowColumn>
                        </TableRow>
                        <TableRow dataId="gridTableHeaderRow112">
                            <TableRowColumn dataId="TableRowColumn9">
                                Неснижаемый остаток
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn105" active={this.state.activeColumn==='invest'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn106" active={this.state.activeColumn==='nakop'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn107" active={this.state.activeColumn==='dream'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn108" active={this.state.activeColumn==='max'} align="center">
                                3000
                            </TableRowColumn>
                            <TableRowColumn dataId="TableRowColumn109" active={this.state.activeColumn==='classic'} align="center">
                                3000
                            </TableRowColumn>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        )
    };
}
<Example />
```
