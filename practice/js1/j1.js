function say(value){
    alert(value.name)
}

function execute(somefunction){
    var value = {
        name:"hi js"
    }
    somefunction(value)
}

execute(say)

var obj = {
    birth:1998,
    getAge:function(year){
        var b = this.birth;
        var fn = (y) => y - this.birth;
        return fn.call({bitrh:200}, year)
    }
}

obj.getAge(2020);


var person={
    fullName:function(){
        return this.firstName + this.lastName;
    }
}

var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
var person2 = {
    firstName:"Steve",
    lastName: "Jobs",
}

console.log(person.fullName.call(person1))
