class App extends React.Component {
    constructor(props) {
        super(props);
        this.saveText = this.saveText.bind(this);
        this.addNewElementToList = this.addNewElementToList.bind(this);
        this.removeAnElementFromList = this.removeAnElementFromList.bind(this);
        this.isEnterPressed = this.isEnterPressed.bind(this);
        this.deleteAnElement = this.deleteAnElement.bind(this);
        this.star = this.star.bind(this);
        this.state = {
            todo: [],
            done: [],
            textInput: ""
        }
    }

    //keeping the current form of our input
    saveText(e) {
        this.setState({
            textInput: e.target.value
        })
    }

    //submitting when "enter" is pressed
    isEnterPressed(e) {
        if (e.key == "Enter") {
            this.addNewElementToList();
        }
    }

    //adding the input to "todo" list
    addNewElementToList() {
        if (this.state.textInput != "") {
            var newElement = (this.state.textInput);
            var List = this.state.todo;
            List.push(newElement);
            this.setState({
                todo: List,
                textInput: ""
            })
        }
    }

    //when a list element is clicked switching between "todo" and "done" lists
    removeAnElementFromList(text, origintype) {
        var originarray = this.state[origintype];
        var index = originarray.indexOf(text);
        var destination = origintype == "todo" ? "done" : "todo";
        var destination = "";
        if (origintype == "todo") {
            destination = "done"
        }
        else {
            destination = "todo"
        }
        var destinationarray = this.state[destination];

        originarray.splice(index, 1);
        destinationarray.push(text);
        this.setState({
            [origintype]: originarray,
            [destination]: destinationarray
        })
    }

    deleteAnElement(text, listType) {
        var originarray = this.state[listType];
        var index = originarray.indexOf(text);
        originarray.splice(index, 1);
        this.setState({
            [listType]: originarray
        })
    }
    
    star(text, listType) {
        debugger;
        var originarray = this.state[listType];
        var index = originarray.indexOf(text);
        originarray.splice(index, 1);
        originarray.unshift(text);
        this.setState({
            [listType]: originarray
        })
    }

    render() {
        return (
            <div className="app">
                <div><Header title="My list :)" logo="./images/logo.png" /></div>
                <div className="input-area">
                    <label for="inp" class="inp">
                        <input onKeyPress={this.isEnterPressed} placeholder="I need to..." value={this.state.textInput} onChange={this.saveText} type="text" id="inp" placeholder="&nbsp;" />
                        <span class="label">I need to do...</span>
                        <span class="border"></span>
                    </label>
                    <button className="myButton" onClick={this.addNewElementToList}>Add to my list</button>
                </div>
                <div className="todo">
                    <h2>To-Do List</h2>
                    <List elements={this.state.todo} star={this.star} garbage={this.deleteAnElement} listType={"todo"} remove={this.removeAnElementFromList} />
                </div>
                <div className="done">
                    <h2>Done List</h2>
                    <List elements={this.state.done} star={this.star} garbage={this.deleteAnElement} listType={"done"} remove={this.removeAnElementFromList} />
                </div>
            </div>
        )
    }
}

class Header extends React.Component{
    render() {
        return(
            <div className="header">
                <img className="logo" src={this.props.logo} />
                <h1>{this.props.title}</h1>
                <img className="logo" src={this.props.logo} />
            </div>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
        this.delete = this.delete.bind(this);
        this.star = this.star.bind(this);
    }

    //when clicked on a list element sending it's data to removeAnElementFromList function from App component
    changeStatus(input) {
        var type = input.target.getAttribute("data-list");
        var text = input.target.innerText;
        this.props.remove(text, type);
    }

    delete(event) {
        var listType = event.target.getAttribute("data-list");
        var text = event.target.getAttribute("data-text");
        this.props.garbage(text, listType);
    }

    star(event) {
        var listType = event.target.getAttribute("data-list");
        var text = event.target.getAttribute("data-text");
        this.props.star(text, listType);
    }

    render() {
        var listElements = this.props.elements;
        var list = [];
        for (let i = 0; i < listElements.length; i++) {
            list.push(<div className="listitems"><li onClick={this.changeStatus} data-list={this.props.listType} key={"element:" + i}>{listElements[i]}</li>
            <div><span><img onClick={this.star} data-list={this.props.listType} data-text={listElements[i]} className="star" src="./images/star.png" /></span>
            <span><img onClick={this.delete} data-list={this.props.listType} data-text={listElements[i]} className="delete" src="./images/delete.png" /></span></div></div>)
        }
        return (
            <div>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }

}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);