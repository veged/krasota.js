function f() {
    var x = (/*@bitwise*/ 1 | 2 & 3); // ok

    /*@bitwise*/ function g() { // ok
        // annotate an entire function if it does a lot of bit-fiddling
        var a = 1 | 2,
            b = a & 3;
    }

    var y = 1 | 2, // error
        z = 3 & 4; // error
}
