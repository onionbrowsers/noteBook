import React, { Component } from 'react'

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]

class TableItem extends Component {
    render() {
        const {tableItem} = this.props
        return (
            <div className='table-itme'>
                <span>{tableItem.name}</span>
                <span>{tableItem.price}</span>
            </div>
        )
    }
}

class TableHeader extends Component {
    render() {
        return (
            <div>
                {this.props.headerName}
            </div>
        );
    }
}

class Table extends Component {
    render() {
        const rows = []
        const categories = []
        PRODUCTS.forEach(product => {
            if (!categories.includes(product.category)) {
                rows.push(
                    <TableHeader key={product.price} headerName={product.category}></TableHeader>
                )
            }
            rows.push(
                <TableItem key={product.name} tableItem={product}></TableItem>
            )
        })
        return (
            <div className='table-wrapper'>
                <div className='table-desc'>
                    <span>name</span>
                    <span>price</span>
                </div>
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default class TestTable extends Component {
    render() {
        return (
            <div>
                <Table></Table>
            </div>
        )
    }
}
