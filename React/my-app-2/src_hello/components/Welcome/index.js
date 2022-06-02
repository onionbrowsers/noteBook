import { Component } from "react";
import welcome from './index.module.css'

class Hello extends Component {
    render() {
        return (
            <div className={welcome.title}>
                welcome
            </div>
        )
    }
}

export default Hello
