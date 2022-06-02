import { Component } from "react";
import hello from  './index.module.css'

class Hello extends Component {
    render() {
        return (
            <div className={hello.title}>
                hello
            </div>
        )
    }
}

export default Hello