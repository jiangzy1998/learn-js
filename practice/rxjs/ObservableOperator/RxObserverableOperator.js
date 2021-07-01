// npm install @reactivex/rxjs
const Observable = require('rxjs').Observable;


// of
const of = require('rxjs').of;
var source = of("N","B");
source.subscribe({
    next:function(value){
        console.log(value);
    },
    complete:function(){
        console.log("complete!");
    },
    error: function(error) {
        console.log(error);
    }
})

//from
const from = require('rxjs').from;
var arr = [1,2,3]
var source_from = from(arr);

source_from.subscribe({
    next:function(value){
        console.log(value);
    },
    complete:function(){
        console.log("complete!");
    },
    error: function(error) {
        console.log(error);
    }
})

// fromPromise
// const fromPromise = require("rxjs").fromPromise;
// var source_fromPromise = fromPromise(new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Hello RxJS!');
//     },3000)
// }));

// source_fromPromise.subscribe({
//     next:function(value){
//         console.log(value);
//     },
//     complete:function(){
//         console.log("complete!");
//     },
//     error: function(error) {
//         console.log(error);
//     }
// });


//unsubscribe
const timer = require('rxjs').timer
var timerSource = timer(1000,1000);

var subscription = timerSource.subscribe({
    next: function(value) {
        console.log(value);
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log('Throw Error: ' + error);
    }
});
setTimeout(() => {
    subscription.unsubscribe();
}, 5000);

