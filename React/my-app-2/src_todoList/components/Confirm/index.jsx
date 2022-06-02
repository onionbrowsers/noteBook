// import React, { Component } from 'react'
import ConfirModule from './index.module.css'
import React from 'react'

export default function Confirm(props) {
    
    const {confirmDelete, cancelDelete} = props

    return (
        <div className={ConfirModule['confirm-wrapper']}>
            <div className={ConfirModule['confirm-box']}>
                <div className={ConfirModule['confirm-title']}>
                    {
                        props.title || '是否确定要删除该项'
                    }
                </div>
                <div className={ConfirModule['confirm-content']}>
                    <div onClick={confirmDelete} className={`${ConfirModule['button-item']} ${ConfirModule['button-confirm']}`}>
                        确定
                    </div>
                    <div onClick={cancelDelete} className={`${ConfirModule['button-item']}`}>
                        取消
                    </div>
                </div>
            </div>
        </div>
    )
}


// export default class Confirm extends Component {
//     confirmDelete() {
//         this.props.confirmDelete()
//     }

//     cancelDelete() {
//         this.props.cancelDelete()
//     }
    
//     render() {
//         return (
//             <div className={ConfirModule['confirm-wrapper']}>
//                 <div className={ConfirModule['confirm-box']}>
//                     <div className={ConfirModule['confirm-title']}>
//                         {
//                             this.props.title || '是否确定要删除该项'
//                         }
//                     </div>
//                     <div className={ConfirModule['confirm-content']}>
//                         <div onClick={this.confirmDelete.bind(this)} className={`${ConfirModule['button-item']} ${ConfirModule['button-confirm']}`}>
//                             确定
//                         </div>
//                         <div onClick={this.cancelDelete.bind(this)} className={`${ConfirModule['button-item']}`}>
//                             取消
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
