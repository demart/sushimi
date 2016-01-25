 /* jQuery v1.7.2 jquery.com | jquery.org/license */
 (function (a, b) {
     function cy(a) {
         return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
     }

     function cu(a) {
         if (!cj[a]) {
             var b = c.body,
                 d = f("<" + a + ">").appendTo(b),
                 e = d.css("display");
             d.remove();
             if (e === "none" || e === "") {
                 ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                 if (!cl || !ck.createElement) {
                     cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close()
                 }
                 d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
             }
             cj[a] = e
         }
         return cj[a]
     }

     function ct(a, b) {
         var c = {};
         f.each(cp.concat.apply([], cp.slice(0, b)), function () {
             c[this] = a
         });
         return c
     }

     function cs() {
         cq = b
     }

     function cr() {
         setTimeout(cs, 0);
         return cq = f.now()
     }

     function ci() {
         try {
             return new a.ActiveXObject("Microsoft.XMLHTTP")
         } catch (b) {}
     }

     function ch() {
         try {
             return new a.XMLHttpRequest
         } catch (b) {}
     }

     function cb(a, c) {
         a.dataFilter && (c = a.dataFilter(c, a.dataType));
         var d = a.dataTypes,
             e = {},
             g, h, i = d.length,
             j, k = d[0],
             l, m, n, o, p;
         for (g = 1; g < i; g++) {
             if (g === 1) {
                 for (h in a.converters) {
                     typeof h == "string" && (e[h.toLowerCase()] = a.converters[h])
                 }
             }
             l = k, k = d[g];
             if (k === "*") {
                 k = l
             } else {
                 if (l !== "*" && l !== k) {
                     m = l + " " + k, n = e[m] || e["* " + k];
                     if (!n) {
                         p = b;
                         for (o in e) {
                             j = o.split(" ");
                             if (j[0] === l || j[0] === "*") {
                                 p = e[j[1] + " " + k];
                                 if (p) {
                                     o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                     break
                                 }
                             }
                         }
                     }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
                 }
             }
         }
         return c
     }

     function ca(a, c, d) {
         var e = a.contents,
             f = a.dataTypes,
             g = a.responseFields,
             h, i, j, k;
         for (i in g) {
             i in d && (c[g[i]] = d[i])
         }
         while (f[0] === "*") {
             f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"))
         }
         if (h) {
             for (i in e) {
                 if (e[i] && e[i].test(h)) {
                     f.unshift(i);
                     break
                 }
             }
         }
         if (f[0] in d) {
             j = f[0]
         } else {
             for (i in d) {
                 if (!f[0] || a.converters[i + " " + f[0]]) {
                     j = i;
                     break
                 }
                 k || (k = i)
             }
             j = j || k
         } if (j) {
             j !== f[0] && f.unshift(j);
             return d[j]
         }
     }

     function b_(a, b, c, d) {
         if (f.isArray(b)) {
             f.each(b, function (b, e) {
                 c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
             })
         } else {
             if (!c && f.type(b) === "object") {
                 for (var e in b) {
                     b_(a + "[" + e + "]", b[e], c, d)
                 }
             } else {
                 d(a, b)
             }
         }
     }

     function b$(a, c) {
         var d, e, g = f.ajaxSettings.flatOptions || {};
         for (d in c) {
             c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d])
         }
         e && f.extend(!0, a, e)
     }

     function bZ(a, c, d, e, f, g) {
         f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
         var h = a[f],
             i = 0,
             j = h ? h.length : 0,
             k = a === bS,
             l;
         for (; i < j && (k || !l); i++) {
             l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)))
         }(k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
         return l
     }

     function bY(a) {
         return function (b, c) {
             typeof b != "string" && (c = b, b = "*");
             if (f.isFunction(c)) {
                 var d = b.toLowerCase().split(bO),
                     e = 0,
                     g = d.length,
                     h, i, j;
                 for (; e < g; e++) {
                     h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
                 }
             }
         }
     }

     function bB(a, b, c) {
         var d = b === "width" ? a.offsetWidth : a.offsetHeight,
             e = b === "width" ? 1 : 0,
             g = 4;
         if (d > 0) {
             if (c !== "border") {
                 for (; e < g; e += 2) {
                     c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0
                 }
             }
             return d + "px"
         }
         d = by(a, b);
         if (d < 0 || d == null) {
             d = a.style[b]
         }
         if (bt.test(d)) {
             return d
         }
         d = parseFloat(d) || 0;
         if (c) {
             for (; e < g; e += 2) {
                 d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0)
             }
         }
         return d + "px"
     }

     function bo(a) {
         var b = c.createElement("div");
         bh.appendChild(b), b.innerHTML = a.outerHTML;
         return b.firstChild
     }

     function bn(a) {
         var b = (a.nodeName || "").toLowerCase();
         b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
     }

     function bm(a) {
         if (a.type === "checkbox" || a.type === "radio") {
             a.defaultChecked = a.checked
         }
     }

     function bl(a) {
         return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
     }

     function bk(a, b) {
         var c;
         b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
     }

     function bj(a, b) {
         if (b.nodeType === 1 && !!f.hasData(a)) {
             var c, d, e, g = f._data(a),
                 h = f._data(b, g),
                 i = g.events;
             if (i) {
                 delete h.handle, h.events = {};
                 for (c in i) {
                     for (d = 0, e = i[c].length; d < e; d++) {
                         f.event.add(b, c, i[c][d])
                     }
                 }
             }
             h.data && (h.data = f.extend({}, h.data))
         }
     }

     function bi(a, b) {
         return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
     }

     function U(a) {
         var b = V.split("|"),
             c = a.createDocumentFragment();
         if (c.createElement) {
             while (b.length) {
                 c.createElement(b.pop())
             }
         }
         return c
     }

     function T(a, b, c) {
         b = b || 0;
         if (f.isFunction(b)) {
             return f.grep(a, function (a, d) {
                 var e = !!b.call(a, d, a);
                 return e === c
             })
         }
         if (b.nodeType) {
             return f.grep(a, function (a, d) {
                 return a === b === c
             })
         }
         if (typeof b == "string") {
             var d = f.grep(a, function (a) {
                 return a.nodeType === 1
             });
             if (O.test(b)) {
                 return f.filter(b, d, !c)
             }
             b = f.filter(b, d)
         }
         return f.grep(a, function (a, d) {
             return f.inArray(a, b) >= 0 === c
         })
     }

     function S(a) {
         return !a || !a.parentNode || a.parentNode.nodeType === 11
     }

     function K() {
         return !0
     }

     function J() {
         return !1
     }

     function n(a, b, c) {
         var d = b + "defer",
             e = b + "queue",
             g = b + "mark",
             h = f._data(a, d);
         h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
             !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
         }, 0)
     }

     function m(a) {
         for (var b in a) {
             if (b === "data" && f.isEmptyObject(a[b])) {
                 continue
             }
             if (b !== "toJSON") {
                 return !1
             }
         }
         return !0
     }

     function l(a, c, d) {
         if (d === b && a.nodeType === 1) {
             var e = "data-" + c.replace(k, "-$1").toLowerCase();
             d = a.getAttribute(e);
             if (typeof d == "string") {
                 try {
                     d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                 } catch (g) {}
                 f.data(a, c, d)
             } else {
                 d = b
             }
         }
         return d
     }

     function h(a) {
         var b = g[a] = {},
             c, d;
         a = a.split(/\s+/);
         for (c = 0, d = a.length; c < d; c++) {
             b[a[c]] = !0
         }
         return b
     }
     var c = a.document,
         d = a.navigator,
         e = a.location,
         f = function () {
             function J() {
                 if (!e.isReady) {
                     try {
                         c.documentElement.doScroll("left")
                     } catch (a) {
                         setTimeout(J, 1);
                         return
                     }
                     e.ready()
                 }
             }
             var e = function (a, b) {
                     return new e.fn.init(a, b, h)
                 },
                 f = a.jQuery,
                 g = a.$,
                 h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                 j = /\S/,
                 k = /^\s+/,
                 l = /\s+$/,
                 m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                 n = /^[\],:{}\s]*$/,
                 o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                 p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                 q = /(?:^|:|,)(?:\s*\[)+/g,
                 r = /(webkit)[ \/]([\w.]+)/,
                 s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                 t = /(msie) ([\w.]+)/,
                 u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                 v = /-([a-z]|[0-9])/ig,
                 w = /^-ms-/,
                 x = function (a, b) {
                     return (b + "").toUpperCase()
                 },
                 y = d.userAgent,
                 z, A, B, C = Object.prototype.toString,
                 D = Object.prototype.hasOwnProperty,
                 E = Array.prototype.push,
                 F = Array.prototype.slice,
                 G = String.prototype.trim,
                 H = Array.prototype.indexOf,
                 I = {};
             e.fn = e.prototype = {
                 constructor: e,
                 init: function (a, d, f) {
                     var g, h, j, k;
                     if (!a) {
                         return this
                     }
                     if (a.nodeType) {
                         this.context = this[0] = a, this.length = 1;
                         return this
                     }
                     if (a === "body" && !d && c.body) {
                         this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                         return this
                     }
                     if (typeof a == "string") {
                         a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                         if (g && (g[1] || !d)) {
                             if (g[1]) {
                                 d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                 return e.merge(this, a)
                             }
                             h = c.getElementById(g[2]);
                             if (h && h.parentNode) {
                                 if (h.id !== g[2]) {
                                     return f.find(a)
                                 }
                                 this.length = 1, this[0] = h
                             }
                             this.context = c, this.selector = a;
                             return this
                         }
                         return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                     }
                     if (e.isFunction(a)) {
                         return f.ready(a)
                     }
                     a.selector !== b && (this.selector = a.selector, this.context = a.context);
                     return e.makeArray(a, this)
                 },
                 selector: "",
                 jquery: "1.7.2",
                 length: 0,
                 size: function () {
                     return this.length
                 },
                 toArray: function () {
                     return F.call(this, 0)
                 },
                 get: function (a) {
                     return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                 },
                 pushStack: function (a, b, c) {
                     var d = this.constructor();
                     e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                     return d
                 },
                 each: function (a, b) {
                     return e.each(this, a, b)
                 },
                 ready: function (a) {
                     e.bindReady(), A.add(a);
                     return this
                 },
                 eq: function (a) {
                     a = +a;
                     return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                 },
                 first: function () {
                     return this.eq(0)
                 },
                 last: function () {
                     return this.eq(-1)
                 },
                 slice: function () {
                     return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                 },
                 map: function (a) {
                     return this.pushStack(e.map(this, function (b, c) {
                         return a.call(b, c, b)
                     }))
                 },
                 end: function () {
                     return this.prevObject || this.constructor(null)
                 },
                 push: E,
                 sort: [].sort,
                 splice: [].splice
             }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
                 var a, c, d, f, g, h, i = arguments[0] || {},
                     j = 1,
                     k = arguments.length,
                     l = !1;
                 typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                 for (; j < k; j++) {
                     if ((a = arguments[j]) != null) {
                         for (c in a) {
                             d = i[c], f = a[c];
                             if (i === f) {
                                 continue
                             }
                             l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                         }
                     }
                 }
                 return i
             }, e.extend({
                 noConflict: function (b) {
                     a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                     return e
                 },
                 isReady: !1,
                 readyWait: 1,
                 holdReady: function (a) {
                     a ? e.readyWait++ : e.ready(!0)
                 },
                 ready: function (a) {
                     if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                         if (!c.body) {
                             return setTimeout(e.ready, 1)
                         }
                         e.isReady = !0;
                         if (a !== !0 && --e.readyWait > 0) {
                             return
                         }
                         A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                     }
                 },
                 bindReady: function () {
                     if (!A) {
                         A = e.Callbacks("once memory");
                         if (c.readyState === "complete") {
                             return setTimeout(e.ready, 1)
                         }
                         if (c.addEventListener) {
                             c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1)
                         } else {
                             if (c.attachEvent) {
                                 c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                                 var b = !1;
                                 try {
                                     b = a.frameElement == null
                                 } catch (d) {}
                                 c.documentElement.doScroll && b && J()
                             }
                         }
                     }
                 },
                 isFunction: function (a) {
                     return e.type(a) === "function"
                 },
                 isArray: Array.isArray || function (a) {
                     return e.type(a) === "array"
                 },
                 isWindow: function (a) {
                     return a != null && a == a.window
                 },
                 isNumeric: function (a) {
                     return !isNaN(parseFloat(a)) && isFinite(a)
                 },
                 type: function (a) {
                     return a == null ? String(a) : I[C.call(a)] || "object"
                 },
                 isPlainObject: function (a) {
                     if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) {
                         return !1
                     }
                     try {
                         if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) {
                             return !1
                         }
                     } catch (c) {
                         return !1
                     }
                     var d;
                     for (d in a) {}
                     return d === b || D.call(a, d)
                 },
                 isEmptyObject: function (a) {
                     for (var b in a) {
                         return !1
                     }
                     return !0
                 },
                 error: function (a) {
                     throw new Error(a)
                 },
                 parseJSON: function (b) {
                     if (typeof b != "string" || !b) {
                         return null
                     }
                     b = e.trim(b);
                     if (a.JSON && a.JSON.parse) {
                         return a.JSON.parse(b)
                     }
                     if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) {
                         return (new Function("return " + b))()
                     }
                     e.error("Invalid JSON: " + b)
                 },
                 parseXML: function (c) {
                     if (typeof c != "string" || !c) {
                         return null
                     }
                     var d, f;
                     try {
                         a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                     } catch (g) {
                         d = b
                     }(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                     return d
                 },
                 noop: function () {},
                 globalEval: function (b) {
                     b && j.test(b) && (a.execScript || function (b) {
                         a.eval.call(a, b)
                     })(b)
                 },
                 camelCase: function (a) {
                     return a.replace(w, "ms-").replace(v, x)
                 },
                 nodeName: function (a, b) {
                     return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                 },
                 each: function (a, c, d) {
                     var f, g = 0,
                         h = a.length,
                         i = h === b || e.isFunction(a);
                     if (d) {
                         if (i) {
                             for (f in a) {
                                 if (c.apply(a[f], d) === !1) {
                                     break
                                 }
                             }
                         } else {
                             for (; g < h;) {
                                 if (c.apply(a[g++], d) === !1) {
                                     break
                                 }
                             }
                         }
                     } else {
                         if (i) {
                             for (f in a) {
                                 if (c.call(a[f], f, a[f]) === !1) {
                                     break
                                 }
                             }
                         } else {
                             for (; g < h;) {
                                 if (c.call(a[g], g, a[g++]) === !1) {
                                     break
                                 }
                             }
                         }
                     }
                     return a
                 },
                 trim: G ? function (a) {
                     return a == null ? "" : G.call(a)
                 } : function (a) {
                     return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                 },
                 makeArray: function (a, b) {
                     var c = b || [];
                     if (a != null) {
                         var d = e.type(a);
                         a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                     }
                     return c
                 },
                 inArray: function (a, b, c) {
                     var d;
                     if (b) {
                         if (H) {
                             return H.call(b, a, c)
                         }
                         d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                         for (; c < d; c++) {
                             if (c in b && b[c] === a) {
                                 return c
                             }
                         }
                     }
                     return -1
                 },
                 merge: function (a, c) {
                     var d = a.length,
                         e = 0;
                     if (typeof c.length == "number") {
                         for (var f = c.length; e < f; e++) {
                             a[d++] = c[e]
                         }
                     } else {
                         while (c[e] !== b) {
                             a[d++] = c[e++]
                         }
                     }
                     a.length = d;
                     return a
                 },
                 grep: function (a, b, c) {
                     var d = [],
                         e;
                     c = !!c;
                     for (var f = 0, g = a.length; f < g; f++) {
                         e = !!b(a[f], f), c !== e && d.push(a[f])
                     }
                     return d
                 },
                 map: function (a, c, d) {
                     var f, g, h = [],
                         i = 0,
                         j = a.length,
                         k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                     if (k) {
                         for (; i < j; i++) {
                             f = c(a[i], i, d), f != null && (h[h.length] = f)
                         }
                     } else {
                         for (g in a) {
                             f = c(a[g], g, d), f != null && (h[h.length] = f)
                         }
                     }
                     return h.concat.apply([], h)
                 },
                 guid: 1,
                 proxy: function (a, c) {
                     if (typeof c == "string") {
                         var d = a[c];
                         c = a, a = d
                     }
                     if (!e.isFunction(a)) {
                         return b
                     }
                     var f = F.call(arguments, 2),
                         g = function () {
                             return a.apply(c, f.concat(F.call(arguments)))
                         };
                     g.guid = a.guid = a.guid || g.guid || e.guid++;
                     return g
                 },
                 access: function (a, c, d, f, g, h, i) {
                     var j, k = d == null,
                         l = 0,
                         m = a.length;
                     if (d && typeof d == "object") {
                         for (l in d) {
                             e.access(a, c, l, d[l], 1, h, f)
                         }
                         g = 1
                     } else {
                         if (f !== b) {
                             j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                                 return j.call(e(a), c)
                             }) : (c.call(a, f), c = null));
                             if (c) {
                                 for (; l < m; l++) {
                                     c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i)
                                 }
                             }
                             g = 1
                         }
                     }
                     return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
                 },
                 now: function () {
                     return (new Date).getTime()
                 },
                 uaMatch: function (a) {
                     a = a.toLowerCase();
                     var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                     return {
                         browser: b[1] || "",
                         version: b[2] || "0"
                     }
                 },
                 sub: function () {
                     function a(b, c) {
                         return new a.fn.init(b, c)
                     }
                     e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                         f && f instanceof e && !(f instanceof a) && (f = a(f));
                         return e.fn.init.call(this, d, f, b)
                     }, a.fn.init.prototype = a.fn;
                     var b = a(c);
                     return a
                 },
                 browser: {}
             }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                 I["[object " + b + "]"] = b.toLowerCase()
             }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
                 c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
             } : c.attachEvent && (B = function () {
                 c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
             });
             return e
         }(),
         g = {};
     f.Callbacks = function (a) {
         a = a ? g[a] || h(a) : {};
         var c = [],
             d = [],
             e, i, j, k, l, m, n = function (b) {
                 var d, e, g, h, i;
                 for (d = 0, e = b.length; d < e; d++) {
                     g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
                 }
             },
             o = function (b, f) {
                 f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
                 for (; c && m < l; m++) {
                     if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                         e = !0;
                         break
                     }
                 }
                 j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
             },
             p = {
                 add: function () {
                     if (c) {
                         var a = c.length;
                         n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                     }
                     return this
                 },
                 remove: function () {
                     if (c) {
                         var b = arguments,
                             d = 0,
                             e = b.length;
                         for (; d < e; d++) {
                             for (var f = 0; f < c.length; f++) {
                                 if (b[d] === c[f]) {
                                     j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                                     if (a.unique) {
                                         break
                                     }
                                 }
                             }
                         }
                     }
                     return this
                 },
                 has: function (a) {
                     if (c) {
                         var b = 0,
                             d = c.length;
                         for (; b < d; b++) {
                             if (a === c[b]) {
                                 return !0
                             }
                         }
                     }
                     return !1
                 },
                 empty: function () {
                     c = [];
                     return this
                 },
                 disable: function () {
                     c = d = e = b;
                     return this
                 },
                 disabled: function () {
                     return !c
                 },
                 lock: function () {
                     d = b, (!e || e === !0) && p.disable();
                     return this
                 },
                 locked: function () {
                     return !d
                 },
                 fireWith: function (b, c) {
                     d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                     return this
                 },
                 fire: function () {
                     p.fireWith(this, arguments);
                     return this
                 },
                 fired: function () {
                     return !!i
                 }
             };
         return p
     };
     var i = [].slice;
     f.extend({
         Deferred: function (a) {
             var b = f.Callbacks("once memory"),
                 c = f.Callbacks("once memory"),
                 d = f.Callbacks("memory"),
                 e = "pending",
                 g = {
                     resolve: b,
                     reject: c,
                     notify: d
                 },
                 h = {
                     done: b.add,
                     fail: c.add,
                     progress: d.add,
                     state: function () {
                         return e
                     },
                     isResolved: b.fired,
                     isRejected: c.fired,
                     then: function (a, b, c) {
                         i.done(a).fail(b).progress(c);
                         return this
                     },
                     always: function () {
                         i.done.apply(i, arguments).fail.apply(i, arguments);
                         return this
                     },
                     pipe: function (a, b, c) {
                         return f.Deferred(function (d) {
                             f.each({
                                 done: [a, "resolve"],
                                 fail: [b, "reject"],
                                 progress: [c, "notify"]
                             }, function (a, b) {
                                 var c = b[0],
                                     e = b[1],
                                     g;
                                 f.isFunction(c) ? i[a](function () {
                                     g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                 }) : i[a](d[e])
                             })
                         }).promise()
                     },
                     promise: function (a) {
                         if (a == null) {
                             a = h
                         } else {
                             for (var b in h) {
                                 a[b] = h[b]
                             }
                         }
                         return a
                     }
                 },
                 i = h.promise({}),
                 j;
             for (j in g) {
                 i[j] = g[j].fire, i[j + "With"] = g[j].fireWith
             }
             i.done(function () {
                 e = "resolved"
             }, c.disable, d.lock).fail(function () {
                 e = "rejected"
             }, b.disable, d.lock), a && a.call(i, i);
             return i
         },
         when: function (a) {
             function m(a) {
                 return function (b) {
                     e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                 }
             }

             function l(a) {
                 return function (c) {
                     b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                 }
             }
             var b = i.call(arguments, 0),
                 c = 0,
                 d = b.length,
                 e = Array(d),
                 g = d,
                 h = d,
                 j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                 k = j.promise();
             if (d > 1) {
                 for (; c < d; c++) {
                     b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g
                 }
                 g || j.resolveWith(j, b)
             } else {
                 j !== a && j.resolveWith(j, d ? [a] : [])
             }
             return k
         }
     }), f.support = function () {
         var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"),
             q = c.documentElement;
         p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
         if (!d || !d.length || !e) {
             return {}
         }
         g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
             leadingWhitespace: p.firstChild.nodeType === 3,
             tbody: !p.getElementsByTagName("tbody").length,
             htmlSerialize: !!p.getElementsByTagName("link").length,
             style: /top/.test(e.getAttribute("style")),
             hrefNormalized: e.getAttribute("href") === "/a",
             opacity: /^0.55/.test(e.style.opacity),
             cssFloat: !!e.style.cssFloat,
             checkOn: i.value === "on",
             optSelected: h.selected,
             getSetAttribute: p.className !== "t",
             enctype: !!c.createElement("form").enctype,
             html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
             submitBubbles: !0,
             changeBubbles: !0,
             focusinBubbles: !1,
             deleteExpando: !0,
             noCloneEvent: !0,
             inlineBlockNeedsLayout: !1,
             shrinkWrapBlocks: !1,
             reliableMarginRight: !0,
             pixelMargin: !0
         }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
         try {
             delete p.test
         } catch (r) {
             b.deleteExpando = !1
         }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
             b.noCloneEvent = !1
         }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
         if (p.attachEvent) {
             for (n in {
                 submit: 1,
                 change: 1,
                 focusin: 1
             }) {
                 m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o
             }
         }
         j.removeChild(p), j = g = h = p = i = null, f(function () {
             var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
             !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div><table " + n + "' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
                 marginRight: 0
             }).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                 doesNotAddBorder: g.offsetTop !== 5,
                 doesAddBorderForTableAndCells: i.offsetTop === 5
             }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
                 marginTop: 0
             }).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
         });
         return b
     }();
     var j = /^(?:\{.*\}|\[.*\])$/,
         k = /([A-Z])/g;
     f.extend({
         cache: {},
         uuid: 0,
         expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
         noData: {
             embed: !0,
             object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
             applet: !0
         },
         hasData: function (a) {
             a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
             return !!a && !m(a)
         },
         data: function (a, c, d, e) {
             if (!!f.acceptData(a)) {
                 var g, h, i, j = f.expando,
                     k = typeof c == "string",
                     l = a.nodeType,
                     m = l ? f.cache : a,
                     n = l ? a[j] : a[j] && j,
                     o = c === "events";
                 if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) {
                     return
                 }
                 n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                 if (typeof c == "object" || typeof c == "function") {
                     e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c)
                 }
                 g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                 if (o && !h[c]) {
                     return g.events
                 }
                 k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                 return i
             }
         },
         removeData: function (a, b, c) {
             if (!!f.acceptData(a)) {
                 var d, e, g, h = f.expando,
                     i = a.nodeType,
                     j = i ? f.cache : a,
                     k = i ? a[h] : h;
                 if (!j[k]) {
                     return
                 }
                 if (b) {
                     d = c ? j[k] : j[k].data;
                     if (d) {
                         f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                         for (e = 0, g = b.length; e < g; e++) {
                             delete d[b[e]]
                         }
                         if (!(c ? m : f.isEmptyObject)(d)) {
                             return
                         }
                     }
                 }
                 if (!c) {
                     delete j[k].data;
                     if (!m(j[k])) {
                         return
                     }
                 }
                 f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
             }
         },
         _data: function (a, b, c) {
             return f.data(a, b, c, !0)
         },
         acceptData: function (a) {
             if (a.nodeName) {
                 var b = f.noData[a.nodeName.toLowerCase()];
                 if (b) {
                     return b !== !0 && a.getAttribute("classid") === b
                 }
             }
             return !0
         }
     }), f.fn.extend({
         data: function (a, c) {
             var d, e, g, h, i, j = this[0],
                 k = 0,
                 m = null;
             if (a === b) {
                 if (this.length) {
                     m = f.data(j);
                     if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                         g = j.attributes;
                         for (i = g.length; k < i; k++) {
                             h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]))
                         }
                         f._data(j, "parsedAttrs", !0)
                     }
                 }
                 return m
             }
             if (typeof a == "object") {
                 return this.each(function () {
                     f.data(this, a)
                 })
             }
             d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
             return f.access(this, function (c) {
                 if (c === b) {
                     m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                     return m === b && d[1] ? this.data(d[0]) : m
                 }
                 d[1] = c, this.each(function () {
                     var b = f(this);
                     b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                 })
             }, null, c, arguments.length > 1, null, !1)
         },
         removeData: function (a) {
             return this.each(function () {
                 f.removeData(this, a)
             })
         }
     }), f.extend({
         _mark: function (a, b) {
             a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
         },
         _unmark: function (a, b, c) {
             a !== !0 && (c = b, b = a, a = !1);
             if (b) {
                 c = c || "fx";
                 var d = c + "mark",
                     e = a ? 0 : (f._data(b, d) || 1) - 1;
                 e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
             }
         },
         queue: function (a, b, c) {
             var d;
             if (a) {
                 b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                 return d || []
             }
         },
         dequeue: function (a, b) {
             b = b || "fx";
             var c = f.queue(a, b),
                 d = c.shift(),
                 e = {};
             d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                 f.dequeue(a, b)
             }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
         }
     }), f.fn.extend({
         queue: function (a, c) {
             var d = 2;
             typeof a != "string" && (c = a, a = "fx", d--);
             if (arguments.length < d) {
                 return f.queue(this[0], a)
             }
             return c === b ? this : this.each(function () {
                 var b = f.queue(this, a, c);
                 a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
             })
         },
         dequeue: function (a) {
             return this.each(function () {
                 f.dequeue(this, a)
             })
         },
         delay: function (a, b) {
             a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
             return this.queue(b, function (b, c) {
                 var d = setTimeout(b, a);
                 c.stop = function () {
                     clearTimeout(d)
                 }
             })
         },
         clearQueue: function (a) {
             return this.queue(a || "fx", [])
         },
         promise: function (a, c) {
             function m() {
                 --h || d.resolveWith(e, [e])
             }
             typeof a != "string" && (c = a, a = b), a = a || "fx";
             var d = f.Deferred(),
                 e = this,
                 g = e.length,
                 h = 1,
                 i = a + "defer",
                 j = a + "queue",
                 k = a + "mark",
                 l;
             while (g--) {
                 if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) {
                     h++, l.add(m)
                 }
             }
             m();
             return d.promise(c)
         }
     });
     var o = /[\n\t\r]/g,
         p = /\s+/,
         q = /\r/g,
         r = /^(?:button|input)$/i,
         s = /^(?:button|input|object|select|textarea)$/i,
         t = /^a(?:rea)?$/i,
         u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
         v = f.support.getSetAttribute,
         w, x, y;
     f.fn.extend({
         attr: function (a, b) {
             return f.access(this, f.attr, a, b, arguments.length > 1)
         },
         removeAttr: function (a) {
             return this.each(function () {
                 f.removeAttr(this, a)
             })
         },
         prop: function (a, b) {
             return f.access(this, f.prop, a, b, arguments.length > 1)
         },
         removeProp: function (a) {
             a = f.propFix[a] || a;
             return this.each(function () {
                 try {
                     this[a] = b, delete this[a]
                 } catch (c) {}
             })
         },
         addClass: function (a) {
             var b, c, d, e, g, h, i;
             if (f.isFunction(a)) {
                 return this.each(function (b) {
                     f(this).addClass(a.call(this, b, this.className))
                 })
             }
             if (a && typeof a == "string") {
                 b = a.split(p);
                 for (c = 0, d = this.length; c < d; c++) {
                     e = this[c];
                     if (e.nodeType === 1) {
                         if (!e.className && b.length === 1) {
                             e.className = a
                         } else {
                             g = " " + e.className + " ";
                             for (h = 0, i = b.length; h < i; h++) {~
                                 g.indexOf(" " + b[h] + " ") || (g += b[h] + " ")
                             }
                             e.className = f.trim(g)
                         }
                     }
                 }
             }
             return this
         },
         removeClass: function (a) {
             var c, d, e, g, h, i, j;
             if (f.isFunction(a)) {
                 return this.each(function (b) {
                     f(this).removeClass(a.call(this, b, this.className))
                 })
             }
             if (a && typeof a == "string" || a === b) {
                 c = (a || "").split(p);
                 for (d = 0, e = this.length; d < e; d++) {
                     g = this[d];
                     if (g.nodeType === 1 && g.className) {
                         if (a) {
                             h = (" " + g.className + " ").replace(o, " ");
                             for (i = 0, j = c.length; i < j; i++) {
                                 h = h.replace(" " + c[i] + " ", " ")
                             }
                             g.className = f.trim(h)
                         } else {
                             g.className = ""
                         }
                     }
                 }
             }
             return this
         },
         toggleClass: function (a, b) {
             var c = typeof a,
                 d = typeof b == "boolean";
             if (f.isFunction(a)) {
                 return this.each(function (c) {
                     f(this).toggleClass(a.call(this, c, this.className, b), b)
                 })
             }
             return this.each(function () {
                 if (c === "string") {
                     var e, g = 0,
                         h = f(this),
                         i = b,
                         j = a.split(p);
                     while (e = j[g++]) {
                         i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                     }
                 } else {
                     if (c === "undefined" || c === "boolean") {
                         this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
                     }
                 }
             })
         },
         hasClass: function (a) {
             var b = " " + a + " ",
                 c = 0,
                 d = this.length;
             for (; c < d; c++) {
                 if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) {
                     return !0
                 }
             }
             return !1
         },
         val: function (a) {
             var c, d, e, g = this[0];
             if (!!arguments.length) {
                 e = f.isFunction(a);
                 return this.each(function (d) {
                     var g = f(this),
                         h;
                     if (this.nodeType === 1) {
                         e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                             return a == null ? "" : a + ""
                         })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                         if (!c || !("set" in c) || c.set(this, h, "value") === b) {
                             this.value = h
                         }
                     }
                 })
             }
             if (g) {
                 c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                 if (c && "get" in c && (d = c.get(g, "value")) !== b) {
                     return d
                 }
                 d = g.value;
                 return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
             }
         }
     }), f.extend({
         valHooks: {
             option: {
                 get: function (a) {
                     var b = a.attributes.value;
                     return !b || b.specified ? a.value : a.text
                 }
             },
             select: {
                 get: function (a) {
                     var b, c, d, e, g = a.selectedIndex,
                         h = [],
                         i = a.options,
                         j = a.type === "select-one";
                     if (g < 0) {
                         return null
                     }
                     c = j ? g : 0, d = j ? g + 1 : i.length;
                     for (; c < d; c++) {
                         e = i[c];
                         if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                             b = f(e).val();
                             if (j) {
                                 return b
                             }
                             h.push(b)
                         }
                     }
                     if (j && !h.length && i.length) {
                         return f(i[g]).val()
                     }
                     return h
                 },
                 set: function (a, b) {
                     var c = f.makeArray(b);
                     f(a).find("option").each(function () {
                         this.selected = f.inArray(f(this).val(), c) >= 0
                     }), c.length || (a.selectedIndex = -1);
                     return c
                 }
             }
         },
         attrFn: {
             val: !0,
             css: !0,
             html: !0,
             text: !0,
             data: !0,
             width: !0,
             height: !0,
             offset: !0
         },
         attr: function (a, c, d, e) {
             var g, h, i, j = a.nodeType;
             if (!!a && j !== 3 && j !== 8 && j !== 2) {
                 if (e && c in f.attrFn) {
                     return f(a)[c](d)
                 }
                 if (typeof a.getAttribute == "undefined") {
                     return f.prop(a, c, d)
                 }
                 i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                 if (d !== b) {
                     if (d === null) {
                         f.removeAttr(a, c);
                         return
                     }
                     if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) {
                         return g
                     }
                     a.setAttribute(c, "" + d);
                     return d
                 }
                 if (h && "get" in h && i && (g = h.get(a, c)) !== null) {
                     return g
                 }
                 g = a.getAttribute(c);
                 return g === null ? b : g
             }
         },
         removeAttr: function (a, b) {
             var c, d, e, g, h, i = 0;
             if (b && a.nodeType === 1) {
                 d = b.toLowerCase().split(p), g = d.length;
                 for (; i < g; i++) {
                     e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
                 }
             }
         },
         attrHooks: {
             type: {
                 set: function (a, b) {
                     if (r.test(a.nodeName) && a.parentNode) {
                         f.error("type property can't be changed")
                     } else {
                         if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                             var c = a.value;
                             a.setAttribute("type", b), c && (a.value = c);
                             return b
                         }
                     }
                 }
             },
             value: {
                 get: function (a, b) {
                     if (w && f.nodeName(a, "button")) {
                         return w.get(a, b)
                     }
                     return b in a ? a.value : null
                 },
                 set: function (a, b, c) {
                     if (w && f.nodeName(a, "button")) {
                         return w.set(a, b, c)
                     }
                     a.value = b
                 }
             }
         },
         propFix: {
             tabindex: "tabIndex",
             readonly: "readOnly",
             "for": "htmlFor",
             "class": "className",
             maxlength: "maxLength",
             cellspacing: "cellSpacing",
             cellpadding: "cellPadding",
             rowspan: "rowSpan",
             colspan: "colSpan",
             usemap: "useMap",
             frameborder: "frameBorder",
             contenteditable: "contentEditable"
         },
         prop: function (a, c, d) {
             var e, g, h, i = a.nodeType;
             if (!!a && i !== 3 && i !== 8 && i !== 2) {
                 h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                 return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
             }
         },
         propHooks: {
             tabIndex: {
                 get: function (a) {
                     var c = a.getAttributeNode("tabindex");
                     return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                 }
             }
         }
     }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
         get: function (a, c) {
             var d, e = f.prop(a, c);
             return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
         },
         set: function (a, b, c) {
             var d;
             b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
             return c
         }
     }, v || (y = {
         name: !0,
         id: !0,
         coords: !0
     }, w = f.valHooks.button = {
         get: function (a, c) {
             var d;
             d = a.getAttributeNode(c);
             return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
         },
         set: function (a, b, d) {
             var e = a.getAttributeNode(d);
             e || (e = c.createAttribute(d), a.setAttributeNode(e));
             return e.nodeValue = b + ""
         }
     }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
         f.attrHooks[b] = f.extend(f.attrHooks[b], {
             set: function (a, c) {
                 if (c === "") {
                     a.setAttribute(b, "auto");
                     return c
                 }
             }
         })
     }), f.attrHooks.contenteditable = {
         get: w.get,
         set: function (a, b, c) {
             b === "" && (b = "false"), w.set(a, b, c)
         }
     }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
         f.attrHooks[c] = f.extend(f.attrHooks[c], {
             get: function (a) {
                 var d = a.getAttribute(c, 2);
                 return d === null ? b : d
             }
         })
     }), f.support.style || (f.attrHooks.style = {
         get: function (a) {
             return a.style.cssText.toLowerCase() || b
         },
         set: function (a, b) {
             return a.style.cssText = "" + b
         }
     }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
         get: function (a) {
             var b = a.parentNode;
             b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
             return null
         }
     })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
         f.valHooks[this] = {
             get: function (a) {
                 return a.getAttribute("value") === null ? "on" : a.value
             }
         }
     }), f.each(["radio", "checkbox"], function () {
         f.valHooks[this] = f.extend(f.valHooks[this], {
             set: function (a, b) {
                 if (f.isArray(b)) {
                     return a.checked = f.inArray(f(a).val(), b) >= 0
                 }
             }
         })
     });
     var z = /^(?:textarea|input|select)$/i,
         A = /^([^\.]*)?(?:\.(.+))?$/,
         B = /(?:^|\s)hover(\.\S+)?\b/,
         C = /^key/,
         D = /^(?:mouse|contextmenu)|click/,
         E = /^(?:focusinfocus|focusoutblur)$/,
         F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
         G = function (a) {
             var b = F.exec(a);
             b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
             return b
         },
         H = function (a, b) {
             var c = a.attributes || {};
             return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
         },
         I = function (a) {
             return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
         };
     f.event = {
         add: function (a, c, d, e, g) {
             var h, i, j, k, l, m, n, o, p, q, r, s;
             if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                 d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                     return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                 }, i.elem = a), c = f.trim(I(c)).split(" ");
                 for (k = 0; k < c.length; k++) {
                     l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                         type: m,
                         origType: l[1],
                         data: e,
                         handler: d,
                         guid: d.guid,
                         selector: g,
                         quick: g && G(g),
                         namespace: n.join(".")
                     }, p), r = j[m];
                     if (!r) {
                         r = j[m] = [], r.delegateCount = 0;
                         if (!s.setup || s.setup.call(a, e, n, i) === !1) {
                             a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                         }
                     }
                     s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                 }
                 a = null
             }
         },
         global: {},
         remove: function (a, b, c, d, e) {
             var g = f.hasData(a) && f._data(a),
                 h, i, j, k, l, m, n, o, p, q, r, s;
             if (!!g && !!(o = g.events)) {
                 b = f.trim(I(b || "")).split(" ");
                 for (h = 0; h < b.length; h++) {
                     i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                     if (!j) {
                         for (j in o) {
                             f.event.remove(a, j + b[h], c, d, !0)
                         }
                         continue
                     }
                     p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                     for (n = 0; n < r.length; n++) {
                         s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s))
                     }
                     r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                 }
                 f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
             }
         },
         customEvent: {
             getData: !0,
             setData: !0,
             changeData: !0
         },
         trigger: function (c, d, e, g) {
             if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                 var h = c.type || c,
                     i = [],
                     j, k, l, m, n, o, p, q, r, s;
                 if (E.test(h + f.event.triggered)) {
                     return
                 }
                 h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                 if ((!e || f.event.customEvent[h]) && !f.event.global[h]) {
                     return
                 }
                 c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                 if (!e) {
                     j = f.cache;
                     for (l in j) {
                         j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0)
                     }
                     return
                 }
                 c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                 if (p.trigger && p.trigger.apply(e, d) === !1) {
                     return
                 }
                 r = [
                     [e, p.bindType || h]
                 ];
                 if (!g && !p.noBubble && !f.isWindow(e)) {
                     s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                     for (; m; m = m.parentNode) {
                         r.push([m, s]), n = m
                     }
                     n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                 }
                 for (l = 0; l < r.length && !c.isPropagationStopped(); l++) {
                     m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault()
                 }
                 c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                 return c.result
             }
         },
         dispatch: function (c) {
             c = f.event.fix(c || a.event);
             var d = (f._data(this, "events") || {})[c.type] || [],
                 e = d.delegateCount,
                 g = [].slice.call(arguments, 0),
                 h = !c.exclusive && !c.namespace,
                 i = f.event.special[c.type] || {},
                 j = [],
                 k, l, m, n, o, p, q, r, s, t, u;
             g[0] = c, c.delegateTarget = this;
             if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                 if (e && (!c.button || c.type !== "click")) {
                     n = f(this), n.context = this.ownerDocument || this;
                     for (m = c.target; m != this; m = m.parentNode || this) {
                         if (m.disabled !== !0) {
                             p = {}, r = [], n[0] = m;
                             for (k = 0; k < e; k++) {
                                 s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s)
                             }
                             r.length && j.push({
                                 elem: m,
                                 matches: r
                             })
                         }
                     }
                 }
                 d.length > e && j.push({
                     elem: this,
                     matches: d.slice(e)
                 });
                 for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                     q = j[k], c.currentTarget = q.elem;
                     for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                         s = q.matches[l];
                         if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) {
                             c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                         }
                     }
                 }
                 i.postDispatch && i.postDispatch.call(this, c);
                 return c.result
             }
         },
         props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
         fixHooks: {},
         keyHooks: {
             props: "char charCode key keyCode".split(" "),
             filter: function (a, b) {
                 a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                 return a
             }
         },
         mouseHooks: {
             props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
             filter: function (a, d) {
                 var e, f, g, h = d.button,
                     i = d.fromElement;
                 a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                 return a
             }
         },
         fix: function (a) {
             if (a[f.expando]) {
                 return a
             }
             var d, e, g = a,
                 h = f.event.fixHooks[a.type] || {},
                 i = h.props ? this.props.concat(h.props) : this.props;
             a = f.Event(g);
             for (d = i.length; d;) {
                 e = i[--d], a[e] = g[e]
             }
             a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
             return h.filter ? h.filter(a, g) : a
         },
         special: {
             ready: {
                 setup: f.bindReady
             },
             load: {
                 noBubble: !0
             },
             focus: {
                 delegateType: "focusin"
             },
             blur: {
                 delegateType: "focusout"
             },
             beforeunload: {
                 setup: function (a, b, c) {
                     f.isWindow(this) && (this.onbeforeunload = c)
                 },
                 teardown: function (a, b) {
                     this.onbeforeunload === b && (this.onbeforeunload = null)
                 }
             }
         },
         simulate: function (a, b, c, d) {
             var e = f.extend(new f.Event, c, {
                 type: a,
                 isSimulated: !0,
                 originalEvent: {}
             });
             d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
         }
     }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
         a.removeEventListener && a.removeEventListener(b, c, !1)
     } : function (a, b, c) {
         a.detachEvent && a.detachEvent("on" + b, c)
     }, f.Event = function (a, b) {
         if (!(this instanceof f.Event)) {
             return new f.Event(a, b)
         }
         a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
     }, f.Event.prototype = {
         preventDefault: function () {
             this.isDefaultPrevented = K;
             var a = this.originalEvent;
             !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
         },
         stopPropagation: function () {
             this.isPropagationStopped = K;
             var a = this.originalEvent;
             !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
         },
         stopImmediatePropagation: function () {
             this.isImmediatePropagationStopped = K, this.stopPropagation()
         },
         isDefaultPrevented: J,
         isPropagationStopped: J,
         isImmediatePropagationStopped: J
     }, f.each({
         mouseenter: "mouseover",
         mouseleave: "mouseout"
     }, function (a, b) {
         f.event.special[a] = {
             delegateType: b,
             bindType: b,
             handle: function (a) {
                 var c = this,
                     d = a.relatedTarget,
                     e = a.handleObj,
                     g = e.selector,
                     h;
                 if (!d || d !== c && !f.contains(c, d)) {
                     a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b
                 }
                 return h
             }
         }
     }), f.support.submitBubbles || (f.event.special.submit = {
         setup: function () {
             if (f.nodeName(this, "form")) {
                 return !1
             }
             f.event.add(this, "click._submit keypress._submit", function (a) {
                 var c = a.target,
                     d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                 d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                     a._submit_bubble = !0
                 }), d._submit_attached = !0)
             })
         },
         postDispatch: function (a) {
             a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
         },
         teardown: function () {
             if (f.nodeName(this, "form")) {
                 return !1
             }
             f.event.remove(this, "._submit")
         }
     }), f.support.changeBubbles || (f.event.special.change = {
         setup: function () {
             if (z.test(this.nodeName)) {
                 if (this.type === "checkbox" || this.type === "radio") {
                     f.event.add(this, "propertychange._change", function (a) {
                         a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                     }), f.event.add(this, "click._change", function (a) {
                         this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                     })
                 }
                 return !1
             }
             f.event.add(this, "beforeactivate._change", function (a) {
                 var b = a.target;
                 z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                     this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                 }), b._change_attached = !0)
             })
         },
         handle: function (a) {
             var b = a.target;
             if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
                 return a.handleObj.handler.apply(this, arguments)
             }
         },
         teardown: function () {
             f.event.remove(this, "._change");
             return z.test(this.nodeName)
         }
     }), f.support.focusinBubbles || f.each({
         focus: "focusin",
         blur: "focusout"
     }, function (a, b) {
         var d = 0,
             e = function (a) {
                 f.event.simulate(b, a.target, f.event.fix(a), !0)
             };
         f.event.special[b] = {
             setup: function () {
                 d++ === 0 && c.addEventListener(a, e, !0)
             },
             teardown: function () {
                 --d === 0 && c.removeEventListener(a, e, !0)
             }
         }
     }), f.fn.extend({
         on: function (a, c, d, e, g) {
             var h, i;
             if (typeof a == "object") {
                 typeof c != "string" && (d = d || c, c = b);
                 for (i in a) {
                     this.on(i, c, d, a[i], g)
                 }
                 return this
             }
             d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
             if (e === !1) {
                 e = J
             } else {
                 if (!e) {
                     return this
                 }
             }
             g === 1 && (h = e, e = function (a) {
                 f().off(a);
                 return h.apply(this, arguments)
             }, e.guid = h.guid || (h.guid = f.guid++));
             return this.each(function () {
                 f.event.add(this, a, e, d, c)
             })
         },
         one: function (a, b, c, d) {
             return this.on(a, b, c, d, 1)
         },
         off: function (a, c, d) {
             if (a && a.preventDefault && a.handleObj) {
                 var e = a.handleObj;
                 f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                 return this
             }
             if (typeof a == "object") {
                 for (var g in a) {
                     this.off(g, c, a[g])
                 }
                 return this
             }
             if (c === !1 || typeof c == "function") {
                 d = c, c = b
             }
             d === !1 && (d = J);
             return this.each(function () {
                 f.event.remove(this, a, d, c)
             })
         },
         bind: function (a, b, c) {
             return this.on(a, null, b, c)
         },
         unbind: function (a, b) {
             return this.off(a, null, b)
         },
         live: function (a, b, c) {
             f(this.context).on(a, this.selector, b, c);
             return this
         },
         die: function (a, b) {
             f(this.context).off(a, this.selector || "**", b);
             return this
         },
         delegate: function (a, b, c, d) {
             return this.on(b, a, c, d)
         },
         undelegate: function (a, b, c) {
             return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
         },
         trigger: function (a, b) {
             return this.each(function () {
                 f.event.trigger(a, b, this)
             })
         },
         triggerHandler: function (a, b) {
             if (this[0]) {
                 return f.event.trigger(a, b, this[0], !0)
             }
         },
         toggle: function (a) {
             var b = arguments,
                 c = a.guid || f.guid++,
                 d = 0,
                 e = function (c) {
                     var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                     f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                     return b[e].apply(this, arguments) || !1
                 };
             e.guid = c;
             while (d < b.length) {
                 b[d++].guid = c
             }
             return this.click(e)
         },
         hover: function (a, b) {
             return this.mouseenter(a).mouseleave(b || a)
         }
     }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
         f.fn[b] = function (a, c) {
             c == null && (c = a, a = null);
             return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
         }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
     }),
     function () {
         function x(a, b, c, e, f, g) {
             for (var h = 0, i = e.length; h < i; h++) {
                 var j = e[h];
                 if (j) {
                     var k = !1;
                     j = j[a];
                     while (j) {
                         if (j[d] === c) {
                             k = e[j.sizset];
                             break
                         }
                         if (j.nodeType === 1) {
                             g || (j[d] = c, j.sizset = h);
                             if (typeof b != "string") {
                                 if (j === b) {
                                     k = !0;
                                     break
                                 }
                             } else {
                                 if (m.filter(b, [j]).length > 0) {
                                     k = j;
                                     break
                                 }
                             }
                         }
                         j = j[a]
                     }
                     e[h] = k
                 }
             }
         }

         function w(a, b, c, e, f, g) {
             for (var h = 0, i = e.length; h < i; h++) {
                 var j = e[h];
                 if (j) {
                     var k = !1;
                     j = j[a];
                     while (j) {
                         if (j[d] === c) {
                             k = e[j.sizset];
                             break
                         }
                         j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                         if (j.nodeName.toLowerCase() === b) {
                             k = j;
                             break
                         }
                         j = j[a]
                     }
                     e[h] = k
                 }
             }
         }
         var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
             d = "sizcache" + (Math.random() + "").replace(".", ""),
             e = 0,
             g = Object.prototype.toString,
             h = !1,
             i = !0,
             j = /\\/g,
             k = /\r\n/g,
             l = /\W/;
         [0, 0].sort(function () {
             i = !1;
             return 0
         });
         var m = function (b, d, e, f) {
             e = e || [], d = d || c;
             var h = d;
             if (d.nodeType !== 1 && d.nodeType !== 9) {
                 return []
             }
             if (!b || typeof b != "string") {
                 return e
             }
             var i, j, k, l, n, q, r, t, u = !0,
                 v = m.isXML(d),
                 w = [],
                 x = b;
             do {
                 a.exec(""), i = a.exec(x);
                 if (i) {
                     x = i[3], w.push(i[1]);
                     if (i[2]) {
                         l = i[3];
                         break
                     }
                 }
             } while (i);
             if (w.length > 1 && p.exec(b)) {
                 if (w.length === 2 && o.relative[w[0]]) {
                     j = y(w[0] + w[1], d, f)
                 } else {
                     j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                     while (w.length) {
                         b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                     }
                 }
             } else {
                 !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                 if (d) {
                     n = f ? {
                         expr: w.pop(),
                         set: s(f)
                     } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                     while (w.length) {
                         q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                     }
                 } else {
                     k = w = []
                 }
             }
             k || (k = j), k || m.error(q || b);
             if (g.call(k) === "[object Array]") {
                 if (!u) {
                     e.push.apply(e, k)
                 } else {
                     if (d && d.nodeType === 1) {
                         for (t = 0; k[t] != null; t++) {
                             k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t])
                         }
                     } else {
                         for (t = 0; k[t] != null; t++) {
                             k[t] && k[t].nodeType === 1 && e.push(j[t])
                         }
                     }
                 }
             } else {
                 s(k, e)
             }
             l && (m(l, h, e, f), m.uniqueSort(e));
             return e
         };
         m.uniqueSort = function (a) {
             if (u) {
                 h = i, a.sort(u);
                 if (h) {
                     for (var b = 1; b < a.length; b++) {
                         a[b] === a[b - 1] && a.splice(b--, 1)
                     }
                 }
             }
             return a
         }, m.matches = function (a, b) {
             return m(a, null, null, b)
         }, m.matchesSelector = function (a, b) {
             return m(b, null, null, [a]).length > 0
         }, m.find = function (a, b, c) {
             var d, e, f, g, h, i;
             if (!a) {
                 return []
             }
             for (e = 0, f = o.order.length; e < f; e++) {
                 h = o.order[e];
                 if (g = o.leftMatch[h].exec(a)) {
                     i = g[1], g.splice(1, 1);
                     if (i.substr(i.length - 1) !== "\\") {
                         g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                         if (d != null) {
                             a = a.replace(o.match[h], "");
                             break
                         }
                     }
                 }
             }
             d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
             return {
                 set: d,
                 expr: a
             }
         }, m.filter = function (a, c, d, e) {
             var f, g, h, i, j, k, l, n, p, q = a,
                 r = [],
                 s = c,
                 t = c && c[0] && m.isXML(c[0]);
             while (a && c.length) {
                 for (h in o.filter) {
                     if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                         k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                         if (l.substr(l.length - 1) === "\\") {
                             continue
                         }
                         s === r && (r = []);
                         if (o.preFilter[h]) {
                             f = o.preFilter[h](f, s, d, r, e, t);
                             if (!f) {
                                 g = i = !0
                             } else {
                                 if (f === !0) {
                                     continue
                                 }
                             }
                         }
                         if (f) {
                             for (n = 0;
                                 (j = s[n]) != null; n++) {
                                 j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0))
                             }
                         }
                         if (i !== b) {
                             d || (s = r), a = a.replace(o.match[h], "");
                             if (!g) {
                                 return []
                             }
                             break
                         }
                     }
                 }
                 if (a === q) {
                     if (g == null) {
                         m.error(a)
                     } else {
                         break
                     }
                 }
                 q = a
             }
             return s
         }, m.error = function (a) {
             throw new Error("Syntax error, unrecognized expression: " + a)
         };
         var n = m.getText = function (a) {
                 var b, c, d = a.nodeType,
                     e = "";
                 if (d) {
                     if (d === 1 || d === 9 || d === 11) {
                         if (typeof a.textContent == "string") {
                             return a.textContent
                         }
                         if (typeof a.innerText == "string") {
                             return a.innerText.replace(k, "")
                         }
                         for (a = a.firstChild; a; a = a.nextSibling) {
                             e += n(a)
                         }
                     } else {
                         if (d === 3 || d === 4) {
                             return a.nodeValue
                         }
                     }
                 } else {
                     for (b = 0; c = a[b]; b++) {
                         c.nodeType !== 8 && (e += n(c))
                     }
                 }
                 return e
             },
             o = m.selectors = {
                 order: ["ID", "NAME", "TAG"],
                 match: {
                     ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                     CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                     NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                     ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                     TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                     CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                     POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                     PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                 },
                 leftMatch: {},
                 attrMap: {
                     "class": "className",
                     "for": "htmlFor"
                 },
                 attrHandle: {
                     href: function (a) {
                         return a.getAttribute("href")
                     },
                     type: function (a) {
                         return a.getAttribute("type")
                     }
                 },
                 relative: {
                     "+": function (a, b) {
                         var c = typeof b == "string",
                             d = c && !l.test(b),
                             e = c && !d;
                         d && (b = b.toLowerCase());
                         for (var f = 0, g = a.length, h; f < g; f++) {
                             if (h = a[f]) {
                                 while ((h = h.previousSibling) && h.nodeType !== 1) {}
                                 a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                             }
                         }
                         e && m.filter(b, a, !0)
                     },
                     ">": function (a, b) {
                         var c, d = typeof b == "string",
                             e = 0,
                             f = a.length;
                         if (d && !l.test(b)) {
                             b = b.toLowerCase();
                             for (; e < f; e++) {
                                 c = a[e];
                                 if (c) {
                                     var g = c.parentNode;
                                     a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                 }
                             }
                         } else {
                             for (; e < f; e++) {
                                 c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b)
                             }
                             d && m.filter(b, a, !0)
                         }
                     },
                     "": function (a, b, c) {
                         var d, f = e++,
                             g = x;
                         typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                     },
                     "~": function (a, b, c) {
                         var d, f = e++,
                             g = x;
                         typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                     }
                 },
                 find: {
                     ID: function (a, b, c) {
                         if (typeof b.getElementById != "undefined" && !c) {
                             var d = b.getElementById(a[1]);
                             return d && d.parentNode ? [d] : []
                         }
                     },
                     NAME: function (a, b) {
                         if (typeof b.getElementsByName != "undefined") {
                             var c = [],
                                 d = b.getElementsByName(a[1]);
                             for (var e = 0, f = d.length; e < f; e++) {
                                 d[e].getAttribute("name") === a[1] && c.push(d[e])
                             }
                             return c.length === 0 ? null : c
                         }
                     },
                     TAG: function (a, b) {
                         if (typeof b.getElementsByTagName != "undefined") {
                             return b.getElementsByTagName(a[1])
                         }
                     }
                 },
                 preFilter: {
                     CLASS: function (a, b, c, d, e, f) {
                         a = " " + a[1].replace(j, "") + " ";
                         if (f) {
                             return a
                         }
                         for (var g = 0, h;
                             (h = b[g]) != null; g++) {
                             h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1))
                         }
                         return !1
                     },
                     ID: function (a) {
                         return a[1].replace(j, "")
                     },
                     TAG: function (a, b) {
                         return a[1].replace(j, "").toLowerCase()
                     },
                     CHILD: function (a) {
                         if (a[1] === "nth") {
                             a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                             var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                             a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                         } else {
                             a[2] && m.error(a[0])
                         }
                         a[0] = e++;
                         return a
                     },
                     ATTR: function (a, b, c, d, e, f) {
                         var g = a[1] = a[1].replace(j, "");
                         !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                         return a
                     },
                     PSEUDO: function (b, c, d, e, f) {
                         if (b[1] === "not") {
                             if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) {
                                 b[3] = m(b[3], null, null, c)
                             } else {
                                 var g = m.filter(b[3], c, d, !0 ^ f);
                                 d || e.push.apply(e, g);
                                 return !1
                             }
                         } else {
                             if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) {
                                 return !0
                             }
                         }
                         return b
                     },
                     POS: function (a) {
                         a.unshift(!0);
                         return a
                     }
                 },
                 filters: {
                     enabled: function (a) {
                         return a.disabled === !1 && a.type !== "hidden"
                     },
                     disabled: function (a) {
                         return a.disabled === !0
                     },
                     checked: function (a) {
                         return a.checked === !0
                     },
                     selected: function (a) {
                         a.parentNode && a.parentNode.selectedIndex;
                         return a.selected === !0
                     },
                     parent: function (a) {
                         return !!a.firstChild
                     },
                     empty: function (a) {
                         return !a.firstChild
                     },
                     has: function (a, b, c) {
                         return !!m(c[3], a).length
                     },
                     header: function (a) {
                         return /h\d/i.test(a.nodeName)
                     },
                     text: function (a) {
                         var b = a.getAttribute("type"),
                             c = a.type;
                         return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                     },
                     radio: function (a) {
                         return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                     },
                     checkbox: function (a) {
                         return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                     },
                     file: function (a) {
                         return a.nodeName.toLowerCase() === "input" && "file" === a.type
                     },
                     password: function (a) {
                         return a.nodeName.toLowerCase() === "input" && "password" === a.type
                     },
                     submit: function (a) {
                         var b = a.nodeName.toLowerCase();
                         return (b === "input" || b === "button") && "submit" === a.type
                     },
                     image: function (a) {
                         return a.nodeName.toLowerCase() === "input" && "image" === a.type
                     },
                     reset: function (a) {
                         var b = a.nodeName.toLowerCase();
                         return (b === "input" || b === "button") && "reset" === a.type
                     },
                     button: function (a) {
                         var b = a.nodeName.toLowerCase();
                         return b === "input" && "button" === a.type || b === "button"
                     },
                     input: function (a) {
                         return /input|select|textarea|button/i.test(a.nodeName)
                     },
                     focus: function (a) {
                         return a === a.ownerDocument.activeElement
                     }
                 },
                 setFilters: {
                     first: function (a, b) {
                         return b === 0
                     },
                     last: function (a, b, c, d) {
                         return b === d.length - 1
                     },
                     even: function (a, b) {
                         return b % 2 === 0
                     },
                     odd: function (a, b) {
                         return b % 2 === 1
                     },
                     lt: function (a, b, c) {
                         return b < c[3] - 0
                     },
                     gt: function (a, b, c) {
                         return b > c[3] - 0
                     },
                     nth: function (a, b, c) {
                         return c[3] - 0 === b
                     },
                     eq: function (a, b, c) {
                         return c[3] - 0 === b
                     }
                 },
                 filter: {
                     PSEUDO: function (a, b, c, d) {
                         var e = b[1],
                             f = o.filters[e];
                         if (f) {
                             return f(a, c, b, d)
                         }
                         if (e === "contains") {
                             return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0
                         }
                         if (e === "not") {
                             var g = b[3];
                             for (var h = 0, i = g.length; h < i; h++) {
                                 if (g[h] === a) {
                                     return !1
                                 }
                             }
                             return !0
                         }
                         m.error(e)
                     },
                     CHILD: function (a, b) {
                         var c, e, f, g, h, i, j, k = b[1],
                             l = a;
                         switch (k) {
                         case "only":
                         case "first":
                             while (l = l.previousSibling) {
                                 if (l.nodeType === 1) {
                                     return !1
                                 }
                             }
                             if (k === "first") {
                                 return !0
                             }
                             l = a;
                         case "last":
                             while (l = l.nextSibling) {
                                 if (l.nodeType === 1) {
                                     return !1
                                 }
                             }
                             return !0;
                         case "nth":
                             c = b[2], e = b[3];
                             if (c === 1 && e === 0) {
                                 return !0
                             }
                             f = b[0], g = a.parentNode;
                             if (g && (g[d] !== f || !a.nodeIndex)) {
                                 i = 0;
                                 for (l = g.firstChild; l; l = l.nextSibling) {
                                     l.nodeType === 1 && (l.nodeIndex = ++i)
                                 }
                                 g[d] = f
                             }
                             j = a.nodeIndex - e;
                             return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                         }
                     },
                     ID: function (a, b) {
                         return a.nodeType === 1 && a.getAttribute("id") === b
                     },
                     TAG: function (a, b) {
                         return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                     },
                     CLASS: function (a, b) {
                         return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                     },
                     ATTR: function (a, b) {
                         var c = b[1],
                             d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                             e = d + "",
                             f = b[2],
                             g = b[4];
                         return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                     },
                     POS: function (a, b, c, d) {
                         var e = b[2],
                             f = o.setFilters[e];
                         if (f) {
                             return f(a, c, b, d)
                         }
                     }
                 }
             },
             p = o.match.POS,
             q = function (a, b) {
                 return "\\" + (b - 0 + 1)
             };
         for (var r in o.match) {
             o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q))
         }
         o.match.globalPOS = p;
         var s = function (a, b) {
             a = Array.prototype.slice.call(a, 0);
             if (b) {
                 b.push.apply(b, a);
                 return b
             }
             return a
         };
         try {
             Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
         } catch (t) {
             s = function (a, b) {
                 var c = 0,
                     d = b || [];
                 if (g.call(a) === "[object Array]") {
                     Array.prototype.push.apply(d, a)
                 } else {
                     if (typeof a.length == "number") {
                         for (var e = a.length; c < e; c++) {
                             d.push(a[c])
                         }
                     } else {
                         for (; a[c]; c++) {
                             d.push(a[c])
                         }
                     }
                 }
                 return d
             }
         }
         var u, v;
         c.documentElement.compareDocumentPosition ? u = function (a, b) {
             if (a === b) {
                 h = !0;
                 return 0
             }
             if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                 return a.compareDocumentPosition ? -1 : 1
             }
             return a.compareDocumentPosition(b) & 4 ? -1 : 1
         } : (u = function (a, b) {
             if (a === b) {
                 h = !0;
                 return 0
             }
             if (a.sourceIndex && b.sourceIndex) {
                 return a.sourceIndex - b.sourceIndex
             }
             var c, d, e = [],
                 f = [],
                 g = a.parentNode,
                 i = b.parentNode,
                 j = g;
             if (g === i) {
                 return v(a, b)
             }
             if (!g) {
                 return -1
             }
             if (!i) {
                 return 1
             }
             while (j) {
                 e.unshift(j), j = j.parentNode
             }
             j = i;
             while (j) {
                 f.unshift(j), j = j.parentNode
             }
             c = e.length, d = f.length;
             for (var k = 0; k < c && k < d; k++) {
                 if (e[k] !== f[k]) {
                     return v(e[k], f[k])
                 }
             }
             return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
         }, v = function (a, b, c) {
             if (a === b) {
                 return c
             }
             var d = a.nextSibling;
             while (d) {
                 if (d === b) {
                     return -1
                 }
                 d = d.nextSibling
             }
             return 1
         }),
         function () {
             var a = c.createElement("div"),
                 d = "script" + (new Date).getTime(),
                 e = c.documentElement;
             a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                 if (typeof c.getElementById != "undefined" && !d) {
                     var e = c.getElementById(a[1]);
                     return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                 }
             }, o.filter.ID = function (a, b) {
                 var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                 return a.nodeType === 1 && c && c.nodeValue === b
             }), e.removeChild(a), e = a = null
         }(),
         function () {
             var a = c.createElement("div");
             a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                 var c = b.getElementsByTagName(a[1]);
                 if (a[1] === "*") {
                     var d = [];
                     for (var e = 0; c[e]; e++) {
                         c[e].nodeType === 1 && d.push(c[e])
                     }
                     c = d
                 }
                 return c
             }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                 return a.getAttribute("href", 2)
             }), a = null
         }(), c.querySelectorAll && function () {
             var a = m,
                 b = c.createElement("div"),
                 d = "__sizzle__";
             b.innerHTML = "<p class='TEST'></p>";
             if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                 m = function (b, e, f, g) {
                     e = e || c;
                     if (!g && !m.isXML(e)) {
                         var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                         if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                             if (h[1]) {
                                 return s(e.getElementsByTagName(b), f)
                             }
                             if (h[2] && o.find.CLASS && e.getElementsByClassName) {
                                 return s(e.getElementsByClassName(h[2]), f)
                             }
                         }
                         if (e.nodeType === 9) {
                             if (b === "body" && e.body) {
                                 return s([e.body], f)
                             }
                             if (h && h[3]) {
                                 var i = e.getElementById(h[3]);
                                 if (!i || !i.parentNode) {
                                     return s([], f)
                                 }
                                 if (i.id === h[3]) {
                                     return s([i], f)
                                 }
                             }
                             try {
                                 return s(e.querySelectorAll(b), f)
                             } catch (j) {}
                         } else {
                             if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                 var k = e,
                                     l = e.getAttribute("id"),
                                     n = l || d,
                                     p = e.parentNode,
                                     q = /^\s*[+~]/.test(b);
                                 l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                 try {
                                     if (!q || p) {
                                         return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                     }
                                 } catch (r) {} finally {
                                     l || k.removeAttribute("id")
                                 }
                             }
                         }
                     }
                     return a(b, e, f, g)
                 };
                 for (var e in a) {
                     m[e] = a[e]
                 }
                 b = null
             }
         }(),
         function () {
             var a = c.documentElement,
                 b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
             if (b) {
                 var d = !b.call(c.createElement("div"), "div"),
                     e = !1;
                 try {
                     b.call(c.documentElement, "[test!='']:sizzle")
                 } catch (f) {
                     e = !0
                 }
                 m.matchesSelector = function (a, c) {
                     c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                     if (!m.isXML(a)) {
                         try {
                             if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                 var f = b.call(a, c);
                                 if (f || !d || a.document && a.document.nodeType !== 11) {
                                     return f
                                 }
                             }
                         } catch (g) {}
                     }
                     return m(c, null, null, [a]).length > 0
                 }
             }
         }(),
         function () {
             var a = c.createElement("div");
             a.innerHTML = "<div class='test e'></div><div class='test'></div>";
             if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                 a.lastChild.className = "e";
                 if (a.getElementsByClassName("e").length === 1) {
                     return
                 }
                 o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                     if (typeof b.getElementsByClassName != "undefined" && !c) {
                         return b.getElementsByClassName(a[1])
                     }
                 }, a = null
             }
         }(), c.documentElement.contains ? m.contains = function (a, b) {
             return a !== b && (a.contains ? a.contains(b) : !0)
         } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
             return !!(a.compareDocumentPosition(b) & 16)
         } : m.contains = function () {
             return !1
         }, m.isXML = function (a) {
             var b = (a ? a.ownerDocument || a : 0).documentElement;
             return b ? b.nodeName !== "HTML" : !1
         };
         var y = function (a, b, c) {
             var d, e = [],
                 f = "",
                 g = b.nodeType ? [b] : b;
             while (d = o.match.PSEUDO.exec(a)) {
                 f += d[0], a = a.replace(o.match.PSEUDO, "")
             }
             a = o.relative[a] ? a + "*" : a;
             for (var h = 0, i = g.length; h < i; h++) {
                 m(a, g[h], e, c)
             }
             return m.filter(f, e)
         };
         m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
     }();
     var L = /Until$/,
         M = /^(?:parents|prevUntil|prevAll)/,
         N = /,/,
         O = /^.[^:#\[\.,]*$/,
         P = Array.prototype.slice,
         Q = f.expr.match.globalPOS,
         R = {
             children: !0,
             contents: !0,
             next: !0,
             prev: !0
         };
     f.fn.extend({
         find: function (a) {
             var b = this,
                 c, d;
             if (typeof a != "string") {
                 return f(a).filter(function () {
                     for (c = 0, d = b.length; c < d; c++) {
                         if (f.contains(b[c], this)) {
                             return !0
                         }
                     }
                 })
             }
             var e = this.pushStack("", "find", a),
                 g, h, i;
             for (c = 0, d = this.length; c < d; c++) {
                 g = e.length, f.find(a, this[c], e);
                 if (c > 0) {
                     for (h = g; h < e.length; h++) {
                         for (i = 0; i < g; i++) {
                             if (e[i] === e[h]) {
                                 e.splice(h--, 1);
                                 break
                             }
                         }
                     }
                 }
             }
             return e
         },
         has: function (a) {
             var b = f(a);
             return this.filter(function () {
                 for (var a = 0, c = b.length; a < c; a++) {
                     if (f.contains(this, b[a])) {
                         return !0
                     }
                 }
             })
         },
         not: function (a) {
             return this.pushStack(T(this, a, !1), "not", a)
         },
         filter: function (a) {
             return this.pushStack(T(this, a, !0), "filter", a)
         },
         is: function (a) {
             return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
         },
         closest: function (a, b) {
             var c = [],
                 d, e, g = this[0];
             if (f.isArray(a)) {
                 var h = 1;
                 while (g && g.ownerDocument && g !== b) {
                     for (d = 0; d < a.length; d++) {
                         f(g).is(a[d]) && c.push({
                             selector: a[d],
                             elem: g,
                             level: h
                         })
                     }
                     g = g.parentNode, h++
                 }
                 return c
             }
             var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
             for (d = 0, e = this.length; d < e; d++) {
                 g = this[d];
                 while (g) {
                     if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                         c.push(g);
                         break
                     }
                     g = g.parentNode;
                     if (!g || !g.ownerDocument || g === b || g.nodeType === 11) {
                         break
                     }
                 }
             }
             c = c.length > 1 ? f.unique(c) : c;
             return this.pushStack(c, "closest", a)
         },
         index: function (a) {
             if (!a) {
                 return this[0] && this[0].parentNode ? this.prevAll().length : -1
             }
             if (typeof a == "string") {
                 return f.inArray(this[0], f(a))
             }
             return f.inArray(a.jquery ? a[0] : a, this)
         },
         add: function (a, b) {
             var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                 d = f.merge(this.get(), c);
             return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
         },
         andSelf: function () {
             return this.add(this.prevObject)
         }
     }), f.each({
         parent: function (a) {
             var b = a.parentNode;
             return b && b.nodeType !== 11 ? b : null
         },
         parents: function (a) {
             return f.dir(a, "parentNode")
         },
         parentsUntil: function (a, b, c) {
             return f.dir(a, "parentNode", c)
         },
         next: function (a) {
             return f.nth(a, 2, "nextSibling")
         },
         prev: function (a) {
             return f.nth(a, 2, "previousSibling")
         },
         nextAll: function (a) {
             return f.dir(a, "nextSibling")
         },
         prevAll: function (a) {
             return f.dir(a, "previousSibling")
         },
         nextUntil: function (a, b, c) {
             return f.dir(a, "nextSibling", c)
         },
         prevUntil: function (a, b, c) {
             return f.dir(a, "previousSibling", c)
         },
         siblings: function (a) {
             return f.sibling((a.parentNode || {}).firstChild, a)
         },
         children: function (a) {
             return f.sibling(a.firstChild)
         },
         contents: function (a) {
             return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
         }
     }, function (a, b) {
         f.fn[a] = function (c, d) {
             var e = f.map(this, b, c);
             L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
             return this.pushStack(e, a, P.call(arguments).join(","))
         }
     }), f.extend({
         filter: function (a, b, c) {
             c && (a = ":not(" + a + ")");
             return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
         },
         dir: function (a, c, d) {
             var e = [],
                 g = a[c];
             while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {
                 g.nodeType === 1 && e.push(g), g = g[c]
             }
             return e
         },
         nth: function (a, b, c, d) {
             b = b || 1;
             var e = 0;
             for (; a; a = a[c]) {
                 if (a.nodeType === 1 && ++e === b) {
                     break
                 }
             }
             return a
         },
         sibling: function (a, b) {
             var c = [];
             for (; a; a = a.nextSibling) {
                 a.nodeType === 1 && a !== b && c.push(a)
             }
             return c
         }
     });
     var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
         W = / jQuery\d+="(?:\d+|null)"/g,
         X = /^\s+/,
         Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
         Z = /<([\w:]+)/,
         $ = /<tbody/i,
         _ = /<|&#?\w+;/,
         ba = /<(?:script|style)/i,
         bb = /<(?:script|object|embed|option|style)/i,
         bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
         bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
         be = /\/(java|ecma)script/i,
         bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
         bg = {
             option: [1, "<select multiple='multiple'>", "</select>"],
             legend: [1, "<fieldset>", "</fieldset>"],
             thead: [1, "<table>", "</table>"],
             tr: [2, "<table><tbody>", "</tbody></table>"],
             td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
             col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
             area: [1, "<map>", "</map>"],
             _default: [0, "", ""]
         },
         bh = U(c);
     bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
         text: function (a) {
             return f.access(this, function (a) {
                 return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
             }, null, a, arguments.length)
         },
         wrapAll: function (a) {
             if (f.isFunction(a)) {
                 return this.each(function (b) {
                     f(this).wrapAll(a.call(this, b))
                 })
             }
             if (this[0]) {
                 var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                 this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                     var a = this;
                     while (a.firstChild && a.firstChild.nodeType === 1) {
                         a = a.firstChild
                     }
                     return a
                 }).append(this)
             }
             return this
         },
         wrapInner: function (a) {
             if (f.isFunction(a)) {
                 return this.each(function (b) {
                     f(this).wrapInner(a.call(this, b))
                 })
             }
             return this.each(function () {
                 var b = f(this),
                     c = b.contents();
                 c.length ? c.wrapAll(a) : b.append(a)
             })
         },
         wrap: function (a) {
             var b = f.isFunction(a);
             return this.each(function (c) {
                 f(this).wrapAll(b ? a.call(this, c) : a)
             })
         },
         unwrap: function () {
             return this.parent().each(function () {
                 f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
             }).end()
         },
         append: function () {
             return this.domManip(arguments, !0, function (a) {
                 this.nodeType === 1 && this.appendChild(a)
             })
         },
         prepend: function () {
             return this.domManip(arguments, !0, function (a) {
                 this.nodeType === 1 && this.insertBefore(a, this.firstChild)
             })
         },
         before: function () {
             if (this[0] && this[0].parentNode) {
                 return this.domManip(arguments, !1, function (a) {
                     this.parentNode.insertBefore(a, this)
                 })
             }
             if (arguments.length) {
                 var a = f.clean(arguments);
                 a.push.apply(a, this.toArray());
                 return this.pushStack(a, "before", arguments)
             }
         },
         after: function () {
             if (this[0] && this[0].parentNode) {
                 return this.domManip(arguments, !1, function (a) {
                     this.parentNode.insertBefore(a, this.nextSibling)
                 })
             }
             if (arguments.length) {
                 var a = this.pushStack(this, "after", arguments);
                 a.push.apply(a, f.clean(arguments));
                 return a
             }
         },
         remove: function (a, b) {
             for (var c = 0, d;
                 (d = this[c]) != null; c++) {
                 if (!a || f.filter(a, [d]).length) {
                     !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d)
                 }
             }
             return this
         },
         empty: function () {
             for (var a = 0, b;
                 (b = this[a]) != null; a++) {
                 b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                 while (b.firstChild) {
                     b.removeChild(b.firstChild)
                 }
             }
             return this
         },
         clone: function (a, b) {
             a = a == null ? !1 : a, b = b == null ? a : b;
             return this.map(function () {
                 return f.clone(this, a, b)
             })
         },
         html: function (a) {
             return f.access(this, function (a) {
                 var c = this[0] || {},
                     d = 0,
                     e = this.length;
                 if (a === b) {
                     return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null
                 }
                 if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                     a = a.replace(Y, "<$1></$2>");
                     try {
                         for (; d < e; d++) {
                             c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a)
                         }
                         c = 0
                     } catch (g) {}
                 }
                 c && this.empty().append(a)
             }, null, a, arguments.length)
         },
         replaceWith: function (a) {
             if (this[0] && this[0].parentNode) {
                 if (f.isFunction(a)) {
                     return this.each(function (b) {
                         var c = f(this),
                             d = c.html();
                         c.replaceWith(a.call(this, b, d))
                     })
                 }
                 typeof a != "string" && (a = f(a).detach());
                 return this.each(function () {
                     var b = this.nextSibling,
                         c = this.parentNode;
                     f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                 })
             }
             return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
         },
         detach: function (a) {
             return this.remove(a, !0)
         },
         domManip: function (a, c, d) {
             var e, g, h, i, j = a[0],
                 k = [];
             if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) {
                 return this.each(function () {
                     f(this).domManip(a, c, d, !0)
                 })
             }
             if (f.isFunction(j)) {
                 return this.each(function (e) {
                     var g = f(this);
                     a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
                 })
             }
             if (this[0]) {
                 i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                     fragment: i
                 } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                 if (g) {
                     c = c && f.nodeName(g, "tr");
                     for (var l = 0, m = this.length, n = m - 1; l < m; l++) {
                         d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                     }
                 }
                 k.length && f.each(k, function (a, b) {
                     b.src ? f.ajax({
                         type: "GET",
                         global: !1,
                         url: b.src,
                         async: !1,
                         dataType: "script"
                     }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                 })
             }
             return this
         }
     }), f.buildFragment = function (a, b, d) {
         var e, g, h, i, j = a[0];
         b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
         return {
             fragment: e,
             cacheable: g
         }
     }, f.fragments = {}, f.each({
         appendTo: "append",
         prependTo: "prepend",
         insertBefore: "before",
         insertAfter: "after",
         replaceAll: "replaceWith"
     }, function (a, b) {
         f.fn[a] = function (c) {
             var d = [],
                 e = f(c),
                 g = this.length === 1 && this[0].parentNode;
             if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                 e[b](this[0]);
                 return this
             }
             for (var h = 0, i = e.length; h < i; h++) {
                 var j = (h > 0 ? this.clone(!0) : this).get();
                 f(e[h])[b](j), d = d.concat(j)
             }
             return this.pushStack(d, a, e.selector)
         }
     }), f.extend({
         clone: function (a, b, c) {
             var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
             if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                 bk(a, h), d = bl(a), e = bl(h);
                 for (g = 0; d[g]; ++g) {
                     e[g] && bk(d[g], e[g])
                 }
             }
             if (b) {
                 bj(a, h);
                 if (c) {
                     d = bl(a), e = bl(h);
                     for (g = 0; d[g]; ++g) {
                         bj(d[g], e[g])
                     }
                 }
             }
             d = e = null;
             return h
         },
         clean: function (a, b, d, e) {
             var g, h, i, j = [];
             b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
             for (var k = 0, l;
                 (l = a[k]) != null; k++) {
                 typeof l == "number" && (l += "");
                 if (!l) {
                     continue
                 }
                 if (typeof l == "string") {
                     if (!_.test(l)) {
                         l = b.createTextNode(l)
                     } else {
                         l = l.replace(Y, "<$1></$2>");
                         var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
                             n = bg[m] || bg._default,
                             o = n[0],
                             p = b.createElement("div"),
                             q = bh.childNodes,
                             r;
                         b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                         while (o--) {
                             p = p.lastChild
                         }
                         if (!f.support.tbody) {
                             var s = $.test(l),
                                 t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                             for (i = t.length - 1; i >= 0; --i) {
                                 f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                             }
                         }!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                     }
                 }
                 var u;
                 if (!f.support.appendChecked) {
                     if (l[0] && typeof (u = l.length) == "number") {
                         for (i = 0; i < u; i++) {
                             bn(l[i])
                         }
                     } else {
                         bn(l)
                     }
                 }
                 l.nodeType ? j.push(l) : j = f.merge(j, l)
             }
             if (d) {
                 g = function (a) {
                     return !a.type || be.test(a.type)
                 };
                 for (k = 0; j[k]; k++) {
                     h = j[k];
                     if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) {
                         e.push(h.parentNode ? h.parentNode.removeChild(h) : h)
                     } else {
                         if (h.nodeType === 1) {
                             var v = f.grep(h.getElementsByTagName("script"), g);
                             j.splice.apply(j, [k + 1, 0].concat(v))
                         }
                         d.appendChild(h)
                     }
                 }
             }
             return j
         },
         cleanData: function (a) {
             var b, c, d = f.cache,
                 e = f.event.special,
                 g = f.support.deleteExpando;
             for (var h = 0, i;
                 (i = a[h]) != null; h++) {
                 if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) {
                     continue
                 }
                 c = i[f.expando];
                 if (c) {
                     b = d[c];
                     if (b && b.events) {
                         for (var j in b.events) {
                             e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle)
                         }
                         b.handle && (b.handle.elem = null)
                     }
                     g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                 }
             }
         }
     });
     var bp = /alpha\([^)]*\)/i,
         bq = /opacity=([^)]*)/,
         br = /([A-Z]|^ms)/g,
         bs = /^[\-+]?(?:\d*\.)?\d+$/i,
         bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
         bu = /^([\-+])=([\-+.\de]+)/,
         bv = /^margin/,
         bw = {
             position: "absolute",
             visibility: "hidden",
             display: "block"
         },
         bx = ["Top", "Right", "Bottom", "Left"],
         by, bz, bA;
     f.fn.css = function (a, c) {
         return f.access(this, function (a, c, d) {
             return d !== b ? f.style(a, c, d) : f.css(a, c)
         }, a, c, arguments.length > 1)
     }, f.extend({
         cssHooks: {
             opacity: {
                 get: function (a, b) {
                     if (b) {
                         var c = by(a, "opacity");
                         return c === "" ? "1" : c
                     }
                     return a.style.opacity
                 }
             }
         },
         cssNumber: {
             fillOpacity: !0,
             fontWeight: !0,
             lineHeight: !0,
             opacity: !0,
             orphans: !0,
             widows: !0,
             zIndex: !0,
             zoom: !0
         },
         cssProps: {
             "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
         },
         style: function (a, c, d, e) {
             if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                 var g, h, i = f.camelCase(c),
                     j = a.style,
                     k = f.cssHooks[i];
                 c = f.cssProps[i] || i;
                 if (d === b) {
                     if (k && "get" in k && (g = k.get(a, !1, e)) !== b) {
                         return g
                     }
                     return j[c]
                 }
                 h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                 if (d == null || h === "number" && isNaN(d)) {
                     return
                 }
                 h === "number" && !f.cssNumber[i] && (d += "px");
                 if (!k || !("set" in k) || (d = k.set(a, d)) !== b) {
                     try {
                         j[c] = d
                     } catch (l) {}
                 }
             }
         },
         css: function (a, c, d) {
             var e, g;
             c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
             if (g && "get" in g && (e = g.get(a, !0, d)) !== b) {
                 return e
             }
             if (by) {
                 return by(a, c)
             }
         },
         swap: function (a, b, c) {
             var d = {},
                 e, f;
             for (f in b) {
                 d[f] = a.style[f], a.style[f] = b[f]
             }
             e = c.call(a);
             for (f in b) {
                 a.style[f] = d[f]
             }
             return e
         }
     }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
         var c, d, e, g, h = a.style;
         b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
         return c
     }), c.documentElement.currentStyle && (bA = function (a, b) {
         var c, d, e, f = a.currentStyle && a.currentStyle[b],
             g = a.style;
         f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
         return f === "" ? "auto" : f
     }), by = bz || bA, f.each(["height", "width"], function (a, b) {
         f.cssHooks[b] = {
             get: function (a, c, d) {
                 if (c) {
                     return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                         return bB(a, b, d)
                     })
                 }
             },
             set: function (a, b) {
                 return bs.test(b) ? b + "px" : b
             }
         }
     }), f.support.opacity || (f.cssHooks.opacity = {
         get: function (a, b) {
             return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
         },
         set: function (a, b) {
             var c = a.style,
                 d = a.currentStyle,
                 e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                 g = d && d.filter || c.filter || "";
             c.zoom = 1;
             if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                 c.removeAttribute("filter");
                 if (d && !d.filter) {
                     return
                 }
             }
             c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
         }
     }), f(function () {
         f.support.reliableMarginRight || (f.cssHooks.marginRight = {
             get: function (a, b) {
                 return f.swap(a, {
                     display: "inline-block"
                 }, function () {
                     return b ? by(a, "margin-right") : a.style.marginRight
                 })
             }
         })
     }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
         var b = a.offsetWidth,
             c = a.offsetHeight;
         return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
     }, f.expr.filters.visible = function (a) {
         return !f.expr.filters.hidden(a)
     }), f.each({
         margin: "",
         padding: "",
         border: "Width"
     }, function (a, b) {
         f.cssHooks[a + b] = {
             expand: function (c) {
                 var d, e = typeof c == "string" ? c.split(" ") : [c],
                     f = {};
                 for (d = 0; d < 4; d++) {
                     f[a + bx[d] + b] = e[d] || e[d - 2] || e[0]
                 }
                 return f
             }
         }
     });
     var bC = /%20/g,
         bD = /\[\]$/,
         bE = /\r?\n/g,
         bF = /#.*$/,
         bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
         bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
         bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
         bJ = /^(?:GET|HEAD)$/,
         bK = /^\/\//,
         bL = /\?/,
         bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
         bN = /^(?:select|textarea)/i,
         bO = /\s+/,
         bP = /([?&])_=[^&]*/,
         bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
         bR = f.fn.load,
         bS = {},
         bT = {},
         bU, bV, bW = ["*/"] + ["*"];
     try {
         bU = e.href
     } catch (bX) {
         bU = c.createElement("a"), bU.href = "", bU = bU.href
     }
     bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
         load: function (a, c, d) {
             if (typeof a != "string" && bR) {
                 return bR.apply(this, arguments)
             }
             if (!this.length) {
                 return this
             }
             var e = a.indexOf(" ");
             if (e >= 0) {
                 var g = a.slice(e, a.length);
                 a = a.slice(0, e)
             }
             var h = "GET";
             c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
             var i = this;
             f.ajax({
                 url: a,
                 type: h,
                 dataType: "html",
                 data: c,
                 complete: function (a, b, c) {
                     c = a.responseText, a.isResolved() && (a.done(function (a) {
                         c = a
                     }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                 }
             });
             return this
         },
         serialize: function () {
             return f.param(this.serializeArray())
         },
         serializeArray: function () {
             return this.map(function () {
                 return this.elements ? f.makeArray(this.elements) : this
             }).filter(function () {
                 return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
             }).map(function (a, b) {
                 var c = f(this).val();
                 return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                     return {
                         name: b.name,
                         value: a.replace(bE, "\r\n")
                     }
                 }) : {
                     name: b.name,
                     value: c.replace(bE, "\r\n")
                 }
             }).get()
         }
     }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
         f.fn[b] = function (a) {
             return this.on(b, a)
         }
     }), f.each(["get", "post"], function (a, c) {
         f[c] = function (a, d, e, g) {
             f.isFunction(d) && (g = g || e, e = d, d = b);
             return f.ajax({
                 type: c,
                 url: a,
                 data: d,
                 success: e,
                 dataType: g
             })
         }
     }), f.extend({
         getScript: function (a, c) {
             return f.get(a, b, c, "script")
         },
         getJSON: function (a, b, c) {
             return f.get(a, b, c, "json")
         },
         ajaxSetup: function (a, b) {
             b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
             return a
         },
         ajaxSettings: {
             url: bU,
             isLocal: bI.test(bV[1]),
             global: !0,
             type: "GET",
             contentType: "application/x-www-form-urlencoded; charset=UTF-8",
             processData: !0,
             async: !0,
             accepts: {
                 xml: "application/xml, text/xml",
                 html: "text/html",
                 text: "text/plain",
                 json: "application/json, text/javascript",
                 "*": bW
             },
             contents: {
                 xml: /xml/,
                 html: /html/,
                 json: /json/
             },
             responseFields: {
                 xml: "responseXML",
                 text: "responseText"
             },
             converters: {
                 "* text": a.String,
                 "text html": !0,
                 "text json": f.parseJSON,
                 "text xml": f.parseXML
             },
             flatOptions: {
                 context: !0,
                 url: !0
             }
         },
         ajaxPrefilter: bY(bS),
         ajaxTransport: bY(bT),
         ajax: function (a, c) {
             function w(a, c, l, m) {
                 if (s !== 2) {
                     s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                     var o, r, u, w = c,
                         x = l ? ca(d, v, l) : b,
                         y, z;
                     if (a >= 200 && a < 300 || a === 304) {
                         if (d.ifModified) {
                             if (y = v.getResponseHeader("Last-Modified")) {
                                 f.lastModified[k] = y
                             }
                             if (z = v.getResponseHeader("Etag")) {
                                 f.etag[k] = z
                             }
                         }
                         if (a === 304) {
                             w = "notmodified", o = !0
                         } else {
                             try {
                                 r = cb(d, x), w = "success", o = !0
                             } catch (A) {
                                 w = "parsererror", u = A
                             }
                         }
                     } else {
                         u = w;
                         if (!w || a) {
                             w = "error", a < 0 && (a = 0)
                         }
                     }
                     v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                 }
             }
             typeof a == "object" && (c = a, a = b), c = c || {};
             var d = f.ajaxSetup({}, c),
                 e = d.context || d,
                 g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                 h = f.Deferred(),
                 i = f.Callbacks("once memory"),
                 j = d.statusCode || {},
                 k, l = {},
                 m = {},
                 n, o, p, q, r, s = 0,
                 t, u, v = {
                     readyState: 0,
                     setRequestHeader: function (a, b) {
                         if (!s) {
                             var c = a.toLowerCase();
                             a = m[c] = m[c] || a, l[a] = b
                         }
                         return this
                     },
                     getAllResponseHeaders: function () {
                         return s === 2 ? n : null
                     },
                     getResponseHeader: function (a) {
                         var c;
                         if (s === 2) {
                             if (!o) {
                                 o = {};
                                 while (c = bG.exec(n)) {
                                     o[c[1].toLowerCase()] = c[2]
                                 }
                             }
                             c = o[a.toLowerCase()]
                         }
                         return c === b ? null : c
                     },
                     overrideMimeType: function (a) {
                         s || (d.mimeType = a);
                         return this
                     },
                     abort: function (a) {
                         a = a || "abort", p && p.abort(a), w(0, a);
                         return this
                     }
                 };
             h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                 if (a) {
                     var b;
                     if (s < 2) {
                         for (b in a) {
                             j[b] = [j[b], a[b]]
                         }
                     } else {
                         b = a[v.status], v.then(b, b)
                     }
                 }
                 return this
             }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
             if (s === 2) {
                 return !1
             }
             t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
             if (!d.hasContent) {
                 d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                 if (d.cache === !1) {
                     var x = f.now(),
                         y = d.url.replace(bP, "$1_=" + x);
                     d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                 }
             }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
             for (u in d.headers) {
                 v.setRequestHeader(u, d.headers[u])
             }
             if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                 v.abort();
                 return !1
             }
             for (u in {
                 success: 1,
                 error: 1,
                 complete: 1
             }) {
                 v[u](d[u])
             }
             p = bZ(bT, d, c, v);
             if (!p) {
                 w(-1, "No Transport")
             } else {
                 v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                     v.abort("timeout")
                 }, d.timeout));
                 try {
                     s = 1, p.send(l, w)
                 } catch (z) {
                     if (s < 2) {
                         w(-1, z)
                     } else {
                         throw z
                     }
                 }
             }
             return v
         },
         param: function (a, c) {
             var d = [],
                 e = function (a, b) {
                     b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                 };
             c === b && (c = f.ajaxSettings.traditional);
             if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) {
                 f.each(a, function () {
                     e(this.name, this.value)
                 })
             } else {
                 for (var g in a) {
                     b_(g, a[g], c, e)
                 }
             }
             return d.join("&").replace(bC, "+")
         }
     }), f.extend({
         active: 0,
         lastModified: {},
         etag: {}
     });
     var cc = f.now(),
         cd = /(\=)\?(&|$)|\?\?/i;
     f.ajaxSetup({
         jsonp: "callback",
         jsonpCallback: function () {
             return f.expando + "_" + cc++
         }
     }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
         var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
         if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
             var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                 i = a[h],
                 j = b.url,
                 k = b.data,
                 l = "$1" + h + "$2";
             b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                 g = [a]
             }, d.always(function () {
                 a[h] = i, g && f.isFunction(i) && a[h](g[0])
             }), b.converters["script json"] = function () {
                 g || f.error(h + " was not called");
                 return g[0]
             }, b.dataTypes[0] = "json";
             return "script"
         }
     }), f.ajaxSetup({
         accepts: {
             script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
         },
         contents: {
             script: /javascript|ecmascript/
         },
         converters: {
             "text script": function (a) {
                 f.globalEval(a);
                 return a
             }
         }
     }), f.ajaxPrefilter("script", function (a) {
         a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
     }), f.ajaxTransport("script", function (a) {
         if (a.crossDomain) {
             var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
             return {
                 send: function (f, g) {
                     d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                         if (c || !d.readyState || /loaded|complete/.test(d.readyState)) {
                             d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                         }
                     }, e.insertBefore(d, e.firstChild)
                 },
                 abort: function () {
                     d && d.onload(0, 1)
                 }
             }
         }
     });
     var ce = a.ActiveXObject ? function () {
             for (var a in cg) {
                 cg[a](0, 1)
             }
         } : !1,
         cf = 0,
         cg;
     f.ajaxSettings.xhr = a.ActiveXObject ? function () {
         return !this.isLocal && ch() || ci()
     } : ch,
     function (a) {
         f.extend(f.support, {
             ajax: !!a,
             cors: !!a && "withCredentials" in a
         })
     }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
         if (!c.crossDomain || f.support.cors) {
             var d;
             return {
                 send: function (e, g) {
                     var h = c.xhr(),
                         i, j;
                     c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                     if (c.xhrFields) {
                         for (j in c.xhrFields) {
                             h[j] = c.xhrFields[j]
                         }
                     }
                     c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                     try {
                         for (j in e) {
                             h.setRequestHeader(j, e[j])
                         }
                     } catch (k) {}
                     h.send(c.hasContent && c.data || null), d = function (a, e) {
                         var j, k, l, m, n;
                         try {
                             if (d && (e || h.readyState === 4)) {
                                 d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                                 if (e) {
                                     h.readyState !== 4 && h.abort()
                                 } else {
                                     j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                     try {
                                         m.text = h.responseText
                                     } catch (a) {}
                                     try {
                                         k = h.statusText
                                     } catch (o) {
                                         k = ""
                                     }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                 }
                             }
                         } catch (p) {
                             e || g(-1, p)
                         }
                         m && g(j, k, m, l)
                     }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
                 },
                 abort: function () {
                     d && d(0, 1)
                 }
             }
         }
     });
     var cj = {},
         ck, cl, cm = /^(?:toggle|show|hide)$/,
         cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
         co, cp = [
             ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
             ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
             ["opacity"]
         ],
         cq;
     f.fn.extend({
         show: function (a, b, c) {
             var d, e;
             if (a || a === 0) {
                 return this.animate(ct("show", 3), a, b, c)
             }
             for (var g = 0, h = this.length; g < h; g++) {
                 d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)))
             }
             for (g = 0; g < h; g++) {
                 d = this[g];
                 if (d.style) {
                     e = d.style.display;
                     if (e === "" || e === "none") {
                         d.style.display = f._data(d, "olddisplay") || ""
                     }
                 }
             }
             return this
         },
         hide: function (a, b, c) {
             if (a || a === 0) {
                 return this.animate(ct("hide", 3), a, b, c)
             }
             var d, e, g = 0,
                 h = this.length;
             for (; g < h; g++) {
                 d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e))
             }
             for (g = 0; g < h; g++) {
                 this[g].style && (this[g].style.display = "none")
             }
             return this
         },
         _toggle: f.fn.toggle,
         toggle: function (a, b, c) {
             var d = typeof a == "boolean";
             f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                 var b = d ? a : f(this).is(":hidden");
                 f(this)[b ? "show" : "hide"]()
             }) : this.animate(ct("toggle", 3), a, b, c);
             return this
         },
         fadeTo: function (a, b, c, d) {
             return this.filter(":hidden").css("opacity", 0).show().end().animate({
                 opacity: b
             }, a, c, d)
         },
         animate: function (a, b, c, d) {
             function g() {
                 e.queue === !1 && f._mark(this);
                 var b = f.extend({}, e),
                     c = this.nodeType === 1,
                     d = c && f(this).is(":hidden"),
                     g, h, i, j, k, l, m, n, o, p, q;
                 b.animatedProperties = {};
                 for (i in a) {
                     g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                     if ((k = f.cssHooks[g]) && "expand" in k) {
                         l = k.expand(a[g]), delete a[g];
                         for (i in l) {
                             i in a || (a[i] = l[i])
                         }
                     }
                 }
                 for (g in a) {
                     h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                     if (h === "hide" && d || h === "show" && !d) {
                         return b.complete.call(this)
                     }
                     c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                 }
                 b.overflow != null && (this.style.overflow = "hidden");
                 for (i in a) {
                     j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""))
                 }
                 return !0
             }
             var e = f.speed(b, c, d);
             if (f.isEmptyObject(a)) {
                 return this.each(e.complete, [!1])
             }
             a = f.extend({}, a);
             return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
         },
         stop: function (a, c, d) {
             typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
             return this.each(function () {
                 function h(a, b, c) {
                     var e = b[c];
                     f.removeData(a, c, !0), e.stop(d)
                 }
                 var b, c = !1,
                     e = f.timers,
                     g = f._data(this);
                 d || f._unmark(!0, this);
                 if (a == null) {
                     for (b in g) {
                         g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b)
                     }
                 } else {
                     g[b = a + ".run"] && g[b].stop && h(this, g, b)
                 }
                 for (b = e.length; b--;) {
                     e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1))
                 }(!d || !c) && f.dequeue(this, a)
             })
         }
     }), f.each({
         slideDown: ct("show", 1),
         slideUp: ct("hide", 1),
         slideToggle: ct("toggle", 1),
         fadeIn: {
             opacity: "show"
         },
         fadeOut: {
             opacity: "hide"
         },
         fadeToggle: {
             opacity: "toggle"
         }
     }, function (a, b) {
         f.fn[a] = function (a, c, d) {
             return this.animate(b, a, c, d)
         }
     }), f.extend({
         speed: function (a, b, c) {
             var d = a && typeof a == "object" ? f.extend({}, a) : {
                 complete: c || !c && b || f.isFunction(a) && a,
                 duration: a,
                 easing: c && b || b && !f.isFunction(b) && b
             };
             d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
             if (d.queue == null || d.queue === !0) {
                 d.queue = "fx"
             }
             d.old = d.complete, d.complete = function (a) {
                 f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
             };
             return d
         },
         easing: {
             linear: function (a) {
                 return a
             },
             swing: function (a) {
                 return -Math.cos(a * Math.PI) / 2 + 0.5
             }
         },
         timers: [],
         fx: function (a, b, c) {
             this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
         }
     }), f.fx.prototype = {
         update: function () {
             this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
         },
         cur: function () {
             if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                 return this.elem[this.prop]
             }
             var a, b = f.css(this.elem, this.prop);
             return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
         },
         custom: function (a, c, d) {
             function h(a) {
                 return e.step(a)
             }
             var e = this,
                 g = f.fx;
             this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                 f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
             }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
         },
         show: function () {
             var a = f._data(this.elem, "fxshow" + this.prop);
             this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
         },
         hide: function () {
             this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
         },
         step: function (a) {
             var b, c, d, e = cq || cr(),
                 g = !0,
                 h = this.elem,
                 i = this.options;
             if (a || e >= i.duration + this.startTime) {
                 this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                 for (b in i.animatedProperties) {
                     i.animatedProperties[b] !== !0 && (g = !1)
                 }
                 if (g) {
                     i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                         h.style["overflow" + b] = i.overflow[a]
                     }), i.hide && f(h).hide();
                     if (i.hide || i.show) {
                         for (b in i.animatedProperties) {
                             f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0)
                         }
                     }
                     d = i.complete, d && (i.complete = !1, d.call(h))
                 }
                 return !1
             }
             i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
             return !0
         }
     }, f.extend(f.fx, {
         tick: function () {
             var a, b = f.timers,
                 c = 0;
             for (; c < b.length; c++) {
                 a = b[c], !a() && b[c] === a && b.splice(c--, 1)
             }
             b.length || f.fx.stop()
         },
         interval: 13,
         stop: function () {
             clearInterval(co), co = null
         },
         speeds: {
             slow: 600,
             fast: 200,
             _default: 400
         },
         step: {
             opacity: function (a) {
                 f.style(a.elem, "opacity", a.now)
             },
             _default: function (a) {
                 a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
             }
         }
     }), f.each(cp.concat.apply([], cp), function (a, b) {
         b.indexOf("margin") && (f.fx.step[b] = function (a) {
             f.style(a.elem, b, Math.max(0, a.now) + a.unit)
         })
     }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
         return f.grep(f.timers, function (b) {
             return a === b.elem
         }).length
     });
     var cv, cw = /^t(?:able|d|h)$/i,
         cx = /^(?:body|html)$/i;
     "getBoundingClientRect" in c.documentElement ? cv = function (a, b, c, d) {
         try {
             d = a.getBoundingClientRect()
         } catch (e) {}
         if (!d || !f.contains(c, a)) {
             return d ? {
                 top: d.top,
                 left: d.left
             } : {
                 top: 0,
                 left: 0
             }
         }
         var g = b.body,
             h = cy(b),
             i = c.clientTop || g.clientTop || 0,
             j = c.clientLeft || g.clientLeft || 0,
             k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
             l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
             m = d.top + k - i,
             n = d.left + l - j;
         return {
             top: m,
             left: n
         }
     } : cv = function (a, b, c) {
         var d, e = a.offsetParent,
             g = a,
             h = b.body,
             i = b.defaultView,
             j = i ? i.getComputedStyle(a, null) : a.currentStyle,
             k = a.offsetTop,
             l = a.offsetLeft;
         while ((a = a.parentNode) && a !== h && a !== c) {
             if (f.support.fixedPosition && j.position === "fixed") {
                 break
             }
             d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
         }
         if (j.position === "relative" || j.position === "static") {
             k += h.offsetTop, l += h.offsetLeft
         }
         f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
         return {
             top: k,
             left: l
         }
     }, f.fn.offset = function (a) {
         if (arguments.length) {
             return a === b ? this : this.each(function (b) {
                 f.offset.setOffset(this, a, b)
             })
         }
         var c = this[0],
             d = c && c.ownerDocument;
         if (!d) {
             return null
         }
         if (c === d.body) {
             return f.offset.bodyOffset(c)
         }
         return cv(c, d, d.documentElement)
     }, f.offset = {
         bodyOffset: function (a) {
             var b = a.offsetTop,
                 c = a.offsetLeft;
             f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
             return {
                 top: b,
                 left: c
             }
         },
         setOffset: function (a, b, c) {
             var d = f.css(a, "position");
             d === "static" && (a.style.position = "relative");
             var e = f(a),
                 g = e.offset(),
                 h = f.css(a, "top"),
                 i = f.css(a, "left"),
                 j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                 k = {},
                 l = {},
                 m, n;
             j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
         }
     }, f.fn.extend({
         position: function () {
             if (!this[0]) {
                 return null
             }
             var a = this[0],
                 b = this.offsetParent(),
                 c = this.offset(),
                 d = cx.test(b[0].nodeName) ? {
                     top: 0,
                     left: 0
                 } : b.offset();
             c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
             return {
                 top: c.top - d.top,
                 left: c.left - d.left
             }
         },
         offsetParent: function () {
             return this.map(function () {
                 var a = this.offsetParent || c.body;
                 while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") {
                     a = a.offsetParent
                 }
                 return a
             })
         }
     }), f.each({
         scrollLeft: "pageXOffset",
         scrollTop: "pageYOffset"
     }, function (a, c) {
         var d = /Y/.test(c);
         f.fn[a] = function (e) {
             return f.access(this, function (a, e, g) {
                 var h = cy(a);
                 if (g === b) {
                     return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e]
                 }
                 h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
             }, a, e, arguments.length, null)
         }
     }), f.each({
         Height: "height",
         Width: "width"
     }, function (a, c) {
         var d = "client" + a,
             e = "scroll" + a,
             g = "offset" + a;
         f.fn["inner" + a] = function () {
             var a = this[0];
             return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
         }, f.fn["outer" + a] = function (a) {
             var b = this[0];
             return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
         }, f.fn[c] = function (a) {
             return f.access(this, function (a, c, h) {
                 var i, j, k, l;
                 if (f.isWindow(a)) {
                     i = a.document, j = i.documentElement[d];
                     return f.support.boxModel && j || i.body && i.body[d] || j
                 }
                 if (a.nodeType === 9) {
                     i = a.documentElement;
                     if (i[d] >= i[e]) {
                         return i[d]
                     }
                     return Math.max(a.body[e], i[e], a.body[g], i[g])
                 }
                 if (h === b) {
                     k = f.css(a, c), l = parseFloat(k);
                     return f.isNumeric(l) ? l : k
                 }
                 f(a).css(c, h)
             }, c, a, arguments.length, null)
         }
     }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
         return f
     })
 })(window);
 (function (y) {
     var P = y.fn.domManip,
         B = "_tmplitem",
         O = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
         z = {},
         D = {},
         C, N = {
             key: 0,
             data: {}
         },
         G = 0,
         A = 0,
         J = [];

     function E(i, b, j, f) {
         var a = {
             data: f || (f === 0 || f === false) ? f : b ? b.data : {},
             _wrap: b ? b._wrap : null,
             tmpl: null,
             parent: b || null,
             nodes: [],
             calls: S,
             nest: U,
             wrap: V,
             html: T,
             update: R
         };
         i && y.extend(a, i, {
             nodes: [],
             parent: b
         });
         if (j) {
             a.tmpl = j;
             a._ctnt = a._ctnt || a.tmpl(y, a);
             a.key = ++G;
             (J.length ? D : z)[G] = a
         }
         return a
     }
     y.each({
         appendTo: "append",
         prependTo: "prepend",
         insertBefore: "before",
         insertAfter: "after",
         replaceAll: "replaceWith"
     }, function (b, a) {
         y.fn[b] = function (r) {
             var c = [],
                 e = y(r),
                 o, d, q, p, f = this.length === 1 && this[0].parentNode;
             C = z || {};
             if (f && f.nodeType === 11 && f.childNodes.length === 1 && e.length === 1) {
                 e[a](this[0]);
                 c = this
             } else {
                 for (d = 0, q = e.length; d < q; d++) {
                     A = d;
                     o = (d > 0 ? this.clone(true) : this).get();
                     y(e[d])[a](o);
                     c = c.concat(o)
                 }
                 A = 0;
                 c = this.pushStack(c, b, e.selector)
             }
             p = C;
             C = null;
             y.tmpl.complete(p);
             return c
         }
     });
     y.fn.extend({
         tmpl: function (f, e, a) {
             return y.tmpl(this[0], f, e, a)
         },
         tmplItem: function () {
             return y.tmplItem(this[0])
         },
         template: function (a) {
             return y.template(a, this[0])
         },
         domManip: function (a, p, o) {
             if (a[0] && y.isArray(a[0])) {
                 var c = y.makeArray(arguments),
                     e = a[0],
                     n = e.length,
                     l = 0,
                     b;
                 while (l < n && !(b = y.data(e[l++], "tmplItem"))) {}
                 if (b && A) {
                     c[2] = function (d) {
                         y.tmpl.afterManip(this, d, o)
                     }
                 }
                 P.apply(this, c)
             } else {
                 P.apply(this, arguments)
             }
             A = 0;
             !C && y.tmpl.complete(z);
             return this
         }
     });
     y.extend({
         tmpl: function (b, j, f, a) {
             var l, m = !a;
             if (m) {
                 a = N;
                 b = y.template[b] || y.template(null, b);
                 D = {}
             } else {
                 if (!b) {
                     b = a.tmpl;
                     z[a.key] = a;
                     a.nodes = [];
                     a.wrapped && L(a, a.wrapped);
                     return y(H(a, null, a.tmpl(y, a)))
                 }
             } if (!b) {
                 return []
             }
             if (typeof j === "function") {
                 j = j.call(a || {})
             }
             f && f.wrapped && L(f, f.wrapped);
             l = y.isArray(j) ? y.map(j, function (c) {
                 return c ? E(f, a, b, c) : null
             }) : [E(f, a, b, j)];
             return m ? y(H(a, null, l)) : l
         },
         tmplItem: function (a) {
             var d;
             if (a instanceof y) {
                 a = a[0]
             }
             while (a && a.nodeType === 1 && !(d = y.data(a, "tmplItem")) && (a = a.parentNode)) {}
             return d || N
         },
         template: function (d, a) {
             if (a) {
                 if (typeof a === "string") {
                     a = M(a)
                 } else {
                     if (a instanceof y) {
                         a = a[0] || {}
                     }
                 } if (a.nodeType) {
                     a = y.data(a, "tmpl") || y.data(a, "tmpl", M(a.innerHTML))
                 }
                 return typeof d === "string" ? (y.template[d] = a) : a
             }
             return d ? typeof d !== "string" ? y.template(null, d) : y.template[d] || y.template(null, O.test(d) ? d : y(d)) : null
         },
         encode: function (b) {
             return ("" + b).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
         }
     });
     y.extend(y.tmpl, {
         tag: {
             tmpl: {
                 _default: {
                     $2: "null"
                 },
                 open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
             },
             wrap: {
                 _default: {
                     $2: "null"
                 },
                 open: "$item.calls(__,$1,$2);__=[];",
                 close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
             },
             each: {
                 _default: {
                     $2: "$index, $value"
                 },
                 open: "if($notnull_1){$.each($1a,function($2){with(this){",
                 close: "}});}"
             },
             "if": {
                 open: "if(($notnull_1) && $1a){",
                 close: "}"
             },
             "else": {
                 _default: {
                     $1: "true"
                 },
                 open: "}else if(($notnull_1) && $1a){"
             },
             html: {
                 open: "if($notnull_1){__.push($1a);}"
             },
             "=": {
                 _default: {
                     $1: "$data"
                 },
                 open: "if($notnull_1){__.push($.encode($1a));}"
             },
             "!": {
                 open: ""
             }
         },
         complete: function () {
             z = {}
         },
         afterManip: function (i, a, c) {
             var h = a.nodeType === 11 ? y.makeArray(a.childNodes) : a.nodeType === 1 ? [a] : [];
             c.call(i, a);
             K(h);
             A++
         }
     });

     function H(h, j, i) {
         var a, d = i ? y.map(i, function (b) {
             return typeof b === "string" ? h.key ? b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + B + '="' + h.key + '" $2') : b : H(b, h, b._ctnt)
         }) : h;
         if (j) {
             return d
         }
         d = d.join("");
         d.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (m, b, l, k) {
             a = y(l).get();
             K(a);
             if (b) {
                 a = I(b).concat(a)
             }
             if (k) {
                 a = a.concat(I(k))
             }
         });
         return a ? a : I(d)
     }

     function I(d) {
         var a = document.createElement("div");
         a.innerHTML = d;
         return y.makeArray(a.childNodes)
     }

     function M(a) {
         return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + y.trim(a).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (w, v, u, r, h, n, o) {
             var t = y.tmpl.tag[u],
                 s, p, q;
             if (!t) {
                 throw "Unknown template tag: " + u
             }
             s = t._default || [];
             if (n && !/\w$/.test(h)) {
                 h += n;
                 n = ""
             }
             if (h) {
                 h = F(h);
                 o = o ? "," + F(o) + ")" : n ? ")" : "";
                 p = n ? h.indexOf(".") > -1 ? h + F(n) : "(" + h + ").call($item" + o : h;
                 q = n ? p : "(typeof(" + h + ")==='function'?(" + h + ").call($item):(" + h + "))"
             } else {
                 q = p = s.$1 || "null"
             }
             r = F(r);
             return "');" + t[v ? "close" : "open"].split("$notnull_1").join(h ? "typeof(" + h + ")!=='undefined' && (" + h + ")!=null" : "true").split("$1a").join(q).split("$1").join(p).split("$2").join(r || s.$2 || "") + "__.push('"
         }) + "');}return __;")
     }

     function L(d, a) {
         d._wrap = H(d, true, y.isArray(a) ? a : [O.test(a) ? a : y(a).html()]).join("")
     }

     function F(b) {
         return b ? b.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
     }

     function Q(d) {
         var c = document.createElement("div");
         c.appendChild(d.cloneNode(true));
         return c.innerHTML
     }

     function K(r) {
         var q = "_" + A,
             d, c, f = {},
             a, s, b;
         for (a = 0, s = r.length; a < s; a++) {
             if ((d = r[a]).nodeType !== 1) {
                 continue
             }
             c = d.getElementsByTagName("*");
             for (b = c.length - 1; b >= 0; b--) {
                 i(c[b])
             }
             i(d)
         }

         function i(t) {
             var x, n = t,
                 u, l, v;
             if (v = t.getAttribute(B)) {
                 while (n.parentNode && (n = n.parentNode).nodeType === 1 && !(x = n.getAttribute(B))) {}
                 if (x !== v) {
                     n = n.parentNode ? n.nodeType === 11 ? 0 : n.getAttribute(B) || 0 : 0;
                     if (!(l = z[v])) {
                         l = D[v];
                         l = E(l, z[n] || D[n]);
                         l.key = ++G;
                         z[G] = l
                     }
                     A && w(v)
                 }
                 t.removeAttribute(B)
             } else {
                 if (A && (l = y.data(t, "tmplItem"))) {
                     w(l.key);
                     z[l.key] = l;
                     n = y.data(t.parentNode, "tmplItem");
                     n = n ? n.key : 0
                 }
             } if (l) {
                 u = l;
                 while (u && u.key != n) {
                     u.nodes.push(t);
                     u = u.parent
                 }
                 delete l._ctnt;
                 delete l._wrap;
                 y.data(t, "tmplItem", l)
             }

             function w(e) {
                 e = e + q;
                 l = f[e] = f[e] || E(l, z[l.parent.key + q] || l.parent)
             }
         }
     }

     function S(e, i, h, f) {
         if (!e) {
             return J.pop()
         }
         J.push({
             _: e,
             tmpl: i,
             item: this,
             data: h,
             options: f
         })
     }

     function U(f, e, a) {
         return y.tmpl(y.template(f), e, a, this)
     }

     function V(a, f) {
         var e = a.options || {};
         e.wrapped = f;
         return y.tmpl(y.template(a.tmpl), a.data, e, a.item)
     }

     function T(f, e) {
         var a = this._wrap;
         return y.map(y(y.isArray(a) ? a.join("") : a).filter(f || "*"), function (b) {
             return e ? b.innerText || b.textContent : b.outerHTML || Q(b)
         })
     }

     function R() {
         var a = this.nodes;
         y.tmpl(null, null, null, this).insertBefore(a[0]);
         y(a).remove()
     }
 })(jQuery);
 /*
  * jQuery Cookie Plugin v1.3.1
  * https://github.com/carhartl/jquery-cookie
  *
  * Copyright 2013 Klaus Hartl
  * Released under the MIT license
  */
 (function (a) {
     if (typeof define === "function" && define.amd && define.amd.jQuery) {
         define(["jquery"], a)
     } else {
         a(jQuery)
     }
 }(function (a) {
     var e = /\+/g;

     function f(h) {
         return h
     }

     function d(h) {
         return decodeURIComponent(h.replace(e, " "))
     }

     function c(i) {
         if (i.indexOf('"') === 0) {
             i = i.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
         }
         try {
             return b.json ? JSON.parse(i) : i
         } catch (h) {}
     }
     var b = a.cookie = function (o, w, r) {
         if (w !== undefined) {
             r = a.extend({}, b.defaults, r);
             if (typeof r.expires === "number") {
                 var k = r.expires,
                     v = r.expires = new Date();
                 v.setDate(v.getDate() + k)
             }
             w = b.json ? JSON.stringify(w) : String(w);
             return (document.cookie = [encodeURIComponent(o), "=", b.raw ? w : encodeURIComponent(w), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join(""))
         }
         var m = b.raw ? f : d;
         var j = document.cookie.split("; ");
         var u = o ? undefined : {};
         for (var n = 0, p = j.length; n < p; n++) {
             var s = j[n].split("=");
             var q = m(s.shift());
             var h = m(s.join("="));
             if (o && o === q) {
                 u = c(h);
                 break
             }
             if (!o) {
                 u[q] = c(h)
             }
         }
         return u
     };
     b.defaults = {};
     a.removeCookie = function (h, i) {
         if (a.cookie(h) !== undefined) {
             a.cookie(h, "", a.extend(i, {
                 expires: -1
             }));
             return true
         }
         return false
     }
 }));
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.core.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (e, f) {
     function h(a, d) {
         var j = a.nodeName.toLowerCase();
         if ("area" === j) {
             var k = a.parentNode,
                 l = k.name,
                 m;
             return !a.href || !l || k.nodeName.toLowerCase() !== "map" ? !1 : (m = e("img[usemap=#" + l + "]")[0], !!m && i(m))
         }
         return (/input|select|textarea|button|object/.test(j) ? !a.disabled : "a" == j ? a.href || d : d) && i(a)
     }

     function i(a) {
         return !e(a).parents().andSelf().filter(function () {
             return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
         }).length
     }
     e.ui = e.ui || {};
     if (e.ui.version) {
         return
     }
     e.extend(e.ui, {
         version: "1.8.21",
         keyCode: {
             ALT: 18,
             BACKSPACE: 8,
             CAPS_LOCK: 20,
             COMMA: 188,
             COMMAND: 91,
             COMMAND_LEFT: 91,
             COMMAND_RIGHT: 93,
             CONTROL: 17,
             DELETE: 46,
             DOWN: 40,
             END: 35,
             ENTER: 13,
             ESCAPE: 27,
             HOME: 36,
             INSERT: 45,
             LEFT: 37,
             MENU: 93,
             NUMPAD_ADD: 107,
             NUMPAD_DECIMAL: 110,
             NUMPAD_DIVIDE: 111,
             NUMPAD_ENTER: 108,
             NUMPAD_MULTIPLY: 106,
             NUMPAD_SUBTRACT: 109,
             PAGE_DOWN: 34,
             PAGE_UP: 33,
             PERIOD: 190,
             RIGHT: 39,
             SHIFT: 16,
             SPACE: 32,
             TAB: 9,
             UP: 38,
             WINDOWS: 91
         }
     }), e.fn.extend({
         propAttr: e.fn.prop || e.fn.attr,
         _focus: e.fn.focus,
         focus: function (a, d) {
             return typeof a == "number" ? this.each(function () {
                 var b = this;
                 setTimeout(function () {
                     e(b).focus(), d && d.call(b)
                 }, a)
             }) : this._focus.apply(this, arguments)
         },
         scrollParent: function () {
             var a;
             return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? a = this.parents().filter(function () {
                 return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
             }).eq(0) : a = this.parents().filter(function () {
                 return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
             }).eq(0), /fixed/.test(this.css("position")) || !a.length ? e(document) : a
         },
         zIndex: function (a) {
             if (a !== f) {
                 return this.css("zIndex", a)
             }
             if (this.length) {
                 var b = e(this[0]),
                     j, k;
                 while (b.length && b[0] !== document) {
                     j = b.css("position");
                     if (j === "absolute" || j === "relative" || j === "fixed") {
                         k = parseInt(b.css("zIndex"), 10);
                         if (!isNaN(k) && k !== 0) {
                             return k
                         }
                     }
                     b = b.parent()
                 }
             }
             return 0
         },
         disableSelection: function () {
             return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (b) {
                 b.preventDefault()
             })
         },
         enableSelection: function () {
             return this.unbind(".ui-disableSelection")
         }
     }), e.each(["Width", "Height"], function (a, b) {
         function m(n, o, p, q) {
             return e.each(j, function () {
                 o -= parseFloat(e.curCSS(n, "padding" + this, !0)) || 0, p && (o -= parseFloat(e.curCSS(n, "border" + this + "Width", !0)) || 0), q && (o -= parseFloat(e.curCSS(n, "margin" + this, !0)) || 0)
             }), o
         }
         var j = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
             k = b.toLowerCase(),
             l = {
                 innerWidth: e.fn.innerWidth,
                 innerHeight: e.fn.innerHeight,
                 outerWidth: e.fn.outerWidth,
                 outerHeight: e.fn.outerHeight
             };
         e.fn["inner" + b] = function (d) {
             return d === f ? l["inner" + b].call(this) : this.each(function () {
                 e(this).css(k, m(this, d) + "px")
             })
         }, e.fn["outer" + b] = function (d, n) {
             return typeof d != "number" ? l["outer" + b].call(this, d) : this.each(function () {
                 e(this).css(k, m(this, d, !0, n) + "px")
             })
         }
     }), e.extend(e.expr[":"], {
         data: function (a, j, k) {
             return !!e.data(a, k[3])
         },
         focusable: function (a) {
             return h(a, !isNaN(e.attr(a, "tabindex")))
         },
         tabbable: function (a) {
             var c = e.attr(a, "tabindex"),
                 j = isNaN(c);
             return (j || c >= 0) && h(a, !j)
         }
     }), e(function () {
         var a = document.body,
             d = a.appendChild(d = document.createElement("div"));
         d.offsetHeight, e.extend(d.style, {
             minHeight: "100px",
             height: "auto",
             padding: 0,
             borderWidth: 0
         }), e.support.minHeight = d.offsetHeight === 100, e.support.selectstart = "onselectstart" in d, a.removeChild(d).style.display = "none"
     }), e.extend(e.ui, {
         plugin: {
             add: function (a, j, k) {
                 var l = e.ui[a].prototype;
                 for (var m in k) {
                     l.plugins[m] = l.plugins[m] || [], l.plugins[m].push([j, k[m]])
                 }
             },
             call: function (j, k, l) {
                 var m = j.plugins[k];
                 if (!m || !j.element[0].parentNode) {
                     return
                 }
                 for (var n = 0; n < m.length; n++) {
                     j.options[m[n][0]] && m[n][1].apply(j.element, l)
                 }
             }
         },
         contains: function (c, d) {
             return document.compareDocumentPosition ? c.compareDocumentPosition(d) & 16 : c !== d && c.contains(d)
         },
         hasScroll: function (a, j) {
             if (e(a).css("overflow") === "hidden") {
                 return !1
             }
             var k = j && j === "left" ? "scrollLeft" : "scrollTop",
                 l = !1;
             return a[k] > 0 ? !0 : (a[k] = 1, l = a[k] > 0, a[k] = 0, l)
         },
         isOverAxis: function (d, j, k) {
             return d > j && d < j + k
         },
         isOver: function (a, j, k, l, m, n) {
             return e.ui.isOverAxis(a, k, m) && e.ui.isOverAxis(j, l, n)
         }
     })
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.widget.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (e, f) {
     if (e.cleanData) {
         var h = e.cleanData;
         e.cleanData = function (a) {
             for (var c = 0, j;
                 (j = a[c]) != null; c++) {
                 try {
                     e(j).triggerHandler("remove")
                 } catch (k) {}
             }
             h(a)
         }
     } else {
         var i = e.fn.remove;
         e.fn.remove = function (a, d) {
             return this.each(function () {
                 return d || (!a || e.filter(a, [this]).length) && e("*", this).add([this]).each(function () {
                     try {
                         e(this).triggerHandler("remove")
                     } catch (c) {}
                 }), i.call(e(this), a, d)
             })
         }
     }
     e.widget = function (a, j, k) {
         var l = a.split(".")[0],
             m;
         a = a.split(".")[1], m = l + "-" + a, k || (k = j, j = e.Widget), e.expr[":"][m] = function (b) {
             return !!e.data(b, a)
         }, e[l] = e[l] || {}, e[l][a] = function (c, d) {
             arguments.length && this._createWidget(c, d)
         };
         var n = new j;
         n.options = e.extend(!0, {}, n.options), e[l][a].prototype = e.extend(!0, n, {
             namespace: l,
             widgetName: a,
             widgetEventPrefix: e[l][a].prototype.widgetEventPrefix || a,
             widgetBaseClass: m
         }, k), e.widget.bridge(a, e[l][a])
     }, e.widget.bridge = function (a, b) {
         e.fn[a] = function (c) {
             var d = typeof c == "string",
                 j = Array.prototype.slice.call(arguments, 1),
                 k = this;
             return c = !d && j.length ? e.extend.apply(null, [!0, c].concat(j)) : c, d && c.charAt(0) === "_" ? k : (d ? this.each(function () {
                 var l = e.data(this, a),
                     m = l && e.isFunction(l[c]) ? l[c].apply(l, j) : l;
                 if (m !== l && m !== f) {
                     return k = m, !1
                 }
             }) : this.each(function () {
                 var l = e.data(this, a);
                 l ? l.option(c || {})._init() : e.data(this, a, new b(c, this))
             }), k)
         }
     }, e.Widget = function (c, d) {
         arguments.length && this._createWidget(c, d)
     }, e.Widget.prototype = {
         widgetName: "widget",
         widgetEventPrefix: "",
         options: {
             disabled: !1
         },
         _createWidget: function (a, j) {
             e.data(j, this.widgetName, this), this.element = e(j), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), a);
             var k = this;
             this.element.bind("remove." + this.widgetName, function () {
                 k.destroy()
             }), this._create(), this._trigger("create"), this._init()
         },
         _getCreateOptions: function () {
             return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
         },
         _create: function () {},
         _init: function () {},
         destroy: function () {
             this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
         },
         widget: function () {
             return this.element
         },
         option: function (a, b) {
             var j = a;
             if (arguments.length === 0) {
                 return e.extend({}, this.options)
             }
             if (typeof a == "string") {
                 if (b === f) {
                     return this.options[a]
                 }
                 j = {}, j[a] = b
             }
             return this._setOptions(j), this
         },
         _setOptions: function (a) {
             var d = this;
             return e.each(a, function (c, j) {
                 d._setOption(c, j)
             }), this
         },
         _setOption: function (c, d) {
             return this.options[c] = d, c === "disabled" && this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d), this
         },
         enable: function () {
             return this._setOption("disabled", !1)
         },
         disable: function () {
             return this._setOption("disabled", !0)
         },
         _trigger: function (a, j, k) {
             var l, m, n = this.options[a];
             k = k || {}, j = e.Event(j), j.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase(), j.target = this.element[0], m = j.originalEvent;
             if (m) {
                 for (l in m) {
                     l in j || (j[l] = m[l])
                 }
             }
             return this.element.trigger(j, k), !(e.isFunction(n) && n.call(this.element[0], j, k) === !1 || j.isDefaultPrevented())
         }
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.mouse.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (d, e) {
     var f = !1;
     d(document).mouseup(function (b) {
         f = !1
     }), d.widget("ui.mouse", {
         options: {
             cancel: ":input,option",
             distance: 1,
             delay: 0
         },
         _mouseInit: function () {
             var a = this;
             this.element.bind("mousedown." + this.widgetName, function (b) {
                 return a._mouseDown(b)
             }).bind("click." + this.widgetName, function (b) {
                 if (!0 === d.data(b.target, a.widgetName + ".preventClickEvent")) {
                     return d.removeData(b.target, a.widgetName + ".preventClickEvent"), b.stopImmediatePropagation(), !1
                 }
             }), this.started = !1
         },
         _mouseDestroy: function () {
             this.element.unbind("." + this.widgetName), d(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
         },
         _mouseDown: function (a) {
             if (f) {
                 return
             }
             this._mouseStarted && this._mouseUp(a), this._mouseDownEvent = a;
             var c = this,
                 h = a.which == 1,
                 i = typeof this.options.cancel == "string" && a.target.nodeName ? d(a.target).closest(this.options.cancel).length : !1;
             if (!h || i || !this._mouseCapture(a)) {
                 return !0
             }
             this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                 c.mouseDelayMet = !0
             }, this.options.delay));
             if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                 this._mouseStarted = this._mouseStart(a) !== !1;
                 if (!this._mouseStarted) {
                     return a.preventDefault(), !0
                 }
             }
             return !0 === d.data(a.target, this.widgetName + ".preventClickEvent") && d.removeData(a.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (b) {
                 return c._mouseMove(b)
             }, this._mouseUpDelegate = function (b) {
                 return c._mouseUp(b)
             }, d(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), a.preventDefault(), f = !0, !0
         },
         _mouseMove: function (a) {
             return !d.browser.msie || document.documentMode >= 9 || !!a.button ? this._mouseStarted ? (this._mouseDrag(a), a.preventDefault()) : (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== !1, this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a)), !this._mouseStarted) : this._mouseUp(a)
         },
         _mouseUp: function (a) {
             return d(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, a.target == this._mouseDownEvent.target && d.data(a.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(a)), !1
         },
         _mouseDistanceMet: function (b) {
             return Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance
         },
         _mouseDelayMet: function (b) {
             return this.mouseDelayMet
         },
         _mouseStart: function (b) {},
         _mouseDrag: function (b) {},
         _mouseStop: function (b) {},
         _mouseCapture: function (b) {
             return !0
         }
     })
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.position.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (i, j) {
     i.ui = i.ui || {};
     var k = /left|center|right/,
         l = /top|center|bottom/,
         m = "center",
         n = {},
         o = i.fn.position,
         p = i.fn.offset;
     i.fn.position = function (a) {
         if (!a || !a.of) {
             return o.apply(this, arguments)
         }
         a = i.extend({}, a);
         var c = i(a.of),
             d = c[0],
             e = (a.collision || "flip").split(" "),
             f = a.offset ? a.offset.split(" ") : [0, 0],
             q, r, s;
         return d.nodeType === 9 ? (q = c.width(), r = c.height(), s = {
             top: 0,
             left: 0
         }) : d.setTimeout ? (q = c.width(), r = c.height(), s = {
             top: c.scrollTop(),
             left: c.scrollLeft()
         }) : d.preventDefault ? (a.at = "left top", q = r = 0, s = {
             top: a.of.pageY,
             left: a.of.pageX
         }) : (q = c.outerWidth(), r = c.outerHeight(), s = c.offset()), i.each(["my", "at"], function () {
             var b = (a[this] || "").split(" ");
             b.length === 1 && (b = k.test(b[0]) ? b.concat([m]) : l.test(b[0]) ? [m].concat(b) : [m, m]), b[0] = k.test(b[0]) ? b[0] : m, b[1] = l.test(b[1]) ? b[1] : m, a[this] = b
         }), e.length === 1 && (e[1] = e[0]), f[0] = parseInt(f[0], 10) || 0, f.length === 1 && (f[1] = f[0]), f[1] = parseInt(f[1], 10) || 0, a.at[0] === "right" ? s.left += q : a.at[0] === m && (s.left += q / 2), a.at[1] === "bottom" ? s.top += r : a.at[1] === m && (s.top += r / 2), s.left += f[0], s.top += f[1], this.each(function () {
             var b = i(this),
                 t = b.outerWidth(),
                 u = b.outerHeight(),
                 v = parseInt(i.curCSS(this, "marginLeft", !0)) || 0,
                 w = parseInt(i.curCSS(this, "marginTop", !0)) || 0,
                 x = t + v + (parseInt(i.curCSS(this, "marginRight", !0)) || 0),
                 y = u + w + (parseInt(i.curCSS(this, "marginBottom", !0)) || 0),
                 z = i.extend({}, s),
                 A;
             a.my[0] === "right" ? z.left -= t : a.my[0] === m && (z.left -= t / 2), a.my[1] === "bottom" ? z.top -= u : a.my[1] === m && (z.top -= u / 2), n.fractions || (z.left = Math.round(z.left), z.top = Math.round(z.top)), A = {
                 left: z.left - v,
                 top: z.top - w
             }, i.each(["left", "top"], function (h, B) {
                 i.ui.position[e[h]] && i.ui.position[e[h]][B](z, {
                     targetWidth: q,
                     targetHeight: r,
                     elemWidth: t,
                     elemHeight: u,
                     collisionPosition: A,
                     collisionWidth: x,
                     collisionHeight: y,
                     offset: f,
                     my: a.my,
                     at: a.at
                 })
             }), i.fn.bgiframe && b.bgiframe(), b.offset(i.extend(z, {
                 using: a.using
             }))
         })
     }, i.ui.position = {
         fit: {
             left: function (a, f) {
                 var h = i(window),
                     q = f.collisionPosition.left + f.collisionWidth - h.width() - h.scrollLeft();
                 a.left = q > 0 ? a.left - q : Math.max(a.left - f.collisionPosition.left, a.left)
             },
             top: function (a, f) {
                 var h = i(window),
                     q = f.collisionPosition.top + f.collisionHeight - h.height() - h.scrollTop();
                 a.top = q > 0 ? a.top - q : Math.max(a.top - f.collisionPosition.top, a.top)
             }
         },
         flip: {
             left: function (a, e) {
                 if (e.at[0] === m) {
                     return
                 }
                 var q = i(window),
                     r = e.collisionPosition.left + e.collisionWidth - q.width() - q.scrollLeft(),
                     s = e.my[0] === "left" ? -e.elemWidth : e.my[0] === "right" ? e.elemWidth : 0,
                     t = e.at[0] === "left" ? e.targetWidth : -e.targetWidth,
                     u = -2 * e.offset[0];
                 a.left += e.collisionPosition.left < 0 ? s + t + u : r > 0 ? s + t + u : 0
             },
             top: function (a, e) {
                 if (e.at[1] === m) {
                     return
                 }
                 var q = i(window),
                     r = e.collisionPosition.top + e.collisionHeight - q.height() - q.scrollTop(),
                     s = e.my[1] === "top" ? -e.elemHeight : e.my[1] === "bottom" ? e.elemHeight : 0,
                     t = e.at[1] === "top" ? e.targetHeight : -e.targetHeight,
                     u = -2 * e.offset[1];
                 a.top += e.collisionPosition.top < 0 ? s + t + u : r > 0 ? s + t + u : 0
             }
         }
     }, i.offset.setOffset || (i.offset.setOffset = function (a, q) {
         /static/.test(i.curCSS(a, "position")) && (a.style.position = "relative");
         var r = i(a),
             s = r.offset(),
             t = parseInt(i.curCSS(a, "top", !0), 10) || 0,
             u = parseInt(i.curCSS(a, "left", !0), 10) || 0,
             v = {
                 top: q.top - s.top + t,
                 left: q.left - s.left + u
             };
         "using" in q ? q.using.call(a, v) : r.css(v)
     }, i.fn.offset = function (a) {
         var d = this[0];
         return !d || !d.ownerDocument ? null : a ? i.isFunction(a) ? this.each(function (b) {
             i(this).offset(a.call(this, b, i(this).offset()))
         }) : this.each(function () {
             i.offset.setOffset(this, a)
         }) : p.call(this)
     }),
     function () {
         var a = document.getElementsByTagName("body")[0],
             f = document.createElement("div"),
             q, r, s, t, u;
         q = document.createElement(a ? "div" : "body"), s = {
             visibility: "hidden",
             width: 0,
             height: 0,
             border: 0,
             margin: 0,
             background: "none"
         }, a && i.extend(s, {
             position: "absolute",
             left: "-1000px",
             top: "-1000px"
         });
         for (var v in s) {
             q.style[v] = s[v]
         }
         q.appendChild(f), r = a || document.documentElement, r.insertBefore(q, r.firstChild), f.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", t = i(f).offset(function (c, d) {
             return d
         }).offset(), q.innerHTML = "", r.removeChild(q), u = t.top + t.left + (a ? 2000 : 0), n.fractions = u > 21 && u < 22
     }()
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.draggable.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.widget("ui.draggable", c.ui.mouse, {
         widgetEventPrefix: "drag",
         options: {
             addClasses: !0,
             appendTo: "parent",
             axis: !1,
             connectToSortable: !1,
             containment: !1,
             cursor: "auto",
             cursorAt: !1,
             grid: !1,
             handle: !1,
             helper: "original",
             iframeFix: !1,
             opacity: !1,
             refreshPositions: !1,
             revert: !1,
             revertDuration: 500,
             scope: "default",
             scroll: !0,
             scrollSensitivity: 20,
             scrollSpeed: 20,
             snap: !1,
             snapMode: "both",
             snapTolerance: 20,
             stack: !1,
             zIndex: !1
         },
         _create: function () {
             this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
         },
         destroy: function () {
             if (!this.element.data("draggable")) {
                 return
             }
             return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
         },
         _mouseCapture: function (a) {
             var e = this.options;
             return this.helper || e.disabled || c(a.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(a), this.handle ? (e.iframeFix && c(e.iframeFix === !0 ? "iframe" : e.iframeFix).each(function () {
                 c('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                     width: this.offsetWidth + "px",
                     height: this.offsetHeight + "px",
                     position: "absolute",
                     opacity: "0.001",
                     zIndex: 1000
                 }).css(c(this).offset()).appendTo("body")
             }), !0) : !1)
         },
         _mouseStart: function (a) {
             var e = this.options;
             return this.helper = this._createHelper(a), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), c.ui.ddmanager && (c.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                 top: this.offset.top - this.margins.top,
                 left: this.offset.left - this.margins.left
             }, c.extend(this.offset, {
                 click: {
                     left: a.pageX - this.offset.left,
                     top: a.pageY - this.offset.top
                 },
                 parent: this._getParentOffset(),
                 relative: this._getRelativeOffset()
             }), this.originalPosition = this.position = this._generatePosition(a), this.originalPageX = a.pageX, this.originalPageY = a.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), e.containment && this._setContainment(), this._trigger("start", a) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), c.ui.ddmanager && !e.dropBehaviour && c.ui.ddmanager.prepareOffsets(this, a), this._mouseDrag(a, !0), c.ui.ddmanager && c.ui.ddmanager.dragStart(this, a), !0)
         },
         _mouseDrag: function (a, e) {
             this.position = this._generatePosition(a), this.positionAbs = this._convertPositionTo("absolute");
             if (!e) {
                 var f = this._uiHash();
                 if (this._trigger("drag", a, f) === !1) {
                     return this._mouseUp({}), !1
                 }
                 this.position = f.position
             }
             if (!this.options.axis || this.options.axis != "y") {
                 this.helper[0].style.left = this.position.left + "px"
             }
             if (!this.options.axis || this.options.axis != "x") {
                 this.helper[0].style.top = this.position.top + "px"
             }
             return c.ui.ddmanager && c.ui.ddmanager.drag(this, a), !1
         },
         _mouseStop: function (a) {
             var h = !1;
             c.ui.ddmanager && !this.options.dropBehaviour && (h = c.ui.ddmanager.drop(this, a)), this.dropped && (h = this.dropped, this.dropped = !1);
             var i = this.element[0],
                 j = !1;
             while (i && (i = i.parentNode)) {
                 i == document && (j = !0)
             }
             if (!j && this.options.helper === "original") {
                 return !1
             }
             if (this.options.revert == "invalid" && !h || this.options.revert == "valid" && h || this.options.revert === !0 || c.isFunction(this.options.revert) && this.options.revert.call(this.element, h)) {
                 var k = this;
                 c(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                     k._trigger("stop", a) !== !1 && k._clear()
                 })
             } else {
                 this._trigger("stop", a) !== !1 && this._clear()
             }
             return !1
         },
         _mouseUp: function (a) {
             return this.options.iframeFix === !0 && c("div.ui-draggable-iframeFix").each(function () {
                 this.parentNode.removeChild(this)
             }), c.ui.ddmanager && c.ui.ddmanager.dragStop(this, a), c.ui.mouse.prototype._mouseUp.call(this, a)
         },
         cancel: function () {
             return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
         },
         _getHandle: function (a) {
             var e = !this.options.handle || !c(this.options.handle, this.element).length ? !0 : !1;
             return c(this.options.handle, this.element).find("*").andSelf().each(function () {
                 this == a.target && (e = !0)
             }), e
         },
         _createHelper: function (a) {
             var e = this.options,
                 f = c.isFunction(e.helper) ? c(e.helper.apply(this.element[0], [a])) : e.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
             return f.parents("body").length || f.appendTo(e.appendTo == "parent" ? this.element[0].parentNode : e.appendTo), f[0] != this.element[0] && !/(fixed|absolute)/.test(f.css("position")) && f.css("position", "absolute"), f
         },
         _adjustOffsetFromHelper: function (a) {
             typeof a == "string" && (a = a.split(" ")), c.isArray(a) && (a = {
                 left: +a[0],
                 top: +a[1] || 0
             }), "left" in a && (this.offset.click.left = a.left + this.margins.left), "right" in a && (this.offset.click.left = this.helperProportions.width - a.right + this.margins.left), "top" in a && (this.offset.click.top = a.top + this.margins.top), "bottom" in a && (this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top)
         },
         _getParentOffset: function () {
             this.offsetParent = this.helper.offsetParent();
             var a = this.offsetParent.offset();
             this.cssPosition == "absolute" && this.scrollParent[0] != document && c.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (a.left += this.scrollParent.scrollLeft(), a.top += this.scrollParent.scrollTop());
             if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && c.browser.msie) {
                 a = {
                     top: 0,
                     left: 0
                 }
             }
             return {
                 top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                 left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
             }
         },
         _getRelativeOffset: function () {
             if (this.cssPosition == "relative") {
                 var b = this.element.position();
                 return {
                     top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                     left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                 }
             }
             return {
                 top: 0,
                 left: 0
             }
         },
         _cacheMargins: function () {
             this.margins = {
                 left: parseInt(this.element.css("marginLeft"), 10) || 0,
                 top: parseInt(this.element.css("marginTop"), 10) || 0,
                 right: parseInt(this.element.css("marginRight"), 10) || 0,
                 bottom: parseInt(this.element.css("marginBottom"), 10) || 0
             }
         },
         _cacheHelperProportions: function () {
             this.helperProportions = {
                 width: this.helper.outerWidth(),
                 height: this.helper.outerHeight()
             }
         },
         _setContainment: function () {
             var a = this.options;
             a.containment == "parent" && (a.containment = this.helper[0].parentNode);
             if (a.containment == "document" || a.containment == "window") {
                 this.containment = [a.containment == "document" ? 0 : c(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a.containment == "document" ? 0 : c(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (a.containment == "document" ? 0 : c(window).scrollLeft()) + c(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a.containment == "document" ? 0 : c(window).scrollTop()) + (c(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
             }
             if (!/^(document|window|parent)$/.test(a.containment) && a.containment.constructor != Array) {
                 var h = c(a.containment),
                     i = h[0];
                 if (!i) {
                     return
                 }
                 var j = h.offset(),
                     k = c(i).css("overflow") != "hidden";
                 this.containment = [(parseInt(c(i).css("borderLeftWidth"), 10) || 0) + (parseInt(c(i).css("paddingLeft"), 10) || 0), (parseInt(c(i).css("borderTopWidth"), 10) || 0) + (parseInt(c(i).css("paddingTop"), 10) || 0), (k ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(c(i).css("borderLeftWidth"), 10) || 0) - (parseInt(c(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (k ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(c(i).css("borderTopWidth"), 10) || 0) - (parseInt(c(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = h
             } else {
                 a.containment.constructor == Array && (this.containment = a.containment)
             }
         },
         _convertPositionTo: function (a, h) {
             h || (h = this.position);
             var i = a == "absolute" ? 1 : -1,
                 j = this.options,
                 k = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !c.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                 l = /(html|body)/i.test(k[0].tagName);
             return {
                 top: h.top + this.offset.relative.top * i + this.offset.parent.top * i - (c.browser.safari && c.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : l ? 0 : k.scrollTop()) * i),
                 left: h.left + this.offset.relative.left * i + this.offset.parent.left * i - (c.browser.safari && c.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : l ? 0 : k.scrollLeft()) * i)
             }
         },
         _generatePosition: function (a) {
             var l = this.options,
                 m = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !c.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                 n = /(html|body)/i.test(m[0].tagName),
                 o = a.pageX,
                 p = a.pageY;
             if (this.originalPosition) {
                 var q;
                 if (this.containment) {
                     if (this.relative_container) {
                         var r = this.relative_container.offset();
                         q = [this.containment[0] + r.left, this.containment[1] + r.top, this.containment[2] + r.left, this.containment[3] + r.top]
                     } else {
                         q = this.containment
                     }
                     a.pageX - this.offset.click.left < q[0] && (o = q[0] + this.offset.click.left), a.pageY - this.offset.click.top < q[1] && (p = q[1] + this.offset.click.top), a.pageX - this.offset.click.left > q[2] && (o = q[2] + this.offset.click.left), a.pageY - this.offset.click.top > q[3] && (p = q[3] + this.offset.click.top)
                 }
                 if (l.grid) {
                     var s = l.grid[1] ? this.originalPageY + Math.round((p - this.originalPageY) / l.grid[1]) * l.grid[1] : this.originalPageY;
                     p = q ? s - this.offset.click.top < q[1] || s - this.offset.click.top > q[3] ? s - this.offset.click.top < q[1] ? s + l.grid[1] : s - l.grid[1] : s : s;
                     var t = l.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / l.grid[0]) * l.grid[0] : this.originalPageX;
                     o = q ? t - this.offset.click.left < q[0] || t - this.offset.click.left > q[2] ? t - this.offset.click.left < q[0] ? t + l.grid[0] : t - l.grid[0] : t : t
                 }
             }
             return {
                 top: p - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (c.browser.safari && c.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : n ? 0 : m.scrollTop()),
                 left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (c.browser.safari && c.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : n ? 0 : m.scrollLeft())
             }
         },
         _clear: function () {
             this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
         },
         _trigger: function (a, e, f) {
             return f = f || this._uiHash(), c.ui.plugin.call(this, a, [e, f]), a == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), c.Widget.prototype._trigger.call(this, a, e, f)
         },
         plugins: {},
         _uiHash: function (b) {
             return {
                 helper: this.helper,
                 position: this.position,
                 originalPosition: this.originalPosition,
                 offset: this.positionAbs
             }
         }
     }), c.extend(c.ui.draggable, {
         version: "1.8.21"
     }), c.ui.plugin.add("draggable", "connectToSortable", {
         start: function (a, h) {
             var i = c(this).data("draggable"),
                 j = i.options,
                 k = c.extend({}, h, {
                     item: i.element
                 });
             i.sortables = [], c(j.connectToSortable).each(function () {
                 var b = c.data(this, "sortable");
                 b && !b.options.disabled && (i.sortables.push({
                     instance: b,
                     shouldRevert: b.options.revert
                 }), b.refreshPositions(), b._trigger("activate", a, k))
             })
         },
         stop: function (a, f) {
             var h = c(this).data("draggable"),
                 i = c.extend({}, f, {
                     item: h.element
                 });
             c.each(h.sortables, function () {
                 this.instance.isOver ? (this.instance.isOver = 0, h.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(a), this.instance.options.helper = this.instance.options._helper, h.options.helper == "original" && this.instance.currentItem.css({
                     top: "auto",
                     left: "auto"
                 })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", a, i))
             })
         },
         drag: function (a, h) {
             var i = c(this).data("draggable"),
                 j = this,
                 k = function (l) {
                     var m = this.offset.click.top,
                         n = this.offset.click.left,
                         o = this.positionAbs.top,
                         p = this.positionAbs.left,
                         q = l.height,
                         r = l.width,
                         s = l.top,
                         t = l.left;
                     return c.ui.isOver(o + m, p + n, s, t, q, r)
                 };
             c.each(i.sortables, function (b) {
                 this.instance.positionAbs = i.positionAbs, this.instance.helperProportions = i.helperProportions, this.instance.offset.click = i.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = c(j).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                     return h.helper[0]
                 }, a.target = this.instance.currentItem[0], this.instance._mouseCapture(a, !0), this.instance._mouseStart(a, !0, !0), this.instance.offset.click.top = i.offset.click.top, this.instance.offset.click.left = i.offset.click.left, this.instance.offset.parent.left -= i.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= i.offset.parent.top - this.instance.offset.parent.top, i._trigger("toSortable", a), i.dropped = this.instance.element, i.currentItem = i.element, this.instance.fromOutside = i), this.instance.currentItem && this.instance._mouseDrag(a)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", a, this.instance._uiHash(this.instance)), this.instance._mouseStop(a, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), i._trigger("fromSortable", a), i.dropped = !1)
             })
         }
     }), c.ui.plugin.add("draggable", "cursor", {
         start: function (a, f) {
             var h = c("body"),
                 i = c(this).data("draggable").options;
             h.css("cursor") && (i._cursor = h.css("cursor")), h.css("cursor", i.cursor)
         },
         stop: function (a, e) {
             var f = c(this).data("draggable").options;
             f._cursor && c("body").css("cursor", f._cursor)
         }
     }), c.ui.plugin.add("draggable", "opacity", {
         start: function (a, f) {
             var h = c(f.helper),
                 i = c(this).data("draggable").options;
             h.css("opacity") && (i._opacity = h.css("opacity")), h.css("opacity", i.opacity)
         },
         stop: function (a, e) {
             var f = c(this).data("draggable").options;
             f._opacity && c(e.helper).css("opacity", f._opacity)
         }
     }), c.ui.plugin.add("draggable", "scroll", {
         start: function (a, e) {
             var f = c(this).data("draggable");
             f.scrollParent[0] != document && f.scrollParent[0].tagName != "HTML" && (f.overflowOffset = f.scrollParent.offset())
         },
         drag: function (a, h) {
             var i = c(this).data("draggable"),
                 j = i.options,
                 k = !1;
             if (i.scrollParent[0] != document && i.scrollParent[0].tagName != "HTML") {
                 if (!j.axis || j.axis != "x") {
                     i.overflowOffset.top + i.scrollParent[0].offsetHeight - a.pageY < j.scrollSensitivity ? i.scrollParent[0].scrollTop = k = i.scrollParent[0].scrollTop + j.scrollSpeed : a.pageY - i.overflowOffset.top < j.scrollSensitivity && (i.scrollParent[0].scrollTop = k = i.scrollParent[0].scrollTop - j.scrollSpeed)
                 }
                 if (!j.axis || j.axis != "y") {
                     i.overflowOffset.left + i.scrollParent[0].offsetWidth - a.pageX < j.scrollSensitivity ? i.scrollParent[0].scrollLeft = k = i.scrollParent[0].scrollLeft + j.scrollSpeed : a.pageX - i.overflowOffset.left < j.scrollSensitivity && (i.scrollParent[0].scrollLeft = k = i.scrollParent[0].scrollLeft - j.scrollSpeed)
                 }
             } else {
                 if (!j.axis || j.axis != "x") {
                     a.pageY - c(document).scrollTop() < j.scrollSensitivity ? k = c(document).scrollTop(c(document).scrollTop() - j.scrollSpeed) : c(window).height() - (a.pageY - c(document).scrollTop()) < j.scrollSensitivity && (k = c(document).scrollTop(c(document).scrollTop() + j.scrollSpeed))
                 }
                 if (!j.axis || j.axis != "y") {
                     a.pageX - c(document).scrollLeft() < j.scrollSensitivity ? k = c(document).scrollLeft(c(document).scrollLeft() - j.scrollSpeed) : c(window).width() - (a.pageX - c(document).scrollLeft()) < j.scrollSensitivity && (k = c(document).scrollLeft(c(document).scrollLeft() + j.scrollSpeed))
                 }
             }
             k !== !1 && c.ui.ddmanager && !j.dropBehaviour && c.ui.ddmanager.prepareOffsets(i, a)
         }
     }), c.ui.plugin.add("draggable", "snap", {
         start: function (a, f) {
             var h = c(this).data("draggable"),
                 i = h.options;
             h.snapElements = [], c(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
                 var e = c(this),
                     j = e.offset();
                 this != h.element[0] && h.snapElements.push({
                     item: this,
                     width: e.outerWidth(),
                     height: e.outerHeight(),
                     top: j.top,
                     left: j.left
                 })
             })
         },
         drag: function (a, u) {
             var v = c(this).data("draggable"),
                 w = v.options,
                 x = w.snapTolerance,
                 y = u.offset.left,
                 z = y + v.helperProportions.width,
                 A = u.offset.top,
                 B = A + v.helperProportions.height;
             for (var C = v.snapElements.length - 1; C >= 0; C--) {
                 var D = v.snapElements[C].left,
                     E = D + v.snapElements[C].width,
                     F = v.snapElements[C].top,
                     G = F + v.snapElements[C].height;
                 if (!(D - x < y && y < E + x && F - x < A && A < G + x || D - x < y && y < E + x && F - x < B && B < G + x || D - x < z && z < E + x && F - x < A && A < G + x || D - x < z && z < E + x && F - x < B && B < G + x)) {
                     v.snapElements[C].snapping && v.options.snap.release && v.options.snap.release.call(v.element, a, c.extend(v._uiHash(), {
                         snapItem: v.snapElements[C].item
                     })), v.snapElements[C].snapping = !1;
                     continue
                 }
                 if (w.snapMode != "inner") {
                     var H = Math.abs(F - B) <= x,
                         I = Math.abs(G - A) <= x,
                         J = Math.abs(D - z) <= x,
                         K = Math.abs(E - y) <= x;
                     H && (u.position.top = v._convertPositionTo("relative", {
                         top: F - v.helperProportions.height,
                         left: 0
                     }).top - v.margins.top), I && (u.position.top = v._convertPositionTo("relative", {
                         top: G,
                         left: 0
                     }).top - v.margins.top), J && (u.position.left = v._convertPositionTo("relative", {
                         top: 0,
                         left: D - v.helperProportions.width
                     }).left - v.margins.left), K && (u.position.left = v._convertPositionTo("relative", {
                         top: 0,
                         left: E
                     }).left - v.margins.left)
                 }
                 var L = H || I || J || K;
                 if (w.snapMode != "outer") {
                     var H = Math.abs(F - A) <= x,
                         I = Math.abs(G - B) <= x,
                         J = Math.abs(D - y) <= x,
                         K = Math.abs(E - z) <= x;
                     H && (u.position.top = v._convertPositionTo("relative", {
                         top: F,
                         left: 0
                     }).top - v.margins.top), I && (u.position.top = v._convertPositionTo("relative", {
                         top: G - v.helperProportions.height,
                         left: 0
                     }).top - v.margins.top), J && (u.position.left = v._convertPositionTo("relative", {
                         top: 0,
                         left: D
                     }).left - v.margins.left), K && (u.position.left = v._convertPositionTo("relative", {
                         top: 0,
                         left: E - v.helperProportions.width
                     }).left - v.margins.left)
                 }!v.snapElements[C].snapping && (H || I || J || K || L) && v.options.snap.snap && v.options.snap.snap.call(v.element, a, c.extend(v._uiHash(), {
                     snapItem: v.snapElements[C].item
                 })), v.snapElements[C].snapping = H || I || J || K || L
             }
         }
     }), c.ui.plugin.add("draggable", "stack", {
         start: function (a, h) {
             var i = c(this).data("draggable").options,
                 j = c.makeArray(c(i.stack)).sort(function (e, f) {
                     return (parseInt(c(e).css("zIndex"), 10) || 0) - (parseInt(c(f).css("zIndex"), 10) || 0)
                 });
             if (!j.length) {
                 return
             }
             var k = parseInt(j[0].style.zIndex) || 0;
             c(j).each(function (b) {
                 this.style.zIndex = k + b
             }), this[0].style.zIndex = k + j.length
         }
     }), c.ui.plugin.add("draggable", "zIndex", {
         start: function (a, f) {
             var h = c(f.helper),
                 i = c(this).data("draggable").options;
             h.css("zIndex") && (i._zIndex = h.css("zIndex")), h.css("zIndex", i.zIndex)
         },
         stop: function (a, e) {
             var f = c(this).data("draggable").options;
             f._zIndex && c(e.helper).css("zIndex", f._zIndex)
         }
     })
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.droppable.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.widget("ui.droppable", {
         widgetEventPrefix: "drop",
         options: {
             accept: "*",
             activeClass: !1,
             addClasses: !0,
             greedy: !1,
             hoverClass: !1,
             scope: "default",
             tolerance: "intersect"
         },
         _create: function () {
             var a = this.options,
                 e = a.accept;
             this.isover = 0, this.isout = 1, this.accept = c.isFunction(e) ? e : function (b) {
                 return b.is(e)
             }, this.proportions = {
                 width: this.element[0].offsetWidth,
                 height: this.element[0].offsetHeight
             }, c.ui.ddmanager.droppables[a.scope] = c.ui.ddmanager.droppables[a.scope] || [], c.ui.ddmanager.droppables[a.scope].push(this), a.addClasses && this.element.addClass("ui-droppable")
         },
         destroy: function () {
             var a = c.ui.ddmanager.droppables[this.options.scope];
             for (var e = 0; e < a.length; e++) {
                 a[e] == this && a.splice(e, 1)
             }
             return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
         },
         _setOption: function (a, e) {
             a == "accept" && (this.accept = c.isFunction(e) ? e : function (b) {
                 return b.is(e)
             }), c.Widget.prototype._setOption.apply(this, arguments)
         },
         _activate: function (a) {
             var e = c.ui.ddmanager.current;
             this.options.activeClass && this.element.addClass(this.options.activeClass), e && this._trigger("activate", a, this.ui(e))
         },
         _deactivate: function (a) {
             var e = c.ui.ddmanager.current;
             this.options.activeClass && this.element.removeClass(this.options.activeClass), e && this._trigger("deactivate", a, this.ui(e))
         },
         _over: function (a) {
             var e = c.ui.ddmanager.current;
             if (!e || (e.currentItem || e.element)[0] == this.element[0]) {
                 return
             }
             this.accept.call(this.element[0], e.currentItem || e.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", a, this.ui(e)))
         },
         _out: function (a) {
             var e = c.ui.ddmanager.current;
             if (!e || (e.currentItem || e.element)[0] == this.element[0]) {
                 return
             }
             this.accept.call(this.element[0], e.currentItem || e.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", a, this.ui(e)))
         },
         _drop: function (a, f) {
             var h = f || c.ui.ddmanager.current;
             if (!h || (h.currentItem || h.element)[0] == this.element[0]) {
                 return !1
             }
             var i = !1;
             return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                 var e = c.data(this, "droppable");
                 if (e.options.greedy && !e.options.disabled && e.options.scope == h.options.scope && e.accept.call(e.element[0], h.currentItem || h.element) && c.ui.intersect(h, c.extend(e, {
                     offset: e.element.offset()
                 }), e.options.tolerance)) {
                     return i = !0, !1
                 }
             }), i ? !1 : this.accept.call(this.element[0], h.currentItem || h.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", a, this.ui(h)), this.element) : !1
         },
         ui: function (b) {
             return {
                 draggable: b.currentItem || b.element,
                 helper: b.helper,
                 position: b.position,
                 offset: b.positionAbs
             }
         }
     }), c.extend(c.ui.droppable, {
         version: "1.8.21"
     }), c.ui.intersect = function (a, p, q) {
         if (!p.offset) {
             return !1
         }
         var r = (a.positionAbs || a.position.absolute).left,
             s = r + a.helperProportions.width,
             t = (a.positionAbs || a.position.absolute).top,
             u = t + a.helperProportions.height,
             v = p.offset.left,
             w = v + p.proportions.width,
             x = p.offset.top,
             y = x + p.proportions.height;
         switch (q) {
         case "fit":
             return v <= r && s <= w && x <= t && u <= y;
         case "intersect":
             return v < r + a.helperProportions.width / 2 && s - a.helperProportions.width / 2 < w && x < t + a.helperProportions.height / 2 && u - a.helperProportions.height / 2 < y;
         case "pointer":
             var z = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left,
                 A = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top,
                 B = c.ui.isOver(A, z, x, v, p.proportions.height, p.proportions.width);
             return B;
         case "touch":
             return (t >= x && t <= y || u >= x && u <= y || t < x && u > y) && (r >= v && r <= w || s >= v && s <= w || r < v && s > w);
         default:
             return !1
         }
     }, c.ui.ddmanager = {
         current: null,
         droppables: {
             "default": []
         },
         prepareOffsets: function (a, j) {
             var k = c.ui.ddmanager.droppables[a.options.scope] || [],
                 l = j ? j.type : null,
                 m = (a.currentItem || a.element).find(":data(droppable)").andSelf();
             g: for (var n = 0; n < k.length; n++) {
                 if (k[n].options.disabled || a && !k[n].accept.call(k[n].element[0], a.currentItem || a.element)) {
                     continue
                 }
                 for (var o = 0; o < m.length; o++) {
                     if (m[o] == k[n].element[0]) {
                         k[n].proportions.height = 0;
                         continue g
                     }
                 }
                 k[n].visible = k[n].element.css("display") != "none";
                 if (!k[n].visible) {
                     continue
                 }
                 l == "mousedown" && k[n]._activate.call(k[n], j), k[n].offset = k[n].element.offset(), k[n].proportions = {
                     width: k[n].element[0].offsetWidth,
                     height: k[n].element[0].offsetHeight
                 }
             }
         },
         drop: function (a, e) {
             var f = !1;
             return c.each(c.ui.ddmanager.droppables[a.options.scope] || [], function () {
                 if (!this.options) {
                     return
                 }!this.options.disabled && this.visible && c.ui.intersect(a, this, this.options.tolerance) && (f = this._drop.call(this, e) || f), !this.options.disabled && this.visible && this.accept.call(this.element[0], a.currentItem || a.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, e))
             }), f
         },
         dragStart: function (a, e) {
             a.element.parents(":not(body,html)").bind("scroll.droppable", function () {
                 a.options.refreshPositions || c.ui.ddmanager.prepareOffsets(a, e)
             })
         },
         drag: function (a, e) {
             a.options.refreshPositions && c.ui.ddmanager.prepareOffsets(a, e), c.each(c.ui.ddmanager.droppables[a.options.scope] || [], function () {
                 if (this.options.disabled || this.greedyChild || !this.visible) {
                     return
                 }
                 var b = c.ui.intersect(a, this, this.options.tolerance),
                     h = !b && this.isover == 1 ? "isout" : b && this.isover == 0 ? "isover" : null;
                 if (!h) {
                     return
                 }
                 var i;
                 if (this.options.greedy) {
                     var j = this.element.parents(":data(droppable):eq(0)");
                     j.length && (i = c.data(j[0], "droppable"), i.greedyChild = h == "isover" ? 1 : 0)
                 }
                 i && h == "isover" && (i.isover = 0, i.isout = 1, i._out.call(i, e)), this[h] = 1, this[h == "isout" ? "isover" : "isout"] = 0, this[h == "isover" ? "_over" : "_out"].call(this, e), i && h == "isout" && (i.isout = 0, i.isover = 1, i._over.call(i, e))
             })
         },
         dragStop: function (a, e) {
             a.element.parents(":not(body,html)").unbind("scroll.droppable"), a.options.refreshPositions || c.ui.ddmanager.prepareOffsets(a, e)
         }
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.resizable.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (e, f) {
     e.widget("ui.resizable", e.ui.mouse, {
         widgetEventPrefix: "resize",
         options: {
             alsoResize: !1,
             animate: !1,
             animateDuration: "slow",
             animateEasing: "swing",
             aspectRatio: !1,
             autoHide: !1,
             containment: !1,
             ghost: !1,
             grid: !1,
             handles: "e,s,se",
             helper: !1,
             maxHeight: null,
             maxWidth: null,
             minHeight: 10,
             minWidth: 10,
             zIndex: 1000
         },
         _create: function () {
             var a = this,
                 j = this.options;
             this.element.addClass("ui-resizable"), e.extend(this, {
                 _aspectRatio: !!j.aspectRatio,
                 aspectRatio: j.aspectRatio,
                 originalElement: this.element,
                 _proportionallyResizeElements: [],
                 _helper: j.helper || j.ghost || j.animate ? j.helper || "ui-resizable-helper" : null
             }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                 position: this.element.css("position"),
                 width: this.element.outerWidth(),
                 height: this.element.outerHeight(),
                 top: this.element.css("top"),
                 left: this.element.css("left")
             })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                 marginLeft: this.originalElement.css("marginLeft"),
                 marginTop: this.originalElement.css("marginTop"),
                 marginRight: this.originalElement.css("marginRight"),
                 marginBottom: this.originalElement.css("marginBottom")
             }), this.originalElement.css({
                 marginLeft: 0,
                 marginTop: 0,
                 marginRight: 0,
                 marginBottom: 0
             }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                 position: "static",
                 zoom: 1,
                 display: "block"
             })), this.originalElement.css({
                 margin: this.originalElement.css("margin")
             }), this._proportionallyResize()), this.handles = j.handles || (e(".ui-resizable-handle", this.element).length ? {
                 n: ".ui-resizable-n",
                 e: ".ui-resizable-e",
                 s: ".ui-resizable-s",
                 w: ".ui-resizable-w",
                 se: ".ui-resizable-se",
                 sw: ".ui-resizable-sw",
                 ne: ".ui-resizable-ne",
                 nw: ".ui-resizable-nw"
             } : "e,s,se");
             if (this.handles.constructor == String) {
                 this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                 var k = this.handles.split(",");
                 this.handles = {};
                 for (var l = 0; l < k.length; l++) {
                     var m = e.trim(k[l]),
                         n = "ui-resizable-" + m,
                         o = e('<div class="ui-resizable-handle ' + n + '"></div>');
                     o.css({
                         zIndex: j.zIndex
                     }), "se" == m && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[m] = ".ui-resizable-" + m, this.element.append(o)
                 }
             }
             this._renderAxis = function (p) {
                 p = p || this.element;
                 for (var q in this.handles) {
                     this.handles[q].constructor == String && (this.handles[q] = e(this.handles[q], this.element).show());
                     if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                         var r = e(this.handles[q], this.element),
                             s = 0;
                         s = /sw|ne|nw|se|n|s/.test(q) ? r.outerHeight() : r.outerWidth();
                         var t = ["padding", /ne|nw|n/.test(q) ? "Top" : /se|sw|s/.test(q) ? "Bottom" : /^e$/.test(q) ? "Right" : "Left"].join("");
                         p.css(t, s), this._proportionallyResize()
                     }
                     if (!e(this.handles[q]).length) {
                         continue
                     }
                 }
             }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                 if (!a.resizing) {
                     if (this.className) {
                         var b = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                     }
                     a.axis = b && b[1] ? b[1] : "se"
                 }
             }), j.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").hover(function () {
                 if (j.disabled) {
                     return
                 }
                 e(this).removeClass("ui-resizable-autohide"), a._handles.show()
             }, function () {
                 if (j.disabled) {
                     return
                 }
                 a.resizing || (e(this).addClass("ui-resizable-autohide"), a._handles.hide())
             })), this._mouseInit()
         },
         destroy: function () {
             this._mouseDestroy();
             var a = function (c) {
                 e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
             };
             if (this.elementIsWrapper) {
                 a(this.element);
                 var d = this.element;
                 d.after(this.originalElement.css({
                     position: d.css("position"),
                     width: d.outerWidth(),
                     height: d.outerHeight(),
                     top: d.css("top"),
                     left: d.css("left")
                 })).remove()
             }
             return this.originalElement.css("resize", this.originalResizeStyle), a(this.originalElement), this
         },
         _mouseCapture: function (a) {
             var j = !1;
             for (var k in this.handles) {
                 e(this.handles[k])[0] == a.target && (j = !0)
             }
             return !this.options.disabled && j
         },
         _mouseStart: function (a) {
             var c = this.options,
                 j = this.element.position(),
                 k = this.element;
             this.resizing = !0, this.documentScroll = {
                 top: e(document).scrollTop(),
                 left: e(document).scrollLeft()
             }, (k.is(".ui-draggable") || /absolute/.test(k.css("position"))) && k.css({
                 position: "absolute",
                 top: j.top,
                 left: j.left
             }), this._renderProxy();
             var l = h(this.helper.css("left")),
                 m = h(this.helper.css("top"));
             c.containment && (l += e(c.containment).scrollLeft() || 0, m += e(c.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                 left: l,
                 top: m
             }, this.size = this._helper ? {
                 width: k.outerWidth(),
                 height: k.outerHeight()
             } : {
                 width: k.width(),
                 height: k.height()
             }, this.originalSize = this._helper ? {
                 width: k.outerWidth(),
                 height: k.outerHeight()
             } : {
                 width: k.width(),
                 height: k.height()
             }, this.originalPosition = {
                 left: l,
                 top: m
             }, this.sizeDiff = {
                 width: k.outerWidth() - k.width(),
                 height: k.outerHeight() - k.height()
             }, this.originalMousePosition = {
                 left: a.pageX,
                 top: a.pageY
             }, this.aspectRatio = typeof c.aspectRatio == "number" ? c.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
             var n = e(".ui-resizable-" + this.axis).css("cursor");
             return e("body").css("cursor", n == "auto" ? this.axis + "-resize" : n), k.addClass("ui-resizable-resizing"), this._propagate("start", a), !0
         },
         _mouseDrag: function (a) {
             var o = this.helper,
                 p = this.options,
                 q = {},
                 r = this,
                 s = this.originalMousePosition,
                 t = this.axis,
                 u = a.pageX - s.left || 0,
                 v = a.pageY - s.top || 0,
                 w = this._change[t];
             if (!w) {
                 return !1
             }
             var x = w.apply(this, [a, u, v]),
                 y = e.browser.msie && e.browser.version < 7,
                 z = this.sizeDiff;
             this._updateVirtualBoundaries(a.shiftKey);
             if (this._aspectRatio || a.shiftKey) {
                 x = this._updateRatio(x, a)
             }
             return x = this._respectSize(x, a), this._propagate("resize", a), o.css({
                 top: this.position.top + "px",
                 left: this.position.left + "px",
                 width: this.size.width + "px",
                 height: this.size.height + "px"
             }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(x), this._trigger("resize", a, this.ui()), !1
         },
         _mouseStop: function (a) {
             this.resizing = !1;
             var l = this.options,
                 m = this;
             if (this._helper) {
                 var n = this._proportionallyResizeElements,
                     o = n.length && /textarea/i.test(n[0].nodeName),
                     p = o && e.ui.hasScroll(n[0], "left") ? 0 : m.sizeDiff.height,
                     q = o ? 0 : m.sizeDiff.width,
                     r = {
                         width: m.helper.width() - q,
                         height: m.helper.height() - p
                     },
                     s = parseInt(m.element.css("left"), 10) + (m.position.left - m.originalPosition.left) || null,
                     t = parseInt(m.element.css("top"), 10) + (m.position.top - m.originalPosition.top) || null;
                 l.animate || this.element.css(e.extend(r, {
                     top: t,
                     left: s
                 })), m.helper.height(m.size.height), m.helper.width(m.size.width), this._helper && !l.animate && this._proportionallyResize()
             }
             return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", a), this._helper && this.helper.remove(), !1
         },
         _updateVirtualBoundaries: function (d) {
             var j = this.options,
                 k, l, m, n, o;
             o = {
                 minWidth: i(j.minWidth) ? j.minWidth : 0,
                 maxWidth: i(j.maxWidth) ? j.maxWidth : Infinity,
                 minHeight: i(j.minHeight) ? j.minHeight : 0,
                 maxHeight: i(j.maxHeight) ? j.maxHeight : Infinity
             };
             if (this._aspectRatio || d) {
                 k = o.minHeight * this.aspectRatio, m = o.minWidth / this.aspectRatio, l = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, k > o.minWidth && (o.minWidth = k), m > o.minHeight && (o.minHeight = m), l < o.maxWidth && (o.maxWidth = l), n < o.maxHeight && (o.maxHeight = n)
             }
             this._vBoundaries = o
         },
         _updateCache: function (c) {
             var d = this.options;
             this.offset = this.helper.offset(), i(c.left) && (this.position.left = c.left), i(c.top) && (this.position.top = c.top), i(c.height) && (this.size.height = c.height), i(c.width) && (this.size.width = c.width)
         },
         _updateRatio: function (d, j) {
             var k = this.options,
                 l = this.position,
                 m = this.size,
                 n = this.axis;
             return i(d.height) ? d.width = d.height * this.aspectRatio : i(d.width) && (d.height = d.width / this.aspectRatio), n == "sw" && (d.left = l.left + (m.width - d.width), d.top = null), n == "nw" && (d.top = l.top + (m.height - d.height), d.left = l.left + (m.width - d.width)), d
         },
         _respectSize: function (d, q) {
             var r = this.helper,
                 s = this._vBoundaries,
                 t = this._aspectRatio || q.shiftKey,
                 u = this.axis,
                 v = i(d.width) && s.maxWidth && s.maxWidth < d.width,
                 w = i(d.height) && s.maxHeight && s.maxHeight < d.height,
                 x = i(d.width) && s.minWidth && s.minWidth > d.width,
                 y = i(d.height) && s.minHeight && s.minHeight > d.height;
             x && (d.width = s.minWidth), y && (d.height = s.minHeight), v && (d.width = s.maxWidth), w && (d.height = s.maxHeight);
             var z = this.originalPosition.left + this.originalSize.width,
                 A = this.position.top + this.size.height,
                 B = /sw|nw|w/.test(u),
                 C = /nw|ne|n/.test(u);
             x && B && (d.left = z - s.minWidth), v && B && (d.left = z - s.maxWidth), y && C && (d.top = A - s.minHeight), w && C && (d.top = A - s.maxHeight);
             var D = !d.width && !d.height;
             return D && !d.left && d.top ? d.top = null : D && !d.top && d.left && (d.left = null), d
         },
         _proportionallyResize: function () {
             var a = this.options;
             if (!this._proportionallyResizeElements.length) {
                 return
             }
             var j = this.helper || this.element;
             for (var k = 0; k < this._proportionallyResizeElements.length; k++) {
                 var l = this._proportionallyResizeElements[k];
                 if (!this.borderDif) {
                     var m = [l.css("borderTopWidth"), l.css("borderRightWidth"), l.css("borderBottomWidth"), l.css("borderLeftWidth")],
                         n = [l.css("paddingTop"), l.css("paddingRight"), l.css("paddingBottom"), l.css("paddingLeft")];
                     this.borderDif = e.map(m, function (o, p) {
                         var q = parseInt(o, 10) || 0,
                             r = parseInt(n[p], 10) || 0;
                         return q + r
                     })
                 }
                 if (!e.browser.msie || !e(j).is(":hidden") && !e(j).parents(":hidden").length) {
                     l.css({
                         height: j.height() - this.borderDif[0] - this.borderDif[2] || 0,
                         width: j.width() - this.borderDif[1] - this.borderDif[3] || 0
                     })
                 } else {
                     continue
                 }
             }
         },
         _renderProxy: function () {
             var a = this.element,
                 j = this.options;
             this.elementOffset = a.offset();
             if (this._helper) {
                 this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                 var k = e.browser.msie && e.browser.version < 7,
                     l = k ? 1 : 0,
                     m = k ? 2 : -1;
                 this.helper.addClass(this._helper).css({
                     width: this.element.outerWidth() + m,
                     height: this.element.outerHeight() + m,
                     position: "absolute",
                     left: this.elementOffset.left - l + "px",
                     top: this.elementOffset.top - l + "px",
                     zIndex: ++j.zIndex
                 }), this.helper.appendTo("body").disableSelection()
             } else {
                 this.helper = this.element
             }
         },
         _change: {
             e: function (d, j, k) {
                 return {
                     width: this.originalSize.width + j
                 }
             },
             w: function (j, k, l) {
                 var m = this.options,
                     n = this.originalSize,
                     o = this.originalPosition;
                 return {
                     left: o.left + k,
                     width: n.width - k
                 }
             },
             n: function (j, k, l) {
                 var m = this.options,
                     n = this.originalSize,
                     o = this.originalPosition;
                 return {
                     top: o.top + l,
                     height: n.height - l
                 }
             },
             s: function (d, j, k) {
                 return {
                     height: this.originalSize.height + k
                 }
             },
             se: function (a, j, k) {
                 return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [a, j, k]))
             },
             sw: function (a, j, k) {
                 return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [a, j, k]))
             },
             ne: function (a, j, k) {
                 return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [a, j, k]))
             },
             nw: function (a, j, k) {
                 return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [a, j, k]))
             }
         },
         _propagate: function (a, d) {
             e.ui.plugin.call(this, a, [d, this.ui()]), a != "resize" && this._trigger(a, d, this.ui())
         },
         plugins: {},
         ui: function () {
             return {
                 originalElement: this.originalElement,
                 element: this.element,
                 helper: this.helper,
                 position: this.position,
                 size: this.size,
                 originalSize: this.originalSize,
                 originalPosition: this.originalPosition
             }
         }
     }), e.extend(e.ui.resizable, {
         version: "1.8.21"
     }), e.ui.plugin.add("resizable", "alsoResize", {
         start: function (a, j) {
             var k = e(this).data("resizable"),
                 l = k.options,
                 m = function (c) {
                     e(c).each(function () {
                         var d = e(this);
                         d.data("resizable-alsoresize", {
                             width: parseInt(d.width(), 10),
                             height: parseInt(d.height(), 10),
                             left: parseInt(d.css("left"), 10),
                             top: parseInt(d.css("top"), 10)
                         })
                     })
                 };
             typeof l.alsoResize == "object" && !l.alsoResize.parentNode ? l.alsoResize.length ? (l.alsoResize = l.alsoResize[0], m(l.alsoResize)) : e.each(l.alsoResize, function (b) {
                 m(b)
             }) : m(l.alsoResize)
         },
         resize: function (a, j) {
             var k = e(this).data("resizable"),
                 l = k.options,
                 m = k.originalSize,
                 n = k.originalPosition,
                 o = {
                     height: k.size.height - m.height || 0,
                     width: k.size.width - m.width || 0,
                     top: k.position.top - n.top || 0,
                     left: k.position.left - n.left || 0
                 },
                 p = function (c, q) {
                     e(c).each(function () {
                         var d = e(this),
                             r = e(this).data("resizable-alsoresize"),
                             s = {},
                             t = q && q.length ? q : d.parents(j.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                         e.each(t, function (u, v) {
                             var w = (r[v] || 0) + (o[v] || 0);
                             w && w >= 0 && (s[v] = w || null)
                         }), d.css(s)
                     })
                 };
             typeof l.alsoResize == "object" && !l.alsoResize.nodeType ? e.each(l.alsoResize, function (c, d) {
                 p(c, d)
             }) : p(l.alsoResize)
         },
         stop: function (a, d) {
             e(this).removeData("resizable-alsoresize")
         }
     }), e.ui.plugin.add("resizable", "animate", {
         stop: function (a, m) {
             var n = e(this).data("resizable"),
                 o = n.options,
                 p = n._proportionallyResizeElements,
                 q = p.length && /textarea/i.test(p[0].nodeName),
                 r = q && e.ui.hasScroll(p[0], "left") ? 0 : n.sizeDiff.height,
                 s = q ? 0 : n.sizeDiff.width,
                 t = {
                     width: n.size.width - s,
                     height: n.size.height - r
                 },
                 u = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null,
                 v = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
             n.element.animate(e.extend(t, v && u ? {
                 top: v,
                 left: u
             } : {}), {
                 duration: o.animateDuration,
                 easing: o.animateEasing,
                 step: function () {
                     var b = {
                         width: parseInt(n.element.css("width"), 10),
                         height: parseInt(n.element.css("height"), 10),
                         top: parseInt(n.element.css("top"), 10),
                         left: parseInt(n.element.css("left"), 10)
                     };
                     p && p.length && e(p[0]).css({
                         width: b.width,
                         height: b.height
                     }), n._updateCache(b), n._propagate("resize", a)
                 }
             })
         }
     }), e.ui.plugin.add("resizable", "containment", {
         start: function (a, c) {
             var q = e(this).data("resizable"),
                 r = q.options,
                 s = q.element,
                 t = r.containment,
                 u = t instanceof e ? t.get(0) : /parent/.test(t) ? s.parent().get(0) : t;
             if (!u) {
                 return
             }
             q.containerElement = e(u);
             if (/document/.test(t) || t == document) {
                 q.containerOffset = {
                     left: 0,
                     top: 0
                 }, q.containerPosition = {
                     left: 0,
                     top: 0
                 }, q.parentData = {
                     element: e(document),
                     left: 0,
                     top: 0,
                     width: e(document).width(),
                     height: e(document).height() || document.body.parentNode.scrollHeight
                 }
             } else {
                 var v = e(u),
                     w = [];
                 e(["Top", "Right", "Left", "Bottom"]).each(function (d, j) {
                     w[d] = h(v.css("padding" + j))
                 }), q.containerOffset = v.offset(), q.containerPosition = v.position(), q.containerSize = {
                     height: v.innerHeight() - w[3],
                     width: v.innerWidth() - w[1]
                 };
                 var x = q.containerOffset,
                     y = q.containerSize.height,
                     z = q.containerSize.width,
                     A = e.ui.hasScroll(u, "left") ? u.scrollWidth : z,
                     B = e.ui.hasScroll(u) ? u.scrollHeight : y;
                 q.parentData = {
                     element: u,
                     left: x.left,
                     top: x.top,
                     width: A,
                     height: B
                 }
             }
         },
         resize: function (a, q) {
             var r = e(this).data("resizable"),
                 s = r.options,
                 t = r.containerSize,
                 u = r.containerOffset,
                 v = r.size,
                 w = r.position,
                 x = r._aspectRatio || a.shiftKey,
                 y = {
                     top: 0,
                     left: 0
                 },
                 z = r.containerElement;
             z[0] != document && /static/.test(z.css("position")) && (y = u), w.left < (r._helper ? u.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - u.left : r.position.left - y.left), x && (r.size.height = r.size.width / r.aspectRatio), r.position.left = s.helper ? u.left : 0), w.top < (r._helper ? u.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - u.top : r.position.top), x && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? u.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top;
             var A = Math.abs((r._helper ? r.offset.left - y.left : r.offset.left - y.left) + r.sizeDiff.width),
                 B = Math.abs((r._helper ? r.offset.top - y.top : r.offset.top - u.top) + r.sizeDiff.height),
                 C = r.containerElement.get(0) == r.element.parent().get(0),
                 D = /relative|absolute/.test(r.containerElement.css("position"));
             C && D && (A -= r.parentData.left), A + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - A, x && (r.size.height = r.size.width / r.aspectRatio)), B + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - B, x && (r.size.width = r.size.height * r.aspectRatio))
         },
         stop: function (a, n) {
             var o = e(this).data("resizable"),
                 p = o.options,
                 q = o.position,
                 r = o.containerOffset,
                 s = o.containerPosition,
                 t = o.containerElement,
                 u = e(o.helper),
                 v = u.offset(),
                 w = u.outerWidth() - o.sizeDiff.width,
                 x = u.outerHeight() - o.sizeDiff.height;
             o._helper && !p.animate && /relative/.test(t.css("position")) && e(this).css({
                 left: v.left - s.left - r.left,
                 width: w,
                 height: x
             }), o._helper && !p.animate && /static/.test(t.css("position")) && e(this).css({
                 left: v.left - s.left - r.left,
                 width: w,
                 height: x
             })
         }
     }), e.ui.plugin.add("resizable", "ghost", {
         start: function (a, j) {
             var k = e(this).data("resizable"),
                 l = k.options,
                 m = k.size;
             k.ghost = k.originalElement.clone(), k.ghost.css({
                 opacity: 0.25,
                 display: "block",
                 position: "relative",
                 height: m.height,
                 width: m.width,
                 margin: 0,
                 left: 0,
                 top: 0
             }).addClass("ui-resizable-ghost").addClass(typeof l.ghost == "string" ? l.ghost : ""), k.ghost.appendTo(k.helper)
         },
         resize: function (a, j) {
             var k = e(this).data("resizable"),
                 l = k.options;
             k.ghost && k.ghost.css({
                 position: "relative",
                 height: k.size.height,
                 width: k.size.width
             })
         },
         stop: function (a, j) {
             var k = e(this).data("resizable"),
                 l = k.options;
             k.ghost && k.helper && k.helper.get(0).removeChild(k.ghost.get(0))
         }
     }), e.ui.plugin.add("resizable", "grid", {
         resize: function (a, m) {
             var n = e(this).data("resizable"),
                 o = n.options,
                 p = n.size,
                 q = n.originalSize,
                 r = n.originalPosition,
                 s = n.axis,
                 t = o._aspectRatio || a.shiftKey;
             o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
             var u = Math.round((p.width - q.width) / (o.grid[0] || 1)) * (o.grid[0] || 1),
                 v = Math.round((p.height - q.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);
             /^(se|s|e)$/.test(s) ? (n.size.width = q.width + u, n.size.height = q.height + v) : /^(ne)$/.test(s) ? (n.size.width = q.width + u, n.size.height = q.height + v, n.position.top = r.top - v) : /^(sw)$/.test(s) ? (n.size.width = q.width + u, n.size.height = q.height + v, n.position.left = r.left - u) : (n.size.width = q.width + u, n.size.height = q.height + v, n.position.top = r.top - v, n.position.left = r.left - u)
         }
     });
     var h = function (b) {
             return parseInt(b, 10) || 0
         },
         i = function (b) {
             return !isNaN(parseInt(b, 10))
         }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.selectable.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.widget("ui.selectable", c.ui.mouse, {
         options: {
             appendTo: "body",
             autoRefresh: !0,
             distance: 0,
             filter: "*",
             tolerance: "touch"
         },
         _create: function () {
             var a = this;
             this.element.addClass("ui-selectable"), this.dragged = !1;
             var e;
             this.refresh = function () {
                 e = c(a.options.filter, a.element[0]), e.addClass("ui-selectee"), e.each(function () {
                     var f = c(this),
                         h = f.offset();
                     c.data(this, "selectable-item", {
                         element: this,
                         $element: f,
                         left: h.left,
                         top: h.top,
                         right: h.left + f.outerWidth(),
                         bottom: h.top + f.outerHeight(),
                         startselected: !1,
                         selected: f.hasClass("ui-selected"),
                         selecting: f.hasClass("ui-selecting"),
                         unselecting: f.hasClass("ui-unselecting")
                     })
                 })
             }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = c("<div class='ui-selectable-helper'></div>")
         },
         destroy: function () {
             return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
         },
         _mouseStart: function (a) {
             var e = this;
             this.opos = [a.pageX, a.pageY];
             if (this.options.disabled) {
                 return
             }
             var f = this.options;
             this.selectees = c(f.filter, this.element[0]), this._trigger("start", a), c(f.appendTo).append(this.helper), this.helper.css({
                 left: a.clientX,
                 top: a.clientY,
                 width: 0,
                 height: 0
             }), f.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                 var b = c.data(this, "selectable-item");
                 b.startselected = !0, !a.metaKey && !a.ctrlKey && (b.$element.removeClass("ui-selected"), b.selected = !1, b.$element.addClass("ui-unselecting"), b.unselecting = !0, e._trigger("unselecting", a, {
                     unselecting: b.element
                 }))
             }), c(a.target).parents().andSelf().each(function () {
                 var b = c.data(this, "selectable-item");
                 if (b) {
                     var h = !a.metaKey && !a.ctrlKey || !b.$element.hasClass("ui-selected");
                     return b.$element.removeClass(h ? "ui-unselecting" : "ui-selected").addClass(h ? "ui-selecting" : "ui-unselecting"), b.unselecting = !h, b.selecting = h, b.selected = h, h ? e._trigger("selecting", a, {
                         selecting: b.element
                     }) : e._trigger("unselecting", a, {
                         unselecting: b.element
                     }), !1
                 }
             })
         },
         _mouseDrag: function (a) {
             var j = this;
             this.dragged = !0;
             if (this.options.disabled) {
                 return
             }
             var k = this.options,
                 l = this.opos[0],
                 m = this.opos[1],
                 n = a.pageX,
                 o = a.pageY;
             if (l > n) {
                 var p = n;
                 n = l, l = p
             }
             if (m > o) {
                 var p = o;
                 o = m, m = p
             }
             return this.helper.css({
                 left: l,
                 top: m,
                 width: n - l,
                 height: o - m
             }), this.selectees.each(function () {
                 var b = c.data(this, "selectable-item");
                 if (!b || b.element == j.element[0]) {
                     return
                 }
                 var e = !1;
                 k.tolerance == "touch" ? e = !(b.left > n || b.right < l || b.top > o || b.bottom < m) : k.tolerance == "fit" && (e = b.left > l && b.right < n && b.top > m && b.bottom < o), e ? (b.selected && (b.$element.removeClass("ui-selected"), b.selected = !1), b.unselecting && (b.$element.removeClass("ui-unselecting"), b.unselecting = !1), b.selecting || (b.$element.addClass("ui-selecting"), b.selecting = !0, j._trigger("selecting", a, {
                     selecting: b.element
                 }))) : (b.selecting && ((a.metaKey || a.ctrlKey) && b.startselected ? (b.$element.removeClass("ui-selecting"), b.selecting = !1, b.$element.addClass("ui-selected"), b.selected = !0) : (b.$element.removeClass("ui-selecting"), b.selecting = !1, b.startselected && (b.$element.addClass("ui-unselecting"), b.unselecting = !0), j._trigger("unselecting", a, {
                     unselecting: b.element
                 }))), b.selected && !a.metaKey && !a.ctrlKey && !b.startselected && (b.$element.removeClass("ui-selected"), b.selected = !1, b.$element.addClass("ui-unselecting"), b.unselecting = !0, j._trigger("unselecting", a, {
                     unselecting: b.element
                 })))
             }), !1
         },
         _mouseStop: function (a) {
             var e = this;
             this.dragged = !1;
             var f = this.options;
             return c(".ui-unselecting", this.element[0]).each(function () {
                 var b = c.data(this, "selectable-item");
                 b.$element.removeClass("ui-unselecting"), b.unselecting = !1, b.startselected = !1, e._trigger("unselected", a, {
                     unselected: b.element
                 })
             }), c(".ui-selecting", this.element[0]).each(function () {
                 var b = c.data(this, "selectable-item");
                 b.$element.removeClass("ui-selecting").addClass("ui-selected"), b.selecting = !1, b.selected = !0, b.startselected = !0, e._trigger("selected", a, {
                     selected: b.element
                 })
             }), this._trigger("stop", a), this.helper.remove(), !1
         }
     }), c.extend(c.ui.selectable, {
         version: "1.8.21"
     })
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.sortable.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.widget("ui.sortable", c.ui.mouse, {
         widgetEventPrefix: "sort",
         ready: !1,
         options: {
             appendTo: "parent",
             axis: !1,
             connectWith: !1,
             containment: !1,
             cursor: "auto",
             cursorAt: !1,
             dropOnEmpty: !0,
             forcePlaceholderSize: !1,
             forceHelperSize: !1,
             grid: !1,
             handle: !1,
             helper: "original",
             items: "> *",
             opacity: !1,
             placeholder: !1,
             revert: !1,
             scroll: !0,
             scrollSensitivity: 20,
             scrollSpeed: 20,
             scope: "default",
             tolerance: "intersect",
             zIndex: 1000
         },
         _create: function () {
             var b = this.options;
             this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? b.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
         },
         destroy: function () {
             c.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
             for (var a = this.items.length - 1; a >= 0; a--) {
                 this.items[a].item.removeData(this.widgetName + "-item")
             }
             return this
         },
         _setOption: function (a, e) {
             a === "disabled" ? (this.options[a] = e, this.widget()[e ? "addClass" : "removeClass"]("ui-sortable-disabled")) : c.Widget.prototype._setOption.apply(this, arguments)
         },
         _mouseCapture: function (a, i) {
             var j = this;
             if (this.reverting) {
                 return !1
             }
             if (this.options.disabled || this.options.type == "static") {
                 return !1
             }
             this._refreshItems(a);
             var k = null,
                 l = this,
                 m = c(a.target).parents().each(function () {
                     if (c.data(this, j.widgetName + "-item") == l) {
                         return k = c(this), !1
                     }
                 });
             c.data(a.target, j.widgetName + "-item") == l && (k = c(a.target));
             if (!k) {
                 return !1
             }
             if (this.options.handle && !i) {
                 var n = !1;
                 c(this.options.handle, k).find("*").andSelf().each(function () {
                     this == a.target && (n = !0)
                 });
                 if (!n) {
                     return !1
                 }
             }
             return this.currentItem = k, this._removeCurrentsFromItems(), !0
         },
         _mouseStart: function (a, h, i) {
             var j = this.options,
                 k = this;
             this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(a), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                 top: this.offset.top - this.margins.top,
                 left: this.offset.left - this.margins.left
             }, c.extend(this.offset, {
                 click: {
                     left: a.pageX - this.offset.left,
                     top: a.pageY - this.offset.top
                 },
                 parent: this._getParentOffset(),
                 relative: this._getRelativeOffset()
             }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(a), this.originalPageX = a.pageX, this.originalPageY = a.pageY, j.cursorAt && this._adjustOffsetFromHelper(j.cursorAt), this.domPosition = {
                 prev: this.currentItem.prev()[0],
                 parent: this.currentItem.parent()[0]
             }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), j.containment && this._setContainment(), j.cursor && (c("body").css("cursor") && (this._storedCursor = c("body").css("cursor")), c("body").css("cursor", j.cursor)), j.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", j.opacity)), j.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", j.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", a, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
             if (!i) {
                 for (var l = this.containers.length - 1; l >= 0; l--) {
                     this.containers[l]._trigger("activate", a, k._uiHash(this))
                 }
             }
             return c.ui.ddmanager && (c.ui.ddmanager.current = this), c.ui.ddmanager && !j.dropBehaviour && c.ui.ddmanager.prepareOffsets(this, a), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(a), !0
         },
         _mouseDrag: function (a) {
             this.position = this._generatePosition(a), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
             if (this.options.scroll) {
                 var i = this.options,
                     j = !1;
                 this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - a.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop + i.scrollSpeed : a.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - a.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft + i.scrollSpeed : a.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (a.pageY - c(document).scrollTop() < i.scrollSensitivity ? j = c(document).scrollTop(c(document).scrollTop() - i.scrollSpeed) : c(window).height() - (a.pageY - c(document).scrollTop()) < i.scrollSensitivity && (j = c(document).scrollTop(c(document).scrollTop() + i.scrollSpeed)), a.pageX - c(document).scrollLeft() < i.scrollSensitivity ? j = c(document).scrollLeft(c(document).scrollLeft() - i.scrollSpeed) : c(window).width() - (a.pageX - c(document).scrollLeft()) < i.scrollSensitivity && (j = c(document).scrollLeft(c(document).scrollLeft() + i.scrollSpeed))), j !== !1 && c.ui.ddmanager && !i.dropBehaviour && c.ui.ddmanager.prepareOffsets(this, a)
             }
             this.positionAbs = this._convertPositionTo("absolute");
             if (!this.options.axis || this.options.axis != "y") {
                 this.helper[0].style.left = this.position.left + "px"
             }
             if (!this.options.axis || this.options.axis != "x") {
                 this.helper[0].style.top = this.position.top + "px"
             }
             for (var k = this.items.length - 1; k >= 0; k--) {
                 var l = this.items[k],
                     m = l.item[0],
                     n = this._intersectsWithPointer(l);
                 if (!n) {
                     continue
                 }
                 if (m != this.currentItem[0] && this.placeholder[n == 1 ? "next" : "prev"]()[0] != m && !c.ui.contains(this.placeholder[0], m) && (this.options.type == "semi-dynamic" ? !c.ui.contains(this.element[0], m) : !0)) {
                     this.direction = n == 1 ? "down" : "up";
                     if (this.options.tolerance == "pointer" || this._intersectsWithSides(l)) {
                         this._rearrange(a, l)
                     } else {
                         break
                     }
                     this._trigger("change", a, this._uiHash());
                     break
                 }
             }
             return this._contactContainers(a), c.ui.ddmanager && c.ui.ddmanager.drag(this, a), this._trigger("sort", a, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
         },
         _mouseStop: function (a, f) {
             if (!a) {
                 return
             }
             c.ui.ddmanager && !this.options.dropBehaviour && c.ui.ddmanager.drop(this, a);
             if (this.options.revert) {
                 var h = this,
                     i = h.placeholder.offset();
                 h.reverting = !0, c(this.helper).animate({
                     left: i.left - this.offset.parent.left - h.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                     top: i.top - this.offset.parent.top - h.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                 }, parseInt(this.options.revert, 10) || 500, function () {
                     h._clear(a)
                 })
             } else {
                 this._clear(a, f)
             }
             return !1
         },
         cancel: function () {
             var a = this;
             if (this.dragging) {
                 this._mouseUp({
                     target: null
                 }), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                 for (var e = this.containers.length - 1; e >= 0; e--) {
                     this.containers[e]._trigger("deactivate", null, a._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, a._uiHash(this)), this.containers[e].containerCache.over = 0)
                 }
             }
             return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), c.extend(this, {
                 helper: null,
                 dragging: !1,
                 reverting: !1,
                 _noFinalSort: null
             }), this.domPosition.prev ? c(this.domPosition.prev).after(this.currentItem) : c(this.domPosition.parent).prepend(this.currentItem)), this
         },
         serialize: function (a) {
             var e = this._getItemsAsjQuery(a && a.connected),
                 f = [];
             return a = a || {}, c(e).each(function () {
                 var b = (c(a.item || this).attr(a.attribute || "id") || "").match(a.expression || /(.+)[-=_](.+)/);
                 b && f.push((a.key || b[1] + "[]") + "=" + (a.key && a.expression ? b[1] : b[2]))
             }), !f.length && a.key && f.push(a.key + "="), f.join("&")
         },
         toArray: function (a) {
             var e = this._getItemsAsjQuery(a && a.connected),
                 f = [];
             return a = a || {}, e.each(function () {
                 f.push(c(a.item || this).attr(a.attribute || "id") || "")
             }), f
         },
         _intersectsWith: function (m) {
             var n = this.positionAbs.left,
                 o = n + this.helperProportions.width,
                 p = this.positionAbs.top,
                 q = p + this.helperProportions.height,
                 r = m.left,
                 s = r + m.width,
                 t = m.top,
                 u = t + m.height,
                 v = this.offset.click.top,
                 w = this.offset.click.left,
                 x = p + v > t && p + v < u && n + w > r && n + w < s;
             return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"] ? x : r < n + this.helperProportions.width / 2 && o - this.helperProportions.width / 2 < s && t < p + this.helperProportions.height / 2 && q - this.helperProportions.height / 2 < u
         },
         _intersectsWithPointer: function (a) {
             var h = this.options.axis === "x" || c.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
                 i = this.options.axis === "y" || c.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
                 j = h && i,
                 k = this._getDragVerticalDirection(),
                 l = this._getDragHorizontalDirection();
             return j ? this.floating ? l && l == "right" || k == "down" ? 2 : 1 : k && (k == "down" ? 2 : 1) : !1
         },
         _intersectsWithSides: function (a) {
             var h = c.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
                 i = c.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
                 j = this._getDragVerticalDirection(),
                 k = this._getDragHorizontalDirection();
             return this.floating && k ? k == "right" && i || k == "left" && !i : j && (j == "down" && h || j == "up" && !h)
         },
         _getDragVerticalDirection: function () {
             var b = this.positionAbs.top - this.lastPositionAbs.top;
             return b != 0 && (b > 0 ? "down" : "up")
         },
         _getDragHorizontalDirection: function () {
             var b = this.positionAbs.left - this.lastPositionAbs.left;
             return b != 0 && (b > 0 ? "right" : "left")
         },
         refresh: function (b) {
             return this._refreshItems(b), this.refreshPositions(), this
         },
         _connectWith: function () {
             var b = this.options;
             return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
         },
         _getItemsAsjQuery: function (a) {
             var k = this,
                 l = [],
                 m = [],
                 n = this._connectWith();
             if (n && a) {
                 for (var o = n.length - 1; o >= 0; o--) {
                     var p = c(n[o]);
                     for (var q = p.length - 1; q >= 0; q--) {
                         var r = c.data(p[q], this.widgetName);
                         r && r != this && !r.options.disabled && m.push([c.isFunction(r.options.items) ? r.options.items.call(r.element) : c(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r])
                     }
                 }
             }
             m.push([c.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                 options: this.options,
                 item: this.currentItem
             }) : c(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
             for (var o = m.length - 1; o >= 0; o--) {
                 m[o][0].each(function () {
                     l.push(this)
                 })
             }
             return c(l)
         },
         _removeCurrentsFromItems: function () {
             var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
             for (var f = 0; f < this.items.length; f++) {
                 for (var h = 0; h < e.length; h++) {
                     e[h] == this.items[f].item[0] && this.items.splice(f, 1)
                 }
             }
         },
         _refreshItems: function (a) {
             this.items = [], this.containers = [this];
             var o = this.items,
                 p = this,
                 q = [
                     [c.isFunction(this.options.items) ? this.options.items.call(this.element[0], a, {
                         item: this.currentItem
                     }) : c(this.options.items, this.element), this]
                 ],
                 r = this._connectWith();
             if (r && this.ready) {
                 for (var s = r.length - 1; s >= 0; s--) {
                     var t = c(r[s]);
                     for (var u = t.length - 1; u >= 0; u--) {
                         var v = c.data(t[u], this.widgetName);
                         v && v != this && !v.options.disabled && (q.push([c.isFunction(v.options.items) ? v.options.items.call(v.element[0], a, {
                             item: this.currentItem
                         }) : c(v.options.items, v.element), v]), this.containers.push(v))
                     }
                 }
             }
             for (var s = q.length - 1; s >= 0; s--) {
                 var w = q[s][1],
                     x = q[s][0];
                 for (var u = 0, y = x.length; u < y; u++) {
                     var z = c(x[u]);
                     z.data(this.widgetName + "-item", w), o.push({
                         item: z,
                         instance: w,
                         width: 0,
                         height: 0,
                         left: 0,
                         top: 0
                     })
                 }
             }
         },
         refreshPositions: function (a) {
             this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
             for (var h = this.items.length - 1; h >= 0; h--) {
                 var i = this.items[h];
                 if (i.instance != this.currentContainer && this.currentContainer && i.item[0] != this.currentItem[0]) {
                     continue
                 }
                 var j = this.options.toleranceElement ? c(this.options.toleranceElement, i.item) : i.item;
                 a || (i.width = j.outerWidth(), i.height = j.outerHeight());
                 var k = j.offset();
                 i.left = k.left, i.top = k.top
             }
             if (this.options.custom && this.options.custom.refreshContainers) {
                 this.options.custom.refreshContainers.call(this)
             } else {
                 for (var h = this.containers.length - 1; h >= 0; h--) {
                     var k = this.containers[h].element.offset();
                     this.containers[h].containerCache.left = k.left, this.containers[h].containerCache.top = k.top, this.containers[h].containerCache.width = this.containers[h].element.outerWidth(), this.containers[h].containerCache.height = this.containers[h].element.outerHeight()
                 }
             }
             return this
         },
         _createPlaceholder: function (a) {
             var f = a || this,
                 h = f.options;
             if (!h.placeholder || h.placeholder.constructor == String) {
                 var i = h.placeholder;
                 h.placeholder = {
                     element: function () {
                         var e = c(document.createElement(f.currentItem[0].nodeName)).addClass(i || f.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                         return i || (e.style.visibility = "hidden"), e
                     },
                     update: function (e, j) {
                         if (i && !h.forcePlaceholderSize) {
                             return
                         }
                         j.height() || j.height(f.currentItem.innerHeight() - parseInt(f.currentItem.css("paddingTop") || 0, 10) - parseInt(f.currentItem.css("paddingBottom") || 0, 10)), j.width() || j.width(f.currentItem.innerWidth() - parseInt(f.currentItem.css("paddingLeft") || 0, 10) - parseInt(f.currentItem.css("paddingRight") || 0, 10))
                     }
                 }
             }
             f.placeholder = c(h.placeholder.element.call(f.element, f.currentItem)), f.currentItem.after(f.placeholder), h.placeholder.update(f, f.placeholder)
         },
         _contactContainers: function (a) {
             var k = null,
                 l = null;
             for (var m = this.containers.length - 1; m >= 0; m--) {
                 if (c.ui.contains(this.currentItem[0], this.containers[m].element[0])) {
                     continue
                 }
                 if (this._intersectsWith(this.containers[m].containerCache)) {
                     if (k && c.ui.contains(this.containers[m].element[0], k.element[0])) {
                         continue
                     }
                     k = this.containers[m], l = m
                 } else {
                     this.containers[m].containerCache.over && (this.containers[m]._trigger("out", a, this._uiHash(this)), this.containers[m].containerCache.over = 0)
                 }
             }
             if (!k) {
                 return
             }
             if (this.containers.length === 1) {
                 this.containers[l]._trigger("over", a, this._uiHash(this)), this.containers[l].containerCache.over = 1
             } else {
                 if (this.currentContainer != this.containers[l]) {
                     var n = 10000,
                         o = null,
                         p = this.positionAbs[this.containers[l].floating ? "left" : "top"];
                     for (var q = this.items.length - 1; q >= 0; q--) {
                         if (!c.ui.contains(this.containers[l].element[0], this.items[q].item[0])) {
                             continue
                         }
                         var r = this.containers[l].floating ? this.items[q].item.offset().left : this.items[q].item.offset().top;
                         Math.abs(r - p) < n && (n = Math.abs(r - p), o = this.items[q], this.direction = r - p > 0 ? "down" : "up")
                     }
                     if (!o && !this.options.dropOnEmpty) {
                         return
                     }
                     this.currentContainer = this.containers[l], o ? this._rearrange(a, o, null, !0) : this._rearrange(a, null, this.containers[l].element, !0), this._trigger("change", a, this._uiHash()), this.containers[l]._trigger("change", a, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[l]._trigger("over", a, this._uiHash(this)), this.containers[l].containerCache.over = 1
                 }
             }
         },
         _createHelper: function (a) {
             var e = this.options,
                 f = c.isFunction(e.helper) ? c(e.helper.apply(this.element[0], [a, this.currentItem])) : e.helper == "clone" ? this.currentItem.clone() : this.currentItem;
             return f.parents("body").length || c(e.appendTo != "parent" ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(f[0]), f[0] == this.currentItem[0] && (this._storedCSS = {
                 width: this.currentItem[0].style.width,
                 height: this.currentItem[0].style.height,
                 position: this.currentItem.css("position"),
                 top: this.currentItem.css("top"),
                 left: this.currentItem.css("left")
             }), (f[0].style.width == "" || e.forceHelperSize) && f.width(this.currentItem.width()), (f[0].style.height == "" || e.forceHelperSize) && f.height(this.currentItem.height()), f
         },
         _adjustOffsetFromHelper: function (a) {
             typeof a == "string" && (a = a.split(" ")), c.isArray(a) && (a = {
                 left: +a[0],
                 top: +a[1] || 0
             }), "left" in a && (this.offset.click.left = a.left + this.margins.left), "right" in a && (this.offset.click.left = this.helperProportions.width - a.right + this.margins.left), "top" in a && (this.offset.click.top = a.top + this.margins.top), "bottom" in a && (this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top)
         },
         _getParentOffset: function () {
             this.offsetParent = this.helper.offsetParent();
             var a = this.offsetParent.offset();
             this.cssPosition == "absolute" && this.scrollParent[0] != document && c.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (a.left += this.scrollParent.scrollLeft(), a.top += this.scrollParent.scrollTop());
             if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && c.browser.msie) {
                 a = {
                     top: 0,
                     left: 0
                 }
             }
             return {
                 top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                 left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
             }
         },
         _getRelativeOffset: function () {
             if (this.cssPosition == "relative") {
                 var b = this.currentItem.position();
                 return {
                     top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                     left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                 }
             }
             return {
                 top: 0,
                 left: 0
             }
         },
         _cacheMargins: function () {
             this.margins = {
                 left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                 top: parseInt(this.currentItem.css("marginTop"), 10) || 0
             }
         },
         _cacheHelperProportions: function () {
             this.helperProportions = {
                 width: this.helper.outerWidth(),
                 height: this.helper.outerHeight()
             }
         },
         _setContainment: function () {
             var a = this.options;
             a.containment == "parent" && (a.containment = this.helper[0].parentNode);
             if (a.containment == "document" || a.containment == "window") {
                 this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, c(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (c(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
             }
             if (!/^(document|window|parent)$/.test(a.containment)) {
                 var f = c(a.containment)[0],
                     h = c(a.containment).offset(),
                     i = c(f).css("overflow") != "hidden";
                 this.containment = [h.left + (parseInt(c(f).css("borderLeftWidth"), 10) || 0) + (parseInt(c(f).css("paddingLeft"), 10) || 0) - this.margins.left, h.top + (parseInt(c(f).css("borderTopWidth"), 10) || 0) + (parseInt(c(f).css("paddingTop"), 10) || 0) - this.margins.top, h.left + (i ? Math.max(f.scrollWidth, f.offsetWidth) : f.offsetWidth) - (parseInt(c(f).css("borderLeftWidth"), 10) || 0) - (parseInt(c(f).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, h.top + (i ? Math.max(f.scrollHeight, f.offsetHeight) : f.offsetHeight) - (parseInt(c(f).css("borderTopWidth"), 10) || 0) - (parseInt(c(f).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
             }
         },
         _convertPositionTo: function (a, h) {
             h || (h = this.position);
             var i = a == "absolute" ? 1 : -1,
                 j = this.options,
                 k = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !c.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                 l = /(html|body)/i.test(k[0].tagName);
             return {
                 top: h.top + this.offset.relative.top * i + this.offset.parent.top * i - (c.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : l ? 0 : k.scrollTop()) * i),
                 left: h.left + this.offset.relative.left * i + this.offset.parent.left * i - (c.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : l ? 0 : k.scrollLeft()) * i)
             }
         },
         _generatePosition: function (a) {
             var j = this.options,
                 k = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !c.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                 l = /(html|body)/i.test(k[0].tagName);
             this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
             var m = a.pageX,
                 n = a.pageY;
             if (this.originalPosition) {
                 this.containment && (a.pageX - this.offset.click.left < this.containment[0] && (m = this.containment[0] + this.offset.click.left), a.pageY - this.offset.click.top < this.containment[1] && (n = this.containment[1] + this.offset.click.top), a.pageX - this.offset.click.left > this.containment[2] && (m = this.containment[2] + this.offset.click.left), a.pageY - this.offset.click.top > this.containment[3] && (n = this.containment[3] + this.offset.click.top));
                 if (j.grid) {
                     var o = this.originalPageY + Math.round((n - this.originalPageY) / j.grid[1]) * j.grid[1];
                     n = this.containment ? o - this.offset.click.top < this.containment[1] || o - this.offset.click.top > this.containment[3] ? o - this.offset.click.top < this.containment[1] ? o + j.grid[1] : o - j.grid[1] : o : o;
                     var p = this.originalPageX + Math.round((m - this.originalPageX) / j.grid[0]) * j.grid[0];
                     m = this.containment ? p - this.offset.click.left < this.containment[0] || p - this.offset.click.left > this.containment[2] ? p - this.offset.click.left < this.containment[0] ? p + j.grid[0] : p - j.grid[0] : p : p
                 }
             }
             return {
                 top: n - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (c.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : l ? 0 : k.scrollTop()),
                 left: m - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (c.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : l ? 0 : k.scrollLeft())
             }
         },
         _rearrange: function (h, i, j, k) {
             j ? j[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? i.item[0] : i.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
             var l = this,
                 m = this.counter;
             window.setTimeout(function () {
                 m == l.counter && l.refreshPositions(!k)
             }, 0)
         },
         _clear: function (a, h) {
             this.reverting = !1;
             var i = [],
                 j = this;
             !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
             if (this.helper[0] == this.currentItem[0]) {
                 for (var k in this._storedCSS) {
                     if (this._storedCSS[k] == "auto" || this._storedCSS[k] == "static") {
                         this._storedCSS[k] = ""
                     }
                 }
                 this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
             } else {
                 this.currentItem.show()
             }
             this.fromOutside && !h && i.push(function (b) {
                 this._trigger("receive", b, this._uiHash(this.fromOutside))
             }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !h && i.push(function (b) {
                 this._trigger("update", b, this._uiHash())
             });
             if (!c.ui.contains(this.element[0], this.currentItem[0])) {
                 h || i.push(function (b) {
                     this._trigger("remove", b, this._uiHash())
                 });
                 for (var k = this.containers.length - 1; k >= 0; k--) {
                     c.ui.contains(this.containers[k].element[0], this.currentItem[0]) && !h && (i.push(function (b) {
                         return function (e) {
                             b._trigger("receive", e, this._uiHash(this))
                         }
                     }.call(this, this.containers[k])), i.push(function (b) {
                         return function (e) {
                             b._trigger("update", e, this._uiHash(this))
                         }
                     }.call(this, this.containers[k])))
                 }
             }
             for (var k = this.containers.length - 1; k >= 0; k--) {
                 h || i.push(function (b) {
                     return function (e) {
                         b._trigger("deactivate", e, this._uiHash(this))
                     }
                 }.call(this, this.containers[k])), this.containers[k].containerCache.over && (i.push(function (b) {
                     return function (e) {
                         b._trigger("out", e, this._uiHash(this))
                     }
                 }.call(this, this.containers[k])), this.containers[k].containerCache.over = 0)
             }
             this._storedCursor && c("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
             if (this.cancelHelperRemoval) {
                 if (!h) {
                     this._trigger("beforeStop", a, this._uiHash());
                     for (var k = 0; k < i.length; k++) {
                         i[k].call(this, a)
                     }
                     this._trigger("stop", a, this._uiHash())
                 }
                 return !1
             }
             h || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
             if (!h) {
                 for (var k = 0; k < i.length; k++) {
                     i[k].call(this, a)
                 }
                 this._trigger("stop", a, this._uiHash())
             }
             return this.fromOutside = !1, !0
         },
         _trigger: function () {
             c.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
         },
         _uiHash: function (a) {
             var e = a || this;
             return {
                 helper: e.helper,
                 placeholder: e.placeholder || c([]),
                 position: e.position,
                 originalPosition: e.originalPosition,
                 offset: e.positionAbs,
                 item: e.currentItem,
                 sender: a ? a.element : null
             }
         }
     }), c.extend(c.ui.sortable, {
         version: "1.8.21"
     })
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.ui.autocomplete.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (d, e) {
     var f = 0;
     d.widget("ui.autocomplete", {
         options: {
             appendTo: "body",
             autoFocus: !1,
             delay: 300,
             minLength: 1,
             position: {
                 my: "left top",
                 at: "left bottom",
                 collision: "none"
             },
             source: null
         },
         pending: 0,
         _create: function () {
             var a = this,
                 h = this.element[0].ownerDocument,
                 i;
             this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                 role: "textbox",
                 "aria-autocomplete": "list",
                 "aria-haspopup": "true"
             }).bind("keydown.autocomplete", function (b) {
                 if (a.options.disabled || a.element.propAttr("readOnly")) {
                     return
                 }
                 i = !1;
                 var j = d.ui.keyCode;
                 switch (b.keyCode) {
                 case j.PAGE_UP:
                     a._move("previousPage", b);
                     break;
                 case j.PAGE_DOWN:
                     a._move("nextPage", b);
                     break;
                 case j.UP:
                     a._keyEvent("previous", b);
                     break;
                 case j.DOWN:
                     a._keyEvent("next", b);
                     break;
                 case j.ENTER:
                 case j.NUMPAD_ENTER:
                     a.menu.active && (i = !0, b.preventDefault());
                 case j.TAB:
                     if (!a.menu.active) {
                         return
                     }
                     a.menu.select(b);
                     break;
                 case j.ESCAPE:
                     a.element.val(a.term), a.close(b);
                     break;
                 default:
                     clearTimeout(a.searching), a.searching = setTimeout(function () {
                         a.term != a.element.val() && (a.selectedItem = null, a.search(null, b))
                     }, a.options.delay)
                 }
             }).bind("keypress.autocomplete", function (b) {
                 i && (i = !1, b.preventDefault())
             }).bind("focus.autocomplete", function () {
                 if (a.options.disabled) {
                     return
                 }
                 a.selectedItem = null, a.previous = a.element.val()
             }).bind("blur.autocomplete", function (b) {
                 if (a.options.disabled) {
                     return
                 }
                 clearTimeout(a.searching), a.closing = setTimeout(function () {
                     a.close(b), a._change(b)
                 }, 150)
             }), this._initSource(), this.menu = d("<ul></ul>").addClass("ui-autocomplete").appendTo(d(this.options.appendTo || "body", h)[0]).mousedown(function (b) {
                 var j = a.menu.element[0];
                 d(b.target).closest(".ui-menu-item").length || setTimeout(function () {
                     d(document).one("mousedown", function (k) {
                         k.target !== a.element[0] && k.target !== j && !d.ui.contains(j, k.target) && a.close()
                     })
                 }, 1), setTimeout(function () {
                     clearTimeout(a.closing)
                 }, 13)
             }).menu({
                 focus: function (b, j) {
                     var k = j.item.data("item.autocomplete");
                     !1 !== a._trigger("focus", b, {
                         item: k
                     }) && /^key/.test(b.originalEvent.type) && a.element.val(k.value)
                 },
                 selected: function (b, c) {
                     var j = c.item.data("item.autocomplete"),
                         k = a.previous;
                     a.element[0] !== h.activeElement && (a.element.focus(), a.previous = k, setTimeout(function () {
                         a.previous = k, a.selectedItem = j
                     }, 1)), !1 !== a._trigger("select", b, {
                         item: j
                     }) && a.element.val(j.value), a.term = a.element.val(), a.close(b), a.selectedItem = j
                 },
                 blur: function (b, j) {
                     a.menu.element.is(":visible") && a.element.val() !== a.term && a.element.val(a.term)
                 }
             }).zIndex(this.element.zIndex() + 1).css({
                 top: 0,
                 left: 0
             }).hide().data("menu"), d.fn.bgiframe && this.menu.element.bgiframe(), a.beforeunloadHandler = function () {
                 a.element.removeAttr("autocomplete")
             }, d(window).bind("beforeunload", a.beforeunloadHandler)
         },
         destroy: function () {
             this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), d(window).unbind("beforeunload", this.beforeunloadHandler), d.Widget.prototype.destroy.call(this)
         },
         _setOption: function (a, h) {
             d.Widget.prototype._setOption.apply(this, arguments), a === "source" && this._initSource(), a === "appendTo" && this.menu.element.appendTo(d(h || "body", this.element[0].ownerDocument)[0]), a === "disabled" && h && this.xhr && this.xhr.abort()
         },
         _initSource: function () {
             var a = this,
                 h, i;
             d.isArray(this.options.source) ? (h = this.options.source, this.source = function (c, j) {
                 j(d.ui.autocomplete.filter(h, c.term))
             }) : typeof this.options.source == "string" ? (i = this.options.source, this.source = function (b, j) {
                 a.xhr && a.xhr.abort(), a.xhr = d.ajax({
                     url: i,
                     data: b,
                     dataType: "json",
                     success: function (c, k) {
                         j(c)
                     },
                     error: function () {
                         j([])
                     }
                 })
             }) : this.source = this.options.source
         },
         search: function (c, h) {
             c = c != null ? c : this.element.val(), this.term = this.element.val();
             if (c.length < this.options.minLength) {
                 return this.close(h)
             }
             clearTimeout(this.closing);
             if (this._trigger("search", h) === !1) {
                 return
             }
             return this._search(c)
         },
         _search: function (b) {
             this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                 term: b
             }, this._response())
         },
         _response: function () {
             var c = this,
                 h = ++f;
             return function (a) {
                 h === f && c.__response(a), c.pending--, c.pending || c.element.removeClass("ui-autocomplete-loading")
             }
         },
         __response: function (b) {
             !this.options.disabled && b && b.length ? (b = this._normalize(b), this._suggest(b), this._trigger("open")) : this.close()
         },
         close: function (b) {
             clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", b))
         },
         _change: function (b) {
             this.previous !== this.element.val() && this._trigger("change", b, {
                 item: this.selectedItem
             })
         },
         _normalize: function (a) {
             return a.length && a[0].label && a[0].value ? a : d.map(a, function (c) {
                 return typeof c == "string" ? {
                     label: c,
                     value: c
                 } : d.extend({
                     label: c.label || c.value,
                     value: c.value || c.label
                 }, c)
             })
         },
         _suggest: function (a) {
             var h = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
             this._renderMenu(h, a), this.menu.deactivate(), this.menu.refresh(), h.show(), this._resizeMenu(), h.position(d.extend({
                 of: this.element
             }, this.options.position)), this.options.autoFocus && this.menu.next(new d.Event("mouseover"))
         },
         _resizeMenu: function () {
             var b = this.menu.element;
             b.outerWidth(Math.max(b.width("").outerWidth() + 1, this.element.outerWidth()))
         },
         _renderMenu: function (a, h) {
             var i = this;
             d.each(h, function (b, j) {
                 i._renderItem(a, j)
             })
         },
         _renderItem: function (a, h) {
             return d("<li></li>").data("item.autocomplete", h).append(d("<a></a>").text(h.label)).appendTo(a)
         },
         _move: function (c, h) {
             if (!this.menu.element.is(":visible")) {
                 this.search(null, h);
                 return
             }
             if (this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
                 this.element.val(this.term), this.menu.deactivate();
                 return
             }
             this.menu[c](h)
         },
         widget: function () {
             return this.menu.element
         },
         _keyEvent: function (c, h) {
             if (!this.isMultiLine || this.menu.element.is(":visible")) {
                 this._move(c, h), h.preventDefault()
             }
         }
     }), d.extend(d.ui.autocomplete, {
         escapeRegex: function (b) {
             return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
         },
         filter: function (a, h) {
             var i = new RegExp(d.ui.autocomplete.escapeRegex(h), "i");
             return d.grep(a, function (b) {
                 return i.test(b.label || b.value || b)
             })
         }
     })
 })(jQuery),
 function (b) {
     b.widget("ui.menu", {
         _create: function () {
             var a = this;
             this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                 role: "listbox",
                 "aria-activedescendant": "ui-active-menuitem"
             }).click(function (d) {
                 if (!b(d.target).closest(".ui-menu-item a").length) {
                     return
                 }
                 d.preventDefault(), a.select(d)
             }), this.refresh()
         },
         refresh: function () {
             var a = this,
                 d = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
             d.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (e) {
                 a.activate(e, b(this).parent())
             }).mouseleave(function () {
                 a.deactivate()
             })
         },
         activate: function (f, h) {
             this.deactivate();
             if (this.hasScroll()) {
                 var i = h.offset().top - this.element.offset().top,
                     j = this.element.scrollTop(),
                     k = this.element.height();
                 i < 0 ? this.element.scrollTop(j + i) : i >= k && this.element.scrollTop(j + i - k + h.height())
             }
             this.active = h.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", f, {
                 item: h
             })
         },
         deactivate: function () {
             if (!this.active) {
                 return
             }
             this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null
         },
         next: function (c) {
             this.move("next", ".ui-menu-item:first", c)
         },
         previous: function (c) {
             this.move("prev", ".ui-menu-item:last", c)
         },
         first: function () {
             return this.active && !this.active.prevAll(".ui-menu-item").length
         },
         last: function () {
             return this.active && !this.active.nextAll(".ui-menu-item").length
         },
         move: function (e, f, h) {
             if (!this.active) {
                 this.activate(h, this.element.children(f));
                 return
             }
             var i = this.active[e + "All"](".ui-menu-item").eq(0);
             i.length ? this.activate(h, i) : this.activate(h, this.element.children(f))
         },
         nextPage: function (a) {
             if (this.hasScroll()) {
                 if (!this.active || this.last()) {
                     this.activate(a, this.element.children(".ui-menu-item:first"));
                     return
                 }
                 var f = this.active.offset().top,
                     h = this.element.height(),
                     i = this.element.children(".ui-menu-item").filter(function () {
                         var c = b(this).offset().top - f - h + b(this).height();
                         return c < 10 && c > -10
                     });
                 i.length || (i = this.element.children(".ui-menu-item:last")), this.activate(a, i)
             } else {
                 this.activate(a, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
             }
         },
         previousPage: function (a) {
             if (this.hasScroll()) {
                 if (!this.active || this.first()) {
                     this.activate(a, this.element.children(".ui-menu-item:last"));
                     return
                 }
                 var f = this.active.offset().top,
                     h = this.element.height(),
                     i = this.element.children(".ui-menu-item").filter(function () {
                         var c = b(this).offset().top - f + h - b(this).height();
                         return c < 10 && c > -10
                     });
                 i.length || (i = this.element.children(".ui-menu-item:first")), this.activate(a, i)
             } else {
                 this.activate(a, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
             }
         },
         hasScroll: function () {
             return this.element.height() < this.element[b.fn.prop ? "prop" : "attr"]("scrollHeight")
         },
         select: function (c) {
             this._trigger("selected", c, {
                 item: this.active
             })
         }
     })
 }(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.core.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 jQuery.effects || function (m, n) {
     function o(a) {
         var d;
         return a && a.constructor == Array && a.length == 3 ? a : (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) ? [parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)] : (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a)) ? [parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55] : (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) ? [parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)] : (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a)) ? [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)] : (d = /rgba\(0, 0, 0, 0\)/.exec(a)) ? q.transparent : q[m.trim(a).toLowerCase()]
     }

     function p(a, c) {
         var f;
         do {
             f = m.curCSS(a, c);
             if (f != "" && f != "transparent" || m.nodeName(a, "body")) {
                 break
             }
             c = "backgroundColor"
         } while (a = a.parentNode);
         return o(f)
     }

     function t() {
         var f = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
             h = {},
             i, j;
         if (f && f.length && f[0] && f[f[0]]) {
             var k = f.length;
             while (k--) {
                 i = f[k], typeof f[i] == "string" && (j = i.replace(/\-(\w)/g, function (c, d) {
                     return d.toUpperCase()
                 }), h[j] = f[i])
             }
         } else {
             for (i in f) {
                 typeof f[i] == "string" && (h[i] = f[i])
             }
         }
         return h
     }

     function u(a) {
         var e, f;
         for (e in a) {
             f = a[e], (f == null || m.isFunction(f) || e in s || /scrollbar/.test(e) || !/color/i.test(e) && isNaN(parseFloat(f))) && delete a[e]
         }
         return a
     }

     function v(e, f) {
         var h = {
                 _: 0
             },
             i;
         for (i in f) {
             e[i] != f[i] && (h[i] = f[i])
         }
         return h
     }

     function w(a, f, h, i) {
         typeof a == "object" && (i = f, h = null, f = a, a = f.effect), m.isFunction(f) && (i = f, h = null, f = {});
         if (typeof f == "number" || m.fx.speeds[f]) {
             i = h, h = f, f = {}
         }
         return m.isFunction(h) && (i = h, h = null), f = f || {}, h = h || f.duration, h = m.fx.off ? 0 : typeof h == "number" ? h : h in m.fx.speeds ? m.fx.speeds[h] : m.fx.speeds._default, i = i || f.complete, [a, f, h, i]
     }

     function x(a) {
         return !a || typeof a == "number" || m.fx.speeds[a] ? !0 : typeof a == "string" && !m.effects[a] ? !0 : !1
     }
     m.effects = {}, m.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (a, c) {
         m.fx.step[c] = function (b) {
             b.colorInit || (b.start = p(b.elem, c), b.end = o(b.end), b.colorInit = !0), b.elem.style[c] = "rgb(" + Math.max(Math.min(parseInt(b.pos * (b.end[0] - b.start[0]) + b.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[1] - b.start[1]) + b.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[2] - b.start[2]) + b.start[2], 10), 255), 0) + ")"
         }
     });
     var q = {
             aqua: [0, 255, 255],
             azure: [240, 255, 255],
             beige: [245, 245, 220],
             black: [0, 0, 0],
             blue: [0, 0, 255],
             brown: [165, 42, 42],
             cyan: [0, 255, 255],
             darkblue: [0, 0, 139],
             darkcyan: [0, 139, 139],
             darkgrey: [169, 169, 169],
             darkgreen: [0, 100, 0],
             darkkhaki: [189, 183, 107],
             darkmagenta: [139, 0, 139],
             darkolivegreen: [85, 107, 47],
             darkorange: [255, 140, 0],
             darkorchid: [153, 50, 204],
             darkred: [139, 0, 0],
             darksalmon: [233, 150, 122],
             darkviolet: [148, 0, 211],
             fuchsia: [255, 0, 255],
             gold: [255, 215, 0],
             green: [0, 128, 0],
             indigo: [75, 0, 130],
             khaki: [240, 230, 140],
             lightblue: [173, 216, 230],
             lightcyan: [224, 255, 255],
             lightgreen: [144, 238, 144],
             lightgrey: [211, 211, 211],
             lightpink: [255, 182, 193],
             lightyellow: [255, 255, 224],
             lime: [0, 255, 0],
             magenta: [255, 0, 255],
             maroon: [128, 0, 0],
             navy: [0, 0, 128],
             olive: [128, 128, 0],
             orange: [255, 165, 0],
             pink: [255, 192, 203],
             purple: [128, 0, 128],
             violet: [128, 0, 128],
             red: [255, 0, 0],
             silver: [192, 192, 192],
             white: [255, 255, 255],
             yellow: [255, 255, 0],
             transparent: [255, 255, 255]
         },
         r = ["add", "remove", "toggle"],
         s = {
             border: 1,
             borderBottom: 1,
             borderColor: 1,
             borderLeft: 1,
             borderRight: 1,
             borderTop: 1,
             borderWidth: 1,
             margin: 1,
             padding: 1
         };
     m.effects.animateClass = function (a, f, h, i) {
         return m.isFunction(h) && (i = h, h = null), this.queue(function () {
             var b = m(this),
                 c = b.attr("style") || " ",
                 d = u(t.call(this)),
                 e, j = b.attr("class") || "";
             m.each(r, function (k, l) {
                 a[l] && b[l + "Class"](a[l])
             }), e = u(t.call(this)), b.attr("class", j), b.animate(v(d, e), {
                 queue: !1,
                 duration: f,
                 easing: h,
                 complete: function () {
                     m.each(r, function (k, l) {
                         a[l] && b[l + "Class"](a[l])
                     }), typeof b.attr("style") == "object" ? (b.attr("style").cssText = "", b.attr("style").cssText = c) : b.attr("style", c), i && i.apply(this, arguments), m.dequeue(this)
                 }
             })
         })
     }, m.fn.extend({
         _addClass: m.fn.addClass,
         addClass: function (a, f, h, i) {
             return f ? m.effects.animateClass.apply(this, [{
                     add: a
                 },
                 f, h, i
             ]) : this._addClass(a)
         },
         _removeClass: m.fn.removeClass,
         removeClass: function (a, f, h, i) {
             return f ? m.effects.animateClass.apply(this, [{
                     remove: a
                 },
                 f, h, i
             ]) : this._removeClass(a)
         },
         _toggleClass: m.fn.toggleClass,
         toggleClass: function (a, b, h, i, j) {
             return typeof b == "boolean" || b === n ? h ? m.effects.animateClass.apply(this, [b ? {
                     add: a
                 } : {
                     remove: a
                 },
                 h, i, j
             ]) : this._toggleClass(a, b) : m.effects.animateClass.apply(this, [{
                     toggle: a
                 },
                 b, h, i
             ])
         },
         switchClass: function (a, h, i, j, k) {
             return m.effects.animateClass.apply(this, [{
                     add: h,
                     remove: a
                 },
                 i, j, k
             ])
         }
     }), m.extend(m.effects, {
         version: "1.8.21",
         save: function (d, e) {
             for (var f = 0; f < e.length; f++) {
                 e[f] !== null && d.data("ec.storage." + e[f], d[0].style[e[f]])
             }
         },
         restore: function (d, e) {
             for (var f = 0; f < e.length; f++) {
                 e[f] !== null && d.css(e[f], d.data("ec.storage." + e[f]))
             }
         },
         setMode: function (c, d) {
             return d == "toggle" && (d = c.is(":hidden") ? "show" : "hide"), d
         },
         getBaseline: function (e, f) {
             var h, i;
             switch (e[0]) {
             case "top":
                 h = 0;
                 break;
             case "middle":
                 h = 0.5;
                 break;
             case "bottom":
                 h = 1;
                 break;
             default:
                 h = e[0] / f.height
             }
             switch (e[1]) {
             case "left":
                 i = 0;
                 break;
             case "center":
                 i = 0.5;
                 break;
             case "right":
                 i = 1;
                 break;
             default:
                 i = e[1] / f.width
             }
             return {
                 x: i,
                 y: h
             }
         },
         createWrapper: function (a) {
             if (a.parent().is(".ui-effects-wrapper")) {
                 return a.parent()
             }
             var h = {
                     width: a.outerWidth(!0),
                     height: a.outerHeight(!0),
                     "float": a.css("float")
                 },
                 i = m("<div></div>").addClass("ui-effects-wrapper").css({
                     fontSize: "100%",
                     background: "transparent",
                     border: "none",
                     margin: 0,
                     padding: 0
                 }),
                 j = document.activeElement;
             try {
                 j.id
             } catch (k) {
                 j = document.body
             }
             return a.wrap(i), (a[0] === j || m.contains(a[0], j)) && m(j).focus(), i = a.parent(), a.css("position") == "static" ? (i.css({
                 position: "relative"
             }), a.css({
                 position: "relative"
             })) : (m.extend(h, {
                 position: a.css("position"),
                 zIndex: a.css("z-index")
             }), m.each(["top", "left", "bottom", "right"], function (b, c) {
                 h[c] = a.css(c), isNaN(parseInt(h[c], 10)) && (h[c] = "auto")
             }), a.css({
                 position: "relative",
                 top: 0,
                 left: 0,
                 right: "auto",
                 bottom: "auto"
             })), i.css(h).show()
         },
         removeWrapper: function (a) {
             var e, f = document.activeElement;
             return a.parent().is(".ui-effects-wrapper") ? (e = a.parent().replaceWith(a), (a[0] === f || m.contains(a[0], f)) && m(f).focus(), e) : a
         },
         setTransition: function (a, f, h, i) {
             return i = i || {}, m.each(f, function (b, d) {
                 var e = a.cssUnit(d);
                 e[0] > 0 && (i[d] = e[0] * h + e[1])
             }), i
         }
     }), m.fn.extend({
         effect: function (a, j, k, l) {
             var y = w.apply(this, arguments),
                 z = {
                     options: y[1],
                     duration: y[2],
                     callback: y[3]
                 },
                 A = z.options.mode,
                 B = m.effects[a];
             return m.fx.off || !B ? A ? this[A](z.duration, z.callback) : this.each(function () {
                 z.callback && z.callback.call(this)
             }) : B.call(this, z)
         },
         _show: m.fn.show,
         show: function (c) {
             if (x(c)) {
                 return this._show.apply(this, arguments)
             }
             var d = w.apply(this, arguments);
             return d[1].mode = "show", this.effect.apply(this, d)
         },
         _hide: m.fn.hide,
         hide: function (c) {
             if (x(c)) {
                 return this._hide.apply(this, arguments)
             }
             var d = w.apply(this, arguments);
             return d[1].mode = "hide", this.effect.apply(this, d)
         },
         __toggle: m.fn.toggle,
         toggle: function (a) {
             if (x(a) || typeof a == "boolean" || m.isFunction(a)) {
                 return this.__toggle.apply(this, arguments)
             }
             var d = w.apply(this, arguments);
             return d[1].mode = "toggle", this.effect.apply(this, d)
         },
         cssUnit: function (a) {
             var e = this.css(a),
                 f = [];
             return m.each(["em", "px", "%", "pt"], function (c, d) {
                 e.indexOf(d) > 0 && (f = [parseFloat(e), d])
             }), f
         }
     }), m.easing.jswing = m.easing.swing, m.extend(m.easing, {
         def: "easeOutQuad",
         swing: function (a, h, i, j, k) {
             return m.easing[m.easing.def](a, h, i, j, k)
         },
         easeInQuad: function (f, h, i, j, k) {
             return j * (h /= k) * h + i
         },
         easeOutQuad: function (f, h, i, j, k) {
             return -j * (h /= k) * (h - 2) + i
         },
         easeInOutQuad: function (f, h, i, j, k) {
             return (h /= k / 2) < 1 ? j / 2 * h * h + i : -j / 2 * (--h * (h - 2) - 1) + i
         },
         easeInCubic: function (f, h, i, j, k) {
             return j * (h /= k) * h * h + i
         },
         easeOutCubic: function (f, h, i, j, k) {
             return j * ((h = h / k - 1) * h * h + 1) + i
         },
         easeInOutCubic: function (f, h, i, j, k) {
             return (h /= k / 2) < 1 ? j / 2 * h * h * h + i : j / 2 * ((h -= 2) * h * h + 2) + i
         },
         easeInQuart: function (f, h, i, j, k) {
             return j * (h /= k) * h * h * h + i
         },
         easeOutQuart: function (f, h, i, j, k) {
             return -j * ((h = h / k - 1) * h * h * h - 1) + i
         },
         easeInOutQuart: function (f, h, i, j, k) {
             return (h /= k / 2) < 1 ? j / 2 * h * h * h * h + i : -j / 2 * ((h -= 2) * h * h * h - 2) + i
         },
         easeInQuint: function (f, h, i, j, k) {
             return j * (h /= k) * h * h * h * h + i
         },
         easeOutQuint: function (f, h, i, j, k) {
             return j * ((h = h / k - 1) * h * h * h * h + 1) + i
         },
         easeInOutQuint: function (f, h, i, j, k) {
             return (h /= k / 2) < 1 ? j / 2 * h * h * h * h * h + i : j / 2 * ((h -= 2) * h * h * h * h + 2) + i
         },
         easeInSine: function (f, h, i, j, k) {
             return -j * Math.cos(h / k * (Math.PI / 2)) + j + i
         },
         easeOutSine: function (f, h, i, j, k) {
             return j * Math.sin(h / k * (Math.PI / 2)) + i
         },
         easeInOutSine: function (f, h, i, j, k) {
             return -j / 2 * (Math.cos(Math.PI * h / k) - 1) + i
         },
         easeInExpo: function (f, h, i, j, k) {
             return h == 0 ? i : j * Math.pow(2, 10 * (h / k - 1)) + i
         },
         easeOutExpo: function (f, h, i, j, k) {
             return h == k ? i + j : j * (-Math.pow(2, -10 * h / k) + 1) + i
         },
         easeInOutExpo: function (f, h, i, j, k) {
             return h == 0 ? i : h == k ? i + j : (h /= k / 2) < 1 ? j / 2 * Math.pow(2, 10 * (h - 1)) + i : j / 2 * (-Math.pow(2, -10 * --h) + 2) + i
         },
         easeInCirc: function (f, h, i, j, k) {
             return -j * (Math.sqrt(1 - (h /= k) * h) - 1) + i
         },
         easeOutCirc: function (f, h, i, j, k) {
             return j * Math.sqrt(1 - (h = h / k - 1) * h) + i
         },
         easeInOutCirc: function (f, h, i, j, k) {
             return (h /= k / 2) < 1 ? -j / 2 * (Math.sqrt(1 - h * h) - 1) + i : j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + i
         },
         easeInElastic: function (i, j, k, l, y) {
             var z = 1.70158,
                 A = 0,
                 B = l;
             if (j == 0) {
                 return k
             }
             if ((j /= y) == 1) {
                 return k + l
             }
             A || (A = y * 0.3);
             if (B < Math.abs(l)) {
                 B = l;
                 var z = A / 4
             } else {
                 var z = A / (2 * Math.PI) * Math.asin(l / B)
             }
             return -(B * Math.pow(2, 10 * (j -= 1)) * Math.sin((j * y - z) * 2 * Math.PI / A)) + k
         },
         easeOutElastic: function (i, j, k, l, y) {
             var z = 1.70158,
                 A = 0,
                 B = l;
             if (j == 0) {
                 return k
             }
             if ((j /= y) == 1) {
                 return k + l
             }
             A || (A = y * 0.3);
             if (B < Math.abs(l)) {
                 B = l;
                 var z = A / 4
             } else {
                 var z = A / (2 * Math.PI) * Math.asin(l / B)
             }
             return B * Math.pow(2, -10 * j) * Math.sin((j * y - z) * 2 * Math.PI / A) + l + k
         },
         easeInOutElastic: function (i, j, k, l, y) {
             var z = 1.70158,
                 A = 0,
                 B = l;
             if (j == 0) {
                 return k
             }
             if ((j /= y / 2) == 2) {
                 return k + l
             }
             A || (A = y * 0.3 * 1.5);
             if (B < Math.abs(l)) {
                 B = l;
                 var z = A / 4
             } else {
                 var z = A / (2 * Math.PI) * Math.asin(l / B)
             }
             return j < 1 ? -0.5 * B * Math.pow(2, 10 * (j -= 1)) * Math.sin((j * y - z) * 2 * Math.PI / A) + k : B * Math.pow(2, -10 * (j -= 1)) * Math.sin((j * y - z) * 2 * Math.PI / A) * 0.5 + l + k
         },
         easeInBack: function (b, h, i, j, k, l) {
             return l == n && (l = 1.70158), j * (h /= k) * h * ((l + 1) * h - l) + i
         },
         easeOutBack: function (b, h, i, j, k, l) {
             return l == n && (l = 1.70158), j * ((h = h / k - 1) * h * ((l + 1) * h + l) + 1) + i
         },
         easeInOutBack: function (b, h, i, j, k, l) {
             return l == n && (l = 1.70158), (h /= k / 2) < 1 ? j / 2 * h * h * (((l *= 1.525) + 1) * h - l) + i : j / 2 * ((h -= 2) * h * (((l *= 1.525) + 1) * h + l) + 2) + i
         },
         easeInBounce: function (a, h, i, j, k) {
             return j - m.easing.easeOutBounce(a, k - h, 0, j, k) + i
         },
         easeOutBounce: function (f, h, i, j, k) {
             return (h /= k) < 1 / 2.75 ? j * 7.5625 * h * h + i : h < 2 / 2.75 ? j * (7.5625 * (h -= 1.5 / 2.75) * h + 0.75) + i : h < 2.5 / 2.75 ? j * (7.5625 * (h -= 2.25 / 2.75) * h + 0.9375) + i : j * (7.5625 * (h -= 2.625 / 2.75) * h + 0.984375) + i
         },
         easeInOutBounce: function (a, h, i, j, k) {
             return h < k / 2 ? m.easing.easeInBounce(a, h * 2, 0, j, k) * 0.5 + i : m.easing.easeOutBounce(a, h * 2 - k, 0, j, k) * 0.5 + j * 0.5 + i
         }
     })
 }(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.blind.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.blind = function (a) {
         return this.queue(function () {
             var b = c(this),
                 k = ["position", "top", "bottom", "left", "right"],
                 l = c.effects.setMode(b, a.options.mode || "hide"),
                 m = a.options.direction || "vertical";
             c.effects.save(b, k), b.show();
             var n = c.effects.createWrapper(b).css({
                     overflow: "hidden"
                 }),
                 o = m == "vertical" ? "height" : "width",
                 p = m == "vertical" ? n.height() : n.width();
             l == "show" && n.css(o, 0);
             var q = {};
             q[o] = l == "show" ? p : 0, n.animate(q, a.duration, a.options.easing, function () {
                 l == "hide" && b.hide(), c.effects.restore(b, k), c.effects.removeWrapper(b), a.callback && a.callback.apply(b[0], arguments), b.dequeue()
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.bounce.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.bounce = function (a) {
         return this.queue(function () {
             var b = c(this),
                 o = ["position", "top", "bottom", "left", "right"],
                 q = c.effects.setMode(b, a.options.mode || "effect"),
                 r = a.options.direction || "up",
                 s = a.options.distance || 20,
                 t = a.options.times || 5,
                 u = a.duration || 250;
             /show|hide/.test(q) && o.push("opacity"), c.effects.save(b, o), b.show(), c.effects.createWrapper(b);
             var v = r == "up" || r == "down" ? "top" : "left",
                 w = r == "up" || r == "left" ? "pos" : "neg",
                 s = a.options.distance || (v == "top" ? b.outerHeight({
                     margin: !0
                 }) / 3 : b.outerWidth({
                     margin: !0
                 }) / 3);
             q == "show" && b.css("opacity", 0).css(v, w == "pos" ? -s : s), q == "hide" && (s = s / (t * 2)), q != "hide" && t--;
             if (q == "show") {
                 var x = {
                     opacity: 1
                 };
                 x[v] = (w == "pos" ? "+=" : "-=") + s, b.animate(x, u / 2, a.options.easing), s = s / 2, t--
             }
             for (var y = 0; y < t; y++) {
                 var z = {},
                     A = {};
                 z[v] = (w == "pos" ? "-=" : "+=") + s, A[v] = (w == "pos" ? "+=" : "-=") + s, b.animate(z, u / 2, a.options.easing).animate(A, u / 2, a.options.easing), s = q == "hide" ? s * 2 : s / 2
             }
             if (q == "hide") {
                 var x = {
                     opacity: 0
                 };
                 x[v] = (w == "pos" ? "-=" : "+=") + s, b.animate(x, u / 2, a.options.easing, function () {
                     b.hide(), c.effects.restore(b, o), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments)
                 })
             } else {
                 var z = {},
                     A = {};
                 z[v] = (w == "pos" ? "-=" : "+=") + s, A[v] = (w == "pos" ? "+=" : "-=") + s, b.animate(z, u / 2, a.options.easing).animate(A, u / 2, a.options.easing, function () {
                     c.effects.restore(b, o), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments)
                 })
             }
             b.queue("fx", function () {
                 b.dequeue()
             }), b.dequeue()
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.clip.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.clip = function (a) {
         return this.queue(function () {
             var b = c(this),
                 l = ["position", "top", "bottom", "left", "right", "height", "width"],
                 m = c.effects.setMode(b, a.options.mode || "hide"),
                 n = a.options.direction || "vertical";
             c.effects.save(b, l), b.show();
             var o = c.effects.createWrapper(b).css({
                     overflow: "hidden"
                 }),
                 p = b[0].tagName == "IMG" ? o : b,
                 q = {
                     size: n == "vertical" ? "height" : "width",
                     position: n == "vertical" ? "top" : "left"
                 },
                 r = n == "vertical" ? p.height() : p.width();
             m == "show" && (p.css(q.size, 0), p.css(q.position, r / 2));
             var s = {};
             s[q.size] = m == "show" ? r : 0, s[q.position] = m == "show" ? 0 : r / 2, p.animate(s, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     m == "hide" && b.hide(), c.effects.restore(b, l), c.effects.removeWrapper(b), a.callback && a.callback.apply(b[0], arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.drop.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.drop = function (a) {
         return this.queue(function () {
             var b = c(this),
                 k = ["position", "top", "bottom", "left", "right", "opacity"],
                 l = c.effects.setMode(b, a.options.mode || "hide"),
                 m = a.options.direction || "left";
             c.effects.save(b, k), b.show(), c.effects.createWrapper(b);
             var n = m == "up" || m == "down" ? "top" : "left",
                 o = m == "up" || m == "left" ? "pos" : "neg",
                 p = a.options.distance || (n == "top" ? b.outerHeight({
                     margin: !0
                 }) / 2 : b.outerWidth({
                     margin: !0
                 }) / 2);
             l == "show" && b.css("opacity", 0).css(n, o == "pos" ? -p : p);
             var q = {
                 opacity: l == "show" ? 1 : 0
             };
             q[n] = (l == "show" ? o == "pos" ? "+=" : "-=" : o == "pos" ? "-=" : "+=") + p, b.animate(q, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     l == "hide" && b.hide(), c.effects.restore(b, k), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.explode.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.explode = function (a) {
         return this.queue(function () {
             var b = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3,
                 k = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3;
             a.options.mode = a.options.mode == "toggle" ? c(this).is(":visible") ? "hide" : "show" : a.options.mode;
             var l = c(this).show().css("visibility", "hidden"),
                 m = l.offset();
             m.top -= parseInt(l.css("marginTop"), 10) || 0, m.left -= parseInt(l.css("marginLeft"), 10) || 0;
             var n = l.outerWidth(!0),
                 o = l.outerHeight(!0);
             for (var p = 0; p < b; p++) {
                 for (var q = 0; q < k; q++) {
                     l.clone().appendTo("body").wrap("<div></div>").css({
                         position: "absolute",
                         visibility: "visible",
                         left: -q * (n / k),
                         top: -p * (o / b)
                     }).parent().addClass("ui-effects-explode").css({
                         position: "absolute",
                         overflow: "hidden",
                         width: n / k,
                         height: o / b,
                         left: m.left + q * (n / k) + (a.options.mode == "show" ? (q - Math.floor(k / 2)) * (n / k) : 0),
                         top: m.top + p * (o / b) + (a.options.mode == "show" ? (p - Math.floor(b / 2)) * (o / b) : 0),
                         opacity: a.options.mode == "show" ? 0 : 1
                     }).animate({
                         left: m.left + q * (n / k) + (a.options.mode == "show" ? 0 : (q - Math.floor(k / 2)) * (n / k)),
                         top: m.top + p * (o / b) + (a.options.mode == "show" ? 0 : (p - Math.floor(b / 2)) * (o / b)),
                         opacity: a.options.mode == "show" ? 1 : 0
                     }, a.duration || 500)
                 }
             }
             setTimeout(function () {
                 a.options.mode == "show" ? l.css({
                     visibility: "visible"
                 }) : l.css({
                     visibility: "visible"
                 }).hide(), a.callback && a.callback.apply(l[0]), l.dequeue(), c("div.ui-effects-explode").remove()
             }, a.duration || 500)
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.fade.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.fade = function (a) {
         return this.queue(function () {
             var b = c(this),
                 e = c.effects.setMode(b, a.options.mode || "hide");
             b.animate({
                 opacity: e
             }, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     a.callback && a.callback.apply(this, arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.fold.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.fold = function (a) {
         return this.queue(function () {
             var b = c(this),
                 o = ["position", "top", "bottom", "left", "right"],
                 q = c.effects.setMode(b, a.options.mode || "hide"),
                 r = a.options.size || 15,
                 s = !!a.options.horizFirst,
                 t = a.duration ? a.duration / 2 : c.fx.speeds._default / 2;
             c.effects.save(b, o), b.show();
             var u = c.effects.createWrapper(b).css({
                     overflow: "hidden"
                 }),
                 v = q == "show" != s,
                 w = v ? ["width", "height"] : ["height", "width"],
                 x = v ? [u.width(), u.height()] : [u.height(), u.width()],
                 y = /([0-9]+)%/.exec(r);
             y && (r = parseInt(y[1], 10) / 100 * x[q == "hide" ? 0 : 1]), q == "show" && u.css(s ? {
                 height: 0,
                 width: r
             } : {
                 height: r,
                 width: 0
             });
             var z = {},
                 A = {};
             z[w[0]] = q == "show" ? x[0] : r, A[w[1]] = q == "show" ? x[1] : 0, u.animate(z, t, a.options.easing).animate(A, t, a.options.easing, function () {
                 q == "hide" && b.hide(), c.effects.restore(b, o), c.effects.removeWrapper(b), a.callback && a.callback.apply(b[0], arguments), b.dequeue()
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.highlight.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.highlight = function (a) {
         return this.queue(function () {
             var b = c(this),
                 h = ["backgroundImage", "backgroundColor", "opacity"],
                 i = c.effects.setMode(b, a.options.mode || "show"),
                 j = {
                     backgroundColor: b.css("backgroundColor")
                 };
             i == "hide" && (j.opacity = 0), c.effects.save(b, h), b.show().css({
                 backgroundImage: "none",
                 backgroundColor: a.options.color || "#ffff99"
             }).animate(j, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     i == "hide" && b.hide(), c.effects.restore(b, h), i == "show" && !c.support.opacity && this.style.removeAttribute("filter"), a.callback && a.callback.apply(this, arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.pulsate.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.pulsate = function (a) {
         return this.queue(function () {
             var b = c(this),
                 j = c.effects.setMode(b, a.options.mode || "show"),
                 k = (a.options.times || 5) * 2 - 1,
                 l = a.duration ? a.duration / 2 : c.fx.speeds._default / 2,
                 m = b.is(":visible"),
                 n = 0;
             m || (b.css("opacity", 0).show(), n = 1), (j == "hide" && m || j == "show" && !m) && k--;
             for (var o = 0; o < k; o++) {
                 b.animate({
                     opacity: n
                 }, l, a.options.easing), n = (n + 1) % 2
             }
             b.animate({
                 opacity: n
             }, l, a.options.easing, function () {
                 n == 0 && b.hide(), a.callback && a.callback.apply(this, arguments)
             }), b.queue("fx", function () {
                 b.dequeue()
             }).dequeue()
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.scale.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.puff = function (a) {
         return this.queue(function () {
             var b = c(this),
                 h = c.effects.setMode(b, a.options.mode || "hide"),
                 i = parseInt(a.options.percent, 10) || 150,
                 j = i / 100,
                 k = {
                     height: b.height(),
                     width: b.width()
                 };
             c.extend(a.options, {
                 fade: !0,
                 mode: h,
                 percent: h == "hide" ? i : 100,
                 from: h == "hide" ? k : {
                     height: k.height * j,
                     width: k.width * j
                 }
             }), b.effect("scale", a.options, a.duration, a.callback), b.dequeue()
         })
     }, c.effects.scale = function (a) {
         return this.queue(function () {
             var b = c(this),
                 k = c.extend(!0, {}, a.options),
                 l = c.effects.setMode(b, a.options.mode || "effect"),
                 m = parseInt(a.options.percent, 10) || (parseInt(a.options.percent, 10) == 0 ? 0 : l == "hide" ? 0 : 100),
                 n = a.options.direction || "both",
                 o = a.options.origin;
             l != "effect" && (k.origin = o || ["middle", "center"], k.restore = !0);
             var p = {
                 height: b.height(),
                 width: b.width()
             };
             b.from = a.options.from || (l == "show" ? {
                 height: 0,
                 width: 0
             } : p);
             var q = {
                 y: n != "horizontal" ? m / 100 : 1,
                 x: n != "vertical" ? m / 100 : 1
             };
             b.to = {
                 height: p.height * q.y,
                 width: p.width * q.x
             }, a.options.fade && (l == "show" && (b.from.opacity = 0, b.to.opacity = 1), l == "hide" && (b.from.opacity = 1, b.to.opacity = 0)), k.from = b.from, k.to = b.to, k.mode = l, b.effect("size", k, a.duration, a.callback), b.dequeue()
         })
     }, c.effects.size = function (a) {
         return this.queue(function () {
             var b = c(this),
                 o = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                 r = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                 s = ["width", "height", "overflow"],
                 t = ["fontSize"],
                 u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                 v = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                 w = c.effects.setMode(b, a.options.mode || "effect"),
                 x = a.options.restore || !1,
                 y = a.options.scale || "both",
                 z = a.options.origin,
                 A = {
                     height: b.height(),
                     width: b.width()
                 };
             b.from = a.options.from || A, b.to = a.options.to || A;
             if (z) {
                 var B = c.effects.getBaseline(z, A);
                 b.from.top = (A.height - b.from.height) * B.y, b.from.left = (A.width - b.from.width) * B.x, b.to.top = (A.height - b.to.height) * B.y, b.to.left = (A.width - b.to.width) * B.x
             }
             var C = {
                 from: {
                     y: b.from.height / A.height,
                     x: b.from.width / A.width
                 },
                 to: {
                     y: b.to.height / A.height,
                     x: b.to.width / A.width
                 }
             };
             if (y == "box" || y == "both") {
                 C.from.y != C.to.y && (o = o.concat(u), b.from = c.effects.setTransition(b, u, C.from.y, b.from), b.to = c.effects.setTransition(b, u, C.to.y, b.to)), C.from.x != C.to.x && (o = o.concat(v), b.from = c.effects.setTransition(b, v, C.from.x, b.from), b.to = c.effects.setTransition(b, v, C.to.x, b.to))
             }(y == "content" || y == "both") && C.from.y != C.to.y && (o = o.concat(t), b.from = c.effects.setTransition(b, t, C.from.y, b.from), b.to = c.effects.setTransition(b, t, C.to.y, b.to)), c.effects.save(b, x ? o : r), b.show(), c.effects.createWrapper(b), b.css("overflow", "hidden").css(b.from);
             if (y == "content" || y == "both") {
                 u = u.concat(["marginTop", "marginBottom"]).concat(t), v = v.concat(["marginLeft", "marginRight"]), s = o.concat(u).concat(v), b.find("*[width]").each(function () {
                     var e = c(this);
                     x && c.effects.save(e, s);
                     var f = {
                         height: e.height(),
                         width: e.width()
                     };
                     e.from = {
                         height: f.height * C.from.y,
                         width: f.width * C.from.x
                     }, e.to = {
                         height: f.height * C.to.y,
                         width: f.width * C.to.x
                     }, C.from.y != C.to.y && (e.from = c.effects.setTransition(e, u, C.from.y, e.from), e.to = c.effects.setTransition(e, u, C.to.y, e.to)), C.from.x != C.to.x && (e.from = c.effects.setTransition(e, v, C.from.x, e.from), e.to = c.effects.setTransition(e, v, C.to.x, e.to)), e.css(e.from), e.animate(e.to, a.duration, a.options.easing, function () {
                         x && c.effects.restore(e, s)
                     })
                 })
             }
             b.animate(b.to, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     b.to.opacity === 0 && b.css("opacity", b.from.opacity), w == "hide" && b.hide(), c.effects.restore(b, x ? o : r), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.shake.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.shake = function (a) {
         return this.queue(function () {
             var b = c(this),
                 o = ["position", "top", "bottom", "left", "right"],
                 q = c.effects.setMode(b, a.options.mode || "effect"),
                 r = a.options.direction || "left",
                 s = a.options.distance || 20,
                 t = a.options.times || 3,
                 u = a.duration || a.options.duration || 140;
             c.effects.save(b, o), b.show(), c.effects.createWrapper(b);
             var v = r == "up" || r == "down" ? "top" : "left",
                 w = r == "up" || r == "left" ? "pos" : "neg",
                 x = {},
                 y = {},
                 z = {};
             x[v] = (w == "pos" ? "-=" : "+=") + s, y[v] = (w == "pos" ? "+=" : "-=") + s * 2, z[v] = (w == "pos" ? "-=" : "+=") + s * 2, b.animate(x, u, a.options.easing);
             for (var A = 1; A < t; A++) {
                 b.animate(y, u, a.options.easing).animate(z, u, a.options.easing)
             }
             b.animate(y, u, a.options.easing).animate(x, u / 2, a.options.easing, function () {
                 c.effects.restore(b, o), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments)
             }), b.queue("fx", function () {
                 b.dequeue()
             }), b.dequeue()
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.slide.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.slide = function (a) {
         return this.queue(function () {
             var b = c(this),
                 k = ["position", "top", "bottom", "left", "right"],
                 l = c.effects.setMode(b, a.options.mode || "show"),
                 m = a.options.direction || "left";
             c.effects.save(b, k), b.show(), c.effects.createWrapper(b).css({
                 overflow: "hidden"
             });
             var n = m == "up" || m == "down" ? "top" : "left",
                 o = m == "up" || m == "left" ? "pos" : "neg",
                 p = a.options.distance || (n == "top" ? b.outerHeight({
                     margin: !0
                 }) : b.outerWidth({
                     margin: !0
                 }));
             l == "show" && b.css(n, o == "pos" ? isNaN(p) ? "-" + p : -p : p);
             var q = {};
             q[n] = (l == "show" ? o == "pos" ? "+=" : "-=" : o == "pos" ? "-=" : "+=") + p, b.animate(q, {
                 queue: !1,
                 duration: a.duration,
                 easing: a.options.easing,
                 complete: function () {
                     l == "hide" && b.hide(), c.effects.restore(b, k), c.effects.removeWrapper(b), a.callback && a.callback.apply(this, arguments), b.dequeue()
                 }
             })
         })
     }
 })(jQuery);
 /* jQuery UI - v1.8.21 - 2012-06-05
  * https://github.com/jquery/jquery-ui
  * Includes: jquery.effects.transfer.js
  * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
 (function (c, d) {
     c.effects.transfer = function (a) {
         return this.queue(function () {
             var b = c(this),
                 i = c(a.options.to),
                 j = i.offset(),
                 k = {
                     top: j.top,
                     left: j.left,
                     height: i.innerHeight(),
                     width: i.innerWidth()
                 },
                 l = b.offset(),
                 m = c('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({
                     top: l.top,
                     left: l.left,
                     height: b.innerHeight(),
                     width: b.innerWidth(),
                     position: "absolute"
                 }).animate(k, a.duration, a.options.easing, function () {
                     m.remove(), a.callback && a.callback.apply(b[0], arguments), b.dequeue()
                 })
         })
     }
 })(jQuery);
 (function (a) {
     a.fn.wipetouch = function (c) {
         var b = {
             moveX: 40,
             moveY: 40,
             tapToClick: false,
             preventDefault: true,
             allowDiagonal: false,
             wipeLeft: false,
             wipeRight: false,
             wipeUp: false,
             wipeDown: false,
             wipeUpLeft: false,
             wipeDownLeft: false,
             wipeUpRight: false,
             wipeDownRight: false,
             wipeMove: false,
             wipeTopLeft: false,
             wipeBottomLeft: false,
             wipeTopRight: false,
             wipeBottomRight: false
         };
         if (c) {
             a.extend(b, c)
         }
         this.each(function () {
             var n;
             var o;
             var m = false;
             var e;
             var f;
             var h = false;
             var q = false;
             var s = false;
             var d = false;

             function k(t) {
                 var u = s || (t.originalEvent.touches && t.originalEvent.touches.length > 0);
                 if (!h && u) {
                     if (b.preventDefault) {
                         t.preventDefault()
                     }
                     if (b.allowDiagonal) {
                         if (!b.wipeDownLeft) {
                             b.wipeDownLeft = b.wipeBottomLeft
                         }
                         if (!b.wipeDownRight) {
                             b.wipeDownRight = b.wipeBottomRight
                         }
                         if (!b.wipeUpLeft) {
                             b.wipeUpLeft = b.wipeTopLeft
                         }
                         if (!b.wipeUpRight) {
                             b.wipeUpRight = b.wipeTopRight
                         }
                     }
                     if (s) {
                         n = t.pageX;
                         o = t.pageY;
                         a(this).bind("mousemove", j);
                         a(this).one("mouseup", i)
                     } else {
                         n = t.originalEvent.touches[0].pageX;
                         o = t.originalEvent.touches[0].pageY;
                         a(this).bind("touchmove", j)
                     }
                     m = new Date().getTime();
                     e = n;
                     f = o;
                     h = true;
                     q = a(t.target)
                 }
             }

             function i(t) {
                 if (b.preventDefault) {
                     t.preventDefault()
                 }
                 if (s) {
                     a(this).unbind("mousemove", j)
                 } else {
                     a(this).unbind("touchmove", j)
                 } if (h) {
                     p(t)
                 } else {
                     l()
                 }
             }

             function j(t) {
                 if (b.preventDefault) {
                     t.preventDefault()
                 }
                 if (s && !h) {
                     k(t)
                 }
                 if (h) {
                     if (s) {
                         e = t.pageX;
                         f = t.pageY
                     } else {
                         e = t.originalEvent.touches[0].pageX;
                         f = t.originalEvent.touches[0].pageY
                     } if (b.wipeMove) {
                         r(b.wipeMove, {
                             curX: e,
                             curY: f
                         })
                     }
                 }
             }

             function p(A) {
                 var B = new Date().getTime();
                 var D = m - B;
                 var I = e;
                 var J = f;
                 var w = I - n;
                 var z = J - o;
                 var t = Math.abs(w);
                 var u = Math.abs(z);
                 if (t < 15 && u < 15 && D < 100) {
                     d = false;
                     if (b.preventDefault) {
                         l();
                         q.trigger("click");
                         return
                     }
                 } else {
                     if (s) {
                         var C = q.data("events");
                         if (C) {
                             var v = C.click;
                             if (v && v.length > 0) {
                                 a.each(v, function (y, x) {
                                     d = x;
                                     return
                                 });
                                 q.unbind("click")
                             }
                         }
                     }
                 }
                 var H = w > 0;
                 var G = z > 0;
                 var F = ((t + u) * 60) / ((D) / 6 * (D));
                 if (F < 1) {
                     F = 1
                 }
                 if (F > 5) {
                     F = 5
                 }
                 var E = {
                     speed: parseInt(F),
                     x: t,
                     y: u,
                     source: q
                 };
                 if (t >= b.moveX) {
                     if (b.allowDiagonal && u >= b.moveY) {
                         if (H && G) {
                             r(b.wipeDownRight, E)
                         } else {
                             if (H && !G) {
                                 r(b.wipeUpRight, E)
                             } else {
                                 if (!H && G) {
                                     r(b.wipeDownLeft, E)
                                 } else {
                                     r(b.wipeUpLeft, E)
                                 }
                             }
                         }
                     } else {
                         if (t >= u) {
                             if (H) {
                                 r(b.wipeRight, E)
                             } else {
                                 r(b.wipeLeft, E)
                             }
                         }
                     }
                 } else {
                     if (u >= b.moveY && u > t) {
                         if (G) {
                             r(b.wipeDown, E)
                         } else {
                             r(b.wipeUp, E)
                         }
                     }
                 }
                 l()
             }

             function l() {
                 n = false;
                 o = false;
                 m = false;
                 h = false;
                 if (d) {
                     window.setTimeout(function () {
                         q.bind("click", d);
                         d = false
                     }, 50)
                 }
             }

             function r(u, t) {
                 if (u) {
                     u(t)
                 }
             }
             if ("ontouchstart" in document.documentElement) {
                 a(this).bind("touchstart", k);
                 a(this).bind("touchend", i)
             } else {
                 s = true;
                 a(this).bind("mousedown", k);
                 a(this).bind("mouseout", i)
             }
         });
         return this
     }
 })(jQuery);
 ! function (b) {
     b(function () {
         "use strict", b.support.transition = function () {
             var a = document.body || document.documentElement,
                 e = a.style,
                 f = e.transition !== undefined || e.WebkitTransition !== undefined || e.MozTransition !== undefined || e.MsTransition !== undefined || e.OTransition !== undefined;
             return f && {
                 end: function () {
                     var c = "TransitionEnd";
                     return b.browser.webkit ? c = "webkitTransitionEnd" : b.browser.mozilla ? c = "transitionend" : b.browser.opera && (c = "oTransitionEnd"), c
                 }()
             }
         }()
     })
 }(window.jQuery), ! function (d) {
     var e = '[data-dismiss="alert"]',
         f = function (a) {
             d(a).on("click", e, this.close)
         };
     f.prototype = {
         constructor: f,
         close: function (a) {
             function k() {
                 j.trigger("closed").remove()
             }
             var h = d(this),
                 i = h.attr("data-target"),
                 j;
             i || (i = h.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), j = d(i), j.trigger("close"), a && a.preventDefault(), j.length || (j = h.hasClass("alert") ? h : h.parent()), j.trigger("close").removeClass("in"), d.support.transition && j.hasClass("fade") ? j.on(d.support.transition.end, k) : k()
         }
     }, d.fn.alert = function (a) {
         return this.each(function () {
             var b = d(this),
                 c = b.data("alert");
             c || b.data("alert", c = new f(this)), typeof a == "string" && c[a].call(b)
         })
     }, d.fn.alert.Constructor = f, d(function () {
         d("body").on("click.alert.data-api", e, f.prototype.close)
     })
 }(window.jQuery), ! function (c) {
     var d = function (a, e) {
         this.$element = c(a), this.options = c.extend({}, c.fn.button.defaults, e)
     };
     d.prototype = {
         constructor: d,
         setState: function (f) {
             var h = "disabled",
                 i = this.$element,
                 j = i.data(),
                 k = i.is("input") ? "val" : "html";
             f += "Text", j.resetText || i.data("resetText", i[k]()), i[k](j[f] || this.options[f]), setTimeout(function () {
                 f == "loadingText" ? i.addClass(h).attr(h, h) : i.removeClass(h).removeAttr(h)
             }, 0)
         },
         toggle: function () {
             var b = this.$element.parent('[data-toggle="buttons-radio"]');
             b && b.find(".active").removeClass("active"), this.$element.toggleClass("active")
         }
     }, c.fn.button = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("button"),
                 i = typeof a == "object" && a;
             h || b.data("button", h = new d(this, i)), a == "toggle" ? h.toggle() : a && h.setState(a)
         })
     }, c.fn.button.defaults = {
         loadingText: "loading..."
     }, c.fn.button.Constructor = d, c(function () {
         c("body").on("click.button.data-api", "[data-toggle^=button]", function (a) {
             var e = c(a.target);
             e.hasClass("btn") || (e = e.closest(".btn")), e.button("toggle")
         })
     })
 }(window.jQuery), ! function (c) {
     var d = function (a, e) {
         this.$element = c(a), this.options = c.extend({}, c.fn.carousel.defaults, e), this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", c.proxy(this.pause, this)).on("mouseleave", c.proxy(this.cycle, this))
     };
     d.prototype = {
         cycle: function () {
             return this.interval = setInterval(c.proxy(this.next, this), this.options.interval), this
         },
         to: function (a) {
             var h = this.$element.find(".active"),
                 i = h.parent().children(),
                 j = i.index(h),
                 k = this;
             if (a > i.length - 1 || a < 0) {
                 return
             }
             return this.sliding ? this.$element.one("slid", function () {
                 k.to(a)
             }) : j == a ? this.pause().cycle() : this.slide(a > j ? "next" : "prev", c(i[a]))
         },
         pause: function () {
             return clearInterval(this.interval), this.interval = null, this
         },
         next: function () {
             if (this.sliding) {
                 return
             }
             return this.slide("next")
         },
         prev: function () {
             if (this.sliding) {
                 return
             }
             return this.slide("prev")
         },
         slide: function (a, j) {
             var k = this.$element.find(".active"),
                 l = j || k[a](),
                 m = this.interval,
                 n = a == "next" ? "left" : "right",
                 o = a == "next" ? "first" : "last",
                 p = this;
             this.sliding = !0, m && this.pause(), l = l.length ? l : this.$element.find(".item")[o]();
             if (l.hasClass("active")) {
                 return
             }
             return !c.support.transition && this.$element.hasClass("slide") ? (this.$element.trigger("slide"), k.removeClass("active"), l.addClass("active"), this.sliding = !1, this.$element.trigger("slid")) : (l.addClass(a), l[0].offsetWidth, k.addClass(n), l.addClass(n), this.$element.trigger("slide"), this.$element.one(c.support.transition.end, function () {
                 l.removeClass([a, n].join(" ")).addClass("active"), k.removeClass(["active", n].join(" ")), p.sliding = !1, setTimeout(function () {
                     p.$element.trigger("slid")
                 }, 0)
             })), m && this.cycle(), this
         }
     }, c.fn.carousel = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("carousel"),
                 i = typeof a == "object" && a;
             h || b.data("carousel", h = new d(this, i)), typeof a == "number" ? h.to(a) : typeof a == "string" || (a = i.slide) ? h[a]() : h.cycle()
         })
     }, c.fn.carousel.defaults = {
         interval: 5000,
         pause: "hover"
     }, c.fn.carousel.Constructor = d, c(function () {
         c("body").on("click.carousel.data-api", "[data-slide]", function (a) {
             var h = c(this),
                 i, j = c(h.attr("data-target") || (i = h.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
                 k = !j.data("modal") && c.extend({}, j.data(), h.data());
             j.carousel(k), a.preventDefault()
         })
     })
 }(window.jQuery), ! function (c) {
     var d = function (a, e) {
         this.$element = c(a), this.options = c.extend({}, c.fn.collapse.defaults, e), this.options.parent && (this.$parent = c(this.options.parent)), this.options.toggle && this.toggle()
     };
     d.prototype = {
         constructor: d,
         dimension: function () {
             var b = this.$element.hasClass("width");
             return b ? "width" : "height"
         },
         show: function () {
             var a = this.dimension(),
                 f = c.camelCase(["scroll", a].join("-")),
                 h = this.$parent && this.$parent.find(".in"),
                 i;
             h && h.length && (i = h.data("collapse"), h.collapse("hide"), i || h.data("collapse", null)), this.$element[a](0), this.transition("addClass", "show", "shown"), this.$element[a](this.$element[0][f])
         },
         hide: function () {
             var b = this.dimension();
             this.reset(this.$element[b]()), this.transition("removeClass", "hide", "hidden"), this.$element[b](0)
         },
         reset: function (e) {
             var f = this.dimension();
             return this.$element.removeClass("collapse")[f](e || "auto")[0].offsetWidth, this.$element[e ? "addClass" : "removeClass"]("collapse"), this
         },
         transition: function (a, h, i) {
             var j = this,
                 k = function () {
                     h == "show" && j.reset(), j.$element.trigger(i)
                 };
             this.$element.trigger(h)[a]("in"), c.support.transition && this.$element.hasClass("collapse") ? this.$element.one(c.support.transition.end, k) : k()
         },
         toggle: function () {
             this[this.$element.hasClass("in") ? "hide" : "show"]()
         }
     }, c.fn.collapse = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("collapse"),
                 i = typeof a == "object" && a;
             h || b.data("collapse", h = new d(this, i)), typeof a == "string" && h[a]()
         })
     }, c.fn.collapse.defaults = {
         toggle: !0
     }, c.fn.collapse.Constructor = d, c(function () {
         c("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (a) {
             var h = c(this),
                 i, j = h.attr("data-target") || a.preventDefault() || (i = h.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
                 k = c(j).data("collapse") ? "toggle" : h.data();
             c(j).collapse(k)
         })
     })
 }(window.jQuery), ! function (e) {
     function i() {
         e(f).parent().removeClass("open")
     }
     "use strict";
     var f = '[data-toggle="dropdown"]',
         h = function (a) {
             var d = e(a).on("click.dropdown.data-api", this.toggle);
             e("html").on("click.dropdown.data-api", function () {
                 d.parent().removeClass("open")
             })
         };
     h.prototype = {
         constructor: h,
         toggle: function (a) {
             var d = e(this),
                 j = d.attr("data-target"),
                 k, l;
             return j || (j = d.attr("href"), j = j && j.replace(/.*(?=#[^\s]*$)/, "")), k = e(j), k.length || (k = d.parent()), l = k.hasClass("open"), i(), !l && k.toggleClass("open"), !1
         }
     }, e.fn.dropdown = function (a) {
         return this.each(function () {
             var b = e(this),
                 c = b.data("dropdown");
             c || b.data("dropdown", c = new h(this)), typeof a == "string" && c[a].call(b)
         })
     }, e.fn.dropdown.Constructor = h, e(function () {
         e("html").on("click.dropdown.data-api", i), e("body").on("click.dropdown.data-api", f, h.prototype.toggle)
     })
 }(window.jQuery), ! function (h) {
     function j() {
         var a = this,
             d = setTimeout(function () {
                 a.$element.off(h.support.transition.end), k.call(a)
             }, 500);
         this.$element.one(h.support.transition.end, function () {
             clearTimeout(d), k.call(a)
         })
     }

     function k(b) {
         this.$element.hide().trigger("hidden"), l.call(this)
     }

     function l(a) {
         var f = this,
             o = this.$element.hasClass("fade") ? "fade" : "";
         if (this.isShown && this.options.backdrop) {
             var p = h.support.transition && o;
             this.$backdrop = h('<div class="modal-backdrop ' + o + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(h.proxy(this.hide, this)), p && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), p ? this.$backdrop.one(h.support.transition.end, a) : a()
         } else {
             !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), h.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(h.support.transition.end, h.proxy(m, this)) : m.call(this)) : a && a()
         }
     }

     function m() {
         this.$backdrop.remove(), this.$backdrop = null
     }

     function n() {
         var a = this;
         this.isShown && this.options.keyboard ? h(document).on("keyup.dismiss.modal", function (b) {
             b.which == 27 && a.hide()
         }) : this.isShown || h(document).off("keyup.dismiss.modal")
     }
     "use strict";
     var i = function (a, d) {
         this.options = d, this.$element = h(a).delegate('[data-dismiss="modal"]', "click.dismiss.modal", h.proxy(this.hide, this))
     };
     i.prototype = {
         constructor: i,
         toggle: function () {
             return this[this.isShown ? "hide" : "show"]()
         },
         show: function () {
             var a = this;
             if (this.isShown) {
                 return
             }
             h("body").addClass("modal-open"), this.isShown = !0, this.$element.trigger("show"), n.call(this), l.call(this, function () {
                 var b = h.support.transition && a.$element.hasClass("fade");
                 !a.$element.parent().length && a.$element.appendTo(document.body), a.$element.show(), b && a.$element[0].offsetWidth, a.$element.addClass("in"), b ? a.$element.one(h.support.transition.end, function () {
                     a.$element.trigger("shown")
                 }) : a.$element.trigger("shown")
             })
         },
         hide: function (a) {
             a && a.preventDefault();
             if (!this.isShown) {
                 return
             }
             var c = this;
             this.isShown = !1, h("body").removeClass("modal-open"), n.call(this), this.$element.trigger("hide").removeClass("in"), h.support.transition && this.$element.hasClass("fade") ? j.call(this) : k.call(this)
         }
     }, h.fn.modal = function (a) {
         return this.each(function () {
             var b = h(this),
                 c = b.data("modal"),
                 o = h.extend({}, h.fn.modal.defaults, b.data(), typeof a == "object" && a);
             c || b.data("modal", c = new i(this, o)), typeof a == "string" ? c[a]() : o.show && c.show()
         })
     }, h.fn.modal.defaults = {
         backdrop: !0,
         keyboard: !0,
         show: !0
     }, h.fn.modal.Constructor = i, h(function () {
         h("body").on("click.modal.data-api", '[data-toggle="modal"]', function (a) {
             var o = h(this),
                 p, q = h(o.attr("data-target") || (p = o.attr("href")) && p.replace(/.*(?=#[^\s]+$)/, "")),
                 r = q.data("modal") ? "toggle" : h.extend({}, q.data(), o.data());
             a.preventDefault(), q.modal(r)
         })
     })
 }(window.jQuery), ! function (c) {
     var d = function (e, f) {
         this.init("tooltip", e, f)
     };
     d.prototype = {
         constructor: d,
         init: function (a, h, i) {
             var j, k;
             this.type = a, this.$element = c(h), this.options = this.getOptions(i), this.enabled = !0, this.options.trigger != "manual" && (j = this.options.trigger == "hover" ? "mouseenter" : "focus", k = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(j, this.options.selector, c.proxy(this.enter, this)), this.$element.on(k, this.options.selector, c.proxy(this.leave, this))), this.options.selector ? this._options = c.extend({}, this.options, {
                 trigger: "manual",
                 selector: ""
             }) : this.fixTitle()
         },
         getOptions: function (a) {
             return a = c.extend({}, c.fn[this.type].defaults, a, this.$element.data()), a.delay && typeof a.delay == "number" && (a.delay = {
                 show: a.delay,
                 hide: a.delay
             }), a
         },
         enter: function (a) {
             var e = c(a.currentTarget)[this.type](this._options).data(this.type);
             !e.options.delay || !e.options.delay.show ? e.show() : (e.hoverState = "in", setTimeout(function () {
                 e.hoverState == "in" && e.show()
             }, e.options.delay.show))
         },
         leave: function (a) {
             var e = c(a.currentTarget)[this.type](this._options).data(this.type);
             !e.options.delay || !e.options.delay.hide ? e.hide() : (e.hoverState = "out", setTimeout(function () {
                 e.hoverState == "out" && e.hide()
             }, e.options.delay.hide))
         },
         show: function () {
             var h, i, j, k, l, m, n;
             if (this.hasContent() && this.enabled) {
                 h = this.tip(), this.setContent(), this.options.animation && h.addClass("fade"), m = typeof this.options.placement == "function" ? this.options.placement.call(this, h[0], this.$element[0]) : this.options.placement, i = /in/.test(m), h.remove().css({
                     top: 0,
                     left: 0,
                     display: "block"
                 }).appendTo(i ? this.$element : document.body), j = this.getPosition(i), k = h[0].offsetWidth, l = h[0].offsetHeight;
                 switch (i ? m.split(" ")[1] : m) {
                 case "bottom":
                     n = {
                         top: j.top + j.height,
                         left: j.left + j.width / 2 - k / 2
                     };
                     break;
                 case "top":
                     n = {
                         top: j.top - l,
                         left: j.left + j.width / 2 - k / 2
                     };
                     break;
                 case "left":
                     n = {
                         top: j.top + j.height / 2 - l / 2,
                         left: j.left - k
                     };
                     break;
                 case "right":
                     n = {
                         top: j.top + j.height / 2 - l / 2,
                         left: j.left + j.width
                     }
                 }
                 h.css(n).addClass(m).addClass("in")
             }
         },
         setContent: function () {
             var b = this.tip();
             b.find(".tooltip-inner").html(this.getTitle()), b.removeClass("fade in top bottom left right")
         },
         hide: function () {
             function f() {
                 var h = setTimeout(function () {
                     e.off(c.support.transition.end).remove()
                 }, 500);
                 e.one(c.support.transition.end, function () {
                     clearTimeout(h), e.remove()
                 })
             }
             var a = this,
                 e = this.tip();
             e.removeClass("in"), c.support.transition && this.$tip.hasClass("fade") ? f() : e.remove()
         },
         fixTitle: function () {
             var b = this.$element;
             (b.attr("title") || typeof b.attr("data-original-title") != "string") && b.attr("data-original-title", b.attr("title") || "").removeAttr("title")
         },
         hasContent: function () {
             return this.getTitle()
         },
         getPosition: function (a) {
             return c.extend({}, a ? {
                 top: 0,
                 left: 0
             } : this.$element.offset(), {
                 width: this.$element[0].offsetWidth,
                 height: this.$element[0].offsetHeight
             })
         },
         getTitle: function () {
             var e, f = this.$element,
                 h = this.options;
             return e = f.attr("data-original-title") || (typeof h.title == "function" ? h.title.call(f[0]) : h.title), e = (e || "").toString().replace(/(^\s*|\s*$)/, ""), e
         },
         tip: function () {
             return this.$tip = this.$tip || c(this.options.template)
         },
         validate: function () {
             this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
         },
         enable: function () {
             this.enabled = !0
         },
         disable: function () {
             this.enabled = !1
         },
         toggleEnabled: function () {
             this.enabled = !this.enabled
         },
         toggle: function () {
             this[this.tip().hasClass("in") ? "hide" : "show"]()
         }
     }, c.fn.tooltip = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("tooltip"),
                 i = typeof a == "object" && a;
             h || b.data("tooltip", h = new d(this, i)), typeof a == "string" && h[a]()
         })
     }, c.fn.tooltip.Constructor = d, c.fn.tooltip.defaults = {
         animation: !0,
         delay: 0,
         selector: !1,
         placement: "top",
         trigger: "hover",
         title: "",
         template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
     }
 }(window.jQuery), ! function (c) {
     var d = function (e, f) {
         this.init("popover", e, f)
     };
     d.prototype = c.extend({}, c.fn.tooltip.Constructor.prototype, {
         constructor: d,
         setContent: function () {
             var a = this.tip(),
                 e = this.getTitle(),
                 f = this.getContent();
             a.find(".popover-title")[c.type(e) == "object" ? "append" : "html"](e), a.find(".popover-content > *")[c.type(f) == "object" ? "append" : "html"](f), a.removeClass("fade top bottom left right in")
         },
         hasContent: function () {
             return this.getTitle() || this.getContent()
         },
         getContent: function () {
             var e, f = this.$element,
                 h = this.options;
             return e = f.attr("data-content") || (typeof h.content == "function" ? h.content.call(f[0]) : h.content), e = e.toString().replace(/(^\s*|\s*$)/, ""), e
         },
         tip: function () {
             return this.$tip || (this.$tip = c(this.options.template)), this.$tip
         }
     }), c.fn.popover = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("popover"),
                 i = typeof a == "object" && a;
             h || b.data("popover", h = new d(this, i)), typeof a == "string" && h[a]()
         })
     }, c.fn.popover.Constructor = d, c.fn.popover.defaults = c.extend({}, c.fn.tooltip.defaults, {
         placement: "right",
         content: "",
         template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
     })
 }(window.jQuery), ! function (c) {
     function d(a, h) {
         var i = c.proxy(this.process, this),
             j = c(a).is("body") ? c(window) : c(a),
             k;
         this.options = c.extend({}, c.fn.scrollspy.defaults, h), this.$scrollElement = j.on("scroll.scroll.data-api", i), this.selector = (this.options.target || (k = c(a).attr("href")) && k.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = c("body").on("click.scroll.data-api", this.selector, i), this.refresh(), this.process()
     }
     "use strict", d.prototype = {
         constructor: d,
         refresh: function () {
             this.targets = this.$body.find(this.selector).map(function () {
                 var a = c(this).attr("href");
                 return /^#\w/.test(a) && c(a).length ? a : null
             }), this.offsets = c.map(this.targets, function (a) {
                 return c(a).position().top
             })
         },
         process: function () {
             var f = this.$scrollElement.scrollTop() + this.options.offset,
                 h = this.offsets,
                 i = this.targets,
                 j = this.activeTarget,
                 k;
             for (k = h.length; k--;) {
                 j != i[k] && f >= h[k] && (!h[k + 1] || f <= h[k + 1]) && this.activate(i[k])
             }
         },
         activate: function (e) {
             var f;
             this.activeTarget = e, this.$body.find(this.selector).parent(".active").removeClass("active"), f = this.$body.find(this.selector + '[href="' + e + '"]').parent("li").addClass("active"), f.parent(".dropdown-menu") && f.closest("li.dropdown").addClass("active")
         }
     }, c.fn.scrollspy = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("scrollspy"),
                 i = typeof a == "object" && a;
             h || b.data("scrollspy", h = new d(this, i)), typeof a == "string" && h[a]()
         })
     }, c.fn.scrollspy.Constructor = d, c.fn.scrollspy.defaults = {
         offset: 10
     }, c(function () {
         c('[data-spy="scroll"]').each(function () {
             var a = c(this);
             a.scrollspy(a.data())
         })
     })
 }(window.jQuery), ! function (c) {
     var d = function (a) {
         this.element = c(a)
     };
     d.prototype = {
         constructor: d,
         show: function () {
             var a = this.element,
                 h = a.closest("ul:not(.dropdown-menu)"),
                 i = a.attr("data-target"),
                 j, k;
             i || (i = a.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
             if (a.parent("li").hasClass("active")) {
                 return
             }
             j = h.find(".active a").last()[0], a.trigger({
                 type: "show",
                 relatedTarget: j
             }), k = c(i), this.activate(a.parent("li"), h), this.activate(k, k.parent(), function () {
                 a.trigger({
                     type: "shown",
                     relatedTarget: j
                 })
             })
         },
         activate: function (a, h, i) {
             function l() {
                 j.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), a.addClass("active"), k ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade"), a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active"), i && i()
             }
             var j = h.find("> .active"),
                 k = i && c.support.transition && j.hasClass("fade");
             k ? j.one(c.support.transition.end, l) : l(), j.removeClass("in")
         }
     }, c.fn.tab = function (a) {
         return this.each(function () {
             var b = c(this),
                 f = b.data("tab");
             f || b.data("tab", f = new d(this)), typeof a == "string" && f[a]()
         })
     }, c.fn.tab.Constructor = d, c(function () {
         c("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (a) {
             a.preventDefault(), c(this).tab("show")
         })
     })
 }(window.jQuery), ! function (c) {
     var d = function (a, e) {
         this.$element = c(a), this.options = c.extend({}, c.fn.typeahead.defaults, e), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.$menu = c(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
     };
     d.prototype = {
         constructor: d,
         select: function () {
             var b = this.$menu.find(".active").attr("data-value");
             return this.$element.val(b), this.$element.change(), this.hide()
         },
         show: function () {
             var a = c.extend({}, this.$element.offset(), {
                 height: this.$element[0].offsetHeight
             });
             return this.$menu.css({
                 top: a.top + a.height,
                 left: a.left
             }), this.$menu.show(), this.shown = !0, this
         },
         hide: function () {
             return this.$menu.hide(), this.shown = !1, this
         },
         lookup: function (a) {
             var f = this,
                 h, i;
             return this.query = this.$element.val(), this.query ? (h = c.grep(this.source, function (b) {
                 if (f.matcher(b)) {
                     return b
                 }
             }), h = this.sorter(h), h.length ? this.render(h.slice(0, this.options.items)).show() : this.shown ? this.hide() : this) : this.shown ? this.hide() : this
         },
         matcher: function (b) {
             return~ b.toLowerCase().indexOf(this.query.toLowerCase())
         },
         sorter: function (f) {
             var h = [],
                 i = [],
                 j = [],
                 k;
             while (k = f.shift()) {
                 k.toLowerCase().indexOf(this.query.toLowerCase()) ? ~k.indexOf(this.query) ? i.push(k) : j.push(k) : h.push(k)
             }
             return h.concat(i, j)
         },
         highlighter: function (b) {
             return b.replace(new RegExp("(" + this.query + ")", "ig"), function (e, f) {
                 return "<strong>" + f + "</strong>"
             })
         },
         render: function (a) {
             var e = this;
             return a = c(a).map(function (f, h) {
                 return f = c(e.options.item).attr("data-value", h), f.find("a").html(e.highlighter(h)), f[0]
             }), a.first().addClass("active"), this.$menu.html(a), this
         },
         next: function (a) {
             var e = this.$menu.find(".active").removeClass("active"),
                 f = e.next();
             f.length || (f = c(this.$menu.find("li")[0])), f.addClass("active")
         },
         prev: function (e) {
             var f = this.$menu.find(".active").removeClass("active"),
                 h = f.prev();
             h.length || (h = this.$menu.find("li").last()), h.addClass("active")
         },
         listen: function () {
             this.$element.on("blur", c.proxy(this.blur, this)).on("keypress", c.proxy(this.keypress, this)).on("keyup", c.proxy(this.keyup, this)), (c.browser.webkit || c.browser.msie) && this.$element.on("keydown", c.proxy(this.keypress, this)), this.$menu.on("click", c.proxy(this.click, this)).on("mouseenter", "li", c.proxy(this.mouseenter, this))
         },
         keyup: function (b) {
             switch (b.keyCode) {
             case 40:
             case 38:
                 break;
             case 9:
             case 13:
                 if (!this.shown) {
                     return
                 }
                 this.select();
                 break;
             case 27:
                 if (!this.shown) {
                     return
                 }
                 this.hide();
                 break;
             default:
                 this.lookup()
             }
             b.stopPropagation(), b.preventDefault()
         },
         keypress: function (b) {
             if (!this.shown) {
                 return
             }
             switch (b.keyCode) {
             case 9:
             case 13:
             case 27:
                 b.preventDefault();
                 break;
             case 38:
                 b.preventDefault(), this.prev();
                 break;
             case 40:
                 b.preventDefault(), this.next()
             }
             b.stopPropagation()
         },
         blur: function (e) {
             var f = this;
             setTimeout(function () {
                 f.hide()
             }, 150)
         },
         click: function (b) {
             b.stopPropagation(), b.preventDefault(), this.select()
         },
         mouseenter: function (a) {
             this.$menu.find(".active").removeClass("active"), c(a.currentTarget).addClass("active")
         }
     }, c.fn.typeahead = function (a) {
         return this.each(function () {
             var b = c(this),
                 h = b.data("typeahead"),
                 i = typeof a == "object" && a;
             h || b.data("typeahead", h = new d(this, i)), typeof a == "string" && h[a]()
         })
     }, c.fn.typeahead.defaults = {
         source: [],
         items: 8,
         menu: '<ul class="typeahead dropdown-menu"></ul>',
         item: '<li><a href="#"></a></li>'
     }, c.fn.typeahead.Constructor = d, c(function () {
         c("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (a) {
             var e = c(this);
             if (e.data("typeahead")) {
                 return
             }
             a.preventDefault(), e.typeahead(e.data())
         })
     })
 }(window.jQuery);
 /*
  * VERSION: beta 1.484
  * DATE: 2012-08-22
  * JavaScript
  * UPDATES AND DOCS AT: http://www.greensock.com
  *
  * Copyright (c) 2008-2012, GreenSock. All rights reserved.
  * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for
  * corporate Club GreenSock members, the software agreement that was issued with the corporate
  * membership.
  *
  * @author: Jack Doyle, jack@greensock.com
  */
 (window._gsQueue || (window._gsQueue = [])).push(function () {
     _gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (j) {
         var ak = function () {
                 j.call(this, "css");
                 this._overwriteProps.pop()
             },
             aq = ak.prototype = new j("css");
         aq.constructor = ak;
         ak.API = 2;
         ak.suffixMap = {
             top: "px",
             right: "px",
             bottom: "px",
             left: "px",
             width: "px",
             height: "px",
             fontSize: "px",
             padding: "px",
             margin: "px"
         };
         var b = /[^\d\-\.]/g,
             ad = /(\d|\-|\+|=|#|\.)*/g,
             c = /(\d|\.)+/g,
             af = /opacity *= *([^)]*)/,
             e = /opacity:([^;]*)/,
             h = /([A-Z])/g,
             al = /-([a-z])/gi,
             an = function (o, m) {
                 return m.toUpperCase()
             },
             i = /(Left|Right|Width)/i,
             k = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
             n = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
             d = Math.PI / 180,
             ao = 180 / Math.PI,
             l = {},
             av = document.createElement("div"),
             ap, ax;
         var ae = document.createElement("div"),
             at;
         ae.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
         ax = (at = ae.getElementsByTagName("a")[0]) ? /^0.55/.test(at.style.opacity) : !1;
         var ar;
         /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);
         ar = parseFloat(RegExp.$1);
         var au = function (m) {
                 return !m || "" === m ? p.black : p[m] ? p[m] : "number" === typeof m ? [m >> 16, m >> 8 & 255, m & 255] : "#" === m.charAt(0) ? (4 === m.length && (m = "#" + m.charAt(1) + m.charAt(1) + m.charAt(2) + m.charAt(2) + m.charAt(3) + m.charAt(3)), m = parseInt(m.substr(1), 16), [m >> 16, m >> 8 & 255, m & 255]) : m.match(c) || p.transparent
             },
             aw = function (m) {
                 return af.test("string" === typeof m ? m : (m.currentStyle ? m.currentStyle.filter : m.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
             },
             f = document.defaultView ? document.defaultView.getComputedStyle : function () {},
             am = function (o, m, r, q) {
                 return !ax && "opacity" === m ? aw(o) : !q && o.style[m] ? o.style[m] : (r = r || f(o, null)) ? (o = r.getPropertyValue(m.replace(h, "-$1").toLowerCase())) || r.length ? o : r[m] : o.currentStyle ? o.currentStyle[m] : null
             },
             aa = function (o, m) {
                 var r = {},
                     q;
                 if (m = m || f(o, null)) {
                     if (q = m.length) {
                         for (; - 1 < --q;) {
                             r[m[q].replace(al, an)] = m.getPropertyValue(m[q])
                         }
                     } else {
                         for (q in m) {
                             r[q] = m[q]
                         }
                     }
                 } else {
                     if (m = o.currentStyle || o.style) {
                         for (q in m) {
                             r[q.replace(al, an)] = m[q]
                         }
                     }
                 }
                 ax || (r.opacity = aw(o));
                 q = t(o, m, !1);
                 r.rotation = q.rotation * ao;
                 r.skewX = q.skewX * ao;
                 r.scaleX = q.scaleX;
                 r.scaleY = q.scaleY;
                 r.x = q.x;
                 r.y = q.y;
                 null != r.filters && delete r.filters;
                 return r
             },
             ay = function (o, m, u, q) {
                 var w = {},
                     r, v;
                 for (v in m) {
                     if ("cssText" !== v && "length" !== v && isNaN(v) && o[v] != (r = m[v])) {
                         if (r !== ah && ("number" === typeof r || "string" === typeof r)) {
                             w[v] = r, q && q.props.push(v)
                         }
                     }
                 }
                 if (u) {
                     for (v in u) {
                         "className" !== v && (w[v] = u[v])
                     }
                 }
                 return w
             },
             aA = {
                 scaleX: 1,
                 scaleY: 1,
                 x: 1,
                 y: 1,
                 rotation: 1,
                 shortRotation: 1,
                 skewX: 1,
                 skewY: 1,
                 scale: 1
             },
             ah, ag;
         ae = document.body || document.documentElement;
         at = f(ae, "");
         for (var ai = "O -o- Moz -moz- ms -ms- Webkit -webkit-".split(" "), az = 9; - 1 < (az -= 2) && !am(ae, ai[az] + "transform", at);) {}
         0 < az ? (ah = ai[az - 1] + "Transform", ag = ai[az]) : ag = null;
         var ae = navigator.userAgent,
             aC = !1,
             a;
         at = ae.indexOf("Android");
         a = -1 !== ae.indexOf("Safari") && -1 === ae.indexOf("Chrome") && (-1 === at || 3 < Number(ae.substr(at + 8, 1)));
         var t = function (o, m, u) {
                 var q = o._gsTransform,
                     x;
                 if (ah) {
                     x = am(o, ag + "transform", m, true)
                 } else {
                     if (o.currentStyle) {
                         x = (x = o.currentStyle.filter.match(k)) && x.length === 4 ? x[0].substr(4) + "," + Number(x[2].substr(4)) + "," + Number(x[1].substr(4)) + "," + x[3].substr(4) + "," + (q ? q.x : 0) + "," + (q ? q.y : 0) : null
                     }
                 }
                 var m = (x || "").replace(/[^\d\-\.e,]/g, "").split(","),
                     r = (x = m.length >= 6) ? Number(m[0]) : 1,
                     w = x ? Number(m[1]) : 0,
                     v = x ? Number(m[2]) : 0,
                     y = x ? Number(m[3]) : 1,
                     q = u ? q || {
                         skewY: 0
                     } : {
                         skewY: 0
                     },
                     z = q.scaleX < 0;
                 q.x = x ? Number(m[4]) : 0;
                 q.y = x ? Number(m[5]) : 0;
                 q.scaleX = Math.sqrt(r * r + w * w);
                 q.scaleY = Math.sqrt(y * y + v * v);
                 q.rotation = r || w ? Math.atan2(w, r) : q.rotation || 0;
                 q.skewX = v || y ? Math.atan2(v, y) + q.rotation : q.skewX || 0;
                 if (Math.abs(q.skewX) > Math.PI / 2) {
                     if (z) {
                         q.scaleX = q.scaleX * -1;
                         q.skewX = q.skewX + (q.rotation <= 0 ? Math.PI : -Math.PI);
                         q.rotation = q.rotation + (q.rotation <= 0 ? Math.PI : -Math.PI)
                     } else {
                         q.scaleY = q.scaleY * -1;
                         q.skewX = q.skewX + (q.skewX <= 0 ? Math.PI : -Math.PI)
                     }
                 }
                 if (q.rotation < 1e-06 && q.rotation > -1e-06 && (r || w)) {
                     q.rotation = 0
                 }
                 if (q.skewX < 1e-06 && q.skewX > -1e-06 && (w || v)) {
                     q.skewX = 0
                 }
                 if (u) {
                     o._gsTransform = q
                 }
                 return q
             },
             s = {
                 width: ["Left", "Right"],
                 height: ["Top", "Bottom"]
             },
             D = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
             aB = function (o, m, u, q, x) {
                 if (q === "px" || !q) {
                     return u
                 }
                 if (q === "auto" || !u) {
                     return 0
                 }
                 var r = i.test(m),
                     w = o,
                     v = u < 0;
                 v && (u = -u);
                 av.style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
                 if (q === "%" || q === "em" || !w.appendChild) {
                     w = o.parentNode || document.body;
                     av.style[r ? "width" : "height"] = u + q
                 } else {
                     av.style[r ? "borderLeftWidth" : "borderTopWidth"] = u + q
                 }
                 w.appendChild(av);
                 r = parseFloat(av[r ? "offsetWidth" : "offsetHeight"]);
                 w.removeChild(av);
                 r === 0 && !x && (r = aB(o, m, u, q, true));
                 return v ? -r : r
             },
             aj = function (o, m) {
                 if (o == null || o === "" || o === "auto") {
                     o = "0 0"
                 }
                 var m = m || {},
                     r = o.indexOf("left") !== -1 ? "0%" : o.indexOf("right") !== -1 ? "100%" : o.split(" ")[0],
                     q = o.indexOf("top") !== -1 ? "0%" : o.indexOf("bottom") !== -1 ? "100%" : o.split(" ")[1];
                 q == null ? q = "0" : q === "center" && (q = "50%");
                 r === "center" && (r = "50%");
                 m.oxp = r.indexOf("%") !== -1;
                 m.oyp = q.indexOf("%") !== -1;
                 m.oxr = r.charAt(1) === "=";
                 m.oyr = q.charAt(1) === "=";
                 m.ox = parseFloat(r.replace(b, ""));
                 m.oy = parseFloat(q.replace(b, ""));
                 return m
             },
             ab = function (o, m) {
                 return o == null ? m : typeof o === "string" && o.indexOf("=") === 1 ? Number(o.split("=").join("")) + m : Number(o)
             },
             ac = function (o, m) {
                 var r = o.indexOf("rad") === -1 ? d : 1,
                     q = o.indexOf("=") === 1,
                     o = Number(o.replace(b, "")) * r;
                 return q ? o + m : o
             },
             p = {
                 aqua: [0, 255, 255],
                 lime: [0, 255, 0],
                 silver: [192, 192, 192],
                 black: [0, 0, 0],
                 maroon: [128, 0, 0],
                 teal: [0, 128, 128],
                 blue: [0, 0, 255],
                 navy: [0, 0, 128],
                 white: [255, 255, 255],
                 fuchsia: [255, 0, 255],
                 olive: [128, 128, 0],
                 yellow: [255, 255, 0],
                 orange: [255, 165, 0],
                 gray: [128, 128, 128],
                 purple: [128, 0, 128],
                 green: [0, 128, 0],
                 red: [255, 0, 0],
                 pink: [255, 192, 203],
                 cyan: [0, 255, 255],
                 transparent: [255, 255, 255, 0]
             };
         aq._onInitTween = function (o, m, u) {
             if (!o.nodeType) {
                 return false
             }
             this._target = o;
             this._tween = u;
             this._classData = this._transform = null;
             ap = m.autoRound;
             var q = this._style = o.style,
                 v = f(o, ""),
                 r;
             if (aC && q.zIndex === "") {
                 q.zIndex = 0
             }
             if (typeof m === "string") {
                 r = q.cssText;
                 u = aa(o, v);
                 q.cssText = r + ";" + m;
                 u = ay(u, aa(o));
                 if (!ax && e.test(m)) {
                     val.opacity = parseFloat(RegExp.$1)
                 }
                 m = u;
                 q.cssText = r
             } else {
                 if (m.className) {
                     r = o.className;
                     this._classData = {
                         b: r,
                         e: m.className.charAt(1) !== "=" ? m.className : m.className.charAt(0) === "+" ? o.className + " " + m.className.substr(2) : o.className.split(m.className.substr(2)).join(""),
                         props: []
                     };
                     if (u._duration) {
                         u = aa(o, v);
                         o.className = this._classData.e;
                         m = ay(u, aa(o), m, this._classData);
                         o.className = r
                     } else {
                         m = {}
                     }
                 }
             }
             this._parseVars(m, o, v, m.suffixMap || ak.suffixMap);
             return true
         };
         aq._parseVars = function (o, m, v, q) {
             var y = this._style,
                 r, x, w, z, B, E, A;
             for (r in o) {
                 x = o[r];
                 if (r === "transform" || r === ah) {
                     this._parseTransform(m, x, v, q)
                 } else {
                     if (aA[r] || r === "transformOrigin") {
                         this._parseTransform(m, o, v, q)
                     } else {
                         if (r === "alpha" || r === "autoAlpha") {
                             r = "opacity"
                         } else {
                             if (r === "margin" || r === "padding") {
                                 x = (x + "").split(" ");
                                 B = x.length;
                                 w = {};
                                 w[r + "Top"] = x[0];
                                 w[r + "Right"] = B > 1 ? x[1] : x[0];
                                 w[r + "Bottom"] = B === 4 ? x[2] : x[0];
                                 w[r + "Left"] = B === 4 ? x[3] : B === 2 ? x[1] : x[0];
                                 this._parseVars(w, m, v, q);
                                 continue
                             } else {
                                 if (r === "backgroundPosition" || r === "backgroundSize") {
                                     w = aj(x);
                                     A = aj(z = am(m, r, v));
                                     this._firstPT = w = {
                                         _next: this._firstPT,
                                         t: y,
                                         p: r,
                                         b: z,
                                         f: false,
                                         n: "css_" + r,
                                         type: 3,
                                         s: A.ox,
                                         c: w.oxr ? w.ox : w.ox - A.ox,
                                         ys: A.oy,
                                         yc: w.oyr ? w.oy : w.oy - A.oy,
                                         sfx: w.oxp ? "%" : "px",
                                         ysfx: w.oyp ? "%" : "px",
                                         r: !w.oxp && o.autoRound !== false
                                     };
                                     w.e = w.s + w.c + w.sfx + " " + (w.ys + w.yc) + w.ysfx;
                                     continue
                                 } else {
                                     if (r === "border") {
                                         x = (x + "").split(" ");
                                         this._parseVars({
                                             borderWidth: x[0],
                                             borderStyle: x[1] || "none",
                                             borderColor: x[2] || "#000000"
                                         }, m, v, q);
                                         continue
                                     } else {
                                         if (r === "bezier") {
                                             this._parseBezier(x, m, v, q);
                                             continue
                                         } else {
                                             if (r === "autoRound") {
                                                 continue
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                         z = am(m, r, v);
                         z = z != null ? z + "" : "";
                         this._firstPT = w = {
                             _next: this._firstPT,
                             t: y,
                             p: r,
                             b: z,
                             f: false,
                             n: "css_" + r,
                             sfx: "",
                             r: false,
                             type: 0
                         };
                         if (r === "opacity" && o.autoAlpha != null) {
                             if (z === "1" && am(m, "visibility", v) === "hidden") {
                                 z = w.b = "0"
                             }
                             this._firstPT = w._prev = {
                                 _next: w,
                                 t: y,
                                 p: "visibility",
                                 f: false,
                                 n: "css_visibility",
                                 r: false,
                                 type: -1,
                                 b: Number(z) !== 0 ? "visible" : "hidden",
                                 i: "visible",
                                 e: Number(x) === 0 ? "hidden" : "visible"
                             };
                             this._overwriteProps.push("css_visibility")
                         }
                         B = typeof x === "string";
                         if (r === "color" || r === "fill" || r === "stroke" || r.indexOf("Color") !== -1 || B && !x.indexOf("rgb(")) {
                             B = au(z);
                             x = au(x);
                             w.e = w.i = (x.length > 3 ? "rgba(" : "rgb(") + x.join(",") + ")";
                             w.b = (B.length > 3 ? "rgba(" : "rgb(") + B.join(",") + ")";
                             w.s = Number(B[0]);
                             w.c = Number(x[0]) - w.s;
                             w.gs = Number(B[1]);
                             w.gc = Number(x[1]) - w.gs;
                             w.bs = Number(B[2]);
                             w.bc = Number(x[2]) - w.bs;
                             w.type = 1;
                             if (B.length > 3 || x.length > 3) {
                                 if (ax) {
                                     w.as = B.length < 4 ? 1 : Number(B[3]);
                                     w.ac = (x.length < 4 ? 1 : Number(x[3])) - w.as;
                                     w.type = 2
                                 } else {
                                     if (x[3] == 0) {
                                         w.e = w.i = "transparent";
                                         w.type = -1
                                     }
                                     if (B[3] == 0) {
                                         w.b = "transparent"
                                     }
                                 }
                             }
                         } else {
                             E = z.replace(ad, "");
                             if (z === "" || z === "auto") {
                                 if (r === "width" || r === "height") {
                                     var C = r;
                                     E = m;
                                     A = v;
                                     z = parseFloat(C === "width" ? E.offsetWidth : E.offsetHeight);
                                     var C = s[C],
                                         u = C.length;
                                     for (A = A || f(E, null); --u > -1;) {
                                         z = z - (parseFloat(am(E, "padding" + C[u], A, true)) || 0);
                                         z = z - (parseFloat(am(E, "border" + C[u] + "Width", A, true)) || 0)
                                     }
                                     A = z;
                                     E = "px"
                                 } else {
                                     A = r !== "opacity" ? 0 : 1;
                                     E = ""
                                 }
                             } else {
                                 A = z.indexOf(" ") === -1 ? parseFloat(z.replace(b, "")) : NaN
                             } if (B) {
                                 B = x.charAt(1) === "=";
                                 z = x.replace(ad, "");
                                 x = x.indexOf(" ") === -1 ? parseFloat(x.replace(b, "")) : NaN
                             } else {
                                 B = false;
                                 z = ""
                             }
                             z === "" && (z = q[r] || E);
                             w.e = x || x === 0 ? (B ? x + A : x) + z : o[r];
                             if (E !== z && z !== "" && (x || x === 0)) {
                                 if (A || A === 0) {
                                     A = aB(m, r, A, E);
                                     if (z === "%") {
                                         A = A / (aB(m, r, 100, "%") / 100);
                                         A > 100 && (A = 100)
                                     } else {
                                         if (z === "em") {
                                             A = A / aB(m, r, 1, "em")
                                         } else {
                                             x = aB(m, r, x, z);
                                             z = "px"
                                         }
                                     } if (B && (x || x === 0)) {
                                         w.e = x + A + z
                                     }
                                 }
                             }
                             if ((A || A === 0) && (x || x === 0) && (w.c = B ? x : x - A)) {
                                 w.s = A;
                                 w.sfx = z;
                                 if (r === "opacity") {
                                     if (!ax) {
                                         w.type = 4;
                                         w.p = "filter";
                                         w.b = "alpha(opacity=" + w.s * 100 + ")";
                                         w.e = "alpha(opacity=" + (w.s + w.c) * 100 + ")";
                                         w.dup = o.autoAlpha != null;
                                         this._style.zoom = 1
                                     }
                                 } else {
                                     if (ap !== false && (z === "px" || r === "zIndex")) {
                                         w.r = true
                                     }
                                 }
                             } else {
                                 w.type = -1;
                                 w.i = r === "display" && w.e === "none" ? w.b : w.e;
                                 w.s = w.c = 0
                             }
                         }
                         this._overwriteProps.push("css_" + r);
                         if (w._next) {
                             w._next._prev = w
                         }
                     }
                 }
             }
         };
         aq._parseTransform = function (o, m, u) {
             if (!this._transform) {
                 var u = this._transform = t(o, u, true),
                     q = this._style,
                     v, r;
                 if (typeof m === "object") {
                     o = {
                         scaleX: ab(m.scaleX != null ? m.scaleX : m.scale, u.scaleX),
                         scaleY: ab(m.scaleY != null ? m.scaleY : m.scale, u.scaleY),
                         x: ab(m.x, u.x),
                         y: ab(m.y, u.y)
                     };
                     if (m.shortRotation != null) {
                         o.rotation = typeof m.shortRotation === "number" ? m.shortRotation * d : ac(m.shortRotation, u.rotation);
                         v = (o.rotation - u.rotation) % (Math.PI * 2);
                         v !== v % Math.PI && (v = v + Math.PI * (v < 0 ? 2 : -2));
                         o.rotation = u.rotation + v
                     } else {
                         o.rotation = m.rotation == null ? u.rotation : typeof m.rotation === "number" ? m.rotation * d : ac(m.rotation, u.rotation)
                     }
                     o.skewX = m.skewX == null ? u.skewX : typeof m.skewX === "number" ? m.skewX * d : ac(m.skewX, u.skewX);
                     o.skewY = m.skewY == null ? u.skewY : typeof m.skewY === "number" ? m.skewY * d : ac(m.skewY, u.skewY);
                     if (v = o.skewY - u.skewY) {
                         o.skewX = o.skewX + v;
                         o.rotation = o.rotation + v
                     }
                     if (o.skewY < 1e-06 && o.skewY > -1e-06) {
                         o.skewY = 0
                     }
                     if (o.skewX < 1e-06 && o.skewX > -1e-06) {
                         o.skewX = 0
                     }
                     if (o.rotation < 1e-06 && o.rotation > -1e-06) {
                         o.rotation = 0
                     }
                     if ((m = m.transformOrigin) != null) {
                         if (ah) {
                             r = ah + "Origin";
                             this._firstPT = m = {
                                 _next: this._firstPT,
                                 t: q,
                                 p: r,
                                 s: 0,
                                 c: 0,
                                 n: r,
                                 f: false,
                                 r: false,
                                 b: q[r],
                                 e: m,
                                 i: m,
                                 type: -1,
                                 sfx: ""
                             };
                             if (m._next) {
                                 m._next._prev = m
                             }
                         } else {
                             aj(m, u)
                         }
                     }
                 } else {
                     if (typeof m === "string" && ah) {
                         v = q[ah];
                         q[ah] = m;
                         o = t(o, null, false);
                         q[ah] = v
                     } else {
                         return
                     }
                 } if (ah) {
                     if (a) {
                         aC = true;
                         if (q.WebkitBackfaceVisibility === "") {
                             q.WebkitBackfaceVisibility = "hidden"
                         }
                         if (q.zIndex === "") {
                             q.zIndex = 0
                         }
                     }
                 } else {
                     q.zoom = 1
                 }
                 for (r in aA) {
                     if ((u[r] !== o[r] || l[r] != null) && r !== "shortRotation" && r !== "scale") {
                         this._firstPT = m = {
                             _next: this._firstPT,
                             t: u,
                             p: r,
                             s: u[r],
                             c: o[r] - u[r],
                             n: r,
                             f: false,
                             r: false,
                             b: u[r],
                             e: o[r],
                             type: 0,
                             sfx: 0
                         };
                         if (m._next) {
                             m._next._prev = m
                         }
                         this._overwriteProps.push("css_" + r)
                     }
                 }
             }
         };
         aq._parseBezier = function (v, u, z, w) {
             if (window.com.greensock.plugins.BezierPlugin) {
                 v instanceof Array && (v = {
                     values: v
                 });
                 var C = v.values || [],
                     x = C.length,
                     B = [],
                     A = this._bezier = {
                         _pt: []
                     },
                     E = A._proxy = {},
                     H = 0,
                     K = 0,
                     G = {},
                     L = x - 1,
                     y = l,
                     O = A._plugin = new window.com.greensock.plugins.BezierPlugin,
                     J, F, I, N, M;
                 for (J = 0; J < x; J++) {
                     N = {};
                     this._transform = null;
                     I = this._firstPT;
                     this._parseVars(l = C[J], u, z, w);
                     F = this._firstPT;
                     if (J === 0) {
                         for (M = this._transform; F !== I;) {
                             E[F.p] = F.s;
                             A._pt[K++] = G[F.p] = F;
                             if (F.type === 1 || F.type === 2) {
                                 E[F.p + "_g"] = F.gs;
                                 E[F.p + "_b"] = F.bs;
                                 if (F.type === 2) {
                                     E[F.p + "_a"] = F.as
                                 }
                             } else {
                                 if (F.type === 3) {
                                     E[F.p + "_y"] = F.ys
                                 }
                             }
                             F = F._next
                         }
                         F = this._firstPT
                     } else {
                         this._firstPT = I;
                         if (I._prev) {
                             I._prev._next = null
                         }
                         I = I._prev = null
                     }
                     for (; F !== I;) {
                         if (G[F.p]) {
                             N[F.p] = F.s + F.c;
                             if (J === L) {
                                 G[F.p].e = F.e
                             }
                             if (F.type === 1 || F.type === 2) {
                                 N[F.p + "_g"] = F.gs + F.gc;
                                 N[F.p + "_b"] = F.bs + F.bc;
                                 F.type === 2 && (N[F.p + "_a"] = F.as + F.ac)
                             } else {
                                 F.type === 3 && (N[F.p + "_y"] = F.ys + F.yc)
                             } if (J === 0) {
                                 F.c = F.ac = F.gc = F.bc = F.yc = 0
                             }
                         }
                         F = F._next
                     }
                     B[H++] = N
                 }
                 this._transform = M;
                 l = y;
                 v.values = B;
                 if (v.autoRotate === 0) {
                     v.autoRotate = true
                 }
                 if (v.autoRotate && !(v.autoRotate instanceof Array)) {
                     J = v.autoRotate == true ? 0 : Number(v.autoRotate) * Math.PI / 180;
                     v.autoRotate = B[0].left != null ? [
                         ["left", "top", "rotation", J, true]
                     ] : B[0].x != null ? [
                         ["x", "y", "rotation", J, true]
                     ] : false
                 }
                 if ((A._autoRotate = v.autoRotate) && !M) {
                     this._transform = t(u, z, true)
                 }
                 O._onInitTween(E, v, this._tween);
                 v.values = C
             } else {
                 console.log("Error: BezierPlugin not loaded.")
             }
         };
         aq.setRatio = function (r) {
             var o = this._firstPT,
                 w = this._bezier,
                 u = 1e-06,
                 z, v;
             if (w) {
                 w._plugin.setRatio(r);
                 var y = w._pt,
                     x = w._proxy;
                 for (v = y.length; --v > -1;) {
                     o = y[v];
                     o.s = x[o.p];
                     if (o.type === 1 || o.type === 2) {
                         o.gs = x[o.p + "_g"];
                         o.bs = x[o.p + "_b"];
                         if (o.type === 2) {
                             o.as = x[o.p + "_a"]
                         }
                     } else {
                         if (o.type === 3) {
                             o.ys = x[o.p + "_y"]
                         }
                     }
                 }
                 if (w._autoRotate) {
                     this._transform.rotation = x.rotation
                 }
             }
             if (r === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                 for (; o;) {
                     o.t[o.p] = o.e;
                     if (o.type === 4 && o.s + o.c === 1) {
                         this._style.removeAttribute("filter");
                         if (am(this._target, "filter")) {
                             o.t[o.p] = o.e
                         }
                     }
                     o = o._next
                 }
             } else {
                 if (r || !(this._tween._time === this._tween._duration || this._tween._time === 0)) {
                     for (; o;) {
                         z = o.c * r + o.s;
                         o.r ? z = z > 0 ? z + 0.5 >> 0 : z - 0.5 >> 0 : z < u && z > -u && (z = 0);
                         if (o.type) {
                             if (o.type === 1) {
                                 o.t[o.p] = "rgb(" + (z >> 0) + ", " + (o.gs + r * o.gc >> 0) + ", " + (o.bs + r * o.bc >> 0) + ")"
                             } else {
                                 if (o.type === 2) {
                                     o.t[o.p] = "rgba(" + (z >> 0) + ", " + (o.gs + r * o.gc >> 0) + ", " + (o.bs + r * o.bc >> 0) + ", " + (o.as + r * o.ac) + ")"
                                 } else {
                                     if (o.type === -1) {
                                         o.t[o.p] = o.i
                                     } else {
                                         if (o.type === 3) {
                                             w = o.ys + r * o.yc;
                                             o.r && (w = w > 0 ? w + 0.5 >> 0 : w - 0.5 >> 0);
                                             o.t[o.p] = z + o.sfx + " " + w + o.ysfx
                                         } else {
                                             if (o.dup) {
                                                 o.t.filter = o.t.filter || "alpha(opacity=100)"
                                             }
                                             o.t.filter = o.t.filter.indexOf("opacity") === -1 ? o.t.filter + (" alpha(opacity=" + (z * 100 >> 0) + ")") : o.t.filter.replace(af, "opacity=" + (z * 100 >> 0))
                                         }
                                     }
                                 }
                             }
                         } else {
                             o.t[o.p] = z + o.sfx
                         }
                         o = o._next
                     }
                 } else {
                     for (; o;) {
                         o.t[o.p] = o.b;
                         if (o.type === 4 && o.s === 1) {
                             this._style.removeAttribute("filter");
                             if (am(this._target, "filter")) {
                                 o.t[o.p] = o.b
                             }
                         }
                         o = o._next
                     }
                 }
             } if (this._transform) {
                 o = this._transform;
                 if (ah && !o.rotation && !o.skewX) {
                     this._style[ah] = (o.x || o.y ? "translate(" + o.x + "px," + o.y + "px) " : "") + (o.scaleX !== 1 || o.scaleY !== 1 ? "scale(" + o.scaleX + "," + o.scaleY + ")" : "") || "translate(0px,0px)"
                 } else {
                     var y = ah ? o.rotation : -o.rotation,
                         A = ah ? y - o.skewX : y + o.skewX,
                         w = Math.cos(y) * o.scaleX,
                         y = Math.sin(y) * o.scaleX,
                         x = Math.sin(A) * -o.scaleY,
                         A = Math.cos(A) * o.scaleY,
                         E;
                     w < u && w > -u && (w = 0);
                     y < u && y > -u && (y = 0);
                     x < u && x > -u && (x = 0);
                     A < u && A > -u && (A = 0);
                     if (ah) {
                         this._style[ah] = "matrix(" + w + "," + y + "," + x + "," + A + "," + o.x + "," + o.y + ")"
                     } else {
                         if (E = this._target.currentStyle) {
                             u = y;
                             y = -x;
                             x = -u;
                             u = this._style.filter;
                             this._style.filter = "";
                             v = this._target.offsetWidth;
                             z = this._target.offsetHeight;
                             var F = E.position !== "absolute",
                                 C = "progid:DXImageTransform.Microsoft.Matrix(M11=" + w + ", M12=" + y + ", M21=" + x + ", M22=" + A,
                                 H = o.x,
                                 I = o.y,
                                 J, G;
                             if (o.ox != null) {
                                 J = (o.oxp ? v * o.ox * 0.01 : o.ox) - v / 2;
                                 G = (o.oyp ? z * o.oy * 0.01 : o.oy) - z / 2;
                                 H = J - (J * w + G * y) + o.x;
                                 I = G - (J * x + G * A) + o.y
                             }
                             if (F) {
                                 J = v / 2;
                                 G = z / 2;
                                 C = C + (", Dx=" + (J - (J * w + G * y) + H) + ", Dy=" + (G - (J * x + G * A) + I) + ")")
                             } else {
                                 var B = ar < 8 ? 1 : -1;
                                 J = o.ieOffsetX || 0;
                                 G = o.ieOffsetY || 0;
                                 o.ieOffsetX = Math.round((v - ((w < 0 ? -w : w) * v + (y < 0 ? -y : y) * z)) / 2 + H);
                                 o.ieOffsetY = Math.round((z - ((A < 0 ? -A : A) * z + (x < 0 ? -x : x) * v)) / 2 + I);
                                 for (v = 0; v < 4; v++) {
                                     H = D[v];
                                     z = E[H];
                                     z = z.indexOf("px") !== -1 ? parseFloat(z) : aB(this._target, H, parseFloat(z), z.replace(ad, "")) || 0;
                                     I = z !== o[H] ? v < 2 ? -o.ieOffsetX : -o.ieOffsetY : v < 2 ? J - o.ieOffsetX : G - o.ieOffsetY;
                                     this._style[H] = (o[H] = Math.round(z - I * (v === 0 || v === 2 ? 1 : B))) + "px"
                                 }
                                 C = C + ", sizingMethod='auto expand')"
                             }
                             this._style.filter = u.indexOf("progid:DXImageTransform.Microsoft.Matrix(") !== -1 ? u.replace(n, C) : u + " " + C;
                             if (r === 0 || r === 1) {
                                 if (w === 1 && y === 0 && x === 0 && A === 1 && (!F || C.indexOf("Dx=0, Dy=0") !== -1)) {
                                     (!af.test(u) || parseFloat(RegExp.$1) === 100) && this._style.removeAttribute("filter")
                                 }
                             }
                         }
                     }
                 }
             }
             if (this._classData) {
                 o = this._classData;
                 if (r === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                     for (v = o.props.length; --v > -1;) {
                         this._style[o.props[v]] = ""
                     }
                     this._target.className = o.e
                 } else {
                     if (this._target.className !== o.b) {
                         this._target.className = o.b
                     }
                 }
             }
         };
         aq._kill = function (o) {
             var m = o,
                 q;
             if (o.autoAlpha || o.alpha) {
                 m = {};
                 for (q in o) {
                     m[q] = o[q]
                 }
                 m.opacity = 1;
                 if (m.autoAlpha) {
                     m.visibility = 1
                 }
             }
             return j.prototype._kill.call(this, m)
         };
         j.activate([ak]);
         return ak
     }, !0)
 });
 window._gsDefine && _gsQueue.pop()();
 /*
  * VERSION: beta 1.29
  * DATE: 2012-07-23
  * JavaScript
  * UPDATES AND DOCS AT: http://www.greensock.com
  *
  * Copyright (c) 2008-2012, GreenSock. All rights reserved.
  * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for
  * corporate Club GreenSock members, the software agreement that was issued with the corporate
  * membership.
  *
  * @author: Jack Doyle, jack@greensock.com
  */
 (function (V) {
     var l = function (d) {
             var d = d.split("."),
                 j = V,
                 f;
             for (f = 0; f < d.length; f++) {
                 j[d[f]] = j = j[d[f]] || {}
             }
             return j
         },
         X = l("com.greensock"),
         Z, R, e, ak, O, ag = {},
         c = function (f, m, j, p) {
             this.sc = ag[f] ? ag[f].sc : [];
             ag[f] = this;
             this.gsClass = null;
             this.def = j;
             var o = m || [],
                 n = [];
             this.check = function (d) {
                 for (var r = o.length, q = 0, t; - 1 < --r;) {
                     (t = ag[o[r]] || new c(o[r])).gsClass ? n[r] = t.gsClass : (q++, d && t.sc.push(this))
                 }
                 if (0 === q && j) {
                     var d = ("com.greensock." + f).split("."),
                         r = d.pop(),
                         s = l(d.join("."))[r] = this.gsClass = j.apply(j, n);
                     p && ((V.GreenSockGlobals || V)[r] = s, "function" === typeof define && define.amd ? define((V.GreenSockAMDPath ? V.GreenSockAMDPath + "/" : "") + f.split(".").join("/"), [], function () {
                         return s
                     }) : "undefined" !== typeof module && module.exports && (module.exports = s));
                     for (r = 0; r < this.sc.length; r++) {
                         this.sc[r].check(!1)
                     }
                 }
             };
             this.check(!0)
         },
         ab = X._class = function (d, j, f) {
             new c(d, [], function () {
                 return j
             }, f);
             return j
         };
     V._gsDefine = function (d, j, f, m) {
         return new c(d, j, f, m)
     };
     var P = [0, 0, 1, 1],
         h = [],
         ad = ab("easing.Ease", function (d, j, f, m) {
             this._func = d;
             this._type = f || 0;
             this._power = m || 0;
             this._params = j ? P.concat(j) : P
         }, !0);
     e = ad.prototype;
     e._calcEnd = !1;
     e.getRatio = function (d) {
         if (this._func) {
             return this._params[0] = d, this._func.apply(null, this._params)
         }
         var j = this._type,
             f = this._power,
             m = 1 === j ? 1 - d : 2 === j ? d : 0.5 > d ? 2 * d : 2 * (1 - d);
         1 === f ? m *= m : 2 === f ? m *= m * m : 3 === f ? m *= m * m * m : 4 === f && (m *= m * m * m * m);
         return 1 === j ? 1 - m : 2 === j ? m : 0.5 > d ? m / 2 : 1 - m / 2
     };
     Z = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
     for (R = Z.length; - 1 < --R;) {
         e = ab("easing." + Z[R], function () {}, !0), ak = ab("easing.Power" + R, function () {}, !0), e.easeOut = ak.easeOut = new ad(null, null, 1, R), e.easeIn = ak.easeIn = new ad(null, null, 2, R), e.easeInOut = ak.easeInOut = new ad(null, null, 3, R)
     }
     ab("easing.Strong", X.easing.Power4, !0);
     X.easing.Linear.easeNone = X.easing.Linear.easeIn;
     e = ab("events.EventDispatcher", function (d) {
         this._listeners = {};
         this._eventTarget = d || this
     }).prototype;
     e.addEventListener = function (f, m, j, r, o) {
         var o = o || 0,
             n = this._listeners[f],
             q = 0,
             p;
         null == n && (this._listeners[f] = n = []);
         for (p = n.length; - 1 < --p;) {
             f = n[p], f.c === m ? n.splice(p, 1) : 0 === q && f.pr < o && (q = p + 1)
         }
         n.splice(q, 0, {
             c: m,
             s: j,
             up: r,
             pr: o
         })
     };
     e.removeEventListener = function (d, j) {
         var f = this._listeners[d];
         if (f) {
             for (var m = f.length; - 1 < --m;) {
                 if (f[m].c === j) {
                     f.splice(m, 1);
                     break
                 }
             }
         }
     };
     e.dispatchEvent = function (f) {
         var m = this._listeners[f];
         if (m) {
             for (var j = m.length, o, n = this._eventTarget; - 1 < --j;) {
                 o = m[j], o.up ? o.c.call(o.s || n, {
                     type: f,
                     target: n
                 }) : o.c.call(o.s || n)
             }
         }
     };
     var a = V.requestAnimationFrame,
         b = V.cancelAnimationFrame,
         Q = Date.now || function () {
             return (new Date).getTime()
         };
     Z = ["ms", "moz", "webkit", "o"];
     for (R = Z.length; - 1 < --R && !a;) {
         a = V[Z[R] + "RequestAnimationFrame"], b = V[Z[R] + "CancelAnimationFrame"] || V[Z[R] + "CancelRequestAnimationFrame"]
     }
     b || (b = function (d) {
         V.clearTimeout(d)
     });
     ab("Ticker", function (j, n) {
         this.frame = this.time = 0;
         var m = this,
             s = Q(),
             o = !1 !== n,
             u, r, q, p, t;
         this.tick = function () {
             m.time = (Q() - s) / 1000;
             if (!u || m.time >= t) {
                 m.frame++, t = m.time + p - (m.time - t) - 0.0005, t <= m.time && (t = m.time + 0.001), m.dispatchEvent("tick")
             }
             q = r(m.tick)
         };
         this.fps = function (d) {
             if (!arguments.length) {
                 return u
             }
             u = d;
             p = 1 / (u || 60);
             t = this.time + p;
             r = 0 === u ? function () {} : !o || !a ? function (f) {
                 return V.setTimeout(f, 1000 * (t - m.time) + 1 >> 0 || 1)
             } : a;
             b(q);
             q = r(m.tick)
         };
         this.useRAF = function (d) {
             if (!arguments.length) {
                 return o
             }
             o = d;
             this.fps(u)
         };
         this.fps(j)
     });
     e = X.Ticker.prototype = new X.events.EventDispatcher;
     e.constructor = X.Ticker;
     var aa = ab("core.Animation", function (d, j) {
             this.vars = j || {};
             this._duration = this._totalDuration = d || 0;
             this._delay = Number(this.vars.delay) || 0;
             this._timeScale = 1;
             this._active = !0 == this.vars.immediateRender;
             this.data = this.vars.data;
             this._reversed = !0 == this.vars.reversed;
             if (ae) {
                 O || (ac.tick(), O = !0);
                 var f = this.vars.useFrames ? ah : ae;
                 f.insert(this, f._time);
                 this.vars.paused && this.paused(!0)
             }
         }),
         ac = aa.ticker = new X.Ticker;
     e = aa.prototype;
     e._dirty = e._gc = e._initted = e._paused = !1;
     e._totalTime = e._time = 0;
     e._rawPrevTime = -1;
     e._next = e._last = e._onUpdate = e._timeline = e.timeline = null;
     e._paused = !1;
     e.play = function (d, f) {
         arguments.length && this.seek(d, f);
         this.reversed(!1);
         return this.paused(!1)
     };
     e.pause = function (d, f) {
         arguments.length && this.seek(d, f);
         return this.paused(!0)
     };
     e.resume = function (d, f) {
         arguments.length && this.seek(d, f);
         return this.paused(!1)
     };
     e.seek = function (d, f) {
         return this.totalTime(Number(d), !1 != f)
     };
     e.restart = function (d, f) {
         this.reversed(!1);
         this.paused(!1);
         return this.totalTime(d ? -this._delay : 0, !1 != f)
     };
     e.reverse = function (d, f) {
         arguments.length && this.seek(d || this.totalDuration(), f);
         this.reversed(!0);
         return this.paused(!1)
     };
     e.render = function () {};
     e.invalidate = function () {
         return this
     };
     e._enabled = function (d, f) {
         this._gc = !d;
         this._active = d && !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration;
         !0 != f && (d && null == this.timeline ? this._timeline.insert(this, this._startTime - this._delay) : !d && null != this.timeline && this._timeline._remove(this, !0));
         return !1
     };
     e._kill = function () {
         return this._enabled(!1, !1)
     };
     e.kill = function (d, f) {
         this._kill(d, f);
         return this
     };
     e._uncache = function (d) {
         for (d = d ? this : this.timeline; d;) {
             d._dirty = !0, d = d.timeline
         }
         return this
     };
     e.eventCallback = function (f, m, j, o) {
         if (null == f) {
             return null
         }
         if ("on" === f.substr(0, 2)) {
             if (1 === arguments.length) {
                 return this.vars[f]
             }
             if (null == m) {
                 delete this.vars[f]
             } else {
                 if (this.vars[f] = m, this.vars[f + "Params"] = j, this.vars[f + "Scope"] = o, j) {
                     for (var n = j.length; - 1 < --n;) {
                         "{self}" === j[n] && (j = this.vars[f + "Params"] = j.concat(), j[n] = this)
                     }
                 }
             }
             "onUpdate" === f && (this._onUpdate = m)
         }
         return this
     };
     e.delay = function (d) {
         if (!arguments.length) {
             return this._delay
         }
         this._timeline.smoothChildTiming && this.startTime(this._startTime + d - this._delay);
         this._delay = d;
         return this
     };
     e.duration = function (d) {
         if (!arguments.length) {
             return this._dirty = !1, this._duration
         }
         this._duration = this._totalDuration = d;
         this._uncache(!0);
         this._timeline.smoothChildTiming && this._active && 0 != d && this.totalTime(this._totalTime * (d / this._duration), !0);
         return this
     };
     e.totalDuration = function (d) {
         this._dirty = !1;
         return !arguments.length ? this._totalDuration : this.duration(d)
     };
     e.time = function (d, f) {
         if (!arguments.length) {
             return this._time
         }
         this._dirty && this.totalDuration();
         d > this._duration && (d = this._duration);
         return this.totalTime(d, f)
     };
     e.totalTime = function (d, j) {
         if (!arguments.length) {
             return this._totalTime
         }
         if (this._timeline) {
             0 > d && (d += this.totalDuration());
             if (this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), d > this._totalDuration && (d = this._totalDuration), this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (!this._reversed ? d : this._totalDuration - d) / this._timeScale, this._timeline._dirty || this._uncache(!1), !this._timeline._active)) {
                 for (var f = this._timeline; f._timeline;) {
                     f.totalTime(f._totalTime, !0), f = f._timeline
                 }
             }
             this._gc && this._enabled(!0, !1);
             this._totalTime != d && this.render(d, j, !1)
         }
         return this
     };
     e.startTime = function (d) {
         if (!arguments.length) {
             return this._startTime
         }
         d != this._startTime && (this._startTime = d, this.timeline && this.timeline._sortChildren && this.timeline.insert(this, d - this._delay));
         return this
     };
     e.timeScale = function (d) {
         if (!arguments.length) {
             return this._timeScale
         }
         d = d || 1e-06;
         if (this._timeline && this._timeline.smoothChildTiming) {
             var f = this._pauseTime || 0 == this._pauseTime ? this._pauseTime : this._timeline._totalTime;
             this._startTime = f - (f - this._startTime) * this._timeScale / d
         }
         this._timeScale = d;
         return this._uncache(!1)
     };
     e.reversed = function (d) {
         if (!arguments.length) {
             return this._reversed
         }
         d != this._reversed && (this._reversed = d, this.totalTime(this._totalTime, !0));
         return this
     };
     e.paused = function (d) {
         if (!arguments.length) {
             return this._paused
         }
         d != this._paused && this._timeline && (!d && this._timeline.smoothChildTiming && (this._startTime += this._timeline.rawTime() - this._pauseTime, this._uncache(!1)), this._pauseTime = d ? this._timeline.rawTime() : null, this._paused = d, this._active = !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration);
         this._gc && (d || this._enabled(!0, !1));
         return this
     };
     X = ab("core.SimpleTimeline", function (d) {
         aa.call(this, 0, d);
         this.autoRemoveChildren = this.smoothChildTiming = !0
     });
     e = X.prototype = new aa;
     e.constructor = X;
     e.kill()._gc = !1;
     e._first = e._last = null;
     e._sortChildren = !1;
     e.insert = function (f, m) {
         f._startTime = Number(m || 0) + f._delay;
         f._paused && this !== f._timeline && (f._pauseTime = f._startTime + (this.rawTime() - f._startTime) / f._timeScale);
         f.timeline && f.timeline._remove(f, !0);
         f.timeline = f._timeline = this;
         f._gc && f._enabled(!0, !0);
         var j = this._last;
         if (this._sortChildren) {
             for (var n = f._startTime; j && j._startTime > n;) {
                 j = j._prev
             }
         }
         j ? (f._next = j._next, j._next = f) : (f._next = this._first, this._first = f);
         f._next ? f._next._prev = f : this._last = f;
         f._prev = j;
         this._timeline && this._uncache(!0);
         return this
     };
     e._remove = function (d, f) {
         d.timeline === this && (f || d._enabled(!1, !0), d.timeline = null, d._prev ? d._prev._next = d._next : this._first === d && (this._first = d._next), d._next ? d._next._prev = d._prev : this._last === d && (this._last = d._prev), this._timeline && this._uncache(!0));
         return this
     };
     e.render = function (f, m) {
         var j = this._first,
             n;
         for (this._totalTime = this._time = this._rawPrevTime = f; j;) {
             n = j._next;
             if (j._active || f >= j._startTime && !j._paused) {
                 j._reversed ? j.render((!j._dirty ? j._totalDuration : j.totalDuration()) - (f - j._startTime) * j._timeScale, m, !1) : j.render((f - j._startTime) * j._timeScale, m, !1)
             }
             j = n
         }
     };
     e.rawTime = function () {
         return this._totalTime
     };
     var k = ab("TweenLite", function (d, j, f) {
         aa.call(this, j, f);
         if (null == d) {
             throw "Cannot tween an undefined reference."
         }
         this.target = d;
         this._overwrite = null == this.vars.overwrite ? S[k.defaultOverwrite] : "number" === typeof this.vars.overwrite ? this.vars.overwrite >> 0 : S[this.vars.overwrite];
         if ((d instanceof Array || d.jquery) && "object" === typeof d[0]) {
             this._targets = d.slice(0);
             this._propLookup = [];
             this._siblings = [];
             for (d = 0; d < this._targets.length; d++) {
                 f = this._targets[d], f.jquery ? (this._targets.splice(d--, 1), this._targets = this._targets.concat(f.constructor.makeArray(f))) : (this._siblings[d] = ai(f, this, !1), 1 === this._overwrite && 1 < this._siblings[d].length && i(f, this, null, 1, this._siblings[d]))
             }
         } else {
             this._propLookup = {}, this._siblings = ai(d, this, !1), 1 === this._overwrite && 1 < this._siblings.length && i(d, this, null, 1, this._siblings)
         }(this.vars.immediateRender || 0 === j && 0 === this._delay && !1 != this.vars.immediateRender) && this.render(-this._delay, !1, !0)
     }, !0);
     e = k.prototype = new aa;
     e.constructor = k;
     e.kill()._gc = !1;
     e.ratio = 0;
     e._firstPT = e._targets = e._overwrittenProps = null;
     e._notifyPluginsOfEnabled = !1;
     k.version = 12;
     k.defaultEase = e._ease = new ad(null, null, 1, 1);
     k.defaultOverwrite = "auto";
     k.ticker = ac;
     var T = k._plugins = {},
         af = {},
         W = 0,
         Y = {
             ease: 1,
             delay: 1,
             overwrite: 1,
             onComplete: 1,
             onCompleteParams: 1,
             onCompleteScope: 1,
             useFrames: 1,
             runBackwards: 1,
             startAt: 1,
             onUpdate: 1,
             onUpdateParams: 1,
             onUpdateScope: 1,
             onStart: 1,
             onStartParams: 1,
             onStartScope: 1,
             onReverseComplete: 1,
             onReverseCompleteParams: 1,
             onReverseCompleteScope: 1,
             onRepeat: 1,
             onRepeatParams: 1,
             onRepeatScope: 1,
             easeParams: 1,
             yoyo: 1,
             orientToBezier: 1,
             immediateRender: 1,
             repeat: 1,
             repeatDelay: 1,
             data: 1,
             paused: 1,
             reversed: 1
         },
         S = {
             none: 0,
             all: 1,
             auto: 2,
             concurrent: 3,
             allOnStart: 4,
             preexisting: 5,
             "true": 1,
             "false": 0
         },
         ah = aa._rootFramesTimeline = new X,
         ae = aa._rootTimeline = new X;
     ae._startTime = ac.time;
     ah._startTime = ac.frame;
     ae._active = ah._active = !0;
     aa._updateRoot = function () {
         ae.render((ac.time - ae._startTime) * ae._timeScale, !1, !1);
         ah.render((ac.frame - ah._startTime) * ah._timeScale, !1, !1);
         if (!(ac.frame % 120)) {
             var d, j, f;
             for (f in af) {
                 j = af[f].tweens;
                 for (d = j.length; - 1 < --d;) {
                     j[d]._gc && j.splice(d, 1)
                 }
                 0 === j.length && delete af[f]
             }
         }
     };
     ac.addEventListener("tick", aa._updateRoot);
     var ai = function (f, m, j) {
             var n = f._gsTweenID,
                 o;
             if (!af[n || (f._gsTweenID = n = "t" + W++)]) {
                 af[n] = {
                     target: f,
                     tweens: []
                 }
             }
             if (m && (f = af[n].tweens, f[o = f.length] = m, j)) {
                 for (; - 1 < --o;) {
                     f[o] === m && f.splice(o, 1)
                 }
             }
             return af[n].tweens
         },
         i = function (n, p, o, q, r) {
             var x, u, t;
             if (1 === q || 4 <= q) {
                 n = r.length;
                 for (x = 0; x < n; x++) {
                     if ((t = r[x]) !== p) {
                         t._gc || t._enabled(!1, !1) && (u = !0)
                     } else {
                         if (5 === q) {
                             break
                         }
                     }
                 }
                 return u
             }
             var s = p._startTime + 1e-10,
                 w = [],
                 v = 0,
                 y;
             for (x = r.length; - 1 < --x;) {
                 if (!((t = r[x]) === p || t._gc || t._paused)) {
                     t._timeline !== p._timeline ? (y = y || U(p, 0), 0 === U(t, y) && (w[v++] = t)) : t._startTime <= s && t._startTime + t.totalDuration() / t._timeScale + 1e-10 > s && ((0 === p._duration || !t._initted) && 2e-10 >= s - t._startTime || (w[v++] = t))
                 }
             }
             for (x = v; - 1 < --x;) {
                 if (t = w[x], 2 === q && t._kill(o, n) && (u = !0), 2 !== q || !t._firstPT && t._initted) {
                     t._enabled(!1, !1) && (u = !0)
                 }
             }
             return u
         },
         U = function (f, m) {
             for (var j = f._timeline, n = j._timeScale, o = f._startTime; j._timeline;) {
                 o += j._startTime;
                 n *= j._timeScale;
                 if (j._paused) {
                     return -100
                 }
                 j = j._timeline
             }
             o /= n;
             return o > m ? o - m : !f._initted && 2e-10 > o - m ? 1e-10 : (o += f.totalDuration() / f._timeScale / n) > m ? 0 : o - m - 1e-10
         };
     e._init = function () {
         this.vars.startAt && (this.vars.startAt.overwrite = 0, this.vars.startAt.immediateRender = !0, k.to(this.target, 0, this.vars.startAt));
         var d, f;
         this._ease = this.vars.ease instanceof ad ? this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease : "function" === typeof this.vars.ease ? new ad(this.vars.ease, this.vars.easeParams) : k.defaultEase;
         this._easeType = this._ease._type;
         this._easePower = this._ease._power;
         this._firstPT = null;
         if (this._targets) {
             for (d = this._targets.length; - 1 < --d;) {
                 if (this._initProps(this._targets[d], this._propLookup[d] = {}, this._siblings[d], this._overwrittenProps ? this._overwrittenProps[d] : null)) {
                     f = !0
                 }
             }
         } else {
             f = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps)
         }
         f && k._onPluginEvent("_onInitAllProps", this);
         this._overwrittenProps && null == this._firstPT && "function" !== typeof this.target && this._enabled(!1, !1);
         if (this.vars.runBackwards) {
             for (d = this._firstPT; d;) {
                 d.s += d.c, d.c = -d.c, d = d._next
             }
         }
         this._onUpdate = this.vars.onUpdate;
         this._initted = !0
     };
     e._initProps = function (j, n, m, o) {
         var p, u, s, r, q, t;
         if (null == j) {
             return !1
         }
         for (p in this.vars) {
             if (Y[p]) {
                 if ("onStartParams" === p || "onUpdateParams" === p || "onCompleteParams" === p || "onReverseCompleteParams" === p || "onRepeatParams" === p) {
                     if (q = this.vars[p]) {
                         for (u = q.length; - 1 < --u;) {
                             "{self}" === q[u] && (q = this.vars[p] = q.concat(), q[u] = this)
                         }
                     }
                 }
             } else {
                 if (T[p] && (r = new T[p])._onInitTween(j, this.vars[p], this)) {
                     this._firstPT = t = {
                         _next: this._firstPT,
                         t: r,
                         p: "setRatio",
                         s: 0,
                         c: 1,
                         f: !0,
                         n: p,
                         pg: !0,
                         pr: r._priority
                     };
                     for (u = r._overwriteProps.length; - 1 < --u;) {
                         n[r._overwriteProps[u]] = this._firstPT
                     }
                     if (r._priority || r._onInitAllProps) {
                         s = !0
                     }
                     if (r._onDisable || r._onEnable) {
                         this._notifyPluginsOfEnabled = !0
                     }
                 } else {
                     this._firstPT = n[p] = t = {
                         _next: this._firstPT,
                         t: j,
                         p: p,
                         f: "function" === typeof j[p],
                         n: p,
                         pg: !1,
                         pr: 0
                     }, t.s = !t.f ? parseFloat(j[p]) : j[p.indexOf("set") || "function" !== typeof j["get" + p.substr(3)] ? p : "get" + p.substr(3)](), t.c = "number" === typeof this.vars[p] ? this.vars[p] - t.s : "string" === typeof this.vars[p] ? parseFloat(this.vars[p].split("=").join("")) : 0
                 }
             }
             t && t._next && (t._next._prev = t)
         }
         return o && this._kill(o, j) ? this._initProps(j, n, m, o) : 1 < this._overwrite && this._firstPT && 1 < m.length && i(j, this, n, this._overwrite, m) ? (this._kill(n, j), this._initProps(j, n, m, o)) : s
     };
     e.render = function (m, o, n) {
         var p = this._time,
             q, r;
         if (m >= this._duration) {
             if (this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (q = !0, r = "onComplete"), 0 === this._duration) {
                 if (0 === m || 0 > this._rawPrevTime) {
                     this._rawPrevTime !== m && (n = !0)
                 }
                 this._rawPrevTime = m
             }
         } else {
             if (0 >= m) {
                 this._totalTime = this._time = 0;
                 this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                 if (0 !== p || 0 === this._duration && 0 < this._rawPrevTime) {
                     r = "onReverseComplete", q = this._reversed
                 }
                 0 > m ? (this._active = !1, 0 === this._duration && (0 <= this._rawPrevTime && (n = !0), this._rawPrevTime = m)) : this._initted || (n = !0)
             } else {
                 if (this._totalTime = this._time = m, this._easeType) {
                     var t = m / this._duration,
                         s = this._easeType,
                         u = this._easePower;
                     if (1 === s || 3 === s && 0.5 <= t) {
                         t = 1 - t
                     }
                     3 === s && (t *= 2);
                     1 === u ? t *= t : 2 === u ? t *= t * t : 3 === u ? t *= t * t * t : 4 === u && (t *= t * t * t * t);
                     this.ratio = 1 === s ? 1 - t : 2 === s ? t : 0.5 > m / this._duration ? t / 2 : 1 - t / 2
                 } else {
                     this.ratio = this._ease.getRatio(m / this._duration)
                 }
             }
         } if (this._time !== p || n) {
             this._initted || (this._init(), !q && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration)));
             !this._active && !this._paused && (this._active = !0);
             if (0 === p && this.vars.onStart && (0 !== this._time || 0 === this._duration)) {
                 o || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || h)
             }
             for (m = this._firstPT; m;) {
                 if (m.f) {
                     m.t[m.p](m.c * this.ratio + m.s)
                 } else {
                     m.t[m.p] = m.c * this.ratio + m.s
                 }
                 m = m._next
             }
             this._onUpdate && (o || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h));
             r && !this._gc && (q && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), o || this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || h))
         }
     };
     e._kill = function (m, o) {
         "all" === m && (m = null);
         if (null == m && (null == o || o == this.target)) {
             return this._enabled(!1, !1)
         }
         var o = o || this._targets || this.target,
             n, p, q, r, t, s, u;
         if ((o instanceof Array || o.jquery) && "object" === typeof o[0]) {
             for (n = o.length; - 1 < --n;) {
                 this._kill(m, o[n]) && (t = !0)
             }
         } else {
             if (this._targets) {
                 for (n = this._targets.length; - 1 < --n;) {
                     if (o === this._targets[n]) {
                         r = this._propLookup[n] || {};
                         this._overwrittenProps = this._overwrittenProps || [];
                         p = this._overwrittenProps[n] = m ? this._overwrittenProps[n] || {} : "all";
                         break
                     }
                 }
             } else {
                 if (o !== this.target) {
                     return !1
                 }
                 r = this._propLookup;
                 p = this._overwrittenProps = m ? this._overwrittenProps || {} : "all"
             } if (r) {
                 for (q in s = m || r, u = m != p && "all" != p && m != r && (null == m || !0 != m._tempKill), s) {
                     if (n = r[q]) {
                         n.pg && n.t._kill(s) && (t = !0);
                         if (!n.pg || 0 === n.t._overwriteProps.length) {
                             n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null
                         }
                         delete r[q]
                     }
                     u && (p[q] = 1)
                 }
             }
         }
         return t
     };
     e.invalidate = function () {
         this._notifyPluginsOfEnabled && k._onPluginEvent("_onDisable", this);
         this._onUpdate = this._overwrittenProps = this._firstPT = null;
         this._initted = this._active = this._notifyPluginsOfEnabled = !1;
         this._propLookup = this._targets ? {} : [];
         return this
     };
     e._enabled = function (d, j) {
         if (d && this._gc) {
             if (this._targets) {
                 for (var f = this._targets.length; - 1 < --f;) {
                     this._siblings[f] = ai(this._targets[f], this, !0)
                 }
             } else {
                 this._siblings = ai(this.target, this, !0)
             }
         }
         aa.prototype._enabled.call(this, d, j);
         return this._notifyPluginsOfEnabled && this._firstPT ? k._onPluginEvent(d ? "_onEnable" : "_onDisable", this) : !1
     };
     k.to = function (d, j, f) {
         return new k(d, j, f)
     };
     k.from = function (d, j, f) {
         f.runBackwards = !0;
         !1 != f.immediateRender && (f.immediateRender = !0);
         return new k(d, j, f)
     };
     k.fromTo = function (f, m, j, n) {
         n.startAt = j;
         j.immediateRender && (n.immediateRender = !0);
         return new k(f, m, n)
     };
     k.delayedCall = function (f, m, j, n, o) {
         return new k(m, 0, {
             delay: f,
             onComplete: m,
             onCompleteParams: j,
             onCompleteScope: n,
             onReverseComplete: m,
             onReverseCompleteParams: j,
             onReverseCompleteScope: n,
             immediateRender: !1,
             useFrames: o,
             overwrite: 0
         })
     };
     k.set = function (d, f) {
         return new k(d, 0, f)
     };
     k.killTweensOf = k.killDelayedCallsTo = function (f, m) {
         for (var j = k.getTweensOf(f), n = j.length; - 1 < --n;) {
             j[n]._kill(m, f)
         }
     };
     k.getTweensOf = function (f) {
         if (null != f) {
             var m, j, n;
             if ((f instanceof Array || f.jquery) && "object" === typeof f[0]) {
                 m = f.length;
                 for (j = []; - 1 < --m;) {
                     j = j.concat(k.getTweensOf(f[m]))
                 }
                 for (m = j.length; - 1 < --m;) {
                     n = j[m];
                     for (f = m; - 1 < --f;) {
                         n === j[f] && j.splice(m, 1)
                     }
                 }
             } else {
                 j = ai(f).concat();
                 for (m = j.length; - 1 < --m;) {
                     j[m]._gc && j.splice(m, 1)
                 }
             }
             return j
         }
     };
     var aj = ab("plugins.TweenPlugin", function (d, f) {
         this._overwriteProps = (d || "").split(",");
         this._propName = this._overwriteProps[0];
         this._priority = f || 0
     }, !0);
     e = aj.prototype;
     aj.version = 12;
     aj.API = 2;
     e._firstPT = null;
     e._addTween = function (j, n, m, o, p, q) {
         var r;
         if (null != o && (r = "number" === typeof o || "=" !== o.charAt(1) ? Number(o) - m : Number(o.split("=").join("")))) {
             this._firstPT = {
                 _next: this._firstPT,
                 t: j,
                 p: n,
                 s: m,
                 c: r,
                 f: "function" === typeof j[n],
                 n: p || n,
                 r: q
             }, this._firstPT._next && (this._firstPT._next._prev = this._firstPT)
         }
     };
     e.setRatio = function (d) {
         for (var j = this._firstPT, f; j;) {
             f = j.c * d + j.s;
             j.r && (f = f + (0 < f ? 0.5 : -0.5) >> 0);
             if (j.f) {
                 j.t[j.p](f)
             } else {
                 j.t[j.p] = f
             }
             j = j._next
         }
     };
     e._kill = function (d) {
         if (null != d[this._propName]) {
             this._overwriteProps = []
         } else {
             for (var f = this._overwriteProps.length; - 1 < --f;) {
                 null != d[this._overwriteProps[f]] && this._overwriteProps.splice(f, 1)
             }
         }
         for (f = this._firstPT; f;) {
             null != d[f.n] && ((f._next && (f._next._prev = f._prev), f._prev) ? (f._prev._next = f._next, f._prev = null) : this._firstPT === f && (this._firstPT = f._next)), f = f._next
         }
         return !1
     };
     e._roundProps = function (d, j) {
         for (var f = this._firstPT; f;) {
             if (d[this._propName] || null != f.n && d[f.n.split(this._propName + "_").join("")]) {
                 f.r = j
             }
             f = f._next
         }
     };
     k._onPluginEvent = function (j, n) {
         var m = n._firstPT,
             o;
         if ("_onInitAllProps" === j) {
             for (var p, q, s, r; m;) {
                 r = m._next;
                 for (p = q; p && p.pr > m.pr;) {
                     p = p._next
                 }(m._prev = p ? p._prev : s) ? m._prev._next = m : q = m;
                 (m._next = p) ? p._prev = m : s = m;
                 m = r
             }
             m = n._firstPT = q
         }
         for (; m;) {
             m.pg && "function" === typeof m.t[j] && m.t[j]() && (o = !0), m = m._next
         }
         return o
     };
     aj.activate = function (d) {
         for (var f = d.length; - 1 < --f;) {
             d[f].API === aj.API && (k._plugins[(new d[f])._propName] = d[f])
         }
         return !0
     };
     if (Z = V._gsQueue) {
         for (R = 0; R < Z.length; R++) {
             Z[R]()
         }
         for (e in ag) {
             ag[e].def || console.log("Warning: TweenLite encountered missing dependency: com.greensock." + e)
         }
     }
 })(window);
 (window._gsQueue || (window._gsQueue = [])).push(function () {
     _gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (f, e, b) {
         var c = function (d) {
                 e.call(this, d);
                 this._labels = {};
                 this.autoRemoveChildren = !0 == this.vars.autoRemoveChildren;
                 this.smoothChildTiming = !0 == this.vars.smoothChildTiming;
                 this._sortChildren = !0;
                 this._onUpdate = this.vars.onUpdate;
                 for (var d = i.length, j, h; - 1 < --d;) {
                     if (h = this.vars[i[d]]) {
                         for (j = h.length; - 1 < --j;) {
                             "{self}" === h[j] && (h = this.vars[i[d]] = h.concat(), h[j] = this)
                         }
                     }
                 }
                 this.vars.tweens instanceof Array && this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0)
             },
             i = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
             k = [],
             a = c.prototype = new e;
         a.constructor = c;
         a.kill()._gc = !1;
         a.to = function (d, j, h, m, l) {
             return this.insert(new b(d, j, h), this._parseTimeOrLabel(l) + (m || 0))
         };
         a.from = function (d, j, h, m, l) {
             return this.insert(b.from(d, j, h), this._parseTimeOrLabel(l) + (m || 0))
         };
         a.fromTo = function (h, l, j, o, n, m) {
             return this.insert(b.fromTo(h, l, j, o), this._parseTimeOrLabel(m) + (n || 0))
         };
         a.staggerTo = function (h, l, j, o, n, m, q, r, s) {
             q = new c({
                 onComplete: q,
                 onCompleteParams: r,
                 onCompleteScope: s
             });
             o = o || 0;
             for (r = 0; r < h.length; r++) {
                 q.insert(new b(h[r], l, j), r * o)
             }
             return this.insert(q, this._parseTimeOrLabel(m) + (n || 0))
         };
         a.staggerFrom = function (h, l, j, o, n, m, q, r, p) {
             null == j.immediateRender && (j.immediateRender = !0);
             j.runBackwards = !0;
             return this.staggerTo(h, l, j, o, n, m, q, r, p)
         };
         a.staggerFromTo = function (j, m, l, p, o, n, s, t, q, r) {
             p.startAt = l;
             l.immediateRender && (p.immediateRender = !0);
             return this.staggerTo(j, m, p, o, n, s, t, q, r)
         };
         a.call = function (d, j, h, m, l) {
             return this.insert(b.delayedCall(0, d, j, h), this._parseTimeOrLabel(l) + (m || 0))
         };
         a.set = function (d, j, h, l) {
             j.immediateRender = !1;
             return this.insert(new b(d, 0, j), this._parseTimeOrLabel(l) + (h || 0))
         };
         c.exportRoot = function (h, l) {
             h = h || {};
             null == h.smoothChildTiming && (h.smoothChildTiming = !0);
             var j = new c(h),
                 o = j._timeline;
             null == l && (l = !0);
             o._remove(j, !0);
             j._startTime = 0;
             j._rawPrevTime = j._time = j._totalTime = o._time;
             for (var n = o._first, m; n;) {
                 m = n._next, (!l || !(n instanceof b && n.target == n.vars.onComplete)) && j.insert(n, n._startTime - n._delay), n = m
             }
             o.insert(j, 0);
             return j
         };
         a.insert = function (d, j) {
             if (!(d instanceof f)) {
                 if (d instanceof Array) {
                     return this.insertMultiple(d, j)
                 }
                 if ("string" === typeof d) {
                     return this.addLabel(d, this._parseTimeOrLabel(j || 0, !0))
                 }
                 if ("function" === typeof d) {
                     d = b.delayedCall(0, d)
                 } else {
                     throw "ERROR: Cannot insert() " + d + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String."
                 }
             }
             e.prototype.insert.call(this, d, this._parseTimeOrLabel(j || 0, !0));
             if (this._gc && !this._paused && this._time === this._duration && this._time < this.duration()) {
                 for (var h = this; h._gc && h._timeline;) {
                     h._timeline.smoothChildTiming ? h.totalTime(h._totalTime, !0) : h._enabled(!0, !1), h = h._timeline
                 }
             }
             return this
         };
         a.remove = function (d) {
             if (d instanceof f) {
                 return this._remove(d, !1)
             }
             if (d instanceof Array) {
                 for (var h = d.length; - 1 < --h;) {
                     this.remove(d[h])
                 }
                 return this
             }
             return "string" === typeof d ? this.removeLabel(d) : this.kill(null, d)
         };
         a.append = function (d, h) {
             return this.insert(d, this.duration() + (h || 0))
         };
         a.insertMultiple = function (h, l, j, o) {
             for (var j = j || "normal", o = o || 0, n, m = this._parseTimeOrLabel(l || 0, !0), p = h.length, l = 0; l < p; l++) {
                 if ((n = h[l]) instanceof Array) {
                     n = new c({
                         tweens: n
                     })
                 }
                 this.insert(n, m);
                 "string" === typeof n || "function" === typeof n || ("sequence" === j ? m = n._startTime + n.totalDuration() / n._timeScale : "start" === j && (n._startTime -= n.delay()));
                 m += o
             }
             return this._uncache(!0)
         };
         a.appendMultiple = function (d, j, h, l) {
             return this.insertMultiple(d, this.duration() + (j || 0), h, l)
         };
         a.addLabel = function (d, h) {
             this._labels[d] = h;
             return this
         };
         a.removeLabel = function (d) {
             delete this._labels[d];
             return this
         };
         a.getLabelTime = function (d) {
             return null != this._labels[d] ? this._labels[d] : -1
         };
         a._parseTimeOrLabel = function (d, h) {
             return null == d ? this.duration() : "string" === typeof d && isNaN(d) ? null == this._labels[d] ? h ? this._labels[d] = this.duration() : 0 : this._labels[d] : Number(d)
         };
         a.seek = function (d, h) {
             return this.totalTime(this._parseTimeOrLabel(d, !1), !1 != h)
         };
         a.stop = function () {
             return this.paused(!0)
         };
         a.gotoAndPlay = function (d, h) {
             return e.prototype.play.call(this, d, h)
         };
         a.gotoAndStop = function (d, h) {
             return this.pause(d, h)
         };
         a.render = function (m, o, n) {
             this._gc && this._enabled(!0, !1);
             this._active = !this._paused;
             var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                 q = this._time,
                 p = this._startTime,
                 u = this._timeScale,
                 s = this._paused,
                 t, v, w;
             if (m >= r) {
                 this._totalTime = this._time = r;
                 if (!this._reversed && !this._hasPausedChild() && (t = !0, w = "onComplete", 0 === this._duration && (0 === m || 0 > this._rawPrevTime))) {
                     this._rawPrevTime !== m && (n = !0)
                 }
                 this._rawPrevTime = m;
                 m = r + 1e-06
             } else {
                 if (0 >= m) {
                     this._totalTime = this._time = 0;
                     if (0 !== q || 0 === this._duration && 0 < this._rawPrevTime) {
                         w = "onReverseComplete", t = this._reversed
                     }
                     0 > m ? (this._active = !1, 0 === this._duration && 0 <= this._rawPrevTime && (n = !0)) : this._initted || (n = !0);
                     this._rawPrevTime = m;
                     m = -1e-06
                 } else {
                     this._totalTime = this._time = this._rawPrevTime = m
                 }
             } if (this._time !== q || n) {
                 this._initted || (this._initted = !0);
                 0 === q && this.vars.onStart && 0 !== this._time && (o || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || k));
                 if (this._time > q) {
                     for (n = this._first; n;) {
                         v = n._next;
                         if (this._paused && !s) {
                             break
                         } else {
                             if (n._active || n._startTime <= this._time && !n._paused && !n._gc) {
                                 n._reversed ? n.render((!n._dirty ? n._totalDuration : n.totalDuration()) - (m - n._startTime) * n._timeScale, o, !1) : n.render((m - n._startTime) * n._timeScale, o, !1)
                             }
                         }
                         n = v
                     }
                 } else {
                     for (n = this._last; n;) {
                         v = n._prev;
                         if (this._paused && !s) {
                             break
                         } else {
                             if (n._active || n._startTime <= q && !n._paused && !n._gc) {
                                 n._reversed ? n.render((!n._dirty ? n._totalDuration : n.totalDuration()) - (m - n._startTime) * n._timeScale, o, !1) : n.render((m - n._startTime) * n._timeScale, o, !1)
                             }
                         }
                         n = v
                     }
                 }
                 this._onUpdate && (o || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || k));
                 if (w && !this._gc && (p === this._startTime || u != this._timeScale)) {
                     if (0 === this._time || r >= this.totalDuration()) {
                         t && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), o || this.vars[w] && this.vars[w].apply(this.vars[w + "Scope"] || this, this.vars[w + "Params"] || k)
                     }
                 }
             }
         };
         a._hasPausedChild = function () {
             for (var d = this._first; d;) {
                 if (d._paused || d instanceof c && d._hasPausedChild()) {
                     return !0
                 }
                 d = d._next
             }
             return !1
         };
         a.getChildren = function (h, l, j, o) {
             for (var o = o || -9999999999, n = [], m = this._first, p = 0; m;) {
                 m._startTime < o || (m instanceof b ? !1 != l && (n[p++] = m) : (!1 != j && (n[p++] = m), !1 != h && (n = n.concat(m.getChildren(!0, l, j)), p = n.length))), m = m._next
             }
             return n
         };
         a.getTweensOf = function (j, m) {
             for (var l = b.getTweensOf(j), n = l.length, o = [], p = 0; - 1 < --n;) {
                 if (l[n].timeline === this || m && this._contains(l[n])) {
                     o[p++] = l[n]
                 }
             }
             return o
         };
         a._contains = function (d) {
             for (d = d.timeline; d;) {
                 if (d === this) {
                     return !0
                 }
                 d = d.timeline
             }
             return !1
         };
         a.shiftChildren = function (h, l, j) {
             for (var j = j || 0, m = this._first; m;) {
                 m._startTime >= j && (m._startTime += h), m = m._next
             }
             if (l) {
                 for (var n in this._labels) {
                     this._labels[n] >= j && (this._labels[n] += h)
                 }
             }
             return this._uncache(!0)
         };
         a._kill = function (h, l) {
             if (null == h && null == l) {
                 return this._enabled(!1, !1)
             }
             for (var j = null == l ? this.getChildren(!0, !0, !1) : this.getTweensOf(l), m = j.length, n = !1; - 1 < --m;) {
                 j[m]._kill(h, l) && (n = !0)
             }
             return n
         };
         a.clear = function (d) {
             var j = this.getChildren(!1, !0, !0),
                 h = j.length;
             for (this._time = this._totalTime = 0; - 1 < --h;) {
                 j[h]._enabled(!1, !1)
             }!1 != d && (this._labels = {});
             return this._uncache(!0)
         };
         a.invalidate = function () {
             for (var d = this._first; d;) {
                 d.invalidate(), d = d._next
             }
             return this
         };
         a._enabled = function (d, j) {
             if (d == this._gc) {
                 for (var h = this._first; h;) {
                     h._enabled(d, !0), h = h._next
                 }
             }
             return e.prototype._enabled.call(this, d, j)
         };
         a.progress = function (d) {
             return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * d, !1)
         };
         a.duration = function (d) {
             if (!arguments.length) {
                 return this._dirty && this.totalDuration(), this._duration
             }
             0 !== this.duration() && 0 !== d && this.timeScale(this._duration / d);
             return this
         };
         a.totalDuration = function (h) {
             if (!arguments.length) {
                 if (this._dirty) {
                     for (var l = 0, j = this._first, m = -999999999999, n; j;) {
                         n = j._next, j._startTime < m && this._sortChildren ? this.insert(j, j._startTime - j._delay) : m = j._startTime, 0 > j._startTime && (l -= j._startTime, this.shiftChildren(-j._startTime, !1, -9999999999)), j = j._startTime + (!j._dirty ? j._totalDuration : j.totalDuration()) / j._timeScale, j > l && (l = j), j = n
                     }
                     this._duration = this._totalDuration = l;
                     this._dirty = !1
                 }
                 return this._totalDuration
             }
             0 !== this.totalDuration() && 0 !== h && this.timeScale(this._totalDuration / h);
             return this
         };
         a.usesFrames = function () {
             for (var d = this._timeline; d._timeline;) {
                 d = d._timeline
             }
             return d === f._rootFramesTimeline
         };
         a.rawTime = function () {
             return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
         };
         return c
     }, !0)
 });
 window._gsDefine && _gsQueue.pop()();
 (function (a, b, c) {
     var i = [],
         d = [],
         e = 0,
         h = {};
     a.event.special.create = {
         add: function (j) {
             i.push(j.selector)
         },
         remove: function (j) {
             var k = i.length;
             while (k--) {
                 if (i[k] === j.selector) {
                     i.splice(k, 1);
                     break
                 }
             }
         }
     };
     a.fn.domManip = function (j, l, k) {
         if (!i.length || a.isFunction(j[0])) {
             return b.apply(this, arguments)
         }
         return f.call(this, b, arguments)
     };
     a.fn.html = function (j) {
         if (!i.length || a.isFunction(j) || typeof j === "undefined" || !j.length) {
             return c.apply(this, arguments)
         }
         arguments[0] = [j];
         return f.call(this, c, arguments)
     };

     function f(o, j) {
         var p, q = j[0],
             k = a(),
             r = i.length,
             n = [];
         for (var l = 0, m = q.length; l < m; l++) {
             p = a(q[l]);
             if (!p.length) {
                 continue
             }(function t(v) {
                 v = v || p[0].parentNode;
                 var u = (v ? v.firstChild : p[0]);
                 while (u !== null) {
                     for (var w = 0; w < r; w++) {
                         if (a(u).is(i[w])) {
                             if (!u.id) {
                                 u.id = "jqcreateevt" + (++e);
                                 d.push(u.id)
                             }
                             n.push(u.id)
                         }
                     }
                     t(u);
                     u = u.nextSibling
                 }
             })();
             k = k.add(p)
         }
         j[0] = k;
         var s = o.apply(this, j);
         a.each(n, function (v, w) {
             var u = document.getElementById(w);
             if (u) {
                 if (a.inArray(w, d) !== -1) {
                     u.removeAttribute("id")
                 }
                 if (!a.data(u, "jqcreateevt")) {
                     a.event.trigger("create", {}, u);
                     a.data(u, "jqcreateevt", true)
                 }
             }
         });
         return s
     }
 })(jQuery, jQuery.fn.domManip, jQuery.fn.html);
 jQuery.extend({
     Enumerable: function () {
         var D = "Single:sequence contains more than one element.",
             v = true,
             s = null,
             r = false,
             t = function (b) {
                 this.GetEnumerator = b
             };
         t.Choice = function () {
             var b = arguments[0] instanceof Array ? arguments[0] : arguments;
             return new t(function () {
                 return new w(x.Blank, function () {
                     return this.Yield(b[Math.floor(Math.random() * b.length)])
                 }, x.Blank)
             })
         };
         t.Cycle = function () {
             var b = arguments[0] instanceof Array ? arguments[0] : arguments;
             return new t(function () {
                 var a = 0;
                 return new w(x.Blank, function () {
                     if (a >= b.length) {
                         a = 0
                     }
                     return this.Yield(b[a++])
                 }, x.Blank)
             })
         };
         t.Empty = function () {
             return new t(function () {
                 return new w(x.Blank, function () {
                     return r
                 }, x.Blank)
             })
         };
         t.From = function (a) {
             if (a == s) {
                 return t.Empty()
             }
             if (a instanceof t) {
                 return a
             }
             if (typeof a == z.Number || typeof a == z.Boolean) {
                 return t.Repeat(a, 1)
             }
             if (typeof a == z.String) {
                 return new t(function () {
                     var c = 0;
                     return new w(x.Blank, function () {
                         return c < a.length ? this.Yield(a.charAt(c++)) : r
                     }, x.Blank)
                 })
             }
             if (typeof a != z.Function) {
                 if (typeof a.length == z.Number) {
                     return new y(a)
                 }
                 if (!(a instanceof Object) && u.IsIEnumerable(a)) {
                     return new t(function () {
                         var e = v,
                             d;
                         return new w(function () {
                             d = new Enumerator(a)
                         }, function () {
                             if (e) {
                                 e = r
                             } else {
                                 d.moveNext()
                             }
                             return d.atEnd() ? r : this.Yield(d.item())
                         }, x.Blank)
                     })
                 }
             }
             return new t(function () {
                 var d = [],
                     e = 0;
                 return new w(function () {
                     for (var b in a) {
                         !(a[b] instanceof Function) && d.push({
                             Key: b,
                             Value: a[b]
                         })
                     }
                 }, function () {
                     return e < d.length ? this.Yield(d[e++]) : r
                 }, x.Blank)
             })
         }, t.Return = function (b) {
             return t.Repeat(b, 1)
         };
         t.Matches = function (c, b, a) {
             if (a == s) {
                 a = ""
             }
             if (b instanceof RegExp) {
                 a += b.ignoreCase ? "i" : "";
                 a += b.multiline ? "m" : "";
                 b = b.source
             }
             if (a.indexOf("g") === -1) {
                 a += "g"
             }
             return new t(function () {
                 var d;
                 return new w(function () {
                     d = new RegExp(b, a)
                 }, function () {
                     var e = d.exec(c);
                     return e ? this.Yield(e) : r
                 }, x.Blank)
             })
         };
         t.Range = function (f, c, b) {
             if (b == s) {
                 b = 1
             }
             return t.ToInfinity(f, b).Take(c)
         };
         t.RangeDown = function (f, c, b) {
             if (b == s) {
                 b = 1
             }
             return t.ToNegativeInfinity(f, b).Take(c)
         };
         t.RangeTo = function (c, f, b) {
             if (b == s) {
                 b = 1
             }
             return c < f ? t.ToInfinity(c, b).TakeWhile(function (d) {
                 return d <= f
             }) : t.ToNegativeInfinity(c, b).TakeWhile(function (d) {
                 return d >= f
             })
         };
         t.Repeat = function (c, b) {
             return b != s ? t.Repeat(c).Take(b) : new t(function () {
                 return new w(x.Blank, function () {
                     return this.Yield(c)
                 }, x.Blank)
             })
         };
         t.RepeatWithFinalize = function (b, c) {
             b = u.CreateLambda(b);
             c = u.CreateLambda(c);
             return new t(function () {
                 var a;
                 return new w(function () {
                     a = b()
                 }, function () {
                     return this.Yield(a)
                 }, function () {
                     if (a != s) {
                         c(a);
                         a = s
                     }
                 })
             })
         };
         t.Generate = function (b, c) {
             if (c != s) {
                 return t.Generate(b).Take(c)
             }
             b = u.CreateLambda(b);
             return new t(function () {
                 return new w(x.Blank, function () {
                     return this.Yield(b())
                 }, x.Blank)
             })
         };
         t.ToInfinity = function (c, b) {
             if (c == s) {
                 c = 0
             }
             if (b == s) {
                 b = 1
             }
             return new t(function () {
                 var a;
                 return new w(function () {
                     a = c - b
                 }, function () {
                     return this.Yield(a += b)
                 }, x.Blank)
             })
         };
         t.ToNegativeInfinity = function (c, b) {
             if (c == s) {
                 c = 0
             }
             if (b == s) {
                 b = 1
             }
             return new t(function () {
                 var a;
                 return new w(function () {
                     a = c + b
                 }, function () {
                     return this.Yield(a -= b)
                 }, x.Blank)
             })
         };
         t.Unfold = function (c, a) {
             a = u.CreateLambda(a);
             return new t(function () {
                 var e = v,
                     b;
                 return new w(x.Blank, function () {
                     if (e) {
                         e = r;
                         b = c;
                         return this.Yield(b)
                     }
                     b = a(b);
                     return this.Yield(b)
                 }, x.Blank)
             })
         };
         t.prototype = {
             CascadeBreadthFirst: function (c, a) {
                 var d = this;
                 c = u.CreateLambda(c);
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var b, f = 0,
                         e = [];
                     return new w(function () {
                         b = d.GetEnumerator()
                     }, function () {
                         while (v) {
                             if (b.MoveNext()) {
                                 e.push(b.Current());
                                 return this.Yield(a(b.Current(), f))
                             }
                             var h = t.From(e).SelectMany(function (i) {
                                 return c(i)
                             });
                             if (!h.Any()) {
                                 return r
                             } else {
                                 f++;
                                 e = [];
                                 u.Dispose(b);
                                 b = h.GetEnumerator()
                             }
                         }
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             CascadeDepthFirst: function (c, a) {
                 var d = this;
                 c = u.CreateLambda(c);
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var e = [],
                         b;
                     return new w(function () {
                         b = d.GetEnumerator()
                     }, function () {
                         while (v) {
                             if (b.MoveNext()) {
                                 var h = a(b.Current(), e.length);
                                 e.push(b);
                                 b = t.From(c(b.Current())).GetEnumerator();
                                 return this.Yield(h)
                             }
                             if (e.length <= 0) {
                                 return r
                             }
                             u.Dispose(b);
                             b = e.pop()
                         }
                     }, function () {
                         try {
                             u.Dispose(b)
                         } finally {
                             t.From(e).ForEach(function (f) {
                                 f.Dispose()
                             })
                         }
                     })
                 })
             },
             Flatten: function () {
                 var a = this;
                 return new t(function () {
                     var c, b = s;
                     return new w(function () {
                         c = a.GetEnumerator()
                     }, function () {
                         while (v) {
                             if (b != s) {
                                 if (b.MoveNext()) {
                                     return this.Yield(b.Current())
                                 } else {
                                     b = s
                                 }
                             }
                             if (c.MoveNext()) {
                                 if (c.Current() instanceof Array) {
                                     u.Dispose(b);
                                     b = t.From(c.Current()).SelectMany(x.Identity).Flatten().GetEnumerator();
                                     continue
                                 } else {
                                     return this.Yield(c.Current())
                                 }
                             }
                             return r
                         }
                     }, function () {
                         try {
                             u.Dispose(c)
                         } finally {
                             u.Dispose(b)
                         }
                     })
                 })
             },
             Pairwise: function (a) {
                 var c = this;
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = c.GetEnumerator();
                         b.MoveNext()
                     }, function () {
                         var e = b.Current();
                         return b.MoveNext() ? this.Yield(a(e, b.Current())) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Scan: function (c, a, d) {
                 if (d != s) {
                     return this.Scan(c, a).Select(d)
                 }
                 var b;
                 if (a == s) {
                     a = u.CreateLambda(c);
                     b = r
                 } else {
                     a = u.CreateLambda(a);
                     b = v
                 }
                 var e = this;
                 return new t(function () {
                     var f, h, i = v;
                     return new w(function () {
                         f = e.GetEnumerator()
                     }, function () {
                         if (i) {
                             i = r;
                             if (!b) {
                                 if (f.MoveNext()) {
                                     return this.Yield(h = f.Current())
                                 }
                             } else {
                                 return this.Yield(h = c)
                             }
                         }
                         return f.MoveNext() ? this.Yield(h = a(h, f.Current())) : r
                     }, function () {
                         u.Dispose(f)
                     })
                 })
             },
             Select: function (a) {
                 var c = this;
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         return b.MoveNext() ? this.Yield(a(b.Current(), d++)) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             SelectMany: function (b, a) {
                 var c = this;
                 b = u.CreateLambda(b);
                 if (a == s) {
                     a = function (e, d) {
                         return d
                     }
                 }
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var e, d = undefined,
                         f = 0;
                     return new w(function () {
                         e = c.GetEnumerator()
                     }, function () {
                         if (d === undefined) {
                             if (!e.MoveNext()) {
                                 return r
                             }
                         }
                         do {
                             if (d == s) {
                                 var h = b(e.Current(), f++);
                                 d = t.From(h).GetEnumerator()
                             }
                             if (d.MoveNext()) {
                                 return this.Yield(a(e.Current(), d.Current()))
                             }
                             u.Dispose(d);
                             d = s
                         } while (e.MoveNext());
                         return r
                     }, function () {
                         try {
                             u.Dispose(e)
                         } finally {
                             u.Dispose(d)
                         }
                     })
                 })
             },
             Where: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         while (b.MoveNext()) {
                             if (a(b.Current(), d++)) {
                                 return this.Yield(b.Current())
                             }
                         }
                         return r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             OfType: function (d) {
                 var b;
                 switch (d) {
                 case Number:
                     b = z.Number;
                     break;
                 case String:
                     b = z.String;
                     break;
                 case Boolean:
                     b = z.Boolean;
                     break;
                 case Function:
                     b = z.Function;
                     break;
                 default:
                     b = s
                 }
                 return b === s ? this.Where(function (c) {
                     return c instanceof d
                 }) : this.Where(function (a) {
                     return typeof a === b
                 })
             },
             Zip: function (c, a) {
                 a = u.CreateLambda(a);
                 var d = this;
                 return new t(function () {
                     var e, b, f = 0;
                     return new w(function () {
                         e = d.GetEnumerator();
                         b = t.From(c).GetEnumerator()
                     }, function () {
                         return e.MoveNext() && b.MoveNext() ? this.Yield(a(e.Current(), b.Current(), f++)) : r
                     }, function () {
                         try {
                             u.Dispose(e)
                         } finally {
                             u.Dispose(b)
                         }
                     })
                 })
             },
             Join: function (f, b, a, d, c) {
                 b = u.CreateLambda(b);
                 a = u.CreateLambda(a);
                 d = u.CreateLambda(d);
                 c = u.CreateLambda(c);
                 var e = this;
                 return new t(function () {
                     var h, k, i = s,
                         j = 0;
                     return new w(function () {
                         h = e.GetEnumerator();
                         k = t.From(f).ToLookup(a, x.Identity, c)
                     }, function () {
                         while (v) {
                             if (i != s) {
                                 var l = i[j++];
                                 if (l !== undefined) {
                                     return this.Yield(d(h.Current(), l))
                                 }
                                 l = s;
                                 j = 0
                             }
                             if (h.MoveNext()) {
                                 var m = b(h.Current());
                                 i = k.Get(m).ToArray()
                             } else {
                                 return r
                             }
                         }
                     }, function () {
                         u.Dispose(h)
                     })
                 })
             },
             GroupJoin: function (m, b, a, d, c) {
                 b = u.CreateLambda(b);
                 a = u.CreateLambda(a);
                 d = u.CreateLambda(d);
                 c = u.CreateLambda(c);
                 var f = this;
                 return new t(function () {
                     var e = f.GetEnumerator(),
                         h = s;
                     return new w(function () {
                         e = f.GetEnumerator();
                         h = t.From(m).ToLookup(a, x.Identity, c)
                     }, function () {
                         if (e.MoveNext()) {
                             var i = h.Get(b(e.Current()));
                             return this.Yield(d(e.Current(), i))
                         }
                         return r
                     }, function () {
                         u.Dispose(e)
                     })
                 })
             },
             All: function (a) {
                 a = u.CreateLambda(a);
                 var d = v;
                 this.ForEach(function (b) {
                     if (!a(b)) {
                         d = r;
                         return r
                     }
                 });
                 return d
             },
             Any: function (d) {
                 d = u.CreateLambda(d);
                 var a = this.GetEnumerator();
                 try {
                     if (arguments.length == 0) {
                         return a.MoveNext()
                     }
                     while (a.MoveNext()) {
                         if (d(a.Current())) {
                             return v
                         }
                     }
                     return r
                 } finally {
                     u.Dispose(a)
                 }
             },
             Concat: function (a) {
                 var b = this;
                 return new t(function () {
                     var d, c;
                     return new w(function () {
                         d = b.GetEnumerator()
                     }, function () {
                         if (c == s) {
                             if (d.MoveNext()) {
                                 return this.Yield(d.Current())
                             }
                             c = t.From(a).GetEnumerator()
                         }
                         return c.MoveNext() ? this.Yield(c.Current()) : r
                     }, function () {
                         try {
                             u.Dispose(d)
                         } finally {
                             u.Dispose(c)
                         }
                     })
                 })
             },
             Insert: function (d, a) {
                 var c = this;
                 return new t(function () {
                     var e, b, h = 0,
                         f = r;
                     return new w(function () {
                         e = c.GetEnumerator();
                         b = t.From(a).GetEnumerator()
                     }, function () {
                         if (h == d && b.MoveNext()) {
                             f = v;
                             return this.Yield(b.Current())
                         }
                         if (e.MoveNext()) {
                             h++;
                             return this.Yield(e.Current())
                         }
                         return !f && b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         try {
                             u.Dispose(e)
                         } finally {
                             u.Dispose(b)
                         }
                     })
                 })
             },
             Alternate: function (b) {
                 b = t.Return(b);
                 return this.SelectMany(function (a) {
                     return t.Return(a).Concat(b)
                 }).TakeExceptLast()
             },
             Contains: function (e, a) {
                 a = u.CreateLambda(a);
                 var d = this.GetEnumerator();
                 try {
                     while (d.MoveNext()) {
                         if (a(d.Current()) === e) {
                             return v
                         }
                     }
                     return r
                 } finally {
                     u.Dispose(d)
                 }
             },
             DefaultIfEmpty: function (a) {
                 var c = this;
                 return new t(function () {
                     var b, d = v;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         if (b.MoveNext()) {
                             d = r;
                             return this.Yield(b.Current())
                         } else {
                             if (d) {
                                 d = r;
                                 return this.Yield(a)
                             }
                         }
                         return r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Distinct: function (b) {
                 return this.Except(t.Empty(), b)
             },
             Except: function (c, a) {
                 a = u.CreateLambda(a);
                 var d = this;
                 return new t(function () {
                     var b, e;
                     return new w(function () {
                         b = d.GetEnumerator();
                         e = new E(a);
                         t.From(c).ForEach(function (f) {
                             e.Add(f)
                         })
                     }, function () {
                         while (b.MoveNext()) {
                             var f = b.Current();
                             if (!e.Contains(f)) {
                                 e.Add(f);
                                 return this.Yield(f)
                             }
                         }
                         return r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Intersect: function (c, a) {
                 a = u.CreateLambda(a);
                 var d = this;
                 return new t(function () {
                     var b, e, f;
                     return new w(function () {
                         b = d.GetEnumerator();
                         e = new E(a);
                         t.From(c).ForEach(function (h) {
                             e.Add(h)
                         });
                         f = new E(a)
                     }, function () {
                         while (b.MoveNext()) {
                             var h = b.Current();
                             if (!f.Contains(h) && e.Contains(h)) {
                                 f.Add(h);
                                 return this.Yield(h)
                             }
                         }
                         return r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             SequenceEqual: function (e, c) {
                 c = u.CreateLambda(c);
                 var d = this.GetEnumerator();
                 try {
                     var a = t.From(e).GetEnumerator();
                     try {
                         while (d.MoveNext()) {
                             if (!a.MoveNext() || c(d.Current()) !== c(a.Current())) {
                                 return r
                             }
                         }
                         return a.MoveNext() ? r : v
                     } finally {
                         u.Dispose(a)
                     }
                 } finally {
                     u.Dispose(d)
                 }
             },
             Union: function (c, a) {
                 a = u.CreateLambda(a);
                 var d = this;
                 return new t(function () {
                     var f, b, e;
                     return new w(function () {
                         f = d.GetEnumerator();
                         e = new E(a)
                     }, function () {
                         var h;
                         if (b === undefined) {
                             while (f.MoveNext()) {
                                 h = f.Current();
                                 if (!e.Contains(h)) {
                                     e.Add(h);
                                     return this.Yield(h)
                                 }
                             }
                             b = t.From(c).GetEnumerator()
                         }
                         while (b.MoveNext()) {
                             h = b.Current();
                             if (!e.Contains(h)) {
                                 e.Add(h);
                                 return this.Yield(h)
                             }
                         }
                         return r
                     }, function () {
                         try {
                             u.Dispose(f)
                         } finally {
                             u.Dispose(b)
                         }
                     })
                 })
             },
             OrderBy: function (a) {
                 return new A(this, a, r)
             },
             OrderByDescending: function (b) {
                 return new A(this, b, v)
             },
             Reverse: function () {
                 var a = this;
                 return new t(function () {
                     var b, e;
                     return new w(function () {
                         b = a.ToArray();
                         e = b.length
                     }, function () {
                         return e > 0 ? this.Yield(b[--e]) : r
                     }, x.Blank)
                 })
             },
             Shuffle: function () {
                 var a = this;
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = a.ToArray()
                     }, function () {
                         if (b.length > 0) {
                             var c = Math.floor(Math.random() * b.length);
                             return this.Yield(b.splice(c, 1)[0])
                         }
                         return r
                     }, x.Blank)
                 })
             },
             GroupBy: function (d, c, a, b) {
                 var f = this;
                 d = u.CreateLambda(d);
                 c = u.CreateLambda(c);
                 if (a != s) {
                     a = u.CreateLambda(a)
                 }
                 b = u.CreateLambda(b);
                 return new t(function () {
                     var e;
                     return new w(function () {
                         e = f.ToLookup(d, c, b).ToEnumerable().GetEnumerator()
                     }, function () {
                         while (e.MoveNext()) {
                             return a == s ? this.Yield(e.Current()) : this.Yield(a(e.Current().Key(), e.Current()))
                         }
                         return r
                     }, function () {
                         u.Dispose(e)
                     })
                 })
             },
             PartitionBy: function (d, c, a, b) {
                 var f = this;
                 d = u.CreateLambda(d);
                 c = u.CreateLambda(c);
                 b = u.CreateLambda(b);
                 var e;
                 if (a == s) {
                     e = r;
                     a = function (i, h) {
                         return new F(i, h)
                     }
                 } else {
                     e = v;
                     a = u.CreateLambda(a)
                 }
                 return new t(function () {
                     var h, j, k, i = [];
                     return new w(function () {
                         h = f.GetEnumerator();
                         if (h.MoveNext()) {
                             j = d(h.Current());
                             k = b(j);
                             i.push(c(h.Current()))
                         }
                     }, function () {
                         var l;
                         while ((l = h.MoveNext()) == v) {
                             if (k === b(d(h.Current()))) {
                                 i.push(c(h.Current()))
                             } else {
                                 break
                             }
                         }
                         if (i.length > 0) {
                             var m = e ? a(j, t.From(i)) : a(j, i);
                             if (l) {
                                 j = d(h.Current());
                                 k = b(j);
                                 i = [c(h.Current())]
                             } else {
                                 i = []
                             }
                             return this.Yield(m)
                         }
                         return r
                     }, function () {
                         u.Dispose(h)
                     })
                 })
             },
             BufferWithCount: function (c) {
                 var a = this;
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = a.GetEnumerator()
                     }, function () {
                         var e = [],
                             f = 0;
                         while (b.MoveNext()) {
                             e.push(b.Current());
                             if (++f >= c) {
                                 return this.Yield(e)
                             }
                         }
                         return e.length > 0 ? this.Yield(e) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Aggregate: function (f, e, d) {
                 return this.Scan(f, e, d).Last()
             },
             Average: function (d) {
                 d = u.CreateLambda(d);
                 var f = 0,
                     e = 0;
                 this.ForEach(function (a) {
                     f += d(a);
                     ++e
                 });
                 return f / e
             },
             Count: function (b) {
                 b = b == s ? x.True : u.CreateLambda(b);
                 var d = 0;
                 this.ForEach(function (c, a) {
                     if (b(c, a)) {
                         ++d
                     }
                 });
                 return d
             },
             Max: function (b) {
                 if (b == s) {
                     b = x.Identity
                 }
                 return this.Select(b).Aggregate(function (c, d) {
                     return c > d ? c : d
                 })
             },
             Min: function (b) {
                 if (b == s) {
                     b = x.Identity
                 }
                 return this.Select(b).Aggregate(function (c, d) {
                     return c < d ? c : d
                 })
             },
             MaxBy: function (b) {
                 b = u.CreateLambda(b);
                 return this.Aggregate(function (a, d) {
                     return b(a) > b(d) ? a : d
                 })
             },
             MinBy: function (b) {
                 b = u.CreateLambda(b);
                 return this.Aggregate(function (a, d) {
                     return b(a) < b(d) ? a : d
                 })
             },
             Sum: function (b) {
                 if (b == s) {
                     b = x.Identity
                 }
                 return this.Select(b).Aggregate(0, function (c, d) {
                     return c + d
                 })
             },
             ElementAt: function (f) {
                 var e, a = r;
                 this.ForEach(function (c, b) {
                     if (b == f) {
                         e = c;
                         a = v;
                         return r
                     }
                 });
                 if (!a) {
                     throw new Error("index is less than 0 or greater than or equal to the number of elements in source.")
                 }
                 return e
             },
             ElementAtOrDefault: function (i, h) {
                 var e, a = r;
                 this.ForEach(function (c, b) {
                     if (b == i) {
                         e = c;
                         a = v;
                         return r
                     }
                 });
                 return !a ? h : e
             },
             First: function (a) {
                 if (a != s) {
                     return this.Where(a).First()
                 }
                 var e, b = r;
                 this.ForEach(function (c) {
                     e = c;
                     b = v;
                     return r
                 });
                 if (!b) {
                     throw new Error("First:No element satisfies the condition.")
                 }
                 return e
             },
             FirstOrDefault: function (a, b) {
                 if (b != s) {
                     return this.Where(b).FirstOrDefault(a)
                 }
                 var h, e = r;
                 this.ForEach(function (c) {
                     h = c;
                     e = v;
                     return r
                 });
                 return !e ? a : h
             },
             Last: function (a) {
                 if (a != s) {
                     return this.Where(a).Last()
                 }
                 var e, b = r;
                 this.ForEach(function (c) {
                     b = v;
                     e = c
                 });
                 if (!b) {
                     throw new Error("Last:No element satisfies the condition.")
                 }
                 return e
             },
             LastOrDefault: function (a, b) {
                 if (b != s) {
                     return this.Where(b).LastOrDefault(a)
                 }
                 var h, e = r;
                 this.ForEach(function (c) {
                     e = v;
                     h = c
                 });
                 return !e ? a : h
             },
             Single: function (b) {
                 if (b != s) {
                     return this.Where(b).Single()
                 }
                 var e, a = r;
                 this.ForEach(function (c) {
                     if (!a) {
                         a = v;
                         e = c
                     } else {
                         throw new Error(D)
                     }
                 });
                 if (!a) {
                     throw new Error("Single:No element satisfies the condition.")
                 }
                 return e
             },
             SingleOrDefault: function (b, e) {
                 if (e != s) {
                     return this.Where(e).SingleOrDefault(b)
                 }
                 var h, a = r;
                 this.ForEach(function (c) {
                     if (!a) {
                         a = v;
                         h = c
                     } else {
                         throw new Error(D)
                     }
                 });
                 return !a ? b : h
             },
             Skip: function (c) {
                 var a = this;
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = a.GetEnumerator();
                         while (d++ < c && b.MoveNext()) {}
                     }, function () {
                         return b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             SkipWhile: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b, e = 0,
                         d = r;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         while (!d) {
                             if (b.MoveNext()) {
                                 if (!a(b.Current(), e++)) {
                                     d = v;
                                     return this.Yield(b.Current())
                                 }
                                 continue
                             } else {
                                 return r
                             }
                         }
                         return b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Take: function (c) {
                 var a = this;
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = a.GetEnumerator()
                     }, function () {
                         return d++ < c && b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             TakeWhile: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         return b.MoveNext() && a(b.Current(), d++) ? this.Yield(b.Current()) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             TakeExceptLast: function (a) {
                 if (a == s) {
                     a = 1
                 }
                 var b = this;
                 return new t(function () {
                     if (a <= 0) {
                         return b.GetEnumerator()
                     }
                     var d, e = [];
                     return new w(function () {
                         d = b.GetEnumerator()
                     }, function () {
                         while (d.MoveNext()) {
                             if (e.length == a) {
                                 e.push(d.Current());
                                 return this.Yield(e.shift())
                             }
                             e.push(d.Current())
                         }
                         return r
                     }, function () {
                         u.Dispose(d)
                     })
                 })
             },
             TakeFromLast: function (a) {
                 if (a <= 0 || a == s) {
                     return t.Empty()
                 }
                 var b = this;
                 return new t(function () {
                     var e, c, d = [];
                     return new w(function () {
                         e = b.GetEnumerator()
                     }, function () {
                         while (e.MoveNext()) {
                             d.length == a && d.shift();
                             d.push(e.Current())
                         }
                         if (c == s) {
                             c = t.From(d).GetEnumerator()
                         }
                         return c.MoveNext() ? this.Yield(c.Current()) : r
                     }, function () {
                         u.Dispose(c)
                     })
                 })
             },
             IndexOf: function (d) {
                 var b = s;
                 this.ForEach(function (c, a) {
                     if (c === d) {
                         b = a;
                         return v
                     }
                 });
                 return b !== s ? b : -1
             },
             LastIndexOf: function (d) {
                 var c = -1;
                 this.ForEach(function (b, a) {
                     if (b === d) {
                         c = a
                     }
                 });
                 return c
             },
             ToArray: function () {
                 var b = [];
                 this.ForEach(function (a) {
                     b.push(a)
                 });
                 return b
             },
             ToLookup: function (h, f, d) {
                 h = u.CreateLambda(h);
                 f = u.CreateLambda(f);
                 d = u.CreateLambda(d);
                 var i = new E(d);
                 this.ForEach(function (j) {
                     var e = h(j),
                         b = f(j),
                         c = i.Get(e);
                     if (c !== undefined) {
                         c.push(b)
                     } else {
                         i.Add(e, [b])
                     }
                 });
                 return new H(i)
             },
             ToObject: function (e, d) {
                 e = u.CreateLambda(e);
                 d = u.CreateLambda(d);
                 var f = {};
                 this.ForEach(function (a) {
                     f[e(a)] = d(a)
                 });
                 return f
             },
             ToDictionary: function (h, f, d) {
                 h = u.CreateLambda(h);
                 f = u.CreateLambda(f);
                 d = u.CreateLambda(d);
                 var i = new E(d);
                 this.ForEach(function (b) {
                     i.Add(h(b), f(b))
                 });
                 return i
             },
             ToJSON: function (c, d) {
                 return JSON.stringify(this.ToArray(), c, d)
             },
             ToString: function (b, d) {
                 if (b == s) {
                     b = ""
                 }
                 if (d == s) {
                     d = x.Identity
                 }
                 return this.Select(d).ToArray().join(b)
             },
             Do: function (a) {
                 var c = this;
                 a = u.CreateLambda(a);
                 return new t(function () {
                     var b, d = 0;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         if (b.MoveNext()) {
                             a(b.Current(), d++);
                             return this.Yield(b.Current())
                         }
                         return r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             ForEach: function (d) {
                 d = u.CreateLambda(d);
                 var f = 0,
                     a = this.GetEnumerator();
                 try {
                     while (a.MoveNext()) {
                         if (d(a.Current(), f++) === r) {
                             break
                         }
                     }
                 } finally {
                     u.Dispose(a)
                 }
             },
             Write: function (a, b) {
                 if (a == s) {
                     a = ""
                 }
                 b = u.CreateLambda(b);
                 var d = v;
                 this.ForEach(function (c) {
                     if (d) {
                         d = r
                     } else {
                         document.write(a)
                     }
                     document.write(b(c))
                 })
             },
             WriteLine: function (b) {
                 b = u.CreateLambda(b);
                 this.ForEach(function (a) {
                     document.write(b(a));
                     document.write("<br />")
                 })
             },
             Force: function () {
                 var b = this.GetEnumerator();
                 try {
                     while (b.MoveNext()) {}
                 } finally {
                     u.Dispose(b)
                 }
             },
             Let: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = t.From(a(c)).GetEnumerator()
                     }, function () {
                         return b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Share: function () {
                 var b = this,
                     a;
                 return new t(function () {
                     return new w(function () {
                         if (a == s) {
                             a = b.GetEnumerator()
                         }
                     }, function () {
                         return a.MoveNext() ? this.Yield(a.Current()) : r
                     }, x.Blank)
                 })
             },
             MemoizeAll: function () {
                 var c = this,
                     b, a;
                 return new t(function () {
                     var d = -1;
                     return new w(function () {
                         if (a == s) {
                             a = c.GetEnumerator();
                             b = []
                         }
                     }, function () {
                         d++;
                         return b.length <= d ? a.MoveNext() ? this.Yield(b[d] = a.Current()) : r : this.Yield(b[d])
                     }, x.Blank)
                 })
             },
             Catch: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         try {
                             return b.MoveNext() ? this.Yield(b.Current()) : r
                         } catch (e) {
                             a(e);
                             return r
                         }
                     }, function () {
                         u.Dispose(b)
                     })
                 })
             },
             Finally: function (a) {
                 a = u.CreateLambda(a);
                 var c = this;
                 return new t(function () {
                     var b;
                     return new w(function () {
                         b = c.GetEnumerator()
                     }, function () {
                         return b.MoveNext() ? this.Yield(b.Current()) : r
                     }, function () {
                         try {
                             u.Dispose(b)
                         } finally {
                             a()
                         }
                     })
                 })
             },
             Trace: function (d, b) {
                 if (d == s) {
                     d = "Trace"
                 }
                 b = u.CreateLambda(b);
                 return this.Do(function (a) {
                     console.log(d, ":", b(a))
                 })
             }
         };
         var x = {
                 Identity: function (b) {
                     return b
                 },
                 True: function () {
                     return v
                 },
                 Blank: function () {}
             },
             z = {
                 Boolean: typeof v,
                 Number: typeof 0,
                 String: typeof "",
                 Object: typeof {},
                 Undefined: typeof undefined,
                 Function: typeof
                 function () {}
             },
             u = {
                 CreateLambda: function (b) {
                     if (b == s) {
                         return x.Identity
                     }
                     if (typeof b == z.String) {
                         if (b == "") {
                             return x.Identity
                         } else {
                             if (b.indexOf("=>") == -1) {
                                 return new Function("$,$$,$$$,$$$$", "return " + b)
                             } else {
                                 var d = b.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
                                 return new Function(d[1], "return " + d[2])
                             }
                         }
                     }
                     return b
                 },
                 IsIEnumerable: function (a) {
                     if (typeof Enumerator != z.Undefined) {
                         try {
                             new Enumerator(a);
                             return v
                         } catch (d) {}
                     }
                     return r
                 },
                 Compare: function (c, d) {
                     return c === d ? 0 : c > d ? 1 : -1
                 },
                 Dispose: function (b) {
                     b != s && b.Dispose()
                 }
             },
             B = {
                 Before: 0,
                 Running: 1,
                 After: 2
             },
             w = function (h, i, j) {
                 var e = new G,
                     a = B.Before;
                 this.Current = e.Current;
                 this.MoveNext = function () {
                     try {
                         switch (a) {
                         case B.Before:
                             a = B.Running;
                             h();
                         case B.Running:
                             if (i.apply(e)) {
                                 return v
                             } else {
                                 this.Dispose();
                                 return r
                             }
                         case B.After:
                             return r
                         }
                     } catch (b) {
                         this.Dispose();
                         throw b
                     }
                 };
                 this.Dispose = function () {
                     if (a != B.Running) {
                         return
                     }
                     try {
                         j()
                     } finally {
                         a = B.After
                     }
                 }
             },
             G = function () {
                 var b = s;
                 this.Current = function () {
                     return b
                 };
                 this.Yield = function (a) {
                     b = a;
                     return v
                 }
             },
             A = function (k, h, i, j) {
                 var d = this;
                 d.source = k;
                 d.keySelector = u.CreateLambda(h);
                 d.descending = i;
                 d.parent = j
             };
         A.prototype = new t;
         A.prototype.CreateOrderedEnumerable = function (c, d) {
             return new A(this.source, c, d, this)
         };
         A.prototype.ThenBy = function (a) {
             return this.CreateOrderedEnumerable(a, r)
         };
         A.prototype.ThenByDescending = function (b) {
             return this.CreateOrderedEnumerable(b, v)
         };
         A.prototype.GetEnumerator = function () {
             var i = this,
                 b, a, f = 0;
             return new w(function () {
                 b = [];
                 a = [];
                 i.source.ForEach(function (e, d) {
                     b.push(e);
                     a.push(d)
                 });
                 var c = C.Create(i, s);
                 c.GenerateKeys(b);
                 a.sort(function (d, e) {
                     return c.Compare(d, e)
                 })
             }, function () {
                 return f < a.length ? this.Yield(b[a[f++]]) : r
             }, x.Blank)
         };
         var C = function (f, h, i) {
             var b = this;
             b.keySelector = f;
             b.descending = h;
             b.child = i;
             b.keys = s
         };
         C.Create = function (b, f) {
             var e = new C(b.keySelector, b.descending, f);
             return b.parent != s ? C.Create(b.parent, e) : e
         };
         C.prototype.GenerateKeys = function (i) {
             var b = this;
             for (var k = i.length, l = b.keySelector, j = new Array(k), h = 0; h < k; h++) {
                 j[h] = l(i[h])
             }
             b.keys = j;
             b.child != s && b.child.GenerateKeys(i)
         };
         C.prototype.Compare = function (h, i) {
             var b = this,
                 d = u.Compare(b.keys[h], b.keys[i]);
             if (d == 0) {
                 if (b.child != s) {
                     return b.child.Compare(h, i)
                 }
                 d = u.Compare(h, i)
             }
             return b.descending ? -d : d
         };
         var y = function (b) {
             this.source = b
         };
         y.prototype = new t;
         y.prototype.Any = function (b) {
             return b == s ? this.source.length > 0 : t.prototype.Any.apply(this, arguments)
         };
         y.prototype.Count = function (b) {
             return b == s ? this.source.length : t.prototype.Count.apply(this, arguments)
         };
         y.prototype.ElementAt = function (b) {
             return 0 <= b && b < this.source.length ? this.source[b] : t.prototype.ElementAt.apply(this, arguments)
         };
         y.prototype.ElementAtOrDefault = function (c, d) {
             return 0 <= c && c < this.source.length ? this.source[c] : d
         };
         y.prototype.First = function (b) {
             return b == s && this.source.length > 0 ? this.source[0] : t.prototype.First.apply(this, arguments)
         };
         y.prototype.FirstOrDefault = function (b, c) {
             return c != s ? t.prototype.FirstOrDefault.apply(this, arguments) : this.source.length > 0 ? this.source[0] : b
         };
         y.prototype.Last = function (c) {
             var b = this;
             return c == s && b.source.length > 0 ? b.source[b.source.length - 1] : t.prototype.Last.apply(b, arguments)
         };
         y.prototype.LastOrDefault = function (c, f) {
             var b = this;
             return f != s ? t.prototype.LastOrDefault.apply(b, arguments) : b.source.length > 0 ? b.source[b.source.length - 1] : c
         };
         y.prototype.Skip = function (c) {
             var a = this.source;
             return new t(function () {
                 var b;
                 return new w(function () {
                     b = c < 0 ? 0 : c
                 }, function () {
                     return b < a.length ? this.Yield(a[b++]) : r
                 }, x.Blank)
             })
         };
         y.prototype.TakeExceptLast = function (b) {
             if (b == s) {
                 b = 1
             }
             return this.Take(this.source.length - b)
         };
         y.prototype.TakeFromLast = function (b) {
             return this.Skip(this.source.length - b)
         };
         y.prototype.Reverse = function () {
             var a = this.source;
             return new t(function () {
                 var b;
                 return new w(function () {
                     b = a.length
                 }, function () {
                     return b > 0 ? this.Yield(a[--b]) : r
                 }, x.Blank)
             })
         };
         y.prototype.SequenceEqual = function (a, b) {
             return (a instanceof y || a instanceof Array) && b == s && t.From(a).Count() != this.Count() ? r : t.prototype.SequenceEqual.apply(this, arguments)
         };
         y.prototype.ToString = function (b, c) {
             if (c != s || !(this.source instanceof Array)) {
                 return t.prototype.ToString.apply(this, arguments)
             }
             if (b == s) {
                 b = ""
             }
             return this.source.join(b)
         };
         y.prototype.GetEnumerator = function () {
             var a = this.source,
                 d = 0;
             return new w(x.Blank, function () {
                 return d < a.length ? this.Yield(a[d++]) : r
             }, x.Blank)
         };
         var E = function () {
                 var b = function (d, h) {
                         return Object.prototype.hasOwnProperty.call(d, h)
                     },
                     a = function (d) {
                         return d === s ? "null" : d === undefined ? "undefined" : typeof d.toString === z.Function ? d.toString() : Object.prototype.toString.call(d)
                     },
                     f = function (j, i) {
                         var h = this;
                         h.Key = j;
                         h.Value = i;
                         h.Prev = s;
                         h.Next = s
                     },
                     c = function () {
                         this.First = s;
                         this.Last = s
                     };
                 c.prototype = {
                     AddLast: function (h) {
                         var d = this;
                         if (d.Last != s) {
                             d.Last.Next = h;
                             h.Prev = d.Last;
                             d.Last = h
                         } else {
                             d.First = d.Last = h
                         }
                     },
                     Replace: function (h, d) {
                         if (h.Prev != s) {
                             h.Prev.Next = d;
                             d.Prev = h.Prev
                         } else {
                             this.First = d
                         } if (h.Next != s) {
                             h.Next.Prev = d;
                             d.Next = h.Next
                         } else {
                             this.Last = d
                         }
                     },
                     Remove: function (d) {
                         if (d.Prev != s) {
                             d.Prev.Next = d.Next
                         } else {
                             this.First = d.Next
                         } if (d.Next != s) {
                             d.Next.Prev = d.Prev
                         } else {
                             this.Last = d.Prev
                         }
                     }
                 };
                 var e = function (h) {
                     var d = this;
                     d.count = 0;
                     d.entryList = new c;
                     d.buckets = {};
                     d.compareSelector = h == s ? x.Identity : h
                 };
                 e.prototype = {
                     Add: function (o, p) {
                         var d = this,
                             n = d.compareSelector(o),
                             m = a(n),
                             k = new f(o, p);
                         if (b(d.buckets, m)) {
                             for (var h = d.buckets[m], l = 0; l < h.length; l++) {
                                 if (d.compareSelector(h[l].Key) === n) {
                                     d.entryList.Replace(h[l], k);
                                     h[l] = k;
                                     return
                                 }
                             }
                             h.push(k)
                         } else {
                             d.buckets[m] = [k]
                         }
                         d.count++;
                         d.entryList.AddLast(k)
                     },
                     Get: function (n) {
                         var d = this,
                             j = d.compareSelector(n),
                             m = a(j);
                         if (!b(d.buckets, m)) {
                             return undefined
                         }
                         for (var k = d.buckets[m], h = 0; h < k.length; h++) {
                             var l = k[h];
                             if (d.compareSelector(l.Key) === j) {
                                 return l.Value
                             }
                         }
                         return undefined
                     },
                     Set: function (q, I) {
                         var d = this,
                             n = d.compareSelector(q),
                             p = a(n);
                         if (b(d.buckets, p)) {
                             for (var l = d.buckets[p], h = 0; h < l.length; h++) {
                                 if (d.compareSelector(l[h].Key) === n) {
                                     var o = new f(q, I);
                                     d.entryList.Replace(l[h], o);
                                     l[h] = o;
                                     return v
                                 }
                             }
                         }
                         return r
                     },
                     Contains: function (n) {
                         var d = this,
                             k = d.compareSelector(n),
                             m = a(k);
                         if (!b(d.buckets, m)) {
                             return r
                         }
                         for (var l = d.buckets[m], h = 0; h < l.length; h++) {
                             if (d.compareSelector(l[h].Key) === k) {
                                 return v
                             }
                         }
                         return r
                     },
                     Clear: function () {
                         this.count = 0;
                         this.buckets = {};
                         this.entryList = new c
                     },
                     Remove: function (l) {
                         var d = this,
                             k = d.compareSelector(l),
                             j = a(k);
                         if (!b(d.buckets, j)) {
                             return
                         }
                         for (var h = d.buckets[j], i = 0; i < h.length; i++) {
                             if (d.compareSelector(h[i].Key) === k) {
                                 d.entryList.Remove(h[i]);
                                 h.splice(i, 1);
                                 if (h.length == 0) {
                                     delete d.buckets[j]
                                 }
                                 d.count--;
                                 return
                             }
                         }
                     },
                     Count: function () {
                         return this.count
                     },
                     ToEnumerable: function () {
                         var h = this;
                         return new t(function () {
                             var d;
                             return new w(function () {
                                 d = h.entryList.First
                             }, function () {
                                 if (d != s) {
                                     var i = {
                                         Key: d.Key,
                                         Value: d.Value
                                     };
                                     d = d.Next;
                                     return this.Yield(i)
                                 }
                                 return r
                             }, x.Blank)
                         })
                     }
                 };
                 return e
             }(),
             H = function (c) {
                 var d = this;
                 d.Count = function () {
                     return c.Count()
                 };
                 d.Get = function (a) {
                     return t.From(c.Get(a))
                 };
                 d.Contains = function (a) {
                     return c.Contains(a)
                 };
                 d.ToEnumerable = function () {
                     return c.ToEnumerable().Select(function (b) {
                         return new F(b.Key, b.Value)
                     })
                 }
             },
             F = function (d, c) {
                 this.Key = function () {
                     return d
                 };
                 y.call(this, c)
             };
         F.prototype = new y;
         return t
     }()
 });
 (function (c, d) {
     c.fn.toEnumerable = function () {
         return d.From(this).Select(function (a) {
             return c(a)
         })
     };
     d.prototype.TojQuery = function () {
         return c(this.ToArray())
     }
 })(jQuery, this.Enumerable || this.jQuery.Enumerable);
 (function (j, o, l) {
     var m = "hashchange",
         r = document,
         p, q = j.event.special,
         s = r.documentMode,
         n = "on" + m in o && (s === l || s > 7);

     function k(a) {
         a = a || location.href;
         return "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
     }
     j.fn[m] = function (a) {
         return a ? this.bind(m, a) : this.trigger(m)
     };
     j.fn[m].delay = 50;
     q[m] = j.extend(q[m], {
         setup: function () {
             if (n) {
                 return false
             }
             j(p.start)
         },
         teardown: function () {
             if (n) {
                 return false
             }
             j(p.stop)
         }
     });
     p = (function () {
         var a = {},
             h, d = k(),
             b = function (i) {
                 return i
             },
             c = b,
             f = b;
         a.start = function () {
             h || e()
         };
         a.stop = function () {
             h && clearTimeout(h);
             h = l
         };

         function e() {
             var t = k(),
                 i = f(d);
             if (t !== d) {
                 c(d = t, i);
                 j(o).trigger(m)
             } else {
                 if (i !== d) {
                     location.href = location.href.replace(/#.*/, "") + i
                 }
             }
             h = setTimeout(e, j.fn[m].delay)
         }
         j.browser.msie && !n && (function () {
             var i, t;
             a.start = function () {
                 if (!i) {
                     t = j.fn[m].src;
                     t = t && t + k();
                     i = j('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                         t || c(k());
                         e()
                     }).attr("src", t || "javascript:0").insertAfter("body")[0].contentWindow;
                     r.onpropertychange = function () {
                         try {
                             if (event.propertyName === "title") {
                                 i.document.title = r.title
                             }
                         } catch (u) {}
                     }
                 }
             };
             a.stop = b;
             f = function () {
                 return k(i.location.href)
             };
             c = function (z, w) {
                 var y = i.document,
                     x = j.fn[m].domain;
                 if (z !== w) {
                     y.title = r.title;
                     y.open();
                     x && y.write('<script>document.domain="' + x + '"</script>');
                     y.close();
                     i.location.hash = z
                 }
             }
         })();
         return a
     })()
 })(jQuery, this);
 (function (a) {
     var h = "loading",
         b = 32,
         c = 500,
         d = "easeInOutSine",
         e = function (i) {
             var j = i.find(".q-loading-container").height();
             i.find(".q-loading-blue").animate({
                 marginLeft: 0,
                 zIndex: 0
             }, c, d).animate({
                 marginLeft: j,
                 zIndex: 1
             }, c, d);
             i.find(".q-loading-red").animate({
                 marginLeft: j,
                 zIndex: 1
             }, c, d).animate({
                 marginLeft: 0,
                 zIndex: 0
             }, c, d, function () {
                 var k = i.data(h);
                 if (k && k.loop) {
                     e(i)
                 }
             });
             return false
         },
         f = {
             init: function (i) {
                 return this.each(function () {
                     var m, j = a(this),
                         l = j.data(h);
                     if (!l) {
                         i = i || {};
                         m = a.extend({
                             size: b
                         }, i);
                         m.css = a.extend({
                             width: "100%",
                             height: b
                         }, i.css || {});
                         var k = a("<div/>", {
                             "class": "q-loading",
                             css: m.css,
                             html: a("<div/>", {
                                 "class": "q-loading-container",
                                 css: {
                                     height: m.size,
                                     width: m.size * 2,
                                     paddingTop: (m.css.height - m.size) / 2
                                 },
                                 html: a("<div/>", {
                                     "class": "q-loading-red",
                                     css: {
                                         height: m.size,
                                         width: m.size
                                     }
                                 }).add("<div/>", {
                                     "class": "q-loading-blue",
                                     css: {
                                         height: m.size,
                                         width: m.size,
                                         "margin-left": m.size
                                     }
                                 })
                             })
                         });
                         j.append(k);
                         a(this).data(h, {
                             target: j,
                             widget: k,
                             settings: m,
                             loop: true
                         });
                         e(j)
                     } else {
                         m = a.extend(l.settings, i);
                         m.css = a.extend(l.settings.css, i.css || {});
                         j.find(".q-loading").css(m.css).find(".q-loading-container").css({
                             height: m.size,
                             width: m.size * 2,
                             paddingTop: (m.css.height - m.size) / 2
                         }).find(".q-loading-red, .q-loading-blue").css({
                             height: m.size,
                             width: m.size
                         });
                         l.settings = m
                     }
                 })
             },
             destroy: function () {
                 return this.each(function () {
                     var i = a(this),
                         j = i.data(h);
                     a(window).unbind("." + h);
                     if (j) {
                         j.widget.remove();
                         j.loop = false;
                         i.removeData(h)
                     }
                 })
             }
         };
     a.fn.loading = function (i) {
         if (f[i]) {
             return f[i].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof i === "object" || !i) {
                 return f.init.apply(this, arguments)
             } else {
                 a.error("Method " + i + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 /* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
  * Licensed under the MIT License (LICENSE.txt).
  *
  * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
  * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
  * Thanks to: Seamus Leahy for adding deltaX and deltaY
  *
  * Version: 3.0.6
  *
  * Requires: 1.2.2+
  */
 (function (e) {
     function i(a) {
         var j = a || window.event,
             k = [].slice.call(arguments, 1),
             l = 0,
             m = !0,
             n = 0,
             o = 0;
         return a = e.event.fix(j), a.type = "mousewheel", j.wheelDelta && (l = j.wheelDelta / 120), j.detail && (l = -j.detail / 3), o = l, j.axis !== undefined && j.axis === j.HORIZONTAL_AXIS && (o = 0, n = -1 * l), j.wheelDeltaY !== undefined && (o = j.wheelDeltaY / 120), j.wheelDeltaX !== undefined && (n = -1 * j.wheelDeltaX / 120), k.unshift(a, l, n, o), (e.event.dispatch || e.event.handle).apply(this, k)
     }
     var f = ["DOMMouseScroll", "mousewheel"];
     if (e.event.fixHooks) {
         for (var h = f.length; h;) {
             e.event.fixHooks[f[--h]] = e.event.mouseHooks
         }
     }
     e.event.special.mousewheel = {
         setup: function () {
             if (this.addEventListener) {
                 for (var b = f.length; b;) {
                     this.addEventListener(f[--b], i, !1)
                 }
             } else {
                 this.onmousewheel = i
             }
         },
         teardown: function () {
             if (this.removeEventListener) {
                 for (var b = f.length; b;) {
                     this.removeEventListener(f[--b], i, !1)
                 }
             } else {
                 this.onmousewheel = null
             }
         }
     }, e.fn.extend({
         mousewheel: function (b) {
             return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
         },
         unmousewheel: function (b) {
             return this.unbind("mousewheel", b)
         }
     })
 })(jQuery);
 (function (d) {
     var c = {
         init: function (a) {
             var f = {
                     set_width: false,
                     set_height: false,
                     horizontalScroll: false,
                     scrollInertia: 550,
                     scrollEasing: "easeOutCirc",
                     mouseWheel: "auto",
                     autoDraggerLength: true,
                     scrollButtons: {
                         enable: false,
                         scrollType: "continuous",
                         scrollSpeed: 20,
                         scrollAmount: 40
                     },
                     advanced: {
                         updateOnBrowserResize: true,
                         updateOnContentResize: false,
                         autoExpandHorizontalScroll: false
                     },
                     callbacks: {
                         onScroll: function () {},
                         onTotalScroll: function () {},
                         onTotalScrollOffset: 0
                     }
                 },
                 a = d.extend(true, f, a);
             d(document).data("mCS-is-touch-device", false);
             if (b()) {
                 d(document).data("mCS-is-touch-device", true)
             }

             function b() {
                 return !!("ontouchstart" in window) ? 1 : 0
             }
             return this.each(function () {
                 var z = d(this);
                 if (a.set_width) {
                     z.css("width", a.set_width)
                 }
                 if (a.set_height) {
                     z.css("height", a.set_height)
                 }
                 if (!d(document).data("mCustomScrollbar-index")) {
                     d(document).data("mCustomScrollbar-index", "1")
                 } else {
                     var F = parseInt(d(document).data("mCustomScrollbar-index"));
                     d(document).data("mCustomScrollbar-index", F + 1)
                 }
                 z.wrapInner("<div class='mCustomScrollBox' id='mCSB_" + d(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + d(document).data("mCustomScrollbar-index"));
                 var t = z.children(".mCustomScrollBox");
                 if (a.horizontalScroll) {
                     t.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                     var x = t.children(".mCSB_h_wrapper");
                     x.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                         width: x.children().outerWidth(),
                         position: "relative"
                     }).unwrap()
                 } else {
                     t.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
                 }
                 var B = t.children(".mCSB_container");
                 if (!d(document).data("mCS-is-touch-device")) {
                     B.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer' style='position:relative;'><div class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                     var y = t.children(".mCSB_scrollTools"),
                         u = y.children(".mCSB_draggerContainer"),
                         D = u.children(".mCSB_dragger");
                     if (a.horizontalScroll) {
                         D.data("minDraggerWidth", D.width())
                     } else {
                         D.data("minDraggerHeight", D.height())
                     } if (a.scrollButtons.enable) {
                         if (a.horizontalScroll) {
                             y.prepend("<a class='mCSB_buttonLeft' style='display:block; position:relative;'></a>").append("<a class='mCSB_buttonRight' style='display:block; position:relative;'></a>")
                         } else {
                             y.prepend("<a class='mCSB_buttonUp' style='display:block; position:relative;'></a>").append("<a class='mCSB_buttonDown' style='display:block; position:relative;'></a>")
                         }
                     }
                     t.bind("scroll", function () {
                         t.scrollTop(0).scrollLeft(0)
                     });
                     z.data({
                         horizontalScroll: a.horizontalScroll,
                         scrollInertia: a.scrollInertia,
                         scrollEasing: a.scrollEasing,
                         mouseWheel: a.mouseWheel,
                         autoDraggerLength: a.autoDraggerLength,
                         "scrollButtons-enable": a.scrollButtons.enable,
                         "scrollButtons-scrollType": a.scrollButtons.scrollType,
                         "scrollButtons-scrollSpeed": a.scrollButtons.scrollSpeed,
                         "scrollButtons-scrollAmount": a.scrollButtons.scrollAmount,
                         autoExpandHorizontalScroll: a.advanced.autoExpandHorizontalScroll,
                         "onScroll-Callback": a.callbacks.onScroll,
                         "onTotalScroll-Callback": a.callbacks.onTotalScroll,
                         "onTotalScroll-Offset": a.callbacks.onTotalScrollOffset
                     }).mCustomScrollbar("update");
                     if (a.advanced.updateOnBrowserResize) {
                         var v;
                         d(window).resize(function () {
                             if (v) {
                                 clearTimeout(v)
                             }
                             v = setTimeout(function () {
                                 z.mCustomScrollbar("update")
                             }, 150)
                         })
                     }
                 } else {
                     var e = navigator.userAgent;
                     if (e.indexOf("Android") != -1) {
                         var E = parseFloat(e.slice(e.indexOf("Android") + 8));
                         if (E < 3) {
                             w("mCSB_" + d(document).data("mCustomScrollbar-index"))
                         } else {
                             t.css({
                                 overflow: "auto",
                                 "-webkit-overflow-scrolling": "touch"
                             })
                         }
                     } else {
                         t.css({
                             overflow: "auto",
                             "-webkit-overflow-scrolling": "touch"
                         })
                     }
                     B.addClass("mCS_no_scrollbar mCS_touch");
                     z.data({
                         horizontalScroll: a.horizontalScroll,
                         scrollInertia: a.scrollInertia,
                         scrollEasing: a.scrollEasing,
                         autoExpandHorizontalScroll: a.advanced.autoExpandHorizontalScroll,
                         "onScroll-Callback": a.callbacks.onScroll,
                         "onTotalScroll-Callback": a.callbacks.onTotalScroll,
                         "onTotalScroll-Offset": a.callbacks.onTotalScrollOffset
                     });
                     t.scroll(function () {
                         z.mCustomScrollbar("callbacks", t, B)
                     });

                     function w(k) {
                         var h = document.getElementById(k),
                             i = 0,
                             j = 0;
                         document.getElementById(k).addEventListener("touchstart", function (l) {
                             i = this.scrollTop + l.touches[0].pageY;
                             j = this.scrollLeft + l.touches[0].pageX
                         }, false);
                         document.getElementById(k).addEventListener("touchmove", function (l) {
                             if ((this.scrollTop < this.scrollHeight - this.offsetHeight && this.scrollTop + l.touches[0].pageY < i - 5) || (this.scrollTop != 0 && this.scrollTop + l.touches[0].pageY > i + 5)) {
                                 l.preventDefault()
                             }
                             if ((this.scrollLeft < this.scrollWidth - this.offsetWidth && this.scrollLeft + l.touches[0].pageX < j - 5) || (this.scrollLeft != 0 && this.scrollLeft + l.touches[0].pageX > j + 5)) {
                                 l.preventDefault()
                             }
                             this.scrollTop = i - l.touches[0].pageY;
                             this.scrollLeft = j - l.touches[0].pageX
                         }, false)
                     }
                 } if (a.advanced.updateOnContentResize) {
                     var C;
                     if (a.horizontalScroll) {
                         var A = B.outerWidth();
                         if (b()) {
                             t.css({
                                 "-webkit-overflow-scrolling": "auto"
                             })
                         }
                     } else {
                         var A = B.outerHeight()
                     }
                     C = setInterval(function () {
                         if (a.horizontalScroll) {
                             if (a.advanced.autoExpandHorizontalScroll) {
                                 B.css({
                                     position: "absolute",
                                     width: "auto"
                                 }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                     width: B.outerWidth(),
                                     position: "relative"
                                 }).unwrap()
                             }
                             var h = B.outerWidth()
                         } else {
                             var h = B.outerHeight()
                         } if (h != A) {
                             z.mCustomScrollbar("update");
                             A = h
                         }
                     }, 300)
                 }
             })
         },
         update: function () {
             var L = d(this),
                 I = L.children(".mCustomScrollBox"),
                 O = I.children(".mCSB_container");
             if (!d(document).data("mCS-is-touch-device")) {
                 O.removeClass("mCS_no_scrollbar")
             }
             var W = I.children(".mCSB_scrollTools"),
                 M = W.children(".mCSB_draggerContainer"),
                 K = M.children(".mCSB_dragger");
             if (L.data("horizontalScroll")) {
                 var Y = W.children(".mCSB_buttonLeft"),
                     R = W.children(".mCSB_buttonRight"),
                     D = I.width();
                 if (L.data("autoExpandHorizontalScroll")) {
                     O.css({
                         position: "absolute",
                         width: "auto"
                     }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                         width: O.outerWidth(),
                         position: "relative"
                     }).unwrap()
                 }
                 var X = O.outerWidth()
             } else {
                 var U = W.children(".mCSB_buttonUp"),
                     E = W.children(".mCSB_buttonDown"),
                     P = I.height(),
                     G = O.outerHeight()
             } if (G > P && !L.data("horizontalScroll") && !d(document).data("mCS-is-touch-device")) {
                 W.css("display", "block");
                 var Q = M.height();
                 if (L.data("autoDraggerLength")) {
                     var S = Math.round(P / G * Q),
                         J = K.data("minDraggerHeight");
                     if (S <= J) {
                         K.css({
                             height: J
                         })
                     } else {
                         if (S >= Q - 10) {
                             var N = Q - 10;
                             K.css({
                                 height: N
                             })
                         } else {
                             K.css({
                                 height: S
                             })
                         }
                     }
                     K.children(".mCSB_dragger_bar").css({
                         "line-height": K.height() + "px"
                     })
                 }
                 var Z = K.height(),
                     V = (G - P) / (Q - Z);
                 L.data("scrollAmount", V);
                 L.mCustomScrollbar("scrolling", I, O, M, K, U, E, Y, R);
                 var b = Math.abs(Math.round(O.position().top));
                 L.mCustomScrollbar("scrollTo", b, {
                     callback: false
                 })
             } else {
                 if (X > D && L.data("horizontalScroll") && !d(document).data("mCS-is-touch-device")) {
                     W.css("display", "block");
                     var F = M.width();
                     if (L.data("autoDraggerLength")) {
                         var H = Math.round(D / X * F),
                             a = K.data("minDraggerWidth");
                         if (H <= a) {
                             K.css({
                                 width: a
                             })
                         } else {
                             if (H >= F - 10) {
                                 var C = F - 10;
                                 K.css({
                                     width: C
                                 })
                             } else {
                                 K.css({
                                     width: H
                                 })
                             }
                         }
                     }
                     var T = K.width(),
                         V = (X - D) / (F - T);
                     L.data("scrollAmount", V);
                     L.mCustomScrollbar("scrolling", I, O, M, K, U, E, Y, R);
                     var b = Math.abs(Math.round(O.position().left));
                     L.mCustomScrollbar("scrollTo", b, {
                         callback: false
                     })
                 } else {
                     I.unbind("mousewheel");
                     I.unbind("focusin");
                     if (L.data("horizontalScroll")) {
                         K.add(O).css("left", 0)
                     } else {
                         K.add(O).css("top", 0)
                     }
                     W.css("display", "none");
                     O.addClass("mCS_no_scrollbar")
                 }
             }
         },
         scrolling: function (F, N, K, H, T, b, W, Q) {
             var J = d(this);
             if (!H.hasClass("ui-draggable")) {
                 if (J.data("horizontalScroll")) {
                     var G = "x"
                 } else {
                     var G = "y"
                 }
                 H.draggable({
                     axis: G,
                     containment: "parent",
                     drag: function (e, f) {
                         J.mCustomScrollbar("scroll");
                         H.addClass("mCSB_dragger_onDrag")
                     },
                     stop: function (e, f) {
                         H.removeClass("mCSB_dragger_onDrag")
                     }
                 })
             }
             K.unbind("click").bind("click", function (h) {
                 if (J.data("horizontalScroll")) {
                     var e = (h.pageX - K.offset().left);
                     if (e < H.position().left || e > (H.position().left + H.width())) {
                         var f = e;
                         if (f >= K.width() - H.width()) {
                             f = K.width() - H.width()
                         }
                         H.css("left", f);
                         J.mCustomScrollbar("scroll")
                     }
                 } else {
                     var e = (h.pageY - K.offset().top);
                     if (e < H.position().top || e > (H.position().top + H.height())) {
                         var f = e;
                         if (f >= K.height() - H.height()) {
                             f = K.height() - H.height()
                         }
                         H.css("top", f);
                         J.mCustomScrollbar("scroll")
                     }
                 }
             });
             if (J.data("mouseWheel")) {
                 var R = J.data("mouseWheel");
                 if (J.data("mouseWheel") === "auto") {
                     R = 8;
                     var L = navigator.userAgent;
                     if (L.indexOf("Mac") != -1 && L.indexOf("Safari") != -1 && L.indexOf("AppleWebKit") != -1 && L.indexOf("Chrome") == -1) {
                         R = 1
                     }
                 }
                 F.unbind("mousewheel").bind("mousewheel", function (i, n) {
                     i.preventDefault();
                     var m = Math.abs(n * R);
                     if (J.data("horizontalScroll")) {
                         var h = H.position().left - (n * m);
                         H.css("left", h);
                         if (H.position().left < 0) {
                             H.css("left", 0)
                         }
                         var l = K.width(),
                             k = H.width();
                         if (H.position().left > l - k) {
                             H.css("left", l - k)
                         }
                     } else {
                         var e = H.position().top - (n * m);
                         H.css("top", e);
                         if (H.position().top < 0) {
                             H.css("top", 0)
                         }
                         var j = K.height(),
                             f = H.height();
                         if (H.position().top > j - f) {
                             H.css("top", j - f)
                         }
                     }
                     J.mCustomScrollbar("scroll")
                 })
             }
             if (J.data("scrollButtons-enable")) {
                 if (J.data("scrollButtons-scrollType") === "pixels") {
                     var a;
                     if (d.browser.msie && parseInt(d.browser.version) < 9) {
                         J.data("scrollInertia", 0)
                     }
                     if (J.data("horizontalScroll")) {
                         Q.add(W).unbind("click mousedown mouseup mouseout", I, E);
                         Q.bind("click", function (e) {
                             e.preventDefault();
                             if (!N.is(":animated")) {
                                 a = Math.abs(N.position().left) + J.data("scrollButtons-scrollAmount");
                                 J.mCustomScrollbar("scrollTo", a)
                             }
                         });
                         W.bind("click", function (e) {
                             e.preventDefault();
                             if (!N.is(":animated")) {
                                 a = Math.abs(N.position().left) - J.data("scrollButtons-scrollAmount");
                                 if (N.position().left >= -J.data("scrollButtons-scrollAmount")) {
                                     a = "left"
                                 }
                                 J.mCustomScrollbar("scrollTo", a)
                             }
                         })
                     } else {
                         b.add(T).unbind("click mousedown mouseup mouseout", P, D);
                         b.bind("click", function (e) {
                             e.preventDefault();
                             if (!N.is(":animated")) {
                                 a = Math.abs(N.position().top) + J.data("scrollButtons-scrollAmount");
                                 J.mCustomScrollbar("scrollTo", a)
                             }
                         });
                         T.bind("click", function (e) {
                             e.preventDefault();
                             if (!N.is(":animated")) {
                                 a = Math.abs(N.position().top) - J.data("scrollButtons-scrollAmount");
                                 if (N.position().top >= -J.data("scrollButtons-scrollAmount")) {
                                     a = "top"
                                 }
                                 J.mCustomScrollbar("scrollTo", a)
                             }
                         })
                     }
                 } else {
                     if (J.data("horizontalScroll")) {
                         Q.add(W).unbind("click mousedown mouseup mouseout", I, E);
                         var V, C = K.width(),
                             S = H.width();
                         Q.bind("mousedown", function (f) {
                             f.preventDefault();
                             var e = C - S;
                             V = setInterval(function () {
                                 var h = Math.abs(H.position().left - e) * (100 / J.data("scrollButtons-scrollSpeed"));
                                 H.stop().animate({
                                     left: e
                                 }, h, "linear");
                                 J.mCustomScrollbar("scroll")
                             }, 20)
                         });
                         var I = function (e) {
                             e.preventDefault();
                             clearInterval(V);
                             H.stop()
                         };
                         Q.bind("mouseup mouseout", I);
                         var B;
                         W.bind("mousedown", function (f) {
                             f.preventDefault();
                             var e = 0;
                             B = setInterval(function () {
                                 var h = Math.abs(H.position().left - e) * (100 / J.data("scrollButtons-scrollSpeed"));
                                 H.stop().animate({
                                     left: e
                                 }, h, "linear");
                                 J.mCustomScrollbar("scroll")
                             }, 20)
                         });
                         var E = function (e) {
                             e.preventDefault();
                             clearInterval(B);
                             H.stop()
                         };
                         W.bind("mouseup mouseout", E)
                     } else {
                         b.add(T).unbind("click mousedown mouseup mouseout", P, D);
                         var M, O = K.height(),
                             X = H.height();
                         b.bind("mousedown", function (f) {
                             f.preventDefault();
                             var e = O - X;
                             M = setInterval(function () {
                                 var h = Math.abs(H.position().top - e) * (100 / J.data("scrollButtons-scrollSpeed"));
                                 H.stop().animate({
                                     top: e
                                 }, h, "linear");
                                 J.mCustomScrollbar("scroll")
                             }, 20)
                         });
                         var P = function (e) {
                             e.preventDefault();
                             clearInterval(M);
                             H.stop()
                         };
                         b.bind("mouseup mouseout", P);
                         var U;
                         T.bind("mousedown", function (f) {
                             f.preventDefault();
                             var e = 0;
                             U = setInterval(function () {
                                 var h = Math.abs(H.position().top - e) * (100 / J.data("scrollButtons-scrollSpeed"));
                                 H.stop().animate({
                                     top: e
                                 }, h, "linear");
                                 J.mCustomScrollbar("scroll")
                             }, 20)
                         });
                         var D = function (e) {
                             e.preventDefault();
                             clearInterval(U);
                             H.stop()
                         };
                         T.bind("mouseup mouseout", D)
                     }
                 }
             }
             F.unbind("focusin").bind("focusin", function () {
                 F.scrollTop(0).scrollLeft(0);
                 var f = d(document.activeElement);
                 if (f.is("input,textarea,select,button,a[tabindex],area,object")) {
                     if (J.data("horizontalScroll")) {
                         var n = N.position().left,
                             k = f.position().left,
                             i = F.width(),
                             l = f.outerWidth();
                         if (n + k >= 0 && n + k <= i - l) {} else {
                             var o = k / J.data("scrollAmount");
                             if (o >= K.width() - H.width()) {
                                 o = K.width() - H.width()
                             }
                             H.css("left", o);
                             J.mCustomScrollbar("scroll")
                         }
                     } else {
                         var m = N.position().top,
                             j = f.position().top,
                             e = F.height(),
                             h = f.outerHeight();
                         if (m + j >= 0 && m + j <= e - h) {} else {
                             var o = j / J.data("scrollAmount");
                             if (o >= K.height() - H.height()) {
                                 o = K.height() - H.height()
                             }
                             H.css("top", o);
                             J.mCustomScrollbar("scroll")
                         }
                     }
                 }
             })
         },
         scroll: function (u) {
             var x = d(this),
                 C = x.find(".mCSB_dragger"),
                 A = x.find(".mCSB_container"),
                 r = x.find(".mCustomScrollBox");
             if (x.data("horizontalScroll")) {
                 var t = C.position().left,
                     z = -t * x.data("scrollAmount"),
                     B = A.position().left,
                     b = Math.round(B - z)
             } else {
                 var s = C.position().top,
                     w = -s * x.data("scrollAmount"),
                     y = A.position().top,
                     a = Math.round(y - w)
             } if (d.browser.webkit) {
                 var D = (window.outerWidth - 8) / window.innerWidth,
                     v = (D < 0.98 || D > 1.02)
             }
             if (x.data("scrollInertia") === 0 || v) {
                 if (x.data("horizontalScroll")) {
                     A.css("left", z)
                 } else {
                     A.css("top", w)
                 } if (!u) {
                     x.mCustomScrollbar("callbacks", r, A)
                 }
             } else {
                 if (x.data("horizontalScroll")) {
                     A.stop().animate({
                         left: "-=" + b
                     }, x.data("scrollInertia"), x.data("scrollEasing"), function () {
                         if (!u) {
                             x.mCustomScrollbar("callbacks", r, A)
                         }
                     })
                 } else {
                     A.stop().animate({
                         top: "-=" + a
                     }, x.data("scrollInertia"), x.data("scrollEasing"), function () {
                         if (!u) {
                             x.mCustomScrollbar("callbacks", r, A)
                         }
                     })
                 }
             }
         },
         scrollTo: function (p, v) {
             var o = {
                     moveDragger: false,
                     callback: true
                 },
                 v = d.extend(o, v),
                 r = d(this),
                 a, b = r.find(".mCustomScrollBox"),
                 s = b.children(".mCSB_container");
             if (!d(document).data("mCS-is-touch-device")) {
                 var n = r.find(".mCSB_draggerContainer"),
                     t = n.children(".mCSB_dragger")
             }
             var u;
             if (p) {
                 if (typeof (p) === "number") {
                     if (v.moveDragger) {
                         a = p
                     } else {
                         u = p;
                         a = Math.round(u / r.data("scrollAmount"))
                     }
                 } else {
                     if (typeof (p) === "string") {
                         var q;
                         if (p === "top") {
                             q = 0
                         } else {
                             if (p === "bottom" && !r.data("horizontalScroll")) {
                                 q = s.outerHeight() - b.height()
                             } else {
                                 if (p === "left") {
                                     q = 0
                                 } else {
                                     if (p === "right" && r.data("horizontalScroll")) {
                                         q = s.outerWidth() - b.width()
                                     } else {
                                         if (p === "first") {
                                             q = r.find(".mCSB_container").find(":first")
                                         } else {
                                             if (p === "last") {
                                                 q = r.find(".mCSB_container").find(":last")
                                             } else {
                                                 q = r.find(p)
                                             }
                                         }
                                     }
                                 }
                             }
                         } if (q.length === 1) {
                             if (r.data("horizontalScroll")) {
                                 u = q.position().left
                             } else {
                                 u = q.position().top
                             } if (d(document).data("mCS-is-touch-device")) {
                                 a = u
                             } else {
                                 a = Math.ceil(u / r.data("scrollAmount"))
                             }
                         } else {
                             a = q
                         }
                     }
                 } if (d(document).data("mCS-is-touch-device")) {
                     if (r.data("horizontalScroll")) {
                         b.stop().animate({
                             scrollLeft: a
                         }, r.data("scrollInertia"), r.data("scrollEasing"), function () {
                             if (v.callback) {
                                 r.mCustomScrollbar("callbacks", b, s)
                             }
                         })
                     } else {
                         b.stop().animate({
                             scrollTop: a
                         }, r.data("scrollInertia"), r.data("scrollEasing"), function () {
                             if (v.callback) {
                                 r.mCustomScrollbar("callbacks", b, s)
                             }
                         })
                     }
                 } else {
                     if (r.data("horizontalScroll")) {
                         if (a >= n.width() - t.width()) {
                             a = n.width() - t.width()
                         }
                         t.css("left", a)
                     } else {
                         if (a >= n.height() - t.height()) {
                             a = n.height() - t.height()
                         }
                         t.css("top", a)
                     } if (v.callback) {
                         r.mCustomScrollbar("scroll")
                     } else {
                         r.mCustomScrollbar("scroll", true)
                     }
                 }
             }
         },
         callbacks: function (j, m) {
             var n = d(this);
             if (!d(document).data("mCS-is-touch-device")) {
                 if (n.data("horizontalScroll")) {
                     var l = Math.round(m.position().left);
                     if (l < 0 && l <= j.width() - m.outerWidth() + n.data("onTotalScroll-Offset")) {
                         n.data("onTotalScroll-Callback").call()
                     } else {
                         n.data("onScroll-Callback").call()
                     }
                 } else {
                     var k = Math.round(m.position().top);
                     if (k < 0 && k <= j.height() - m.outerHeight() + n.data("onTotalScroll-Offset")) {
                         n.data("onTotalScroll-Callback").call()
                     } else {
                         n.data("onScroll-Callback").call()
                     }
                 }
             } else {
                 if (n.data("horizontalScroll")) {
                     var b = Math.round(j.scrollLeft());
                     if (b > 0 && b >= m.outerWidth() - n.width() - n.data("onTotalScroll-Offset")) {
                         n.data("onTotalScroll-Callback").call()
                     } else {
                         n.data("onScroll-Callback").call()
                     }
                 } else {
                     var a = Math.round(j.scrollTop());
                     if (a > 0 && a >= m.outerHeight() - n.height() - n.data("onTotalScroll-Offset")) {
                         n.data("onTotalScroll-Callback").call()
                     } else {
                         n.data("onScroll-Callback").call()
                     }
                 }
             }
         }
     };
     d.fn.mCustomScrollbar = function (a) {
         if (c[a]) {
             return c[a].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof a === "object" || !a) {
                 return c.init.apply(this, arguments)
             } else {
                 d.error("Method " + a + " does not exist")
             }
         }
     }
 })(jQuery);
 (function (a) {
     a.flexslider = function (t, u) {
         var b = a(t),
             d = a.extend({}, a.flexslider.defaults, u),
             j = d.namespace,
             z = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
             A = z ? "touchend" : "click",
             v = "vertical" === d.direction,
             w = d.reverse,
             o = 0 < d.itemWidth,
             y = "fade" === d.animation,
             x = "" !== d.asNavFor,
             n = {};
         a.data(t, "flexslider", b);
         n = {
             init: function () {
                 b.animating = !1;
                 b.currentSlide = d.startAt;
                 b.animatingTo = b.currentSlide;
                 b.atEnd = 0 === b.currentSlide || b.currentSlide === b.last;
                 b.containerSelector = d.selector.substr(0, d.selector.search(" "));
                 b.slides = a(d.selector, b);
                 b.container = a(b.containerSelector, b);
                 b.count = b.slides.length;
                 b.syncExists = 0 < a(d.sync).length;
                 "slide" === d.animation && (d.animation = "swing");
                 b.prop = v ? "top" : "marginLeft";
                 b.args = {};
                 b.manualPause = !1;
                 var c = b,
                     h;
                 if (h = !d.video) {
                     if (h = !y) {
                         if (h = d.useCSS) {
                             b: {
                                 h = document.createElement("div");
                                 var i = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                                     f;
                                 for (f in i) {
                                     if (void 0 !== h.style[i[f]]) {
                                         b.pfx = i[f].replace("Perspective", "").toLowerCase();
                                         b.prop = "-" + b.pfx + "-transform";
                                         h = !0;
                                         break b
                                     }
                                 }
                                 h = !1
                             }
                         }
                     }
                 }
                 c.transitions = h;
                 "" !== d.controlsContainer && (b.controlsContainer = 0 < a(d.controlsContainer).length && a(d.controlsContainer));
                 "" !== d.manualControls && (b.manualControls = 0 < a(d.manualControls).length && a(d.manualControls));
                 d.randomize && (b.slides.sort(function () {
                     return Math.round(Math.random()) - 0.5
                 }), b.container.empty().append(b.slides));
                 b.doMath();
                 x && n.asNav.setup();
                 b.setup("init");
                 d.controlNav && n.controlNav.setup();
                 d.directionNav && n.directionNav.setup();
                 d.keyboard && (1 === a(b.containerSelector).length || d.multipleKeyboard) && a(document).bind("keyup", function (e) {
                     e = e.keyCode;
                     if (!b.animating && (e === 39 || e === 37)) {
                         e = e === 39 ? b.getTarget("next") : e === 37 ? b.getTarget("prev") : false;
                         b.flexAnimate(e, d.pauseOnAction)
                     }
                 });
                 d.mousewheel && b.bind("mousewheel", function (e, l) {
                     e.preventDefault();
                     var k = l < 0 ? b.getTarget("next") : b.getTarget("prev");
                     b.flexAnimate(k, d.pauseOnAction)
                 });
                 d.pausePlay && n.pausePlay.setup();
                 d.slideshow && (d.pauseOnHover && b.hover(function () {
                     !b.manualPlay && !b.manualPause && b.pause()
                 }, function () {
                     !b.manualPause && !b.manualPlay && b.play()
                 }), 0 < d.initDelay ? setTimeout(b.play, d.initDelay) : b.play());
                 z && d.touch && n.touch();
                 (!y || y && d.smoothHeight) && a(window).bind("resize focus", n.resize);
                 setTimeout(function () {
                     d.start(b)
                 }, 200)
             },
             asNav: {
                 setup: function () {
                     b.asNav = !0;
                     b.animatingTo = Math.floor(b.currentSlide / b.move);
                     b.currentItem = b.currentSlide;
                     b.slides.removeClass(j + "active-slide").eq(b.currentItem).addClass(j + "active-slide");
                     b.slides.click(function (c) {
                         c.preventDefault();
                         var c = a(this),
                             e = c.index();
                         !a(d.asNavFor).data("flexslider").animating && !c.hasClass("active") && (b.direction = b.currentItem < e ? "next" : "prev", b.flexAnimate(e, d.pauseOnAction, !1, !0, !0))
                     })
                 }
             },
             controlNav: {
                 setup: function () {
                     b.manualControls ? n.controlNav.setupManual() : n.controlNav.setupPaging()
                 },
                 setupPaging: function () {
                     var c = 1,
                         e;
                     b.controlNavScaffold = a('<ol class="' + j + "control-nav " + j + ("thumbnails" === d.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                     if (1 < b.pagingCount) {
                         for (var f = 0; f < b.pagingCount; f++) {
                             e = "thumbnails" === d.controlNav ? '<img src="' + b.slides.eq(f).attr("data-thumb") + '"/>' : "<a>" + c + "</a>", b.controlNavScaffold.append("<li>" + e + "</li>"), c++
                         }
                     }
                     b.controlsContainer ? a(b.controlsContainer).append(b.controlNavScaffold) : b.append(b.controlNavScaffold);
                     n.controlNav.set();
                     n.controlNav.active();
                     b.controlNavScaffold.delegate("a, img", A, function (h) {
                         h.preventDefault();
                         var h = a(this),
                             i = b.controlNav.index(h);
                         h.hasClass(j + "active") || (b.direction = i > b.currentSlide ? "next" : "prev", b.flexAnimate(i, d.pauseOnAction))
                     });
                     z && b.controlNavScaffold.delegate("a", "click touchstart", function (h) {
                         h.preventDefault()
                     })
                 },
                 setupManual: function () {
                     b.controlNav = b.manualControls;
                     n.controlNav.active();
                     b.controlNav.live(A, function (c) {
                         c.preventDefault();
                         var c = a(this),
                             e = b.controlNav.index(c);
                         c.hasClass(j + "active") || (e > b.currentSlide ? b.direction = "next" : b.direction = "prev", b.flexAnimate(e, d.pauseOnAction))
                     });
                     z && b.controlNav.live("click touchstart", function (c) {
                         c.preventDefault()
                     })
                 },
                 set: function () {
                     b.controlNav = a("." + j + "control-nav li " + ("thumbnails" === d.controlNav ? "img" : "a"), b.controlsContainer ? b.controlsContainer : b)
                 },
                 active: function () {
                     b.controlNav.removeClass(j + "active").eq(b.animatingTo).addClass(j + "active")
                 },
                 update: function (e, f) {
                     1 < b.pagingCount && "add" === e ? b.controlNavScaffold.append(a("<li><a>" + b.count + "</a></li>")) : 1 === b.pagingCount ? b.controlNavScaffold.find("li").remove() : b.controlNav.eq(f).closest("li").remove();
                     n.controlNav.set();
                     1 < b.pagingCount && b.pagingCount !== b.controlNav.length ? b.update(f, e) : n.controlNav.active()
                 }
             },
             directionNav: {
                 setup: function () {
                     var c = a('<ul class="' + j + 'direction-nav"><li><a class="' + j + 'prev" href="#">' + d.prevText + '</a></li><li><a class="' + j + 'next" href="#">' + d.nextText + "</a></li></ul>");
                     b.controlsContainer ? (a(b.controlsContainer).append(c), b.directionNav = a("." + j + "direction-nav li a", b.controlsContainer)) : (b.append(c), b.directionNav = a("." + j + "direction-nav li a", b));
                     n.directionNav.update();
                     b.directionNav.bind(A, function (e) {
                         e.preventDefault();
                         e = a(this).hasClass(j + "next") ? b.getTarget("next") : b.getTarget("prev");
                         b.flexAnimate(e, d.pauseOnAction)
                     });
                     z && b.directionNav.bind("click touchstart", function (e) {
                         e.preventDefault()
                     })
                 },
                 update: function () {
                     var c = j + "disabled";
                     1 === b.pagingCount ? b.directionNav.addClass(c) : d.animationLoop ? b.directionNav.removeClass(c) : 0 === b.animatingTo ? b.directionNav.removeClass(c).filter("." + j + "prev").addClass(c) : b.animatingTo === b.last ? b.directionNav.removeClass(c).filter("." + j + "next").addClass(c) : b.directionNav.removeClass(c)
                 }
             },
             pausePlay: {
                 setup: function () {
                     var c = a('<div class="' + j + 'pauseplay"><a></a></div>');
                     b.controlsContainer ? (b.controlsContainer.append(c), b.pausePlay = a("." + j + "pauseplay a", b.controlsContainer)) : (b.append(c), b.pausePlay = a("." + j + "pauseplay a", b));
                     n.pausePlay.update(d.slideshow ? j + "pause" : j + "play");
                     b.pausePlay.bind(A, function (e) {
                         e.preventDefault();
                         if (a(this).hasClass(j + "pause")) {
                             b.manualPause = true;
                             b.manualPlay = false;
                             b.pause()
                         } else {
                             b.manualPause = false;
                             b.manualPlay = true;
                             b.play()
                         }
                     });
                     z && b.pausePlay.bind("click touchstart", function (e) {
                         e.preventDefault()
                     })
                 },
                 update: function (c) {
                     "play" === c ? b.pausePlay.removeClass(j + "pause").addClass(j + "play").text(d.playText) : b.pausePlay.removeClass(j + "play").addClass(j + "pause").text(d.pauseText)
                 }
             },
             touch: function () {
                 function c(e) {
                     q = v ? h - e.touches[0].pageY : h - e.touches[0].pageX;
                     B = v ? Math.abs(q) < Math.abs(e.touches[0].pageX - i) : Math.abs(q) < Math.abs(e.touches[0].pageY - i);
                     if (!B || 500 < Number(new Date) - r) {
                         e.preventDefault(), !y && b.transitions && (d.animationLoop || (q /= 0 === b.currentSlide && 0 > q || b.currentSlide === b.last && 0 < q ? Math.abs(q) / s + 2 : 1), b.setProps(l + q, "setTouch"))
                     }
                 }

                 function m() {
                     if (b.animatingTo === b.currentSlide && !B && null !== q) {
                         var e = w ? -q : q,
                             f = 0 < e ? b.getTarget("next") : b.getTarget("prev");
                         b.canAdvance(f) && (550 > Number(new Date) - r && 50 < Math.abs(e) || Math.abs(e) > s / 2) ? b.flexAnimate(f, d.pauseOnAction) : b.flexAnimate(b.currentSlide, d.pauseOnAction, !0)
                     }
                     t.removeEventListener("touchmove", c, !1);
                     t.removeEventListener("touchend", m, !1);
                     l = q = i = h = null
                 }
                 var h, i, l, s, q, r, B = !1;
                 t.addEventListener("touchstart", function (e) {
                     b.animating ? e.preventDefault() : 1 === e.touches.length && (b.pause(), s = v ? b.h : b.w, r = Number(new Date), l = o && w && b.animatingTo === b.last ? 0 : o && w ? b.limit - (b.itemW + d.itemMargin) * b.move * b.animatingTo : o && b.currentSlide === b.last ? b.limit : o ? (b.itemW + d.itemMargin) * b.move * b.currentSlide : w ? (b.last - b.currentSlide + b.cloneOffset) * s : (b.currentSlide + b.cloneOffset) * s, h = v ? e.touches[0].pageY : e.touches[0].pageX, i = v ? e.touches[0].pageX : e.touches[0].pageY, t.addEventListener("touchmove", c, !1), t.addEventListener("touchend", m, !1))
                 }, !1)
             },
             resize: function () {
                 !b.animating && b.is(":visible") && (o || b.doMath(), y ? n.smoothHeight() : o ? (b.slides.width(b.computedW), b.update(b.pagingCount), b.setProps()) : v ? (b.viewport.height(b.h), b.setProps(b.h, "setTotal")) : (d.smoothHeight && n.smoothHeight(), b.newSlides.width(b.computedW), b.setProps(b.computedW, "setTotal")))
             },
             smoothHeight: function (e) {
                 if (!v || y) {
                     var f = y ? b : b.viewport;
                     e ? f.animate({
                         height: b.slides.eq(b.animatingTo).height()
                     }, e) : f.height(b.slides.eq(b.animatingTo).height())
                 }
             },
             sync: function (c) {
                 var h = a(d.sync).data("flexslider"),
                     f = b.animatingTo;
                 switch (c) {
                 case "animate":
                     h.flexAnimate(f, d.pauseOnAction, !1, !0);
                     break;
                 case "play":
                     !h.playing && !h.asNav && h.play();
                     break;
                 case "pause":
                     h.pause()
                 }
             }
         };
         b.flexAnimate = function (c, e, l, f, h) {
             x && 1 === b.pagingCount && (b.direction = b.currentItem < c ? "next" : "prev");
             if (!b.animating && (b.canAdvance(c, h) || l) && b.is(":visible")) {
                 if (x && f) {
                     if (l = a(d.asNavFor).data("flexslider"), b.atEnd = 0 === c || c === b.count - 1, l.flexAnimate(c, !0, !1, !0, h), b.direction = b.currentItem < c ? "next" : "prev", l.direction = b.direction, Math.ceil((c + 1) / b.visible) - 1 !== b.currentSlide && 0 !== c) {
                         b.currentItem = c, b.slides.removeClass(j + "active-slide").eq(c).addClass(j + "active-slide"), c = Math.floor(c / b.visible)
                     } else {
                         return b.currentItem = c, b.slides.removeClass(j + "active-slide").eq(c).addClass(j + "active-slide"), !1
                     }
                 }
                 b.animating = !0;
                 b.animatingTo = c;
                 d.before(b);
                 e && b.pause();
                 b.syncExists && !h && n.sync("animate");
                 d.controlNav && n.controlNav.active();
                 o || b.slides.removeClass(j + "active-slide").eq(c).addClass(j + "active-slide");
                 b.atEnd = 0 === c || c === b.last;
                 d.directionNav && n.directionNav.update();
                 c === b.last && (d.end(b), d.animationLoop || b.pause());
                 if (y) {
                     b.slides.eq(b.currentSlide).fadeOut(d.animationSpeed, d.easing), b.slides.eq(c).fadeIn(d.animationSpeed, d.easing, b.wrapup)
                 } else {
                     var m = v ? b.slides.filter(":first").height() : b.computedW;
                     o ? (c = d.itemWidth > b.w ? 2 * d.itemMargin : d.itemMargin, c = (b.itemW + c) * b.move * b.animatingTo, c = c > b.limit && 1 !== b.visible ? b.limit : c) : c = 0 === b.currentSlide && c === b.count - 1 && d.animationLoop && "next" !== b.direction ? w ? (b.count + b.cloneOffset) * m : 0 : b.currentSlide === b.last && 0 === c && d.animationLoop && "prev" !== b.direction ? w ? 0 : (b.count + 1) * m : w ? (b.count - 1 - c + b.cloneOffset) * m : (c + b.cloneOffset) * m;
                     b.setProps(c, "", d.animationSpeed);
                     if (b.transitions) {
                         if (!d.animationLoop || !b.atEnd) {
                             b.animating = !1, b.currentSlide = b.animatingTo
                         }
                         b.container.unbind("webkitTransitionEnd transitionend");
                         b.container.bind("webkitTransitionEnd transitionend", function () {
                             b.wrapup(m)
                         })
                     } else {
                         b.container.animate(b.args, d.animationSpeed, d.easing, function () {
                             b.wrapup(m)
                         })
                     }
                 }
                 d.smoothHeight && n.smoothHeight(d.animationSpeed)
             }
         };
         b.wrapup = function (c) {
             !y && !o && (0 === b.currentSlide && b.animatingTo === b.last && d.animationLoop ? b.setProps(c, "jumpEnd") : b.currentSlide === b.last && (0 === b.animatingTo && d.animationLoop) && b.setProps(c, "jumpStart"));
             b.animating = !1;
             b.currentSlide = b.animatingTo;
             d.after(b)
         };
         b.animateSlides = function () {
             b.animating || b.flexAnimate(b.getTarget("next"))
         };
         b.pause = function () {
             clearInterval(b.animatedSlides);
             b.playing = !1;
             d.pausePlay && n.pausePlay.update("play");
             b.syncExists && n.sync("pause")
         };
         b.play = function () {
             b.animatedSlides = setInterval(b.animateSlides, d.slideshowSpeed);
             b.playing = !0;
             d.pausePlay && n.pausePlay.update("pause");
             b.syncExists && n.sync("play")
         };
         b.canAdvance = function (c, f) {
             var e = x ? b.pagingCount - 1 : b.last;
             return f ? !0 : x && b.currentItem === b.count - 1 && 0 === c && "prev" === b.direction ? !0 : x && 0 === b.currentItem && c === b.pagingCount - 1 && "next" !== b.direction ? !1 : c === b.currentSlide && !x ? !1 : d.animationLoop ? !0 : b.atEnd && 0 === b.currentSlide && c === e && "next" !== b.direction ? !1 : b.atEnd && b.currentSlide === e && 0 === c && "next" === b.direction ? !1 : !0
         };
         b.getTarget = function (c) {
             b.direction = c;
             return "next" === c ? b.currentSlide === b.last ? 0 : b.currentSlide + 1 : 0 === b.currentSlide ? b.last : b.currentSlide - 1
         };
         b.setProps = function (c, l, h) {
             var i, k = c ? c : (b.itemW + d.itemMargin) * b.move * b.animatingTo;
             i = -1 * function () {
                 if (o) {
                     return "setTouch" === l ? c : w && b.animatingTo === b.last ? 0 : w ? b.limit - (b.itemW + d.itemMargin) * b.move * b.animatingTo : b.animatingTo === b.last ? b.limit : k
                 }
                 switch (l) {
                 case "setTotal":
                     return w ? (b.count - 1 - b.currentSlide + b.cloneOffset) * c : (b.currentSlide + b.cloneOffset) * c;
                 case "setTouch":
                     return c;
                 case "jumpEnd":
                     return w ? c : b.count * c;
                 case "jumpStart":
                     return w ? b.count * c : c;
                 default:
                     return c
                 }
             }() + "px";
             b.transitions && (i = v ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", h = void 0 !== h ? h / 1000 + "s" : "0s", b.container.css("-" + b.pfx + "-transition-duration", h));
             b.args[b.prop] = i;
             (b.transitions || void 0 === h) && b.container.css(b.args)
         };
         b.setup = function (c) {
             if (y) {
                 b.slides.css({
                     width: "100%",
                     "float": "left",
                     marginRight: "-100%",
                     position: "relative"
                 }), "init" === c && b.slides.eq(b.currentSlide).fadeIn(d.animationSpeed, d.easing), d.smoothHeight && n.smoothHeight()
             } else {
                 var e, f;
                 "init" === c && (b.viewport = a('<div class="' + j + 'viewport"></div>').css({
                     overflow: "hidden",
                     position: "relative"
                 }).appendTo(b).append(b.container), b.cloneCount = 0, b.cloneOffset = 0, w && (f = a.makeArray(b.slides).reverse(), b.slides = a(f), b.container.empty().append(b.slides)));
                 d.animationLoop && !o && (b.cloneCount = 2, b.cloneOffset = 1, "init" !== c && b.container.find(".clone").remove(), b.container.append(b.slides.first().clone().addClass("clone")).prepend(b.slides.last().clone().addClass("clone")));
                 b.newSlides = a(d.selector, b);
                 e = w ? b.count - 1 - b.currentSlide + b.cloneOffset : b.currentSlide + b.cloneOffset;
                 v && !o ? (b.container.height(200 * (b.count + b.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                     b.newSlides.css({
                         display: "block"
                     });
                     b.doMath();
                     b.viewport.height(b.h);
                     b.setProps(e * b.h, "init")
                 }, "init" === c ? 100 : 0)) : (b.container.width(200 * (b.count + b.cloneCount) + "%"), b.setProps(e * b.computedW, "init"), setTimeout(function () {
                     b.doMath();
                     b.newSlides.css({
                         width: b.computedW,
                         "float": "left",
                         display: "block"
                     });
                     d.smoothHeight && n.smoothHeight()
                 }, "init" === c ? 100 : 0))
             }
             o || b.slides.removeClass(j + "active-slide").eq(b.currentSlide).addClass(j + "active-slide")
         };
         b.doMath = function () {
             var c = b.slides.first(),
                 h = d.itemMargin,
                 i = d.minItems,
                 k = d.maxItems;
             b.w = b.width();
             b.h = c.height();
             b.boxPadding = c.outerWidth() - c.width();
             o ? (b.itemT = d.itemWidth + h, b.minW = i ? i * b.itemT : b.w, b.maxW = k ? k * b.itemT : b.w, b.itemW = b.minW > b.w ? (b.w - h * i) / i : b.maxW < b.w ? (b.w - h * k) / k : d.itemWidth > b.w ? b.w : d.itemWidth, b.visible = Math.floor(b.w / (b.itemW + h)), b.move = 0 < d.move && d.move < b.visible ? d.move : b.visible, b.pagingCount = Math.ceil((b.count - b.visible) / b.move + 1), b.last = b.pagingCount - 1, b.limit = 1 === b.pagingCount ? 0 : d.itemWidth > b.w ? (b.itemW + 2 * h) * b.count - b.w - h : (b.itemW + h) * b.count - b.w - h) : (b.itemW = b.w, b.pagingCount = b.count, b.last = b.count - 1);
             b.computedW = b.itemW - b.boxPadding
         };
         b.update = function (c, e) {
             b.doMath();
             o || (c < b.currentSlide ? b.currentSlide += 1 : c <= b.currentSlide && 0 !== c && (b.currentSlide -= 1), b.animatingTo = b.currentSlide);
             if (d.controlNav && !b.manualControls) {
                 if ("add" === e && !o || b.pagingCount > b.controlNav.length) {
                     n.controlNav.update("add")
                 } else {
                     if ("remove" === e && !o || b.pagingCount < b.controlNav.length) {
                         o && b.currentSlide > b.last && (b.currentSlide -= 1, b.animatingTo -= 1), n.controlNav.update("remove", b.last)
                     }
                 }
             }
             d.directionNav && n.directionNav.update()
         };
         b.addSlide = function (c, h) {
             var i = a(c);
             b.count += 1;
             b.last = b.count - 1;
             v && w ? void 0 !== h ? b.slides.eq(b.count - h).after(i) : b.container.prepend(i) : void 0 !== h ? b.slides.eq(h).before(i) : b.container.append(i);
             b.update(h, "add");
             b.slides = a(d.selector + ":not(.clone)", b);
             b.setup();
             d.added(b)
         };
         b.removeSlide = function (c) {
             var f = isNaN(c) ? b.slides.index(a(c)) : c;
             b.count -= 1;
             b.last = b.count - 1;
             isNaN(c) ? a(c, b.slides).remove() : v && w ? b.slides.eq(b.last).remove() : b.slides.eq(c).remove();
             b.doMath();
             b.update(f, "remove");
             b.slides = a(d.selector + ":not(.clone)", b);
             b.setup();
             d.removed(b)
         };
         n.init()
     };
     a.flexslider.defaults = {
         namespace: "flex-",
         selector: ".slides > li",
         animation: "fade",
         easing: "swing",
         direction: "horizontal",
         reverse: !1,
         animationLoop: !0,
         smoothHeight: !1,
         startAt: 0,
         slideshow: !0,
         slideshowSpeed: 7000,
         animationSpeed: 600,
         initDelay: 0,
         randomize: !1,
         pauseOnAction: !0,
         pauseOnHover: !1,
         useCSS: !0,
         touch: !0,
         video: !1,
         controlNav: !0,
         directionNav: !0,
         prevText: "Previous",
         nextText: "Next",
         keyboard: !0,
         multipleKeyboard: !1,
         mousewheel: !1,
         pausePlay: !1,
         pauseText: "Pause",
         playText: "Play",
         controlsContainer: "",
         manualControls: "",
         sync: "",
         asNavFor: "",
         itemWidth: 0,
         itemMargin: 0,
         minItems: 0,
         maxItems: 0,
         move: 0,
         start: function () {},
         before: function () {},
         after: function () {},
         end: function () {},
         added: function () {},
         removed: function () {}
     };
     a.fn.flexslider = function (b) {
         void 0 === b && (b = {});
         if ("object" === typeof b) {
             return this.each(function () {
                 var d = a(this),
                     e = d.find(b.selector ? b.selector : ".slides > li");
                 1 === e.length ? (e.fadeIn(400), b.start && b.start(d)) : void 0 === d.data("flexslider") && new a.flexslider(this, b)
             })
         }
         var c = a(this).data("flexslider");
         switch (b) {
         case "play":
             c.play();
             break;
         case "pause":
             c.pause();
             break;
         case "next":
             c.flexAnimate(c.getTarget("next"), !0);
             break;
         case "prev":
         case "previous":
             c.flexAnimate(c.getTarget("prev"), !0);
             break;
         default:
             "number" === typeof b && c.flexAnimate(b, !0)
         }
     }
 })(jQuery);
 (function (a) {
     a.extend(a.fn, {
         validate: function (c) {
             if (this.length) {
                 var d = a.data(this[0], "validator");
                 if (d) {
                     return d
                 }
                 this.attr("novalidate", "novalidate");
                 d = new a.validator(c, this[0]);
                 a.data(this[0], "validator", d);
                 if (d.settings.onsubmit) {
                     c = this.find("input, button");
                     c.filter(".cancel").click(function () {
                         d.cancelSubmit = true
                     });
                     d.settings.submitHandler && c.filter(":submit").click(function () {
                         d.submitButton = this
                     });
                     this.submit(function (b) {
                         function f() {
                             if (d.settings.submitHandler) {
                                 if (d.submitButton) {
                                     var e = a("<input type='hidden'/>").attr("name", d.submitButton.name).val(d.submitButton.value).appendTo(d.currentForm)
                                 }
                                 d.settings.submitHandler.call(d, d.currentForm);
                                 d.submitButton && e.remove();
                                 return false
                             }
                             return true
                         }
                         d.settings.debug && b.preventDefault();
                         if (d.cancelSubmit) {
                             d.cancelSubmit = false;
                             return f()
                         }
                         if (d.form()) {
                             if (d.pendingRequest) {
                                 d.formSubmitted = true;
                                 return false
                             }
                             return f()
                         } else {
                             d.focusInvalid();
                             return false
                         }
                     })
                 }
                 return d
             } else {
                 c && c.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
             }
         },
         valid: function () {
             if (a(this[0]).is("form")) {
                 return this.validate().form()
             } else {
                 var c = true,
                     d = a(this[0].form).validate();
                 this.each(function () {
                     c &= d.element(this)
                 });
                 return c
             }
         },
         removeAttrs: function (c) {
             var e = {},
                 f = this;
             a.each(c.split(/\s/), function (b, d) {
                 e[d] = f.attr(d);
                 f.removeAttr(d)
             });
             return e
         },
         rules: function (c, i) {
             var j = this[0];
             if (c) {
                 var k = a.data(j.form, "validator").settings,
                     l = k.rules,
                     m = a.validator.staticRules(j);
                 switch (c) {
                 case "add":
                     a.extend(m, a.validator.normalizeRule(i));
                     l[j.name] = m;
                     if (i.messages) {
                         k.messages[j.name] = a.extend(k.messages[j.name], i.messages)
                     }
                     break;
                 case "remove":
                     if (!i) {
                         delete l[j.name];
                         return m
                     }
                     var n = {};
                     a.each(i.split(/\s/), function (d, b) {
                         n[b] = m[b];
                         delete m[b]
                     });
                     return n
                 }
             }
             j = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(j), a.validator.classRules(j), a.validator.attributeRules(j), a.validator.staticRules(j)), j);
             if (j.required) {
                 k = j.required;
                 delete j.required;
                 j = a.extend({
                     required: k
                 }, j)
             }
             return j
         }
     });
     a.extend(a.expr[":"], {
         blank: function (b) {
             return !a.trim("" + b.value)
         },
         filled: function (b) {
             return !!a.trim("" + b.value)
         },
         unchecked: function (b) {
             return !b.checked
         }
     });
     a.validator = function (c, d) {
         this.settings = a.extend(true, {}, a.validator.defaults, c);
         this.currentForm = d;
         this.init()
     };
     a.validator.format = function (c, d) {
         if (arguments.length == 1) {
             return function () {
                 var b = a.makeArray(arguments);
                 b.unshift(c);
                 return a.validator.format.apply(this, b)
             }
         }
         if (arguments.length > 2 && d.constructor != Array) {
             d = a.makeArray(arguments).slice(1)
         }
         if (d.constructor != Array) {
             d = [d]
         }
         a.each(d, function (b, f) {
             c = c.replace(RegExp("\\{" + b + "\\}", "g"), f)
         });
         return c
     };
     a.extend(a.validator, {
         defaults: {
             messages: {},
             groups: {},
             rules: {},
             errorClass: "error",
             validClass: "valid",
             errorElement: "label",
             focusInvalid: true,
             errorContainer: a([]),
             errorLabelContainer: a([]),
             onsubmit: true,
             ignore: ":hidden",
             ignoreTitle: false,
             onfocusin: function (b) {
                 this.lastActive = b;
                 if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                     this.settings.unhighlight && this.settings.unhighlight.call(this, b, this.settings.errorClass, this.settings.validClass);
                     this.addWrapper(this.errorsFor(b)).hide()
                 }
             },
             onfocusout: function (b) {
                 if (!this.checkable(b) && (b.name in this.submitted || !this.optional(b))) {
                     this.element(b)
                 }
             },
             onkeyup: function (b) {
                 if (b.name in this.submitted || b == this.lastElement) {
                     this.element(b)
                 }
             },
             onclick: function (b) {
                 if (b.name in this.submitted) {
                     this.element(b)
                 } else {
                     b.parentNode.name in this.submitted && this.element(b.parentNode)
                 }
             },
             highlight: function (c, e, f) {
                 c.type === "radio" ? this.findByName(c.name).addClass(e).removeClass(f) : a(c).addClass(e).removeClass(f)
             },
             unhighlight: function (c, e, f) {
                 c.type === "radio" ? this.findByName(c.name).removeClass(e).addClass(f) : a(c).removeClass(e).addClass(f)
             }
         },
         setDefaults: function (b) {
             a.extend(a.validator.defaults, b)
         },
         messages: {
             required: "This field is required.",
             remote: "Please fix this field.",
             email: "Please enter a valid email address.",
             url: "Please enter a valid URL.",
             date: "Please enter a valid date.",
             dateISO: "Please enter a valid date (ISO).",
             number: "Please enter a valid number.",
             digits: "Please enter only digits.",
             creditcard: "Please enter a valid credit card number.",
             equalTo: "Please enter the same value again.",
             accept: "Please enter a value with a valid extension.",
             maxlength: a.validator.format("Please enter no more than {0} characters."),
             minlength: a.validator.format("Please enter at least {0} characters."),
             rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
             range: a.validator.format("Please enter a value between {0} and {1}."),
             max: a.validator.format("Please enter a value less than or equal to {0}."),
             min: a.validator.format("Please enter a value greater than or equal to {0}.")
         },
         autoCreateRanges: false,
         prototype: {
             init: function () {
                 function c(b) {
                     var d = a.data(this[0].form, "validator"),
                         h = "on" + b.type.replace(/^validate/, "");
                     d.settings[h] && d.settings[h].call(d, this[0], b)
                 }
                 this.labelContainer = a(this.settings.errorLabelContainer);
                 this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                 this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                 this.submitted = {};
                 this.valueCache = {};
                 this.pendingRequest = 0;
                 this.pending = {};
                 this.invalid = {};
                 this.reset();
                 var e = this.groups = {};
                 a.each(this.settings.groups, function (b, d) {
                     a.each(d.split(/\s/), function (i, j) {
                         e[j] = b
                     })
                 });
                 var f = this.settings.rules;
                 a.each(f, function (b, d) {
                     f[b] = a.validator.normalizeRule(d)
                 });
                 a(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", c).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", c);
                 this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
             },
             form: function () {
                 this.checkForm();
                 a.extend(this.submitted, this.errorMap);
                 this.invalid = a.extend({}, this.errorMap);
                 this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]);
                 this.showErrors();
                 return this.valid()
             },
             checkForm: function () {
                 this.prepareForm();
                 for (var c = 0, d = this.currentElements = this.elements(); d[c]; c++) {
                     this.check(d[c])
                 }
                 return this.valid()
             },
             element: function (c) {
                 this.lastElement = c = this.validationTargetFor(this.clean(c));
                 this.prepareElement(c);
                 this.currentElements = a(c);
                 var d = this.check(c);
                 if (d) {
                     delete this.invalid[c.name]
                 } else {
                     this.invalid[c.name] = true
                 } if (!this.numberOfInvalids()) {
                     this.toHide = this.toHide.add(this.containers)
                 }
                 this.showErrors();
                 return d
             },
             showErrors: function (c) {
                 if (c) {
                     a.extend(this.errorMap, c);
                     this.errorList = [];
                     for (var d in c) {
                         this.errorList.push({
                             message: c[d],
                             element: this.findByName(d)[0]
                         })
                     }
                     this.successList = a.grep(this.successList, function (b) {
                         return !(b.name in c)
                     })
                 }
                 this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
             },
             resetForm: function () {
                 a.fn.resetForm && a(this.currentForm).resetForm();
                 this.submitted = {};
                 this.lastElement = null;
                 this.prepareForm();
                 this.hideErrors();
                 this.elements().removeClass(this.settings.errorClass)
             },
             numberOfInvalids: function () {
                 return this.objectLength(this.invalid)
             },
             objectLength: function (c) {
                 var e = 0,
                     f;
                 for (f in c) {
                     e++
                 }
                 return e
             },
             hideErrors: function () {
                 this.addWrapper(this.toHide).hide()
             },
             valid: function () {
                 return this.size() == 0
             },
             size: function () {
                 return this.errorList.length
             },
             focusInvalid: function () {
                 if (this.settings.focusInvalid) {
                     try {
                         a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                     } catch (b) {}
                 }
             },
             findLastActive: function () {
                 var b = this.lastActive;
                 return b && a.grep(this.errorList, function (c) {
                     return c.element.name == b.name
                 }).length == 1 && b
             },
             elements: function () {
                 var c = this,
                     d = {};
                 return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                     !this.name && c.settings.debug && window.console && console.error("%o has no name assigned", this);
                     if (this.name in d || !c.objectLength(a(this).rules())) {
                         return false
                     }
                     return d[this.name] = true
                 })
             },
             clean: function (b) {
                 return a(b)[0]
             },
             errors: function () {
                 return a(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
             },
             reset: function () {
                 this.successList = [];
                 this.errorList = [];
                 this.errorMap = {};
                 this.toShow = a([]);
                 this.toHide = a([]);
                 this.currentElements = a([])
             },
             prepareForm: function () {
                 this.reset();
                 this.toHide = this.errors().add(this.containers)
             },
             prepareElement: function (b) {
                 this.reset();
                 this.toHide = this.errorsFor(b)
             },
             check: function (c) {
                 c = this.validationTargetFor(this.clean(c));
                 var i = a(c).rules(),
                     j = false,
                     k;
                 for (k in i) {
                     var l = {
                         method: k,
                         parameters: i[k]
                     };
                     try {
                         var m = a.validator.methods[k].call(this, c.value.replace(/\r/g, ""), c, l.parameters);
                         if (m == "dependency-mismatch") {
                             j = true
                         } else {
                             j = false;
                             if (m == "pending") {
                                 this.toHide = this.toHide.not(this.errorsFor(c));
                                 return
                             }
                             if (!m) {
                                 this.formatAndAdd(c, l);
                                 return false
                             }
                         }
                     } catch (n) {
                         this.settings.debug && window.console && console.log("exception occured when checking element " + c.id + ", check the '" + l.method + "' method", n);
                         throw n
                     }
                 }
                 if (!j) {
                     this.objectLength(i) && this.successList.push(c);
                     return true
                 }
             },
             customMetaMessage: function (c, e) {
                 if (a.metadata) {
                     var f = this.settings.meta ? a(c).metadata()[this.settings.meta] : a(c).metadata();
                     return f && f.messages && f.messages[e]
                 }
             },
             customMessage: function (c, e) {
                 var f = this.settings.messages[c];
                 return f && (f.constructor == String ? f : f[e])
             },
             findDefined: function () {
                 for (var b = 0; b < arguments.length; b++) {
                     if (arguments[b] !== undefined) {
                         return arguments[b]
                     }
                 }
             },
             defaultMessage: function (c, d) {
                 return this.findDefined(this.customMessage(c.name, d), this.customMetaMessage(c, d), !this.settings.ignoreTitle && c.title || undefined, a.validator.messages[d], "<strong>Warning: No message defined for " + c.name + "</strong>")
             },
             formatAndAdd: function (c, f) {
                 var h = this.defaultMessage(c, f.method),
                     i = /\$?\{(\d+)\}/g;
                 if (typeof h == "function") {
                     h = h.call(this, f.parameters, c)
                 } else {
                     if (i.test(h)) {
                         h = jQuery.format(h.replace(i, "{$1}"), f.parameters)
                     }
                 }
                 this.errorList.push({
                     message: h,
                     element: c
                 });
                 this.errorMap[c.name] = h;
                 this.submitted[c.name] = h
             },
             addWrapper: function (b) {
                 if (this.settings.wrapper) {
                     b = b.add(b.parent(this.settings.wrapper))
                 }
                 return b
             },
             defaultShowErrors: function () {
                 for (var c = 0; this.errorList[c]; c++) {
                     var d = this.errorList[c];
                     this.settings.highlight && this.settings.highlight.call(this, d.element, this.settings.errorClass, this.settings.validClass);
                     this.showLabel(d.element, d.message)
                 }
                 if (this.errorList.length) {
                     this.toShow = this.toShow.add(this.containers)
                 }
                 if (this.settings.success) {
                     for (c = 0; this.successList[c]; c++) {
                         this.showLabel(this.successList[c])
                     }
                 }
                 if (this.settings.unhighlight) {
                     c = 0;
                     for (d = this.validElements(); d[c]; c++) {
                         this.settings.unhighlight.call(this, d[c], this.settings.errorClass, this.settings.validClass)
                     }
                 }
                 this.toHide = this.toHide.not(this.toShow);
                 this.hideErrors();
                 this.addWrapper(this.toShow).show()
             },
             validElements: function () {
                 return this.currentElements.not(this.invalidElements())
             },
             invalidElements: function () {
                 return a(this.errorList).map(function () {
                     return this.element
                 })
             },
             showLabel: function (c, e) {
                 var f = this.errorsFor(c);
                 if (f.length) {
                     f.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                     f.attr("generated") && f.html(e)
                 } else {
                     f = a("<" + this.settings.errorElement + "/>").attr({
                         "for": this.idOrName(c),
                         generated: true
                     }).addClass(this.settings.errorClass).html(e || "");
                     if (this.settings.wrapper) {
                         f = f.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                     }
                     this.labelContainer.append(f).length || (this.settings.errorPlacement ? this.settings.errorPlacement(f, a(c)) : f.insertAfter(c))
                 } if (!e && this.settings.success) {
                     f.text("");
                     typeof this.settings.success == "string" ? f.addClass(this.settings.success) : this.settings.success(f)
                 }
                 this.toShow = this.toShow.add(f)
             },
             errorsFor: function (c) {
                 var d = this.idOrName(c);
                 return this.errors().filter(function () {
                     return a(this).attr("for") == d
                 })
             },
             idOrName: function (b) {
                 return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name)
             },
             validationTargetFor: function (b) {
                 if (this.checkable(b)) {
                     b = this.findByName(b.name).not(this.settings.ignore)[0]
                 }
                 return b
             },
             checkable: function (b) {
                 return /radio|checkbox/i.test(b.type)
             },
             findByName: function (c) {
                 var d = this.currentForm;
                 return a(document.getElementsByName(c)).map(function (b, f) {
                     return f.form == d && f.name == c && f || null
                 })
             },
             getLength: function (c, d) {
                 switch (d.nodeName.toLowerCase()) {
                 case "select":
                     return a("option:selected", d).length;
                 case "input":
                     if (this.checkable(d)) {
                         return this.findByName(d.name).filter(":checked").length
                     }
                 }
                 return c.length
             },
             depend: function (c, d) {
                 return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, d) : true
             },
             dependTypes: {
                 "boolean": function (b) {
                     return b
                 },
                 string: function (c, d) {
                     return !!a(c, d.form).length
                 },
                 "function": function (c, d) {
                     return c(d)
                 }
             },
             optional: function (b) {
                 return !a.validator.methods.required.call(this, a.trim(b.value), b) && "dependency-mismatch"
             },
             startRequest: function (b) {
                 if (!this.pending[b.name]) {
                     this.pendingRequest++;
                     this.pending[b.name] = true
                 }
             },
             stopRequest: function (c, d) {
                 this.pendingRequest--;
                 if (this.pendingRequest < 0) {
                     this.pendingRequest = 0
                 }
                 delete this.pending[c.name];
                 if (d && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                     a(this.currentForm).submit();
                     this.formSubmitted = false
                 } else {
                     if (!d && this.pendingRequest == 0 && this.formSubmitted) {
                         a(this.currentForm).triggerHandler("invalid-form", [this]);
                         this.formSubmitted = false
                     }
                 }
             },
             previousValue: function (b) {
                 return a.data(b, "previousValue") || a.data(b, "previousValue", {
                     old: null,
                     valid: true,
                     message: this.defaultMessage(b, "remote")
                 })
             }
         },
         classRuleSettings: {
             required: {
                 required: true
             },
             email: {
                 email: true
             },
             url: {
                 url: true
             },
             date: {
                 date: true
             },
             dateISO: {
                 dateISO: true
             },
             dateDE: {
                 dateDE: true
             },
             number: {
                 number: true
             },
             numberDE: {
                 numberDE: true
             },
             digits: {
                 digits: true
             },
             creditcard: {
                 creditcard: true
             }
         },
         addClassRules: function (c, d) {
             c.constructor == String ? this.classRuleSettings[c] = d : a.extend(this.classRuleSettings, c)
         },
         classRules: function (c) {
             var d = {};
             (c = a(c).attr("class")) && a.each(c.split(" "), function () {
                 this in a.validator.classRuleSettings && a.extend(d, a.validator.classRuleSettings[this])
             });
             return d
         },
         attributeRules: function (c) {
             var f = {};
             c = a(c);
             for (var h in a.validator.methods) {
                 var i;
                 if (i = h === "required" && typeof a.fn.prop === "function" ? c.prop(h) : c.attr(h)) {
                     f[h] = i
                 } else {
                     if (c[0].getAttribute("type") === h) {
                         f[h] = true
                     }
                 }
             }
             f.maxlength && /-1|2147483647|524288/.test(f.maxlength) && delete f.maxlength;
             return f
         },
         metadataRules: function (c) {
             if (!a.metadata) {
                 return {}
             }
             var d = a.data(c.form, "validator").settings.meta;
             return d ? a(c).metadata()[d] : a(c).metadata()
         },
         staticRules: function (c) {
             var e = {},
                 f = a.data(c.form, "validator");
             if (f.settings.rules) {
                 e = a.validator.normalizeRule(f.settings.rules[c.name]) || {}
             }
             return e
         },
         normalizeRules: function (c, d) {
             a.each(c, function (b, h) {
                 if (h === false) {
                     delete c[b]
                 } else {
                     if (h.param || h.depends) {
                         var i = true;
                         switch (typeof h.depends) {
                         case "string":
                             i = !!a(h.depends, d.form).length;
                             break;
                         case "function":
                             i = h.depends.call(d, d)
                         }
                         if (i) {
                             c[b] = h.param !== undefined ? h.param : true
                         } else {
                             delete c[b]
                         }
                     }
                 }
             });
             a.each(c, function (b, f) {
                 c[b] = a.isFunction(f) ? f(d) : f
             });
             a.each(["minlength", "maxlength", "min", "max"], function () {
                 if (c[this]) {
                     c[this] = Number(c[this])
                 }
             });
             a.each(["rangelength", "range"], function () {
                 if (c[this]) {
                     c[this] = [Number(c[this][0]), Number(c[this][1])]
                 }
             });
             if (a.validator.autoCreateRanges) {
                 if (c.min && c.max) {
                     c.range = [c.min, c.max];
                     delete c.min;
                     delete c.max
                 }
                 if (c.minlength && c.maxlength) {
                     c.rangelength = [c.minlength, c.maxlength];
                     delete c.minlength;
                     delete c.maxlength
                 }
             }
             c.messages && delete c.messages;
             return c
         },
         normalizeRule: function (c) {
             if (typeof c == "string") {
                 var d = {};
                 a.each(c.split(/\s/), function () {
                     d[this] = true
                 });
                 c = d
             }
             return c
         },
         addMethod: function (c, e, f) {
             a.validator.methods[c] = e;
             a.validator.messages[c] = f != undefined ? f : a.validator.messages[c];
             e.length < 3 && a.validator.addClassRules(c, a.validator.normalizeRule(c))
         },
         methods: {
             required: function (c, e, f) {
                 if (!this.depend(f, e)) {
                     return "dependency-mismatch"
                 }
                 switch (e.nodeName.toLowerCase()) {
                 case "select":
                     return (c = a(e).val()) && c.length > 0;
                 case "input":
                     if (this.checkable(e)) {
                         return this.getLength(c, e) > 0
                     }
                 default:
                     return a.trim(c).length > 0
                 }
             },
             remote: function (c, h, i) {
                 if (this.optional(h)) {
                     return "dependency-mismatch"
                 }
                 var j = this.previousValue(h);
                 this.settings.messages[h.name] || (this.settings.messages[h.name] = {});
                 j.originalMessage = this.settings.messages[h.name].remote;
                 this.settings.messages[h.name].remote = j.message;
                 i = typeof i == "string" && {
                     url: i
                 } || i;
                 if (this.pending[h.name]) {
                     return "pending"
                 }
                 if (j.old === c) {
                     return j.valid
                 }
                 j.old = c;
                 var k = this;
                 this.startRequest(h);
                 var l = {};
                 l[h.name] = c;
                 a.ajax(a.extend(true, {
                     url: i,
                     mode: "abort",
                     port: "validate" + h.name,
                     dataType: "json",
                     data: l,
                     success: function (b) {
                         k.settings.messages[h.name].remote = j.originalMessage;
                         var e = b === true;
                         if (e) {
                             var d = k.formSubmitted;
                             k.prepareElement(h);
                             k.formSubmitted = d;
                             k.successList.push(h);
                             k.showErrors()
                         } else {
                             d = {};
                             b = b || k.defaultMessage(h, "remote");
                             d[h.name] = j.message = a.isFunction(b) ? b(c) : b;
                             k.showErrors(d)
                         }
                         j.valid = e;
                         k.stopRequest(h, e)
                     }
                 }, i));
                 return "pending"
             },
             minlength: function (c, e, f) {
                 return this.optional(e) || this.getLength(a.trim(c), e) >= f
             },
             maxlength: function (c, e, f) {
                 return this.optional(e) || this.getLength(a.trim(c), e) <= f
             },
             rangelength: function (c, e, f) {
                 c = this.getLength(a.trim(c), e);
                 return this.optional(e) || c >= f[0] && c <= f[1]
             },
             min: function (c, e, f) {
                 return this.optional(e) || c >= f
             },
             max: function (c, e, f) {
                 return this.optional(e) || c <= f
             },
             range: function (c, e, f) {
                 return this.optional(e) || c >= f[0] && c <= f[1]
             },
             email: function (c, d) {
                 return this.optional(d) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c)
             },
             url: function (c, d) {
                 return this.optional(d) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
             },
             date: function (c, d) {
                 return this.optional(d) || !/Invalid|NaN/.test(new Date(c))
             },
             dateISO: function (c, d) {
                 return this.optional(d) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(c)
             },
             number: function (c, d) {
                 return this.optional(d) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(c)
             },
             digits: function (c, d) {
                 return this.optional(d) || /^\d+$/.test(c)
             },
             creditcard: function (c, h) {
                 if (this.optional(h)) {
                     return "dependency-mismatch"
                 }
                 if (/[^0-9 -]+/.test(c)) {
                     return false
                 }
                 var i = 0,
                     j = 0,
                     k = false;
                 c = c.replace(/\D/g, "");
                 for (var l = c.length - 1; l >= 0; l--) {
                     j = c.charAt(l);
                     j = parseInt(j, 10);
                     if (k) {
                         if ((j *= 2) > 9) {
                             j -= 9
                         }
                     }
                     i += j;
                     k = !k
                 }
                 return i % 10 == 0
             },
             accept: function (c, e, f) {
                 f = typeof f == "string" ? f.replace(/,/g, "|") : "png|jpe?g|gif";
                 return this.optional(e) || c.match(RegExp(".(" + f + ")$", "i"))
             },
             equalTo: function (c, e, f) {
                 f = a(f).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                     a(e).valid()
                 });
                 return c == f.val()
             }
         }
     });
     a.format = a.validator.format
 })(jQuery);
 (function (f) {
     var d = {};
     if (f.ajaxPrefilter) {
         f.ajaxPrefilter(function (a, b, c) {
             b = a.port;
             if (a.mode == "abort") {
                 d[b] && d[b].abort();
                 d[b] = c
             }
         })
     } else {
         var e = f.ajax;
         f.ajax = function (a) {
             var b = ("port" in a ? a : f.ajaxSettings).port;
             if (("mode" in a ? a : f.ajaxSettings).mode == "abort") {
                 d[b] && d[b].abort();
                 return d[b] = e.apply(this, arguments)
             }
             return e.apply(this, arguments)
         }
     }
 })(jQuery);
 (function (a) {
     !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && a.each({
         focus: "focusin",
         blur: "focusout"
     }, function (c, e) {
         function f(b) {
             b = a.event.fix(b);
             b.type = e;
             return a.event.handle.call(this, b)
         }
         a.event.special[e] = {
             setup: function () {
                 this.addEventListener(c, f, true)
             },
             teardown: function () {
                 this.removeEventListener(c, f, true)
             },
             handler: function (b) {
                 arguments[0] = a.event.fix(b);
                 arguments[0].type = e;
                 return a.event.handle.apply(this, arguments)
             }
         }
     });
     a.extend(a.fn, {
         validateDelegate: function (c, e, f) {
             return this.bind(e, function (b) {
                 var d = a(b.target);
                 if (d.is(c)) {
                     return f.apply(d, arguments)
                 }
             })
         }
     })
 })(jQuery);
 (function (o) {
     var r = o.validator,
         p, s = "unobtrusiveValidation";

     function q(d, e, f) {
         d.rules[e] = f;
         if (d.message) {
             d.messages[e] = d.message
         }
     }

     function x(b) {
         return b.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
     }

     function t(b) {
         return b.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
     }

     function v(b) {
         return b.substr(0, b.lastIndexOf(".") + 1)
     }

     function u(c, d) {
         if (c.indexOf("*.") === 0) {
             c = c.replace("*.", d)
         }
         return c
     }

     function A(f, h) {
         var a = o(this).find("[data-valmsg-for='" + t(h[0].name) + "']"),
             i = o.parseJSON(a.attr("data-valmsg-replace")) !== false;
         a.removeClass("field-validation-valid").addClass("field-validation-error");
         f.data("unobtrusiveContainer", a);
         if (i) {
             a.empty();
             f.removeClass("input-validation-error").appendTo(a)
         } else {
             f.hide()
         }
     }

     function z(i, h) {
         var f = o(this).find("[data-valmsg-summary=true]"),
             a = f.find("ul");
         if (a && a.length && h.errorList.length) {
             a.empty();
             f.addClass("validation-summary-errors").removeClass("validation-summary-valid");
             o.each(h.errorList, function () {
                 o("<li />").html(this.message).appendTo(a)
             })
         }
     }

     function y(e) {
         var a = e.data("unobtrusiveContainer"),
             f = o.parseJSON(a.attr("data-valmsg-replace"));
         if (a) {
             a.addClass("field-validation-valid").removeClass("field-validation-error");
             e.removeData("unobtrusiveContainer");
             f && a.empty()
         }
     }

     function B() {
         var a = o(this);
         a.data("validator").resetForm();
         a.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
         a.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
     }

     function w(e) {
         var a = o(e),
             h = a.data(s),
             i = o.proxy(B, e);
         if (!h) {
             h = {
                 options: {
                     errorClass: "input-validation-error",
                     errorElement: "span",
                     errorPlacement: o.proxy(A, e),
                     invalidHandler: o.proxy(z, e),
                     messages: {},
                     rules: {},
                     success: o.proxy(y, e)
                 },
                 attachValidation: function () {
                     a.unbind("reset." + s, i).bind("reset." + s, i).validate(this.options)
                 },
                 validate: function () {
                     a.validate();
                     return a.valid()
                 }
             };
             a.data(s, h)
         }
         return h
     }
     r.unobtrusive = {
         adapters: [],
         parseElement: function (a, n) {
             var j = o(a),
                 l = j.parents("form")[0],
                 i, k, m;
             if (!l) {
                 return
             }
             i = w(l);
             i.options.rules[a.name] = k = {};
             i.options.messages[a.name] = m = {};
             o.each(this.adapters, function () {
                 var b = "data-val-" + this.name,
                     e = j.attr(b),
                     d = {};
                 if (e !== undefined) {
                     b += "-";
                     o.each(this.params, function () {
                         d[this] = j.attr(b + this)
                     });
                     this.adapt({
                         element: a,
                         form: l,
                         message: e,
                         params: d,
                         rules: k,
                         messages: m
                     })
                 }
             });
             o.extend(k, {
                 __dummy__: true
             });
             !n && i.attachValidation()
         },
         parse: function (a) {
             var d = o(a).parents("form").andSelf().add(o(a).find("form")).filter("form");
             o(a).find(":input[data-val=true]").each(function () {
                 r.unobtrusive.parseElement(this, true)
             });
             d.each(function () {
                 var b = w(this);
                 b && b.attachValidation()
             })
         }
     };
     p = r.unobtrusive.adapters;
     p.add = function (f, d, e) {
         if (!e) {
             e = d;
             d = []
         }
         this.push({
             name: f,
             params: d,
             adapt: e
         });
         return this
     };
     p.addBool = function (c, d) {
         return this.add(c, function (a) {
             q(a, d || c, true)
         })
     };
     p.addMinMax = function (j, l, k, c, i, h) {
         return this.add(j, [i || "min", h || "max"], function (a) {
             var m = a.params.min,
                 f = a.params.max;
             if (m && f) {
                 q(a, c, [m, f])
             } else {
                 if (m) {
                     q(a, l, m)
                 } else {
                     f && q(a, k, f)
                 }
             }
         })
     };
     p.addSingleVal = function (c, e, f) {
         return this.add(c, [e || "val"], function (a) {
             q(a, f || c, a.params[e])
         })
     };
     r.addMethod("__dummy__", function () {
         return true
     });
     r.addMethod("regex", function (f, h, i) {
         var e;
         if (this.optional(h)) {
             return true
         }
         e = (new RegExp(i)).exec(f);
         return e && e.index === 0 && e[0].length === f.length
     });
     p.addSingleVal("accept", "exts").addSingleVal("regex", "pattern");
     p.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
     p.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
     p.add("equalto", ["other"], function (a) {
         var h = v(a.element.name),
             k = a.params.other,
             c = u(k, h),
             f = o(a.form).find(":input[name='" + t(c) + "']")[0];
         q(a, "equalTo", f)
     });
     p.add("required", function (b) {
         (b.element.tagName.toUpperCase() !== "INPUT" || b.element.type.toUpperCase() !== "CHECKBOX") && q(b, "required", true)
     });
     p.add("remote", ["url", "type", "additionalfields"], function (a) {
         var c = {
                 url: a.params.url,
                 type: a.params.type || "GET",
                 data: {}
             },
             f = v(a.element.name);
         o.each(x(a.params.additionalfields || a.element.name), function (e, d) {
             var b = u(d, f);
             c.data[b] = function () {
                 return o(a.form).find(":input[name='" + t(b) + "']").val()
             }
         });
         q(a, "remote", c)
     });
     o(function () {
         r.unobtrusive.parse(document)
     })
 })(jQuery);
 (function (a) {
     a.just = {
         ajax: {
             post: function (c) {
                 var d = a.extend({
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     type: "post"
                 }, c);
                 d.data = JSON.stringify(d.data);
                 return a.ajax(d)
             },
             upload: function (c) {
                 var d = a.extend({
                     type: "post",
                     xhr: function () {
                         var e = a.ajaxSettings.xhr();
                         if (e.upload) {
                             e.upload.addEventListener("progress", function (f) {
                                 if (f.lengthComputable) {
                                     c.progress(f)
                                 }
                             }, false)
                         }
                         return e
                     },
                     cache: false,
                     contentType: false,
                     processData: false
                 }, c);
                 return a.ajax(d)
             }
         },
         array: {
             fill: function (e, f) {
                 var d = 0,
                     c = [];
                 while (d < e) {
                     c[d++] = f || 0
                 }
                 return c
             },
             max: function (c) {
                 return Math.max.apply(Math, c)
             },
             min: function (c) {
                 return Math.min.apply(Math, c)
             }
         },
         string: {
             insert: function (d, c, e) {
                 return d.substr(0, c) + e + d.substr(c)
             },
             numeric: function (f, e, c, h) {
                 var d = function (i) {
                     return f.toString().match(i)
                 };
                 return d(/1\d$/) ? h : d(/1$/) ? e : d(/(2|3|4)$/) ? c : h
             },
             capitilize: function (c) {
                 return c.length > 0 ? c.substring(0, 1).toUpperCase() + c.substring(1) : c
             },
             translit: function (f) {
                 var e, d = "g",
                     c = {
                         "а": "a",
                         "б": "b",
                         "в": "v",
                         "г": "g",
                         "д": "d",
                         "е": "e",
                         "ж": "zh",
                         "з": "z",
                         "и": "i",
                         "й": "y",
                         "к": "k",
                         "л": "l",
                         "м": "m",
                         "н": "n",
                         "о": "o",
                         "п": "p",
                         "р": "r",
                         "с": "s",
                         "т": "t",
                         "у": "u",
                         "ф": "f",
                         "х": "h",
                         "ц": "c",
                         "ч": "ch",
                         "ш": "sh",
                         "щ": "sch",
                         "ъ": "",
                         "ы": "i",
                         "ь": "",
                         "э": "e",
                         "ю": "u",
                         "я": "ya"
                     };
                 for (e in c) {
                     f = f.replace(new RegExp(e, d), c[e]).replace(new RegExp(e.toUpperCase(), d), this.capitilize(c[e]))
                 }
                 return f
             },
             stringify: function b(f) {
                 if ("JSON" in window) {
                     return JSON.stringify(f)
                 }
                 var h = typeof (f);
                 if (h != "object" || f === null) {
                     if (h == "string") {
                         f = '"' + f + '"'
                     }
                     return String(f)
                 } else {
                     var e, i, d = [],
                         c = (f && f.constructor == Array);
                     for (e in f) {
                         i = f[e];
                         h = typeof (i);
                         if (f.hasOwnProperty(e)) {
                             if (h == "string") {
                                 i = '"' + i + '"'
                             } else {
                                 if (h == "object" && i !== null) {
                                     i = jQuery.stringify(i)
                                 }
                             }
                             d.push((c ? "" : '"' + e + '":') + String(i))
                         }
                     }
                     return (c ? "[" : "{") + String(d) + (c ? "]" : "}")
                 }
             }
         }
     }
 })(jQuery);
 (function (a) {
     var f = "justgrid",
         c = a.just,
         b = function (m, k, i) {
             var l = k.width + k.gap,
                 h = parseInt((m + k.gap) / l) || 1,
                 j = c.array.fill(h);
             return {
                 coords: a.map(i, function (p) {
                     var q = p.height + k.gap,
                         o = p.colspan || 1,
                         n = 0,
                         s = {
                             left: 0,
                             top: j[0]
                         },
                         u, t, r = function (v) {
                             return c.array.max(j.slice(v, v + o))
                         };
                     if (h > 1) {
                         s.top = r(0);
                         for (t = 1; t < h + 1 - o; t++) {
                             u = r(t);
                             if (s.top > u + k.tolerance) {
                                 n = t;
                                 s = {
                                     left: t * l,
                                     top: u
                                 }
                             }
                         }
                     }
                     u = r(n) + q;
                     for (t = n; t < n + o; t++) {
                         j[t] = u
                     }
                     return s
                 }),
                 height: c.array.max(j)
             }
         },
         e = function (p, v, j) {
             var k = p.$this,
                 w = p.width = k.width(),
                 r = p.options,
                 t = r.speed,
                 s, i = j ? j : k.find(r.selector),
                 h, q = a.map(i, function (x) {
                     h = a(x);
                     if (h.hasClass(r.change)) {
                         h.removeClass(r.change).toggleClass(r.active);
                         s = 1
                     }
                     return {
                         height: h.outerHeight(),
                         colspan: h.hasClass(r.active) ? 2 : 1
                     }
                 }),
                 m = b(w, r, q),
                 o = m.coords,
                 u = new TimelineLite({
                     paused: true
                 }),
                 l = r.animation,
                 n = function (x, z) {
                     var y = x.position();
                     return Math.abs(y.left + y.top - z.left - z.top) < 10
                 };
             u.to(k, t, {
                 css: {
                     height: m.height
                 }
             });
             if (!v) {
                 v = a.isFunction(l) ? l() : l
             }
             switch (v) {
             case "fade":
                 l = function (x, y) {
                     h = a(y);
                     if (n(h, o[x])) {
                         h.css(o[x])
                     } else {
                         u.to(y, t / 2, {
                             css: {
                                 opacity: 0
                             }
                         }, -t).set(y, {
                             css: o[x]
                         }, -t / 2).to(y, t / 2, {
                             css: {
                                 opacity: 1
                             }
                         }, -t / 2)
                     }
                 };
                 break;
             case "move":
                 l = function (x, y) {
                     h = a(y);
                     if (n(h, o[x])) {
                         h.css(o[x])
                     } else {
                         u.to(y, t, {
                             css: o[x]
                         }, -t + r.delay)
                     }
                 };
                 break;
             default:
                 l = function (x, y) {
                     a(y).css(o[x])
                 };
                 break
             }
             i.each(l);
             if (s) {
                 u.call(e, [p])
             }
             u.play()
         },
         d = {
             init: function (h) {
                 return this.each(function () {
                     var i = a(this),
                         k = i.data(f),
                         l, j;
                     if (!k) {
                         h = a.extend({
                             selector: ".item",
                             activate: ".activate",
                             active: "active",
                             change: "change",
                             isActivate: true,
                             onActivate: null,
                             onDeactivate: null,
                             speed: 0.4,
                             delay: 0.1,
                             width: 100,
                             gap: 10,
                             tolerance: 50,
                             animation: "move",
                             start: "instant"
                         }, h);
                         k = {
                             $this: i,
                             options: h
                         };
                         i.data(f, k);
                         a(window).resize(function () {
                             if (k.timer) {
                                 clearTimeout(k.timer)
                             }
                             k.timer = setTimeout(function () {
                                 if (k.width != i.width()) {
                                     e(k)
                                 }
                             }, 100)
                         });
                         i.on("click", ".activate", function (o) {
                             var m = a(this).parents(h.selector),
                                 q = h.active,
                                 r = h.change,
                                 p = a.isFunction(h.isActivate) ? h.isActivate() : h.isActivate,
                                 n = function (t, s) {
                                     if (a.isFunction(t)) {
                                         t(s)
                                     }
                                 };
                             if (p) {
                                 o.preventDefault()
                             }
                             if (p) {
                                 if (!m.addClass(r).hasClass(q)) {
                                     n(h.onActivate, m);
                                     m = m.siblings("." + q).addClass(r)
                                 }
                                 if (m.size()) {
                                     n(h.onDeactivate, m)
                                 }
                                 e(k)
                             }
                         });
                         j = h.start
                     } else {
                         j = k.options.animation
                     }
                     e(k, a.isFunction(j) ? j() : j)
                 })
             },
             force: function (h) {
                 return this.each(function () {
                     var i = a(this),
                         j = i.data(f);
                     if (j) {
                         e(j, null, h)
                     }
                 })
             },
             destroy: function () {
                 return this.each(function () {
                     var h = a(this),
                         i = h.data(f);
                     if (i) {
                         h.removeData(f)
                     }
                 })
             }
         };
     a.fn[f] = function (h) {
         if (d[h]) {
             return d[h].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof h === "object" || !h) {
                 return d.init.apply(this, arguments)
             } else {
                 a.error("Method " + h + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 (function (a) {
     var c = "intervals",
         d = {
             interval: a("<span/>", {
                 "class": "interval",
                 html: a("<select/>", {
                     "class": "time"
                 }).add("<input>", {
                     "class": "amount",
                     type: "text",
                     value: "${value}"
                 })
             })[0].outerHTML
         },
         b = {
             init: function (e) {
                 return this.each(function () {
                     var i = a(this),
                         h = a(),
                         f, m = i.data(c),
                         p = function (r, t, s) {
                             var u = m.timeInterval,
                                 w, v, q = a(),
                                 t = (t / u >> 0) * u || 0;
                             s = s || r.val();
                             for (v = t; v < 1440; v += u) {
                                 w = ((v / 60 >> 0) * 100 + v % 60).toString().replace(/^(.)$/, "000$1").replace(/^(.{2})$/, "00$1").replace(/^(.{3})$/, "0$1").replace(/^(.{2})/, "$1:");
                                 q = q.add("<option>", {
                                     value: v,
                                     text: w
                                 })
                             }
                             r.empty().append(q).val(s);
                             return s
                         },
                         k = function () {
                             var v = m.intervals,
                                 w, t, u = 0,
                                 x, q = a("<a/>", {
                                     "class": "minus " + m.btnClass,
                                     html: m.btnMinus
                                 }),
                                 r = a("<a/>", {
                                     "class": "plus " + m.btnClass,
                                     html: m.btnPlus
                                 }),
                                 s = a("<span/>", {
                                     "class": "buttons " + m.btnGroupClass,
                                     html: q.add(r)
                                 });
                             f = a("<input/>", {
                                 "class": "end",
                                 type: "text",
                                 readonly: "readonly"
                             });
                             i.addClass(c);
                             q.click(n);
                             r.click(j);
                             for (w in v) {
                                 t = a.tmpl(d.interval, v[w]);
                                 x = v[w].minutes;
                                 p(t.find("select"), u, x);
                                 u = x;
                                 h = h.add(t)
                             }
                             i.on("click", ".time", l);
                             i.on("click blur keyup", ".amount", o);
                             f.val(h.first().find(".time").change(function () {
                                 f.val(a(this).find(":selected").text())
                             }).find(":selected").text());
                             i.append(h).append(f).append(s)
                         },
                         l = function (r) {
                             var q = a(this),
                                 s = q.val();
                             q.parent().nextAll(".interval").find(".time").each(function () {
                                 s = p(a(this), s)
                             });
                             o()
                         },
                         o = function () {
                             var q, s = function (t, u) {
                                     return parseInt(t.find(u).val())
                                 },
                                 r = h.map(function (t, u) {
                                     q = a(u);
                                     return {
                                         minutes: s(q, ".time"),
                                         value: s(q, ".amount")
                                     }
                                 });
                             m.intervals = r
                         },
                         j = function () {
                             if (h.size() < 5) {
                                 var s = m.intervals,
                                     t = s.length - 1,
                                     q = a.tmpl(d.interval, s[t]),
                                     r = s[t].minutes;
                                 p(q.find("select"), r);
                                 f.before(q);
                                 h = h.add(q)
                             }
                         },
                         n = function () {
                             if (h.size() > 1) {
                                 var q = h.last();
                                 h = h.not(q.remove());
                                 o()
                             }
                         };
                     if (!m) {
                         m = a.extend({
                             timeInterval: 30,
                             btnClass: "",
                             btnGroupClass: "",
                             btnMinus: "<span>&minus</span>",
                             btnPlus: "<span>&plus</span>"
                         }, e);
                         i.data(c, m);
                         k()
                     }
                 })
             },
             values: function (f, e) {
                 return this.data(c).intervals
             }
         };
     a.fn[c] = function (e) {
         if (b[e]) {
             return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof e === "object" || !e) {
                 return b.init.apply(this, arguments)
             } else {
                 a.error("Method " + e + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 (function (a) {
     var c = "meteor",
         b = {
             init: function (d) {
                 return this.each(function () {
                     var p, h = a(this),
                         q = new TimelineLite(),
                         f = a("<div/>", {
                             "class": "meteor",
                             css: {
                                 opacity: 0
                             }
                         }),
                         m, l = f[0],
                         e, i, n, o, r, s, j, k;
                     a("body").prepend(f);
                     m = f.outerWidth() / 2;
                     p = a.extend({
                         from: h,
                         time: 0.3
                     }, d);
                     e = p.from;
                     i = p.to;
                     r = e.outerWidth() / 2;
                     s = i.outerWidth() / 2;
                     j = e.outerHeight() / 2;
                     k = i.outerHeight() / 2;
                     n = e.offset();
                     o = i.offset();
                     n.left += r - m;
                     n.top += j - m;
                     o.left += s - m;
                     o.top += k - m;
                     q.set(l, {
                         css: {
                             top: n.top,
                             left: n.left
                         }
                     }).to(l, 0.1, {
                         css: {
                             opacity: 1
                         }
                     }).to(l, 0.4, {
                         css: {
                             top: o.top,
                             left: o.left
                         }
                     }, -0.1).to(l, 0.1, {
                         css: {
                             opacity: 0
                         }
                     }).call(function () {
                         f.remove()
                     })
                 })
             }
         };
     a.fn[c] = function (d) {
         if (b[d]) {
             return b[d].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof d === "object" || !d) {
                 return b.init.apply(this, arguments)
             } else {
                 a.error("Method " + d + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 (function (a) {
     var d = "pagination",
         e = {
             page: a("<li/>", {
                 "class": "${classes}",
                 style: "${style}",
                 html: a("<a/>", {
                     "data-page": "${page}",
                     text: "${text}"
                 })
             })
         },
         c = {
             init: function (f) {
                 return this.each(function () {
                     var m, k, h = a(this),
                         j = h.data(d),
                         i = function () {
                             var v = j.settings,
                                 u = v.page,
                                 p = v.count,
                                 w = v.show,
                                 t = Math.max(1, Math.min(u - 2, p - 4)),
                                 s = Math.min(p, Math.max(u + 2, 5)),
                                 q = v.disabled,
                                 n, o = a("<ul/>"),
                                 r;
                             for (r = 1; r <= p; r++) {
                                 e.page.tmpl({
                                     page: r,
                                     text: r,
                                     style: (r !== 1 && r !== p) ? "display:none;" : ""
                                 }).appendTo(o)
                             }
                             if (w + 3 < p) {
                                 n = e.page.tmpl({
                                     classes: q,
                                     text: "…"
                                 });
                                 o.find("li:first").after(n);
                                 o.find("li:last").before(n.clone())
                             }
                             h.html(o).pagination("set", u, true)
                         },
                         l = function () {
                             h.pagination("select", a(this).data("page"))
                         };
                     if (!j) {
                         m = a.extend({
                             active: "active",
                             disabled: "disabled",
                             page: 1,
                             count: 1,
                             show: 1
                         }, f);
                         j = {
                             target: h,
                             settings: m
                         };
                         h.data(d, j);
                         i();
                         h.disableSelection().delegate("li:not(." + m.active + "):not(." + m.disabled + ") a", "click", l)
                     } else {
                         m = j.settings;
                         k = ((!f.active || f.active === m.active) && (!f.disabled || f.disabled === m.disabled) && (f.count === undefined || f.count === m.count));
                         m = a.extend(m, f);
                         if (k) {
                             h.pagination("set", m.page, !!m.show)
                         } else {
                             i()
                         }
                     }
                 })
             },
             set: function (s, o) {
                 var j = this,
                     m = j.data(d),
                     h, u = m.settings,
                     k = u.active,
                     n = "." + u.disabled,
                     t = u.page,
                     l = u.count,
                     v = u.show,
                     x = u.success,
                     r, q, i, f, p = "hide",
                     w = "show";
                 if (l < 2) {
                     j[p]()
                 } else {
                     if (o || (s && s !== t)) {
                         u.page = s;
                         h = j.find("li");
                         h.removeClass(k).filter(":has([data-page=" + s + "])").addClass(k);
                         r = (r = s - v - 2) < 0 ? 0 : r;
                         q = (q = s + v - 1) >= l ? l - 1 : q;
                         h.filter(n + ":first")[r < 1 ? p : w]();
                         h.filter(n + ":last")[q > l - 3 ? p : w]();
                         h = h.slice(1, -1).not(n);
                         i = h.slice(r, q)[w]();
                         h.not(i)[p]();
                         j[w]()
                     }
                 }
                 return this
             },
             select: function (i) {
                 var f = this,
                     h = f.data(d),
                     j = h.settings,
                     k = j.success;
                 if (i) {
                     f.pagination("set", i);
                     if (typeof (k) === "function") {
                         k(i)
                     }
                     return i
                 } else {
                     return j.page
                 }
             }
         };
     for (var b in e) {
         e[b] = a("<div/>").html(e[b])
     }
     a.fn[d] = function (f) {
         if (c[f]) {
             return c[f].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof f === "object" || !f) {
                 return c.init.apply(this, arguments)
             } else {
                 a.error("Method " + f + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 (function (a) {
     var c = "scroller",
         d = function (e) {},
         b = {
             init: function (e) {
                 return this.each(function () {
                     var k, f = a(this),
                         h = f.data(c),
                         i = function () {
                             f.scroller("scroll", "left")
                         },
                         j = function () {
                             f.scroller("scroll", "right")
                         };
                     if (!h) {
                         k = a.extend({}, e);
                         h = {
                             update: function () {
                                 var o = this,
                                     l = o.target.find(".items"),
                                     m = l.find(".item"),
                                     s = o.target.find(".items").width(),
                                     q = m.outerWidth(true),
                                     p = q - m.outerWidth(),
                                     r = parseInt((s + p) / q),
                                     n = m.length - r + 1;
                                 o.left = o.current > 1 ? (o.current - 2) * q : false;
                                 o.right = o.current < n - 1 ? o.current * q : (o.current == n - 1 ? m.length * q - p - s : false);
                                 o.container = l
                             },
                             target: f,
                             settings: k,
                             current: 1
                         };
                         f.data(c, h);
                         f.find(".left,.right").disableSelection();
                         f.find(".left").click(i);
                         f.find(".right").click(j);
                         f.wipetouch({
                             preventDefault: false,
                             wipeLeft: j,
                             wipeRight: i
                         })
                     }
                 })
             },
             scroll: function (h) {
                 var e = this,
                     f = e.data(c);
                 f.update();
                 if (h == "left" && typeof (f.left) == "number") {
                     f.current--;
                     TweenLite.to(f.container[0], 0.5, {
                         scrollLeft: f.left
                     })
                 } else {
                     if (h == "right" && f.right) {
                         f.current++;
                         TweenLite.to(f.container[0], 0.5, {
                             scrollLeft: f.right
                         })
                     }
                 }
                 return e
             }
         };
     a.fn.scroller = function (e) {
         if (b[e]) {
             return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof e === "object" || !e) {
                 return b.init.apply(this, arguments)
             } else {
                 a.error("Method " + e + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 (function (a) {
     var c = "slider",
         b = {
             init: function (d) {
                 return this.each(function () {
                     var k, e = a(this),
                         f = e.data(c),
                         h = function () {
                             if (f.size > 1) {
                                 e.slider("select", f.current > 1 ? f.current - 1 : f.size)
                             }
                         },
                         i = function () {
                             if (f.size > 1) {
                                 e.slider("select", f.current < f.size ? f.current + 1 : 1)
                             }
                         },
                         m = function (n, o) {
                             e.css("border", "10px dotted red")
                         },
                         l = function () {
                             clearTimeout(f.timeout)
                         },
                         j = function () {
                             l();
                             f.timeout = setInterval(i, 10000)
                         };
                     if (!f) {
                         k = a.extend({}, d);
                         f = {
                             target: e,
                             settings: k,
                             size: e.children(".back").size()
                         };
                         e.data(c, f);
                         e.slider("select", 1).find(".navigation,.left,.right").disableSelection();
                         e.find(".navigation a").click(function () {
                             e.slider("select", a(this).data("target"))
                         });
                         e.find(".left").click(h);
                         e.find(".right").click(i);
                         e.wipetouch({
                             preventDefault: false,
                             wipeLeft: i,
                             wipeRight: h
                         });
                         e.hover(l, j);
                         j()
                     }
                 })
             },
             select: function (s) {
                 var n = this,
                     p = n.data(c);
                 if (p.current != s && p.size >= s) {
                     p.current = s;
                     var v = new TimelineLite(),
                         w = 0,
                         x = -0.2,
                         y = 0.4,
                         u = 0.4,
                         t = 0.5,
                         q = 200,
                         o = ".j-" + s,
                         d = n.children(".back"),
                         k = d.filter(o),
                         l = k.find(".fore"),
                         m = k.find(".box .text"),
                         e = d.filter(":not(" + o + "):not(.hidden)"),
                         f = e.find(".fore"),
                         h = e.find(".box .text"),
                         r = function (B, C, G, I) {
                             var z = a(B),
                                 A = C ? 0 : -G,
                                 F = z.data("move"),
                                 E = 0,
                                 J = 0,
                                 D = {
                                     css: {
                                         marginLeft: 0,
                                         marginRight: 0,
                                         marginTop: 0,
                                         marginBottom: 0,
                                         opacity: 1
                                     }
                                 },
                                 H;
                             switch (F) {
                             case "up":
                                 J = -1 * q;
                                 break;
                             case "upleft":
                                 J = -1 * q;
                                 E = -1 * q;
                                 break;
                             case "upright":
                                 J = -1 * q;
                                 E = q;
                                 break;
                             case "down":
                                 J = q;
                                 break;
                             case "downleft":
                                 J = q;
                                 E = -1 * q;
                                 break;
                             case "downright":
                                 J = q;
                                 E = q;
                                 break;
                             case "right":
                                 E = q;
                                 break;
                             default:
                                 E = -1 * q;
                                 break
                             }
                             H = {
                                 css: {
                                     marginLeft: E,
                                     marginRight: -E,
                                     marginTop: J,
                                     marginBottom: -J,
                                     opacity: 0
                                 }
                             };
                             if (I) {
                                 v.fromTo(B, G, H, D, w + A)
                             } else {
                                 v.to(B, G, H, w + A)
                             }
                         },
                         i = n.find(".navigation li"),
                         j = i.filter('li:has(a[data-target="' + s + '"])').addClass("active");
                     i.not(j).removeClass("active");
                     if (h.length) {
                         h.each(function (z) {
                             r(this, !z, y)
                         });
                         w = x
                     }
                     if (f.length) {
                         f.each(function (z) {
                             r(this, !z, u)
                         });
                         w = x
                     }
                     v.call(function () {
                         k.removeClass("hidden")
                     });
                     if (k.length) {
                         k.each(function (z) {
                             v.to(this, t, {
                                 css: {
                                     opacity: 1
                                 }
                             }, w - (z ? t : 0))
                         });
                         w = -t
                     }
                     if (e.length) {
                         e.each(function (z) {
                             v.to(this, t, {
                                 css: {
                                     opacity: 0
                                 }
                             }, w - (z ? t : 0))
                         });
                         w = x
                     }
                     v.call(function () {
                         e.addClass("hidden")
                     });
                     if (l.length) {
                         l.each(function (z) {
                             r(this, !z, u, true)
                         });
                         w = x
                     }
                     if (m.length) {
                         m.each(function (z) {
                             r(this, !z, y, true)
                         })
                     }
                 }
                 return this
             }
         };
     a.fn.slider = function (d) {
         if (b[d]) {
             return b[d].apply(this, Array.prototype.slice.call(arguments, 1))
         } else {
             if (typeof d === "object" || !d) {
                 return b.init.apply(this, arguments)
             } else {
                 a.error("Method " + d + " does not exist on jQuery.loading")
             }
         }
     }
 })(jQuery);
 $.validator.onShowErrors = function (f) {
     var d = ".control-group",
         e = "error",
         h = "success",
         a = $.Enumerable.From(f).Select("$.element").TojQuery(),
         b = a.parents("form"),
         c = a.parents(d).removeClass(h).addClass(e);
     b.find(d + "." + e + ":not(:has(.field-validation-" + e + "))").not(c).removeClass(e).filter(function () {
         return $(this).find("input,textarea").val() != ""
     }).addClass(h)
 };
 $.validator.setDefaults({
     wrapper: "",
     showErrors: function (b, a) {
         this.defaultShowErrors();
         $.validator.onShowErrors(a)
     }
 });
 $("form").delegate(".btn-password", "click", function () {
     var a = $(this),
         b = a.prev("input"),
         d = "icon-eye-",
         f = d + "open",
         e = d + "close",
         i = "type",
         h = "password",
         c = function (m, l, k) {
             b.prop(i, m);
             a.find("i").removeClass(l).addClass(k)
         },
         j = b.prop(i) == h;
     c(j ? "text" : h, j ? e : f, j ? f : e)
 }).delegate("input,textarea", "keyup blur", function (d) {
     var f = "error",
         h = "success",
         c = $(d.delegateTarget).validate(),
         b = $(this),
         a = b.parents(".control-group." + f);
     if (a.length && c.element(b)) {
         a.removeClass(f).addClass(h)
     }
 });
 var ajax = (function (a) {
     var c = function (d) {
             if (d.MessageType) {
                 widgets.message({
                     type: d.MessageType,
                     heading: d.Heading,
                     text: d.Message,
                     timeout: d.Timeout
                 })
             }
         },
         b = function (d) {
             if (d.responseText) {
                 widgets.message({
                     type: "error",
                     heading: "Ошибка!",
                     text: d.responseText
                 })
             }
         };
     a.post = function (e) {
         if (!e.url) {
             if (console && console.log) {
                 console.log("url AJAX запроса не задан.")
             }
             return
         }
         var f = e.success,
             d = e.error;
         e.success = function (h) {
             c(h);
             if ($.isFunction(f)) {
                 f(h)
             }
         };
         e.error = function (h) {
             b(h);
             if ($.isFunction(d)) {
                 d(h)
             }
         };
         e.data = e.data || {};
         return $.just.ajax.post(e)
     };
     return a
 })(ajax || {});
 var device = (function (a) {
     a.width = function () {
         return $(window).width()
     };
     a.small = function () {
         return a.width() <= 480
     };
     a.large = function () {
         return 1200 <= a.width()
     };
     a.phone = function () {
         return a.width() <= 767
     };
     a.handphone = function () {
         return a.width() <= 469
     };
     a.tablet = function () {
         var b = a.width();
         return 768 <= b && b <= 979
     };
     a.desktop = function () {
         return 980 <= a.width()
     };
     return a
 })(device || {});
 var uri = (function (a) {
     var b = function () {
         var c = window.location.hash;
         if (c !== undefined && c !== "") {
             c = c.replace(/^[#\/]+|\/+$/g, "").split("/");
             if (c.length > 0) {
                 return c
             }
         }
         return false
     };
     a.hashset = function (c) {
         window.location.hash = "/" + (c.length ? c.join("/") + "/" : "")
     };
     a.hashget = function (d) {
         var e = $.extend({
                 check: function () {
                     return true
                 },
                 valid: null,
                 error: null
             }, d),
             c = b();
         if (c && e.check(c)) {
             e.valid(c)
         } else {
             e.error(c)
         }
     };
     a.hashchange = function (c) {
         $(window).hashchange(function () {
             a.hashget(c)
         })
     };
     a.image = {
         first: function (c, e, d) {
             return this.number(c, 0, e, d)
         },
         second: function (c, e, d) {
             return this.number(c, c != null && c.length > 1 ? 1 : 0, e, d)
         },
         number: function (e, h, j, f) {
             if (e && e.length > h) {
                 var d = e[h],
                     i = d.Thumbnails,
                     c = function (k) {
                         return (!j || k.Width == j) && (!f || k.Height == f)
                     },
                     h;
                 if (d && d.Link) {
                     if (c(d)) {
                         return d.Link
                     } else {
                         if (i) {
                             for (h = 0; h < i.length; h++) {
                                 if (c(i[h])) {
                                     return i[h].Link
                                 }
                             }
                         }
                     }
                 }
             }
             return uri.local + "assets/img/gray.png"
         }
     };
     a.parseParams = function (e) {
         if (!e) {
             return null
         }
         var h = {},
             f = e.replace(/^\?/, "").split("&"),
             d, c = 0;
         for (; c < f.length; c++) {
             if (!f[c]) {
                 continue
             }
             d = f[c].split("=");
             h[d[0]] = d[1]
         }
         return h
     };
     return a
 })(uri || {});
 var uri = (function (c) {
     var b = {
         base: {},
         mobile: {
             index: "~/mobile/"
         },
         actions: {
             index: "~/actions/",
             get: "~/actions/get/",
             getspecial: "~/actions/getspecial/"
         },
         home: {
             index: "~/"
         },
         source: {
             index: "~/source/"
         },
         restaurants: {
             index: "~/restaurants/",
             get: "~/restaurants/get/",
             restaurant: "~/restaurant/"
         },
         diagnostics: {
             cacheobjects: "~/diagnostics/cacheobjects/",
             removeobject: "~/diagnostics/removeobject/",
             clearcache: "~/diagnostics/clearcache/",
             resetstat: "~/diagnostics/resetstat/",
             cachestat: "~/diagnostics/cachestat/",
             viewstat: "~/diagnostics/viewstat/",
             flushstat: "~/diagnostics/flushstat/"
         },
         about: {
             index: "~/about/",
             contacts: "~/about/contacts/",
             vacancy: "~/about/vacancy/",
             vacancy: "~/about/vacancy/",
             vacancyget: "~/about/vacancy/get/",
             partners: "~/about/partners/",
             franchise: "~/about/franchise/"
         },
         feedback: {
             index: "~/feedback/",
             index: "~/feedback/",
             feedback: "~/feedback/feedback/"
         },
         manage: {
             feedbacktypesset: "~/manage/feedbacktypesset/",
             feedbacktypesdel: "~/manage/feedbacktypesdel/",
             clients: "~/manage/clients/",
             clientsget: "~/manage/clientsget/",
             sms: "~/manage/sms/",
             cache: "~/manage/cache/",
             index: "~/manage/",
             settingsset: "~/manage/settingsset/",
             limits: "~/manage/limits/",
             deliverylimitsget: "~/manage/deliverylimitsget/",
             deliverylimitsset: "~/manage/deliverylimitsset/",
             deletefiles: "~/manage/deletefiles/",
             menu: "~/manage/menu/",
             menuget: "~/manage/menuget/",
             menugetitem: "~/manage/menugetitem/",
             menuset: "~/manage/menuset/",
             menuupload: "~/manage/menuupload/",
             menugetspecial: "~/manage/menugetspecial/",
             menusetspecial: "~/manage/menusetspecial/",
             menusync: "~/manage/menusync/",
             menucategories: "~/manage/menucategories/",
             menucategoriesget: "~/manage/menucategoriesget/",
             menucategoriesset: "~/manage/menucategoriesset/",
             menurecoms: "~/manage/menurecoms/",
             menurecomsget: "~/manage/menurecomsget/",
             menurecomsset: "~/manage/menurecomsset/",
             toppings: "~/manage/toppings/",
             toppingget: "~/manage/toppingget/",
             toppingadd: "~/manage/toppingadd/",
             toppingset: "~/manage/toppingset/",
             toppingdel: "~/manage/toppingdel/",
             toppingupload: "~/manage/toppingupload/",
             slider: "~/manage/slider/",
             slideget: "~/manage/slideget/",
             slideadd: "~/manage/slideadd/",
             slideset: "~/manage/slideset/",
             slidedel: "~/manage/slidedel/",
             slideupload: "~/manage/slideupload/",
             toppingrules: "~/manage/toppingrules/",
             toppingruleget: "~/manage/toppingruleget/",
             toppingruleset: "~/manage/toppingruleset/",
             toppingruledel: "~/manage/toppingruledel/",
             labels: "~/manage/labels/",
             labelget: "~/manage/labelget/",
             labelset: "~/manage/labelset/",
             labeldel: "~/manage/labeldel/",
             happyhours: "~/manage/happyhours/",
             happyhourget: "~/manage/happyhourget/",
             happyhourset: "~/manage/happyhourset/",
             happyhourdel: "~/manage/happyhourdel/",
             happyhourstoggle: "~/manage/happyhourstoggle/",
             news: "~/manage/news/",
             actions: "~/manage/actions/",
             innovations: "~/manage/innovations/",
             blogget: "~/manage/blogget/",
             blogadd: "~/manage/blogadd/",
             blogset: "~/manage/blogset/",
             blogdel: "~/manage/blogdel/",
             blogupload: "~/manage/blogupload/",
             blogbannerupload: "~/manage/blogbannerupload/",
             departments: "~/manage/departments/",
             departmentsget: "~/manage/departmentsget/",
             departmentsadd: "~/manage/departmentsadd/",
             departmentsset: "~/manage/departmentsset/",
             departmentsdel: "~/manage/departmentsdel/",
             departmentsupload: "~/manage/departmentsupload/",
             contents: "~/manage/contents/",
             contentsget: "~/manage/contentsget/",
             contentsset: "~/manage/contentsset/",
             contentsupload: "~/manage/contentsupload/",
             meta: "~/manage/meta/",
             metaget: "~/manage/metaget/",
             metaset: "~/manage/metaset/",
             metadel: "~/manage/metadel/",
             vacancies: "~/manage/vacancies/",
             vacanciesget: "~/manage/vacanciesget/",
             vacanciessettype: "~/manage/vacanciessettype/",
             vacanciesadd: "~/manage/vacanciesadd/",
             vacanciesset: "~/manage/vacanciesset/",
             vacanciesdel: "~/manage/vacanciesdel/",
             vacanciesupload: "~/manage/vacanciesupload/",
             faq: "~/manage/faq/",
             faqget: "~/manage/faqget/",
             faqset: "~/manage/faqset/",
             faqdel: "~/manage/faqdel/",
             feedback: "~/manage/feedback/",
             feedbackget: "~/manage/feedbackget/",
             feedbackset: "~/manage/feedbackset/",
             feedbackdel: "~/manage/feedbackdel/",
             feedbacktypes: "~/manage/feedbacktypes/",
             feedbacktypesget: "~/manage/feedbacktypesget/"
         },
         client: {
             index: "~/client/",
             profileget: "~/client/profileget/",
             profileset: "~/client/profileset/",
             profilesendmessage: "~/client/profilesendmessage/",
             profilechangephone: "~/client/profilechangephone/",
             profilechangepassword: "~/client/profilechangepassword/",
             addressesget: "~/client/addressesget/",
             addressesset: "~/client/addressesset/",
             addressesremove: "~/client/addressesremove/",
             orders: "~/client/orders/",
             ordersget: "~/client/ordersget/",
             orderinfoget: "~/client/orderinfoget/",
             cartget: "~/client/cart/get/",
             cartadd: "~/client/cart/add/",
             cartreplace: "~/client/cart/replace/",
             cartclear: "~/client/cart/clear/",
             cartremove: "~/client/cart/remove/",
             cartchanged: "~/client/cart/changed/",
             order: "~/client/order/",
             order: "~/client/order/",
             ordered: "~/client/ordered/",
             recall: "~/client/recall/",
             feedback: "~/client/feedback/",
             log: "~/client/log/",
             friends: "~/client/friends/"
         },
         terms: {
             index: "~/terms/",
             delivery: "~/terms/delivery/"
         },
         news: {
             index: "~/news/",
             get: "~/news/get/",
             getspecial: "~/news/getspecial/"
         },
         menu: {
             index: "~/menu/",
             index: "~/menu/",
             get: "~/menu/get/",
             getspecial: "~/menu/getspecial/"
         },
         ship: {
             index: "~/ship/"
         },
         account: {
             login: "~/account/login/",
             login: "~/account/login/",
             loginmodal: "~/account/loginmodal/",
             authfb: "~/account/authfb/",
             loginfb: "~/account/loginfb/",
             authvk: "~/account/authvk/",
             loginvk: "~/account/loginvk/",
             logout: "~/account/logout/",
             register: "~/account/register/",
             register: "~/account/register/",
             registercheckfail: "~/account/registercheckfail/",
             registerverify: "~/account/registerverify/",
             captcha: "~/account/captcha/",
             getuserinfo: "~/account/getuserinfo/"
         },
         extra: {
             index: "~/extra/",
             pie: "~/extra/pie/",
             robots: "~/extra/robots/",
             sitemap: "~/extra/sitemap/",
             xmlsitemap: "~/extra/xmlsitemap/"
         },
         innovations: {
             index: "~/innovations/",
             get: "~/innovations/get/"
         },
         dictionary: {
             index: "~/dictionary/",
             metro: "~/dictionary/metro/",
             street: "~/dictionary/street/",
             cities: "~/dictionary/cities/",
             departments: "~/dictionary/departments/"
         },
         franchise: {
             index: "~/franchise/"
         }
     };
     for (var d in b) {
         for (var a in b[d]) {
             b[d][a] = b[d][a].replace("~/", uri.local)
         }
     }
     c.actions = b;
     return c
 })(uri || {});
 var widgets = (function (a) {
     var b = "mobile";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var f = $(this),
                     j = f.data(b),
                     h = $(window),
                     d = $("html"),
                     c = $("body"),
                     e = $(".navbar-mobile .navbar-inner"),
                     m = function () {
                         d.toggleClass("slide")
                     },
                     n = function (q) {
                         var o = $(q.target),
                             p = o.add(o.parents());
                         if (d.hasClass("slide") && !p.hasClass("mobile-slide") && !p.hasClass("navbar-mobile")) {
                             d.removeClass("slide")
                         }
                     },
                     k = function () {
                         if (d.hasClass("slide")) {
                             if (j.timer) {
                                 clearTimeout(j.timer)
                             }
                             j.timer = setTimeout(function () {
                                 var q = h.scrollTop(),
                                     o = e.outerHeight() - h.height(),
                                     p = new TimelineLite();
                                 if (o - q < 0) {
                                     p.to(c, 0.25, {
                                         scrollTop: o
                                     })
                                 }
                             }, 50)
                         }
                     },
                     i = function () {
                         if (h.scrollTop() > 50) {
                             f.addClass("fixed")
                         } else {
                             f.removeClass("fixed")
                         }
                     },
                     l = function () {
                         TweenLite.to(c, 0.5, {
                             scrollTop: 0
                         })
                     };
                 if (!j) {
                     j = {};
                     f.data(b, j);
                     if (f.hasClass("mobile-slide")) {
                         f.click(m);
                         d.click(n);
                         h.scroll(k)
                     } else {
                         if (f.hasClass("ribbon")) {
                             h.scroll(i)
                         } else {
                             if (f.hasClass("up")) {
                                 f.click(l)
                             }
                         }
                     }
                 }
             })
         }
     };
     $(function () {
         a[b].init()
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "autotype";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var c = $(this),
                     d = c.data(b);
                 if (!d) {
                     d = {
                         cache: {},
                         depend: c.data("depend"),
                         source: c.data("source"),
                         min: parseInt(c.data("min")) || 1
                     };
                     c.data(b, d);
                     c.autocomplete({
                         source: function (h, i) {
                             var f = $(d.depend).val(),
                                 j = h.term,
                                 e = d.cache[f];
                             h.id = f;
                             if (!e) {
                                 e = d.cache[f] = {}
                             }
                             if (e[j]) {
                                 i(e[j])
                             } else {
                                 $.ajax({
                                     url: d.source,
                                     dataType: "json",
                                     type: "post",
                                     data: h,
                                     success: function (k) {
                                         e[j] = $.map(k, function (l) {
                                             return {
                                                 id: l.Id,
                                                 label: l.Label,
                                                 value: l.Value
                                             }
                                         });
                                         i(e[j])
                                     }
                                 })
                             }
                         },
                         minLength: d.min,
                         open: function (h) {
                             var f = $(h.target);
                             $("ul.ui-autocomplete").addClass("typeahead dropdown-menu").css({
                                 left: f.offset().left,
                                 width: f.outerWidth()
                             })
                         },
                         select: function (f, h) {
                             $(f.target).data(b).value = h.item.id
                         }
                     })
                 }
             })
         }
     };
     $(function () {
         a[b].init()
     });
     $("." + b).live("create", function () {
         a[b].init()
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "message";
     a[b] = function (k) {
         var l = $.extend({
                 type: "warning",
                 heading: "",
                 text: "",
                 closeText: "Закрыть",
                 timeout: 0
             }, k),
             f = "alert alert-" + l.type,
             h = "btn btn-" + l.type,
             d = $("<a/>", {
                 "class": "close",
                 href: "#",
                 text: "×"
             }),
             e = $("body > .messages"),
             c, j, i;
         d.click(function (m) {
             m.preventDefault()
         });
         if (e.size() == 0) {
             e = $("<div/>", {
                 "class": "messages"
             }).appendTo("body")
         }
         if (l.type == "error") {
             h += " btn-danger"
         }
         if (l.heading != "") {
             d = d.add("<h4/>", {
                 "class": "alert-heading",
                 text: l.heading
             })
         }
         d = d.add("<p/>", {
             html: "<div>" + l.text + "</div>"
         });
         if (l.closeText) {
             d = d.add("<a/>", {
                 "class": h,
                 text: l.closeText
             })
         }
         d = $("<div/>", {
             "class": "message",
             css: {
                 display: "none"
             },
             html: c = $("<div/>", {
                 "class": f,
                 html: $("<div/>", {
                     "class": "container",
                     html: $("<div/>", {
                         "class": "box",
                         html: d
                     })
                 })
             })
         }).appendTo(e);
         j = d.height();
         TweenLite.fromTo(d, 0.25, {
             css: {
                 height: 0
             }
         }, {
             css: {
                 height: j
             }
         });
         TweenLite.fromTo(c, 0.25, {
             css: {
                 top: -j
             }
         }, {
             css: {
                 top: 0
             }
         });
         TweenLite.set(d, {
             css: {
                 display: "block"
             }
         });
         i = function () {
             clearTimeout(d.data("timer"));
             TweenLite.fromTo(d, 0.25, {
                 css: {
                     height: j
                 }
             }, {
                 css: {
                     height: 0
                 }
             });
             TweenLite.fromTo(c, 0.25, {
                 css: {
                     top: 0
                 }
             }, {
                 css: {
                     top: -j
                 }
             });
             TweenLite.delayedCall(0.25, function () {
                 d.remove()
             })
         };
         d.find(".btn, .close").click(i);
         if (l.timeout > 0) {
             d.data("timer", setTimeout(i, l.timeout))
         }
     };
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "numeric";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var f = $(this),
                     j = f.data(b);
                 if (!j) {
                     j = {
                         min: parseInt(f.data("min")) || 0,
                         max: parseInt(f.data("max")) || 999,
                         params: f.data("params")
                     };
                     j.value = parseInt(f.data("value")) || j.min;
                     var i = function (k, l) {
                             k.val(l);
                             j.value = l;
                             if (typeof (f.data().change) == "function") {
                                 f.data().change(l, j.params)
                             }
                         },
                         e = $("<input/>", {
                             "class": "span1 value",
                             type: "number",
                             min: j.min,
                             max: j.max,
                             step: "1",
                             value: j.value,
                             pattern: "[0-9]*"
                         }).bind("keyup blur", function () {
                             var k = this.value;
                             k = parseInt(k.replace(/[^\d]+/g, ""));
                             if (!(k > j.min - 1)) {
                                 k = j.min
                             } else {
                                 if (k > j.max) {
                                     k = j.max
                                 }
                             }
                             i($(this), k)
                         }),
                         h = function () {
                             var l = parseInt(e.val()),
                                 k = $(this);
                             if (isNaN(l)) {
                                 l = j.min
                             } else {
                                 if (k.hasClass("minus") && l > j.min) {
                                     l--
                                 } else {
                                     if (k.hasClass("plus") && l < j.max) {
                                         l++
                                     }
                                 }
                             }
                             i(e, l)
                         },
                         c = $("<a/>", {
                             "class": "btn minus",
                             html: '<i class="icon-minus"></i>'
                         }).click(h).disableSelection(),
                         d = $("<a/>", {
                             "class": "btn plus",
                             html: '<i class="icon-plus"></i>'
                         }).click(h).disableSelection();
                     f.addClass("input-prepend input-append btn-group").append(c).append(e).append(d).data(b, j)
                 }
             })
         },
         value: function (c) {
             return c.data(b).value
         }
     };
     a[b].init();
     $("." + b).live("create", function () {
         a[b].init()
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "cartbutton";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var c = $(this),
                     d = c.data(b),
                     e = c.data("id"),
                     f = c.data("price");
                 if (!d) {
                     d = {};
                     c.addClass("btn-toolbar").html($("<div/>", {
                         "class": "numeric",
                         "data-min": 1
                     }).add("<div/>", {
                         "class": "btn-group pull-right",
                         html: $("<a/>", {
                             "class": "cart-add btn btn-danger",
                             "data-id": e,
                             "data-price": f,
                             html: '<i class="icon-shopping-cart icon-white"></i>'
                         }).disableSelection()
                     }));
                     c.data(b, d)
                 }
             })
         }
     };
     a[b].init();
     $(".cartbutton .cart-add").live("click", function (f) {
         var c = $(this),
             d = widgets.numeric.value(c.parent().prev());
         widgets.cart.add([{
             Key: c.data("id"),
             Value: d,
             Price: c.data("price")
         }]);
         if (device.desktop()) {
             c.meteor({
                 to: $(".cart.lite")
             })
         }
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "recall";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var k = $(this),
                     m = k.data(b),
                     l = k.find(".toggle,.cancel"),
                     h = k.find(".panel-1"),
                     i = k.find(".panel-2"),
                     c = i.find("form"),
                     d = c.find("[name=FIO]"),
                     e = c.find("[name=Phone]"),
                     f = c.find("[name=Time]"),
                     j = c.find(".btn.submit"),
                     n = function () {
                         if (c.valid()) {
                             ajax.post({
                                 url: uri.actions.client.recall,
                                 data: {
                                     FIO: d.val(),
                                     Phone: e.val(),
                                     Time: f.val()
                                 },
                                 success: function () {
                                     if (m.active) {
                                         o()
                                     }
                                 }
                             })
                         } else {
                             widgets.message({
                                 type: "error",
                                 text: "При заполнении допущены ошибки!",
                                 timeout: 5000
                             })
                         }
                     },
                     o = function () {
                         var s = new TimelineLite(),
                             r = 0.3,
                             p = h.outerHeight(true),
                             q = i.outerHeight(true),
                             t = h.width();
                         widthPanel2 = i.width();
                         if (m.active) {
                             m.active = 0;
                             s.set(k, {
                                 css: {
                                     height: q
                                 }
                             }).set(i, {
                                 css: {
                                     position: "absolute",
                                     width: widthPanel2
                                 }
                             }).set(h, {
                                 css: {
                                     display: "block"
                                 }
                             }).to(k, r, {
                                 css: {
                                     height: p
                                 }
                             }).to(i, r, {
                                 css: {
                                     top: -q
                                 }
                             }, -r).set(i, {
                                 css: {
                                     display: "none",
                                     width: "auto"
                                 }
                             }).set(k, {
                                 css: {
                                     height: "auto"
                                 }
                             })
                         } else {
                             m.active = 1;
                             s.set(k, {
                                 css: {
                                     height: p
                                 }
                             }).set(i, {
                                 css: {
                                     display: "block",
                                     position: "absolute",
                                     top: -q,
                                     width: t - 30
                                 }
                             }).to(k, r, {
                                 css: {
                                     height: q
                                 }
                             }).to(i, r, {
                                 css: {
                                     top: 0
                                 }
                             }, -r).set(i, {
                                 css: {
                                     position: "static",
                                     width: "auto"
                                 }
                             }).set(h, {
                                 css: {
                                     display: "none"
                                 }
                             }).set(k, {
                                 css: {
                                     height: "auto"
                                 }
                             })
                         }
                     };
                 if (!m) {
                     m = {};
                     l.click(o).add(j).disableSelection();
                     j.click(n);
                     k.data(b, m)
                 }
             })
         },
         value: function (c) {
             return c.data(b).value
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (b) {
     var f = "account",
         d = $("meta[name=auth]").size(),
         c = ".account",
         e = uri.actions.home.index,
         a = $(document);
     b[f] = {
         init: function () {
             b[f].elements = $("." + f);
             return b[f].elements.each(function () {
                 var s = $(this),
                     t = s.data(f),
                     m = s.find(".form-register"),
                     o = m.find('[name="Name"]'),
                     r = m.find('[name="Phone"]'),
                     j = m.find('[name="CaptchaText"]'),
                     l = m.find(".captcha img"),
                     p = m.find('[name="Password"]'),
                     i = m.find(".buttons-box"),
                     k = m.find(".captcha-box"),
                     q = m.find(".password-box"),
                     n = s.find(".form-login"),
                     h = n.find("[data-account=login]"),
                     v = function (H) {
                         return m.validate().element(H)
                     },
                     D = function () {
                         if (v(o) && v(r)) {
                             ajax.post({
                                 data: {
                                     Name: o.val(),
                                     Phone: r.val()
                                 },
                                 url: uri.actions.account.register,
                                 success: E
                             })
                         }
                     },
                     E = function (H) {
                         if (H.Success) {
                             i.hide("blind");
                             x()
                         }
                     },
                     x = function () {
                         if (v(r)) {
                             ajax.post({
                                 data: {
                                     Phone: r.val()
                                 },
                                 url: uri.actions.account.registercheckfail,
                                 success: C
                             })
                         }
                     },
                     C = function (I) {
                         if (I.Success) {
                             var H = I.Data;
                             if (i.filter(":visible")) {
                                 i.hide("blind")
                             }
                             r.prop("readonly", 1);
                             if (H) {
                                 t.captcha = H;
                                 l.prop("src", uri.actions.account.captcha + H + "/");
                                 if (k.filter(":hidden")) {
                                     k.show("blind")
                                 }
                             } else {
                                 t.captcha = null
                             } if (q.filter(":hidden")) {
                                 q.show("blind")
                             }
                         }
                     },
                     G = function () {
                         if (v(r) && v(p)) {
                             ajax.post({
                                 data: {
                                     Phone: r.val(),
                                     CaptchaId: t.captcha,
                                     CaptchaText: j.val(),
                                     Password: p.val()
                                 },
                                 url: uri.actions.account.registerverify,
                                 success: F
                             })
                         }
                     },
                     F = function (H) {
                         if (!H.Success) {
                             H.Success = 1;
                             C(H)
                         } else {
                             b[f].set(H.Data);
                             i.show();
                             r.prop("readonly", 0);
                             k.hide();
                             q.hide()
                         }
                     },
                     y = function () {
                         if (n.valid()) {
                             var H = {};
                             $.each(n.serializeArray(), function (I, J) {
                                 H[J.name] = J.value
                             });
                             H.RememberMe = n.find("[name=RememberMe]").prop("checked");
                             ajax.post({
                                 data: H,
                                 url: uri.actions.account.loginmodal,
                                 success: z
                             })
                         }
                     },
                     z = function (H) {
                         if (H.Success) {
                             b[f].set(H.Data)
                         } else {
                             b[f].set()
                         }
                     },
                     A = function (H) {
                         H.preventDefault();
                         ajax.post({
                             url: uri.actions.account.logout,
                             success: B
                         })
                     },
                     B = function () {
                         b[f].set()
                     },
                     w = function () {
                         ajax.post({
                             url: uri.actions.account.getuserinfo,
                             success: function (H) {
                                 b[f].set(H)
                             }
                         })
                     },
                     u = function (H) {
                         if ((H.keyCode || H.which) == 13) {
                             $(this).blur();
                             H.data();
                             return false
                         }
                     };
                 if (!t) {
                     t = {
                         auth: d,
                         info: d ? $.parseJSON($.cookie(c)) : null
                     };
                     s.data(f, t);
                     if (!t.auth && t.info) {
                         b[f].set()
                     }
                     if (t.auth && !t.info) {
                         w()
                     } else {
                         b[f].show()
                     }
                     $("[data-account=logout]").click(A);
                     n.find("[name]").keypress(y, u);
                     h.click(y);
                     m.find("[data-account=send]").click(D);
                     m.find("[data-account=pass]").click(x);
                     m.find("[data-account=verify]").click(G);
                     r.add(o).keypress(D, u);
                     j.add(p).keypress(G, u)
                 }
             })
         },
         show: function (l) {
             if (!l && this.elements) {
                 var i = this.elements,
                     k = i.data(f).info,
                     j = i.find("[data-content=name]"),
                     h = i.find("[data-content=avatar]");
                 if (!k) {
                     l = "login";
                     j.text("");
                     h.prop("src", "").hide()
                 } else {
                     if (k.Roles & 1) {
                         l = "admin"
                     } else {
                         l = "customer";
                         j.text(k.Name);
                         if (k.Avatar) {
                             h.prop("src", k.Avatar).show()
                         }
                     }
                 }
             }
             $("<a>", {
                 "data-target": "." + f + " .tab." + l
             }).tab("show")
         },
         set: function (i) {
             var h = this.elements.data(f);
             if (i) {
                 $.cookie(c, $.just.string.stringify(i), {
                     path: e
                 })
             } else {
                 $.removeCookie(c, {
                     path: e
                 });
                 if ($("meta[name=auth]").size()) {
                     document.location.href = uri.actions.home.index
                 }
             } if (h) {
                 h.info = i;
                 h.auth = !!i
             }
             this.show()
         },
         auth: function () {
             var h = this.elements.data(f);
             return h ? h.auth : false
         },
         info: function () {
             var h = this.elements.data(f);
             return h ? h.info : {}
         },
         social: function (i) {
             widgets.message({
                 type: i.MessageType,
                 heading: i.Heading,
                 text: i.Message,
                 timeout: i.Timeout
             });
             if (i.Success) {
                 var h = this.elements.data(f);
                 this.set(i.Data);
                 if (location.pathname == uri.actions.account.login) {
                     location.reload()
                 } else {}
             } else {}
         }
     };
     b[f].init();
     return b
 }(widgets || {}));
 var manage = (function (a) {
     var b = "addresses";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var t = $(this),
                     x = t.data(b),
                     u = t.find(".toolbar"),
                     c = t.find(".items"),
                     d = t.find(".modal"),
                     l = d.find("form"),
                     f = l.find("[name=CityName]"),
                     n = l.find("[name=MetroName]"),
                     s = l.find("[name=StreetName]"),
                     m = l.find("[name=House]"),
                     h = l.find("[name=Corpus]"),
                     e = l.find("[name=Building]"),
                     j = l.find("[name=Flat]"),
                     p = l.find("[name=Porch]"),
                     k = l.find("[name=Floor]"),
                     i = l.find("[name=DoorCode]"),
                     r = l.find("[name=Room]"),
                     o = l.find("[name=Office]"),
                     q = l.find("[name=Remark]"),
                     v = "active",
                     z = function () {
                         A();
                         u.find(".add").click(w);
                         u.find(".edit").click(y);
                         u.find(".remove").click(E);
                         c.delegate("tr:not(." + v + ")", "click", G);
                         d.find(".save").click(F);
                         d.find(".cancel").click(D)
                     },
                     H = function () {
                         c.find("tr").removeClass(v)
                     },
                     G = function (J) {
                         if (!d.hasClass(v)) {
                             var I = $(this),
                                 K = I.data("id");
                             x.current = K;
                             H();
                             I.addClass(v)
                         }
                     },
                     A = function () {
                         ajax.post({
                             url: uri.actions.client.addressesget,
                             success: function (I) {
                                 B(I)
                             }
                         })
                     },
                     B = function (K) {
                         x.list = K;
                         var J = $.Enumerable.From(x.list.Addresses),
                             I = J.Select(function (L) {
                                 return $("<tr/>", {
                                     "class": x.current == L.Id ? v : "",
                                     "data-id": L.Id,
                                     html: $("<td/>", {
                                         html: $("<h4/>", {
                                             "class": "title",
                                             text: L.Title
                                         }).add("<div/>", {
                                             "class": "text",
                                             html: L.Text
                                         })
                                     })
                                 })[0]
                             }).TojQuery();
                         c.html(I)
                     },
                     w = function () {
                         x.current = 0;
                         H();
                         C()
                     },
                     y = function () {
                         if (c.find("." + v).length) {
                             C()
                         }
                     },
                     C = function () {
                         var I = $.Enumerable.From(x.list ? x.list.Addresses : []).Where("$.Id==" + x.current);
                         I = I.Count() ? I.Single() : {
                             Id: x.current
                         };
                         l.validate().resetForm();
                         if (I.City) {
                             f.val(I.City.Id)
                         }
                         n.val(I.MetroName);
                         s.val(I.StreetName);
                         m.val(I.House);
                         h.val(I.Corpus);
                         e.val(I.Building);
                         j.val(I.Flat);
                         p.val(I.Porch);
                         k.val(I.Floor);
                         i.val(I.DoorCode);
                         r.val(I.Room);
                         o.val(I.Office);
                         q.val(I.Remark);
                         d.addClass(v)
                     },
                     D = function () {
                         d.removeClass(v)
                     },
                     F = function () {
                         var I = {
                                 Id: x.current,
                                 CityId: f.val()
                             },
                             J = l.serializeArray();
                         $.Enumerable.From(J).ForEach(function (K) {
                             var L = K.name,
                                 M = K.value;
                             if (!I[L]) {
                                 I[L] = M
                             }
                         });
                         if (l.valid()) {
                             ajax.post({
                                 data: {
                                     Address: I
                                 },
                                 url: uri.actions.client.addressesset,
                                 success: function (K) {
                                     d.removeClass(v);
                                     A()
                                 }
                             })
                         }
                     },
                     E = function () {
                         if (x.current > 0) {
                             ajax.post({
                                 data: {
                                     id: x.current
                                 },
                                 url: uri.actions.client.addressesremove,
                                 success: function () {
                                     A()
                                 }
                             })
                         }
                     };
                 if (!x) {
                     x = {};
                     z();
                     t.data(b, x)
                 }
             })
         }
     };
     a[b].init();
     return a
 }(manage || {}));
 var widgets = (function (b) {
     var d = "blog",
         a = "active",
         c = {
             items: $("<div/>", {
                 "class": "items " + a,
                 html: $("<div/>", {
                     "class": "item next",
                     css: {
                         display: "none"
                     },
                     html: $("<i/>", {
                         "class": "icon-aws-plus-sign"
                     })
                 })
             })[0].outerHTML,
             blog: $("<div/>", {
                 "class": "item",
                 html: $("<div/>", {
                     "class": "content",
                     html: $("<a/>", {
                         "class": "image",
                         href: "${link}",
                         title: "${Title}"
                     }).add("<div/>", {
                         "class": "text",
                         html: $("<h3/>", {
                             "class": "title",
                             html: $("<a/>", {
                                 href: "${link}",
                                 text: "${Title}"
                             })
                         }).add("<hr/>").add("<p/>", {
                             text: "${Announce}"
                         }).add("<p/>", {
                             "class": "links",
                             html: $("<a/>", {
                                 href: "${link}",
                                 html: $("<i/>", {
                                     "class": "icon-eye-open"
                                 }).add("<span/>", {
                                     text: "читать"
                                 })
                             })
                         })
                     })
                 })
             })[0].outerHTML
         };
     b[d] = {
         init: function () {
             b[d].elements = $("." + d);
             return b[d].elements.each(function () {
                 var h = $(this),
                     l = h.data(d),
                     f = $("." + d + "-nav"),
                     e = h.find(".box"),
                     m = function (p, q) {
                         var o = {
                             Page: p || 1,
                             PageSize: 50,
                             Year: l.year,
                             Type: l.type
                         };
                         if (o.IsNews) {
                             o = $.extend(o, {
                                 Year: l.year
                             })
                         } else {
                             o = $.extend(o, {
                                 Active: l.year
                             })
                         }
                         ajax.post({
                             data: o,
                             url: uri.actions[l.type].get,
                             success: i
                         })
                     },
                     i = function (t) {
                         var p = e.find(".items:first"),
                             o = p.find(".next"),
                             q = e.find(".items").not(p),
                             v = new TimelineLite(),
                             s = l.shift == 0,
                             r = t.Page < t.PageCount,
                             u = 0.3;
                         l.list = t;
                         o.hide();
                         if (s) {
                             e.height(p.outerHeight(true))
                         }
                         j(t.Page == 1);
                         if (!s) {
                             v.set(p, {
                                 css: {
                                     width: q.width()
                                 }
                             }).to(e, 0.3, {
                                 css: {
                                     height: p.outerHeight(true)
                                 }
                             }).to(q, u, {
                                 css: {
                                     left: -l.shift
                                 }
                             }).to(p, u, {
                                 css: {
                                     left: 0
                                 }
                             }, -u).set(p, {
                                 css: {
                                     width: "auto"
                                 }
                             }).call(function () {
                                 q.remove();
                                 p.removeClass(a);
                                 l.shift = 0
                             })
                         }
                         v.call(function () {
                             if (r) {
                                 o.removeClass(a).show()
                             }
                         }).to(e, 0.5, {
                             css: {
                                 height: p.outerHeight(true)
                             },
                             ease: Power1.easeInOut
                         }).set(e, {
                             css: {
                                 height: "auto"
                             }
                         }, 0.1)
                     },
                     j = function (o) {
                         $.Enumerable.From(l.list.Blogs).ForEach(function (t, s) {
                             var q = 230,
                                 v = q,
                                 r = q,
                                 u;
                             t.DepartmensHash = t.Departments.length ? "#/" + $.Enumerable.From(t.Departments).Select("$.Id").ToArray().join("/") + "/" : null;
                             t.link = uri.actions.home.index + t.Link;
                             var p = $.tmpl(c.blog, t);
                             p.find("a[href]").prop("href", t.link);
                             u = uri.image.second(t.Images, 120, 120);
                             if (u.indexOf("assets/img/gray.png") >= 0) {
                                 u = uri.image.second(t.Images, 230, 230)
                             }
                             p.find(".image").css("background", 'url("' + u + '")');
                             if (t.DepartmensHash) {
                                 p.find(".links").append($("<a/>", {
                                     href: t.DepartmensHash,
                                     html: $("<i/>", {
                                         "class": "icon-globe"
                                     }).add("<span/>", {
                                         text: "на карте"
                                     })
                                 }))
                             }
                             e.find(".items:first .next").before(p)
                         })
                     },
                     k = function () {
                         var p = $(this).data("year"),
                             o = (l.year > p ? 1 : -1) * (e.width() + 10);
                         if (l.year != p) {
                             f.find("li").removeClass(a).end().find("li[data-year=" + p + "]").addClass(a);
                             l.shift = o;
                             l.year = p;
                             e.prepend($(c.items).css({
                                 left: o
                             })).ready(function () {
                                 m()
                             })
                         }
                     },
                     n = function () {
                         var o = $(this);
                         if (!o.hasClass(a)) {
                             o.addClass(a);
                             m(l.list.Page + 1)
                         }
                     };
                 if (!l) {
                     l = {
                         type: h.data("type"),
                         shift: 0
                     };
                     f.find("li").click(k);
                     l.year = f.find("li:first").addClass(a).data("year");
                     h.delegate(".next", "click", n);
                     m();
                     h.data(d, l)
                 }
             })
         }
     };
     b[d].init();
     return b
 }(widgets || {}));
 var widgets = (function (c) {
     var j = "cart",
         l = "lite",
         k = "extend",
         a = $(window),
         d = function (m) {
             return m.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
         },
         h = function (n, m) {
             var o = $.extend({
                 success: b,
                 error: i()
             }, n || {});
             switch (m) {
             case "add":
                 o.url = uri.actions.client.cartadd;
                 break;
             case "replace":
                 o.url = uri.actions.client.cartreplace;
                 break;
             case "clear":
                 o.url = uri.actions.client.cartclear;
                 break;
             case "remove":
                 o.url = uri.actions.client.cartremove;
                 break;
             default:
                 o.url = uri.actions.client.cartget
             }
             ajax.post(o)
         },
         i = function () {
             c[j].elements.each(function () {
                 var m = $(this),
                     n = m.find(".well");
                 if (m.hasClass(k) && n.hasClass("to-state-1")) {
                     n.removeClass("to-state-1").addClass("state-1")
                 }
             })
         },
         b = function (m) {
             if (m && m.Items) {
                 c[j].elements.each(function () {
                     var u = $(this),
                         w = u.data(j),
                         q;
                     w = $.extend(w, m);
                     if (u.hasClass(k)) {
                         var p = function (A) {
                             if (A != null && A.length > 0) {
                                 var z = A[0];
                                 return $("<img/>", {
                                     src: uri.image.first(A, 32, 32),
                                     alt: z.Name
                                 })
                             }
                         };
                         i();
                         if (m.Items.length) {
                             q = $.Enumerable.From(m.Items).Select(function (z) {
                                 return $("<tr/>", {
                                     "data-id": z.Item.Id,
                                     html: $("<td/>", {
                                         "class": "image hidden-phone",
                                         html: p(z.Item.Files)
                                     }).add("<td/>", {
                                         "class": "name hidden-phone",
                                         text: z.Item.Name
                                     }).add("<td/>", {
                                         "class": "price hidden-phone",
                                         html: $("<span/>", {
                                             "class": "value",
                                             text: d(z.Item.Price)
                                         }).add('<span class="tenge"><span class="tenge"> тнг. </span></span>')
                                     }).add("<td/>", {
                                         html: $("<div/>", {
                                             "class": "visible-phone",
                                             html: '<p class="name">' + z.Item.Name + ", " + d(z.Item.Price) + '<span class="tenge"><span class="tenge"> тнг. </span></span></p>'
                                         }).add("<div/>", {
                                             "class": "btn-toolbar",
                                             html: $("<div/>", {
                                                 "class": "numeric",
                                                 "data-value": z.Count,
                                                 "data-params": z.Item.Id
                                             }).add("<div/>", {
                                                 "class": "btn-group",
                                                 html: $("<a/>", {
                                                     "class": "btn del",
                                                     "data-id": z.Item.Id,
                                                     html: '<i class="icon-remove icon-light"></i>'
                                                 })
                                             })
                                         })
                                     }).add("<td/>", {
                                         "class": "cost",
                                         html: $("<span/>", {
                                             "class": "value",
                                             text: d(z.Cost)
                                         }).add('<span class="tenge"> тнг. </span>')
                                     })
                                 })[0]
                             }).TojQuery();
                             var v = $.Enumerable.From(m.Toppings).Select(function (z) {
                                 return $("<tr/>", {
                                     html: $("<td/>", {
                                         "class": "image hidden-phone",
                                         html: p(z.Images)
                                     }).add("<td/>", {
                                         "class": "name hidden-phone",
                                         colspan: 2,
                                         text: z.Name
                                     }).add("<td/>", {
                                         html: $("<div/>", {
                                             "class": "visible-phone",
                                             html: '<p class="name">' + z.Name + "</p>"
                                         })
                                     }).add("<td/>", {
                                         "class": "cost",
                                         html: $("<span/>", {
                                             "class": "value",
                                             text: "бесплатно"
                                         })
                                     })
                                 })[0]
                             }).TojQuery();
                             q = q.add(v);
                             u.find(".well").removeClass("state-3").removeClass("state-2").addClass("state-1")
                         } else {
                             q = $("<tr/>", {
                                 html: $("<td/>", {
                                     "class": "name",
                                     colspan: 5,
                                     html: '<span>В корзине пока ничего нет, попробуйте что-нибудь <a href="' + uri.actions.menu.index + '">заказать</a>.</span>'
                                 })
                             });
                             u.find(".well").removeClass("state-1").removeClass("state-2").addClass("state-3").css("display", "none")
                         }
                         u.find(".sum .value").text(d(m.Sum)).end().find(".items tbody").find("td:has(.q-loading)").loading("destroy").end().empty().append(q).find(".numeric").each(function () {
                             $(this).data().change = w.changecount
                         });
                         if (m.DisabledItems.length) {
                             q = $.Enumerable.From(m.DisabledItems).Select(function (z) {
                                 return $("<tr/>", {
                                     "data-id": z.Item.Id,
                                     html: $("<td/>", {
                                         "class": "image",
                                         html: p(z.Item.Files)
                                     }).add("<td/>", {
                                         "class": "name",
                                         text: z.Item.Name
                                     }).add("<td/>", {
                                         "class": "price",
                                         html: $("<span/>", {
                                             "class": "value",
                                             text: d(z.Item.Price)
                                         }).add('<span class="tenge"> тнг. </span>')
                                     }).add("<td/>", {
                                         "class": "",
                                         text: z.Count
                                     }).add("<td/>", {
                                         "class": "cost",
                                         html: $("<span/>", {
                                             "class": "value",
                                             text: d(z.Cost)
                                         }).add('<span class="tenge"> тнг. </span>')
                                     })
                                 })[0]
                             }).TojQuery();
                             u.find(".disabled").show().find("tbody").empty().append(q)
                         } else {
                             u.find(".disabled").hide().find("tbody").empty()
                         }
                         u.find(".min-amount").text(m.MinSum)
                     } else {
                         if (u.hasClass(l)) {
                             var t = u.find(".sum"),
                                 x = {
                                     x: parseInt(t.text().replace(/\s/g, ""))
                                 },
                                 s = u.parent(),
                                 y = new TimelineLite(),
                                 n = u.find(".nav-menu .content"),
                                 o;
                             x.x = isNaN(x.x) ? 0 : x.x;
                             if (m.Items.length) {
                                 q = $.Enumerable.From(m.Items).Select(function (z) {
                                     return $("<li/>", {
                                         "class": "record",
                                         html: $("<span/>", {
                                             "class": "btn del",
                                             "data-id": z.Item.Id,
                                             text: "×"
                                         }).add("<span/>", {
                                             "class": "count",
                                             text: z.Count + "×"
                                         }).add("<img/>", {
                                             alt: "",
                                             src: uri.image.first(z.Item.Files, 32, 32)
                                         }).add("<span/>", {
                                             "class": "name",
                                             text: z.Item.Name
                                         }).add("<span/>", {
                                             "class": "cost",
                                             text: z.Cost
                                         }).add('<span class="tenge"> тнг. </span>')
                                     })[0]
                                 }).TojQuery();
                                 q = $("<div/>", {
                                     "class": "box",
                                     html: $("<ul/>", {
                                         html: q
                                     })
                                 });
                                 u.find(".text").attr("href", uri.actions.client.order);
                                 u.find(".nav-menu").addClass("active");
                                 u.find(".content").empty().append(q);
                                 u.find(".nav-menu .total").text(m.Count + " " + $.just.string.numeric(m.Count, "товар", "товарa", "товаров") + " в ");
                                 if (q.height() > 250) {
                                     q.height(250).mCustomScrollbar()
                                 }
                                 y.to(x, 0.5, {
                                     x: m.Sum,
                                     ease: Linear.easeOut,
                                     onUpdate: function () {
                                         t.text(d(parseInt(x.x)))
                                     }
                                 })
                             } else {
                                 u.removeAttr("href").show();
                                 q = null;
                                 if (x) {
                                     y.to(x, 0.5, {
                                         x: m.Sum,
                                         ease: Linear.easeOut,
                                         onUpdate: function () {
                                             t.text(d(parseInt(x.x)))
                                         }
                                     }).call(function () {
                                         u.find(".nav-menu").removeClass("active");
                                         u.find(".content").empty()
                                     })
                                 } else {
                                     u.find(".nav-menu").removeClass("active");
                                     u.find(".content").empty()
                                 }
                             }
                         } else {
                             var t = u.find(".sum"),
                                 x = {
                                     x: parseInt(t.text().replace(/\s/g, ""))
                                 },
                                 s = u.parent(),
                                 y = new TimelineLite(),
                                 r;
                             x.x = isNaN(x.x) ? 0 : x.x;
                             if (m.Items.length) {
                                 r = $.Enumerable.From(m.Items).Select(function (z) {
                                     return $("<li/>", {
                                         "class": "record",
                                         html: $("<span/>", {
                                             "class": "btn del",
                                             "data-id": z.Item.Id,
                                             text: "×"
                                         }).add("<span/>", {
                                             "class": "count",
                                             text: z.Count + "×"
                                         }).add("<img/>", {
                                             alt: "",
                                             src: uri.image.first(z.Item.Files, 32, 32)
                                         }).add("<span/>", {
                                             "class": "name",
                                             text: z.Item.Name
                                         }).add("<span/>", {
                                             "class": "cost",
                                             text: z.Cost
                                         }).add('<span class="tenge"> тнг. </span>')
                                     })[0]
                                 }).TojQuery();
                                 q = $("<li/>", {
                                     "class": "record",
                                     html: $("<span/>", {
                                         "class": "total",
                                         html: $("<span/>", {
                                             text: m.Count + " " + $.just.string.numeric(m.Count, "товар", "товарa", "товаров") + " в "
                                         }).add("<a/>", {
                                             href: uri.actions.client.order,
                                             text: "корзине"
                                         })
                                     })
                                 }).add("<li/>", {
                                     "class": "divider"
                                 }).add("<li/>", {
                                     "class": "record-box",
                                     html: $("<ul/>", {
                                         "class": "records",
                                         html: r
                                     })
                                 });
                                 u.attr("href", uri.actions.client.order).show();
                                 s.removeClass("null");
                                 u.next(".cart-info").empty().append(q);
                                 y.to(x, 0.5, {
                                     x: m.Sum,
                                     ease: Linear.easeOut,
                                     onUpdate: function () {
                                         t.text(d(parseInt(x.x)))
                                     }
                                 })
                             } else {
                                 u.removeAttr("href").show();
                                 q = null;
                                 if (x) {
                                     y.to(x, 0.5, {
                                         x: m.Sum,
                                         ease: Linear.easeOut,
                                         onUpdate: function () {
                                             t.text(d(parseInt(x.x)))
                                         }
                                     }).call(function () {
                                         s.addClass("null");
                                         u.next(".cart-info").empty().append(q)
                                     })
                                 } else {
                                     s.addClass("null");
                                     u.next(".cart-info").empty().append(q)
                                 }
                             }
                         }
                     }
                 })
             }
         },
         e = function (o, p) {
             var m = $("#city"),
                 n = $(".order"),
                 q = {
                     LastCart: o
                 };
             q.Address = {
                 CityName: m.children(":selected").text()
             };
             n.find("input,textarea,select").each(function (t, u) {
                 var r = $(u),
                     w = r.attr("name").split("."),
                     x = r.val(),
                     v = q;
                 for (var s = 0; s < w.length; s++) {
                     if (s == w.length - 1) {
                         v[w[s]] = x
                     } else {
                         v[w[s]] = v[w[s]] || {};
                         v = v[w[s]]
                     }
                 }
             });
             q.PayMethod = $("[name=PayMethod]:checked").val();
             q.AllowTerms = $("[name=AllowTerms]").prop("checked");
             ajax.post({
                 url: uri.actions.client.order,
                 data: q,
                 success: function (r) {
                     if (r.Success) {
                         f(r.orderId)
                     } else {
                         n.find(".btn-success").button("reset").find("span").text("Повторить заказ")
                     }
                 },
                 error: function () {
                     n.find(".btn-success").button("reset").find("span").text("Повторить заказ")
                 },
                 complete: function () {
                     if (typeof (p) == "function") {
                         p()
                     }
                 }
             })
         },
         f = function (orderId) {
             window.location = uri.actions.client.ordered + orderId
         };
     c[j] = {
         init: function () {
             c[j].elements = $("." + j);
             return c[j].elements.each(function () {
                 var L = $(this),
                     N = L.data(j),
                     n = L.find("#city"),
                     o = L.find(".order form"),
                     q = o.filter(".order-client"),
                     r = o.filter(".order-delivery"),
                     p = o.filter(".order-address"),
                     u = o.filter(".order-time"),
                     s = o.filter(".order-department"),
                     t = o.filter(".order-paymethod"),
                     F = o.find("[name=Phone]"),
                     z = o.find("[name=FIO]"),
                     m = o.find(".addressbox"),
                     v = o.find("[name=addresses]"),
                     D = o.find('[name="Address.MetroName"]'),
                     J = o.find('[name="Address.StreetName"]'),
                     C = o.find('[name="Address.House"]'),
                     x = o.find('[name="Address.Corpus"]'),
                     w = o.find('[name="Address.Building"]'),
                     A = o.find('[name="Address.Flat"]'),
                     G = o.find('[name="Address.Porch"]'),
                     B = o.find('[name="Address.Floor"]'),
                     y = o.find('[name="Address.DoorCode"]'),
                     I = o.find('[name="Address.Room"]'),
                     E = o.find('[name="Address.Office"]'),
                     H = o.find('[name="Address.Remark"]'),
                     M = function (V) {
                         ajax.post({
                             url: uri.actions.client.cartchanged,
                             data: {
                                 id: N.Version,
                                 CityId: n.val()
                             },
                             success: function (W) {
                                 if (W.Data) {
                                     L.find(".min-amount").text(W.Data)
                                 }
                                 if (W.Success) {
                                     if (V) {
                                         V.button("reset").hide()
                                     }
                                     $("body, html").animate({
                                         scrollTop: L.find(".order").show().offset().top - 60
                                     }, 400);
                                     P()
                                 } else {
                                     if (V) {
                                         V.button("reset")
                                     }
                                     c[j].reload(n.val())
                                 }
                             }
                         })
                     },
                     P = function () {
                         var W, V;
                         if (widgets.account.auth()) {
                             W = widgets.account.info();
                             V = W.Roles;
                             if ((V ^ 2) < V) {
                                 N.info = {
                                     name: W.Name
                                 };
                                 z.val(W.Name);
                                 ajax.post({
                                     url: uri.actions.client.orderinfoget,
                                     success: Q
                                 })
                             }
                         }
                     },
                     Q = function (W) {
                         var V = N.info;
                         V.phone = W.Phone;
                         V.list = W.Addresses;
                         F.val(V.phone);
                         v.empty();
                         if (V.list && V.list.length) {
                             O(0);
                             if (V.list.length > 1) {
                                 $.Enumerable.From(V.list).Select(function (Y, X) {
                                     return $("<option/>", {
                                         value: X,
                                         text: Y.Title
                                     })[0]
                                 }).TojQuery().appendTo(v);
                                 m.show()
                             } else {
                                 m.hide()
                             }
                         } else {
                             m.hide()
                         }
                     },
                     O = function (V) {
                         var W = N.info,
                             X = W.list[V];
                         D.val(X.MetroName);
                         J.val(X.StreetName);
                         C.val(X.House);
                         x.val(X.Corpus);
                         w.val(X.Building);
                         A.val(X.Flat);
                         G.val(X.Porch);
                         B.val(X.Floor);
                         y.val(X.DoorCode);
                         I.val(X.Room);
                         E.val(X.Office);
                         H.val(X.Remark)
                     };
                 if (!N) {
                     N = {};
                     if (L.hasClass(k)) {
                         L.find(".items tbody td").loading();
                         N.changecount = function (Z, Y) {
                             var V = $.Enumerable.From(N.Items),
                                 W = V.Where("$.Item.Id==" + Y).ToArray()[0],
                                 X = Z * W.Item.Price;
                             N.Sum += X - W.Cost;
                             W.Count = Z;
                             W.Cost = X;
                             L.find(".items .sum .value").text(d(N.Sum)).end().find(".items tr[data-id=" + Y + "] .cost .value").text(d(W.Cost)).end().find(".well").removeClass("state-1").addClass("state-2")
                         };
                         L.find(".fire").click(function () {
                             c[j].reload(n.val());
                             L.find(".well").removeClass("state-2").addClass("to-state-1")
                         });
                         L.find(".save").click(function () {
                             c[j].replace($.Enumerable.From(N.Items).Select("{ Key: $.Item.Id, Value: $.Count}").ToArray(), n.val());
                             L.find(".well").removeClass("state-2").addClass("to-state-1")
                         });
                         n.change(function (V) {
                             if (!L.find(".well").hasClass("state-2")) {
                                 M()
                             }
                         });
                         L.find(".ordering").click(function () {
                             var V = $(this);
                             V.button("loading");
                             M(V)
                         });
                         L.find(".submit").click(function () {
                             var V = $(this),
                                 X = L.find('[name="Delivery"]').val(),
                                 W = q.add(r),
                                 Y = true;
                             if (!V.hasClass("disabled")) {
                                 switch (X) {
                                 case "Delivery":
                                     W = W.add(p);
                                     break;
                                 case "DeliveryInTime":
                                     W = W.add(p).add(u);
                                     break;
                                 case "SelfService":
                                     W = W.add(s).add(u);
                                     break
                                 }
                                 W.each(function (aa, Z) {
                                     Y = Y && $(Z).valid()
                                 });
                                 if (Y) {
                                     if ($("[name=AllowTerms]").prop("checked")) {
                                         V.button("loading");
                                         e(N)
                                     } else {
                                         widgets.message({
                                             type: "info",
                                             timeout: 5000,
                                             text: "Необходимо согласиться с правилами, чтобы сделать заказ"
                                         })
                                     }
                                 } else {
                                     widgets.message({
                                         type: "error",
                                         text: "При заполнении формы допущены ошибки!",
                                         timeout: 4000
                                     })
                                 }
                             }
                         });
                         o.find("input, textarea").bind("keyup change blur", function (V) {
                             if (V.type == "blur" || $(this).parents(".control-group").hasClass("error")) {
                                 o.validate().element(this)
                             }
                         });
                         v.change(function (V, W) {
                             O(v.val())
                         });
                         L.on("click", ".del", function () {
                             c[j].remove($(this).data("id"), n.val())
                         });
                         var U = 1,
                             T = 99,
                             R = function (V, W) {
                                 V.val(W);
                                 N.value = W;
                                 setTimeout(function () {
                                     K.blur()
                                 }, 100)
                             },
                             K = L.find("[name=PersonCount]").bind("keyup blur", function () {
                                 var V = this.value;
                                 V = parseInt(V.replace(/[^\d]+/g, ""));
                                 if (!(V > U - 1)) {
                                     V = U
                                 } else {
                                     if (V > T) {
                                         V = T
                                     }
                                 }
                                 R($(this), V)
                             }),
                             S = function () {
                                 var W = parseInt(K.val()),
                                     V = $(this);
                                 if (isNaN(W)) {
                                     W = U
                                 } else {
                                     if (V.hasClass("minus") && W > U) {
                                         W--
                                     } else {
                                         if (V.hasClass("plus") && W < T) {
                                             W++
                                         }
                                     }
                                 }
                                 R(K, W)
                             };
                         K.siblings().click(S).disableSelection();
                         o.find('[name="Delivery"]').change(function (W) {
                             var V = $(this);
                             switch (V.val()) {
                             case "Delivery":
                                 p.show();
                                 u.hide();
                                 s.hide();
                                 break;
                             case "DeliveryInTime":
                                 p.show();
                                 u.show();
                                 s.hide();
                                 break;
                             case "SelfService":
                                 p.hide();
                                 u.show();
                                 s.show();
                                 break
                             }
                         });
						 
						 o.find('[name="Department"]').change(function (W) {
							var V = $(this);
                            // alert(V.val());
						 });
						 
                         o.find("[name=PayMethod]").change(function (V) {
                             var X = o.find("[name=PayMethod]:checked").val(),
                                 W = o.find("[data-paymethod=2]");
                             if (X == 2) {
                                 W.show()
                             } else {
                                 W.hide()
                             }
                         })
                     } else {
                         if (L.hasClass(l)) {} else {
                             L.append($("<i/>", {
                                 "class": "icon-shopping-cart"
                             }).add("<span/>", {
                                 "class": "sum"
                             }).add('<span class="tenge"> тнг. </span>'))
                         }
                     }
                     L.data(j, N)
                 }
             }).ready(function () {
                 c[j].reload(c[j].elements.find("#city").val())
             })
         },
         add: function (n, m) {
             $(".cart.lite").each(function () {
                 var o = $(this).find(".sum"),
                     q = {
                         x: parseInt(o.text().replace(/\s/g, ""))
                     },
                     r = new TimelineLite(),
                     p = $.Enumerable.From(n).Sum("$.Price*$.Value") || 0;
                 q.x = isNaN(q.x) ? 0 : q.x;
                 r.to(q, 0.5, {
                     x: q.x + p,
                     ease: Linear.easeOut,
                     onUpdate: function () {
                         o.text(d(parseInt(q.x)))
                     }
                 })
             });
             h({
                 data: {
                     Items: n,
                     CityId: m
                 }
             }, "add")
         },
         replace: function (n, m) {
             h({
                 data: {
                     Items: n,
                     CityId: m
                 }
             }, "replace")
         },
         clear: function (n, m) {
             h({
                 data: {
                     Items: n,
                     CityId: m
                 }
             }, "clear")
         },
         remove: function (n, m) {
             h({
                 data: {
                     Id: n,
                     CityId: m
                 }
             }, "remove")
         },
         reload: function (m) {
             h({
                 data: {
                     CityId: m
                 }
             })
         }
     };
     c[j].init();
     $(".cart.lite .content .del").live("click", function (q) {
         var p = $(this),
             m = p.parents(".cart-info"),
             o = p.parents(".dropdown"),
             n = p.find("#city");
         o.addClass("open");
         c[j].remove(p.data("id"), n.val())
     }).live("mousedown", function (m) {});
     return c
 }(widgets || {}));
 var widgets = (function (a) {
     a.menu = (function () {
         var d = $(".feedback"),
             b = $(window),
             e = 0.3,
             c = 0.1;
         return d.each(function () {
             var m = $(this),
                 i = m.children(".nav-pills"),
                 k = m.children(".tab-content"),
                 l = k.children(".tab-pane"),
                 j = l.children(".posts"),
                 h = l.children(".next"),
                 f = l.children(".faqs"),
                 o = m.data("wishes"),
                 n = function (p) {
                     setTimeout(function () {
                         widgets.social(j, "like", p)
                     }, 1500);
                     setTimeout(function () {
                         j.justgrid("force")
                     }, 2500)
                 };
             if (!o) {
                 o = {};
                 m.data("wishes", o);
                 j.justgrid({
                     speed: e,
                     delay: c,
                     selector: ".post",
                     width: 210,
                     gap: 15,
                     tolerance: 20,
                     animation: function () {
                         if (device.phone()) {
                             return "instant"
                         } else {
                             if (device.tablet()) {
                                 return "move"
                             } else {
                                 return "move"
                             }
                         }
                     },
                     isActivate: function () {
                         return !device.phone()
                     },
                     onActivate: function (p) {
                         var q = p.find(".text");
                         new TimelineLite().to(p, e, {
                             css: {
                                 width: 435
                             }
                         }, c).to(q, e, {
                             css: {
                                 height: q.data("height")
                             }
                         }, -e).set(q, {
                             css: {
                                 height: "auto"
                             }
                         })
                     },
                     onDeactivate: function (p) {
                         var q = p.find(".text");
                         new TimelineLite().set(q, {
                             css: {
                                 height: q.data("height")
                             }
                         }).to(q, e, {
                             css: {
                                 height: 46
                             }
                         }).to(p, e, {
                             css: {
                                 width: 210
                             }
                         }, -e)
                     }
                 });
                 j.on("click", ".post .activate", function (p) {
                     if (!device.phone()) {
                         p.preventDefault()
                     }
                 });
                 i.find('a[data-toggle="tab"]').on("shown", function (p) {
                     l.filter($(p.target).data("target")).children(".posts").justgrid();
                     FB.XFBML.parse()
                 });
                 h.click(function () {
                     var p = i.find(".active a"),
                         r = p.data("id"),
                         q = $(this).data("page");
                     ajax.post({
                         data: {
                             page: q,
                             type: r
                         },
                         url: uri.actions.feedback.index,
                         success: function (x) {
                             var z = x.FeedbackTypes,
                                 y = function (A) {
                                     return document.createTextNode(A)
                                 },
                                 t = l.filter(p.data("target")),
                                 v = t.children(".posts"),
                                 u = t.children(".next"),
                                 s, w;
                             if (z && z.length) {
                                 z = z[0];
                                 $.map(z.Feedbacks, function (A) {
                                     s = $('<div class="post">');
                                     w = uri.actions.feedback.index + A.Id + "/";
                                     if (A.Text && A.Text.length > 90) {
                                         $('<a class="text activate"><span class="shadow"></span><span class="zoom"><span class="icon"></span></span></a>').attr("dataHeight", Math.ceil(A.Text.Length / 67) * 18 - 8).attr("href", w).append(y(A.Text)).appendTo(s)
                                     } else {
                                         $('<a class="text">').append(y(A.Text)).appendTo(s)
                                     }
                                     $('<div class="name">').append($('<div class="phone">').append(y(A.Phone))).append(y(A.Fio)).appendTo(s);
                                     if (z.SocialLiked) {
                                         $('<div class="social">').attr("data-url", w).append($('<div class="vk">').attr("id", "vk" + A.Id)).append($('<div class="fb-like" data-send="false" data-layout="button_count" data-width="152" data-show-faces="true" data-font="trebuchet ms"></div>').attr("data-href", w)).appendTo(s)
                                     }
                                     v.append(s)
                                 });
                                 if (z.NextPage) {
                                     u.data("page", z.NextPage)
                                 } else {
                                     u.remove()
                                 }
                                 n(1);
                                 j.justgrid()
                             }
                         }
                     })
                 });
                 f.on("click", ".question", function () {
                     $(this).next().toggle(200)
                 });
                 $(function () {
                     n()
                 })
             }
         })
     })();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "feedback-send";
     a.menu = (function () {
         var c = $("." + b);
         return c.each(function () {
             var p = $(this),
                 f = p.find("form"),
                 e = f.find("[name=FIO]"),
                 i = f.find("[name=Phone]"),
                 o = f.find("[name=ThemeId]"),
                 h = f.find("[name=OrderNumber]"),
                 d = f.find("[name=CityId]"),
                 j = f.find("[name=PlaceId]"),
                 n = f.find("[name=Text]"),
                 m = f.find("[data-tab=place]"),
                 l = f.find("[data-tab=number]"),
                 k = p.find(".send"),
                 s = function (w, x) {
                     ajax.post({
                         url: x,
                         success: q(w)
                     })
                 },
                 q = function (w) {
                     return function (x) {
                         $.Enumerable.From(x).Select(function (y) {
                             return $("<option>", {
                                 value: y.Value,
                                 text: y.Text
                             })[0]
                         }).TojQuery().appendTo(w.empty())
                     }
                 },
                 u = function (w) {
                     h.attr("data-val", !!w).data("val", !!w);
                     if (!h.data("val-required")) {
                         h.prop("data-val-required", "<span>Задайте номер заказа</span>")
                     }
                 },
                 v = function (w) {
                     var x = $(this).val();
                     switch (x) {
                     case "0":
                         m.hide();
                         l.show();
                         u(1);
                         break;
                     case "1":
                         m.show();
                         l.hide();
                         u();
                         break;
                     case "2":
                         m.hide();
                         l.hide();
                         u();
                         break
                     }
                 },
                 r, t = function (w) {
                     w.preventDefault();
                     if (f.valid()) {
                         r = {
                             FIO: e.val(),
                             Phone: i.val(),
                             CityId: d.val(),
                             PlaceId: j.val(),
                             ThemeId: o.val(),
                             Text: n.val()
                         };
                         p.modal("hide");
                         e.val("");
                         i.val("");
                         j.val(0);
                         n.val("");
                         ajax.post({
                             url: uri.actions.client.feedback,
                             data: r
                         })
                     }
                 };
             p.on("show", function () {
                 s(d, uri.actions.dictionary.cities);
                 s(j, uri.actions.dictionary.departments)
             });
             o.change(v);
             k.click(t)
         })
     })();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "flexslider";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             a[b].elements.flexslider({
                 animation: "slide",
                 animationLoop: true,
                 itemWidth: 235,
                 itemMargin: 0
             })
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "presentation";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var d = $(this),
                     e = d.data(b),
                     c = d.find(".slider .row"),
                     f = function (h) {
                         var i = -282 * $(this).data("slide");
                         TweenLite.to(c, 0.5, {
                             css: {
                                 marginLeft: i
                             }
                         })
                     };
                 if (!e) {
                     e = {};
                     d.data(b, e);
                     $("[data-slide]").mouseenter(f)
                 }
             })
         }
     };
     $(function () {
         a[b].init()
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "scroller";
     a[b] = {
         init: function () {
             var c = a[b].elements = $(".j-" + b).scroller(),
                 d = function () {
                     c.find(".items").loading("destroy");
                     if (c.hasClass("menu-scroller")) {
                         ajax.post({
                             url: uri.actions.menu.getspecial,
                             success: function (i) {
                                 e(i)
                             }
                         })
                     }
                     if (c.hasClass("news-scroller")) {
                         ajax.post({
                             url: uri.actions.news.getspecial,
                             success: function (i) {
                                 h(i)
                             }
                         })
                     }
                     if (c.hasClass("actions-scroller")) {
                         ajax.post({
                             url: uri.actions.actions.getspecial,
                             success: function (i) {
                                 f(i)
                             }
                         })
                     }
                 },
                 e = function (j) {
                     var i = c.filter(".menu-scroller").find(".items").empty();
                     i.loading("destroy");
                     $.Enumerable.From(j).Select(function (k) {
                         return $("<div/>", {
                             "class": "item",
                             html: $("<a/>", {
                                 "class": "image",
                                 html: $("<img/>", {
                                     alt: "",
                                     src: uri.image.first(k.Files, 210, 167)
                                 })
                             }).add("<div/>", {
                                 "class": "title",
                                 text: k.Name
                             }).add("<div/>", {
                                 "class": "content",
                                 html: $("<p/>", {
                                     html: '<span class="price"><span>' + k.Price + '</span><span class="tenge"> тнг. </span></span><span class="info">' + k.Weight + "</span>"
                                 }).add("<div/>", {
                                     "data-id": k.Id,
                                     "data-price": k.Price,
                                     "class": "cartbutton"
                                 })
                             })
                         })[0]
                     }).TojQuery().appendTo(i).ready(function () {
                         widgets.cartbutton.init()
                     })
                 },
                 h = function (j) {
                     var i = c.filter(".news-scroller").find(".items").empty();
                     i.loading("destroy");
                     $.Enumerable.From(j).Select(function (k) {
                         return $("<div/>", {
                             "class": "item",
                             html: $("<a/>", {
                                 href: k.Link,
                                 "class": "box",
                                 html: $("<h4/>", {
                                     text: k.Title
                                 }).add("<p/>", {
                                     text: k.Announce
                                 })
                             }).add("<img/>", {
                                 alt: "",
                                 src: uri.image.first(k.Images)
                             })
                         })[0]
                     }).TojQuery().appendTo(i)
                 },
                 f = function (j) {
                     var i = c.filter(".actions-scroller").find(".items").empty();
                     i.loading("destroy");
                     $.Enumerable.From(j).Select(function (k) {
                         return $("<div/>", {
                             "class": "item",
                             html: $("<a/>", {
                                 href: k.Link,
                                 "class": "box",
                                 html: $("<h4/>", {
                                     text: k.Title
                                 }).add("<p/>", {
                                     text: k.Announce
                                 })
                             }).add("<img/>", {
                                 alt: "",
                                 src: uri.image.first(k.Images)
                             }).add("<a/>", {
                                 "class": "maplink",
                                 href: uri.actions.restaurants.index + (k.Departments.length ? "#/" + $.Enumerable.From(k.Departments).Select("$.Id").ToArray().join("/") + "/" : ""),
                                 html: $("<i/>", {
                                     "class": "icon-globe icon-white"
                                 }).add("<span/>", {
                                     "class": "text",
                                     text: "На карте"
                                 }).add("<span/>", {
                                     "class": "badge pull-right",
                                     text: k.Departments.length || 0
                                 })
                             })
                         })[0]
                     }).TojQuery().appendTo(i)
                 };
             d();
             return c
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "scrollup";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var c = $(this),
                     d = c.data(b);
                 if (!d) {
                     d = {
                         body: $("body")
                     };
                     c.click(function () {
                         d.body.animate({
                             scrollTop: 0
                         }, 400)
                     });
                     c.data(b, d)
                 }
             })
         }
     };
     a[b].init();
     $("." + b).live("create", function () {
         a[b].init()
     });
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     $(function () {
         $(".j-slider").slider()
     });
     return a
 }(widgets || {}));
 var widgets = (function (b) {
     var a = null,
         c = {
             like: function (e) {
                 return function (l, i) {
                     var f = $(i),
                         j = function (n) {
                             return f.data(n)
                         },
                         k = parseInt(j("hash")),
                         m = f.find(".vk").attr("id"),
                         h = f.find(".fb-like");
                     VK.Widgets.Like(m, {
                         type: "mini",
                         height: 18,
                         pageTitle: j("title"),
                         pageDescription: j("desc"),
                         text: j("text"),
                         pageUrl: j("url"),
                         pageImage: j("image")
                     }, k);
                     if (e) {
                         FB.XFBML.parse(f[0])
                     }
                 }
             },
             comments: function (e) {
                 return function (l, i) {
                     var f = $(i),
                         j = function (n) {
                             return f.data(n)
                         },
                         k = parseInt(j("hash")),
                         m = f.find(".vk").attr("id"),
                         h = f.find(".fb-like");
                     VK.Widgets.Comments(m, {
                         width: j("width"),
                         limit: j("limit"),
                         height: j("height"),
                         pageUrl: j("url")
                     }, k);
                     if (e) {
                         FB.XFBML.parse(f[0])
                     }
                 }
             }
         },
         d = function (e) {
             return function (h) {
                 var f = widgets.account,
                     i = widgets.account.info();
                 if (i && i.Roles == 2) {
                     ajax.post({
                         data: {
                             type: e,
                             id: a.toString()
                         },
                         url: uri.actions.client.log
                     })
                 }
             }
         };
     b.socialCurrent = function (e) {
         a = e
     };
     b.social = function (e, h, f) {
         if (h) {
             e.find(".social." + h + ":not(.active)").addClass("active").each(c[h](!!f))
         }
     };
     $(function () {
         if (typeof VK != "undefined" && VK.Observer) {
             VK.Observer.subscribe("widgets.like.liked", d(2));
             VK.Observer.subscribe("widgets.comments.new_comment", d(3))
         }
         if (typeof FB != "undefined" && FB.Event) {
             FB.Event.subscribe("edge.create", d(2));
             FB.Event.subscribe("comment.create", d(3))
         }
     });
     return b
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "lastview",
         c = "B",
         d = uri.actions.home.index;
     a[b] = function (f) {
         var e = $.cookie(b),
             h = e ? $.map(e.split(c), function (j) {
                 return parseInt(j)
             }) : [];
         f = parseInt(f);
         if ($.isNumeric(f) && f > 0) {
             if ($.inArray(f, h) + 1) {
                 h.splice(h.indexOf(f), 1)
             } else {
                 if (h.length > 12) {
                     h.pop()
                 }
             }
             h.unshift(f);
             $.cookie(b, h.join(c), {
                 path: d
             })
         }
         return h
     };
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "login-social";
     a.menu = (function () {
         var c = $("." + b);
         return c.each(function () {
             var d = $(this),
                 e = d.data(b),
                 h = function (l) {
                     var o = window.screenX ? window.screenX : window.screenLeft,
                         p = window.screenY ? window.screenY : window.screenTop,
                         n = window.outerWidth ? window.outerWidth : document.body.clientWidth,
                         m = window.outerHeight ? window.outerHeight : (document.body.clientHeight - 22),
                         r = l.width,
                         j = l.height,
                         k = parseInt(o + ((n - r) / 2), 10),
                         q = parseInt(p + ((m - j) / 2.5), 10),
                         i = ("width=" + r + ",height=" + j + ",left=" + k + ",top=" + q + "scrollbars=no");
                     e.active = window.open(l.url, "vk_openapi", i)
                 },
                 f = function () {
                     if (e.active && !e.active.closed) {
                         e.active.close()
                     }
                     h(e)
                 };
             if (!e) {
                 if (d.data("social") == "fb") {
                     e = {
                         width: 440,
                         height: 294,
                         url: uri.actions.account.authfb
                     }
                 } else {
                     e = {
                         width: 610,
                         height: 343,
                         url: uri.actions.account.authvk
                     }
                 }
                 d.click(f)
             }
         })
     })();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var c = "map",
         b = {
             popap: $("<div/>", {
                 "class": "popap",
                 html: $("<a/>", {
                     "class": "btn btn-danger close",
                     text: "✖"
                 }).add("<div/>", {
                     text: "$[[options.contentBodyLayout]]"
                 }).add("<div/>", {
                     "class": "triangle"
                 })
             })[0].outerHTML,
             content: $("<div/>", {
                 "class": "content",
                 html: $("<img/>").add("<div/>", {
                     "class": "text",
                     html: $("<h2/>", {
                         html: $("<a/>", {
                             "class": "link",
                             href: "${link}",
                             text: "${Name}"
                         })
                     }).add("<p/>", {
                         "class": "department-address",
                         text: "${Address}"
                     }).add("<p/>", {
                         "class": "workhours",
                         text: "${WorkHours}"
                     }).add("<div/>", {
                         "class": "services"
                     })
                 })
             })[0].outerHTML,
             item: $("<li/>", {
                 html: $("<img/>", {
                     "class": "image"
                 }).add("<h4/>", {
                     html: $("<a/>", {
                         href: uri.actions.restaurants.restaurant + "${Slug}/",
                         text: "${Name}"
                     })
                 }).add("<span/>", {
                     "class": "services"
                 })
             })[0].outerHTML,
             dl: $("<dl/>", {
                 "class": "dl-horizontal",
                 html: $("<dt/>", {
                     text: "${dt}"
                 }).add("<dd/>", {
                     text: "${dd}"
                 })
             })[0].outerHTML
         };
     a[c] = {
         init: function () {
             a[c].elements = $("." + c);
             return a[c].elements.each(function () {
                 var j = $(this),
                     n = j[0],
                     o = j.data(c),
                     A, u = "twirl#redIcon",
                     v = "twirl#greyIcon",
                     k = j.find(".toolbar"),
                     d = j.find(".address"),
                     h = j.find(".toggle-list, .mobile-toggle-list"),
                     e = j.find(".list"),
                     f = e.find(".content"),
                     i = j.find(".mobile-toolbar-toggle"),
                     w = function () {
                         o.visible = new ymaps.GeoObjectCollection();
                         o.map = A = new ymaps.Map(n, {
                             center: [55.76, 37.64],
                             zoom: 9
                         });
                         A.behaviors.enable(["multiTouch", "scrollZoom"]);
                         A.controls.add("smallZoomControl", {
                             bottom: 10,
                             left: 10
                         });
                         A.controls.add("trafficControl", {
                             top: 45,
                             right: 10
                         });
                         A.controls.add(new ymaps.control.TypeSelector(["yandex#map", "yandex#hybrid"]), {
                             top: 10,
                             right: 10
                         });
                         var H = ymaps.templateLayoutFactory.createClass(b.popap, {
                             build: function () {
                                 var I = this;
                                 I.constructor.superclass.build.call(I);
                                 $(".popap .close").click(function () {
                                     $(this).unbind("click");
                                     I.getData().geoObject.balloon.close()
                                 })
                             }
                         });
                         ymaps.layout.storage.add("yap#popap", H);
                         k.find("li").click(G);
                         d.bind("keyup blur click", l);
                         h.click(x);
                         i.click(function () {
                             i.parent().add(k).toggleClass("active")
                         });
                         y()
                     },
                     G = function () {
                         var H = $(this),
                             J, I;
                         if (H.hasClass("toggle")) {
                             k.toggleClass("active")
                         }
                         if (H.hasClass("item")) {
                             J = H.data("id");
                             I = o.services;
                             if (H.hasClass("active")) {
                                 I = I.Except(J)
                             } else {
                                 I = I.Insert(0, J)
                             }
                             H.toggleClass("active");
                             o.services = I;
                             p()
                         }
                     },
                     x = function () {
                         j.toggleClass("map-list")
                     },
                     F = function (H) {
                         return isNaN(parseInt(H))
                     },
                     r = function (H) {
                         if (H[0] == "") {
                             H.shift()
                         }
                         for (var I = 0; I < H.length; I++) {
                             if (F(H[I])) {
                                 return 0
                             }
                         }
                         return 1
                     },
                     s = function (H) {
                         var J = [];
                         for (var I = 0; I < H.length; I++) {
                             if (!F(H[I])) {
                                 J.push(H[I])
                             }
                         }
                         uri.hashset(J)
                     },
                     q = function (N, O) {
                         var I = function (Q) {
                                 return Q * Math.PI / 180
                             },
                             P = Math.sin,
                             H = Math.cos,
                             J = I(N[1]),
                             K = I(O[1]),
                             L = I(N[0]),
                             M = I(O[0]);
                         return Math.acos(P(J) * P(K) + H(J) * H(K) * H(L - M))
                     },
                     p = function () {
                         var J = $.Enumerable.From(o.list),
                             K = o.services,
                             H = o.address,
                             I, L, M = K.Count() || H ? J.Where(function (N) {
                                 I = H ? q([N.Longitude, N.Latitude], H) : 0;
                                 L = $.Enumerable.From(N.Services).SelectMany("$.Id").Intersect(K).Count() == K.Count();
                                 return I < 0.001 && L
                             }).Select("$.Id").ToArray() : [];
                         B(H);
                         if (K.Count() && !M.length) {
                             M.push(0)
                         }
                         uri.hashset(M)
                     },
                     E = function (L) {
                         var I = $.Enumerable.From(o.list),
                             H = $.Enumerable.From(L),
                             K = I.Where(function (M) {
                                 return H.Contains(M.Id.toString())
                             }),
                             J = I.Except(K);
                         if (L.length) {
                             C(K, u);
                             C(J, v);
                             D(K, "");
                             D(J, "none")
                         } else {
                             C(I, u);
                             D(I, "")
                         }
                     },
                     C = function (H, I) {
                         H.Select("$.placemark").ForEach(function (J) {
                             J.options.set("preset", I)
                         })
                     },
                     D = function (H, I) {
                         H.Select("$.$element").ForEach(function (J) {
                             J.css("display", I)
                         })
                     },
                     y = function () {
                         ajax.post({
                             url: uri.actions.restaurants.get,
                             success: function (H) {
                                 z(H)
                             }
                         })
                     },
                     z = function (L) {
                         var K, M = o.visible,
                             H = $(),
                             J = function (N) {
                                 switch (N) {
                                 case "dj":
                                     return "aws-headphones";
                                 case "Игровая комната":
                                     return "aws-magic";
                                 case "Кальян":
                                     return "aws-beaker";
                                 case "Караоке":
                                     return "aws-music";
                                 case "Ночь":
                                     return "aws-time";
                                 case "Детская комната":
                                     return "aws-github";
                                 case "Круглосуточное":
                                     return "aws-refresh";
                                 case "Wi-Fi":
                                     return "aws-signal"
                                 }
                             },
                             I = function (N, P, O) {
                                 if (P != null) {
                                     N.append($.tmpl(b.dl, {
                                         dt: O,
                                         dd: P
                                     }))
                                 }
                             };
                         o.list = L;
                         $.Enumerable.From(L).ForEach(function (R, Q) {
                             R.link = uri.actions.restaurants.restaurant + R.Slug + "/";
                             var P = $.Enumerable.From(R.Services).Select(function (T) {
                                     var S = "icon-" + J(T.Name);
                                     return $("<i/>", {
                                         "class": S
                                     })[0]
                                 }).TojQuery(),
                                 N = $.tmpl(b.content, R),
                                 O = $.tmpl(b.item, R);
                             N.find("a.link").prop("href", R.link);
                             N.find("img").prop("src", uri.image.first(R.Images, 250, 155));
                             N.add(O).find(".services").html(P);
                             O.find("img.image").prop("src", uri.image.first(R.Images, 100, 100));
                             I(O, R.Address, "Адрес");
                             I(O, R.DeliveryInfo, "Доставка");
                             I(O, R.Phone, "Телефон");
                             I(O, R.WorkHours, "Время работы");
                             if (R.WorkHours) {
                                 O.find("dl:last dd").css("white-space", "pre")
                             }
                             H = H.add(O);
                             R.$element = O;
                             K = new ymaps.Placemark([R.Latitude, R.Longitude], {
                                 balloonContentBody: N[0].outerHTML,
                                 hintContent: R.Name
                             }, {
                                 preset: "twirl#redIcon",
                                 balloonLayout: "yap#popap",
                                 balloonShadow: true
                             });
                             R.placemark = K;
                             M.add(K)
                         });
                         f.html(H);
                         A.geoObjects.add(M);
                         uri.hashget(t);
                         uri.hashchange(t)
                     },
                     t = {
                         check: r,
                         valid: E,
                         error: s
                     },
                     l = function () {
                         var H = d.val();
                         if (H.length > 0 && o.geocode != H) {
                             o.geocode = H;
                             $.ajax({
                                 url: "http://geocode-maps.yandex.ru/1.x/?format=json&ll=37.762003,55.676265&spn=0.368729,0.135803&results=1&geocode=Москва, " + H,
                                 dataType: "json",
                                 success: m
                             })
                         } else {
                             p()
                         }
                     },
                     m = function (J) {
                         var I, H = J.response.GeoObjectCollection.featureMember;
                         if (H.length) {
                             I = H[0].GeoObject.Point.pos
                         }
                         if (I) {
                             I = I.split(" ");
                             I[0] = parseFloat(I[0]);
                             I[1] = parseFloat(I[1]);
                             o.address = I
                         } else {
                             o.address = null
                         }
                         p()
                     },
                     B = function (I) {
                         var H = o.placemark;
                         if (H) {
                             A.geoObjects.remove(H)
                         }
                         if (I) {
                             o.placemark = H = new ymaps.Placemark([I[1], I[0]], {
                                 hintContent: "Ваше местоположение"
                             }, {
                                 preset: "twirl#blueIcon"
                             });
                             A.geoObjects.add(H)
                         }
                     };
                 if (!o) {
                     o = {
                         services: $.Enumerable.From([])
                     };
                     ymaps.ready(w);
                     j.data(c, o)
                 }
             })
         }
     };
     a[c].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     a.menu = (function () {
         var d = $(".menu"),
             b = $(window),
             e = 0.3,
             c = 0.1;
         return d.each(function () {
             var o = $(this),
                 l = o.children(".menu-sections"),
                 m = l.find(".container"),
                 n = o.children(".menu-special"),
                 k = o.children(".menu-items"),
                 i = o.find(".menu-filters"),
                 j = i.find(".menu-filter-sort"),
                 h = i.find(".menu-filter-gender"),
                 f = i.find(".menu-filter-age"),
                 q = o.data("menu"),
                 r = function () {
					m.find(".tab-pane").removeClass("active");
					m.find(".tab-pane").removeClass("fixed-active").css({
						marginLeft: "auto"
					});
                 },
                 s = function () {
                     var B = $(this),
                         D = -1,
                         C = $(B.data("target"));
                     if (!C.hasClass("fixed-active")) {
                         r();
                         B.parent().prevAll().each(function (E, F) {
                             D += $(F).outerWidth()
                         });
                         C.css({
                             marginLeft: D
                         }).addClass("fixed-active")
                     }
					 
					 if (!C.hasClass("active")) {
                         C.css({
                             marginLeft: D	
                         }).addClass("active")
                     }
					 
                 },
                 p = function (C) {
                     var B, D = C.find(".large-image");
                     if (!D.size()) {
                         B = C.find("img");
                         D = $("<img/>", {
                             "class": "large-image",
                             css: {
                                 display: "none"
                             },
                             src: B.data("large"),
                             alt: ""
                         }).load(function () {
                             D.css("display", "");
                             B.addClass("small-image")
                         });
                         B.before(D)
                     }
                 },
                 w = function (C, B) {
                     return function (D, E) {
                         D = $(D).data(C);
                         E = $(E).data(C);
                         return (D < E ? -1 : D > E ? 1 : 0) * (B ? -1 : 1)
                     }
                 },
                 v = function (D) {
                     var E = j.val(),
                         B = k.children(),
                         C;
                     if (E != "sort") {
                         if (E == "rating") {
                             C = 1
                         }
                         B = B.sort(w(E, C))
                     }
                     k.justgrid("force", B)
                 },
                 z = function () {
                     var C = $(this),
                         D = "active",
                         E = C.data("target"),
                         B;
                     if (E) {
                         C.parent().addClass(D).siblings().removeClass(D);
                         B = i.filter("[data-filters=" + E + "]").show(300);
                         i.filter("[data-filters]").not(B).hide(300);
                         if (E == ".popular") {
                             y()
                         } else {
                             x(E)
                         }
                     }
                 },
                 y = function () {
                     x(".popular" + h.val() + f.val())
                 },
                 x = function (D) {
                     var C = k.children(D).addClass("select"),
                         B = k.children().not(D).removeClass("select"),
                         E = new TimelineLite();
                     if (B.size()) {
                         E.to(B, 0.3, {
                             css: {
                                 opacity: 0
                             }
                         }).set(B, {
                             css: {
                                 top: 0,
                                 left: -1000
                             }
                         })
                     }
                     E.call(function () {
                         k.justgrid()
                     });
                     if (C.size()) {
                         E.to(C, 0.3, {
                             css: {
                                 opacity: 1
                             }
                         }, 0.7)
                     }
                 },
                 u = function () {
                     var B = $(this),
                         D = new Date(B.data("timer")),
                         C, E, F = setInterval(function () {
                             C = D - new Date();
                             if (C > 0) {
                                 E = C / 1000 | 0;
                                 B.text((E / 60 | 0) + ":" + ("0" + E % 60).slice(-2))
                             } else {
                                 clearInterval(F);
                                 B.parents(".discount").removeClass("discount")
                             }
                         }, 1000)
                 };
             if (!q) {
                 q = {};
                 o.data("menu", q);
                 k.justgrid({
                     speed: e,
                     delay: c,
                     selector: ".menu-item.select",
                     width: 210,
                     gap: 15,
                     tolerance: 100,
                     animation: function () {
                         if (device.phone()) {
                             return "instant"
                         } else {
                             if (device.tablet()) {
                                 return "move"
                             } else {
                                 return "move"
                             }
                         }
                     },
                     isActivate: function () {
                         return !device.phone()
                     },
                     onActivate: function (B) {
                         TweenLite.to(B.find(".menu-item-box"), e, {
                             css: {
                                 width: 435
                             }
                         });
                         widgets.lastview(B.data("id"));
                         widgets.social(B, "like");
                         widgets.socialCurrent(B.data("id"));
                         p(B)
                     },
                     onDeactivate: function (B) {
                         TweenLite.to(B.find(".menu-item-box"), e, {
                             css: {
                                 width: 210
                             }
                         })
                     }
                 });
                 var t = 1,
                     A = setInterval(function () {
                         k.justgrid();
                         if (t-- == 0) {
                             clearInterval(A)
                         }
                     }, 500);
                 b.scroll(function () {
                     var B = b.scrollTop();
                     if (B > 27 && device.desktop()) {
                         l.addClass("fixed")
                     } else {
                         l.removeClass("fixed");
                         r()
                     }
                 });
                 //o.on("mouseenter", ".menu-sections .fixed .nav-sections li a", s);
                 //o.on("mouseleave", ".menu-sections .fixed", r);
                 o.on("mouseenter", ".menu-sections .nav-sections li a", s);
                 o.on("mouseleave", ".menu-sections", r);
                 k.on("click", ".menu-item .cart-add", function () {
                     var B = $(this).disableSelection(),
                         C = widgets.numeric.value(B.parent().next());
                     widgets.cart.add([{
                         Key: B.data("id"),
                         Value: C,
                         Price: B.data("price")
                     }]);
                     if (device.desktop()) {
                         B.meteor({
                             to: $(".cart.lite"),
                             image: B.data("src")
                         })
                     }
                 });
                 j.change(v);
                 n.on("click", "li:not(.active) a", z);
                 f.add(h).change(y);
                 k.children(":not(.select)").css("opacity", 0);
                 k.find("[data-timer]").each(u)
             }
         })
     })();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "minimap";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var c = $(this),
                     d = c.data(b),
                     e = uri.local + "assets/img/yap.png",
                     h, i, f = function () {
                         h = new ymaps.Map(c[0], {
                             center: [d.la, d.lo],
                             zoom: 14
                         });
                         h.behaviors.enable(["multiTouch", "scrollZoom"]);
                         h.controls.add("smallZoomControl", {
                             bottom: 10,
                             left: 10
                         });
                         h.controls.add("trafficControl", {
                             top: 45,
                             right: 10
                         });
                         h.controls.add(new ymaps.control.TypeSelector(["yandex#map", "yandex#hybrid"]), {
                             top: 10,
                             right: 10
                         });
                         i = new ymaps.Placemark([d.la, d.lo], {
                             hintContent: d.title
                         }, {
                             preset: "twirl#redIcon",
                         });
                         h.geoObjects.add(i)
                     };
                 if (!d) {
                     d = {
                         title: c.data("title"),
                         la: parseFloat(c.data("la")),
                         lo: parseFloat(c.data("lo")),
                         height: c.data("height")
                     };
                     c.css("height", d.height);
                     ymaps.ready(f);
                     c.data(b, d)
                 }
             })
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "orders";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var e = $(this),
                     h = e.data(b),
                     c = e.find(".items"),
                     d = e.find(".pagination"),
                     f = "active",
                     i = function () {
                         d.pagination({
                             show: 3,
                             success: j
                         });
                         j();
                         c.delegate("tr:not(." + f + ")", "click", l)
                     },
                     m = function () {
                         c.find("tr").removeClass(f)
                     },
                     l = function (o) {
                         var n = $(this),
                             p = n.data("id");
                         h.current = p;
                         m();
                         n.addClass(f)
                     },
                     j = function (n) {
                         ajax.post({
                             data: {
                                 page: n
                             },
                             url: uri.actions.client.ordersget,
                             success: function (o) {
                                 k(o)
                             }
                         })
                     },
                     k = function (p) {
                         h.list = p;
                         d.pagination({
                             page: p.Page,
                             count: p.PageCount
                         });
                         var o = $.Enumerable.From(h.list.Orders),
                             n = o.Select(function (t) {
                                 var q = $.Enumerable.From(t.OrderDetails).Select(function (u) {
                                         return $("<li/>", {
                                             html: $("<div/>", {
                                                 "class": "line",
                                                 html: $("<div/>", {
                                                     "class": "price",
                                                     html: $("<span/>", {
                                                         text: u.Price
                                                     }).add('<span class="tenge"> тнг. </span>')
                                                 }).add("<span/>", {
                                                     "class": "name",
                                                     text: u.Qty + "x" + (u.Item ? " " + u.Item.Name : "")
                                                 })
                                             })
                                         })[0]
                                     }).TojQuery(),
                                     r, s = function (u, v) {
                                         if (u) {
                                             r = (r || $()).add("<dt/>", {
                                                 text: v
                                             }).add("<dd/>", {
                                                 text: u
                                             })
                                         }
                                     };
                                 s(t.Fio, "Заказчик");
                                 s(t.PhoneString, "Телефон");
                                 if (t.Address) {
                                     s(t.Address.Title, "Адрес")
                                 }
                                 s(t.Remark, "Комментарий");
                                 return $("<tr/>", {
                                     "data-id": t.Id,
                                     html: $("<td/>", {
                                         "class": "hidden-phone",
                                         text: t.CreatedString
                                     }).add("<td/>", {
                                         colspan: 3,
                                         html: $("<div/>", {
                                             "class": "visible-phone",
                                             html: "<span>" + t.CreatedString + " &mdash; " + t.StatusString + "</span>"
                                         }).add("<div/>", {
                                             "class": "state hidden-phone",
                                             text: t.StatusString
                                         }).add("<div/>", {
                                             "class": "amount",
                                             html: "<span>" + t.AmountString + '</span><span class="tenge"> тнг. </span>'
                                         }).add("<h4/>", {
                                             text: t.Code
                                         }).add("<div/>", {
                                             "class": "text",
                                             html: $("<ol/>", {
                                                 html: q
                                             }).add("<dl/>", {
                                                 "class": "dl-horizontal",
                                                 html: r
                                             })
                                         })
                                     })
                                 })[0]
                             }).TojQuery();
                         c.html(n)
                     };
                 if (!h) {
                     h = {};
                     i();
                     e.data(b, h)
                 }
             })
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "profile";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var r = $(this),
                     t = r.data(b),
                     s = "active",
                     i = r.find(".form-fio"),
                     h = i.find('[name="FIO"]'),
                     c = i.find(".btn.savefio"),
                     k = r.find(".form-phone"),
                     n = k.find('[name="Phone"]'),
                     q = k.find('[name="SmsPassword"]'),
                     o = k.find(".phone-group-1"),
                     p = k.find(".phone-group-2"),
                     f = k.find(".btn.sendphone"),
                     e = k.find(".btn.savephone"),
                     j = r.find(".form-pass"),
                     m = j.find('[name="OldPassword"]'),
                     l = j.find('[name="NewPassword"]'),
                     d = j.find(".btn.savepass"),
                     v = function (D) {
                         return D.parents("form").validate().element(D)
                     },
                     x = function () {
                         ajax.post({
                             url: uri.actions.client.profileget,
                             success: y
                         })
                     },
                     y = function (D) {
                         h.val(D.FIO);
                         n.val(D.Phone)
                     },
                     w = function () {
                         if (v(h)) {
                             ajax.post({
                                 data: {
                                     FIO: h.val()
                                 },
                                 url: uri.actions.client.profileset
                             })
                         }
                     },
                     B = function () {
                         if (v(n)) {
                             ajax.post({
                                 data: {
                                     Phone: n.val()
                                 },
                                 url: uri.actions.client.profilesendmessage,
                                 success: C
                             })
                         }
                     },
                     C = function (D) {
                         if (D.Success) {
                             if (p.css("display") == "none") {
                                 p.show("blind")
                             }
                         }
                     },
                     A = function () {
                         if (v(n) && v(q)) {
                             ajax.post({
                                 data: {
                                     Phone: n.val(),
                                     SmsPassword: q.val()
                                 },
                                 url: uri.actions.client.profilechangephone
                             })
                         }
                     },
                     z = function () {
                         if (v(m) && v(l)) {
                             ajax.post({
                                 data: {
                                     OldPassword: m.val(),
                                     NewPassword: l.val()
                                 },
                                 url: uri.actions.client.profilechangepassword
                             })
                         }
                     },
                     u = function (D) {
                         if ((D.keyCode || D.which) == 13) {
                             $(this).blur();
                             D.data();
                             return false
                         }
                     };
                 if (!t) {
                     t = {};
                     c.click(w);
                     f.click(B);
                     e.click(A);
                     d.click(z);
                     h.keypress(w, u);
                     n.keypress(B, u);
                     q.keypress(A, u);
                     m.add(l).keypress(z, u);
                     n.bind("change keyup", function () {
                         var D = o.css("display") == "none";
                         if (v(n)) {
                             if (D) {
                                 o.show("blind")
                             }
                         } else {
                             if (!D) {
                                 o.hide("blind")
                             }
                         }
                     });
                     r.data(b, t);
                     x()
                 }
             })
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "tiles";
     a[b] = {
         init: function () {
             a[b].elements = $("." + b);
             return a[b].elements.each(function () {
                 var c = $(this),
                     e = c.data(b),
                     d = [],
                     h = function (i) {
                         var j = d.length - 3;
                         if (d) {
                             if (j > 0) {
                                 d.splice(0, j)
                             }
                             d.push({
                                 x: i.pageX,
                                 y: i.pageY
                             })
                         }
                     },
                     f = function (k) {
                         var i = $(this),
                             l = k.type,
                             o = i.find(".info"),
                             p = i.offset(),
                             j = d[0],
                             t = i.width(),
                             m = i.height(),
                             u = {},
                             s = 0.3,
                             q = function () {
                                 u.left = (j.x < p.left) ? -t : (j.x > p.left + t) ? t : 0;
                                 u.top = (j.y < p.top) ? -m : (j.y > p.top + m) ? m : 0
                             },
                             r = function () {
                                 new TimelineLite().set(o[0], {
                                     css: {
                                         top: u.top,
                                         left: u.left,
                                         opacity: 0
                                     }
                                 }).to(o[0], s, {
                                     css: {
                                         top: 0,
                                         left: 0,
                                         opacity: 1
                                     }
                                 })
                             },
                             n = function () {
                                 TweenLite.to(o[0], s, {
                                     css: {
                                         top: u.top,
                                         left: u.left,
                                         opacity: 0
                                     }
                                 })
                             };
                         if (!o.length) {
                             return
                         }
                         if (j) {
                             if (l == "mouseenter") {
                                 q();
                                 r()
                             } else {
                                 if (l == "mouseleave") {
                                     setTimeout(function () {
                                         j = d[d.length - 1];
                                         q();
                                         n()
                                     }, 50)
                                 }
                             }
                         } else {
                             u = {
                                 top: 0,
                                 left: 0
                             };
                             if (l == "mouseenter") {
                                 r()
                             } else {
                                 if (l == "mouseleave") {
                                     n()
                                 }
                             }
                         }
                     };
                 if (!e) {
                     e = {};
                     $(document).on("mousemove", h);
                     c.delegate(".tile", "mouseenter mouseleave", f);
                     c.data(b, e)
                 }
             })
         }
     };
     a[b].init();
     return a
 }(widgets || {}));
 var widgets = (function (a) {
     var b = "vacancy";
     a.menu = (function () {
         var c = $("." + b);
         return c.each(function () {
             var j = $(this),
                 k = j.children(".nav"),
                 d = j.children(".tab-content"),
                 e = j.children(".modal"),
                 h = e.find(".save"),
                 f = e.find("form"),
                 i = f.find("[name=vacancyId]"),
                 l = j.data(b),
                 m = function () {
                     ajax.post({
                         url: uri.actions.about.vacancyget,
                         success: function (p) {
                             n(p)
                         }
                     })
                 },
                 n = function (t) {
                     l.list = t;
                     var s = $.Enumerable.From(t),
                         q = s.Select(function (v, u) {
                             return $("<li/>", {
                                 html: $("<a/>", {
                                     "data-toggle": "tab",
                                     "data-target": ".vacancy .tab-" + u,
                                     text: v.Name
                                 })
                             })[0]
                         }).TojQuery(),
                         p = function (u) {
                             return $.Enumerable.From(u).Select(function (w) {
                                 var v = $("<div/>", {
                                     "class": "vacancy-item",
                                     html: $("<h3/>", {
                                         "class": "color-gray-dark",
                                         text: w.Name
                                     }).add('<div class="box">' + w.Requirements + "</div>").add('<div class="box">' + w.Conditions + "</div>").add("<div/>", {
                                         "class": "box",
                                         html: $("<a/>", {
                                             "class": "btn btn-warning",
                                             "data-id": w.Id,
                                             "data-toggle": "modal",
                                             "data-target": ".vacancy .modal",
                                             html: $("<i/>", {
                                                 "class": "icon-thumbs-up icon-white"
                                             }).add("<span/>", {
                                                 style: "margin-left:5px;",
                                                 text: "Отликнуться"
                                             })
                                         })
                                     })
                                 });
                                 if (w.Images.length > 0) {
                                     v.find("h3").after($("<div/>", {
                                         "class": "image",
                                         css: {
                                             "background-image": 'url("' + uri.image.first(w.Images, 180, 180) + '")'
                                         },
                                         html: $("<img/>", {
                                             alt: "",
                                             src: uri.image.first(w.Images, 180, 180)
                                         })
                                     }))
                                 }
                                 return v[0]
                             }).TojQuery()
                         },
                         r = s.Select(function (v, u) {
                             return $("<div/>", {
                                 "class": "tab-pane tab-" + u,
                                 html: p(v.Vacancies)
                             })[0]
                         }).TojQuery();
                     k.html(q).children("li:first").addClass("active");
                     d.loading("destroy");
                     d.html(r).children("div:first").addClass("active")
                 },
                 o = function () {
                     var p = $(this);
                     if (f.valid()) {
                         e.modal("hide")
                     }
                 };
             if (!l) {
                 l = {};
                 h.click(o);
                 j.data(b, l);
                 d.loading();
                 j.delegate("[data-toggle=modal]", "click", function () {
                     i.val($(this).data("id"))
                 })
             }
             m()
         })
     })();
     return a
 }(widgets || {}));