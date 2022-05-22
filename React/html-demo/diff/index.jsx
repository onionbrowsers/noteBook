/**
 *
 * react diff
 * @class Person
 * @extends {React.Component}
 */
class Person extends React.Component {
    state = {
        personList: [
            {id: 1, name: 'a', age: 18},
            {id: 2, name: 'b', age: 19},
            {id: 3, name: 'c', age: 20}
        ]
    }

    render() {
        return (
            <div>
                <button onClick={this.add}>添加人员</button>
                <ul>
                    {
                        this.state.personList.map(item => {
                            return <li key={item.id}>{item.name} <input type="text" /></li>
                        })
                    }
                </ul>
                <hr />
                <hr />
                <ul>
                    {
                        this.state.personList.map((item, index) => {
                            return <li key={index}>{item.name} <input type="text" /></li>
                        })
                    }
                </ul>
            </div>
        )
    }
    add = () => {
        const {personList} = this.state
        const newPerson = {
            id: personList.length + 1,
            name: 'd'
        }
        this.setState({
            personList: [
                newPerson,
                ...personList
            ]
        })
    }
}

ReactDOM.render(<Person></Person>, document.querySelector('#test'))