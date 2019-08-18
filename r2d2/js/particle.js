(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.Particle = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _keys = require("babel-runtime/core-js/object/keys"),
                _keys2 = _interopRequireDefault(_keys),
                _slicedToArray2 = require("babel-runtime/helpers/slicedToArray"),
                _slicedToArray3 = _interopRequireDefault(_slicedToArray2),
                _entries = require("babel-runtime/core-js/object/entries"),
                _entries2 = _interopRequireDefault(_entries),
                _getIterator2 = require("babel-runtime/core-js/get-iterator"),
                _getIterator3 = _interopRequireDefault(_getIterator2),
                _assign = require("babel-runtime/core-js/object/assign"),
                _assign2 = _interopRequireDefault(_assign),
                _promise = require("babel-runtime/core-js/promise"),
                _promise2 = _interopRequireDefault(_promise),
                _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
                _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
                _createClass2 = require("babel-runtime/helpers/createClass"),
                _createClass3 = _interopRequireDefault(_createClass2),
                _superagent = require("superagent"),
                _superagent2 = _interopRequireDefault(_superagent),
                _superagentPrefix = require("superagent-prefix"),
                _superagentPrefix2 = _interopRequireDefault(_superagentPrefix),
                Agent = function() {
                    function e(t) {
                        (0, _classCallCheck3.default)(this, e), this.prefix = (0, _superagentPrefix2.default)(t)
                    }
                    return (0, _createClass3.default)(e, [{
                        key: "get",
                        value: function(e, t, r, a) {
                            return this.request({
                                uri: e,
                                auth: t,
                                method: "get",
                                query: r,
                                context: a
                            })
                        }
                    }, {
                        key: "head",
                        value: function(e, t, r, a) {
                            return this.request({
                                uri: e,
                                auth: t,
                                method: "head",
                                query: r,
                                context: a
                            })
                        }
                    }, {
                        key: "post",
                        value: function(e, t, r, a) {
                            return this.request({
                                uri: e,
                                data: t,
                                auth: r,
                                method: "post",
                                context: a
                            })
                        }
                    }, {
                        key: "put",
                        value: function(e, t, r, a) {
                            return this.request({
                                uri: e,
                                data: t,
                                auth: r,
                                method: "put",
                                context: a
                            })
                        }
                    }, {
                        key: "delete",
                        value: function(e, t, r, a) {
                            return this.request({
                                uri: e,
                                data: t,
                                auth: r,
                                method: "delete",
                                context: a
                            })
                        }
                    }, {
                        key: "request",
                        value: function(e) {
                            var t = e.uri,
                                r = e.method,
                                a = e.data,
                                i = void 0 === a ? void 0 : a,
                                o = e.auth,
                                u = e.query,
                                n = void 0 === u ? void 0 : u,
                                s = e.form,
                                l = void 0 === s ? void 0 : s,
                                d = e.files,
                                f = void 0 === d ? void 0 : d,
                                c = e.context,
                                _ = void 0 === c ? void 0 : c,
                                h = this._sanitizeFiles(f);
                            return this._request({
                                uri: t,
                                method: r,
                                data: i,
                                auth: o,
                                query: n,
                                form: l,
                                context: _,
                                files: h
                            })
                        }
                    }, {
                        key: "_request",
                        value: function(e) {
                            var t = e.uri,
                                r = e.method,
                                a = e.data,
                                i = e.auth,
                                o = e.query,
                                u = e.form,
                                n = e.files,
                                s = e.context,
                                l = this._buildRequest({
                                    uri: t,
                                    method: r,
                                    data: a,
                                    auth: i,
                                    query: o,
                                    form: u,
                                    context: s,
                                    files: n
                                });
                            return this._promiseResponse(l)
                        }
                    }, {
                        key: "_promiseResponse",
                        value: function(e) {
                            var t = this;
                            return new _promise2.default(function(r, a) {
                                return t._sendRequest(e, r, a)
                            })
                        }
                    }, {
                        key: "_sendRequest",
                        value: function(e, t, r) {
                            e.end(function(a, i) {
                                var o = i && i.body;
                                if (a) {
                                    var u = e.url,
                                        n = a.status,
                                        s = (n ? "HTTP error " + n : "Network error") + " from " + u,
                                        l = void 0;
                                    o && o.error_description && (s += " - " + o.error_description, l = o.error_description);
                                    var d = new Error(s);
                                    (0, _assign2.default)(d, {
                                        statusCode: n,
                                        errorDescription: s,
                                        shortErrorDescription: l,
                                        error: a,
                                        body: o
                                    }), r(d)
                                } else t({
                                    body: o,
                                    statusCode: i.statusCode
                                })
                            })
                        }
                    }, {
                        key: "_buildRequest",
                        value: function(e) {
                            var t = e.uri,
                                r = e.method,
                                a = e.data,
                                i = e.auth,
                                o = e.query,
                                u = e.form,
                                n = e.files,
                                s = e.context,
                                l = e.makerequest,
                                d = void 0 === l ? _superagent2.default : l,
                                f = d(r, t);
                            if (this.prefix && f.use(this.prefix), this._authorizationHeader(f, i), s && this._applyContext(f, s), o && f.query(o), n) {
                                var c = !0,
                                    _ = !1,
                                    h = void 0;
                                try {
                                    for (var p, v = (0, _getIterator3.default)((0, _entries2.default)(n)); !(c = (p = v.next()).done); c = !0) {
                                        var y = (0, _slicedToArray3.default)(p.value, 2),
                                            m = y[0],
                                            q = y[1],
                                            k = {
                                                filepath: q.path
                                            };
                                        this._inBrowser(d) && (k = q.path), f.attach(m, q.data, k)
                                    }
                                } catch (e) {
                                    _ = !0, h = e
                                } finally {
                                    try {
                                        !c && v.return && v.return()
                                    } finally {
                                        if (_) throw h
                                    }
                                }
                                if (u) {
                                    var x = !0,
                                        b = !1,
                                        g = void 0;
                                    try {
                                        for (var C, R = (0, _getIterator3.default)((0, _entries2.default)(u)); !(x = (C = R.next()).done); x = !0) {
                                            var j = (0, _slicedToArray3.default)(C.value, 2),
                                                m = j[0],
                                                P = j[1];
                                            f.field(m, P)
                                        }
                                    } catch (e) {
                                        b = !0, g = e
                                    } finally {
                                        try {
                                            !x && R.return && R.return()
                                        } finally {
                                            if (b) throw g
                                        }
                                    }
                                }
                            } else u ? (f.type("form"), f.send(u)) : a && f.send(a);
                            return f
                        }
                    }, {
                        key: "_inBrowser",
                        value: function(e) {
                            return !!e.getXHR
                        }
                    }, {
                        key: "_applyContext",
                        value: function(e, t) {
                            t.tool && this._addToolContext(e, t.tool), t.project && this._addProjectContext(e, t.project)
                        }
                    }, {
                        key: "_addToolContext",
                        value: function(e, t) {
                            var r = "";
                            if (t.name && (r += this._toolIdent(t), t.components)) {
                                var a = !0,
                                    i = !1,
                                    o = void 0;
                                try {
                                    for (var u, n = (0, _getIterator3.default)(t.components); !(a = (u = n.next()).done); a = !0) {
                                        var s = u.value;
                                        r += ", " + this._toolIdent(s)
                                    }
                                } catch (e) {
                                    i = !0, o = e
                                } finally {
                                    try {
                                        !a && n.return && n.return()
                                    } finally {
                                        if (i) throw o
                                    }
                                }
                            }
                            r && e.set("X-Particle-Tool", r)
                        }
                    }, {
                        key: "_toolIdent",
                        value: function(e) {
                            return this._nameAtVersion(e.name, e.version)
                        }
                    }, {
                        key: "_nameAtVersion",
                        value: function(e, t) {
                            var r = "";
                            return e && (r += e, t && (r += "@" + t)), r
                        }
                    }, {
                        key: "_addProjectContext",
                        value: function(e, t) {
                            var r = this._buildSemicolonSeparatedProperties(t, "name");
                            r && e.set("X-Particle-Project", r)
                        }
                    }, {
                        key: "_buildSemicolonSeparatedProperties",
                        value: function(e, t) {
                            var r = "";
                            if (e[t]) {
                                r += e[t];
                                for (var a in e) a !== t && e.hasOwnProperty(a) && (r += "; " + a + "=" + e[a])
                            }
                            return r
                        }
                    }, {
                        key: "_authorizationHeader",
                        value: function(e, t) {
                            return t && (void 0 !== t.username ? e.auth(t.username, t.password) : e.set({
                                Authorization: "Bearer " + t
                            })), e
                        }
                    }, {
                        key: "_sanitizeFiles",
                        value: function(e) {
                            var t = void 0;
                            return e && (t = {}, (0, _keys2.default)(e).forEach(function(r, a) {
                                t[a ? "file" + (a + 1) : "file"] = {
                                    data: e[r],
                                    path: r
                                }
                            })), t
                        }
                    }]), e
                }();
            exports.default = Agent, module.exports = exports.default;
        }, {
            "babel-runtime/core-js/get-iterator": 8,
            "babel-runtime/core-js/object/assign": 11,
            "babel-runtime/core-js/object/entries": 14,
            "babel-runtime/core-js/object/keys": 16,
            "babel-runtime/core-js/promise": 18,
            "babel-runtime/helpers/classCallCheck": 21,
            "babel-runtime/helpers/createClass": 22,
            "babel-runtime/helpers/slicedToArray": 25,
            "superagent": 173,
            "superagent-prefix": 172
        }],
        2: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _getIterator2 = require("babel-runtime/core-js/get-iterator"),
                _getIterator3 = _interopRequireDefault(_getIterator2),
                _assign = require("babel-runtime/core-js/object/assign"),
                _assign2 = _interopRequireDefault(_assign),
                _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
                _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
                _createClass2 = require("babel-runtime/helpers/createClass"),
                _createClass3 = _interopRequireDefault(_createClass2),
                _Particle = require("./Particle"),
                _Particle2 = _interopRequireDefault(_Particle),
                _Library = require("./Library"),
                _Library2 = _interopRequireDefault(_Library),
                Client = function() {
                    function e(t) {
                        var r = t.auth,
                            a = t.api,
                            i = void 0 === a ? new _Particle2.default : a;
                        (0, _classCallCheck3.default)(this, e), (0, _assign2.default)(this, {
                            auth: r,
                            api: i
                        })
                    }
                    return (0, _createClass3.default)(e, [{
                        key: "ready",
                        value: function() {
                            return Boolean(this.auth)
                        }
                    }, {
                        key: "libraries",
                        value: function() {
                            var e = this,
                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return this.api.listLibraries((0, _assign2.default)({}, t, {
                                auth: this.auth
                            })).then(function(t) {
                                return (t.body.data || []).map(function(t) {
                                    return new _Library2.default(e, t)
                                })
                            })
                        }
                    }, {
                        key: "library",
                        value: function(e) {
                            var t = this,
                                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return this.api.getLibrary((0, _assign2.default)({}, r, {
                                name: e,
                                auth: this.auth
                            })).then(function(e) {
                                var r = e.body.data || {};
                                return new _Library2.default(t, r)
                            })
                        }
                    }, {
                        key: "libraryVersions",
                        value: function(e) {
                            var t = this,
                                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return this.api.getLibraryVersions((0, _assign2.default)({}, r, {
                                name: e,
                                auth: this.auth
                            })).then(function(e) {
                                return (e.body.data || []).map(function(e) {
                                    return new _Library2.default(t, e)
                                })
                            })
                        }
                    }, {
                        key: "contributeLibrary",
                        value: function(e) {
                            var t = this;
                            return this.api.contributeLibrary({
                                archive: e,
                                auth: this.auth
                            }).then(function(e) {
                                var r = e.body.data || {};
                                return new _Library2.default(t, r)
                            }, function(e) {
                                t._throwError(e)
                            })
                        }
                    }, {
                        key: "publishLibrary",
                        value: function(e) {
                            var t = this;
                            return this.api.publishLibrary({
                                name: e,
                                auth: this.auth
                            }).then(function(e) {
                                var r = e.body.data || {};
                                return new _Library2.default(t, r)
                            }, function(e) {
                                t._throwError(e)
                            })
                        }
                    }, {
                        key: "deleteLibrary",
                        value: function(e) {
                            var t = this,
                                r = e.name,
                                a = (e.version, e.force);
                            return this.api.deleteLibrary({
                                name: r,
                                force: a,
                                auth: this.auth
                            }).then(function(e) {
                                return !0
                            }, function(e) {
                                t._throwError(e)
                            })
                        }
                    }, {
                        key: "_throwError",
                        value: function(e) {
                            if (e.body && e.body.errors) {
                                var t = e.body.errors.map(function(e) {
                                    return e.message
                                }).join("\n");
                                throw new Error(t)
                            }
                            throw e
                        }
                    }, {
                        key: "downloadFile",
                        value: function(e) {
                            return this.api.downloadFile({
                                url: e
                            })
                        }
                    }, {
                        key: "compileCode",
                        value: function(e, t, r) {
                            return this.api.compileCode({
                                files: e,
                                platformId: t,
                                targetVersion: r,
                                auth: this.auth
                            })
                        }
                    }, {
                        key: "signalDevice",
                        value: function(e) {
                            var t = e.signal,
                                r = e.deviceId;
                            return this.api.signalDevice({
                                signal: t,
                                deviceId: r,
                                auth: this.auth
                            })
                        }
                    }, {
                        key: "listDevices",
                        value: function() {
                            return this.api.listDevices({
                                auth: this.auth
                            })
                        }
                    }, {
                        key: "listBuildTargets",
                        value: function() {
                            return this.api.listBuildTargets({
                                onlyFeatured: !0,
                                auth: this.auth
                            }).then(function(e) {
                                var t = [],
                                    r = !0,
                                    a = !1,
                                    i = void 0;
                                try {
                                    for (var n, u = (0, _getIterator3.default)(e.body.targets); !(r = (n = u.next()).done); r = !0) {
                                        var l = n.value,
                                            o = !0,
                                            s = !1,
                                            h = void 0;
                                        try {
                                            for (var c, f = (0, _getIterator3.default)(l.platforms); !(o = (c = f.next()).done); o = !0) {
                                                var d = c.value;
                                                t.push({
                                                    version: l.version,
                                                    platform: d,
                                                    prerelease: l.prereleases.indexOf(d) > -1,
                                                    firmware_vendor: l.firmware_vendor
                                                })
                                            }
                                        } catch (e) {
                                            s = !0, h = e
                                        } finally {
                                            try {
                                                !o && f.return && f.return()
                                            } finally {
                                                if (s) throw h
                                            }
                                        }
                                    }
                                } catch (e) {
                                    a = !0, i = e
                                } finally {
                                    try {
                                        !r && u.return && u.return()
                                    } finally {
                                        if (a) throw i
                                    }
                                }
                                return t
                            }, function(e) {})
                        }
                    }, {
                        key: "trackingIdentity",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.full,
                                r = void 0 !== t && t,
                                a = e.context;
                            return this.api.trackingIdentity({
                                full: r,
                                context: a,
                                auth: this.auth
                            }).then(function(e) {
                                return e.body
                            })
                        }
                    }]), e
                }();
            exports.default = Client, module.exports = exports.default;
        }, {
            "./Library": 5,
            "./Particle": 6,
            "babel-runtime/core-js/get-iterator": 8,
            "babel-runtime/core-js/object/assign": 11,
            "babel-runtime/helpers/classCallCheck": 21,
            "babel-runtime/helpers/createClass": 22
        }],
        3: [function(require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.default = {
                baseUrl: "https://api.particle.io",
                clientSecret: "particle-api",
                clientId: "particle-api",
                tokenDuration: 7776e3
            }, module.exports = exports.default;
        }, {}],
        4: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _isNan = require("babel-runtime/core-js/number/is-nan"),
                _isNan2 = _interopRequireDefault(_isNan),
                _promise = require("babel-runtime/core-js/promise"),
                _promise2 = _interopRequireDefault(_promise),
                _assign = require("babel-runtime/core-js/object/assign"),
                _assign2 = _interopRequireDefault(_assign),
                _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of"),
                _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf),
                _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
                _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
                _createClass2 = require("babel-runtime/helpers/createClass"),
                _createClass3 = _interopRequireDefault(_createClass2),
                _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn"),
                _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2),
                _inherits2 = require("babel-runtime/helpers/inherits"),
                _inherits3 = _interopRequireDefault(_inherits2),
                _http = require("http"),
                _http2 = _interopRequireDefault(_http),
                _https = require("https"),
                _https2 = _interopRequireDefault(_https),
                _url = require("url"),
                _url2 = _interopRequireDefault(_url),
                _events = require("events"),
                EventStream = function(e) {
                    function t(e, r, i) {
                        (0, _classCallCheck3.default)(this, t);
                        var s = (0, _possibleConstructorReturn3.default)(this, (t.__proto__ || (0, _getPrototypeOf2.default)(t)).call(this));
                        return s.uri = e, s.token = r, s.reconnectInterval = 2e3, (0, _assign2.default)(s, i), s
                    }
                    return (0, _inherits3.default)(t, e), (0, _createClass3.default)(t, [{
                        key: "connect",
                        value: function() {
                            var e = this;
                            return new _promise2.default(function(t, r) {
                                var i = _url2.default.parse(e.uri),
                                    s = i.hostname,
                                    n = i.protocol,
                                    a = i.port,
                                    o = i.path;
                                e.origin = n + "//" + s + (a ? ":" + a : "");
                                var u = "https:" === n,
                                    l = u ? _https2.default : _http2.default,
                                    h = l.request({
                                        hostname: s,
                                        protocol: n,
                                        path: o + "?history_limit=30&access_token=" + e.token,
                                        method: "get",
                                        port: a || (u ? 443 : 80),
                                        avoidFetch: !0,
                                        mode: "prefer-streaming"
                                    });
                                e.req = h, e.debug && e.debug(e), h.on("error", function(t) {
                                    r({
                                        error: t,
                                        errorDescription: "Network error from " + e.uri
                                    })
                                }), h.on("response", function(i) {
                                    var s = i.statusCode;
                                    if (200 !== s) {
                                        var n = "";
                                        return i.on("data", function(e) {
                                            return n += e
                                        }), void i.on("end", function() {
                                            try {
                                                n = JSON.parse(n)
                                            } catch (e) {} finally {
                                                e.emit("response", {
                                                    statusCode: s,
                                                    body: n
                                                });
                                                var t = "HTTP error " + s + " from " + e.uri;
                                                n && n.error_description && (t += " - " + n.error_description), r({
                                                    statusCode: s,
                                                    errorDescription: t,
                                                    body: n
                                                }), e.req = void 0
                                            }
                                        })
                                    }
                                    e.data = "", e.buf = "", e.eventName, e.lastEventId, i.on("data", e.parse.bind(e)), i.once("end", e.end.bind(e)), t(e)
                                }), h.end()
                            })
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            this.req && (this.req.abort(), this.req = void 0), this.removeAllListeners()
                        }
                    }, {
                        key: "end",
                        value: function() {
                            var e = this;
                            this.req && (this.req = void 0, setTimeout(function() {
                                e.connect().catch(function(t) {
                                    e.emit("error", t), e.removeAllListeners()
                                })
                            }, this.reconnectInterval))
                        }
                    }, {
                        key: "parse",
                        value: function(e) {
                            this.buf += e;
                            for (var t = 0, r = this.buf.length, i = !1; t < r;) {
                                i && ("\n" === this.buf[t] && ++t, i = !1);
                                for (var s = -1, n = -1, a = t; s < 0 && a < r; ++a) {
                                    var o = this.buf[a];
                                    ":" === o ? n < 0 && (n = a - t) : "\r" === o ? (i = !0, s = a - t) : "\n" === o && (s = a - t)
                                }
                                if (s < 0) break;
                                this.parseEventStreamLine(t, n, s), t += s + 1
                            }
                            t === r ? this.buf = "" : t > 0 && (this.buf = this.buf.slice(t))
                        }
                    }, {
                        key: "parseEventStreamLine",
                        value: function(e, t, r) {
                            if (0 === r) try {
                                if (this.data.length > 0 && this.event) {
                                    var i = JSON.parse(this.data);
                                    i.name = this.eventName || "", "event" !== this.eventName && this.emit(this.eventName, i), this.emit("event", i), this.data = ""
                                }
                                this.eventName = void 0, this.event = !1
                            } catch (e) {} else if (t > 0) {
                                var s = this.buf.slice(e, e + t),
                                    n = 0;
                                n = " " !== this.buf[e + t + 1] ? t + 1 : t + 2, e += n;
                                var a = r - n,
                                    o = this.buf.slice(e, e + a);
                                if ("data" === s) this.data += o + "\n";
                                else if ("event" === s) this.eventName = o, this.event = !0;
                                else if ("id" === s) this.lastEventId = o;
                                else if ("retry" === s) {
                                    var u = parseInt(o, 10);
                                    (0, _isNan2.default)(u) || (this.reconnectInterval = u)
                                }
                            }
                        }
                    }]), t
                }(_events.EventEmitter);
            exports.default = EventStream, module.exports = exports.default;
        }, {
            "babel-runtime/core-js/number/is-nan": 10,
            "babel-runtime/core-js/object/assign": 11,
            "babel-runtime/core-js/object/get-prototype-of": 15,
            "babel-runtime/core-js/promise": 18,
            "babel-runtime/helpers/classCallCheck": 21,
            "babel-runtime/helpers/createClass": 22,
            "babel-runtime/helpers/inherits": 23,
            "babel-runtime/helpers/possibleConstructorReturn": 24,
            "events": 141,
            "http": 167,
            "https": 167,
            "url": 180
        }],
        5: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _promise = require("babel-runtime/core-js/promise"),
                _promise2 = _interopRequireDefault(_promise),
                _assign = require("babel-runtime/core-js/object/assign"),
                _assign2 = _interopRequireDefault(_assign),
                _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
                _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
                _createClass2 = require("babel-runtime/helpers/createClass"),
                _createClass3 = _interopRequireDefault(_createClass2),
                Library = function() {
                    function e(r, t) {
                        (0, _classCallCheck3.default)(this, e), Object.defineProperty(this, "client", {
                            value: r
                        }), this._assignAttributes(t), this.downloadUrl = t.links && t.links.download
                    }
                    return (0, _createClass3.default)(e, [{
                        key: "_assignAttributes",
                        value: function(e) {
                            (0, _assign2.default)(this, e.attributes)
                        }
                    }, {
                        key: "download",
                        value: function() {
                            return this.downloadUrl ? this.client.downloadFile(this.downloadUrl) : _promise2.default.reject(new Error("No download URL for this library"))
                        }
                    }]), e
                }();
            exports.default = Library, module.exports = exports.default;
        }, {
            "babel-runtime/core-js/object/assign": 11,
            "babel-runtime/core-js/promise": 18,
            "babel-runtime/helpers/classCallCheck": 21,
            "babel-runtime/helpers/createClass": 22
        }],
        6: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _assign = require("babel-runtime/core-js/object/assign"),
                _assign2 = _interopRequireDefault(_assign),
                _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
                _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
                _createClass2 = require("babel-runtime/helpers/createClass"),
                _createClass3 = _interopRequireDefault(_createClass2),
                _superagent = require("superagent"),
                _superagent2 = _interopRequireDefault(_superagent),
                _superagentBinaryParser = require("./superagent-binary-parser"),
                _superagentBinaryParser2 = _interopRequireDefault(_superagentBinaryParser),
                _Defaults = require("./Defaults"),
                _Defaults2 = _interopRequireDefault(_Defaults),
                _EventStream = require("./EventStream"),
                _EventStream2 = _interopRequireDefault(_EventStream),
                _Agent = require("./Agent"),
                _Agent2 = _interopRequireDefault(_Agent),
                _Client = require("./Client"),
                _Client2 = _interopRequireDefault(_Client),
                Particle = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        (0, _classCallCheck3.default)(this, e), (0, _assign2.default)(this, _Defaults2.default, t), this.context = {}, this.agent = new _Agent2.default(this.baseUrl)
                    }
                    return (0, _createClass3.default)(e, [{
                        key: "_isValidContext",
                        value: function(e, t) {
                            return ("tool" === e || "project" === e) && void 0 !== t
                        }
                    }, {
                        key: "setContext",
                        value: function(e, t) {
                            if (void 0 !== t) {
                                if (!this._isValidContext(e, t)) throw Error("uknown context name or undefined context: " + e);
                                this.context[e] = t
                            }
                        }
                    }, {
                        key: "_buildContext",
                        value: function(e) {
                            return (0, _assign2.default)(this.context, e)
                        }
                    }, {
                        key: "login",
                        value: function(e) {
                            var t = e.username,
                                r = e.password,
                                i = e.tokenDuration,
                                n = void 0 === i ? this.tokenDuration : i,
                                u = e.context;
                            return this.request({
                                uri: "/oauth/token",
                                form: {
                                    username: t,
                                    password: r,
                                    grant_type: "password",
                                    client_id: this.clientId,
                                    client_secret: this.clientSecret,
                                    expires_in: n
                                },
                                method: "post",
                                context: u
                            })
                        }
                    }, {
                        key: "createCustomer",
                        value: function(e) {
                            var t = e.email,
                                r = e.password,
                                i = e.product,
                                n = e.context,
                                u = "/v1/products/" + i + "/customers";
                            return this.request({
                                uri: u,
                                form: {
                                    email: t,
                                    password: r,
                                    grant_type: "client_credentials",
                                    client_id: this.clientId,
                                    client_secret: this.clientSecret
                                },
                                method: "post",
                                context: n
                            })
                        }
                    }, {
                        key: "loginAsClientOwner",
                        value: function(e) {
                            var t = e.context;
                            return this.request({
                                uri: "/oauth/token",
                                form: {
                                    grant_type: "client_credentials",
                                    client_id: this.clientId,
                                    client_secret: this.clientSecret
                                },
                                method: "post",
                                context: t
                            })
                        }
                    }, {
                        key: "createUser",
                        value: function(e) {
                            var t = e.username,
                                r = e.password,
                                i = e.accountInfo,
                                n = e.context;
                            return this.post("/v1/users", {
                                username: t,
                                password: r,
                                account_info: i
                            }, void 0, n)
                        }
                    }, {
                        key: "verifyUser",
                        value: function(e) {
                            var t = e.token,
                                r = e.context;
                            return this.post("/v1/user/verify", {
                                token: t
                            }, void 0, r)
                        }
                    }, {
                        key: "resetPassword",
                        value: function(e) {
                            var t = e.username,
                                r = e.context;
                            return this.post("/v1/user/password-reset", {
                                username: t
                            }, void 0, r)
                        }
                    }, {
                        key: "deleteAccessToken",
                        value: function(e) {
                            var t = e.username,
                                r = e.password,
                                i = e.token,
                                n = e.context;
                            return this.delete("/v1/access_tokens/" + i, {
                                access_token: i
                            }, {
                                username: t,
                                password: r
                            }, n)
                        }
                    }, {
                        key: "deleteCurrentAccessToken",
                        value: function(e) {
                            var t = e.auth,
                                r = e.context;
                            return this.delete("/v1/access_tokens/current", void 0, t, r)
                        }
                    }, {
                        key: "listAccessTokens",
                        value: function(e) {
                            var t = e.username,
                                r = e.password,
                                i = e.context;
                            return this.get("/v1/access_tokens", {
                                username: t,
                                password: r
                            }, void 0, i)
                        }
                    }, {
                        key: "trackingIdentity",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.auth,
                                r = e.full,
                                i = void 0 !== r && r,
                                n = e.context;
                            return this.get("/v1/user/identify", t, i ? void 0 : {
                                tracking: 1
                            }, n)
                        }
                    }, {
                        key: "listDevices",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.deviceName,
                                i = e.sortAttr,
                                n = e.sortDir,
                                u = e.page,
                                a = e.perPage,
                                o = e.product,
                                s = e.auth,
                                c = e.context,
                                d = o ? "/v1/products/" + o + "/devices" : "/v1/devices",
                                v = o ? {
                                    deviceId: t,
                                    deviceName: r,
                                    sortAttr: i,
                                    sortDir: n,
                                    page: u,
                                    per_page: a
                                } : void 0;
                            return this.get(d, s, v, c)
                        }
                    }, {
                        key: "getDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = this.deviceUri({
                                    deviceId: t,
                                    product: r
                                });
                            return this.get(u, i, void 0, n)
                        }
                    }, {
                        key: "claimDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.requestTransfer,
                                i = e.auth,
                                n = e.context;
                            return this.post("/v1/devices", {
                                id: t,
                                request_transfer: !!r
                            }, i, n)
                        }
                    }, {
                        key: "addDeviceToProduct",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = "/v1/products/" + r + "/devices";
                            return this.post(u, {
                                id: t
                            }, i, n)
                        }
                    }, {
                        key: "removeDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.deny,
                                i = e.product,
                                n = e.auth,
                                u = e.context,
                                a = this.deviceUri({
                                    deviceId: t,
                                    product: i
                                }),
                                o = i ? {
                                    deny: r
                                } : void 0;
                            return this.delete(a, o, n, u)
                        }
                    }, {
                        key: "removeDeviceOwner",
                        value: function(e) {
                            var t = e.deviceId,
                                r = (e.deny, e.product),
                                i = e.auth,
                                n = e.context,
                                u = "/v1/products/" + r + "/devices/" + t + "/owner";
                            return this.delete(u, void 0, i, n)
                        }
                    }, {
                        key: "renameDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.product,
                                n = e.auth,
                                u = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                name: r,
                                product: i,
                                auth: n,
                                context: u
                            })
                        }
                    }, {
                        key: "signalDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.signal,
                                i = e.product,
                                n = e.auth,
                                u = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                signal: r,
                                product: i,
                                auth: n,
                                context: u
                            })
                        }
                    }, {
                        key: "setDeviceNotes",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.notes,
                                i = e.product,
                                n = e.auth,
                                u = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                notes: r,
                                product: i,
                                auth: n,
                                context: u
                            })
                        }
                    }, {
                        key: "markAsDevelopmentDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.development,
                                i = void 0 === r || r,
                                n = e.product,
                                u = e.auth,
                                a = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                development: i,
                                product: n,
                                auth: u,
                                context: a
                            })
                        }
                    }, {
                        key: "lockDeviceProductFirmware",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.desiredFirmwareVersion,
                                i = e.flash,
                                n = e.product,
                                u = e.auth,
                                a = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                desiredFirmwareVersion: r,
                                flash: i,
                                product: n,
                                auth: u,
                                context: a
                            })
                        }
                    }, {
                        key: "unlockDeviceProductFirmware",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.product,
                                i = e.auth,
                                n = e.context;
                            return this.updateDevice({
                                deviceId: t,
                                desiredFirmwareVersion: null,
                                product: r,
                                auth: i,
                                context: n
                            })
                        }
                    }, {
                        key: "updateDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.signal,
                                n = e.notes,
                                u = e.development,
                                a = e.desiredFirmwareVersion,
                                o = e.flash,
                                s = e.product,
                                c = e.auth,
                                d = e.context;
                            i = i ? "1" : "0";
                            var v = this.deviceUri({
                                    deviceId: t,
                                    product: s
                                }),
                                l = s ? {
                                    name: r,
                                    signal: i,
                                    notes: n,
                                    development: u,
                                    desired_firmware_version: a,
                                    flash: o
                                } : {
                                    name: r,
                                    signal: i,
                                    notes: n
                                };
                            return this.put(v, l, c, d)
                        }
                    }, {
                        key: "provisionDevice",
                        value: function(e) {
                            var t = e.productId,
                                r = e.auth,
                                i = e.context;
                            return this.post("/v1/devices", {
                                product_id: t
                            }, r, i)
                        }
                    }, {
                        key: "getClaimCode",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/device_claims" : "/v1/device_claims";
                            return this.post(u, {
                                iccid: t
                            }, i, n)
                        }
                    }, {
                        key: "validatePromoCode",
                        value: function(e) {
                            var t = e.auth,
                                r = e.promoCode,
                                i = e.context;
                            return this.get("/v1/promo_code/" + r, t, void 0, i)
                        }
                    }, {
                        key: "changeProduct",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.productId,
                                i = e.auth,
                                n = e.context;
                            return this.put("/v1/devices/" + t, {
                                product_id: r
                            }, i, n)
                        }
                    }, {
                        key: "getVariable",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.product,
                                n = e.auth,
                                u = e.context,
                                a = i ? "/v1/products/" + i + "/devices/" + t + "/" + r : "/v1/devices/" + t + "/" + r;
                            return this.get(a, n, void 0, u)
                        }
                    }, {
                        key: "flashDevice",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.files,
                                i = e.targetVersion,
                                n = e.auth,
                                u = e.context,
                                a = {};
                            return i ? a.build_target_version = i : a.latest = "true", this.request({
                                uri: "/v1/devices/" + t,
                                files: r,
                                auth: n,
                                form: a,
                                context: u,
                                method: "put"
                            })
                        }
                    }, {
                        key: "flashTinker",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.auth,
                                i = e.context;
                            return console && console.warning && console.warning("Particle.flashTinker is deprecated"), this.put("/v1/devices/" + t, {
                                app: "tinker"
                            }, r, i)
                        }
                    }, {
                        key: "compileCode",
                        value: function(e) {
                            var t = e.files,
                                r = e.platformId,
                                i = e.targetVersion,
                                n = e.auth,
                                u = e.context,
                                a = {
                                    platform_id: r
                                };
                            return i ? a.build_target_version = i : a.latest = "true", this.request({
                                uri: "/v1/binaries",
                                files: t,
                                auth: n,
                                form: a,
                                context: u,
                                method: "post"
                            })
                        }
                    }, {
                        key: "downloadFirmwareBinary",
                        value: function(e) {
                            var t = e.binaryId,
                                r = e.auth,
                                i = (e.context, "/v1/binaries/" + t),
                                n = (0, _superagent2.default)("get", i);
                            return n.use(this.prefix), this.headers(n, r), this.debug && this.debug(n), n
                        }
                    }, {
                        key: "sendPublicKey",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.key,
                                i = e.algorithm,
                                n = e.auth,
                                u = e.context;
                            return this.post("/v1/provisioning/" + t, {
                                deviceID: t,
                                publicKey: "string" == typeof r ? r : r.toString(),
                                filename: "particle-api",
                                order: "manual_" + Date.now(),
                                algorithm: i || "rsa"
                            }, n, u)
                        }
                    }, {
                        key: "callFunction",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.argument,
                                n = e.product,
                                u = e.auth,
                                a = e.context,
                                o = n ? "/v1/products/" + n + "/devices/" + t + "/" + r : "/v1/devices/" + t + "/" + r;
                            return this.post(o, {
                                args: i
                            }, u, a)
                        }
                    }, {
                        key: "getEventStream",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.org,
                                n = e.product,
                                u = e.auth,
                                a = (e.context, "/v1/");
                            return i && (a += "orgs/" + i + "/"), n && (a += "products/" + n + "/"), t && (a += "devices/", "mine" !== t.toLowerCase() && (a += t + "/")), a += "events", r && (a += "/" + encodeURIComponent(r)), new _EventStream2.default("" + this.baseUrl + a, u, {
                                debug: this.debug
                            }).connect()
                        }
                    }, {
                        key: "publishEvent",
                        value: function(e) {
                            var t = e.name,
                                r = e.data,
                                i = e.isPrivate,
                                n = e.product,
                                u = e.auth,
                                a = e.context,
                                o = n ? "/v1/products/" + n + "/events" : "/v1/devices/events",
                                s = {
                                    name: t,
                                    data: r,
                                    private: i
                                };
                            return this.post(o, s, u, a)
                        }
                    }, {
                        key: "createWebhook",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.name,
                                i = e.url,
                                n = e.requestType,
                                u = e.headers,
                                a = e.json,
                                o = e.query,
                                s = e.body,
                                c = e.responseTemplate,
                                d = e.responseTopic,
                                v = e.rejectUnauthorized,
                                l = e.webhookAuth,
                                p = e.noDefaults,
                                h = e.form,
                                f = e.product,
                                m = e.auth,
                                g = e.context;
                            "mine" === t && (t = void 0);
                            var y = f ? "/v1/products/" + f + "/webhooks" : "/v1/webhooks",
                                k = {
                                    event: r,
                                    deviceid: t,
                                    url: i,
                                    requestType: n,
                                    headers: u,
                                    json: a,
                                    query: o,
                                    body: s,
                                    responseTemplate: c,
                                    responseTopic: d,
                                    rejectUnauthorized: v,
                                    auth: l,
                                    noDefaults: p,
                                    form: h
                                };
                            return this.post(y, k, m, g)
                        }
                    }, {
                        key: "deleteWebhook",
                        value: function(e) {
                            var t = e.hookId,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/webhooks/" + t : "/v1/webhooks/" + t;
                            return this.delete(u, void 0, i, n)
                        }
                    }, {
                        key: "listWebhooks",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context,
                                n = t ? "/v1/products/" + t + "/webhooks" : "/v1/webhooks";
                            return this.get(n, r, void 0, i)
                        }
                    }, {
                        key: "createIntegration",
                        value: function(e) {
                            var t = (e.integrationType, e.event),
                                r = e.settings,
                                i = e.deviceId,
                                n = e.product,
                                u = e.auth,
                                a = e.context,
                                o = n ? "/v1/products/" + n + "/integrations" : "/v1/integrations",
                                s = (0, _assign2.default)({
                                    event: t,
                                    deviceid: i
                                }, r);
                            return this.post(o, s, u, a)
                        }
                    }, {
                        key: "editIntegration",
                        value: function(e) {
                            var t = e.integrationId,
                                r = e.event,
                                i = e.settings,
                                n = e.deviceId,
                                u = e.product,
                                a = e.auth,
                                o = e.context,
                                s = u ? "/v1/products/" + u + "/integrations/" + t : "/v1/integrations/" + t,
                                c = (0, _assign2.default)({
                                    event: r,
                                    deviceid: n
                                }, i);
                            return this.put(s, c, a, o)
                        }
                    }, {
                        key: "deleteIntegration",
                        value: function(e) {
                            var t = e.integrationId,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/integrations/" + t : "/v1/integrations/" + t;
                            return this.delete(u, void 0, i, n)
                        }
                    }, {
                        key: "listIntegrations",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context,
                                n = t ? "/v1/products/" + t + "/integrations" : "/v1/integrations";
                            return this.get(n, r, void 0, i)
                        }
                    }, {
                        key: "getUserInfo",
                        value: function(e) {
                            var t = e.auth,
                                r = e.context;
                            return this.get("/v1/user", t, void 0, r)
                        }
                    }, {
                        key: "setUserInfo",
                        value: function(e) {
                            var t = e.stripeToken,
                                r = e.accountInfo,
                                i = e.password,
                                n = e.auth,
                                u = e.context,
                                a = {};
                            return t && (a.stripe_token = t), r && (a.account_info = r), i && (a.password = i), this.put("/v1/user", a, n, u)
                        }
                    }, {
                        key: "listSIMs",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.deviceId,
                                i = e.deviceName,
                                n = e.page,
                                u = e.perPage,
                                a = e.product,
                                o = e.auth,
                                s = e.context,
                                c = a ? "/v1/products/" + a + "/sims" : "/v1/sims",
                                d = a ? {
                                    iccid: t,
                                    deviceId: r,
                                    deviceName: i,
                                    page: n,
                                    per_page: u
                                } : void 0;
                            return this.get(c, o, d, s)
                        }
                    }, {
                        key: "getSIMDataUsage",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/sims/" + t + "/data_usage" : "/v1/sims/" + t + "/data_usage";
                            return this.get(u, i, void 0, n)
                        }
                    }, {
                        key: "getFleetDataUsage",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context;
                            return this.get("/v1/products/" + t + "/sims/data_usage", r, void 0, i)
                        }
                    }, {
                        key: "checkSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.auth,
                                i = e.context;
                            return this.head("/v1/sims/" + t, r, void 0, i)
                        }
                    }, {
                        key: "activateSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.iccids,
                                i = e.country,
                                n = e.promoCode,
                                u = e.product,
                                a = e.auth,
                                o = e.context;
                            r = r || [t];
                            var s = u ? "/v1/products/" + u + "/sims" : "/v1/sims/" + t,
                                c = u ? {
                                    sims: r,
                                    country: i
                                } : {
                                    country: i,
                                    promoCode: n,
                                    action: "activate"
                                },
                                d = u ? "post" : "put";
                            return this.request({
                                uri: s,
                                method: d,
                                data: c,
                                auth: a,
                                context: o
                            })
                        }
                    }, {
                        key: "deactivateSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/sims/" + t : "/v1/sims/" + t,
                                a = {
                                    action: "deactivate"
                                };
                            return this.put(u, a, i, n)
                        }
                    }, {
                        key: "reactivateSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.mbLimit,
                                i = e.product,
                                n = e.auth,
                                u = e.context,
                                a = i ? "/v1/products/" + i + "/sims/" + t : "/v1/sims/" + t,
                                o = {
                                    mb_limit: r,
                                    action: "reactivate"
                                };
                            return this.put(a, o, n, u)
                        }
                    }, {
                        key: "updateSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.mbLimit,
                                i = e.product,
                                n = e.auth,
                                u = e.context,
                                a = i ? "/v1/products/" + i + "/sims/" + t : "/v1/sims/" + t,
                                o = {
                                    mb_limit: r
                                };
                            return this.put(a, o, n, u)
                        }
                    }, {
                        key: "removeSIM",
                        value: function(e) {
                            var t = e.iccid,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/sims/" + t : "/v1/sims/" + t;
                            return this.delete(u, void 0, i, n)
                        }
                    }, {
                        key: "listBuildTargets",
                        value: function(e) {
                            var t = e.onlyFeatured,
                                r = e.auth,
                                i = e.context,
                                n = void 0;
                            return void 0 !== t && (n = {
                                featured: !!t
                            }), this.get("/v1/build_targets", r, n, i)
                        }
                    }, {
                        key: "listLibraries",
                        value: function(e) {
                            var t = e.page,
                                r = e.limit,
                                i = e.filter,
                                n = e.sort,
                                u = e.architectures,
                                a = e.category,
                                o = e.scope,
                                s = e.excludeScopes,
                                c = e.auth,
                                d = e.context;
                            return this.get("/v1/libraries", c, {
                                page: t,
                                filter: i,
                                limit: r,
                                sort: n,
                                architectures: this._asList(u),
                                category: a,
                                scope: o,
                                excludeScopes: this._asList(s)
                            }, d)
                        }
                    }, {
                        key: "_asList",
                        value: function(e) {
                            return Array.isArray(e) ? e.join(",") : e
                        }
                    }, {
                        key: "getLibrary",
                        value: function(e) {
                            var t = e.name,
                                r = e.version,
                                i = e.auth,
                                n = e.context;
                            return this.get("/v1/libraries/" + t, i, {
                                version: r
                            }, n)
                        }
                    }, {
                        key: "getLibraryVersions",
                        value: function(e) {
                            var t = e.name,
                                r = e.page,
                                i = e.limit,
                                n = e.auth,
                                u = e.context;
                            return this.get("/v1/libraries/" + t + "/versions", n, {
                                page: r,
                                limit: i
                            }, u)
                        }
                    }, {
                        key: "contributeLibrary",
                        value: function(e) {
                            var t = e.archive,
                                r = e.auth,
                                i = e.context,
                                n = {
                                    "archive.tar.gz": t
                                };
                            return this.request({
                                uri: "/v1/libraries",
                                files: n,
                                auth: r,
                                context: i,
                                method: "post"
                            })
                        }
                    }, {
                        key: "publishLibrary",
                        value: function(e) {
                            var t = e.name,
                                r = e.auth,
                                i = e.context;
                            return this.request({
                                uri: "/v1/libraries/" + t,
                                auth: r,
                                context: i,
                                method: "patch",
                                data: {
                                    visibility: "public"
                                }
                            })
                        }
                    }, {
                        key: "deleteLibrary",
                        value: function(e) {
                            var t = e.name,
                                r = e.force,
                                i = e.auth,
                                n = e.context;
                            return this.delete("/v1/libraries/" + t, {
                                force: r
                            }, i, n)
                        }
                    }, {
                        key: "downloadFile",
                        value: function(e) {
                            var t = e.url,
                                r = _superagent2.default.get(t);
                            return _superagent2.default.getXHR ? r.responseType && (r = r.responseType("arraybuffer").then(function(e) {
                                return e.body = e.xhr.response, e
                            })) : r = r.buffer(!0).parse(_superagentBinaryParser2.default), r.then(function(e) {
                                return e.body
                            })
                        }
                    }, {
                        key: "listOAuthClients",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context,
                                n = t ? "/v1/products/" + t + "/clients" : "/v1/clients";
                            return this.get(n, r, void 0, i)
                        }
                    }, {
                        key: "createOAuthClient",
                        value: function(e) {
                            var t = e.name,
                                r = e.type,
                                i = e.redirect_uri,
                                n = e.scope,
                                u = e.product,
                                a = e.auth,
                                o = e.context,
                                s = u ? "/v1/products/" + u + "/clients" : "/v1/clients",
                                c = {
                                    name: t,
                                    type: r,
                                    redirect_uri: i,
                                    scope: n
                                };
                            return this.post(s, c, a, o)
                        }
                    }, {
                        key: "updateOAuthClient",
                        value: function(e) {
                            var t = e.clientId,
                                r = e.name,
                                i = e.scope,
                                n = e.product,
                                u = e.auth,
                                a = e.context,
                                o = n ? "/v1/products/" + n + "/clients/" + t : "/v1/clients/" + t,
                                s = {
                                    name: r,
                                    scope: i
                                };
                            return this.put(o, s, u, a)
                        }
                    }, {
                        key: "deleteOAuthClient",
                        value: function(e) {
                            var t = e.clientId,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = r ? "/v1/products/" + r + "/clients/" + t : "/v1/clients/" + t;
                            return this.delete(u, void 0, i, n)
                        }
                    }, {
                        key: "listProducts",
                        value: function(e) {
                            var t = e.auth,
                                r = e.context;
                            return this.get("/v1/products", t, void 0, r)
                        }
                    }, {
                        key: "getProduct",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context;
                            return this.get("/v1/products/" + t, r, void 0, i)
                        }
                    }, {
                        key: "listProductFirmware",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context;
                            return this.get("/v1/products/" + t + "/firmware", r, void 0, i)
                        }
                    }, {
                        key: "uploadProductFirmware",
                        value: function(e) {
                            var t = e.file,
                                r = e.version,
                                i = e.title,
                                n = e.description,
                                u = e.product,
                                a = e.auth,
                                o = e.context;
                            return this.request({
                                uri: "/v1/products/" + u + "/firmware",
                                method: "post",
                                files: {
                                    "firmware.bin": t
                                },
                                form: {
                                    version: r,
                                    title: i,
                                    description: n
                                },
                                context: o,
                                auth: a
                            })
                        }
                    }, {
                        key: "getProductFirmware",
                        value: function(e) {
                            var t = e.version,
                                r = e.product,
                                i = e.auth,
                                n = e.context;
                            return this.get("/v1/products/" + r + "/firmware/" + t, i, void 0, n)
                        }
                    }, {
                        key: "updateProductFirmware",
                        value: function(e) {
                            var t = e.version,
                                r = e.title,
                                i = e.description,
                                n = e.product,
                                u = e.auth,
                                a = e.context,
                                o = "/v1/products/" + n + "/firmware/" + t;
                            return this.put(o, {
                                title: r,
                                description: i
                            }, u, a)
                        }
                    }, {
                        key: "downloadProductFirmware",
                        value: function(e) {
                            var t = e.version,
                                r = e.product,
                                i = e.auth,
                                n = (e.context, "/v1/products/" + r + "/firmware/" + t + "/binary"),
                                u = (0, _superagent2.default)("get", n);
                            return u.use(this.prefix), this.headers(u, i), this.debug && this.debug(u), u
                        }
                    }, {
                        key: "releaseProductFirmware",
                        value: function(e) {
                            var t = e.version,
                                r = e.product,
                                i = e.auth,
                                n = e.context,
                                u = "/v1/products/" + r + "/firmware/release";
                            return this.put(u, {
                                version: t
                            }, i, n)
                        }
                    }, {
                        key: "listTeamMembers",
                        value: function(e) {
                            var t = e.product,
                                r = e.auth,
                                i = e.context;
                            return this.get("/v1/products/" + t + "/team", r, void 0, i)
                        }
                    }, {
                        key: "inviteTeamMember",
                        value: function(e) {
                            var t = e.username,
                                r = e.product,
                                i = e.auth,
                                n = e.context;
                            return this.post("/v1/products/" + r + "/team", {
                                username: t
                            }, i, n)
                        }
                    }, {
                        key: "removeTeamMember",
                        value: function(e) {
                            var t = e.username,
                                r = e.product,
                                i = e.auth,
                                n = e.context;
                            return this.delete("/v1/products/" + r + "/team/" + t, void 0, i, n)
                        }
                    }, {
                        key: "lookupSerialNumber",
                        value: function(e) {
                            var t = e.serialNumber,
                                r = e.auth,
                                i = e.context;
                            return this.get("/v1/serial_numbers/" + t, r, void 0, i)
                        }
                    }, {
                        key: "deviceUri",
                        value: function(e) {
                            var t = e.deviceId,
                                r = e.product;
                            return r ? "/v1/products/" + r + "/devices/" + t : "/v1/devices/" + t
                        }
                    }, {
                        key: "get",
                        value: function(e, t, r, i) {
                            return i = this._buildContext(i), this.agent.get(e, t, r, i)
                        }
                    }, {
                        key: "head",
                        value: function(e, t, r, i) {
                            return i = this._buildContext(i), this.agent.head(e, t, r, i)
                        }
                    }, {
                        key: "post",
                        value: function(e, t, r, i) {
                            return i = this._buildContext(i), this.agent.post(e, t, r, i)
                        }
                    }, {
                        key: "put",
                        value: function(e, t, r, i) {
                            return i = this._buildContext(i), this.agent.put(e, t, r, i)
                        }
                    }, {
                        key: "delete",
                        value: function(e, t, r, i) {
                            return i = this._buildContext(i), this.agent.delete(e, t, r, i)
                        }
                    }, {
                        key: "request",
                        value: function(e) {
                            return e.context = this._buildContext(e.context), this.agent.request(e)
                        }
                    }, {
                        key: "client",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return new _Client2.default((0, _assign2.default)({
                                api: this
                            }, e))
                        }
                    }]), e
                }();
            Particle.prototype.removeAccessToken = Particle.prototype.deleteAccessToken, exports.default = Particle, module.exports = exports.default;
        }, {
            "./Agent": 1,
            "./Client": 2,
            "./Defaults": 3,
            "./EventStream": 4,
            "./superagent-binary-parser": 7,
            "babel-runtime/core-js/object/assign": 11,
            "babel-runtime/helpers/classCallCheck": 21,
            "babel-runtime/helpers/createClass": 22,
            "superagent": 173
        }],
        7: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function binaryParser(e, r) {
                    var t = [];
                    e.on("data", function(e) {
                        return t.push(e)
                    }), e.on("end", function() {
                        return r(null, Buffer.concat(t))
                    })
                }
                Object.defineProperty(exports, "__esModule", {
                    value: !0
                }), exports.default = binaryParser, module.exports = exports.default;
            }).call(this, require("buffer").Buffer)

        }, {
            "buffer": 29
        }],
        8: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/get-iterator"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/get-iterator": 32
        }],
        9: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/is-iterable"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/is-iterable": 33
        }],
        10: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/number/is-nan"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/number/is-nan": 34
        }],
        11: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/assign"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/assign": 35
        }],
        12: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/create"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/create": 36
        }],
        13: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/define-property"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/define-property": 37
        }],
        14: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/entries"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/entries": 38
        }],
        15: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/get-prototype-of"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/get-prototype-of": 39
        }],
        16: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/keys"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/keys": 40
        }],
        17: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/object/set-prototype-of"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/object/set-prototype-of": 41
        }],
        18: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/promise"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/promise": 42
        }],
        19: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/symbol"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/symbol": 43
        }],
        20: [function(require, module, exports) {
            module.exports = {
                default: require("core-js/library/fn/symbol/iterator"),
                __esModule: !0
            };
        }, {
            "core-js/library/fn/symbol/iterator": 44
        }],
        21: [function(require, module, exports) {
            "use strict";
            exports.__esModule = !0, exports.default = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            };
        }, {}],
        22: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            exports.__esModule = !0;
            var _defineProperty = require("../core-js/object/define-property"),
                _defineProperty2 = _interopRequireDefault(_defineProperty);
            exports.default = function() {
                function e(e, r) {
                    for (var t = 0; t < r.length; t++) {
                        var n = r[t];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), (0, _defineProperty2.default)(e, n.key, n)
                    }
                }
                return function(r, t, n) {
                    return t && e(r.prototype, t), n && e(r, n), r
                }
            }();
        }, {
            "../core-js/object/define-property": 13
        }],
        23: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            exports.__esModule = !0;
            var _setPrototypeOf = require("../core-js/object/set-prototype-of"),
                _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf),
                _create = require("../core-js/object/create"),
                _create2 = _interopRequireDefault(_create),
                _typeof2 = require("../helpers/typeof"),
                _typeof3 = _interopRequireDefault(_typeof2);
            exports.default = function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, _typeof3.default)(t)));
                e.prototype = (0, _create2.default)(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(e, t) : e.__proto__ = t)
            };
        }, {
            "../core-js/object/create": 12,
            "../core-js/object/set-prototype-of": 17,
            "../helpers/typeof": 26
        }],
        24: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            exports.__esModule = !0;
            var _typeof2 = require("../helpers/typeof"),
                _typeof3 = _interopRequireDefault(_typeof2);
            exports.default = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" !== (void 0 === t ? "undefined" : (0, _typeof3.default)(t)) && "function" != typeof t ? e : t
            };
        }, {
            "../helpers/typeof": 26
        }],
        25: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            exports.__esModule = !0;
            var _isIterable2 = require("../core-js/is-iterable"),
                _isIterable3 = _interopRequireDefault(_isIterable2),
                _getIterator2 = require("../core-js/get-iterator"),
                _getIterator3 = _interopRequireDefault(_getIterator2);
            exports.default = function() {
                function e(e, r) {
                    var t = [],
                        a = !0,
                        i = !1,
                        u = void 0;
                    try {
                        for (var n, o = (0, _getIterator3.default)(e); !(a = (n = o.next()).done) && (t.push(n.value), !r || t.length !== r); a = !0);
                    } catch (e) {
                        i = !0, u = e
                    } finally {
                        try {
                            !a && o.return && o.return()
                        } finally {
                            if (i) throw u
                        }
                    }
                    return t
                }
                return function(r, t) {
                    if (Array.isArray(r)) return r;
                    if ((0, _isIterable3.default)(Object(r))) return e(r, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
        }, {
            "../core-js/get-iterator": 8,
            "../core-js/is-iterable": 9
        }],
        26: [function(require, module, exports) {
            "use strict";

            function _interopRequireDefault(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            exports.__esModule = !0;
            var _iterator = require("../core-js/symbol/iterator"),
                _iterator2 = _interopRequireDefault(_iterator),
                _symbol = require("../core-js/symbol"),
                _symbol2 = _interopRequireDefault(_symbol),
                _typeof = "function" == typeof _symbol2.default && "symbol" == typeof _iterator2.default ? function(t) {
                    return typeof t
                } : function(t) {
                    return t && "function" == typeof _symbol2.default && t.constructor === _symbol2.default && t !== _symbol2.default.prototype ? "symbol" : typeof t
                };
            exports.default = "function" == typeof _symbol2.default && "symbol" === _typeof(_iterator2.default) ? function(t) {
                return void 0 === t ? "undefined" : _typeof(t)
            } : function(t) {
                return t && "function" == typeof _symbol2.default && t.constructor === _symbol2.default && t !== _symbol2.default.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t)
            };
        }, {
            "../core-js/symbol": 19,
            "../core-js/symbol/iterator": 20
        }],
        27: [function(require, module, exports) {
            "use strict";

            function placeHoldersCount(o) {
                var r = o.length;
                if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === o[r - 2] ? 2 : "=" === o[r - 1] ? 1 : 0
            }

            function byteLength(o) {
                return 3 * o.length / 4 - placeHoldersCount(o)
            }

            function toByteArray(o) {
                var r, e, t, u, n, p = o.length;
                u = placeHoldersCount(o), n = new Arr(3 * p / 4 - u), e = u > 0 ? p - 4 : p;
                var a = 0;
                for (r = 0; r < e; r += 4) t = revLookup[o.charCodeAt(r)] << 18 | revLookup[o.charCodeAt(r + 1)] << 12 | revLookup[o.charCodeAt(r + 2)] << 6 | revLookup[o.charCodeAt(r + 3)], n[a++] = t >> 16 & 255, n[a++] = t >> 8 & 255, n[a++] = 255 & t;
                return 2 === u ? (t = revLookup[o.charCodeAt(r)] << 2 | revLookup[o.charCodeAt(r + 1)] >> 4, n[a++] = 255 & t) : 1 === u && (t = revLookup[o.charCodeAt(r)] << 10 | revLookup[o.charCodeAt(r + 1)] << 4 | revLookup[o.charCodeAt(r + 2)] >> 2, n[a++] = t >> 8 & 255, n[a++] = 255 & t), n
            }

            function tripletToBase64(o) {
                return lookup[o >> 18 & 63] + lookup[o >> 12 & 63] + lookup[o >> 6 & 63] + lookup[63 & o]
            }

            function encodeChunk(o, r, e) {
                for (var t, u = [], n = r; n < e; n += 3) t = (o[n] << 16) + (o[n + 1] << 8) + o[n + 2], u.push(tripletToBase64(t));
                return u.join("")
            }

            function fromByteArray(o) {
                for (var r, e = o.length, t = e % 3, u = "", n = [], p = 0, a = e - t; p < a; p += 16383) n.push(encodeChunk(o, p, p + 16383 > a ? a : p + 16383));
                return 1 === t ? (r = o[e - 1], u += lookup[r >> 2], u += lookup[r << 4 & 63], u += "==") : 2 === t && (r = (o[e - 2] << 8) + o[e - 1], u += lookup[r >> 10], u += lookup[r >> 4 & 63], u += lookup[r << 2 & 63], u += "="), n.push(u), n.join("")
            }
            exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
            for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;
            revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
        }, {}],
        28: [function(require, module, exports) {

        }, {}],
        29: [function(require, module, exports) {
            (function(global) {
                "use strict";

                function typedArraySupport() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }

                function kMaxLength() {
                    return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function createBuffer(t, e) {
                    if (kMaxLength() < e) throw new RangeError("Invalid typed array length");
                    return Buffer.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = Buffer.prototype) : (null === t && (t = new Buffer(e)), t.length = e), t
                }

                function Buffer(t, e, r) {
                    if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(t, e, r);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return allocUnsafe(this, t)
                    }
                    return from(this, t, e, r)
                }

                function from(t, e, r, n) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? fromArrayBuffer(t, e, r, n) : "string" == typeof e ? fromString(t, e, r) : fromObject(t, e)
                }

                function assertSize(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function alloc(t, e, r, n) {
                    return assertSize(e), e <= 0 ? createBuffer(t, e) : void 0 !== r ? "string" == typeof n ? createBuffer(t, e).fill(r, n) : createBuffer(t, e).fill(r) : createBuffer(t, e)
                }

                function allocUnsafe(t, e) {
                    if (assertSize(e), t = createBuffer(t, e < 0 ? 0 : 0 | checked(e)), !Buffer.TYPED_ARRAY_SUPPORT)
                        for (var r = 0; r < e; ++r) t[r] = 0;
                    return t
                }

                function fromString(t, e, r) {
                    if ("string" == typeof r && "" !== r || (r = "utf8"), !Buffer.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                    var n = 0 | byteLength(e, r);
                    t = createBuffer(t, n);
                    var f = t.write(e, r);
                    return f !== n && (t = t.slice(0, f)), t
                }

                function fromArrayLike(t, e) {
                    var r = e.length < 0 ? 0 : 0 | checked(e.length);
                    t = createBuffer(t, r);
                    for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
                    return t
                }

                function fromArrayBuffer(t, e, r, n) {
                    if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), Buffer.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = Buffer.prototype) : t = fromArrayLike(t, e), t
                }

                function fromObject(t, e) {
                    if (Buffer.isBuffer(e)) {
                        var r = 0 | checked(e.length);
                        return t = createBuffer(t, r), 0 === t.length ? t : (e.copy(t, 0, 0, r), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || isnan(e.length) ? createBuffer(t, 0) : fromArrayLike(t, e);
                        if ("Buffer" === e.type && isArray(e.data)) return fromArrayLike(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function checked(t) {
                    if (t >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                    return 0 | t
                }

                function SlowBuffer(t) {
                    return +t != t && (t = 0), Buffer.alloc(+t)
                }

                function byteLength(t, e) {
                    if (Buffer.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var r = t.length;
                    if (0 === r) return 0;
                    for (var n = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return utf8ToBytes(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return base64ToBytes(t).length;
                        default:
                            if (n) return utf8ToBytes(t).length;
                            e = ("" + e).toLowerCase(), n = !0
                    }
                }

                function slowToString(t, e, r) {
                    var n = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if (r >>>= 0, e >>>= 0, r <= e) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return hexSlice(this, e, r);
                        case "utf8":
                        case "utf-8":
                            return utf8Slice(this, e, r);
                        case "ascii":
                            return asciiSlice(this, e, r);
                        case "latin1":
                        case "binary":
                            return latin1Slice(this, e, r);
                        case "base64":
                            return base64Slice(this, e, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return utf16leSlice(this, e, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), n = !0
                    }
                }

                function swap(t, e, r) {
                    var n = t[e];
                    t[e] = t[r], t[r] = n
                }

                function bidirectionalIndexOf(t, e, r, n, f) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = f ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                        if (f) return -1;
                        r = t.length - 1
                    } else if (r < 0) {
                        if (!f) return -1;
                        r = 0
                    }
                    if ("string" == typeof e && (e = Buffer.from(e, n)), Buffer.isBuffer(e)) return 0 === e.length ? -1 : arrayIndexOf(t, e, r, n, f);
                    if ("number" == typeof e) return e &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? f ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : arrayIndexOf(t, [e], r, n, f);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function arrayIndexOf(t, e, r, n, f) {
                    function i(t, e) {
                        return 1 === o ? t[e] : t.readUInt16BE(e * o)
                    }
                    var o = 1,
                        u = t.length,
                        s = e.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        o = 2, u /= 2, s /= 2, r /= 2
                    }
                    var a;
                    if (f) {
                        var h = -1;
                        for (a = r; a < u; a++)
                            if (i(t, a) === i(e, -1 === h ? 0 : a - h)) {
                                if (-1 === h && (h = a), a - h + 1 === s) return h * o
                            } else -1 !== h && (a -= a - h), h = -1
                    } else
                        for (r + s > u && (r = u - s), a = r; a >= 0; a--) {
                            for (var c = !0, l = 0; l < s; l++)
                                if (i(t, a + l) !== i(e, l)) {
                                    c = !1;
                                    break
                                }
                            if (c) return a
                        }
                    return -1
                }

                function hexWrite(t, e, r, n) {
                    r = Number(r) || 0;
                    var f = t.length - r;
                    n ? (n = Number(n)) > f && (n = f) : n = f;
                    var i = e.length;
                    if (i % 2 != 0) throw new TypeError("Invalid hex string");
                    n > i / 2 && (n = i / 2);
                    for (var o = 0; o < n; ++o) {
                        var u = parseInt(e.substr(2 * o, 2), 16);
                        if (isNaN(u)) return o;
                        t[r + o] = u
                    }
                    return o
                }

                function utf8Write(t, e, r, n) {
                    return blitBuffer(utf8ToBytes(e, t.length - r), t, r, n)
                }

                function asciiWrite(t, e, r, n) {
                    return blitBuffer(asciiToBytes(e), t, r, n)
                }

                function latin1Write(t, e, r, n) {
                    return asciiWrite(t, e, r, n)
                }

                function base64Write(t, e, r, n) {
                    return blitBuffer(base64ToBytes(e), t, r, n)
                }

                function ucs2Write(t, e, r, n) {
                    return blitBuffer(utf16leToBytes(e, t.length - r), t, r, n)
                }

                function base64Slice(t, e, r) {
                    return 0 === e && r === t.length ? base64.fromByteArray(t) : base64.fromByteArray(t.slice(e, r))
                }

                function utf8Slice(t, e, r) {
                    r = Math.min(t.length, r);
                    for (var n = [], f = e; f < r;) {
                        var i = t[f],
                            o = null,
                            u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                        if (f + u <= r) {
                            var s, a, h, c;
                            switch (u) {
                                case 1:
                                    i < 128 && (o = i);
                                    break;
                                case 2:
                                    s = t[f + 1], 128 == (192 & s) && (c = (31 & i) << 6 | 63 & s) > 127 && (o = c);
                                    break;
                                case 3:
                                    s = t[f + 1], a = t[f + 2], 128 == (192 & s) && 128 == (192 & a) && (c = (15 & i) << 12 | (63 & s) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (o = c);
                                    break;
                                case 4:
                                    s = t[f + 1], a = t[f + 2], h = t[f + 3], 128 == (192 & s) && 128 == (192 & a) && 128 == (192 & h) && (c = (15 & i) << 18 | (63 & s) << 12 | (63 & a) << 6 | 63 & h) > 65535 && c < 1114112 && (o = c)
                            }
                        }
                        null === o ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), n.push(o), f += u
                    }
                    return decodeCodePointsArray(n)
                }

                function decodeCodePointsArray(t) {
                    var e = t.length;
                    if (e <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, t);
                    for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += MAX_ARGUMENTS_LENGTH));
                    return r
                }

                function asciiSlice(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var f = e; f < r; ++f) n += String.fromCharCode(127 & t[f]);
                    return n
                }

                function latin1Slice(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var f = e; f < r; ++f) n += String.fromCharCode(t[f]);
                    return n
                }

                function hexSlice(t, e, r) {
                    var n = t.length;
                    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                    for (var f = "", i = e; i < r; ++i) f += toHex(t[i]);
                    return f
                }

                function utf16leSlice(t, e, r) {
                    for (var n = t.slice(e, r), f = "", i = 0; i < n.length; i += 2) f += String.fromCharCode(n[i] + 256 * n[i + 1]);
                    return f
                }

                function checkOffset(t, e, r) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function checkInt(t, e, r, n, f, i) {
                    if (!Buffer.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > f || e < i) throw new RangeError('"value" argument is out of bounds');
                    if (r + n > t.length) throw new RangeError("Index out of range")
                }

                function objectWriteUInt16(t, e, r, n) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var f = 0, i = Math.min(t.length - r, 2); f < i; ++f) t[r + f] = (e & 255 << 8 * (n ? f : 1 - f)) >>> 8 * (n ? f : 1 - f)
                }

                function objectWriteUInt32(t, e, r, n) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var f = 0, i = Math.min(t.length - r, 4); f < i; ++f) t[r + f] = e >>> 8 * (n ? f : 3 - f) & 255
                }

                function checkIEEE754(t, e, r, n, f, i) {
                    if (r + n > t.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function writeFloat(t, e, r, n, f) {
                    return f || checkIEEE754(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), ieee754.write(t, e, r, n, 23, 4), r + 4
                }

                function writeDouble(t, e, r, n, f) {
                    return f || checkIEEE754(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), ieee754.write(t, e, r, n, 52, 8), r + 8
                }

                function base64clean(t) {
                    if (t = stringtrim(t).replace(INVALID_BASE64_RE, ""), t.length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }

                function stringtrim(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }

                function toHex(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function utf8ToBytes(t, e) {
                    e = e || 1 / 0;
                    for (var r, n = t.length, f = null, i = [], o = 0; o < n; ++o) {
                        if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
                            if (!f) {
                                if (r > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (o + 1 === n) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                f = r;
                                continue
                            }
                            if (r < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), f = r;
                                continue
                            }
                            r = 65536 + (f - 55296 << 10 | r - 56320)
                        } else f && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (f = null, r < 128) {
                            if ((e -= 1) < 0) break;
                            i.push(r)
                        } else if (r < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return i
                }

                function asciiToBytes(t) {
                    for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                    return e
                }

                function utf16leToBytes(t, e) {
                    for (var r, n, f, i = [], o = 0; o < t.length && !((e -= 2) < 0); ++o) r = t.charCodeAt(o), n = r >> 8, f = r % 256, i.push(f), i.push(n);
                    return i
                }

                function base64ToBytes(t) {
                    return base64.toByteArray(base64clean(t))
                }

                function blitBuffer(t, e, r, n) {
                    for (var f = 0; f < n && !(f + r >= e.length || f >= t.length); ++f) e[f + r] = t[f];
                    return f
                }

                function isnan(t) {
                    return t !== t
                }
                var base64 = require("base64-js"),
                    ieee754 = require("ieee754"),
                    isArray = require("isarray");
                exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50, Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport(), exports.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, Buffer._augment = function(t) {
                    return t.__proto__ = Buffer.prototype, t
                }, Buffer.from = function(t, e, r) {
                    return from(null, t, e, r)
                }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
                    value: null,
                    configurable: !0
                })), Buffer.alloc = function(t, e, r) {
                    return alloc(null, t, e, r)
                }, Buffer.allocUnsafe = function(t) {
                    return allocUnsafe(null, t)
                }, Buffer.allocUnsafeSlow = function(t) {
                    return allocUnsafe(null, t)
                }, Buffer.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, Buffer.compare = function(t, e) {
                    if (!Buffer.isBuffer(t) || !Buffer.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var r = t.length, n = e.length, f = 0, i = Math.min(r, n); f < i; ++f)
                        if (t[f] !== e[f]) {
                            r = t[f], n = e[f];
                            break
                        }
                    return r < n ? -1 : n < r ? 1 : 0
                }, Buffer.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, Buffer.concat = function(t, e) {
                    if (!isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return Buffer.alloc(0);
                    var r;
                    if (void 0 === e)
                        for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                    var n = Buffer.allocUnsafe(e),
                        f = 0;
                    for (r = 0; r < t.length; ++r) {
                        var i = t[r];
                        if (!Buffer.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
                        i.copy(n, f), f += i.length
                    }
                    return n
                }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) swap(this, e, e + 1);
                    return this
                }, Buffer.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) swap(this, e, e + 3), swap(this, e + 1, e + 2);
                    return this
                }, Buffer.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) swap(this, e, e + 7), swap(this, e + 1, e + 6), swap(this, e + 2, e + 5), swap(this, e + 3, e + 4);
                    return this
                }, Buffer.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? utf8Slice(this, 0, t) : slowToString.apply(this, arguments)
                }, Buffer.prototype.equals = function(t) {
                    if (!Buffer.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === Buffer.compare(this, t)
                }, Buffer.prototype.inspect = function() {
                    var t = "",
                        e = exports.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                }, Buffer.prototype.compare = function(t, e, r, n, f) {
                    if (!Buffer.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === f && (f = this.length), e < 0 || r > t.length || n < 0 || f > this.length) throw new RangeError("out of range index");
                    if (n >= f && e >= r) return 0;
                    if (n >= f) return -1;
                    if (e >= r) return 1;
                    if (e >>>= 0, r >>>= 0, n >>>= 0, f >>>= 0, this === t) return 0;
                    for (var i = f - n, o = r - e, u = Math.min(i, o), s = this.slice(n, f), a = t.slice(e, r), h = 0; h < u; ++h)
                        if (s[h] !== a[h]) {
                            i = s[h], o = a[h];
                            break
                        }
                    return i < o ? -1 : o < i ? 1 : 0
                }, Buffer.prototype.includes = function(t, e, r) {
                    return -1 !== this.indexOf(t, e, r)
                }, Buffer.prototype.indexOf = function(t, e, r) {
                    return bidirectionalIndexOf(this, t, e, r, !0)
                }, Buffer.prototype.lastIndexOf = function(t, e, r) {
                    return bidirectionalIndexOf(this, t, e, r, !1)
                }, Buffer.prototype.write = function(t, e, r, n) {
                    if (void 0 === e) n = "utf8", r = this.length, e = 0;
                    else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    var f = this.length - e;
                    if ((void 0 === r || r > f) && (r = f), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var i = !1;;) switch (n) {
                        case "hex":
                            return hexWrite(this, t, e, r);
                        case "utf8":
                        case "utf-8":
                            return utf8Write(this, t, e, r);
                        case "ascii":
                            return asciiWrite(this, t, e, r);
                        case "latin1":
                        case "binary":
                            return latin1Write(this, t, e, r);
                        case "base64":
                            return base64Write(this, t, e, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return ucs2Write(this, t, e, r);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), i = !0
                    }
                }, Buffer.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var MAX_ARGUMENTS_LENGTH = 4096;
                Buffer.prototype.slice = function(t, e) {
                    var r = this.length;
                    t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
                    var n;
                    if (Buffer.TYPED_ARRAY_SUPPORT) n = this.subarray(t, e), n.__proto__ = Buffer.prototype;
                    else {
                        var f = e - t;
                        n = new Buffer(f, void 0);
                        for (var i = 0; i < f; ++i) n[i] = this[i + t]
                    }
                    return n
                }, Buffer.prototype.readUIntLE = function(t, e, r) {
                    t |= 0, e |= 0, r || checkOffset(t, e, this.length);
                    for (var n = this[t], f = 1, i = 0; ++i < e && (f *= 256);) n += this[t + i] * f;
                    return n
                }, Buffer.prototype.readUIntBE = function(t, e, r) {
                    t |= 0, e |= 0, r || checkOffset(t, e, this.length);
                    for (var n = this[t + --e], f = 1; e > 0 && (f *= 256);) n += this[t + --e] * f;
                    return n
                }, Buffer.prototype.readUInt8 = function(t, e) {
                    return e || checkOffset(t, 1, this.length), this[t]
                }, Buffer.prototype.readUInt16LE = function(t, e) {
                    return e || checkOffset(t, 2, this.length), this[t] | this[t + 1] << 8
                }, Buffer.prototype.readUInt16BE = function(t, e) {
                    return e || checkOffset(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, Buffer.prototype.readUInt32LE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, Buffer.prototype.readUInt32BE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, Buffer.prototype.readIntLE = function(t, e, r) {
                    t |= 0, e |= 0, r || checkOffset(t, e, this.length);
                    for (var n = this[t], f = 1, i = 0; ++i < e && (f *= 256);) n += this[t + i] * f;
                    return f *= 128, n >= f && (n -= Math.pow(2, 8 * e)), n
                }, Buffer.prototype.readIntBE = function(t, e, r) {
                    t |= 0, e |= 0, r || checkOffset(t, e, this.length);
                    for (var n = e, f = 1, i = this[t + --n]; n > 0 && (f *= 256);) i += this[t + --n] * f;
                    return f *= 128, i >= f && (i -= Math.pow(2, 8 * e)), i
                }, Buffer.prototype.readInt8 = function(t, e) {
                    return e || checkOffset(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, Buffer.prototype.readInt16LE = function(t, e) {
                    e || checkOffset(t, 2, this.length);
                    var r = this[t] | this[t + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, Buffer.prototype.readInt16BE = function(t, e) {
                    e || checkOffset(t, 2, this.length);
                    var r = this[t + 1] | this[t] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, Buffer.prototype.readInt32LE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, Buffer.prototype.readInt32BE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, Buffer.prototype.readFloatLE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), ieee754.read(this, t, !0, 23, 4)
                }, Buffer.prototype.readFloatBE = function(t, e) {
                    return e || checkOffset(t, 4, this.length), ieee754.read(this, t, !1, 23, 4)
                }, Buffer.prototype.readDoubleLE = function(t, e) {
                    return e || checkOffset(t, 8, this.length), ieee754.read(this, t, !0, 52, 8)
                }, Buffer.prototype.readDoubleBE = function(t, e) {
                    return e || checkOffset(t, 8, this.length), ieee754.read(this, t, !1, 52, 8)
                }, Buffer.prototype.writeUIntLE = function(t, e, r, n) {
                    if (t = +t, e |= 0, r |= 0, !n) {
                        checkInt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
                    }
                    var f = 1,
                        i = 0;
                    for (this[e] = 255 & t; ++i < r && (f *= 256);) this[e + i] = t / f & 255;
                    return e + r
                }, Buffer.prototype.writeUIntBE = function(t, e, r, n) {
                    if (t = +t, e |= 0, r |= 0, !n) {
                        checkInt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
                    }
                    var f = r - 1,
                        i = 1;
                    for (this[e + f] = 255 & t; --f >= 0 && (i *= 256);) this[e + f] = t / i & 255;
                    return e + r
                }, Buffer.prototype.writeUInt8 = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, Buffer.prototype.writeUInt16LE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : objectWriteUInt16(this, t, e, !0), e + 2
                }, Buffer.prototype.writeUInt16BE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : objectWriteUInt16(this, t, e, !1), e + 2
                }, Buffer.prototype.writeUInt32LE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : objectWriteUInt32(this, t, e, !0), e + 4
                }, Buffer.prototype.writeUInt32BE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : objectWriteUInt32(this, t, e, !1), e + 4
                }, Buffer.prototype.writeIntLE = function(t, e, r, n) {
                    if (t = +t, e |= 0, !n) {
                        var f = Math.pow(2, 8 * r - 1);
                        checkInt(this, t, e, r, f - 1, -f)
                    }
                    var i = 0,
                        o = 1,
                        u = 0;
                    for (this[e] = 255 & t; ++i < r && (o *= 256);) t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / o >> 0) - u & 255;
                    return e + r
                }, Buffer.prototype.writeIntBE = function(t, e, r, n) {
                    if (t = +t, e |= 0, !n) {
                        var f = Math.pow(2, 8 * r - 1);
                        checkInt(this, t, e, r, f - 1, -f)
                    }
                    var i = r - 1,
                        o = 1,
                        u = 0;
                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / o >> 0) - u & 255;
                    return e + r
                }, Buffer.prototype.writeInt8 = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, Buffer.prototype.writeInt16LE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : objectWriteUInt16(this, t, e, !0), e + 2
                }, Buffer.prototype.writeInt16BE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : objectWriteUInt16(this, t, e, !1), e + 2
                }, Buffer.prototype.writeInt32LE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : objectWriteUInt32(this, t, e, !0), e + 4
                }, Buffer.prototype.writeInt32BE = function(t, e, r) {
                    return t = +t, e |= 0, r || checkInt(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : objectWriteUInt32(this, t, e, !1), e + 4
                }, Buffer.prototype.writeFloatLE = function(t, e, r) {
                    return writeFloat(this, t, e, !0, r)
                }, Buffer.prototype.writeFloatBE = function(t, e, r) {
                    return writeFloat(this, t, e, !1, r)
                }, Buffer.prototype.writeDoubleLE = function(t, e, r) {
                    return writeDouble(this, t, e, !0, r)
                }, Buffer.prototype.writeDoubleBE = function(t, e, r) {
                    return writeDouble(this, t, e, !1, r)
                }, Buffer.prototype.copy = function(t, e, r, n) {
                    if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
                    var f, i = n - r;
                    if (this === t && r < e && e < n)
                        for (f = i - 1; f >= 0; --f) t[f + e] = this[f + r];
                    else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
                        for (f = 0; f < i; ++f) t[f + e] = this[f + r];
                    else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
                    return i
                }, Buffer.prototype.fill = function(t, e, r, n) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
                            var f = t.charCodeAt(0);
                            f < 256 && (t = f)
                        }
                        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                    if (r <= e) return this;
                    e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);
                    var i;
                    if ("number" == typeof t)
                        for (i = e; i < r; ++i) this[i] = t;
                    else {
                        var o = Buffer.isBuffer(t) ? t : utf8ToBytes(new Buffer(t, n).toString()),
                            u = o.length;
                        for (i = 0; i < r - e; ++i) this[i + e] = o[i % u]
                    }
                    return this
                };
                var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "base64-js": 27,
            "ieee754": 142,
            "isarray": 145
        }],
        30: [function(require, module, exports) {
            module.exports = {
                100: "Continue",
                101: "Switching Protocols",
                102: "Processing",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                207: "Multi-Status",
                208: "Already Reported",
                226: "IM Used",
                300: "Multiple Choices",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                307: "Temporary Redirect",
                308: "Permanent Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Payload Too Large",
                414: "URI Too Long",
                415: "Unsupported Media Type",
                416: "Range Not Satisfiable",
                417: "Expectation Failed",
                418: "I'm a teapot",
                421: "Misdirected Request",
                422: "Unprocessable Entity",
                423: "Locked",
                424: "Failed Dependency",
                425: "Unordered Collection",
                426: "Upgrade Required",
                428: "Precondition Required",
                429: "Too Many Requests",
                431: "Request Header Fields Too Large",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported",
                506: "Variant Also Negotiates",
                507: "Insufficient Storage",
                508: "Loop Detected",
                509: "Bandwidth Limit Exceeded",
                510: "Not Extended",
                511: "Network Authentication Required"
            };
        }, {}],
        31: [function(require, module, exports) {
            function Emitter(t) {
                if (t) return mixin(t)
            }

            function mixin(t) {
                for (var e in Emitter.prototype) t[e] = Emitter.prototype[e];
                return t
            }
            "undefined" != typeof module && (module.exports = Emitter), Emitter.prototype.on = Emitter.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
            }, Emitter.prototype.once = function(t, e) {
                function i() {
                    this.off(t, i), e.apply(this, arguments)
                }
                return i.fn = e, this.on(t, i), this
            }, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var i = this._callbacks["$" + t];
                if (!i) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                for (var r, s = 0; s < i.length; s++)
                    if ((r = i[s]) === e || r.fn === e) {
                        i.splice(s, 1);
                        break
                    }
                return this
            }, Emitter.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    i = this._callbacks["$" + t];
                if (i) {
                    i = i.slice(0);
                    for (var r = 0, s = i.length; r < s; ++r) i[r].apply(this, e)
                }
                return this
            }, Emitter.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
            }, Emitter.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            };
        }, {}],
        32: [function(require, module, exports) {
            require("../modules/web.dom.iterable"), require("../modules/es6.string.iterator"), module.exports = require("../modules/core.get-iterator");
        }, {
            "../modules/core.get-iterator": 120,
            "../modules/es6.string.iterator": 132,
            "../modules/web.dom.iterable": 139
        }],
        33: [function(require, module, exports) {
            require("../modules/web.dom.iterable"), require("../modules/es6.string.iterator"), module.exports = require("../modules/core.is-iterable");
        }, {
            "../modules/core.is-iterable": 121,
            "../modules/es6.string.iterator": 132,
            "../modules/web.dom.iterable": 139
        }],
        34: [function(require, module, exports) {
            require("../../modules/es6.number.is-nan"), module.exports = require("../../modules/_core").Number.isNaN;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.number.is-nan": 123
        }],
        35: [function(require, module, exports) {
            require("../../modules/es6.object.assign"), module.exports = require("../../modules/_core").Object.assign;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.assign": 124
        }],
        36: [function(require, module, exports) {
            require("../../modules/es6.object.create");
            var $Object = require("../../modules/_core").Object;
            module.exports = function(e, r) {
                return $Object.create(e, r)
            };
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.create": 125
        }],
        37: [function(require, module, exports) {
            require("../../modules/es6.object.define-property");
            var $Object = require("../../modules/_core").Object;
            module.exports = function(e, r, o) {
                return $Object.defineProperty(e, r, o)
            };
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.define-property": 126
        }],
        38: [function(require, module, exports) {
            require("../../modules/es7.object.entries"), module.exports = require("../../modules/_core").Object.entries;
        }, {
            "../../modules/_core": 52,
            "../../modules/es7.object.entries": 134
        }],
        39: [function(require, module, exports) {
            require("../../modules/es6.object.get-prototype-of"), module.exports = require("../../modules/_core").Object.getPrototypeOf;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.get-prototype-of": 127
        }],
        40: [function(require, module, exports) {
            require("../../modules/es6.object.keys"), module.exports = require("../../modules/_core").Object.keys;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.keys": 128
        }],
        41: [function(require, module, exports) {
            require("../../modules/es6.object.set-prototype-of"), module.exports = require("../../modules/_core").Object.setPrototypeOf;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.set-prototype-of": 129
        }],
        42: [function(require, module, exports) {
            require("../modules/es6.object.to-string"), require("../modules/es6.string.iterator"), require("../modules/web.dom.iterable"), require("../modules/es6.promise"), require("../modules/es7.promise.finally"), require("../modules/es7.promise.try"), module.exports = require("../modules/_core").Promise;
        }, {
            "../modules/_core": 52,
            "../modules/es6.object.to-string": 130,
            "../modules/es6.promise": 131,
            "../modules/es6.string.iterator": 132,
            "../modules/es7.promise.finally": 135,
            "../modules/es7.promise.try": 136,
            "../modules/web.dom.iterable": 139
        }],
        43: [function(require, module, exports) {
            require("../../modules/es6.symbol"), require("../../modules/es6.object.to-string"), require("../../modules/es7.symbol.async-iterator"), require("../../modules/es7.symbol.observable"), module.exports = require("../../modules/_core").Symbol;
        }, {
            "../../modules/_core": 52,
            "../../modules/es6.object.to-string": 130,
            "../../modules/es6.symbol": 133,
            "../../modules/es7.symbol.async-iterator": 137,
            "../../modules/es7.symbol.observable": 138
        }],
        44: [function(require, module, exports) {
            require("../../modules/es6.string.iterator"), require("../../modules/web.dom.iterable"), module.exports = require("../../modules/_wks-ext").f("iterator");
        }, {
            "../../modules/_wks-ext": 117,
            "../../modules/es6.string.iterator": 132,
            "../../modules/web.dom.iterable": 139
        }],
        45: [function(require, module, exports) {
            module.exports = function(o) {
                if ("function" != typeof o) throw TypeError(o + " is not a function!");
                return o
            };
        }, {}],
        46: [function(require, module, exports) {
            module.exports = function() {};
        }, {}],
        47: [function(require, module, exports) {
            module.exports = function(o, n, r, i) {
                if (!(o instanceof n) || void 0 !== i && i in o) throw TypeError(r + ": incorrect invocation!");
                return o
            };
        }, {}],
        48: [function(require, module, exports) {
            var isObject = require("./_is-object");
            module.exports = function(e) {
                if (!isObject(e)) throw TypeError(e + " is not an object!");
                return e
            };
        }, {
            "./_is-object": 71
        }],
        49: [function(require, module, exports) {
            var toIObject = require("./_to-iobject"),
                toLength = require("./_to-length"),
                toAbsoluteIndex = require("./_to-absolute-index");
            module.exports = function(e) {
                return function(t, o, r) {
                    var n, u = toIObject(t),
                        i = toLength(u.length),
                        f = toAbsoluteIndex(r, i);
                    if (e && o != o) {
                        for (; i > f;)
                            if ((n = u[f++]) != n) return !0
                    } else
                        for (; i > f; f++)
                            if ((e || f in u) && u[f] === o) return e || f || 0; return !e && -1
                }
            };
        }, {
            "./_to-absolute-index": 109,
            "./_to-iobject": 111,
            "./_to-length": 112
        }],
        50: [function(require, module, exports) {
            var cof = require("./_cof"),
                TAG = require("./_wks")("toStringTag"),
                ARG = "Arguments" == cof(function() {
                    return arguments
                }()),
                tryGet = function(t, e) {
                    try {
                        return t[e]
                    } catch (t) {}
                };
            module.exports = function(t) {
                var e, r, n;
                return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(r = tryGet(e = Object(t), TAG)) ? r : ARG ? cof(e) : "Object" == (n = cof(e)) && "function" == typeof e.callee ? "Arguments" : n
            };
        }, {
            "./_cof": 51,
            "./_wks": 118
        }],
        51: [function(require, module, exports) {
            var toString = {}.toString;
            module.exports = function(t) {
                return toString.call(t).slice(8, -1)
            };
        }, {}],
        52: [function(require, module, exports) {
            var core = module.exports = {
                version: "2.5.1"
            };
            "number" == typeof __e && (__e = core);
        }, {}],
        53: [function(require, module, exports) {
            var aFunction = require("./_a-function");
            module.exports = function(n, r, t) {
                if (aFunction(n), void 0 === r) return n;
                switch (t) {
                    case 1:
                        return function(t) {
                            return n.call(r, t)
                        };
                    case 2:
                        return function(t, u) {
                            return n.call(r, t, u)
                        };
                    case 3:
                        return function(t, u, e) {
                            return n.call(r, t, u, e)
                        }
                }
                return function() {
                    return n.apply(r, arguments)
                }
            };
        }, {
            "./_a-function": 45
        }],
        54: [function(require, module, exports) {
            module.exports = function(o) {
                if (void 0 == o) throw TypeError("Can't call method on  " + o);
                return o
            };
        }, {}],
        55: [function(require, module, exports) {
            module.exports = !require("./_fails")(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            });
        }, {
            "./_fails": 60
        }],
        56: [function(require, module, exports) {
            var isObject = require("./_is-object"),
                document = require("./_global").document,
                is = isObject(document) && isObject(document.createElement);
            module.exports = function(e) {
                return is ? document.createElement(e) : {}
            };
        }, {
            "./_global": 62,
            "./_is-object": 71
        }],
        57: [function(require, module, exports) {
            module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
        }, {}],
        58: [function(require, module, exports) {
            var getKeys = require("./_object-keys"),
                gOPS = require("./_object-gops"),
                pIE = require("./_object-pie");
            module.exports = function(e) {
                var r = getKeys(e),
                    t = gOPS.f;
                if (t)
                    for (var o, u = t(e), g = pIE.f, i = 0; u.length > i;) g.call(e, o = u[i++]) && r.push(o);
                return r
            };
        }, {
            "./_object-gops": 89,
            "./_object-keys": 92,
            "./_object-pie": 93
        }],
        59: [function(require, module, exports) {
            var global = require("./_global"),
                core = require("./_core"),
                ctx = require("./_ctx"),
                hide = require("./_hide"),
                PROTOTYPE = "prototype",
                $export = function(e, r, t) {
                    var o, n, p, i = e & $export.F,
                        x = e & $export.G,
                        c = e & $export.S,
                        l = e & $export.P,
                        u = e & $export.B,
                        a = e & $export.W,
                        $ = x ? core : core[r] || (core[r] = {}),
                        P = $[PROTOTYPE],
                        f = x ? global : c ? global[r] : (global[r] || {})[PROTOTYPE];
                    x && (t = r);
                    for (o in t)(n = !i && f && void 0 !== f[o]) && o in $ || (p = n ? f[o] : t[o], $[o] = x && "function" != typeof f[o] ? t[o] : u && n ? ctx(p, global) : a && f[o] == p ? function(e) {
                        var r = function(r, t, o) {
                            if (this instanceof e) {
                                switch (arguments.length) {
                                    case 0:
                                        return new e;
                                    case 1:
                                        return new e(r);
                                    case 2:
                                        return new e(r, t)
                                }
                                return new e(r, t, o)
                            }
                            return e.apply(this, arguments)
                        };
                        return r[PROTOTYPE] = e[PROTOTYPE], r
                    }(p) : l && "function" == typeof p ? ctx(Function.call, p) : p, l && (($.virtual || ($.virtual = {}))[o] = p, e & $export.R && P && !P[o] && hide(P, o, p)))
                };
            $export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, $export.U = 64, $export.R = 128, module.exports = $export;
        }, {
            "./_core": 52,
            "./_ctx": 53,
            "./_global": 62,
            "./_hide": 64
        }],
        60: [function(require, module, exports) {
            module.exports = function(r) {
                try {
                    return !!r()
                } catch (r) {
                    return !0
                }
            };
        }, {}],
        61: [function(require, module, exports) {
            var ctx = require("./_ctx"),
                call = require("./_iter-call"),
                isArrayIter = require("./_is-array-iter"),
                anObject = require("./_an-object"),
                toLength = require("./_to-length"),
                getIterFn = require("./core.get-iterator-method"),
                BREAK = {},
                RETURN = {},
                exports = module.exports = function(e, r, t, o, i) {
                    var n, a, R, c, l = i ? function() {
                            return e
                        } : getIterFn(e),
                        u = ctx(t, o, r ? 2 : 1),
                        E = 0;
                    if ("function" != typeof l) throw TypeError(e + " is not iterable!");
                    if (isArrayIter(l)) {
                        for (n = toLength(e.length); n > E; E++)
                            if ((c = r ? u(anObject(a = e[E])[0], a[1]) : u(e[E])) === BREAK || c === RETURN) return c
                    } else
                        for (R = l.call(e); !(a = R.next()).done;)
                            if ((c = call(R, u, a.value, r)) === BREAK || c === RETURN) return c
                };
            exports.BREAK = BREAK, exports.RETURN = RETURN;
        }, {
            "./_an-object": 48,
            "./_ctx": 53,
            "./_is-array-iter": 69,
            "./_iter-call": 72,
            "./_to-length": 112,
            "./core.get-iterator-method": 119
        }],
        62: [function(require, module, exports) {
            var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = global);
        }, {}],
        63: [function(require, module, exports) {
            var hasOwnProperty = {}.hasOwnProperty;
            module.exports = function(r, e) {
                return hasOwnProperty.call(r, e)
            };
        }, {}],
        64: [function(require, module, exports) {
            var dP = require("./_object-dp"),
                createDesc = require("./_property-desc");
            module.exports = require("./_descriptors") ? function(e, r, t) {
                return dP.f(e, r, createDesc(1, t))
            } : function(e, r, t) {
                return e[r] = t, e
            };
        }, {
            "./_descriptors": 55,
            "./_object-dp": 84,
            "./_property-desc": 98
        }],
        65: [function(require, module, exports) {
            var document = require("./_global").document;
            module.exports = document && document.documentElement;
        }, {
            "./_global": 62
        }],
        66: [function(require, module, exports) {
            module.exports = !require("./_descriptors") && !require("./_fails")(function() {
                return 7 != Object.defineProperty(require("./_dom-create")("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            });
        }, {
            "./_descriptors": 55,
            "./_dom-create": 56,
            "./_fails": 60
        }],
        67: [function(require, module, exports) {
            module.exports = function(e, r, l) {
                var a = void 0 === l;
                switch (r.length) {
                    case 0:
                        return a ? e() : e.call(l);
                    case 1:
                        return a ? e(r[0]) : e.call(l, r[0]);
                    case 2:
                        return a ? e(r[0], r[1]) : e.call(l, r[0], r[1]);
                    case 3:
                        return a ? e(r[0], r[1], r[2]) : e.call(l, r[0], r[1], r[2]);
                    case 4:
                        return a ? e(r[0], r[1], r[2], r[3]) : e.call(l, r[0], r[1], r[2], r[3])
                }
                return e.apply(l, r)
            };
        }, {}],
        68: [function(require, module, exports) {
            var cof = require("./_cof");
            module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                return "String" == cof(e) ? e.split("") : Object(e)
            };
        }, {
            "./_cof": 51
        }],
        69: [function(require, module, exports) {
            var Iterators = require("./_iterators"),
                ITERATOR = require("./_wks")("iterator"),
                ArrayProto = Array.prototype;
            module.exports = function(r) {
                return void 0 !== r && (Iterators.Array === r || ArrayProto[ITERATOR] === r)
            };
        }, {
            "./_iterators": 77,
            "./_wks": 118
        }],
        70: [function(require, module, exports) {
            var cof = require("./_cof");
            module.exports = Array.isArray || function(r) {
                return "Array" == cof(r)
            };
        }, {
            "./_cof": 51
        }],
        71: [function(require, module, exports) {
            module.exports = function(o) {
                return "object" == typeof o ? null !== o : "function" == typeof o
            };
        }, {}],
        72: [function(require, module, exports) {
            var anObject = require("./_an-object");
            module.exports = function(r, t, e, a) {
                try {
                    return a ? t(anObject(e)[0], e[1]) : t(e)
                } catch (t) {
                    var c = r.return;
                    throw void 0 !== c && anObject(c.call(r)), t
                }
            };
        }, {
            "./_an-object": 48
        }],
        73: [function(require, module, exports) {
            "use strict";
            var create = require("./_object-create"),
                descriptor = require("./_property-desc"),
                setToStringTag = require("./_set-to-string-tag"),
                IteratorPrototype = {};
            require("./_hide")(IteratorPrototype, require("./_wks")("iterator"), function() {
                return this
            }), module.exports = function(r, t, e) {
                r.prototype = create(IteratorPrototype, {
                    next: descriptor(1, e)
                }), setToStringTag(r, t + " Iterator")
            };
        }, {
            "./_hide": 64,
            "./_object-create": 83,
            "./_property-desc": 98,
            "./_set-to-string-tag": 103,
            "./_wks": 118
        }],
        74: [function(require, module, exports) {
            "use strict";
            var LIBRARY = require("./_library"),
                $export = require("./_export"),
                redefine = require("./_redefine"),
                hide = require("./_hide"),
                has = require("./_has"),
                Iterators = require("./_iterators"),
                $iterCreate = require("./_iter-create"),
                setToStringTag = require("./_set-to-string-tag"),
                getPrototypeOf = require("./_object-gpo"),
                ITERATOR = require("./_wks")("iterator"),
                BUGGY = !([].keys && "next" in [].keys()),
                FF_ITERATOR = "@@iterator",
                KEYS = "keys",
                VALUES = "values",
                returnThis = function() {
                    return this
                };
            module.exports = function(e, r, t, i, n, o, s) {
                $iterCreate(t, r, i);
                var u, a, T, R = function(e) {
                        if (!BUGGY && e in f) return f[e];
                        switch (e) {
                            case KEYS:
                            case VALUES:
                                return function() {
                                    return new t(this, e)
                                }
                        }
                        return function() {
                            return new t(this, e)
                        }
                    },
                    A = r + " Iterator",
                    E = n == VALUES,
                    c = !1,
                    f = e.prototype,
                    h = f[ITERATOR] || f[FF_ITERATOR] || n && f[n],
                    I = h || R(n),
                    p = n ? E ? R("entries") : I : void 0,
                    _ = "Array" == r ? f.entries || h : h;
                if (_ && (T = getPrototypeOf(_.call(new e))) !== Object.prototype && T.next && (setToStringTag(T, A, !0), LIBRARY || has(T, ITERATOR) || hide(T, ITERATOR, returnThis)), E && h && h.name !== VALUES && (c = !0, I = function() {
                        return h.call(this)
                    }), LIBRARY && !s || !BUGGY && !c && f[ITERATOR] || hide(f, ITERATOR, I), Iterators[r] = I, Iterators[A] = returnThis, n)
                    if (u = {
                            values: E ? I : R(VALUES),
                            keys: o ? I : R(KEYS),
                            entries: p
                        }, s)
                        for (a in u) a in f || redefine(f, a, u[a]);
                    else $export($export.P + $export.F * (BUGGY || c), r, u);
                return u
            };
        }, {
            "./_export": 59,
            "./_has": 63,
            "./_hide": 64,
            "./_iter-create": 73,
            "./_iterators": 77,
            "./_library": 78,
            "./_object-gpo": 90,
            "./_redefine": 100,
            "./_set-to-string-tag": 103,
            "./_wks": 118
        }],
        75: [function(require, module, exports) {
            var ITERATOR = require("./_wks")("iterator"),
                SAFE_CLOSING = !1;
            try {
                var riter = [7][ITERATOR]();
                riter.return = function() {
                    SAFE_CLOSING = !0
                }, Array.from(riter, function() {
                    throw 2
                })
            } catch (r) {}
            module.exports = function(r, t) {
                if (!t && !SAFE_CLOSING) return !1;
                var n = !1;
                try {
                    var e = [7],
                        u = e[ITERATOR]();
                    u.next = function() {
                        return {
                            done: n = !0
                        }
                    }, e[ITERATOR] = function() {
                        return u
                    }, r(e)
                } catch (r) {}
                return n
            };
        }, {
            "./_wks": 118
        }],
        76: [function(require, module, exports) {
            module.exports = function(e, n) {
                return {
                    value: n,
                    done: !!e
                }
            };
        }, {}],
        77: [function(require, module, exports) {
            module.exports = {};
        }, {}],
        78: [function(require, module, exports) {
            module.exports = !0;
        }, {}],
        79: [function(require, module, exports) {
            var META = require("./_uid")("meta"),
                isObject = require("./_is-object"),
                has = require("./_has"),
                setDesc = require("./_object-dp").f,
                id = 0,
                isExtensible = Object.isExtensible || function() {
                    return !0
                },
                FREEZE = !require("./_fails")(function() {
                    return isExtensible(Object.preventExtensions({}))
                }),
                setMeta = function(e) {
                    setDesc(e, META, {
                        value: {
                            i: "O" + ++id,
                            w: {}
                        }
                    })
                },
                fastKey = function(e, t) {
                    if (!isObject(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!has(e, META)) {
                        if (!isExtensible(e)) return "F";
                        if (!t) return "E";
                        setMeta(e)
                    }
                    return e[META].i
                },
                getWeak = function(e, t) {
                    if (!has(e, META)) {
                        if (!isExtensible(e)) return !0;
                        if (!t) return !1;
                        setMeta(e)
                    }
                    return e[META].w
                },
                onFreeze = function(e) {
                    return FREEZE && meta.NEED && isExtensible(e) && !has(e, META) && setMeta(e), e
                },
                meta = module.exports = {
                    KEY: META,
                    NEED: !1,
                    fastKey: fastKey,
                    getWeak: getWeak,
                    onFreeze: onFreeze
                };
        }, {
            "./_fails": 60,
            "./_has": 63,
            "./_is-object": 71,
            "./_object-dp": 84,
            "./_uid": 115
        }],
        80: [function(require, module, exports) {
            var global = require("./_global"),
                macrotask = require("./_task").set,
                Observer = global.MutationObserver || global.WebKitMutationObserver,
                process = global.process,
                Promise = global.Promise,
                isNode = "process" == require("./_cof")(process);
            module.exports = function() {
                var e, r, o, s = function() {
                    var s, t;
                    for (isNode && (s = process.domain) && s.exit(); e;) {
                        t = e.fn, e = e.next;
                        try {
                            t()
                        } catch (s) {
                            throw e ? o() : r = void 0, s
                        }
                    }
                    r = void 0, s && s.enter()
                };
                if (isNode) o = function() {
                    process.nextTick(s)
                };
                else if (Observer) {
                    var t = !0,
                        a = document.createTextNode("");
                    new Observer(s).observe(a, {
                        characterData: !0
                    }), o = function() {
                        a.data = t = !t
                    }
                } else if (Promise && Promise.resolve) {
                    var i = Promise.resolve();
                    o = function() {
                        i.then(s)
                    }
                } else o = function() {
                    macrotask.call(global, s)
                };
                return function(s) {
                    var t = {
                        fn: s,
                        next: void 0
                    };
                    r && (r.next = t), e || (e = t, o()), r = t
                }
            };
        }, {
            "./_cof": 51,
            "./_global": 62,
            "./_task": 108
        }],
        81: [function(require, module, exports) {
            "use strict";

            function PromiseCapability(i) {
                var o, r;
                this.promise = new i(function(i, t) {
                    if (void 0 !== o || void 0 !== r) throw TypeError("Bad Promise constructor");
                    o = i, r = t
                }), this.resolve = aFunction(o), this.reject = aFunction(r)
            }
            var aFunction = require("./_a-function");
            module.exports.f = function(i) {
                return new PromiseCapability(i)
            };
        }, {
            "./_a-function": 45
        }],
        82: [function(require, module, exports) {
            "use strict";
            var getKeys = require("./_object-keys"),
                gOPS = require("./_object-gops"),
                pIE = require("./_object-pie"),
                toObject = require("./_to-object"),
                IObject = require("./_iobject"),
                $assign = Object.assign;
            module.exports = !$assign || require("./_fails")(function() {
                var e = {},
                    t = {},
                    r = Symbol(),
                    s = "abcdefghijklmnopqrst";
                return e[r] = 7, s.split("").forEach(function(e) {
                    t[e] = e
                }), 7 != $assign({}, e)[r] || Object.keys($assign({}, t)).join("") != s
            }) ? function(e, t) {
                for (var r = toObject(e), s = arguments.length, i = 1, o = gOPS.f, c = pIE.f; s > i;)
                    for (var n, a = IObject(arguments[i++]), g = o ? getKeys(a).concat(o(a)) : getKeys(a), b = g.length, j = 0; b > j;) c.call(a, n = g[j++]) && (r[n] = a[n]);
                return r
            } : $assign;
        }, {
            "./_fails": 60,
            "./_iobject": 68,
            "./_object-gops": 89,
            "./_object-keys": 92,
            "./_object-pie": 93,
            "./_to-object": 113
        }],
        83: [function(require, module, exports) {
            var anObject = require("./_an-object"),
                dPs = require("./_object-dps"),
                enumBugKeys = require("./_enum-bug-keys"),
                IE_PROTO = require("./_shared-key")("IE_PROTO"),
                Empty = function() {},
                PROTOTYPE = "prototype",
                createDict = function() {
                    var e, t = require("./_dom-create")("iframe"),
                        r = enumBugKeys.length;
                    for (t.style.display = "none", require("./_html").appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), createDict = e.F; r--;) delete createDict[PROTOTYPE][enumBugKeys[r]];
                    return createDict()
                };
            module.exports = Object.create || function(e, t) {
                var r;
                return null !== e ? (Empty[PROTOTYPE] = anObject(e), r = new Empty, Empty[PROTOTYPE] = null, r[IE_PROTO] = e) : r = createDict(), void 0 === t ? r : dPs(r, t)
            };
        }, {
            "./_an-object": 48,
            "./_dom-create": 56,
            "./_enum-bug-keys": 57,
            "./_html": 65,
            "./_object-dps": 85,
            "./_shared-key": 104
        }],
        84: [function(require, module, exports) {
            var anObject = require("./_an-object"),
                IE8_DOM_DEFINE = require("./_ie8-dom-define"),
                toPrimitive = require("./_to-primitive"),
                dP = Object.defineProperty;
            exports.f = require("./_descriptors") ? Object.defineProperty : function(e, r, t) {
                if (anObject(e), r = toPrimitive(r, !0), anObject(t), IE8_DOM_DEFINE) try {
                    return dP(e, r, t)
                } catch (e) {}
                if ("get" in t || "set" in t) throw TypeError("Accessors not supported!");
                return "value" in t && (e[r] = t.value), e
            };
        }, {
            "./_an-object": 48,
            "./_descriptors": 55,
            "./_ie8-dom-define": 66,
            "./_to-primitive": 114
        }],
        85: [function(require, module, exports) {
            var dP = require("./_object-dp"),
                anObject = require("./_an-object"),
                getKeys = require("./_object-keys");
            module.exports = require("./_descriptors") ? Object.defineProperties : function(e, r) {
                anObject(e);
                for (var t, o = getKeys(r), c = o.length, i = 0; c > i;) dP.f(e, t = o[i++], r[t]);
                return e
            };
        }, {
            "./_an-object": 48,
            "./_descriptors": 55,
            "./_object-dp": 84,
            "./_object-keys": 92
        }],
        86: [function(require, module, exports) {
            var pIE = require("./_object-pie"),
                createDesc = require("./_property-desc"),
                toIObject = require("./_to-iobject"),
                toPrimitive = require("./_to-primitive"),
                has = require("./_has"),
                IE8_DOM_DEFINE = require("./_ie8-dom-define"),
                gOPD = Object.getOwnPropertyDescriptor;
            exports.f = require("./_descriptors") ? gOPD : function(e, r) {
                if (e = toIObject(e), r = toPrimitive(r, !0), IE8_DOM_DEFINE) try {
                    return gOPD(e, r)
                } catch (e) {}
                if (has(e, r)) return createDesc(!pIE.f.call(e, r), e[r])
            };
        }, {
            "./_descriptors": 55,
            "./_has": 63,
            "./_ie8-dom-define": 66,
            "./_object-pie": 93,
            "./_property-desc": 98,
            "./_to-iobject": 111,
            "./_to-primitive": 114
        }],
        87: [function(require, module, exports) {
            var toIObject = require("./_to-iobject"),
                gOPN = require("./_object-gopn").f,
                toString = {}.toString,
                windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                getWindowNames = function(e) {
                    try {
                        return gOPN(e)
                    } catch (e) {
                        return windowNames.slice()
                    }
                };
            module.exports.f = function(e) {
                return windowNames && "[object Window]" == toString.call(e) ? getWindowNames(e) : gOPN(toIObject(e))
            };
        }, {
            "./_object-gopn": 88,
            "./_to-iobject": 111
        }],
        88: [function(require, module, exports) {
            var $keys = require("./_object-keys-internal"),
                hiddenKeys = require("./_enum-bug-keys").concat("length", "prototype");
            exports.f = Object.getOwnPropertyNames || function(e) {
                return $keys(e, hiddenKeys)
            };
        }, {
            "./_enum-bug-keys": 57,
            "./_object-keys-internal": 91
        }],
        89: [function(require, module, exports) {
            exports.f = Object.getOwnPropertySymbols;
        }, {}],
        90: [function(require, module, exports) {
            var has = require("./_has"),
                toObject = require("./_to-object"),
                IE_PROTO = require("./_shared-key")("IE_PROTO"),
                ObjectProto = Object.prototype;
            module.exports = Object.getPrototypeOf || function(t) {
                return t = toObject(t), has(t, IE_PROTO) ? t[IE_PROTO] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? ObjectProto : null
            };
        }, {
            "./_has": 63,
            "./_shared-key": 104,
            "./_to-object": 113
        }],
        91: [function(require, module, exports) {
            var has = require("./_has"),
                toIObject = require("./_to-iobject"),
                arrayIndexOf = require("./_array-includes")(!1),
                IE_PROTO = require("./_shared-key")("IE_PROTO");
            module.exports = function(r, e) {
                var a, t = toIObject(r),
                    u = 0,
                    O = [];
                for (a in t) a != IE_PROTO && has(t, a) && O.push(a);
                for (; e.length > u;) has(t, a = e[u++]) && (~arrayIndexOf(O, a) || O.push(a));
                return O
            };
        }, {
            "./_array-includes": 49,
            "./_has": 63,
            "./_shared-key": 104,
            "./_to-iobject": 111
        }],
        92: [function(require, module, exports) {
            var $keys = require("./_object-keys-internal"),
                enumBugKeys = require("./_enum-bug-keys");
            module.exports = Object.keys || function(e) {
                return $keys(e, enumBugKeys)
            };
        }, {
            "./_enum-bug-keys": 57,
            "./_object-keys-internal": 91
        }],
        93: [function(require, module, exports) {
            exports.f = {}.propertyIsEnumerable;
        }, {}],
        94: [function(require, module, exports) {
            var $export = require("./_export"),
                core = require("./_core"),
                fails = require("./_fails");
            module.exports = function(e, r) {
                var o = (core.Object || {})[e] || Object[e],
                    t = {};
                t[e] = r(o), $export($export.S + $export.F * fails(function() {
                    o(1)
                }), "Object", t)
            };
        }, {
            "./_core": 52,
            "./_export": 59,
            "./_fails": 60
        }],
        95: [function(require, module, exports) {
            var getKeys = require("./_object-keys"),
                toIObject = require("./_to-iobject"),
                isEnum = require("./_object-pie").f;
            module.exports = function(e) {
                return function(t) {
                    for (var r, o = toIObject(t), u = getKeys(o), i = u.length, n = 0, c = []; i > n;) isEnum.call(o, r = u[n++]) && c.push(e ? [r, o[r]] : o[r]);
                    return c
                }
            };
        }, {
            "./_object-keys": 92,
            "./_object-pie": 93,
            "./_to-iobject": 111
        }],
        96: [function(require, module, exports) {
            module.exports = function(e) {
                try {
                    return {
                        e: !1,
                        v: e()
                    }
                } catch (e) {
                    return {
                        e: !0,
                        v: e
                    }
                }
            };
        }, {}],
        97: [function(require, module, exports) {
            var anObject = require("./_an-object"),
                isObject = require("./_is-object"),
                newPromiseCapability = require("./_new-promise-capability");
            module.exports = function(e, r) {
                if (anObject(e), isObject(r) && r.constructor === e) return r;
                var i = newPromiseCapability.f(e);
                return (0, i.resolve)(r), i.promise
            };
        }, {
            "./_an-object": 48,
            "./_is-object": 71,
            "./_new-promise-capability": 81
        }],
        98: [function(require, module, exports) {
            module.exports = function(e, r) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: r
                }
            };
        }, {}],
        99: [function(require, module, exports) {
            var hide = require("./_hide");
            module.exports = function(e, r, i) {
                for (var d in r) i && e[d] ? e[d] = r[d] : hide(e, d, r[d]);
                return e
            };
        }, {
            "./_hide": 64
        }],
        100: [function(require, module, exports) {
            module.exports = require("./_hide");
        }, {
            "./_hide": 64
        }],
        101: [function(require, module, exports) {
            var isObject = require("./_is-object"),
                anObject = require("./_an-object"),
                check = function(t, e) {
                    if (anObject(t), !isObject(e) && null !== e) throw TypeError(e + ": can't set as prototype!")
                };
            module.exports = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function(t, e, c) {
                    try {
                        c = require("./_ctx")(Function.call, require("./_object-gopd").f(Object.prototype, "__proto__").set, 2), c(t, []), e = !(t instanceof Array)
                    } catch (t) {
                        e = !0
                    }
                    return function(t, r) {
                        return check(t, r), e ? t.__proto__ = r : c(t, r), t
                    }
                }({}, !1) : void 0),
                check: check
            };
        }, {
            "./_an-object": 48,
            "./_ctx": 53,
            "./_is-object": 71,
            "./_object-gopd": 86
        }],
        102: [function(require, module, exports) {
            "use strict";
            var global = require("./_global"),
                core = require("./_core"),
                dP = require("./_object-dp"),
                DESCRIPTORS = require("./_descriptors"),
                SPECIES = require("./_wks")("species");
            module.exports = function(e) {
                var r = "function" == typeof core[e] ? core[e] : global[e];
                DESCRIPTORS && r && !r[SPECIES] && dP.f(r, SPECIES, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            };
        }, {
            "./_core": 52,
            "./_descriptors": 55,
            "./_global": 62,
            "./_object-dp": 84,
            "./_wks": 118
        }],
        103: [function(require, module, exports) {
            var def = require("./_object-dp").f,
                has = require("./_has"),
                TAG = require("./_wks")("toStringTag");
            module.exports = function(e, r, o) {
                e && !has(e = o ? e : e.prototype, TAG) && def(e, TAG, {
                    configurable: !0,
                    value: r
                })
            };
        }, {
            "./_has": 63,
            "./_object-dp": 84,
            "./_wks": 118
        }],
        104: [function(require, module, exports) {
            var shared = require("./_shared")("keys"),
                uid = require("./_uid");
            module.exports = function(e) {
                return shared[e] || (shared[e] = uid(e))
            };
        }, {
            "./_shared": 105,
            "./_uid": 115
        }],
        105: [function(require, module, exports) {
            var global = require("./_global"),
                SHARED = "__core-js_shared__",
                store = global[SHARED] || (global[SHARED] = {});
            module.exports = function(o) {
                return store[o] || (store[o] = {})
            };
        }, {
            "./_global": 62
        }],
        106: [function(require, module, exports) {
            var anObject = require("./_an-object"),
                aFunction = require("./_a-function"),
                SPECIES = require("./_wks")("species");
            module.exports = function(e, n) {
                var r, t = anObject(e).constructor;
                return void 0 === t || void 0 == (r = anObject(t)[SPECIES]) ? n : aFunction(r)
            };
        }, {
            "./_a-function": 45,
            "./_an-object": 48,
            "./_wks": 118
        }],
        107: [function(require, module, exports) {
            var toInteger = require("./_to-integer"),
                defined = require("./_defined");
            module.exports = function(e) {
                return function(r, t) {
                    var n, i, d = String(defined(r)),
                        o = toInteger(t),
                        u = d.length;
                    return o < 0 || o >= u ? e ? "" : void 0 : (n = d.charCodeAt(o), n < 55296 || n > 56319 || o + 1 === u || (i = d.charCodeAt(o + 1)) < 56320 || i > 57343 ? e ? d.charAt(o) : n : e ? d.slice(o, o + 2) : i - 56320 + (n - 55296 << 10) + 65536)
                }
            };
        }, {
            "./_defined": 54,
            "./_to-integer": 110
        }],
        108: [function(require, module, exports) {
            var ctx = require("./_ctx"),
                invoke = require("./_invoke"),
                html = require("./_html"),
                cel = require("./_dom-create"),
                global = require("./_global"),
                process = global.process,
                setTask = global.setImmediate,
                clearTask = global.clearImmediate,
                MessageChannel = global.MessageChannel,
                Dispatch = global.Dispatch,
                counter = 0,
                queue = {},
                ONREADYSTATECHANGE = "onreadystatechange",
                defer, channel, port, run = function() {
                    var e = +this;
                    if (queue.hasOwnProperty(e)) {
                        var t = queue[e];
                        delete queue[e], t()
                    }
                },
                listener = function(e) {
                    run.call(e.data)
                };
            setTask && clearTask || (setTask = function(e) {
                for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
                return queue[++counter] = function() {
                    invoke("function" == typeof e ? e : Function(e), t)
                }, defer(counter), counter
            }, clearTask = function(e) {
                delete queue[e]
            }, "process" == require("./_cof")(process) ? defer = function(e) {
                process.nextTick(ctx(run, e, 1))
            } : Dispatch && Dispatch.now ? defer = function(e) {
                Dispatch.now(ctx(run, e, 1))
            } : MessageChannel ? (channel = new MessageChannel, port = channel.port2, channel.port1.onmessage = listener, defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(e) {
                global.postMessage(e + "", "*")
            }, global.addEventListener("message", listener, !1)) : defer = ONREADYSTATECHANGE in cel("script") ? function(e) {
                html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
                    html.removeChild(this), run.call(e)
                }
            } : function(e) {
                setTimeout(ctx(run, e, 1), 0)
            }), module.exports = {
                set: setTask,
                clear: clearTask
            };
        }, {
            "./_cof": 51,
            "./_ctx": 53,
            "./_dom-create": 56,
            "./_global": 62,
            "./_html": 65,
            "./_invoke": 67
        }],
        109: [function(require, module, exports) {
            var toInteger = require("./_to-integer"),
                max = Math.max,
                min = Math.min;
            module.exports = function(e, t) {
                return e = toInteger(e), e < 0 ? max(e + t, 0) : min(e, t)
            };
        }, {
            "./_to-integer": 110
        }],
        110: [function(require, module, exports) {
            var ceil = Math.ceil,
                floor = Math.floor;
            module.exports = function(o) {
                return isNaN(o = +o) ? 0 : (o > 0 ? floor : ceil)(o)
            };
        }, {}],
        111: [function(require, module, exports) {
            var IObject = require("./_iobject"),
                defined = require("./_defined");
            module.exports = function(e) {
                return IObject(defined(e))
            };
        }, {
            "./_defined": 54,
            "./_iobject": 68
        }],
        112: [function(require, module, exports) {
            var toInteger = require("./_to-integer"),
                min = Math.min;
            module.exports = function(e) {
                return e > 0 ? min(toInteger(e), 9007199254740991) : 0
            };
        }, {
            "./_to-integer": 110
        }],
        113: [function(require, module, exports) {
            var defined = require("./_defined");
            module.exports = function(e) {
                return Object(defined(e))
            };
        }, {
            "./_defined": 54
        }],
        114: [function(require, module, exports) {
            var isObject = require("./_is-object");
            module.exports = function(t, e) {
                if (!isObject(t)) return t;
                var r, i;
                if (e && "function" == typeof(r = t.toString) && !isObject(i = r.call(t))) return i;
                if ("function" == typeof(r = t.valueOf) && !isObject(i = r.call(t))) return i;
                if (!e && "function" == typeof(r = t.toString) && !isObject(i = r.call(t))) return i;
                throw TypeError("Can't convert object to primitive value")
            };
        }, {
            "./_is-object": 71
        }],
        115: [function(require, module, exports) {
            var id = 0,
                px = Math.random();
            module.exports = function(o) {
                return "Symbol(".concat(void 0 === o ? "" : o, ")_", (++id + px).toString(36))
            };
        }, {}],
        116: [function(require, module, exports) {
            var global = require("./_global"),
                core = require("./_core"),
                LIBRARY = require("./_library"),
                wksExt = require("./_wks-ext"),
                defineProperty = require("./_object-dp").f;
            module.exports = function(e) {
                var r = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
                "_" == e.charAt(0) || e in r || defineProperty(r, e, {
                    value: wksExt.f(e)
                })
            };
        }, {
            "./_core": 52,
            "./_global": 62,
            "./_library": 78,
            "./_object-dp": 84,
            "./_wks-ext": 117
        }],
        117: [function(require, module, exports) {
            exports.f = require("./_wks");
        }, {
            "./_wks": 118
        }],
        118: [function(require, module, exports) {
            var store = require("./_shared")("wks"),
                uid = require("./_uid"),
                Symbol = require("./_global").Symbol,
                USE_SYMBOL = "function" == typeof Symbol,
                $exports = module.exports = function(o) {
                    return store[o] || (store[o] = USE_SYMBOL && Symbol[o] || (USE_SYMBOL ? Symbol : uid)("Symbol." + o))
                };
            $exports.store = store;
        }, {
            "./_global": 62,
            "./_shared": 105,
            "./_uid": 115
        }],
        119: [function(require, module, exports) {
            var classof = require("./_classof"),
                ITERATOR = require("./_wks")("iterator"),
                Iterators = require("./_iterators");
            module.exports = require("./_core").getIteratorMethod = function(r) {
                if (void 0 != r) return r[ITERATOR] || r["@@iterator"] || Iterators[classof(r)]
            };
        }, {
            "./_classof": 50,
            "./_core": 52,
            "./_iterators": 77,
            "./_wks": 118
        }],
        120: [function(require, module, exports) {
            var anObject = require("./_an-object"),
                get = require("./core.get-iterator-method");
            module.exports = require("./_core").getIterator = function(e) {
                var r = get(e);
                if ("function" != typeof r) throw TypeError(e + " is not iterable!");
                return anObject(r.call(e))
            };
        }, {
            "./_an-object": 48,
            "./_core": 52,
            "./core.get-iterator-method": 119
        }],
        121: [function(require, module, exports) {
            var classof = require("./_classof"),
                ITERATOR = require("./_wks")("iterator"),
                Iterators = require("./_iterators");
            module.exports = require("./_core").isIterable = function(r) {
                var e = Object(r);
                return void 0 !== e[ITERATOR] || "@@iterator" in e || Iterators.hasOwnProperty(classof(e))
            };
        }, {
            "./_classof": 50,
            "./_core": 52,
            "./_iterators": 77,
            "./_wks": 118
        }],
        122: [function(require, module, exports) {
            "use strict";
            var addToUnscopables = require("./_add-to-unscopables"),
                step = require("./_iter-step"),
                Iterators = require("./_iterators"),
                toIObject = require("./_to-iobject");
            module.exports = require("./_iter-define")(Array, "Array", function(e, t) {
                this._t = toIObject(e), this._i = 0, this._k = t
            }, function() {
                var e = this._t,
                    t = this._k,
                    s = this._i++;
                return !e || s >= e.length ? (this._t = void 0, step(1)) : "keys" == t ? step(0, s) : "values" == t ? step(0, e[s]) : step(0, [s, e[s]])
            }, "values"), Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), addToUnscopables("entries");
        }, {
            "./_add-to-unscopables": 46,
            "./_iter-define": 74,
            "./_iter-step": 76,
            "./_iterators": 77,
            "./_to-iobject": 111
        }],
        123: [function(require, module, exports) {
            var $export = require("./_export");
            $export($export.S, "Number", {
                isNaN: function(r) {
                    return r != r
                }
            });
        }, {
            "./_export": 59
        }],
        124: [function(require, module, exports) {
            var $export = require("./_export");
            $export($export.S + $export.F, "Object", {
                assign: require("./_object-assign")
            });
        }, {
            "./_export": 59,
            "./_object-assign": 82
        }],
        125: [function(require, module, exports) {
            var $export = require("./_export");
            $export($export.S, "Object", {
                create: require("./_object-create")
            });
        }, {
            "./_export": 59,
            "./_object-create": 83
        }],
        126: [function(require, module, exports) {
            var $export = require("./_export");
            $export($export.S + $export.F * !require("./_descriptors"), "Object", {
                defineProperty: require("./_object-dp").f
            });
        }, {
            "./_descriptors": 55,
            "./_export": 59,
            "./_object-dp": 84
        }],
        127: [function(require, module, exports) {
            var toObject = require("./_to-object"),
                $getPrototypeOf = require("./_object-gpo");
            require("./_object-sap")("getPrototypeOf", function() {
                return function(t) {
                    return $getPrototypeOf(toObject(t))
                }
            });
        }, {
            "./_object-gpo": 90,
            "./_object-sap": 94,
            "./_to-object": 113
        }],
        128: [function(require, module, exports) {
            var toObject = require("./_to-object"),
                $keys = require("./_object-keys");
            require("./_object-sap")("keys", function() {
                return function(e) {
                    return $keys(toObject(e))
                }
            });
        }, {
            "./_object-keys": 92,
            "./_object-sap": 94,
            "./_to-object": 113
        }],
        129: [function(require, module, exports) {
            var $export = require("./_export");
            $export($export.S, "Object", {
                setPrototypeOf: require("./_set-proto").set
            });
        }, {
            "./_export": 59,
            "./_set-proto": 101
        }],
        130: [function(require, module, exports) {
            arguments[4][28][0].apply(exports, arguments)
        }, {
            "dup": 28
        }],
        131: [function(require, module, exports) {
            "use strict";
            var LIBRARY = require("./_library"),
                global = require("./_global"),
                ctx = require("./_ctx"),
                classof = require("./_classof"),
                $export = require("./_export"),
                isObject = require("./_is-object"),
                aFunction = require("./_a-function"),
                anInstance = require("./_an-instance"),
                forOf = require("./_for-of"),
                speciesConstructor = require("./_species-constructor"),
                task = require("./_task").set,
                microtask = require("./_microtask")(),
                newPromiseCapabilityModule = require("./_new-promise-capability"),
                perform = require("./_perform"),
                promiseResolve = require("./_promise-resolve"),
                PROMISE = "Promise",
                TypeError = global.TypeError,
                process = global.process,
                $Promise = global[PROMISE],
                isNode = "process" == classof(process),
                empty = function() {},
                Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper, newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f,
                USE_NATIVE = !! function() {
                    try {
                        var e = $Promise.resolve(1),
                            r = (e.constructor = {})[require("./_wks")("species")] = function(e) {
                                e(empty, empty)
                            };
                        return (isNode || "function" == typeof PromiseRejectionEvent) && e.then(empty) instanceof r
                    } catch (e) {}
                }(),
                isThenable = function(e) {
                    var r;
                    return !(!isObject(e) || "function" != typeof(r = e.then)) && r
                },
                notify = function(e, r) {
                    if (!e._n) {
                        e._n = !0;
                        var i = e._c;
                        microtask(function() {
                            for (var t = e._v, o = 1 == e._s, n = 0; i.length > n;) ! function(r) {
                                var i, n, s = o ? r.ok : r.fail,
                                    a = r.resolve,
                                    c = r.reject,
                                    l = r.domain;
                                try {
                                    s ? (o || (2 == e._h && onHandleUnhandled(e), e._h = 1), !0 === s ? i = t : (l && l.enter(), i = s(t), l && l.exit()), i === r.promise ? c(TypeError("Promise-chain cycle")) : (n = isThenable(i)) ? n.call(i, a, c) : a(i)) : c(t)
                                } catch (e) {
                                    c(e)
                                }
                            }(i[n++]);
                            e._c = [], e._n = !1, r && !e._h && onUnhandled(e)
                        })
                    }
                },
                onUnhandled = function(e) {
                    task.call(global, function() {
                        var r, i, t, o = e._v,
                            n = isUnhandled(e);
                        if (n && (r = perform(function() {
                                isNode ? process.emit("unhandledRejection", o, e) : (i = global.onunhandledrejection) ? i({
                                    promise: e,
                                    reason: o
                                }) : (t = global.console) && t.error && t.error("Unhandled promise rejection", o)
                            }), e._h = isNode || isUnhandled(e) ? 2 : 1), e._a = void 0, n && r.e) throw r.v
                    })
                },
                isUnhandled = function(e) {
                    if (1 == e._h) return !1;
                    for (var r, i = e._a || e._c, t = 0; i.length > t;)
                        if (r = i[t++], r.fail || !isUnhandled(r.promise)) return !1;
                    return !0
                },
                onHandleUnhandled = function(e) {
                    task.call(global, function() {
                        var r;
                        isNode ? process.emit("rejectionHandled", e) : (r = global.onrejectionhandled) && r({
                            promise: e,
                            reason: e._v
                        })
                    })
                },
                $reject = function(e) {
                    var r = this;
                    r._d || (r._d = !0, r = r._w || r, r._v = e, r._s = 2, r._a || (r._a = r._c.slice()), notify(r, !0))
                },
                $resolve = function(e) {
                    var r, i = this;
                    if (!i._d) {
                        i._d = !0, i = i._w || i;
                        try {
                            if (i === e) throw TypeError("Promise can't be resolved itself");
                            (r = isThenable(e)) ? microtask(function() {
                                var t = {
                                    _w: i,
                                    _d: !1
                                };
                                try {
                                    r.call(e, ctx($resolve, t, 1), ctx($reject, t, 1))
                                } catch (e) {
                                    $reject.call(t, e)
                                }
                            }): (i._v = e, i._s = 1, notify(i, !1))
                        } catch (e) {
                            $reject.call({
                                _w: i,
                                _d: !1
                            }, e)
                        }
                    }
                };
            USE_NATIVE || ($Promise = function(e) {
                anInstance(this, $Promise, PROMISE, "_h"), aFunction(e), Internal.call(this);
                try {
                    e(ctx($resolve, this, 1), ctx($reject, this, 1))
                } catch (e) {
                    $reject.call(this, e)
                }
            }, Internal = function(e) {
                this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
            }, Internal.prototype = require("./_redefine-all")($Promise.prototype, {
                then: function(e, r) {
                    var i = newPromiseCapability(speciesConstructor(this, $Promise));
                    return i.ok = "function" != typeof e || e, i.fail = "function" == typeof r && r, i.domain = isNode ? process.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && notify(this, !1), i.promise
                },
                catch: function(e) {
                    return this.then(void 0, e)
                }
            }), OwnPromiseCapability = function() {
                var e = new Internal;
                this.promise = e, this.resolve = ctx($resolve, e, 1), this.reject = ctx($reject, e, 1)
            }, newPromiseCapabilityModule.f = newPromiseCapability = function(e) {
                return e === $Promise || e === Wrapper ? new OwnPromiseCapability(e) : newGenericPromiseCapability(e)
            }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
                Promise: $Promise
            }), require("./_set-to-string-tag")($Promise, PROMISE), require("./_set-species")(PROMISE), Wrapper = require("./_core")[PROMISE], $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
                reject: function(e) {
                    var r = newPromiseCapability(this);
                    return (0, r.reject)(e), r.promise
                }
            }), $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
                resolve: function(e) {
                    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, e)
                }
            }), $export($export.S + $export.F * !(USE_NATIVE && require("./_iter-detect")(function(e) {
                $Promise.all(e).catch(empty)
            })), PROMISE, {
                all: function(e) {
                    var r = this,
                        i = newPromiseCapability(r),
                        t = i.resolve,
                        o = i.reject,
                        n = perform(function() {
                            var i = [],
                                n = 0,
                                s = 1;
                            forOf(e, !1, function(e) {
                                var a = n++,
                                    c = !1;
                                i.push(void 0), s++, r.resolve(e).then(function(e) {
                                    c || (c = !0, i[a] = e, --s || t(i))
                                }, o)
                            }), --s || t(i)
                        });
                    return n.e && o(n.v), i.promise
                },
                race: function(e) {
                    var r = this,
                        i = newPromiseCapability(r),
                        t = i.reject,
                        o = perform(function() {
                            forOf(e, !1, function(e) {
                                r.resolve(e).then(i.resolve, t)
                            })
                        });
                    return o.e && t(o.v), i.promise
                }
            });
        }, {
            "./_a-function": 45,
            "./_an-instance": 47,
            "./_classof": 50,
            "./_core": 52,
            "./_ctx": 53,
            "./_export": 59,
            "./_for-of": 61,
            "./_global": 62,
            "./_is-object": 71,
            "./_iter-detect": 75,
            "./_library": 78,
            "./_microtask": 80,
            "./_new-promise-capability": 81,
            "./_perform": 96,
            "./_promise-resolve": 97,
            "./_redefine-all": 99,
            "./_set-species": 102,
            "./_set-to-string-tag": 103,
            "./_species-constructor": 106,
            "./_task": 108,
            "./_wks": 118
        }],
        132: [function(require, module, exports) {
            "use strict";
            var $at = require("./_string-at")(!0);
            require("./_iter-define")(String, "String", function(t) {
                this._t = String(t), this._i = 0
            }, function() {
                var t, i = this._t,
                    e = this._i;
                return e >= i.length ? {
                    value: void 0,
                    done: !0
                } : (t = $at(i, e), this._i += t.length, {
                    value: t,
                    done: !1
                })
            });
        }, {
            "./_iter-define": 74,
            "./_string-at": 107
        }],
        133: [function(require, module, exports) {
            "use strict";
            var global = require("./_global"),
                has = require("./_has"),
                DESCRIPTORS = require("./_descriptors"),
                $export = require("./_export"),
                redefine = require("./_redefine"),
                META = require("./_meta").KEY,
                $fails = require("./_fails"),
                shared = require("./_shared"),
                setToStringTag = require("./_set-to-string-tag"),
                uid = require("./_uid"),
                wks = require("./_wks"),
                wksExt = require("./_wks-ext"),
                wksDefine = require("./_wks-define"),
                enumKeys = require("./_enum-keys"),
                isArray = require("./_is-array"),
                anObject = require("./_an-object"),
                toIObject = require("./_to-iobject"),
                toPrimitive = require("./_to-primitive"),
                createDesc = require("./_property-desc"),
                _create = require("./_object-create"),
                gOPNExt = require("./_object-gopn-ext"),
                $GOPD = require("./_object-gopd"),
                $DP = require("./_object-dp"),
                $keys = require("./_object-keys"),
                gOPD = $GOPD.f,
                dP = $DP.f,
                gOPN = gOPNExt.f,
                $Symbol = global.Symbol,
                $JSON = global.JSON,
                _stringify = $JSON && $JSON.stringify,
                PROTOTYPE = "prototype",
                HIDDEN = wks("_hidden"),
                TO_PRIMITIVE = wks("toPrimitive"),
                isEnum = {}.propertyIsEnumerable,
                SymbolRegistry = shared("symbol-registry"),
                AllSymbols = shared("symbols"),
                OPSymbols = shared("op-symbols"),
                ObjectProto = Object[PROTOTYPE],
                USE_NATIVE = "function" == typeof $Symbol,
                QObject = global.QObject,
                setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild,
                setSymbolDesc = DESCRIPTORS && $fails(function() {
                    return 7 != _create(dP({}, "a", {
                        get: function() {
                            return dP(this, "a", {
                                value: 7
                            }).a
                        }
                    })).a
                }) ? function(e, r, t) {
                    var o = gOPD(ObjectProto, r);
                    o && delete ObjectProto[r], dP(e, r, t), o && e !== ObjectProto && dP(ObjectProto, r, o)
                } : dP,
                wrap = function(e) {
                    var r = AllSymbols[e] = _create($Symbol[PROTOTYPE]);
                    return r._k = e, r
                },
                isSymbol = USE_NATIVE && "symbol" == typeof $Symbol.iterator ? function(e) {
                    return "symbol" == typeof e
                } : function(e) {
                    return e instanceof $Symbol
                },
                $defineProperty = function(e, r, t) {
                    return e === ObjectProto && $defineProperty(OPSymbols, r, t), anObject(e), r = toPrimitive(r, !0), anObject(t), has(AllSymbols, r) ? (t.enumerable ? (has(e, HIDDEN) && e[HIDDEN][r] && (e[HIDDEN][r] = !1), t = _create(t, {
                        enumerable: createDesc(0, !1)
                    })) : (has(e, HIDDEN) || dP(e, HIDDEN, createDesc(1, {})), e[HIDDEN][r] = !0), setSymbolDesc(e, r, t)) : dP(e, r, t)
                },
                $defineProperties = function(e, r) {
                    anObject(e);
                    for (var t, o = enumKeys(r = toIObject(r)), i = 0, s = o.length; s > i;) $defineProperty(e, t = o[i++], r[t]);
                    return e
                },
                $create = function(e, r) {
                    return void 0 === r ? _create(e) : $defineProperties(_create(e), r)
                },
                $propertyIsEnumerable = function(e) {
                    var r = isEnum.call(this, e = toPrimitive(e, !0));
                    return !(this === ObjectProto && has(AllSymbols, e) && !has(OPSymbols, e)) && (!(r || !has(this, e) || !has(AllSymbols, e) || has(this, HIDDEN) && this[HIDDEN][e]) || r)
                },
                $getOwnPropertyDescriptor = function(e, r) {
                    if (e = toIObject(e), r = toPrimitive(r, !0), e !== ObjectProto || !has(AllSymbols, r) || has(OPSymbols, r)) {
                        var t = gOPD(e, r);
                        return !t || !has(AllSymbols, r) || has(e, HIDDEN) && e[HIDDEN][r] || (t.enumerable = !0), t
                    }
                },
                $getOwnPropertyNames = function(e) {
                    for (var r, t = gOPN(toIObject(e)), o = [], i = 0; t.length > i;) has(AllSymbols, r = t[i++]) || r == HIDDEN || r == META || o.push(r);
                    return o
                },
                $getOwnPropertySymbols = function(e) {
                    for (var r, t = e === ObjectProto, o = gOPN(t ? OPSymbols : toIObject(e)), i = [], s = 0; o.length > s;) !has(AllSymbols, r = o[s++]) || t && !has(ObjectProto, r) || i.push(AllSymbols[r]);
                    return i
                };
            USE_NATIVE || ($Symbol = function() {
                if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
                var e = uid(arguments.length > 0 ? arguments[0] : void 0),
                    r = function(t) {
                        this === ObjectProto && r.call(OPSymbols, t), has(this, HIDDEN) && has(this[HIDDEN], e) && (this[HIDDEN][e] = !1), setSymbolDesc(this, e, createDesc(1, t))
                    };
                return DESCRIPTORS && setter && setSymbolDesc(ObjectProto, e, {
                    configurable: !0,
                    set: r
                }), wrap(e)
            }, redefine($Symbol[PROTOTYPE], "toString", function() {
                return this._k
            }), $GOPD.f = $getOwnPropertyDescriptor, $DP.f = $defineProperty, require("./_object-gopn").f = gOPNExt.f = $getOwnPropertyNames, require("./_object-pie").f = $propertyIsEnumerable, require("./_object-gops").f = $getOwnPropertySymbols, DESCRIPTORS && !require("./_library") && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0), wksExt.f = function(e) {
                return wrap(wks(e))
            }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
                Symbol: $Symbol
            });
            for (var es6Symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j;) wks(es6Symbols[j++]);
            for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);
            $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
                for: function(e) {
                    return has(SymbolRegistry, e += "") ? SymbolRegistry[e] : SymbolRegistry[e] = $Symbol(e)
                },
                keyFor: function(e) {
                    if (!isSymbol(e)) throw TypeError(e + " is not a symbol!");
                    for (var r in SymbolRegistry)
                        if (SymbolRegistry[r] === e) return r
                },
                useSetter: function() {
                    setter = !0
                },
                useSimple: function() {
                    setter = !1
                }
            }), $export($export.S + $export.F * !USE_NATIVE, "Object", {
                create: $create,
                defineProperty: $defineProperty,
                defineProperties: $defineProperties,
                getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
                getOwnPropertyNames: $getOwnPropertyNames,
                getOwnPropertySymbols: $getOwnPropertySymbols
            }), $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
                var e = $Symbol();
                return "[null]" != _stringify([e]) || "{}" != _stringify({
                    a: e
                }) || "{}" != _stringify(Object(e))
            })), "JSON", {
                stringify: function(e) {
                    if (void 0 !== e && !isSymbol(e)) {
                        for (var r, t, o = [e], i = 1; arguments.length > i;) o.push(arguments[i++]);
                        return r = o[1], "function" == typeof r && (t = r), !t && isArray(r) || (r = function(e, r) {
                            if (t && (r = t.call(this, e, r)), !isSymbol(r)) return r
                        }), o[1] = r, _stringify.apply($JSON, o)
                    }
                }
            }), $Symbol[PROTOTYPE][TO_PRIMITIVE] || require("./_hide")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf), setToStringTag($Symbol, "Symbol"), setToStringTag(Math, "Math", !0), setToStringTag(global.JSON, "JSON", !0);
        }, {
            "./_an-object": 48,
            "./_descriptors": 55,
            "./_enum-keys": 58,
            "./_export": 59,
            "./_fails": 60,
            "./_global": 62,
            "./_has": 63,
            "./_hide": 64,
            "./_is-array": 70,
            "./_library": 78,
            "./_meta": 79,
            "./_object-create": 83,
            "./_object-dp": 84,
            "./_object-gopd": 86,
            "./_object-gopn": 88,
            "./_object-gopn-ext": 87,
            "./_object-gops": 89,
            "./_object-keys": 92,
            "./_object-pie": 93,
            "./_property-desc": 98,
            "./_redefine": 100,
            "./_set-to-string-tag": 103,
            "./_shared": 105,
            "./_to-iobject": 111,
            "./_to-primitive": 114,
            "./_uid": 115,
            "./_wks": 118,
            "./_wks-define": 116,
            "./_wks-ext": 117
        }],
        134: [function(require, module, exports) {
            var $export = require("./_export"),
                $entries = require("./_object-to-array")(!0);
            $export($export.S, "Object", {
                entries: function(e) {
                    return $entries(e)
                }
            });
        }, {
            "./_export": 59,
            "./_object-to-array": 95
        }],
        135: [function(require, module, exports) {
            "use strict";
            var $export = require("./_export"),
                core = require("./_core"),
                global = require("./_global"),
                speciesConstructor = require("./_species-constructor"),
                promiseResolve = require("./_promise-resolve");
            $export($export.P + $export.R, "Promise", {
                finally: function(e) {
                    var r = speciesConstructor(this, core.Promise || global.Promise),
                        o = "function" == typeof e;
                    return this.then(o ? function(o) {
                        return promiseResolve(r, e()).then(function() {
                            return o
                        })
                    } : e, o ? function(o) {
                        return promiseResolve(r, e()).then(function() {
                            throw o
                        })
                    } : e)
                }
            });
        }, {
            "./_core": 52,
            "./_export": 59,
            "./_global": 62,
            "./_promise-resolve": 97,
            "./_species-constructor": 106
        }],
        136: [function(require, module, exports) {
            "use strict";
            var $export = require("./_export"),
                newPromiseCapability = require("./_new-promise-capability"),
                perform = require("./_perform");
            $export($export.S, "Promise", {
                try: function(r) {
                    var e = newPromiseCapability.f(this),
                        i = perform(r);
                    return (i.e ? e.reject : e.resolve)(i.v), e.promise
                }
            });
        }, {
            "./_export": 59,
            "./_new-promise-capability": 81,
            "./_perform": 96
        }],
        137: [function(require, module, exports) {
            require("./_wks-define")("asyncIterator");
        }, {
            "./_wks-define": 116
        }],
        138: [function(require, module, exports) {
            require("./_wks-define")("observable");
        }, {
            "./_wks-define": 116
        }],
        139: [function(require, module, exports) {
            require("./es6.array.iterator");
            for (var global = require("./_global"), hide = require("./_hide"), Iterators = require("./_iterators"), TO_STRING_TAG = require("./_wks")("toStringTag"), DOMIterables = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), i = 0; i < DOMIterables.length; i++) {
                var NAME = DOMIterables[i],
                    Collection = global[NAME],
                    proto = Collection && Collection.prototype;
                proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array
            }
        }, {
            "./_global": 62,
            "./_hide": 64,
            "./_iterators": 77,
            "./_wks": 118,
            "./es6.array.iterator": 122
        }],
        140: [function(require, module, exports) {
            (function(Buffer) {
                function isArray(r) {
                    return Array.isArray ? Array.isArray(r) : "[object Array]" === objectToString(r)
                }

                function isBoolean(r) {
                    return "boolean" == typeof r
                }

                function isNull(r) {
                    return null === r
                }

                function isNullOrUndefined(r) {
                    return null == r
                }

                function isNumber(r) {
                    return "number" == typeof r
                }

                function isString(r) {
                    return "string" == typeof r
                }

                function isSymbol(r) {
                    return "symbol" == typeof r
                }

                function isUndefined(r) {
                    return void 0 === r
                }

                function isRegExp(r) {
                    return "[object RegExp]" === objectToString(r)
                }

                function isObject(r) {
                    return "object" == typeof r && null !== r
                }

                function isDate(r) {
                    return "[object Date]" === objectToString(r)
                }

                function isError(r) {
                    return "[object Error]" === objectToString(r) || r instanceof Error
                }

                function isFunction(r) {
                    return "function" == typeof r
                }

                function isPrimitive(r) {
                    return null === r || "boolean" == typeof r || "number" == typeof r || "string" == typeof r || "symbol" == typeof r || void 0 === r
                }

                function objectToString(r) {
                    return Object.prototype.toString.call(r)
                }
                exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = Buffer.isBuffer;
            }).call(this, {
                "isBuffer": require("../../is-buffer/index.js")
            })

        }, {
            "../../is-buffer/index.js": 144
        }],
        141: [function(require, module, exports) {
            function EventEmitter() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function isFunction(e) {
                return "function" == typeof e
            }

            function isNumber(e) {
                return "number" == typeof e
            }

            function isObject(e) {
                return "object" == typeof e && null !== e
            }

            function isUndefined(e) {
                return void 0 === e
            }
            module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function(e) {
                if (!isNumber(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, EventEmitter.prototype.emit = function(e) {
                var t, i, n, s, r, o;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                    if ((t = arguments[1]) instanceof Error) throw t;
                    var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw h.context = t, h
                }
                if (i = this._events[e], isUndefined(i)) return !1;
                if (isFunction(i)) switch (arguments.length) {
                    case 1:
                        i.call(this);
                        break;
                    case 2:
                        i.call(this, arguments[1]);
                        break;
                    case 3:
                        i.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        s = Array.prototype.slice.call(arguments, 1), i.apply(this, s)
                } else if (isObject(i))
                    for (s = Array.prototype.slice.call(arguments, 1), o = i.slice(), n = o.length, r = 0; r < n; r++) o[r].apply(this, s);
                return !0
            }, EventEmitter.prototype.addListener = function(e, t) {
                var i;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, isFunction(t.listener) ? t.listener : t), this._events[e] ? isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, isObject(this._events[e]) && !this._events[e].warned && (i = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
            }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(e, t) {
                function i() {
                    this.removeListener(e, i), n || (n = !0, t.apply(this, arguments))
                }
                if (!isFunction(t)) throw TypeError("listener must be a function");
                var n = !1;
                return i.listener = t, this.on(e, i), this
            }, EventEmitter.prototype.removeListener = function(e, t) {
                var i, n, s, r;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (i = this._events[e], s = i.length, n = -1, i === t || isFunction(i.listener) && i.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (isObject(i)) {
                    for (r = s; r-- > 0;)
                        if (i[r] === t || i[r].listener && i[r].listener === t) {
                            n = r;
                            break
                        }
                    if (n < 0) return this;
                    1 === i.length ? (i.length = 0, delete this._events[e]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, EventEmitter.prototype.removeAllListeners = function(e) {
                var t, i;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (i = this._events[e], isFunction(i)) this.removeListener(e, i);
                else if (i)
                    for (; i.length;) this.removeListener(e, i[i.length - 1]);
                return delete this._events[e], this
            }, EventEmitter.prototype.listeners = function(e) {
                return this._events && this._events[e] ? isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, EventEmitter.prototype.listenerCount = function(e) {
                if (this._events) {
                    var t = this._events[e];
                    if (isFunction(t)) return 1;
                    if (t) return t.length
                }
                return 0
            }, EventEmitter.listenerCount = function(e, t) {
                return e.listenerCount(t)
            };
        }, {}],
        142: [function(require, module, exports) {
            exports.read = function(a, o, t, r, h) {
                var M, p, w = 8 * h - r - 1,
                    f = (1 << w) - 1,
                    e = f >> 1,
                    i = -7,
                    N = t ? h - 1 : 0,
                    n = t ? -1 : 1,
                    s = a[o + N];
                for (N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8);
                for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8);
                if (0 === M) M = 1 - e;
                else {
                    if (M === f) return p ? NaN : 1 / 0 * (s ? -1 : 1);
                    p += Math.pow(2, r), M -= e
                }
                return (s ? -1 : 1) * p * Math.pow(2, M - r)
            }, exports.write = function(a, o, t, r, h, M) {
                var p, w, f, e = 8 * M - h - 1,
                    i = (1 << e) - 1,
                    N = i >> 1,
                    n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    s = r ? 0 : M - 1,
                    u = r ? 1 : -1,
                    l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
                for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N), o * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8);
                for (p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8);
                a[t + s - u] |= 128 * l
            };
        }, {}],
        143: [function(require, module, exports) {
            "function" == typeof Object.create ? module.exports = function(t, e) {
                t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : module.exports = function(t, e) {
                t.super_ = e;
                var o = function() {};
                o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
            };
        }, {}],
        144: [function(require, module, exports) {
            function isBuffer(f) {
                return !!f.constructor && "function" == typeof f.constructor.isBuffer && f.constructor.isBuffer(f)
            }

            function isSlowBuffer(f) {
                return "function" == typeof f.readFloatLE && "function" == typeof f.slice && isBuffer(f.slice(0, 0))
            }
            module.exports = function(f) {
                return null != f && (isBuffer(f) || isSlowBuffer(f) || !!f._isBuffer)
            };
        }, {}],
        145: [function(require, module, exports) {
            var toString = {}.toString;
            module.exports = Array.isArray || function(r) {
                return "[object Array]" == toString.call(r)
            };
        }, {}],
        146: [function(require, module, exports) {
            (function(process) {
                "use strict";

                function nextTick(e, n, c, r) {
                    if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');
                    var s, t, o = arguments.length;
                    switch (o) {
                        case 0:
                        case 1:
                            return process.nextTick(e);
                        case 2:
                            return process.nextTick(function() {
                                e.call(null, n)
                            });
                        case 3:
                            return process.nextTick(function() {
                                e.call(null, n, c)
                            });
                        case 4:
                            return process.nextTick(function() {
                                e.call(null, n, c, r)
                            });
                        default:
                            for (s = new Array(o - 1), t = 0; t < s.length;) s[t++] = arguments[t];
                            return process.nextTick(function() {
                                e.apply(null, s)
                            })
                    }
                }!process.version || 0 === process.version.indexOf("v0.") || 0 === process.version.indexOf("v1.") && 0 !== process.version.indexOf("v1.8.") ? module.exports = nextTick : module.exports = process.nextTick;
            }).call(this, require('_process'))

        }, {
            "_process": 147
        }],
        147: [function(require, module, exports) {
            function defaultSetTimout() {
                throw new Error("setTimeout has not been defined")
            }

            function defaultClearTimeout() {
                throw new Error("clearTimeout has not been defined")
            }

            function runTimeout(e) {
                if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0);
                try {
                    return cachedSetTimeout(e, 0)
                } catch (t) {
                    try {
                        return cachedSetTimeout.call(null, e, 0)
                    } catch (t) {
                        return cachedSetTimeout.call(this, e, 0)
                    }
                }
            }

            function runClearTimeout(e) {
                if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e);
                try {
                    return cachedClearTimeout(e)
                } catch (t) {
                    try {
                        return cachedClearTimeout.call(null, e)
                    } catch (t) {
                        return cachedClearTimeout.call(this, e)
                    }
                }
            }

            function cleanUpNextTick() {
                draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
            }

            function drainQueue() {
                if (!draining) {
                    var e = runTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var t = queue.length; t;) {
                        for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, t = queue.length
                    }
                    currentQueue = null, draining = !1, runClearTimeout(e)
                }
            }

            function Item(e, t) {
                this.fun = e, this.array = t
            }

            function noop() {}
            var process = module.exports = {},
                cachedSetTimeout, cachedClearTimeout;
            ! function() {
                try {
                    cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout
                }
                try {
                    cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout
                }
            }();
            var queue = [],
                draining = !1,
                currentQueue, queueIndex = -1;
            process.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
            }, Item.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function(e) {
                return []
            }, process.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, process.cwd = function() {
                return "/"
            }, process.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, process.umask = function() {
                return 0
            };
        }, {}],
        148: [function(require, module, exports) {
            (function(global) {
                ! function(e) {
                    function o(e) {
                        throw new RangeError(T[e])
                    }

                    function n(e, o) {
                        for (var n = e.length, t = []; n--;) t[n] = o(e[n]);
                        return t
                    }

                    function t(e, o) {
                        var t = e.split("@"),
                            r = "";
                        return t.length > 1 && (r = t[0] + "@", e = t[1]), e = e.replace(S, "."), r + n(e.split("."), o).join(".")
                    }

                    function r(e) {
                        for (var o, n, t = [], r = 0, u = e.length; r < u;) o = e.charCodeAt(r++), o >= 55296 && o <= 56319 && r < u ? (n = e.charCodeAt(r++), 56320 == (64512 & n) ? t.push(((1023 & o) << 10) + (1023 & n) + 65536) : (t.push(o), r--)) : t.push(o);
                        return t
                    }

                    function u(e) {
                        return n(e, function(e) {
                            var o = "";
                            return e > 65535 && (e -= 65536, o += P(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += P(e)
                        }).join("")
                    }

                    function i(e) {
                        return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : b
                    }

                    function f(e, o) {
                        return e + 22 + 75 * (e < 26) - ((0 != o) << 5)
                    }

                    function c(e, o, n) {
                        var t = 0;
                        for (e = n ? M(e / j) : e >> 1, e += M(e / o); e > L * C >> 1; t += b) e = M(e / L);
                        return M(t + (L + 1) * e / (e + m))
                    }

                    function l(e) {
                        var n, t, r, f, l, s, d, p, a, h, v = [],
                            g = e.length,
                            w = 0,
                            m = I,
                            j = A;
                        for (t = e.lastIndexOf(E), t < 0 && (t = 0), r = 0; r < t; ++r) e.charCodeAt(r) >= 128 && o("not-basic"), v.push(e.charCodeAt(r));
                        for (f = t > 0 ? t + 1 : 0; f < g;) {
                            for (l = w, s = 1, d = b; f >= g && o("invalid-input"), p = i(e.charCodeAt(f++)), (p >= b || p > M((x - w) / s)) && o("overflow"), w += p * s, a = d <= j ? y : d >= j + C ? C : d - j, !(p < a); d += b) h = b - a, s > M(x / h) && o("overflow"), s *= h;
                            n = v.length + 1, j = c(w - l, n, 0 == l), M(w / n) > x - m && o("overflow"), m += M(w / n), w %= n, v.splice(w++, 0, m)
                        }
                        return u(v)
                    }

                    function s(e) {
                        var n, t, u, i, l, s, d, p, a, h, v, g, w, m, j, F = [];
                        for (e = r(e), g = e.length, n = I, t = 0, l = A, s = 0; s < g; ++s)(v = e[s]) < 128 && F.push(P(v));
                        for (u = i = F.length, i && F.push(E); u < g;) {
                            for (d = x, s = 0; s < g; ++s)(v = e[s]) >= n && v < d && (d = v);
                            for (w = u + 1, d - n > M((x - t) / w) && o("overflow"), t += (d - n) * w, n = d, s = 0; s < g; ++s)
                                if (v = e[s], v < n && ++t > x && o("overflow"), v == n) {
                                    for (p = t, a = b; h = a <= l ? y : a >= l + C ? C : a - l, !(p < h); a += b) j = p - h, m = b - h, F.push(P(f(h + j % m, 0))), p = M(j / m);
                                    F.push(P(f(p, 0))), l = c(t, w, u == i), t = 0, ++u
                                }++t, ++n
                        }
                        return F.join("")
                    }

                    function d(e) {
                        return t(e, function(e) {
                            return F.test(e) ? l(e.slice(4).toLowerCase()) : e
                        })
                    }

                    function p(e) {
                        return t(e, function(e) {
                            return O.test(e) ? "xn--" + s(e) : e
                        })
                    }
                    var a = "object" == typeof exports && exports && !exports.nodeType && exports,
                        h = "object" == typeof module && module && !module.nodeType && module,
                        v = "object" == typeof global && global;
                    v.global !== v && v.window !== v && v.self !== v || (e = v);
                    var g, w, x = 2147483647,
                        b = 36,
                        y = 1,
                        C = 26,
                        m = 38,
                        j = 700,
                        A = 72,
                        I = 128,
                        E = "-",
                        F = /^xn--/,
                        O = /[^\x20-\x7E]/,
                        S = /[\x2E\u3002\uFF0E\uFF61]/g,
                        T = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        L = b - y,
                        M = Math.floor,
                        P = String.fromCharCode;
                    if (g = {
                            version: "1.4.1",
                            ucs2: {
                                decode: r,
                                encode: u
                            },
                            decode: l,
                            encode: s,
                            toASCII: p,
                            toUnicode: d
                        }, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", function() {
                        return g
                    });
                    else if (a && h)
                        if (module.exports == a) h.exports = g;
                        else
                            for (w in g) g.hasOwnProperty(w) && (a[w] = g[w]);
                    else e.punycode = g
                }(this);
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        149: [function(require, module, exports) {
            "use strict";

            function hasOwnProperty(r, e) {
                return Object.prototype.hasOwnProperty.call(r, e)
            }
            module.exports = function(r, e, t, n) {
                e = e || "&", t = t || "=";
                var o = {};
                if ("string" != typeof r || 0 === r.length) return o;
                var a = /\+/g;
                r = r.split(e);
                var s = 1e3;
                n && "number" == typeof n.maxKeys && (s = n.maxKeys);
                var p = r.length;
                s > 0 && p > s && (p = s);
                for (var y = 0; y < p; ++y) {
                    var u, c, i, l, f = r[y].replace(a, "%20"),
                        v = f.indexOf(t);
                    v >= 0 ? (u = f.substr(0, v), c = f.substr(v + 1)) : (u = f, c = ""), i = decodeURIComponent(u), l = decodeURIComponent(c), hasOwnProperty(o, i) ? isArray(o[i]) ? o[i].push(l) : o[i] = [o[i], l] : o[i] = l
                }
                return o
            };
            var isArray = Array.isArray || function(r) {
                return "[object Array]" === Object.prototype.toString.call(r)
            };
        }, {}],
        150: [function(require, module, exports) {
            "use strict";

            function map(r, e) {
                if (r.map) return r.map(e);
                for (var t = [], n = 0; n < r.length; n++) t.push(e(r[n], n));
                return t
            }
            var stringifyPrimitive = function(r) {
                switch (typeof r) {
                    case "string":
                        return r;
                    case "boolean":
                        return r ? "true" : "false";
                    case "number":
                        return isFinite(r) ? r : "";
                    default:
                        return ""
                }
            };
            module.exports = function(r, e, t, n) {
                return e = e || "&", t = t || "=", null === r && (r = void 0), "object" == typeof r ? map(objectKeys(r), function(n) {
                    var i = encodeURIComponent(stringifyPrimitive(n)) + t;
                    return isArray(r[n]) ? map(r[n], function(r) {
                        return i + encodeURIComponent(stringifyPrimitive(r))
                    }).join(e) : i + encodeURIComponent(stringifyPrimitive(r[n]))
                }).join(e) : n ? encodeURIComponent(stringifyPrimitive(n)) + t + encodeURIComponent(stringifyPrimitive(r)) : ""
            };
            var isArray = Array.isArray || function(r) {
                    return "[object Array]" === Object.prototype.toString.call(r)
                },
                objectKeys = Object.keys || function(r) {
                    var e = [];
                    for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && e.push(t);
                    return e
                };
        }, {}],
        151: [function(require, module, exports) {
            "use strict";
            exports.decode = exports.parse = require("./decode"), exports.encode = exports.stringify = require("./encode");
        }, {
            "./decode": 149,
            "./encode": 150
        }],
        152: [function(require, module, exports) {
            module.exports = require("./lib/_stream_duplex.js");
        }, {
            "./lib/_stream_duplex.js": 153
        }],
        153: [function(require, module, exports) {
            "use strict";

            function Duplex(e) {
                if (!(this instanceof Duplex)) return new Duplex(e);
                Readable.call(this, e), Writable.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", onend)
            }

            function onend() {
                this.allowHalfOpen || this._writableState.ended || processNextTick(onEndNT, this)
            }

            function onEndNT(e) {
                e.end()
            }

            function forEach(e, t) {
                for (var r = 0, i = e.length; r < i; r++) t(e[r], r)
            }
            var processNextTick = require("process-nextick-args"),
                objectKeys = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
            module.exports = Duplex;
            var util = require("core-util-is");
            util.inherits = require("inherits");
            var Readable = require("./_stream_readable"),
                Writable = require("./_stream_writable");
            util.inherits(Duplex, Readable);
            for (var keys = objectKeys(Writable.prototype), v = 0; v < keys.length; v++) {
                var method = keys[v];
                Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method])
            }
            Object.defineProperty(Duplex.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                },
                set: function(e) {
                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                }
            }), Duplex.prototype._destroy = function(e, t) {
                this.push(null), this.end(), processNextTick(t, e)
            };
        }, {
            "./_stream_readable": 155,
            "./_stream_writable": 157,
            "core-util-is": 140,
            "inherits": 143,
            "process-nextick-args": 146
        }],
        154: [function(require, module, exports) {
            "use strict";

            function PassThrough(r) {
                if (!(this instanceof PassThrough)) return new PassThrough(r);
                Transform.call(this, r)
            }
            module.exports = PassThrough;
            var Transform = require("./_stream_transform"),
                util = require("core-util-is");
            util.inherits = require("inherits"), util.inherits(PassThrough, Transform), PassThrough.prototype._transform = function(r, s, i) {
                i(null, r)
            };
        }, {
            "./_stream_transform": 156,
            "core-util-is": 140,
            "inherits": 143
        }],
        155: [function(require, module, exports) {
            (function(process, global) {
                "use strict";

                function _uint8ArrayToBuffer(e) {
                    return Buffer.from(e)
                }

                function _isUint8Array(e) {
                    return Buffer.isBuffer(e) || e instanceof OurUint8Array
                }

                function prependListener(e, t, r) {
                    if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                    e._events && e._events[t] ? isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                }

                function ReadableState(e, t) {
                    Duplex = Duplex || require("./_stream_duplex"), e = e || {}, this.objectMode = !!e.objectMode, t instanceof Duplex && (this.objectMode = this.objectMode || !!e.readableObjectMode);
                    var r = e.highWaterMark,
                        n = this.objectMode ? 16 : 16384;
                    this.highWaterMark = r || 0 === r ? r : n, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new BufferList, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder), this.decoder = new StringDecoder(e.encoding), this.encoding = e.encoding)
                }

                function Readable(e) {
                    if (Duplex = Duplex || require("./_stream_duplex"), !(this instanceof Readable)) return new Readable(e);
                    this._readableState = new ReadableState(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), Stream.call(this)
                }

                function readableAddChunk(e, t, r, n, a) {
                    var i = e._readableState;
                    if (null === t) i.reading = !1, onEofChunk(e, i);
                    else {
                        var d;
                        a || (d = chunkInvalid(i, t)), d ? e.emit("error", d) : i.objectMode || t && t.length > 0 ? ("string" == typeof t || i.objectMode || Object.getPrototypeOf(t) === Buffer.prototype || (t = _uint8ArrayToBuffer(t)), n ? i.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : addChunk(e, i, t, !0) : i.ended ? e.emit("error", new Error("stream.push() after EOF")) : (i.reading = !1, i.decoder && !r ? (t = i.decoder.write(t), i.objectMode || 0 !== t.length ? addChunk(e, i, t, !1) : maybeReadMore(e, i)) : addChunk(e, i, t, !1))) : n || (i.reading = !1)
                    }
                    return needMoreData(i)
                }

                function addChunk(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r), e.read(0)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && emitReadable(e)), maybeReadMore(e, t)
                }

                function chunkInvalid(e, t) {
                    var r;
                    return _isUint8Array(t) || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk")), r
                }

                function needMoreData(e) {
                    return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                }

                function computeNewHighWaterMark(e) {
                    return e >= MAX_HWM ? e = MAX_HWM : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                }

                function howMuchToRead(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e !== e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = computeNewHighWaterMark(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
                }

                function onEofChunk(e, t) {
                    if (!t.ended) {
                        if (t.decoder) {
                            var r = t.decoder.end();
                            r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                        }
                        t.ended = !0, emitReadable(e)
                    }
                }

                function emitReadable(e) {
                    var t = e._readableState;
                    t.needReadable = !1, t.emittedReadable || (debug("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? processNextTick(emitReadable_, e) : emitReadable_(e))
                }

                function emitReadable_(e) {
                    debug("emit readable"), e.emit("readable"), flow(e)
                }

                function maybeReadMore(e, t) {
                    t.readingMore || (t.readingMore = !0, processNextTick(maybeReadMore_, e, t))
                }

                function maybeReadMore_(e, t) {
                    for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (debug("maybeReadMore read 0"), e.read(0), r !== t.length);) r = t.length;
                    t.readingMore = !1
                }

                function pipeOnDrain(e) {
                    return function() {
                        var t = e._readableState;
                        debug("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && EElistenerCount(e, "data") && (t.flowing = !0, flow(e))
                    }
                }

                function nReadingNextTick(e) {
                    debug("readable nexttick read 0"), e.read(0)
                }

                function resume(e, t) {
                    t.resumeScheduled || (t.resumeScheduled = !0, processNextTick(resume_, e, t))
                }

                function resume_(e, t) {
                    t.reading || (debug("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), flow(e), t.flowing && !t.reading && e.read(0)
                }

                function flow(e) {
                    var t = e._readableState;
                    for (debug("flow", t.flowing); t.flowing && null !== e.read(););
                }

                function fromList(e, t) {
                    if (0 === t.length) return null;
                    var r;
                    return t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : r = fromListPartial(e, t.buffer, t.decoder), r
                }

                function fromListPartial(e, t, r) {
                    var n;
                    return e < t.head.data.length ? (n = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : n = e === t.head.data.length ? t.shift() : r ? copyFromBufferString(e, t) : copyFromBuffer(e, t), n
                }

                function copyFromBufferString(e, t) {
                    var r = t.head,
                        n = 1,
                        a = r.data;
                    for (e -= a.length; r = r.next;) {
                        var i = r.data,
                            d = e > i.length ? i.length : e;
                        if (d === i.length ? a += i : a += i.slice(0, e), 0 === (e -= d)) {
                            d === i.length ? (++n, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = i.slice(d));
                            break
                        }++n
                    }
                    return t.length -= n, a
                }

                function copyFromBuffer(e, t) {
                    var r = Buffer.allocUnsafe(e),
                        n = t.head,
                        a = 1;
                    for (n.data.copy(r), e -= n.data.length; n = n.next;) {
                        var i = n.data,
                            d = e > i.length ? i.length : e;
                        if (i.copy(r, r.length - e, 0, d), 0 === (e -= d)) {
                            d === i.length ? (++a, n.next ? t.head = n.next : t.head = t.tail = null) : (t.head = n, n.data = i.slice(d));
                            break
                        }++a
                    }
                    return t.length -= a, r
                }

                function endReadable(e) {
                    var t = e._readableState;
                    if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                    t.endEmitted || (t.ended = !0, processNextTick(endReadableNT, t, e))
                }

                function endReadableNT(e, t) {
                    e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
                }

                function forEach(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) t(e[r], r)
                }

                function indexOf(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                var processNextTick = require("process-nextick-args");
                module.exports = Readable;
                var isArray = require("isarray"),
                    Duplex;
                Readable.ReadableState = ReadableState;
                var EE = require("events").EventEmitter,
                    EElistenerCount = function(e, t) {
                        return e.listeners(t).length
                    },
                    Stream = require("./internal/streams/stream"),
                    Buffer = require("safe-buffer").Buffer,
                    OurUint8Array = global.Uint8Array || function() {},
                    util = require("core-util-is");
                util.inherits = require("inherits");
                var debugUtil = require("util"),
                    debug = void 0;
                debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
                var BufferList = require("./internal/streams/BufferList"),
                    destroyImpl = require("./internal/streams/destroy"),
                    StringDecoder;
                util.inherits(Readable, Stream);
                var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
                Object.defineProperty(Readable.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), Readable.prototype.destroy = destroyImpl.destroy, Readable.prototype._undestroy = destroyImpl.undestroy, Readable.prototype._destroy = function(e, t) {
                    this.push(null), t(e)
                }, Readable.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding, t !== n.encoding && (e = Buffer.from(e, t), t = ""), r = !0), readableAddChunk(this, e, t, !1, r)
                }, Readable.prototype.unshift = function(e) {
                    return readableAddChunk(this, e, null, !0, !1)
                }, Readable.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }, Readable.prototype.setEncoding = function(e) {
                    return StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder), this._readableState.decoder = new StringDecoder(e), this._readableState.encoding = e, this
                };
                var MAX_HWM = 8388608;
                Readable.prototype.read = function(e) {
                    debug("read", e), e = parseInt(e, 10);
                    var t = this._readableState,
                        r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return debug("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? endReadable(this) : emitReadable(this), null;
                    if (0 === (e = howMuchToRead(e, t)) && t.ended) return 0 === t.length && endReadable(this), null;
                    var n = t.needReadable;
                    debug("need readable", n), (0 === t.length || t.length - e < t.highWaterMark) && (n = !0, debug("length less than watermark", n)), t.ended || t.reading ? (n = !1, debug("reading or ended", n)) : n && (debug("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = howMuchToRead(r, t)));
                    var a;
                    return a = e > 0 ? fromList(e, t) : null, null === a ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && endReadable(this)), null !== a && this.emit("data", a), a
                }, Readable.prototype._read = function(e) {
                    this.emit("error", new Error("_read() is not implemented"))
                }, Readable.prototype.pipe = function(e, t) {
                    function r(e, t) {
                        debug("onunpipe"), e === l && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, a())
                    }

                    function n() {
                        debug("onend"), e.end()
                    }

                    function a() {
                        debug("cleanup"), e.removeListener("close", o), e.removeListener("finish", u), e.removeListener("drain", c), e.removeListener("error", d), e.removeListener("unpipe", r), l.removeListener("end", n), l.removeListener("end", s), l.removeListener("data", i), b = !0, !h.awaitDrain || e._writableState && !e._writableState.needDrain || c()
                    }

                    function i(t) {
                        debug("ondata"), g = !1, !1 !== e.write(t) || g || ((1 === h.pipesCount && h.pipes === e || h.pipesCount > 1 && -1 !== indexOf(h.pipes, e)) && !b && (debug("false write response, pause", l._readableState.awaitDrain), l._readableState.awaitDrain++, g = !0), l.pause())
                    }

                    function d(t) {
                        debug("onerror", t), s(), e.removeListener("error", d), 0 === EElistenerCount(e, "error") && e.emit("error", t)
                    }

                    function o() {
                        e.removeListener("finish", u), s()
                    }

                    function u() {
                        debug("onfinish"), e.removeListener("close", o), s()
                    }

                    function s() {
                        debug("unpipe"), l.unpipe(e)
                    }
                    var l = this,
                        h = this._readableState;
                    switch (h.pipesCount) {
                        case 0:
                            h.pipes = e;
                            break;
                        case 1:
                            h.pipes = [h.pipes, e];
                            break;
                        default:
                            h.pipes.push(e)
                    }
                    h.pipesCount += 1, debug("pipe count=%d opts=%j", h.pipesCount, t);
                    var f = (!t || !1 !== t.end) && e !== process.stdout && e !== process.stderr,
                        p = f ? n : s;
                    h.endEmitted ? processNextTick(p) : l.once("end", p), e.on("unpipe", r);
                    var c = pipeOnDrain(l);
                    e.on("drain", c);
                    var b = !1,
                        g = !1;
                    return l.on("data", i), prependListener(e, "error", d), e.once("close", o), e.once("finish", u), e.emit("pipe", l), h.flowing || (debug("pipe resume"), l.resume()), e
                }, Readable.prototype.unpipe = function(e) {
                    var t = this._readableState,
                        r = {
                            hasUnpiped: !1
                        };
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);
                    if (!e) {
                        var n = t.pipes,
                            a = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                        for (var i = 0; i < a; i++) n[i].emit("unpipe", this, r);
                        return this
                    }
                    var d = indexOf(t.pipes, e);
                    return -1 === d ? this : (t.pipes.splice(d, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this)
                }, Readable.prototype.on = function(e, t) {
                    var r = Stream.prototype.on.call(this, e, t);
                    if ("data" === e) !1 !== this._readableState.flowing && this.resume();
                    else if ("readable" === e) {
                        var n = this._readableState;
                        n.endEmitted || n.readableListening || (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && emitReadable(this) : processNextTick(nReadingNextTick, this))
                    }
                    return r
                }, Readable.prototype.addListener = Readable.prototype.on, Readable.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (debug("resume"), e.flowing = !0, resume(this, e)), this
                }, Readable.prototype.pause = function() {
                    return debug("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (debug("pause"), this._readableState.flowing = !1, this.emit("pause")), this
                }, Readable.prototype.wrap = function(e) {
                    var t = this._readableState,
                        r = !1,
                        n = this;
                    e.on("end", function() {
                        if (debug("wrapped end"), t.decoder && !t.ended) {
                            var e = t.decoder.end();
                            e && e.length && n.push(e)
                        }
                        n.push(null)
                    }), e.on("data", function(a) {
                        if (debug("wrapped data"), t.decoder && (a = t.decoder.write(a)), (!t.objectMode || null !== a && void 0 !== a) && (t.objectMode || a && a.length)) {
                            n.push(a) || (r = !0, e.pause())
                        }
                    });
                    for (var a in e) void 0 === this[a] && "function" == typeof e[a] && (this[a] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(a));
                    for (var i = 0; i < kProxyEvents.length; i++) e.on(kProxyEvents[i], n.emit.bind(n, kProxyEvents[i]));
                    return n._read = function(t) {
                        debug("wrapped _read", t), r && (r = !1, e.resume())
                    }, n
                }, Readable._fromList = fromList;
            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "./_stream_duplex": 153,
            "./internal/streams/BufferList": 158,
            "./internal/streams/destroy": 159,
            "./internal/streams/stream": 160,
            "_process": 147,
            "core-util-is": 140,
            "events": 141,
            "inherits": 143,
            "isarray": 145,
            "process-nextick-args": 146,
            "safe-buffer": 165,
            "string_decoder/": 171,
            "util": 28
        }],
        156: [function(require, module, exports) {
            "use strict";

            function TransformState(r) {
                this.afterTransform = function(t, n) {
                    return afterTransform(r, t, n)
                }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null
            }

            function afterTransform(r, t, n) {
                var e = r._transformState;
                e.transforming = !1;
                var i = e.writecb;
                if (!i) return r.emit("error", new Error("write callback called multiple times"));
                e.writechunk = null, e.writecb = null, null !== n && void 0 !== n && r.push(n), i(t);
                var a = r._readableState;
                a.reading = !1, (a.needReadable || a.length < a.highWaterMark) && r._read(a.highWaterMark)
            }

            function Transform(r) {
                if (!(this instanceof Transform)) return new Transform(r);
                Duplex.call(this, r), this._transformState = new TransformState(this);
                var t = this;
                this._readableState.needReadable = !0, this._readableState.sync = !1, r && ("function" == typeof r.transform && (this._transform = r.transform), "function" == typeof r.flush && (this._flush = r.flush)), this.once("prefinish", function() {
                    "function" == typeof this._flush ? this._flush(function(r, n) {
                        done(t, r, n)
                    }) : done(t)
                })
            }

            function done(r, t, n) {
                if (t) return r.emit("error", t);
                null !== n && void 0 !== n && r.push(n);
                var e = r._writableState,
                    i = r._transformState;
                if (e.length) throw new Error("Calling transform done when ws.length != 0");
                if (i.transforming) throw new Error("Calling transform done when still transforming");
                return r.push(null)
            }
            module.exports = Transform;
            var Duplex = require("./_stream_duplex"),
                util = require("core-util-is");
            util.inherits = require("inherits"), util.inherits(Transform, Duplex), Transform.prototype.push = function(r, t) {
                return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, r, t)
            }, Transform.prototype._transform = function(r, t, n) {
                throw new Error("_transform() is not implemented")
            }, Transform.prototype._write = function(r, t, n) {
                var e = this._transformState;
                if (e.writecb = n, e.writechunk = r, e.writeencoding = t, !e.transforming) {
                    var i = this._readableState;
                    (e.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, Transform.prototype._read = function(r) {
                var t = this._transformState;
                null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
            }, Transform.prototype._destroy = function(r, t) {
                var n = this;
                Duplex.prototype._destroy.call(this, r, function(r) {
                    t(r), n.emit("close")
                })
            };
        }, {
            "./_stream_duplex": 153,
            "core-util-is": 140,
            "inherits": 143
        }],
        157: [function(require, module, exports) {
            (function(process, global) {
                "use strict";

                function WriteReq(e, t, r) {
                    this.chunk = e, this.encoding = t, this.callback = r, this.next = null
                }

                function CorkedRequest(e) {
                    var t = this;
                    this.next = null, this.entry = null, this.finish = function() {
                        onCorkedFinish(t, e)
                    }
                }

                function _uint8ArrayToBuffer(e) {
                    return Buffer.from(e)
                }

                function _isUint8Array(e) {
                    return Buffer.isBuffer(e) || e instanceof OurUint8Array
                }

                function nop() {}

                function WritableState(e, t) {
                    Duplex = Duplex || require("./_stream_duplex"), e = e || {}, this.objectMode = !!e.objectMode, t instanceof Duplex && (this.objectMode = this.objectMode || !!e.writableObjectMode);
                    var r = e.highWaterMark,
                        i = this.objectMode ? 16 : 16384;
                    this.highWaterMark = r || 0 === r ? r : i, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var n = !1 === e.decodeStrings;
                    this.decodeStrings = !n, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                        onwrite(t, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new CorkedRequest(this)
                }

                function Writable(e) {
                    if (Duplex = Duplex || require("./_stream_duplex"), !(realHasInstance.call(Writable, this) || this instanceof Duplex)) return new Writable(e);
                    this._writableState = new WritableState(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), Stream.call(this)
                }

                function writeAfterEnd(e, t) {
                    var r = new Error("write after end");
                    e.emit("error", r), processNextTick(t, r)
                }

                function validChunk(e, t, r, i) {
                    var n = !0,
                        o = !1;
                    return null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), processNextTick(i, o), n = !1), n
                }

                function decodeChunk(e, t, r) {
                    return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = Buffer.from(t, r)), t
                }

                function writeOrBuffer(e, t, r, i, n, o) {
                    if (!r) {
                        var s = decodeChunk(t, i, n);
                        i !== s && (r = !0, n = "buffer", i = s)
                    }
                    var a = t.objectMode ? 1 : i.length;
                    t.length += a;
                    var f = t.length < t.highWaterMark;
                    if (f || (t.needDrain = !0), t.writing || t.corked) {
                        var u = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: i,
                            encoding: n,
                            isBuf: r,
                            callback: o,
                            next: null
                        }, u ? u.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                    } else doWrite(e, t, !1, a, i, n, o);
                    return f
                }

                function doWrite(e, t, r, i, n, o, s) {
                    t.writelen = i, t.writecb = s, t.writing = !0, t.sync = !0, r ? e._writev(n, t.onwrite) : e._write(n, o, t.onwrite), t.sync = !1
                }

                function onwriteError(e, t, r, i, n) {
                    --t.pendingcb, r ? (processNextTick(n, i), processNextTick(finishMaybe, e, t), e._writableState.errorEmitted = !0, e.emit("error", i)) : (n(i), e._writableState.errorEmitted = !0, e.emit("error", i), finishMaybe(e, t))
                }

                function onwriteStateUpdate(e) {
                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                }

                function onwrite(e, t) {
                    var r = e._writableState,
                        i = r.sync,
                        n = r.writecb;
                    if (onwriteStateUpdate(r), t) onwriteError(e, r, i, t, n);
                    else {
                        var o = needFinish(r);
                        o || r.corked || r.bufferProcessing || !r.bufferedRequest || clearBuffer(e, r), i ? asyncWrite(afterWrite, e, r, o, n) : afterWrite(e, r, o, n)
                    }
                }

                function afterWrite(e, t, r, i) {
                    r || onwriteDrain(e, t), t.pendingcb--, i(), finishMaybe(e, t)
                }

                function onwriteDrain(e, t) {
                    0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                }

                function clearBuffer(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var i = t.bufferedRequestCount,
                            n = new Array(i),
                            o = t.corkedRequestsFree;
                        o.entry = r;
                        for (var s = 0, a = !0; r;) n[s] = r, r.isBuf || (a = !1), r = r.next, s += 1;
                        n.allBuffers = a, doWrite(e, t, !0, t.length, n, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new CorkedRequest(t)
                    } else {
                        for (; r;) {
                            var f = r.chunk,
                                u = r.encoding,
                                l = r.callback;
                            if (doWrite(e, t, !1, t.objectMode ? 1 : f.length, f, u, l), r = r.next, t.writing) break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequestCount = 0, t.bufferedRequest = r, t.bufferProcessing = !1
                }

                function needFinish(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function callFinal(e, t) {
                    e._final(function(r) {
                        t.pendingcb--, r && e.emit("error", r), t.prefinished = !0, e.emit("prefinish"), finishMaybe(e, t)
                    })
                }

                function prefinish(e, t) {
                    t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, processNextTick(callFinal, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
                }

                function finishMaybe(e, t) {
                    var r = needFinish(t);
                    return r && (prefinish(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), r
                }

                function endWritable(e, t, r) {
                    t.ending = !0, finishMaybe(e, t), r && (t.finished ? processNextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1
                }

                function onCorkedFinish(e, t, r) {
                    var i = e.entry;
                    for (e.entry = null; i;) {
                        var n = i.callback;
                        t.pendingcb--, n(r), i = i.next
                    }
                    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                }
                var processNextTick = require("process-nextick-args");
                module.exports = Writable;
                var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick,
                    Duplex;
                Writable.WritableState = WritableState;
                var util = require("core-util-is");
                util.inherits = require("inherits");
                var internalUtil = {
                        deprecate: require("util-deprecate")
                    },
                    Stream = require("./internal/streams/stream"),
                    Buffer = require("safe-buffer").Buffer,
                    OurUint8Array = global.Uint8Array || function() {},
                    destroyImpl = require("./internal/streams/destroy");
                util.inherits(Writable, Stream), WritableState.prototype.getBuffer = function() {
                        for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                        return t
                    },
                    function() {
                        try {
                            Object.defineProperty(WritableState.prototype, "buffer", {
                                get: internalUtil.deprecate(function() {
                                    return this.getBuffer()
                                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (e) {}
                    }();
                var realHasInstance;
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (realHasInstance = Function.prototype[Symbol.hasInstance], Object.defineProperty(Writable, Symbol.hasInstance, {
                    value: function(e) {
                        return !!realHasInstance.call(this, e) || e && e._writableState instanceof WritableState
                    }
                })) : realHasInstance = function(e) {
                    return e instanceof this
                }, Writable.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                }, Writable.prototype.write = function(e, t, r) {
                    var i = this._writableState,
                        n = !1,
                        o = _isUint8Array(e) && !i.objectMode;
                    return o && !Buffer.isBuffer(e) && (e = _uint8ArrayToBuffer(e)), "function" == typeof t && (r = t, t = null), o ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = nop), i.ended ? writeAfterEnd(this, r) : (o || validChunk(this, i, e, r)) && (i.pendingcb++, n = writeOrBuffer(this, i, o, e, t, r)), n
                }, Writable.prototype.cork = function() {
                    this._writableState.corked++
                }, Writable.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || clearBuffer(this, e))
                }, Writable.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
                    return this._writableState.defaultEncoding = e, this
                }, Writable.prototype._write = function(e, t, r) {
                    r(new Error("_write() is not implemented"))
                }, Writable.prototype._writev = null, Writable.prototype.end = function(e, t, r) {
                    var i = this._writableState;
                    "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null !== e && void 0 !== e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || i.finished || endWritable(this, i, r)
                }, Object.defineProperty(Writable.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }), Writable.prototype.destroy = destroyImpl.destroy, Writable.prototype._undestroy = destroyImpl.undestroy, Writable.prototype._destroy = function(e, t) {
                    this.end(), t(e)
                };
            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "./_stream_duplex": 153,
            "./internal/streams/destroy": 159,
            "./internal/streams/stream": 160,
            "_process": 147,
            "core-util-is": 140,
            "inherits": 143,
            "process-nextick-args": 146,
            "safe-buffer": 165,
            "util-deprecate": 182
        }],
        158: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function copyBuffer(t, e, h) {
                t.copy(e, h)
            }
            var Buffer = require("safe-buffer").Buffer;
            module.exports = function() {
                function t() {
                    _classCallCheck(this, t), this.head = null, this.tail = null, this.length = 0
                }
                return t.prototype.push = function(t) {
                    var e = {
                        data: t,
                        next: null
                    };
                    this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
                }, t.prototype.unshift = function(t) {
                    var e = {
                        data: t,
                        next: this.head
                    };
                    0 === this.length && (this.tail = e), this.head = e, ++this.length
                }, t.prototype.shift = function() {
                    if (0 !== this.length) {
                        var t = this.head.data;
                        return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
                    }
                }, t.prototype.clear = function() {
                    this.head = this.tail = null, this.length = 0
                }, t.prototype.join = function(t) {
                    if (0 === this.length) return "";
                    for (var e = this.head, h = "" + e.data; e = e.next;) h += t + e.data;
                    return h
                }, t.prototype.concat = function(t) {
                    if (0 === this.length) return Buffer.alloc(0);
                    if (1 === this.length) return this.head.data;
                    for (var e = Buffer.allocUnsafe(t >>> 0), h = this.head, n = 0; h;) copyBuffer(h.data, e, n), n += h.data.length, h = h.next;
                    return e
                }, t
            }();
        }, {
            "safe-buffer": 165
        }],
        159: [function(require, module, exports) {
            "use strict";

            function destroy(t, e) {
                var r = this,
                    i = this._readableState && this._readableState.destroyed,
                    a = this._writableState && this._writableState.destroyed;
                if (i || a) return void(e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || processNextTick(emitErrorNT, this, t));
                this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {
                    !e && t ? (processNextTick(emitErrorNT, r, t), r._writableState && (r._writableState.errorEmitted = !0)) : e && e(t)
                })
            }

            function undestroy() {
                this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
            }

            function emitErrorNT(t, e) {
                t.emit("error", e)
            }
            var processNextTick = require("process-nextick-args");
            module.exports = {
                destroy: destroy,
                undestroy: undestroy
            };
        }, {
            "process-nextick-args": 146
        }],
        160: [function(require, module, exports) {
            module.exports = require("events").EventEmitter;
        }, {
            "events": 141
        }],
        161: [function(require, module, exports) {
            module.exports = require("./readable").PassThrough;
        }, {
            "./readable": 162
        }],
        162: [function(require, module, exports) {
            exports = module.exports = require("./lib/_stream_readable.js"), exports.Stream = exports, exports.Readable = exports, exports.Writable = require("./lib/_stream_writable.js"), exports.Duplex = require("./lib/_stream_duplex.js"), exports.Transform = require("./lib/_stream_transform.js"), exports.PassThrough = require("./lib/_stream_passthrough.js");
        }, {
            "./lib/_stream_duplex.js": 153,
            "./lib/_stream_passthrough.js": 154,
            "./lib/_stream_readable.js": 155,
            "./lib/_stream_transform.js": 156,
            "./lib/_stream_writable.js": 157
        }],
        163: [function(require, module, exports) {
            module.exports = require("./readable").Transform;
        }, {
            "./readable": 162
        }],
        164: [function(require, module, exports) {
            module.exports = require("./lib/_stream_writable.js");
        }, {
            "./lib/_stream_writable.js": 157
        }],
        165: [function(require, module, exports) {
            function copyProps(f, r) {
                for (var e in f) r[e] = f[e]
            }

            function SafeBuffer(f, r, e) {
                return Buffer(f, r, e)
            }
            var buffer = require("buffer"),
                Buffer = buffer.Buffer;
            Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(f, r, e) {
                if ("number" == typeof f) throw new TypeError("Argument must not be a number");
                return Buffer(f, r, e)
            }, SafeBuffer.alloc = function(f, r, e) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                var u = Buffer(f);
                return void 0 !== r ? "string" == typeof e ? u.fill(r, e) : u.fill(r) : u.fill(0), u
            }, SafeBuffer.allocUnsafe = function(f) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                return Buffer(f)
            }, SafeBuffer.allocUnsafeSlow = function(f) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                return buffer.SlowBuffer(f)
            };
        }, {
            "buffer": 29
        }],
        166: [function(require, module, exports) {
            function Stream() {
                EE.call(this)
            }
            module.exports = Stream;
            var EE = require("events").EventEmitter,
                inherits = require("inherits");
            inherits(Stream, EE), Stream.Readable = require("readable-stream/readable.js"), Stream.Writable = require("readable-stream/writable.js"), Stream.Duplex = require("readable-stream/duplex.js"), Stream.Transform = require("readable-stream/transform.js"), Stream.PassThrough = require("readable-stream/passthrough.js"), Stream.Stream = Stream, Stream.prototype.pipe = function(e, r) {
                function t(r) {
                    e.writable && !1 === e.write(r) && m.pause && m.pause()
                }

                function n() {
                    m.readable && m.resume && m.resume()
                }

                function a() {
                    u || (u = !0, e.end())
                }

                function o() {
                    u || (u = !0, "function" == typeof e.destroy && e.destroy())
                }

                function i(e) {
                    if (s(), 0 === EE.listenerCount(this, "error")) throw e
                }

                function s() {
                    m.removeListener("data", t), e.removeListener("drain", n), m.removeListener("end", a), m.removeListener("close", o), m.removeListener("error", i), e.removeListener("error", i), m.removeListener("end", s), m.removeListener("close", s), e.removeListener("close", s)
                }
                var m = this;
                m.on("data", t), e.on("drain", n), e._isStdio || r && !1 === r.end || (m.on("end", a), m.on("close", o));
                var u = !1;
                return m.on("error", i), e.on("error", i), m.on("end", s), m.on("close", s), e.on("close", s), e.emit("pipe", m), e
            };
        }, {
            "events": 141,
            "inherits": 143,
            "readable-stream/duplex.js": 152,
            "readable-stream/passthrough.js": 161,
            "readable-stream/readable.js": 162,
            "readable-stream/transform.js": 163,
            "readable-stream/writable.js": 164
        }],
        167: [function(require, module, exports) {
            (function(global) {
                var ClientRequest = require("./lib/request"),
                    extend = require("xtend"),
                    statusCodes = require("builtin-status-codes"),
                    url = require("url"),
                    http = exports;
                http.request = function(t, e) {
                    t = "string" == typeof t ? url.parse(t) : extend(t);
                    var r = -1 === global.location.protocol.search(/^https?:$/) ? "http:" : "",
                        s = t.protocol || r,
                        o = t.hostname || t.host,
                        n = t.port,
                        u = t.path || "/";
                    o && -1 !== o.indexOf(":") && (o = "[" + o + "]"), t.url = (o ? s + "//" + o : "") + (n ? ":" + n : "") + u, t.method = (t.method || "GET").toUpperCase(), t.headers = t.headers || {};
                    var C = new ClientRequest(t);
                    return e && C.on("response", e), C
                }, http.get = function(t, e) {
                    var r = http.request(t, e);
                    return r.end(), r
                }, http.Agent = function() {}, http.Agent.defaultMaxSockets = 4, http.STATUS_CODES = statusCodes, http.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "./lib/request": 169,
            "builtin-status-codes": 30,
            "url": 180,
            "xtend": 183
        }],
        168: [function(require, module, exports) {
            (function(global) {
                function checkTypeSupport(r) {
                    try {
                        return xhr.responseType = r, xhr.responseType === r
                    } catch (r) {}
                    return !1
                }

                function isFunction(r) {
                    return "function" == typeof r
                }
                exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableByteStream), exports.blobConstructor = !1;
                try {
                    new Blob([new ArrayBuffer(1)]), exports.blobConstructor = !0
                } catch (r) {}
                var xhr = new global.XMLHttpRequest;
                xhr.open("GET", global.location.host ? "/" : "https://example.com");
                var haveArrayBuffer = void 0 !== global.ArrayBuffer,
                    haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice);
                exports.arraybuffer = haveArrayBuffer && checkTypeSupport("arraybuffer"), exports.msstream = !exports.fetch && haveSlice && checkTypeSupport("ms-stream"), exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer && checkTypeSupport("moz-chunked-arraybuffer"), exports.overrideMimeType = isFunction(xhr.overrideMimeType), exports.vbArray = isFunction(global.VBArray), xhr = null;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        169: [function(require, module, exports) {
            (function(process, global, Buffer) {
                function decideMode(e, t) {
                    return capability.fetch && !t ? "fetch" : capability.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : capability.msstream ? "ms-stream" : capability.arraybuffer && e ? "arraybuffer" : capability.vbArray && e ? "text:vbarray" : "text"
                }

                function statusValid(e) {
                    try {
                        var t = e.status;
                        return null !== t && 0 !== t
                    } catch (e) {
                        return !1
                    }
                }
                var capability = require("./capability"),
                    inherits = require("inherits"),
                    response = require("./response"),
                    stream = require("stream"),
                    toArrayBuffer = require("to-arraybuffer"),
                    IncomingMessage = response.IncomingMessage,
                    rStates = response.readyStates,
                    ClientRequest = module.exports = function(e) {
                        var t = this;
                        stream.Writable.call(t), t._opts = e, t._body = [], t._headers = {}, e.auth && t.setHeader("Authorization", "Basic " + new Buffer(e.auth).toString("base64")), Object.keys(e.headers).forEach(function(r) {
                            t.setHeader(r, e.headers[r])
                        });
                        var r;
                        if ("prefer-streaming" === e.mode) r = !1;
                        else if ("allow-wrong-content-type" === e.mode) r = !capability.overrideMimeType;
                        else {
                            if (e.mode && "default" !== e.mode && "prefer-fast" !== e.mode) throw new Error("Invalid value for opts.mode");
                            r = !0
                        }
                        t._mode = decideMode(r, e.avoidFetch), t.on("finish", function() {
                            t._onFinish()
                        })
                    };
                inherits(ClientRequest, stream.Writable), ClientRequest.prototype.setHeader = function(e, t) {
                    var r = this,
                        o = e.toLowerCase(); - 1 === unsafeHeaders.indexOf(o) && (r._headers[o] = {
                        name: e,
                        value: t
                    })
                }, ClientRequest.prototype.getHeader = function(e) {
                    return this._headers[e.toLowerCase()].value
                }, ClientRequest.prototype.removeHeader = function(e) {
                    delete this._headers[e.toLowerCase()]
                }, ClientRequest.prototype._onFinish = function() {
                    var e = this;
                    if (!e._destroyed) {
                        var t, r = e._opts,
                            o = e._headers;
                        if ("POST" !== r.method && "PUT" !== r.method && "PATCH" !== r.method || (t = capability.blobConstructor ? new global.Blob(e._body.map(function(e) {
                                return toArrayBuffer(e)
                            }), {
                                type: (o["content-type"] || {}).value || ""
                            }) : Buffer.concat(e._body).toString()), "fetch" === e._mode) {
                            var n = Object.keys(o).map(function(e) {
                                return [o[e].name, o[e].value]
                            });
                            global.fetch(e._opts.url, {
                                method: e._opts.method,
                                headers: n,
                                body: t,
                                mode: "cors",
                                credentials: r.withCredentials ? "include" : "same-origin"
                            }).then(function(t) {
                                e._fetchResponse = t, e._connect()
                            }, function(t) {
                                e.emit("error", t)
                            })
                        } else {
                            var s = e._xhr = new global.XMLHttpRequest;
                            try {
                                s.open(e._opts.method, e._opts.url, !0)
                            } catch (t) {
                                return void process.nextTick(function() {
                                    e.emit("error", t)
                                })
                            }
                            "responseType" in s && (s.responseType = e._mode.split(":")[0]), "withCredentials" in s && (s.withCredentials = !!r.withCredentials), "text" === e._mode && "overrideMimeType" in s && s.overrideMimeType("text/plain; charset=x-user-defined"), Object.keys(o).forEach(function(e) {
                                s.setRequestHeader(o[e].name, o[e].value)
                            }), e._response = null, s.onreadystatechange = function() {
                                switch (s.readyState) {
                                    case rStates.LOADING:
                                    case rStates.DONE:
                                        e._onXHRProgress()
                                }
                            }, "moz-chunked-arraybuffer" === e._mode && (s.onprogress = function() {
                                e._onXHRProgress()
                            }), s.onerror = function() {
                                e._destroyed || e.emit("error", new Error("XHR error"))
                            };
                            try {
                                s.send(t)
                            } catch (t) {
                                return void process.nextTick(function() {
                                    e.emit("error", t)
                                })
                            }
                        }
                    }
                }, ClientRequest.prototype._onXHRProgress = function() {
                    var e = this;
                    statusValid(e._xhr) && !e._destroyed && (e._response || e._connect(), e._response._onXHRProgress())
                }, ClientRequest.prototype._connect = function() {
                    var e = this;
                    e._destroyed || (e._response = new IncomingMessage(e._xhr, e._fetchResponse, e._mode), e.emit("response", e._response))
                }, ClientRequest.prototype._write = function(e, t, r) {
                    this._body.push(e), r()
                }, ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
                    var e = this;
                    e._destroyed = !0, e._response && (e._response._destroyed = !0), e._xhr && e._xhr.abort()
                }, ClientRequest.prototype.end = function(e, t, r) {
                    var o = this;
                    "function" == typeof e && (r = e, e = void 0), stream.Writable.prototype.end.call(o, e, t, r)
                }, ClientRequest.prototype.flushHeaders = function() {}, ClientRequest.prototype.setTimeout = function() {}, ClientRequest.prototype.setNoDelay = function() {}, ClientRequest.prototype.setSocketKeepAlive = function() {};
                var unsafeHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer)

        }, {
            "./capability": 168,
            "./response": 170,
            "_process": 147,
            "buffer": 29,
            "inherits": 143,
            "stream": 166,
            "to-arraybuffer": 179
        }],
        170: [function(require, module, exports) {
            (function(process, global, Buffer) {
                var capability = require("./capability"),
                    inherits = require("inherits"),
                    stream = require("stream"),
                    rStates = exports.readyStates = {
                        UNSENT: 0,
                        OPENED: 1,
                        HEADERS_RECEIVED: 2,
                        LOADING: 3,
                        DONE: 4
                    },
                    IncomingMessage = exports.IncomingMessage = function(e, r, s) {
                        function a() {
                            u.read().then(function(e) {
                                if (!t._destroyed) {
                                    if (e.done) return void t.push(null);
                                    t.push(new Buffer(e.value)), a()
                                }
                            })
                        }
                        var t = this;
                        if (stream.Readable.call(t), t._mode = s, t.headers = {}, t.rawHeaders = [], t.trailers = {}, t.rawTrailers = [], t.on("end", function() {
                                process.nextTick(function() {
                                    t.emit("close")
                                })
                            }), "fetch" === s) {
                            t._fetchResponse = r, t.statusCode = r.status, t.statusMessage = r.statusText;
                            for (var n, o, i = r.headers[Symbol.iterator](); n = (o = i.next()).value, !o.done;) t.headers[n[0].toLowerCase()] = n[1], t.rawHeaders.push(n[0], n[1]);
                            var u = r.body.getReader();
                            a()
                        } else {
                            t._xhr = e, t._pos = 0, t.statusCode = e.status, t.statusMessage = e.statusText;
                            if (e.getAllResponseHeaders().split(/\r?\n/).forEach(function(e) {
                                    var r = e.match(/^([^:]+):\s*(.*)/);
                                    if (r) {
                                        var s = r[1].toLowerCase();
                                        "set-cookie" === s ? (void 0 === t.headers[s] && (t.headers[s] = []), t.headers[s].push(r[2])) : void 0 !== t.headers[s] ? t.headers[s] += ", " + r[2] : t.headers[s] = r[2], t.rawHeaders.push(r[1], r[2])
                                    }
                                }), t._charset = "x-user-defined", !capability.overrideMimeType) {
                                var h = t.rawHeaders["mime-type"];
                                if (h) {
                                    var d = h.match(/;\s*charset=([^;])(;|$)/);
                                    d && (t._charset = d[1].toLowerCase())
                                }
                                t._charset || (t._charset = "utf-8")
                            }
                        }
                    };
                inherits(IncomingMessage, stream.Readable), IncomingMessage.prototype._read = function() {}, IncomingMessage.prototype._onXHRProgress = function() {
                    var e = this,
                        r = e._xhr,
                        s = null;
                    switch (e._mode) {
                        case "text:vbarray":
                            if (r.readyState !== rStates.DONE) break;
                            try {
                                s = new global.VBArray(r.responseBody).toArray()
                            } catch (e) {}
                            if (null !== s) {
                                e.push(new Buffer(s));
                                break
                            }
                        case "text":
                            try {
                                s = r.responseText
                            } catch (r) {
                                e._mode = "text:vbarray";
                                break
                            }
                            if (s.length > e._pos) {
                                var a = s.substr(e._pos);
                                if ("x-user-defined" === e._charset) {
                                    for (var t = new Buffer(a.length), n = 0; n < a.length; n++) t[n] = 255 & a.charCodeAt(n);
                                    e.push(t)
                                } else e.push(a, e._charset);
                                e._pos = s.length
                            }
                            break;
                        case "arraybuffer":
                            if (r.readyState !== rStates.DONE) break;
                            s = r.response, e.push(new Buffer(new Uint8Array(s)));
                            break;
                        case "moz-chunked-arraybuffer":
                            if (s = r.response, r.readyState !== rStates.LOADING || !s) break;
                            e.push(new Buffer(new Uint8Array(s)));
                            break;
                        case "ms-stream":
                            if (s = r.response, r.readyState !== rStates.LOADING) break;
                            var o = new global.MSStreamReader;
                            o.onprogress = function() {
                                o.result.byteLength > e._pos && (e.push(new Buffer(new Uint8Array(o.result.slice(e._pos)))), e._pos = o.result.byteLength)
                            }, o.onload = function() {
                                e.push(null)
                            }, o.readAsArrayBuffer(s)
                    }
                    e._xhr.readyState === rStates.DONE && "ms-stream" !== e._mode && e.push(null)
                };
            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer)

        }, {
            "./capability": 168,
            "_process": 147,
            "buffer": 29,
            "inherits": 143,
            "stream": 166
        }],
        171: [function(require, module, exports) {
            "use strict";

            function _normalizeEncoding(t) {
                if (!t) return "utf8";
                for (var e;;) switch (t) {
                    case "utf8":
                    case "utf-8":
                        return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return "utf16le";
                    case "latin1":
                    case "binary":
                        return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                        return t;
                    default:
                        if (e) return;
                        t = ("" + t).toLowerCase(), e = !0
                }
            }

            function normalizeEncoding(t) {
                var e = _normalizeEncoding(t);
                if ("string" != typeof e && (Buffer.isEncoding === isEncoding || !isEncoding(t))) throw new Error("Unknown encoding: " + t);
                return e || t
            }

            function StringDecoder(t) {
                this.encoding = normalizeEncoding(t);
                var e;
                switch (this.encoding) {
                    case "utf16le":
                        this.text = utf16Text, this.end = utf16End, e = 4;
                        break;
                    case "utf8":
                        this.fillLast = utf8FillLast, e = 4;
                        break;
                    case "base64":
                        this.text = base64Text, this.end = base64End, e = 3;
                        break;
                    default:
                        return this.write = simpleWrite, void(this.end = simpleEnd)
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Buffer.allocUnsafe(e)
            }

            function utf8CheckByte(t) {
                return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : -1
            }

            function utf8CheckIncomplete(t, e, s) {
                var i = e.length - 1;
                if (i < s) return 0;
                var a = utf8CheckByte(e[i]);
                return a >= 0 ? (a > 0 && (t.lastNeed = a - 1), a) : --i < s ? 0 : (a = utf8CheckByte(e[i])) >= 0 ? (a > 0 && (t.lastNeed = a - 2), a) : --i < s ? 0 : (a = utf8CheckByte(e[i]), a >= 0 ? (a > 0 && (2 === a ? a = 0 : t.lastNeed = a - 3), a) : 0)
            }

            function utf8CheckExtraBytes(t, e, s) {
                if (128 != (192 & e[0])) return t.lastNeed = 0, "�".repeat(s);
                if (t.lastNeed > 1 && e.length > 1) {
                    if (128 != (192 & e[1])) return t.lastNeed = 1, "�".repeat(s + 1);
                    if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�".repeat(s + 2)
                }
            }

            function utf8FillLast(t) {
                var e = this.lastTotal - this.lastNeed,
                    s = utf8CheckExtraBytes(this, t, e);
                return void 0 !== s ? s : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this.lastNeed -= t.length))
            }

            function utf8Text(t, e) {
                var s = utf8CheckIncomplete(this, t, e);
                if (!this.lastNeed) return t.toString("utf8", e);
                this.lastTotal = s;
                var i = t.length - (s - this.lastNeed);
                return t.copy(this.lastChar, 0, i), t.toString("utf8", e, i)
            }

            function utf8End(t) {
                var e = t && t.length ? this.write(t) : "";
                return this.lastNeed ? e + "�".repeat(this.lastTotal - this.lastNeed) : e
            }

            function utf16Text(t, e) {
                if ((t.length - e) % 2 == 0) {
                    var s = t.toString("utf16le", e);
                    if (s) {
                        var i = s.charCodeAt(s.length - 1);
                        if (i >= 55296 && i <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], s.slice(0, -1)
                    }
                    return s
                }
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
            }

            function utf16End(t) {
                var e = t && t.length ? this.write(t) : "";
                if (this.lastNeed) {
                    var s = this.lastTotal - this.lastNeed;
                    return e + this.lastChar.toString("utf16le", 0, s)
                }
                return e
            }

            function base64Text(t, e) {
                var s = (t.length - e) % 3;
                return 0 === s ? t.toString("base64", e) : (this.lastNeed = 3 - s, this.lastTotal = 3, 1 === s ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - s))
            }

            function base64End(t) {
                var e = t && t.length ? this.write(t) : "";
                return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
            }

            function simpleWrite(t) {
                return t.toString(this.encoding)
            }

            function simpleEnd(t) {
                return t && t.length ? this.write(t) : ""
            }
            var Buffer = require("safe-buffer").Buffer,
                isEncoding = Buffer.isEncoding || function(t) {
                    switch ((t = "" + t) && t.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };
            exports.StringDecoder = StringDecoder, StringDecoder.prototype.write = function(t) {
                if (0 === t.length) return "";
                var e, s;
                if (this.lastNeed) {
                    if (void 0 === (e = this.fillLast(t))) return "";
                    s = this.lastNeed, this.lastNeed = 0
                } else s = 0;
                return s < t.length ? e ? e + this.text(t, s) : this.text(t, s) : e || ""
            }, StringDecoder.prototype.end = utf8End, StringDecoder.prototype.text = utf8Text, StringDecoder.prototype.fillLast = function(t) {
                if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
            };
        }, {
            "safe-buffer": 165
        }],
        172: [function(require, module, exports) {
            module.exports = function(r) {
                return function(u) {
                    return "/" === u.url[0] && (u.url = r + u.url), u
                }
            };
        }, {}],
        173: [function(require, module, exports) {
            function noop() {}

            function serialize(e) {
                if (!isObject(e)) return e;
                var t = [];
                for (var r in e) pushEncodedKeyValuePair(t, r, e[r]);
                return t.join("&")
            }

            function pushEncodedKeyValuePair(e, t, r) {
                if (null != r)
                    if (Array.isArray(r)) r.forEach(function(r) {
                        pushEncodedKeyValuePair(e, t, r)
                    });
                    else if (isObject(r))
                    for (var s in r) pushEncodedKeyValuePair(e, t + "[" + s + "]", r[s]);
                else e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r));
                else null === r && e.push(encodeURIComponent(t))
            }

            function parseString(e) {
                for (var t, r, s = {}, n = e.split("&"), o = 0, i = n.length; o < i; ++o) t = n[o], r = t.indexOf("="), -1 == r ? s[decodeURIComponent(t)] = "" : s[decodeURIComponent(t.slice(0, r))] = decodeURIComponent(t.slice(r + 1));
                return s
            }

            function parseHeader(e) {
                var t, r, s, n, o = e.split(/\r?\n/),
                    i = {};
                o.pop();
                for (var a = 0, u = o.length; a < u; ++a) r = o[a], t = r.indexOf(":"), s = r.slice(0, t).toLowerCase(), n = trim(r.slice(t + 1)), i[s] = n;
                return i
            }

            function isJSON(e) {
                return /[\/+]json\b/.test(e)
            }

            function Response(e) {
                this.req = e, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
                var t = this.xhr.status;
                1223 === t && (t = 204), this._setStatusProperties(t), this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && e._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null
            }

            function Request(e, t) {
                var r = this;
                this._query = this._query || [], this.method = e, this.url = t, this.header = {}, this._header = {}, this.on("end", function() {
                    var e = null,
                        t = null;
                    try {
                        t = new Response(r)
                    } catch (t) {
                        return e = new Error("Parser is unable to parse the response"), e.parse = !0, e.original = t, r.xhr ? (e.rawResponse = void 0 === r.xhr.responseType ? r.xhr.responseText : r.xhr.response, e.status = r.xhr.status ? r.xhr.status : null, e.statusCode = e.status) : (e.rawResponse = null, e.status = null), r.callback(e)
                    }
                    r.emit("response", t);
                    var s;
                    try {
                        r._isResponseOK(t) || (s = new Error(t.statusText || "Unsuccessful HTTP response"), s.original = e, s.response = t, s.status = t.status)
                    } catch (e) {
                        s = e
                    }
                    s ? r.callback(s, t) : r.callback(null, t)
                })
            }

            function del(e, t, r) {
                var s = request("DELETE", e);
                return "function" == typeof t && (r = t, t = null), t && s.send(t), r && s.end(r), s
            }
            var root;
            "undefined" != typeof window ? root = window : "undefined" != typeof self ? root = self : (console.warn("Using browser-only version of superagent in non-browser environment"), root = this);
            var Emitter = require("component-emitter"),
                RequestBase = require("./request-base"),
                isObject = require("./is-object"),
                ResponseBase = require("./response-base"),
                shouldRetry = require("./should-retry"),
                request = exports = module.exports = function(e, t) {
                    return "function" == typeof t ? new exports.Request("GET", e).end(t) : 1 == arguments.length ? new exports.Request("GET", e) : new exports.Request(e, t)
                };
            exports.Request = Request, request.getXHR = function() {
                if (!(!root.XMLHttpRequest || root.location && "file:" == root.location.protocol && root.ActiveXObject)) return new XMLHttpRequest;
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                } catch (e) {}
                throw Error("Browser-only version of superagent could not find XHR")
            };
            var trim = "".trim ? function(e) {
                return e.trim()
            } : function(e) {
                return e.replace(/(^\s*|\s*$)/g, "")
            };
            request.serializeObject = serialize, request.parseString = parseString, request.types = {
                html: "text/html",
                json: "application/json",
                xml: "text/xml",
                urlencoded: "application/x-www-form-urlencoded",
                form: "application/x-www-form-urlencoded",
                "form-data": "application/x-www-form-urlencoded"
            }, request.serialize = {
                "application/x-www-form-urlencoded": serialize,
                "application/json": JSON.stringify
            }, request.parse = {
                "application/x-www-form-urlencoded": parseString,
                "application/json": JSON.parse
            }, ResponseBase(Response.prototype), Response.prototype._parseBody = function(e) {
                var t = request.parse[this.type];
                return this.req._parser ? this.req._parser(this, e) : (!t && isJSON(this.type) && (t = request.parse["application/json"]), t && e && (e.length || e instanceof Object) ? t(e) : null)
            }, Response.prototype.toError = function() {
                var e = this.req,
                    t = e.method,
                    r = e.url,
                    s = "cannot " + t + " " + r + " (" + this.status + ")",
                    n = new Error(s);
                return n.status = this.status, n.method = t, n.url = r, n
            }, request.Response = Response, Emitter(Request.prototype), RequestBase(Request.prototype), Request.prototype.type = function(e) {
                return this.set("Content-Type", request.types[e] || e), this
            }, Request.prototype.accept = function(e) {
                return this.set("Accept", request.types[e] || e), this
            }, Request.prototype.auth = function(e, t, r) {
                switch ("object" == typeof t && null !== t && (r = t), r || (r = {
                    type: "function" == typeof btoa ? "basic" : "auto"
                }), r.type) {
                    case "basic":
                        this.set("Authorization", "Basic " + btoa(e + ":" + t));
                        break;
                    case "auto":
                        this.username = e, this.password = t;
                        break;
                    case "bearer":
                        this.set("Authorization", "Bearer " + e)
                }
                return this
            }, Request.prototype.query = function(e) {
                return "string" != typeof e && (e = serialize(e)), e && this._query.push(e), this
            }, Request.prototype.attach = function(e, t, r) {
                if (t) {
                    if (this._data) throw Error("superagent can't mix .send() and .attach()");
                    this._getFormData().append(e, t, r || t.name)
                }
                return this
            }, Request.prototype._getFormData = function() {
                return this._formData || (this._formData = new root.FormData), this._formData
            }, Request.prototype.callback = function(e, t) {
                if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(e, t)) return this._retry();
                var r = this._callback;
                this.clearTimeout(), e && (this._maxRetries && (e.retries = this._retries - 1), this.emit("error", e)), r(e, t)
            }, Request.prototype.crossDomainError = function() {
                var e = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
                e.crossDomain = !0, e.status = this.status, e.method = this.method, e.url = this.url, this.callback(e)
            }, Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function() {
                return console.warn("This is not supported in browser version of superagent"), this
            }, Request.prototype.pipe = Request.prototype.write = function() {
                throw Error("Streaming is not supported in browser version of superagent")
            }, Request.prototype._isHost = function(e) {
                return e && "object" == typeof e && !Array.isArray(e) && "[object Object]" !== Object.prototype.toString.call(e)
            }, Request.prototype.end = function(e) {
                return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = e || noop, this._finalizeQueryString(), this._end()
            }, Request.prototype._end = function() {
                var e = this,
                    t = this.xhr = request.getXHR(),
                    r = this._formData || this._data;
                this._setTimeouts(), t.onreadystatechange = function() {
                    var r = t.readyState;
                    if (r >= 2 && e._responseTimeoutTimer && clearTimeout(e._responseTimeoutTimer), 4 == r) {
                        var s;
                        try {
                            s = t.status
                        } catch (e) {
                            s = 0
                        }
                        if (!s) {
                            if (e.timedout || e._aborted) return;
                            return e.crossDomainError()
                        }
                        e.emit("end")
                    }
                };
                var s = function(t, r) {
                    r.total > 0 && (r.percent = r.loaded / r.total * 100), r.direction = t, e.emit("progress", r)
                };
                if (this.hasListeners("progress")) try {
                    t.onprogress = s.bind(null, "download"), t.upload && (t.upload.onprogress = s.bind(null, "upload"))
                } catch (e) {}
                try {
                    this.username && this.password ? t.open(this.method, this.url, !0, this.username, this.password) : t.open(this.method, this.url, !0)
                } catch (e) {
                    return this.callback(e)
                }
                if (this._withCredentials && (t.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof r && !this._isHost(r)) {
                    var n = this._header["content-type"],
                        o = this._serializer || request.serialize[n ? n.split(";")[0] : ""];
                    !o && isJSON(n) && (o = request.serialize["application/json"]), o && (r = o(r))
                }
                for (var i in this.header) null != this.header[i] && this.header.hasOwnProperty(i) && t.setRequestHeader(i, this.header[i]);
                return this._responseType && (t.responseType = this._responseType), this.emit("request", this), t.send(void 0 !== r ? r : null), this
            }, request.get = function(e, t, r) {
                var s = request("GET", e);
                return "function" == typeof t && (r = t, t = null), t && s.query(t), r && s.end(r), s
            }, request.head = function(e, t, r) {
                var s = request("HEAD", e);
                return "function" == typeof t && (r = t, t = null), t && s.query(t), r && s.end(r), s
            }, request.options = function(e, t, r) {
                var s = request("OPTIONS", e);
                return "function" == typeof t && (r = t, t = null), t && s.send(t), r && s.end(r), s
            }, request.del = del, request.delete = del, request.patch = function(e, t, r) {
                var s = request("PATCH", e);
                return "function" == typeof t && (r = t, t = null), t && s.send(t), r && s.end(r), s
            }, request.post = function(e, t, r) {
                var s = request("POST", e);
                return "function" == typeof t && (r = t, t = null), t && s.send(t), r && s.end(r), s
            }, request.put = function(e, t, r) {
                var s = request("PUT", e);
                return "function" == typeof t && (r = t, t = null), t && s.send(t), r && s.end(r), s
            };
        }, {
            "./is-object": 174,
            "./request-base": 175,
            "./response-base": 176,
            "./should-retry": 177,
            "component-emitter": 31
        }],
        174: [function(require, module, exports) {
            function isObject(e) {
                return null !== e && "object" == typeof e
            }
            module.exports = isObject;
        }, {}],
        175: [function(require, module, exports) {
            function RequestBase(t) {
                if (t) return mixin(t)
            }

            function mixin(t) {
                for (var e in RequestBase.prototype) t[e] = RequestBase.prototype[e];
                return t
            }
            var isObject = require("./is-object");
            module.exports = RequestBase, RequestBase.prototype.clearTimeout = function() {
                return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this
            }, RequestBase.prototype.parse = function(t) {
                return this._parser = t, this
            }, RequestBase.prototype.responseType = function(t) {
                return this._responseType = t, this
            }, RequestBase.prototype.serialize = function(t) {
                return this._serializer = t, this
            }, RequestBase.prototype.timeout = function(t) {
                if (!t || "object" != typeof t) return this._timeout = t, this._responseTimeout = 0, this;
                for (var e in t) switch (e) {
                    case "deadline":
                        this._timeout = t.deadline;
                        break;
                    case "response":
                        this._responseTimeout = t.response;
                        break;
                    default:
                        console.warn("Unknown timeout option", e)
                }
                return this
            }, RequestBase.prototype.retry = function(t) {
                return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this
            }, RequestBase.prototype._retry = function() {
                return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end()
            }, RequestBase.prototype.then = function(t, e) {
                if (!this._fullfilledPromise) {
                    var s = this;
                    this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function(t, e) {
                        s.end(function(s, i) {
                            s ? e(s) : t(i)
                        })
                    })
                }
                return this._fullfilledPromise.then(t, e)
            }, RequestBase.prototype.catch = function(t) {
                return this.then(void 0, t)
            }, RequestBase.prototype.use = function(t) {
                return t(this), this
            }, RequestBase.prototype.ok = function(t) {
                if ("function" != typeof t) throw Error("Callback required");
                return this._okCallback = t, this
            }, RequestBase.prototype._isResponseOK = function(t) {
                return !!t && (this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300)
            }, RequestBase.prototype.get = function(t) {
                return this._header[t.toLowerCase()]
            }, RequestBase.prototype.getHeader = RequestBase.prototype.get, RequestBase.prototype.set = function(t, e) {
                if (isObject(t)) {
                    for (var s in t) this.set(s, t[s]);
                    return this
                }
                return this._header[t.toLowerCase()] = e, this.header[t] = e, this
            }, RequestBase.prototype.unset = function(t) {
                return delete this._header[t.toLowerCase()], delete this.header[t], this
            }, RequestBase.prototype.field = function(t, e) {
                if (null === t || void 0 === t) throw new Error(".field(name, val) name can not be empty");
                if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), isObject(t)) {
                    for (var s in t) this.field(s, t[s]);
                    return this
                }
                if (Array.isArray(e)) {
                    for (var i in e) this.field(t, e[i]);
                    return this
                }
                if (null === e || void 0 === e) throw new Error(".field(name, val) val can not be empty");
                return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this
            }, RequestBase.prototype.abort = function() {
                return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this)
            }, RequestBase.prototype.withCredentials = function(t) {
                return void 0 == t && (t = !0), this._withCredentials = t, this
            }, RequestBase.prototype.redirects = function(t) {
                return this._maxRedirects = t, this
            }, RequestBase.prototype.toJSON = function() {
                return {
                    method: this.method,
                    url: this.url,
                    data: this._data,
                    headers: this._header
                }
            }, RequestBase.prototype.send = function(t) {
                var e = isObject(t),
                    s = this._header["content-type"];
                if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
                else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
                if (e && isObject(this._data))
                    for (var i in t) this._data[i] = t[i];
                else "string" == typeof t ? (s || this.type("form"), s = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == s ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;
                return !e || this._isHost(t) ? this : (s || this.type("json"), this)
            }, RequestBase.prototype.sortQuery = function(t) {
                return this._sort = void 0 === t || t, this
            }, RequestBase.prototype._finalizeQueryString = function() {
                var t = this._query.join("&");
                if (t && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + t), this._query.length = 0, this._sort) {
                    var e = this.url.indexOf("?");
                    if (e >= 0) {
                        var s = this.url.substring(e + 1).split("&");
                        "function" == typeof this._sort ? s.sort(this._sort) : s.sort(), this.url = this.url.substring(0, e) + "?" + s.join("&")
                    }
                }
            }, RequestBase.prototype._appendQueryString = function() {
                console.trace("Unsupported")
            }, RequestBase.prototype._timeoutError = function(t, e, s) {
                if (!this._aborted) {
                    var i = new Error(t + e + "ms exceeded");
                    i.timeout = e, i.code = "ECONNABORTED", i.errno = s, this.timedout = !0, this.abort(), this.callback(i)
                }
            }, RequestBase.prototype._setTimeouts = function() {
                var t = this;
                this._timeout && !this._timer && (this._timer = setTimeout(function() {
                    t._timeoutError("Timeout of ", t._timeout, "ETIME")
                }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function() {
                    t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT")
                }, this._responseTimeout))
            };
        }, {
            "./is-object": 174
        }],
        176: [function(require, module, exports) {
            function ResponseBase(t) {
                if (t) return mixin(t)
            }

            function mixin(t) {
                for (var e in ResponseBase.prototype) t[e] = ResponseBase.prototype[e];
                return t
            }
            var utils = require("./utils");
            module.exports = ResponseBase, ResponseBase.prototype.get = function(t) {
                return this.header[t.toLowerCase()]
            }, ResponseBase.prototype._setHeaderProperties = function(t) {
                var e = t["content-type"] || "";
                this.type = utils.type(e);
                var s = utils.params(e);
                for (var i in s) this[i] = s[i];
                this.links = {};
                try {
                    t.link && (this.links = utils.parseLinks(t.link))
                } catch (t) {}
            }, ResponseBase.prototype._setStatusProperties = function(t) {
                var e = t / 100 | 0;
                this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.redirect = 3 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.forbidden = 403 == t, this.notFound = 404 == t
            };
        }, {
            "./utils": 178
        }],
        177: [function(require, module, exports) {
            var ERROR_CODES = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
            module.exports = function(E, O) {
                return !!(E && E.code && ~ERROR_CODES.indexOf(E.code)) || (!!(O && O.status && O.status >= 500) || (!!(E && "timeout" in E && "ECONNABORTED" == E.code) || !!(E && "crossDomain" in E)))
            };
        }, {}],
        178: [function(require, module, exports) {
            exports.type = function(e) {
                return e.split(/ *; */).shift()
            }, exports.params = function(e) {
                return e.split(/ *; */).reduce(function(e, t) {
                    var n = t.split(/ *= */),
                        r = n.shift(),
                        i = n.shift();
                    return r && i && (e[r] = i), e
                }, {})
            }, exports.parseLinks = function(e) {
                return e.split(/ *, */).reduce(function(e, t) {
                    var n = t.split(/ *; */),
                        r = n[0].slice(1, -1);
                    return e[n[1].split(/ *= */)[1].slice(1, -1)] = r, e
                }, {})
            }, exports.cleanHeader = function(e, t) {
                return delete e["content-type"], delete e["content-length"], delete e["transfer-encoding"], delete e.host, t && delete e.cookie, e
            };
        }, {}],
        179: [function(require, module, exports) {
            var Buffer = require("buffer").Buffer;
            module.exports = function(e) {
                if (e instanceof Uint8Array) {
                    if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;
                    if ("function" == typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
                }
                if (Buffer.isBuffer(e)) {
                    for (var f = new Uint8Array(e.length), r = e.length, t = 0; t < r; t++) f[t] = e[t];
                    return f.buffer
                }
                throw new Error("Argument must be a Buffer")
            };
        }, {
            "buffer": 29
        }],
        180: [function(require, module, exports) {
            "use strict";

            function Url() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
            }

            function urlParse(t, s, e) {
                if (t && util.isObject(t) && t instanceof Url) return t;
                var h = new Url;
                return h.parse(t, s, e), h
            }

            function urlFormat(t) {
                return util.isString(t) && (t = urlParse(t)), t instanceof Url ? t.format() : Url.prototype.format.call(t)
            }

            function urlResolve(t, s) {
                return urlParse(t, !1, !0).resolve(s)
            }

            function urlResolveObject(t, s) {
                return t ? urlParse(t, !1, !0).resolveObject(s) : s
            }
            var punycode = require("punycode"),
                util = require("./util");
            exports.parse = urlParse, exports.resolve = urlResolve, exports.resolveObject = urlResolveObject, exports.format = urlFormat, exports.Url = Url;
            var protocolPattern = /^([a-z0-9.+-]+:)/i,
                portPattern = /:[0-9]*$/,
                simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
                unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),
                autoEscape = ["'"].concat(unwise),
                nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),
                hostEndingChars = ["/", "?", "#"],
                hostnameMaxLen = 255,
                hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
                hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                unsafeProtocol = {
                    javascript: !0,
                    "javascript:": !0
                },
                hostlessProtocol = {
                    javascript: !0,
                    "javascript:": !0
                },
                slashedProtocol = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                },
                querystring = require("querystring");
            Url.prototype.parse = function(t, s, e) {
                if (!util.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var h = t.indexOf("?"),
                    r = -1 !== h && h < t.indexOf("#") ? "?" : "#",
                    a = t.split(r),
                    o = /\\/g;
                a[0] = a[0].replace(o, "/"), t = a.join(r);
                var n = t;
                if (n = n.trim(), !e && 1 === t.split("#").length) {
                    var i = simplePathPattern.exec(n);
                    if (i) return this.path = n, this.href = n, this.pathname = i[1], i[2] ? (this.search = i[2], this.query = s ? querystring.parse(this.search.substr(1)) : this.search.substr(1)) : s && (this.search = "", this.query = {}), this
                }
                var l = protocolPattern.exec(n);
                if (l) {
                    l = l[0];
                    var u = l.toLowerCase();
                    this.protocol = u, n = n.substr(l.length)
                }
                if (e || l || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var p = "//" === n.substr(0, 2);
                    !p || l && hostlessProtocol[l] || (n = n.substr(2), this.slashes = !0)
                }
                if (!hostlessProtocol[l] && (p || l && !slashedProtocol[l])) {
                    for (var c = -1, f = 0; f < hostEndingChars.length; f++) {
                        var m = n.indexOf(hostEndingChars[f]); - 1 !== m && (-1 === c || m < c) && (c = m)
                    }
                    var v, g;
                    g = -1 === c ? n.lastIndexOf("@") : n.lastIndexOf("@", c), -1 !== g && (v = n.slice(0, g), n = n.slice(g + 1), this.auth = decodeURIComponent(v)), c = -1;
                    for (var f = 0; f < nonHostChars.length; f++) {
                        var m = n.indexOf(nonHostChars[f]); - 1 !== m && (-1 === c || m < c) && (c = m)
                    } - 1 === c && (c = n.length), this.host = n.slice(0, c), n = n.slice(c), this.parseHost(), this.hostname = this.hostname || "";
                    var y = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!y)
                        for (var P = this.hostname.split(/\./), f = 0, d = P.length; f < d; f++) {
                            var b = P[f];
                            if (b && !b.match(hostnamePartPattern)) {
                                for (var q = "", O = 0, j = b.length; O < j; O++) b.charCodeAt(O) > 127 ? q += "x" : q += b[O];
                                if (!q.match(hostnamePartPattern)) {
                                    var x = P.slice(0, f),
                                        U = P.slice(f + 1),
                                        C = b.match(hostnamePartStart);
                                    C && (x.push(C[1]), U.unshift(C[2])), U.length && (n = "/" + U.join(".") + n), this.hostname = x.join(".");
                                    break
                                }
                            }
                        }
                    this.hostname.length > hostnameMaxLen ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), y || (this.hostname = punycode.toASCII(this.hostname));
                    var A = this.port ? ":" + this.port : "",
                        w = this.hostname || "";
                    this.host = w + A, this.href += this.host, y && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
                }
                if (!unsafeProtocol[u])
                    for (var f = 0, d = autoEscape.length; f < d; f++) {
                        var E = autoEscape[f];
                        if (-1 !== n.indexOf(E)) {
                            var I = encodeURIComponent(E);
                            I === E && (I = escape(E)), n = n.split(E).join(I)
                        }
                    }
                var R = n.indexOf("#"); - 1 !== R && (this.hash = n.substr(R), n = n.slice(0, R));
                var S = n.indexOf("?");
                if (-1 !== S ? (this.search = n.substr(S), this.query = n.substr(S + 1), s && (this.query = querystring.parse(this.query)), n = n.slice(0, S)) : s && (this.search = "", this.query = {}), n && (this.pathname = n), slashedProtocol[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    var A = this.pathname || "",
                        k = this.search || "";
                    this.path = A + k
                }
                return this.href = this.format(), this
            }, Url.prototype.format = function() {
                var t = this.auth || "";
                t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
                var s = this.protocol || "",
                    e = this.pathname || "",
                    h = this.hash || "",
                    r = !1,
                    a = "";
                this.host ? r = t + this.host : this.hostname && (r = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (r += ":" + this.port)), this.query && util.isObject(this.query) && Object.keys(this.query).length && (a = querystring.stringify(this.query));
                var o = this.search || a && "?" + a || "";
                return s && ":" !== s.substr(-1) && (s += ":"), this.slashes || (!s || slashedProtocol[s]) && !1 !== r ? (r = "//" + (r || ""), e && "/" !== e.charAt(0) && (e = "/" + e)) : r || (r = ""), h && "#" !== h.charAt(0) && (h = "#" + h), o && "?" !== o.charAt(0) && (o = "?" + o), e = e.replace(/[?#]/g, function(t) {
                    return encodeURIComponent(t)
                }), o = o.replace("#", "%23"), s + r + e + o + h
            }, Url.prototype.resolve = function(t) {
                return this.resolveObject(urlParse(t, !1, !0)).format()
            }, Url.prototype.resolveObject = function(t) {
                if (util.isString(t)) {
                    var s = new Url;
                    s.parse(t, !1, !0), t = s
                }
                for (var e = new Url, h = Object.keys(this), r = 0; r < h.length; r++) {
                    var a = h[r];
                    e[a] = this[a]
                }
                if (e.hash = t.hash, "" === t.href) return e.href = e.format(), e;
                if (t.slashes && !t.protocol) {
                    for (var o = Object.keys(t), n = 0; n < o.length; n++) {
                        var i = o[n];
                        "protocol" !== i && (e[i] = t[i])
                    }
                    return slashedProtocol[e.protocol] && e.hostname && !e.pathname && (e.path = e.pathname = "/"), e.href = e.format(), e
                }
                if (t.protocol && t.protocol !== e.protocol) {
                    if (!slashedProtocol[t.protocol]) {
                        for (var l = Object.keys(t), u = 0; u < l.length; u++) {
                            var p = l[u];
                            e[p] = t[p]
                        }
                        return e.href = e.format(), e
                    }
                    if (e.protocol = t.protocol, t.host || hostlessProtocol[t.protocol]) e.pathname = t.pathname;
                    else {
                        for (var c = (t.pathname || "").split("/"); c.length && !(t.host = c.shift()););
                        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== c[0] && c.unshift(""), c.length < 2 && c.unshift(""), e.pathname = c.join("/")
                    }
                    if (e.search = t.search, e.query = t.query, e.host = t.host || "", e.auth = t.auth, e.hostname = t.hostname || t.host, e.port = t.port, e.pathname || e.search) {
                        var f = e.pathname || "",
                            m = e.search || "";
                        e.path = f + m
                    }
                    return e.slashes = e.slashes || t.slashes, e.href = e.format(), e
                }
                var v = e.pathname && "/" === e.pathname.charAt(0),
                    g = t.host || t.pathname && "/" === t.pathname.charAt(0),
                    y = g || v || e.host && t.pathname,
                    P = y,
                    d = e.pathname && e.pathname.split("/") || [],
                    c = t.pathname && t.pathname.split("/") || [],
                    b = e.protocol && !slashedProtocol[e.protocol];
                if (b && (e.hostname = "", e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === c[0] ? c[0] = t.host : c.unshift(t.host)), t.host = null), y = y && ("" === c[0] || "" === d[0])), g) e.host = t.host || "" === t.host ? t.host : e.host, e.hostname = t.hostname || "" === t.hostname ? t.hostname : e.hostname, e.search = t.search, e.query = t.query, d = c;
                else if (c.length) d || (d = []), d.pop(), d = d.concat(c), e.search = t.search, e.query = t.query;
                else if (!util.isNullOrUndefined(t.search)) {
                    if (b) {
                        e.hostname = e.host = d.shift();
                        var q = !!(e.host && e.host.indexOf("@") > 0) && e.host.split("@");
                        q && (e.auth = q.shift(), e.host = e.hostname = q.shift())
                    }
                    return e.search = t.search, e.query = t.query, util.isNull(e.pathname) && util.isNull(e.search) || (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.href = e.format(), e
                }
                if (!d.length) return e.pathname = null, e.search ? e.path = "/" + e.search : e.path = null, e.href = e.format(), e;
                for (var O = d.slice(-1)[0], j = (e.host || t.host || d.length > 1) && ("." === O || ".." === O) || "" === O, x = 0, U = d.length; U >= 0; U--) O = d[U], "." === O ? d.splice(U, 1) : ".." === O ? (d.splice(U, 1), x++) : x && (d.splice(U, 1), x--);
                if (!y && !P)
                    for (; x--; x) d.unshift("..");
                !y || "" === d[0] || d[0] && "/" === d[0].charAt(0) || d.unshift(""), j && "/" !== d.join("/").substr(-1) && d.push("");
                var C = "" === d[0] || d[0] && "/" === d[0].charAt(0);
                if (b) {
                    e.hostname = e.host = C ? "" : d.length ? d.shift() : "";
                    var q = !!(e.host && e.host.indexOf("@") > 0) && e.host.split("@");
                    q && (e.auth = q.shift(), e.host = e.hostname = q.shift())
                }
                return y = y || e.host && d.length, y && !C && d.unshift(""), d.length ? e.pathname = d.join("/") : (e.pathname = null, e.path = null), util.isNull(e.pathname) && util.isNull(e.search) || (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")), e.auth = t.auth || e.auth, e.slashes = e.slashes || t.slashes, e.href = e.format(), e
            }, Url.prototype.parseHost = function() {
                var t = this.host,
                    s = portPattern.exec(t);
                s && (s = s[0], ":" !== s && (this.port = s.substr(1)), t = t.substr(0, t.length - s.length)), t && (this.hostname = t)
            };
        }, {
            "./util": 181,
            "punycode": 148,
            "querystring": 151
        }],
        181: [function(require, module, exports) {
            "use strict";
            module.exports = {
                isString: function(n) {
                    return "string" == typeof n
                },
                isObject: function(n) {
                    return "object" == typeof n && null !== n
                },
                isNull: function(n) {
                    return null === n
                },
                isNullOrUndefined: function(n) {
                    return null == n
                }
            };
        }, {}],
        182: [function(require, module, exports) {
            (function(global) {
                function deprecate(r, e) {
                    function o() {
                        if (!t) {
                            if (config("throwDeprecation")) throw new Error(e);
                            config("traceDeprecation") ? console.trace(e) : console.warn(e), t = !0
                        }
                        return r.apply(this, arguments)
                    }
                    if (config("noDeprecation")) return r;
                    var t = !1;
                    return o
                }

                function config(r) {
                    try {
                        if (!global.localStorage) return !1
                    } catch (r) {
                        return !1
                    }
                    var e = global.localStorage[r];
                    return null != e && "true" === String(e).toLowerCase()
                }
                module.exports = deprecate;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        183: [function(require, module, exports) {
            function extend() {
                for (var r = {}, e = 0; e < arguments.length; e++) {
                    var t = arguments[e];
                    for (var n in t) hasOwnProperty.call(t, n) && (r[n] = t[n])
                }
                return r
            }
            module.exports = extend;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
        }, {}]
    }, {}, [6])(6)
});

//# sourceMappingURL=particle.min.js.map
