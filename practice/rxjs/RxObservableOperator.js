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

