const comId = 'title'
const myData = 'js框架列表'

const list = [
    'angular',
    'vue',
    'react'
]

const vDom = (
    <React.Fragment>
        <h1 id={comId} className="title">
            <span style={{color: 'white', fontSize: '30px'}}>{myData}</span>
        </h1>
        <ul className="test">
            {
                list.map((item, index) => {
                    console.log(item, index)
                    return (
                        <li key={index}>{item}</li>
                    )
                })
            }
        </ul>
    </React.Fragment>
)
// ReactDOM.render(vDom, document.getElementById('test'))


// function Demo() {
//     return <h2>测试函数组件</h2>
// }

// ReactDOM.render(<Demo name="123"></Demo>, document.getElementById('test'))

class MyComponent extends React.Component {
    render() {
        console.log(this)
        return <h1>hello {this.props.name}</h1>
    }
}

ReactDOM.render(<MyComponent name="123" />, document.getElementById('test'))
