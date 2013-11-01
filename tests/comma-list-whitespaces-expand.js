var foo1 = {a: 'a', b: 'b',c: 'c'};
var foo2 = { a: 'a',b: 'b',c: 'c' };
var foo3 = { a: 'a',b: 'b'   ,c: 'c' };
var foo4 = { a: 'a',b: 'b'   /*aaaa*/,c: 'c' };
var foo5 = { a: 'a', /* 1 */ /* 2 */ b: 'b',c: 'c' };
var foo6 = {
    a: 'a',
    b: 'b',
    c: 'c'
};

var bar1 = [ 1,  2,3 ];
var bar2 = [1,2   ,3];
var bar3 = [1,2 /*asdasdas*/,3];

function(a,   b      , c) {};
function( a,b,c ) {};
function( a ) {};
function(a) {};
