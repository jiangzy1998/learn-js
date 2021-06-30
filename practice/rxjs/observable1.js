class Subject{
    constructor(){
        this.observerCollection=[];
    }

    registerObservable(observer){
        this.observerCollection.push(observer);
    }
    unregisterObervable(observer){
        let index = this.observerCollection.indexOf(observer);
        if(index>=0) this.observerCollection.splice(index,1);
    }

    notifyObservers(){
        this.observerCollection.forEach((observer)=>observer.notify());
    }
}

class Observer{
    constructor(name){
        this.name = name;
    }

    notify(){
        console.log(`${this.name} has been notified.`);
    }
}


let subject = new Subject(); // 创建主题对象
let oberver1 = new Observer("semlinker"); // 创建观察者A - 'semlinker'
let oberver2 = new Observer("lolo");

subject.registerObservable(oberver1); // 注册观察者A
subject.registerObservable(oberver2);

subject.notifyObservers(); // 通知观察者

subject.unregisterObervable(oberver1); // 移除观察者A

subject.notifyObservers(); // 验证是否成功移除



//ES 5 迭代器
function makeIterator(array){
    var nextIndex = 0;

    return {
        next: function(){
            return nextIndex<array.length?
                {value:array[nextIndex++],done:false}:
                {done:true}
        }
    }
}

var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true


//ES 6 迭代器

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next()) //{ value: 'a', done: false }