## Компонент FileAttach

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            file1: null,
            file2: {name: 'Файл'},
        };
        this.attachError = this.attachError.bind(this);
        this.fileChange1 = this.fileChange1.bind(this);
        this.fileChange2 = this.fileChange2.bind(this);
    }
    
    render () {
        return(
            <div>
                <FileAttach 
                    dataId="pdf-file" 
                    onFileChange={this.fileChange1}
                    attachError={this.attachError}
                    editable 
                    removable/>
                <br/>
                <FileAttach 
                    dataId="jpg-file"
                    attachName={""} 
                    action="https://ru.wikipedia.org/static/images/project-logos/ruwiki.png" 
                    name={this.state.file2 && this.state.file2.name}
                    onFileChange={this.fileChange2}
                    attachError={this.attachError}
                    editable 
                    removable/>  
            </div>
        )
    };
    
    fileChange1 (file)  {
        this.setState({
            file1: file
        },()=>{console.log(file)});
    };
    
    fileChange2 (file)  {
        this.setState({
            file2: file
        },()=>{console.log(file)});
    };
    
    attachError () {
        alert("Неверный формат файла")
    }
   
}
<Example />
```