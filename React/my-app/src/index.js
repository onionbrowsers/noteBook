import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     clickButton = () => {
//         this.props.onClick()
//     }
//     render() {
//         return (
//             <button className='square' onClick={this.clickButton}>
//                 {this.props.value}
//             </button>
//         )
//     }
// }

function Square(props) {
    return (
        <button className={['square', props.winIndex ? 'win-button' : ''].join(' ')} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function Board(props) {
    const renderSquare = function (i, indexArr) {
        let winIndex = indexArr.includes(i)
        return (
            <Square
                winIndex={winIndex}
                onClick={() => props.onClick(i)}
                value={props.squares[i]}>
            </Square>
        )
    }

    const indexArr = (props.indexArr || []).slice()

    const arr = new Array(3).fill(null)
    let count = 0

    return (
        <div className='board-wrapper'>
            {
                arr.map((item, index) => {
                    return (
                        <div key={index} className='board-row'>
                            {
                                arr.map((item, key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            {renderSquare(count++, indexArr)}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

class Game extends React.Component {
    state = {
        history: [{
            squares: new Array(9).fill(null),
            position: null
        }],
        xIsNext: true,
        stepNumber: 0
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (squares[i] || calculateWinner(squares)?.winner) return
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        const position = getPosition(i + 1)
        this.setState({
            history: history.concat( [ {
                squares,
                position
            } ] ),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: move % 2 === 0
        })
    }

    render() {
        const history = this.state.history.slice()
        const current = history[this.state.stepNumber]
        const {winner, indexArr} = calculateWinner(current.squares.slice());
        const {xIsNext} = this.state
        const status = winner
            ? `winner: ${winner}`
            : (history.length === 10 ? 'game over no winner' : `next player: ${xIsNext ? 'X' : 'O'}` )

        console.log(history, '---')

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start'
            return (
                <li key={move} className={move === this.state.stepNumber ? 'current' : 'history'}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <div>
                        {step.position}
                    </div>
                </li>
            )
        })

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        indexArr={indexArr}
                        onClick={i => this.handleClick(i)}
                        squares={current.squares}>
                    </Board>
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function getPosition(num, column = 3) {
    if (num % column === 0) return `${num / column}, ${column}`
    return `${Math.floor(num / column + 1)}, ${num % column}`
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let val of lines) {
        const [a, b, c] = val
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return {
            winner: squares[a],
            indexArr: [a, b, c]
        }
    }
    return {}
}

ReactDOM.render(<Game></Game>, document.getElementById('root'), () => {
    console.log(this)
})
