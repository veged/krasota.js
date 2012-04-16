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
}{
    var KrasotaJSParser = exports.KrasotaJSParser = objectThatDelegatesTo(OMeta, {
        spaces: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._consumedBy(function() {
                    return this._many(function() {
                        return this._apply("space");
                    });
                });
                return [ "spaces", c ];
            }.call(this);
        },
        spacesNoNl: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._consumedBy(function() {
                    return this._many(function() {
                        return function() {
                            this._not(function() {
                                return this._applyWithArgs("exactly", "\n");
                            });
                            return this._apply("space");
                        }.call(this);
                    });
                });
                return [ "spaces", c ];
            }.call(this);
        },
        spacesUntil: function() {
            var $elf = this, _fromIdx = this.input.idx, u, s;
            return function() {
                u = this._apply("anything");
                return this._or(function() {
                    return function() {
                        s = this._apply("spacesNoNl");
                        this._lookahead(function() {
                            return this._applyWithArgs("apply", u);
                        });
                        return s;
                    }.call(this);
                }, function() {
                    return function() {
                        this._lookahead(function() {
                            return this._applyWithArgs("apply", u);
                        });
                        return [ "spaces", "" ];
                    }.call(this);
                }, function() {
                    return this._apply("spaces");
                });
            }.call(this);
        },
        comment: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._or(function() {
                    return this._consumedBy(function() {
                        return function() {
                            this._applyWithArgs("exactly", "/");
                            this._applyWithArgs("exactly", "/");
                            "//";
                            return this._many(function() {
                                return function() {
                                    this._not(function() {
                                        return this._applyWithArgs("exactly", "\n");
                                    });
                                    return this._apply("char");
                                }.call(this);
                            });
                        }.call(this);
                    });
                }, function() {
                    return this._applyWithArgs("fromTo", "/*", "*/");
                });
                return [ "comment", c ];
            }.call(this);
        },
        sc: function() {
            var $elf = this, _fromIdx = this.input.idx, s, c;
            return function() {
                c = this._many(function() {
                    return this._or(function() {
                        return this._apply("comment");
                    }, function() {
                        return function() {
                            s = this._consumedBy(function() {
                                return this._many1(function() {
                                    return this._apply("space");
                                });
                            });
                            return [ "spaces", s ];
                        }.call(this);
                    });
                });
                return [ "spacesAndComments", c ];
            }.call(this);
        },
        scNoNl: function() {
            var $elf = this, _fromIdx = this.input.idx, s, c;
            return function() {
                c = this._many(function() {
                    return this._or(function() {
                        return this._apply("comment");
                    }, function() {
                        return function() {
                            s = this._consumedBy(function() {
                                return this._many1(function() {
                                    return function() {
                                        this._not(function() {
                                            return this._applyWithArgs("exactly", "\n");
                                        });
                                        return this._apply("space");
                                    }.call(this);
                                });
                            });
                            return [ "spaces", s ];
                        }.call(this);
                    });
                });
                return [ "spacesAndComments", c ];
            }.call(this);
        },
        commaList: function() {
            var $elf = this, _fromIdx = this.input.idx, t, x, xs;
            return function() {
                t = this._apply("anything");
                x = this._applyWithArgs("apply", t);
                xs = this._many(function() {
                    return function() {
                        this._applyWithArgs("exactly", ",");
                        return this._applyWithArgs("apply", t);
                    }.call(this);
                });
                return [ "commaList", x ].concat(xs);
            }.call(this);
        },
        nameFirst: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("letter");
            }, function() {
                return function() {
                    switch (this._apply("anything")) {
                      case "$":
                        return "$";
                      case "_":
                        return "_";
                      default:
                        throw fail();
                    }
                }.call(this);
            });
        },
        nameRest: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("nameFirst");
            }, function() {
                return this._apply("digit");
            });
        },
        iName: function() {
            var $elf = this, _fromIdx = this.input.idx, r;
            return function() {
                r = this._applyWithArgs("firstAndRest", "nameFirst", "nameRest");
                return r.join("");
            }.call(this);
        },
        isKeyword: function() {
            var $elf = this, _fromIdx = this.input.idx, x;
            return function() {
                x = this._apply("anything");
                return this._pred(KrasotaJSParser._isKeyword(x));
            }.call(this);
        },
        name: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return function() {
                n = this._apply("iName");
                this._not(function() {
                    return this._applyWithArgs("isKeyword", n);
                });
                return [ "name", n ];
            }.call(this);
        },
        keyword: function() {
            var $elf = this, _fromIdx = this.input.idx, k, kk;
            return function() {
                k = this._apply("anything");
                kk = this._apply("iName");
                this._applyWithArgs("isKeyword", kk);
                this._pred(!k || k == kk);
                return [ "keyword", kk ];
            }.call(this);
        },
        hexDigit: function() {
            var $elf = this, _fromIdx = this.input.idx, x, v;
            return function() {
                x = this._apply("char");
                v = this["hexDigits"].indexOf(x.toLowerCase());
                this._pred(v >= 0);
                return v;
            }.call(this);
        },
        hexLit: function() {
            var $elf = this, _fromIdx = this.input.idx, n, d;
            return this._or(function() {
                return function() {
                    n = this._apply("hexLit");
                    d = this._apply("hexDigit");
                    return n * 16 + d;
                }.call(this);
            }, function() {
                return this._apply("hexDigit");
            });
        },
        number: function() {
            var $elf = this, _fromIdx = this.input.idx, n, f;
            return this._or(function() {
                return function() {
                    switch (this._apply("anything")) {
                      case "0":
                        return function() {
                            this._applyWithArgs("exactly", "x");
                            "0x";
                            n = this._apply("hexLit");
                            return [ "number", n ];
                        }.call(this);
                      default:
                        throw fail();
                    }
                }.call(this);
            }, function() {
                return function() {
                    f = this._consumedBy(function() {
                        return function() {
                            this._many1(function() {
                                return this._apply("digit");
                            });
                            return this._opt(function() {
                                return function() {
                                    this._or(function() {
                                        return function() {
                                            ((function() {
                                                switch (this._apply("anything")) {
                                                  case "E":
                                                    return "E";
                                                  case "e":
                                                    return "e";
                                                  default:
                                                    throw fail();
                                                }
                                            })).call(this);
                                            return this._opt(function() {
                                                return function() {
                                                    switch (this._apply("anything")) {
                                                      case "+":
                                                        return "+";
                                                      case "-":
                                                        return "-";
                                                      default:
                                                        throw fail();
                                                    }
                                                }.call(this);
                                            });
                                        }.call(this);
                                    }, function() {
                                        return function() {
                                            switch (this._apply("anything")) {
                                              case ".":
                                                return ".";
                                              default:
                                                throw fail();
                                            }
                                        }.call(this);
                                    });
                                    return this._many1(function() {
                                        return this._apply("digit");
                                    });
                                }.call(this);
                            });
                        }.call(this);
                    });
                    return [ "number", f ];
                }.call(this);
            });
        },
        escapeChar: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "\\");
                c = this._apply("char");
                return [ "escapeChar", c, unescape("\\" + c) ];
            }.call(this);
        },
        string: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._applyWithArgs("string_", "'");
            }, function() {
                return this._applyWithArgs("string_", '"');
            });
        },
        string_: function() {
            var $elf = this, _fromIdx = this.input.idx, q, cs;
            return function() {
                q = this._apply("anything");
                this._applyWithArgs("seq", q);
                cs = this._many(function() {
                    return this._or(function() {
                        return this._apply("escapeChar");
                    }, function() {
                        return function() {
                            this._not(function() {
                                return this._applyWithArgs("seq", q);
                            });
                            return this._apply("char");
                        }.call(this);
                    });
                });
                this._applyWithArgs("seq", q);
                return [ "string", q, cs ];
            }.call(this);
        },
        op: function() {
            var $elf = this, _fromIdx = this.input.idx, o, sc1, c, sc2;
            return function() {
                o = this._apply("anything");
                sc1 = this._apply("sc");
                c = this._applyWithArgs("seq", o);
                sc2 = this._apply("sc");
                return [ "op", sc1, o, sc2 ];
            }.call(this);
        },
        funcRest: function() {
            var $elf = this, _fromIdx = this.input.idx, as, s, c;
            return function() {
                this._applyWithArgs("exactly", "(");
                as = this._or(function() {
                    return this._applyWithArgs("commaList", "funcArg");
                }, function() {
                    return this._apply("sc");
                });
                this._applyWithArgs("exactly", ")");
                s = this._apply("sc");
                c = this._apply("block");
                return [ as, s, c ];
            }.call(this);
        },
        funcArg: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, n, sc2;
            return function() {
                sc1 = this._apply("sc");
                n = this._apply("name");
                sc2 = this._apply("sc");
                return [ "funcArg", sc1, n, sc2 ];
            }.call(this);
        },
        expr: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._apply("commaExpr");
        },
        commaExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("commaExpr");
                    o = this._applyWithArgs("op", ",");
                    e2 = this._apply("asgnExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("asgnExpr");
            });
        },
        asgnExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return function() {
                e1 = this._apply("condExpr");
                return this._or(function() {
                    return function() {
                        o = this._or(function() {
                            return this._applyWithArgs("op", "=");
                        }, function() {
                            return this._applyWithArgs("op", "+=");
                        }, function() {
                            return this._applyWithArgs("op", "-=");
                        }, function() {
                            return this._applyWithArgs("op", "*=");
                        }, function() {
                            return this._applyWithArgs("op", "/=");
                        }, function() {
                            return this._applyWithArgs("op", "%=");
                        }, function() {
                            return this._applyWithArgs("op", "<<=");
                        }, function() {
                            return this._applyWithArgs("op", ">>=");
                        }, function() {
                            return this._applyWithArgs("op", ">>>=");
                        }, function() {
                            return this._applyWithArgs("op", "&=");
                        }, function() {
                            return this._applyWithArgs("op", "^=");
                        }, function() {
                            return this._applyWithArgs("op", "|=");
                        });
                        e2 = this._apply("asgnExpr");
                        return [ "binop", e1, o, e2 ];
                    }.call(this);
                }, function() {
                    return function() {
                        this._apply("empty");
                        return e1;
                    }.call(this);
                });
            }.call(this);
        },
        condExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o1, t, o2, f;
            return function() {
                e1 = this._apply("orExpr");
                return this._or(function() {
                    return function() {
                        o1 = this._applyWithArgs("op", "?");
                        t = this._apply("condExpr");
                        o2 = this._applyWithArgs("op", ":");
                        f = this._apply("condExpr");
                        return [ "condExpr", e1, o1, t, o2, f ];
                    }.call(this);
                }, function() {
                    return function() {
                        this._apply("empty");
                        return e1;
                    }.call(this);
                });
            }.call(this);
        },
        orExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("orExpr");
                    o = this._applyWithArgs("op", "||");
                    e2 = this._apply("andExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("andExpr");
            });
        },
        andExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("andExpr");
                    o = this._applyWithArgs("op", "&&");
                    e2 = this._apply("bitOrExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("bitOrExpr");
            });
        },
        bitOrExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("bitOrExpr");
                    o = this._applyWithArgs("op", "|");
                    e2 = this._apply("bitXorExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("bitXorExpr");
            });
        },
        bitXorExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("bitXorExpr");
                    o = this._applyWithArgs("op", "^");
                    e2 = this._apply("bitAndExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("bitAndExpr");
            });
        },
        bitAndExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("bitAndExpr");
                    o = this._applyWithArgs("op", "&");
                    e2 = this._apply("eqExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("eqExpr");
            });
        },
        eqExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("eqExpr");
                    o = this._or(function() {
                        return this._applyWithArgs("op", "===");
                    }, function() {
                        return this._applyWithArgs("op", "!==");
                    }, function() {
                        return this._applyWithArgs("op", "==");
                    }, function() {
                        return this._applyWithArgs("op", "!=");
                    });
                    e2 = this._apply("relExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("relExpr");
            });
        },
        relExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("relExpr");
                    o = this._or(function() {
                        return this._applyWithArgs("op", ">=");
                    }, function() {
                        return this._applyWithArgs("op", ">");
                    }, function() {
                        return this._applyWithArgs("op", "<=");
                    }, function() {
                        return this._applyWithArgs("op", "<");
                    }, function() {
                        return this._applyWithArgs("op", "instanceof");
                    }, function() {
                        return this._applyWithArgs("op", "in");
                    });
                    e2 = this._apply("relExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("bitShiftExpr");
            });
        },
        bitShiftExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("bitShiftExpr");
                    o = this._or(function() {
                        return this._applyWithArgs("op", ">>>");
                    }, function() {
                        return this._applyWithArgs("op", ">>");
                    }, function() {
                        return this._applyWithArgs("op", "<<");
                    });
                    e2 = this._apply("bitShiftExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("addExpr");
            });
        },
        addExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("addExpr");
                    o = this._or(function() {
                        return this._applyWithArgs("op", "+");
                    }, function() {
                        return this._applyWithArgs("op", "-");
                    });
                    e2 = this._apply("mulExpr");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("mulExpr");
            });
        },
        mulExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, o, e2;
            return this._or(function() {
                return function() {
                    e1 = this._apply("mulExpr");
                    o = this._or(function() {
                        return this._applyWithArgs("op", "*");
                    }, function() {
                        return this._applyWithArgs("op", "/");
                    }, function() {
                        return this._applyWithArgs("op", "%");
                    });
                    e2 = this._apply("unary");
                    return [ "binop", e1, o, e2 ];
                }.call(this);
            }, function() {
                return this._apply("unary");
            });
        },
        unary: function() {
            var $elf = this, _fromIdx = this.input.idx, o, e, o, e;
            return this._or(function() {
                return function() {
                    this._or(function() {
                        return function() {
                            o = this._or(function() {
                                return this._applyWithArgs("op", "--");
                            }, function() {
                                return this._applyWithArgs("op", "++");
                            }, function() {
                                return this._applyWithArgs("op", "+");
                            }, function() {
                                return this._applyWithArgs("op", "-");
                            }, function() {
                                return this._applyWithArgs("op", "~");
                            });
                            return e = this._apply("postfix");
                        }.call(this);
                    }, function() {
                        return function() {
                            o = this._or(function() {
                                return this._applyWithArgs("op", "!");
                            }, function() {
                                return this._applyWithArgs("op", "void");
                            }, function() {
                                return this._applyWithArgs("op", "delete");
                            }, function() {
                                return this._applyWithArgs("op", "typeof");
                            });
                            return e = this._apply("unary");
                        }.call(this);
                    });
                    return [ "unop", o, e ];
                }.call(this);
            }, function() {
                return this._apply("postfix");
            });
        },
        postfix: function() {
            var $elf = this, _fromIdx = this.input.idx, e, s, o;
            return function() {
                e = this._apply("leftExpr");
                return this._or(function() {
                    return function() {
                        s = this._apply("scNoNl");
                        o = function() {
                            switch (this._apply("anything")) {
                              case "+":
                                return function() {
                                    this._applyWithArgs("exactly", "+");
                                    return "++";
                                }.call(this);
                              case "-":
                                return function() {
                                    this._applyWithArgs("exactly", "-");
                                    return "--";
                                }.call(this);
                              default:
                                throw fail();
                            }
                        }.call(this);
                        return [ "postop", e, s, o ];
                    }.call(this);
                }, function() {
                    return function() {
                        this._apply("empty");
                        return e;
                    }.call(this);
                });
            }.call(this);
        },
        leftExpr: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("callExpr");
            }, function() {
                return this._apply("newExpr");
            });
        },
        callExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, e, sc1, as;
            return this._or(function() {
                return this._applyWithArgs("getExpr_", "callExpr");
            }, function() {
                return function() {
                    e = this._apply("callExpr");
                    sc1 = this._apply("sc");
                    as = this._apply("args");
                    return [ "callExpr", e, sc1, as ];
                }.call(this);
            }, function() {
                return this._apply("getExpr");
            });
        },
        args: function() {
            var $elf = this, _fromIdx = this.input.idx, as;
            return function() {
                this._applyWithArgs("exactly", "(");
                as = this._or(function() {
                    return this._applyWithArgs("commaList", "arg");
                }, function() {
                    return this._apply("sc");
                });
                this._applyWithArgs("exactly", ")");
                return as;
            }.call(this);
        },
        arg: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2;
            return function() {
                sc1 = this._apply("sc");
                e = this._apply("expr");
                sc2 = this._apply("sc");
                return [ "arg", sc1, e, sc2 ];
            }.call(this);
        },
        newExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e;
            return this._or(function() {
                return function() {
                    this._applyWithArgs("keyword", "new");
                    sc1 = this._apply("sc");
                    e = this._apply("newExpr");
                    return [ "newExpr", sc1, e ];
                }.call(this);
            }, function() {
                return this._apply("getExpr");
            });
        },
        getExpr_: function() {
            var $elf = this, _fromIdx = this.input.idx, e, e, sc1, sc2, i, sc3, sc2, n;
            return function() {
                e = this._apply("anything");
                e = this._applyWithArgs("apply", e);
                sc1 = this._apply("sc");
                return function() {
                    switch (this._apply("anything")) {
                      case "[":
                        return function() {
                            sc2 = this._apply("sc");
                            i = this._apply("expr");
                            sc3 = this._apply("sc");
                            this._applyWithArgs("exactly", "]");
                            return [ "getExprSB", e, sc1, sc2, i, sc3 ];
                        }.call(this);
                      case ".":
                        return function() {
                            sc2 = this._apply("sc");
                            n = this._apply("name");
                            return [ "getExprDot", e, sc1, sc2, n ];
                        }.call(this);
                      default:
                        throw fail();
                    }
                }.call(this);
            }.call(this);
        },
        getExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2, as;
            return this._or(function() {
                return this._applyWithArgs("getExpr_", "getExpr");
            }, function() {
                return this._apply("primExpr");
            }, function() {
                return this._apply("funcExpr");
            }, function() {
                return function() {
                    this._applyWithArgs("keyword", "new");
                    sc1 = this._apply("sc");
                    e = this._apply("getExpr");
                    sc2 = this._apply("sc");
                    as = this._apply("args");
                    return [ "newExpr", sc1, e, sc2, as ];
                }.call(this);
            });
        },
        primExpr: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._applyWithArgs("keyword", "this");
            }, function() {
                return this._apply("name");
            }, function() {
                return this._apply("number");
            }, function() {
                return this._apply("string");
            }, function() {
                return this._apply("arr");
            }, function() {
                return this._apply("obj");
            }, function() {
                return this._apply("re");
            }, function() {
                return this._apply("bracketedExpr");
            });
        },
        bracketedExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2;
            return function() {
                this._applyWithArgs("exactly", "(");
                sc1 = this._apply("sc");
                e = this._apply("expr");
                sc2 = this._apply("sc");
                this._applyWithArgs("exactly", ")");
                return [ "bracketedExpr", sc1, e, sc2 ];
            }.call(this);
        },
        funcExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, n, sc2, c;
            return function() {
                this._applyWithArgs("keyword", "function");
                sc1 = this._apply("sc");
                this._opt(function() {
                    return function() {
                        n = this._apply("name");
                        return sc2 = this._apply("sc");
                    }.call(this);
                });
                c = this._apply("funcRest");
                return [ "funcExpr", sc1 ].concat(n ? [ n, sc2 ] : []).concat(c);
            }.call(this);
        },
        arr: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "[");
                c = this._or(function() {
                    return this._applyWithArgs("commaList", "arrItem");
                }, function() {
                    return this._apply("sc");
                });
                this._applyWithArgs("exactly", "]");
                return [ "arr", c ];
            }.call(this);
        },
        arrItem: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2;
            return function() {
                sc1 = this._apply("sc");
                e = this._apply("asgnExpr");
                sc2 = this._apply("sc");
                return [ "arrItem", sc1, e, sc2 ];
            }.call(this);
        },
        obj: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "{");
                c = this._or(function() {
                    return this._applyWithArgs("commaList", "objItem");
                }, function() {
                    return this._apply("sc");
                });
                this._applyWithArgs("exactly", "}");
                return [ "obj", c ];
            }.call(this);
        },
        objItem: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, n, sc2, sc3, v, sc4;
            return function() {
                sc1 = this._apply("sc");
                n = this._or(function() {
                    return this._apply("name");
                }, function() {
                    return this._apply("string");
                });
                sc2 = this._apply("sc");
                this._applyWithArgs("exactly", ":");
                sc3 = this._apply("sc");
                v = this._apply("asgnExpr");
                sc4 = this._apply("sc");
                return [ "objItem", sc1, n, sc2, sc3, v, sc4 ];
            }.call(this);
        },
        re: function() {
            var $elf = this, _fromIdx = this.input.idx, c, f;
            return function() {
                c = this._applyWithArgs("string_", "/");
                f = this._many(function() {
                    return function() {
                        switch (this._apply("anything")) {
                          case "g":
                            return "g";
                          case "m":
                            return "m";
                          case "i":
                            return "i";
                          default:
                            throw fail();
                        }
                    }.call(this);
                });
                return [ "re", c, f ];
            }.call(this);
        },
        block: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "{");
                c = this._or(function() {
                    return this._apply("stmts1");
                }, function() {
                    return this._apply("sc");
                });
                this._applyWithArgs("exactly", "}");
                return [ "blockStmt", c ];
            }.call(this);
        },
        stmtWithBlockStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, k, sc1, c;
            return function() {
                k = this._apply("anything");
                this._applyWithArgs("keyword", k);
                sc1 = this._apply("sc");
                c = this._apply("block");
                return [ k + "Stmt", sc1, c ];
            }.call(this);
        },
        stmtWithExprAndStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, k, sc1, be, sc2, c;
            return function() {
                k = this._apply("anything");
                this._applyWithArgs("keyword", k);
                sc1 = this._apply("sc");
                be = this._apply("bracketedExpr");
                sc2 = this._apply("sc");
                c = this._apply("stmtContent");
                return [ k + "Stmt", sc1, be, sc2, c ];
            }.call(this);
        },
        stmtWithLabel: function() {
            var $elf = this, _fromIdx = this.input.idx, k, sc1, l;
            return function() {
                k = this._apply("anything");
                return this._or(function() {
                    return function() {
                        this._applyWithArgs("keyword", k);
                        sc1 = this._apply("sc");
                        l = this._apply("name");
                        return [ k + "Stmt", sc1, l ];
                    }.call(this);
                }, function() {
                    return function() {
                        this._applyWithArgs("keyword", k);
                        return [ k + "Stmt" ];
                    }.call(this);
                });
            }.call(this);
        },
        stmtEnd: function() {
            var $elf = this, _fromIdx = this.input.idx, s, c, s;
            return this._or(function() {
                return function() {
                    s = this._apply("scNoNl");
                    c = function() {
                        switch (this._apply("anything")) {
                          case ";":
                            return ";";
                          case "\n":
                            return "\n";
                          default:
                            throw fail();
                        }
                    }.call(this);
                    return [ "stmtEnd", s, c ];
                }.call(this);
            }, function() {
                return function() {
                    s = this._apply("scNoNl");
                    this._or(function() {
                        return this._lookahead(function() {
                            return this._applyWithArgs("exactly", "}");
                        });
                    }, function() {
                        return this._apply("end");
                    });
                    return [ "stmtEnd", s ];
                }.call(this);
            });
        },
        stmts: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many(function() {
                    return this._apply("stmt");
                });
                return [ "stmts" ].concat(c);
            }.call(this);
        },
        stmts1: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many1(function() {
                    return this._apply("stmt");
                });
                return [ "stmts" ].concat(c);
            }.call(this);
        },
        stmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, c, se, sc2;
            return function() {
                sc1 = this._apply("sc");
                c = this._apply("stmtContent");
                se = this._apply("stmtEnd");
                sc2 = this._apply("sc");
                return [ "stmt", sc1, c, se, sc2 ];
            }.call(this);
        },
        stmtContent: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("funcStmt");
            }, function() {
                return this._apply("block");
            }, function() {
                return this._apply("varStmt");
            }, function() {
                return this._apply("ifStmt");
            }, function() {
                return this._apply("whileStmt");
            }, function() {
                return this._apply("doStmt");
            }, function() {
                return this._apply("forStmt");
            }, function() {
                return this._apply("forInStmt");
            }, function() {
                return this._apply("breakStmt");
            }, function() {
                return this._apply("continueStmt");
            }, function() {
                return this._apply("switchStmt");
            }, function() {
                return this._apply("throwStmt");
            }, function() {
                return this._apply("tryStmt");
            }, function() {
                return this._apply("returnStmt");
            }, function() {
                return this._apply("withStmt");
            }, function() {
                return this._apply("labelStmt");
            }, function() {
                return this._apply("exprStmt");
            }, function() {
                return this._apply("emptyStmt");
            });
        },
        funcStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, n, sc2, c;
            return function() {
                this._applyWithArgs("keyword", "function");
                sc1 = this._apply("sc");
                n = this._apply("name");
                sc2 = this._apply("sc");
                c = this._apply("funcRest");
                return [ "funcStmt", sc1, n, sc2 ].concat(c);
            }.call(this);
        },
        varStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("keyword", "var");
                c = this._apply("varItems");
                return [ "varStmt", c ];
            }.call(this);
        },
        varItems: function() {
            var $elf = this, _fromIdx = this.input.idx, x, sc1, xs, x;
            return this._or(function() {
                return function() {
                    x = this._apply("varItem");
                    sc1 = this._apply("sc");
                    this._applyWithArgs("exactly", ",");
                    xs = this._apply("varItems");
                    return function() {
                        x[x["length"] - 1] = sc1;
                        return [ x ].concat(xs);
                    }.call(this);
                }.call(this);
            }, function() {
                return function() {
                    x = this._apply("varItem");
                    return function() {
                        x[x["length"] - 1] = [ "spacesAndComments", [] ];
                        return [ x ];
                    }.call(this);
                }.call(this);
            });
        },
        varItem: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("varItemAsgn");
            }, function() {
                return this._apply("varItemName");
            });
        },
        varItemAsgn: function() {
            var $elf = this, _fromIdx = this.input.idx, n, sc1, sc2, e;
            return function() {
                n = this._apply("varItemName");
                sc1 = this._apply("sc");
                this._applyWithArgs("exactly", "=");
                sc2 = this._apply("sc");
                e = this._apply("asgnExpr");
                return [ "varItemAsgn", n, sc1, sc2, e, [ "spacesAndComments", [] ] ];
            }.call(this);
        },
        varItemName: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, n;
            return function() {
                sc1 = this._apply("sc");
                n = this._apply("name");
                return [ "varItemName", sc1, n, [ "spacesAndComments", [] ] ];
            }.call(this);
        },
        ifStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, i, sc1, sc2, c;
            return this._or(function() {
                return function() {
                    i = this._applyWithArgs("stmtWithExprAndStmt", "if");
                    sc1 = this._apply("sc");
                    this._applyWithArgs("keyword", "else");
                    sc2 = this._apply("sc");
                    c = this._apply("stmtContent");
                    return i.concat([ sc1, sc2, c ]);
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
            var $elf = this, _fromIdx = this.input.idx, d, sc1, sc2, be;
            return function() {
                d = this._applyWithArgs("stmtWithBlockStmt", "do");
                sc1 = this._apply("sc");
                this._applyWithArgs("keyword", "while");
                sc2 = this._apply("sc");
                be = this._apply("bracketedExpr");
                return d.concat([ sc1, sc2, be ]);
            }.call(this);
        },
        forStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2, c;
            return function() {
                this._applyWithArgs("keyword", "for");
                sc1 = this._apply("sc");
                e = this._apply("forStmtExprs");
                sc2 = this._apply("sc");
                c = this._apply("block");
                return [ "forStmt", sc1, e, sc2, c ];
            }.call(this);
        },
        forStmtExprs: function() {
            var $elf = this, _fromIdx = this.input.idx, e1, e2, e3;
            return function() {
                this._applyWithArgs("exactly", "(");
                e1 = this._or(function() {
                    return this._apply("forStmtExpr1");
                }, function() {
                    return this._apply("forStmtExpr");
                });
                this._applyWithArgs("exactly", ";");
                e2 = this._apply("forStmtExpr");
                this._applyWithArgs("exactly", ";");
                e3 = this._apply("forStmtExpr");
                this._applyWithArgs("exactly", ")");
                return [ e1, e2, e3 ];
            }.call(this);
        },
        forStmtExpr1: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, c, sc2;
            return function() {
                sc1 = this._apply("sc");
                c = this._apply("varStmt");
                sc2 = this._apply("sc");
                return [ "forStmtExpr", sc1, c, sc2 ];
            }.call(this);
        },
        forStmtExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, c, sc2, sc1;
            return this._or(function() {
                return function() {
                    sc1 = this._apply("sc");
                    c = this._apply("expr");
                    sc2 = this._apply("sc");
                    return [ "forStmtExpr", sc1, c, sc2 ];
                }.call(this);
            }, function() {
                return function() {
                    sc1 = this._apply("sc");
                    return [ "forStmtExpr", sc1 ];
                }.call(this);
            });
        },
        forInStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2, c;
            return function() {
                this._applyWithArgs("keyword", "for");
                sc1 = this._apply("sc");
                e = this._apply("forInStmtExpr");
                sc2 = this._apply("sc");
                c = this._apply("block");
                return [ "forInStmt", sc1, e, sc2, c ];
            }.call(this);
        },
        forInStmtExpr: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e1, sc2, sc3, e2, sc4;
            return function() {
                this._applyWithArgs("exactly", "(");
                sc1 = this._apply("sc");
                e1 = this._or(function() {
                    return this._apply("forInStmtVar");
                }, function() {
                    return this._apply("name");
                });
                sc2 = this._apply("sc");
                this._applyWithArgs("keyword", "in");
                sc3 = this._apply("sc");
                e2 = this._apply("asgnExpr");
                sc4 = this._apply("sc");
                this._applyWithArgs("exactly", ")");
                return [ sc1, e1, sc2, sc3, e2, sc4 ];
            }.call(this);
        },
        forInStmtVar: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("keyword", "var");
                c = this._apply("varItemName");
                return [ "varStmt", [ c ] ];
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
            var $elf = this, _fromIdx = this.input.idx, sc1, be, sc2, c;
            return function() {
                this._applyWithArgs("keyword", "switch");
                sc1 = this._apply("sc");
                be = this._apply("bracketedExpr");
                sc2 = this._apply("sc");
                c = this._apply("switchStmtContent");
                return [ "switchStmt", sc1, be, sc2, c ];
            }.call(this);
        },
        switchStmtContent: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "{");
                c = this._many(function() {
                    return this._apply("switchStmtItem");
                });
                this._applyWithArgs("exactly", "}");
                return [ "switchStmtContent", c ];
            }.call(this);
        },
        switchStmtItem: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, l, sc2, sc3, c;
            return function() {
                sc1 = this._apply("sc");
                l = this._or(function() {
                    return this._apply("switchStmtCase");
                }, function() {
                    return this._apply("switchStmtDefault");
                });
                sc2 = this._apply("sc");
                this._applyWithArgs("exactly", ":");
                sc3 = this._apply("sc");
                c = this._apply("stmts");
                return [ "switchStmtItem", sc1, l, sc2, sc3, c ];
            }.call(this);
        },
        switchStmtCase: function() {
            var $elf = this, _fromIdx = this.input.idx, s, e;
            return function() {
                this._applyWithArgs("keyword", "case");
                s = this._apply("sc");
                e = this._apply("expr");
                return [ "switchStmtCase", s, e ];
            }.call(this);
        },
        switchStmtDefault: function() {
            var $elf = this, _fromIdx = this.input.idx, s;
            return function() {
                this._applyWithArgs("keyword", "default");
                s = this._apply("sc");
                return [ "switchStmtDefault", s ];
            }.call(this);
        },
        throwStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2;
            return function() {
                this._applyWithArgs("keyword", "throw");
                sc1 = this._apply("sc");
                e = this._apply("expr");
                sc2 = this._apply("sc");
                return [ "throwStmt", sc1, e, sc2 ];
            }.call(this);
        },
        tryStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, t, sc1, c, sc2, f, sc3, t, sc1, c;
            return this._or(function() {
                return function() {
                    t = this._applyWithArgs("stmtWithBlockStmt", "try");
                    sc1 = this._apply("sc");
                    c = this._apply("tryStmtCatch");
                    sc2 = this._apply("sc");
                    f = this._apply("tryStmtFinally");
                    sc3 = this._apply("sc");
                    return t.concat([ sc1, c, sc2, f, sc3 ]);
                }.call(this);
            }, function() {
                return function() {
                    t = this._applyWithArgs("stmtWithBlockStmt", "try");
                    sc1 = this._apply("sc");
                    c = this._apply("tryStmtCatch");
                    return t.concat([ sc1, c ]);
                }.call(this);
            });
        },
        tryStmtCatch: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, sc2, n, sc3, sc4, c;
            return function() {
                this._applyWithArgs("keyword", "catch");
                sc1 = this._apply("sc");
                this._applyWithArgs("exactly", "(");
                sc2 = this._apply("sc");
                n = this._apply("name");
                sc3 = this._apply("sc");
                this._applyWithArgs("exactly", ")");
                sc4 = this._apply("sc");
                c = this._apply("block");
                return [ "tryStmtCatch", sc1, [ "bracketedExpr", sc2, n, sc3 ], sc4, c ];
            }.call(this);
        },
        tryStmtFinally: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, c;
            return function() {
                this._applyWithArgs("keyword", "finally");
                sc1 = this._apply("sc");
                c = this._apply("block");
                return [ "tryStmtFinally", sc1, c ];
            }.call(this);
        },
        returnStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, sc1, e, sc2;
            return function() {
                this._applyWithArgs("keyword", "return");
                this._opt(function() {
                    return function() {
                        sc1 = this._apply("scNoNl");
                        return e = this._apply("expr");
                    }.call(this);
                });
                sc2 = this._apply("scNoNl");
                return [ "returnStmt" ].concat((e ? [ sc1, e ] : []).concat([ sc2 ]));
            }.call(this);
        },
        withStmt: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("stmtWithExprAndStmt", "with");
        },
        labelStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, l, sc1, sc2, c;
            return function() {
                l = this._apply("name");
                sc1 = this._apply("sc");
                this._applyWithArgs("exactly", ":");
                sc2 = this._apply("sc");
                c = this._apply("stmtContent");
                return [ "labelStmt", l, sc1, sc2, c ];
            }.call(this);
        },
        exprStmt: function() {
            var $elf = this, _fromIdx = this.input.idx, e;
            return function() {
                e = this._apply("expr");
                return [ "exprStmt", e ];
            }.call(this);
        },
        emptyStmt: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", ";");
                return [ "emptyStmt" ];
            }.call(this);
        },
        topLevel: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._form(function() {
                    return c = this._or(function() {
                        return this._apply("stmts1");
                    }, function() {
                        return this._apply("sc");
                    });
                });
                return c;
            }.call(this);
        }
    });
    KrasotaJSParser["hexDigits"] = "0123456789abcdef";
    KrasotaJSParser["_isKeyword"] = function(ks, k) {
        var keywords = {};
        while (k = ks.shift()) {
            keywords[k] = true;
        }
        return function(k) {
            return keywords.hasOwnProperty(k);
        };
    }([ "break", "case", "catch", "continue", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with" ]);
}