/*! Camus. Copyright © 2014 Triton Information. All rights reserved. */
!function(a, b, c) {
	"use strict";
	b.module("ui.sortable", []).value("uiSortableConfig", {}).directive("uiSortable", ["uiSortableConfig", "$timeout", "$log",
	function(a, d, e) {
		return {
			require: "?ngModel",
			scope: {
				ngModel: "=",
				uiSortable: "="
			},
			link: function(f, g, h, i) {
				function j(a, b) {
					return b && "function" == typeof b ?
					function(c, d) {
						a(c, d),
						b(c, d)
					}: a
				}
				function k(a) {
					var b = a.data("ui-sortable");
					return b && "object" == typeof b && "ui-sortable" === b.widgetFullName ? b: null
				}
				function l(a, b) {
					var c = a.sortable("option", "helper");
					return "clone" === c || "function" == typeof c && b.item.sortable.isCustomHelperUsed()
				}
				function m(a) {
					return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
				}
				function n(a, b) {
					for (var c = null,
					d = 0; d < a.length; d++) {
						var e = a[d];
						if (e.element[0] === b[0]) {
							c = e.scope;
							break
						}
					}
					return c
				}
				function o(a, b) {
					b.item.sortable._destroy()
				}
				var p, q = {},
				r = {
					"ui-floating": c
				},
				s = {
					receive: null,
					remove: null,
					start: null,
					stop: null,
					update: null
				},
				t = {
					helper: null
				};
				return b.extend(q, r, a, f.uiSortable),
				b.element.fn && b.element.fn.jquery ? (i ? (f.$watch("ngModel.length",
				function() {
					d(function() {
						k(g) && g.sortable("refresh")
					},
					0, !1)
				}), s.start = function(a, d) {
					if ("auto" === q["ui-floating"]) {
						var e = d.item.siblings(),
						f = k(b.element(a.target));
						f.floating = m(e)
					}
					d.item.sortable = {
						model: i.$modelValue[d.item.index()],
						index: d.item.index(),
						source: d.item.parent(),
						sourceModel: i.$modelValue,
						cancel: function() {
							d.item.sortable._isCanceled = !0
						},
						isCanceled: function() {
							return d.item.sortable._isCanceled
						},
						isCustomHelperUsed: function() {
							return !! d.item.sortable._isCustomHelperUsed
						},
						_isCanceled: !1,
						_isCustomHelperUsed: d.item.sortable._isCustomHelperUsed,
						_destroy: function() {
							b.forEach(d.item.sortable,
							function(a, b) {
								d.item.sortable[b] = c
							})
						}
					}
				},
				s.activate = function(a, c) {
					p = g.contents();
					var d = g.sortable("option", "placeholder");
					if (d && d.element && "function" == typeof d.element) {
						var e = d.element();
						e = b.element(e);
						var h = g.find('[class="' + e.attr("class") + '"]:not([ng-repeat], [data-ng-repeat])');
						p = p.not(h)
					}
					var i = c.item.sortable._connectedSortables || [];
					i.push({
						element: g,
						scope: f
					}),
					c.item.sortable._connectedSortables = i
				},
				s.update = function(a, b) {
					if (!b.item.sortable.received) {
						b.item.sortable.dropindex = b.item.index();
						var c = b.item.parent();
						b.item.sortable.droptarget = c;
						var d = n(b.item.sortable._connectedSortables, c);
						b.item.sortable.droptargetModel = d.ngModel,
						g.sortable("cancel")
					}
					l(g, b) && !b.item.sortable.received && "parent" === g.sortable("option", "appendTo") && (p = p.not(p.last())),
					p.appendTo(g),
					b.item.sortable.received && (p = null),
					b.item.sortable.received && !b.item.sortable.isCanceled() && f.$apply(function() {
						i.$modelValue.splice(b.item.sortable.dropindex, 0, b.item.sortable.moved)
					})
				},
				s.stop = function(a, b) { ! b.item.sortable.received && "dropindex" in b.item.sortable && !b.item.sortable.isCanceled() ? f.$apply(function() {
						i.$modelValue.splice(b.item.sortable.dropindex, 0, i.$modelValue.splice(b.item.sortable.index, 1)[0])
					}) : "dropindex" in b.item.sortable && !b.item.sortable.isCanceled() || l(g, b) || p.appendTo(g),
					p = null
				},
				s.receive = function(a, b) {
					b.item.sortable.received = !0
				},
				s.remove = function(a, b) {
					"dropindex" in b.item.sortable || (g.sortable("cancel"), b.item.sortable.cancel()),
					b.item.sortable.isCanceled() || f.$apply(function() {
						b.item.sortable.moved = i.$modelValue.splice(b.item.sortable.index, 1)[0]
					})
				},
				t.helper = function(a) {
					return a && "function" == typeof a ?
					function(b, c) {
						var d = a(b, c);
						return c.sortable._isCustomHelperUsed = c !== d,
						d
					}: a
				},
				f.$watch("uiSortable",
				function(a) {
					var c = k(g);
					c && b.forEach(a,
					function(a, b) {
						return b in r ? ("ui-floating" !== b || a !== !1 && a !== !0 || (c.floating = a), void(q[b] = a)) : (s[b] ? ("stop" === b && (a = j(a,
						function() {
							f.$apply()
						}), a = j(a, o)), a = j(s[b], a)) : t[b] && (a = t[b](a)), q[b] = a, void g.sortable("option", b, a))
					})
				},
				!0), b.forEach(s,
				function(a, b) {
					q[b] = j(a, q[b]),
					"stop" === b && (q[b] = j(q[b], o))
				})) : e.info("ui.sortable: ngModel not provided!", g), void g.sortable(q)) : void e.error("ui.sortable: jQuery should be included before AngularJS!")
			}
		}
	}])
} (window, window.angular),
window.jQuery && -1 == window.jQuery.event.props.indexOf("dataTransfer") && window.jQuery.event.props.push("dataTransfer"),
angular.module("ngDragDrop", []).directive("uiDraggable", ["$parse", "$rootScope",
function(a, b) {
	return function(c, d, e) {
		var f, g, h, i = "",
		j = !1;
		d.attr("draggable", !1),
		e.$observe("uiDraggable",
		function(a) {
			d.attr("draggable", a)
		}),
		e.drag && c.$watch(e.drag,
		function(a) {
			i = a || ""
		}),
		angular.isString(e.dragHandleClass) && (j = !0, f = e.dragHandleClass.trim() || "drag-handle", g = d.find("." + f).toArray(), d.bind("mousedown",
		function(a) {
			h = a.target
		})),
		d.bind("dragstart",
		function(d) {
			var f = !j || -1 != g.indexOf(h);
			if (f) {
				var k = angular.toJson(i),
				l = e.dragChannel || "defaultchannel",
				m = e.dragImage || null;
				if (m) {
					var n = a(e.dragImage);
					c.$apply(function() {
						var a = n(c, {
							$event: d
						});
						if (a && a.image) {
							var b = a.xOffset || 0,
							e = a.yOffset || 0;
							d.dataTransfer.setDragImage(a.image, b, e)
						}
					})
				}
				d.dataTransfer.setData("text/plain", k),
				d.dataTransfer.effectAllowed = "copyMove",
				b.$broadcast("ANGULAR_DRAG_START", l)
			} else d.preventDefault()
		}),
		d.bind("dragend",
		function(d) {
			var f = e.dragChannel || "defaultchannel";
			if (b.$broadcast("ANGULAR_DRAG_END", f), d.dataTransfer && "none" !== d.dataTransfer.dropEffect && e.onDropSuccess) {
				var g = a(e.onDropSuccess);
				c.$apply(function() {
					g(c, {
						$event: d
					})
				})
			}
		})
	}
}]).directive("uiOnDrop", ["$parse", "$rootScope",
function(a, b) {
	return function(c, d, e) {
		function f(a) {
			return a.preventDefault && a.preventDefault(),
			a.stopPropagation && a.stopPropagation(),
			a.dataTransfer.dropEffect = a.shiftKey ? "copy": "move",
			!1
		}
		function g() {
			k--,
			0 == k && d.removeClass(o)
		}
		function h() {
			k++,
			b.$broadcast("ANGULAR_HOVER", l),
			d.addClass(o)
		}
		function i(b) {
			b.preventDefault && b.preventDefault(),
			b.stopPropagation && b.stopPropagation();
			var f = b.dataTransfer.getData("text/plain");
			f = angular.fromJson(f);
			var g = a(e.uiOnDrop);
			c.$apply(function() {
				g(c, {
					$data: f,
					$event: b
				})
			}),
			d.removeClass(n)
		}
		function j(a, b) {
			if ("*" === b) return ! 0;
			var c = new RegExp("(\\s|[,])+(" + a + ")(\\s|[,])+", "i");
			return c.test("," + b + ",")
		}
		var k = 0,
		l = "defaultchannel",
		m = "",
		n = e.dragEnterClass || "on-drag-enter",
		o = e.dragHoverClass || "on-drag-hover";
		b.$on("ANGULAR_DRAG_START",
		function(a, b) {
			m = b,
			j(m, l) && (d.bind("dragover", f), d.bind("dragenter", h), d.bind("dragleave", g), d.bind("drop", i), d.addClass(n))
		}),
		b.$on("ANGULAR_DRAG_END",
		function(a, b) {
			m = "",
			j(b, l) && (d.unbind("dragover", f), d.unbind("dragenter", h), d.unbind("dragleave", g), d.unbind("drop", i), d.removeClass(o), d.removeClass(n))
		}),
		b.$on("ANGULAR_HOVER",
		function(a, b) {
			j(b, l) && d.removeClass(o)
		}),
		e.$observe("dropChannel",
		function(a) {
			a && (l = a)
		})
	}
}]),
function(a, b, c) {
	"use strict";
	function d(a, c, d, e) {
		for (var f = [], g = 0; g < a.length; g++) {
			var h = a[g];
			if (h) {
				var i = tinycolor(h),
				j = i.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark": "sp-thumb-el sp-thumb-light";
				j += tinycolor.equals(c, h) ? " sp-thumb-active": "";
				var k = i.toString(e.preferredFormat || "rgb"),
				l = q ? "background-color:" + i.toRgbString() : "filter:" + i.toFilter();
				f.push('<span title="' + k + '" data-color="' + i.toRgbString() + '" class="' + j + '"><span class="sp-thumb-inner" style="' + l + ';" /></span>')
			} else {
				var m = "sp-clear-display";
				f.push(b("<div />").append(b('<span data-color="" style="background-color:transparent;" class="' + m + '"></span>').attr("title", e.noColorSelectedText)).html())
			}
		}
		return "<div class='sp-cf " + d + "'>" + f.join("") + "</div>"
	}
	function e() {
		for (var a = 0; a < o.length; a++) o[a] && o[a].hide()
	}
	function f(a, c) {
		var d = b.extend({},
		n, a);
		return d.callbacks = {
			move: k(d.move, c),
			change: k(d.change, c),
			show: k(d.show, c),
			hide: k(d.hide, c),
			beforeShow: k(d.beforeShow, c)
		},
		d
	}
	function g(g, i) {
		function k() {
			if (S.showPaletteOnly && (S.showPalette = !0), Jb.text(S.showPaletteOnly ? S.togglePaletteMoreText: S.togglePaletteLessText), S.palette) {
				kb = S.palette.slice(0),
				lb = b.isArray(kb[0]) ? kb: [kb],
				mb = {};
				for (var a = 0; a < lb.length; a++) for (var c = 0; c < lb[a].length; c++) {
					var d = tinycolor(lb[a][c]).toRgbString();
					mb[d] = !0
				}
			}
			ub.toggleClass("sp-flat", T),
			ub.toggleClass("sp-input-disabled", !S.showInput),
			ub.toggleClass("sp-alpha-enabled", S.showAlpha),
			ub.toggleClass("sp-clear-enabled", Wb),
			ub.toggleClass("sp-buttons-disabled", !S.showButtons),
			ub.toggleClass("sp-palette-buttons-disabled", !S.togglePaletteOnly),
			ub.toggleClass("sp-palette-disabled", !S.showPalette),
			ub.toggleClass("sp-palette-only", S.showPaletteOnly),
			ub.toggleClass("sp-initial-disabled", !S.showInitial),
			ub.addClass(S.className).addClass(S.containerClassName),
			N()
		}
		function n() {
			function a(a) {
				return a.data && a.data.ignore ? (G(b(a.target).closest(".sp-thumb-el").data("color")), J()) : (G(b(a.target).closest(".sp-thumb-el").data("color")), J(), M(!0), S.hideAfterPaletteSelect && E()),
				!1
			}
			if (p && ub.find("*:not(input)").attr("unselectable", "on"), k(), Mb && sb.after(Nb).hide(), Wb || Hb.hide(), T) sb.after(ub).hide();
			else {
				var c = "parent" === S.appendTo ? sb.parent() : b(S.appendTo);
				1 !== c.length && (c = b("body")),
				c.append(ub)
			}
			u(),
			Ob.bind("click.spectrum touchstart.spectrum",
			function(a) {
				tb || C(),
				a.stopPropagation(),
				b(a.target).is("input") || a.preventDefault()
			}),
			(sb.is(":disabled") || S.disabled === !0) && R(),
			ub.click(j),
			Db.change(B),
			Db.bind("paste",
			function() {
				setTimeout(B, 1)
			}),
			Db.keydown(function(a) {
				13 == a.keyCode && B()
			}),
			Gb.text(S.cancelText),
			Gb.bind("click.spectrum",
			function(a) {
				a.stopPropagation(),
				a.preventDefault(),
				E("cancel")
			}),
			Hb.attr("title", S.clearText),
			Hb.bind("click.spectrum",
			function(a) {
				a.stopPropagation(),
				a.preventDefault(),
				Vb = !0,
				J(),
				T && M(!0)
			}),
			Ib.text(S.chooseText),
			Ib.bind("click.spectrum",
			function(a) {
				a.stopPropagation(),
				a.preventDefault(),
				I() && (M(!0), E())
			}),
			Jb.text(S.showPaletteOnly ? S.togglePaletteMoreText: S.togglePaletteLessText),
			Jb.bind("click.spectrum",
			function(a) {
				a.stopPropagation(),
				a.preventDefault(),
				S.showPaletteOnly = !S.showPaletteOnly,
				S.showPaletteOnly || T || ub.css("left", "-=" + (vb.outerWidth(!0) + 5)),
				k()
			}),
			l(Bb,
			function(a, b, c) {
				jb = a / db,
				Vb = !1,
				c.shiftKey && (jb = Math.round(10 * jb) / 10),
				J()
			},
			z, A),
			l(yb,
			function(a, b) {
				gb = parseFloat(b / bb),
				Vb = !1,
				S.showAlpha || (jb = 1),
				J()
			},
			z, A),
			l(wb,
			function(a, b, c) {
				if (c.shiftKey) {
					if (!qb) {
						var d = hb * $,
						e = _ - ib * _,
						f = Math.abs(a - d) > Math.abs(b - e);
						qb = f ? "x": "y"
					}
				} else qb = null;
				var g = !qb || "x" === qb,
				h = !qb || "y" === qb;
				g && (hb = parseFloat(a / $)),
				h && (ib = parseFloat((_ - b) / _)),
				Vb = !1,
				S.showAlpha || (jb = 1),
				J()
			},
			z, A),
			Qb ? (G(Qb), K(), Tb = Sb || tinycolor(Qb).format, v(Qb)) : K(),
			T && D();
			var d = p ? "mousedown.spectrum": "click.spectrum touchstart.spectrum";
			Eb.delegate(".sp-thumb-el", d, a),
			Fb.delegate(".sp-thumb-el:nth-child(1)", d, {
				ignore: !0
			},
			a)
		}
		function u() {
			if (V && a.localStorage) {
				try {
					var c = a.localStorage[V].split(",#");
					c.length > 1 && (delete a.localStorage[V], b.each(c,
					function(a, b) {
						v(b)
					}))
				} catch(d) {}
				try {
					nb = a.localStorage[V].split(";")
				} catch(d) {}
			}
		}
		function v(c) {
			if (U) {
				var d = tinycolor(c).toRgbString();
				if (!mb[d] && -1 === b.inArray(d, nb)) for (nb.push(d); nb.length > ob;) nb.shift();
				if (V && a.localStorage) try {
					a.localStorage[V] = nb.join(";")
				} catch(e) {}
			}
		}
		function w() {
			var a = [];
			if (S.showPalette) for (var b = 0; b < nb.length; b++) {
				var c = tinycolor(nb[b]).toRgbString();
				mb[c] || a.push(nb[b])
			}
			return a.reverse().slice(0, S.maxSelectionSize)
		}
		function x() {
			var a = H(),
			c = b.map(lb,
			function(b, c) {
				return d(b, a, "sp-palette-row sp-palette-row-" + c, S)
			});
			u(),
			nb && c.push(d(w(), a, "sp-palette-row sp-palette-row-selection", S)),
			Eb.html(c.join(""))
		}
		function y() {
			if (S.showInitial) {
				var a = Rb,
				b = H();
				Fb.html(d([a, b], b, "sp-palette-row-initial", S))
			}
		}
		function z() { (0 >= _ || 0 >= $ || 0 >= bb) && N(),
			ub.addClass(pb),
			qb = null,
			sb.trigger("dragstart.spectrum", [H()])
		}
		function A() {
			ub.removeClass(pb),
			sb.trigger("dragstop.spectrum", [H()])
		}
		function B() {
			var a = Db.val();
			if (null !== a && "" !== a || !Wb) {
				var b = tinycolor(a);
				b.isValid() ? (G(b), M(!0)) : Db.addClass("sp-validation-error")
			} else G(null),
			M(!0)
		}
		function C() {
			Z ? E() : D()
		}
		function D() {
			var c = b.Event("beforeShow.spectrum");
			return Z ? void N() : (sb.trigger(c, [H()]), void(X.beforeShow(H()) === !1 || c.isDefaultPrevented() || (e(), Z = !0, b(rb).bind("click.spectrum", E), b(a).bind("resize.spectrum", Y), Nb.addClass("sp-active"), ub.removeClass("sp-hidden"), N(), K(), Rb = H(), y(), X.show(Rb), sb.trigger("show.spectrum", [Rb]))))
		}
		function E(c) {
			if ((!c || "click" != c.type || 2 != c.button) && Z && !T) {
				Z = !1,
				b(rb).unbind("click.spectrum", E),
				b(a).unbind("resize.spectrum", Y),
				Nb.removeClass("sp-active"),
				ub.addClass("sp-hidden");
				var d = !tinycolor.equals(H(), Rb);
				d && (Ub && "cancel" !== c ? M(!0) : F()),
				X.hide(H()),
				sb.trigger("hide.spectrum", [H()])
			}
		}
		function F() {
			G(Rb, !0)
		}
		function G(a, b) {
			if (tinycolor.equals(a, H())) return void K();
			var c, d; ! a && Wb ? Vb = !0 : (Vb = !1, c = tinycolor(a), d = c.toHsv(), gb = d.h % 360 / 360, hb = d.s, ib = d.v, jb = d.a),
			K(),
			c && c.isValid() && !b && (Tb = Sb || c.getFormat())
		}
		function H(a) {
			return a = a || {},
			Wb && Vb ? null: tinycolor.fromRatio({
				h: gb,
				s: hb,
				v: ib,
				a: Math.round(100 * jb) / 100
			},
			{
				format: a.format || Tb
			})
		}
		function I() {
			return ! Db.hasClass("sp-validation-error")
		}
		function J() {
			K(),
			X.move(H()),
			sb.trigger("move.spectrum", [H()])
		}
		function K() {
			Db.removeClass("sp-validation-error"),
			L();
			var a = tinycolor.fromRatio({
				h: gb,
				s: 1,
				v: 1
			});
			wb.css("background-color", a.toHexString());
			var b = Tb;
			1 > jb && (0 !== jb || "name" !== b) && ("hex" === b || "hex3" === b || "hex6" === b || "name" === b) && (b = "rgb");
			var c = H({
				format: b
			}),
			d = "";
			if (Pb.removeClass("sp-clear-display"), Pb.css("background-color", "transparent"), !c && Wb) Pb.addClass("sp-clear-display");
			else {
				var e = c.toHexString(),
				f = c.toRgbString();
				if (q || 1 === c.alpha ? Pb.css("background-color", f) : (Pb.css("background-color", "transparent"), Pb.css("filter", c.toFilter())), S.showAlpha) {
					var g = c.toRgb();
					g.a = 0;
					var h = tinycolor(g).toRgbString(),
					i = "linear-gradient(left, " + h + ", " + e + ")";
					p ? Ab.css("filter", tinycolor(h).toFilter({
						gradientType: 1
					},
					e)) : (Ab.css("background", "-webkit-" + i), Ab.css("background", "-moz-" + i), Ab.css("background", "-ms-" + i), Ab.css("background", "linear-gradient(to right, " + h + ", " + e + ")"))
				}
				d = c.toString(b)
			}
			S.showInput && Db.val(d),
			S.showPalette && x(),
			y()
		}
		function L() {
			var a = hb,
			b = ib;
			if (Wb && Vb) Cb.hide(),
			zb.hide(),
			xb.hide();
			else {
				Cb.show(),
				zb.show(),
				xb.show();
				var c = a * $,
				d = _ - b * _;
				c = Math.max( - ab, Math.min($ - ab, c - ab)),
				d = Math.max( - ab, Math.min(_ - ab, d - ab)),
				xb.css({
					top: d + "px",
					left: c + "px"
				});
				var e = jb * db;
				Cb.css({
					left: e - eb / 2 + "px"
				});
				var f = gb * bb;
				zb.css({
					top: f - fb + "px"
				})
			}
		}
		function M(a) {
			var b = H(),
			c = "",
			d = !tinycolor.equals(b, Rb);
			b && (c = b.toString(Tb), v(b)),
			Kb && sb.val(c),
			Rb = b,
			a && d && (X.change(b), sb.trigger("change", [b]))
		}
		function N() {
			$ = wb.width(),
			_ = wb.height(),
			ab = xb.height(),
			cb = yb.width(),
			bb = yb.height(),
			fb = zb.height(),
			db = Bb.width(),
			eb = Cb.width(),
			T || (ub.css("position", "absolute"), ub.offset(h(ub, Ob))),
			L(),
			S.showPalette && x(),
			sb.trigger("reflow.spectrum")
		}
		function O() {
			sb.show(),
			Ob.unbind("click.spectrum touchstart.spectrum"),
			ub.remove(),
			Nb.remove(),
			o[Xb.id] = null
		}
		function P(a, d) {
			return a === c ? b.extend({},
			S) : d === c ? S[a] : (S[a] = d, void k())
		}
		function Q() {
			tb = !1,
			sb.attr("disabled", !1),
			Ob.removeClass("sp-disabled")
		}
		function R() {
			E(),
			tb = !0,
			sb.attr("disabled", !0),
			Ob.addClass("sp-disabled")
		}
		var S = f(i, g),
		T = S.flat,
		U = S.showSelectionPalette,
		V = S.localStorageKey,
		W = S.theme,
		X = S.callbacks,
		Y = m(N, 10),
		Z = !1,
		$ = 0,
		_ = 0,
		ab = 0,
		bb = 0,
		cb = 0,
		db = 0,
		eb = 0,
		fb = 0,
		gb = 0,
		hb = 0,
		ib = 0,
		jb = 1,
		kb = [],
		lb = [],
		mb = {},
		nb = S.selectionPalette.slice(0),
		ob = S.maxSelectionSize,
		pb = "sp-dragging",
		qb = null,
		rb = g.ownerDocument,
		sb = (rb.body, b(g)),
		tb = !1,
		ub = b(t, rb).addClass(W),
		vb = ub.find(".sp-picker-container"),
		wb = ub.find(".sp-color"),
		xb = ub.find(".sp-dragger"),
		yb = ub.find(".sp-hue"),
		zb = ub.find(".sp-slider"),
		Ab = ub.find(".sp-alpha-inner"),
		Bb = ub.find(".sp-alpha"),
		Cb = ub.find(".sp-alpha-handle"),
		Db = ub.find(".sp-input"),
		Eb = ub.find(".sp-palette"),
		Fb = ub.find(".sp-initial"),
		Gb = ub.find(".sp-cancel"),
		Hb = ub.find(".sp-clear"),
		Ib = ub.find(".sp-choose"),
		Jb = ub.find(".sp-palette-toggle"),
		Kb = sb.is("input"),
		Lb = Kb && r && "color" === sb.attr("type"),
		Mb = Kb && !T,
		Nb = Mb ? b(s).addClass(W).addClass(S.className).addClass(S.replacerClassName) : b([]),
		Ob = Mb ? Nb: sb,
		Pb = Nb.find(".sp-preview-inner"),
		Qb = S.color || Kb && sb.val(),
		Rb = !1,
		Sb = S.preferredFormat,
		Tb = Sb,
		Ub = !S.showButtons || S.clickoutFiresChange,
		Vb = !Qb,
		Wb = S.allowEmpty && !Lb;
		n();
		var Xb = {
			show: D,
			hide: E,
			toggle: C,
			reflow: N,
			option: P,
			enable: Q,
			disable: R,
			set: function(a) {
				G(a),
				M()
			},
			get: H,
			destroy: O,
			container: ub
		};
		return Xb.id = o.push(Xb) - 1,
		Xb
	}
	function h(a, c) {
		var d = 0,
		e = a.outerWidth(),
		f = a.outerHeight(),
		g = c.outerHeight(),
		h = a[0].ownerDocument,
		i = h.documentElement,
		j = i.clientWidth + b(h).scrollLeft(),
		k = i.clientHeight + b(h).scrollTop(),
		l = c.offset();
		return l.top += g,
		l.left -= Math.min(l.left, l.left + e > j && j > e ? Math.abs(l.left + e - j) : 0),
		l.top -= Math.min(l.top, l.top + f > k && k > f ? Math.abs(f + g - d) : d),
		l
	}
	function i() {}
	function j(a) {
		a.stopPropagation()
	}
	function k(a, b) {
		var c = Array.prototype.slice,
		d = c.call(arguments, 2);
		return function() {
			return a.apply(b, d.concat(c.call(arguments)))
		}
	}
	function l(c, d, e, f) {
		function g(a) {
			a.stopPropagation && a.stopPropagation(),
			a.preventDefault && a.preventDefault(),
			a.returnValue = !1
		}
		function h(a) {
			if (l) {
				if (p && k.documentMode < 9 && !a.button) return j();
				var b = a.originalEvent.touches,
				e = b ? b[0].pageX: a.pageX,
				f = b ? b[0].pageY: a.pageY,
				h = Math.max(0, Math.min(e - m.left, o)),
				i = Math.max(0, Math.min(f - m.top, n));
				q && g(a),
				d.apply(c, [h, i, a])
			}
		}
		function i(a) {
			var d = a.which ? 3 == a.which: 2 == a.button;
			d || l || e.apply(c, arguments) !== !1 && (l = !0, n = b(c).height(), o = b(c).width(), m = b(c).offset(), b(k).bind(r), b(k.body).addClass("sp-dragging"), q || h(a), g(a))
		}
		function j() {
			l && (b(k).unbind(r), b(k.body).removeClass("sp-dragging"), f.apply(c, arguments)),
			l = !1
		}
		d = d ||
		function() {},
		e = e ||
		function() {},
		f = f ||
		function() {};
		var k = document,
		l = !1,
		m = {},
		n = 0,
		o = 0,
		q = "ontouchstart" in a,
		r = {};
		r.selectstart = g,
		r.dragstart = g,
		r["touchmove mousemove"] = h,
		r["touchend mouseup"] = j,
		b(c).bind("touchstart mousedown", i)
	}
	function m(a, b, c) {
		var d;
		return function() {
			var e = this,
			f = arguments,
			g = function() {
				d = null,
				a.apply(e, f)
			};
			c && clearTimeout(d),
			(c || !d) && (d = setTimeout(g, b))
		}
	}
	var n = {
		beforeShow: i,
		move: i,
		change: i,
		show: i,
		hide: i,
		color: !1,
		flat: !1,
		showInput: !1,
		allowEmpty: !1,
		showButtons: !0,
		clickoutFiresChange: !1,
		showInitial: !1,
		showPalette: !1,
		showPaletteOnly: !1,
		hideAfterPaletteSelect: !1,
		togglePaletteOnly: !1,
		showSelectionPalette: !0,
		localStorageKey: !1,
		appendTo: "body",
		maxSelectionSize: 7,
		cancelText: "cancel",
		chooseText: "choose",
		togglePaletteMoreText: "more",
		togglePaletteLessText: "less",
		clearText: "Clear Color Selection",
		noColorSelectedText: "No Color Selected",
		preferredFormat: !1,
		className: "",
		containerClassName: "",
		replacerClassName: "",
		showAlpha: !1,
		theme: "sp-light",
		palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
		selectionPalette: [],
		disabled: !1
	},
	o = [],
	p = !!/msie/i.exec(a.navigator.userAgent),
	q = function() {
		function a(a, b) {
			return !! ~ ("" + a).indexOf(b)
		}
		var b = document.createElement("div"),
		c = b.style;
		return c.cssText = "background-color:rgba(0,0,0,.5)",
		a(c.backgroundColor, "rgba") || a(c.backgroundColor, "hsla")
	} (),
	r = function() {
		var a = b("<input type='color' value='!' />")[0];
		return "color" === a.type && "!" !== a.value
	} (),
	s = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
	t = function() {
		var a = "";
		if (p) for (var b = 1; 6 >= b; b++) a += "<div class='sp-" + b + "'></div>";
		return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", a, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("")
	} (),
	u = "spectrum.id";
	b.fn.spectrum = function(a) {
		if ("string" == typeof a) {
			var c = this,
			d = Array.prototype.slice.call(arguments, 1);
			return this.each(function() {
				var e = o[b(this).data(u)];
				if (e) {
					var f = e[a];
					if (!f) throw new Error("Spectrum: no such method: '" + a + "'");
					"get" == a ? c = e.get() : "container" == a ? c = e.container: "option" == a ? c = e.option.apply(e, d) : "destroy" == a ? (e.destroy(), b(this).removeData(u)) : f.apply(e, d)
				}
			}),
			c
		}
		return this.spectrum("destroy").each(function() {
			var c = b.extend({},
			a, b(this).data()),
			d = g(this, c);
			b(this).data(u, d.id)
		})
	},
	b.fn.spectrum.load = !0,
	b.fn.spectrum.loadOpts = {},
	b.fn.spectrum.draggable = l,
	b.fn.spectrum.defaults = n,
	b.spectrum = {},
	b.spectrum.localization = {},
	b.spectrum.palettes = {},
	b.fn.spectrum.processNativeColorInputs = function() {
		r || b("input[type=color]").spectrum({
			preferredFormat: "hex6"
		})
	},
	function() {
		function b(a) {
			var b = {
				r: 0,
				g: 0,
				b: 0
			},
			d = 1,
			f = !1,
			h = !1;
			return "string" == typeof a && (a = H(a)),
			"object" == typeof a && (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b") ? (b = c(a.r, a.g, a.b), f = !0, h = "%" === String(a.r).substr( - 1) ? "prgb": "rgb") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v") ? (a.s = E(a.s), a.v = E(a.v), b = g(a.h, a.s, a.v), f = !0, h = "hsv") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = E(a.s), a.l = E(a.l), b = e(a.h, a.s, a.l), f = !0, h = "hsl"), a.hasOwnProperty("a") && (d = a.a)),
			d = x(d),
			{
				ok: f,
				format: a.format || h,
				r: N(255, O(b.r, 0)),
				g: N(255, O(b.g, 0)),
				b: N(255, O(b.b, 0)),
				a: d
			}
		}
		function c(a, b, c) {
			return {
				r: 255 * y(a, 255),
				g: 255 * y(b, 255),
				b: 255 * y(c, 255)
			}
		}
		function d(a, b, c) {
			a = y(a, 255),
			b = y(b, 255),
			c = y(c, 255);
			var d, e, f = O(a, b, c),
			g = N(a, b, c),
			h = (f + g) / 2;
			if (f == g) d = e = 0;
			else {
				var i = f - g;
				switch (e = h > .5 ? i / (2 - f - g) : i / (f + g), f) {
				case a:
					d = (b - c) / i + (c > b ? 6 : 0);
					break;
				case b:
					d = (c - a) / i + 2;
					break;
				case c:
					d = (a - b) / i + 4
				}
				d /= 6
			}
			return {
				h: d,
				s: e,
				l: h
			}
		}
		function e(a, b, c) {
			function d(a, b, c) {
				return 0 > c && (c += 1),
				c > 1 && (c -= 1),
				1 / 6 > c ? a + 6 * (b - a) * c: .5 > c ? b: 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a
			}
			var e, f, g;
			if (a = y(a, 360), b = y(b, 100), c = y(c, 100), 0 === b) e = f = g = c;
			else {
				var h = .5 > c ? c * (1 + b) : c + b - c * b,
				i = 2 * c - h;
				e = d(i, h, a + 1 / 3),
				f = d(i, h, a),
				g = d(i, h, a - 1 / 3)
			}
			return {
				r: 255 * e,
				g: 255 * f,
				b: 255 * g
			}
		}
		function f(a, b, c) {
			a = y(a, 255),
			b = y(b, 255),
			c = y(c, 255);
			var d, e, f = O(a, b, c),
			g = N(a, b, c),
			h = f,
			i = f - g;
			if (e = 0 === f ? 0 : i / f, f == g) d = 0;
			else {
				switch (f) {
				case a:
					d = (b - c) / i + (c > b ? 6 : 0);
					break;
				case b:
					d = (c - a) / i + 2;
					break;
				case c:
					d = (a - b) / i + 4
				}
				d /= 6
			}
			return {
				h: d,
				s: e,
				v: h
			}
		}
		function g(a, b, c) {
			a = 6 * y(a, 360),
			b = y(b, 100),
			c = y(c, 100);
			var d = L.floor(a),
			e = a - d,
			f = c * (1 - b),
			g = c * (1 - e * b),
			h = c * (1 - (1 - e) * b),
			i = d % 6,
			j = [c, g, f, f, h, c][i],
			k = [h, c, c, g, f, f][i],
			l = [f, f, h, c, c, g][i];
			return {
				r: 255 * j,
				g: 255 * k,
				b: 255 * l
			}
		}
		function h(a, b, c, d) {
			var e = [D(M(a).toString(16)), D(M(b).toString(16)), D(M(c).toString(16))];
			return d && e[0].charAt(0) == e[0].charAt(1) && e[1].charAt(0) == e[1].charAt(1) && e[2].charAt(0) == e[2].charAt(1) ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0) : e.join("")
		}
		function i(a, b, c, d) {
			var e = [D(F(d)), D(M(a).toString(16)), D(M(b).toString(16)), D(M(c).toString(16))];
			return e.join("")
		}
		function j(a, b) {
			b = 0 === b ? 0 : b || 10;
			var c = Q(a).toHsl();
			return c.s -= b / 100,
			c.s = z(c.s),
			Q(c)
		}
		function k(a, b) {
			b = 0 === b ? 0 : b || 10;
			var c = Q(a).toHsl();
			return c.s += b / 100,
			c.s = z(c.s),
			Q(c)
		}
		function l(a) {
			return Q(a).desaturate(100)
		}
		function m(a, b) {
			b = 0 === b ? 0 : b || 10;
			var c = Q(a).toHsl();
			return c.l += b / 100,
			c.l = z(c.l),
			Q(c)
		}
		function n(a, b) {
			b = 0 === b ? 0 : b || 10;
			var c = Q(a).toRgb();
			return c.r = O(0, N(255, c.r - M(255 * -(b / 100)))),
			c.g = O(0, N(255, c.g - M(255 * -(b / 100)))),
			c.b = O(0, N(255, c.b - M(255 * -(b / 100)))),
			Q(c)
		}
		function o(a, b) {
			b = 0 === b ? 0 : b || 10;
			var c = Q(a).toHsl();
			return c.l -= b / 100,
			c.l = z(c.l),
			Q(c)
		}
		function p(a, b) {
			var c = Q(a).toHsl(),
			d = (M(c.h) + b) % 360;
			return c.h = 0 > d ? 360 + d: d,
			Q(c)
		}
		function q(a) {
			var b = Q(a).toHsl();
			return b.h = (b.h + 180) % 360,
			Q(b)
		}
		function r(a) {
			var b = Q(a).toHsl(),
			c = b.h;
			return [Q(a), Q({
				h: (c + 120) % 360,
				s: b.s,
				l: b.l
			}), Q({
				h: (c + 240) % 360,
				s: b.s,
				l: b.l
			})]
		}
		function s(a) {
			var b = Q(a).toHsl(),
			c = b.h;
			return [Q(a), Q({
				h: (c + 90) % 360,
				s: b.s,
				l: b.l
			}), Q({
				h: (c + 180) % 360,
				s: b.s,
				l: b.l
			}), Q({
				h: (c + 270) % 360,
				s: b.s,
				l: b.l
			})]
		}
		function t(a) {
			var b = Q(a).toHsl(),
			c = b.h;
			return [Q(a), Q({
				h: (c + 72) % 360,
				s: b.s,
				l: b.l
			}), Q({
				h: (c + 216) % 360,
				s: b.s,
				l: b.l
			})]
		}
		function u(a, b, c) {
			b = b || 6,
			c = c || 30;
			var d = Q(a).toHsl(),
			e = 360 / c,
			f = [Q(a)];
			for (d.h = (d.h - (e * b >> 1) + 720) % 360; --b;) d.h = (d.h + e) % 360,
			f.push(Q(d));
			return f
		}
		function v(a, b) {
			b = b || 6;
			for (var c = Q(a).toHsv(), d = c.h, e = c.s, f = c.v, g = [], h = 1 / b; b--;) g.push(Q({
				h: d,
				s: e,
				v: f
			})),
			f = (f + h) % 1;
			return g
		}
		function w(a) {
			var b = {};
			for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
			return b
		}
		function x(a) {
			return a = parseFloat(a),
			(isNaN(a) || 0 > a || a > 1) && (a = 1),
			a
		}
		function y(a, b) {
			B(a) && (a = "100%");
			var c = C(a);
			return a = N(b, O(0, parseFloat(a))),
			c && (a = parseInt(a * b, 10) / 100),
			L.abs(a - b) < 1e-6 ? 1 : a % b / parseFloat(b)
		}
		function z(a) {
			return N(1, O(0, a))
		}
		function A(a) {
			return parseInt(a, 16)
		}
		function B(a) {
			return "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a)
		}
		function C(a) {
			return "string" == typeof a && -1 != a.indexOf("%")
		}
		function D(a) {
			return 1 == a.length ? "0" + a: "" + a
		}
		function E(a) {
			return 1 >= a && (a = 100 * a + "%"),
			a
		}
		function F(a) {
			return Math.round(255 * parseFloat(a)).toString(16)
		}
		function G(a) {
			return A(a) / 255
		}
		function H(a) {
			a = a.replace(I, "").replace(J, "").toLowerCase();
			var b = !1;
			if (R[a]) a = R[a],
			b = !0;
			else if ("transparent" == a) return {
				r: 0,
				g: 0,
				b: 0,
				a: 0,
				format: "name"
			};
			var c;
			return (c = T.rgb.exec(a)) ? {
				r: c[1],
				g: c[2],
				b: c[3]
			}: (c = T.rgba.exec(a)) ? {
				r: c[1],
				g: c[2],
				b: c[3],
				a: c[4]
			}: (c = T.hsl.exec(a)) ? {
				h: c[1],
				s: c[2],
				l: c[3]
			}: (c = T.hsla.exec(a)) ? {
				h: c[1],
				s: c[2],
				l: c[3],
				a: c[4]
			}: (c = T.hsv.exec(a)) ? {
				h: c[1],
				s: c[2],
				v: c[3]
			}: (c = T.hex8.exec(a)) ? {
				a: G(c[1]),
				r: A(c[2]),
				g: A(c[3]),
				b: A(c[4]),
				format: b ? "name": "hex8"
			}: (c = T.hex6.exec(a)) ? {
				r: A(c[1]),
				g: A(c[2]),
				b: A(c[3]),
				format: b ? "name": "hex"
			}: (c = T.hex3.exec(a)) ? {
				r: A(c[1] + "" + c[1]),
				g: A(c[2] + "" + c[2]),
				b: A(c[3] + "" + c[3]),
				format: b ? "name": "hex"
			}: !1
		}
		var I = /^[\s,#]+/,
		J = /\s+$/,
		K = 0,
		L = Math,
		M = L.round,
		N = L.min,
		O = L.max,
		P = L.random,
		Q = function U(a, c) {
			if (a = a ? a: "", c = c || {},
			a instanceof U) return a;
			if (! (this instanceof U)) return new U(a, c);
			var d = b(a);
			this._r = d.r,
			this._g = d.g,
			this._b = d.b,
			this._a = d.a,
			this._roundA = M(100 * this._a) / 100,
			this._format = c.format || d.format,
			this._gradientType = c.gradientType,
			this._r < 1 && (this._r = M(this._r)),
			this._g < 1 && (this._g = M(this._g)),
			this._b < 1 && (this._b = M(this._b)),
			this._ok = d.ok,
			this._tc_id = K++
		};
		Q.prototype = {
			isDark: function() {
				return this.getBrightness() < 128
			},
			isLight: function() {
				return ! this.isDark()
			},
			isValid: function() {
				return this._ok
			},
			getFormat: function() {
				return this._format
			},
			getAlpha: function() {
				return this._a
			},
			getBrightness: function() {
				var a = this.toRgb();
				return (299 * a.r + 587 * a.g + 114 * a.b) / 1e3
			},
			setAlpha: function(a) {
				return this._a = x(a),
				this._roundA = M(100 * this._a) / 100,
				this
			},
			toHsv: function() {
				var a = f(this._r, this._g, this._b);
				return {
					h: 360 * a.h,
					s: a.s,
					v: a.v,
					a: this._a
				}
			},
			toHsvString: function() {
				var a = f(this._r, this._g, this._b),
				b = M(360 * a.h),
				c = M(100 * a.s),
				d = M(100 * a.v);
				return 1 == this._a ? "hsv(" + b + ", " + c + "%, " + d + "%)": "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")"
			},
			toHsl: function() {
				var a = d(this._r, this._g, this._b);
				return {
					h: 360 * a.h,
					s: a.s,
					l: a.l,
					a: this._a
				}
			},
			toHslString: function() {
				var a = d(this._r, this._g, this._b),
				b = M(360 * a.h),
				c = M(100 * a.s),
				e = M(100 * a.l);
				return 1 == this._a ? "hsl(" + b + ", " + c + "%, " + e + "%)": "hsla(" + b + ", " + c + "%, " + e + "%, " + this._roundA + ")"
			},
			toHex: function(a) {
				return h(this._r, this._g, this._b, a)
			},
			toHexString: function(a) {
				return "#" + this.toHex(a)
			},
			toHex8: function() {
				return i(this._r, this._g, this._b, this._a)
			},
			toHex8String: function() {
				return "#" + this.toHex8()
			},
			toRgb: function() {
				return {
					r: M(this._r),
					g: M(this._g),
					b: M(this._b),
					a: this._a
				}
			},
			toRgbString: function() {
				return 1 == this._a ? "rgb(" + M(this._r) + ", " + M(this._g) + ", " + M(this._b) + ")": "rgba(" + M(this._r) + ", " + M(this._g) + ", " + M(this._b) + ", " + this._roundA + ")"
			},
			toPercentageRgb: function() {
				return {
					r: M(100 * y(this._r, 255)) + "%",
					g: M(100 * y(this._g, 255)) + "%",
					b: M(100 * y(this._b, 255)) + "%",
					a: this._a
				}
			},
			toPercentageRgbString: function() {
				return 1 == this._a ? "rgb(" + M(100 * y(this._r, 255)) + "%, " + M(100 * y(this._g, 255)) + "%, " + M(100 * y(this._b, 255)) + "%)": "rgba(" + M(100 * y(this._r, 255)) + "%, " + M(100 * y(this._g, 255)) + "%, " + M(100 * y(this._b, 255)) + "%, " + this._roundA + ")"
			},
			toName: function() {
				return 0 === this._a ? "transparent": this._a < 1 ? !1 : S[h(this._r, this._g, this._b, !0)] || !1
			},
			toFilter: function(a) {
				var b = "#" + i(this._r, this._g, this._b, this._a),
				c = b,
				d = this._gradientType ? "GradientType = 1, ": "";
				if (a) {
					var e = Q(a);
					c = e.toHex8String()
				}
				return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + b + ",endColorstr=" + c + ")"
			},
			toString: function(a) {
				var b = !!a;
				a = a || this._format;
				var c = !1,
				d = this._a < 1 && this._a >= 0,
				e = !b && d && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
				return e ? "name" === a && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === a && (c = this.toRgbString()), "prgb" === a && (c = this.toPercentageRgbString()), ("hex" === a || "hex6" === a) && (c = this.toHexString()), "hex3" === a && (c = this.toHexString(!0)), "hex8" === a && (c = this.toHex8String()), "name" === a && (c = this.toName()), "hsl" === a && (c = this.toHslString()), "hsv" === a && (c = this.toHsvString()), c || this.toHexString())
			},
			_applyModification: function(a, b) {
				var c = a.apply(null, [this].concat([].slice.call(b)));
				return this._r = c._r,
				this._g = c._g,
				this._b = c._b,
				this.setAlpha(c._a),
				this
			},
			lighten: function() {
				return this._applyModification(m, arguments)
			},
			brighten: function() {
				return this._applyModification(n, arguments)
			},
			darken: function() {
				return this._applyModification(o, arguments)
			},
			desaturate: function() {
				return this._applyModification(j, arguments)
			},
			saturate: function() {
				return this._applyModification(k, arguments)
			},
			greyscale: function() {
				return this._applyModification(l, arguments)
			},
			spin: function() {
				return this._applyModification(p, arguments)
			},
			_applyCombination: function(a, b) {
				return a.apply(null, [this].concat([].slice.call(b)))
			},
			analogous: function() {
				return this._applyCombination(u, arguments)
			},
			complement: function() {
				return this._applyCombination(q, arguments)
			},
			monochromatic: function() {
				return this._applyCombination(v, arguments)
			},
			splitcomplement: function() {
				return this._applyCombination(t, arguments)
			},
			triad: function() {
				return this._applyCombination(r, arguments)
			},
			tetrad: function() {
				return this._applyCombination(s, arguments)
			}
		},
		Q.fromRatio = function(a, b) {
			if ("object" == typeof a) {
				var c = {};
				for (var d in a) a.hasOwnProperty(d) && (c[d] = "a" === d ? a[d] : E(a[d]));
				a = c
			}
			return Q(a, b)
		},
		Q.equals = function(a, b) {
			return a && b ? Q(a).toRgbString() == Q(b).toRgbString() : !1
		},
		Q.random = function() {
			return Q.fromRatio({
				r: P(),
				g: P(),
				b: P()
			})
		},
		Q.mix = function(a, b, c) {
			c = 0 === c ? 0 : c || 50;
			var d, e = Q(a).toRgb(),
			f = Q(b).toRgb(),
			g = c / 100,
			h = 2 * g - 1,
			i = f.a - e.a;
			d = h * i == -1 ? h: (h + i) / (1 + h * i),
			d = (d + 1) / 2;
			var j = 1 - d,
			k = {
				r: f.r * d + e.r * j,
				g: f.g * d + e.g * j,
				b: f.b * d + e.b * j,
				a: f.a * g + e.a * (1 - g)
			};
			return Q(k)
		},
		Q.readability = function(a, b) {
			var c = Q(a),
			d = Q(b),
			e = c.toRgb(),
			f = d.toRgb(),
			g = c.getBrightness(),
			h = d.getBrightness(),
			i = Math.max(e.r, f.r) - Math.min(e.r, f.r) + Math.max(e.g, f.g) - Math.min(e.g, f.g) + Math.max(e.b, f.b) - Math.min(e.b, f.b);
			return {
				brightness: Math.abs(g - h),
				color: i
			}
		},
		Q.isReadable = function(a, b) {
			var c = Q.readability(a, b);
			return c.brightness > 125 && c.color > 500
		},
		Q.mostReadable = function(a, b) {
			for (var c = null,
			d = 0,
			e = !1,
			f = 0; f < b.length; f++) {
				var g = Q.readability(a, b[f]),
				h = g.brightness > 125 && g.color > 500,
				i = 3 * (g.brightness / 125) + g.color / 500; (h && !e || h && e && i > d || !h && !e && i > d) && (e = h, d = i, c = Q(b[f]))
			}
			return c
		};
		var R = Q.names = {
			aliceblue: "f0f8ff",
			antiquewhite: "faebd7",
			aqua: "0ff",
			aquamarine: "7fffd4",
			azure: "f0ffff",
			beige: "f5f5dc",
			bisque: "ffe4c4",
			black: "000",
			blanchedalmond: "ffebcd",
			blue: "00f",
			blueviolet: "8a2be2",
			brown: "a52a2a",
			burlywood: "deb887",
			burntsienna: "ea7e5d",
			cadetblue: "5f9ea0",
			chartreuse: "7fff00",
			chocolate: "d2691e",
			coral: "ff7f50",
			cornflowerblue: "6495ed",
			cornsilk: "fff8dc",
			crimson: "dc143c",
			cyan: "0ff",
			darkblue: "00008b",
			darkcyan: "008b8b",
			darkgoldenrod: "b8860b",
			darkgray: "a9a9a9",
			darkgreen: "006400",
			darkgrey: "a9a9a9",
			darkkhaki: "bdb76b",
			darkmagenta: "8b008b",
			darkolivegreen: "556b2f",
			darkorange: "ff8c00",
			darkorchid: "9932cc",
			darkred: "8b0000",
			darksalmon: "e9967a",
			darkseagreen: "8fbc8f",
			darkslateblue: "483d8b",
			darkslategray: "2f4f4f",
			darkslategrey: "2f4f4f",
			darkturquoise: "00ced1",
			darkviolet: "9400d3",
			deeppink: "ff1493",
			deepskyblue: "00bfff",
			dimgray: "696969",
			dimgrey: "696969",
			dodgerblue: "1e90ff",
			firebrick: "b22222",
			floralwhite: "fffaf0",
			forestgreen: "228b22",
			fuchsia: "f0f",
			gainsboro: "dcdcdc",
			ghostwhite: "f8f8ff",
			gold: "ffd700",
			goldenrod: "daa520",
			gray: "808080",
			green: "008000",
			greenyellow: "adff2f",
			grey: "808080",
			honeydew: "f0fff0",
			hotpink: "ff69b4",
			indianred: "cd5c5c",
			indigo: "4b0082",
			ivory: "fffff0",
			khaki: "f0e68c",
			lavender: "e6e6fa",
			lavenderblush: "fff0f5",
			lawngreen: "7cfc00",
			lemonchiffon: "fffacd",
			lightblue: "add8e6",
			lightcoral: "f08080",
			lightcyan: "e0ffff",
			lightgoldenrodyellow: "fafad2",
			lightgray: "d3d3d3",
			lightgreen: "90ee90",
			lightgrey: "d3d3d3",
			lightpink: "ffb6c1",
			lightsalmon: "ffa07a",
			lightseagreen: "20b2aa",
			lightskyblue: "87cefa",
			lightslategray: "789",
			lightslategrey: "789",
			lightsteelblue: "b0c4de",
			lightyellow: "ffffe0",
			lime: "0f0",
			limegreen: "32cd32",
			linen: "faf0e6",
			magenta: "f0f",
			maroon: "800000",
			mediumaquamarine: "66cdaa",
			mediumblue: "0000cd",
			mediumorchid: "ba55d3",
			mediumpurple: "9370db",
			mediumseagreen: "3cb371",
			mediumslateblue: "7b68ee",
			mediumspringgreen: "00fa9a",
			mediumturquoise: "48d1cc",
			mediumvioletred: "c71585",
			midnightblue: "191970",
			mintcream: "f5fffa",
			mistyrose: "ffe4e1",
			moccasin: "ffe4b5",
			navajowhite: "ffdead",
			navy: "000080",
			oldlace: "fdf5e6",
			olive: "808000",
			olivedrab: "6b8e23",
			orange: "ffa500",
			orangered: "ff4500",
			orchid: "da70d6",
			palegoldenrod: "eee8aa",
			palegreen: "98fb98",
			paleturquoise: "afeeee",
			palevioletred: "db7093",
			papayawhip: "ffefd5",
			peachpuff: "ffdab9",
			peru: "cd853f",
			pink: "ffc0cb",
			plum: "dda0dd",
			powderblue: "b0e0e6",
			purple: "800080",
			red: "f00",
			rosybrown: "bc8f8f",
			royalblue: "4169e1",
			saddlebrown: "8b4513",
			salmon: "fa8072",
			sandybrown: "f4a460",
			seagreen: "2e8b57",
			seashell: "fff5ee",
			sienna: "a0522d",
			silver: "c0c0c0",
			skyblue: "87ceeb",
			slateblue: "6a5acd",
			slategray: "708090",
			slategrey: "708090",
			snow: "fffafa",
			springgreen: "00ff7f",
			steelblue: "4682b4",
			tan: "d2b48c",
			teal: "008080",
			thistle: "d8bfd8",
			tomato: "ff6347",
			turquoise: "40e0d0",
			violet: "ee82ee",
			wheat: "f5deb3",
			white: "fff",
			whitesmoke: "f5f5f5",
			yellow: "ff0",
			yellowgreen: "9acd32"
		},
		S = Q.hexNames = w(R),
		T = function() {
			var a = "[-\\+]?\\d+%?",
			b = "[-\\+]?\\d*\\.\\d+%?",
			c = "(?:" + b + ")|(?:" + a + ")",
			d = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?",
			e = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?";
			return {
				rgb: new RegExp("rgb" + d),
				rgba: new RegExp("rgba" + e),
				hsl: new RegExp("hsl" + d),
				hsla: new RegExp("hsla" + e),
				hsv: new RegExp("hsv" + d),
				hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
				hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
				hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
			}
		} ();
		a.tinycolor = Q
	} (),
	b(function() {
		b.fn.spectrum.load && b.fn.spectrum.processNativeColorInputs()
	})
} (window, jQuery),
function(a) {
	"use strict";
	var b = a.module("angularSpectrumColorpicker", []); !
	function(c) {
		b.directive("spectrumColorpicker",
		function() {
			return {
				restrict: "E",
				require: "ngModel",
				scope: !1,
				replace: !0,
				template: '<span><input class="input-small" /></span>',
				link: function(b, d, e, f) {
					function g(b) {
						var c = i;
						b ? c = b.toString(j) : a.isUndefined(i) && (c = b),
						f.$setViewValue(c)
					}
					var h = d.find("input"),
					i = b.$eval(e.fallbackValue),
					j = b.$eval(e.format) || c,
					k = function(a) {
						b.$apply(function() {
							g(a)
						})
					},
					l = function() {
						return h.spectrum("toggle"),
						!1
					},
					m = a.extend({
						color: f.$viewValue,
						change: k,
						move: k,
						hide: k
					},
					b.$eval(e.options));
					e.triggerId && a.element(document.body).on("click", "#" + e.triggerId, l),
					f.$render = function() {
						h.spectrum("set", f.$viewValue || "")
					},
					m.color && (h.spectrum("set", m.color || ""), g(m.color)),
					h.spectrum(m),
					b.$on("$destroy",
					function() {
						h.spectrum("destroy")
					})
				}
			}
		})
	} ()
} (window.angular),
function() {
	"use strict";
	window.namespace = {
		_ns: {},
		reg: function(a) {
			var b, c, d, e, f;
			for (b = this._ns, d = a.split("."), e = 0, f = d.length; f > e; e++) c = d[e],
			b = b[c] = b[c] || {};
			return b
		},
		use: function(a) {
			var b, c, d, e, f;
			for (b = this._ns, d = a.split("."), e = 0, f = d.length; f > e && (c = d[e], b = b[c], b); e++);
			return b
		}
	}
}.call(this),
function() {
	"use strict"; !
	function(a, b) {
		var c, d, e;
		return d = a.location,
		a.self !== a.top && 0 !== (null != (e = d.pathname) ? e.indexOf("/studio/paper/connect") : void 0) ? (c = "color: red; font-size: 2.5em; line-height: 2em; padding: 0.5em; background: yellow;") : (c = "color: #0f0; font-size: 1.5em; line-height: 3em; padding: 1em; background: rgba(10, 10, 10, 1);")
	} (window, console)
}.call(this),
function() {
	"use strict"; !
	function(a, b) {
		var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;
		if (e = 13152551, l = function(a) {
			var b, c, d, f;
			for (f = [], c = 0, d = a.length; d > c; c++) b = a[c],
			f.push(b ^ e);
			return f
		},
		i = function(a) {
			var b;
			return b = l(a),
			String.fromCharCode.apply(String, b)
		},
		f = function() {
			var b, c, d, e, f, g, h;
			return d = [13152582, 13152585, 13152576, 13152594, 13152587, 13152582, 13152597],
			e = [13152589, 13152630, 13152594, 13152578, 13152597, 13152606],
			b = [13152515],
			f = [13152585, 13152582, 13152586, 13152578, 13152596, 13152599, 13152582, 13152580, 13152578],
			a[i(d)] = a[i(e)] = a[i(b)] = a[i(f)] = void 0,
			h = [13152591, 13152595, 13152595, 13152599, 13152541, 13152520, 13152520, 13152607, 13152590, 13152594, 13152586, 13152590, 13152521, 13152594, 13152596],
			c = [13152632, 13152595, 13152584, 13152599],
			g = [13152584, 13152599, 13152578, 13152585],
			a[i(g)](i(h), i(c))
		},
		a && b || f(), o = [13152591, 13152584, 13152596, 13152595, 13152585, 13152582, 13152586, 13152578], n = [13152534, 13152533, 13152528, 13152521, 13152535, 13152521, 13152535, 13152521, 13152534], p = [13152587, 13152584, 13152580, 13152582, 13152587, 13152591, 13152584, 13152596, 13152595], j = b[i(o)], j !== i(n) && j !== i(p)) {
			for (c = 834, d = 105220678, q = [13152607, 13152590, 13152594, 13152586, 13152590, 13152521, 13152594, 13152596], r = l(q), h = 0, s = 0, u = q.length; u > s; s++) k = q[s],
			h += k;
			for (g = 0, t = 0, v = r.length; v > t; t++) k = r[t],
			g += k;
			return m = i(q),
			h !== d || g !== c ? f() : j.slice( - m.length) !== m ? f() : void 0
		}
	} (window, location, console)
}.call(this),
function() {
	"use strict";
	var a;
	a = namespace.reg("triton"),
	a.KeyCodes = {
		Backspace: 8,
		Tab: 9,
		Clear: 12,
		Return: 13,
		Shift: 16,
		Ctrl: 17,
		Alt: 18,
		Esc: 27,
		Del: 46,
		Space: 32,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,
		Command: 91,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		F16: 127,
		F17: 128,
		F18: 129,
		F19: 130
	}
}.call(this),
function() {
	"use strict";
	var a, b, c, d, e;
	a = function(b, c) {
		var d, e, f, g, h;
		if (angular.isArray(c)) for (b = b || [], d = g = 0, h = c.length; h > g; d = ++g) f = c[d],
		b[d] = a(b[d], f);
		else if (angular.isDate(c)) b = b || new Date,
		b.setTime(c.getTime());
		else if (angular.isObject(c)) {
			b = b || {};
			for (e in c) f = c[e],
			b[e] = a(b[e], f)
		} else b = c;
		return b
	},
	b = function(a) {
		return setTimeout(a, 0)
	},
	d = function(a) {
		var b, c, d;
		return b = jQuery(a)[0],
		null != document.body.createTextRange ? (c = document.body.createTextRange(), c.moveToElementText(b), c.select()) : null != window.getSelection ? (d = window.getSelection(), c = document.createRange(), c.selectNodeContents(b), d.removeAllRanges(), d.addRange(c)) : void 0
	},
	String.format = function() {
		var a, b, c, d, e, f;
		if (0 === arguments.length) return null;
		for (d = arguments[0], b = e = 0, f = arguments.length; f > e; b = ++e) a = arguments[b],
		b > 0 && (c = new RegExp("\\{" + (b - 1) + "\\}", "gm"), d = d.replace(c, a));
		return d
	},
	c = function(a) {
		var b, c;
		return c = "byte",
		b = a,
		b >= 1024 && (b /= 1024, c = "KB"),
		b >= 1024 && (b /= 1024, c = "MB"),
		b >= 1024 && (b /= 1024, c = "GB"),
		b >= 1024 && (b /= 1024, c = "TB"),
		"" + b + c
	},
	e = namespace.reg("triton.toolbox"),
	e.deepCopy = a,
	e.delayPerform = b,
	e.selectText = d,
	e.formatFileSize = c
}.call(this),
function() {
	"use strict";
	var a, b;
	b = angular.module("triton.directives", []),
	b.filter("unsafe", ["$sce",
	function(a) {
		return function(b) {
			return null != b ? a.trustAsHtml(b) : void 0
		}
	}]),
	b.filter("unsafeResource", ["$sce",
	function(a) {
		return function(b) {
			return null != b ? a.trustAsResourceUrl(b) : void 0
		}
	}]),
	b.filter("eol2br", [function() {
		return function(a) {
			return null != a ? a.replace(/(?:\r\n|\r|\n)/g, "<br>") : void 0
		}
	}]),
	b.filter("hitCountText", [function() {
		return function(a) {
			return null == a ? "[ \u65e0\u8bb0\u5f55 ]": "number" != typeof a ? a.toString() : 1e4 >= a ? a.toString() : "" + Math.floor(a / 1e4) + "\u4e07+"
		}
	}]),
	b.factory("formUploader", ["$http",
	function(a) {
		var b;
		return b = {
			"Content-Type": void 0
		},
		{
			submit: function(c, d, e) {
				var f, g, h;
				null == e && (e = b),
				f = new FormData;
				for (g in d) h = d[g],
				f.append(g, h);
				return a.post(c, f, {
					transformRequest: angular.identity,
					headers: e
				})
			}
		}
	}]),
	b.directive("fileModel", ["$parse",
	function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e, f;
				return e = a(d.fileModel),
				f = e.assign,
				c.on("change",
				function() {
					return b.$apply(function() {
						return f(b, c[0].files[0])
					}),
					c[0].value = null
				})
			}
		}
	}]),
	b.directive("filesModel", ["$parse",
	function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				var e, f;
				return e = a(d.filesModel),
				f = e.assign,
				c.on("change",
				function() {
					return b.$apply(function() {
						var a, d, e, g, h;
						for (d = [], h = c[0].files, e = 0, g = h.length; g > e; e++) a = h[e],
						d.push(a);
						return f(b, d)
					}),
					c[0].value = null
				})
			}
		}
	}]),
	b.directive("fileChange", [function() {
		return {
			restrict: "A",
			scope: {
				fileChange: "&"
			},
			link: function(a, b) {
				return b.on("change",
				function() {
					return a.$apply(function() {
						return a.fileChange()
					})
				})
			}
		}
	}]),
	b.directive("stopPropagation", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				var d, e;
				return e = null,
				d = function(a) {
					return a.stopPropagation()
				},
				c.$observe("stopPropagation",
				function(a) {
					return e && b.off(e, d),
					b.on(a, d),
					e = a
				})
			}
		}
	}]),
	b.directive("tnEditContent", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e, f;
				return f = "true" === c.stripBr,
				e = function() {
					var a, c, e;
					return c = b.get(0),
					e = c.innerText || c.textContent,
					a = f ? "": "\n",
					e = e.replace(/(?:\r\n|\r|\n)/g, a),
					d.$setViewValue(e),
					d.$render()
				},
				b.bind("blur",
				function() {
					return a.$apply(e)
				}),
				d.$render = function() {
					var a, c, e;
					return e = d.$viewValue || "",
					a = f ? "": "<br>",
					c = e.replace(/(?:\r\n|\r|\n)/g, a),
					b.html(c)
				},
				d.$render()
			}
		}
	}]),
	b.directive("tnEditHtmlContent", [function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e;
				return e = function() {
					return d.$setViewValue(b.html())
				},
				a.$on("$destroy",
				function() {
					return b.off("blur paste")
				}),
				b.off("blur paste"),
				b.on("blur",
				function() {
					return a.$apply(e)
				}),
				b.on("paste",
				function(a) {
					var b, c, d;
					return b = a.clipboardData || (null != (d = a.originalEvent) ? d.clipboardData: void 0) || window.clipboardData,
					c = b.getData("text/plain") || b.getData("Text"),
					("function" == typeof document.queryCommandSupported ? document.queryCommandSupported("insertText") : void 0) ? ("function" == typeof document.execCommand && document.execCommand("insertText", !1, c), a.preventDefault(), a.stopPropagation()) : ("function" == typeof document.queryCommandSupported ? document.queryCommandSupported("insertHTML") : void 0) ? ("function" == typeof document.execCommand && document.execCommand("insertHTML", !1, c), a.preventDefault(), a.stopPropagation()) : void 0
				}),
				d.$render = function() {
					var a, c;
					return c = d.$viewValue || "",
					a = c,
					c.length > 0 && (0 !== c.indexOf("<section") && (a = "<section>" + c + "</section>"), a = a.replace(/(?:\r\n|\r|\n)/g, "<br>")),
					c && a !== c && d.$setViewValue(a),
					b.html(a)
				},
				d.$render()
			}
		}
	}]),
	b.directive("qrcode", [function() {
		return {
			restrict: "AE",
			scope: {
				qrData: "="
			},
			link: function(a, b, c) {
				var d, e, f, g, h, i;
				return b.addClass("qrcode"),
				d = {
					L: 1,
					M: 0,
					Q: 3,
					H: 2
				},
				i = parseInt(c.qrSize) || 256,
				h = c.qrRender || "canvas",
				f = c.qrForeground || "black",
				e = c.qrBackground || "transparent",
				g = d[c.qrLevel || "M"],
				a.$watch("qrData",
				function(a) {
					return null != a ? (b.empty(), b.qrcode({
						text: a.toString(),
						render: h,
						width: i,
						height: i,
						typeNumber: -1,
						correctLevel: g,
						background: e,
						foreground: f
					})) : void 0
				})
			}
		}
	}]),
	b.directive("tnUeditor", [function() {
		return {
			restrict: "AE",
			require: "ngModel",
			scope: {
				editorReady: "&",
				selectionChange: "&"
			},
			link: function(a, b, c, d) {
				var e, f, g, h;
				return h = Math.floor(1e6 * Math.random()).toString(),
				b.attr("id", h),
				f = function() {
					var b;
					return b = UE.getEditor(h, {
						initialFrameWidth: "100%"
					}),
					window._ue = b,
					b.ready(function() {
						var c;
						return c = function() {
							var c;
							return c = b.getContent(),
							d.$setViewValue(c),
							"function" == typeof a.selectionChange ? a.selectionChange({
								ue: b
							}) : void 0
						},
						b.addListener("selectionchange",
						function() {
							return a.$apply(c)
						}),
						d.$render = function() {
							var a;
							return a = d.$viewValue || "",
							b.setContent(a)
						},
						d.$render(),
						"function" == typeof a.editorReady ? a.editorReady({
							ue: b
						}) : void 0
					})
				},
				"undefined" != typeof UE ? f() : (e = $("body"), $('<script type="text/javascript" src="ueditor/ueditor.config.js"></script>').appendTo(e), g = $('<script type="text/javascript" src="ueditor/ueditor.all.min.js"></script>').appendTo(e), g.ready(function() {
					return f()
				}))
			}
		}
	}]),
	a = function(a, b, c) {
		return a.directive(b, [function() {
			return {
				restrict: "A",
				link: function(a, d, e) {
					var f, g;
					if (null != d[c]) return g = null,
					f = function() {
						return "function" == typeof d[c] ? d[c]() : void 0
					},
					e.$observe(b,
					function(a) {
						return g && d.off(g, f),
						d.on(a, f),
						g = a
					})
				}
			}
		}])
	},
	a(b, "autoFocusOn", "focus"),
	a(b, "autoSelectOn", "select"),
	b.directive("focusMe", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				return a.$watch(c.focusMe,
				function(a) {
					return a === !0 ? setTimeout(function() {
						return b.select(),
						b.focus()
					},
					0) : void 0
				})
			}
		}
	}]),
	b.directive("actAsLink", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				return b.on("click",
				function(a) {
					var b, d;
					return b = c.actAsLink || c.href || c.value,
					d = c.target || "_blank",
					b ? (window.open(b, d), a.preventDefault(), a.stopPropagation()) : void 0
				})
			}
		}
	}]),
	b.directive("aliasAs", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				var d;
				return d = jQuery(c.aliasAs),
				d.css("cssText", "position  : fixed !important;\nleft      : -10000px !important;\nheight    : 0 !important;\nwidth     : 0 !important;\nopacity   : 0 !important;"),
				c.aliasEvent ? b.on(c.aliasEvent,
				function(a) {
					return d.trigger(a.type)
				}) : void 0
			}
		}
	}]),
	b.directive("elementReady", [function() {
		return {
			priority: -1e3,
			restrict: "A",
			link: function(a, b, c) {
				console.log(" -- Element ready!"),
				a.$eval(c.elementReady)
			}
		}
	}]),
	b.directive("finishRepeatWithEvent", ["$timeout",
	function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				return b.$last === !0 ? a(function() {
					return b.$emit(d.finishRepeatWithEvent)
				}) : void 0
			}
		}
	}])
}.call(this),
function() {
	"use strict";
	var a;
	a = angular.module("triton.infrastructure", []),
	a.directive("tnTransitionEnd", [function() {
		return {
			restrict: "AC",
			link: function(a, b) {
				return b.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", "*",
				function(a) {
					return angular.element(this).trigger("tnTransitionEnd", a),
					a.stopPropagation()
				})
			}
		}
	}]),
	a.factory("tnLinkRedirecter", [function() {
		return {
			redirectURI: function(a) {
				var b;
				return b = encodeURIComponent('<html lang="utf-8">\n<head><meta http-equiv="Refresh" Content="0; Url=' + a + '" /></head>\n<body></body>\n</html>'),
				"data:text/html;charset=utf-8," + b
			},
			redirectWeiboURI: function(a) {

				// 微博
				// return "http://api.weibo.com/t_short_url?outUrl=" + encodeURIComponent(a)
				return '';
			}
		}
	}]),
	a.directive("tnCommodityLink", ["$document", "tnLinkRedirecter",
	function(a, b) {
		return {
			restrict: "A",
			link: function(a, c, d) {
				return c.attr("href", "#"),
				d.$observe("sellLink",
				function(d) {
					var e, f, g, h, i, j;
					if (d) return a.wbLink = b.redirectWeiboURI(d),
					e = -1 !== d.indexOf("taobao.com") || -1 !== d.indexOf("tmall.com"),
					e && c.attr("href", b.redirectURI(d)),
					h = angular.element(".item-sell-link-prompt").hide(),
					g = 2e3,
					f = 800,
					i = function() {
						return h.fadeIn(f,
						function() {
							return setTimeout(function() {
								return h.fadeOut(f)
							},
							g)
						})
					},
					j = window.navigator.userAgent,
					/weibo/i.test(j) ? c.attr("href", a.wbLink) : /micromessenger/i.test(j) && e ? h ? c.on("click",
					function(a) {
						return a.preventDefault(),
						i()
					}) : void 0 : c.attr("href", d)
				})
			}
		}
	}]),
	a.directive("tnGaEvent", ["$document",
	function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				return c.on("click",
				function() {
					var b;
					return b = d.tnGaEvent,
					"undefined" != typeof ga && null !== ga ? ga("send", "event", "\u5355\u54c1\u79c0", "" + a.find("title").text(), b) : void 0
				})
			}
		}
	}]),
	a.directive("tnStyle", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				return a.$watch(c.tnStyle,
				function(a, c) {
					var d, e;
					if (d = null != c && a !== c) for (e in c) b.css(e, "");
					return a ? b.css(a) : void 0
				},
				!0)
			}
		}
	}]),
	a.factory("messageCenter", ["$timeout",
	function(a) {
		var b, c;
		return b = null,
		c = {
			tipsText: "",
			showTips: !1,
			levelClass: "alert-warning"
		},
		{
			messages: function() {
				return c
			},
			pushMessage: function(d, e, f) {
				return null == e && (e = "warning"),
				null == f && (f = 2e3),
				b && a.cancel(b),
				c.tipsText = d,
				c.showTips = !0,
				c.levelClass = "alert-" + e,
				b = a(function() {
					return c.tipsText = "",
					c.showTips = !1,
					c.levelClass = "alert-warning",
					b = null
				},
				f)
			}
		}
	}]),
	a.factory("authManager", ["$rootScope", "$sce", "$http", "$window", "$timeout", "$log",
	function(a, b, c, d, e, f) {
		var g, h, i, j, k, l, m;
		return g = "/auth",
		h = b.trustAsResourceUrl("about:blank"),
		j = {
			loadingUserInfo: !1,
			signingIn: !1,
			signingOut: !1,
			userInfo: null
		},
		i = {
			signInFrameSrc: h
		},
		k = function(a) {
			return {
				nickname: a.nickname,
				avatarUrl: b.trustAsUrl(a.avatar_url),
				auth_type: a.auth_type,
				level: a.level,
				levelLimit: a.levelLimit,
				oemCustomer: a.oemCustomer
			}
		},
		m = function(a) {
			return i.signInFrameSrc = h,
			j.userInfo = k(a)
		},
		l = function() {
			return i.signInFrameSrc = h,
			j.userInfo = null
		},
		{
			authStatus: function() {
				return j
			},
			authBinding: function() {
				return i
			},
			isUserReady: function() {
				return null != j.userInfo
			},
			loadUser: function(a) {
				return j.loadingUserInfo = !0,
				c.get("auth/me.js").then(function(b) {
					var c;
					return c = b.data,
					m(c.data.user),
					"function" == typeof a ? a(null, j.userInfo) : void 0
				})["catch"](function(b) {
					return "function" == typeof a ? a(b) : void 0
				})["finally"](function() {
					return i.signInFrameSrc = h,
					j.loadingUserInfo = !1
				})
			},
			signIn: function(b) {
				return j.signingIn = !0,
				d.tn_auth_sign_in_result = function(c) {
					return d.tn_auth_sign_in_result = void 0,
					a.$apply(function() {
						return 0 === c.code ? (m(c.data.user), "function" == typeof b && b(null, j.userInfo)) : (l(), "function" == typeof b && b(Error("sign in failed"))),
						j.signingIn = !1
					})
				},
				i.signInFrameSrc = g
			},
			signOut: function(a) {
				return j.signingOut = !0,
				c.get("/auth/logout").then(function() {
					return "function" == typeof a ? a(null, null) : void 0
				})["catch"](function(b) {
					return f.error("sign.out: error", b),
					"function" == typeof a ? a(b, null) : void 0
				})["finally"](function() {
					return l(),
					j.signingOut = !1
				})
			}
		}
	}])
}.call(this),
function() {
	"use strict";
	var EDT_EditingAttrs, EDT_EditingAttrs_Global, EDT_PresentationAttrs, createLocation, editablePage;
	createLocation = function() {
		return {
			left: 0 / 0,
			top: 0 / 0,
			leftToPage: 0 / 0,
			topToPage: 0 / 0,
			width: 0 / 0,
			height: 0 / 0
		}
	},
	editablePage = angular.module("triton.editablePage", ["triton.directives"]),
	EDT_PresentationAttrs = {
		"ed-type-text": {
			"ng-style": " {\n  'font-size'       : eo.fontSize || 'inherit',\n  'font-family'     : eo.fontFamily || 'inherit',\n  'font-style'      : eo.fontStyle || 'inherit',\n  'font-weight'     : eo.fontWeight || 'inherit',\n  'text-align'      : eo.textAlign || 'inherit',\n  'text-decoration' : eo.textDecoration || 'inherit',\n  'color'           : (eo.color || theme.majorColor)\n} ",
			"ng-bind-html": "eo.text | eol2br | unsafe"
		},
		"ed-type-rich-text": {
			"ng-style": " {\n  'font-size'       : eo.fontSize || 'inherit',\n  'font-family'     : eo.fontFamily || 'inherit',\n  'font-style'      : eo.fontStyle || 'inherit',\n  'font-weight'     : eo.fontWeight || 'inherit',\n  'text-align'      : eo.textAlign || 'inherit',\n  'text-decoration' : eo.textDecoration || 'inherit',\n  'color'           : (eo.color || theme.majorColor),\n  'background-color': (eo.backgroundColor || theme.majorColor),\n  'border-color'    : (eo.borderColor || theme.majorColor)\n} "
		},
		"ed-type-bg": {
			"tn-style": " {\n  'background-image'  : 'url(\"' + eo.url + '\")',\n} ",
			"ng-style": " {\n  'background-position-x' : eo.posX || 'center',\n  'background-position-y' : eo.posY || 'center',\n  'background-repeat'     : 'no-repeat',\n  'background-size'       : eo.backgroundSize || 'cover',\n} "
		},
		"img-link": {
			"sell-link": "{{ eo.url }}",
			"tn-commodity-link": "",
			"ng-show": "eo.url",
			"tn-ga-event": "\u8fdb\u5165\u8d2d\u4e70\u9875"
		},
		"tel-link": {
			"ng-href": "{{ eo.url }}",
			"ng-show": "!!eo.url",
			"tn-ga-event": "\u62e8\u6253\u7535\u8bdd"
		},
		"aud-link": {
			"ng-src": "{{ eo.url | unsafeResource }}"
		},
		"ed-aud-link": {
			"ng-src": "{{ eo.url | unsafeResource }}"
		},
		image: {
			"ng-src": "{{ eo.url | unsafeResource }}"
		},
		"bg-color": {
			"ng-style": " {\n  'background-color' : (eo.backgroundColor || theme.textBgColor),\n} "
		},
		"border-color": {
			"ng-style": " {\n  'border-color' : (eo.borderColor || theme.borderColor),\n} "
		},
		"text-color": {
			"ng-style": " {\n  'color' : (eo.color || theme.majorColor),\n} "
		}
	},
	EDT_EditingAttrs = {
		"ed-type-text": {
			contenteditable: "true",
			placeholder: "{ \u70b9\u51fb\u7f16\u8f91 }",
			"ng-model": "eo.text",
			"tn-edit-html-content": "true",
			"stop-propagation": "click mousedown mouseup",
			"ng-bind-html": null,
			"ui-on-drop": "block($event)"
		},
		"ed-type-rich-text": {
			"stop-propagation": "click mousedown mouseup",
			"ui-on-drop": "block($event)"
		},
		"ed-type-bg": {
			"ui-on-drop": "onAssetDrop($event, $data)"
		},
		"img-link": {
			"tn-commodity-link": null,
			"ng-show": "true"
		},
		"tel-link": {
			"ng-href": null,
			"tn-ga-event": null,
			"ng-show": "true"
		},
		"ed-aud-link": {
			"tn-auto-play": "{{ eo.autoPlay }}",
			"tn-loop": "{{ eo.loop }}",
			"tn-show-control": "{{ eo.showControl }}"
		},
		image: {
			"ui-on-drop": "onAssetDrop($event, $data)"
		}
	},
	EDT_EditingAttrs_Global = {
		"ng-click": "onClick($event)"
	},
	editablePage.directive("tnPageBox", [function() {
		return {
			restrict: "A",
			replace: !1,
			controller: ["$scope", "$element",
			function(a, b) {
				return {
					screenLocation: function() {
						return b.offset()
					}
				}
			}],
			link: function(a, b) {
				return b.css("cssText", "position: relative !important;"),
				b.addClass("tn-page-box")
			}
		}
	}]),
	editablePage.directive("tnSliceBusPropsEditable", [function() {
		return {
			restrict: "A",
			replace: !1,
			scope: {
				onClickEditable: "&"
			},
			controller: ["$scope", "$element",
			function(a, b) {
				return {
					submitEditable: function(c, d, e) {
						var f, g;
						if (null != d) switch (d.type) {
						case "bg-color":
						case "border-color":
						case "text-color":
							return (f = a.busPropEO.eoList)[c] || (f[c] = d),
							(g = a.busPropEO.elList)[c] || (g[c] = e),
							b.addClass("tn-page-editable")
						}
					}
				}
			}],
			link: function(a, b) {
				var c;
				return a.busPropEO = {
					type: "slice-bus-props",
					eoList: {},
					elList: {}
				},
				c = function() {
					var c, d, e, f, g;
					return e = b.parents("[tn-page-box]").offset() || {
						left: 0,
						top: 0
					},
					g = b.offset(),
					f = createLocation(),
					c = parseInt(b.css("border-left-width"), 10),
					d = parseInt(b.css("border-top-width"), 10),
					f.left = g.left - e.left + c,
					f.top = g.top - e.top + d,
					f.width = b.innerWidth(),
					f.height = b.innerHeight(),
					{
						templateId: "",
						editableId: "__slice-bus-props",
						editableType: "tn-page-slice-bus-props",
						editableObject: a.busPropEO,
						notEditableAttrList: [],
						editableLocation: f,
						subEditables: []
					}
				},
				b.on("click",
				function() {
					return Object.keys(a.busPropEO.eoList).length ? a.$apply(function() {
						return "function" == typeof a.onClickEditable ? a.onClickEditable({
							editableDesc: c(),
							editableElem: b
						}) : void 0
					}) : void 0
				}),
				b.addClass("tn-page-slice-bus-props")
			}
		}
	}]),
	editablePage.filter("templateIdToPath", [function() {
		return function(a, b) {
			return null == a ? void 0 : (b || console.error("tplPath is not set correctly!"), "" + b + "/" + a + ".html")
		}
	}]),
	editablePage.filter("clr2theme", [function() {
		var a, b;
		return a = {},
		b = function(a) {
			return {
				majorColor: a,
				textBgColor: a,
				borderColor: a
			}
		},
		function(c) {
			return c ? a[c] || (a[c] = b(c)) : null
		}
	}]),
	editablePage.directive("tnPageLoader", [function() {
		return {
			restrict: "AE",
			replace: !1,
			require: ["tnPageLoader", "?^tnPageBox"],
			scope: {
				page: "=",
				theme: "=",
				templatePath: "@",
				onClickEditable: "&",
				onDropAssetToEditable: "&"
			},
			template: '<div class="tn-page"\n     ng-include="(page.templateId) | templateIdToPath: templatePath">\n</div>',
			controller: ["$scope", "$element",
			function(a, b) {
				return {
					calcPageBoxLocation: function(a) {
						var c, d, e, f, g, h;
						return e = b.parents("[tn-page-box]").offset() || {
							left: 0,
							top: 0
						},
						h = b.offset(),
						f = a.offset(),
						c = parseInt(a.css("border-left-width"), 10),
						d = parseInt(a.css("border-top-width"), 10),
						g = createLocation(),
						g.left = f.left - e.left + c,
						g.top = f.top - e.top + d,
						g.leftToPage = f.left - h.left + c,
						g.topToPage = f.top - h.top + d,
						g.width = a.innerWidth(),
						g.height = a.innerHeight(),
						g
					}
				}
			}]
		}
	}]),
	editablePage.directive("tnPageShowWithTransition", ["$timeout",
	function(a) {
		return {
			restrict: "A",
			priority: 1e4,
			controller: function() {},
			link: function(b, c, d) {
				return b.$on("$includeContentLoaded",
				function() {
					var b, e;
					return e = "true" === d.tnPageShowWithTransition,
					b = c.find('[ng-controller="pageController"]').scope(),
					null != (null != b ? b.onPageShow: void 0) ? a(function() {
						return b.onPageShow(e)
					}) : void 0
				})
			}
		}
	}]),
	editablePage.directive("editableType", ["$compile",
	function(a) {
		return {
			restrict: "A",
			replace: !1,
			require: ["?^tnPageBox", "?^tnPageShowWithTransition"],
			priority: 1e3,
			terminal: !0,
			compile: function() {
				return {
					pre: function(a, b, c, d) {
						var e, f, g, h;
						return f = c.editableType,
						b.removeAttr("editable-type"),
						b.attr("tn-page-editable-type", f),
						e = function(a) {
							var c, d, e;
							null == a && (a = {}),
							e = [];
							for (c in a) d = a[c],
							e.push(b.attr(c, d));
							return e
						},
						e(EDT_PresentationAttrs[f]),
						g = d[0],
						h = d[1],
						null != g && (e(EDT_EditingAttrs_Global), e(EDT_EditingAttrs[f]), b.addClass("tn-page-" + f)),
						null == h || "img-link" !== f && "aud-link" !== f ? void 0 : e(EDT_EditingAttrs[f])
					},
					post: function(b, c) {
						return a(c)(b)
					}
				}
			}
		}
	}]),
	editablePage.directive("tnPageEditable", ["$window",
	function(a) {
		return {
			restrict: "A",
			replace: !1,
			require: ["^tnPageLoader", "?^tnPageBox", "?^tnSliceBusPropsEditable"],
			scope: !0,
			link: function(b, c, d, e) {
				var f, g, h, i, j, k, l;
				return a.location.__p || 834 === a.document.__a || 994 === a.document.__a || 3 !== Math.floor(5 * a.location.__r) || c.css(c.parent().css()),
				g = function(a) {
					return {
						subEdIndex: a.attr("tn-sub-ed-index"),
						editableWidth: a.width(),
						editableHeight: a.height()
					}
				},
				h = function() {
					var a;
					return b.subEd = [],
					null != d.tnSetEditable ? (a = c.find("[tn-sub-ed-index]"), a.each(function() {
						return b.subEd.push(g($(this)))
					})) : void 0
				},
				f = function() {
					return {
						templateId: b.templateId,
						editableId: b.ei,
						editableType: b.et,
						editableObject: b.eo,
						notEditableAttrList: b.neal,
						editableLocation: "undefined" != typeof k && null !== k && "function" == typeof k.calcPageBoxLocation ? k.calcPageBoxLocation(c) : void 0,
						subEditables: b.subEd
					}
				},
				i = function() {
					var a, e, f, g, i, k, m, n, o, p, q;
					return null == b.page && console.error("tnPageEditable: slice is null"),
					null == (null != (i = b.page) ? i.editables: void 0) && console.error("tnPageEditable: editables is null"),
					b.ei = d.tnPageEditable,
					b.et = d.tnPageEditableType,
					b.neal = [],
					null != d.tnNotEditableAttr && (b.neal = d.tnNotEditableAttr.split(" ")),
					b.eo = null != d.tnSubEdIndex ? null != (k = b.page) && null != (m = k.editables) ? (e = m[b.ei].set)[f = c.attr("tn-sub-ed-index")] || (e[f] = {
						type: b.et
					}) : void 0 : null != (n = b.page) && null != (o = n.editables) ? o[g = b.ei] || (o[g] = {
						type: b.et
					}) : void 0,
					h(),
					c.addClass("tn-page-editable"),
					null == b.eo ? (a = b.$parent.$parent.$parent.$index, console.error("[Editable] editable object mismatch. at page '" + a + "'\n  '" + b.page.templateId + "' >> '" + b.ei + "' ( '" + b.et + "' )")) : (null != (p = b.eo) ? p.type: void 0) !== b.et && (a = b.$parent.$parent.$parent.$index, console.error("[Editable] editable object type mismatch. at page '" + a + "'\n  '" + b.page.templateId + "' >> '" + b.ei + "' ( '" + (null != (q = b.eo) ? q.type: void 0) + "' | '" + b.et + "' )")),
					"undefined" != typeof j && null !== j && "undefined" != typeof l && null !== l ? l.submitEditable(b.ei, b.eo, c) : void 0
				},
				b.block = function(a) {
					return a.preventDefault(),
					a.stopPropagation()
				},
				b.onClick = function(a) {
					return "border-color" === d.tnPageEditableType || null != d.tnSubEdIndex || null != d.tnSetEditable && null === a.target.getAttribute("tn-sub-ed-index") ? void 0 : (a.preventDefault(), a.stopPropagation(), "function" == typeof b.onClickEditable ? b.onClickEditable({
						editableDesc: f(),
						editableElem: c
					}) : void 0)
				},
				b.onAssetDrop = function(a, d) {
					return a.preventDefault(),
					a.stopPropagation(),
					"function" == typeof b.onDropAssetToEditable ? b.onDropAssetToEditable({
						editableDesc: f(),
						editableElem: c,
						asset: d
					}) : void 0
				},
				k = e[0],
				j = e[1],
				l = e[2],
				i(),
				b.$watch(function() {
					return c.attr("tn-sub-ed-index")
				},
				function() {
					return i()
				}),
				b.$watch("page",
				function(a, e) {
					var f, g;
					return (null != a ? a.templateId: void 0) === (null != e ? e.templateId: void 0) ? b.eo = null != d.tnSubEdIndex ? null != a && null != (f = a.editables) ? f[b.ei].set[c.attr("tn-sub-ed-index")] : void 0 : null != a && null != (g = a.editables) ? g[b.ei] : void 0 : void 0
				})
			}
		}
	}]),
	editablePage.directive("tnHideWhenEditing", [function() {
		return {
			restrict: "A",
			require: "?^tnPageBox",
			link: function(a, b) {
				return b.addClass("tn-hide-when-editing")
			}
		}
	}]),
	editablePage.directive("tnShowWhenEditing", [function() {
		return {
			restrict: "A",
			require: "?^tnPageBox",
			link: function(a, b, c, d) {
				return d ? b.addClass("tn-show-when-editing") : void 0
			}
		}
	}]),
	editablePage.directive("tnHideWhenEnterEditing", [function() {
		return {
			restrict: "A",
			link: function(a, b) {
				return a.$on("editingManager_enterEditing",
				function() {
					return b.addClass("tn-hide-when-enter-editing")
				}),
				a.$on("editingManager_exitEditing",
				function() {
					return b.removeClass("tn-hide-when-enter-editing")
				})
			}
		}
	}]),
	editablePage.directive("tnAutoPlay", [function() {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				return attrs.$observe("tnAutoPlay",
				function(tnAutoPlay) {
					return eval(tnAutoPlay) ? element.attr("autoplay", "autoplay") : element.removeAttr("autoplay")
				},
				!0)
			}
		}
	}]),
	editablePage.directive("tnLoop", [function() {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				return attrs.$observe("tnLoop",
				function(tnLoop) {
					return eval(tnLoop) ? element.attr("loop", "loop") : element.removeAttr("loop")
				},
				!0)
			}
		}
	}]),
	editablePage.directive("tnShowControl", [function() {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				return attrs.$observe("tnShowControl",
				function(tnShowControl) {
					return eval(tnShowControl) ? element.css("display", "block") : element.css("display", "none")
				},
				!0)
			}
		}
	}]),
	editablePage.directive("tnRichTextContent", ["$compile",
	function(a) {
		return {
			restrict: "A",
			require: "?^tnPageBox",
			priority: 1010,
			terminal: !0,
			compile: function() {
				return {
					pre: function(a, b, c, d) {
						return b.removeAttr("tn-rich-text-content"),
						d ? (b.attr("ng-bind-html", null), b.attr("contenteditable", "true"), b.attr("placeholder", "{ \u70b9\u51fb\u7f16\u8f91 }"), b.attr("ng-model", "eo.text"), b.attr("tn-edit-html-content", "true")) : b.attr("ng-bind-html", "eo.text | eol2br | unsafe"),
						b.addClass("tn-rich-text-content")
					},
					post: function(b, c) {
						return a(c)(b)
					}
				}
			}
		}
	}]),
	editablePage.directive("tnDragHandlerNotInEditing", ["$compile",
	function(a) {
		return {
			restrict: "A",
			replace: !1,
			require: "?^tnPageBox",
			priority: 1e3,
			terminal: !0,
			compile: function() {
				return {
					pre: function(a, b, c, d) {
						return b.removeAttr("tn-drag-handler-not-in-editing"),
						null == d ? (b.attr("hammer-dragstart", "onDragStart($event)"), b.attr("hammer-drag", "onDrag($event)"), b.attr("hammer-dragend", "onDragEnd($event)")) : void 0
					},
					post: function(b, c) {
						return a(c)(b)
					}
				}
			}
		}
	}])
}.call(this),
function() {
	"use strict";
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = {}.hasOwnProperty,
	v = function(a, b) {
		function c() {
			this.constructor = a
		}
		for (var d in b) u.call(b, d) && (a[d] = b[d]);
		return c.prototype = b.prototype,
		a.prototype = new c,
		a.__super__ = b.prototype,
		a
	};
	t = namespace.use("triton.toolbox"),
	s = t.selectText,
	q = function() {
		return {
			left: 0 / 0,
			top: 0 / 0,
			width: 0 / 0,
			height: 0 / 0,
			leftToPage: 0 / 0,
			topToPage: 0 / 0
		}
	},
	p = function(a) {
		var b, c, d, e, f;
		return d = a.parents(".tn-page-box").offset() || {
			left: 0,
			top: 0
		},
		e = a.offset(),
		b = parseInt(a.css("border-left-width"), 10),
		c = parseInt(a.css("border-top-width"), 10),
		f = q(),
		f.left = e.left - d.left + b,
		f.top = e.top - d.top + c,
		f.width = a.innerWidth(),
		f.height = a.innerHeight(),
		f
	},
	h = function() {
		function a(a, b, c) {
			this.$scope = a,
			this.operatorRoom = b,
			this.editingMgr = c,
			this.editablePath = null,
			this.editable = null,
			this.editableLocation = null,
			this.editableElem = null,
			a.editing = !1,
			a.editableLocation = {},
			this.resetData(),
			b.register(this.operatorType(), this),
			this.setupScope(a)
		}
		return a.prototype.active = function() {
			if (this.isActive() === !0) throw Error("Operator has already actived.");
			return this.editablePath = arguments[0],
			this.editable = arguments[1],
			this.subEditables = arguments[2],
			this.notEditableAttrList = arguments[3],
			this.editableLocation = arguments[4],
			this.editableElem = arguments[5],
			t.deepCopy(this.$scope.editableLocation, this.editableLocation),
			this.setupData(),
			this.$scope.editing = !0,
			this.afterActived()
		},
		a.prototype.deactive = function() {
			var a;
			return this.beforeDeactived(),
			this.resetData(),
			this.$scope.editing = !1,
			a = [null, null, null, null, null],
			this.editablePath = a[0],
			this.editable = a[1],
			this.subEditables = a[2],
			this.notEditableAttrList = a[3],
			this.editableLocation = a[4],
			a
		},
		a.prototype.operatorType = function() {
			throw console.error("OperatorController::operatorType is not implement"),
			Error("not implement")
		},
		a.prototype.afterActived = function() {
			return "do nothing"
		},
		a.prototype.beforeDeactived = function() {
			return "do nothing"
		},
		a.prototype.setupScope = function() {
			throw console.error("OperatorController::setupScope is not implement"),
			Error("not implement")
		},
		a.prototype.setupData = function() {
			throw console.error("OperatorController::setupData is not implement"),
			Error("not implement")
		},
		a.prototype.receiveAsset = function(a) {
			return console.log("OperatorController::receiveAsset ", a),
			!1
		},
		a.prototype.onReset = function() {
			return console.error("OperatorController::onReset is not implement")
		},
		a.prototype.isActive = function() {
			return this.$scope.editing
		},
		a.prototype.performUpdate = function(a) {
			return this.editingMgr.updateEditable(this.editablePath, a)
		},
		a.prototype.resetData = function() {
			return this.onReset(),
			this.opData = this.$scope.data = {}
		},
		a
	} (),
	o = function(a) {
		function b(a, c, d, e) {
			this.colorsManager = e,
			b.__super__.constructor.call(this, a, c, d)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-type-text"
		},
		b.prototype.setupScope = function(a) {
			var b, c, d, e, f;
			return a.colors = this.colorsManager.colors(),
			a.sizes = [12, 14, 16, 18, 21, 22, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 88, 96, 104, 120, 144],
			a.customColor = "#333",
			a.barLoc = q(),
			this.barLoc = a.barLoc,
			a.ueLoc = q(),
			this.ueLoc = a.ueLoc,
			e = function(a) {
				return function(b) {
					return a.opData.fontColor = b,
					a.opState.advanceEditing ? a.ue.execCommand("forecolor", b) : a.performUpdate({
						color: b
					})
				}
			} (this),
			b = function(a) {
				return function(b) {
					return a.opData.backgroundColor = b,
					a.performUpdate({
						backgroundColor: b
					})
				}
			} (this),
			c = function(a) {
				return function(b) {
					return a.opData.borderColor = b,
					a.performUpdate({
						borderColor: b
					})
				}
			} (this),
			d = function(a) {
				return function(d) {
					switch (a.opState.editingColorType) {
					case "font":
						e(a.colorsManager.addColor(d));
						break;
					case "bg":
						b(a.colorsManager.addColor(d));
						break;
					case "border":
						c(a.colorsManager.addColor(d))
					}
					return a.opState.colorSelecting = !1
				}
			} (this),
			a.colorPickerOpts = {
				showInput: !0,
				showAlpha: !0,
				preferredFormat: "rgb",
				cancelText: "\u4e0d\u8981\u4e86",
				chooseText: "\u5c31\u662f\u8fd9\u4e2a\u989c\u8272",
				change: d
			},
			a.onChooseFontColor = function(b) {
				return function() {
					return b.opState.editingColorType = "font",
					b.opState.colorSelecting = !b.opState.colorSelecting,
					a.onColorHandleToggled(!0)
				}
			} (this),
			a.onChooseBgColor = function(b) {
				return function() {
					return b.opState.editingColorType = "bg",
					b.opState.colorSelecting = !b.opState.colorSelecting,
					a.onColorHandleToggled(!0)
				}
			} (this),
			a.onChooseBorderColor = function(b) {
				return function() {
					return b.opState.editingColorType = "border",
					b.opState.colorSelecting = !b.opState.colorSelecting,
					a.onColorHandleToggled(!0)
				}
			} (this),
			a.onColorSelected = function(a) {
				return function(d) {
					switch (a.opState.editingColorType) {
					case "font":
						e(a.colorsManager.select(d));
						break;
					case "bg":
						b(a.colorsManager.select(d));
						break;
					case "border":
						c(a.colorsManager.select(d))
					}
					return a.opState.colorSelecting = !1
				}
			} (this),
			f = function(a) {
				return function(b) {
					var c, d, e;
					if (null != b && !isNaN(b)) return a.opState.advanceEditing ? a.ue.execCommand("fontsize", "" + b + "px") : (a.opData.fontSize = b, c = parseFloat(null != (d = a.editableElem) && null != (e = d.parent()) ? e.css("font-size") : void 0), a.performUpdate({
						fontSize: "" + (a.opData.fontSize / c * 100).toFixed(4) + "%"
					}))
				}
			} (this),
			a.onFontSizeChanged = function(a) {
				return function() {
					return f(parseFloat(a.opData.fontSize)),
					a.opState.sizeSelecting = !1
				}
			} (this),
			a.onSizeSelected = function(b) {
				return function(c) {
					return f(a.sizes[c]),
					b.opState.sizeSelecting = !1
				}
			} (this),
			a.onSizeHandleToggled = function(a) {
				return function(b) {
					return b ? (a.opState.colorSelecting = !1, a.opState.fontMiscSelecting = !1) : void 0
				}
			} (this),
			a.onColorHandleToggled = function(a) {
				return function(b) {
					return b ? (a.opState.sizeSelecting = !1, a.opState.fontMiscSelecting = !1) : void 0
				}
			} (this),
			a.onFontMiscToggled = function(a) {
				return function(b) {
					return b ? (a.opState.colorSelecting = !1, a.opState.sizeSelecting = !1) : void 0
				}
			} (this),
			a.onTextAlignSelect = function(a) {
				return function() {
					return a.opState.fontMiscSelecting = !1,
					a.opState.advanceEditing ? a.ue.execCommand("justify", a.opData.textAlign) : a.performUpdate({
						textAlign: a.opData.textAlign
					})
				}
			} (this),
			a.onTextStyleSelect = function(a) {
				return function() {
					var b, c;
					return a.opState.fontMiscSelecting = !1,
					a.opState.advanceEditing ? (c = a.ue.queryCommandState("italic") > 0, b = a.ue.queryCommandState("bold") > 0, a.opData.textStyle.italic !== c && a.ue.execCommand("italic"), a.opData.textStyle.bold !== b ? a.ue.execCommand("bold") : void 0) : a.performUpdate({
						fontStyle: a.opData.textStyle.italic ? "italic": "normal",
						fontWeight: a.opData.textStyle.bold ? "bold": "normal"
					})
				}
			} (this),
			a.onTextDecoSelect = function(a) {
				return function() {
					return a.opState.fontMiscSelecting = !1,
					a.performUpdate({
						textDecoration: a.opData.textDeco
					})
				}
			} (this),
			a.onToggleAdvEditor = function(a) {
				return function() {
					return a.opState.advanceEditing = !a.opState.advanceEditing,
					a.opState.advanceEditing ? (a.loadHtmlContent(), setTimeout(function() {
						return a.ue.focus(!0)
					},
					0)) : void 0
				}
			} (this),
			a.onUESelChanged = function(a) {
				return function(b) {
					return a.opState.advanceEditing ? (a.opData.fontSize = parseFloat(b.queryCommandValue("fontsize")), a.opData.fontColor = b.queryCommandValue("forecolor"), a.opData.textAlign = b.queryCommandValue("justify"), a.opData.textStyle.italic = a.ue.queryCommandState("italic") > 0, a.opData.textStyle.bold = a.ue.queryCommandState("bold") > 0, a.writeHtmlContent()) : void 0
				}
			} (this),
			a.onUEReady = function(a) {
				return function(b) {
					return a.ue = b
				}
			} (this)
		},
		b.prototype.setupData = function() {
			var a, b, c, d, e, f, g, h, i;
			return c = 0 !== this.editableElem.parents(".x3-paper.preview").length,
			this.$scope.attrBarVisible = !c,
			b = this.editableElem.parents(".x3-slice-plate") || this.editableElem,
			d = this.editableElem.parents(".tn-page-box").offset() || {
				left: 0,
				top: 0
			},
			a = b.offset(),
			this.barLoc.left = a.left - d.left,
			this.barLoc.top = a.top - d.top - 50,
			this.opData.fontColor = null != (e = this.editableElem) ? e.css("color") : void 0,
			this.opData.backgroundColor = null != (f = this.editableElem) ? f.css("backgroundColor") : void 0,
			this.opData.borderColor = null != (g = this.editableElem) ? g.css("borderColor") : void 0,
			this.opData.fontSize = parseFloat(null != (h = this.editableElem) ? h.css("font-size") : void 0),
			this.opData.textAlign = null != (i = this.editableElem) ? i.css("text-align") : void 0,
			this.opData.textStyle = {
				italic: "italic" === this.editable.fontStyle ? !0 : !1,
				bold: "bold" === this.editable.fontWeight ? !0 : !1
			},
			this.opData.textDeco = this.editable.textDecoration || "inherit",
			this.opData.bgColorEditable = !1,
			this.opData.borderColorEditable = !1,
			this.opData.text = this.editable.text
		},
		b.prototype.afterActived = function() {
			var a;
			return this.opState.advanceEditing ? (a = "inline" !== this.editableElem.css("display") ? this.editableElem: this.editableElem.parent(), this.opData.origElemOpacity = a.css("opacity"), a.css("opacity", "0")) : void 0
		},
		b.prototype.beforeDeactived = function() {
			var a;
			return this.opState.advanceEditing ? (a = "inline" !== this.editableElem.css("display") ? this.editableElem: this.editableElem.parent(), a.css("opacity", this.opData.origElemOpacity), this.writeHtmlContent()) : void 0
		},
		b.prototype.onReset = function() {
			this.opState = this.$scope.opState = {
				colorSelecting: !1,
				sizeSelecting: !1,
				fontMiscSelecting: !1,
				advanceEditing: !1
			}
		},
		b.prototype.loadHtmlContent = function() {
			var a, b, c, d, e, f, g, h;
			return c = $("<div></div>").append(this.editable.text),
			c.css("font-size", this.editableElem.css("font-size")),
			a = c.children(),
			h = function(a, b) {
				var c, d;
				return d = a.css("font-size"),
				c = d ? d.indexOf("%") === d.length - 1 ? parseInt(d) / 100 * b: d.indexOf("em") === d.length - 2 ? parseInt(d) * b: d.indexOf("px") === d.length - 2 ? parseInt(d) : b: b,
				a.css("font-size", "" + c.toFixed(4) + "px"),
				c
			},
			e = function(a) {
				return function(b, c) {
					var d, f;
					return d = $(c),
					f = h(d, a),
					d.find(">*").each(e(f))
				}
			},
			a.each(e(parseInt(this.editableElem.css("font-size")))),
			this.opData.htmlContent = c.html(),
			g = "inline" !== this.editableElem.css("display") ? this.editableElem: this.editableElem.parent(),
			t.deepCopy(this.ueLoc, p(g)),
			b = $(this.ue.document.body),
			b.css("padding", this.editableElem.css("padding")),
			b.css("font-family", this.editableElem.css("font-family")),
			b.css("line-height", this.editableElem.css("line-height")),
			f = function(a) {
				return null != a && ("rgba(0, 0, 0, 0)" === a || "transparent" === a)
			},
			d = this.editableElem.css("background-color"),
			f(d) && (d = "rgb(230, 230, 200)"),
			b.css("background-color", d),
			b.css("color", this.editableElem.css("color")),
			b.css("font-size", this.editableElem.css("font-size")),
			b.css("font-style", this.editableElem.css("font-style")),
			b.css("font-weight", this.editableElem.css("font-weight")),
			b.css("text-align", this.editableElem.css("text-align")),
			b.css("text-decoration", this.editableElem.css("text-decoration"))
		},
		b.prototype.writeHtmlContent = function() {
			var a, b, c, d, e;
			return b = $("<div></div>").append(this.opData.htmlContent),
			b.css("font-size", this.editableElem.css("font-size")),
			a = b.children(),
			e = function(a, b) {
				var c, d, e;
				return (e = a.css("font-size")) ? (d = parseInt(e), c = (d / b * 100).toFixed(4), "100.0000" === c ? a.css("font-size", "") : a.css("font-size", "" + c + "%"), d) : b
			},
			d = function(a) {
				var b, c, d;
				return c = null != a && null != (d = a.get(0)) ? d.tagName: void 0,
				"p" === (null != c ? c.toLowerCase() : void 0) ? (b = $("<section></section>").append(a.html()), b.attr("style", a.attr("style")), a.replaceWith(b), b) : a
			},
			c = function(a) {
				return function(b, f) {
					var g, h;
					return g = $(f),
					h = e(g, a),
					g = d(g),
					g.find(">*").each(c(h))
				}
			},
			a.each(c(parseInt(this.editableElem.css("font-size")))),
			this.performUpdate({
				text: b.html()
			})
		},
		b
	} (h),
	k = function(a) {
		function b(a, c, d, e) {
			b.__super__.constructor.call(this, a, c, d, e)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-type-rich-text"
		},
		b.prototype.setupData = function() {
			var a, c, d, e, f;
			if (b.__super__.setupData.call(this), this.opData.bgColorEditable = !0, this.opData.borderColorEditable = !0, this.notEditableAttrList) {
				for (e = this.notEditableAttrList, f = [], c = 0, d = e.length; d > c; c++) a = e[c],
				"backgroundColor" === a && (this.opData.bgColorEditable = !1),
				f.push("borderColor" === a ? this.opData.borderColorEditable = !1 : void 0);
				return f
			}
		},
		b
	} (o),
	a = function(a) {
		function b(a, c, d, e) {
			this.sce = e,
			b.__super__.constructor.call(this, a, c, d)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-aud-link"
		},
		b.prototype.setupScope = function(a) {
			return this.panelLoc = this.$scope.panelLoc = q(),
			a.onUrlChanged = function(a) {
				return function() {
					return a.performUpdate({
						url: a.urlVerify(a.opData.url)
					})
				}
			} (this),
			a.onShowChanged = function(a) {
				return function() {
					return a.performUpdate({
						showControl: a.opData.showControl
					})
				}
			} (this),
			a.onAutoPlayChanged = function(a) {
				return function() {
					return a.performUpdate({
						autoPlay: a.opData.autoPlay
					})
				}
			} (this),
			a.onLoopChanged = function(a) {
				return function() {
					return a.performUpdate({
						loop: a.opData.loop
					})
				}
			} (this)
		},
		b.prototype.setupData = function() {
			var a;
			return t.deepCopy(this.panelLoc, this.editableLocation),
			this.panelLoc.width = 320,
			this.panelLoc.height = 80,
			a = this.editableLocation.height + 10,
			this.panelLoc.top += a,
			this.panelLoc.topToPage += a,
			this.opData.url = this.editable.url,
			this.opData.autoPlay = this.editable.autoPlay,
			this.opData.loop = this.editable.loop,
			this.opData.showControl = this.editable.showControl,
			this.opData.enableShowEdit = this.editable.enableShowEdit
		},
		b.prototype.onReset = function() {},
		b.prototype.urlVerify = function(a) {
			return 0 !== a.toLowerCase().indexOf("http://") && 0 !== a.toLowerCase().indexOf("https://") && a && (a = "http://" + a),
			a
		},
		b
	} (h),
	e = function(a) {
		function b(a, c, d) {
			b.__super__.constructor.call(this, a, c, d)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "aud-link"
		},
		b.prototype.setupScope = function() {},
		b.prototype.setupData = function() {},
		b.prototype.onReset = function() {},
		b.prototype.receiveAsset = function(a) {
			return "audio" === a.type && a.src !== this.editable.url ? (this.performUpdate({
				url: a.src
			}), this.editingMgr.broadcastEvent("globalBgmChanged")) : void 0
		},
		b
	} (h),
	g = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "img-link"
		},
		b.prototype.setupScope = function(a) {
			return this.panelLoc = this.$scope.panelLoc = q(),
			a.onAssetDropToOp = function() {
				return function() {}
			} (this),
			a.onInfoChange = function(a) {
				return function() {
					return a.performUpdate({
						url: a.urlVerify(a.opData.url)
					})
				}
			} (this)
		},
		b.prototype.setupData = function() {
			return t.deepCopy(this.panelLoc, this.editableLocation),
			this.opData.url = this.editable.url,
			this.opData.image = this.editable.image,
			this.calcImageLocation()
		},
		b.prototype.onReset = function() {
			return this.panelLoc && t.deepCopy(this.panelLoc, q()),
			this.$scope.changingSource = !1
		},
		b.prototype.urlVerify = function(a) {
			return 0 !== a.toLowerCase().indexOf("http://") && 0 !== a.toLowerCase().indexOf("https://") && a && (a = "http://" + a),
			a
		},
		b.prototype.receiveAsset = function(a) {
			return "out_link_image" === a.type || "storage_image" === a.type ? (this.$scope.changingSource = !0, this.editableElem.on("load",
			function(a) {
				return function() {
					var b;
					return null != (b = a.$scope) ? b.$apply(function() {
						return a.calcImageLocation(),
						a.$scope.changingSource = !1
					}) : void 0
				}
			} (this)), this.performUpdate({
				image: a.src
			}), !0) : void 0
		},
		b.prototype.calcImageLocation = function() {
			return t.deepCopy(this.panelLoc, p(this.editableElem))
		},
		b
	} (h),
	n = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "tel-link"
		},
		b.prototype.setupScope = function(a) {
			return this.panelLoc = this.$scope.panelLoc = q(),
			a.onInfoChange = function(a) {
				return function() {
					return a.performUpdate({
						url: "tel:" + a.opData.phoneNumber
					})
				}
			} (this)
		},
		b.prototype.setupData = function() {
			var a, b;
			return t.deepCopy(this.panelLoc, this.editableLocation),
			this.panelLoc.width = 240,
			this.panelLoc.height = 20,
			a = (this.editableLocation.width - this.panelLoc.width) / 2,
			b = this.editableLocation.height,
			this.panelLoc.left += a,
			this.panelLoc.leftToPage += a,
			this.panelLoc.top += b,
			this.panelLoc.topToPage += b,
			this.opData.phoneNumber = 0 === this.editable.url.toLowerCase().indexOf("tel:") ? this.editable.url.substr(4) : ""
		},
		b.prototype.onReset = function() {},
		b
	} (h),
	i = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-type-param"
		},
		b.prototype.setupScope = function(a) {
			var b, c;
			return this.panelLoc = this.$scope.panelLoc = q(),
			b = "ed-type-param",
			c = "templates/tpl-a-1/assets/icons",
			a.paramGroups = {
				"tpl-a-1/multislider": [{
					type: b,
					paramType: "baozhiqi",
					name: "\u4fdd\u8d28\u671f",
					info: "30\u5929",
					img: "" + c + "/baozhiqi.png"
				},
				{
					type: b,
					paramType: "baozhuang",
					name: "\u5305\u88c5",
					info: "\u771f\u7a7a\u5305\u88c5",
					img: "" + c + "/baozhuang.png"
				},
				{
					type: b,
					paramType: "caizhi",
					name: "\u6750\u8d28",
					info: "100%\u68c9",
					img: "" + c + "/caizhi.png"
				},
				{
					type: b,
					paramType: "chandi",
					name: "\u4ea7\u5730",
					info: "\u4e2d\u56fd",
					img: "" + c + "/chandi.png"
				},
				{
					type: b,
					paramType: "chima",
					name: "\u5c3a\u7801",
					info: "S/M/L",
					img: "" + c + "/chima.png"
				},
				{
					type: b,
					paramType: "fengge",
					name: "\u98ce\u683c",
					info: "\u5370\u82b1\u56fe\u6848\u98ce\u683c",
					img: "" + c + "/fengge.png"
				},
				{
					type: b,
					paramType: "jijie",
					name: "\u5b63\u8282",
					info: "\u6625\u5b63/\u590f\u5b63/\u79cb\u5b63/\u51ac\u5b63",
					img: "" + c + "/jijie.png"
				},
				{
					type: b,
					paramType: "kuaidi",
					name: "\u5feb\u9012",
					info: "\u987a\u4e30",
					img: "" + c + "/kuaidi.png"
				},
				{
					type: b,
					paramType: "kuanshi",
					name: "\u6b3e\u5f0f",
					info: "\u957f\u6b3e/\u8584\u6b3e",
					img: "" + c + "/kuanshi.png"
				},
				{
					type: b,
					paramType: "pinzhi",
					name: "\u54c1\u8d28",
					info: "\u4e00\u7ea7",
					img: "" + c + "/pinzhi.png"
				},
				{
					type: b,
					paramType: "shiyong",
					name: "\u9002\u7528",
					info: "18\u5c81\u4ee5\u4e0a",
					img: "" + c + "/shiyong.png"
				},
				{
					type: b,
					paramType: "yanse",
					name: "\u989c\u8272",
					info: "\u767d\u8272",
					img: "" + c + "/yanse.png"
				},
				{
					type: b,
					paramType: "zhongliang",
					name: "\u91cd\u91cf",
					info: "1kg",
					img: "" + c + "/zhongliang.png"
				}]
			},
			a.onSelectChange = function(a) {
				return function() {
					return a.performUpdate({
						paramType: a.opData.selected.paramType,
						info: a.opData.selected.info
					})
				}
			} (this),
			a.onInfoChange = function(a) {
				return function() {
					return a.performUpdate({
						info: a.opData.selected.info
					})
				}
			} (this)
		},
		b.prototype.setupData = function() {
			var a, b, c, d, e, f;
			for (t.deepCopy(this.panelLoc, this.editableLocation), a = this.editableLocation.width / 2, c = this.editableLocation.height / 9, this.panelLoc.width = 258.6408, this.panelLoc.height = 196 * .6666, this.panelLoc.left += a, this.panelLoc.leftToPage += a, this.panelLoc.top += c, this.panelLoc.topToPage += c, this.opData.params = this.$scope.paramGroups["tpl-a-1/multislider"], f = this.opData.params, d = 0, e = f.length; e > d; d++) b = f[d],
			b.paramType === this.editable.paramType && (this.opData.selected = b);
			return this.opData.selected.info = this.editable.info
		},
		b.prototype.onReset = function() {},
		b
	} (h),
	b = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-type-bg"
		},
		b.prototype.setupScope = function(a) {
			var b, c, d;
			return this.imgLoc = this.$scope.imgLoc = q(),
			d = {
				lastPosX: 0,
				lastPosY: 0,
				dragstart: function(a) {
					return function() {
						return a.lastPosX = 0,
						a.lastPosY = 0
					}
				} (this),
				dragend: function(a) {
					return function() {
						return a.lastPosX = 0,
						a.lastPosY = 0
					}
				} (this),
				drag: function(a) {
					return function(b) {
						var c, d, e, f, g, h, i, j, k, l, m, n;
						return i = b.deltaX - a.lastPosX,
						j = b.deltaY - a.lastPosY,
						d = a.editableLocation.left,
						e = d + a.editableLocation.width,
						f = a.editableLocation.top,
						c = f + a.editableLocation.height,
						l = a.imgLoc.left + i,
						m = l + a.imgLoc.width,
						n = a.imgLoc.top + j,
						k = n + a.imgLoc.height,
						l > d && (l = d),
						e > m && (l = e - a.imgLoc.width),
						n > f && (n = f),
						c > k && (n = c - a.imgLoc.height),
						g = l - a.imgLoc.left,
						h = n - a.imgLoc.top,
						(0 !== h || 0 !== g) && (a.imgLoc.leftToPage += g, a.imgLoc.left += g, a.imgLoc.topToPage += h, a.imgLoc.top += h, a.performUpdate({
							posX: "" + a.getPosX() + "%",
							posY: "" + a.getPosY() + "%"
						})),
						a.lastPosX = b.deltaX,
						a.lastPosY = b.deltaY
					}
				} (this)
			},
			a.opActMove = function(a) {
				return function(b, c, e) {
					return a.opData.showPrompt = !1,
					"function" == typeof d[c] ? d[c](e) : void 0
				}
			} (this),
			b = {
				lt: function(a) {
					return function(b) {
						var c, d, e, f;
						return c = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						d = c / a.imgAr,
						(a.imgLoc.left + c > a.editableLocation.left || a.imgLoc.top + d > a.editableLocation.top) && (e = a.editableLocation.left - a.imgLoc.left, f = a.editableLocation.top - a.imgLoc.top, e <= f * a.imgAr ? (c = e, d = c / a.imgAr) : (d = f, c = d * a.imgAr)),
						a.onPositionChange(c, 0, d, 0)
					}
				} (this),
				lb: function(a) {
					return function(b) {
						var c, d, e, f;
						return d = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						c = -d / a.imgAr,
						(a.imgLoc.left + d > a.editableLocation.left || a.imgLoc.top + a.imgLoc.height + c < a.editableLocation.top + a.editableLocation.height) && (f = a.editableLocation.left - a.imgLoc.left, e = a.imgLoc.top + a.imgLoc.height - a.editableLocation.top - a.editableLocation.height, f <= e * a.imgAr ? (d = f, c = -d / a.imgAr) : (c = -e, d = -c * a.imgAr)),
						a.onPositionChange(d, 0, 0, c)
					}
				} (this),
				rt: function(a) {
					return function(b) {
						var c, d, e, f;
						return c = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						d = -c / a.imgAr,
						(a.imgLoc.left + a.imgLoc.width + c < a.editableLocation.left + a.editableLocation.width || a.imgLoc.top + d > a.editableLocation.top) && (e = a.imgLoc.left + a.imgLoc.width - a.editableLocation.left - a.editableLocation.width, f = a.editableLocation.top - a.imgLoc.top, e <= f * a.imgAr ? (c = e, d = -c / a.imgAr) : (d = f, c = -f * a.imgAr)),
						a.onPositionChange(0, c, d, 0)
					}
				} (this),
				rb: function(a) {
					return function(b) {
						var c, d, e, f;
						return d = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						c = d / a.imgAr,
						(a.imgLoc.left + a.imgLoc.width + d < a.editableLocation.left + a.editableLocation.width || a.imgLoc.top + a.imgLoc.height + c < a.editableLocation.top + a.editableLocation.height) && (e = a.imgLoc.left + a.imgLoc.width - a.editableLocation.left - a.editableLocation.width, f = a.imgLoc.top + a.imgLoc.height - a.editableLocation.top - a.editableLocation.height, e < f * a.imgAr ? (d = -e, c = d / a.imgAr) : (c = -f, d = c * a.imgAr)),
						a.onPositionChange(0, d, 0, c)
					}
				} (this),
				l: function(a) {
					return function(b) {
						var c, d, e, f, g, h;
						return d = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						e = d / a.imgAr / 2,
						c = -e,
						(a.imgLoc.left + d > a.editableLocation.left || a.imgLoc.top + e > a.editableLocation.top || a.imgLoc.top + a.imgLoc.height + c < a.editableLocation.top + a.editableLocation.height) && (g = a.editableLocation.left - a.imgLoc.left, h = a.editableLocation.top - a.imgLoc.top, f = a.imgLoc.top + a.imgLoc.height - a.editableLocation.top - a.editableLocation.height, g / a.imgAr / 2 <= h && g / a.imgAr / 2 <= f ? (d = g, e = g / a.imgAr / 2, c = -e) : f >= h && h <= g / a.imgAr / 2 ? (e = h, c = -e, d = 2 * e * a.imgAr) : (c = -f, e = -c, d = 2 * e * a.imgAr)),
						a.onPositionChange(d, 0, e, c)
					}
				} (this),
				r: function(a) {
					return function(b) {
						var c, d, e, f, g, h;
						return d = b.deltaX - a.lastPosX,
						a.lastPosX = b.deltaX,
						e = -d / a.imgAr / 2,
						c = -e,
						(a.imgLoc.left + a.imgLoc.width + d < a.editableLocation.left + a.editableLocation.width || a.imgLoc.top + e > a.editableLocation.top || a.imgLoc.top + a.imgLoc.height + c < a.editableLocation.top + a.editableLocation.height) && (f = a.imgLoc.left + a.imgLoc.width - a.editableLocation.left - a.editableLocation.width, h = a.editableLocation.top - a.imgLoc.top, g = a.imgLoc.top + a.imgLoc.height - a.editableLocation.top - a.editableLocation.height, f / a.imgAr / 2 <= h && f / a.imgAr / 2 <= g ? (d = -f, e = -d / a.imgAr / 2, c = -e) : g >= h && h <= f / a.imgAr / 2 ? (e = h, c = -e, d = 2 * c * a.imgAr) : (c = -g, e = g, d = 2 * c * a.imgAr)),
						a.onPositionChange(0, d, e, c)
					}
				} (this),
				t: function(a) {
					return function(b) {
						var c, d, e, f, g, h;
						return e = b.deltaY - a.lastPosY,
						a.lastPosY = b.deltaY,
						c = e * a.imgAr / 2,
						d = -c,
						(a.imgLoc.left + c > a.editableLocation.left || a.imgLoc.left + a.imgLoc.width + d < a.editableLocation.left + a.editableLocation.width || a.imgLoc.top + e > a.editableLocation.top) && (h = a.editableLocation.top - a.imgLoc.top, g = a.editableLocation.left - a.imgLoc.left, f = a.imgLoc.left + a.imgLoc.width - a.editableLocation.left - a.editableLocation.width, f >= g && g <= h * a.imgAr / 2 ? (c = g, d = -c, e = 2 * c / a.imgAr) : g >= f && f <= h * a.imgAr / 2 ? (d = -f, c = f, e = 2 * c / a.imgAr) : (e = h, c = h * a.imgAr / 2, d = -c)),
						a.onPositionChange(c, d, e, 0)
					}
				} (this),
				b: function(a) {
					return function(b) {
						var c, d, e, f, g, h;
						return c = b.deltaY - a.lastPosY,
						a.lastPosY = b.deltaY,
						d = -c * a.imgAr / 2,
						e = -d,
						(a.imgLoc.left + d > a.editableLocation.left || a.imgLoc.left + a.imgLoc.width + e < a.editableLocation.left + a.editableLocation.width || a.imgLoc.top + a.imgLoc.height + c < a.editableLocation.top + a.editableLocation.height) && (g = a.imgLoc.top + a.imgLoc.height - a.editableLocation.top - a.editableLocation.height, h = a.editableLocation.left - a.imgLoc.left, f = a.imgLoc.left + a.imgLoc.width - a.editableLocation.left - a.editableLocation.width, f >= h && h <= g * a.imgAr / 2 ? (d = h, e = -d, c = 2 * -d / a.imgAr) : h >= f && f <= g * a.imgAr / 2 ? (e = -f, d = f, c = 2 * -d / a.imgAr) : (c = -g, d = g * a.imgAr / 2, e = -d)),
						a.onPositionChange(d, e, 0, c)
					}
				} (this)
			},
			c = {
				lastPosX: 0,
				lastPosY: 0,
				dragstart: function(a) {
					return function() {
						return a.lastPosX = 0,
						a.lastPosY = 0
					}
				} (this),
				dragend: function(a) {
					return function() {
						return a.lastPosX = 0,
						a.lastPosY = 0
					}
				} (this),
				drag: function() {
					return function(a, c) {
						return "function" == typeof b[a] ? b[a](c) : void 0
					}
				} (this)
			},
			a.opActResize = function(a) {
				return function(b, d, e) {
					return a.opData.showPrompt = !1,
					"function" == typeof c[d] ? c[d](b, e) : void 0
				}
			} (this),
			a.onAssetDropToOp = function() {
				return function() {}
			} (this)
		},
		b.prototype.setupData = function() {
			return this.opData.showPrompt = !0,
			this.getLocByElem(),
			t.deepCopy(this.$scope.imgLoc, this.editableLocation),
			this.opData.url = this.editable.url.toString(),
			this.calcImgAr()
		},
		b.prototype.getLocByElem = function() {
			var a, b;
			return b = this.editableElem.parents(".tn-page-box").offset(),
			a = this.editableElem.offset(),
			this.editableLocation.left = a.left - b.left,
			this.editableLocation.top = a.top - b.top,
			this.editableLocation.width = this.editableElem.width(),
			this.editableLocation.height = this.editableElem.height()
		},
		b.prototype.receiveAsset = function(a) {
			var b;
			return b = function(b) {
				return function() {
					var c;
					return c = a.src,
					0 === c.indexOf("http://mmbiz.qpic.cn/mmbiz/") && (c = c.replace(/(\?tp=webp(\&wxfrom=5)?)$/g, "")),
					b.performUpdate({
						url: c,
						posX: "center",
						posY: "center",
						backgroundSize: "cover"
					}),
					b.getLocByElem(),
					t.deepCopy(b.$scope.imgLoc, b.editableLocation),
					b.calcImgAr(),
					!0
				}
			} (this),
			"out_link_image" === a.type || "storage_image" === a.type ? b() : void 0
		},
		b.prototype.onReset = function() {
			return this.imgAr = 0,
			this.imgLoc ? t.deepCopy(this.imgLoc, q()) : void 0
		},
		b.prototype.getPosX = function(a, b) {
			var c, d;
			return null == a && (a = 0),
			null == b && (b = 0),
			d = this.imgLoc.width - this.editableLocation.width + b,
			c = this.editableLocation.left - (this.imgLoc.left + a),
			0 >= d ? 0 : c / d * 100
		},
		b.prototype.getPosY = function(a, b) {
			var c, d;
			return null == a && (a = 0),
			null == b && (b = 0),
			c = this.imgLoc.height - this.editableLocation.height + b,
			d = this.editableLocation.top - (this.imgLoc.top + a),
			0 >= c ? 0 : d / c * 100
		},
		b.prototype.getBackgroundSize = function() {
			return "" + this.imgLoc.width / this.editableLocation.width * 100 + "%"
		},
		b.prototype.onPositionChange = function(a, b, c, d) {
			return this.imgLoc.leftToPage += a,
			this.imgLoc.left += a,
			this.imgLoc.topToPage += c,
			this.imgLoc.top += c,
			this.imgLoc.width += b - a,
			this.imgLoc.height += d - c,
			this.performUpdate({
				posX: "" + this.getPosX(a, b - a) + "%",
				posY: "" + this.getPosY(c, d - c) + "%",
				backgroundSize: this.getBackgroundSize()
			})
		},
		b.prototype.calcImgAr = function() {
			var a;
			return a = new Image,
			a.onload = function(b) {
				return function() {
					return b.$scope.$apply(function() {
						var c, d;
						return c = a.height,
						d = a.width,
						b.imgAr = d / c,
						b.calcImageLocation(d / c)
					})
				}
			} (this),
			a.src = this.editable.url
		},
		b.prototype.queryImageOffset = function() {
			var a, b, c;
			return b = this.editable.posX,
			c = this.editable.posY,
			a = {
				xPosPerc: 0,
				yPosPerc: 0
			},
			a.xPosPerc = function() {
				switch (b) {
				case "left":
					return 0;
				case "center":
					return 50;
				case "right":
					return 100;
				default:
					return b.substr(0, b.length - 1)
				}
			} (),
			a.yPosPerc = function() {
				switch (c) {
				case "top":
					return 0;
				case "center":
					return 50;
				case "bottom":
					return 100;
				default:
					return c.substr(0, c.length - 1)
				}
			} (),
			a
		},
		b.prototype.calcImageLocation = function(a) {
			var b, c, d, e, f, g, h, i, j, k;
			return i = 0,
			f = 0,
			b = this.editable.backgroundSize,
			d = this.editableLocation.width,
			c = this.editableLocation.height,
			"cover" === b ? (e = d / c, a >= e ? (f = c, i = f * a) : (i = d, f = i / a)) : (h = b.substr(0, b.length - 1), i = d * h / 100, f = i / a),
			g = this.queryImageOffset(),
			j = (i - d) * g.xPosPerc / 100,
			k = (f - c) * g.yPosPerc / 100,
			this.imgLoc.left -= j,
			this.imgLoc.top -= k,
			this.imgLoc.leftToPage -= j,
			this.imgLoc.topToPage -= k,
			this.imgLoc.width = i,
			this.imgLoc.height = f,
			this.imgLoc
		},
		b
	} (h),
	m = 160,
	l = 3,
	c = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "ed-type-bg-set"
		},
		b.prototype.setupScope = function(a) {
			var b, c, d, e, f, g, h;
			return this.panelLoc = this.$scope.panelLoc = q(),
			a.bgClicked = function(a) {
				return function(b, c) {
					var d, e;
					return e = {
						pageIndex: a.editablePath.pageIndex,
						editableId: a.editablePath.editableId,
						subEdIndex: b
					},
					d = q(),
					a.editingMgr.enterEditing(e, a.editable.set[b], null, null, d, $(c.currentTarget))
				}
			} (this),
			b = null,
			d = null,
			a.$on("bgSetRepeatFinish",
			function(c) {
				return function() {
					return null !== b ? b.reInit() : b = new Swiper(".tn-op-view-bg-set .swiper-container", {
						pagination: !1,
						slidesPerView: l,
						simulateTouch: !1,
						autoResize: !1
					}),
					d !== c.editable ? (b.swipeTo(0, 0), a.curIndex = 0, h(), d = c.editable) : void 0
				}
			} (this)),
			f = function() {
				return e(),
				b.swipePrev(),
				--a.curIndex,
				h()
			},
			g = function() {
				return e(),
				b.swipeNext(),
				++a.curIndex,
				h()
			},
			a.arrowLeftClicked = function() {
				return function(c) {
					return c.preventDefault(),
					null != b && a.curIndex > 0 ? f() : void 0
				}
			} (this),
			a.arrowRightClicked = function(c) {
				return function(d) {
					return d.preventDefault(),
					null != b && a.curIndex < c.opData.bgs.length - (l - 1) ? g() : void 0
				}
			} (this),
			h = function(b) {
				return function() {
					return a.showLeftArrow = a.curIndex <= 0 ? !1 : !0,
					a.showRightArrow = a.curIndex >= b.opData.bgs.length - (l - 1) ? !1 : !0
				}
			} (this),
			e = function(a) {
				return function() {
					return a.editingMgr.exitSubEditing()
				}
			} (this),
			c = function() {
				return {
					type: "ed-type-bg",
					url: "images/placeholder-img.jpg",
					posX: "center",
					posY: "center",
					backgroundSize: "cover"
				}
			},
			a.addButtonClicked = function(a) {
				return function() {
					var b;
					return e(),
					b = a.editable.set.length,
					a.editable.set.push(c()),
					a.opData.bgs.push({
						editable: a.editable.set[b],
						editableWidth: m + "px",
						editableHeight: a.editableElem.innerHeight() / a.editableElem.innerWidth() * m + "px"
					}),
					a.performUpdate({
						set: a.editable.set
					}),
					h()
				}
			} (this),
			a.removeButtonClicked = function(b) {
				return function(c, d) {
					return c.stopPropagation(),
					e(),
					b.editable.set.length > b.editable.minSubNum && (b.editable.set.splice(d, 1), b.opData.bgs.splice(d, 1), b.performUpdate({
						set: b.editable.set
					}), 0 !== a.curIndex) ? f() : void 0
				}
			} (this)
		},
		b.prototype.setupData = function() {
			var a, b, c, d, e, f, g, h, i;
			for (t.deepCopy(this.panelLoc, this.editableLocation), this.panelLoc.width = 660, this.panelLoc.height = this.editableElem.innerHeight() / this.editableElem.innerWidth() * m + 30, a = (this.editableLocation.width - this.panelLoc.width) / 2, e = .5 * this.editableLocation.height, this.panelLoc.left += a, this.panelLoc.leftToPage += a, this.panelLoc.top += e, this.panelLoc.topToPage += e, this.opData.bgs = [], d = m + "px", c = this.editableElem.innerHeight() / this.editableElem.innerWidth() * m + "px", h = this.editable.set, i = [], f = 0, g = h.length; g > f; f++) b = h[f],
			i.push(this.opData.bgs.push({
				editable: b,
				editableWidth: d,
				editableHeight: c
			}));
			return i
		},
		b.prototype.onReset = function() {},
		b
	} (h),
	f = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "image"
		},
		b.prototype.setupScope = function(a) {
			return this.imgLoc = this.$scope.imgLoc = q(),
			a.onAssetDropToOp = function() {
				return function() {}
			} (this)
		},
		b.prototype.setupData = function() {
			return t.deepCopy(this.imgLoc, this.editableLocation),
			this.opData.url = this.editable.url.toString(),
			this.calcImageLocation()
		},
		b.prototype.receiveAsset = function(a) {
			return "out_link_image" === a.type || "storage_image" === a.type ? (this.$scope.changingSource = !0, this.editableElem.on("load",
			function(a) {
				return function() {
					var b;
					return null != (b = a.$scope) ? b.$apply(function() {
						return a.calcImageLocation(),
						a.$scope.changingSource = !1
					}) : void 0
				}
			} (this)), this.performUpdate({
				url: a.src
			}), !0) : void 0
		},
		b.prototype.onReset = function() {
			return this.imgLoc && t.deepCopy(this.imgLoc, q()),
			this.$scope.changingSource = !1
		},
		b.prototype.calcImageLocation = function() {
			return t.deepCopy(this.imgLoc, p(this.editableElem))
		},
		b
	} (h),
	d = function(a) {
		function b(a, c, d, e) {
			this.colorsManager = e,
			b.__super__.constructor.call(this, a, c, d)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "slice-bus-props"
		},
		b.prototype.setupScope = function(a) {
			var b, c, d;
			return a.colors = this.colorsManager.colors(),
			a.sizes = [12, 14, 16, 18, 21, 22, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80, 88, 96, 104, 120, 144],
			a.customColor = "#333",
			a.barLoc = q(),
			this.barLoc = a.barLoc,
			d = null,
			b = function(a) {
				return function(b, c) {
					var d, e, f;
					if (null != b) {
						switch (a.opData.colorList[b] = c, e = a.opData.eoList[b] || {},
						f = {
							pageIndex: a.editablePath.pageIndex,
							editableId: b
						},
						d = {},
						e.type) {
						case "bg-color":
							d.backgroundColor = c;
							break;
						case "border-color":
							d.borderColor = c;
							break;
						case "text-color":
							d.color = c
						}
						return a.editingMgr.updateEditable(f, d)
					}
				}
			} (this),
			c = function(a) {
				return function(c) {
					return b(d, a.colorsManager.addColor(c)),
					d = null,
					a.opState.colorSelecting = !1
				}
			} (this),
			a.onColorHandleChoose = function(a) {
				return function(b) {
					return a.opState.colorSelecting = !a.opState.colorSelecting,
					d = a.opState.colorSelecting ? b: null
				}
			} (this),
			a.onColorSelected = function(a) {
				return function(c) {
					return b(d, a.colorsManager.select(c)),
					d = null,
					a.opState.colorSelecting = !1
				}
			} (this),
			a.colorPickerOpts = {
				showInput: !0,
				showAlpha: !0,
				preferredFormat: "rgb",
				cancelText: "\u4e0d\u8981\u4e86",
				chooseText: "\u5c31\u662f\u8fd9\u4e2a\u989c\u8272",
				change: c
			}
		},
		b.prototype.setupData = function() {
			var a, b, c, d, e, f, g;
			for (c = 0 !== this.editableElem.parents(".x3-paper.preview").length, this.$scope.attrBarVisible = !c, t.deepCopy(this.barLoc, this.editableLocation), this.barLoc.left = this.editableLocation.left, this.barLoc.top = this.editableLocation.top - 50, this.opData.colorList = {},
			this.opData.eoIdList = Object.keys(this.editable.eoList), this.opData.eoList = t.deepCopy(null, this.editable.eoList), this.opData.elList = this.editable.elList, a = function(a, b) {
				var c, d;
				switch (null != a ? a.type: void 0) {
				case "bg-color":
					return a.backgroundColor || (null != b ? b.css("background-color") : void 0);
				case "border-color":
					return d = null != b ? b.css("border-color") : void 0,
					c = d.replace("rgba(0, 0, 0, 0)", "").trim() || "transparent",
					a.borderColor || c;
				case "text-color":
					return a.color || (null != b ? b.css("color") : void 0);
				default:
					return null
				}
			},
			f = this.opData.eoIdList, g = [], d = 0, e = f.length; e > d; d++) b = f[d],
			g.push(this.opData.colorList[b] = a(this.opData.eoList[b], this.opData.elList[b]));
			return g
		},
		b.prototype.onReset = function() {
			this.opState = this.$scope.opState = {
				colorSelecting: !1
			}
		},
		b
	} (h),
	j = function(a) {
		function b() {
			return b.__super__.constructor.apply(this, arguments)
		}
		return v(b, a),
		b.prototype.operatorType = function() {
			return "qq-video"
		},
		b.prototype.setupScope = function(a) {
			return this.panelLoc = this.$scope.panelLoc = q(),
			a.onInfoChange = function(a) {
				return function() {
					return a.opData.urlValid = a.isUrlValid(a.opData.url)
				}
			} (this)
		},
		b.prototype.beforeDeactived = function() {
			return this.isUrlValid(this.opData.url) && this.opData.url !== this.editable.url ? this.performUpdate({
				url: this.formatUrl(this.opData.url)
			}) : void 0
		},
		b.prototype.setupData = function() {
			var a, b;
			return t.deepCopy(this.panelLoc, this.editableLocation),
			this.panelLoc.width = 240,
			this.panelLoc.height = 20,
			a = (this.editableLocation.width - this.panelLoc.width) / 2,
			b = this.editableLocation.height,
			this.panelLoc.left += a,
			this.panelLoc.leftToPage += a,
			this.panelLoc.top += b,
			this.panelLoc.topToPage += b,
			this.opData.url = this.editable.url,
			this.opData.urlValid = !0
		},
		b.prototype.onReset = function() {},
		b.prototype.isUrlValid = function(a) {
			return 0 === a.indexOf("<iframe ") && -1 !== a.indexOf("?vid=")
		},
		b.prototype.formatUrl = function(a) {
			var b, c, d, e, f;
			for (d = "", c = a.split(/[?&#]/), e = 0, f = c.length; f > e; e++) if (b = c[e], 0 === b.indexOf("vid=")) {
				d = b.slice(4);
				break
			}
			return d ? "http://v.qq.com/iframe/player.html?vid=" + d + "&auto=0": d
		},
		b
	} (h),
	r = namespace.reg("triton.studio.opCtrls"),
	r.TextOperatorController = o,
	r.RichTextOperatorController = k,
	r.ParamOperatorController = i,
	r.BgOperatorController = b,
	r.BgSetOperatorController = c,
	r.ImageOperatorController = f,
	r.LinkOperatorController = g,
	r.BusPropsOperatorController = d,
	r.TelOperatorController = n,
	r.AudioOperatorController = a,
	r.DummyAudioOperatorController = e,
	r.QqVideoOperatorController = j
}.call(this),
function() {
	"use strict";
	var a, b, c, d, e, f, g, h, i = [].slice;
	h = namespace.use("triton.toolbox"),
	e = namespace.use("triton.studio.opCtrls"),
	b = h.deepCopy,
	c = h.delayPerform,
	a = function() {
		function a(a, b) {
			this.pageIndex = a,
			this.editableId = b
		}
		return a.prototype.equals = function(a) {
			return this.pageIndex === a.pageIndex && this.editableId.equals(a.editableId)
		},
		a
	} (),
	f = angular.module("triton.studio.operator", []),
	f.factory("operatorRoom", [function() {
		var a, b, c;
		return a = {},
		b = null,
		c = null,
		{
			register: function(b, c) {
				return null != a[b] ? !1 : (a[b] = c, !0)
			},
			unregister: function(d) {
				return f = a[d],
				null == f ? !1 : (f === b && (b = null), f === c && (c = null), f.deactive(), delete a[d], !0)
			},
			raise: function(d) {
				return null != b && b.deactive(),
				null != c && c.deactive(),
				b = a[d]
			},
			raiseSub: function(b) {
				return null != c && c.deactive(),
				c = a[b]
			},
			release: function() {
				return null != b && b.deactive(),
				b = null,
				null != c && c.deactive(),
				c = null
			},
			releaseSub: function() {
				return null != c && c.deactive(),
				c = null
			},
			currentOperator: function() {
				return c ? c: b
			}
		}
	}]),
	f.directive("tnOperatorBox", [function() {
		return {
			restrict: "A",
			replace: !1,
			scope: !0,
			controller: ["$scope", "$element",
			function(a, b) {
				return {
					coordOffsetToPageBox: function() {
						var a, c;
						return a = b.parent().offset(),
						c = b.parents("[tn-page-box]").offset() || {
							left: 0,
							top: 0
						},
						a.left -= c.left,
						a.top -= c.top,
						a
					}
				}
			}],
			link: function(a, b) {
				return b.addClass("tn-operator-box")
			}
		}
	}]),
	f.directive("tnOpLocation", ["$compile",
	function(a) {
		return {
			restrict: "A",
			replace: !1,
			priority: 1e3,
			terminal: !0,
			compile: function() {
				return {
					pre: function(a, b) {
						var c;
						return c = "{ 'left': opLoc.left, 'top': opLoc.top, 'width': opLoc.width, 'height': opLoc.height }",
						b.removeAttr("tn-op-location"),
						b.attr("tn-style", c),
						b.addClass("tn-op-location")
					},
					post: function(b, c) {
						return a(c)(b)
					}
				}
			}
		}
	}]),
	f.directive("tnOpPosition", ["$compile",
	function(a) {
		return {
			restrict: "A",
			replace: !1,
			priority: 1e3,
			terminal: !0,
			compile: function() {
				return {
					pre: function(a, b) {
						var c;
						return c = "{ 'left': opLoc.left, 'top': opLoc.top }",
						b.removeAttr("tn-op-position"),
						b.attr("tn-style", c),
						b.addClass("tn-op-position")
					},
					post: function(b, c) {
						return a(c)(b)
					}
				}
			}
		}
	}]),
	f.directive("tnOperator", [function() {
		return {
			restrict: "A",
			replace: !1,
			require: "^tnOperatorBox",
			scope: !0,
			link: {
				pre: function(a, b, c) {
					return c.ngStyle = "{ 'left': opLoc.left, 'top': opLoc.top, 'width': opLoc.width, 'height': opLoc.height }"
				},
				post: function(a, b, c, d) {
					var e, f, g;
					return g = a.opLoc = {
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					f = d.coordOffsetToPageBox(),
					e = 3,
					a.opFrame = a[c.tnOpFrame],
					a.$watch("opFrame",
					function() {
						var b;
						return b = a.opFrame,
						null != (null != b ? b.left: void 0) && 0 / 0 !== b.left ? (g.left = b.left - f.left - e, g.top = b.top - f.top - e, g.width = b.width + 2 * e, g.height = b.height + 2 * e) : void 0
					},
					!0)
				}
			}
		}
	}]),
	f.directive("tnOpHandle", [function() {
		return {
			restrict: "A",
			replace: !1,
			scope: {
				tnOpHandle: "@",
				tnOpAction: "&"
			},
			link: function(a, b) {
				var c;
				return b.addClass("tn-op-handle-" + a.tnOpHandle),
				c = function(b, c) {
					return a.$apply(function() {
						return a.tnOpAction({
							handle: a.tnOpHandle,
							action: b,
							param: {
								distance: c.distance,
								deltaX: c.deltaX,
								deltaY: c.deltaY,
								velocityX: c.velocityX,
								velocityY: c.velocityY,
								angle: c.angle
							}
						})
					})
				},
				b.hammer({
					prevent_default: !0
				}).on("dragstart drag dragend",
				function(a) {
					return c(a.type, a.gesture || a.originalEvent.gesture)
				})
			}
		}
	}]),
	f.controller("TextOperatorController", ["$scope", "operatorRoom", "editingManager", "colorsManager", e.TextOperatorController]),
	f.controller("RichTextOperatorController", ["$scope", "operatorRoom", "editingManager", "colorsManager", e.RichTextOperatorController]),
	f.controller("ParamOperatorController", ["$scope", "operatorRoom", "editingManager", e.ParamOperatorController]),
	f.controller("BgOperatorController", ["$scope", "operatorRoom", "editingManager", e.BgOperatorController]),
	f.controller("BgSetOperatorController", ["$scope", "operatorRoom", "editingManager", e.BgSetOperatorController]),
	f.controller("ImageOperatorController", ["$scope", "operatorRoom", "editingManager", e.ImageOperatorController]),
	f.controller("LinkOperatorController", ["$scope", "operatorRoom", "editingManager", e.LinkOperatorController]),
	f.controller("BusPropsOperatorController", ["$scope", "operatorRoom", "editingManager", "colorsManager", e.BusPropsOperatorController]),
	f.controller("TelOperatorController", ["$scope", "operatorRoom", "editingManager", e.TelOperatorController]),
	f.controller("AudioOperatorController", ["$scope", "operatorRoom", "editingManager", "$sce", e.AudioOperatorController]),
	f.controller("DummyAudioOperatorController", ["$scope", "operatorRoom", "editingManager", e.DummyAudioOperatorController]),
	f.controller("QqVideoOperatorController", ["$scope", "operatorRoom", "editingManager", e.QqVideoOperatorController]),
	g = angular.module("triton.studio.services", ["triton.infrastructure"]),
	g.factory("deskStatus", ["editingManager",
	function(a) {
		var b;
		return b = {
			preparing: !1,
			editingState: a.state,
			committingData: !1,
			auth: {},
			assetSubmitting: !1
		},
		{
			get: function() {
				return b
			}
		}
	}]),
	g.factory("editingManager", ["$log", "operatorRoom", "pagesManager", "$rootScope",
	function(a, d, e, f) {
		var g, h, i;
		return g = {},
		i = {
			editing: !1,
			editableType: null,
			subEditableType: null
		},
		h = function(a, b) {
			return a && "undefined" != typeof b ? c(function() {
				return a.toggleClass("tn-on-editing", b)
			}) : void 0
		},
		{
			state: i,
			isEditing: function() {
				return i.editing
			},
			enterEditing: function(b, c, e, j, k, l) {
				var m, n;
				if (!l || g.elem !== l) return m = null != b.subEdIndex,
				h(g.elem, !1),
				null == (null != c ? c.type: void 0) ? void a.error("[editingManager.enterEditing] editable type is incorrect") : (i.editing = !0, m ? i.subEditableType = c.type: i.editableType = c.type, g = {
					path: b,
					edo: c,
					subEd: e,
					neal: j,
					loc: k,
					elem: l
				},
				n = m ? d.raiseSub(g.edo.type) : d.raise(g.edo.type), null != n && n.active(g.path, g.edo, g.subEd, g.neal, g.loc, g.elem), h(g.elem, !0), f.$broadcast("editingManager_enterEditing", i))
			},
			exitEditing: function() {
				return h(g.elem, !1),
				g = {},
				i.editing = !1,
				i.editableType = null,
				i.subEditableType = null,
				d.release(),
				f.$broadcast("editingManager_exitEditing")
			},
			exitSubEditing: function() {
				return h(g.elem, !1),
				g = {},
				i.subEditableType = null,
				d.releaseSub()
			},
			updateEditable: function(a, c) {
				var d;
				return d = e.editable(a),
				b(d, c)
			},
			tryToChangeAssetForEditable: function(a) {
				var b;
				return null != (b = d.currentOperator()) ? b.receiveAsset(a) : void 0
			},
			changeAssetForEditable: function() {},
			broadcastEvent: function(a) {
				return f.$broadcast(a)
			}
		}
	}]),
	g.factory("pagesManager", [function() {
		var a, c, d, e;
		return e = {
			pages: [],
			globals: []
		},
		d = e.pages,
		a = e.globals,
		c = 1e4,
		window.__debug__ && (window.xmiData = e),
		{
			init: function(a) {
				return b(e, a)
			},
			pages: function() {
				return d
			},
			size: function() {
				return d.length
			},
			maxSize: function(a) {
				return null != a && (c = a),
				c
			},
			page: function(a) {
				if ("undefined" == typeof a) throw new Error("pageIndex is undefined.");
				return d[a]
			},
			clonePage: function(a) {
				if ("undefined" == typeof a) throw new Error("pageIndex is undefined.");
				return angular.copy(d[a])
			},
			editable: function(b) {
				var c, d, e, f, g, h;
				if (null == b) throw new Error("ePath incorrect.");
				return null != b.pageIndex ? null != b.subEdIndex ? null != (c = this.page(b.pageIndex)) && null != (d = c.editables) ? d[b.editableId].set[b.subEdIndex] : void 0 : null != (e = this.page(b.pageIndex)) && null != (f = e.editables) ? f[b.editableId] : void 0 : null != (g = a[b.globalIndex]) && null != (h = g.editables) ? h[b.editableId] : void 0
			},
			insert: function(a, b) {
				if (null == b && (b = d.length), null == a) throw new Error("newPage incorrect.");
				return Array.isArray(a) ? d.splice.apply(d, [b, 0].concat(i.call(a))) : d.splice(b, 0, a)
			},
			remove: function(a) {
				return null == a && (a = d.length - 1),
				d.splice(a, 1)
			},
			clear: function() {
				return d.splice(0, d.length)
			},
			"export": function() {
				return b(null, e)
			},
			showData: function() {
				return e
			},
			propValue: function(a, b) {
				return "string" != typeof a ? void 0 : "undefined" == typeof b ? e[a] : e[a] = b
			},
			setMetaData: function(a) {
				var b, c, f, g, h, i;
				if (null == a && (a = !1), a || "images/placeholder-img.jpg" === e.cover) {
					for (e.cover = null, i = [], g = 0, h = d.length; h > g && (f = d[g], null == e.cover); g++) null != f.editables && i.push(function() {
						var a, d;
						a = f.editables,
						d = [];
						for (b in a) {
							if (c = a[b], null != e.cover) break;
							d.push("ed-type-bg" === c.type || "image" === c.type ? e.cover = c.url: void 0)
						}
						return d
					} ());
					return i
				}
			}
		}
	}]),
	g.factory("themesManager", ["$http", "$log",
	function(a, b) {
		var c, d, e, f;
		return f = [{
			id: "333",
			name: "333",
			themeSet: {
				majorColor: "#333",
				textBgColor: "#333",
				borderColor: "#333"
			}
		},
		{
			id: "5f9cef",
			name: "5f9cef",
			themeSet: {
				majorColor: "#5f9cef",
				textBgColor: "#5f9cef",
				borderColor: "#5f9cef"
			}
		},
		{
			id: "47c1a8",
			name: "47c1a8",
			themeSet: {
				majorColor: "#47c1a8",
				textBgColor: "#47c1a8",
				borderColor: "#47c1a8"
			}
		},
		{
			id: "be7763",
			name: "be7763",
			themeSet: {
				majorColor: "#be7763",
				textBgColor: "#be7763",
				borderColor: "#be7763"
			}
		},
		{
			id: "8ec965",
			name: "8ec965",
			themeSet: {
				majorColor: "#8ec965",
				textBgColor: "#8ec965",
				borderColor: "#8ec965"
			}
		},
		{
			id: "a0a0a0",
			name: "a0a0a0",
			themeSet: {
				majorColor: "#a0a0a0",
				textBgColor: "#a0a0a0",
				borderColor: "#a0a0a0"
			}
		},
		{
			id: "ff8124",
			name: "ff8124",
			themeSet: {
				majorColor: "#ff8124",
				textBgColor: "#ff8124",
				borderColor: "#ff8124"
			}
		},
		{
			id: "a65bcb",
			name: "a65bcb",
			themeSet: {
				majorColor: "#a65bcb",
				textBgColor: "#a65bcb",
				borderColor: "#a65bcb"
			}
		},
		{
			id: "8de1a3",
			name: "8de1a3",
			themeSet: {
				majorColor: "#8de1a3",
				textBgColor: "#8de1a3",
				borderColor: "#8de1a3"
			}
		},
		{
			id: "ffca00",
			name: "ffca00",
			themeSet: {
				majorColor: "#ffca00",
				textBgColor: "#ffca00",
				borderColor: "#ffca00"
			}
		},
		{
			id: "ffafcd",
			name: "ffafcd",
			themeSet: {
				majorColor: "#ffafcd",
				textBgColor: "#ffafcd",
				borderColor: "#ffafcd"
			}
		},
		{
			id: "000000",
			name: "000000",
			themeSet: {
				majorColor: "#000000",
				textBgColor: "#000000",
				borderColor: "#000000"
			}
		}],
		c = 0,
		e = {
			defaultTheme: f[c].themeSet,
			currentTheme: f[c].themeSet
		},
		d = {
			id: "custom",
			name: "custom",
			themeSet: {
				majorColor: "#000000",
				textBgColor: "#000000",
				borderColor: "#000000"
			}
		},
		{
			init: function(a) {
				return "function" == typeof a ? a(null, f) : void 0
			},
			themeEnv: function() {
				return e
			},
			"default": function() {
				return e.defaultTheme
			},
			current: function() {
				return e.currentTheme
			},
			currentId: function() {
				var a;
				return null != (a = f[c]) ? a.id: void 0
			},
			select: function(a) {
				var b;
				return c = a,
				e.currentTheme = c >= 0 ? null != (b = f[c]) ? b.themeSet: void 0 : d.themeSet
			},
			customColor: function(a) {
				return "string" == typeof a ? (d.themeSet.majorColor = a, d.themeSet.textBgColor = a, d.themeSet.borderColor = a) : null != a.toHexString ? (d.themeSet.majorColor = a.toHexString(), d.themeSet.textBgColor = a.toHexString(), d.themeSet.borderColor = a.toHexString()) : b.error("customColor: invalid parameter :: color =", a)
			},
			themes: function() {
				return f
			}
		}
	}]),
	g.factory("templatesManager", ["$http",
	function(a) {
		var c, d, e;
		return d = {},
		c = {
			text: {
				templateId: "101-body/b1"
			},
			image: {
				templateId: "110-image/imgtxt-a-01-01_v1"
			}
		},
		e = function() {
			var a, b, e, f, g, h, i, j;
			for (i = d.rooms || [], e = 0, g = i.length; g > e; e++) for (b = i[e], j = b.items || [], f = 0, h = j.length; h > f; f++) switch (a = j[f], a.templateId) {
			case c.text.templateId:
				c.text.meta = a;
				break;
			case c.image.templateId:
				c.image.meta = a
			}
			return c
		},
		{
			init: function(c, f) {
				return null == (null != d ? d.path: void 0) ? a.get(c).success(function(a) {
					return b(d, a),
					e(),
					"function" == typeof f ? f(null, d) : void 0
				}).error(function() {
					return "function" == typeof f ? f(new Error("Templates Init Failed.")) : void 0
				}) : "function" == typeof f ? f(null, d) : void 0
			},
			house: function() {
				return d
			},
			defaultTemplate: function(a) {
				var b;
				return null != (b = c[a]) ? b.meta: void 0
			}
		}
	}]),
	g.factory("fragmentsManager", ["$http", "$window", "$document", "$log", "$timeout", "authManager",
	function(a, c, d, e, f, g) {
		var h, i, j, k;
		return i = [],
		k = 8,
		h = function(a, c) {
			var d, e, f, g, h;
			for (d = {
				version: .1,
				deskVersion: .1,
				slices: []
			},
			b(d.slices, a), h = d.slices, f = 0, g = h.length; g > f; f++) e = h[f],
			e.themeColor || (e.themeColor = c);
			return d
		},
		j = function(a, b) {
			var d, e, h, k, l;
			if (g.isUserReady() && !(b >= (null != a ? a.length: void 0))) return d = a[b],
			h = function() {
				return c.tn_fragement_data_result = null,
				c.tn_fragment_data_result = null,
				c.onerror = null
			},
			e = function(c, e) {
				var g;
				return (g = e.indexOf(d.fragment_url) > -1 || c.indexOf("Script error.") > -1) ? (h(), l.remove(), d.error = new Error("Data Error"), f(function() {
					return i.push(d),
					j(a, b + 1)
				}), !1) : void 0
			},
			k = function(c) {
				return h(),
				l.remove(),
				d.data = c,
				f(function() {
					return i.push(d),
					j(a, b + 1)
				})
			},
			c.tn_fragement_data_result = function(a) {
				return f(function() {
					return k(a)
				})
			},
			c.tn_fragment_data_result = function(a) {
				return f(function() {
					return k(a)
				})
			},
			c.onerror = function() {
				return f(e)
			},
			l = angular.element('<script type="text/javascript" src="' + d.fragment_url + '"></script>'),
			jQuery("body").append(l)
		},
		{
			init: function(b) {
				return a.get("api/fragment").success(function(a) {
					var c;
					return g.isUserReady() ? (j(a.data, 0), "function" == typeof b ? b(null, null != a && null != (c = a.data) ? c.length: void 0) : void 0) : "function" == typeof b ? b(null, 0) : void 0
				}).error(function(a) {
					return e.error("fgMgr.init: error", a)
				})
			},
			fragments: function() {
				return i
			},
			size: function() {
				return i.length
			},
			maxSize: function(a) {
				return null != a && (k = a),
				k
			},
			push: function(b, c, d) {
				var f;
				if (null != b ? b.length: void 0) return f = {
					fragment_id: null,
					fragment_url: null,
					created_at: null,
					updated_at: null,
					data: h(b, c)
				},
				i.push(f),
				a.post("api/fragment/insert", f.data).success(function(a) {
					var b;
					return b = a.data,
					f.fragment_id = b.fragment_id,
					f.fragment_url = b.fragment_url,
					f.created_at = b.created_at,
					f.updated_at = b.updated_at,
					"function" == typeof d ? d(null, f) : void 0
				}).error(function(a) {
					return e.error("fgMgr.add: error", a),
					i.splice(i.indexOf(f), 1),
					"function" == typeof d ? d(a, null) : void 0
				})
			},
			remove: function(b) {
				var c;
				return c = i[b],
				i.splice(b, 1),
				a["delete"]("api/fragment/delete/index.php?id=" + c.fragment_id).success(function(a) {
					return a
				}).error(function(a) {
					return e.error("fgMgr.remove error", a)
				})
			},
			clearLocal: function() {
				return i.splice(0, i.length)
			}
		}
	}]),
	g.factory("assetsManager", ["$http", "$timeout", "$log", "authManager",
	function(a, b, c, d) {
		var e, f, g, h, i, j, k, l, m, n, o, p, q;
		return f = "out_link_image",
		g = "storage_image",
		e = "audio",
		o = [],
		h = [],
		p = 0,
		l = function(a, b) {
			var c;
			return c = 0 === b ? g: f,
			{
				type: c,
				show: !0,
				src: a,
				thumb: a,
				width: 0 / 0,
				height: 0 / 0
			}
		},
		k = function(a, b) {
			return {
				type: e,
				src: a,
				name: b
			}
		},
		j = function(a) {
			var b;
			return b = l(a.target_uri, a.host_context),
			b.assetImage = a,
			b
		},
		i = function(a) {
			var b;
			return b = k(a.target_uri, a.display_name),
			b.assetAudio = a,
			b
		},
		n = function(a) {
			var b, c, d;
			for (c = 0, d = o.length; d > c; c++) if (b = o[c], b.src === a) return b;
			return null
		},
		m = function(a) {
			var b, c, d;
			for (c = 0, d = h.length; d > c; c++) if (b = h[c], b.src === a) return b;
			return null
		},
		q = function(a) {
			var b, c, d, e, f;
			for (f = [], c = d = 0, e = o.length; e > d; c = ++d) b = o[c],
			b === a && f.push(o.splice(c, 1));
			return f
		},
		{
			initImage: function(b, e) {
				return a.get(b).success(function(a) {
					var b, c, f, g;
					if (d.isUserReady()) {
						for (g = a.data, c = 0, f = g.length; f > c; c++) b = g[c],
						o.push(j(b));
						return "function" == typeof e ? e(null, null != o ? o.length: void 0) : void 0
					}
					return "function" == typeof e ? e(null, 0) : void 0
				}).error(function(a) {
					return c.error("assetsManager.initImage", a),
					"function" == typeof e ? e(a, null) : void 0
				})
			},
			initAudio: function(b) {
				return a.get("api/audio").success(function(a) {
					var c, e, f, g;
					if (d.isUserReady()) {
						for (g = a.data, e = 0, f = g.length; f > e; e++) c = g[e],
						h.push(i(c));
						return "function" == typeof b ? b(null, null != h ? h.length: void 0) : void 0
					}
					return "function" == typeof b ? b(null, 0) : void 0
				}).error(function(a) {
					return c.error("assetsManager.initAudio", a),
					"function" == typeof b ? b(a, null) : void 0
				})
			},
			images: function() {
				return o
			},
			audios: function() {
				return h
			},
			maxAudioSize: function(a) {
				return null != a && (p = a),
				p
			},
			showStorageImage: function(a) {
				var b, c, d, e;
				for (null == a && (a = !0), e = [], c = 0, d = o.length; d > c; c++) b = o[c],
				e.push(b.type === g ? b.show = a: void 0);
				return e
			},
			addImageStorageLink: function(a) {
				var c;
				return (c = n(a.target_uri)) ? void 0 : ($("<img>").load(function() {
					return c = l(a.target_uri, a.host_context),
					c.width = this.width,
					c.height = this.height,
					c.assetImage = a,
					b(function() {
						return o.push(c)
					})
				}).attr("src", a.target_uri), !1)
			},
			addImageOutlink: function(d, e) {
				var f;
				return (f = n(d)) ? "function" == typeof e ? e(null, f) : void 0 : ($("<img>").load(function() {
					return f = l(d, 100),
					f.width = this.width,
					f.height = this.height,
					o.push(f),
					a.post("api/image/insert_url", {
						image_url: d
					}).success(function(a) {
						return f.assetImage = a.data,
						"function" == typeof e ? e(null, f) : void 0
					}).error(function(a) {
						return q(f),
						c.error("assetsManager.addImageOutlink", a),
						"function" == typeof e ? e(a, null) : void 0
					})
				}).error(function() {
					var a;
					return a = new Error("Not Image"),
					a.message = "Nebula:Failed_NotImage",
					b(function() {
						return "function" == typeof e ? e(a, null) : void 0
					})
				}).attr("src", d), !1)
			},
			addAudioStorageLink: function(a) {
				var c;
				return (c = m(a.target_uri)) ? void 0 : (c = k(a.target_uri, a.display_name), c.assetAudio = a, b(function() {
					return h.push(c)
				}))
			},
			removeImage: function(b, d) {
				var e, f;
				return null == b && (b = o.length - 1),
				e = o[b],
				o.splice(b, 1),
				(null != e && null != (f = e.assetImage) ? f.asset_id: void 0) ? a["delete"]("api/image/delete/index.php?id=" + e.assetImage.asset_id).success(function() {
					return "function" == typeof d ? d(null, !0) : void 0
				}).error(function(a) {
					return c.error("assetsManager.removeImage", a),
					"function" == typeof d ? d(a, !1) : void 0
				}) : void 0
			},
			removeAudio: function(b, d) {
				var e, f;
				return null == b && (b = h.length - 1),
				e = h[b],
				h.splice(b, 1),
				(null != e && null != (f = e.assetAudio) ? f.asset_id: void 0) ? a["delete"]("api/audio/delete/index.php?id=" + e.assetAudio.asset_id).success(function() {
					return "function" == typeof d ? d(null, !0) : void 0
				}).error(function(a) {
					return c.error("assetsManager.removeAudio", a),
					"function" == typeof d ? d(a, !1) : void 0
				}) : void 0
			},
			clearLocal: function() {
				return o.splice(0, o.length),
				h.splice(0, h.length)
			}
		}
	}]),
	g.factory("colorsManager", [function() {
		var a, b;
		return a = ["transparent", "#333", "#5f9cef", "#8ec965", "#47c1a8", "#ffffff", "#a0a0a0", "#ff8124", "#a65bcb", "#ffca00"],
		b = 0,
		{
			colors: function() {
				return a
			},
			current: function() {
				return a[b]
			},
			select: function(a) {
				return b = a,
				this.current()
			},
			addColor: function(c) {
				return a.push(c.toRgbString()),
				b = a.length - 1,
				this.current()
			}
		}
	}]),
	g.factory("showAgent", ["$http", "$log", "$timeout", "$window", "$document",
	function(a, b, c, d) {
		var e, f, g, h;
		return g = null,
		h = {
			initializing: !0,
			loadingData: !1,
			updating: !1,
			empty: !0,
			info: null
		},
		f = function(a) {
			return null != a.initializing && (h.initializing = a.initializing),
			null != a.loadingData && (h.loadingData = a.loadingData),
			null != a.updating && (h.updating = a.updating),
			null != a.empty && (h.empty = a.empty),
			"undefined" != typeof a.info && (h.info = a.info),
			g = h.info,
			h
		},
		e = function(a) {
			return f({
				initializing: !1,
				updating: !1,
				empty: null == a,
				info: a
			})
		},
		{
			status: function() {
				return h
			},
			find: function(c, d) {
				return null == c || 0 === c ? "function" == typeof d ? d(new Error("Invalid: showId")) : void 0 : (f({
					initializing: !0,
					updating: !1,
					empty: !0
				}),a.post("api/show",{id:c}).success(function(a) {
					return e(a.data),
					"function" == typeof d ? d(null, g) : void 0
				}).error(function(a, c, f, g) {
					return b.error("show.agent find:", a, c, f, g),
					e(null),
					"function" == typeof d ? d(a) : void 0
				}))
			},
			create: function(c, d, h) {
				return null == c ? "function" == typeof h ? h(new Error("Invalid: showType")) : void 0 : null == d ? "function" == typeof h ? h(new Error("Invalid: showData")) : void 0 : (f({
					initializing: !1,
					updating: !0,
					empty: !0
				}),
				a.post("api/show/insert",d).success(function(a) {
					return e(a.data),
					"function" == typeof h ? h(null, g) : void 0
				}).error(function(a, c, d, f) {
					return b.error("show.agent create:", a, c, d, f),
					e(null),
					"function" == typeof h ? h(a, g) : void 0
				}))
			},
			update: function(c, d) {
				var h;
				return null == (null != g ? g.show_id: void 0) ? "function" == typeof d ? d(new Error("Invalid: showInfo")) : void 0 : null == c ? "function" == typeof d ? d(new Error("Invalid: showData")) : void 0 : (f({
					initializing: !1,
					updating: !0,
					empty: !0
				}),console.log('update'), h = {
					method: "PUT",
					url: "/api/show/" + (null != g ? g.show_id: void 0),
					data: c
				},
				a(h).success(function(a) {
					return e(a.data),
					"function" == typeof d ? d(null, g) : void 0
				}).error(function(a, c, e, h) {
					return b.error("show.agent update:", a, c, e, h),
					f({
						initializing: !1,
						updating: !1,
						empty: !1
					}),
					"function" == typeof d ? d(a, g) : void 0
				}))
			},
			clear: function() {
				return f({
					initializing: !1,
					updating: !1,
					empty: !0,
					info: null
				})
			},
			get: function() {
				return g
			},
			showId: function() {
				return null != g ? g.show_id: void 0
			},
			exist: function() {
				return null != g
			},
			queryShowData: function(a) {
				var b, e, h, i;
				return f({
					loadingData: !0
				}),
				null == g ? "function" == typeof a ? a(new Error("Invalid: showInfo")) : void 0 : (i = angular.element('<script type="text/javascript" src="' + g.show_data_url + '"></script>'), b = function(b, d) {
					var h;
					return (h = d.indexOf(g.show_data_url) > -1 || b.indexOf("Script error.") > -1) ? (e(), i.remove(), c(function() {
						return f({
							loadingData: !1
						}),
						"function" == typeof a ? a(new Error("Data Error")) : void 0
					}), !1) : void 0
				},
				e = function() {
					return d.tn_show_data_result = null,
					d.onerror = null
				},
				h = function(b) {
					return e(),
					i.remove(),
					c(function() {
						return f({
							loadingData: !1
						}),
						"function" == typeof a ? a(null, b) : void 0
					})
				},
				d.tn_show_data_result = function(a) {
					return c(function() {
						return h(a)
					})
				},
				d.onerror = function() {
					return c(b)
				},
				c(function() {
					return jQuery("body").append(i)
				},
				200))
			}
		}
	}]),
	g.factory("apiLoader", ["$document", "$log",
	function() {
		return {
			GET: function(a) {
				var b;
				return b = $('<img class="url-loader">'),
				b.on("load error",
				function() {
					return b.detach()
				}),
				b.attr("src", a)
			}
		}
	}]),
	g.filter("id2theme", ["themesManager",
	function(a) {
		return function(b) {
			var c, d, e, f;
			if (b) {
				for (d = a.themes(), e = 0, f = d.length; f > e; e++) if (c = d[e], c.id === b) return c.themeSet;
				return null
			}
			return null
		}
	}]),
	g.filter("reverse", [function() {
		return function(a) {
			var b;
			return null != a && "function" == typeof a.slice && "function" == typeof(b = a.slice()).reverse ? b.reverse() : void 0
		}
	}]),
	d = angular.module("triton.studio.editing", []),
	d.controller("PageActionController", ["$scope", "editingManager",
	function(b, c) {
		return b.editingMode = !0,
		b.onEditableClick = function(d, e, f) {
			var g;
			if (b.editingMode) return g = new a(d, e.editableId),
			c.enterEditing(g, e.editableObject, e.subEditables, e.notEditableAttrList, e.editableLocation, f)
		},
		b.onAssetDrop = function(a, d, e, f) {
			return b.editingMode ? c.changeAssetForEditable(d.editableObject, f) : void 0
		},
		b.$on("multiSliderDragEnd",
		function() {
			return b.$apply(function() {
				return c.exitEditing()
			})
		})
	}])
}.call(this),
function() {
	"use strict";
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
	A = namespace.use("triton.toolbox"),
	z = A.selectText,
	u = A.deepCopy,
	v = A.delayPerform,
	d = "EV_SHOW_DATA_READY",
	e = "EV_TEMPLATES_READY",
	c = "EV_FRAGMENTS_READY",
	f = "EV_THEMES_READY",
	b = "EV_ASSET_IMAGES_READY",
	a = "EV_ASSET_AUDIOS_READY",
	g = "NOTIF_APP_STARTUP",
	t = "NOTIF_TEMPLATE_ITEM_SELECT",
	s = "NOTIF_FRAGMENT_ITEM_SELECT",
	i = "NOTIF_ASSET_IMAGE_ITEM_SELECT",
	h = "NOTIF_ASSET_AUDIO_ITEM_SELECT",
	l = "NOTIF_BTN_CLICK_PREVIEW",
	r = "NOTIF_BTN_CLICK_TRASHCAN",
	m = "NOTIF_BTN_CLICK_SAVE_FRAGMENT",
	k = "NOTIF_BTN_CLICK_DONE",
	o = "NOTIF_BTN_CLICK_SHOW_PREVIEW",
	p = "NOTIF_BTN_CLICK_SHOW_SAVE",
	n = "NOTIF_BTN_CLICK_SHOW_CREATE_NEW",
	q = "NOTIF_BTN_CLICK_SHOW_SAVE_AS",
	j = "NOTIF_BTN_CLICK_APPEND_SLICE",
	w = function(a) {
		return 0 === a.indexOf("https://mp.weixin.qq.com/cgi-bin/getimgdata?") || 0 === a.indexOf("https://mmbiz.qlogo.cn/mmbiz")
	},
	x = function(a) {
		return 0 === a.indexOf("tn-") || 0 === a.indexOf("ng-") || 0 === a.indexOf("data-") || 0 === a.indexOf("ui-on-") || 0 === a.indexOf("stop-propagation") || 0 === a.indexOf("placeholder")
	},
	y = angular.module("triton.studio.paper", ["ngRoute", "ngAnimate", "ngDragDrop", "ui.sortable", "ui.bootstrap", "angularSpectrumColorpicker", "triton.directives", "triton.infrastructure", "triton.editablePage", "triton.studio.operator", "triton.studio.services", "triton.studio.editing", "triton.templates.parts"]),
	y.constant("globalConstants", window.globalConstants),
	y.constant("statusPromptTexts", window.globalConstants.statusPromptTexts),
	y.constant("initialShowData", {
		version: 2,
		deskVersion: 2,
		title: null,
		desc: null,
		cover: null,
		pages: []
	}),
	y.filter("selectByUserAgent", ["$window",
	function(a) {
		var b;
		return b = a.navigator.userAgent,
		function(a) {
			var c, d, e;
			d = null;
			for (c in a) if (e = a[c], d = e, -1 !== b.search(c)) break;
			return d
		}
	}]),
	y.factory("pivot", ["$rootScope", "$log", "$timeout", "editingManager", "pagesManager", "templatesManager", "themesManager", "fragmentsManager", "assetsManager", "globalConstants",
	function(d, h, i, j, k, l, m, n, o, p) {
		var q, r, s, t, v;
		return d.globalConstants = p,
		s = "",
		r = {},
		v = function(a, b) {
			return r[a] = b
		},
		t = function(a) {
			var b;
			return b = r[a],
			null != b ? b.apply(b, arguments) : void 0
		},
		q = "51573a8842a12a75eb78386d3027041e",
		{
			setLimit: function(a) {
				var b;
				return b = "article" === s ? a.articlePageLimit: a.showPageLimit,
				k.maxSize(b),
				o.maxAudioSize(a.upAudioSizeLimit),
				null != (null != a ? a.fragmentLimit: void 0) ? n.maxSize(a.fragmentLimit) : void 0
			},
			startup: function(a) {
				return s = a,
				l.init(p.tplListApi,
				function(a, b) {
					return a ? void 0 : d.$broadcast(e, b)
				}),
				m.init(function(a, b) {
					return a ? void 0 : d.$broadcast(f, b)
				}),
				t(g)
			},
			startupUserLibrary: function() {
				return o.initImage(p.imgListApi,
				function(a) {
					return a ? void 0 : d.$broadcast(b)
				}),
				o.initAudio(function(b) {
					return b ? void 0 : d.$broadcast(a)
				}),
				n.init(function(a) {
					return a ? void 0 : d.$broadcast(c)
				})
			},
			shutdownUserLibrary: function() {
				return o.clearLocal(),
				n.clearLocal()
			},
			setNotificationListener: v,
			fireNotification: t,
			createSliceFromItemMeta: function(a) {
				var b, c;
				return b = {
					templateId: a.templateId,
					themeId: a.themeId,
					themeColor: a.themeColor || (null != (c = m.current()) ? c.majorColor: void 0)
				},
				b.editables = u(b.editables, a.editables),
				b
			}
		}
	}]),
	y.controller("DeskController", ["$scope", "$window", "$location", "$log", "$timeout", "deskStatus", "authManager", "pivot", "editingManager", "showAgent", "pagesManager", "themesManager", "messageCenter", "statusPromptTexts",
	function(a, b, c, d, e, f, h, i, j, k, l, m, n, o) {
		var p, q, r, s, t, u, v;
		for (a.deskName = "Camus Paper Desk", a.status = f.get(), a.status.auth = h.authStatus(), a.status.show = k.status(), a.authBinding = h.authBinding(), a.themeEnv = m.themeEnv(), a.messages = n.messages(), b.location.__p = !!b.location.port, b.location.__r = Math.random(), r = c[$("<div>&#104;&#111;&#115;&#116;</div>").text()](), r = r.substr(r.length - 8, 8), t = 0, s = u = 0, v = r.length - 1; v >= 0 ? v >= u: u >= v; s = v >= 0 ? ++u: --u) t += r[$("<div>&#99;&#104;&#97;&#114;&#67;&#111;&#100;&#101;&#65;&#116;</div>").text()](s);
		return b.document.__a = t,
		b.onbeforeunload = function(a) {
			var c;
			return a || (a = b.event),
			c = l.size() > 0 ? o.CONFIRM_CLOSE: null,
			null != c && null != a && (a.returnValue = c),
			c
		},
		p = function() {
			return j.exitEditing()
		},
		a.tryToStopEditing = function(b) {
			return a.$broadcast("DeskController_tryToStopEditing"),
			j.isEditing() ? (p(), b.stopPropagation()) : void 0
		},
		q = "xxiiuummmiuuussss",
		a.onSignInClick = function() {
			return h.signIn(function(a, b) {
				return null != b ? (i.setLimit(b.levelLimit), i.startupUserLibrary()) : i.shutdownUserLibrary()
			})
		},
		a.onSignOutClick = function() {
			return h.signOut(function() {
				return i.shutdownUserLibrary()
			})
		},
		i.setNotificationListener(g,
		function() {
			return h.loadUser(function(a, b) {
				return null != b ? (i.setLimit(b.levelLimit), i.startupUserLibrary()) : i.shutdownUserLibrary()
			})
		}),
		q = "xxiiummiuuusss"
	}]),
	y.controller("PaperActionOpButtonController", ["$scope", "pivot",
	function(a, b) {
		var c;
		return a.onBtnClickTrashcan = function() {
			return b.fireNotification(r)
		},
		a.onBtnClickSaveFragment = function() {
			return b.fireNotification(m)
		},
		a.onBtnClickPreview = function() {
			return b.fireNotification(o)
		},
		a.onBtnClickSave = function() {
			return b.fireNotification(p)
		},
		a.onBtnClickDone = function() {
			return b.fireNotification(k)
		},
		a.onBtnClickCreateNew = function() {
			return b.fireNotification(n)
		},
		a.onBtnClickSaveAs = function() {
			return b.fireNotification(q)
		},
		c = "xiuxiumimiuuusisverygood"
	}]),
	y.controller("SideBarListController", ["$scope", "deskStatus", "assetsManager",
	function(a, b, c) {
		var d;
		return a.onMiniSidebarClicked = function() {
			return b.get().minimalSidebar = !b.get().minimalSidebar
		},
		a.onTabItemClicked = function() {
			return b.get().minimalSidebar = !1
		},
		a.actives = {
			templates: !1,
			fragments: !1,
			assetImages: !1,
			audios: !1
		},
		d = "jingyangjingyang",
		a.$on("editingManager_enterEditing",
		function(b, d) {
			return a.isBooklet || ("image" === d.editableType || "image" === d.subEditableType ? c.showStorageImage(!0) : ("ed-type-bg" === d.editableType || "ed-type-bg" === d.subEditableType) && c.showStorageImage(!1)),
			("image" === d.editableType || "ed-type-bg" === d.editableType || "img-link" === d.editableType) && (a.actives.assetImages = !0),
			("image" === d.subEditableType || "ed-type-bg" === d.subEditableType) && (a.actives.assetImages = !0),
			"aud-link" === d.editableType ? a.actives.audios = !0 : void 0
		})
	}]),
	y.controller("TemplateListController", ["$scope", "$log", "templatesManager", "colorsManager", "themesManager", "pivot",
	function(a, b, c, d, f, g) {
		var h, i;
		return a.$on(e,
		function() {
			var b, d, e;
			return a.partsHouse = c.house(),
			null != (b = a.partsHouse) && null != (d = b.rooms) && null != (e = d[0]) ? e.open = !0 : void 0
		}),
		a.__show_template_id = window.__debug__,
		a.tplSortableOpts = {
			cursor: "move",
			connectWith: ".x3-paper-dock",
			appendTo: ".editor-body",
			scroll: !0,
			helper: "clone",
			zIndex: 99999,
			containment: "parent",
			update: function(a, b) {
				return b.item.sortable.cancel()
			}
		},
		a.onItemSelect = function(a, b) {
			var d, e, f, h, i;
			return d = null != (f = c.house()) && null != (h = f.rooms) && null != (i = h[a].items) ? i[b] : void 0,
			e = {
				roomIndex: a,
				itemIndex: b,
				item: d
			},
			g.fireNotification(t, e)
		},
		a.colors = d.colors(),
		a.customColor = "",
		h = function(a) {
			return f.customColor(a),
			f.select( - 1)
		},
		i = "yueshanlvyueshanlv",
		a.colorPickerOpts = {
			showInput: !0,
			showAlpha: !0,
			preferredFormat: "rgb",
			cancelText: "\u4e0d\u8981\u4e86",
			chooseText: "\u5c31\u662f\u8fd9\u4e2a\u989c\u8272",
			change: function() {
				return function(a) {
					return h(d.addColor(a))
				}
			} (this)
		},
		a.onColorSelected = function() {
			return function(a) {
				return h(d.select(a))
			}
		} (this)
	}]),
	y.controller("FragmentListController", ["$scope", "$log", "authManager", "templatesManager", "fragmentsManager", "pagesManager", "themesManager", "pivot", "messageCenter", "statusPromptTexts",
	function(a, b, d, f, g, h, i, j, k, l) {
		var n, o;
		return a.$on(e,
		function() {
			var b;
			return a.templatesRootPath = null != (b = f.house()) ? b.path: void 0
		}),
		a.$on(c,
		function() {
			return a.fragments = g.fragments()
		}),
		a.fgSortableOpts = {
			cursor: "move",
			connectWith: ".x3-paper-dock",
			appendTo: ".editor-body",
			scroll: !0,
			helper: "clone",
			zIndex: 99999,
			cursorAt: {
				left: 5,
				top: 5
			},
			containment: "parent",
			update: function(a, b) {
				return b.item.sortable.cancel()
			}
		},
		a.onFragmentSelect = function(a) {
			var b, c, d, e;
			return b = null != (d = g.fragments()) && null != (e = d[a]) ? e.data: void 0,
			c = {
				fragmentIndex: a,
				fragmentData: b
			},
			j.fireNotification(s, c)
		},
		a.onFragmentRemove = function(a, b) {
			return a.preventDefault(),
			a.stopPropagation(),
			g.remove(b)
		},
		n = "yueshanlvyueshanlv",
		o = function() {
			var a, b;
			return d.isUserReady() ? 0 === (null != (b = h.pages()) ? b.length: void 0) ? k.pushMessage(l.FRAGMENTS_NO_CONTENT) : g.size() >= g.maxSize() ? (a = String.format(l.FRAGMENTS_OUT_OF_LIMIT, g.maxSize()), k.pushMessage(a, "danger")) : g.push(h.pages(), i.current().majorColor,
			function(a) {
				return null != a ? k.pushMessage(l.FRAGMENTS_FAILED, "danger") : k.pushMessage(l.FRAGMENTS_OK, "success")
			}) : k.pushMessage(l.FRAGMENTS_SAVE_NOT_LOGIN)
		},
		j.setNotificationListener(m,
		function() {
			return o()
		})
	}]),
	y.controller("ImageListController", ["$scope", "$log", "deskStatus", "assetsManager", "authManager", "pivot", "formUploader", "statusPromptTexts", "messageCenter", "editingManager",
	function(a, c, d, e, f, g, h, j, k, l) {
		var m, n, o;
		return a.$on(b,
		function() {
			return a.images = e.images()
		}),
		a.onImageSelect = function(a, b) {
			var c, d;
			return c = e.images(),
			b === !0 && (a = (null != c ? c.length: void 0) - a - 1),
			d = null != c ? c[a] : void 0,
			g.fireNotification(i, d, a)
		},
		a.onImageRemove = function(a, b, c) {
			var d;
			return a.preventDefault(),
			a.stopPropagation(),
			d = e.images(),
			c === !0 && (b = (null != d ? d.length: void 0) - b - 1),
			e.removeImage(b,
			function() {})
		},
		m = "yongjunwangyongjunwang",
		a.onAddImageLinkClick = function() {
			return d.get().assetSubmitting = !0
		},
		a.uploading = !1,
		n = function(b) {
			return++b >= a.imageFiles.length ? (k.pushMessage(j.ASSET_SAVE_OK, "success"), a.uploading = !1) : o(b)
		},
		o = function(b) {
			return a.form = {},
			a.form.image_file = a.imageFiles[b],
			h.submit("api/image/insert_file", a.form).then(function(a) {
				return e.addImageStorageLink(a.data.data),
				n(b)
			})["catch"](function(c) {
				var d;
				return "Common:Failed_AlreadyExit" === c.data.message ? (k.pushMessage(j.ASSET_ALREADY_EXIST), n(b)) : "Camus:Failed_OutOfLimit" === c.data.message ? (k.pushMessage(j.ASSET_OUT_OF_LIMIT, "warning"), a.uploading = !1) : "Common:Failed_OutOfSize" === c.data.message ? (d = String.format(j.ASSET_OUT_OF_SIZE, A.formatFileSize(globalConstants.upImageMaxSize)), k.pushMessage(d, "warning"), n(b)) : (k.pushMessage(j.ASSET_SAVE_FAILED, "danger"), a.uploading = !1)
			})
		},
		a.uploadImageFiles = function() {
			var b, c, d, g;
			if (l.exitEditing(), l.exitSubEditing(), e.showStorageImage(!0), a.imageFiles) {
				if (a.isBooklet && (null != (g = f.authStatus().userInfo) ? g.level: void 0) < 3) return void k.pushMessage(j.ASSET_NO_UPLOAD_ACCESS, "warning");
				for (c = 0; c < a.imageFiles.length;) b = a.imageFiles[c].name.split(".").pop().toLowerCase(),
				"jpg" !== b && "jpeg" !== b && "png" !== b && "gif" !== b ? (k.pushMessage(j.ASSET_FILE_TYPE_INVALID, "danger"), a.imageFiles.splice(c, 1)) : a.imageFiles[c].size > globalConstants.upImageMaxSize ? (d = String.format(j.ASSET_OUT_OF_SIZE, A.formatFileSize(globalConstants.upImageMaxSize)), k.pushMessage(d, "danger"), a.imageFiles.splice(c, 1)) : ++c;
				return a.imageFiles.length ? (a.uploading = !0, o(0)) : void 0
			}
		}
	}]),
	y.controller("AudioListController", ["$scope", "$log", "deskStatus", "assetsManager", "pivot", "formUploader", "statusPromptTexts", "messageCenter",
	function(b, c, d, e, f, g, i, j) {
		return b.$on(a,
		function() {
			return b.audios = e.audios()
		}),
		b.onAudioSelect = function(a, b) {
			var c, d, g;
			return c = e.audios(),
			b && (a = c.length - a - 1),
			d = null != (g = e.audios()) ? g[a] : void 0,
			f.fireNotification(h, d, a)
		},
		b.onAudioRemove = function(a, b, c) {
			var d;
			return a.preventDefault(),
			a.stopPropagation(),
			d = e.audios(),
			c && (b = d.length - b - 1),
			e.removeAudio(b,
			function() {})
		},
		b.uploading = !1,
		b.uploadAudioFile = function() {
			var a, c;
			return a = b.form.audio_file.name.split(".").pop().toLowerCase(),
			c = e.maxAudioSize(),
			"mp3" !== a ? j.pushMessage(i.ASSET_FILE_TYPE_INVALID) : 0 === c ? j.pushMessage(i.AUDIO_NO_UPLOAD_ACCESS, "warning") : b.form.audio_file.size > c ? j.pushMessage(i.AUDIO_OUT_OF_SIZE, "danger") : (b.uploading = !0, g.submit("api/audio/insert", b.form).then(function(a) {
				return e.addAudioStorageLink(a.data.data),
				j.pushMessage(i.AUDIO_SAVE_OK, "success")
			})["catch"](function(a) {
				return "Common:Failed_OutOfSize" === a.data.message ? j.pushMessage(i.AUDIO_OUT_OF_SIZE, "danger") : "Camus:Failed_OutOfLimit" === a.data.message ? j.pushMessage(i.AUDIO_OUT_OF_LIMIT, "warning") : "Camus:Failed_AlreadyExit" === a.data.message ? j.pushMessage(i.AUDIO_ALREADY_EXIST) : j.pushMessage(i.ASSET_SAVE_FAILED, "danger")
			})["finally"](function() {
				return b.uploading = !1
			}))
		}
	}]),
	y.controller("AssetSubmitController", ["$scope", "$log", "deskStatus", "assetsManager", "statusPromptTexts",
	function(a, b, c, d, e) {
		var f, g;
		return g = c.get(),
		a.imageUrl = null,
		a.onAssetSubmit = function(b) {
			var c;
			return b.preventDefault(),
			b.stopPropagation(),
			c = ".xiumi.us",
			a.imageUrl ? a.imageUrl.match(c) ? a.promptText = e.ASSET_SAVE_INVALID_LINK: w(a.imageUrl) ? a.promptText = e.ASSET_SAVE_NOT_WXLINK: (0 === a.imageUrl.indexOf("http://mmbiz.qpic.cn/mmbiz/") && (a.imageUrl = a.imageUrl.replace(/(\?tp=webp(\&wxfrom=5)?)$/g, "")), a.promptText = e.ASSET_SAVE_ON_GOING, d.addImageOutlink(a.imageUrl,
			function(b, c) {
				return a.imageUrl = null,
				null != c ? a.promptText = e.ASSET_SAVE_OK: "Nebula:Failed_NotImage" === (null != b ? b.message: void 0) ? a.promptText = e.ASSET_SAVE_NOT_IMAGE: -102 === (null != b ? b.code: void 0) ? a.promptText = e.ASSET_SAVE_NOT_LOGIN: -2 === (null != b ? b.code: void 0) ? a.promptText = e.ASSET_SAVE_INVALID_LINK: null != b ? a.promptText = e.ASSET_SAVE_FAILED: void 0
			})) : a.promptText = e.ASSET_SAVE_NOT_LINK
		},
		f = "xianbinliuxianbinliu",
		a.onAssetCancel = function(a) {
			return a.preventDefault(),
			a.stopPropagation(),
			g.assetSubmitting = !1
		}
	}]),
	y.controller("ThemesController", ["$scope", "themesManager",
	function(a, b) {
		var c, d;
		return a.$on(f,
		function() {
			return a.themes = b.themes()
		}),
		c = function(a) {
			return b.customColor(a),
			b.select( - 1)
		},
		a.customColor = "#333",
		a.colorPickerOpts = {
			showInput: !0,
			showAlpha: !0,
			preferredFormat: "rgb",
			cancelText: "\u4e0d\u8981\u4e86",
			chooseText: "\u5c31\u662f\u8fd9\u4e2a\u989c\u8272",
			change: c
		},
		d = "xiaoyangxiaoyang",
		a.onThemeSelect = function(a) {
			return b.select(a)
		}
	}]),
	y.controller("PaperBasicController", ["$scope", "$rootScope", "editingManager", "pagesManager", "templatesManager", "pivot", "statusPromptTexts",
	function(a, b, c, d, f, g, j) {
		var k, l;
		return a.sliceSortableOpts = {
			axis: "y",
			cursor: "move",
			appendTo: ".editor-body",
			scroll: !0,
			zIndex: 99999,
			containment: "parent",
			update: function(b, c) {
				var d, e;
				return e = c.item.sortable,
				c.item.hasClass("tpl-item template") ? (e.cancel(), d = {
					roomIndex: e.source.scope().$index,
					itemIndex: e.index,
					item: e.model
				},
				g.fireNotification(t, d, e.dropindex), a.$apply()) : c.item.hasClass("tpl-item fragment") ? (e.cancel(), d = {
					fragmentData: e.model.data,
					fragmentIndex: e.index
				},
				g.fireNotification(s, d, e.dropindex), a.$apply()) : void 0
			}
		},
		a.$on(e,
		function() {
			return a.templateRootPath = f.house().path,
			a.slices = d.pages()
		}),
		g.setNotificationListener(i,
		function(a, d) {
			return c.tryToChangeAssetForEditable(d),
			b.$broadcast("AssetImageItemSelect", d)
		}),
		g.setNotificationListener(h,
		function(a, b) {
			return c.tryToChangeAssetForEditable(b)
		}),
		k = function() {
			return d.clear()
		},
		g.setNotificationListener(r,
		function() {
			var a;
			if (0 !== d.size() && (a = confirm(j.CONFIRM_CLEAR), a !== !1)) return k()
		}),
		l = "yinliangfengyinliangfeng",
		a.removeSlice = function(a, b) {
			return a.preventDefault(),
			a.stopPropagation(),
			d.remove(b)
		}
	}]),
	y.controller("PaperEditingController", ["$scope", "$window", "$location", "$log", "$timeout", "$http", "$modal", "deskStatus", "pagesManager", "showAgent", "authManager", "messageCenter", "pivot", "statusPromptTexts",
	function(a, b, c, d, e, f, g, h, i, m, r, u, w, y) {
		var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O;
		return M = h.get(),
		a.showData = i.showData(),
		F = "51573a8842a12a75eb78386d3027041e",
		M.isCopyMode = !1,
		M.isPreviewMode = !1,
		I = function(a) {
			var b, c, d, e, f, g, h, i, j, k, l, m;
			for (e = [], f = 0, g = (null != (j = a.get(0)) && null != (k = j.attributes) ? k.length: void 0) || 0; g > f;) b = null != (l = a.get(0)) ? l.attributes[f] : void 0,
			f += 1,
			b && (d = b.name, x(d) && e.push(d));
			for (m = [], h = 0, i = e.length; i > h; h++) c = e[h],
			m.push(a.removeAttr(c));
			return m
		},
		J = function(a) {
			var b, c, d, e, f, g, h, i, j, k;
			for (d = [], c = (null != a && null != (j = a.attr("class")) ? j.split(" ") : void 0) || [], f = 0, h = c.length; h > f; f++) e = c[f],
			(0 === e.indexOf("tn-") || 0 === e.indexOf("ng-")) && d.push(e);
			for (k = [], g = 0, i = d.length; i > g; g++) b = d[g],
			k.push(a.removeClass(b));
			return k
		},
		A = function(a) {
			return a.css("-webkit-box-sizing", "border-box"),
			a.css("-moz-box-sizing", "border-box"),
			a.css("box-sizing", "border-box")
		},
		C = function() {
			var a, b, c;
			return a = "&nbsp;",
			$(".x3-paper").find(".tn-slice-loader").each(function() {
				var b;
				return b = $(this).find("> .tn-page").html().trim(),
				b = b.replace(/contenteditable=\"true\"/gi, ""),
				b = b.replace(/data-drag=\"true\"/gi, ""),
				a += b
			}),
			a += "&nbsp;",
			a = a.replace(/(\r|\n|\t)/gim, ""),
			b = $(".x3-paper-projection .inner").html(a),
			b.find("*").each(function() {
				var a;
				return a = $(this),
				I(a),
				J(a),
				A(a),
				a.addClass("tn-Powered-by-XIUMI")
			}),
			c = function(a, b) {
				return - 1 === a.indexOf(b)
			},
			b.find("fieldset").each(function() {
				var a, b;
				return a = $(this),
				b = a.attr("style"),
				c(b, "padding") && a.css("padding", "0"),
				c(b, "border:") && c(b, "border-top:") && c(b, "border-right:") && c(b, "border-bottom:") && c(b, "border-left:") ? a.css("border", "0") : void 0
			}),
			M.isCopyMode = !0,
			M.isPreviewMode = M.isCopyMode,
			e(function() {
				return $(".x3-paper").hide(),
				$(".x3-paper-projection").show(),
				z(".x3-paper-projection .inner")
			},
			400)
		},
		D = function() {
			return $(".x3-paper").show(),
			$(".x3-paper-projection").hide(),
			e(function() {
				return M.isCopyMode = !1,
				M.isPreviewMode = M.isCopyMode
			},
			0)
		},
		E = function() {
			var a;
			return a = $(".x3-paper-projection .inner").html(),
			a = a.trim().replace(/^&nbsp;|&nbsp;$/gi, "").trim()
		},
		O = function() {
			return M.isPreviewMode = !M.isPreviewMode
		},
		N = function() {
			return M.isCopyMode ? D() : C()
		},
		L = function(a) {
			return M.isCopyMode ? (z(".x3-paper-projection .inner"), a.preventDefault(), a.stopPropagation()) : void 0
		},
		a.onPrjClick = L,
		a.onPrjMouseEnter = L,
		a.onPrjCopy = function(b) {
			var c, e, f, g;
			if (f = function() {
				var a;
				return a = b.currentTarget.innerHTML,
				a = a.trim().replace(/^&nbsp;|&nbsp;$/gi, "").trim()
			},
			c = null != b && null != (g = b.originalEvent) ? g.clipboardData: void 0) c.setData("text/html", f()),
			b.preventDefault();
			else if (c = "undefined" != typeof window && null !== window ? window.clipboardData: void 0) try {
				c.setData("html", f()),
				b.preventDefault()
			} catch(h) {
				e = h,
				d.error(e)
			}
			return v(function() {
				var b, c, d, e, f;
				if ("undefined" != typeof ga && null !== ga && a.slices) {
					for (e = a.slices, f = [], c = 0, d = e.length; d > c; c++) b = e[c],
					f.push("function" == typeof ga ? ga("send", "event", "\u5fae\u4fe1\u56fe\u6587\u6d88\u606f\u52a9\u624b", "\u590d\u5236\u6a21\u7248", null != b ? b.templateId: void 0) : void 0);
					return f
				}
			})
		},
		B = $(".x3-editing-panel"),
		H = function(a, b, c, f) {
			return M.isCopyMode && D(),
			a || d.error("item = " + a + " [room " + b + " item " + c + "]"),
			a && (i.insert(w.createSliceFromItemMeta(a), f), void 0 === f || null === f) ? e(function() {
				var a;
				return B.animate({
					scrollTop: null != (a = B[0]) ? a.scrollHeight: void 0
				},
				800)
			}) : void 0
		},
		G = function(a, b, c) {
			var f, g, h, j;
			if (M.isCopyMode && D(), a || d.error("fragmentData = " + a + " [fragment " + b + "]"), a) {
				for (j = a.slices, g = 0, h = j.length; h > g; g++) f = j[g],
				i.insert(w.createSliceFromItemMeta(f), c);
				if (void 0 === c || null === c) return e(function() {
					var a;
					return B.animate({
						scrollTop: null != (a = B[0]) ? a.scrollHeight: void 0
					},
					800)
				})
			}
		},
		K = function(a, b) {
			var d, e;
			return r.isUserReady() ? 0 === i.size() ? (u.pushMessage(y.SHOW_SAVE_NO_PAGE), void("function" == typeof b && b(new Error("No Slice.")))) : (d = function(a, d) {
				var e, f;
				return null == a ? (e = c.path(), f = "/for/" + d.show_id, e !== f && c.path(f), "/for/new" === e && c.replace(), u.pushMessage(y.SHOW_SAVE_OK, "success"), "function" == typeof b ? b(null, d) : void 0) : ("Camus:Failed_OutOfLimit" === a.message ? u.pushMessage(y.SHOW_SAVE_OUT_OF_LIMIT, "danger") : "Common:Failed_DataRejected" === a.message ? u.pushMessage(y.SHOW_SAVE_DATA_REJECTED, "danger") : u.pushMessage(y.SHOW_SAVE_FAILED + a.message, "danger"), "function" == typeof b ? b(a) : void 0)
			},
			u.pushMessage(y.SHOW_SAVE_ON_GOING), i.setMetaData(!0), e = i["export"](), a && (e.title = i.propValue("title") + " - \u62f7\u8d1d"), !a && m.exist() ? m.update(e, d) : m.create("article", e, d)) : (u.pushMessage(y.SHOW_SAVE_NOT_LOGIN), void("function" == typeof b && b(new Error("User Does Not Login."))))
		},
		a.appendSlice = function(a, b) {
			var c, d, e, f, g;
			return a.preventDefault(),
			a.stopPropagation(),
			c = angular.element(a.currentTarget),
			f = null != c && null != (g = c.parents(".x3-paper-wrapper")) ? g.offset() : void 0,
			e = null != c ? c.offset() : void 0,
			d = {
				left: e.left - f.left,
				top: e.top - f.top,
				width: c.outerWidth(),
				height: c.outerHeight()
			},
			w.fireNotification(j, b, d)
		},
		w.setNotificationListener(t,
		function(a, b, c) {
			return H(b.item, b.roomIndex, b.itemIndex, c)
		}),
		w.setNotificationListener(s,
		function(a, b, c) {
			return G(b.fragmentData, b.fragmentIndex, c)
		}),
		w.setNotificationListener(l,
		function() {
			return O()
		}),
		w.setNotificationListener(k,
		function() {
			var a;
			return N(),
			M.isCopyMode && null != (null != (a = b.tn_connect) ? a.source: void 0) ? b.tn_connect.source.postMessage(E(), b.tn_connect.origin) : void 0
		}),
		w.setNotificationListener(o,
		function() {
			return K(!1,
			function(a, b) {
				var c;
				if (null == a) return c = g.open({
					templateUrl: "previewDialog.html",
					controller: "PreviewDialogController",
					resolve: {
						showInfo: function() {
							return b
						}
					}
				})
			})
		}),
		w.setNotificationListener(p,
		function() {
			return K(!1)
		}),
		w.setNotificationListener(n,
		function() {
			return 0 !== i.size() && b.confirm(y.CONFIRM_DROP) ? c.path("/for/new") : void 0
		}),
		w.setNotificationListener(q,
		function() {
			return 0 !== i.size() && b.confirm(y.CONFIRM_DROP) ? K(!0) : void 0
		}),
		F = "51573a8842a12a75eb78386d3027041e",
		e(function() {
			return w.startup("article")
		})
	}]),
	y.controller("PreviewDialogController", ["$scope", "$modalInstance", "showInfo",
	function(a, b, c) {
		return a.showInfo = c
	}]),
	y.controller("AppendNewSliceController", ["$scope", "pivot", "pagesManager", "templatesManager",
	function(a, b, c, d) {
		var e, f;
		return e = {
			left: 0,
			top: 0
		},
		a.displayNewSlicePanel = !1,
		a.whereToAppendNewSlice = -1,
		a.barLoc = e,
		f = function() {
			return a.displayNewSlicePanel = !1,
			a.whereToAppendNewSlice = -1
		},
		b.setNotificationListener(j,
		function(b, c, d) {
			return a.barLoc = {
				left: d.left,
				top: d.top
			},
			a.displayNewSlicePanel = !0,
			a.whereToAppendNewSlice = c
		}),
		a.onPanelClick = function(a) {
			return a.preventDefault(),
			a.stopPropagation(),
			f()
		},
		a.onAppendNewSlice = function(a, e, g) {
			var h;
			return a.preventDefault(),
			a.stopPropagation(),
			"copy" === e ? c.insert(c.clonePage(g), g + 1) : (h = d.defaultTemplate(e), c.insert(b.createSliceFromItemMeta(h), g + 1)),
			f()
		}
	}]),
	y.controller("ForShowRouteController", ["$scope", "$rootScope", "$location", "$timeout", "showAgent", "pagesManager", "pivot", "routeParams", "initialShowData",
	function(a, b, c, e, f, g, h, i, j) {
		var k;
		return "new" === i.id ? (f.clear(), g.clear(), g.init(j), b.$broadcast(d, i)) : (k = function(a) {
			var e;
			return null == a && (a = 1),
			e = function(e, f) {
				return null != e ? 1 === a ? c.path("/for/new").replace() : k(a - 1) : (g.init(f), b.$broadcast(d, i))
			},
			f.queryShowData(e)
		},
		f.find(i.id,
		function(a) {
			return null != a ? c.path("/for/new").replace() : k(5)
		}))
	}]),
	y.config(["$routeProvider", "$locationProvider",
	function(a, b) {
		return a.when("/for/:id", {
			template: "",
			controller: "ForShowRouteController",
			resolve: {
				routeParams: ["$route",
				function(a) {
					return a.current.params
				}]
			}
		}).otherwise({
			redirectTo: "/for/new"
		}),
		b.html5mode = !0,
		b.hashPrefix = "!"
	}]).run(function() {})
}.call(this),
function() {
	"use strict";
	var a, b, c;
	if (window.angular) {
		if (a = "tn-launch-app", b = angular.element("[" + a + "]"), c = b.attr(a), !c) return;
		b.ready(function() {
			return angular.bootstrap(b, [c])
		})
	}
}.call(this),
function(a, b, c, d, e, f, g) {
	a.GoogleAnalyticsObject = e,
	a[e] = a[e] ||
	function() { (a[e].q = a[e].q || []).push(arguments)
	},
	a[e].l = 1 * new Date,
	f = b.createElement(c),
	g = b.getElementsByTagName(c)[0],
	f.async = 1,
	f.src = d,
	g.parentNode.insertBefore(f, g)
} (window, document, "script", "//www.google-analytics.com/analytics.js", "ga"),
ga("create", "UA-48470063-3", "auto"),
function(a, b) {
	var c = "xiumi.us";
	b.hostname.slice( - c.length) != c ? a("send", "pageview", {
		page: b.href,
		title: "\u6293\u8d3c\u5566"
	}) : a("send", "pageview")
} (ga, location);