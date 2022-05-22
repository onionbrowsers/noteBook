// class Person extends React.Component {
//     render() {
//         const {name, age, sex} = this.props
//         return (
//             <ul>
//                 <li>{name}</li>
//                 <li>{age}</li>
//                 <li>{sex}</li>
//             </ul>
//         )
//     }
// }


// const p = {name: '1', age: 18, sex: '男'}
// ReactDOM.render(<Person {...p}></Person>, document.getElementById('test'))

// class Person extends React.Component {
//     render() {
//         const {name, age, sex} = this.props
//         return (
//             <ul>
//                 <li>{name}</li>
//                 <li>{age}</li>
//                 <li>{sex}</li>
//             </ul>
//         )
//     }
// }

// console.log(PropTypes)

// // 类似于vue props类型限制和默认值，需要props-type.js
// Person.propTypes = {
//     name: PropTypes.string.isRequired,
//     sex: PropTypes.string
// }
// Person.defaultProps = {
//     sex: '女'
// }

// ReactDOM.render(<Person name="1" age="18"></Person>, document.getElementById('test'))

// 简写
// class Person extends React.Component {
//     static propTypes = {
//         name: PropTypes.string.isRequired,
//         sex: PropTypes.string
//     }
//     static defaultProps = {
//         sex: '女'
//     }
//     render() {
//         const {name, age, sex} = this.props
//         return (
//             <ul>
//                 <li>{name}</li>
//                 <li>{age}</li>
//                 <li>{sex}</li>
//             </ul>
//         )
//     }
// }

// ReactDOM.render(<Person name="1" age="18" sex="男"></Person>, document.getElementById('test'))


// 函数组件props
// function Person(props) {
//     const {name, age, sex} = props
//     return (
//         <ul>
//             <li>{name}</li>
//             <li>{age}</li>
//             <li>{sex}</li>
//         </ul>
//     )
// }

// Person.defaultProps = {
//     sex: '女'
// }

// ReactDOM.render(<Person name="1" age="18"></Person>, document.getElementById('test'))
