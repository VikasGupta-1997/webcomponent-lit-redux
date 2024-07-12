var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i12 = decorators.length - 1, decorator; i12 >= 0; i12--)
    if (decorator = decorators[i12])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t10, e13, n14) {
    if (this._$cssResult$ = true, n14 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t10, this.t = e13;
  }
  get styleSheet() {
    let t10 = this.o;
    const s13 = this.t;
    if (e && void 0 === t10) {
      const e13 = void 0 !== s13 && 1 === s13.length;
      e13 && (t10 = n.get(s13)), void 0 === t10 && ((this.o = t10 = new CSSStyleSheet()).replaceSync(this.cssText), e13 && n.set(s13, t10));
    }
    return t10;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t10) => new o("string" == typeof t10 ? t10 : t10 + "", void 0, s);
var i = (t10, ...e13) => {
  const n14 = 1 === t10.length ? t10[0] : e13.reduce((e14, s13, n15) => e14 + ((t11) => {
    if (true === t11._$cssResult$)
      return t11.cssText;
    if ("number" == typeof t11)
      return t11;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t11 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s13) + t10[n15 + 1], t10[0]);
  return new o(n14, t10, s);
};
var S = (s13, n14) => {
  e ? s13.adoptedStyleSheets = n14.map((t10) => t10 instanceof CSSStyleSheet ? t10 : t10.styleSheet) : n14.forEach((e13) => {
    const n15 = document.createElement("style"), o13 = t.litNonce;
    void 0 !== o13 && n15.setAttribute("nonce", o13), n15.textContent = e13.cssText, s13.appendChild(n15);
  });
};
var c = e ? (t10) => t10 : (t10) => t10 instanceof CSSStyleSheet ? ((t11) => {
  let e13 = "";
  for (const s13 of t11.cssRules)
    e13 += s13.cssText;
  return r(e13);
})(t10) : t10;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t10, i12) {
  switch (i12) {
    case Boolean:
      t10 = t10 ? h : null;
      break;
    case Object:
    case Array:
      t10 = null == t10 ? t10 : JSON.stringify(t10);
  }
  return t10;
}, fromAttribute(t10, i12) {
  let s13 = t10;
  switch (i12) {
    case Boolean:
      s13 = null !== t10;
      break;
    case Number:
      s13 = null === t10 ? null : Number(t10);
      break;
    case Object:
    case Array:
      try {
        s13 = JSON.parse(t10);
      } catch (t11) {
        s13 = null;
      }
  }
  return s13;
} };
var a = (t10, i12) => i12 !== t10 && (i12 == i12 || t10 == t10);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t10) {
    var i12;
    this.finalize(), (null !== (i12 = this.h) && void 0 !== i12 ? i12 : this.h = []).push(t10);
  }
  static get observedAttributes() {
    this.finalize();
    const t10 = [];
    return this.elementProperties.forEach((i12, s13) => {
      const e13 = this._$Ep(s13, i12);
      void 0 !== e13 && (this._$Ev.set(e13, s13), t10.push(e13));
    }), t10;
  }
  static createProperty(t10, i12 = l) {
    if (i12.state && (i12.attribute = false), this.finalize(), this.elementProperties.set(t10, i12), !i12.noAccessor && !this.prototype.hasOwnProperty(t10)) {
      const s13 = "symbol" == typeof t10 ? Symbol() : "__" + t10, e13 = this.getPropertyDescriptor(t10, s13, i12);
      void 0 !== e13 && Object.defineProperty(this.prototype, t10, e13);
    }
  }
  static getPropertyDescriptor(t10, i12, s13) {
    return { get() {
      return this[i12];
    }, set(e13) {
      const r9 = this[t10];
      this[i12] = e13, this.requestUpdate(t10, r9, s13);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t10) {
    return this.elementProperties.get(t10) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t10 = Object.getPrototypeOf(this);
    if (t10.finalize(), void 0 !== t10.h && (this.h = [...t10.h]), this.elementProperties = new Map(t10.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t11 = this.properties, i12 = [...Object.getOwnPropertyNames(t11), ...Object.getOwnPropertySymbols(t11)];
      for (const s13 of i12)
        this.createProperty(s13, t11[s13]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i12) {
    const s13 = [];
    if (Array.isArray(i12)) {
      const e13 = new Set(i12.flat(1 / 0).reverse());
      for (const i13 of e13)
        s13.unshift(c(i13));
    } else
      void 0 !== i12 && s13.push(c(i12));
    return s13;
  }
  static _$Ep(t10, i12) {
    const s13 = i12.attribute;
    return false === s13 ? void 0 : "string" == typeof s13 ? s13 : "string" == typeof t10 ? t10.toLowerCase() : void 0;
  }
  u() {
    var t10;
    this._$E_ = new Promise((t11) => this.enableUpdating = t11), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t10 = this.constructor.h) || void 0 === t10 || t10.forEach((t11) => t11(this));
  }
  addController(t10) {
    var i12, s13;
    (null !== (i12 = this._$ES) && void 0 !== i12 ? i12 : this._$ES = []).push(t10), void 0 !== this.renderRoot && this.isConnected && (null === (s13 = t10.hostConnected) || void 0 === s13 || s13.call(t10));
  }
  removeController(t10) {
    var i12;
    null === (i12 = this._$ES) || void 0 === i12 || i12.splice(this._$ES.indexOf(t10) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t10, i12) => {
      this.hasOwnProperty(i12) && (this._$Ei.set(i12, this[i12]), delete this[i12]);
    });
  }
  createRenderRoot() {
    var t10;
    const s13 = null !== (t10 = this.shadowRoot) && void 0 !== t10 ? t10 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s13, this.constructor.elementStyles), s13;
  }
  connectedCallback() {
    var t10;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t10 = this._$ES) || void 0 === t10 || t10.forEach((t11) => {
      var i12;
      return null === (i12 = t11.hostConnected) || void 0 === i12 ? void 0 : i12.call(t11);
    });
  }
  enableUpdating(t10) {
  }
  disconnectedCallback() {
    var t10;
    null === (t10 = this._$ES) || void 0 === t10 || t10.forEach((t11) => {
      var i12;
      return null === (i12 = t11.hostDisconnected) || void 0 === i12 ? void 0 : i12.call(t11);
    });
  }
  attributeChangedCallback(t10, i12, s13) {
    this._$AK(t10, s13);
  }
  _$EO(t10, i12, s13 = l) {
    var e13;
    const r9 = this.constructor._$Ep(t10, s13);
    if (void 0 !== r9 && true === s13.reflect) {
      const h8 = (void 0 !== (null === (e13 = s13.converter) || void 0 === e13 ? void 0 : e13.toAttribute) ? s13.converter : n2).toAttribute(i12, s13.type);
      this._$El = t10, null == h8 ? this.removeAttribute(r9) : this.setAttribute(r9, h8), this._$El = null;
    }
  }
  _$AK(t10, i12) {
    var s13;
    const e13 = this.constructor, r9 = e13._$Ev.get(t10);
    if (void 0 !== r9 && this._$El !== r9) {
      const t11 = e13.getPropertyOptions(r9), h8 = "function" == typeof t11.converter ? { fromAttribute: t11.converter } : void 0 !== (null === (s13 = t11.converter) || void 0 === s13 ? void 0 : s13.fromAttribute) ? t11.converter : n2;
      this._$El = r9, this[r9] = h8.fromAttribute(i12, t11.type), this._$El = null;
    }
  }
  requestUpdate(t10, i12, s13) {
    let e13 = true;
    void 0 !== t10 && (((s13 = s13 || this.constructor.getPropertyOptions(t10)).hasChanged || a)(this[t10], i12) ? (this._$AL.has(t10) || this._$AL.set(t10, i12), true === s13.reflect && this._$El !== t10 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t10, s13))) : e13 = false), !this.isUpdatePending && e13 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t11) {
      Promise.reject(t11);
    }
    const t10 = this.scheduleUpdate();
    return null != t10 && await t10, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t10;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t11, i13) => this[i13] = t11), this._$Ei = void 0);
    let i12 = false;
    const s13 = this._$AL;
    try {
      i12 = this.shouldUpdate(s13), i12 ? (this.willUpdate(s13), null === (t10 = this._$ES) || void 0 === t10 || t10.forEach((t11) => {
        var i13;
        return null === (i13 = t11.hostUpdate) || void 0 === i13 ? void 0 : i13.call(t11);
      }), this.update(s13)) : this._$Ek();
    } catch (t11) {
      throw i12 = false, this._$Ek(), t11;
    }
    i12 && this._$AE(s13);
  }
  willUpdate(t10) {
  }
  _$AE(t10) {
    var i12;
    null === (i12 = this._$ES) || void 0 === i12 || i12.forEach((t11) => {
      var i13;
      return null === (i13 = t11.hostUpdated) || void 0 === i13 ? void 0 : i13.call(t11);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t10)), this.updated(t10);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t10) {
    return true;
  }
  update(t10) {
    void 0 !== this._$EC && (this._$EC.forEach((t11, i12) => this._$EO(i12, this[i12], t11)), this._$EC = void 0), this._$Ek();
  }
  updated(t10) {
  }
  firstUpdated(t10) {
  }
};
d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.1");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t10) => t10 }) : void 0;
var o3 = "$lit$";
var n3 = `lit$${(Math.random() + "").slice(9)}$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var d2 = () => r3.createComment("");
var u = (t10) => null === t10 || "object" != typeof t10 && "function" != typeof t10;
var c2 = Array.isArray;
var v = (t10) => c2(t10) || "function" == typeof (null == t10 ? void 0 : t10[Symbol.iterator]);
var a2 = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t10) => (i12, ...s13) => ({ _$litType$: t10, strings: i12, values: s13 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129, null, false);
var P = (t10, i12) => {
  const s13 = t10.length - 1, l13 = [];
  let r9, d6 = 2 === i12 ? "<svg>" : "", u8 = f;
  for (let i13 = 0; i13 < s13; i13++) {
    const s14 = t10[i13];
    let e13, c11, v4 = -1, a7 = 0;
    for (; a7 < s14.length && (u8.lastIndex = a7, c11 = u8.exec(s14), null !== c11); )
      a7 = u8.lastIndex, u8 === f ? "!--" === c11[1] ? u8 = _ : void 0 !== c11[1] ? u8 = m : void 0 !== c11[2] ? (y.test(c11[2]) && (r9 = RegExp("</" + c11[2], "g")), u8 = p) : void 0 !== c11[3] && (u8 = p) : u8 === p ? ">" === c11[0] ? (u8 = null != r9 ? r9 : f, v4 = -1) : void 0 === c11[1] ? v4 = -2 : (v4 = u8.lastIndex - c11[2].length, e13 = c11[1], u8 = void 0 === c11[3] ? p : '"' === c11[3] ? $ : g) : u8 === $ || u8 === g ? u8 = p : u8 === _ || u8 === m ? u8 = f : (u8 = p, r9 = void 0);
    const w5 = u8 === p && t10[i13 + 1].startsWith("/>") ? " " : "";
    d6 += u8 === f ? s14 + h2 : v4 >= 0 ? (l13.push(e13), s14.slice(0, v4) + o3 + s14.slice(v4) + n3 + w5) : s14 + n3 + (-2 === v4 ? (l13.push(void 0), i13) : w5);
  }
  const c10 = d6 + (t10[s13] || "<?>") + (2 === i12 ? "</svg>" : "");
  if (!Array.isArray(t10) || !t10.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3 ? e3.createHTML(c10) : c10, l13];
};
var V = class {
  constructor({ strings: t10, _$litType$: i12 }, e13) {
    let h8;
    this.parts = [];
    let r9 = 0, u8 = 0;
    const c10 = t10.length - 1, v4 = this.parts, [a7, f7] = P(t10, i12);
    if (this.el = V.createElement(a7, e13), C.currentNode = this.el.content, 2 === i12) {
      const t11 = this.el.content, i13 = t11.firstChild;
      i13.remove(), t11.append(...i13.childNodes);
    }
    for (; null !== (h8 = C.nextNode()) && v4.length < c10; ) {
      if (1 === h8.nodeType) {
        if (h8.hasAttributes()) {
          const t11 = [];
          for (const i13 of h8.getAttributeNames())
            if (i13.endsWith(o3) || i13.startsWith(n3)) {
              const s13 = f7[u8++];
              if (t11.push(i13), void 0 !== s13) {
                const t12 = h8.getAttribute(s13.toLowerCase() + o3).split(n3), i14 = /([.?@])?(.*)/.exec(s13);
                v4.push({ type: 1, index: r9, name: i14[2], strings: t12, ctor: "." === i14[1] ? k : "?" === i14[1] ? I : "@" === i14[1] ? L : R });
              } else
                v4.push({ type: 6, index: r9 });
            }
          for (const i13 of t11)
            h8.removeAttribute(i13);
        }
        if (y.test(h8.tagName)) {
          const t11 = h8.textContent.split(n3), i13 = t11.length - 1;
          if (i13 > 0) {
            h8.textContent = s3 ? s3.emptyScript : "";
            for (let s13 = 0; s13 < i13; s13++)
              h8.append(t11[s13], d2()), C.nextNode(), v4.push({ type: 2, index: ++r9 });
            h8.append(t11[i13], d2());
          }
        }
      } else if (8 === h8.nodeType)
        if (h8.data === l2)
          v4.push({ type: 2, index: r9 });
        else {
          let t11 = -1;
          for (; -1 !== (t11 = h8.data.indexOf(n3, t11 + 1)); )
            v4.push({ type: 7, index: r9 }), t11 += n3.length - 1;
        }
      r9++;
    }
  }
  static createElement(t10, i12) {
    const s13 = r3.createElement("template");
    return s13.innerHTML = t10, s13;
  }
};
function N(t10, i12, s13 = t10, e13) {
  var o13, n14, l13, h8;
  if (i12 === T)
    return i12;
  let r9 = void 0 !== e13 ? null === (o13 = s13._$Co) || void 0 === o13 ? void 0 : o13[e13] : s13._$Cl;
  const d6 = u(i12) ? void 0 : i12._$litDirective$;
  return (null == r9 ? void 0 : r9.constructor) !== d6 && (null === (n14 = null == r9 ? void 0 : r9._$AO) || void 0 === n14 || n14.call(r9, false), void 0 === d6 ? r9 = void 0 : (r9 = new d6(t10), r9._$AT(t10, s13, e13)), void 0 !== e13 ? (null !== (l13 = (h8 = s13)._$Co) && void 0 !== l13 ? l13 : h8._$Co = [])[e13] = r9 : s13._$Cl = r9), void 0 !== r9 && (i12 = N(t10, r9._$AS(t10, i12.values), r9, e13)), i12;
}
var S2 = class {
  constructor(t10, i12) {
    this._$AV = [], this._$AN = void 0, this._$AD = t10, this._$AM = i12;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t10) {
    var i12;
    const { el: { content: s13 }, parts: e13 } = this._$AD, o13 = (null !== (i12 = null == t10 ? void 0 : t10.creationScope) && void 0 !== i12 ? i12 : r3).importNode(s13, true);
    C.currentNode = o13;
    let n14 = C.nextNode(), l13 = 0, h8 = 0, d6 = e13[0];
    for (; void 0 !== d6; ) {
      if (l13 === d6.index) {
        let i13;
        2 === d6.type ? i13 = new M(n14, n14.nextSibling, this, t10) : 1 === d6.type ? i13 = new d6.ctor(n14, d6.name, d6.strings, this, t10) : 6 === d6.type && (i13 = new z(n14, this, t10)), this._$AV.push(i13), d6 = e13[++h8];
      }
      l13 !== (null == d6 ? void 0 : d6.index) && (n14 = C.nextNode(), l13++);
    }
    return o13;
  }
  v(t10) {
    let i12 = 0;
    for (const s13 of this._$AV)
      void 0 !== s13 && (void 0 !== s13.strings ? (s13._$AI(t10, s13, i12), i12 += s13.strings.length - 2) : s13._$AI(t10[i12])), i12++;
  }
};
var M = class {
  constructor(t10, i12, s13, e13) {
    var o13;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t10, this._$AB = i12, this._$AM = s13, this.options = e13, this._$Cp = null === (o13 = null == e13 ? void 0 : e13.isConnected) || void 0 === o13 || o13;
  }
  get _$AU() {
    var t10, i12;
    return null !== (i12 = null === (t10 = this._$AM) || void 0 === t10 ? void 0 : t10._$AU) && void 0 !== i12 ? i12 : this._$Cp;
  }
  get parentNode() {
    let t10 = this._$AA.parentNode;
    const i12 = this._$AM;
    return void 0 !== i12 && 11 === (null == t10 ? void 0 : t10.nodeType) && (t10 = i12.parentNode), t10;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t10, i12 = this) {
    t10 = N(this, t10, i12), u(t10) ? t10 === A || null == t10 || "" === t10 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t10 !== this._$AH && t10 !== T && this._(t10) : void 0 !== t10._$litType$ ? this.g(t10) : void 0 !== t10.nodeType ? this.$(t10) : v(t10) ? this.T(t10) : this._(t10);
  }
  k(t10) {
    return this._$AA.parentNode.insertBefore(t10, this._$AB);
  }
  $(t10) {
    this._$AH !== t10 && (this._$AR(), this._$AH = this.k(t10));
  }
  _(t10) {
    this._$AH !== A && u(this._$AH) ? this._$AA.nextSibling.data = t10 : this.$(r3.createTextNode(t10)), this._$AH = t10;
  }
  g(t10) {
    var i12;
    const { values: s13, _$litType$: e13 } = t10, o13 = "number" == typeof e13 ? this._$AC(t10) : (void 0 === e13.el && (e13.el = V.createElement(e13.h, this.options)), e13);
    if ((null === (i12 = this._$AH) || void 0 === i12 ? void 0 : i12._$AD) === o13)
      this._$AH.v(s13);
    else {
      const t11 = new S2(o13, this), i13 = t11.u(this.options);
      t11.v(s13), this.$(i13), this._$AH = t11;
    }
  }
  _$AC(t10) {
    let i12 = E.get(t10.strings);
    return void 0 === i12 && E.set(t10.strings, i12 = new V(t10)), i12;
  }
  T(t10) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i12 = this._$AH;
    let s13, e13 = 0;
    for (const o13 of t10)
      e13 === i12.length ? i12.push(s13 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s13 = i12[e13], s13._$AI(o13), e13++;
    e13 < i12.length && (this._$AR(s13 && s13._$AB.nextSibling, e13), i12.length = e13);
  }
  _$AR(t10 = this._$AA.nextSibling, i12) {
    var s13;
    for (null === (s13 = this._$AP) || void 0 === s13 || s13.call(this, false, true, i12); t10 && t10 !== this._$AB; ) {
      const i13 = t10.nextSibling;
      t10.remove(), t10 = i13;
    }
  }
  setConnected(t10) {
    var i12;
    void 0 === this._$AM && (this._$Cp = t10, null === (i12 = this._$AP) || void 0 === i12 || i12.call(this, t10));
  }
};
var R = class {
  constructor(t10, i12, s13, e13, o13) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t10, this.name = i12, this._$AM = e13, this.options = o13, s13.length > 2 || "" !== s13[0] || "" !== s13[1] ? (this._$AH = Array(s13.length - 1).fill(new String()), this.strings = s13) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t10, i12 = this, s13, e13) {
    const o13 = this.strings;
    let n14 = false;
    if (void 0 === o13)
      t10 = N(this, t10, i12, 0), n14 = !u(t10) || t10 !== this._$AH && t10 !== T, n14 && (this._$AH = t10);
    else {
      const e14 = t10;
      let l13, h8;
      for (t10 = o13[0], l13 = 0; l13 < o13.length - 1; l13++)
        h8 = N(this, e14[s13 + l13], i12, l13), h8 === T && (h8 = this._$AH[l13]), n14 || (n14 = !u(h8) || h8 !== this._$AH[l13]), h8 === A ? t10 = A : t10 !== A && (t10 += (null != h8 ? h8 : "") + o13[l13 + 1]), this._$AH[l13] = h8;
    }
    n14 && !e13 && this.j(t10);
  }
  j(t10) {
    t10 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t10 ? t10 : "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t10) {
    this.element[this.name] = t10 === A ? void 0 : t10;
  }
};
var H = s3 ? s3.emptyScript : "";
var I = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t10) {
    t10 && t10 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
  }
};
var L = class extends R {
  constructor(t10, i12, s13, e13, o13) {
    super(t10, i12, s13, e13, o13), this.type = 5;
  }
  _$AI(t10, i12 = this) {
    var s13;
    if ((t10 = null !== (s13 = N(this, t10, i12, 0)) && void 0 !== s13 ? s13 : A) === T)
      return;
    const e13 = this._$AH, o13 = t10 === A && e13 !== A || t10.capture !== e13.capture || t10.once !== e13.once || t10.passive !== e13.passive, n14 = t10 !== A && (e13 === A || o13);
    o13 && this.element.removeEventListener(this.name, this, e13), n14 && this.element.addEventListener(this.name, this, t10), this._$AH = t10;
  }
  handleEvent(t10) {
    var i12, s13;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s13 = null === (i12 = this.options) || void 0 === i12 ? void 0 : i12.host) && void 0 !== s13 ? s13 : this.element, t10) : this._$AH.handleEvent(t10);
  }
};
var z = class {
  constructor(t10, i12, s13) {
    this.element = t10, this.type = 6, this._$AN = void 0, this._$AM = i12, this.options = s13;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t10) {
    N(this, t10);
  }
};
var Z = { O: o3, P: n3, A: l2, C: 1, M: P, L: S2, D: v, R: N, I: M, V: R, H: I, N: L, U: k, F: z };
var j = i2.litHtmlPolyfillSupport;
null == j || j(V, M), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.7.3");
var B = (t10, i12, s13) => {
  var e13, o13;
  const n14 = null !== (e13 = null == s13 ? void 0 : s13.renderBefore) && void 0 !== e13 ? e13 : i12;
  let l13 = n14._$litPart$;
  if (void 0 === l13) {
    const t11 = null !== (o13 = null == s13 ? void 0 : s13.renderBefore) && void 0 !== o13 ? o13 : null;
    n14._$litPart$ = l13 = new M(i12.insertBefore(d2(), t11), t11, void 0, null != s13 ? s13 : {});
  }
  return l13._$AI(t10), l13;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t10, e13;
    const i12 = super.createRenderRoot();
    return null !== (t10 = (e13 = this.renderOptions).renderBefore) && void 0 !== t10 || (e13.renderBefore = i12.firstChild), i12;
  }
  update(t10) {
    const i12 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t10), this._$Do = B(i12, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t10;
    super.connectedCallback(), null === (t10 = this._$Do) || void 0 === t10 || t10.setConnected(true);
  }
  disconnectedCallback() {
    var t10;
    super.disconnectedCallback(), null === (t10 = this._$Do) || void 0 === t10 || t10.setConnected(false);
  }
  render() {
    return T;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.2");

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i12, e13) => "method" === e13.kind && e13.descriptor && !("value" in e13.descriptor) ? { ...e13, finisher(n14) {
  n14.createProperty(e13.key, i12);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e13.key, initializer() {
  "function" == typeof e13.initializer && (this[e13.key] = e13.initializer.call(this));
}, finisher(n14) {
  n14.createProperty(e13.key, i12);
} };
function e4(e13) {
  return (n14, t10) => void 0 !== t10 ? ((i12, e14, n15) => {
    e14.constructor.createProperty(n15, i12);
  })(e13, n14, t10) : i3(e13, n14);
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n5;
var e5 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o13, n14) => o13.assignedElements(n14) : (o13, n14) => o13.assignedNodes(n14).filter((o14) => o14.nodeType === Node.ELEMENT_NODE);

// src/utilities/locationController.ts
var goTo = (path) => {
  const state = {};
  window.history.pushState(state, "", path);
  const e13 = new PopStateEvent("popstate", { state });
  window.dispatchEvent(e13);
};
var LocationController = class {
  constructor(host) {
    this.listener = (e13) => {
      var _a21;
      (_a21 = this.handler) == null ? void 0 : _a21.call(this, location, e13.state);
      this.host.requestUpdate();
    };
    this.host = host;
    host.addController(this);
    window.addEventListener("popstate", this.listener);
  }
  setLocationChangeHandler(handler) {
    this.handler = handler == null ? void 0 : handler.bind(this.host);
  }
  goTo(path) {
    goTo(path);
  }
  hostDisconnected() {
    window.removeEventListener("popstate", this.listener);
  }
};

// src/polyfills/polyfillsLoader.ts
async function LoadPolyfillsIfNeeded() {
  if (!(globalThis && "URLPattern" in globalThis)) {
    const path = "/scripts/polyfills/urlpatternPolyfill.js";
    await import(path);
  }
}
var polyfillsLoaded = LoadPolyfillsIfNeeded();

// node_modules/lit-html/directive-helpers.js
var { I: l5 } = Z;
var t3 = (o13) => null === o13 || "object" != typeof o13 && "function" != typeof o13;
var e6 = (o13) => void 0 === o13.strings;
var c3 = () => document.createComment("");
var r4 = (o13, t10, i12) => {
  var n14;
  const d6 = o13._$AA.parentNode, v4 = void 0 === t10 ? o13._$AB : t10._$AA;
  if (void 0 === i12) {
    const t11 = d6.insertBefore(c3(), v4), n15 = d6.insertBefore(c3(), v4);
    i12 = new l5(t11, n15, o13, o13.options);
  } else {
    const l13 = i12._$AB.nextSibling, t11 = i12._$AM, e13 = t11 !== o13;
    if (e13) {
      let l14;
      null === (n14 = i12._$AQ) || void 0 === n14 || n14.call(i12, o13), i12._$AM = o13, void 0 !== i12._$AP && (l14 = o13._$AU) !== t11._$AU && i12._$AP(l14);
    }
    if (l13 !== v4 || e13) {
      let o14 = i12._$AA;
      for (; o14 !== l13; ) {
        const l14 = o14.nextSibling;
        d6.insertBefore(o14, v4), o14 = l14;
      }
    }
  }
  return i12;
};
var u2 = (o13, l13, t10 = o13) => (o13._$AI(l13, t10), o13);
var f2 = {};
var s5 = (o13, l13 = f2) => o13._$AH = l13;
var m2 = (o13) => o13._$AH;
var p2 = (o13) => {
  var l13;
  null === (l13 = o13._$AP) || void 0 === l13 || l13.call(o13, false, true);
  let t10 = o13._$AA;
  const i12 = o13._$AB.nextSibling;
  for (; t10 !== i12; ) {
    const o14 = t10.nextSibling;
    t10.remove(), t10 = o14;
  }
};

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t10) => (...e13) => ({ _$litDirective$: t10, values: e13 });
var i4 = class {
  constructor(t10) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t10, e13, i12) {
    this._$Ct = t10, this._$AM = e13, this._$Ci = i12;
  }
  _$AS(t10, e13) {
    return this.update(t10, e13);
  }
  update(t10, e13) {
    return this.render(...e13);
  }
};

// node_modules/lit-html/async-directive.js
var s6 = (i12, t10) => {
  var e13, o13;
  const r9 = i12._$AN;
  if (void 0 === r9)
    return false;
  for (const i13 of r9)
    null === (o13 = (e13 = i13)._$AO) || void 0 === o13 || o13.call(e13, t10, false), s6(i13, t10);
  return true;
};
var o6 = (i12) => {
  let t10, e13;
  do {
    if (void 0 === (t10 = i12._$AM))
      break;
    e13 = t10._$AN, e13.delete(i12), i12 = t10;
  } while (0 === (null == e13 ? void 0 : e13.size));
};
var r5 = (i12) => {
  for (let t10; t10 = i12._$AM; i12 = t10) {
    let e13 = t10._$AN;
    if (void 0 === e13)
      t10._$AN = e13 = /* @__PURE__ */ new Set();
    else if (e13.has(i12))
      break;
    e13.add(i12), l6(t10);
  }
};
function n6(i12) {
  void 0 !== this._$AN ? (o6(this), this._$AM = i12, r5(this)) : this._$AM = i12;
}
function h3(i12, t10 = false, e13 = 0) {
  const r9 = this._$AH, n14 = this._$AN;
  if (void 0 !== n14 && 0 !== n14.size)
    if (t10)
      if (Array.isArray(r9))
        for (let i13 = e13; i13 < r9.length; i13++)
          s6(r9[i13], false), o6(r9[i13]);
      else
        null != r9 && (s6(r9, false), o6(r9));
    else
      s6(this, i12);
}
var l6 = (i12) => {
  var t10, s13, o13, r9;
  i12.type == t4.CHILD && (null !== (t10 = (o13 = i12)._$AP) && void 0 !== t10 || (o13._$AP = h3), null !== (s13 = (r9 = i12)._$AQ) && void 0 !== s13 || (r9._$AQ = n6));
};
var c4 = class extends i4 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i12, t10, e13) {
    super._$AT(i12, t10, e13), r5(this), this.isConnected = i12._$AU;
  }
  _$AO(i12, t10 = true) {
    var e13, r9;
    i12 !== this.isConnected && (this.isConnected = i12, i12 ? null === (e13 = this.reconnected) || void 0 === e13 || e13.call(this) : null === (r9 = this.disconnected) || void 0 === r9 || r9.call(this)), t10 && (s6(this, i12), o6(this));
  }
  setValue(t10) {
    if (e6(this._$Ct))
      this._$Ct._$AI(t10, this);
    else {
      const i12 = [...this._$Ct._$AH];
      i12[this._$Ci] = t10, this._$Ct._$AI(i12, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/private-async-helpers.js
var s7 = class {
  constructor(t10) {
    this.G = t10;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t10) {
    this.G = t10;
  }
  deref() {
    return this.G;
  }
};
var i5 = class {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    var t10;
    null !== (t10 = this.Y) && void 0 !== t10 || (this.Y = new Promise((t11) => this.Z = t11));
  }
  resume() {
    var t10;
    null === (t10 = this.Z) || void 0 === t10 || t10.call(this), this.Y = this.Z = void 0;
  }
};

// node_modules/lit-html/directives/until.js
var n7 = (t10) => !t3(t10) && "function" == typeof t10.then;
var h4 = 1073741823;
var c5 = class extends c4 {
  constructor() {
    super(...arguments), this._$C_t = h4, this._$Cwt = [], this._$Cq = new s7(this), this._$CK = new i5();
  }
  render(...s13) {
    var i12;
    return null !== (i12 = s13.find((t10) => !n7(t10))) && void 0 !== i12 ? i12 : T;
  }
  update(s13, i12) {
    const r9 = this._$Cwt;
    let e13 = r9.length;
    this._$Cwt = i12;
    const o13 = this._$Cq, c10 = this._$CK;
    this.isConnected || this.disconnected();
    for (let t10 = 0; t10 < i12.length && !(t10 > this._$C_t); t10++) {
      const s14 = i12[t10];
      if (!n7(s14))
        return this._$C_t = t10, s14;
      t10 < e13 && s14 === r9[t10] || (this._$C_t = h4, e13 = 0, Promise.resolve(s14).then(async (t11) => {
        for (; c10.get(); )
          await c10.get();
        const i13 = o13.deref();
        if (void 0 !== i13) {
          const r10 = i13._$Cwt.indexOf(s14);
          r10 > -1 && r10 < i13._$C_t && (i13._$C_t = r10, i13.setValue(t11));
        }
      }));
    }
    return T;
  }
  disconnected() {
    this._$Cq.disconnect(), this._$CK.pause();
  }
  reconnected() {
    this._$Cq.reconnect(this), this._$CK.resume();
  }
};
var m3 = e7(c5);

// src/utilities/router.ts
var Router = class {
  constructor(routes, notFoundPage, loadingPage) {
    this.routeMap = /* @__PURE__ */ new Map();
    this.loadingPage = loadingPage || x`<span>Loading...</span>`;
    this.ready = this.init(routes, notFoundPage);
  }
  async init(routes, notFoundPage) {
    await polyfillsLoaded;
    if (routes)
      for (const r9 in routes) {
        this.routeMap.set(new URLPattern(r9, window.location.origin), routes[r9]);
      }
    this.routeMap.set(
      new URLPattern({
        pathname: "*",
        search: "*",
        baseURL: location.origin
      }),
      notFoundPage || x``
    );
  }
  async matchWhenReady() {
    await this.ready;
    const url = window.location.toString();
    for (const [pattern, handler] of this.routeMap) {
      const patternResult = pattern.exec(url);
      if (!patternResult)
        continue;
      return typeof handler === "function" ? handler(patternResult) : handler;
    }
  }
  matchRoute() {
    return m3(this.matchWhenReady(), this.loadingPage);
  }
};

// node_modules/pwa-helpers/connect-mixin.js
var connect = (store2) => (baseElement) => class extends baseElement {
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._storeUnsubscribe = store2.subscribe(() => this.stateChanged(store2.getState()));
    this.stateChanged(store2.getState());
  }
  disconnectedCallback() {
    this._storeUnsubscribe();
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }
  /**
   * The `stateChanged(state)` method will be called when the state is updated.
   */
  stateChanged(_state) {
  }
};

// src/components/shared-styles/styles.ts
var rootStyles = i`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
`;

// node_modules/immer/dist/immer.esm.mjs
function n8(n14) {
  for (var r9 = arguments.length, t10 = Array(r9 > 1 ? r9 - 1 : 0), e13 = 1; e13 < r9; e13++)
    t10[e13 - 1] = arguments[e13];
  if (true) {
    var i12 = Y[n14], o13 = i12 ? "function" == typeof i12 ? i12.apply(null, t10) : i12 : "unknown error nr: " + n14;
    throw Error("[Immer] " + o13);
  }
  throw Error("[Immer] minified error nr: " + n14 + (t10.length ? " " + t10.map(function(n15) {
    return "'" + n15 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r6(n14) {
  return !!n14 && !!n14[Q];
}
function t5(n14) {
  var r9;
  return !!n14 && (function(n15) {
    if (!n15 || "object" != typeof n15)
      return false;
    var r10 = Object.getPrototypeOf(n15);
    if (null === r10)
      return true;
    var t10 = Object.hasOwnProperty.call(r10, "constructor") && r10.constructor;
    return t10 === Object || "function" == typeof t10 && Function.toString.call(t10) === Z2;
  }(n14) || Array.isArray(n14) || !!n14[L2] || !!(null === (r9 = n14.constructor) || void 0 === r9 ? void 0 : r9[L2]) || s8(n14) || v2(n14));
}
function i6(n14, r9, t10) {
  void 0 === t10 && (t10 = false), 0 === o7(n14) ? (t10 ? Object.keys : nn)(n14).forEach(function(e13) {
    t10 && "symbol" == typeof e13 || r9(e13, n14[e13], n14);
  }) : n14.forEach(function(t11, e13) {
    return r9(e13, t11, n14);
  });
}
function o7(n14) {
  var r9 = n14[Q];
  return r9 ? r9.i > 3 ? r9.i - 4 : r9.i : Array.isArray(n14) ? 1 : s8(n14) ? 2 : v2(n14) ? 3 : 0;
}
function u3(n14, r9) {
  return 2 === o7(n14) ? n14.has(r9) : Object.prototype.hasOwnProperty.call(n14, r9);
}
function a3(n14, r9) {
  return 2 === o7(n14) ? n14.get(r9) : n14[r9];
}
function f3(n14, r9, t10) {
  var e13 = o7(n14);
  2 === e13 ? n14.set(r9, t10) : 3 === e13 ? n14.add(t10) : n14[r9] = t10;
}
function c6(n14, r9) {
  return n14 === r9 ? 0 !== n14 || 1 / n14 == 1 / r9 : n14 != n14 && r9 != r9;
}
function s8(n14) {
  return X && n14 instanceof Map;
}
function v2(n14) {
  return q && n14 instanceof Set;
}
function p3(n14) {
  return n14.o || n14.t;
}
function l7(n14) {
  if (Array.isArray(n14))
    return Array.prototype.slice.call(n14);
  var r9 = rn(n14);
  delete r9[Q];
  for (var t10 = nn(r9), e13 = 0; e13 < t10.length; e13++) {
    var i12 = t10[e13], o13 = r9[i12];
    false === o13.writable && (o13.writable = true, o13.configurable = true), (o13.get || o13.set) && (r9[i12] = { configurable: true, writable: true, enumerable: o13.enumerable, value: n14[i12] });
  }
  return Object.create(Object.getPrototypeOf(n14), r9);
}
function d3(n14, e13) {
  return void 0 === e13 && (e13 = false), y2(n14) || r6(n14) || !t5(n14) || (o7(n14) > 1 && (n14.set = n14.add = n14.clear = n14.delete = h5), Object.freeze(n14), e13 && i6(n14, function(n15, r9) {
    return d3(r9, true);
  }, true)), n14;
}
function h5() {
  n8(2);
}
function y2(n14) {
  return null == n14 || "object" != typeof n14 || Object.isFrozen(n14);
}
function b2(r9) {
  var t10 = tn[r9];
  return t10 || n8(18, r9), t10;
}
function m4(n14, r9) {
  tn[n14] || (tn[n14] = r9);
}
function _2() {
  return U || n8(0), U;
}
function j2(n14, r9) {
  r9 && (b2("Patches"), n14.u = [], n14.s = [], n14.v = r9);
}
function g2(n14) {
  O(n14), n14.p.forEach(S3), n14.p = null;
}
function O(n14) {
  n14 === U && (U = n14.l);
}
function w2(n14) {
  return U = { p: [], l: U, h: n14, m: true, _: 0 };
}
function S3(n14) {
  var r9 = n14[Q];
  0 === r9.i || 1 === r9.i ? r9.j() : r9.g = true;
}
function P2(r9, e13) {
  e13._ = e13.p.length;
  var i12 = e13.p[0], o13 = void 0 !== r9 && r9 !== i12;
  return e13.h.O || b2("ES5").S(e13, r9, o13), o13 ? (i12[Q].P && (g2(e13), n8(4)), t5(r9) && (r9 = M2(e13, r9), e13.l || x2(e13, r9)), e13.u && b2("Patches").M(i12[Q].t, r9, e13.u, e13.s)) : r9 = M2(e13, i12, []), g2(e13), e13.u && e13.v(e13.u, e13.s), r9 !== H2 ? r9 : void 0;
}
function M2(n14, r9, t10) {
  if (y2(r9))
    return r9;
  var e13 = r9[Q];
  if (!e13)
    return i6(r9, function(i12, o14) {
      return A2(n14, e13, r9, i12, o14, t10);
    }, true), r9;
  if (e13.A !== n14)
    return r9;
  if (!e13.P)
    return x2(n14, e13.t, true), e13.t;
  if (!e13.I) {
    e13.I = true, e13.A._--;
    var o13 = 4 === e13.i || 5 === e13.i ? e13.o = l7(e13.k) : e13.o, u8 = o13, a7 = false;
    3 === e13.i && (u8 = new Set(o13), o13.clear(), a7 = true), i6(u8, function(r10, i12) {
      return A2(n14, e13, o13, r10, i12, t10, a7);
    }), x2(n14, o13, false), t10 && n14.u && b2("Patches").N(e13, t10, n14.u, n14.s);
  }
  return e13.o;
}
function A2(e13, i12, o13, a7, c10, s13, v4) {
  if (c10 === o13 && n8(5), r6(c10)) {
    var p6 = M2(e13, c10, s13 && i12 && 3 !== i12.i && !u3(i12.R, a7) ? s13.concat(a7) : void 0);
    if (f3(o13, a7, p6), !r6(p6))
      return;
    e13.m = false;
  } else
    v4 && o13.add(c10);
  if (t5(c10) && !y2(c10)) {
    if (!e13.h.D && e13._ < 1)
      return;
    M2(e13, c10), i12 && i12.A.l || x2(e13, c10);
  }
}
function x2(n14, r9, t10) {
  void 0 === t10 && (t10 = false), !n14.l && n14.h.D && n14.m && d3(r9, t10);
}
function z2(n14, r9) {
  var t10 = n14[Q];
  return (t10 ? p3(t10) : n14)[r9];
}
function I2(n14, r9) {
  if (r9 in n14)
    for (var t10 = Object.getPrototypeOf(n14); t10; ) {
      var e13 = Object.getOwnPropertyDescriptor(t10, r9);
      if (e13)
        return e13;
      t10 = Object.getPrototypeOf(t10);
    }
}
function k2(n14) {
  n14.P || (n14.P = true, n14.l && k2(n14.l));
}
function E2(n14) {
  n14.o || (n14.o = l7(n14.t));
}
function N2(n14, r9, t10) {
  var e13 = s8(r9) ? b2("MapSet").F(r9, t10) : v2(r9) ? b2("MapSet").T(r9, t10) : n14.O ? function(n15, r10) {
    var t11 = Array.isArray(n15), e14 = { i: t11 ? 1 : 0, A: r10 ? r10.A : _2(), P: false, I: false, R: {}, l: r10, t: n15, k: null, o: null, j: null, C: false }, i12 = e14, o13 = en;
    t11 && (i12 = [e14], o13 = on);
    var u8 = Proxy.revocable(i12, o13), a7 = u8.revoke, f7 = u8.proxy;
    return e14.k = f7, e14.j = a7, f7;
  }(r9, t10) : b2("ES5").J(r9, t10);
  return (t10 ? t10.A : _2()).p.push(e13), e13;
}
function R2(e13) {
  return r6(e13) || n8(22, e13), function n14(r9) {
    if (!t5(r9))
      return r9;
    var e14, u8 = r9[Q], c10 = o7(r9);
    if (u8) {
      if (!u8.P && (u8.i < 4 || !b2("ES5").K(u8)))
        return u8.t;
      u8.I = true, e14 = D(r9, c10), u8.I = false;
    } else
      e14 = D(r9, c10);
    return i6(e14, function(r10, t10) {
      u8 && a3(u8.t, r10) === t10 || f3(e14, r10, n14(t10));
    }), 3 === c10 ? new Set(e14) : e14;
  }(e13);
}
function D(n14, r9) {
  switch (r9) {
    case 2:
      return new Map(n14);
    case 3:
      return Array.from(n14);
  }
  return l7(n14);
}
function F() {
  function t10(n14, r9) {
    var t11 = s13[n14];
    return t11 ? t11.enumerable = r9 : s13[n14] = t11 = { configurable: true, enumerable: r9, get: function() {
      var r10 = this[Q];
      return f7(r10), en.get(r10, n14);
    }, set: function(r10) {
      var t12 = this[Q];
      f7(t12), en.set(t12, n14, r10);
    } }, t11;
  }
  function e13(n14) {
    for (var r9 = n14.length - 1; r9 >= 0; r9--) {
      var t11 = n14[r9][Q];
      if (!t11.P)
        switch (t11.i) {
          case 5:
            a7(t11) && k2(t11);
            break;
          case 4:
            o13(t11) && k2(t11);
        }
    }
  }
  function o13(n14) {
    for (var r9 = n14.t, t11 = n14.k, e14 = nn(t11), i12 = e14.length - 1; i12 >= 0; i12--) {
      var o14 = e14[i12];
      if (o14 !== Q) {
        var a8 = r9[o14];
        if (void 0 === a8 && !u3(r9, o14))
          return true;
        var f8 = t11[o14], s14 = f8 && f8[Q];
        if (s14 ? s14.t !== a8 : !c6(f8, a8))
          return true;
      }
    }
    var v4 = !!r9[Q];
    return e14.length !== nn(r9).length + (v4 ? 0 : 1);
  }
  function a7(n14) {
    var r9 = n14.k;
    if (r9.length !== n14.t.length)
      return true;
    var t11 = Object.getOwnPropertyDescriptor(r9, r9.length - 1);
    if (t11 && !t11.get)
      return true;
    for (var e14 = 0; e14 < r9.length; e14++)
      if (!r9.hasOwnProperty(e14))
        return true;
    return false;
  }
  function f7(r9) {
    r9.g && n8(3, JSON.stringify(p3(r9)));
  }
  var s13 = {};
  m4("ES5", { J: function(n14, r9) {
    var e14 = Array.isArray(n14), i12 = function(n15, r10) {
      if (n15) {
        for (var e15 = Array(r10.length), i13 = 0; i13 < r10.length; i13++)
          Object.defineProperty(e15, "" + i13, t10(i13, true));
        return e15;
      }
      var o15 = rn(r10);
      delete o15[Q];
      for (var u8 = nn(o15), a8 = 0; a8 < u8.length; a8++) {
        var f8 = u8[a8];
        o15[f8] = t10(f8, n15 || !!o15[f8].enumerable);
      }
      return Object.create(Object.getPrototypeOf(r10), o15);
    }(e14, n14), o14 = { i: e14 ? 5 : 4, A: r9 ? r9.A : _2(), P: false, I: false, R: {}, l: r9, t: n14, k: i12, o: null, g: false, C: false };
    return Object.defineProperty(i12, Q, { value: o14, writable: true }), i12;
  }, S: function(n14, t11, o14) {
    o14 ? r6(t11) && t11[Q].A === n14 && e13(n14.p) : (n14.u && function n15(r9) {
      if (r9 && "object" == typeof r9) {
        var t12 = r9[Q];
        if (t12) {
          var e14 = t12.t, o15 = t12.k, f8 = t12.R, c10 = t12.i;
          if (4 === c10)
            i6(o15, function(r10) {
              r10 !== Q && (void 0 !== e14[r10] || u3(e14, r10) ? f8[r10] || n15(o15[r10]) : (f8[r10] = true, k2(t12)));
            }), i6(e14, function(n16) {
              void 0 !== o15[n16] || u3(o15, n16) || (f8[n16] = false, k2(t12));
            });
          else if (5 === c10) {
            if (a7(t12) && (k2(t12), f8.length = true), o15.length < e14.length)
              for (var s14 = o15.length; s14 < e14.length; s14++)
                f8[s14] = false;
            else
              for (var v4 = e14.length; v4 < o15.length; v4++)
                f8[v4] = true;
            for (var p6 = Math.min(o15.length, e14.length), l13 = 0; l13 < p6; l13++)
              o15.hasOwnProperty(l13) || (f8[l13] = true), void 0 === f8[l13] && n15(o15[l13]);
          }
        }
      }
    }(n14.p[0]), e13(n14.p));
  }, K: function(n14) {
    return 4 === n14.i ? o13(n14) : a7(n14);
  } });
}
var G;
var U;
var W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x");
var X = "undefined" != typeof Map;
var q = "undefined" != typeof Set;
var B2 = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;
var H2 = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
var L2 = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
var Q = W ? Symbol.for("immer-state") : "__$immer_state";
var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n14) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n14;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n14) {
  return "Cannot apply patch, path doesn't resolve: " + n14;
}, 16: 'Sets cannot have "replace" patches.', 17: function(n14) {
  return "Unsupported patch operation: " + n14;
}, 18: function(n14) {
  return "The plugin for '" + n14 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n14 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n14) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n14 + "'";
}, 22: function(n14) {
  return "'current' expects a draft, got: " + n14;
}, 23: function(n14) {
  return "'original' expects a draft, got: " + n14;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
var Z2 = "" + Object.prototype.constructor;
var nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n14) {
  return Object.getOwnPropertyNames(n14).concat(Object.getOwnPropertySymbols(n14));
} : Object.getOwnPropertyNames;
var rn = Object.getOwnPropertyDescriptors || function(n14) {
  var r9 = {};
  return nn(n14).forEach(function(t10) {
    r9[t10] = Object.getOwnPropertyDescriptor(n14, t10);
  }), r9;
};
var tn = {};
var en = { get: function(n14, r9) {
  if (r9 === Q)
    return n14;
  var e13 = p3(n14);
  if (!u3(e13, r9))
    return function(n15, r10, t10) {
      var e14, i13 = I2(r10, t10);
      return i13 ? "value" in i13 ? i13.value : null === (e14 = i13.get) || void 0 === e14 ? void 0 : e14.call(n15.k) : void 0;
    }(n14, e13, r9);
  var i12 = e13[r9];
  return n14.I || !t5(i12) ? i12 : i12 === z2(n14.t, r9) ? (E2(n14), n14.o[r9] = N2(n14.A.h, i12, n14)) : i12;
}, has: function(n14, r9) {
  return r9 in p3(n14);
}, ownKeys: function(n14) {
  return Reflect.ownKeys(p3(n14));
}, set: function(n14, r9, t10) {
  var e13 = I2(p3(n14), r9);
  if (null == e13 ? void 0 : e13.set)
    return e13.set.call(n14.k, t10), true;
  if (!n14.P) {
    var i12 = z2(p3(n14), r9), o13 = null == i12 ? void 0 : i12[Q];
    if (o13 && o13.t === t10)
      return n14.o[r9] = t10, n14.R[r9] = false, true;
    if (c6(t10, i12) && (void 0 !== t10 || u3(n14.t, r9)))
      return true;
    E2(n14), k2(n14);
  }
  return n14.o[r9] === t10 && (void 0 !== t10 || r9 in n14.o) || Number.isNaN(t10) && Number.isNaN(n14.o[r9]) || (n14.o[r9] = t10, n14.R[r9] = true), true;
}, deleteProperty: function(n14, r9) {
  return void 0 !== z2(n14.t, r9) || r9 in n14.t ? (n14.R[r9] = false, E2(n14), k2(n14)) : delete n14.R[r9], n14.o && delete n14.o[r9], true;
}, getOwnPropertyDescriptor: function(n14, r9) {
  var t10 = p3(n14), e13 = Reflect.getOwnPropertyDescriptor(t10, r9);
  return e13 ? { writable: true, configurable: 1 !== n14.i || "length" !== r9, enumerable: e13.enumerable, value: t10[r9] } : e13;
}, defineProperty: function() {
  n8(11);
}, getPrototypeOf: function(n14) {
  return Object.getPrototypeOf(n14.t);
}, setPrototypeOf: function() {
  n8(12);
} };
var on = {};
i6(en, function(n14, r9) {
  on[n14] = function() {
    return arguments[0] = arguments[0][0], r9.apply(this, arguments);
  };
}), on.deleteProperty = function(r9, t10) {
  return isNaN(parseInt(t10)) && n8(13), on.set.call(this, r9, t10, void 0);
}, on.set = function(r9, t10, e13) {
  return "length" !== t10 && isNaN(parseInt(t10)) && n8(14), en.set.call(this, r9[0], t10, e13, r9[0]);
};
var un = function() {
  function e13(r9) {
    var e14 = this;
    this.O = B2, this.D = true, this.produce = function(r10, i13, o13) {
      if ("function" == typeof r10 && "function" != typeof i13) {
        var u8 = i13;
        i13 = r10;
        var a7 = e14;
        return function(n14) {
          var r11 = this;
          void 0 === n14 && (n14 = u8);
          for (var t10 = arguments.length, e15 = Array(t10 > 1 ? t10 - 1 : 0), o14 = 1; o14 < t10; o14++)
            e15[o14 - 1] = arguments[o14];
          return a7.produce(n14, function(n15) {
            var t11;
            return (t11 = i13).call.apply(t11, [r11, n15].concat(e15));
          });
        };
      }
      var f7;
      if ("function" != typeof i13 && n8(6), void 0 !== o13 && "function" != typeof o13 && n8(7), t5(r10)) {
        var c10 = w2(e14), s13 = N2(e14, r10, void 0), v4 = true;
        try {
          f7 = i13(s13), v4 = false;
        } finally {
          v4 ? g2(c10) : O(c10);
        }
        return "undefined" != typeof Promise && f7 instanceof Promise ? f7.then(function(n14) {
          return j2(c10, o13), P2(n14, c10);
        }, function(n14) {
          throw g2(c10), n14;
        }) : (j2(c10, o13), P2(f7, c10));
      }
      if (!r10 || "object" != typeof r10) {
        if (void 0 === (f7 = i13(r10)) && (f7 = r10), f7 === H2 && (f7 = void 0), e14.D && d3(f7, true), o13) {
          var p6 = [], l13 = [];
          b2("Patches").M(r10, f7, p6, l13), o13(p6, l13);
        }
        return f7;
      }
      n8(21, r10);
    }, this.produceWithPatches = function(n14, r10) {
      if ("function" == typeof n14)
        return function(r11) {
          for (var t11 = arguments.length, i14 = Array(t11 > 1 ? t11 - 1 : 0), o14 = 1; o14 < t11; o14++)
            i14[o14 - 1] = arguments[o14];
          return e14.produceWithPatches(r11, function(r12) {
            return n14.apply(void 0, [r12].concat(i14));
          });
        };
      var t10, i13, o13 = e14.produce(n14, r10, function(n15, r11) {
        t10 = n15, i13 = r11;
      });
      return "undefined" != typeof Promise && o13 instanceof Promise ? o13.then(function(n15) {
        return [n15, t10, i13];
      }) : [o13, t10, i13];
    }, "boolean" == typeof (null == r9 ? void 0 : r9.useProxies) && this.setUseProxies(r9.useProxies), "boolean" == typeof (null == r9 ? void 0 : r9.autoFreeze) && this.setAutoFreeze(r9.autoFreeze);
  }
  var i12 = e13.prototype;
  return i12.createDraft = function(e14) {
    t5(e14) || n8(8), r6(e14) && (e14 = R2(e14));
    var i13 = w2(this), o13 = N2(this, e14, void 0);
    return o13[Q].C = true, O(i13), o13;
  }, i12.finishDraft = function(r9, t10) {
    var e14 = r9 && r9[Q];
    e14 && e14.C || n8(9), e14.I && n8(10);
    var i13 = e14.A;
    return j2(i13, t10), P2(void 0, i13);
  }, i12.setAutoFreeze = function(n14) {
    this.D = n14;
  }, i12.setUseProxies = function(r9) {
    r9 && !B2 && n8(20), this.O = r9;
  }, i12.applyPatches = function(n14, t10) {
    var e14;
    for (e14 = t10.length - 1; e14 >= 0; e14--) {
      var i13 = t10[e14];
      if (0 === i13.path.length && "replace" === i13.op) {
        n14 = i13.value;
        break;
      }
    }
    e14 > -1 && (t10 = t10.slice(e14 + 1));
    var o13 = b2("Patches").$;
    return r6(n14) ? o13(n14, t10) : this.produce(n14, function(n15) {
      return o13(n15, t10);
    });
  }, e13;
}();
var an = new un();
var fn = an.produce;
var cn = an.produceWithPatches.bind(an);
var sn = an.setAutoFreeze.bind(an);
var vn = an.setUseProxies.bind(an);
var pn = an.applyPatches.bind(an);
var ln = an.createDraft.bind(an);
var dn = an.finishDraft.bind(an);
var immer_esm_default = fn;

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i12 = 1; i12 < arguments.length; i12++) {
    var source = null != arguments[i12] ? arguments[i12] : {};
    i12 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

// node_modules/redux/es/redux.js
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  var type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  var constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(false ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(false ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(false ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener2) {
    if (typeof listener2 !== "function") {
      throw new Error(false ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener2) + "'");
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener2);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener2);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(false ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }
    if (typeof action.type === "undefined") {
      throw new Error(false ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i12 = 0; i12 < listeners.length; i12++) {
      var listener2 = listeners[i12];
      listener2();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(false ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(false ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e13) {
  }
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + ' has unexpected type of "' + kindOf(inputState) + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }
  var unexpectedKeys = Object.keys(inputState).filter(function(key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function(key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? "keys" : "key") + " " + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer = reducers[key];
    var initialState2 = reducer(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(false ? formatProdErrorMessage(12) : 'The slice reducer for key "' + key + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(false ? formatProdErrorMessage(13) : 'The slice reducer for key "' + key + '" returned undefined when probed with a random type. ' + ("Don't try to handle '" + ActionTypes.INIT + `' or other actions in "redux/*" `) + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i12 = 0; i12 < reducerKeys.length; i12++) {
    var key = reducerKeys[i12];
    if (true) {
      if (typeof reducers[key] === "undefined") {
        warning('No reducer provided for key "' + key + '"');
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;
  if (true) {
    unexpectedKeyCache = {};
  }
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e13) {
    shapeAssertionError = e13;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        var actionType = action && action.type;
        throw new Error(false ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? '"' + String(actionType) + '"' : "(unknown type)") + ', the slice reducer for key "' + _key + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.');
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function(a7, b5) {
    return function() {
      return a7(b5.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function(createStore2) {
    return function() {
      var store2 = createStore2.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error(false ? formatProdErrorMessage(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
      };
      var middlewareAPI = {
        getState: store2.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function(middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store2.dispatch);
      return _objectSpread2(_objectSpread2({}, store2), {}, {
        dispatch: _dispatch
      });
    };
  };
}

// node_modules/redux-thunk/es/index.js
function createThunkMiddleware(extraArgument) {
  var middleware = function middleware2(_ref) {
    var dispatch = _ref.dispatch, getState = _ref.getState;
    return function(next) {
      return function(action) {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    };
  };
  return middleware;
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var es_default = thunk;

// node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
var __extends = function() {
  var extendStatics = function(d6, b5) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d7, b6) {
      d7.__proto__ = b6;
    } || function(d7, b6) {
      for (var p6 in b6)
        if (Object.prototype.hasOwnProperty.call(b6, p6))
          d7[p6] = b6[p6];
    };
    return extendStatics(d6, b5);
  };
  return function(d6, b5) {
    if (typeof b5 !== "function" && b5 !== null)
      throw new TypeError("Class extends value " + String(b5) + " is not a constructor or null");
    extendStatics(d6, b5);
    function __() {
      this.constructor = d6;
    }
    d6.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
  };
}();
var __generator = function(thisArg, body) {
  var _4 = { label: 0, sent: function() {
    if (t10[0] & 1)
      throw t10[1];
    return t10[1];
  }, trys: [], ops: [] }, f7, y4, t10, g5;
  return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
    return this;
  }), g5;
  function verb(n14) {
    return function(v4) {
      return step([n14, v4]);
    };
  }
  function step(op) {
    if (f7)
      throw new TypeError("Generator is already executing.");
    while (_4)
      try {
        if (f7 = 1, y4 && (t10 = op[0] & 2 ? y4["return"] : op[0] ? y4["throw"] || ((t10 = y4["return"]) && t10.call(y4), 0) : y4.next) && !(t10 = t10.call(y4, op[1])).done)
          return t10;
        if (y4 = 0, t10)
          op = [op[0] & 2, t10.value];
        switch (op[0]) {
          case 0:
          case 1:
            t10 = op;
            break;
          case 4:
            _4.label++;
            return { value: op[1], done: false };
          case 5:
            _4.label++;
            y4 = op[1];
            op = [0];
            continue;
          case 7:
            op = _4.ops.pop();
            _4.trys.pop();
            continue;
          default:
            if (!(t10 = _4.trys, t10 = t10.length > 0 && t10[t10.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _4 = 0;
              continue;
            }
            if (op[0] === 3 && (!t10 || op[1] > t10[0] && op[1] < t10[3])) {
              _4.label = op[1];
              break;
            }
            if (op[0] === 6 && _4.label < t10[1]) {
              _4.label = t10[1];
              t10 = op;
              break;
            }
            if (t10 && _4.label < t10[2]) {
              _4.label = t10[2];
              _4.ops.push(op);
              break;
            }
            if (t10[2])
              _4.ops.pop();
            _4.trys.pop();
            continue;
        }
        op = body.call(thisArg, _4);
      } catch (e13) {
        op = [6, e13];
        y4 = 0;
      } finally {
        f7 = t10 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = function(to, from) {
  for (var i12 = 0, il = from.length, j3 = to.length; i12 < il; i12++, j3++)
    to[j3] = from[i12];
  return to;
};
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key, value) {
  return key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
};
var __spreadValues = function(a7, b5) {
  for (var prop in b5 || (b5 = {}))
    if (__hasOwnProp.call(b5, prop))
      __defNormalProp(a7, prop, b5[prop]);
  if (__getOwnPropSymbols)
    for (var _i = 0, _c = __getOwnPropSymbols(b5); _i < _c.length; _i++) {
      var prop = _c[_i];
      if (__propIsEnum.call(b5, prop))
        __defNormalProp(a7, prop, b5[prop]);
    }
  return a7;
};
var __spreadProps = function(a7, b5) {
  return __defProps(a7, __getOwnPropDescs(b5));
};
var __async = function(__this, __arguments, generator) {
  return new Promise(function(resolve, reject) {
    var fulfilled = function(value) {
      try {
        step(generator.next(value));
      } catch (e13) {
        reject(e13);
      }
    };
    var rejected = function(value) {
      try {
        step(generator.throw(value));
      } catch (e13) {
        reject(e13);
      }
    };
    var step = function(x5) {
      return x5.done ? resolve(x5.value) : Promise.resolve(x5.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop2) {
    return noop2;
  };
};
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null)
    return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  var baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
function getTimeMeasureUtils(maxDelay, fnName) {
  var elapsed = 0;
  return {
    measureTime: function(fn2) {
      var started = Date.now();
      try {
        return fn2();
      } finally {
        var finished = Date.now();
        elapsed += finished - started;
      }
    },
    warnIfExceeded: function() {
      if (elapsed > maxDelay) {
        console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
      }
    }
  };
}
var MiddlewareArray = (
  /** @class */
  function(_super) {
    __extends(MiddlewareArray2, _super);
    function MiddlewareArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray2, Symbol.species, {
      get: function() {
        return MiddlewareArray2;
      },
      enumerable: false,
      configurable: true
    });
    MiddlewareArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray2;
  }(Array)
);
var EnhancerArray = (
  /** @class */
  function(_super) {
    __extends(EnhancerArray2, _super);
    function EnhancerArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, EnhancerArray2.prototype);
      return _this;
    }
    Object.defineProperty(EnhancerArray2, Symbol.species, {
      get: function() {
        return EnhancerArray2;
      },
      enumerable: false,
      configurable: true
    });
    EnhancerArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    EnhancerArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (EnhancerArray2.bind.apply(EnhancerArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (EnhancerArray2.bind.apply(EnhancerArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return EnhancerArray2;
  }(Array)
);
function freezeDraftable(val) {
  return t5(val) ? immer_esm_default(val, function() {
  }) : val;
}
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  throw new Error(prefix + ": " + (message || ""));
}
function stringify(obj, serializer, indent, decycler) {
  return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
}
function getSerialize(serializer, decycler) {
  var stack = [], keys = [];
  if (!decycler)
    decycler = function(_4, value) {
      if (stack[0] === value)
        return "[Circular ~]";
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    };
  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value))
        value = decycler.call(this, key, value);
    } else
      stack.push(value);
    return serializer == null ? value : serializer.call(this, key, value);
  };
}
function isImmutableDefault(value) {
  return typeof value !== "object" || value == null || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
  var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
  return {
    detectMutations: function() {
      return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
    }
  };
}
function trackProperties(isImmutable, ignorePaths, obj, path) {
  if (ignorePaths === void 0) {
    ignorePaths = [];
  }
  if (path === void 0) {
    path = "";
  }
  var tracked = { value: obj };
  if (!isImmutable(obj)) {
    tracked.children = {};
    for (var key in obj) {
      var childPath = path ? path + "." + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
    }
  }
  return tracked;
}
function detectMutations(isImmutable, ignoredPaths, trackedProperty, obj, sameParentRef, path) {
  if (ignoredPaths === void 0) {
    ignoredPaths = [];
  }
  if (sameParentRef === void 0) {
    sameParentRef = false;
  }
  if (path === void 0) {
    path = "";
  }
  var prevObj = trackedProperty ? trackedProperty.value : void 0;
  var sameRef = prevObj === obj;
  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return { wasMutated: true, path };
  }
  if (isImmutable(prevObj) || isImmutable(obj)) {
    return { wasMutated: false };
  }
  var keysToDetect = {};
  for (var key in trackedProperty.children) {
    keysToDetect[key] = true;
  }
  for (var key in obj) {
    keysToDetect[key] = true;
  }
  var hasIgnoredPaths = ignoredPaths.length > 0;
  var _loop_1 = function(key2) {
    var nestedPath = path ? path + "." + key2 : key2;
    if (hasIgnoredPaths) {
      var hasMatches = ignoredPaths.some(function(ignored) {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        return "continue";
      }
    }
    var result = detectMutations(isImmutable, ignoredPaths, trackedProperty.children[key2], obj[key2], sameRef, nestedPath);
    if (result.wasMutated) {
      return { value: result };
    }
  };
  for (var key in keysToDetect) {
    var state_1 = _loop_1(key);
    if (typeof state_1 === "object")
      return state_1.value;
  }
  return { wasMutated: false };
}
function createImmutableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (false) {
    return function() {
      return function(next) {
        return function(action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isImmutable, isImmutable = _c === void 0 ? isImmutableDefault : _c, ignoredPaths = options.ignoredPaths, _d = options.warnAfter, warnAfter = _d === void 0 ? 32 : _d, ignore = options.ignore;
  ignoredPaths = ignoredPaths || ignore;
  var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
  return function(_c2) {
    var getState = _c2.getState;
    var state = getState();
    var tracker = track(state);
    var result;
    return function(next) {
      return function(action) {
        var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
        measureUtils.measureTime(function() {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        var dispatchedAction = next(action);
        measureUtils.measureTime(function() {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          result.wasMutated && invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  };
}
function isPlain(val) {
  var type = typeof val;
  return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject2(val);
}
function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths, cache) {
  if (path === void 0) {
    path = "";
  }
  if (isSerializable === void 0) {
    isSerializable = isPlain;
  }
  if (ignoredPaths === void 0) {
    ignoredPaths = [];
  }
  var foundNestedSerializable;
  if (!isSerializable(value)) {
    return {
      keyPath: path || "<root>",
      value
    };
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (cache == null ? void 0 : cache.has(value))
    return false;
  var entries = getEntries != null ? getEntries(value) : Object.entries(value);
  var hasIgnoredPaths = ignoredPaths.length > 0;
  var _loop_2 = function(key2, nestedValue2) {
    var nestedPath = path ? path + "." + key2 : key2;
    if (hasIgnoredPaths) {
      var hasMatches = ignoredPaths.some(function(ignored) {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        return "continue";
      }
    }
    if (!isSerializable(nestedValue2)) {
      return { value: {
        keyPath: nestedPath,
        value: nestedValue2
      } };
    }
    if (typeof nestedValue2 === "object") {
      foundNestedSerializable = findNonSerializableValue(nestedValue2, nestedPath, isSerializable, getEntries, ignoredPaths, cache);
      if (foundNestedSerializable) {
        return { value: foundNestedSerializable };
      }
    }
  };
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _c = entries_1[_i], key = _c[0], nestedValue = _c[1];
    var state_2 = _loop_2(key, nestedValue);
    if (typeof state_2 === "object")
      return state_2.value;
  }
  if (cache && isNestedFrozen(value))
    cache.add(value);
  return false;
}
function isNestedFrozen(value) {
  if (!Object.isFrozen(value))
    return false;
  for (var _i = 0, _c = Object.values(value); _i < _c.length; _i++) {
    var nestedValue = _c[_i];
    if (typeof nestedValue !== "object" || nestedValue === null)
      continue;
    if (!isNestedFrozen(nestedValue))
      return false;
  }
  return true;
}
function createSerializableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (false) {
    return function() {
      return function(next) {
        return function(action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isSerializable, isSerializable = _c === void 0 ? isPlain : _c, getEntries = options.getEntries, _d = options.ignoredActions, ignoredActions = _d === void 0 ? [] : _d, _e = options.ignoredActionPaths, ignoredActionPaths = _e === void 0 ? ["meta.arg", "meta.baseQueryMeta"] : _e, _f = options.ignoredPaths, ignoredPaths = _f === void 0 ? [] : _f, _g = options.warnAfter, warnAfter = _g === void 0 ? 32 : _g, _h = options.ignoreState, ignoreState = _h === void 0 ? false : _h, _j = options.ignoreActions, ignoreActions = _j === void 0 ? false : _j, _k = options.disableCache, disableCache = _k === void 0 ? false : _k;
  var cache = !disableCache && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
  return function(storeAPI) {
    return function(next) {
      return function(action) {
        var result = next(action);
        var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
          measureUtils.measureTime(function() {
            var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths, cache);
            if (foundActionNonSerializableValue) {
              var keyPath = foundActionNonSerializableValue.keyPath, value = foundActionNonSerializableValue.value;
              console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
          });
        }
        if (!ignoreState) {
          measureUtils.measureTime(function() {
            var state = storeAPI.getState();
            var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths, cache);
            if (foundStateNonSerializableValue) {
              var keyPath = foundStateNonSerializableValue.keyPath, value = foundStateNonSerializableValue.value;
              console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
            }
          });
          measureUtils.warnIfExceeded();
        }
        return result;
      };
    };
  };
}
function isBoolean(x5) {
  return typeof x5 === "boolean";
}
function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}
function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  var _c = options.thunk, thunk2 = _c === void 0 ? true : _c, _d = options.immutableCheck, immutableCheck = _d === void 0 ? true : _d, _e = options.serializableCheck, serializableCheck = _e === void 0 ? true : _e;
  var middlewareArray = new MiddlewareArray();
  if (thunk2) {
    if (isBoolean(thunk2)) {
      middlewareArray.push(es_default);
    } else {
      middlewareArray.push(es_default.withExtraArgument(thunk2.extraArgument));
    }
  }
  if (true) {
    if (immutableCheck) {
      var immutableOptions = {};
      if (!isBoolean(immutableCheck)) {
        immutableOptions = immutableCheck;
      }
      middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
    }
    if (serializableCheck) {
      var serializableOptions = {};
      if (!isBoolean(serializableCheck)) {
        serializableOptions = serializableCheck;
      }
      middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
    }
  }
  return middlewareArray;
}
var IS_PRODUCTION = false;
function configureStore(options) {
  var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
  var _c = options || {}, _d = _c.reducer, reducer = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
  var rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject2(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }
  var finalMiddleware = middleware;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
    if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
      throw new Error("when using a middleware builder function, an array of middleware must be returned");
    }
  }
  if (!IS_PRODUCTION && finalMiddleware.some(function(item) {
    return typeof item !== "function";
  })) {
    throw new Error("each middleware provided to configureStore must be a function");
  }
  var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
  var finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools(__spreadValues({
      trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
  }
  var defaultEnhancers = new EnhancerArray(middlewareEnhancer);
  var storeEnhancers = defaultEnhancers;
  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(defaultEnhancers);
  }
  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
function createAction(type, prepareAction) {
  function actionCreator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return __spreadValues(__spreadValues({
        type,
        payload: prepared.payload
      }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
    }
    return { type, payload: args[0] };
  }
  actionCreator.toString = function() {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function(action) {
    return action.type === type;
  };
  return actionCreator;
}
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function(typeOrActionCreator, reducer) {
      if (true) {
        if (actionMatchers.length > 0) {
          throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
        }
        if (defaultCaseReducer) {
          throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
        }
      }
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error("addCase cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher: function(matcher, reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
        }
      }
      actionMatchers.push({ matcher, reducer });
      return builder;
    },
    addDefaultCase: function(reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error("`builder.addDefaultCase` can only be called once");
        }
      }
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x5) {
  return typeof x5 === "function";
}
var hasWarnedAboutObjectNotation = false;
function createReducer(initialState2, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  if (true) {
    if (typeof mapOrBuilderCallback === "object") {
      if (!hasWarnedAboutObjectNotation) {
        hasWarnedAboutObjectNotation = true;
        console.warn("The object notation for `createReducer` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
      }
    }
  }
  var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
  var getInitialState;
  if (isStateFunction(initialState2)) {
    getInitialState = function() {
      return freezeDraftable(initialState2());
    };
  } else {
    var frozenInitialState_1 = freezeDraftable(initialState2);
    getInitialState = function() {
      return frozenInitialState_1;
    };
  }
  function reducer(state, action) {
    if (state === void 0) {
      state = getInitialState();
    }
    var caseReducers = __spreadArray([
      actionsMap[action.type]
    ], finalActionMatchers.filter(function(_c2) {
      var matcher = _c2.matcher;
      return matcher(action);
    }).map(function(_c2) {
      var reducer2 = _c2.reducer;
      return reducer2;
    }));
    if (caseReducers.filter(function(cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function(previousState, caseReducer) {
      if (caseReducer) {
        if (r6(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!t5(previousState)) {
          var result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return immer_esm_default(previousState, function(draft2) {
            return caseReducer(draft2, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
var hasWarnedAboutObjectNotation2 = false;
function getType2(slice, actionKey) {
  return slice + "/" + actionKey;
}
function createSlice(options) {
  var name = options.name;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  if (typeof process !== "undefined" && true) {
    if (options.initialState === void 0) {
      console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    }
  }
  var initialState2 = typeof options.initialState == "function" ? options.initialState : freezeDraftable(options.initialState);
  var reducers = options.reducers || {};
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function(reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType2(name, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  function buildReducer() {
    if (true) {
      if (typeof options.extraReducers === "object") {
        if (!hasWarnedAboutObjectNotation2) {
          hasWarnedAboutObjectNotation2 = true;
          console.warn("The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
        }
      }
    }
    var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
    var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
    return createReducer(initialState2, function(builder) {
      for (var key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
      for (var _i = 0, actionMatchers_1 = actionMatchers; _i < actionMatchers_1.length; _i++) {
        var m7 = actionMatchers_1[_i];
        builder.addMatcher(m7.matcher, m7.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }
  var _reducer;
  return {
    name,
    reducer: function(state, action) {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState: function() {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer.getInitialState();
    }
  };
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function(size) {
  if (size === void 0) {
    size = 21;
  }
  var id = "";
  var i12 = size;
  while (i12--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var commonProperties = [
  "name",
  "message",
  "stack",
  "code"
];
var RejectWithValue = (
  /** @class */
  function() {
    function RejectWithValue2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return RejectWithValue2;
  }()
);
var FulfillWithMeta = (
  /** @class */
  function() {
    function FulfillWithMeta2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return FulfillWithMeta2;
  }()
);
var miniSerializeError = function(value) {
  if (typeof value === "object" && value !== null) {
    var simpleError = {};
    for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
      var property = commonProperties_1[_i];
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return { message: String(value) };
};
var createAsyncThunk = function() {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
      return {
        payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "fulfilled"
        })
      };
    });
    var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
      return {
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "pending"
        })
      };
    });
    var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
      return {
        payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : (
      /** @class */
      function() {
        function class_1() {
          this.signal = {
            aborted: false,
            addEventListener: function() {
            },
            dispatchEvent: function() {
              return false;
            },
            onabort: function() {
            },
            removeEventListener: function() {
            },
            reason: void 0,
            throwIfAborted: function() {
            }
          };
        }
        class_1.prototype.abort = function() {
          if (true) {
            if (!displayedWarning) {
              displayedWarning = true;
              console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
            }
          }
        };
        return class_1;
      }()
    );
    function actionCreator(arg) {
      return function(dispatch, getState, extra) {
        var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        var abortController = new AC();
        var abortReason;
        var started = false;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        var promise2 = function() {
          return __async(this, null, function() {
            var _a21, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 4, , 5]);
                  conditionResult = (_a21 = options == null ? void 0 : options.condition) == null ? void 0 : _a21.call(options, arg, { getState, extra });
                  if (!isThenable(conditionResult))
                    return [3, 2];
                  return [4, conditionResult];
                case 1:
                  conditionResult = _c.sent();
                  _c.label = 2;
                case 2:
                  if (conditionResult === false || abortController.signal.aborted) {
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  }
                  started = true;
                  abortedPromise = new Promise(function(_4, reject) {
                    return abortController.signal.addEventListener("abort", function() {
                      return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                      });
                    });
                  });
                  dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId, arg }, { getState, extra })));
                  return [4, Promise.race([
                    abortedPromise,
                    Promise.resolve(payloadCreator(arg, {
                      dispatch,
                      getState,
                      extra,
                      requestId,
                      signal: abortController.signal,
                      abort,
                      rejectWithValue: function(value, meta) {
                        return new RejectWithValue(value, meta);
                      },
                      fulfillWithValue: function(value, meta) {
                        return new FulfillWithMeta(value, meta);
                      }
                    })).then(function(result) {
                      if (result instanceof RejectWithValue) {
                        throw result;
                      }
                      if (result instanceof FulfillWithMeta) {
                        return fulfilled(result.payload, requestId, arg, result.meta);
                      }
                      return fulfilled(result, requestId, arg);
                    })
                  ])];
                case 3:
                  finalAction = _c.sent();
                  return [3, 5];
                case 4:
                  err_1 = _c.sent();
                  finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                  return [3, 5];
                case 5:
                  skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                  if (!skipDispatch) {
                    dispatch(finalAction);
                  }
                  return [2, finalAction];
              }
            });
          });
        }();
        return Object.assign(promise2, {
          abort,
          requestId,
          arg,
          unwrap: function() {
            return promise2.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      typePrefix
    });
  }
  createAsyncThunk2.withTypes = function() {
    return createAsyncThunk2;
  };
  return createAsyncThunk2;
}();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = "task-" + cancelled;
var taskCompleted = "task-" + completed;
var listenerCancelled = listener + "-" + cancelled;
var listenerCompleted = listener + "-" + completed;
var TaskAbortError = (
  /** @class */
  function() {
    function TaskAbortError2(code) {
      this.code = code;
      this.name = "TaskAbortError";
      this.message = task + " " + cancelled + " (reason: " + code + ")";
    }
    return TaskAbortError2;
  }()
);
var alm = "listenerMiddleware";
var addListener = createAction(alm + "/add");
var clearAllListeners = createAction(alm + "/removeAll");
var removeListener = createAction(alm + "/remove");
var promise;
var queueMicrotaskShim = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function(cb) {
  return (promise || (promise = Promise.resolve())).then(cb).catch(function(err) {
    return setTimeout(function() {
      throw err;
    }, 0);
  });
};
var createQueueWithTimer = function(timeout) {
  return function(notify2) {
    setTimeout(notify2, timeout);
  };
};
var rAF = typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10);
F();

// src/redux/messageReducer.ts
var initialState = {
  messages: []
};
var messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  }
});
var { addMessage } = messageSlice.actions;
var messageReducer_default = messageSlice.reducer;

// src/redux/store.ts
var store = configureStore({
  reducer: {
    message: messageReducer_default
  }
});

// src/components/Chat/SideBar/header.ts
var _a;
customElements.define("pwa-sidebar-header", (_a = class extends s4 {
  render() {
    return x`
      <header>
        <div class="logo">
          <img src="/images/Bconnect_logo.png" />
        </div>
      </header>
    `;
  }
}, _a.styles = [
  rootStyles,
  i`
      .chat-gpt-header-container-sm {
        display: none;
      }
      header {
        height: 60px;
        /* display: grid;
        grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 1.4fr 72px;
        background: var(--primary-gray); */
        .logo {
          position: relative;
          width: 72px;
          background: linear-gradient(
            33.17deg,
            #1509ff -26.91%,
            #8203a1 100.14%
          );
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 8px;
          .oval-container {
            width: 52px;
            height: 42px;
            background: var(--white);
            border-radius: 72px / 51px;
            display: flex;
            align-items: center;
            justify-content: center;
            .my-icon {
              font-size: 32px;
              color: blue;
            }
          }
        }
        .customer-info-small-desktop {
          display: none;
        }
        .right-bar-haed {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      div {
        /* border-right: 1px solid var(--skelton-border); */
      }

      @media screen and (max-width: 1440px) {
        header {
          /* grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 0.3fr 72px; */
          .live-chat-header-container {
            border-right: none;
          }
          .customer-info-large-desktop {
            display: none;
          }
          .customer-info-small-desktop {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      @media screen and (max-width: 1024px) {
        header {
          grid-template-columns: 72px 0.8fr 0.3fr 2.2fr 0.3fr 72px;
          .chat-gpt-header-container-lg {
            display: none;
          }
          .chat-gpt-header-container-sm {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    `
], _a));

// src/utilities/nav-data.ts
var navigationData = [
  {
    icons: "chat-square-text",
    text: "square-chart"
  },
  {
    icons: "megaphone",
    text: "megaphone"
  },
  {
    icons: "folder2-open",
    text: "Open Folder"
  },
  {
    icons: "journal-medical",
    text: "journal"
  },
  {
    icons: "chat-square-quote",
    text: "team chat",
    hasSeprator: true
  },
  {
    icons: "dropbox",
    text: "dropbox"
  },
  {
    icons: "bar-chart",
    text: "bar chart"
  },
  {
    icons: "headset",
    text: "headset"
  }
];

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js
var t6 = window;
var e8 = t6.ShadowRoot && (void 0 === t6.ShadyCSS || t6.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s9 = Symbol();
var n9 = /* @__PURE__ */ new WeakMap();
var o8 = class {
  constructor(t32, e42, n52) {
    if (this._$cssResult$ = true, n52 !== s9)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t32, this.t = e42;
  }
  get styleSheet() {
    let t32 = this.o;
    const s52 = this.t;
    if (e8 && void 0 === t32) {
      const e42 = void 0 !== s52 && 1 === s52.length;
      e42 && (t32 = n9.get(s52)), void 0 === t32 && ((this.o = t32 = new CSSStyleSheet()).replaceSync(this.cssText), e42 && n9.set(s52, t32));
    }
    return t32;
  }
  toString() {
    return this.cssText;
  }
};
var r7 = (t32) => new o8("string" == typeof t32 ? t32 : t32 + "", void 0, s9);
var i7 = (t32, ...e42) => {
  const n52 = 1 === t32.length ? t32[0] : e42.reduce((e53, s52, n62) => e53 + ((t42) => {
    if (true === t42._$cssResult$)
      return t42.cssText;
    if ("number" == typeof t42)
      return t42;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t42 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s52) + t32[n62 + 1], t32[0]);
  return new o8(n52, t32, s9);
};
var S4 = (s52, n52) => {
  e8 ? s52.adoptedStyleSheets = n52.map((t32) => t32 instanceof CSSStyleSheet ? t32 : t32.styleSheet) : n52.forEach((e42) => {
    const n62 = document.createElement("style"), o52 = t6.litNonce;
    void 0 !== o52 && n62.setAttribute("nonce", o52), n62.textContent = e42.cssText, s52.appendChild(n62);
  });
};
var c7 = e8 ? (t32) => t32 : (t32) => t32 instanceof CSSStyleSheet ? ((t42) => {
  let e42 = "";
  for (const s52 of t42.cssRules)
    e42 += s52.cssText;
  return r7(e42);
})(t32) : t32;
var s22;
var e22 = window;
var r22 = e22.trustedTypes;
var h6 = r22 ? r22.emptyScript : "";
var o22 = e22.reactiveElementPolyfillSupport;
var n22 = { toAttribute(t32, i33) {
  switch (i33) {
    case Boolean:
      t32 = t32 ? h6 : null;
      break;
    case Object:
    case Array:
      t32 = null == t32 ? t32 : JSON.stringify(t32);
  }
  return t32;
}, fromAttribute(t32, i33) {
  let s52 = t32;
  switch (i33) {
    case Boolean:
      s52 = null !== t32;
      break;
    case Number:
      s52 = null === t32 ? null : Number(t32);
      break;
    case Object:
    case Array:
      try {
        s52 = JSON.parse(t32);
      } catch (t42) {
        s52 = null;
      }
  }
  return s52;
} };
var a4 = (t32, i33) => i33 !== t32 && (i33 == i33 || t32 == t32);
var l8 = { attribute: true, type: String, converter: n22, reflect: false, hasChanged: a4 };
var d4 = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t32) {
    var i33;
    this.finalize(), (null !== (i33 = this.h) && void 0 !== i33 ? i33 : this.h = []).push(t32);
  }
  static get observedAttributes() {
    this.finalize();
    const t32 = [];
    return this.elementProperties.forEach((i33, s52) => {
      const e42 = this._$Ep(s52, i33);
      void 0 !== e42 && (this._$Ev.set(e42, s52), t32.push(e42));
    }), t32;
  }
  static createProperty(t32, i33 = l8) {
    if (i33.state && (i33.attribute = false), this.finalize(), this.elementProperties.set(t32, i33), !i33.noAccessor && !this.prototype.hasOwnProperty(t32)) {
      const s52 = "symbol" == typeof t32 ? Symbol() : "__" + t32, e42 = this.getPropertyDescriptor(t32, s52, i33);
      void 0 !== e42 && Object.defineProperty(this.prototype, t32, e42);
    }
  }
  static getPropertyDescriptor(t32, i33, s52) {
    return { get() {
      return this[i33];
    }, set(e42) {
      const r42 = this[t32];
      this[i33] = e42, this.requestUpdate(t32, r42, s52);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t32) {
    return this.elementProperties.get(t32) || l8;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t32 = Object.getPrototypeOf(this);
    if (t32.finalize(), void 0 !== t32.h && (this.h = [...t32.h]), this.elementProperties = new Map(t32.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t42 = this.properties, i33 = [...Object.getOwnPropertyNames(t42), ...Object.getOwnPropertySymbols(t42)];
      for (const s52 of i33)
        this.createProperty(s52, t42[s52]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i33) {
    const s52 = [];
    if (Array.isArray(i33)) {
      const e42 = new Set(i33.flat(1 / 0).reverse());
      for (const i42 of e42)
        s52.unshift(c7(i42));
    } else
      void 0 !== i33 && s52.push(c7(i33));
    return s52;
  }
  static _$Ep(t32, i33) {
    const s52 = i33.attribute;
    return false === s52 ? void 0 : "string" == typeof s52 ? s52 : "string" == typeof t32 ? t32.toLowerCase() : void 0;
  }
  u() {
    var t32;
    this._$E_ = new Promise((t42) => this.enableUpdating = t42), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t32 = this.constructor.h) || void 0 === t32 || t32.forEach((t42) => t42(this));
  }
  addController(t32) {
    var i33, s52;
    (null !== (i33 = this._$ES) && void 0 !== i33 ? i33 : this._$ES = []).push(t32), void 0 !== this.renderRoot && this.isConnected && (null === (s52 = t32.hostConnected) || void 0 === s52 || s52.call(t32));
  }
  removeController(t32) {
    var i33;
    null === (i33 = this._$ES) || void 0 === i33 || i33.splice(this._$ES.indexOf(t32) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t32, i33) => {
      this.hasOwnProperty(i33) && (this._$Ei.set(i33, this[i33]), delete this[i33]);
    });
  }
  createRenderRoot() {
    var t32;
    const s52 = null !== (t32 = this.shadowRoot) && void 0 !== t32 ? t32 : this.attachShadow(this.constructor.shadowRootOptions);
    return S4(s52, this.constructor.elementStyles), s52;
  }
  connectedCallback() {
    var t32;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t32 = this._$ES) || void 0 === t32 || t32.forEach((t42) => {
      var i33;
      return null === (i33 = t42.hostConnected) || void 0 === i33 ? void 0 : i33.call(t42);
    });
  }
  enableUpdating(t32) {
  }
  disconnectedCallback() {
    var t32;
    null === (t32 = this._$ES) || void 0 === t32 || t32.forEach((t42) => {
      var i33;
      return null === (i33 = t42.hostDisconnected) || void 0 === i33 ? void 0 : i33.call(t42);
    });
  }
  attributeChangedCallback(t32, i33, s52) {
    this._$AK(t32, s52);
  }
  _$EO(t32, i33, s52 = l8) {
    var e42;
    const r42 = this.constructor._$Ep(t32, s52);
    if (void 0 !== r42 && true === s52.reflect) {
      const h32 = (void 0 !== (null === (e42 = s52.converter) || void 0 === e42 ? void 0 : e42.toAttribute) ? s52.converter : n22).toAttribute(i33, s52.type);
      this._$El = t32, null == h32 ? this.removeAttribute(r42) : this.setAttribute(r42, h32), this._$El = null;
    }
  }
  _$AK(t32, i33) {
    var s52;
    const e42 = this.constructor, r42 = e42._$Ev.get(t32);
    if (void 0 !== r42 && this._$El !== r42) {
      const t42 = e42.getPropertyOptions(r42), h32 = "function" == typeof t42.converter ? { fromAttribute: t42.converter } : void 0 !== (null === (s52 = t42.converter) || void 0 === s52 ? void 0 : s52.fromAttribute) ? t42.converter : n22;
      this._$El = r42, this[r42] = h32.fromAttribute(i33, t42.type), this._$El = null;
    }
  }
  requestUpdate(t32, i33, s52) {
    let e42 = true;
    void 0 !== t32 && (((s52 = s52 || this.constructor.getPropertyOptions(t32)).hasChanged || a4)(this[t32], i33) ? (this._$AL.has(t32) || this._$AL.set(t32, i33), true === s52.reflect && this._$El !== t32 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t32, s52))) : e42 = false), !this.isUpdatePending && e42 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t42) {
      Promise.reject(t42);
    }
    const t32 = this.scheduleUpdate();
    return null != t32 && await t32, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t32;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t42, i42) => this[i42] = t42), this._$Ei = void 0);
    let i33 = false;
    const s52 = this._$AL;
    try {
      i33 = this.shouldUpdate(s52), i33 ? (this.willUpdate(s52), null === (t32 = this._$ES) || void 0 === t32 || t32.forEach((t42) => {
        var i42;
        return null === (i42 = t42.hostUpdate) || void 0 === i42 ? void 0 : i42.call(t42);
      }), this.update(s52)) : this._$Ek();
    } catch (t42) {
      throw i33 = false, this._$Ek(), t42;
    }
    i33 && this._$AE(s52);
  }
  willUpdate(t32) {
  }
  _$AE(t32) {
    var i33;
    null === (i33 = this._$ES) || void 0 === i33 || i33.forEach((t42) => {
      var i42;
      return null === (i42 = t42.hostUpdated) || void 0 === i42 ? void 0 : i42.call(t42);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t32)), this.updated(t32);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t32) {
    return true;
  }
  update(t32) {
    void 0 !== this._$EC && (this._$EC.forEach((t42, i33) => this._$EO(i33, this[i33], t42)), this._$EC = void 0), this._$Ek();
  }
  updated(t32) {
  }
  firstUpdated(t32) {
  }
};
d4.finalized = true, d4.elementProperties = /* @__PURE__ */ new Map(), d4.elementStyles = [], d4.shadowRootOptions = { mode: "open" }, null == o22 || o22({ ReactiveElement: d4 }), (null !== (s22 = e22.reactiveElementVersions) && void 0 !== s22 ? s22 : e22.reactiveElementVersions = []).push("1.6.1");
var t22;
var i22 = window;
var s32 = i22.trustedTypes;
var e32 = s32 ? s32.createPolicy("lit-html", { createHTML: (t32) => t32 }) : void 0;
var o32 = `lit$${(Math.random() + "").slice(9)}$`;
var n32 = "?" + o32;
var l22 = `<${n32}>`;
var h22 = document;
var r32 = (t32 = "") => h22.createComment(t32);
var d22 = (t32) => null === t32 || "object" != typeof t32 && "function" != typeof t32;
var u4 = Array.isArray;
var c22 = (t32) => u4(t32) || "function" == typeof (null == t32 ? void 0 : t32[Symbol.iterator]);
var v3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a22 = /-->/g;
var f4 = />/g;
var _3 = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m5 = /'/g;
var p4 = /"/g;
var $2 = /^(?:script|style|textarea|title)$/i;
var g3 = (t32) => (i33, ...s52) => ({ _$litType$: t32, strings: i33, values: s52 });
var y3 = g3(1);
var w3 = g3(2);
var x3 = Symbol.for("lit-noChange");
var b3 = Symbol.for("lit-nothing");
var T2 = /* @__PURE__ */ new WeakMap();
var A3 = h22.createTreeWalker(h22, 129, null, false);
var E3 = (t32, i33) => {
  const s52 = t32.length - 1, n52 = [];
  let h32, r42 = 2 === i33 ? "<svg>" : "", d32 = v3;
  for (let i42 = 0; i42 < s52; i42++) {
    const s62 = t32[i42];
    let e42, u32, c32 = -1, g23 = 0;
    for (; g23 < s62.length && (d32.lastIndex = g23, u32 = d32.exec(s62), null !== u32); )
      g23 = d32.lastIndex, d32 === v3 ? "!--" === u32[1] ? d32 = a22 : void 0 !== u32[1] ? d32 = f4 : void 0 !== u32[2] ? ($2.test(u32[2]) && (h32 = RegExp("</" + u32[2], "g")), d32 = _3) : void 0 !== u32[3] && (d32 = _3) : d32 === _3 ? ">" === u32[0] ? (d32 = null != h32 ? h32 : v3, c32 = -1) : void 0 === u32[1] ? c32 = -2 : (c32 = d32.lastIndex - u32[2].length, e42 = u32[1], d32 = void 0 === u32[3] ? _3 : '"' === u32[3] ? p4 : m5) : d32 === p4 || d32 === m5 ? d32 = _3 : d32 === a22 || d32 === f4 ? d32 = v3 : (d32 = _3, h32 = void 0);
    const y23 = d32 === _3 && t32[i42 + 1].startsWith("/>") ? " " : "";
    r42 += d32 === v3 ? s62 + l22 : c32 >= 0 ? (n52.push(e42), s62.slice(0, c32) + "$lit$" + s62.slice(c32) + o32 + y23) : s62 + o32 + (-2 === c32 ? (n52.push(void 0), i42) : y23);
  }
  const u23 = r42 + (t32[s52] || "<?>") + (2 === i33 ? "</svg>" : "");
  if (!Array.isArray(t32) || !t32.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e32 ? e32.createHTML(u23) : u23, n52];
};
var C2 = class {
  constructor({ strings: t32, _$litType$: i33 }, e42) {
    let l42;
    this.parts = [];
    let h32 = 0, d32 = 0;
    const u23 = t32.length - 1, c32 = this.parts, [v23, a32] = E3(t32, i33);
    if (this.el = C2.createElement(v23, e42), A3.currentNode = this.el.content, 2 === i33) {
      const t42 = this.el.content, i42 = t42.firstChild;
      i42.remove(), t42.append(...i42.childNodes);
    }
    for (; null !== (l42 = A3.nextNode()) && c32.length < u23; ) {
      if (1 === l42.nodeType) {
        if (l42.hasAttributes()) {
          const t42 = [];
          for (const i42 of l42.getAttributeNames())
            if (i42.endsWith("$lit$") || i42.startsWith(o32)) {
              const s52 = a32[d32++];
              if (t42.push(i42), void 0 !== s52) {
                const t52 = l42.getAttribute(s52.toLowerCase() + "$lit$").split(o32), i52 = /([.?@])?(.*)/.exec(s52);
                c32.push({ type: 1, index: h32, name: i52[2], strings: t52, ctor: "." === i52[1] ? M3 : "?" === i52[1] ? k3 : "@" === i52[1] ? H3 : S22 });
              } else
                c32.push({ type: 6, index: h32 });
            }
          for (const i42 of t42)
            l42.removeAttribute(i42);
        }
        if ($2.test(l42.tagName)) {
          const t42 = l42.textContent.split(o32), i42 = t42.length - 1;
          if (i42 > 0) {
            l42.textContent = s32 ? s32.emptyScript : "";
            for (let s52 = 0; s52 < i42; s52++)
              l42.append(t42[s52], r32()), A3.nextNode(), c32.push({ type: 2, index: ++h32 });
            l42.append(t42[i42], r32());
          }
        }
      } else if (8 === l42.nodeType)
        if (l42.data === n32)
          c32.push({ type: 2, index: h32 });
        else {
          let t42 = -1;
          for (; -1 !== (t42 = l42.data.indexOf(o32, t42 + 1)); )
            c32.push({ type: 7, index: h32 }), t42 += o32.length - 1;
        }
      h32++;
    }
  }
  static createElement(t32, i33) {
    const s52 = h22.createElement("template");
    return s52.innerHTML = t32, s52;
  }
};
function P3(t32, i33, s52 = t32, e42) {
  var o52, n52, l42, h32;
  if (i33 === x3)
    return i33;
  let r42 = void 0 !== e42 ? null === (o52 = s52._$Co) || void 0 === o52 ? void 0 : o52[e42] : s52._$Cl;
  const u23 = d22(i33) ? void 0 : i33._$litDirective$;
  return (null == r42 ? void 0 : r42.constructor) !== u23 && (null === (n52 = null == r42 ? void 0 : r42._$AO) || void 0 === n52 || n52.call(r42, false), void 0 === u23 ? r42 = void 0 : (r42 = new u23(t32), r42._$AT(t32, s52, e42)), void 0 !== e42 ? (null !== (l42 = (h32 = s52)._$Co) && void 0 !== l42 ? l42 : h32._$Co = [])[e42] = r42 : s52._$Cl = r42), void 0 !== r42 && (i33 = P3(t32, r42._$AS(t32, i33.values), r42, e42)), i33;
}
var V2 = class {
  constructor(t32, i33) {
    this.u = [], this._$AN = void 0, this._$AD = t32, this._$AM = i33;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t32) {
    var i33;
    const { el: { content: s52 }, parts: e42 } = this._$AD, o52 = (null !== (i33 = null == t32 ? void 0 : t32.creationScope) && void 0 !== i33 ? i33 : h22).importNode(s52, true);
    A3.currentNode = o52;
    let n52 = A3.nextNode(), l42 = 0, r42 = 0, d32 = e42[0];
    for (; void 0 !== d32; ) {
      if (l42 === d32.index) {
        let i42;
        2 === d32.type ? i42 = new N3(n52, n52.nextSibling, this, t32) : 1 === d32.type ? i42 = new d32.ctor(n52, d32.name, d32.strings, this, t32) : 6 === d32.type && (i42 = new I3(n52, this, t32)), this.u.push(i42), d32 = e42[++r42];
      }
      l42 !== (null == d32 ? void 0 : d32.index) && (n52 = A3.nextNode(), l42++);
    }
    return o52;
  }
  p(t32) {
    let i33 = 0;
    for (const s52 of this.u)
      void 0 !== s52 && (void 0 !== s52.strings ? (s52._$AI(t32, s52, i33), i33 += s52.strings.length - 2) : s52._$AI(t32[i33])), i33++;
  }
};
var N3 = class {
  constructor(t32, i33, s52, e42) {
    var o52;
    this.type = 2, this._$AH = b3, this._$AN = void 0, this._$AA = t32, this._$AB = i33, this._$AM = s52, this.options = e42, this._$Cm = null === (o52 = null == e42 ? void 0 : e42.isConnected) || void 0 === o52 || o52;
  }
  get _$AU() {
    var t32, i33;
    return null !== (i33 = null === (t32 = this._$AM) || void 0 === t32 ? void 0 : t32._$AU) && void 0 !== i33 ? i33 : this._$Cm;
  }
  get parentNode() {
    let t32 = this._$AA.parentNode;
    const i33 = this._$AM;
    return void 0 !== i33 && 11 === t32.nodeType && (t32 = i33.parentNode), t32;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t32, i33 = this) {
    t32 = P3(this, t32, i33), d22(t32) ? t32 === b3 || null == t32 || "" === t32 ? (this._$AH !== b3 && this._$AR(), this._$AH = b3) : t32 !== this._$AH && t32 !== x3 && this.g(t32) : void 0 !== t32._$litType$ ? this.$(t32) : void 0 !== t32.nodeType ? this.T(t32) : c22(t32) ? this.k(t32) : this.g(t32);
  }
  O(t32, i33 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t32, i33);
  }
  T(t32) {
    this._$AH !== t32 && (this._$AR(), this._$AH = this.O(t32));
  }
  g(t32) {
    this._$AH !== b3 && d22(this._$AH) ? this._$AA.nextSibling.data = t32 : this.T(h22.createTextNode(t32)), this._$AH = t32;
  }
  $(t32) {
    var i33;
    const { values: s52, _$litType$: e42 } = t32, o52 = "number" == typeof e42 ? this._$AC(t32) : (void 0 === e42.el && (e42.el = C2.createElement(e42.h, this.options)), e42);
    if ((null === (i33 = this._$AH) || void 0 === i33 ? void 0 : i33._$AD) === o52)
      this._$AH.p(s52);
    else {
      const t42 = new V2(o52, this), i42 = t42.v(this.options);
      t42.p(s52), this.T(i42), this._$AH = t42;
    }
  }
  _$AC(t32) {
    let i33 = T2.get(t32.strings);
    return void 0 === i33 && T2.set(t32.strings, i33 = new C2(t32)), i33;
  }
  k(t32) {
    u4(this._$AH) || (this._$AH = [], this._$AR());
    const i33 = this._$AH;
    let s52, e42 = 0;
    for (const o52 of t32)
      e42 === i33.length ? i33.push(s52 = new N3(this.O(r32()), this.O(r32()), this, this.options)) : s52 = i33[e42], s52._$AI(o52), e42++;
    e42 < i33.length && (this._$AR(s52 && s52._$AB.nextSibling, e42), i33.length = e42);
  }
  _$AR(t32 = this._$AA.nextSibling, i33) {
    var s52;
    for (null === (s52 = this._$AP) || void 0 === s52 || s52.call(this, false, true, i33); t32 && t32 !== this._$AB; ) {
      const i42 = t32.nextSibling;
      t32.remove(), t32 = i42;
    }
  }
  setConnected(t32) {
    var i33;
    void 0 === this._$AM && (this._$Cm = t32, null === (i33 = this._$AP) || void 0 === i33 || i33.call(this, t32));
  }
};
var S22 = class {
  constructor(t32, i33, s52, e42, o52) {
    this.type = 1, this._$AH = b3, this._$AN = void 0, this.element = t32, this.name = i33, this._$AM = e42, this.options = o52, s52.length > 2 || "" !== s52[0] || "" !== s52[1] ? (this._$AH = Array(s52.length - 1).fill(new String()), this.strings = s52) : this._$AH = b3;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t32, i33 = this, s52, e42) {
    const o52 = this.strings;
    let n52 = false;
    if (void 0 === o52)
      t32 = P3(this, t32, i33, 0), n52 = !d22(t32) || t32 !== this._$AH && t32 !== x3, n52 && (this._$AH = t32);
    else {
      const e53 = t32;
      let l42, h32;
      for (t32 = o52[0], l42 = 0; l42 < o52.length - 1; l42++)
        h32 = P3(this, e53[s52 + l42], i33, l42), h32 === x3 && (h32 = this._$AH[l42]), n52 || (n52 = !d22(h32) || h32 !== this._$AH[l42]), h32 === b3 ? t32 = b3 : t32 !== b3 && (t32 += (null != h32 ? h32 : "") + o52[l42 + 1]), this._$AH[l42] = h32;
    }
    n52 && !e42 && this.j(t32);
  }
  j(t32) {
    t32 === b3 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t32 ? t32 : "");
  }
};
var M3 = class extends S22 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t32) {
    this.element[this.name] = t32 === b3 ? void 0 : t32;
  }
};
var R3 = s32 ? s32.emptyScript : "";
var k3 = class extends S22 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t32) {
    t32 && t32 !== b3 ? this.element.setAttribute(this.name, R3) : this.element.removeAttribute(this.name);
  }
};
var H3 = class extends S22 {
  constructor(t32, i33, s52, e42, o52) {
    super(t32, i33, s52, e42, o52), this.type = 5;
  }
  _$AI(t32, i33 = this) {
    var s52;
    if ((t32 = null !== (s52 = P3(this, t32, i33, 0)) && void 0 !== s52 ? s52 : b3) === x3)
      return;
    const e42 = this._$AH, o52 = t32 === b3 && e42 !== b3 || t32.capture !== e42.capture || t32.once !== e42.once || t32.passive !== e42.passive, n52 = t32 !== b3 && (e42 === b3 || o52);
    o52 && this.element.removeEventListener(this.name, this, e42), n52 && this.element.addEventListener(this.name, this, t32), this._$AH = t32;
  }
  handleEvent(t32) {
    var i33, s52;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s52 = null === (i33 = this.options) || void 0 === i33 ? void 0 : i33.host) && void 0 !== s52 ? s52 : this.element, t32) : this._$AH.handleEvent(t32);
  }
};
var I3 = class {
  constructor(t32, i33, s52) {
    this.element = t32, this.type = 6, this._$AN = void 0, this._$AM = i33, this.options = s52;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t32) {
    P3(this, t32);
  }
};
var L3 = { P: "$lit$", A: o32, M: n32, C: 1, L: E3, R: V2, D: c22, V: P3, I: N3, H: S22, N: k3, U: H3, B: M3, F: I3 };
var z3 = i22.litHtmlPolyfillSupport;
null == z3 || z3(C2, N3), (null !== (t22 = i22.litHtmlVersions) && void 0 !== t22 ? t22 : i22.litHtmlVersions = []).push("2.6.1");
var Z3 = (t32, i33, s52) => {
  var e42, o52;
  const n52 = null !== (e42 = null == s52 ? void 0 : s52.renderBefore) && void 0 !== e42 ? e42 : i33;
  let l42 = n52._$litPart$;
  if (void 0 === l42) {
    const t42 = null !== (o52 = null == s52 ? void 0 : s52.renderBefore) && void 0 !== o52 ? o52 : null;
    n52._$litPart$ = l42 = new N3(i33.insertBefore(r32(), t42), t42, void 0, null != s52 ? s52 : {});
  }
  return l42._$AI(t32), l42;
};
var l32;
var o42;
var s42 = class extends d4 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t32, e42;
    const i33 = super.createRenderRoot();
    return null !== (t32 = (e42 = this.renderOptions).renderBefore) && void 0 !== t32 || (e42.renderBefore = i33.firstChild), i33;
  }
  update(t32) {
    const i33 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t32), this._$Dt = Z3(i33, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t32;
    super.connectedCallback(), null === (t32 = this._$Dt) || void 0 === t32 || t32.setConnected(true);
  }
  disconnectedCallback() {
    var t32;
    super.disconnectedCallback(), null === (t32 = this._$Dt) || void 0 === t32 || t32.setConnected(false);
  }
  render() {
    return x3;
  }
};
s42.finalized = true, s42._$litElement$ = true, null === (l32 = globalThis.litElementHydrateSupport) || void 0 === l32 || l32.call(globalThis, { LitElement: s42 });
var n42 = globalThis.litElementPolyfillSupport;
null == n42 || n42({ LitElement: s42 });
(null !== (o42 = globalThis.litElementVersions) && void 0 !== o42 ? o42 : globalThis.litElementVersions = []).push("3.2.0");

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js
var component_styles_default = i7`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q7VOXEWK.js
var divider_styles_default = i7`
  ${component_styles_default}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js
var __defProp3 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a7, b5) => {
  for (var prop in b5 || (b5 = {}))
    if (__hasOwnProp2.call(b5, prop))
      __defNormalProp2(a7, prop, b5[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b5)) {
      if (__propIsEnum2.call(b5, prop))
        __defNormalProp2(a7, prop, b5[prop]);
    }
  return a7;
};
var __spreadProps2 = (a7, b5) => __defProps2(a7, __getOwnPropDescs2(b5));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decorateClass2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i12 = decorators.length - 1, decorator; i12 >= 0; i12--)
    if (decorator = decorators[i12])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp3(target, key, result);
  return result;
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues2({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property) => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js
var e9 = (e62) => (n24) => "function" == typeof n24 ? ((e72, n33) => (customElements.define(e72, n33), n33))(e62, n24) : ((e72, n33) => {
  const { kind: t24, elements: s24 } = n33;
  return { kind: t24, elements: s24, finisher(n43) {
    customElements.define(e72, n43);
  } };
})(e62, n24);
var i8 = (i33, e62) => "method" === e62.kind && e62.descriptor && !("value" in e62.descriptor) ? __spreadProps2(__spreadValues2({}, e62), { finisher(n24) {
  n24.createProperty(e62.key, i33);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e62.key, initializer() {
  "function" == typeof e62.initializer && (this[e62.key] = e62.initializer.call(this));
}, finisher(n24) {
  n24.createProperty(e62.key, i33);
} };
function e23(e62) {
  return (n24, t24) => void 0 !== t24 ? ((i33, e72, n33) => {
    e72.constructor.createProperty(n33, i33);
  })(e62, n24, t24) : i8(e62, n24);
}
function t7(t24) {
  return e23(__spreadProps2(__spreadValues2({}, t24), { state: true }));
}
var o9 = ({ finisher: e62, descriptor: t24 }) => (o24, n24) => {
  var r9;
  if (void 0 === n24) {
    const n33 = null !== (r9 = o24.originalKey) && void 0 !== r9 ? r9 : o24.key, i33 = null != t24 ? { kind: "method", placement: "prototype", key: n33, descriptor: t24(o24.key) } : __spreadProps2(__spreadValues2({}, o24), { key: n33 });
    return null != e62 && (i33.finisher = function(t32) {
      e62(t32, n33);
    }), i33;
  }
  {
    const r24 = o24.constructor;
    void 0 !== t24 && Object.defineProperty(o24, n24, t24(n24)), null == e62 || e62(r24, n24);
  }
};
function i23(i33, n24) {
  return o9({ descriptor: (o24) => {
    const t24 = { get() {
      var o34, n33;
      return null !== (n33 = null === (o34 = this.renderRoot) || void 0 === o34 ? void 0 : o34.querySelector(i33)) && void 0 !== n33 ? n33 : null;
    }, enumerable: true, configurable: true };
    if (n24) {
      const n33 = "symbol" == typeof o24 ? Symbol() : "__" + o24;
      t24.get = function() {
        var o34, t32;
        return void 0 === this[n33] && (this[n33] = null !== (t32 = null === (o34 = this.renderRoot) || void 0 === o34 ? void 0 : o34.querySelector(i33)) && void 0 !== t32 ? t32 : null), this[n33];
      };
    }
    return t24;
  } });
}
var n10;
var e52 = null != (null === (n10 = window.HTMLSlotElement) || void 0 === n10 ? void 0 : n10.prototype.assignedElements) ? (o24, n24) => o24.assignedElements(n24) : (o24, n24) => o24.assignedNodes(n24).filter((o34) => o34.nodeType === Node.ELEMENT_NODE);
var ShoelaceElement = class extends s42 {
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues2({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
};
__decorateClass2([
  e23()
], ShoelaceElement.prototype, "dir", 2);
__decorateClass2([
  e23()
], ShoelaceElement.prototype, "lang", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3FDOQGW5.js
var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass2([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass2([
  e9("sl-divider")
], SlDivider);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s13) => {
        return /shoelace(\.min)?\.js($|\?)/.test(s13.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s13.src);
      });
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
var library = {
  name: "default",
  resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
};
var library_default_default = library;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js
var icon_styles_default = i7`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4225MTJ.js
var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var SlIcon = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.svg = null;
    this.label = "";
    this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  static async resolveIcon(url) {
    var _a21;
    let fileData;
    try {
      fileData = await fetch(url, { mode: "cors" });
      if (!fileData.ok)
        return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch (e34) {
      return RETRYABLE_ERROR;
    }
    try {
      const div = document.createElement("div");
      div.innerHTML = await fileData.text();
      const svg = div.firstElementChild;
      if (((_a21 = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a21.toLowerCase()) !== "svg")
        return CACHEABLE_ERROR;
      if (!parser)
        parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");
      const svgEl = doc.body.querySelector("svg");
      if (!svgEl)
        return CACHEABLE_ERROR;
      svgEl.part.add("svg");
      return document.adoptNode(svgEl);
    } catch (e34) {
      return CACHEABLE_ERROR;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library2 = getIconLibrary(this.library);
    if (this.name && library2) {
      return library2.resolver(this.name);
    }
    return this.src;
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a21;
    const library2 = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = SlIcon.resolveIcon(url);
      iconCache.set(url, iconResolver);
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getUrl()) {
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.emit("sl-error");
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a21 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a21.call(library2, this.svg);
        this.emit("sl-load");
    }
  }
  render() {
    return this.svg;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass2([
  t7()
], SlIcon.prototype, "svg", 2);
__decorateClass2([
  e23({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass2([
  e23()
], SlIcon.prototype, "src", 2);
__decorateClass2([
  e23()
], SlIcon.prototype, "label", 2);
__decorateClass2([
  e23({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass2([
  watch("label")
], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass2([
  watch(["name", "src", "library"])
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass2([
  e9("sl-icon")
], SlIcon);

// node_modules/lit-html/directives/style-map.js
var i9 = "important";
var n11 = " !" + i9;
var o10 = e7(class extends i4 {
  constructor(t10) {
    var e13;
    if (super(t10), t10.type !== t4.ATTRIBUTE || "style" !== t10.name || (null === (e13 = t10.strings) || void 0 === e13 ? void 0 : e13.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t10) {
    return Object.keys(t10).reduce((e13, r9) => {
      const s13 = t10[r9];
      return null == s13 ? e13 : e13 + `${r9 = r9.includes("-") ? r9 : r9.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s13};`;
    }, "");
  }
  update(e13, [r9]) {
    const { style: s13 } = e13.element;
    if (void 0 === this.ut) {
      this.ut = /* @__PURE__ */ new Set();
      for (const t10 in r9)
        this.ut.add(t10);
      return this.render(r9);
    }
    this.ut.forEach((t10) => {
      null == r9[t10] && (this.ut.delete(t10), t10.includes("-") ? s13.removeProperty(t10) : s13[t10] = "");
    });
    for (const t10 in r9) {
      const e14 = r9[t10];
      if (null != e14) {
        this.ut.add(t10);
        const r10 = "string" == typeof e14 && e14.endsWith(n11);
        t10.includes("-") || r10 ? s13.setProperty(t10, r10 ? e14.slice(0, -11) : e14, r10 ? i9 : "") : s13[t10] = e14;
      }
    }
    return T;
  }
});

// src/components/Common/circular-icons.ts
var _a2;
customElements.define("pwa-circular-icon", (_a2 = class extends s4 {
  static get properties() {
    return {
      icon: { type: String },
      isActive: { type: Boolean },
      hasSeprator: { type: Boolean },
      iconFont: { type: Number },
      activeIcon: { type: Boolean },
      width: { type: Number },
      height: { type: Number },
      isLetterIcon: { type: String }
    };
  }
  injectStyles() {
    if (this.width)
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    return {
      width: "42px",
      height: "42px"
    };
  }
  renderIcon() {
    if (this.isLetterIcon) {
      return x` <p>${this.isLetterIcon}</p> `;
    }
    return x`
      <sl-icon
        style=${o10({
      fontSize: `${this.iconFont}px`
    })}
        class=${this.isActive ? "white-i" : "active-i"}
        name=${this.icon}
      ></sl-icon>
    `;
  }
  render() {
    return x`
      <div
        class="icon-container ${this.isActive ? "active" : ""} "
        style=${o10(this.injectStyles())}
      >
        ${this.renderIcon()}
      </div>
    `;
  }
}, _a2.styles = [
  rootStyles,
  i`
      .icon-container {
        border-radius: 50%;
        background: var(--icon-gray);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active {
        background: var(--primary-blue);
      }
      .white-i {
        color: var(--white);
      }
      .active-i {
        color: var(--primary-blue);
      }
      sl-icon {
        font-size: 20px;
      }
      p {
        color: var(--white);
      }
    `
], _a2));

// node_modules/lit-html/directives/repeat.js
var u5 = (e13, s13, t10) => {
  const r9 = /* @__PURE__ */ new Map();
  for (let l13 = s13; l13 <= t10; l13++)
    r9.set(e13[l13], l13);
  return r9;
};
var c8 = e7(class extends i4 {
  constructor(e13) {
    if (super(e13), e13.type !== t4.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e13, s13, t10) {
    let r9;
    void 0 === t10 ? t10 = s13 : void 0 !== s13 && (r9 = s13);
    const l13 = [], o13 = [];
    let i12 = 0;
    for (const s14 of e13)
      l13[i12] = r9 ? r9(s14, i12) : i12, o13[i12] = t10(s14, i12), i12++;
    return { values: o13, keys: l13 };
  }
  render(e13, s13, t10) {
    return this.dt(e13, s13, t10).values;
  }
  update(s13, [t10, r9, c10]) {
    var d6;
    const a7 = m2(s13), { values: p6, keys: v4 } = this.dt(t10, r9, c10);
    if (!Array.isArray(a7))
      return this.ht = v4, p6;
    const h8 = null !== (d6 = this.ht) && void 0 !== d6 ? d6 : this.ht = [], m7 = [];
    let y4, x5, j3 = 0, k5 = a7.length - 1, w5 = 0, A5 = p6.length - 1;
    for (; j3 <= k5 && w5 <= A5; )
      if (null === a7[j3])
        j3++;
      else if (null === a7[k5])
        k5--;
      else if (h8[j3] === v4[w5])
        m7[w5] = u2(a7[j3], p6[w5]), j3++, w5++;
      else if (h8[k5] === v4[A5])
        m7[A5] = u2(a7[k5], p6[A5]), k5--, A5--;
      else if (h8[j3] === v4[A5])
        m7[A5] = u2(a7[j3], p6[A5]), r4(s13, m7[A5 + 1], a7[j3]), j3++, A5--;
      else if (h8[k5] === v4[w5])
        m7[w5] = u2(a7[k5], p6[w5]), r4(s13, a7[j3], a7[k5]), k5--, w5++;
      else if (void 0 === y4 && (y4 = u5(v4, w5, A5), x5 = u5(h8, j3, k5)), y4.has(h8[j3]))
        if (y4.has(h8[k5])) {
          const e13 = x5.get(v4[w5]), t11 = void 0 !== e13 ? a7[e13] : null;
          if (null === t11) {
            const e14 = r4(s13, a7[j3]);
            u2(e14, p6[w5]), m7[w5] = e14;
          } else
            m7[w5] = u2(t11, p6[w5]), r4(s13, a7[j3], t11), a7[e13] = null;
          w5++;
        } else
          p2(a7[k5]), k5--;
      else
        p2(a7[j3]), j3++;
    for (; w5 <= A5; ) {
      const e13 = r4(s13, m7[A5 + 1]);
      u2(e13, p6[w5]), m7[w5++] = e13;
    }
    for (; j3 <= k5; ) {
      const e13 = a7[j3++];
      null !== e13 && p2(e13);
    }
    return this.ht = v4, s5(s13, m7), T;
  }
});

// src/components/Chat/SideBar/nav-bar.ts
var NavBar = class extends s4 {
  constructor() {
    super(...arguments);
    this.activeIcon = 0;
  }
  static get properties() {
    return {
      activeIcon: { type: Number }
    };
  }
  renderNavItems() {
    return x`
      ${c8(navigationData, (item, index) => {
      return x`
          <li>
            <p class="style-me">
              <pwa-circular-icon
                .isActive=${this.activeIcon === index}
                icon=${item.icons}
                @click=${() => this.activeIcon = index}
              >
              </pwa-circular-icon>
            </p>
          </li>
          ${item.hasSeprator ? x`<sl-divider></sl-divider>` : null}
        `;
    })}
    `;
  }
  render() {
    return x`
      <nav>
        <ul>
          ${this.renderNavItems()}
        </ul>
      </nav>
    `;
  }
};
NavBar.styles = [
  rootStyles,
  i`
      li {
        padding: 16px;
      }
      p {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    `
];
customElements.define("pwa-nav", NavBar);

// src/components/Chat/SideBar/index.ts
var _a3;
customElements.define("pwa-chat-sidebar", (_a3 = class extends s4 {
  render() {
    return x`
      <pwa-sidebar-header></pwa-sidebar-header>
      <pwa-nav></pwa-nav>
    `;
  }
}, _a3.styles = [rootStyles], _a3));

// src/components/Chat/ChatType/header.ts
var _a4;
customElements.define("pwa-chat-type-header", (_a4 = class extends s4 {
  render() {
    return x`
      <header>
        <div class="chat-type-head-container">
          <p>Chats</p>
          <pwa-circular-icon
            width=${30}
            height=${30}
            iconFont=${12}
            activeIcon=${true}
            icon=${"plus-square"}
          >
          </pwa-circular-icon>
        </div>
      </header>
    `;
  }
}, _a4.styles = [
  rootStyles,
  i`
      header {
        height: 60px;
        background: var(--primary-gray);
        .chat-type-head-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 14px 12px;
        }
        p {
          font-size: 16px;
          font-weight: 700;
          color: var(--txt-primary-blue);
          line-height: 23px;
        }
      }
    `
], _a4));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OAQT3AUQ.js
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.65AZ2BGN.js
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps2(__spreadValues2({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        const handleAnimationEvent = requestAnimationFrame(resolve);
        animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
        animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
        animation.cancel();
      });
    })
  );
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(event) {
    const slot = event.target;
    if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
      this.host.requestUpdate();
    }
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js
var connectedElements = /* @__PURE__ */ new Set();
var documentElementObserver = new MutationObserver(update);
var translations = /* @__PURE__ */ new Map();
var documentDirection = document.documentElement.dir || "ltr";
var documentLanguage = document.documentElement.lang || navigator.language;
var fallback;
documentElementObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["dir", "lang"]
});
function registerTranslation(...translation2) {
  translation2.map((t10) => {
    const code = t10.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t10));
    } else {
      translations.set(code, t10);
    }
    if (!fallback) {
      fallback = t10;
    }
  });
  update();
}
function update() {
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a21, _b;
    const locale = new Intl.Locale(lang);
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a21 = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a21 === void 0 ? void 0 : _a21.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return { locale, language, region, primary, secondary };
  }
  exists(key, options) {
    var _a21;
    const { primary, secondary } = this.getTranslationData((_a21 = options.lang) !== null && _a21 !== void 0 ? _a21 : this.lang());
    options = Object.assign({ includeFallback: false }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MQ6XKY3Z.js
var LocalizeController2 = class extends LocalizeController {
};
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copy: "Copy",
  currentValue: "Current value",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (num) => {
    if (num === 0)
      return "No options selected";
    if (num === 1)
      return "1 option selected";
    return `${num} options selected`;
  },
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UTZKJDOX.js
var alert_styles_default = i7`
  ${component_styles_default}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js
var t8 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e10 = (t24) => (...e25) => ({ _$litDirective$: t24, values: e25 });
var i10 = class {
  constructor(t24) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t24, e25, i25) {
    this._$Ct = t24, this._$AM = e25, this._$Ci = i25;
  }
  _$AS(t24, e25) {
    return this.update(t24, e25);
  }
  update(t24, e25) {
    return this.render(...e25);
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js
var o11 = e10(class extends i10 {
  constructor(t24) {
    var i25;
    if (super(t24), t24.type !== t8.ATTRIBUTE || "class" !== t24.name || (null === (i25 = t24.strings) || void 0 === i25 ? void 0 : i25.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t24) {
    return " " + Object.keys(t24).filter((i25) => t24[i25]).join(" ") + " ";
  }
  update(i25, [s13]) {
    var r9, o24;
    if (void 0 === this.nt) {
      this.nt = /* @__PURE__ */ new Set(), void 0 !== i25.strings && (this.st = new Set(i25.strings.join(" ").split(/\s/).filter((t24) => "" !== t24)));
      for (const t24 in s13)
        s13[t24] && !(null === (r9 = this.st) || void 0 === r9 ? void 0 : r9.has(t24)) && this.nt.add(t24);
      return this.render(s13);
    }
    const e25 = i25.element.classList;
    this.nt.forEach((t24) => {
      t24 in s13 || (e25.remove(t24), this.nt.delete(t24));
    });
    for (const t24 in s13) {
      const i33 = !!s13[t24];
      i33 === this.nt.has(t24) || (null === (o24 = this.st) || void 0 === o24 ? void 0 : o24.has(t24)) || (i33 ? (e25.add(t24), this.nt.add(t24)) : (e25.remove(t24), this.nt.delete(t24)));
    }
    return x3;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NOTVUTQH.js
var toastStack = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
var SlAlert = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon", "suffix");
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.closable = false;
    this.variant = "primary";
    this.duration = Infinity;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
    }
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "alert.show", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      clearTimeout(this.autoHideTimeout);
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "alert.hide", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  /** Shows the alert. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise((resolve) => {
      if (toastStack.parentElement === null) {
        document.body.append(toastStack);
      }
      toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener(
        "sl-after-hide",
        () => {
          toastStack.removeChild(this);
          resolve();
          if (toastStack.querySelector("sl-alert") === null) {
            toastStack.remove();
          }
        },
        { once: true }
      );
    });
  }
  render() {
    return y3`
      <div
        part="base"
        class=${o11({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--has-icon": this.hasSlotController.test("icon"),
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <slot name="icon" part="icon" class="alert__icon"></slot>

        <slot part="message" class="alert__message" aria-live="polite"></slot>

        ${this.closable ? y3`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlAlert.styles = alert_styles_default;
__decorateClass2([
  i23('[part~="base"]')
], SlAlert.prototype, "base", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlAlert.prototype, "open", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlAlert.prototype, "closable", 2);
__decorateClass2([
  e23({ reflect: true })
], SlAlert.prototype, "variant", 2);
__decorateClass2([
  e23({ type: Number })
], SlAlert.prototype, "duration", 2);
__decorateClass2([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert.prototype, "handleOpenChange", 1);
__decorateClass2([
  watch("duration")
], SlAlert.prototype, "handleDurationChange", 1);
SlAlert = __decorateClass2([
  e9("sl-alert")
], SlAlert);
setDefaultAnimation("alert.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("alert.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UL4X2GHI.js
var icon_button_styles_default = i7`
  ${component_styles_default}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js
var e11 = Symbol.for("");
var l9 = (t10) => {
  if ((null == t10 ? void 0 : t10.r) === e11)
    return null == t10 ? void 0 : t10._$litStatic$;
};
var i11 = (t10, ...r9) => ({ _$litStatic$: r9.reduce((r24, e25, l25) => r24 + ((t24) => {
  if (void 0 !== t24._$litStatic$)
    return t24._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t24}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e25) + t10[l25 + 1], t10[0]), r: e11 });
var s10 = /* @__PURE__ */ new Map();
var a5 = (t10) => (r9, ...e25) => {
  const o13 = e25.length;
  let i25, a24;
  const n24 = [], u23 = [];
  let c10, $3 = 0, f7 = false;
  for (; $3 < o13; ) {
    for (c10 = r9[$3]; $3 < o13 && void 0 !== (a24 = e25[$3], i25 = l9(a24)); )
      c10 += i25 + r9[++$3], f7 = true;
    u23.push(a24), n24.push(c10), $3++;
  }
  if ($3 === o13 && n24.push(r9[o13]), f7) {
    const t24 = n24.join("$$lit$$");
    void 0 === (r9 = s10.get(t24)) && (n24.raw = n24, s10.set(t24, r9 = n24)), e25 = u23;
  }
  return t10(r9, ...e25);
};
var n12 = a5(y3);
var u6 = a5(w3);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js
var l10 = (l25) => null != l25 ? l25 : b3;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KRP3ULQL.js
var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i11`a` : i11`button`;
    return n12`
      <${tag}
        part="base"
        class=${o11({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${l10(isLink ? void 0 : this.disabled)}
        type=${l10(isLink ? void 0 : "button")}
        href=${l10(isLink ? this.href : void 0)}
        target=${l10(isLink ? this.target : void 0)}
        download=${l10(isLink ? this.download : void 0)}
        rel=${l10(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l10(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${l10(this.name)}
          library=${l10(this.library)}
          src=${l10(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = icon_button_styles_default;
__decorateClass2([
  i23(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass2([
  t7()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "name", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "library", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "src", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "href", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "target", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "download", 2);
__decorateClass2([
  e23()
], SlIconButton.prototype, "label", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass2([
  e9("sl-icon-button")
], SlIconButton);

// src/utilities/toast.ts
function escapeHtml(html) {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
}
function notify(message, variant = "primary", icon = "info-circle", duration = 9e3) {
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration,
    innerHTML: `
      <sl-icon name="${icon}" slot="icon"></sl-icon>
      ${escapeHtml(message)}
    `
  });
  document.body.append(alert);
  return alert.toast();
}
var toast_default = notify;

// src/components/Chat/ChatType/content.ts
var _a5;
customElements.define("pwa-chat-type-content", (_a5 = class extends s4 {
  constructor() {
    super();
    this.locationController = new LocationController(this);
  }
  render() {
    return x`
      <div class="type-body">
        <sl-button
         @click=${() => this.locationController.goTo("/dummy-page")}
          style="margin-top:16px"
          variant="primary"
          >Go To Page</sl-button
        >
        <sl-button
         @click=${this.showToast}
          style="margin-top:16px"
          variant="danger"
          >
          Open  Toast
          <div class="btn-suffix" slot="suffix">
            <pwa-badge pill>30</pwa-badge>
          </div>
          </sl-button
        >
       
    `;
  }
  showToast() {
    toast_default(`This is custom toast`, "danger");
  }
}, _a5.styles = [rootStyles, i`
    .type-body {
      text-align:center;
    }
    .btn-suffix{
      position: absolute;
      top: 0px;
      right: 0px;
      translate: 50% -50%;
      pointer-events: none;
    }
  `], _a5));

// src/components/Chat/ChatType/index.ts
var _a6;
customElements.define("pwa-chat-types", (_a6 = class extends s4 {
  render() {
    return x`<pwa-chat-type-header></pwa-chat-type-header>
      <pwa-chat-type-content></pwa-chat-type-content> `;
  }
}, _a6.styles = [rootStyles, i``], _a6));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HP6S5QOV.js
var form_control_styles_default = i7`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZTDRT4JJ.js
var input_styles_default = i7`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OXFFPZHD.js
var { I: l11 } = L3;
var e24 = (o13) => void 0 === o13.strings;
var f5 = {};
var s11 = (o13, l33 = f5) => o13._$AH = l33;
var l23 = e10(class extends i10 {
  constructor(r9) {
    if (super(r9), r9.type !== t8.PROPERTY && r9.type !== t8.ATTRIBUTE && r9.type !== t8.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e24(r9))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r9) {
    return r9;
  }
  update(i25, [t24]) {
    if (t24 === x3 || t24 === b3)
      return t24;
    const o13 = i25.element, l33 = i25.name;
    if (i25.type === t8.PROPERTY) {
      if (t24 === o13[l33])
        return x3;
    } else if (i25.type === t8.BOOLEAN_ATTRIBUTE) {
      if (!!t24 === o13.hasAttribute(l33))
        return x3;
    } else if (i25.type === t8.ATTRIBUTE && o13.getAttribute(l33) === t24 + "")
      return x3;
    return s11(i25), t24;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZNRFAEMI.js
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function(name, old, value) {
    var _a21;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || n22;
      const fromAttribute = typeof converter === "function" ? converter : (_a21 = converter == null ? void 0 : converter.fromAttribute) != null ? _a21 : n22.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HDTNU4PB.js
var formCollections = /* @__PURE__ */ new WeakMap();
var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
var userInteractedControls = /* @__PURE__ */ new WeakSet();
var interactions = /* @__PURE__ */ new WeakMap();
var FormControlController = class {
  constructor(host, options) {
    (this.host = host).addController(this);
    this.options = __spreadValues2({
      form: (input) => {
        if (input.hasAttribute("form") && input.getAttribute("form") !== "") {
          const root = input.getRootNode();
          const formId = input.getAttribute("form");
          if (formId) {
            return root.getElementById(formId);
          }
        }
        return input.closest("form");
      },
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => {
        var _a21;
        return (_a21 = input.disabled) != null ? _a21 : false;
      },
      reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      setValue: (input, value) => input.value = value,
      assumeInteractionOn: ["sl-input"]
    }, options);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.reportFormValidity = this.reportFormValidity.bind(this);
    this.handleInteraction = this.handleInteraction.bind(this);
  }
  hostConnected() {
    const form = this.options.form(this.host);
    if (form) {
      this.attachForm(form);
    }
    interactions.set(this.host, []);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.addEventListener(event, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm();
    interactions.delete(this.host);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.removeEventListener(event, this.handleInteraction);
    });
  }
  hostUpdated() {
    const form = this.options.form(this.host);
    if (!form) {
      this.detachForm();
    }
    if (form && this.form !== form) {
      this.detachForm();
      this.attachForm(form);
    }
    if (this.host.hasUpdated) {
      this.setValidity(this.host.validity.valid);
    }
  }
  attachForm(form) {
    if (form) {
      this.form = form;
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
    } else {
      this.form = void 0;
    }
  }
  detachForm() {
    var _a21;
    if (this.form) {
      (_a21 = formCollections.get(this.form)) == null ? void 0 : _a21.delete(this.host);
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
    }
    this.form = void 0;
  }
  handleFormData(event) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);
    const isButton = this.host.tagName.toLowerCase() === "sl-button";
    if (!disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          event.formData.append(name, val.toString());
        });
      } else {
        event.formData.append(name, value.toString());
      }
    }
  }
  handleFormSubmit(event) {
    var _a21;
    const disabled = this.options.disabled(this.host);
    const reportValidity = this.options.reportValidity;
    if (this.form && !this.form.noValidate) {
      (_a21 = formCollections.get(this.form)) == null ? void 0 : _a21.forEach((control) => {
        this.setUserInteracted(control, true);
      });
    }
    if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  handleFormReset() {
    this.options.setValue(this.host, this.options.defaultValue(this.host));
    this.setUserInteracted(this.host, false);
    interactions.set(this.host, []);
  }
  handleInteraction(event) {
    const emittedEvents = interactions.get(this.host);
    if (!emittedEvents.includes(event.type)) {
      emittedEvents.push(event.type);
    }
    if (emittedEvents.length === this.options.assumeInteractionOn.length) {
      this.setUserInteracted(this.host, true);
    }
  }
  reportFormValidity() {
    if (this.form && !this.form.noValidate) {
      const elements = this.form.querySelectorAll("*");
      for (const element of elements) {
        if (typeof element.reportValidity === "function") {
          if (!element.reportValidity()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  setUserInteracted(el, hasInteracted) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }
    el.requestUpdate();
  }
  doAction(type, submitter) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if (submitter.hasAttribute(attr)) {
            button.setAttribute(attr, submitter.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    var _a21;
    return (_a21 = this.form) != null ? _a21 : null;
  }
  /** Resets the form, restoring all the control to their default value */
  reset(submitter) {
    this.doAction("reset", submitter);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(submitter) {
    this.doAction("submit", submitter);
  }
  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(isValid) {
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.has(host));
    const required = Boolean(host.required);
    host.toggleAttribute("data-required", required);
    host.toggleAttribute("data-optional", !required);
    host.toggleAttribute("data-invalid", !isValid);
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
    host.toggleAttribute("data-user-valid", isValid && hasInteracted);
  }
  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }
  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originalInvalidEvent) {
    const slInvalidEvent = new CustomEvent("sl-invalid", {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {}
    });
    if (!originalInvalidEvent) {
      slInvalidEvent.preventDefault();
    }
    if (!this.host.dispatchEvent(slInvalidEvent)) {
      originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
    }
  }
};
var validValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});
var valueMissingValidityState = Object.freeze(__spreadProps2(__spreadValues2({}, validValidityState), {
  valid: false,
  valueMissing: true
}));
var customErrorValidityState = Object.freeze(__spreadProps2(__spreadValues2({}, validValidityState), {
  valid: false,
  customError: true
}));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R4E7437B.js
var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.title = "";
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
  }
  //
  // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
  // can be set before the component is rendered.
  //
  /** Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. */
  get valueAsDate() {
    const input = document.createElement("input");
    input.type = "date";
    input.value = this.value;
    return input.valueAsDate;
  }
  set valueAsDate(newValue) {
    const input = document.createElement("input");
    input.type = "date";
    input.valueAsDate = newValue;
    this.value = input.value;
  }
  /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
  get valueAsNumber() {
    const input = document.createElement("input");
    input.type = "number";
    input.value = this.value;
    return input.valueAsNumber;
  }
  set valueAsNumber(newValue) {
    const input = document.createElement("input");
    input.type = "number";
    input.valueAsNumber = newValue;
    this.value = input.value;
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    this.emit("sl-clear");
    this.emit("sl-input");
    this.emit("sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.formControlController.updateValidity();
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formControlController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode) {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly && (typeof this.value === "number" || this.value.length > 0);
    return y3`
      <div
        part="form-control"
        class=${o11({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${o11({
      input: true,
      // Sizes
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      // States
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${l10(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l10(this.placeholder)}
              minlength=${l10(this.minlength)}
              maxlength=${l10(this.maxlength)}
              min=${l10(this.min)}
              max=${l10(this.max)}
              step=${l10(this.step)}
              .value=${l23(this.value)}
              autocapitalize=${l10(this.autocapitalize)}
              autocomplete=${l10(this.autocomplete)}
              autocorrect=${l10(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${l10(this.pattern)}
              enterkeyhint=${l10(this.enterkeyhint)}
              inputmode=${l10(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${hasClearIcon ? y3`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}
            ${this.passwordToggle && !this.disabled ? y3`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible ? y3`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          ` : y3`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  ` : ""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = input_styles_default;
__decorateClass2([
  i23(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass2([
  t7()
], SlInput.prototype, "hasFocus", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "title", 2);
__decorateClass2([
  e23({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "name", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "value", 2);
__decorateClass2([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass2([
  e23({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "label", 2);
__decorateClass2([
  e23({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "placeholder", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass2([
  e23({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass2([
  e23({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass2([
  e23({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass2([
  e23({ reflect: true })
], SlInput.prototype, "form", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "pattern", 2);
__decorateClass2([
  e23({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass2([
  e23({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "min", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "max", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "step", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "autocorrect", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "autocomplete", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass2([
  e23({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass2([
  e23()
], SlInput.prototype, "inputmode", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass2([
  watch("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass2([
  watch("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);
SlInput = __decorateClass2([
  e9("sl-input")
], SlInput);

// src/components/Common/search-bar.ts
var SearchInput = class extends s4 {
  constructor() {
    super(...arguments);
    this.showSuffix = false;
    this.placeholder = "Search...";
  }
  render() {
    return x`
      <div class="search-container">
        <sl-input placeholder=${this.placeholder} size="small" pill>
          <sl-icon class="prefix-icon" name="search" slot="prefix"></sl-icon>
          ${this.showSuffix ? x`<sl-icon class="suffix-icon" name="sliders" slot="suffix"></sl-icon>` : ""}
        </sl-input>
      </div>
    `;
  }
};
SearchInput.styles = [
  rootStyles,
  i`
      .search-container {
      }

      .prefix-icon {
        padding-left: 10px;
        color: var(--primary-blue);
      }
      .suffix-icon {
        padding-right: 10px;
        color: var(--primary-blue);
      }
    `
];
__decorateClass([
  e4({ type: Boolean })
], SearchInput.prototype, "showSuffix", 2);
__decorateClass([
  e4({ type: String })
], SearchInput.prototype, "placeholder", 2);
customElements.define("pwa-search-input", SearchInput);

// src/utilities/gptHeaderNav.ts
var gptNavigationData = [
  // {
  //   icons: 'calendar-heart',
  //   text: 'Calender'
  // },
  {
    icons: "question-circle",
    text: "question"
  },
  {
    icons: "geo-alt",
    text: "location"
  },
  {
    icons: "info-circle",
    text: "information"
  },
  {
    icons: "bell",
    text: "Bell"
  },
  {
    icons: "lock",
    text: "Lock"
  }
];

// src/components/Chat/ChatGpt/LargeDesktop/header.styles.ts
var styles = i`
  header {
    height: 60px;
    background: var(--primary-gray);
    .gpt-head-container {
      height: 100%;
      padding-top: 14px;
      padding-bottom: 14px;
      display: grid;
      grid-template-columns: 10% 35% 55%;
    }
    .left-icons-container {
      margin-left: 12px;
      margin-right: 12px;
    }
    .search-input {
      margin-left: 12px;
    }
    .icon-container {
      display: flex;
      gap: 8px;
      overflow: auto;
      justify-content: center;
      .gpt-head-icons {
        cursor: pointer;
      }
    }
  }
`;
var header_styles_default = styles;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.G7G6UAKI.js
function isTabbable(el) {
  const tag = el.tagName.toLowerCase();
  if (el.getAttribute("tabindex") === "-1") {
    return false;
  }
  if (el.hasAttribute("disabled")) {
    return false;
  }
  if (el.hasAttribute("aria-disabled") && el.getAttribute("aria-disabled") !== "false") {
    return false;
  }
  if (tag === "input" && el.getAttribute("type") === "radio" && !el.hasAttribute("checked")) {
    return false;
  }
  if (el.offsetParent === null) {
    return false;
  }
  if (window.getComputedStyle(el).visibility === "hidden") {
    return false;
  }
  if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
    return true;
  }
  if (el.hasAttribute("tabindex")) {
    return true;
  }
  if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
    return true;
  }
  return ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(tag);
}
function getTabbableBoundary(root) {
  var _a21, _b;
  const allElements = [];
  function walk(el) {
    if (el instanceof HTMLElement) {
      allElements.push(el);
      if (el.shadowRoot !== null && el.shadowRoot.mode === "open") {
        walk(el.shadowRoot);
      }
    }
    [...el.children].forEach((e13) => walk(e13));
  }
  walk(root);
  const start = (_a21 = allElements.find((el) => isTabbable(el))) != null ? _a21 : null;
  const end = (_b = allElements.reverse().find((el) => isTabbable(el))) != null ? _b : null;
  return { start, end };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XQUAZ3XN.js
var activeModals = [];
var Modal = class {
  constructor(element) {
    this.tabDirection = "forward";
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  activate() {
    activeModals.push(this.element);
    document.addEventListener("focusin", this.handleFocusIn);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  deactivate() {
    activeModals = activeModals.filter((modal) => modal !== this.element);
    document.removeEventListener("focusin", this.handleFocusIn);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  isActive() {
    return activeModals[activeModals.length - 1] === this.element;
  }
  checkFocus() {
    if (this.isActive()) {
      if (!this.element.matches(":focus-within")) {
        const { start, end } = getTabbableBoundary(this.element);
        const target = this.tabDirection === "forward" ? start : end;
        if (typeof (target == null ? void 0 : target.focus) === "function") {
          target.focus({ preventScroll: true });
        }
      }
    }
  }
  handleFocusIn() {
    this.checkFocus();
  }
  handleKeyDown(event) {
    if (event.key === "Tab" && event.shiftKey) {
      this.tabDirection = "backward";
      requestAnimationFrame(() => this.checkFocus());
    }
  }
  handleKeyUp() {
    this.tabDirection = "forward";
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RK73WSZS.js
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}
var locks = /* @__PURE__ */ new Set();
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  if (!document.body.classList.contains("sl-scroll-lock")) {
    const scrollbarWidth = getScrollbarWidth();
    document.body.classList.add("sl-scroll-lock");
    document.body.style.setProperty("--sl-scroll-lock-size", `${scrollbarWidth}px`);
  }
}
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.body.classList.remove("sl-scroll-lock");
    document.body.style.removeProperty("--sl-scroll-lock-size");
  }
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ERACEVGU.js
var dialog_styles_default = i7`
  ${component_styles_default}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RTZG4SBY.js
var SlDialog = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.modal = new Modal(this);
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
      this.addOpenListeners();
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  requestClose(source) {
    const slRequestClose = this.emit("sl-request-close", {
      cancelable: true,
      detail: { source }
    });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose", { dir: this.localize.dir() });
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  handleDocumentKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      this.addOpenListeners();
      this.originalTrigger = document.activeElement;
      this.modal.activate();
      lockBodyScrolling(this);
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit("sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          if (autoFocusTarget) {
            autoFocusTarget.focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });
      const panelAnimation = getAnimation(this, "dialog.show", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.show", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      this.modal.deactivate();
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);
      this.dialog.hidden = true;
      this.overlay.hidden = false;
      this.panel.hidden = false;
      unlockBodyScrolling(this);
      const trigger = this.originalTrigger;
      if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
        setTimeout(() => trigger.focus());
      }
      this.emit("sl-after-hide");
    }
  }
  /** Shows the dialog. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the dialog */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  render() {
    return y3`
      <div
        part="base"
        class=${o11({
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l10(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l10(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? y3`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${() => this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              ` : ""}

          <slot part="body" class="dialog__body"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDialog.styles = dialog_styles_default;
__decorateClass2([
  i23(".dialog")
], SlDialog.prototype, "dialog", 2);
__decorateClass2([
  i23(".dialog__panel")
], SlDialog.prototype, "panel", 2);
__decorateClass2([
  i23(".dialog__overlay")
], SlDialog.prototype, "overlay", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlDialog.prototype, "open", 2);
__decorateClass2([
  e23({ reflect: true })
], SlDialog.prototype, "label", 2);
__decorateClass2([
  e23({ attribute: "no-header", type: Boolean, reflect: true })
], SlDialog.prototype, "noHeader", 2);
__decorateClass2([
  watch("open", { waitUntilFirstUpdate: true })
], SlDialog.prototype, "handleOpenChange", 1);
SlDialog = __decorateClass2([
  e9("sl-dialog")
], SlDialog);
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

// src/components/Common/Dialog.ts
var _a7;
customElements.define("pwa-dialog", (_a7 = class extends s4 {
  render() {
    return x`
    <sl-dialog label="Dialog" class="dialog-overview">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <sl-button slot="footer" variant="primary">Close</sl-button>
    </sl-dialog>
    `;
  }
}, _a7.styles = [
  rootStyles,
  i``
], _a7));

// src/components/Chat/ChatGpt/LargeDesktop/header.ts
var _a8;
customElements.define("pwa-chat-gpt-header", (_a8 = class extends s4 {
  constructor() {
    super(...arguments);
    this.activeIcon = 0;
  }
  static get properties() {
    return {
      activeIcon: { type: Number }
    };
  }
  renderIconSeries() {
    return x` ${c8(gptNavigationData, (item, index) => {
      return x`
        <pwa-circular-icon
          class="gpt-head-icons"
          width=${30}
          height=${30}
          iconFont=${12}
          .isActive=${this.activeIcon === index}
          icon=${item.icons}
          @click=${() => this.handleIconClick(index)}
        >
        </pwa-circular-icon>
        <pwa-dialog id="modal-${index}" ></pwa-dialog>
      `;
    })}`;
  }
  handleIconClick(index) {
    this.activeIcon = index;
    const modal = this.shadowRoot.querySelector("pwa-dialog");
    const slDialog = modal.shadowRoot.querySelector("sl-dialog");
    slDialog.show();
  }
  render() {
    return x`
      <header>
        <div class="gpt-head-container">
          <div class="left-icons-container">
            <pwa-circular-icon
              width=${30}
              height=${30}
              iconFont=${12}
              activeIcon=${true}
              icon=${"arrow-return-left"}
            >
            </pwa-circular-icon>
          </div>
          <div class="search-input">
            <pwa-search-input showSuffix></pwa-search-input>
          </div>
          <div class="icon-container">${this.renderIconSeries()}</div>
        </div>
      </header>
    `;
  }
}, _a8.styles = [rootStyles, header_styles_default], _a8));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.W3ITKVRU.js
var badge_styles_default = i7`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ253K64.js
var SlBadge = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return y3`
      <slot
        part="base"
        class=${o11({
      badge: true,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      ></slot>
    `;
  }
};
SlBadge.styles = badge_styles_default;
__decorateClass2([
  e23({ reflect: true })
], SlBadge.prototype, "variant", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlBadge.prototype, "pill", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlBadge.prototype, "pulse", 2);
SlBadge = __decorateClass2([
  e9("sl-badge")
], SlBadge);

// src/components/Common/badge.ts
var Badge = class extends s4 {
  constructor() {
    super(...arguments);
    this.pill = false;
    this.pulse = false;
    this.variant = "primary";
  }
  render() {
    return x`
      <sl-badge
        ?pill=${this.pill}
        ?pulse=${this.pulse}
        variant=${this.variant}
      >
        <slot></slot>
      </sl-badge>
    `;
  }
};
Badge.styles = [
  rootStyles,
  i``
];
__decorateClass([
  e4({ type: Boolean })
], Badge.prototype, "pill", 2);
__decorateClass([
  e4({ type: Boolean })
], Badge.prototype, "pulse", 2);
__decorateClass([
  e4({ type: String })
], Badge.prototype, "variant", 2);
customElements.define("pwa-badge", Badge);

// src/components/shared-styles/popup-box-styles.ts
var styles2 = i`
        .popup-overview .box {
          width: 340px;
          padding: 12px;
          min-height: 50px;
          color: var(--txt-primary-blue);
          background: var(--white);
          border-radius: var(--sl-border-radius-medium);
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        }
        
        .box {
          width: 300px;
          padding: 12px;
          min-height: 50px;
          color: var(--txt-primary-blue);
          background: var(--white);
          border-radius: var(--sl-border-radius-medium);
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
          .user-info-container {
            border: 1px solid var(----icon-gray);
            padding: 12px 0;
            .link-btn {
              width: 100%;
            }
          }
        }
`;
var popup_box_styles_default = styles2;

// src/components/Chat/ChatGpt/LargeDesktop/chat-body.ts
var GPTLargeScreen = class extends s4 {
  constructor() {
    super(...arguments);
    this.isNotificationTrayOpen = false;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this.handleDomClick.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handleDomClick.bind(this));
  }
  handleDomClick(event) {
    const anchorElement = this.shadowRoot.getElementById("anchor-slot");
    const popupContentElement = this.shadowRoot.getElementById("content-slot");
    if (!event.composedPath().includes(anchorElement) && !event.composedPath().includes(popupContentElement)) {
      this.isNotificationTrayOpen = false;
    }
  }
  handleClick() {
    this.isNotificationTrayOpen = !this.isNotificationTrayOpen;
  }
  render() {
    return x`
     <div class="blinker" >
        <p class="p" >Notification Blink Badge</p>
        <pwa-badge variant="primary" pill pulse>1</pwa-badge>
        </div>
      </div>
      <div class="badge">
        <pwa-notification-tray
              .isNotificationTrayOpen=${this.isNotificationTrayOpen}
            >
              <span id="anchor-slot" slot="anchor-part">
                <pwa-badge variant="primary"  @click=${this.handleClick}>Badge</pwa-badge>
              </span>
              <span id="content-slot" slot="popup-content">
                <div class="box">
                  <pwa-search-input
                    placeholder="Marc losain"
                  ></pwa-search-input>
                  <div class="user-info-container">
                    <sl-button size="small" class="link-btn" pill
                      >chat duplicate</sl-button
                    >
                  </div>
                </div>
              </span>
            </pwa-notification-tray>

      </div>`;
  }
};
GPTLargeScreen.styles = [
  rootStyles,
  popup_box_styles_default,
  i`
      .blinker {
        width: 50%;
        padding: 8px;
        margin: 8px;
        background: lightblue;
        border-radius: 12px;
        .p {
          margin-bottom: 12px;
        }
      }
      .badge {
        padding: 24px;
      }
    `
];
__decorateClass([
  e4({ type: Boolean })
], GPTLargeScreen.prototype, "isNotificationTrayOpen", 2);
customElements.define("pwa-chat-body", GPTLargeScreen);

// src/components/Chat/ChatGpt/LargeDesktop/chat-gpt-large-desktop.ts
var _a9;
customElements.define("pwa-chat-gpt-lg-desktop", (_a9 = class extends s4 {
  render() {
    return x`
      <pwa-chat-gpt-header></pwa-chat-gpt-header>
      <pwa-chat-body></pwa-chat-body>
      `;
  }
}, _a9.styles = [rootStyles, i``], _a9));

// src/utilities/gpt-small-screen-data.ts
var gptSm = [
  {
    icon: "search",
    text: "search"
  },
  {
    icon: "clipboard2-check",
    text: "Check Clipboard"
  },
  {
    icon: "question-circle",
    text: "question"
  },
  {
    icon: "geo-alt",
    text: "location"
  },
  {
    icon: "info-circle",
    text: "information"
  },
  {
    icon: "bell",
    text: "Bell"
  },
  {
    icon: "lock",
    text: "Lock"
  }
];

// src/components/Chat/ChatGpt/SmallDesktop/chat-gpt-small-desktop.ts
var _a10;
customElements.define("pwa-chat-gpt-sm-desktop", (_a10 = class extends s4 {
  renderGPTSmallNav() {
    return x`
      ${c8(gptSm, (item) => {
      return x`
          <div class="single-item">
            <pwa-circular-icon icon=${item.icon}> </pwa-circular-icon>
          </div>
        `;
    })}
    `;
  }
  render() {
    return this.renderGPTSmallNav();
  }
}, _a10.styles = [
  rootStyles,
  i`
      .single-item {
        padding: 12px 0;
      }
    `
], _a10));

// src/components/Chat/ChatGpt/index.ts
var ChatTypeHead = class extends s4 {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.screenWidth = window.innerWidth;
  }
  render() {
    const isLargeScreen = this.screenWidth > 1024;
    return x`${isLargeScreen ? x`
          <div class="large-desktop">
            <pwa-chat-gpt-lg-desktop></pwa-chat-gpt-lg-desktop>
          </div>
        ` : x`
          <div class="small-desktop">
            <pwa-chat-gpt-sm-desktop></pwa-chat-gpt-sm-desktop>
          </div>
        `}`;
  }
};
ChatTypeHead.styles = [rootStyles, i`
  .small-desktop {
    display: flex;
    justify-content: center;
    background: var(--primary-gray);
    height: 100%;
  }
  `];
__decorateClass([
  e4()
], ChatTypeHead.prototype, "screenWidth", 2);
customElements.define("pwa-chat-gpt", ChatTypeHead);

// src/components/Chat/LiveChat/name-capsule.ts
var NameCapsule = class extends s4 {
  constructor() {
    super(...arguments);
    this.user = "Derek Bulthuis";
  }
  static get properties() {
    return {
      user: { type: String }
    };
  }
  render() {
    return x`
      <div class="capsule">
        <pwa-circular-icon
          width=${32}
          height=${32}
          isActive=${true}
          isLetterIcon=${"P"}
        >
        </pwa-circular-icon>
        <p>Patrick</p>
      </div>
    `;
  }
};
NameCapsule.styles = [
  i`
    .capsule{
      width: 94px;
      height: 32px;
      background: #7979A1;
      border-radius: 24px;
      display: flex;
      align-items: center;
      gap: 6px;
    } 
    p{
      color: var(--white);
      font-size: 12px;
      font-weight: 500;
      line-height: 16px
    }
    }
  `
];
__decorateClass([
  e4({})
], NameCapsule.prototype, "user", 2);
customElements.define("pwa-name-capsule", NameCapsule);

// src/components/Common/notification-tray.ts
var NotificationTray = class extends s4 {
  constructor() {
    super(...arguments);
    this.isNotificationTrayOpen = false;
  }
  render() {
    return x`
      <span id="external-anchor">
        <slot name="anchor-part"></slot>
      </span>
      <div class="popup-overview">
        <sl-popup
          class="popup"
          anchor="external-anchor"
          flip
          distance="10"
          placement="bottom"
          ?active=${this.isNotificationTrayOpen}
          arrow
        >
            <slot name="popup-content"></slot>
        </sl-popup>
      </div>
    `;
  }
};
NotificationTray.styles = [
  rootStyles,
  i`
      .popup-overview sl-popup {
        --arrow-color: var(--white);
      }
    `
];
__decorateClass([
  e4({ type: Boolean })
], NotificationTray.prototype, "isNotificationTrayOpen", 2);
customElements.define("pwa-notification-tray", NotificationTray);

// src/components/Chat/LiveChat/header.ts
var LiveChatPage = class extends s4 {
  constructor() {
    super();
    this.user = "Derek Bulthuis";
    this.isNotificationTrayOpen = false;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this.handleDomClick.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handleDomClick.bind(this));
  }
  handleDomClick(event) {
    const anchorElement = this.shadowRoot.getElementById("anchor-slot");
    const popupContentElement = this.shadowRoot.getElementById("content-slot");
    if (!event.composedPath().includes(anchorElement) && !event.composedPath().includes(popupContentElement)) {
      this.isNotificationTrayOpen = false;
    }
  }
  handleClick() {
    this.isNotificationTrayOpen = !this.isNotificationTrayOpen;
  }
  render() {
    return x`
      <header>
        <div class="chat-live-head-container">
          <p>${this.user} - Bconnectlivechat.nl</p>
          <div class="left-side">
            <pwa-name-capsule></pwa-name-capsule>
            <pwa-notification-tray
              .isNotificationTrayOpen=${this.isNotificationTrayOpen}
            >
              <span class="anchot-slot" id="anchor-slot" slot="anchor-part">
                <pwa-circular-icon
                  @click=${this.handleClick}
                  width=${32}
                  height=${32}
                  icon=${"link-45deg"}
                >
                </pwa-circular-icon>
              </span>
              <span id="content-slot" slot="popup-content">
                <div class="box">
                  <pwa-search-input
                    placeholder="Aaron Scott"
                  ></pwa-search-input>
                  <div class="user-info-container">
                    <sl-button size="small" class="link-btn" pill
                      >link chat</sl-button
                    >
                  </div>
                </div>
              </span>
            </pwa-notification-tray>
          </div>
        </div>
      </header>
    `;
  }
};
LiveChatPage.styles = [
  rootStyles,
  popup_box_styles_default,
  i`
      header {
        height: 60px;
        background: var(--primary-gray);
        .chat-live-head-container {
          padding: 14px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .left-side {
          display: flex;
          gap: 12px;
        }
        .anchot-slot {
          cursor: pointer
        }
      }
    `
];
__decorateClass([
  e4({})
], LiveChatPage.prototype, "user", 2);
__decorateClass([
  e4({ type: Boolean })
], LiveChatPage.prototype, "isNotificationTrayOpen", 2);
customElements.define("pwa-live-chat-header", LiveChatPage);

// src/components/Chat/LiveChat/ChatPanel/styles.ts
var styles3 = i`
  .chat-list-container {
    overflow: auto;
    /* height: calc(100vh - 60px); */
    overflow-wrap: anywhere;
    .date {
      display: flex;
      justify-content: center;
      background: var(--sky-blue);
      margin: 16px 20%;
      padding: 8px 16px;
      border-radius: 4px;
      color: var(--txt-primary-blue);
    }
    .wrapper {
      display: flex;
      margin: 12px;
      .message-conatiner {
        position: relative;
        min-height: 40px;
        width: 60%;
        background: #e5e7ee;
        color: var(--txt-primary-blue);
        padding: 8px 12px;
        border-radius: 4px;
        z-index: -1;
        .time {
          position: absolute;
          bottom: 4px;
          right: 10px;
          color: var(--light-blue);
        }
      }
    }
  }
`;
var styles_default = styles3;

// src/components/Chat/LiveChat/ChatPanel/chat-panel.ts
var ChatPanel = class extends connect(store)(s4) {
  constructor() {
    super(...arguments);
    this.messages = [];
    this.lastMessageRef = null;
  }
  updated() {
    const lastMessage = this.shadowRoot.querySelector("#last-message");
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  }
  stateChanged({ message }) {
    this.messages = message.messages || [];
  }
  getFormattedDate(cDate) {
    const date = new Date(cDate);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return formattedTime;
  }
  renderMessageList() {
    return x`
      ${c8(this.messages, (message, index) => {
      const messageStyle = {
        justifyContent: index % 2 === 0 ? "start" : "end"
      };
      return x`
          <div
            id=${index === this.messages.length - 1 ? "last-message" : "wrapper-${index}"}
            class="wrapper"
            style=${o10(messageStyle)}
          >
            <div class="message-conatiner">
              <p>${message.message}</p>
              <small class="time"
                >${this.getFormattedDate(message.timeStamp)}</small
              >
            </div>
          </div>
        `;
    })}
    `;
  }
  render() {
    return x`
      <div class="chat-list-container">
        <p class="date">
          ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    })}
        </p>
        ${this.renderMessageList()}
      </div>
    `;
  }
};
ChatPanel.styles = [rootStyles, styles_default];
__decorateClass([
  e4()
], ChatPanel.prototype, "messages", 2);
__decorateClass([
  e4()
], ChatPanel.prototype, "lastMessageRef", 2);
customElements.define("pwa-live-chat-panel", ChatPanel);

// src/components/Chat/LiveChat/content.ts
var LiveChat = class extends connect(store)(s4) {
  constructor() {
    super(...arguments);
    this.inputValue = "";
  }
  render() {
    return x`<div id="live-chat-messages" class="content">
      <pwa-live-chat-panel></pwa-live-chat-panel>
    </div> `;
  }
};
LiveChat.styles = [
  rootStyles,
  i`
      .content {
        height: calc(100vh - 128px);
        overflow: scroll;
      }
    `
];
__decorateClass([
  e4({ type: String })
], LiveChat.prototype, "inputValue", 2);
customElements.define("pwa-live-chat-module", LiveChat);

// src/components/Chat/LiveChat/footer.styles.ts
var styles4 = i`
  .footer {
    width: 100%;
    padding: 0 8px;
    ::part(base) {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .paperclip-container {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--primary-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px;
      padding: 8px;
      .paperclip {
        font-size: 24px;
        color: var(--white);
      }
    }
    .send-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px;
      padding: 12px;
      .send {
        font-size: 36px;
        color: var(--white);
      }
    }
  }
  sl-icon {
    cursor: pointer;
  }
`;
var footer_styles_default = styles4;

// src/components/Chat/LiveChat/footer.ts
var LiveChat2 = class extends connect(store)(s4) {
  constructor() {
    super(...arguments);
    this.inputValue = "";
  }
  render() {
    return x`
      <div class="footer">
        <footer class="footer">
          <form @submit=${this.handleSent} class="inline-validation">
            <sl-input
              placeholder="Type your message here..."
              class="input-pill"
              size="large"
              pill
              value=${this.inputValue}
              @input=${this.handleInputChange}
            >
              <div class="paperclip-container" slot="suffix">
                <sl-icon
                  class="paperclip"
                  name="paperclip"
                  slot="suffix"
                ></sl-icon>
              </div>
              <div class="paperclip-container" slot="suffix">
                <sl-icon
                  class="paperclip"
                  name="emoji-smile"
                  slot="suffix"
                ></sl-icon>
              </div>
              <div
                @click="${this.handleSent}"
                class="send-container"
                slot="suffix"
              >
                <sl-icon class="send" name="send" slot="suffix"></sl-icon>
              </div>
            </sl-input>
          </form>
        </footer>
      </div>
    `;
  }
  handleInputChange(event) {
    const inputElement = event.target;
    this.inputValue = inputElement.value;
  }
  handleSent(event) {
    var _a21, _b;
    event.preventDefault();
    if (((_b = (_a21 = this.inputValue) == null ? void 0 : _a21.trim()) == null ? void 0 : _b.length) < 1)
      return;
    store.dispatch(
      addMessage({
        message: this.inputValue,
        timeStamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    );
    this.inputValue = "";
  }
};
LiveChat2.styles = [rootStyles, footer_styles_default];
__decorateClass([
  e4({ type: String })
], LiveChat2.prototype, "inputValue", 2);
customElements.define("pwa-live-chat-footer", LiveChat2);

// src/components/Chat/LiveChat/index.ts
var _a11;
customElements.define("pwa-live-chat", (_a11 = class extends s4 {
  render() {
    return x` <div class="live-chat">
      <pwa-live-chat-header></pwa-live-chat-header>
      <pwa-live-chat-module></pwa-live-chat-module>
      <pwa-live-chat-footer></pwa-live-chat-footer>
    </div>`;
  }
}, _a11.styles = [
  rootStyles,
  i`
      .live-chat {
        position: relative;
      }
    `
], _a11));

// src/utilities/customer-info-header-nav.ts
var customerInfoHeader = [
  {
    icons: "person-vcard",
    text: "Identity card"
  },
  {
    icons: "robot",
    text: "robot"
  },
  {
    icons: "airplane",
    text: "paper plane"
  }
];

// src/components/Chat/CustomerInfo/header.ts
var _a12;
customElements.define("pwa-customer-info-header", (_a12 = class extends s4 {
  renderMenu() {
    return x` ${c8(customerInfoHeader, (item) => {
      return x`
        <div class="icon-container">
          <pwa-circular-icon
            width=${40}
            height=${40}
            iconFont=${18}
            icon=${item.icons}
          >
          </pwa-circular-icon>
        </div>
      `;
    })}`;
  }
  render() {
    return x`
      <header>
        <div class="customer-info-head-container">${this.renderMenu()}</div>
      </header>
    `;
  }
}, _a12.styles = [
  rootStyles,
  i`
      header {
        height: 60px;
        background: var(--primary-gray);
        .customer-info-head-container {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: end;
          gap: 8px;
          padding: 14px 12px;
        }
      }
      @media screen and (max-width: 1440px) {
        header {
          height: 100%;
          display: flex;
          .customer-info-head-container {
            display: inline-block;
            margin: 0 auto;
            .icon-container {
              margin: 16px 0;
            }
            .icon-container:first-child {
              margin-top: 0;
            }
          }
        }
      }
    `
], _a12));

// src/components/Chat/CustomerInfo/content.ts
var _a13;
customElements.define("pwa-customer-info-content", (_a13 = class extends s4 {
  render() {
    return x` Hello `;
  }
}, _a13.styles = [rootStyles, i``], _a13));

// src/components/Chat/CustomerInfo/index.ts
var ChatBody = class extends s4 {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.screenWidth = window.innerWidth;
  }
  render() {
    const isLargeScreen = this.screenWidth > 1440;
    return x`<pwa-customer-info-header></pwa-customer-info-header>
      ${isLargeScreen ? x`
      <div class="customer-content">
        <pwa-customer-info-content></pwa-customer-info-content>
      </div>
      ` : x``}`;
  }
};
ChatBody.styles = [
  rootStyles
];
__decorateClass([
  e4()
], ChatBody.prototype, "screenWidth", 2);
customElements.define("pwa-customer-info", ChatBody);

// src/components/Chat/RightSideBar/header.ts
var _a14;
customElements.define("pwa-right-sidebar-header", (_a14 = class extends s4 {
  render() {
    return x` <header class="right-bar-haed">
      <pwa-circular-icon icon=${"search"}> </pwa-circular-icon>
    </header>`;
  }
}, _a14.styles = [
  rootStyles,
  i`
      .right-bar-haed {
        height: 60px;
        background: var(--primary-gray);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
], _a14));

// src/components/Chat/RightSideBar/index.ts
var _a15;
customElements.define("pwa-right-sidebar", (_a15 = class extends s4 {
  render() {
    return x`<pwa-right-sidebar-header></pwa-right-sidebar-header> `;
  }
}, _a15.styles = [rootStyles, i``], _a15));

// src/components/Chat/styles.ts
var styles5 = i`
  section {
    display: grid;
    grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 1.4fr 72px;
    height: 100vh;
    .small-desktop {
      display: none;
    }
  }
  div:not(.customer-nav) {
    border-right: 1px solid lightgray;
  }
  @media screen and (max-width: 1440px) {
    section {
      grid-template-columns: 72px 0.8fr 2.2fr 2.2fr 0.3fr 72px;
      .section-4 {
        border-right: none;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    section {
      grid-template-columns: 72px 0.8fr 0.3fr 2.2fr 0.3fr 72px;
    }
  }
`;
var styles_default2 = styles5;

// src/components/Chat/index.ts
var _a16;
customElements.define("pwa-main-chat", (_a16 = class extends s4 {
  render() {
    return x`
      <section>
        <div class="section-1"><pwa-chat-sidebar></pwa-chat-sidebar></div>
        <div class="section-2"><pwa-chat-types></pwa-chat-types></div>
        <div class="section-3"><pwa-chat-gpt></pwa-chat-gpt></div>
        <div class="section-4"><pwa-live-chat></pwa-live-chat></div>
        <div class="section-5">
          <pwa-customer-info></pwa-customer-info>
        </div>
        <div class="section-6"><pwa-right-sidebar></pwa-right-sidebar></div>
      </section>
    `;
  }
}, _a16.styles = [rootStyles, styles_default2], _a16));

// src/components/Chat/mobile-device-ui/Header/styles.ts
var styles6 = i`
  header {
    .first-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      .status {
        width: 42px;
        height: 16px;
        color: var(--white);
        background: var(--success-green);
        padding: 2px 6px;
        font-size: var(--mobile-font-small);
        border-radius: 4px;
      }
      .icon {
        .my-icon {
          color: var(--primary-blue);
        }
      }
    }
    .search {
      padding: 0px 24px;
      ::part(base) {
        border-radius: 10px;
        height: 44px;
        align-items: center;
        font-size: 18px;
        background: var(--primary-gray);
      }
      .prefix-icon {
        padding-left: 10px;
        color: var(--dark-gray);
        font-size: 24px;
      }
    }
  }
`;
var styles_default3 = styles6;

// src/components/Chat/mobile-device-ui/Header/header.ts
var _a17;
customElements.define("pwa-chat-mobile-header", (_a17 = class extends s4 {
  render() {
    return x`
      <header>
        <div class="first-row">
          <p class="status">Online</p>
          <h3>Chats</h3>
          <div class="icon">
            <sl-icon class="my-icon" name="plus-square"></sl-icon>
          </div>
        </div>
        <div class="search">
          <sl-input class="input" placeholder="Search chats" size="small">
            <sl-icon class="prefix-icon" name="search" slot="prefix"></sl-icon>
          </sl-input>
        </div>
      </header>
    `;
  }
}, _a17.styles = [rootStyles, styles_default3], _a17));

// node_modules/lit-html/directives/unsafe-html.js
var e12 = class extends i4 {
  constructor(i12) {
    if (super(i12), this.et = A, i12.type !== t4.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r9) {
    if (r9 === A || null == r9)
      return this.ft = void 0, this.et = r9;
    if (r9 === T)
      return r9;
    if ("string" != typeof r9)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r9 === this.et)
      return this.ft;
    this.et = r9;
    const s13 = [r9];
    return s13.raw = s13, this.ft = { _$litType$: this.constructor.resultType, strings: s13, values: [] };
  }
};
e12.directiveName = "unsafeHTML", e12.resultType = 1;
var o12 = e7(e12);

// src/components/Chat/mobile-device-ui/Content/swipable.styles.ts
var styles7 = i`
  :host {
    display: block;
  }
  .tab-strip {
    border: 0;
    height: 100%;
  }

  .tab-strip.hide-buttons {
    background-color: red;
    grid-template-rows: 1fr;
  }

  .tab-content {
    height: calC(100vh - 114px);
    overflow-y: hidden;
    /* overflow-y: auto; */
    grid-template-rows: 1fr;
    scroll-snap-type: x mandatory;
    display: flex;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
  }

  .tab-content section {
    min-width: 1vw;
    display: block;
    min-width: 100vw;
    height: 100%;
    scroll-snap-align: start;
  }

  .tab-content section > * {
    height: 100%;
    padding: 0.5rem;
  }

  .tab-strip nav {
    display: var(--show-tabs, "");
    justify-content: space-between;
  }

  .tab-strip nav .nav-item {
    color: var(--light-blue);
    border-radius: 3px 3px 0px 3px;
    /* border: 1px solid #f5efef; */
    border-top-width: 1px;
    display: inline-block;
    padding: 5px 3px;
    margin-right: 0.5rem;
  }

  .tab-strip nav .nav-item:link {
    text-decoration: none;
    font-size: 12px;
  }

  .tab-strip nav .nav-item.active {
    border-top-width: 3px;
    display: inline-block;
    /* padding: 3px 3px; */
    border-top-color: orange;
    color: var(--primary-blue);
  }
  .nav-icon {
    font-size: 22px;
  }

  footer {
    border-top: 2px solid var(--skelton-border);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f5;
    padding: 4px 20px;
    text-align: center;
    font-size: 14px;
  }
`;
var swipable_styles_default = styles7;

// src/components/Chat/mobile-device-ui/Content/swipable-tabs.ts
var ChatMobileBody = class extends s4 {
  constructor() {
    super();
    this._hideButtons = false;
    this.list = [...this.querySelectorAll("pwa-swipetab")].map((i12) => {
      return {
        id: i12.getAttribute("id"),
        name: i12.getAttribute("name"),
        content: i12.innerHTML,
        active: i12.getAttribute("active") != null,
        icon: i12.className
      };
    });
  }
  static get properties() {
    return {
      hideButtons: { type: Boolean, attribute: "hide-buttons" }
    };
  }
  /**
   * Gets a boolean indicating to hide the tab buttons.
   */
  get hideButtons() {
    return this._hideButtons;
  }
  /**
   * Hides the buttons of the tabstrip.
   */
  set hideButtons(value) {
    this._hideButtons = value;
  }
  // render tab buttons based on this.list
  renderTabButtons() {
    return x`
      ${c8(
      this.list,
      (item) => item.id,
      (item) => {
        return x`<div 
            @click=${this.clickTab}
           id=${`${item.id}`} class="nav-item ${item.active ? "active" : ""}">
            <sl-icon class="nav-icon" name=${item.icon}></sl-icon>
            <p>${item.name}</div>
          </a>`;
      }
    )}
    `;
  }
  // render tabs based on this.list
  renderTabs() {
    return x`
      ${c8(
      this.list,
      (item) => item.id,
      (item) => {
        return x`<section id="${item.id}">
            ${o12(item.content)}
          </section>`;
      }
    )}
    `;
  }
  render() {
    return x` <div
      class="tab-strip ${this.hideButtons ? "hide-buttons" : ""}"
      style="--show-tabs: ${this.hideButtons ? "none" : "flex"}"
    >
      <div class="tab-content" @scroll=${this.scrollContent}>
        ${this.renderTabs()}
      </div>
      <footer>
        <nav>${this.renderTabButtons()}</nav>
      </footer>
    </div>`;
  }
  // handle tab clicks - smooth scroll
  clickTab(e13) {
    var _a21, _b;
    (_b = this.shadowRoot.getElementById((_a21 = e13.currentTarget) == null ? void 0 : _a21.id)) == null ? void 0 : _b.scrollIntoView({
      block: "start",
      inline: "start",
      behavior: "smooth"
    });
  }
  scrollContent(e13) {
    var _a21, _b;
    const container = (_a21 = e13.target) == null ? void 0 : _a21.closest(".tab-content");
    const buttons = (_b = e13.target) == null ? void 0 : _b.closest(".tab-strip").querySelectorAll("nav div");
    const scrollLeft = container.scrollLeft;
    const activeIndex = Math.round(
      scrollLeft / (container == null ? void 0 : container.offsetWidth)
    );
    const btn = buttons[activeIndex];
    buttons.forEach((b5) => {
      b5.classList.toggle("active", btn == b5);
    });
  }
};
ChatMobileBody.styles = [rootStyles, swipable_styles_default];
customElements.define("pwa-swipetabs", ChatMobileBody);

// src/utilities/dummy-chats.ts
var chatMessages = [
  {
    userName: "Rutger de groot",
    message: "this is message one",
    doubleTick: true,
    dateTime: "31 jan, 11:50"
  },
  {
    userName: "Patrick Van Eeden",
    message: "this is message two",
    doubleTick: false,
    dateTime: "31 jan, 11:50"
  },
  {
    userName: "Rutger de groot",
    message: "this is message three",
    isSeen: true,
    dateTime: "31 jan, 11:50"
  },
  {
    userName: "Rutger de groot",
    message: "this is message four",
    doubleTick: true,
    dateTime: "31 jan, 11:50"
  }
];

// src/components/Chat/mobile-device-ui/Content/Chats/styles.ts
var styles8 = i`
  .message {
    display: grid;
    grid-template-columns: 1fr 10fr;
    gap: 16px;
    padding: 6px 0;
    .icon-container {
      margin-top: 4px;
      height: 36px;
      width: 36px;
      background: var(--icon-gray);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      .whatsapp-icon {
        font-size: 20px;
      }
    }
    .message-info {
      border-bottom: 2px solid var(--skelton-border);
      padding: 4px 0;

      .h3 {
        font-size: 14px;
      }
      .top-content {
        display: flex;
        justify-content: space-between;
        .user-name {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
      .right-side {
        display: flex;
        gap: 8px;
      }
    }
  }
  .double-tick::before {
    content: "\\2714 \\2714";
    font-size: 12px;
  }
  .single-tick::before {
    content: "\\2714";
    font-size: 12px;
  }
`;
var styles_default4 = styles8;

// src/components/Chat/mobile-device-ui/Content/Chats/chat.ts
var _a18;
customElements.define("pwa-mobile-chat-tab", (_a18 = class extends s4 {
  renderChats() {
    return x`
      ${c8(chatMessages, (item) => {
      return x`
          <div class="message">
            <div class="icon-container">
              <sl-icon class="whatsapp-icon" name="whatsapp"></sl-icon>
            </div>
            <div class="message-info">
              <div class="top-content">
                <div class="user-name">
                  <h3 class="h3">${item.userName}</h3>
                  <sl-badge variant="primary" pill>Primary</sl-badge>
                </div>
                <small>${item.dateTime}</small>
              </div>
              <div class="right-side">
                <span
                  class=${item.doubleTick ? "double-tick" : "single-tick"}
                ></span>
                <p>${item.message}</p>
              </div>
            </div>
          </div>
        `;
    })}
    `;
  }
  render() {
    return x` <div>${this.renderChats()}</div> `;
  }
}, _a18.styles = [rootStyles, styles_default4], _a18));

// src/components/Chat/mobile-device-ui/Content/content-body.ts
var _a19;
customElements.define("pwa-chat-mobile-body", (_a19 = class extends s4 {
  render() {
    return x`
      <div class="chat-body">
        <div class="chat-type">
          <p>List</p>
          <p>Archive</p>
        </div>
        <pwa-swipetabs>
          <pwa-swipetab active id="tab1" name="Chats" class="chat-square-text">
            <div class="chat-tab">
              <pwa-mobile-chat-tab></pwa-mobile-chat-tab>
            </div>
          </pwa-swipetab>
          <pwa-swipetab id="tab2" name="Contacts" class="journal-medical">
            <div>Tab 2 contents</div>
          </pwa-swipetab>
          <pwa-swipetab id="tab3" name="Users" class="people">
            <div>Tab 3 contents!!!!</div>
          </pwa-swipetab>
          <pwa-swipetab id="tab4" name="Settings" class="gear">
            <div>Tab 4 contents!!!!</div>
          </pwa-swipetab>
        </pwa-swipetabs>
      </div>
    `;
  }
}, _a19.styles = [
  rootStyles,
  i`
      .chat-body {
        .chat-type {
          display: flex;
          justify-content: space-between;
          padding: 8px 24px;
          font-size: 12px;
          color: var(--dark-blue);
          border-bottom: 1px solid var(--skelton-border);
        }
        .chat-tab {
          padding: 10px 12px;
        }
      }
    `
], _a19));

// src/pages/page-chat.ts
var ChatPage = class extends connect(store)(s4) {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.handleResize = this.handleResize.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.handleResize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.screenWidth = window.innerWidth;
  }
  renderChatPage() {
    const isLargeScreen = this.screenWidth > 768;
    if (isLargeScreen) {
      return x`<div class="medium-large-devices">
        <pwa-main-chat></pwa-main-chat>
      </div>`;
    } else {
      return x`
        <div class="small-devices">
          <pwa-chat-mobile-header></pwa-chat-mobile-header>
          <pwa-chat-mobile-body></pwa-chat-mobile-body>
        </div>
      `;
    }
  }
  render() {
    return x` <main>${this.renderChatPage()}</main> `;
  }
};
ChatPage.styles = [rootStyles];
__decorateClass([
  e4()
], ChatPage.prototype, "screenWidth", 2);
customElements.define("pwa-chat-page", ChatPage);

// src/pages/page-not-found.ts
customElements.define(
  "pwa-page-not-found",
  class PageNotFound extends s4 {
    render() {
      return x`Oops, page not found!`;
    }
  }
);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NKWPNUXM.js
var button_styles_default = i7`
  ${component_styles_default}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AXWTNUN6.js
var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      form: (input) => {
        if (input.hasAttribute("form")) {
          const doc = input.getRootNode();
          const formId = input.getAttribute("form");
          return doc.getElementById(formId);
        }
        return input.closest("form");
      },
      assumeInteractionOn: ["click"]
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
    this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return this.button.validity;
    }
    return validValidityState;
  }
  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return this.button.validationMessage;
    }
    return "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleHostClick = this.handleHostClick.bind(this);
    this.addEventListener("click", this.handleHostClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleHostClick);
  }
  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick() {
    if (this.type === "submit") {
      this.formControlController.submit(this);
    }
    if (this.type === "reset") {
      this.formControlController.reset(this);
    }
  }
  handleHostClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.formControlController.setValidity(this.disabled);
    }
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i11`a` : i11`button`;
    return n12`
      <${tag}
        part="base"
        class=${o11({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${l10(isLink ? void 0 : this.disabled)}
        type=${l10(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${l10(isLink ? void 0 : this.name)}
        value=${l10(isLink ? void 0 : this.value)}
        href=${l10(isLink ? this.href : void 0)}
        target=${l10(isLink ? this.target : void 0)}
        download=${l10(isLink ? this.download : void 0)}
        rel=${l10(isLink ? this.rel : void 0)}
        role=${l10(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n12` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? n12`<sl-spinner></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass2([
  i23(".button")
], SlButton.prototype, "button", 2);
__decorateClass2([
  t7()
], SlButton.prototype, "hasFocus", 2);
__decorateClass2([
  t7()
], SlButton.prototype, "invalid", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "title", 2);
__decorateClass2([
  e23({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass2([
  e23({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "type", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "name", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "value", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "href", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "target", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "rel", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "download", 2);
__decorateClass2([
  e23()
], SlButton.prototype, "form", 2);
__decorateClass2([
  e23({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass2([
  e23({ attribute: "formenctype" })
], SlButton.prototype, "formEnctype", 2);
__decorateClass2([
  e23({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass2([
  e23({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass2([
  e23({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlButton.prototype, "handleDisabledChange", 1);
SlButton = __decorateClass2([
  e9("sl-button")
], SlButton);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js
var spinner_styles_default = i7`
  ${component_styles_default}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6FLA54KR.js
var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return y3`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass2([
  e9("sl-spinner")
], SlSpinner);

// src/pages/page-dummy.ts
var _a20;
customElements.define("pwa-page-dummy", (_a20 = class extends s4 {
  constructor() {
    super();
    this.locationController = new LocationController(this);
  }
  render() {
    return x`<div>
      <p>Hello User</p>
      <sl-button @click=${this.goBack} variant="primary">Go Back</sl-button>
    </div> `;
  }
  goBack() {
    this.locationController.goTo("/chat-page");
  }
}, _a20.styles = i`
    div {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      margin: 0 16px;
    }
  `, _a20));

// src/registerSW.ts
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
  window.addEventListener("load", () => {
    navigator.serviceWorker.addEventListener("controllerchange", function() {
    });
  });
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I5LF5K7G.js
var select_styles_default = i7`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox::slotted(small) {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KY264F7D.js
var SlSelect = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.typeToSelectString = "";
    this.hasFocus = false;
    this.displayLabel = "";
    this.selectedOptions = [];
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.placeholder = "";
    this.multiple = false;
    this.maxOptionsVisible = 3;
    this.disabled = false;
    this.clearable = false;
    this.open = false;
    this.hoist = false;
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.helpText = "";
    this.form = "";
    this.required = false;
  }
  /** Gets the validity state object */
  get validity() {
    return this.valueInput.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.valueInput.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.open = false;
  }
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }
  handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit("sl-focus");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleDocumentFocusIn(event) {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }
  handleDocumentKeyDown(event) {
    const target = event.target;
    const isClearButton = target.closest(".select__clear") !== null;
    const isIconButton = target.closest("sl-icon-button") !== null;
    if (isClearButton || isIconButton) {
      return;
    }
    if (event.key === "Escape" && this.open) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
      this.displayInput.focus({ preventScroll: true });
    }
    if (event.key === "Enter" || event.key === " " && this.typeToSelectString === "") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!this.open) {
        this.show();
        return;
      }
      if (this.currentOption && !this.currentOption.disabled) {
        if (this.multiple) {
          this.toggleOptionSelection(this.currentOption);
        } else {
          this.setSelectedOptions(this.currentOption);
        }
        this.updateComplete.then(() => {
          this.emit("sl-input");
          this.emit("sl-change");
        });
        if (!this.multiple) {
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      }
      return;
    }
    if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const allOptions = this.getAllOptions();
      const currentIndex = allOptions.indexOf(this.currentOption);
      let newIndex = Math.max(0, currentIndex);
      event.preventDefault();
      if (!this.open) {
        this.show();
        if (this.currentOption) {
          return;
        }
      }
      if (event.key === "ArrowDown") {
        newIndex = currentIndex + 1;
        if (newIndex > allOptions.length - 1)
          newIndex = 0;
      } else if (event.key === "ArrowUp") {
        newIndex = currentIndex - 1;
        if (newIndex < 0)
          newIndex = allOptions.length - 1;
      } else if (event.key === "Home") {
        newIndex = 0;
      } else if (event.key === "End") {
        newIndex = allOptions.length - 1;
      }
      this.setCurrentOption(allOptions[newIndex]);
    }
    if (event.key.length === 1 || event.key === "Backspace") {
      const allOptions = this.getAllOptions();
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (!this.open) {
        if (event.key === "Backspace") {
          return;
        }
        this.show();
      }
      event.stopPropagation();
      event.preventDefault();
      clearTimeout(this.typeToSelectTimeout);
      this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3);
      if (event.key === "Backspace") {
        this.typeToSelectString = this.typeToSelectString.slice(0, -1);
      } else {
        this.typeToSelectString += event.key.toLowerCase();
      }
      for (const option of allOptions) {
        const label = option.getTextLabel().toLowerCase();
        if (label.startsWith(this.typeToSelectString)) {
          this.setCurrentOption(option);
          break;
        }
      }
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxMouseDown(event) {
    const path = event.composedPath();
    const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "sl-icon-button");
    if (this.disabled || isIconButton) {
      return;
    }
    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }
  handleComboboxKeyDown(event) {
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }
  handleClearClick(event) {
    event.stopPropagation();
    if (this.value !== "") {
      this.setSelectedOptions([]);
      this.displayInput.focus({ preventScroll: true });
      this.updateComplete.then(() => {
        this.emit("sl-clear");
        this.emit("sl-input");
        this.emit("sl-change");
      });
    }
  }
  handleClearMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOptionClick(event) {
    const target = event.target;
    const option = target.closest("sl-option");
    const oldValue = this.value;
    if (option && !option.disabled) {
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));
      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.emit("sl-input");
          this.emit("sl-change");
        });
      }
      if (!this.multiple) {
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }
  handleDefaultSlotChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    const values = [];
    if (customElements.get("sl-option")) {
      allOptions.forEach((option) => values.push(option.value));
      this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
    } else {
      customElements.whenDefined("sl-option").then(() => this.handleDefaultSlotChange());
    }
  }
  handleTagRemove(event, option) {
    event.stopPropagation();
    if (!this.disabled) {
      this.toggleOptionSelection(option, false);
      this.updateComplete.then(() => {
        this.emit("sl-input");
        this.emit("sl-change");
      });
    }
  }
  // Gets an array of all <sl-option> elements
  getAllOptions() {
    return [...this.querySelectorAll("sl-option")];
  }
  // Gets the first <sl-option> element
  getFirstOption() {
    return this.querySelector("sl-option");
  }
  // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
  // option may be "current" at a time.
  setCurrentOption(option) {
    const allOptions = this.getAllOptions();
    allOptions.forEach((el) => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      option.focus();
    }
  }
  // Sets the selected option(s)
  setSelectedOptions(option) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach((el) => el.selected = false);
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach((el) => el.selected = true);
    }
    this.selectionChanged();
  }
  // Toggles an option's selected state
  toggleOptionSelection(option, force) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
    this.selectionChanged();
  }
  // This method must be called whenever the selection changes. It will update the selected options cache, the current
  // value, and the display value
  selectionChanged() {
    var _a21, _b, _c, _d;
    this.selectedOptions = this.getAllOptions().filter((el) => el.selected);
    if (this.multiple) {
      this.value = this.selectedOptions.map((el) => el.value);
      if (this.placeholder && this.value.length === 0) {
        this.displayLabel = "";
      } else {
        this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length);
      }
    } else {
      this.value = (_b = (_a21 = this.selectedOptions[0]) == null ? void 0 : _a21.value) != null ? _b : "";
      this.displayLabel = (_d = (_c = this.selectedOptions[0]) == null ? void 0 : _c.getTextLabel()) != null ? _d : "";
    }
    this.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
      this.handleOpenChange();
    }
  }
  handleValueChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
      this.emit("sl-show");
      this.addOpenListeners();
      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      const { keyframes, options } = getAnimation(this, "select.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
      }
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "select.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.listbox.hidden = true;
      this.popup.active = false;
      this.emit("sl-after-hide");
    }
  }
  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.valueInput.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.valueInput.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  /** Sets focus on the control. */
  focus(options) {
    this.displayInput.focus(options);
  }
  /** Removes focus from the control. */
  blur() {
    this.displayInput.blur();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    const isPlaceholderVisible = this.placeholder && this.value.length === 0;
    return y3`
      <div
        part="form-control"
        class=${o11({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${o11({
      select: true,
      "select--standard": true,
      "select--filled": this.filled,
      "select--pill": this.pill,
      "select--open": this.open,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--focused": this.hasFocus,
      "select--placeholder-visible": isPlaceholderVisible,
      "select--top": this.placement === "top",
      "select--bottom": this.placement === "bottom",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large"
    })}
            placement=${this.placement}
            strategy=${this.hoist ? "fixed" : "absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple ? y3`
                    <div part="tags" class="select__tags">
                      ${this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        return y3`
                            <sl-tag
                              part="tag"
                              exportparts="
                                base:tag__base,
                                content:tag__content,
                                remove-button:tag__remove-button,
                                remove-button__base:tag__remove-button__base
                              "
                              ?pill=${this.pill}
                              size=${this.size}
                              removable
                              @sl-remove=${(event) => this.handleTagRemove(event, option)}
                            >
                              ${option.getTextLabel()}
                            </sl-tag>
                          `;
      } else if (index === this.maxOptionsVisible) {
        return y3` <sl-tag size=${this.size}> +${this.selectedOptions.length - index} </sl-tag> `;
      } else {
        return null;
      }
    })}
                    </div>
                  ` : ""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${hasClearIcon ? y3`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
      </div>
    `;
  }
};
SlSelect.styles = select_styles_default;
__decorateClass2([
  i23(".select")
], SlSelect.prototype, "popup", 2);
__decorateClass2([
  i23(".select__combobox")
], SlSelect.prototype, "combobox", 2);
__decorateClass2([
  i23(".select__display-input")
], SlSelect.prototype, "displayInput", 2);
__decorateClass2([
  i23(".select__value-input")
], SlSelect.prototype, "valueInput", 2);
__decorateClass2([
  i23(".select__listbox")
], SlSelect.prototype, "listbox", 2);
__decorateClass2([
  t7()
], SlSelect.prototype, "hasFocus", 2);
__decorateClass2([
  t7()
], SlSelect.prototype, "displayLabel", 2);
__decorateClass2([
  t7()
], SlSelect.prototype, "currentOption", 2);
__decorateClass2([
  t7()
], SlSelect.prototype, "selectedOptions", 2);
__decorateClass2([
  e23()
], SlSelect.prototype, "name", 2);
__decorateClass2([
  e23({
    converter: {
      fromAttribute: (value) => value.split(" "),
      toAttribute: (value) => value.join(" ")
    }
  })
], SlSelect.prototype, "value", 2);
__decorateClass2([
  defaultValue()
], SlSelect.prototype, "defaultValue", 2);
__decorateClass2([
  e23()
], SlSelect.prototype, "size", 2);
__decorateClass2([
  e23()
], SlSelect.prototype, "placeholder", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "multiple", 2);
__decorateClass2([
  e23({ attribute: "max-options-visible", type: Number })
], SlSelect.prototype, "maxOptionsVisible", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "disabled", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlSelect.prototype, "clearable", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "open", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlSelect.prototype, "hoist", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "filled", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "pill", 2);
__decorateClass2([
  e23()
], SlSelect.prototype, "label", 2);
__decorateClass2([
  e23({ reflect: true })
], SlSelect.prototype, "placement", 2);
__decorateClass2([
  e23({ attribute: "help-text" })
], SlSelect.prototype, "helpText", 2);
__decorateClass2([
  e23({ reflect: true })
], SlSelect.prototype, "form", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlSelect.prototype, "required", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleDisabledChange", 1);
__decorateClass2([
  watch("value", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleValueChange", 1);
__decorateClass2([
  watch("open", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleOpenChange", 1);
SlSelect = __decorateClass2([
  e9("sl-select")
], SlSelect);
setDefaultAnimation("select.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("select.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4RNZLG33.js
var tag_styles_default = i7`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NXSD2QGE.js
var SlTag = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.variant = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return y3`
      <span
        part="base"
        class=${o11({
      tag: true,
      // Types
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      // Sizes
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      // Modifiers
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? y3`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag.styles = tag_styles_default;
__decorateClass2([
  e23({ reflect: true })
], SlTag.prototype, "variant", 2);
__decorateClass2([
  e23({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlTag.prototype, "removable", 2);
SlTag = __decorateClass2([
  e9("sl-tag")
], SlTag);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Z7MHAEL3.js
var popup_styles_default = i7`
  ${component_styles_default}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QWGZ4US6.js
function t9(t32) {
  return t32.split("-")[1];
}
function e33(t32) {
  return "y" === t32 ? "height" : "width";
}
function n13(t32) {
  return t32.split("-")[0];
}
function o23(t32) {
  return ["top", "bottom"].includes(n13(t32)) ? "x" : "y";
}
function r8(r42, i42, a32) {
  let { reference: l33, floating: s33 } = r42;
  const c32 = l33.x + l33.width / 2 - s33.width / 2, f32 = l33.y + l33.height / 2 - s33.height / 2, u32 = o23(i42), m32 = e33(u32), g32 = l33[m32] / 2 - s33[m32] / 2, d32 = "x" === u32;
  let p32;
  switch (n13(i42)) {
    case "top":
      p32 = { x: c32, y: l33.y - s33.height };
      break;
    case "bottom":
      p32 = { x: c32, y: l33.y + l33.height };
      break;
    case "right":
      p32 = { x: l33.x + l33.width, y: f32 };
      break;
    case "left":
      p32 = { x: l33.x - s33.width, y: f32 };
      break;
    default:
      p32 = { x: l33.x, y: l33.y };
  }
  switch (t9(i42)) {
    case "start":
      p32[u32] -= g32 * (a32 && d32 ? -1 : 1);
      break;
    case "end":
      p32[u32] += g32 * (a32 && d32 ? -1 : 1);
  }
  return p32;
}
var i24 = async (t32, e42, n33) => {
  const { placement: o52 = "bottom", strategy: i42 = "absolute", middleware: a32 = [], platform: l33 } = n33, s33 = a32.filter(Boolean), c32 = await (null == l33.isRTL ? void 0 : l33.isRTL(e42));
  let f32 = await l33.getElementRects({ reference: t32, floating: e42, strategy: i42 }), { x: u32, y: m32 } = r8(f32, o52, c32), g32 = o52, d32 = {}, p32 = 0;
  for (let n43 = 0; n43 < s33.length; n43++) {
    const { name: a42, fn: h32 } = s33[n43], { x: y4, y: x32, data: w32, reset: v32 } = await h32({ x: u32, y: m32, initialPlacement: o52, placement: g32, strategy: i42, middlewareData: d32, rects: f32, platform: l33, elements: { reference: t32, floating: e42 } });
    u32 = null != y4 ? y4 : u32, m32 = null != x32 ? x32 : m32, d32 = __spreadProps2(__spreadValues2({}, d32), { [a42]: __spreadValues2(__spreadValues2({}, d32[a42]), w32) }), v32 && p32 <= 50 && (p32++, "object" == typeof v32 && (v32.placement && (g32 = v32.placement), v32.rects && (f32 = true === v32.rects ? await l33.getElementRects({ reference: t32, floating: e42, strategy: i42 }) : v32.rects), { x: u32, y: m32 } = r8(f32, g32, c32)), n43 = -1);
  }
  return { x: u32, y: m32, placement: g32, strategy: i42, middlewareData: d32 };
};
function a6(t32) {
  return "number" != typeof t32 ? function(t42) {
    return __spreadValues2({ top: 0, right: 0, bottom: 0, left: 0 }, t42);
  }(t32) : { top: t32, right: t32, bottom: t32, left: t32 };
}
function l12(t32) {
  return __spreadProps2(__spreadValues2({}, t32), { top: t32.y, left: t32.x, right: t32.x + t32.width, bottom: t32.y + t32.height });
}
async function s12(t32, e42) {
  var n33;
  void 0 === e42 && (e42 = {});
  const { x: o52, y: r42, platform: i42, rects: s33, elements: c32, strategy: f32 } = t32, { boundary: u32 = "clippingAncestors", rootBoundary: m32 = "viewport", elementContext: g32 = "floating", altBoundary: d32 = false, padding: p32 = 0 } = e42, h32 = a6(p32), y4 = c32[d32 ? "floating" === g32 ? "reference" : "floating" : g32], x32 = l12(await i42.getClippingRect({ element: null == (n33 = await (null == i42.isElement ? void 0 : i42.isElement(y4))) || n33 ? y4 : y4.contextElement || await (null == i42.getDocumentElement ? void 0 : i42.getDocumentElement(c32.floating)), boundary: u32, rootBoundary: m32, strategy: f32 })), w32 = "floating" === g32 ? __spreadProps2(__spreadValues2({}, s33.floating), { x: o52, y: r42 }) : s33.reference, v32 = await (null == i42.getOffsetParent ? void 0 : i42.getOffsetParent(c32.floating)), b32 = await (null == i42.isElement ? void 0 : i42.isElement(v32)) && await (null == i42.getScale ? void 0 : i42.getScale(v32)) || { x: 1, y: 1 }, R22 = l12(i42.convertOffsetParentRelativeRectToViewportRelativeRect ? await i42.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w32, offsetParent: v32, strategy: f32 }) : w32);
  return { top: (x32.top - R22.top + h32.top) / b32.y, bottom: (R22.bottom - x32.bottom + h32.bottom) / b32.y, left: (x32.left - R22.left + h32.left) / b32.x, right: (R22.right - x32.right + h32.right) / b32.x };
}
var c9 = Math.min;
var f6 = Math.max;
function u7(t32, e42, n33) {
  return f6(t32, c9(e42, n33));
}
var m6 = (n33) => ({ name: "arrow", options: n33, async fn(r42) {
  const { element: i42, padding: l33 = 0 } = n33 || {}, { x: s33, y: c32, placement: f32, rects: m32, platform: g32 } = r42;
  if (null == i42)
    return {};
  const d32 = a6(l33), p32 = { x: s33, y: c32 }, h32 = o23(f32), y4 = e33(h32), x32 = await g32.getDimensions(i42), w32 = "y" === h32 ? "top" : "left", v32 = "y" === h32 ? "bottom" : "right", b32 = m32.reference[y4] + m32.reference[h32] - p32[h32] - m32.floating[y4], R22 = p32[h32] - m32.reference[h32], A22 = await (null == g32.getOffsetParent ? void 0 : g32.getOffsetParent(i42));
  let P32 = A22 ? "y" === h32 ? A22.clientHeight || 0 : A22.clientWidth || 0 : 0;
  0 === P32 && (P32 = m32.floating[y4]);
  const T3 = b32 / 2 - R22 / 2, O3 = d32[w32], D3 = P32 - x32[y4] - d32[v32], E32 = P32 / 2 - x32[y4] / 2 + T3, L32 = u7(O3, E32, D3), k22 = null != t9(f32) && E32 != L32 && m32.reference[y4] / 2 - (E32 < O3 ? d32[w32] : d32[v32]) - x32[y4] / 2 < 0;
  return { [h32]: p32[h32] - (k22 ? E32 < O3 ? O3 - E32 : D3 - E32 : 0), data: { [h32]: L32, centerOffset: E32 - L32 } };
} });
var g4 = ["top", "right", "bottom", "left"];
var d5 = g4.reduce((t32, e42) => t32.concat(e42, e42 + "-start", e42 + "-end"), []);
var p5 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function h7(t32) {
  return t32.replace(/left|right|bottom|top/g, (t42) => p5[t42]);
}
function y22(n33, r42, i42) {
  void 0 === i42 && (i42 = false);
  const a32 = t9(n33), l33 = o23(n33), s33 = e33(l33);
  let c32 = "x" === l33 ? a32 === (i42 ? "end" : "start") ? "right" : "left" : "start" === a32 ? "bottom" : "top";
  return r42.reference[s33] > r42.floating[s33] && (c32 = h7(c32)), { main: c32, cross: h7(c32) };
}
var x4 = { start: "end", end: "start" };
function w4(t32) {
  return t32.replace(/start|end/g, (t42) => x4[t42]);
}
var b4 = function(e42) {
  return void 0 === e42 && (e42 = {}), { name: "flip", options: e42, async fn(o52) {
    var r42;
    const { placement: i42, middlewareData: a32, rects: l33, initialPlacement: c32, platform: f32, elements: u32 } = o52, _a21 = e42, { mainAxis: m32 = true, crossAxis: g32 = true, fallbackPlacements: d32, fallbackStrategy: p32 = "bestFit", fallbackAxisSideDirection: x32 = "none", flipAlignment: v32 = true } = _a21, b32 = __objRest(_a21, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"]), R22 = n13(i42), A22 = n13(c32) === c32, P32 = await (null == f32.isRTL ? void 0 : f32.isRTL(u32.floating)), T3 = d32 || (A22 || !v32 ? [h7(c32)] : function(t32) {
      const e53 = h7(t32);
      return [w4(t32), e53, w4(e53)];
    }(c32));
    d32 || "none" === x32 || T3.push(...function(e53, o62, r52, i52) {
      const a42 = t9(e53);
      let l42 = function(t32, e62, n33) {
        const o72 = ["left", "right"], r62 = ["right", "left"], i62 = ["top", "bottom"], a52 = ["bottom", "top"];
        switch (t32) {
          case "top":
          case "bottom":
            return n33 ? e62 ? r62 : o72 : e62 ? o72 : r62;
          case "left":
          case "right":
            return e62 ? i62 : a52;
          default:
            return [];
        }
      }(n13(e53), "start" === r52, i52);
      return a42 && (l42 = l42.map((t32) => t32 + "-" + a42), o62 && (l42 = l42.concat(l42.map(w4)))), l42;
    }(c32, v32, x32, P32));
    const O3 = [c32, ...T3], D3 = await s12(o52, b32), E32 = [];
    let L32 = (null == (r42 = a32.flip) ? void 0 : r42.overflows) || [];
    if (m32 && E32.push(D3[R22]), g32) {
      const { main: t32, cross: e53 } = y22(i42, l33, P32);
      E32.push(D3[t32], D3[e53]);
    }
    if (L32 = [...L32, { placement: i42, overflows: E32 }], !E32.every((t32) => t32 <= 0)) {
      var k22, B3;
      const t32 = ((null == (k22 = a32.flip) ? void 0 : k22.index) || 0) + 1, e53 = O3[t32];
      if (e53)
        return { data: { index: t32, overflows: L32 }, reset: { placement: e53 } };
      let n33 = null == (B3 = L32.filter((t42) => t42.overflows[0] <= 0).sort((t42, e62) => t42.overflows[1] - e62.overflows[1])[0]) ? void 0 : B3.placement;
      if (!n33)
        switch (p32) {
          case "bestFit": {
            var C22;
            const t42 = null == (C22 = L32.map((t52) => [t52.placement, t52.overflows.filter((t62) => t62 > 0).reduce((t62, e62) => t62 + e62, 0)]).sort((t52, e62) => t52[1] - e62[1])[0]) ? void 0 : C22[0];
            t42 && (n33 = t42);
            break;
          }
          case "initialPlacement":
            n33 = c32;
        }
      if (i42 !== n33)
        return { reset: { placement: n33 } };
    }
    return {};
  } };
};
var O2 = function(e42) {
  return void 0 === e42 && (e42 = 0), { name: "offset", options: e42, async fn(r42) {
    const { x: i42, y: a32 } = r42, l33 = await async function(e53, r52) {
      const { placement: i52, platform: a42, elements: l42 } = e53, s33 = await (null == a42.isRTL ? void 0 : a42.isRTL(l42.floating)), c32 = n13(i52), f32 = t9(i52), u32 = "x" === o23(i52), m32 = ["left", "top"].includes(c32) ? -1 : 1, g32 = s33 && u32 ? -1 : 1, d32 = "function" == typeof r52 ? r52(e53) : r52;
      let { mainAxis: p32, crossAxis: h32, alignmentAxis: y4 } = "number" == typeof d32 ? { mainAxis: d32, crossAxis: 0, alignmentAxis: null } : __spreadValues2({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d32);
      return f32 && "number" == typeof y4 && (h32 = "end" === f32 ? -1 * y4 : y4), u32 ? { x: h32 * g32, y: p32 * m32 } : { x: p32 * m32, y: h32 * g32 };
    }(r42, e42);
    return { x: i42 + l33.x, y: a32 + l33.y, data: l33 };
  } };
};
function D2(t32) {
  return "x" === t32 ? "y" : "x";
}
var E4 = function(t32) {
  return void 0 === t32 && (t32 = {}), { name: "shift", options: t32, async fn(e42) {
    const { x: r42, y: i42, placement: a32 } = e42, _a21 = t32, { mainAxis: l33 = true, crossAxis: c32 = false, limiter: f32 = { fn: (t42) => {
      let { x: e53, y: n33 } = t42;
      return { x: e53, y: n33 };
    } } } = _a21, m32 = __objRest(_a21, ["mainAxis", "crossAxis", "limiter"]), g32 = { x: r42, y: i42 }, d32 = await s12(e42, m32), p32 = o23(n13(a32)), h32 = D2(p32);
    let y4 = g32[p32], x32 = g32[h32];
    if (l33) {
      const t42 = "y" === p32 ? "bottom" : "right";
      y4 = u7(y4 + d32["y" === p32 ? "top" : "left"], y4, y4 - d32[t42]);
    }
    if (c32) {
      const t42 = "y" === h32 ? "bottom" : "right";
      x32 = u7(x32 + d32["y" === h32 ? "top" : "left"], x32, x32 - d32[t42]);
    }
    const w32 = f32.fn(__spreadProps2(__spreadValues2({}, e42), { [p32]: y4, [h32]: x32 }));
    return __spreadProps2(__spreadValues2({}, w32), { data: { x: w32.x - r42, y: w32.y - i42 } });
  } };
};
var k4 = function(e42) {
  return void 0 === e42 && (e42 = {}), { name: "size", options: e42, async fn(r42) {
    const { placement: i42, rects: a32, platform: l33, elements: u32 } = r42, _a21 = e42, { apply: m32 = () => {
    } } = _a21, g32 = __objRest(_a21, ["apply"]), d32 = await s12(r42, g32), p32 = n13(i42), h32 = t9(i42), y4 = "x" === o23(i42), { width: x32, height: w32 } = a32.floating;
    let v32, b32;
    "top" === p32 || "bottom" === p32 ? (v32 = p32, b32 = h32 === (await (null == l33.isRTL ? void 0 : l33.isRTL(u32.floating)) ? "start" : "end") ? "left" : "right") : (b32 = p32, v32 = "end" === h32 ? "top" : "bottom");
    const R22 = w32 - d32[v32], A22 = x32 - d32[b32];
    let P32 = R22, T3 = A22;
    if (y4 ? T3 = c9(x32 - d32.right - d32.left, A22) : P32 = c9(w32 - d32.bottom - d32.top, R22), !r42.middlewareData.shift && !h32) {
      const t32 = f6(d32.left, 0), e53 = f6(d32.right, 0), n33 = f6(d32.top, 0), o52 = f6(d32.bottom, 0);
      y4 ? T3 = x32 - 2 * (0 !== t32 || 0 !== e53 ? t32 + e53 : f6(d32.left, d32.right)) : P32 = w32 - 2 * (0 !== n33 || 0 !== o52 ? n33 + o52 : f6(d32.top, d32.bottom));
    }
    await m32(__spreadProps2(__spreadValues2({}, r42), { availableWidth: T3, availableHeight: P32 }));
    const O3 = await l33.getDimensions(u32.floating);
    return x32 !== O3.width || w32 !== O3.height ? { reset: { rects: true } } : {};
  } };
};
function n23(t32) {
  var e42;
  return (null == (e42 = t32.ownerDocument) ? void 0 : e42.defaultView) || window;
}
function o33(t32) {
  return n23(t32).getComputedStyle(t32);
}
var i32 = Math.min;
var r23 = Math.max;
var l24 = Math.round;
function c23(t32) {
  const e42 = o33(t32);
  let n33 = parseFloat(e42.width), i42 = parseFloat(e42.height);
  const r42 = t32.offsetWidth, c32 = t32.offsetHeight, s33 = l24(n33) !== r42 || l24(i42) !== c32;
  return s33 && (n33 = r42, i42 = c32), { width: n33, height: i42, fallback: s33 };
}
function s23(t32) {
  return h23(t32) ? (t32.nodeName || "").toLowerCase() : "";
}
var f22;
function u22() {
  if (f22)
    return f22;
  const t32 = navigator.userAgentData;
  return t32 && Array.isArray(t32.brands) ? (f22 = t32.brands.map((t42) => t42.brand + "/" + t42.version).join(" "), f22) : navigator.userAgent;
}
function a23(t32) {
  return t32 instanceof n23(t32).HTMLElement;
}
function d23(t32) {
  return t32 instanceof n23(t32).Element;
}
function h23(t32) {
  return t32 instanceof n23(t32).Node;
}
function p22(t32) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t32 instanceof n23(t32).ShadowRoot || t32 instanceof ShadowRoot;
}
function g22(t32) {
  const { overflow: e42, overflowX: n33, overflowY: i42, display: r42 } = o33(t32);
  return /auto|scroll|overlay|hidden|clip/.test(e42 + i42 + n33) && !["inline", "contents"].includes(r42);
}
function m22(t32) {
  return ["table", "td", "th"].includes(s23(t32));
}
function y32(t32) {
  const e42 = /firefox/i.test(u22()), n33 = o33(t32), i42 = n33.backdropFilter || n33.WebkitBackdropFilter;
  return "none" !== n33.transform || "none" !== n33.perspective || !!i42 && "none" !== i42 || e42 && "filter" === n33.willChange || e42 && !!n33.filter && "none" !== n33.filter || ["transform", "perspective"].some((t42) => n33.willChange.includes(t42)) || ["paint", "layout", "strict", "content"].some((t42) => {
    const e53 = n33.contain;
    return null != e53 && e53.includes(t42);
  });
}
function x22() {
  return /^((?!chrome|android).)*safari/i.test(u22());
}
function w22(t32) {
  return ["html", "body", "#document"].includes(s23(t32));
}
function v22(t32) {
  return d23(t32) ? t32 : t32.contextElement;
}
var b22 = { x: 1, y: 1 };
function L22(t32) {
  const e42 = v22(t32);
  if (!a23(e42))
    return b22;
  const n33 = e42.getBoundingClientRect(), { width: o52, height: i42, fallback: r42 } = c23(e42);
  let s33 = (r42 ? l24(n33.width) : n33.width) / o52, f32 = (r42 ? l24(n33.height) : n33.height) / i42;
  return s33 && Number.isFinite(s33) || (s33 = 1), f32 && Number.isFinite(f32) || (f32 = 1), { x: s33, y: f32 };
}
function E22(t32, e42, o52, i42) {
  var r42, l33;
  void 0 === e42 && (e42 = false), void 0 === o52 && (o52 = false);
  const c32 = t32.getBoundingClientRect(), s33 = v22(t32);
  let f32 = b22;
  e42 && (i42 ? d23(i42) && (f32 = L22(i42)) : f32 = L22(t32));
  const u32 = s33 ? n23(s33) : window, a32 = x22() && o52;
  let h32 = (c32.left + (a32 && (null == (r42 = u32.visualViewport) ? void 0 : r42.offsetLeft) || 0)) / f32.x, p32 = (c32.top + (a32 && (null == (l33 = u32.visualViewport) ? void 0 : l33.offsetTop) || 0)) / f32.y, g32 = c32.width / f32.x, m32 = c32.height / f32.y;
  if (s33) {
    const t42 = n23(s33), e53 = i42 && d23(i42) ? n23(i42) : i42;
    let o62 = t42.frameElement;
    for (; o62 && i42 && e53 !== t42; ) {
      const t52 = L22(o62), e62 = o62.getBoundingClientRect(), i52 = getComputedStyle(o62);
      e62.x += (o62.clientLeft + parseFloat(i52.paddingLeft)) * t52.x, e62.y += (o62.clientTop + parseFloat(i52.paddingTop)) * t52.y, h32 *= t52.x, p32 *= t52.y, g32 *= t52.x, m32 *= t52.y, h32 += e62.x, p32 += e62.y, o62 = n23(o62).frameElement;
    }
  }
  return { width: g32, height: m32, top: p32, right: h32 + g32, bottom: p32 + m32, left: h32, x: h32, y: p32 };
}
function R4(t32) {
  return ((h23(t32) ? t32.ownerDocument : t32.document) || window.document).documentElement;
}
function T22(t32) {
  return d23(t32) ? { scrollLeft: t32.scrollLeft, scrollTop: t32.scrollTop } : { scrollLeft: t32.pageXOffset, scrollTop: t32.pageYOffset };
}
function C3(t32) {
  return E22(R4(t32)).left + T22(t32).scrollLeft;
}
function F2(t32) {
  if ("html" === s23(t32))
    return t32;
  const e42 = t32.assignedSlot || t32.parentNode || p22(t32) && t32.host || R4(t32);
  return p22(e42) ? e42.host : e42;
}
function W2(t32) {
  const e42 = F2(t32);
  return w22(e42) ? e42.ownerDocument.body : a23(e42) && g22(e42) ? e42 : W2(e42);
}
function D22(t32, e42) {
  var o52;
  void 0 === e42 && (e42 = []);
  const i42 = W2(t32), r42 = i42 === (null == (o52 = t32.ownerDocument) ? void 0 : o52.body), l33 = n23(i42);
  return r42 ? e42.concat(l33, l33.visualViewport || [], g22(i42) ? i42 : []) : e42.concat(i42, D22(i42));
}
function S5(e42, i42, l33) {
  let c32;
  if ("viewport" === i42)
    c32 = function(t32, e53) {
      const o52 = n23(t32), i52 = R4(t32), r42 = o52.visualViewport;
      let l42 = i52.clientWidth, c42 = i52.clientHeight, s43 = 0, f42 = 0;
      if (r42) {
        l42 = r42.width, c42 = r42.height;
        const t42 = x22();
        (!t42 || t42 && "fixed" === e53) && (s43 = r42.offsetLeft, f42 = r42.offsetTop);
      }
      return { width: l42, height: c42, x: s43, y: f42 };
    }(e42, l33);
  else if ("document" === i42)
    c32 = function(t32) {
      const e53 = R4(t32), n33 = T22(t32), i52 = t32.ownerDocument.body, l42 = r23(e53.scrollWidth, e53.clientWidth, i52.scrollWidth, i52.clientWidth), c42 = r23(e53.scrollHeight, e53.clientHeight, i52.scrollHeight, i52.clientHeight);
      let s43 = -n33.scrollLeft + C3(t32);
      const f42 = -n33.scrollTop;
      return "rtl" === o33(i52).direction && (s43 += r23(e53.clientWidth, i52.clientWidth) - l42), { width: l42, height: c42, x: s43, y: f42 };
    }(R4(e42));
  else if (d23(i42))
    c32 = function(t32, e53) {
      const n33 = E22(t32, true, "fixed" === e53), o52 = n33.top + t32.clientTop, i52 = n33.left + t32.clientLeft, r42 = a23(t32) ? L22(t32) : { x: 1, y: 1 };
      return { width: t32.clientWidth * r42.x, height: t32.clientHeight * r42.y, x: i52 * r42.x, y: o52 * r42.y };
    }(i42, l33);
  else {
    const t32 = __spreadValues2({}, i42);
    if (x22()) {
      var s33, f32;
      const o52 = n23(e42);
      t32.x -= (null == (s33 = o52.visualViewport) ? void 0 : s33.offsetLeft) || 0, t32.y -= (null == (f32 = o52.visualViewport) ? void 0 : f32.offsetTop) || 0;
    }
    c32 = t32;
  }
  return l12(c32);
}
function A4(t32, e42) {
  return a23(t32) && "fixed" !== o33(t32).position ? e42 ? e42(t32) : t32.offsetParent : null;
}
function H4(t32, e42) {
  const i42 = n23(t32);
  let r42 = A4(t32, e42);
  for (; r42 && m22(r42) && "static" === o33(r42).position; )
    r42 = A4(r42, e42);
  return r42 && ("html" === s23(r42) || "body" === s23(r42) && "static" === o33(r42).position && !y32(r42)) ? i42 : r42 || function(t42) {
    let e53 = F2(t42);
    for (; a23(e53) && !w22(e53); ) {
      if (y32(e53))
        return e53;
      e53 = F2(e53);
    }
    return null;
  }(t32) || i42;
}
function V3(t32, e42, n33) {
  const o52 = a23(e42), i42 = R4(e42), r42 = E22(t32, true, "fixed" === n33, e42);
  let l33 = { scrollLeft: 0, scrollTop: 0 };
  const c32 = { x: 0, y: 0 };
  if (o52 || !o52 && "fixed" !== n33)
    if (("body" !== s23(e42) || g22(i42)) && (l33 = T22(e42)), a23(e42)) {
      const t42 = E22(e42, true);
      c32.x = t42.x + e42.clientLeft, c32.y = t42.y + e42.clientTop;
    } else
      i42 && (c32.x = C3(i42));
  return { x: r42.left + l33.scrollLeft - c32.x, y: r42.top + l33.scrollTop - c32.y, width: r42.width, height: r42.height };
}
var O22 = { getClippingRect: function(t32) {
  let { element: e42, boundary: n33, rootBoundary: l33, strategy: c32 } = t32;
  const f32 = "clippingAncestors" === n33 ? function(t42, e53) {
    const n43 = e53.get(t42);
    if (n43)
      return n43;
    let i42 = D22(t42).filter((t52) => d23(t52) && "body" !== s23(t52)), r42 = null;
    const l42 = "fixed" === o33(t42).position;
    let c42 = l42 ? F2(t42) : t42;
    for (; d23(c42) && !w22(c42); ) {
      const t52 = o33(c42), e62 = y32(c42);
      "fixed" === t52.position ? r42 = null : (l42 ? e62 || r42 : e62 || "static" !== t52.position || !r42 || !["absolute", "fixed"].includes(r42.position)) ? r42 = t52 : i42 = i42.filter((t62) => t62 !== c42), c42 = F2(c42);
    }
    return e53.set(t42, i42), i42;
  }(e42, this._c) : [].concat(n33), u32 = [...f32, l33], a32 = u32[0], h32 = u32.reduce((t42, n43) => {
    const o52 = S5(e42, n43, c32);
    return t42.top = r23(o52.top, t42.top), t42.right = i32(o52.right, t42.right), t42.bottom = i32(o52.bottom, t42.bottom), t42.left = r23(o52.left, t42.left), t42;
  }, S5(e42, a32, c32));
  return { width: h32.right - h32.left, height: h32.bottom - h32.top, x: h32.left, y: h32.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t32) {
  let { rect: e42, offsetParent: n33, strategy: o52 } = t32;
  const i42 = a23(n33), r42 = R4(n33);
  if (n33 === r42)
    return e42;
  let l33 = { scrollLeft: 0, scrollTop: 0 }, c32 = { x: 1, y: 1 };
  const f32 = { x: 0, y: 0 };
  if ((i42 || !i42 && "fixed" !== o52) && (("body" !== s23(n33) || g22(r42)) && (l33 = T22(n33)), a23(n33))) {
    const t42 = E22(n33);
    c32 = L22(n33), f32.x = t42.x + n33.clientLeft, f32.y = t42.y + n33.clientTop;
  }
  return { width: e42.width * c32.x, height: e42.height * c32.y, x: e42.x * c32.x - l33.scrollLeft * c32.x + f32.x, y: e42.y * c32.y - l33.scrollTop * c32.y + f32.y };
}, isElement: d23, getDimensions: function(t32) {
  return a23(t32) ? c23(t32) : t32.getBoundingClientRect();
}, getOffsetParent: H4, getDocumentElement: R4, getScale: L22, async getElementRects(t32) {
  let { reference: e42, floating: n33, strategy: o52 } = t32;
  const i42 = this.getOffsetParent || H4, r42 = this.getDimensions;
  return { reference: V3(e42, await i42(n33), o52), floating: __spreadValues2({ x: 0, y: 0 }, await r42(n33)) };
}, getClientRects: (t32) => Array.from(t32.getClientRects()), isRTL: (t32) => "rtl" === o33(t32).direction };
function P22(t32, e42, n33, o52) {
  void 0 === o52 && (o52 = {});
  const { ancestorScroll: i42 = true, ancestorResize: r42 = true, elementResize: l33 = true, animationFrame: c32 = false } = o52, s33 = i42 && !c32, f32 = s33 || r42 ? [...d23(t32) ? D22(t32) : t32.contextElement ? D22(t32.contextElement) : [], ...D22(e42)] : [];
  f32.forEach((t42) => {
    s33 && t42.addEventListener("scroll", n33, { passive: true }), r42 && t42.addEventListener("resize", n33);
  });
  let u32, a32 = null;
  if (l33) {
    let o62 = true;
    a32 = new ResizeObserver(() => {
      o62 || n33(), o62 = false;
    }), d23(t32) && !c32 && a32.observe(t32), d23(t32) || !t32.contextElement || c32 || a32.observe(t32.contextElement), a32.observe(e42);
  }
  let h32 = c32 ? E22(t32) : null;
  return c32 && function e53() {
    const o62 = E22(t32);
    !h32 || o62.x === h32.x && o62.y === h32.y && o62.width === h32.width && o62.height === h32.height || n33();
    h32 = o62, u32 = requestAnimationFrame(e53);
  }(), n33(), () => {
    var t42;
    f32.forEach((t52) => {
      s33 && t52.removeEventListener("scroll", n33), r42 && t52.removeEventListener("resize", n33);
    }), null == (t42 = a32) || t42.disconnect(), a32 = null, c32 && cancelAnimationFrame(u32);
  };
}
var z4 = (t32, n33, o52) => {
  const i42 = /* @__PURE__ */ new Map(), r42 = __spreadValues2({ platform: O22 }, o52), l33 = __spreadProps2(__spreadValues2({}, r42.platform), { _c: i42 });
  return i24(t32, n33, __spreadProps2(__spreadValues2({}, r42), { platform: l33 }));
};
function t23(t32) {
  return r33(t32);
}
function o43(t32) {
  return t32.assignedSlot ? t32.assignedSlot : t32.parentNode instanceof ShadowRoot ? t32.parentNode.host : t32.parentNode;
}
function r33(t32) {
  for (let e42 = t32; e42; e42 = o43(e42))
    if (e42 instanceof Element && "none" === getComputedStyle(e42).display)
      return null;
  for (let e42 = o43(t32); e42; e42 = o43(e42)) {
    if (!(e42 instanceof Element))
      continue;
    const t42 = getComputedStyle(e42);
    if ("contents" !== t42.display) {
      if ("static" !== t42.position || "none" !== t42.filter)
        return e42;
      if ("BODY" === e42.tagName)
        return e42;
    }
  }
  return null;
}
var SlPopup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    this.stop();
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof Element) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (!this.anchorEl) {
      throw new Error(
        "Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute."
      );
    }
    this.start();
  }
  start() {
    if (!this.anchorEl) {
      return;
    }
    this.cleanup = P22(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      // The offset middleware goes first
      O2({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        k4({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        b4({
          boundary: this.flipBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        E4({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        k4({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        m6({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    const getOffsetParent = this.strategy === "absolute" ? (element) => O22.getOffsetParent(element, t23) : O22.getOffsetParent;
    z4(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy,
      platform: __spreadProps2(__spreadValues2({}, O22), {
        getOffsetParent
      })
    }).then(({ x: x32, y: y4, middlewareData, placement }) => {
      const isRtl = getComputedStyle(this).direction === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x32}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    this.emit("sl-reposition");
  }
  render() {
    return y3`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${o11({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? y3`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = popup_styles_default;
__decorateClass2([
  i23(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass2([
  i23(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass2([
  e23()
], SlPopup.prototype, "anchor", 2);
__decorateClass2([
  e23({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass2([
  e23({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass2([
  e23({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass2([
  e23({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass2([
  e23({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass2([
  e23({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass2([
  e23({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass2([
  e23({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p32) => p32.trim()).filter((p32) => p32 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass2([
  e23({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass2([
  e23({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass2([
  e23({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass2([
  e23({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass2([
  e23({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass2([
  e23({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass2([
  e23({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass2([
  e23()
], SlPopup.prototype, "sync", 2);
__decorateClass2([
  e23({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass2([
  e23({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
SlPopup = __decorateClass2([
  e9("sl-popup")
], SlPopup);

// src/app.ts
var App = class extends connect(store)(s4) {
  constructor() {
    super();
    this.locationController = new LocationController(this);
    const routes = {
      "(chat-page*|/?)": x`<pwa-chat-page></pwa-chat-page>`,
      "page-two?id=:id(\\d+)": (routeData) => x`<pwa-page-two
          .pageId=${routeData.search.groups.id}
        ></pwa-page-two>`,
      "page-three(/)?:id(foo|bar)?": (routeData) => x`<pwa-page-three
          .pageId=${routeData.pathname.groups.id}
        ></pwa-page-three>`,
      "dummy-page": () => x`<pwa-page-dummy></pwa-page-dummy>`
    };
    this.router = new Router(
      routes,
      x`<pwa-page-not-found></pwa-page-not-found>`,
      x`<p>Loading...</p>`
    );
  }
  render() {
    const page = this.router.matchRoute();
    return x` <div>${page}</div> `;
  }
};
App.styles = [rootStyles];
__decorateClass([
  e4({ type: String })
], App.prototype, "name", 2);
__decorateClass([
  e4()
], App.prototype, "cVal", 2);
customElements.define("pwa-app", App);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/private-async-helpers.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/until.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

pwa-helpers/connect-mixin.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/lazy-reducer-enhancer.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/media-query.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/metadata.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/network.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/router.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

pwa-helpers/pwa-helpers.js:
  (**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js:
  (*! Bundled license information:
  
  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js:
  (*! Bundled license information:
  
  @lit/reactive-element/decorators/custom-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/property.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/state.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/base.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/event-options.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-async.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-all.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-elements.js:
    (**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-nodes.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js:
  (*! Bundled license information:
  
  lit-html/directive.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js:
  (*! Bundled license information:
  
  lit-html/directives/class-map.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js:
  (*! Bundled license information:
  
  lit-html/static.js:
    (**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js:
  (*! Bundled license information:
  
  lit-html/directives/if-defined.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@shoelace-style/shoelace/dist/chunks/chunk.OXFFPZHD.js:
  (*! Bundled license information:
  
  lit-html/directive-helpers.js:
    (**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/directives/live.js:
    (**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
(() => {
  new EventSource("/esbuild").addEventListener("change", () => {
    location.reload();
  });
})();
//# sourceMappingURL=app.js.map
