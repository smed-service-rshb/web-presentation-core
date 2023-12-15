## Компонент Аватар


Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.fileChange = this.fileChange.bind(this);
        this.fileRemove = this.fileRemove.bind(this);
    }

    render () {
        return(
            <div>
                <div className="inline-block align-top">
                    <Avatar
                    editable
                    dataId="client-avatar-id1"
                    onFileChange={this.fileChange}
                    />
                </div>
                <div className="inline-block align-top"><Avatar size="medium" dataId="client-avatar-id2" gender="female"/></div>
                <div className="inline-block align-top"><Avatar size="medium" icon="https://im0-tub-ru.yandex.net/i?id=13b86d2901d7bb6bdda61b9202fe0793-l&n=13" dataId="client-avatar-id2" gender="female"/></div>
                <div className="inline-block align-top"><Avatar size="medium" editable remove icon="https://im0-tub-ru.yandex.net/i?id=13b86d2901d7bb6bdda61b9202fe0793-l&n=13" dataId="client-avatar-id2" gender="female"/></div>
            </div>
        )
    };

    fileChange (file)  {
        this.setState({
            file: file
        },()=>{console.log(file)});
    };
    fileRemove ()  {
        console.log('delete file');
    };
}
<Example />
```