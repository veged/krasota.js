(/*minus comment*/ "2"-0);
(/*first*/   /*second*/"2"-0);
commentStmtcomment/*semicolon comment*/("4"-1)+3;
(/*number comment*/1);
var x = 1;
commentStmtcomment/** @type1 */
var y = 3;
commentStmtcomment/** @type2 {asdf} */
function f() {}

commentStmtcomment// line1

commentStmtcomment// line2
function g() /**e*/ {}

function h() {commentStmtcomment/*block inline comment*/}

(/**f*/ f.x /**post*/);

commentStmtcomment/*semicolon comment*/ o = /*object_init comment*/ {
    /*property_init comment*/ first: 42,
    second: 1
};
(/*array_init comment*/[1,2,3]);
