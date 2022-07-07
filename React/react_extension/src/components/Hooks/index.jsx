import React, {useState, useEffect, useRef} from 'react'

export default function Hooks() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('a')

    const inputRef = useRef()

    function add() {
        setCount(count => count + 1)
    }
    function changeName() {
        setName('b')
    }

    function unmount() {
        window.root.unmount(document.getElementById('root'))
    }

    useEffect(() => {
        let timer = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    function showInput() {
        console.log(inputRef)
        alert(inputRef.current.value)
    }

    return (
        <>
            <h2>当前的和为：{count}</h2>
            <h2>名字：{name}</h2>
            <button onClick={add}>
                点我+1
            </button>
            <button onClick={changeName}>
                点我改名
            </button>
            <button onClick={unmount}>
                卸载组件
            </button>
            <hr />
            <input ref={inputRef} type="text" />
            <button onClick={showInput}>
                点击输出input value
            </button>
        </>
    )
}
