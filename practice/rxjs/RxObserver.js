// npm install @reactivex/rxjs
const Observable = require('rxjs').Observable;

var observable = Observable.create(function(observer){
    observer.next("S");
    observer.next("lo");

    // 异步操作
    setTimeout(() => {
        //Observable 可以应用于同步和异步的场合。
        observer.next("rxjs observable");
    }, 1000);
});

console.log("start");

observable.subscribe(function (value){
    console.log(value);
});

console.log('end');