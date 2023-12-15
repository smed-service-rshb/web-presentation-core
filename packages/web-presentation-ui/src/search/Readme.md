## Компонент Search

Ширина по умолчанию 100%.

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {value: {id: 1, login: 'dfffff'}}
        this.changeState = this.changeState.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.getCustomOption = this.getCustomOption.bind(this);
    }

    getOptions (input) {
        return fetch(`https://api.github.com/search/users?q=${input}`)
                    .then((response) => response.json())
                    .then(json => ({ options: json.items}))
    };

    closeMenu() {
        this.search.closeMenu();
    };

    getCustomOption() {
        const closeMenu = this.closeMenu;
        return [
            <div>
                <Link dataId="link-custom-option"
                      onClick={() => {
                          console.log('clicked close');
                          closeMenu();
                      }}>
                    Заполнить адрес вручную
                </Link>
            </div>
        ]
    };

    render () {
        return(
            <div>
                <Search
                    ref = {r => this.search=r} 
                    loadOptions={this.getOptions}
                    value={this.state.value}
                    onChange={this.changeState}
                    id="selectId"
                    dataId="select1"
                    width="20%"
                    customOption={this.getCustomOption()}
                    labelKey="login"
                    valueKey="id"
                    placeholder="placeholder"
                />

            </div>
        )
    };

    changeState (index) {
         this.setState({
            value: index
        });
        console.log(index);
    }
}
<Example />
```

Пример использования 2:
```

class Example2 extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {value: {}}
        this.changeState = this.changeState.bind(this);
        this.customOptionRender = this.customOptionRender.bind(this);
    }

    getOptions (input) {
        return fetch(`https://api.github.com/search/users?q=${input}`)
                    .then((response) => response.json())
                    .then(json => ({ options: json.items}))
    };

    getButtons () {
        return [
            <Link dataId="ssdf" onClick={()=>{alert('Clicked')}}>Заполнить адрес вручную</Link>
        ]
    };

    customOptionRender (option) {
        var divStyle = {
                        'font-size': '10px',
                        'color': 'darkgray'
                    }
        return (
            <div>
                <div style={divStyle}>Имя юзера gitHub</div>
                <div>{option.login}</div>
            </div>
        )
    };

    render () {
        return(
            <div>
                <Search loadOptions={this.getOptions}
                                            value={this.state.value}
                                            onChange={this.changeState}
                                            id="selectId"
                                            dataId="select1"
                                            width="20%"
                                            cache = {false}
                                            multi={true}
                                            optionRenderer={this.customOptionRender}
                                            customOption={this.getButtons()}
                                            labelKey="login"
                                            valueKey="id"
                                            placeholder="placeholder"
                                    />

            </div>
        )
    };

    changeState (index) {
         this.setState({
            value: index
        });
        console.log(index);
    }
}
<Example2 />
```