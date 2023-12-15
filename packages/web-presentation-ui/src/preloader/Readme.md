## Компонент Preloader

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {        
        this.withoutRequest = this.withoutRequest.bind(this);
    }

    withoutRequest(){
            this.props.preloader.show();
            setTimeout(this.props.preloader.hide, 5000);
    };

    render () {
        return(
            <div>
                <Button key="without.request"
                    name="Включить прелоадер"
                    dataId="button-without.request"
                    onClick={this.withoutRequest}
                />
            </div>
        )
    };    
};
const withPreloader = require('./withPreloader.jsx').default;
const WrapComponent = withPreloader(Example);

<PreloaderProvider>
    <WrapComponent/>
</PreloaderProvider>
```

## Компонент BlockPreloader

Пример использования:
```
class Example extends React.Component  {

    constructor(props) { 
        this.state = {
                 blockPreloaderActive1: true,
                 blockPreloaderActive2: true
        }       
        this.handleBlockPreloaderButton1 = this.handleBlockPreloaderButton1.bind(this);
        this.handleBlockPreloaderButton2 = this.handleBlockPreloaderButton2.bind(this);
    }
    
    handleBlockPreloaderButton1(){
            this.setState({blockPreloaderActive1: !this.state.blockPreloaderActive1});
    };
    
    handleBlockPreloaderButton2(){
            this.setState({blockPreloaderActive2: !this.state.blockPreloaderActive2});
    };

    render () {
        return(
            <div>
                <Button key="block-preloader1-key"
                    name="Вкл/Выкл блочный прелоадер 1"
                    dataId="block-preloader1"
                    onClick={this.handleBlockPreloaderButton1}
                />
                
                <Button key="block-preloader2-key"
                    name="Вкл/Выкл блочный прелоадер 2"
                    dataId="block-preloader2"
                    onClick={this.handleBlockPreloaderButton2}
                />
                
                <BlockPreloader active={this.state.blockPreloaderActive1}>
                    <p>Текст 1</p>
                </BlockPreloader>
                
                <BlockPreloader active={this.state.blockPreloaderActive2}>
                    Текст 2
                </BlockPreloader>
            </div>
        )
    };    
};

<Example/>

```
