const test = ()=>{
    foo();
    bar();
}
test();

var bar = function() {
    console.log('bar');
}
function foo(){
    console.log('foo');
}

