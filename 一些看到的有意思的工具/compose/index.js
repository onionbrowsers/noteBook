const composePromise = function ( ...pArgs ) {
    const init = pArgs.pop()
    return function( ...cArgs ) {
        return cArgs.reverse().reduce( ( sequence, func ) => {
            return sequence.then( result => {
                return func.call( null, result )
            } )
        }, Promise.resolve( init.apply( null, cArgs ) ) )
    }
}