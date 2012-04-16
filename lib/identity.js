var ometajs_ = require('ometajs').globals || global;var StringBuffer = ometajs_.StringBuffer;
var objectThatDelegatesTo = ometajs_.objectThatDelegatesTo;
var isImmutable = ometajs_.isImmutable;
var digitValue = ometajs_.digitValue;
var isSequenceable = ometajs_.isSequenceable;
var escapeChar = ometajs_.escapeChar;
var unescape = ometajs_.unescape;
var getTag = ometajs_.getTag;
var inspect = ometajs_.inspect;
var lift = ometajs_.lift;
var clone = ometajs_.clone;
var Parser = ometajs_.Parser;
var fail = ometajs_.fail;
var OMeta = ometajs_.OMeta;
var BSNullOptimization = ometajs_.BSNullOptimization;
var BSAssociativeOptimization = ometajs_.BSAssociativeOptimization;
var BSSeqInliner = ometajs_.BSSeqInliner;
var BSJumpTableOptimization = ometajs_.BSJumpTableOptimization;
var BSOMetaOptimizer = ometajs_.BSOMetaOptimizer;
var BSOMetaParser = ometajs_.BSOMetaParser;
var BSOMetaTranslator = ometajs_.BSOMetaTranslator;
var BSJSParser = ometajs_.BSJSParser;
var BSSemActionParser = ometajs_.BSSemActionParser;
var BSJSIdentity = ometajs_.BSJSIdentity;
var BSJSTranslator = ometajs_.BSJSTranslator;
var BSOMetaJSParser = ometajs_.BSOMetaJSParser;
var BSOMetaJSTranslator = ometajs_.BSOMetaJSTranslator;
if (global === ometajs_) {
  fail = (function(fail) {
    return function() { return fail };
  })(fail);
  OMeta = require('ometajs').OMeta;
}var KrasotaJSIdentity = exports.KrasotaJSIdentity = objectThatDelegatesTo(OMeta, {
    spaces: function() {
        var $elf = this, _fromIdx = this.input.idx, s;
        return function() {
            s = this._apply("anything");
            return [ "spaces", s ];
        }.call(this);
    },
    spacesAndComments: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            this._form(function() {
                return c = this._many(function() {
                    return this._apply("t");
                });
            });
            return [ "spacesAndComments", c ];
        }.call(this);
    },
    comment: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("anything");
            return [ "comment", c ];
        }.call(this);
    },
    commaList: function() {
        var $elf = this, _fromIdx = this.input.idx, x, xs;
        return function() {
            x = this._apply("t");
            xs = this._many(function() {
                return this._apply("t");
            });
            return [ "commaList", x ].concat(xs);
        }.call(this);
    },
    name: function() {
        var $elf = this, _fromIdx = this.input.idx, n;
        return function() {
            n = this._apply("anything");
            return [ "name", n ];
        }.call(this);
    },
    keyword: function() {
        var $elf = this, _fromIdx = this.input.idx, k;
        return function() {
            k = this._apply("anything");
            return [ "keyword", k ];
        }.call(this);
    },
    number: function() {
        var $elf = this, _fromIdx = this.input.idx, n;
        return function() {
            n = this._apply("anything");
            return [ "number", n ];
        }.call(this);
    },
    escapeChar: function() {
        var $elf = this, _fromIdx = this.input.idx, c, u;
        return function() {
            c = this._apply("anything");
            u = this._apply("anything");
            return [ "escapeChar", c, u ];
        }.call(this);
    },
    string: function() {
        var $elf = this, _fromIdx = this.input.idx, q, ec, c;
        return function() {
            q = this._apply("anything");
            this._form(function() {
                return c = this._many(function() {
                    return this._or(function() {
                        return this._apply("char");
                    }, function() {
                        return ec = this._apply("t");
                    });
                });
            });
            return [ "string", q, c ];
        }.call(this);
    },
    op: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, o, s2;
        return function() {
            s1 = this._apply("t");
            o = this._apply("anything");
            s2 = this._apply("t");
            return [ "op", s1, o, s2 ];
        }.call(this);
    },
    funcRest: function() {
        var $elf = this, _fromIdx = this.input.idx, as, s, c;
        return function() {
            as = this._apply("t");
            s = this._apply("t");
            c = this._apply("t");
            return [ as, s, c ];
        }.call(this);
    },
    funcArg: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, n, s2;
        return function() {
            s1 = this._apply("t");
            n = this._apply("t");
            s2 = this._apply("t");
            return [ "funcArg", s1, n, s2 ];
        }.call(this);
    },
    condExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, e1, o1, e2, o2, e3;
        return function() {
            e1 = this._apply("t");
            o1 = this._apply("t");
            e2 = this._apply("t");
            o2 = this._apply("t");
            e3 = this._apply("t");
            return [ "condExpr", e1, o1, e2, o2, e3 ];
        }.call(this);
    },
    binop: function() {
        var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
        return function() {
            e1 = this._apply("t");
            o = this._apply("t");
            e2 = this._apply("t");
            return [ "binop", e1, o, e2 ];
        }.call(this);
    },
    unop: function() {
        var $elf = this, _fromIdx = this.input.idx, o, e;
        return function() {
            o = this._apply("t");
            e = this._apply("t");
            return [ "unop", o, e ];
        }.call(this);
    },
    postop: function() {
        var $elf = this, _fromIdx = this.input.idx, e, s, o;
        return function() {
            e = this._apply("t");
            s = this._apply("t");
            o = this._apply("anything");
            return [ "postop", e, s, o ];
        }.call(this);
    },
    callExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, e, s1, as;
        return function() {
            e = this._apply("t");
            s1 = this._apply("t");
            as = this._apply("t");
            return [ "callExpr", e, s1, as ];
        }.call(this);
    },
    arg: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2;
        return function() {
            s1 = this._apply("t");
            e = this._apply("t");
            s2 = this._apply("t");
            return [ "arg", s1, e, s2 ];
        }.call(this);
    },
    newExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2, as, s1, e;
        return this._or(function() {
            return function() {
                s1 = this._apply("t");
                e = this._apply("t");
                s2 = this._apply("t");
                as = this._apply("t");
                return [ "newExpr", s1, e, s2, as ];
            }.call(this);
        }, function() {
            return function() {
                s1 = this._apply("t");
                e = this._apply("t");
                return [ "newExpr", s1, e ];
            }.call(this);
        });
    },
    getExprSB: function() {
        var $elf = this, _fromIdx = this.input.idx, e, s1, s2, i, s3;
        return function() {
            e = this._apply("t");
            s1 = this._apply("t");
            s2 = this._apply("t");
            i = this._apply("t");
            s3 = this._apply("t");
            return [ "getExprSB", e, s1, s2, i, s3 ];
        }.call(this);
    },
    getExprDot: function() {
        var $elf = this, _fromIdx = this.input.idx, e, s1, s2, n;
        return function() {
            e = this._apply("t");
            s1 = this._apply("t");
            s2 = this._apply("t");
            n = this._apply("t");
            return [ "getExprDot", e, s1, s2, n ];
        }.call(this);
    },
    bracketedExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2;
        return function() {
            s1 = this._apply("t");
            e = this._apply("t");
            s2 = this._apply("t");
            return [ "bracketedExpr", s1, e, s2 ];
        }.call(this);
    },
    funcExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, n, s2, c, s1, c;
        return this._or(function() {
            return function() {
                s1 = this._apply("t");
                n = this._apply("t");
                s2 = this._apply("t");
                c = this._apply("funcRest");
                return [ "funcExpr", s1, n, s2 ].concat(c);
            }.call(this);
        }, function() {
            return function() {
                s1 = this._apply("t");
                c = this._apply("funcRest");
                return [ "funcExpr", s1 ].concat(c);
            }.call(this);
        });
    },
    arr: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("t");
            return [ "arr", c ];
        }.call(this);
    },
    arrItem: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2;
        return function() {
            s1 = this._apply("t");
            e = this._apply("t");
            s2 = this._apply("t");
            return [ "arrItem", s1, e, s2 ];
        }.call(this);
    },
    obj: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("t");
            return [ "obj", c ];
        }.call(this);
    },
    objItem: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, n, s2, s3, v, s4;
        return function() {
            s1 = this._apply("t");
            n = this._apply("t");
            s2 = this._apply("t");
            s3 = this._apply("t");
            v = this._apply("t");
            s4 = this._apply("t");
            return [ "objItem", s1, n, s2, s3, v, s4 ];
        }.call(this);
    },
    re: function() {
        var $elf = this, _fromIdx = this.input.idx, c, f;
        return function() {
            c = this._apply("t");
            f = this._apply("anything");
            return [ "re", c, f ];
        }.call(this);
    },
    blockStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("t");
            return [ "blockStmt", c ];
        }.call(this);
    },
    stmtWithExprAndStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, k, s1, be, s2, c;
        return function() {
            k = this._apply("anything");
            s1 = this._apply("t");
            be = this._apply("t");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ k + "Stmt", s1, be, s2, c ];
        }.call(this);
    },
    stmtWithLabel: function() {
        var $elf = this, _fromIdx = this.input.idx, k, s, l;
        return function() {
            k = this._apply("anything");
            return this._or(function() {
                return function() {
                    s = this._apply("t");
                    l = this._apply("t");
                    return [ k + "Stmt", s, l ];
                }.call(this);
            }, function() {
                return function() {
                    this._apply("empty");
                    return [ k + "Stmt" ];
                }.call(this);
            });
        }.call(this);
    },
    stmtEnd: function() {
        var $elf = this, _fromIdx = this.input.idx, s, c, s;
        return this._or(function() {
            return function() {
                s = this._apply("t");
                c = this._apply("anything");
                return [ "stmtEnd", s, c ];
            }.call(this);
        }, function() {
            return function() {
                s = this._apply("t");
                return [ "stmtEnd", s ];
            }.call(this);
        });
    },
    stmts: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._many(function() {
                return this._apply("t");
            });
            return [ "stmts" ].concat(c);
        }.call(this);
    },
    stmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, c, se, s2;
        return function() {
            s1 = this._apply("t");
            c = this._apply("t");
            se = this._apply("t");
            s2 = this._apply("t");
            return [ "stmt", s1, c, se, s2 ];
        }.call(this);
    },
    funcStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, n, s2, c;
        return function() {
            s1 = this._apply("t");
            n = this._apply("t");
            s2 = this._apply("t");
            c = this._apply("funcRest");
            return [ "funcStmt", s1, n, s2 ].concat(c);
        }.call(this);
    },
    varStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            this._form(function() {
                return c = this._many1(function() {
                    return this._apply("t");
                });
            });
            return [ "varStmt", c ];
        }.call(this);
    },
    varItemAsgn: function() {
        var $elf = this, _fromIdx = this.input.idx, n, s1, s2, e, s3;
        return function() {
            n = this._apply("t");
            s1 = this._apply("t");
            s2 = this._apply("t");
            e = this._apply("t");
            s3 = this._apply("t");
            return [ "varItemAsgn", n, s1, s2, e, s3 ];
        }.call(this);
    },
    varItemName: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, n, s2;
        return function() {
            s1 = this._apply("t");
            n = this._apply("t");
            s2 = this._apply("t");
            return [ "varItemName", s1, n, s2 ];
        }.call(this);
    },
    ifStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, i, s1, s2, c;
        return this._or(function() {
            return function() {
                i = this._applyWithArgs("stmtWithExprAndStmt", "if");
                s1 = this._apply("t");
                s2 = this._apply("t");
                c = this._apply("t");
                return i.concat([ s1, s2, c ]);
            }.call(this);
        }, function() {
            return this._applyWithArgs("stmtWithExprAndStmt", "if");
        });
    },
    whileStmt: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return this._applyWithArgs("stmtWithExprAndStmt", "while");
    },
    doStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, c, s2, s3, be;
        return function() {
            s1 = this._apply("t");
            c = this._apply("t");
            s2 = this._apply("t");
            s3 = this._apply("t");
            be = this._apply("t");
            return [ "doStmt", s1, c, s2, s3, be ];
        }.call(this);
    },
    forStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2, c;
        return function() {
            s1 = this._apply("t");
            e = this._apply("forStmtExprs");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ "forStmt", s1, e, s2, c ];
        }.call(this);
    },
    forStmtExprs: function() {
        var $elf = this, _fromIdx = this.input.idx, e1, e2, e3;
        return function() {
            this._form(function() {
                return function() {
                    e1 = this._apply("t");
                    e2 = this._apply("t");
                    return e3 = this._apply("t");
                }.call(this);
            });
            return [ e1, e2, e3 ];
        }.call(this);
    },
    forStmtExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, c, s2, s;
        return this._or(function() {
            return function() {
                s1 = this._apply("t");
                c = this._apply("t");
                s2 = this._apply("t");
                return [ "forStmtExpr", s1, c, s2 ];
            }.call(this);
        }, function() {
            return function() {
                s = this._apply("t");
                return [ "forStmtExpr", s ];
            }.call(this);
        });
    },
    forInStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2, c;
        return function() {
            s1 = this._apply("t");
            e = this._apply("forInStmtExpr");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ "forInStmt", s1, e, s2, c ];
        }.call(this);
    },
    forInStmtExpr: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e1, s2, s3, e2, s4;
        return function() {
            this._form(function() {
                return function() {
                    s1 = this._apply("t");
                    e1 = this._apply("t");
                    s2 = this._apply("t");
                    s3 = this._apply("t");
                    e2 = this._apply("t");
                    return s4 = this._apply("t");
                }.call(this);
            });
            return [ s1, e1, s2, s3, e2, s4 ];
        }.call(this);
    },
    forInStmtVar: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("t");
            return [ "varStmt", c ];
        }.call(this);
    },
    breakStmt: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return this._applyWithArgs("stmtWithLabel", "break");
    },
    continueStmt: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return this._applyWithArgs("stmtWithLabel", "continue");
    },
    switchStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, be, s2, c;
        return function() {
            s1 = this._apply("t");
            be = this._apply("t");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ "switchStmt", s1, be, s2, c ];
        }.call(this);
    },
    switchStmtContent: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            this._form(function() {
                return c = this._many(function() {
                    return this._apply("t");
                });
            });
            return [ "switchStmtContent", c ];
        }.call(this);
    },
    switchStmtItem: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, l, s2, s3, c;
        return function() {
            s1 = this._apply("t");
            l = this._apply("t");
            s2 = this._apply("t");
            s3 = this._apply("t");
            c = this._apply("t");
            return [ "switchStmtItem", s1, l, s2, s3, c ];
        }.call(this);
    },
    switchStmtCase: function() {
        var $elf = this, _fromIdx = this.input.idx, s, e;
        return function() {
            s = this._apply("t");
            e = this._apply("t");
            return [ "switchStmtCase", s, e ];
        }.call(this);
    },
    switchStmtDefault: function() {
        var $elf = this, _fromIdx = this.input.idx, s;
        return function() {
            s = this._apply("t");
            return [ "switchStmtDefault", s ];
        }.call(this);
    },
    throwStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, e, s2;
        return function() {
            s1 = this._apply("t");
            e = this._apply("t");
            s2 = this._apply("t");
            return [ "throwStmt", s1, e, s2 ];
        }.call(this);
    },
    tryStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, b, s2, c, s3, f, s4, s1, b, s2, c;
        return this._or(function() {
            return function() {
                s1 = this._apply("t");
                b = this._apply("t");
                s2 = this._apply("t");
                c = this._apply("t");
                s3 = this._apply("t");
                f = this._apply("t");
                s4 = this._apply("t");
                return [ "tryStmt", s1, b, s2, c, s3, f, s4 ];
            }.call(this);
        }, function() {
            return function() {
                s1 = this._apply("t");
                b = this._apply("t");
                s2 = this._apply("t");
                c = this._apply("t");
                return [ "tryStmt", s1, b, s2, c ];
            }.call(this);
        });
    },
    tryStmtCatch: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, be, s2, c;
        return function() {
            s1 = this._apply("t");
            be = this._apply("t");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ "tryStmtCatch", s1, be, s2, c ];
        }.call(this);
    },
    tryStmtFinally: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, c;
        return function() {
            s1 = this._apply("t");
            c = this._apply("t");
            return [ "tryStmtFinally", s1, c ];
        }.call(this);
    },
    returnStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, s1, c, s2, s2;
        return this._or(function() {
            return function() {
                s1 = this._apply("t");
                c = this._apply("t");
                s2 = this._apply("t");
                return [ "returnStmt", s1, c, s2 ];
            }.call(this);
        }, function() {
            return function() {
                s2 = this._apply("t");
                return [ "returnStmt", s2 ];
            }.call(this);
        });
    },
    withStmt: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return this._applyWithArgs("stmtWithExprAndStmt", "with");
    },
    labelStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, l, s1, s2, c;
        return function() {
            l = this._apply("t");
            s1 = this._apply("t");
            s2 = this._apply("t");
            c = this._apply("t");
            return [ "labelStmt", l, s1, s2, c ];
        }.call(this);
    },
    exprStmt: function() {
        var $elf = this, _fromIdx = this.input.idx, e;
        return function() {
            e = this._apply("t");
            return [ "exprStmt", e ];
        }.call(this);
    },
    emptyStmt: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return [ "emptyStmt" ];
    },
    t: function() {
        var $elf = this, _fromIdx = this.input.idx, t, r;
        return function() {
            this._form(function() {
                return function() {
                    t = this._apply("anything");
                    return r = this._applyWithArgs("apply", t);
                }.call(this);
            });
            return r;
        }.call(this);
    },
    topLevel: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("t");
            this._apply("end");
            return c;
        }.call(this);
    }
});