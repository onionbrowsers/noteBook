const PENDING='pending';
const FUFILLED='fufilled';
const REJECTED='rejected';

function resolvePromise(p,x,resolve,reject){
    if(p === x){
        return  reject(new TypeError('cycle chain refrence'))
    }
    let called;
    if(typeof x !=null && (typeof x === 'object'||typeof x === 'function')){
        try{

            let then = x.then;
            if(typeof then  === 'function'){
                then.call(x,(y)=>{
                    if(called)return;
                    called=true;
                    resolvePromise(p,y,resolve,reject)
                },(e)=>{
                    if(called)return;
                    called=true;
                    reject(e);
                })

            }else{
                resolve(x);
            }

        }catch(e){
            if(called)return;
            called=true;
            reject(e)
        }
        
    }else{
        reject(x);
    }
}

class Promise{

    constructor(exec){
        this.status=PENDING;
        this.value=undefined;
        this.resolveCallback=[];
        this.rejectCallback=[];
        let resolve=(val)=>{
            if(this.status===PENDING){
                this.status=FUFILLED;
                this.value=val;
                this.resolveCallback.forEach((fn)=>{
                    fn();
                })
            }
        }
        let reject=(err)=>{
            if(this.status===PENDING){
                this.status=REJECTED;
                this.value=err;
                this.rejectCallback.forEach((fn)=>{
                    fn();
                })
            }
        }
        try{
            exec(resolve,reject)

        }catch(e){
            return reject(e)
        }
    }

    then(onresolve,onreject){
        onresolve = typeof onresolve ==='function'?onresolve:(val)=>val;
        onreject = typeof onreject === 'function'?onreject:(err)=>{throw err};
        let promise=new Promise((resolve,reject)=>{
            if(this.status===PENDING){
                this.resolveCallback.push(()=>{
                    queueMicrotask(()=>{
                        try{
                            let x=onresolve(this.value)
                            resolvePromise(promise,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                })

                this.rejectCallback.push(()=>{
                    queueMicrotask(()=>{
                        try{
                            let x=onreject(this.value)
                            resolvePromise(promise,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                })

            }
            if(this.status===FUFILLED){
                queueMicrotask(()=>{
                    try{
                        let x=onresolve(this.value)
                        resolvePromise(promise,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })

            }
            if(this.status===REJECTED){
                queueMicrotask(()=>{
                    try{
                        let x=onreject(this.value)
                        resolvePromise(promise,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })

            }

        })
        return promise;

    }
    catch(fn){
        return this.then(null,fn);
    }
}
Promise.resolve=(val)=>{
    return new Promise((resolve)=>{
        resolve(val)
    })
}
Promise.reject=(val)=>{
    return new Promise((resolve,reject)=>{
        reject(val)
    })
}
Promise.all=(promises)=>{
    let result=[];
    let mysolve=null;
    let i=0;
    function  processPromise(data){
        result[i]=data;
        i++;
        if(i===promises.length){
            mysolve(result)
        }
    }
    return new Promise((resolve,reject)=>{
        mysolve=resolve;
        promises.forEach((promise)=>{
            promise.then((data)=>{
                processPromise(data)
            },reject)
        })
    })
}

Promise.race=(promises)=>{
    return new Promise((resolve,reject)=>{
        promises.forEach((promise)=>{
            promise.then(resolve,reject);
        })
    })
}
module.exports=Promise;


let promise = new Promise(function (res, rej) {
    res(111)
}).then(1).then(data => {
    console.log(data)
})

Promise.defer=Promise.deferred=()=>{
    let dfd={};
    dfd.promise=new Promise((resolve,reject)=>{
        dfd.resolve=resolve;
        dfd.reject=reject;
    })
    return dfd;
}
