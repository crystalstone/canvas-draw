!function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            "i": i,
            "l": !1,
            "exports": {}
        };
        return t[i].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    var n = {};
    e.m = t, e.c = n, e.i = function(t) {
        return t;
    }, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            "configurable": !1,
            "enumerable": !0,
            "get": i
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t["default"];
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "/", e(e.s = 21);
}([ function(t, e, n) {
    "use strict";
    var i = n(7)();
    t.exports = function(t) {
        return t !== i && null !== t;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = {
        "guid": function() {
            function t() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            }
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
        },
        "AngleBetween2Vector": function(t, e) {
            var n = t[0] * e[0] + t[1] * e[1], i = Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2)), o = Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2)), r = n / (i * o);
            return 180 * Math.acos(r) / Math.PI;
        },
        "canvas2imgxy": function(t, e) {
            if (t && t.length) {
                if ("[object Array]" === Object.prototype.toString.call(t[0])) {
                    var n = [];
                    return t.forEach(function(t) {
                        n.push([ Math.round(t[0] * e.x), Math.round(t[1] * e.y) ]);
                    }), n;
                }
                return [ Math.round(t[0] * e.x), Math.round(t[1] * e.y) ];
            }
            return t;
        },
        "img2canvasxy": function(t, e) {
            if (t && t.length) {
                if ("[object Array]" === Object.prototype.toString.call(t[0])) {
                    var n = [];
                    return t.forEach(function(t) {
                        n.push([ Math.round(t[0] / e.x), Math.round(t[1] / e.y) ]);
                    }), n;
                }
                return [ Math.round(t[0] / e.x), Math.round(t[1] / e.y) ];
            }
            return t;
        },
        "screen2canvasxy": function(t, e) {
            if (t && 2 === t.length && e) {
                var n = e.getBoundingClientRect();
                return [ t[0] - n.left * (e.width / n.width), t[1] - n.top * (e.height / n.height) ];
            }
            return null;
        },
        "checkPointInCircle": function(t, e, n) {
            var i = t[0], o = t[1];
            return !!(Math.pow(e[0] - i, 2) + Math.pow(e[1] - o, 2) <= Math.pow(n, 2));
        },
        "checkPointPolygon": function(t, e) {
            for (var n = e.length, i = 0, o = 0, r = n - 1; o < n; o++) {
                var a = e[r][0], s = e[r][1], c = e[o][0], l = e[o][1];
                i += this.windingLine(a, s, c, l, t[0], t[1]), r = o;
            }
            return 0 !== i;
        },
        "windingLine": function(t, e, n, i, o, r) {
            if (r > e && r > i || r < e && r < i) return 0;
            if (i == e) return 0;
            var a = i < e ? 1 : -1;
            return (r - e) / (i - e) * (n - t) + t > o ? a : 0;
        }
    };
}, function(t, e, n) {
    "use strict";
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        "value": !0
    }), e["default"] = void 0;
    var o = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
    }, r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), a = n(1), s = function(t) {
        return t && t.__esModule ? t : {
            "default": t
        };
    }(a), c = function() {
        function t(e, n, o) {
            i(this, t);
        }
        return r(t, [ {
            "key": "changePorprities",
            "value": function(t, e) {
                2 === arguments.length && (this.props[t] = e), this.fontStyle = o({}, {
                    "fillColor": "#ffffe0",
                    "font": "15px serif"
                }, this.props.fontStyle || {}), this.baseStyle = o({}, {
                    "strokeColor": "#ffffe0",
                    "lineWidth": 1,
                    "lineCap": "round",
                    "lineJoin": "round"
                }, this.props.baseStyle || {}), this.hoverStyle = o({}, this.baseStyle, this.props.hoverStyle || {
                    "strokeColor": "#fffff0",
                    "lineWidth": 2
                }), this.selectedStyle = o({}, this.baseStyle, this.props.selectedStyle || {
                    "lineDashOffset": 0,
                    "lineDash": [ 10, 4 ]
                });
            }
        }, {
            "key": "getImg2canvasRatio",
            "value": function() {
                return {
                    "x": this.img.width / this.ctx.canvas.width,
                    "y": this.img.height / this.ctx.canvas.height
                };
            }
        }, {
            "key": "drag",
            "value": function(t) {
                this.drapPoint || (this.drapPoint = this.checkPointOnNode(t)), this.drapPoint && this.geojson && this.geojson.geometry && this.geojson.geometry.coordinates[this.drapPoint.index] && (this.geojson.geometry.coordinates[this.drapPoint.index] = s["default"].screen2canvasxy(t, this.ctx.canvas), 
                this.geojson.geometry.imgcoordinates[this.drapPoint.index] = s["default"].canvas2imgxy(this.geojson.geometry.coordinates[this.drapPoint.index], this.getImg2canvasRatio()));
            }
        }, {
            "key": "stopDrag",
            "value": function() {
                this.drapPoint = null;
            }
        }, {
            "key": "move",
            "value": function(t) {
                if (!this.movePoint) return void (this.movePoint = t);
                var e = [ t[0] - this.movePoint[0], t[1] - this.movePoint[1] ];
                this.geojson && this.geojson.geometry && this.geojson.geometry.coordinates.forEach(function(t) {
                    t[0] += e[0], t[1] += e[1];
                }), this.movePoint = t;
            }
        }, {
            "key": "stopMove",
            "value": function() {
                this.geojson.geometry.imgcoordinates = s["default"].canvas2imgxy(this.geojson.geometry.coordinates, this.getImg2canvasRatio()), 
                this.movePoint = null;
            }
        }, {
            "key": "changeState",
            "value": function(t) {
                this.state = t;
            }
        }, {
            "key": "setTempPoint",
            "value": function(t) {
                this.tempPoint = t ? s["default"].screen2canvasxy(t, this.ctx.canvas) : null;
            }
        }, {
            "key": "addPoint",
            "value": function(t) {
                this.state = "selected";
                var e = s["default"].screen2canvasxy(t, this.ctx.canvas), n = this.geojson.geometry.coordinates[this.geojson.geometry.coordinates.length - 1];
                n && e && e[0] === n[0] && e[1] === n[1] || (this.geojson.geometry.coordinates.push(e), 
                this.geojson.geometry.imgcoordinates.push(s["default"].canvas2imgxy(e, this.getImg2canvasRatio())));
            }
        }, {
            "key": "checkPointOnNode",
            "value": function(t) {
                for (var e = s["default"].screen2canvasxy(t, this.ctx.canvas), n = 0, i = this.geojson.geometry.coordinates.length; n < i; n++) {
                    var o = this.geojson.geometry.coordinates[n];
                    if (s["default"].checkPointInCircle(e, o, 3)) return {
                        "index": n,
                        "node": o
                    };
                }
                return null;
            }
        }, {
            "key": "checkPointInside",
            "value": function(t) {
                var e = s["default"].screen2canvasxy(t, this.ctx.canvas);
                return !!this.ctx.isPointInPath(e[0], e[1]);
            }
        }, {
            "key": "draw",
            "value": function() {
                switch (this.state) {
                  case "show":
                    this.drawSimple();
                    break;

                  case "selected":
                    this.drawSelected();
                    break;

                  case "hover":
                    this.drawHover();
                    break;

                  default:
                    this.drawSimple();
                }
            }
        }, {
            "key": "drawText",
            "value": function(t, e, n) {
                t.fillColor && (this.ctx.fillStyle = t.fillColor), t.strokeColor && (this.ctx.strokeStyle = t.strokeColor), 
                t.font && (this.ctx.font = t.font), t.fillColor && this.ctx.fillText(e, n[0], n[1]), 
                t.strokeColor && this.ctx.strokeText(e, n[0], n[1]);
            }
        }, {
            "key": "drawStyle",
            "value": function(t) {
                t.fillColor && (this.ctx.fillStyle = t.fillColor), t.strokeColor && (this.ctx.strokeStyle = t.strokeColor), 
                t.lineWidth && (this.ctx.lineWidth = t.lineWidth), this.ctx.setLineDash && (this.ctx.setLineDash(t.lineDash || [ 10, 0 ]), 
                this.ctx.lineDashOffset = t.lineDashOffset || 0), t.fillColor && this.ctx.fill(), 
                t.strokeColor && this.ctx.stroke();
            }
        }, {
            "key": "drawOutline",
            "value": function(t) {
                var e = this.geojson.geometry.coordinates || [], n = this.geojson.geometry.imgcoordinates || [], i = [ 0, 0 ];
                if (e && e.length) {
                    var o = e[0];
                    i[0] += o[0], i[1] += o[1], this.ctx.beginPath(), this.ctx.moveTo(o[0], o[1]), this.props.showPointLabel && t && this.drawText(this.fontStyle, "{x: " + n[0][0] + ", y: " + n[0][1] + "}", [ o[0], o[1] ]);
                    for (var r = 1, a = e.length; r < a; r++) try {
                        var s = e[r];
                        i[0] += s[0], i[1] += s[1], this.props.showPointLabel && t && this.drawText(this.fontStyle, "{x: " + n[r][0] + ", y: " + n[r][1] + "}", [ s[0], s[1] ]), 
                        this.ctx.lineTo(s[0], s[1]);
                    } catch (c) {}
                    this.props.showLabel && this.props.label && t && this.drawText(this.fontStyle, this.props.label, [ i[0] / e.length - 3 * this.props.label.length, i[1] / e.length ]);
                }
            }
        }, {
            "key": "drawSimple",
            "value": function() {
                this.drawOutline(!0), this.ctx.closePath(), this.drawStyle(this.baseStyle);
            }
        }, {
            "key": "drawHover",
            "value": function() {
                this.drawOutline(!0), this.ctx.closePath(), this.drawStyle(this.hoverStyle);
            }
        }, {
            "key": "drawSelected",
            "value": function() {}
        } ]), t;
    }();
    e["default"] = c;
}, function(t, e, n) {
    "use strict";
    var i, o, r, a, s, c, l, u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, h = n(6), f = n(16), d = Function.prototype.apply, p = Function.prototype.call, g = Object.create, y = Object.defineProperty, v = Object.defineProperties, m = Object.prototype.hasOwnProperty, x = {
        "configurable": !0,
        "enumerable": !1,
        "writable": !0
    };
    i = function(t, e) {
        var n;
        return f(e), m.call(this, "__ee__") ? n = this.__ee__ : (n = x.value = g(null), 
        y(this, "__ee__", x), x.value = null), n[t] ? "object" === u(n[t]) ? n[t].push(e) : n[t] = [ n[t], e ] : n[t] = e, 
        this;
    }, o = function(t, e) {
        var n, o;
        return f(e), o = this, i.call(this, t, n = function() {
            r.call(o, t, n), d.call(e, this, arguments);
        }), n.__eeOnceListener__ = e, this;
    }, r = function(t, e) {
        var n, i, o, r;
        if (f(e), !m.call(this, "__ee__")) return this;
        if (n = this.__ee__, !n[t]) return this;
        if (i = n[t], "object" === (void 0 === i ? "undefined" : u(i))) for (r = 0; o = i[r]; ++r) o !== e && o.__eeOnceListener__ !== e || (2 === i.length ? n[t] = i[r ? 0 : 1] : i.splice(r, 1)); else i !== e && i.__eeOnceListener__ !== e || delete n[t];
        return this;
    }, a = function(t) {
        var e, n, i, o, r;
        if (m.call(this, "__ee__") && (o = this.__ee__[t])) if ("object" === (void 0 === o ? "undefined" : u(o))) {
            for (n = arguments.length, r = new Array(n - 1), e = 1; e < n; ++e) r[e - 1] = arguments[e];
            for (o = o.slice(), e = 0; i = o[e]; ++e) d.call(i, this, r);
        } else switch (arguments.length) {
          case 1:
            p.call(o, this);
            break;

          case 2:
            p.call(o, this, arguments[1]);
            break;

          case 3:
            p.call(o, this, arguments[1], arguments[2]);
            break;

          default:
            for (n = arguments.length, r = new Array(n - 1), e = 1; e < n; ++e) r[e - 1] = arguments[e];
            d.call(o, this, r);
        }
    }, s = {
        "on": i,
        "once": o,
        "off": r,
        "emit": a
    }, c = {
        "on": h(i),
        "once": h(o),
        "off": h(r),
        "emit": h(a)
    }, l = v({}, c), t.exports = e = function(t) {
        return null == t ? g(l) : v(Object(t), c);
    }, e.methods = s;
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            "default": t
        };
    }
    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function r(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e;
    }
    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            "constructor": {
                "value": t,
                "enumerable": !1,
                "writable": !0,
                "configurable": !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }
    Object.defineProperty(e, "__esModule", {
        "value": !0
    }), e["default"] = void 0;
    var s = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
    }, c = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), l = n(1), u = i(l), h = n(2), f = i(h), d = function(t) {
        function e(t, n, i) {
            o(this, e);
            var a = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, i));
            return a.ctx = t.ctx, a.img = t.img, a.state = "show", a.tempPoint = null, a.movePoint = null, 
            a.drapPoint = null, a.props = JSON.parse(JSON.stringify(n || {})), a.changePorprities(), 
            a.uuid = "Polygon_" + u["default"].guid(), a.type = "Polygon", a.geojson = {
                "type": "Feature",
                "properties": s({}, n),
                "geometry": {
                    "type": "Polygon",
                    "imgcoordinates": i || [],
                    "coordinates": u["default"].img2canvasxy(i, a.getImg2canvasRatio()) || []
                }
            }, a;
        }
        return a(e, t), c(e, [ {
            "key": "checkPointInside",
            "value": function(t) {
                var e = u["default"].screen2canvasxy(t, this.ctx.canvas), n = this.geojson.geometry.coordinates || [];
                return u["default"].checkPointPolygon(e, n);
            }
        }, {
            "key": "drawSelected",
            "value": function() {
                var t = this;
                this.drawOutline(), this.tempPoint && this.tempPoint.length && 2 === this.tempPoint.length && this.ctx.lineTo(this.tempPoint[0], this.tempPoint[1]), 
                this.ctx.closePath(), this.drawStyle(this.selectedStyle);
                var e = this.geojson.geometry.coordinates || [];
                e && e.forEach(function(e) {
                    t.ctx.beginPath(), t.ctx.arc(e[0], e[1], 3, 0, 2 * Math.PI), t.ctx.fillStyle = t.selectedStyle && t.selectedStyle.strokeColor || t.selectedStyle && t.selectedStyle.fillColor, 
                    t.ctx.fill();
                }), this.ctx.closePath();
            }
        } ]), e;
    }(f["default"]);
    e["default"] = d;
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            "default": t
        };
    }
    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function r(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e;
    }
    function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            "constructor": {
                "value": t,
                "enumerable": !1,
                "writable": !0,
                "configurable": !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }
    Object.defineProperty(e, "__esModule", {
        "value": !0
    }), e["default"] = void 0;
    var s = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
    }, c = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), l = n(1), u = i(l), h = n(2), f = i(h), d = function(t) {
        function e(t, n, i) {
            o(this, e);
            var a = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, i));
            if (a.ctx = t.ctx, a.img = t.img, a.state = "show", a.tempPoint = null, a.movePoint = null, 
            a.drapPoint = null, a.props = JSON.parse(JSON.stringify(n || {})), a.changePorprities(), 
            a.uuid = "Rectangle_" + u["default"].guid(), a.type = "Rectangle", a.geojson = {
                "type": "Feature",
                "properties": s({}, n),
                "geometry": {
                    "type": "Rectangle",
                    "imgcoordinates": [],
                    "coordinates": []
                }
            }, i && i.length) {
                a.geojson.geometry.imgcoordinates = i;
                var c = u["default"].img2canvasxy(i, a.getImg2canvasRatio());
                a.geojson.geometry.coordinates = [ c[0] ], a.generateCoordinates(c[0], c[1]), a.geojson.geometry.imgcoordinates[0] = i[0], 
                a.geojson.geometry.imgcoordinates[4] = i[1];
            }
            return a;
        }
        return a(e, t), c(e, [ {
            "key": "drawOutline",
            "value": function(t) {
                var e = this.geojson.geometry.coordinates || [], n = this.geojson.geometry.imgcoordinates || [], i = [ 0, 0 ];
                if (e && e.length) {
                    var o = e[0];
                    i[0] += o[0], i[1] += o[1], this.ctx.beginPath(), this.ctx.moveTo(o[0], o[1]), this.props.showPointLabel && t && this.drawText(this.fontStyle, "{x: " + n[0][0] + ", y: " + n[0][1] + "}", [ o[0], o[1] ]);
                    for (var r = 1, a = e.length; r < a; r++) try {
                        var s = e[r];
                        i[0] += s[0], i[1] += s[1], this.props.showPointLabel && t && 4 === r && this.drawText(this.fontStyle, "{x: " + n[r][0] + ", y: " + n[r][1] + "}", [ s[0], s[1] ]), 
                        this.ctx.lineTo(s[0], s[1]);
                    } catch (c) {}
                    this.props.showLabel && this.props.label && t && this.drawText(this.fontStyle, this.props.label, [ i[0] / e.length - 3 * this.props.label.length, i[1] / e.length ]);
                }
            }
        }, {
            "key": "drag",
            "value": function(t) {
                var e = this;
                setTimeout(function() {
                    if (e.drapPoint || (e.drapPoint = e.checkPointOnNode(t)), e.drapPoint && e.geojson && e.geojson.geometry && e.geojson.geometry.coordinates[e.drapPoint.index]) {
                        var n = e.drapPoint.index, i = u["default"].screen2canvasxy(t, e.ctx.canvas);
                        if (n % 2) {
                            var o = e.geojson.geometry.coordinates[n - 1], r = n + 1 > 7 ? e.geojson.geometry.coordinates[0] : e.geojson.geometry.coordinates[n + 1];
                            e.geojson.geometry.coordinates[e.drapPoint.index], Math.abs(o[0] - r[0]) > Math.abs(o[1] - r[1]) ? o[1] = r[1] = e.geojson.geometry.coordinates[e.drapPoint.index][1] = i[1] : o[0] = r[0] = e.geojson.geometry.coordinates[e.drapPoint.index][0] = i[0], 
                            e.generateCoordinates(e.geojson.geometry.coordinates[0], e.geojson.geometry.coordinates[4]);
                        } else {
                            var a = n - 4 >= 0 ? e.geojson.geometry.coordinates[n - 4] : e.geojson.geometry.coordinates[n + 4], s = i;
                            e.drapPoint = {
                                "index": 4,
                                "node": s
                            }, e.generateCoordinates(a, s);
                        }
                    }
                }, 0);
            }
        }, {
            "key": "stopDrag",
            "value": function() {
                this.drapPoint = null;
            }
        }, {
            "key": "checkPointInside",
            "value": function(t) {
                var e = u["default"].screen2canvasxy(t, this.ctx.canvas), n = this.geojson.geometry.coordinates || [];
                return u["default"].checkPointPolygon(e, n);
            }
        }, {
            "key": "generateCoordinates",
            "value": function(t, e) {
                if (t && 2 === t.length && e && 2 === e.length) {
                    var n = !0, i = null, o = null, r = u["default"].AngleBetween2Vector([ 1, 0 ], [ e[0] - t[0], e[1] - t[1] ]), a = u["default"].AngleBetween2Vector([ 0, 1 ], [ e[0] - t[0], e[1] - t[1] ]), s = Math.sqrt(Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2));
                    r > 90 && (r = 180 - r, n = !1);
                    var c = s * Math.cos(Math.PI / 180 * r), l = s * Math.sin(Math.PI / 180 * r);
                    a > 90 && (l *= -1), n ? (i = [ t[0] + c, t[1] ], o = [ t[0], t[1] + l ]) : (i = [ t[0] - c, t[1] ], 
                    o = [ t[0], t[1] + l ]);
                    var h = [ t, [ (t[0] + i[0]) / 2, (t[1] + i[1]) / 2 ], i, [ (e[0] + i[0]) / 2, (e[1] + i[1]) / 2 ], e, [ (e[0] + o[0]) / 2, (e[1] + o[1]) / 2 ], o, [ (t[0] + o[0]) / 2, (t[1] + o[1]) / 2 ] ];
                    this.geojson.geometry.coordinates = h;
                    var f = u["default"].canvas2imgxy(h, this.getImg2canvasRatio());
                    this.geojson.geometry.imgcoordinates = f;
                }
            }
        }, {
            "key": "setTempPoint",
            "value": function(t) {
                t ? (this.tempPoint = u["default"].screen2canvasxy(t, this.ctx.canvas), this.generateCoordinates(this.geojson.geometry.coordinates[0], this.tempPoint)) : this.tempPoint = null;
            }
        }, {
            "key": "addPoint",
            "value": function(t) {
                this.state = "selected";
                var e = u["default"].screen2canvasxy(t, this.ctx.canvas);
                this.geojson.geometry.coordinates.length > 0 ? this.generateCoordinates(this.geojson.geometry.coordinates[0], e) : this.geojson.geometry.coordinates.push(e);
            }
        }, {
            "key": "drawSelected",
            "value": function() {
                var t = this;
                this.drawOutline(), this.ctx.closePath(), this.drawStyle(this.selectedStyle);
                var e = this.geojson.geometry.coordinates || [];
                e && e.forEach(function(e, n) {
                    t.ctx.beginPath(), n % 2 ? (t.ctx.rect(e[0] - 4, e[1] - 4, 8, 8), t.ctx.fillStyle = t.selectedStyle && t.selectedStyle.strokeColor || t.selectedStyle && t.selectedStyle.fillColor, 
                    t.ctx.fill()) : (t.ctx.arc(e[0], e[1], 3, 0, 2 * Math.PI), t.ctx.fillStyle = t.selectedStyle && t.selectedStyle.strokeColor || t.selectedStyle && t.selectedStyle.fillColor, 
                    t.ctx.fill());
                }), this.ctx.closePath();
            }
        } ]), e;
    }(f["default"]);
    e["default"] = d;
}, function(t, e, n) {
    "use strict";
    var i, o = n(8), r = n(15), a = n(11), s = n(18);
    i = t.exports = function(t, e) {
        var n, i, a, c, l;
        return arguments.length < 2 || "string" != typeof t ? (c = e, e = t, t = null) : c = arguments[2], 
        null == t ? (n = a = !0, i = !1) : (n = s.call(t, "c"), i = s.call(t, "e"), a = s.call(t, "w")), 
        l = {
            "value": e,
            "configurable": n,
            "enumerable": i,
            "writable": a
        }, c ? o(r(c), l) : l;
    }, i.gs = function(t, e, n) {
        var i, c, l, u;
        return "string" != typeof t ? (l = n, n = e, e = t, t = null) : l = arguments[3], 
        null == e ? e = void 0 : a(e) ? null == n ? n = void 0 : a(n) || (l = n, n = void 0) : (l = e, 
        e = n = void 0), null == t ? (i = !0, c = !1) : (i = s.call(t, "c"), c = s.call(t, "e")), 
        u = {
            "get": e,
            "set": n,
            "configurable": i,
            "enumerable": c
        }, l ? o(r(l), u) : u;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = function() {};
}, function(t, e, n) {
    "use strict";
    t.exports = n(9)() ? Object.assign : n(10);
}, function(t, e, n) {
    "use strict";
    t.exports = function() {
        var t, e = Object.assign;
        return "function" == typeof e && (t = {
            "foo": "raz"
        }, e(t, {
            "bar": "dwa"
        }, {
            "trzy": "trzy"
        }), t.foo + t.bar + t.trzy === "razdwatrzy");
    };
}, function(t, e, n) {
    "use strict";
    var i = n(12), o = n(17), r = Math.max;
    t.exports = function(t, e) {
        var n, a, s, c = r(arguments.length, 2);
        for (t = Object(o(t)), s = function(i) {
            try {
                t[i] = e[i];
            } catch (o) {
                n || (n = o);
            }
        }, a = 1; a < c; ++a) e = arguments[a], i(e).forEach(s);
        if (void 0 !== n) throw n;
        return t;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        return "function" == typeof t;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = n(13)() ? Object.keys : n(14);
}, function(t, e, n) {
    "use strict";
    t.exports = function() {
        try {
            return Object.keys("primitive"), !0;
        } catch (t) {
            return !1;
        }
    };
}, function(t, e, n) {
    "use strict";
    var i = n(0), o = Object.keys;
    t.exports = function(t) {
        return o(i(t) ? Object(t) : t);
    };
}, function(t, e, n) {
    "use strict";
    var i = n(0), o = Array.prototype.forEach, r = Object.create, a = function(t, e) {
        var n;
        for (n in t) e[n] = t[n];
    };
    t.exports = function(t) {
        var e = r(null);
        return o.call(arguments, function(t) {
            i(t) && a(Object(t), e);
        }), e;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        if ("function" != typeof t) throw new TypeError(t + " is not a function");
        return t;
    };
}, function(t, e, n) {
    "use strict";
    var i = n(0);
    t.exports = function(t) {
        if (!i(t)) throw new TypeError("Cannot use null or undefined");
        return t;
    };
}, function(t, e, n) {
    "use strict";
    t.exports = n(19)() ? String.prototype.contains : n(20);
}, function(t, e, n) {
    "use strict";
    var i = "razdwatrzy";
    t.exports = function() {
        return "function" == typeof i.contains && (!0 === i.contains("dwa") && !1 === i.contains("foo"));
    };
}, function(t, e, n) {
    "use strict";
    var i = String.prototype.indexOf;
    t.exports = function(t) {
        return i.call(this, t, arguments[1]) > -1;
    };
}, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            "default": t
        };
    }
    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(e, "__esModule", {
        "value": !0
    }), e["default"] = void 0;
    var r = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
    }, a = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                Object.defineProperty(t, i.key, i);
            }
        }
        return function(e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e;
        };
    }(), s = n(4), c = i(s), l = n(5), u = i(l), h = n(3), f = i(h), d = "undefined" != typeof window && window.devicePixelRatio || 1, p = {
        "Polygon": c["default"],
        "Rectangle": u["default"]
    }, g = function() {
        function t(e, n) {
            o(this, t), e && document.getElementById(e) && (this.model = null, this.optState = "prepareing", 
            this.container = document.getElementById(e), this.options = r({}, {
                "width": this.container.offsetWidth,
                "height": this.container.offsetHeight,
                "ration": d
            }, n || {}), this.featureList = {}, this.currentFeature = null, this.filter = null, 
            this.hoverFeatureUuid = null, this.enableEdit = !0, this.options.width = this.options.width, 
            this.options.height = this.options.height, this.container.style.width = this.options.width + "px", 
            this.container.style.height = this.options.height + "px", this.container.style.padding = "0px", 
            this.initContext(), this.initEvent());
        }
        return a(t, [ {
            "key": "enable",
            "value": function() {
                this.enableEdit = !0;
            }
        }, {
            "key": "disable",
            "value": function() {
                this.enableEdit = !1;
            }
        }, {
            "key": "clear",
            "value": function() {
                this.featureList = {}, this.currentFeature = null, this.filter = null, this.hoverFeatureUuid = null, 
                this.model ? this.changeOptState("prepared") : this.changeOptState("prepareing"), 
                this.ctx && this.ctx.clearRect && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }, {
            "key": "getAllData",
            "value": function() {
                var t = [];
                for (var e in this.featureList) {
                    var n = this.featureList[e], i = [];
                    i = "Rectangle" == n.type && n.geojson.geometry.imgcoordinates.length ? [ n.geojson.geometry.imgcoordinates[0], n.geojson.geometry.imgcoordinates[4] ] : n.geojson.geometry.imgcoordinates, 
                    t.push({
                        "position": i,
                        "name": n.geojson.properties.label || "",
                        "color": n.baseStyle.strokeColor || ""
                    });
                }
                return t;
            }
        }, {
            "key": "initContext",
            "value": function() {
                var t = document.createElement("canvas");
                t.width = this.options.width, t.height = this.options.height, t.style.position = "absolute", 
                t.style.top = "0px", t.style.left = "0px", t.id = new Date().getTime() + "_draw_canvas", 
                this.container.style.position = "relative", this.container && this.container.appendChild(t), 
                this.canvas = t, !this.canvas.getContext && window.excanvas && window.excanvas.init(this.canvas), 
                this.ctx = this.canvas.getContext("2d");
            }
        }, {
            "key": "loadImg",
            "value": function(t, e) {
                var n = this;
                if (this.img = null, t) {
                    var i = new Image();
                    i.src = t, i.onload = function() {
                        if (!n.imgCtx) {
                            var t = document.createElement("canvas");
                            t.width = n.options.width, t.height = n.options.height, t.style.position = "absolute", 
                            t.style.top = "0px", t.style.left = "0px", t.id = new Date().getTime() + "_img_canvas", 
                            n.container && n.container.insertBefore(t, n.canvas), n.imgCanvas = t, !n.imgCanvas.getContext && window.excanvas && window.excanvas.init(n.imgCanvas), 
                            n.imgCtx = n.imgCanvas.getContext("2d");
                        }
                        n.img = i, n.clear(), n.imgCtx.drawImage(i, 0, 0, n.imgCanvas.width, n.imgCanvas.height), 
                        e && e();
                    };
                }
            }
        }, {
            "key": "changeModel",
            "value": function(t, e) {
                p[t] ? (this.model = {
                    "type": t,
                    "options": e
                }, this.changeOptState("prepared")) : t || (this.model = null, this.changeOptState("prepareing"));
            }
        }, {
            "key": "changeOptState",
            "value": function(t) {
                this.optState = t;
            }
        }, {
            "key": "deleteFeature",
            "value": function(t) {
                t && t.uuid && (delete this.featureList[t.uuid], this.optState = "prepareing", this.reRender());
            }
        }, {
            "key": "addFeature",
            "value": function(t) {
                var e = this;
                if (this.img, "[object Array]" === Object.prototype.toString.call(t)) t && t.length && t.forEach(function(t) {
                    if (t.type && p[t.type]) {
                        var n = new p[t.type]({
                            "ctx": e.ctx,
                            "img": e.img
                        }, t.properties || {}, t.coordinate || []);
                        e.featureList[n.uuid] = n;
                    }
                }); else if (t.type && p[t.type]) {
                    var n = new p[t.type]({
                        "ctx": this.ctx,
                        "img": this.img
                    }, t.properties || {}, t.coordinate || []);
                    this.featureList[n.uuid] = n;
                }
                this.reRender();
            }
        }, {
            "key": "initEvent",
            "value": function() {
                var t = this;
                "Microsoft Internet Explorer" === navigator.appName && navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i) || (this.container.addEventListener("click", function(e) {
                    t.clickHandler(e);
                }), this.container.addEventListener("dblclick", function(e) {
                    t.dblclickHandler(e);
                }), this.container.addEventListener("mousemove", function(e) {
                    t.mouseMoveHandler(e);
                }), this.container.addEventListener("mousedown", function(e) {
                    t.mouseDownHandler(e);
                }), document.addEventListener("keydown", function(e) {
                    t.onkeydownHandler(e);
                }));
            }
        }, {
            "key": "onkeydownHandler",
            "value": function(t) {
                t && 27 === t.keyCode && "editing" === this.optState && this.finish(), t && 67 === t.keyCode && "drawing" === this.optState && (this.deleteFeature(this.currentFeature), 
                this.currentFeature = null, this.reRender(), this.model ? this.changeOptState("prepared") : this.changeOptState("prepareing"));
            }
        }, {
            "key": "clickHandler",
            "value": function(t) {
                if (t.preventDefault(), t.stopPropagation(), this.enableEdit) {
                    switch (this.optState) {
                      case "prepareing":
                        for (var e in this.featureList) if (this.featureList.hasOwnProperty(e) && this.featureList[e].checkPointInside([ t.pageX, t.pageY ])) {
                            this.currentFeature = this.featureList[e], this.featureList[e].changeState("selected"), 
                            this.optState = "editing", this.emit("select", this.currentFeature.uuid);
                            break;
                        }
                        this.reRender();
                        break;

                      case "prepared":
                        this.optState = "drawing";
                        var n = this.currentFeature = new p[this.model.type]({
                            "ctx": this.ctx,
                            "img": this.img
                        }, this.model.options);
                        n.addPoint([ t.pageX, t.pageY ]), this.featureList[n.uuid] = n, this.reRender();
                        break;

                      case "drawing":
                        this.currentFeature.addPoint([ t.pageX, t.pageY ]), this.reRender();
                    }
                    return !1;
                }
            }
        }, {
            "key": "dblclickHandler",
            "value": function(t) {
                if (t.preventDefault(), t.stopPropagation(), this.enableEdit) {
                    switch (this.optState) {
                      case "prepareing":
                      case "prepared":
                        break;

                      case "drawing":
                        this.changeOptState("editing");

                      case "editing":
                        this.currentFeature && this.currentFeature.setTempPoint(null);
                    }
                    return !1;
                }
            }
        }, {
            "key": "mouseDownHandler",
            "value": function(t) {
                return t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0, t.returnValue = !1, 
                !1;
            }
        }, {
            "key": "mouseMoveHandler",
            "value": function(t) {
                switch (t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0, t.returnValue = !1, 
                this.optState) {
                  case "prepareing":
                  case "prepared":
                    this.hoverRender(t);
                    break;

                  case "drawing":
                    this.currentFeature && (this.currentFeature.setTempPoint([ t.pageX, t.pageY ]), 
                    this.reRender());
                    break;

                  case "editing":
                    if (this.currentFeature) {
                        if (this.currentFeature.drapPoint || this.currentFeature.checkPointOnNode([ t.pageX, t.pageY ])) return this.container.style.cursor = "crosshair", 
                        1 === t.buttons ? (this.currentFeature.drag([ t.pageX, t.pageY ]), this.reRender()) : this.currentFeature.stopDrag(), 
                        !1;
                        if (this.currentFeature.checkPointInside([ t.pageX, t.pageY ])) return this.container.style.cursor = "move", 
                        1 === t.buttons ? (this.currentFeature.move([ t.pageX, t.pageY ]), this.reRender()) : this.currentFeature.stopMove(), 
                        !1;
                    }
                    this.model ? this.container.style.cursor = "auto" : this.container.style.cursor = "pointer";
                }
                return !1;
            }
        }, {
            "key": "hoverRender",
            "value": function(t) {
                var e = null;
                for (var n in this.featureList) if (this.featureList.hasOwnProperty(n) && this.featureList[n].checkPointInside([ t.pageX, t.pageY ])) {
                    e = n;
                    break;
                }
                e ? this.container.style.cursor = "move" : this.model ? this.container.style.cursor = "auto" : this.container.style.cursor = "pointer";
                for (var i in this.featureList) this.featureList.hasOwnProperty(i) && e === i ? this.featureList[i].changeState("hover") : this.featureList[i].changeState("show");
                this.hoverFeatureUuid !== e && (this.reRender(), this.hoverFeatureUuid = e);
            }
        }, {
            "key": "reRender",
            "value": function() {
                var t = this;
                setTimeout(function() {
                    t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
                    for (var e in t.featureList) t.featureList.hasOwnProperty(e) && t.matchFilter(t.featureList[e], t.filter) && t.featureList[e].draw();
                }, 0);
            }
        }, {
            "key": "matchFilter",
            "value": function(t, e) {
                if (!this.filter) return !0;
                var n = t.props[this.filter.key];
                switch (this.filter.opt) {
                  case "in":
                    var i = !1;
                    return this.filter.value && this.filter.value.forEach(function(t) {
                        t === n && (i = !0);
                    }), i;

                  case "not-in":
                    var o = !0;
                    return this.filter.value && this.filter.value.forEach(function(t) {
                        t === n && (o = !1);
                    }), o;

                  case "equal":
                    return !(t.props[this.filter.key] !== this.filter.value);

                  case "not-equal":
                    return !(t.props[this.filter.key] === this.filter.value);

                  default:
                    return !0;
                }
            }
        }, {
            "key": "setFilter",
            "value": function(t, e, n) {
                3 === arguments.length ? this.filter = {
                    "key": t,
                    "opt": e,
                    "value": n
                } : this.filter = null, this.reRender();
            }
        }, {
            "key": "changePorprities",
            "value": function(t, e, n) {
                for (var i in this.featureList) this.featureList.hasOwnProperty(i) && this.matchFilter(this.featureList[i], t) && this.featureList[i].changePorprities(e, n);
                this.reRender();
            }
        }, {
            "key": "finish",
            "value": function() {
                this.currentFeature && (this.currentFeature.changeState("show"), this.reRender()), 
                this.emit("finish", this.currentFeature.uuid), this.model ? this.changeOptState("prepared") : this.changeOptState("prepareing"), 
                this.currentFeature = null;
            }
        } ]), t;
    }();
    e["default"] = g, (0, f["default"])(g.prototype), window.Hope = g;
} ]);