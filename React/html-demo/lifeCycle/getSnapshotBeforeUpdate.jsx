/**
 *
 * snapshot使用
 * @class NewList
 * @extends {React.Component}
 */

class NewList extends React.Component {
    listRef = React.createRef()
    state = {
        list: [
            '新闻4',
            '新闻3',
            '新闻2',
            '新闻1'
        ]
    }
    componentDidMount() {
        // setInterval(() => {
        //     const {list} =  this.state
        //     const news = `新闻${list.length + 1}`
            
        //     this.setState({
        //         list: [
        //             news,
        //             ...list
        //         ]
        //     })
        // }, 5000);
    }

    getSnapshotBeforeUpdate() {
        return this.listRef.current.scrollHeight
    }

    componentDidUpdate(preProps, preState, snapshot) {
        this.listRef.current.scrollTop +=  this.listRef.current.scrollHeight - snapshot
    }

    render() {
        const {list} = this.state
        return (
            <div className="list" ref={this.listRef}>
                {
                    list.map((listItem, index) => {
                        return (
                            <div key={index} className='list-item'>
                                {listItem}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

ReactDOM.render(<NewList count={199}></NewList>, document.getElementById('test'))