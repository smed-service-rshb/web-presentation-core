## Компонент Tabs

Пример использования:
```
const Tab = require('./Tab.jsx').default;
const Tabs = require('./Tabs.jsx').default;

class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            selected:  1,
            selected2:  2
        };
        this.tabChangeState = this.tabChangeState.bind(this);
        this.tabChangeState2 = this.tabChangeState2.bind(this);
        this.tabChangeState3 = this.tabChangeState3.bind(this);
    }


    render () {
        return(
            <div>
                <Tabs selected={this.state.selected} onChange={this.tabChangeState}>
                    <Tab label="Данные клиента" dataId="ClientsData" badge={10}>
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                    <Tab label="Продукты" dataId="ClientsProduct" >
                        <div>This is my tab 2 contents!</div>
                    </Tab>
                    <Tab label="Tab 3" dataId="ClientsTab" >
                        <Tabs type="secondary" selected={this.state.selected2} onChange={this.tabChangeState2}>
                            <Tab label="Данные клиента" dataId="ClientsData">
                                <div>This is my tab 1 contents!</div>
                            </Tab>
                            <Tab label="Продукты" dataId="ClientsProduct">
                                <div>This is my tab 2 contents!</div>
                            </Tab>
                            <Tab label="Tab 3" dataId="ClientsTab">
                                This is my tab 3 contents!
                            </Tab>
                        </Tabs>
                    </Tab>
                </Tabs>

                <br/>
                <br/>

                <Tabs type="secondary" selected={this.state.selected3} onChange={this.tabChangeState3}>
                    <Tab label="Данные клиента" dataId="ClientsData">
                        <div>This is my tab 1 contents!</div>
                    </Tab>
                    <Tab label="Продукты" dataId="ClientsProduct" disabled>
                        <div>This is my tab 2 contents!</div>
                    </Tab>
                    <Tab label="Tab 3" dataId="ClientsTab">
                        This is my tab 3 contents!
                    </Tab>
                </Tabs>
            </div>
        )
    };

     tabChangeState (index)  {
        this.setState({
            selected: index
        },()=>{console.log(index)});
     };
     tabChangeState2 (index)  {
        this.setState({
            selected2: index
        },()=>{console.log(index)});
     };
     tabChangeState3 (index)  {
        this.setState({
            selected3: index
        },()=>{console.log(index)});
     };
}
<Example />
```