"use strict"; "use restrict";
var x = 1,
    y = "1",
    z = null,
    w = undefined;
print(/*@loose*/(x == y));
print(/*@loose*/(z != w));
print(x === y);
print(z !== w);

print(NaN == NaN);
print(NaN === NaN);
print(1 < undefined);
