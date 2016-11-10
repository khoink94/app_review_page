
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.2
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(e, t) {
    "use strict";

    function n(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    var i;
    if (t = t || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = t.touchBoundary || 10, this.layer = e, this.tapDelay = t.tapDelay || 200, !FastClick.notNeeded(e)) {
        for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, a = 0, s = r.length; s > a; a++) o[r[a]] = n(o[r[a]], o);
        deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, i) {
            var r = Node.prototype.removeEventListener;
            "click" === t ? r.call(e, t, n.hijacked || n, i) : r.call(e, t, n, i)
        }, e.addEventListener = function(t, n, i) {
            var r = Node.prototype.addEventListener;
            "click" === t ? r.call(e, t, n.hijacked || (n.hijacked = function(e) {
                e.propagationStopped || n(e)
            }), i) : r.call(e, t, n, i)
        }), "function" == typeof e.onclick && (i = e.onclick, e.addEventListener("click", function(e) {
            i(e)
        }, !1), e.onclick = null)
    }
}

function stickyTitle() {
    function e() {
        a = r.height(), s = o.height(), l = o.offset().top
    }
    var t = this,
        n = document.getElementsByClassName("js-stick");
    if (n.length) {
        var i = $(t),
            r = $(n),
            o = r.parent();
        t.hasSticky = !0;
        var a, s, l, c = $("body").hasClass("hide-nav") ? 0 : 60,
            u = Modernizr.csspositionsticky;
        t.stickyScrollHandler = function(e) {
            u || (l - c > e ? r.css({
                position: "absolute",
                top: 0,
                bottom: "auto"
            }) : e > l - c && l - c + s - a > e ? r.css({
                position: "fixed",
                top: c,
                bottom: "auto"
            }) : e >= l - c + s - a && r.css({
                position: "absolute",
                top: "auto",
                bottom: 0
            }))
        }, e(), i.resize(function() {
            e()
        })
    }
}

function appPlays() {
    var e = this,
        t = APPPlay("js-app-play", "js-app-play-event");
    t.hasElements() && (e.hasAppPlays = !0), e.appPlayScrollHandler = function(e) {
        t.scrollHandler(e)
    }
}

function globalScroll() {
    var e, t = this,
        n = $(t),
        i = function(e, t, n) {
            var i = n || window,
                r = !1,
                o = function() {
                    r || (r = !0, requestAnimationFrame(function() {
                        i.dispatchEvent(new CustomEvent(t)), r = !1
                    }))
                };
            i.addEventListener(e, o)
        };
    i("scroll", "globalScroll", t), t.addEventListener("globalScroll", function() {
        e = n.scrollTop(), "undefined" != typeof hasSlick && slickScrollHandler(e), "undefined" != typeof hasSticky && stickyScrollHandler(e), "undefined" != typeof hasArticle && articleScrollHandler(e), "undefined" != typeof hasAppPlays && appPlayScrollHandler(e), "undefined" != typeof hasInfiniteScroll && infiniteScrollScrollHandler(e), "undefined" != typeof hasElemToScrollCheck && scrollInViewScrollHandler(e), "undefined" != typeof hasNav && "undefined" == typeof hasArticle && navScrollHandler(e), "undefined" != typeof hasNavApp && navAppScrollHandler(e), "undefined" != typeof hasAppDemo && appDemoScrollHandler(e), "undefined" != typeof hasHeaderParallax && headerParallaxScrollHandler(e), "undefined" != typeof hasMDemo && messangerDemoScrollHandler(e), "undefined" != typeof hasSiriDemo && siriDemoScrollhandler(e), "undefined" != typeof hasAppHead && appScrollHandler(e)
    })
}

function videosPage() {
    function e(e) {
        var r = e.getAttribute("data-id");
        if (r) n(r, h);
        else {
            var o = c.eq(0),
                a = o.prop("href");
            o.addClass("active"), u = o.data("id"), n(u, h), i(a, !0), c.on("click", t)
        }
    }

    function t(e) {
        var t = $(this);
        if (!t.hasClass("active") && (e.preventDefault(), d)) {
            var r, o = t.prop("href"),
                s = t.prev(".js-vp-list-elem");
            if (s.length) {
                var l = s.data("date"),
                    f = l.split("+");
                r = "/appisodes/indexstart/" + f[0].replace("T", "-")
            }
            else r = p;
            window.history.pushState(null, null, r), c.removeClass("active"), t.addClass("active"), u = t.data("id"), a.destroy(), n(u, h), i(o)
        }
    }

    function n(e, t) {
        a = new YT.Player(t, {
            height: "390",
            width: "640",
            playerVars: {
                autohide: 1,
                rel: 0,
                iv_load_policy: 3,
                playsinline: 1
            },
            videoId: e,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        })
    }

    function i(e, t) {
        var n = $("#js-content");
        n.addClass("loading"), d = !1, $.ajax({
            url: e
        }).then(function(e) {
            var i = $(e);
            n.replaceWith(i.find("#js-content"));
            var a = i.find("#js-comments"),
                s = a.data("disqusId"),
                l = a.data("permalink"),
                c = a.data("title");
            t ? r(s, l, c) : o(s, l, c)
        }).done(function() {
            d = !0
        })
    }

    function r(e, t, n) {
        disqus_identifier = e, disqus_url = t, disqus_title = n,
            function() {
                var e = document.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "http://" + disqus_shortname + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(e)
            }()
    }

    function o(e, t, n) {
        DISQUS.reset({
            reload: !0,
            config: function() {
                this.page.identifier = e, this.page.url = t, this.page.title = n
            }
        })
    }
    var a, s = this,
        l = document.getElementById("js-vp");
    if (l) {
        var c = $(".js-vp-list-elem"),
            u = 0,
            d = !0,
            h = "js-vp-video",
            p = window.location.pathname,
            f = Modernizr.touchevents;
        s.onYouTubeIframeAPIReady = function() {
            e(l)
        }, s.onPlayerReady = function(e) {
            f || e.target.playVideo()
        }, s.onPlayerStateChange = function(e) {
            if (e.data == YT.PlayerState.ENDED) {
                var t = c.length,
                    n = c.index(c.filter(".active"));
                n == t - 1 ? n = 0 : n += 1, c.eq(n).trigger("click")
            }
        };
        var m = document.createElement("script");
        m.src = "https://www.youtube.com/iframe_api";
        var v = document.getElementsByTagName("script")[0];
        v.parentNode.insertBefore(m, v)
    }
}

function scrolledInView() {
    function e() {
        r = o.height(), s = [], a.each(function() {
            s.push($(this).offset().top)
        })
    }
    var t = this,
        n = document.getElementsByClassName("js-scrolled-in-view"),
        i = Modernizr.touchevents;
    if (n.length && !i) {
        t.hasElemToScrollCheck = !0;
        var r, o = $(t),
            a = $(n),
            s = [],
            l = -1;
        t.initScrolledInView = function() {
            n = document.getElementsByClassName("js-scrolled-in-view"), a = $(n), l = -1, e(), scrollInViewScrollHandler(0)
        }, t.scrollInViewScrollHandler = function(e) {
            for (var t = 0; t < n.length; t++)
                if (t > l) {
                    if (!(e > s[t] - r)) break;
                    l = t, $(n[t]).addClass("in-view")
                }
        }, e(), scrollInViewScrollHandler(0), o.load(e), o.resize(e)
    }
}

function navSearch(e, t) {
    function n() {
        clearInterval(s);
        var e = t[p].substring(0, f + 1);
        c.attr("placeholder", e), m ? (f--, v = 50, 0 > f && (f++, p++, m = !1, v = 100, p > t.length - 1 && (p = 0))) : (f++, f > t[p].length - 1 && (f--, m = !0, v = 500)), g ? s = setInterval(n, v) : c.attr("placeholder", "")
    }

    function i(e) {
        e && e.preventDefault();
        var t = c.val();
        t = encodeURIComponent(t.replace(/([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g, "\\\\$1")).replace(/(%20)/g, "+"), t != d && "" != t && (h = !0, l.removeClass("typing"), l.addClass("searched"), appAdviceSearch(t), setTimeout(function() {
            h = !1
        }, 200)), d = t
    }
    var r = document.getElementById("js-search"),
        o = document.getElementById("js-search-input");
    if (o) {
        var a, s, l = $(r),
            c = $(o),
            u = Modernizr.touchevents,
            d = "",
            h = !1,
            p = 0,
            f = 0,
            m = !1,
            v = 100,
            g = !1;
        i(), e && "" == c.val() && (g = !0, n()), l.on("click", function(e) {
            e.stopPropagation()
        }), e || (c.on("focus", function() {
            g = !0, n()
        }), c.on("focusout", function() {
            g = !1
        })), c.on("keyup", function(e) {
            clearTimeout(a), h || l.removeClass("searched"), "" == c.val() ? (l.removeClass("typing"), g = !0, n()) : (h || l.addClass("typing"), g = !1, !u && c.val().length > 3 && 8 != e.keyCode && (a = setTimeout(i, 1e3)))
        }), c.on("blur", i), l.on("submit", i)
    }
}

function navBar() {
    function e() {
        h = f.width(), p = f.height(), t()
    }

    function t() {
        1024 > h ? y.css({
            "max-height": p - 60 + "px"
        }) : y.css({
            "max-height": "none"
        })
    }

    function n(e) {
        m.removeClass("open"), v.each(function() {
            var t = $(this);
            t.hasClass("open") && (t.hasClass("scroll-close") ? e > 0 && t.removeClass("open") : t.hasClass("no-close") || (t.hasClass("has-search") ? (t.removeClass("open"), closeSearch()) : t.removeClass("open")))
        })
    }

    function i(e) {
        n(), m.addClass("open"), e.addClass("open"), e.hasClass("has-search") && (_.focus(), openSearch())
    }
    var r = this,
        o = document.getElementById("js-nav"),
        a = document.getElementsByClassName("js-nav-open"),
        s = document.getElementById("js-nav-helper"),
        l = document.getElementById("js-nav-second"),
        c = document.getElementsByClassName("js-nav-set-height"),
        u = document.getElementById("js-search-input"),
        d = document.getElementsByClassName("js-search-close");
    if (o) {
        r.hasNav = !0;
        var h, p, f = $(r),
            m = $(o),
            v = $(a),
            g = $(s),
            b = $(l),
            y = $(c),
            _ = $(u),
            w = $(d),
            C = Modernizr.touchevents,
            k = m.hasClass("searchpage"),
            S = 0,
            E = !1;
        r.navScrollHandler = function(e) {
            m.hasClass("open") && C || (Math.abs(e - S) > 16 ? e - S > 0 && !E ? (E = !0, m.addClass("hide"), b.addClass("hide"), n(e)) : 0 > e - S && E && (E = !1, m.removeClass("hide"), b.removeClass("hide")) : 60 > e && (E = !1, m.removeClass("hide"), b.removeClass("hide")), S = e)
        }, e(), navSearch(k, ["iPhone 7", "Apple TV", "iPad Pro", "Apple rumour", "accessories"]), v.on("click", function() {
            var e = $(this);
            e.hasClass("no-record-s") && 1024 > h || e.hasClass("no-record-l") && h > 1024 || (e.hasClass("open") ? n() : i(e))
        }), v.on("mouseenter", function() {
            var e = $(this);
            e.hasClass("on-click") || e.hasClass("no-record-s") && 1024 > h || e.hasClass("no-record-l") && h > 1024 || i(e)
        }), g.on("click", n), g.on("mouseenter", n), w.on("click", function(e) {
            e.stopPropagation(), n()
        }), f.resize(e)
    }
}

function appDemo() {
    function e() {
        R[q].addClass("load")
    }

    function t() {
        R[q].removeClass("load")
    }

    function n() {
        var e = O.find(".js-demo-text").length;
        o(e ? 250 * e + 1e3 : 5e3)
    }

    function i() {
        o(0 == U ? 2e3 : 4e3)
    }

    function r() {
        A = $(".js-demo-play").index(O.find(".js-demo-play")), B = !0;
        var e = q;
        o(), C.playAppPlay(A, function() {
            e == q && F && a()
        })
    }

    function o(e) {
        t(), O.addClass("show"), e && (x = setTimeout(a, e))
    }

    function a() {
        O.removeClass("show"), U++, l()
    }

    function s(e) {
        e instanceof jQuery || (e = $(e)), e.addClass("hidden"), U++, l()
    }

    function l() {
        if (F) {
            U >= D[q].length && (U = 0), O = D[q].eq(U);
            var t = O.data("type").toLowerCase();
            e(), t ? "img" == t ? loadImages(O, i, function() {
                s(O)
            }) : "text" == t ? n() : "video" == t && r() : (console.log("Missing data-type attribute. I hide and skip that element."), s(O))
        }
    }

    function c(e) {
        F || (e != q && (q = e, U = 0), F = !0, l())
    }

    function u() {
        F = !1, "undefined" != typeof O && O.removeClass("show"), B && (B = !1, C.stopAppPlay(A)), clearTimeout(x)
    }

    function d(e) {
        M[e].addClass("open"), c(e)
    }

    function h(e) {
        e == q && q >= 0 && (M[e].removeClass("open"), u())
    }

    function p(e) {
        M[e].hasClass("open") ? h(e) : (-1 !== q && h(q), d(e))
    }

    function f() {
        for (var e = 0; e < w.length; e++) M.push(P.eq(e).find(".js-demo")), N.push(P.eq(e).find(".js-demo-btn")), R.push(P.eq(e).find(".js-demo-loader")), D.push(P.eq(e).find(".js-demo-elem")), L.push(P.eq(e).find(".js-demo-icon")),
            function(e) {
                N[e].on("click", function() {
                    p(e)
                })
            }(e);
        m()
    }

    function m() {
        S = [], E = [];
        for (var e = 0; e < w.length; e++) S.push(M[e].offset().top), E.push(M[e].height());
        k = I.height()
    }

    function v(e) {
        function t() {
            clearInterval(j), H == W.length - 1 ? d(e) : (L[e].eq(W[H]).removeClass("active"), H++, L[e].eq(W[H]).addClass("active"), j = setInterval(t, V[H]))
        }
        z || (z = !0, j = setInterval(t, V[H]))
    }

    function g(e) {
        z && e == q && q >= 0 && (z = !1, L[e].eq(W[H]).removeClass("active"), H = 0, L[e].eq(W[H]).addClass("active"), clearInterval(j))
    }
    var b = this,
        y = document.getElementsByClassName("js-ios"),
        _ = document.getElementsByClassName("js-tv"),
        w = y.length ? y : _,
        C = APPPlay("js-demo-play");
    if (w.length) {
        b.hasAppDemo = !0;
        var k, S, E, x, T, A, j, O, I = $(b),
            P = $(w),
            M = [],
            N = [],
            R = [],
            D = [],
            L = [],
            q = -1,
            U = 0,
            F = !1,
            B = !1,
            H = 0,
            z = !1,
            W = [0, 5, 6, 7],
            V = [300, 700, 180, 600];
        b.appDemoScrollHandler = function(e) {
            clearTimeout(T), T = setTimeout(function() {
                for (var t = 0; t < w.length; t++) e > S[t] + E[t] - k && e < S[t] ? (q != t || q == t && !F) && (_.length ? (q != t && (g(q), h(q), q = t, U = 0), v(t)) : p(t)) : t == q && (_.length && g(t), h(t))
            }, 100)
        }, b.reInitDemo = function(e) {
            y = document.getElementsByClassName("js-ios"), _ = document.getElementsByClassName("js-tv"), w = y.length ? y : _, P = $(w), M = [], N = [], R = [], D = [], L = [], C.refresh(e), f()
        }, f(), appDemoScrollHandler(0), I.resize(m)
    }
}! function(e, t) {
    "use strict";
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n, i = e(document);
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return e("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return e("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(e) {
            var t = n.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function() {
            e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(t, n, i) {
            var r = e.Event(n);
            return t.trigger(r, i), r.result !== !1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e[0].href
        },
        isRemote: function(e) {
            return e.data("remote") !== t && e.data("remote") !== !1
        },
        handleRemote: function(i) {
            var r, o, a, s, l, c;
            if (n.fire(i, "ajax:before")) {
                if (s = i.data("with-credentials") || null, l = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
                    r = i.data("ujs:submit-button-formmethod") || i.attr("method"), o = i.data("ujs:submit-button-formaction") || i.attr("action"), a = e(i[0]).serializeArray();
                    var u = i.data("ujs:submit-button");
                    u && (a.push(u), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null)
                }
                else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (r = i.data("method"), o = n.href(i), a = i.data("params") || null);
                return c = {
                    type: r || "GET",
                    data: a,
                    dataType: l,
                    beforeSend: function(e, r) {
                        return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), n.fire(i, "ajax:beforeSend", [e, r]) ? void i.trigger("ajax:send", e) : !1
                    },
                    success: function(e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: n.isCrossDomain(o)
                }, s && (c.xhrFields = {
                    withCredentials: s
                }), o && (c.url = o), n.ajax(c)
            }
            return !1
        },
        isCrossDomain: function(e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            }
            catch (i) {
                return !0
            }
        },
        handleMethod: function(i) {
            var r = n.href(i),
                o = i.data("method"),
                a = i.attr("target"),
                s = n.csrfToken(),
                l = n.csrfParam(),
                c = e('<form method="post" action="' + r + '"></form>'),
                u = '<input name="_method" value="' + o + '" type="hidden" />';
            l === t || s === t || n.isCrossDomain(r) || (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'), a && c.attr("target", a), c.hide().append(u).appendTo("body"), c.submit()
        },
        formElements: function(t, n) {
            return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
        },
        disableFormElements: function(t) {
            n.formElements(t, n.disableSelector).each(function() {
                n.disableFormElement(e(this))
            })
        },
        disableFormElement: function(e) {
            var n, i;
            n = e.is("button") ? "html" : "val", i = e.data("disable-with"), i !== t && (e.data("ujs:enable-with", e[n]()), e[n](i)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
        },
        enableFormElements: function(t) {
            n.formElements(t, n.enableSelector).each(function() {
                n.enableFormElement(e(this))
            })
        },
        enableFormElement: function(e) {
            var n = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
        },
        allowAction: function(e) {
            var t, i = e.data("confirm"),
                r = !1;
            if (!i) return !0;
            if (n.fire(e, "confirm")) {
                try {
                    r = n.confirm(i)
                }
                catch (o) {
                    (console.error || console.log).call(console, o.stack || o)
                }
                t = n.fire(e, "confirm:complete", [r])
            }
            return r && t
        },
        blankInputs: function(t, n, i) {
            var r, o, a, s, l = e(),
                c = n || "input,textarea",
                u = t.find(c),
                d = {};
            return u.each(function() {
                r = e(this), r.is("input[type=radio]") ? (s = r.attr("name"), d[s] || (0 === t.find('input[type=radio]:checked[name="' + s + '"]').length && (a = t.find('input[type=radio][name="' + s + '"]'), l = l.add(a)), d[s] = s)) : (o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : !!r.val(), o === i && (l = l.add(r)))
            }), l.length ? l : !1
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
        },
        disableElement: function(e) {
            var i = e.data("disable-with");
            i !== t && (e.data("ujs:enable-with", e.html()), e.html(i)), e.bind("click.railsDisable", function(e) {
                return n.stopEverything(e)
            }), e.data("ujs:disabled", !0)
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
        }
    }, n.fire(i, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }), e(window).on("pageshow.rails", function() {
        e(e.rails.enableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableFormElement(t)
        }), e(e.rails.linkDisableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableElement(t)
        })
    }), i.delegate(n.linkDisableSelector, "ajax:complete", function() {
        n.enableElement(e(this))
    }), i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
        n.enableFormElement(e(this))
    }), i.delegate(n.linkClickSelector, "click.rails", function(t) {
        var i = e(this),
            r = i.data("method"),
            o = i.data("params"),
            a = t.metaKey || t.ctrlKey;
        if (!n.allowAction(i)) return n.stopEverything(t);
        if (!a && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i)) {
            if (a && (!r || "GET" === r) && !o) return !0;
            var s = n.handleRemote(i);
            return s === !1 ? n.enableElement(i) : s.fail(function() {
                n.enableElement(i)
            }), !1
        }
        return r ? (n.handleMethod(i), !1) : void 0
    }), i.delegate(n.buttonClickSelector, "click.rails", function(t) {
        var i = e(this);
        if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(t);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var r = n.handleRemote(i);
        return r === !1 ? n.enableFormElement(i) : r.fail(function() {
            n.enableFormElement(i)
        }), !1
    }), i.delegate(n.inputChangeSelector, "change.rails", function(t) {
        var i = e(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
    }), i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
        var r, o, a = e(this),
            s = n.isRemote(a);
        if (!n.allowAction(a)) return n.stopEverything(i);
        if (a.attr("novalidate") === t)
            if (a.data("ujs:formnovalidate-button") === t) {
                if (r = n.blankInputs(a, n.requiredInputSelector, !1), r && n.fire(a, "ajax:aborted:required", [r])) return n.stopEverything(i)
            }
            else a.data("ujs:formnovalidate-button", t);
        if (s) {
            if (o = n.nonBlankInputs(a, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(a)
                }, 13);
                var l = n.fire(a, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    n.enableFormElements(a)
                }, 13), l
            }
            return n.handleRemote(a), !1
        }
        setTimeout(function() {
            n.disableFormElements(a)
        }, 13)
    }), i.delegate(n.formInputClickSelector, "click.rails", function(t) {
        var i = e(this);
        if (!n.allowAction(i)) return n.stopEverything(t);
        var r = i.attr("name"),
            o = r ? {
                name: r,
                value: i.val()
            } : null,
            a = i.closest("form");
        0 === a.length && (a = e("#" + i.attr("form"))), a.data("ujs:submit-button", o), a.data("ujs:formnovalidate-button", i.attr("formnovalidate")), a.data("ujs:submit-button-formaction", i.attr("formaction")), a.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }), i.delegate(n.formSubmitSelector, "ajax:send.rails", function(t) {
        this === t.target && n.disableFormElements(e(this))
    }), i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(t) {
        this === t.target && n.enableFormElements(e(this))
    }), e(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery);
var md5 = function(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }

    function n(e, t) {
        var n, i, r, o, a;
        return r = 2147483648 & e, o = 2147483648 & t, n = 1073741824 & e, i = 1073741824 & t, a = (1073741823 & e) + (1073741823 & t), n & i ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
    }

    function i(e, t, n) {
        return e & t | ~e & n
    }

    function r(e, t, n) {
        return e & n | t & ~n
    }

    function o(e, t, n) {
        return e ^ t ^ n
    }

    function a(e, t, n) {
        return t ^ (e | ~n)
    }

    function s(e, r, o, a, s, l, c) {
        return e = n(e, n(n(i(r, o, a), s), c)), n(t(e, l), r)
    }

    function l(e, i, o, a, s, l, c) {
        return e = n(e, n(n(r(i, o, a), s), c)), n(t(e, l), i)
    }

    function c(e, i, r, a, s, l, c) {
        return e = n(e, n(n(o(i, r, a), s), c)), n(t(e, l), i)
    }

    function u(e, i, r, o, s, l, c) {
        return e = n(e, n(n(a(i, r, o), s), c)), n(t(e, l), i)
    }

    function d(e) {
        for (var t, n = e.length, i = n + 8, r = (i - i % 64) / 64, o = 16 * (r + 1), a = Array(o - 1), s = 0, l = 0; n > l;) t = (l - l % 4) / 4, s = l % 4 * 8, a[t] = a[t] | e.charCodeAt(l) << s, l++;
        return t = (l - l % 4) / 4, s = l % 4 * 8, a[t] = a[t] | 128 << s, a[o - 2] = n << 3, a[o - 1] = n >>> 29, a
    }

    function h(e) {
        var t, n, i = "",
            r = "";
        for (n = 0; 3 >= n; n++) t = e >>> 8 * n & 255, r = "0" + t.toString(16), i += r.substr(r.length - 2, 2);
        return i
    }

    function p(e) {
        e = e.replace(/rn/g, "n");
        for (var t = "", n = 0; n < e.length; n++) {
            var i = e.charCodeAt(n);
            128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192), t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128), t += String.fromCharCode(63 & i | 128))
        }
        return t
    }
    var f, m, v, g, b, y, _, w, C, k = Array(),
        S = 7,
        E = 12,
        x = 17,
        T = 22,
        $ = 5,
        A = 9,
        j = 14,
        O = 20,
        I = 4,
        P = 11,
        M = 16,
        N = 23,
        R = 6,
        D = 10,
        L = 15,
        q = 21;
    for (e = p(e), k = d(e), y = 1732584193, _ = 4023233417, w = 2562383102, C = 271733878, f = 0; f < k.length; f += 16) m = y, v = _, g = w, b = C, y = s(y, _, w, C, k[f + 0], S, 3614090360), C = s(C, y, _, w, k[f + 1], E, 3905402710), w = s(w, C, y, _, k[f + 2], x, 606105819), _ = s(_, w, C, y, k[f + 3], T, 3250441966), y = s(y, _, w, C, k[f + 4], S, 4118548399), C = s(C, y, _, w, k[f + 5], E, 1200080426), w = s(w, C, y, _, k[f + 6], x, 2821735955), _ = s(_, w, C, y, k[f + 7], T, 4249261313), y = s(y, _, w, C, k[f + 8], S, 1770035416), C = s(C, y, _, w, k[f + 9], E, 2336552879), w = s(w, C, y, _, k[f + 10], x, 4294925233), _ = s(_, w, C, y, k[f + 11], T, 2304563134), y = s(y, _, w, C, k[f + 12], S, 1804603682), C = s(C, y, _, w, k[f + 13], E, 4254626195), w = s(w, C, y, _, k[f + 14], x, 2792965006), _ = s(_, w, C, y, k[f + 15], T, 1236535329), y = l(y, _, w, C, k[f + 1], $, 4129170786), C = l(C, y, _, w, k[f + 6], A, 3225465664), w = l(w, C, y, _, k[f + 11], j, 643717713), _ = l(_, w, C, y, k[f + 0], O, 3921069994), y = l(y, _, w, C, k[f + 5], $, 3593408605), C = l(C, y, _, w, k[f + 10], A, 38016083), w = l(w, C, y, _, k[f + 15], j, 3634488961), _ = l(_, w, C, y, k[f + 4], O, 3889429448), y = l(y, _, w, C, k[f + 9], $, 568446438), C = l(C, y, _, w, k[f + 14], A, 3275163606), w = l(w, C, y, _, k[f + 3], j, 4107603335), _ = l(_, w, C, y, k[f + 8], O, 1163531501), y = l(y, _, w, C, k[f + 13], $, 2850285829), C = l(C, y, _, w, k[f + 2], A, 4243563512), w = l(w, C, y, _, k[f + 7], j, 1735328473), _ = l(_, w, C, y, k[f + 12], O, 2368359562), y = c(y, _, w, C, k[f + 5], I, 4294588738), C = c(C, y, _, w, k[f + 8], P, 2272392833), w = c(w, C, y, _, k[f + 11], M, 1839030562), _ = c(_, w, C, y, k[f + 14], N, 4259657740), y = c(y, _, w, C, k[f + 1], I, 2763975236), C = c(C, y, _, w, k[f + 4], P, 1272893353), w = c(w, C, y, _, k[f + 7], M, 4139469664), _ = c(_, w, C, y, k[f + 10], N, 3200236656), y = c(y, _, w, C, k[f + 13], I, 681279174), C = c(C, y, _, w, k[f + 0], P, 3936430074), w = c(w, C, y, _, k[f + 3], M, 3572445317), _ = c(_, w, C, y, k[f + 6], N, 76029189), y = c(y, _, w, C, k[f + 9], I, 3654602809), C = c(C, y, _, w, k[f + 12], P, 3873151461), w = c(w, C, y, _, k[f + 15], M, 530742520), _ = c(_, w, C, y, k[f + 2], N, 3299628645), y = u(y, _, w, C, k[f + 0], R, 4096336452), C = u(C, y, _, w, k[f + 7], D, 1126891415), w = u(w, C, y, _, k[f + 14], L, 2878612391), _ = u(_, w, C, y, k[f + 5], q, 4237533241), y = u(y, _, w, C, k[f + 12], R, 1700485571), C = u(C, y, _, w, k[f + 3], D, 2399980690), w = u(w, C, y, _, k[f + 10], L, 4293915773), _ = u(_, w, C, y, k[f + 1], q, 2240044497), y = u(y, _, w, C, k[f + 8], R, 1873313359), C = u(C, y, _, w, k[f + 15], D, 4264355552), w = u(w, C, y, _, k[f + 6], L, 2734768916), _ = u(_, w, C, y, k[f + 13], q, 1309151649), y = u(y, _, w, C, k[f + 4], R, 4149444226), C = u(C, y, _, w, k[f + 11], D, 3174756917), w = u(w, C, y, _, k[f + 2], L, 718787259), _ = u(_, w, C, y, k[f + 9], q, 3951481745), y = n(y, m), _ = n(_, v), w = n(w, g), C = n(C, b);
    var U = h(y) + h(_) + h(w) + h(C);
    return U.toLowerCase()
};
! function(e, t) {
    function n(e, t, n, i, r, o, a) {
        this.video = e, this.videoSmall = t, this.png = n, this.gif = i, this.thumb = r, this.seconds = o, this.noFollow = "true" == a
    }

    function i() {
        try {
            webkit.messageHandlers.aaTestNativeApp.postMessage("Is anyone there?")
        }
        catch (e) {
            d = !1
        }
    }
    if (!t) throw "No jQuery has been detected for APPPlay.";
    var r, o, a, s, l, c = function(e, t) {
            return new c.init(e, t)
        },
        u = t(e),
        d = !0,
        h = !1,
        p = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || !1;
    e.aaSendAppInfo = function() {}, e.aaPlayVideos = function() {
        l.callFromApp()
    }, c.prototype = {
        log: function(e) {
            h && console.log(e)
        },
        refresh: function(e) {
            var i = this,
                r = i.objects.length,
                o = document.getElementsByClassName(i.mediaSelector),
                a = [];
            if (r != o.length) {
                i.elements = o;
                var s, l, c, u, d, h, p, f;
                if ("prepend" == e) {
                    for (f = 0; f < i.elements.length - r; f++) s = i.elements[f].getAttribute("data-video"), l = i.elements[f].getAttribute("data-video-s"), c = i.elements[f].getAttribute("data-apng"), u = i.elements[f].getAttribute("data-gif"), d = i.elements[f].getAttribute("data-thumb"), h = i.elements[f].getAttribute("data-seconds"), p = i.elements[f].getAttribute("data-nofollow"), a[f] = new n(s, l, c, u, d, h, p);
                    for (f = a.length - 1; f >= 0; f--) i.objects.unshift(a[f])
                }
                else
                    for (f = r; f < i.elements.length; f++) s = i.elements[f].getAttribute("data-video"), l = i.elements[f].getAttribute("data-video-s"), c = i.elements[f].getAttribute("data-apng"), u = i.elements[f].getAttribute("data-gif"), d = i.elements[f].getAttribute("data-thumb"), h = i.elements[f].getAttribute("data-seconds"), p = i.elements[f].getAttribute("data-nofollow"), i.objects[f] = new n(s, l, c, u, d, h, p);
                i.getPageInfo(), "undefined" != typeof i.eventCatchSelector && (i.eventCatchers = document.getElementsByClassName(i.eventCatchSelector), i.$eventCatchers = t(i.eventCatchers), i.$eventCatchers.on("click", function() {
                    var e = i.$eventCatchers.index(t(this));
                    i.stopAppPlays(e), i.startAppPlay(e)
                }))
            }
        },
        hasElements: function() {
            return this.elements.length
        },
        callNativeApp: function() {
            this.log("callNativeApp"), l = this, webkit.messageHandlers.aaCallNativeApp.postMessage("Please start the videos")
        },
        callFromApp: function() {
            this.log("callFromApp"), this.elements[this.appPlayToPlay].play()
        },
        getPageInfo: function() {
            var e = this,
                n = e.elements,
                i = e.objects;
            e.log("getPageInfo"), r = u.width(), o = u.height();
            for (var a = 0; a < n.length; a++) i[a].offsetTop = t(n[a]).offset().top, i[a].offsetLeft = t(n[a]).offset().left, i[a].height = t(n[a]).outerHeight(), i[a].width = t(n[a]).outerWidth()
        },
        loadMedia: function(e, n, i) {
            function r(r) {
                l.log("loadVideo: " + e), c[e].parentNode.replaceChild(r, c[e]), l.elements = document.getElementsByClassName(l.mediaSelector), u[e].state = 2, u[e].src = h, u[e].type = "video";
                var o = setInterval(function() {
                    (d && 1 == c[e].readyState || 4 == c[e].readyState) && (clearInterval(o), t(c[e]).parent().removeClass("load"), (n || l.forceStartIndex === e) && l.playAppPlay(e, i))
                }, 100)
            }

            function o() {
                l.log("loadImage: " + e + " isAPNGSupported: " + s);
                var r = s ? u[e].png : u[e].gif;
                if (r && !d) {
                    var o = new Image;
                    o.onload = function() {
                        u[e].state = 2, u[e].src = r, u[e].type = "img", t(c[e]).parent().removeClass("load"), (n || l.forceStartIndex === e) && l.playAppPlay(e, i)
                    }, o.onerror = function() {
                        u[e].state = 3, t(c[e]).parent().removeClass("load"), t(c[e]).parent().addClass("error"), console.log("Could not load image: " + e)
                    }, o.src = r
                }
            }
            var l = this,
                c = l.elements,
                u = l.objects;
            if (l.log("loadMedia " + e + ", forceStart: " + n + ", playCallback: " + i), !(e >= c.length || u[e].state))
                if (u[e].state = 1, u[e].playing = 0, t(c[e]).parent().addClass("load"), !a || d || p >= 10) {
                    var h = d || p >= 10 ? u[e].videoSmall : u[e].video;
                    if (!h) return;
                    var f = document.createElement("video");
                    f.setAttribute("class", l.mediaSelector), f.setAttribute("preload", ""), f.setAttribute("muted", ""), f.setAttribute("webkit-playsinline", ""), f.setAttribute("playsinline", ""), f.volume = 0, f.src = h;
                    var m = setInterval(function() {
                        f.readyState ? (clearTimeout(m), r(f)) : f.error && (o(), clearTimeout(m), console.log("Could not load video: " + e))
                    }, 100)
                }
                else o()
        },
        playAppPlay: function(e, n) {
            var i = this,
                r = i.elements,
                o = i.objects;
            if (i.log("playAppPlay: " + e + ", callbackForEnd: " + n), !o[e].state) return void i.loadMedia(e, !0, n);
            if (o[e].playing = 1, "img" == o[e].type) {
                if (r[e].src = o[e].src, n) {
                    var a;
                    a = s ? o[e].seconds < 6 ? 1e3 * o[e].seconds : 6e3 : 1e3 * o[e].seconds, i.imgTimeout = setTimeout(function() {
                        i.stopAppPlay(e), n()
                    }, a)
                }
            }
            else "video" == o[e].type && (d && 10 > p ? (i.appPlayToPlay = e, i.callNativeApp()) : r[e].play(), r[e].onended = function() {
                n ? n() : this.play()
            });
            setTimeout(function() {
                t(r[e]).parent().addClass("playing")
            }, 100), this.loadMedia(e + 1)
        },
        startAppPlays: function(e) {
            this.log("startAppPlays: " + e), e = "number" == typeof e ? [e] : e;
            for (var t = 0; t < e.length; t++) this.startAppPlay(e[t])
        },
        startAppPlay: function(e) {
            var t = this,
                n = t.objects;
            t.log("startAppPlay: " + e), 2 == n[e].state ? n[e].playing || t.playAppPlay(e) : 1 == n[e].state ? t.forceStartIndex = e : t.loadMedia(e, !0)
        },
        stopAppPlay: function(e) {
            var n = this,
                i = n.elements,
                r = n.objects;
            n.log("stopAppPlay: " + e), r[e].playing = 0, "img" == r[e].type ? (clearTimeout(n.imgTimeout), i[e].src = r[e].thumb) : "video" == r[e].type && i[e].pause(), t(i[e]).parent().removeClass("playing")
        },
        stopAppPlays: function(e) {
            var t = this,
                n = t.elements,
                i = t.objects;
            t.log("stopAppPlays: " + e + "(exceptions)"), e = "number" == typeof e ? [e] : e;
            for (var r = 0; r < n.length; r++) - 1 === e.indexOf(r) && i[r].playing && t.stopAppPlay(r)
        },
        scrollHandler: function(e, t) {
            clearTimeout(this.appPlayTimeout), t = t || 0;
            var n = this,
                i = n.elements,
                a = n.objects;
            this.appPlayTimeout = setTimeout(function() {
                n.log("scrollHandler: " + e + "(scrolledV) " + t + "(scrolledH)"), n.log(a);
                for (var s = [], l = 0; l < i.length; l++)
                    if (!a[l].noFollow)
                        if (768 >= r) {
                            if (e < a[l].offsetTop && e >= a[l].offsetTop - o + a[l].height && t < a[l].offsetLeft + a[l].width && t >= a[l].offsetLeft - r && (s.push(l), d)) break
                        }
                        else if (e < a[l].offsetTop && e >= a[l].offsetTop - o + a[l].height && t <= a[l].offsetLeft && t >= a[l].offsetLeft - r + a[l].width && (s.push(l), d)) break;
                n.stopAppPlays(s), s.length && n.startAppPlays(s)
            }, 100)
        }
    }, c.init = function(e, i) {
        a = Modernizr.touchevents, s = Modernizr.apng;
        var r = this;
        if (r.mediaSelector = e, r.elements = document.getElementsByClassName(e), r.objects = [], r.appPlayTimeout = "", r.imgTimeout = "", r.elements.length) {
            for (var o = 0; o < r.elements.length; o++) {
                var l = r.elements[o].getAttribute("data-video"),
                    c = r.elements[o].getAttribute("data-video-s"),
                    d = r.elements[o].getAttribute("data-apng"),
                    h = r.elements[o].getAttribute("data-gif"),
                    p = r.elements[o].getAttribute("data-thumb"),
                    f = r.elements[o].getAttribute("data-seconds"),
                    m = r.elements[o].getAttribute("data-nofollow");
                r.objects[o] = new n(l, c, d, h, p, f, m)
            }
            r.getPageInfo(), r.loadMedia(0), r.scrollHandler(0), i && (r.eventCatchSelector = i, r.eventCatchers = document.getElementsByClassName(i), r.$eventCatchers = t(r.eventCatchers), r.$eventCatchers.on("click", function() {
                var e = r.$eventCatchers.index(t(this));
                r.stopAppPlays(e), r.startAppPlay(e)
            })), u.resize(function() {
                r.getPageInfo()
            }), u.load(function() {
                r.getPageInfo()
            })
        }
    }, c.init.prototype = c.prototype, e.APPPlay = e.\u00e5 = c, i(), "undefined" != typeof AA_CONTEXT_OBJ && (p = parseFloat(AA_CONTEXT_OBJ.ios_version) || p)
}(window, jQuery);
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
    deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
    deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function(e) {
        "use strict";
        switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled) return !0;
                break;
            case "input":
                if (deviceIsIOS && "file" === e.type || e.disabled) return !0;
                break;
            case "label":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, FastClick.prototype.needsFocus = function(e) {
        "use strict";
        switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !deviceIsAndroid;
            case "input":
                switch (e.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, FastClick.prototype.sendClick = function(e, t) {
        "use strict";
        var n, i;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), i = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
    }, FastClick.prototype.determineEventType = function(e) {
        "use strict";
        return deviceIsAndroid && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, FastClick.prototype.focus = function(e) {
        "use strict";
        var t;
        deviceIsIOS && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, FastClick.prototype.updateScrollParent = function(e) {
        "use strict";
        var t, n;
        if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n, e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, FastClick.prototype.getTargetElementFromEventTarget = function(e) {
        "use strict";
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, FastClick.prototype.onTouchStart = function(e) {
        "use strict";
        var t, n, i;
        if (e.targetTouches.length > 1) return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], deviceIsIOS) {
            if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
            if (!deviceIsIOS4) {
                if (n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, FastClick.prototype.touchHasMoved = function(e) {
        "use strict";
        var t = e.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n
    }, FastClick.prototype.onTouchMove = function(e) {
        "use strict";
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, FastClick.prototype.findControl = function(e) {
        "use strict";
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, FastClick.prototype.onTouchEnd = function(e) {
        "use strict";
        var t, n, i, r, o, a = this.targetElement;
        if (!this.trackingClick) return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (o = e.changedTouches[0], a = document.elementFromPoint(o.pageX - window.pageXOffset, o.pageY - window.pageYOffset) || a, a.fastClickScrollParent = this.targetElement.fastClickScrollParent), i = a.tagName.toLowerCase(), "label" === i) {
            if (t = this.findControl(a)) {
                if (this.focus(a), deviceIsAndroid) return !1;
                a = t
            }
        }
        else if (this.needsFocus(a)) return e.timeStamp - n > 100 || deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(a), this.sendClick(a, e), deviceIsIOS && "select" === i || (this.targetElement = null, e.preventDefault()), !1);
        return deviceIsIOS && !deviceIsIOS4 && (r = a.fastClickScrollParent, r && r.fastClickLastScrollTop !== r.scrollTop) ? !0 : (this.needsClick(a) || (e.preventDefault(), this.sendClick(a, e)), !1)
    }, FastClick.prototype.onTouchCancel = function() {
        "use strict";
        this.trackingClick = !1, this.targetElement = null
    }, FastClick.prototype.onMouse = function(e) {
        "use strict";
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
    }, FastClick.prototype.onClick = function(e) {
        "use strict";
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, FastClick.prototype.destroy = function() {
        "use strict";
        var e = this.layer;
        deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, FastClick.notNeeded = function(e) {
        "use strict";
        var t, n, i;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!deviceIsAndroid) return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (deviceIsBlackBerry10 && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === e.style.msTouchAction
    }, FastClick.attach = function(e, t) {
        "use strict";
        return new FastClick(e, t)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        "use strict";
        return FastClick
    }) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick,
    /*
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     *
     * Uses the built in easing capabilities added In jQuery 1.1
     * to offer multiple easing options
     *
     * TERMS OF USE - jQuery Easing
     *
     * Open source under the BSD License.
     *
     * Copyright Ã‚Å  2008 George McGinley Smith
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     * Redistributions of source code must retain the above copyright notice, this list of
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list
     * of conditions and the following disclaimer in the documentation and/or other materials
     * provided with the distribution.
     *
     * Neither the name of the author nor the names of contributors may be used to endorse
     * or promote products derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     * OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     */
    jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, n, i, r) {
            return jQuery.easing[jQuery.easing.def](e, t, n, i, r)
        },
        easeInQuad: function(e, t, n, i, r) {
            return i * (t /= r) * t + n
        },
        easeOutQuad: function(e, t, n, i, r) {
            return -i * (t /= r) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, i, r) {
            return i * (t /= r) * t * t + n
        },
        easeOutCubic: function(e, t, n, i, r) {
            return i * ((t = t / r - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, i, r) {
            return i * (t /= r) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, i, r) {
            return -i * ((t = t / r - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, i, r) {
            return i * (t /= r) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, i, r) {
            return i * ((t = t / r - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, i, r) {
            return -i * Math.cos(t / r * (Math.PI / 2)) + i + n
        },
        easeOutSine: function(e, t, n, i, r) {
            return i * Math.sin(t / r * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, i, r) {
            return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n
        },
        easeInExpo: function(e, t, n, i, r) {
            return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n
        },
        easeOutExpo: function(e, t, n, i, r) {
            return t == r ? n + i : i * (-Math.pow(2, -10 * t / r) + 1) + n
        },
        easeInOutExpo: function(e, t, n, i, r) {
            return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, i, r) {
            return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, i, r) {
            return i * Math.sqrt(1 - (t = t / r - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, i, r) {
            return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + i;
            if (a || (a = .3 * r), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            }
            else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n
        },
        easeOutElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + i;
            if (a || (a = .3 * r), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            }
            else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return s * Math.pow(2, -10 * t) * Math.sin((t * r - o) * (2 * Math.PI) / a) + i + n
        },
        easeInOutElastic: function(e, t, n, i, r) {
            var o = 1.70158,
                a = 0,
                s = i;
            if (0 == t) return n;
            if (2 == (t /= r / 2)) return n + i;
            if (a || (a = r * (.3 * 1.5)), s < Math.abs(i)) {
                s = i;
                var o = a / 4
            }
            else var o = a / (2 * Math.PI) * Math.asin(i / s);
            return 1 > t ? -.5 * (s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a)) + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * r - o) * (2 * Math.PI) / a) * .5 + i + n
        },
        easeInBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n
        },
        easeOutBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n
        },
        easeInOutBack: function(e, t, n, i, r, o) {
            return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * (((o *= 1.525) + 1) * t - o)) + n : i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n
        },
        easeInBounce: function(e, t, n, i, r) {
            return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n
        },
        easeOutBounce: function(e, t, n, i, r) {
            return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + n : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(e, t, n, i, r) {
            return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n
        }
    }),
    /*!
     * jQuery Smooth Scroll - v1.5.5 - 2015-02-19
     * https://github.com/kswedberg/jquery-smooth-scroll
     * Copyright (c) 2015 Karl Swedberg
     * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
     */
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof module && module.exports ? require("jquery") : jQuery)
    }(function(e) {
        function t(e) {
            return e.replace(/(:|\.|\/)/g, "\\$1")
        }
        var n = "1.5.5",
            i = {},
            r = {
                exclude: [],
                excludeWithin: [],
                offset: 0,
                direction: "top",
                scrollElement: null,
                scrollTarget: null,
                beforeScroll: function() {},
                afterScroll: function() {},
                easing: "swing",
                speed: 400,
                autoCoefficient: 2,
                preventDefault: !0
            },
            o = function(t) {
                var n = [],
                    i = !1,
                    r = t.dir && "left" === t.dir ? "scrollLeft" : "scrollTop";
                return this.each(function() {
                    if (this !== document && this !== window) {
                        var t = e(this);
                        t[r]() > 0 ? n.push(this) : (t[r](1), i = t[r]() > 0, i && n.push(this), t[r](0))
                    }
                }), n.length || this.each(function() {
                    "BODY" === this.nodeName && (n = [this])
                }), "first" === t.el && n.length > 1 && (n = [n[0]]), n
            };
        e.fn.extend({
            scrollable: function(e) {
                var t = o.call(this, {
                    dir: e
                });
                return this.pushStack(t)
            },
            firstScrollable: function(e) {
                var t = o.call(this, {
                    el: "first",
                    dir: e
                });
                return this.pushStack(t)
            },
            smoothScroll: function(n, i) {
                if (n = n || {}, "options" === n) return i ? this.each(function() {
                    var t = e(this),
                        n = e.extend(t.data("ssOpts") || {}, i);
                    e(this).data("ssOpts", n)
                }) : this.first().data("ssOpts");
                var r = e.extend({}, e.fn.smoothScroll.defaults, n),
                    o = e.smoothScroll.filterPath(location.pathname);
                return this.unbind("click.smoothscroll").bind("click.smoothscroll", function(n) {
                    var i = this,
                        a = e(this),
                        s = e.extend({}, r, a.data("ssOpts") || {}),
                        l = r.exclude,
                        c = s.excludeWithin,
                        u = 0,
                        d = 0,
                        h = !0,
                        p = {},
                        f = location.hostname === i.hostname || !i.hostname,
                        m = s.scrollTarget || e.smoothScroll.filterPath(i.pathname) === o,
                        v = t(i.hash);
                    if (s.scrollTarget || f && m && v) {
                        for (; h && l.length > u;) a.is(t(l[u++])) && (h = !1);
                        for (; h && c.length > d;) a.closest(c[d++]).length && (h = !1)
                    }
                    else h = !1;
                    h && (s.preventDefault && n.preventDefault(), e.extend(p, s, {
                        scrollTarget: s.scrollTarget || v,
                        link: i
                    }), e.smoothScroll(p))
                }), this
            }
        }), e.smoothScroll = function(t, n) {
            if ("options" === t && "object" == typeof n) return e.extend(i, n);
            var r, o, a, s, l, c = 0,
                u = "offset",
                d = "scrollTop",
                h = {},
                p = {};
            "number" == typeof t ? (r = e.extend({
                link: null
            }, e.fn.smoothScroll.defaults, i), a = t) : (r = e.extend({
                link: null
            }, e.fn.smoothScroll.defaults, t || {}, i), r.scrollElement && (u = "position", "static" === r.scrollElement.css("position") && r.scrollElement.css("position", "relative"))), d = "left" === r.direction ? "scrollLeft" : d, r.scrollElement ? (o = r.scrollElement, /^(?:HTML|BODY)$/.test(o[0].nodeName) || (c = o[d]())) : o = e("html, body").firstScrollable(r.direction), r.beforeScroll.call(o, r), a = "number" == typeof t ? t : n || e(r.scrollTarget)[u]() && e(r.scrollTarget)[u]()[r.direction] || 0, h[d] = a + c + r.offset, s = r.speed, "auto" === s && (l = h[d] - o.scrollTop(), 0 > l && (l *= -1), s = l / r.autoCoefficient), p = {
                duration: s,
                easing: r.easing,
                complete: function() {
                    r.afterScroll.call(r.link, r)
                }
            }, r.step && (p.step = r.step), o.length ? o.stop().animate(h, p) : r.afterScroll.call(r.link, r)
        }, e.smoothScroll.version = n, e.smoothScroll.filterPath = function(e) {
            return e = e || "", e.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
        }, e.fn.smoothScroll.defaults = r
    }),
    function(e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
    }(function(e) {
        function t(t) {
            return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = c), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function() {
                var i = e(this),
                    r = i.data(T);
                r || (r = new n(this, t), i.data(T, r))
            })
        }

        function n(t, n) {
            function $(t) {
                if (!(ce() || e(t.target).closest(n.excludedElements, ze).length > 0)) {
                    var i, r = t.originalEvent ? t.originalEvent : t,
                        o = S ? r.touches[0] : r;
                    return We = _, S ? Ve = r.touches.length : t.preventDefault(), Ne = 0, Re = null, Be = null, De = 0, Le = 0, qe = 0, Ue = 1, Fe = 0, Ye = fe(), He = ge(), se(), !S || Ve === n.fingers || n.fingers === b || H() ? (de(0, o), Xe = xe(), 2 == Ve && (de(1, r.touches[1]), Le = qe = _e(Ye[0].start, Ye[1].start)), (n.swipeStatus || n.pinchStatus) && (i = N(r, We))) : i = !1, i === !1 ? (We = k, N(r, We), i) : (n.hold && (et = setTimeout(e.proxy(function() {
                        ze.trigger("hold", [r.target]), n.hold && (i = n.hold.call(ze, r, r.target))
                    }, this), n.longTapThreshold)), ue(!0), null)
                }
            }

            function A(e) {
                var t = e.originalEvent ? e.originalEvent : e;
                if (We !== C && We !== k && !le()) {
                    var i, r = S ? t.touches[0] : t,
                        o = he(r);
                    if (Ke = xe(), S && (Ve = t.touches.length), n.hold && clearTimeout(et), We = w, 2 == Ve && (0 == Le ? (de(1, t.touches[1]), Le = qe = _e(Ye[0].start, Ye[1].start)) : (he(t.touches[1]), qe = _e(Ye[0].end, Ye[1].end), Be = Ce(Ye[0].end, Ye[1].end)), Ue = we(Le, qe), Fe = Math.abs(Le - qe)), Ve === n.fingers || n.fingers === b || !S || H()) {
                        if (Re = Ee(o.start, o.end), F(e, Re), Ne = ke(o.start, o.end), De = ye(), me(Re, Ne), (n.swipeStatus || n.pinchStatus) && (i = N(t, We)), !n.triggerOnTouchEnd || n.triggerOnTouchLeave) {
                            var a = !0;
                            if (n.triggerOnTouchLeave) {
                                var s = Te(this);
                                a = $e(o.end, s)
                            }!n.triggerOnTouchEnd && a ? We = M(w) : n.triggerOnTouchLeave && !a && (We = M(C)), We != k && We != C || N(t, We)
                        }
                    }
                    else We = k, N(t, We);
                    i === !1 && (We = k, N(t, We))
                }
            }

            function j(e) {
                var t = e.originalEvent;
                return S && t.touches.length > 0 ? (ae(), !0) : (le() && (Ve = Je), Ke = xe(), De = ye(), L() || !D() ? (We = k, N(t, We)) : n.triggerOnTouchEnd || 0 == n.triggerOnTouchEnd && We === w ? (e.preventDefault(), We = C, N(t, We)) : !n.triggerOnTouchEnd && Q() ? (We = C, R(t, We, p)) : We === w && (We = k, N(t, We)), ue(!1), null)
            }

            function O() {
                Ve = 0, Ke = 0, Xe = 0, Le = 0, qe = 0, Ue = 1, se(), ue(!1)
            }

            function I(e) {
                var t = e.originalEvent;
                n.triggerOnTouchLeave && (We = M(C), N(t, We))
            }

            function P() {
                ze.unbind(je, $), ze.unbind(Me, O), ze.unbind(Oe, A), ze.unbind(Ie, j), Pe && ze.unbind(Pe, I), ue(!1)
            }

            function M(e) {
                var t = e,
                    i = U(),
                    r = D(),
                    o = L();
                return !i || o ? t = k : !r || e != w || n.triggerOnTouchEnd && !n.triggerOnTouchLeave ? !r && e == C && n.triggerOnTouchLeave && (t = k) : t = C, t
            }

            function N(e, t) {
                var n = void 0;
                return Y() || V() ? n = R(e, t, d) : (z() || H()) && n !== !1 && (n = R(e, t, h)), re() && n !== !1 ? n = R(e, t, f) : oe() && n !== !1 ? n = R(e, t, m) : ie() && n !== !1 && (n = R(e, t, p)), t === k && O(e), t === C && (S ? 0 == e.touches.length && O(e) : O(e)), n
            }

            function R(t, c, u) {
                var v = void 0;
                if (u == d) {
                    if (ze.trigger("swipeStatus", [c, Re || null, Ne || 0, De || 0, Ve, Ye]), n.swipeStatus && (v = n.swipeStatus.call(ze, t, c, Re || null, Ne || 0, De || 0, Ve, Ye), v === !1)) return !1;
                    if (c == C && W()) {
                        if (ze.trigger("swipe", [Re, Ne, De, Ve, Ye]), n.swipe && (v = n.swipe.call(ze, t, Re, Ne, De, Ve, Ye), v === !1)) return !1;
                        switch (Re) {
                            case i:
                                ze.trigger("swipeLeft", [Re, Ne, De, Ve, Ye]), n.swipeLeft && (v = n.swipeLeft.call(ze, t, Re, Ne, De, Ve, Ye));
                                break;
                            case r:
                                ze.trigger("swipeRight", [Re, Ne, De, Ve, Ye]), n.swipeRight && (v = n.swipeRight.call(ze, t, Re, Ne, De, Ve, Ye));
                                break;
                            case o:
                                ze.trigger("swipeUp", [Re, Ne, De, Ve, Ye]), n.swipeUp && (v = n.swipeUp.call(ze, t, Re, Ne, De, Ve, Ye));
                                break;
                            case a:
                                ze.trigger("swipeDown", [Re, Ne, De, Ve, Ye]), n.swipeDown && (v = n.swipeDown.call(ze, t, Re, Ne, De, Ve, Ye))
                        }
                    }
                }
                if (u == h) {
                    if (ze.trigger("pinchStatus", [c, Be || null, Fe || 0, De || 0, Ve, Ue, Ye]), n.pinchStatus && (v = n.pinchStatus.call(ze, t, c, Be || null, Fe || 0, De || 0, Ve, Ue, Ye), v === !1)) return !1;
                    if (c == C && B()) switch (Be) {
                        case s:
                            ze.trigger("pinchIn", [Be || null, Fe || 0, De || 0, Ve, Ue, Ye]), n.pinchIn && (v = n.pinchIn.call(ze, t, Be || null, Fe || 0, De || 0, Ve, Ue, Ye));
                            break;
                        case l:
                            ze.trigger("pinchOut", [Be || null, Fe || 0, De || 0, Ve, Ue, Ye]), n.pinchOut && (v = n.pinchOut.call(ze, t, Be || null, Fe || 0, De || 0, Ve, Ue, Ye))
                    }
                }
                return u == p ? c !== k && c !== C || (clearTimeout(Ze), clearTimeout(et), J() && !ee() ? (Ge = xe(), Ze = setTimeout(e.proxy(function() {
                    Ge = null, ze.trigger("tap", [t.target]), n.tap && (v = n.tap.call(ze, t, t.target))
                }, this), n.doubleTapThreshold)) : (Ge = null, ze.trigger("tap", [t.target]), n.tap && (v = n.tap.call(ze, t, t.target)))) : u == f ? c !== k && c !== C || (clearTimeout(Ze), Ge = null, ze.trigger("doubletap", [t.target]), n.doubleTap && (v = n.doubleTap.call(ze, t, t.target))) : u == m && (c !== k && c !== C || (clearTimeout(Ze), Ge = null, ze.trigger("longtap", [t.target]), n.longTap && (v = n.longTap.call(ze, t, t.target)))), v
            }

            function D() {
                var e = !0;
                return null !== n.threshold && (e = Ne >= n.threshold), e
            }

            function L() {
                var e = !1;
                return null !== n.cancelThreshold && null !== Re && (e = ve(Re) - Ne >= n.cancelThreshold), e
            }

            function q() {
                return null !== n.pinchThreshold ? Fe >= n.pinchThreshold : !0
            }

            function U() {
                var e;
                return e = n.maxTimeThreshold ? !(De >= n.maxTimeThreshold) : !0
            }

            function F(e, t) {
                if (n.allowPageScroll === c || H()) e.preventDefault();
                else {
                    var s = n.allowPageScroll === u;
                    switch (t) {
                        case i:
                            (n.swipeLeft && s || !s && n.allowPageScroll != v) && e.preventDefault();
                            break;
                        case r:
                            (n.swipeRight && s || !s && n.allowPageScroll != v) && e.preventDefault();
                            break;
                        case o:
                            (n.swipeUp && s || !s && n.allowPageScroll != g) && e.preventDefault();
                            break;
                        case a:
                            (n.swipeDown && s || !s && n.allowPageScroll != g) && e.preventDefault()
                    }
                }
            }

            function B() {
                var e = X(),
                    t = K(),
                    n = q();
                return e && t && n
            }

            function H() {
                return !!(n.pinchStatus || n.pinchIn || n.pinchOut)
            }

            function z() {
                return !(!B() || !H())
            }

            function W() {
                var e = U(),
                    t = D(),
                    n = X(),
                    i = K(),
                    r = L(),
                    o = !r && i && n && t && e;
                return o
            }

            function V() {
                return !!(n.swipe || n.swipeStatus || n.swipeLeft || n.swipeRight || n.swipeUp || n.swipeDown)
            }

            function Y() {
                return !(!W() || !V())
            }

            function X() {
                return Ve === n.fingers || n.fingers === b || !S
            }

            function K() {
                return 0 !== Ye[0].end.x
            }

            function Q() {
                return !!n.tap
            }

            function J() {
                return !!n.doubleTap
            }

            function G() {
                return !!n.longTap
            }

            function Z() {
                if (null == Ge) return !1;
                var e = xe();
                return J() && e - Ge <= n.doubleTapThreshold
            }

            function ee() {
                return Z()
            }

            function te() {
                return (1 === Ve || !S) && (isNaN(Ne) || Ne < n.threshold)
            }

            function ne() {
                return De > n.longTapThreshold && y > Ne
            }

            function ie() {
                return !(!te() || !Q())
            }

            function re() {
                return !(!Z() || !J())
            }

            function oe() {
                return !(!ne() || !G())
            }

            function ae() {
                Qe = xe(), Je = event.touches.length + 1
            }

            function se() {
                Qe = 0, Je = 0
            }

            function le() {
                var e = !1;
                if (Qe) {
                    var t = xe() - Qe;
                    t <= n.fingerReleaseThreshold && (e = !0)
                }
                return e
            }

            function ce() {
                return !(ze.data(T + "_intouch") !== !0)
            }

            function ue(e) {
                e === !0 ? (ze.bind(Oe, A), ze.bind(Ie, j), Pe && ze.bind(Pe, I)) : (ze.unbind(Oe, A, !1), ze.unbind(Ie, j, !1), Pe && ze.unbind(Pe, I, !1)), ze.data(T + "_intouch", e === !0)
            }

            function de(e, t) {
                var n = void 0 !== t.identifier ? t.identifier : 0;
                return Ye[e].identifier = n, Ye[e].start.x = Ye[e].end.x = t.pageX || t.clientX, Ye[e].start.y = Ye[e].end.y = t.pageY || t.clientY, Ye[e]
            }

            function he(e) {
                var t = void 0 !== e.identifier ? e.identifier : 0,
                    n = pe(t);
                return n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
            }

            function pe(e) {
                for (var t = 0; t < Ye.length; t++)
                    if (Ye[t].identifier == e) return Ye[t]
            }

            function fe() {
                for (var e = [], t = 0; 5 >= t; t++) e.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return e
            }

            function me(e, t) {
                t = Math.max(t, ve(e)), He[e].distance = t
            }

            function ve(e) {
                return He[e] ? He[e].distance : void 0
            }

            function ge() {
                var e = {};
                return e[i] = be(i), e[r] = be(r), e[o] = be(o), e[a] = be(a), e
            }

            function be(e) {
                return {
                    direction: e,
                    distance: 0
                }
            }

            function ye() {
                return Ke - Xe
            }

            function _e(e, t) {
                var n = Math.abs(e.x - t.x),
                    i = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(n * n + i * i))
            }

            function we(e, t) {
                var n = t / e * 1;
                return n.toFixed(2)
            }

            function Ce() {
                return 1 > Ue ? l : s
            }

            function ke(e, t) {
                return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
            }

            function Se(e, t) {
                var n = e.x - t.x,
                    i = t.y - e.y,
                    r = Math.atan2(i, n),
                    o = Math.round(180 * r / Math.PI);
                return 0 > o && (o = 360 - Math.abs(o)), o
            }

            function Ee(e, t) {
                var n = Se(e, t);
                return 45 >= n && n >= 0 ? i : 360 >= n && n >= 315 ? i : n >= 135 && 225 >= n ? r : n > 45 && 135 > n ? a : o
            }

            function xe() {
                var e = new Date;
                return e.getTime()
            }

            function Te(t) {
                t = e(t);
                var n = t.offset(),
                    i = {
                        left: n.left,
                        right: n.left + t.outerWidth(),
                        top: n.top,
                        bottom: n.top + t.outerHeight()
                    };
                return i
            }

            function $e(e, t) {
                return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
            }
            var Ae = S || x || !n.fallbackToMouseEvents,
                je = Ae ? x ? E ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                Oe = Ae ? x ? E ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                Ie = Ae ? x ? E ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                Pe = Ae ? null : "mouseleave",
                Me = x ? E ? "MSPointerCancel" : "pointercancel" : "touchcancel",
                Ne = 0,
                Re = null,
                De = 0,
                Le = 0,
                qe = 0,
                Ue = 1,
                Fe = 0,
                Be = 0,
                He = null,
                ze = e(t),
                We = "start",
                Ve = 0,
                Ye = null,
                Xe = 0,
                Ke = 0,
                Qe = 0,
                Je = 0,
                Ge = 0,
                Ze = null,
                et = null;
            try {
                ze.bind(je, $), ze.bind(Me, O)
            }
            catch (tt) {
                e.error("events not supported " + je + "," + Me + " on jQuery.swipe")
            }
            this.enable = function() {
                return ze.bind(je, $), ze.bind(Me, O), ze
            }, this.disable = function() {
                return P(), ze
            }, this.destroy = function() {
                return P(), ze.data(T, null), ze
            }, this.option = function(t, i) {
                if (void 0 !== n[t]) {
                    if (void 0 === i) return n[t];
                    n[t] = i
                }
                else e.error("Option " + t + " does not exist on jQuery.swipe.options");
                return null
            }
        }
        var i = "left",
            r = "right",
            o = "up",
            a = "down",
            s = "in",
            l = "out",
            c = "none",
            u = "auto",
            d = "swipe",
            h = "pinch",
            p = "tap",
            f = "doubletap",
            m = "longtap",
            v = "horizontal",
            g = "vertical",
            b = "all",
            y = 10,
            _ = "start",
            w = "move",
            C = "end",
            k = "cancel",
            S = "ontouchstart" in window,
            E = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            x = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            T = "TouchSwipe",
            $ = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe"
            };
        e.fn.swipe = function(n) {
            var i = e(this),
                r = i.data(T);
            if (r && "string" == typeof n) {
                if (r[n]) return r[n].apply(this, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + n + " does not exist on jQuery.swipe")
            }
            else if (!(r || "object" != typeof n && n)) return t.apply(this, arguments);
            return i
        }, e.fn.swipe.defaults = $, e.fn.swipe.phases = {
            PHASE_START: _,
            PHASE_MOVE: w,
            PHASE_END: C,
            PHASE_CANCEL: k
        }, e.fn.swipe.directions = {
            LEFT: i,
            RIGHT: r,
            UP: o,
            DOWN: a,
            IN: s,
            OUT: l
        }, e.fn.swipe.pageScroll = {
            NONE: c,
            HORIZONTAL: v,
            VERTICAL: g,
            AUTO: u
        }, e.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: b
        }
    }), ! function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        "use strict";
        var t = window.Slick || {};
        t = function() {
            function t(t, i) {
                var r, o, a, s = this;
                if (s.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: e(t),
                        appendDots: e(t),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return '<button type="button" data-role="none">' + (t + 1) + "</button>"
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rtl: !1,
                        slide: "",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        variableWidth: !1,
                        vertical: !1,
                        waitForAnimate: !0
                    }, s.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1
                    }, e.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.hidden = "hidden", s.paused = !1, s.positionProp = null, s.respondTo = null, s.shouldClick = !0, s.$slider = e(t), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, r = e(t).data("slick") || {}, s.options = e.extend({}, s.defaults, r, i), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, o = s.options.responsive || null, o && o.length > -1) {
                    s.respondTo = s.options.respondTo || "window";
                    for (a in o) o.hasOwnProperty(a) && (s.breakpoints.push(o[a].breakpoint), s.breakpointSettings[o[a].breakpoint] = o[a].settings);
                    s.breakpoints.sort(function(e, t) {
                        return s.options.mobileFirst === !0 ? e - t : t - e
                    })
                }
                "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (s.hidden = "msHidden", s.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = e.proxy(s.autoPlay, s), s.autoPlayClear = e.proxy(s.autoPlayClear, s), s.changeSlide = e.proxy(s.changeSlide, s), s.clickHandler = e.proxy(s.clickHandler, s), s.selectHandler = e.proxy(s.selectHandler, s), s.setPosition = e.proxy(s.setPosition, s), s.swipeHandler = e.proxy(s.swipeHandler, s), s.dragHandler = e.proxy(s.dragHandler, s), s.keyHandler = e.proxy(s.keyHandler, s), s.autoPlayIterator = e.proxy(s.autoPlayIterator, s), s.instanceUid = n++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.init(), s.checkResponsive()
            }
            var n = 0;
            return t
        }(), t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
            var r = this;
            if ("boolean" == typeof n) i = n, n = null;
            else if (0 > n || n >= r.slideCount) return !1;
            r.unload(), "number" == typeof n ? 0 === n && 0 === r.$slides.length ? e(t).appendTo(r.$slideTrack) : i ? e(t).insertBefore(r.$slides.eq(n)) : e(t).insertAfter(r.$slides.eq(n)) : i === !0 ? e(t).prependTo(r.$slideTrack) : e(t).appendTo(r.$slideTrack), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t)
            }), r.$slidesCache = r.$slides, r.reinit()
        }, t.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, t.prototype.animateSlide = function(t, n) {
            var i = {},
                r = this;
            r.animateHeight(), r.options.rtl === !0 && r.options.vertical === !1 && (t = -t), r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
                left: t
            }, r.options.speed, r.options.easing, n) : r.$slideTrack.animate({
                top: t
            }, r.options.speed, r.options.easing, n) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft), e({
                animStart: r.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: r.options.speed,
                easing: r.options.easing,
                step: function(e) {
                    e = Math.ceil(e), r.options.vertical === !1 ? (i[r.animType] = "translate(" + e + "px, 0px)", r.$slideTrack.css(i)) : (i[r.animType] = "translate(0px," + e + "px)", r.$slideTrack.css(i))
                },
                complete: function() {
                    n && n.call()
                }
            })) : (r.applyTransition(), t = Math.ceil(t), i[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(i), n && setTimeout(function() {
                r.disableTransition(), n.call()
            }, r.options.speed))
        }, t.prototype.asNavFor = function(t) {
            var n = this,
                i = null !== n.options.asNavFor ? e(n.options.asNavFor).slick("getSlick") : null;
            null !== i && i.slideHandler(t, !0)
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                n = {};
            n[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this;
            e.options.infinite === !1 ? 1 === e.direction ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (0 === e.currentSlide - 1 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
        }, t.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow = e(t.options.prevArrow), t.$nextArrow = e(t.options.nextArrow), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.appendTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled"))
        }, t.prototype.buildDots = function() {
            var t, n, i = this;
            if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
                for (n = '<ul class="' + i.options.dotsClass + '">', t = 0; t <= i.getDotCount(); t += 1) n += "<li>" + i.options.customPaging.call(this, i, t) + "</li>";
                n += "</ul>", i.$dots = e(n).appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t)
            }), t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode === !0 && (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.options.accessibility === !0 && t.$list.prop("tabIndex", 0), t.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
        }, t.prototype.checkResponsive = function() {
            var t, n, i, r = this,
                o = r.$slider.width(),
                a = window.innerWidth || e(window).width();
            if ("window" === r.respondTo ? i = a : "slider" === r.respondTo ? i = o : "min" === r.respondTo && (i = Math.min(a, o)), r.originalSettings.responsive && r.originalSettings.responsive.length > -1 && null !== r.originalSettings.responsive) {
                n = null;
                for (t in r.breakpoints) r.breakpoints.hasOwnProperty(t) && (r.originalSettings.mobileFirst === !1 ? i < r.breakpoints[t] && (n = r.breakpoints[t]) : i > r.breakpoints[t] && (n = r.breakpoints[t]));
                null !== n ? null !== r.activeBreakpoint ? n !== r.activeBreakpoint && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]), r.refresh())) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]), r.refresh())) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, r.refresh())
            }
        }, t.prototype.changeSlide = function(t, n) {
            var i, r, o, a = this,
                s = e(t.target);
            switch (s.is("a") && t.preventDefault(), o = 0 !== a.slideCount % a.options.slidesToScroll, i = o ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll, t.data.message) {
                case "previous":
                    r = 0 === i ? a.options.slidesToScroll : a.options.slidesToShow - i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - r, !1, n);
                    break;
                case "next":
                    r = 0 === i ? a.options.slidesToScroll : i, a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + r, !1, n);
                    break;
                case "index":
                    var l = 0 === t.data.index ? 0 : t.data.index || e(t.target).parent().index() * a.options.slidesToScroll;
                    a.slideHandler(a.checkNavigable(l), !1, n);
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, n, i = this;
            if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
            else
                for (var r in t) {
                    if (e < t[r]) {
                        e = n;
                        break
                    }
                    n = t[r]
                }
            return e
        }, t.prototype.clickHandler = function(e) {
            var t = this;
            t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, t.prototype.destroy = function() {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("data-slick-index").css({
                position: "",
                left: "",
                top: "",
                zIndex: "",
                opacity: "",
                width: ""
            }), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$list.off(".slick"), e(window).off(".slick-" + t.instanceUid), e(document).off(".slick-" + t.instanceUid), t.$slider.html(t.$slides)
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                n = {};
            n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.fadeSlide = function(e, t) {
            var n = this;
            n.cssTransitions === !1 ? (n.$slides.eq(e).css({
                zIndex: 1e3
            }), n.$slides.eq(e).animate({
                opacity: 1
            }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
                opacity: 1,
                zIndex: 1e3
            }), t && setTimeout(function() {
                n.disableTransition(e), t.call()
            }, n.options.speed))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            var e = this;
            return e.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                n = 0,
                i = 0;
            if (e.options.infinite === !0) i = Math.ceil(e.slideCount / e.options.slidesToScroll);
            else if (e.options.centerMode === !0) i = e.slideCount;
            else
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return i - 1
        }, t.prototype.getLeft = function(e) {
            var t, n, i, r = this,
                o = 0;
            return r.slideOffset = 0, n = r.$slides.first().outerHeight(), r.options.infinite === !0 ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = -1 * r.slideWidth * r.options.slidesToShow, o = -1 * n * r.options.slidesToShow), 0 !== r.slideCount % r.options.slidesToScroll && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = -1 * (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth, o = -1 * (r.options.slidesToShow - (e - r.slideCount)) * n) : (r.slideOffset = -1 * r.slideCount % r.options.slidesToScroll * r.slideWidth, o = -1 * r.slideCount % r.options.slidesToScroll * n))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, o = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, o = 0), r.options.centerMode === !0 && r.options.infinite === !0 ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : r.options.centerMode === !0 && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = r.options.vertical === !1 ? -1 * e * r.slideWidth + r.slideOffset : -1 * e * n + o, r.options.variableWidth === !0 && (i = r.slideCount <= r.options.slidesToShow || r.options.infinite === !1 ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = i[0] ? -1 * i[0].offsetLeft : 0, r.options.centerMode === !0 && (i = r.options.infinite === !1 ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            var t = this;
            return t.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e = this,
                t = 0,
                n = 0,
                i = [],
                r = e.options.infinite === !1 ? e.slideCount - e.options.slidesToShow + 1 : e.slideCount;
            for (e.options.centerMode === !0 && (r = e.slideCount); r > t;) i.push(t), t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return i
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var t, n, i, r = this;
            return i = r.options.centerMode === !0 ? r.slideWidth * Math.floor(r.options.slidesToShow / 2) : 0, r.options.swipeToSlide === !0 ? (r.$slideTrack.find(".slick-slide").each(function(t, o) {
                return o.offsetLeft - i + e(o).outerWidth() / 2 > -1 * r.swipeLeft ? (n = o, !1) : void 0
            }), t = Math.abs(e(n).attr("data-slick-index") - r.currentSlide) || 1) : r.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            var n = this;
            n.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function() {
            var t = this;
            e(t.$slider).hasClass("slick-initialized") || (e(t.$slider).addClass("slick-initialized"), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots()), t.$slider.trigger("init", [t])
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).on("mouseenter.slick", function() {
                t.paused = !0, t.autoPlayClear()
            }).on("mouseleave.slick", function() {
                t.paused = !1, t.autoPlay()
            })
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), t.options.autoplay === !0 && (e(document).on(t.visibilityChange, function() {
                t.visibility()
            }), t.options.pauseOnHover === !0 && (t.$list.on("mouseenter.slick", function() {
                t.paused = !0, t.autoPlayClear()
            }), t.$list.on("mouseleave.slick", function() {
                t.paused = !1, t.autoPlay()
            }))), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.options.slide, t.$slideTrack).on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, function() {
                t.checkResponsive(), t.setPosition()
            }), e(window).on("resize.slick.slick-" + t.instanceUid, function() {
                e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                    t.windowWidth = e(window).width(), t.checkResponsive(), t.setPosition()
                }, 50))
            }), e("*[draggable!=true]", t.$slideTrack).on("dragstart", function(e) {
                e.preventDefault()
            }), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.lazyLoad = function() {
            function t(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        n = e(this).attr("data-lazy");
                    t.load(function() {
                        t.animate({
                            opacity: 1
                        }, 200)
                    }).css({
                        opacity: 0
                    }).attr("src", n).removeAttr("data-lazy").removeClass("slick-loading")
                })
            }
            var n, i, r, o, a = this;
            a.options.centerMode === !0 ? a.options.infinite === !0 ? (r = a.currentSlide + (a.options.slidesToShow / 2 + 1), o = r + a.options.slidesToShow + 2) : (r = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), o = 2 + (a.options.slidesToShow / 2 + 1) + a.currentSlide) : (r = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, o = r + a.options.slidesToShow, a.options.fade === !0 && (r > 0 && r--, o <= a.slideCount && o++)), n = a.$slider.find(".slick-slide").slice(r, o), t(n), a.slideCount <= a.options.slidesToShow ? (i = a.$slider.find(".slick-slide"), t(i)) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? (i = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow), t(i)) : 0 === a.currentSlide && (i = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow), t(i))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.paused = !1, e.autoPlay()
        }, t.prototype.postSlide = function(e) {
            var t = this;
            t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay()
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.progressiveLazyLoad = function() {
            var t, n, i = this;
            t = e("img[data-lazy]", i.$slider).length, t > 0 && (n = e("img[data-lazy]", i.$slider).first(), n.attr("src", n.attr("data-lazy")).removeClass("slick-loading").load(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad()
            }).error(function() {
                n.removeAttr("data-lazy"), i.progressiveLazyLoad()
            }))
        }, t.prototype.refresh = function() {
            var t = this,
                n = t.currentSlide;
            t.destroy(), e.extend(t, t.initials), t.init(), t.changeSlide({
                data: {
                    message: "index",
                    index: n
                }
            }, !0)
        }, t.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.options.focusOnSelect === !0 && e(t.options.slide, t.$slideTrack).on("click.slick", t.selectHandler), t.setSlideClasses(0), t.setPosition(), t.$slider.trigger("reInit", [t]);
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
            var i = this;
            return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount - 1) : e = t === !0 ? --e : e, i.slideCount < 1 || 0 > e || e > i.slideCount - 1 ? !1 : (i.unload(), n === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, n, i = this,
                r = {};
            i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", r[i.positionProp] = e, i.transformsEnabled === !1 ? i.$slideTrack.css(r) : (r = {}, i.cssTransitions === !1 ? (r[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(r)) : (r[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(r)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            if (e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
                    padding: "0px " + e.options.centerPadding
                }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
                    padding: e.options.centerPadding + " 0px"
                })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1) e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
            else if (e.options.variableWidth === !0) {
                var t = 0;
                e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.children(".slick-slide").each(function() {
                    t += e.listWidth
                }), e.$slideTrack.width(Math.ceil(t) + 1)
            }
            else e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length));
            var n = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - n)
        }, t.prototype.setFade = function() {
            var t, n = this;
            n.$slides.each(function(i, r) {
                t = -1 * n.slideWidth * i, n.options.rtl === !0 ? e(r).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                }) : e(r).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: 900,
                opacity: 1
            })
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, t.prototype.setOption = t.prototype.slickSetOption = function(e, t, n) {
            var i = this;
            i.options[e] = t, n === !0 && (i.unload(), i.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && e.options.useCSS === !0 && (e.cssTransitions = !0), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = null !== e.animType && e.animType !== !1
        }, t.prototype.setSlideClasses = function(e) {
            var t, n, i, r, o = this;
            o.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), n = o.$slider.find(".slick-slide"), o.options.centerMode === !0 ? (t = Math.floor(o.options.slidesToShow / 2), o.options.infinite === !0 && (e >= t && e <= o.slideCount - 1 - t ? o.$slides.slice(e - t, e + t + 1).addClass("slick-active") : (i = o.options.slidesToShow + e, n.slice(i - t + 1, i + t + 2).addClass("slick-active")), 0 === e ? n.eq(n.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && n.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active") : n.length <= o.options.slidesToShow ? n.addClass("slick-active") : (r = o.slideCount % o.options.slidesToShow, i = o.options.infinite === !0 ? o.options.slidesToShow + e : e, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? n.slice(i - (o.options.slidesToShow - r), i + r).addClass("slick-active") : n.slice(i, i + o.options.slidesToShow).addClass("slick-active")), "ondemand" === o.options.lazyLoad && o.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, n, i, r = this;
            if (r.options.fade === !0 && (r.options.centerMode = !1), r.options.infinite === !0 && r.options.fade === !1 && (n = null, r.slideCount > r.options.slidesToShow)) {
                for (i = r.options.centerMode === !0 ? r.options.slidesToShow + 1 : r.options.slidesToShow, t = r.slideCount; t > r.slideCount - i; t -= 1) n = t - 1, e(r.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - r.slideCount).prependTo(r.$slideTrack).addClass("slick-cloned");
                for (t = 0; i > t; t += 1) n = t, e(r.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + r.slideCount).appendTo(r.$slideTrack).addClass("slick-cloned");
                r.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }, t.prototype.selectHandler = function(t) {
            var n = this,
                i = parseInt(e(t.target).parents(".slick-slide").attr("data-slick-index"));
            return i || (i = 0), n.slideCount <= n.options.slidesToShow ? (n.$slider.find(".slick-slide").removeClass("slick-active"), n.$slides.eq(i).addClass("slick-active"), n.options.centerMode === !0 && (n.$slider.find(".slick-slide").removeClass("slick-center"), n.$slides.eq(i).addClass("slick-center")), void n.asNavFor(i)) : void n.slideHandler(i)
        }, t.prototype.slideHandler = function(e, t, n) {
            var i, r, o, a, s = null,
                l = this;
            return t = t || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === e || l.slideCount <= l.options.slidesToShow ? void 0 : (t === !1 && l.asNavFor(e), i = e, s = l.getLeft(i), a = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? a : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > e || e > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(a, function() {
                l.postSlide(i)
            }) : l.postSlide(i))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > e || e > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(a, function() {
                l.postSlide(i)
            }) : l.postSlide(i))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), r = 0 > i ? 0 !== l.slideCount % l.options.slidesToScroll ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? 0 !== l.slideCount % l.options.slidesToScroll ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, r]), o = l.currentSlide, l.currentSlide = r, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (n !== !0 ? l.fadeSlide(r, function() {
                l.postSlide(r)
            }) : l.postSlide(r), void l.animateHeight()) : void(n !== !0 ? l.animateSlide(s, function() {
                l.postSlide(r)
            }) : l.postSlide(r))))
        }, t.prototype.startLoad = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, t.prototype.swipeDirection = function() {
            var e, t, n, i, r = this;
            return e = r.touchObject.startX - r.touchObject.curX, t = r.touchObject.startY - r.touchObject.curY, n = Math.atan2(t, e), i = Math.round(180 * n / Math.PI), 0 > i && (i = 360 - Math.abs(i)), 45 >= i && i >= 0 ? r.options.rtl === !1 ? "left" : "right" : 360 >= i && i >= 315 ? r.options.rtl === !1 ? "left" : "right" : i >= 135 && 225 >= i ? r.options.rtl === !1 ? "right" : "left" : "vertical"
        }, t.prototype.swipeEnd = function() {
            var e, t = this;
            if (t.dragging = !1, t.shouldClick = !(t.touchObject.swipeLength > 10), void 0 === t.touchObject.curX) return !1;
            if (t.touchObject.edgeHit === !0 && t.$slider.trigger("edge", [t, t.swipeDirection()]), t.touchObject.swipeLength >= t.touchObject.minSwipe) switch (t.swipeDirection()) {
                case "left":
                    e = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount(), t.slideHandler(e), t.currentDirection = 0, t.touchObject = {}, t.$slider.trigger("swipe", [t, "left"]);
                    break;
                case "right":
                    e = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount(), t.slideHandler(e), t.currentDirection = 1, t.touchObject = {}, t.$slider.trigger("swipe", [t, "right"])
            }
            else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject = {})
        }, t.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, t.prototype.swipeMove = function(e) {
            var t, n, i, r, o, a = this;
            return o = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !a.dragging || o && 1 !== o.length ? !1 : (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), n = a.swipeDirection(), "vertical" !== n ? (void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && e.preventDefault(), r = (a.options.rtl === !1 ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, a.options.infinite === !1 && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), a.swipeLeft = a.options.vertical === !1 ? t + i * r : t + i * (a.$list.height() / a.listWidth) * r, a.options.fade === !0 || a.options.touchMove === !1 ? !1 : a.animating === !0 ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft)) : void 0)
        }, t.prototype.swipeStart = function(e) {
            var t, n = this;
            return 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(n.dragging = !0))
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
        }, t.prototype.unslick = function() {
            var e = this;
            e.destroy()
        }, t.prototype.updateArrows = function() {
            var e, t = this;
            e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.options.infinite !== !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.removeClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
        }, t.prototype.visibility = function() {
            var e = this;
            document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : (e.paused = !1, e.autoPlay())
        }, e.fn.slick = function() {
            var e, n = this,
                i = arguments[0],
                r = Array.prototype.slice.call(arguments, 1),
                o = n.length,
                a = 0;
            for (a; o > a; a++)
                if ("object" == typeof i || "undefined" == typeof i ? n[a].slick = new t(n[a], i) : e = n[a].slick[i].apply(n[a].slick, r), "undefined" != typeof e) return e;
            return n
        }, e(function() {
            e("[data-slick]").slick()
        })
    }),
    function() {
        var e = document.getElementById("js-article"),
            t = (document.getElementById("js-featured"), JSON.parse(localStorage.getItem("storedArticleIDs"))),
            n = "aaPost_";
        if (t) {
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    var r = n + i;
                    localStorage.setItem(r, "read")
                }
            localStorage.removeItem("storedArticleIDs")
        }
        if (e) {
            var o = e.getAttribute("data-id"),
                a = n + o;
            localStorage.getItem(a) || localStorage.setItem(a, "read")
        }
    }(),
    function(e, t) {
        function n(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        }
        if (!t) throw "No jQuery has been detected for MDemo.";
        var i, r = t(e),
            o = t("body"),
            a = !1,
            s = "",
            l = ["You OK?", "What are you talking abaout man?", "I don't understand", "Yeah", "LOL"],
            c = function(e, t) {
                return new c.init(e, t)
            };
        c.prototype = {
            log: function(e) {
                a && console.log(e)
            },
            updateClock: function() {
                var e = this,
                    t = new Date,
                    n = t.getHours(),
                    i = t.getMinutes();
                i = (10 > i ? "0" : "") + i;
                var r = n + ":" + i;
                e.$time.html(r)
            },
            indicateClick: function(e) {
                var n = t(e.target),
                    i = t('<div id="js-indicate-click" class="click-indicate"></div>');
                o.append(i), i.css({
                    top: n.offset().top + n.outerHeight() / 2 - 5,
                    left: n.offset().left + n.outerWidth() / 2 - 5
                }), setTimeout(function() {
                    i.remove()
                }, 700)
            },
            getInfo: function() {
                var e = this;
                e.log("getInfo"), i = r.height(), e.demoWidth = e.$demo.width(), e.demoHeight = e.$demo.height(), e.demoOffset = e.$demo.offset().top, e.scrollHeight = e.$scroll.height();
                var t = Math.round(.01 * e.demoWidth),
                    n = t + Math.round(.69 * e.demoWidth),
                    o = Math.round(.063 * e.demoHeight * 2.29) + n;
                if (e.baseCoord = [t, n, o], e.updateNewMessageElem(), e.messages.length) {
                    for (var a = e.messages.length - 1; a >= 0; a--) e.messages[a].width = e.$messageElem.eq(a).outerWidth(), e.messages[a].height = e.$messageElem.eq(a).outerHeight(), "sticker" != e.messages[a].type && "peel" != e.messages[a].type || e.$messageElem.eq(a).css({
                        width: e.demoWidth / e.gridSize + "px"
                    });
                    e.arrangeMessages()
                }
            },
            getImages: function() {
                var e = this;
                e.log("getImages"), e.$stickerElem = e.$demo.find(".js-sticker-elem");
                var n, i;
                if (e.$stickerElem.length)
                    for (i = 0; i < e.$stickerElem.length; i++) e.imgObj[i] = {
                        src: e.$stickerElem.eq(i).children()[0].src
                    };
                else
                    for (i = 0; i < Math.min(e.imgObj.length, 3 * e.gridSize); i++) e.$grid.append(t('<div class="sd__body__stickers__grid__elem js-sticker-elem"><img src="' + (s + e.imgObj[i].src) + '" draggable="false"></div>'));
                e.$stickerElem = e.$demo.find(".js-sticker-elem"), e.$stickerElem.on("mousedown touchstart", function(i) {
                    "touchstart" == i.type && e.$stickerElem.off("mousedown"), e.pageX = i.originalEvent ? i.originalEvent.pageX : 0, e.pageY = i.originalEvent ? i.originalEvent.pageY : 0, n = e.$stickerElem.index(t(this)), e.stickerElemTimeout = setTimeout(function() {
                        clearTimeout(e.stickerElemTimeout), e.stickerElemTimeout = 0, e.touchMove || e.stickerElemHoldStart(n)
                    }, 200)
                }).on("touchmove", function(t) {
                    e.touchMove = !0, e.stickerElemTimeout ? (e.wasMoved = !0, clearTimeout(e.stickerElemTimeout), e.stickerElemTimeout = 0) : e.wasMoved || (t.preventDefault(), e.dragSticker(t))
                }).on("mouseup touchend", function(t) {
                    "touchstart" == t.type && e.$stickerElem.off("mouseup"), e.stickerElemTimeout ? (clearTimeout(e.stickerElemTimeout), e.stickerElemTimeout = 0, e.stickerElemClick(n)) : e.touchMove && !e.wasMoved && e.$messageElem.last().trigger("mouseup"), e.touchMove = !1, e.wasMoved = !1
                })
            },
            stickerElemHoldStart: function(e) {
                var n = this;
                n.log("stickerElemHoldStart");
                var i = n.$stickerElem.eq(e),
                    r = i.parent(),
                    o = i.height(),
                    a = i.offset().left,
                    l = i.offset().top,
                    c = r.outerHeight(),
                    u = r.offset().left,
                    d = r.offset().top,
                    h = r[0].scrollHeight;
                n.stickerElemTimeout = 0, n.dragging = !0, n.dragX = a - u, n.dragY = -1 * (h - (l - d) - o - (h - c)), n.createNewMessage("peel", s + n.imgObj[e].src), i.addClass("peeled"), n.$messageElem.last().css({
                    transform: "translate3d(" + n.dragX + "px," + n.dragY + "px,0)"
                }), n.$messageElem.last().on("drag", function(e) {
                    n.dragSticker(e)
                }).on("mouseup dragend", function() {
                    n.stickerElemHoldEnd(e), t(this).off("mouseup dragend")
                })
            },
            stickerElemHoldEnd: function(e) {
                var t = this;
                t.log("stickerElemHoldEnd"), t.dragging = !1, t.canDropSticker ? (t.$messageElem.last().removeClass("peel").addClass("peeled"), t.messages[t.messages.length - 1].stickerX = t.stickerX, t.messages[t.messages.length - 1].stickerY = t.stickerY + t.baseCoord[t.coordStatus] - t.scrolled, t.shiftConversationTarget()) : (t.dragOverIndex = -1, t.deleteLastMsg()), t.stickerX = null, t.stickerY = null, t.$messageElem.removeClass("drop-target"), t.$stickerElem.eq(e).removeClass("peeled")
            },
            stickerElemClick: function(e) {
                var n = this;
                n.log("stickerElemClick"), n.bottomBig = !0, n.bottomOpen = !1, n.$bottom.addClass("big"), n.$bottom.removeClass("open"), n.previewSticker = e, n.$stickerMessageElem.addClass("open contain"), n.$stickerMessageElem.empty(), n.$stickerMessageElem.append(t('<img src="' + (s + n.imgObj[e].src) + '">')), n.coordStatus = 2, n.arrangeMessages(), n.updateNewMessageElem(), n.writingMessage()
            },
            dragSticker: function(e, t) {
                var n = this,
                    i = !1;
                n.log("dragSticker"), "number" == typeof e && (i = !0, n.$messageElem.last().addClass("move")), t = "number" == typeof t ? t : n.pageY - e.originalEvent.pageY, e = "number" == typeof e ? e : n.pageX - e.originalEvent.pageX;
                var r = -e + n.dragX,
                    o = -t + n.dragY;
                "undefined" == typeof n.stickerX || null === n.stickerX ? (n.stickerX = r, n.stickerY = o) : (n.stickerX = Math.abs(n.stickerX - r) > 20 && !i ? n.stickerX : r, n.stickerY = Math.abs(n.stickerY - o) > 20 && !i ? n.stickerY : o), n.stickerX < 0 ? n.stickerX = 0 : n.stickerX > n.demoWidth - n.messages[n.messages.length - 1].width && (n.stickerX = n.demoWidth - n.messages[n.messages.length - 1].width);
                var a, s, l, c, u = -n.stickerY + n.messages[n.messages.length - 1].height,
                    d = n.stickerX + n.messages[n.messages.length - 1].width;
                n.$messageElem.last().css({
                    transform: "translate3d(" + n.stickerX + "px," + n.stickerY + "px,0)"
                });
                for (var h = n.messages.length - 1; h >= 0; h--)
                    if (a = Math.round(n.messages[h].incoming ? .0425 * n.demoWidth : .9575 * n.demoWidth - n.messages[h].width), s = a + n.messages[h].width, c = n.messages[h].coordY + .063 * n.demoHeight, l = c + n.messages[h].height, n.canDropSticker = n.stickerX < s && d > a && u > c && -n.stickerY < l, n.canDropSticker) {
                        n.dragOverIndex = h;
                        break
                    }
                n.$messageElem.removeClass("drop-target"), n.canDropSticker ? n.$messageElem.eq(n.dragOverIndex).addClass("drop-target") : n.dragOverIndex > -1 && (n.dragOverIndex = -1)
            },
            writingMessage: function() {
                var e = this;
                e.log("writingMessage"), "" == e.$newMessageElem.text() && e.previewSticker < 0 ? (e.$newMessageElem.empty(), e.$input.removeClass("active"), e.conversationRunning || e.conversationEnded || (e.conversationRunning = !0, e.runConversation())) : e.$input.addClass("active")
            },
            deleteLastMsg: function() {
                var e = this;
                e.log("deleteLastMsg"), e.$messageElem.last().remove(), e.$messageElem = e.$demo.find(".js-sticker-message"), e.messages.splice(-1, 1), e.arrangeMessages()
            },
            updateLastMsg: function() {
                var e = this;
                e.log("updateLastMsg"), e.$messageElem.last().removeClass("writing").empty(), "text" == e.conversation[e.activeConversation].type ? e.$messageElem.last().text(e.conversation[e.activeConversation].text) : "image" == e.conversation[e.activeConversation].type ? e.$messageElem.last().addClass("image").append(t('<img src="' + e.conversation[e.activeConversation].image + '">')) : "sticker" == e.conversation[e.activeConversation].type, e.messages[e.messages.length - 1].type = e.conversation[e.activeConversation].type, e.messages[e.messages.length - 1].text = "text" == e.conversation[e.activeConversation].type ? e.conversation[e.activeConversation].text : "", e.messages[e.messages.length - 1].width = e.$messageElem.last().outerWidth(), e.messages[e.messages.length - 1].height = e.$messageElem.last().outerHeight(), e.arrangeMessages()
            },
            createNewMessage: function(e, n, i) {
                var r = this;
                r.log("createNewMessage"), i = "undefined" == typeof i ? !1 : i;
                var o = "text" != e ? '<img src="' + n + '" draggable="false">' : "",
                    a = t('<div class="sd__body__elem js-sticker-message">' + ("text" == e ? n : o) + "</div>");
                i && a.addClass("incoming"), "image" == e && a.addClass("image"), "sticker" == e && a.addClass("image").css({
                    width: r.demoWidth / r.gridSize + "px"
                }), "peel" == e && a.addClass("image peel").css({
                    width: r.demoWidth / r.gridSize + "px"
                }).attr("draggable", !0), r.$demoBody.append(a), r.$messageElem = r.$demo.find(".js-sticker-message"), r.messages.push({
                    type: e,
                    text: "text" == e ? n : "",
                    width: r.$messageElem.last().outerWidth(),
                    height: r.$messageElem.last().outerHeight(),
                    incoming: i
                }), r.dragging || r.arrangeMessages()
            },
            updateNewMessageElem: function() {
                var e = this;
                e.log("updateNewMessageElem"), e.$newMessageElem.css({
                    transform: "translate3d(0,-" + e.baseCoord[2 == e.coordStatus ? 1 : e.coordStatus] + "px,0)"
                }), e.bottomOpen ? e.$newMessageElem.addClass("open") : e.$newMessageElem.removeClass("open"), e.bottomBig ? e.$newMessageElem.addClass("big") : e.$newMessageElem.removeClass("big")
            },
            arrangeMessages: function() {
                var e = this;
                e.log("arrangeMessages");
                var t, n, i, r;
                for (t = e.messages.length - 1; t >= 0; t--) "peel" == e.messages[t].type ? (i = e.messages[t].stickerX, r = n ? e.messages[t].stickerY - (e.messages[n].coordY + e.messages[n].height + 1) : e.messages[t].stickerY - e.baseCoord[e.coordStatus]) : (n ? (r = e.messages[t].coordY = e.messages[n].coordY + e.messages[n].height + 1, e.messages[t].incoming != e.messages[n].incoming || e.messages[t].type != e.messages[n].type ? (r = e.messages[t].coordY += 5, e.$messageElem.eq(t).addClass("last")) : e.$messageElem.eq(t).removeClass("last")) : (r = e.messages[t].coordY = e.baseCoord[e.coordStatus], e.$messageElem.eq(t).addClass("last")), r = -r - .063 * e.demoHeight, i = 0, n = t), e.scrolling || (e.scrollScrollHeight = e.messages[0].coordY + e.messages[0].height - e.baseCoord[e.coordStatus], e.$scrollChild.css({
                    height: e.scrollScrollHeight
                }), e.$scroll.scrollTop(e.scrollScrollHeight - e.scrollHeight)), e.$messageElem.eq(t).css({
                    "transition-delay": (e.scrolling ? 0 : .1) + "s",
                    "transition-duration": (e.scrolling ? 0 : .3) + "s",
                    transform: "translate3d(" + i + "px," + (r + e.scrolled) + "px,0)"
                })
            },
            receiveMessage: function() {
                function e() {
                    n()
                }

                function t() {
                    n(!0)
                }

                function n(e) {
                    i.receivingMsg && (i.receivingMsg = !1, i.conversationRunning || i.conversationEnded ? i.conversation[i.activeConversation].sent = !0 : i.conversationRunning = !0, e ? i.deleteLastMsg() : i.updateLastMsg(), i.runConversation())
                }
                var i = this;
                i.log("receiveMessage"), i.receivingMsg = !0, i.createNewMessage("text", "", !0), i.$messageElem.last().append('<div class="sd__body__elem__loader"></div>').addClass("writing"), "image" == i.conversation[i.activeConversation].type ? loadImages([i.conversation[i.activeConversation].image], e, t) : setTimeout(e, "text" == i.conversation[i.activeConversation].type ? 100 * i.conversation[i.activeConversation].text.length : 500)
            },
            runConversation: function() {
                var e = this;
                if (e.log("runConversation"), e.conversationRunning && !e.conversationEnded)
                    for (var t = 0; t < e.conversation.length; t++) {
                        if (!e.conversation[t].sent) {
                            e.activeConversation = t, e.conversation[t].incoming ? setTimeout(function() {
                                e.receiveMessage()
                            }, 500) : setTimeout(function() {
                                e.createMessage()
                            }, 500);
                            break
                        }
                        t == e.conversation.length - 1 && (e.conversationRunning = !1, e.conversationEnded = !0)
                    }
            },
            createMessage: function() {
                var e = this;
                e.log("createMessage"), "text" == e.conversation[e.activeConversation].type ? (e.$input.trigger("click"), e.inputAnimate = setTimeout(function() {
                    e.animateInput()
                }, 500)) : "sticker" == e.conversation[e.activeConversation].type ? e.startStickerSend() : "peel" == e.conversation[e.activeConversation].type && e.animatePeel()
            },
            sendMessage: function() {
                var e = this;
                e.log("sendMessage"), "" != e.$newMessageElem.text() && (e.createNewMessage("text", e.$newMessageElem.text()), e.$newMessageElem.empty(), e.conversationRunning ? e.conversation[e.activeConversation].sent = !0 : (e.conversationRunning = !0, e.activeConversation < e.conversation.length - 1 ? e.shiftConversationTarget() : e.addRandomAnswer()), e.runConversation())
            },
            sendSticker: function(e) {
                var t = this;
                t.log("sendSticker"), t.previewSticker < 0 || (t.bottomBig = !1, t.$bottom.removeClass("big"), t.coordStatus = 1, t.createNewMessage("sticker", s + t.imgObj[t.previewSticker].src, e), t.previewSticker = -1, t.$stickerMessageElem.removeClass("open contain").empty(), t.conversationRunning || t.conversationEnded ? t.conversation[t.activeConversation].sent = !0 : t.conversationRunning = !0, t.runConversation(), t.writingMessage())
            },
            animateInput: function() {
                var e = this;
                e.log("animateInput"), clearTimeout(e.inputAnimate);
                var t = e.conversation[e.activeConversation].text.substring(0, e.activeLetter + 1);
                if (e.$newMessageElem.text(t), e.activeLetter > e.conversation[e.activeConversation].text.length - 1) e.activeLetter = 0, e.$sendBtn.trigger("click");
                else if (e.conversationRunning) {
                    e.activeLetter++;
                    var i = n(50, 200);
                    e.inputAnimate = setTimeout(function() {
                        e.animateInput()
                    }, i)
                }
                else e.activeLetter = 0;
                e.writingMessage()
            },
            startStickerSend: function() {
                var e = this;
                e.log("startStickerSend"), e.$openBottom.trigger("click"), setTimeout(function() {
                    e.conversationRunning && (e.keyboard && e.$bottomBtn.eq(0).trigger("click"), setTimeout(function() {
                        e.conversationRunning && (e.$stickerElem.eq(e.conversation[e.activeConversation].sticker).trigger("mousedown").trigger("mouseup"), setTimeout(function() {
                            e.conversationRunning && e.$sendBtn.trigger("click")
                        }, 800))
                    }, 800))
                }, 800)
            },
            animatePeel: function() {
                var e = this;
                e.log("animatePeel"), e.$openBottom.trigger("click"), setTimeout(function() {
                    e.conversationRunning && (e.keyboard && e.$bottomBtn.eq(0).trigger("click"), setTimeout(function() {
                        e.conversationRunning && (e.$stickerElem.eq(e.conversation[e.activeConversation].sticker).trigger("mousedown"), setTimeout(function() {
                            var t, n, i, r, o, a, s = e.conversation[e.activeConversation].target.i;
                            t = Math.round(e.messages[s].incoming ? .0425 * e.demoWidth : .9575 * e.demoWidth - e.messages[s].width), n = t + e.messages[s].width, i = e.messages[s].coordY + .063 * e.demoHeight, r = i + e.messages[s].height, "left" == e.conversation[e.activeConversation].target.x ? o = t : "center" == e.conversation[e.activeConversation].target.x ? o = (n - e.messages[e.messages.length - 1].width - t) / 2 + t : "right" == e.conversation[e.activeConversation].target.x && (o = n - e.messages[e.messages.length - 1].width), "top" == e.conversation[e.activeConversation].target.y ? a = r - e.messages[e.messages.length - 1].height : "center" == e.conversation[e.activeConversation].target.y ? a = (r - e.messages[e.messages.length - 1].width - i) / 2 + i : "bottom" == e.conversation[e.activeConversation].target.y && (a = i), e.dragSticker(e.dragX - o, a + e.dragY), setTimeout(function() {
                                e.$messageElem.last().trigger("mouseup"), e.conversationRunning || e.conversationEnded ? e.conversation[e.activeConversation].sent = !0 : e.conversationRunning = !0, e.runConversation()
                            }, 1100)
                        }, 800))
                    }, 800))
                }, 800)
            },
            addRandomAnswer: function() {
                var e = this;
                e.log("addRandomAnswer"), n(0, 1) || (e.conversation.push({
                    type: "text",
                    text: l[n(0, l.length - 1)],
                    incoming: !0,
                    sent: !1
                }), e.conversationEnded = !1)
            },
            shiftConversationTarget: function() {
                var e = this;
                e.log("shiftConversationTarget");
                for (var t = e.activeConversation; t < e.conversation.length; t++) "peel" == e.conversation[t].type && e.conversation[t].target.i > e.activeConversation && e.conversation[t].target.i++
            },
            demoClick: function(e) {
                var t = this;
                t.log("demoClick"), t.conversationRunning && !t.conversationEnded && t.indicateClick(e)
            },
            messageScroll: function() {
                var e = this;
                e.log("messageScroll"), e.conversationRunning || (clearTimeout(e.scrollTimeout), e.scrolling = !0, e.scrolled = e.scrollScrollHeight - e.scrollHeight - e.$scroll.scrollTop(), e.arrangeMessages(), e.scrollTimeout = setTimeout(function() {
                    e.scrolling = !1
                }, 100))
            },
            stickerMessageElemClick: function() {
                var e = this;
                e.log("stickerMessageElemClick"), e.bottomBig = !1, e.$bottom.removeClass("big"), e.coordStatus = 1, e.previewSticker = -1, e.$stickerMessageElem.removeClass("open contain").empty(), e.writingMessage(), e.arrangeMessages()
            },
            newMessageKeyDown: function(e) {
                var t = this;
                t.log("newMessageKeyDown"), 13 == e.keyCode && (e.preventDefault(), t.$sendBtn.trigger("click"))
            },
            newMessageKeyUp: function(e) {
                var t = this;
                t.log("newMessageKeyUp"), 13 != e.keyCode && (t.conversationRunning = !1, t.receivingMsg && (t.receivingMsg = !1, t.deleteLastMsg())), t.writingMessage()
            },
            openBottomClick: function() {
                var e = this;
                e.log("openBottomClick"), e.bottomOpen || (e.bottomOpen = !0, e.$bottom.addClass("open")), e.bottomBig && (e.bottomBig = !1, e.$bottom.removeClass("big"), e.coordStatus = 1, e.arrangeMessages()), e.previewSticker >= 0 && e.$stickerMessageElem.removeClass("open"), e.updateNewMessageElem()
            },
            bottomBtnClick: function() {
                var e = this;
                e.log("bottomBtnClick"), e.$bottomBtn.toggleClass("active"), e.bodyOpen || (e.bodyOpen = !0, e.$demoBody.addClass("open"), e.coordStatus = 1, e.arrangeMessages()), e.keyboard ? e.$demoBody.removeClass("keyboard") : e.$demoBody.addClass("keyboard"), e.keyboard = !e.keyboard, e.updateNewMessageElem()
            },
            inputClick: function() {
                var e = this;
                return e.log("inputClick"), e.previewSticker >= 0 && e.bottomOpen ? (e.$stickerElem.eq(e.previewSticker).trigger("click"), void(e.keyboard && e.conversationEnded && e.$newMessageElem.focus())) : (e.bottomOpen = !1, e.keyboard = !0, e.$bottomBtn.removeClass("active"), e.$bottom.removeClass("open"), e.$demoBody.addClass("open keyboard"), e.coordStatus = e.bottomBig ? 2 : 1, e.arrangeMessages(), e.updateNewMessageElem(), void(e.conversationEnded && e.$newMessageElem.focus()))
            },
            sendBtnClick: function() {
                var e = this;
                e.log("sendBtnClick"), e.previewSticker >= 0 && e.sendSticker(), e.sendMessage(), e.writingMessage()
            },
            scrollHandler: function(e) {
                var t = this;
                t.log("scrollHandler"), t.conversationEnded || (e > t.demoOffset - i && e < t.demoOffset + t.demoHeight && !t.conversationRunning ? (t.conversationRunning = !0, t.runConversation()) : (e <= t.demoOffset - i || e >= t.demoOffset + t.demoHeight) && t.conversationRunning && (t.conversationRunning = !1, t.receivingMsg && (t.receivingMsg = !1, t.deleteLastMsg())))
            }
        }, c.init = function(e, i) {
            if (e && i) {
                var o = this;
                o.log("init");
                var a = t(e);
                o.$demo = a, o.$time = a.find(".js-sticker-time"), o.$demoBody = a.find(".js-sticker-body"), o.$bottom = a.find(".js-sticker-bottom"), o.$bottomBtn = a.find(".js-sticker-btn"), o.$openBottom = a.find(".js-sticker-open-bottom"), o.$sendBtn = a.find(".js-sticker-send"), o.$input = a.find(".js-sticker-input"), o.$grid = a.find(".js-sticker-grid"), o.$newMessageElem = a.find(".js-sticker-new-message"), o.$stickerMessageElem = a.find(".js-sticker-sticker-message"), o.$scroll = a.find(".js-sticker-scroll"), o.$scrollChild = o.$scroll.children(), o.gridSize = i.gridSize, o.imgObj = i.images || [], o.activeLetter = 0, o.coordStatus = 0, o.scrolled = 0, o.scrollTimeout = 0, o.stickerElemTimeout = 0, o.previewSticker = -1, o.dragOverIndex = -1, o.canDropSticker = !1, o.conversationRunning = !1, o.conversationEnded = !1, o.receivingMsg = !1, o.scrolling = !1, o.touchMove = !1, o.wasMoved = !1, o.bodyOpen = !1, o.bottomOpen = !0, o.bottomBig = !1, o.keyboard = !0, o.dragging = !1, o.messages = [], o.$demo.on("click mousedown", function(e) {
                    o.demoClick(e)
                }), o.$input.on("click", function() {
                    o.inputClick()
                }), o.$scroll.on("scroll", function() {
                    o.messageScroll()
                }), o.$sendBtn.on("click", function() {
                    o.sendBtnClick()
                }), o.$bottomBtn.on("click", function() {
                    o.bottomBtnClick()
                }), o.$openBottom.on("click", function() {
                    o.openBottomClick()
                }), o.$newMessageElem.on("keyup", function(e) {
                    o.newMessageKeyUp(e)
                }), o.$newMessageElem.on("keydown", function(e) {
                    o.newMessageKeyDown(e)
                }), o.$stickerMessageElem.on("click", function() {
                    o.stickerMessageElemClick()
                }), o.$grid.addClass("sd__body__stickers__grid__--" + o.gridSize), o.getInfo(), o.getImages(), o.updateNewMessageElem(), o.conversation = [{
                    type: "text",
                    text: "Hey",
                    incoming: !0,
                    sent: !1
                }, {
                    type: "text",
                    text: "any cool stickers you seen?",
                    incoming: !0,
                    sent: !1
                }, {
                    type: "text",
                    text: "I just downloaded a new pack",
                    incoming: !1,
                    sent: !1
                }, {
                    type: "sticker",
                    sticker: n(0, Math.min(2 * o.gridSize - 1, o.$stickerElem.length - 1)),
                    incoming: !1,
                    sent: !1
                }, {
                    type: "text",
                    text: "Cool",
                    incoming: !0,
                    sent: !1
                }, {
                    type: "text",
                    text: "Btw, I found this",
                    incoming: !0,
                    sent: !1
                }, {
                    type: "image",
                    image: "https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-416958.jpg",
                    incoming: !0,
                    sent: !1
                }, {
                    type: "text",
                    text: "Niiiiiice",
                    incoming: !1,
                    sent: !1
                }, {
                    type: "peel",
                    sticker: n(0, Math.min(2 * o.gridSize - 1, o.$stickerElem.length - 1)),
                    incoming: !1,
                    sent: !1,
                    target: {
                        i: 6,
                        x: "right",
                        y: "bottom"
                    }
                }], setInterval(function() {
                    o.updateClock()
                }, 1e3), r.resize(function() {
                    o.getInfo()
                })
            }
        }, c.init.prototype = c.prototype, e.MDemo = c
    }(window, jQuery),
    function(e, t) {
        function n(e, t, n, i) {
            this.$canvas = e, this.$text = t, this.$words = n, this.textLength = i, this.running = !1, this.activeText = 0, this.activeWord = 0, this.maxTextIndex = t.length - 1
        }
        if (!t) throw "No jQuery has been detected for APPPlay.";
        var i, r = function(e, t, n) {
                return new r.init(e, t, n)
            },
            o = t(e),
            a = !1;
        r.prototype = {
            log: function(e) {
                a && console.log(e)
            },
            hasElements: function() {
                return this.$elements.length
            },
            getPageInfo: function() {
                var e = this,
                    t = e.$elements,
                    n = e.objects;
                e.log("getPageInfo"), i = o.height();
                for (var r = 0; r < t.length; r++) n[r].height = t.eq(r).height(), n[r].offsetTop = t.eq(r).offset().top;
                e.log(e)
            },
            createCanvas: function() {
                var e = this,
                    t = e.$elements,
                    n = e.objects;
                e.log("createCanvas");
                for (var i = 0; i < t.length; i++) 0 != n[i].$canvas.length && 0 != n[i].$text.length ? n[i].SW9 = new SiriWave9({
                    width: 320,
                    height: 60,
                    speed: .1,
                    amplitude: .5,
                    container: n[i].$canvas[0],
                    autostart: !1
                }) : n[i].noFollow = !0
            },
            getActiveWordIndex: function(e) {
                for (var t = this, n = t.objects, i = 0, r = 0; r < n[e].activeText; r++) i += n[e].textLength[r];
                return i += n[e].activeWord
            },
            animateSiri: function(e) {
                var t = this,
                    n = t.objects;
                t.log("animateSiri: " + e), clearTimeout(n[e].textTimeOut), n[e].SW9.setAmplitude(.5), n[e].$words.eq(t.getActiveWordIndex(e)).addClass("active"), n[e].activeWord == n[e].textLength[n[e].activeText] - 1 ? (setTimeout(function() {
                    n[e].SW9.setAmplitude(0)
                }, 300), n[e].activeWord = 0, n[e].activeText = n[e].activeText + 1 > n[e].maxTextIndex ? 0 : n[e].activeText + 1, setTimeout(function() {
                    n[e].running && (n[e].$words.removeClass("active"), n[e].textTimeOut = setTimeout(function() {
                        t.animateSiri(e)
                    }, 50 * n[e].$words.eq(t.getActiveWordIndex(e)).text().length + 300))
                }, 1500)) : (n[e].activeWord++, n[e].textTimeOut = setTimeout(function() {
                    t.animateSiri(e)
                }, 50 * n[e].$words.eq(t.getActiveWordIndex(e)).text().length + 300))
            },
            startDemos: function(e) {
                var t = this;
                t.log("startDemos: " + e);
                for (var n = 0; n < e.length; n++) t.startDemo(e[n])
            },
            startDemo: function(e) {
                var t = this,
                    n = t.objects;
                1 != n[e].running && (t.log("startDemo: " + e), n[e].running = !0, n[e].SW9.start(), n[e].textTimeOut = setTimeout(function() {
                    t.animateSiri(e)
                }, 50 * n[e].$words.eq(t.getActiveWordIndex(e)).text().length))
            },
            stopDemos: function(e) {
                var t = this,
                    n = t.$elements,
                    i = t.objects;
                t.log("stopDemos: " + e);
                for (var r = 0; r < n.length; r++) - 1 === e.indexOf(r) && i[r].running && t.stopDemo(r)
            },
            stopDemo: function(e) {
                var t = this,
                    n = t.objects;
                t.log("stopDemo: " + e), clearTimeout(n[e].textTimeOut), n[e].running = !1, n[e].activeWord = 0, n[e].SW9.setAmplitude(0), setTimeout(function() {
                    n[e].running || n[e].SW9.stop()
                }, 200), n[e].$words.removeClass("active")
            },
            scrollHandler: function(e) {
                clearTimeout(this.scrollTimeout);
                var t = this,
                    n = t.$elements,
                    r = t.objects;
                t.scrollTimeout = setTimeout(function() {
                    t.log("scroll ended: " + e);
                    for (var o = [], a = 0; a < n.length; a++) r[a].noFollow || e < r[a].offsetTop && e >= r[a].offsetTop - i + r[a].height && o.push(a);
                    t.stopDemos(o), o.length && t.startDemos(o)
                }, 100)
            }
        }, r.init = function(e, i, r) {
            var a = this;
            if (a.$elements = t(e), a.objects = [], a.scrollTimeout = "", a.$elements.length) {
                for (var s = 0; s < a.$elements.length; s++) {
                    for (var l = a.$elements.eq(s).find(r), c = a.$elements.eq(s).find(i), u = c.children(), d = [], h = 0; h < c.length; h++) d.push(c.eq(h).data("text").split(" ").length);
                    a.objects[s] = new n(l, c, u, d)
                }
                a.getPageInfo(), a.createCanvas(), a.scrollHandler(0), o.resize(function() {
                    a.getPageInfo()
                }), o.load(function() {
                    a.getPageInfo()
                })
            }
        }, r.init.prototype = r.prototype, e.SIRIDemo = r
    }(window, jQuery),
    // Copyright (c) 2015 Caffeina
    // The above copyright notice and this permission notice shall be included in all
    function() {
        function e(e) {
            e = e || {}, this.controller = e.controller, this.color = e.color, this.tick = 0, this.respawn()
        }

        function t(n) {
            n = n || {}, this.tick = 0, this.run = !1, this.ratio = n.ratio || window.devicePixelRatio || 1, this.width = this.ratio * (n.width || 320), this.height = this.ratio * (n.height || 100), this.MAX = this.height / 2, this.speed = .1, this.amplitude = n.amplitude || 1, this.speedInterpolationSpeed = n.speedInterpolationSpeed || .005, this.amplitudeInterpolationSpeed = n.amplitudeInterpolationSpeed || .05, this._interpolation = {
                speed: this.speed,
                amplitude: this.amplitude
            }, this.canvas = document.createElement("canvas"), this.canvas.width = this.width, this.canvas.height = this.height, n.cover ? this.canvas.style.width = this.canvas.style.height = "100%" : (this.canvas.style.width = this.width / this.ratio + "px", this.canvas.style.height = this.height / this.ratio + "px"), this.container = n.container || document.body, this.container.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.curves = [];
            for (var i = 0; i < t.prototype.COLORS.length; i++)
                for (var r = t.prototype.COLORS[i], o = 0; o < 3 * Math.random() | 0; o++) this.curves.push(new e({
                    controller: this,
                    color: r
                }));
            n.autostart && this.start()
        }
        e.prototype.respawn = function() {
            this.amplitude = .3 + .7 * Math.random(), this.seed = Math.random(), this.open_class = 2 + 3 * Math.random() | 0
        }, e.prototype.equation = function(e) {
            var t = this.tick,
                n = -1 * Math.abs(Math.sin(t)) * this.controller.amplitude * this.amplitude * this.controller.MAX * Math.pow(1 / (1 + Math.pow(this.open_class * e, 2)), 2);
            return Math.abs(n) < .001 && this.respawn(), n
        }, e.prototype._draw = function(e) {
            this.tick += this.controller.speed * (1 - .5 * Math.sin(this.seed * Math.PI));
            var t = this.controller.ctx;
            t.beginPath();
            for (var n, i, r, o = this.controller.width / 2 + (-this.controller.width / 4 + this.seed * (this.controller.width / 2)), a = this.controller.height / 2, s = -3; 3 >= s;) n = o + s * this.controller.width / 4, i = a + e * this.equation(s), r = r || n, t.lineTo(n, i), s += .01;
            var l = Math.abs(this.equation(0)),
                c = t.createRadialGradient(o, a, 1.15 * l, o, a, .3 * l);
            c.addColorStop(0, "rgba(" + this.color.join(",") + ",0.4)"), c.addColorStop(1, "rgba(" + this.color.join(",") + ",0.2)"), t.fillStyle = c, t.lineTo(r, a), t.closePath(), t.fill()
        }, e.prototype.draw = function() {
            this._draw(-1), this._draw(1)
        }, t.prototype._interpolate = function(e) {
            increment = this[e + "InterpolationSpeed"], Math.abs(this._interpolation[e] - this[e]) <= increment ? this[e] = this._interpolation[e] : this._interpolation[e] > this[e] ? this[e] += increment : this[e] -= increment
        }, t.prototype._clear = function() {
            this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.width, this.height), this.ctx.globalCompositeOperation = "lighter"
        }, t.prototype._draw = function() {
            for (var e = 0, t = this.curves.length; t > e; e++) this.curves[e].draw()
        }, t.prototype._startDrawCycle = function() {
            this.run !== !1 && (this._clear(), this._interpolate("amplitude"), this._interpolate("speed"), this._draw(), this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI), window.requestAnimationFrame ? window.requestAnimationFrame(this._startDrawCycle.bind(this)) : setTimeout(this._startDrawCycle.bind(this), 20))
        }, t.prototype.start = function() {
            this.tick = 0, this.run = !0, this._startDrawCycle()
        }, t.prototype.stop = function() {
            this.tick = 0, this.run = !1
        }, t.prototype.setSpeed = function(e) {
            this._interpolation.speed = e
        }, t.prototype.setNoise = t.prototype.setAmplitude = function(e) {
            this._interpolation.amplitude = Math.max(Math.min(e, 1), 0)
        }, t.prototype.COLORS = [
            [32, 133, 252],
            [94, 252, 169],
            [253, 71, 103]
        ], "function" == typeof define && define.amd ? define(function() {
            return t
        }) : window.SiriWave9 = t
    }(),
    function() {
        function e() {
            n++, n === t.length && (globalScroll(), stickyTitle(), videosPage(), appPlays(), navBar(), scrolledInView(), appDemo())
        }
        for (var t = ["touchevents", "apng", "csspositionsticky"], n = 0, i = 0; i < t.length; i++) Modernizr.on(t[i], e)
    }(),
    function() {
        var e = $("body").hasClass("hide-nav") ? -45 : -105;
        $(".js-scroll-to").smoothScroll({
            offset: e
        })
    }(), $(window).load(function() {
        for (var e = document.getElementsByTagName("img"), t = 0; t < e.length; t++) "" == e[t].getAttribute("src") && e[t].getAttribute("data-img") && ! function() {
            var n = e[t].getAttribute("data-img"),
                i = e[t],
                r = new Image;
            r.onload = function() {
                i.src = n
            }, r.src = n
        }()
    }),
    function() {
        var e = this;
        e.loadImages = function(e, t, n) {
            function i(e) {
                var i;
                if ("string" == typeof e) i = e;
                else if ("IMG" == e.tagName) i = e.src;
                else {
                    var r = $(e).css("background-image");
                    i = r.replace(/.*\s?url\([\'\"]?/, "").replace(/[\'\"]?\).*/, "")
                }
                if (-1 !== i.indexOf("http://") || -1 !== i.indexOf("https://")) {
                    var o = new Image;
                    o.onload = function() {
                        t(e)
                    }, o.onerror = function() {
                        n(e)
                    }, o.src = i
                }
            }
            if (e.length)
                for (var r = 0; r < e.length; r++) i(e[r])
        }, e.loadAllImages = function() {
            var e = $(".js-wait-to-load").not(".loaded");
            e.length && loadImages(e, function(e) {
                $(e).addClass("loaded")
            }, function(e) {
                var t = $(e);
                t.hasClass("js-remove-parent") ? t.parent().addClass("aa_hidden") : t.hasClass("js-add-pattern") ? t.parent().addClass("aa_ptn aa_ptn--1") : t.addClass("error")
            })
        }, loadAllImages()
    }(),
    function() {
        function e() {
            r = i.height()
        }
        var t = this,
            n = $(t),
            i = $(".js-featured-carousel");
        if (i.length) {
            t.hasSlick = !0;
            var r, o = !0;
            t.slickScrollHandler = function(e) {
                e > r && o ? (o = !1, i.slick("slickPause")) : r >= e && !o && (o = !0, i.slick("slickPlay"))
            }, i.on("init", function() {
                e(), loadAllImages()
            }), i.slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: !0,
                autoplaySpeed: 15e3,
                cssEase: "ease-out",
                speed: 400,
                prevArrow: '<button type="button" class="featured-container__arr featured-container__arr--prev aai-chevron-left"></button>',
                nextArrow: '<button type="button" class="featured-container__arr featured-container__arr--next aai-chevron-right"></button>',
                responsive: [{
                    breakpoint: 1440,
                    settings: {
                        centerMode: !0,
                        centerPadding: "25%",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplaySpeed: 8e3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplaySpeed: 8e3
                    }
                }]
            }), n.resize(function() {
                e()
            })
        }
    }(),
    function() {
        function e(e) {
            e !== i && (t.eq(i).removeClass("active"), t.eq(e).addClass("active"), 0 === e ? n.removeClass("aa_hidden") : 0 === i ? (n.addClass("aa_hidden"), n.eq(e).removeClass("aa_hidden")) : (n.eq(i).addClass("aa_hidden"), n.eq(e).removeClass("aa_hidden")), i = e)
        }
        var t = $(".js-list-menu"),
            n = $(".js-list-elem");
        if (t.length && n.length) {
            var i = 0;
            t.on("click", function() {
                var n = t.index($(this));
                e(n)
            })
        }
    }(),
    function() {
        function e() {
            var e = '<div class="gallery-window" style="display: none"><div class="gallery-window__tape"></div><button class="gallery-window__close aai-delete-o"></button><button class="gallery-window__nav gallery-window__nav--prev aai-chevron-left-o"></button><button class="gallery-window__nav gallery-window__nav--next aai-chevron-right-o"></button></div>';
            v.append(e), u = $(".gallery-window"), d = $(".gallery-window__tape"), h = $(".gallery-window__nav--prev"), p = $(".gallery-window__nav--next"), f = $(".gallery-window__close"), p.on("click", function() {
                o("next")
            }), h.on("click", function() {
                o("prev")
            }), f.on("click", function() {
                r("hide")
            }), d.swipe({
                triggerOnTouchEnd: !0,
                swipeStatus: s,
                allowPageScroll: "none"
            })
        }

        function t(e) {
            var t = e.children();
            t.on("click", function() {
                var e = $(this);
                c = t.length - 1, y = t.index(e), e.hasClass("iphone") ? n(e, "iphone") : e.hasClass("ipad") ? n(e, "ipad") : n(e), i(l * y, 0)
            })
        }

        function n(e, t) {
            function n(e) {
                d.append('<div class="gallery-window__tape__frame"><span class="gallery-window__tape__frame__help"></span><img class="gallery-window__tape__frame__img" src="' + e + '"></div>')
            }
            var i = 0,
                o = 0,
                a = !1;
            d.children().length && d.empty(), r("show"), e.parent().children().each(function() {
                var e;
                i += 1, t ? $(this).hasClass(t) && (e = $(this).attr("data-src"), n(e), o += 1, 1 == i && 1 == o && (a = !0)) : (e = $(this).attr("data-src"), n(e))
            }), t && (c -= i - o, a || (y -= i - o))
        }

        function i(e, t) {
            var n, i = 50;
            n = -i > e ? i.toString() + "px" : e > l * c + i ? -(l * c + i).toString() + "px" : (0 > e ? "" : "-") + Math.abs(e).toString() + "px", d.css({
                "-webkit-transition-duration": (t / 1e3).toFixed(1) + "s",
                "transition-duration": (t / 1e3).toFixed(1) + "s",
                "-webkit-transform": "translate3d(" + n + ",0,0)",
                transform: "translate3d(" + n + ",0,0)"
            }), a()
        }

        function r(e) {
            "show" == e ? (u.show(), b = !0, v.addClass("noverflow"), g.addClass("blur"), l = m.width()) : "hide" == e && (u.hide(), b = !1, v.removeClass("noverflow"), g.removeClass("blur"), d.removeAttr("style"))
        }

        function o(e) {
            "prev" == e ? y > 0 && (y -= 1) : "next" == e && c > y && (y += 1), i(l * y, _)
        }

        function a() {
            0 == y ? h.hide() : h.show(), y == c ? p.hide() : p.show()
        }

        function s(e, t, n, r) {
            "move" != t || "left" != n && "right" != n ? "cancel" == t ? i(l * y, _) : "end" == t && ("right" == n ? o("prev") : "left" == n && o("next")) : "left" == n ? i(l * y + r, 0) : "right" == n && i(l * y - r, 0)
        }
        var l, c, u, d, h, p, f, m = $(window),
            v = $("body"),
            g = $(".main-wrapper"),
            b = !1,
            y = 0,
            _ = 400;
        $(document).ready(function() {
            var n = $(".js-gallery");
            n.length && (e(), n.each(function() {
                t($(this))
            }))
        }), m.resize(function() {
            b && (l = $(window).width(), i(Math.abs(l * y), 0))
        })
    }(),
    function() {
        var e = document.getElementsByClassName("js-html-video");
        if (e.length)
            for (var t = $(e), n = 0; n < e.length; n++) {
                var i, r;
                "IMG" == e[n].tagName ? e[n].src ? (i = t.eq(n).width(), r = t.eq(n).height()) : t.eq(n).parent().addClass("aa_hidden") : (i = e[n].width, r = e[n].height), i > r ? t.eq(n).parent().addClass("post__content__video--landscape") : t.eq(n).parent().addClass("post__content__video--portrait")
            }
    }(),
    function() {
        var e = {
            getItem: function(e) {
                return e ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
            },
            setItem: function(e, t, n, i, r, o) {
                if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                var a = "";
                if (n) switch (n.constructor) {
                    case Number:
                        a = n === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                        break;
                    case String:
                        a = "; expires=" + n;
                        break;
                    case Date:
                        a = "; expires=" + n.toUTCString()
                }
                return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + a + (r ? "; domain=" + r : "") + (i ? "; path=" + i : "") + (o ? "; secure" : ""), !0
            },
            removeItem: function(e, t, n) {
                return this.hasItem(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0) : !1
            },
            hasItem: function(e) {
                return e ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie) : !1
            },
            keys: function() {
                for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = e.length, n = 0; t > n; n++) e[n] = decodeURIComponent(e[n]);
                return e
            }
        };
        ! function() {
            function t(t) {
                return e.getItem(t)
            }
            var n = $(".js-layout-btn-grid"),
                i = $(".js-layout-btn-roll"),
                r = $(".js-article-layout");
            if (r.length) {
                var o = "articlesLayout";
                n.on("click", function() {
                    n.hasClass("active") || (n.addClass("active"), i.removeClass("active"), r.removeClass("article-container--blogroll"), e.removeItem(o, "/"))
                }), i.on("click", function() {
                    i.hasClass("active") || (i.addClass("active"), n.removeClass("active"), r.addClass("article-container--blogroll"), e.setItem(o, "roll", 1 / 0, "/"))
                }), t(o) ? (i.addClass("active"), r.addClass("article-container--blogroll")) : n.addClass("active")
            }
        }(),
        function() {
            function t(t) {
                return e.getItem(t)
            }
            var n = $("body"),
                i = $(".js-dark-btn");
            if (i.length) {
                var r = "nightMode";
                i.on("click", function() {
                    n.hasClass("dark") ? (n.removeClass("dark"), e.removeItem(r, "/")) : (n.addClass("dark"), e.setItem(r, "dark", null, "/")), "undefined" != typeof disqus_shortname && DISQUS.reset({
                        reload: !0
                    })
                }), t(r) && n.addClass("dark")
            }
        }(),
        function() {
            function t(t) {
                return e.getItem(t)
            }

            function n(t) {
                t.preventDefault(), i.addClass("aa_hidden"), e.setItem(o, "closed", null, "/")
            }
            var i = $("#js-notification"),
                r = $("#js-notification-close");
            if (i.length && r.length) {
                var o = i.data("id");
                o && "" != o && (r.on("click", n), t(o) || i.removeClass("aa_hidden"))
            }
        }()
    }(),
    function() {
        function e(e, t, n) {
            e /= 255, t /= 255, n /= 255;
            var i, r, o = Math.max(e, t, n),
                a = Math.min(e, t, n),
                s = (o + a) / 2;
            if (o == a) i = r = 0;
            else {
                var l = o - a;
                switch (r = s > .5 ? l / (2 - o - a) : l / (o + a), o) {
                    case e:
                        i = (t - n) / l + (n > t ? 6 : 0);
                        break;
                    case t:
                        i = (n - e) / l + 2;
                        break;
                    case n:
                        i = (e - t) / l + 4
                }
                i /= 6
            }
            return [i, r, s]
        }

        function t(e, t, n) {
            var i, r, o;
            if (0 == t) i = r = o = n;
            else {
                var a = function(e, t, n) {
                        return 0 > n && (n += 1), n > 1 && (n -= 1), 1 / 6 > n ? e + 6 * (t - e) * n : .5 > n ? t : 2 / 3 > n ? e + (t - e) * (2 / 3 - n) * 6 : e
                    },
                    s = .5 > n ? n * (1 + t) : n + t - n * t,
                    l = 2 * n - s;
                i = a(l, s, e + 1 / 3), r = a(l, s, e), o = a(l, s, e - 1 / 3)
            }
            return [Math.round(255 * i), Math.round(255 * r), Math.round(255 * o)]
        }
        var n = document.getElementById("js-article");
        if (n) {
            var i = n.getAttribute("data-color");
            if (i) {
                var r = JSON.parse(i),
                    o = e(r[0], r[1], r[2]);
                o[0] = Math.round(360 * o[0]), o[1] = 100, o[2] = 42;
                var a = [o[0] - 90 < 0 ? 360 + (o[0] - 90) : o[0] - 90, 100, 42],
                    s = [o[0] - 180 < 0 ? 360 + (o[0] - 180) : o[0] - 180, 100, 42],
                    l = [o[0], 100, 10];
                r = t(o[0] / 360, o[1] / 100, o[2] / 100);
                var c = t(a[0] / 360, a[1] / 100, a[2] / 100),
                    u = t(s[0] / 360, s[1] / 100, s[2] / 100),
                    d = t(l[0] / 360, l[1] / 100, l[2] / 100);
                $('<style type="text/css">::selection {background: rgba(' + u + ",.2);}.color--1 {color: rgb(" + r + ");}.color--2 {color: rgb(" + c + ");}ul.al_toc__top > li {border-left: solid 1px rgb(" + r + ");}ul.al_toc__top > li:after {border-left: solid 1px rgb(" + r + "); border-bottom: solid 1px rgb(" + r + ");}ul.al_toc__top--bullet > li > a.al_toc__a:before {color: rgb(" + r + ");}.al_content ul > li:before {box-shadow: inset 0 0 0 3px rgb(" + r + ")}.al_divider--wire, .al_divider--wire:before {background-color: rgb(" + r + ");}a.al_header__label {background-color: rgb(" + r + ");}a.al_header__label:hover, a.al_header__label:focus {background-color: rgb(" + c + ");}.al_content__section__cell--num:before {color: rgb(" + r + ");}.al_content__highlight {color: rgb(" + r + ");}.al_content__quote:before {color: rgb(" + r + ");}.al_content__media__caption > i {color: rgb(" + r + ");}.al_content__ref--app__get > span {color: rgb(" + r + ");}.al_content__card__steps__step {border-left: dotted 1px rgb(" + r + ");}.al_content__card__steps__step:last-child:after {background-color: rgb(" + r + ");}.al_content__card__steps__step--mark {border-left: solid 1px rgb(" + r + ");}.al_content__card__steps__step--break {border-left: dashed 1px rgb(" + r + ") !important;}.al_content__card__steps__step--mark__num > h4 {color: rgb(" + r + ");}.al_content__card__steps__step--mark__media + .al_content__card__steps__step--mark__num > h5:after {background-color: rgb(" + r + ");}.al_content__card__steps__step--mark__num:before {color: rgb(" + r + ");}.al_content__card__steps__step--mark ~ .al_content__card__steps__step {border-left: solid 1px rgb(" + r + ");}h1.al_title__main, .dark h1.al_title__main {color: rgb(" + d + "); text-shadow: 2px 2px rgb(" + r + ")}.al_content__rate__detail__mark:before {background-color: rgb(" + r + ")}.al_app-header--bg:before {background: linear-gradient(to right, rgb(" + r + ") 0%, rgb(" + d + ") 100%)}</style>").appendTo("head")
            }
        }
    }(),
    function() {
        function e() {
            r = c.width(), o = c.height(), a = l.height(), s = [], f.each(function() {
                s.push($(this).offset().top)
            }), y = [], p.each(function() {
                y.push($(this).offset().top)
            }), _ = [], g.each(function() {
                _.push($(this).offset().top + 200)
            }), t()
        }

        function t() {
            for (var e = 0; e < y.length; e++) {
                var t = r > 1240 ? Math.round((y[e] - y[0]) / (a - y[0] - o) * 100) : 0;
                d.eq(e).css({
                    top: (t > 100 ? 100 : t) + "%"
                })
            }
        }
        var n = this,
            i = document.getElementById("js-article");
        if (i) {
            n.hasArticle = !0;
            var r, o, a, s, l = $(i),
                c = $(n),
                u = $(".js-nav"),
                d = $(".js-nav-title"),
                h = $(".js-nav-progress"),
                p = $(".js-marker"),
                f = $(".js-gallery"),
                m = $(".js-toc"),
                v = $(".js-toc-btn"),
                g = $(".js-section-img"),
                b = [],
                y = [],
                _ = [],
                w = 0,
                C = !1;
            n.articleScrollHandler = function(e) {
                if (e > y[0]) {
                    var t = Math.min(Math.round((e - y[0]) / (a - y[0] - o) * 1e3) / 1e3, 1),
                        n = r > 1240 ? 1 : t,
                        i = r > 1240 ? t : 1;
                    h.css({
                        "-webkit-transform": "scaleX(" + n + ") scaleY(" + i + ")",
                        transform: "scaleX(" + n + ") scaleY(" + i + ")"
                    })
                }
                else h.css({
                    "-webkit-transform": "scaleX(0) scaleX(0)",
                    transform: "scaleX(0) scaleX(0)"
                });
                e > y[0] && !C ? (C = !0, u.addClass("show")) : e <= y[0] && C && (C = !1, u.removeClass("show"));
                for (var l = w, c = 0; c < y.length; c++) {
                    if (!(e >= y[c])) {
                        0 == c && (w = 0);
                        break
                    }
                    w = c + 1
                }
                if (l !== w && (d.eq(l).removeClass("active"), d.eq(w).addClass("active")), g.length)
                    for (var p = 0; p < _.length; p++) e > _[p] + 400 || (e >= _[p] - o ? g.eq(p).css({
                        "-webkit-transform": "translate3d(0," + Math.round((e - (_[p] - o)) / 8 * 100) / 100 + "px,0)",
                        transform: "translate3d(0," + Math.round((e - (_[p] - o)) / 8 * 100) / 100 + "px,0)"
                    }) : g.eq(p).css({
                        "-webkit-transform": "translate3d(0,0,0)",
                        transform: "translate3d(0,0,0)"
                    }));
                f.length && f.each(function() {
                    var t = $(this),
                        n = f.index(t);
                    s && e > s[n] - o / 2 && !b[n] && (b[n] = !0, t.animate({
                        scrollLeft: r / 5
                    }, "1000", function() {
                        t.animate({
                            scrollLeft: 0
                        }, "1000", "easeOutBounce")
                    }))
                })
            }, e(), v.on("click", function() {
                m.removeClass("closed"), e()
            }), c.resize(e), c.load(e)
        }
    }(),
    function() {
        function e() {
            c = o.height(), u = f.button.offset().top, d = f.button.height()
        }

        function t(t) {
            t.button.click(function(i) {
                return p >= h ? !0 : (p++, i.preventDefault(), t.isLoading = !0, t.button.addClass("loading"), void $.ajax({
                    url: t.link
                }).then(function(e) {
                    var i = $(e),
                        r = i.find(t.buttonSelector),
                        o = i.find(".js-load-box").children().not(".js-load-not"),
                        a = r.prop("href") || !1;
                    o.data("articleUrl", t.link), window.history.pushState(null, null, t.link), t.link = a, t.button.prop("href", a), l[t.method](o), n(), t.link || t.button.remove()
                }).done(function() {
                    t.isLoading = !1, t.button.removeClass("loading"), loadAllImages(), "undefined" != typeof reInitDemo && reInitDemo(t.method), "undefined" != typeof refreshAppPlays && refreshAppPlays(t.method), e()
                }))
            })
        }

        function n() {
            $(".js-load-box").children().click(function() {
                var e = $(this).data("articleUrl") + "#" + this.id;
                window.history.pushState(null, null, e)
            })
        }

        function i(e) {
            var t = e,
                n = t + c,
                i = u,
                r = i + d;
            return n >= r && i >= t
        }
        var r = this,
            o = $(r),
            a = $(".js-load-next"),
            s = $(".js-load-prev"),
            l = $(".js-load-box");
        if (l.length && a.length) {
            r.hasInfiniteScroll = !0;
            var c, u, d, h = 5,
                p = 0,
                f = {
                    isLoading: !1,
                    button: a,
                    link: a.prop("href") || !1,
                    buttonSelector: ".js-load-next",
                    method: "append"
                },
                m = {
                    isLoading: !1,
                    button: s,
                    link: s.prop("href") || !1,
                    buttonSelector: ".js-load-prev",
                    method: "prepend"
                };
            r.infiniteScrollScrollHandler = function(e) {
                return p >= h ? !0 : void(!f.isLoading && f.link && i(e) && f.button.trigger("click"))
            }, l.children().data("articleUrl", window.location.pathname), e(), t(f), t(m), n(), o.resize(e)
        }
    }(),
    function(e) {
        function t(e) {
            var t = {
                wordpressPost: "Article",
                legacyReview: "Review",
                app_reviews: "App Review",
                app_lists: "App List",
                app_guides: "App Guide",
                author: "Author",
                appListDoc: "App Collection",
                tvAppListDoc: "TV App Collection"
            };
            return t[e] || e
        }

        function n(e) {
            if (e) {
                var t = {
                        1: "january",
                        2: "february",
                        3: "march",
                        4: "april",
                        5: "may",
                        6: "june",
                        7: "july",
                        8: "august",
                        9: "september",
                        10: "oktober",
                        11: "november",
                        12: "december"
                    },
                    n = e.split("T")[0].split("-"),
                    i = n[0],
                    r = t[n[1].replace(/^0/, "")] + ",",
                    o = n[2].replace(/^0/, "");
                return [o, r, i].join(" ")
            }
        }

        function i() {
            var e = L >= 0 ? R[L] : D;
            e > M + P ? T.removeClass("aa_hidden") : T.addClass("aa_hidden"), M >= P ? x.removeClass("aa_hidden") : x.addClass("aa_hidden")
        }

        function r(e, t) {
            function i() {
                for (var e = !1, t = 0; t < c.length; t++) {
                    var n;
                    if (c[t].unresolved) {
                        n = c[t].unresolved;
                        var a, s, l, d, h = [];
                        if (n.indexOf("'") > -1) {
                            for (d = n.indexOf("'"); - 1 !== d;) h.push(d), d = n.indexOf("'", d + 1);
                            if (h.length % 2 !== 0) throw "Wrong syntax";
                            0 === h[0] ? 2 == h.length && h[1] == n.length - 1 ? (a = {
                                string: n.substring(1, h[1])
                            }, c.splice(t, 1, a)) : (a = {
                                string: n.substring(1, h[1])
                            }, s = {
                                unresolved: n.substring(h[1] + 1)
                            }, c.splice(t, 1, a, s)) : (a = {
                                unresolved: n.substring(0, h[0])
                            }, s = {
                                unresolved: n.substring(h[0])
                            }, c.splice(t, 1, a, s))
                        }
                        else n.indexOf("||") > -1 ? (d = n.indexOf("||"), a = {
                            unresolved: n.substring(0, d)
                        }, l = {
                            operator: "or"
                        }, s = {
                            unresolved: n.substring(d + 2)
                        }, c.splice(t, 1, a, l, s)) : n.indexOf("(") > -1 ? (a = {
                            method: n
                        }, c.splice(t, 1, a)) : (a = {
                            property: n
                        }, c.splice(t, 1, a));
                        e = !0
                    }
                    else c[t].property ? (a = {
                        string: o(c[t].property.replace(/\s+/g, ""))
                    }, c.splice(t, 1, a), e = !0) : c[t].method ? (a = {
                        string: r(c[t].method)
                    }, c.splice(t, 1, a), e = !0) : c[t].operator && ("" != c[t - 1].string ? c.splice(t, 2) : c.splice(t - 1, 2), e = !0);
                    if (e) break
                }
                if (e) i();
                else
                    for (t = 0; t < c.length; t++) u += c[t].string
            }

            function r(e) {
                function t(e, t, n, i, r) {
                    return t = t || 100, n = n || 100, i = i || "bb", r = r || "jpg", e.replace("{w}", t).replace("{h}", n).replace("{c}", i).replace("{f}", r)
                }
                var n = "",
                    i = e.indexOf("("),
                    r = e.substring(0, i),
                    a = e.substring(i + 1, e.length - 1).split(",");
                return "tvImage" == r && (n = t(o(a[0]), a[1], a[2])), n
            }

            function o(e) {
                return "permalink" == e ? e = a() : "image" == e ? e = s() : "title" == e ? e = t._source.title || t._source.name || t._source.display_title || t._source.display_name || "" : "author" == e ? e = t._source.author || "" : "author_slug" == e ? e = t._source.author_slug || "" : "date" == e && (e = n(t._source.date || t._source.review_date || t._source.published_at || t._source.updated_at) || ""), e
            }

            function a() {
                var e = "";
                return t._source.user_nicename ? e = "/appnn/author/" + t._source.user_nicename : t._source.permalink ? e = t._source.permalink : t._source.href ? e = t._source.href : t._source.slug && (e = ("tvAppListDoc" == t._type ? "/tv" : "") + "/collection/" + t._source.slug), e
            }

            function s() {
                var e = "/assets/AppAdvice/AppAdvice.jpg";
                return t._source.appbundle57 ? e = t._source.appbundle57 : t._source.image ? e = t._source.image : t._source.lead_image ? e = t._source.lead_image : t._source.user_email ? e = "http://www.gravatar.com/avatar/" + md5(t._source.user_email) + "?s=350" : t._source.meta && (t._source.meta.lead_image ? e = t._source.meta.lead_image.sizes.medium : t._source.meta.leadImage && (e = l(t._source.meta.leadImage.url, "-m"))), e
            }

            function l(e, t) {
                t = t || "-m";
                var n = ["platformer.cdn.appadvice.com", "springboard.cdn.appadvice.com", "siri.cdn.appadvice.com", "handoff.cdn.appadvice.com", "ping.cdn.appadvice.com", "genius.cdn.appadvice.com", "chomp.cdn.appadvice.com", "topcharts.cdn.appadvice.com", "chipman.cdn.appadvice.com", "freemium.cdn.appadvice.com"],
                    i = e.split(/https?:\/\/([^\/]+)/)[2],
                    r = i.split(/\.[a-zA-Z0-9]{3,4}$/)[0],
                    o = r + t + ".jpg";
                return "http://" + n[o.length % 10] + o
            }
            var c = [{
                    unresolved: e
                }],
                u = "";
            return i(), u
        }

        function o(e) {
            if (e.length) {
                R = [], D = 0;
                for (var n = 0; n < e.length; n++) R.push(e[n].doc_count), D += e[n].doc_count, S.append('<button data-type="' + e[n].key + '"><span class="aa_text--light">' + e[n].doc_count + "</span> " + t(e[n].key) + (e[n].doc_count > 1 ? "s" : "") + "</button>");
                var i = S.children();
                i.on("click", function() {
                    var e = $(this);
                    M = 0, e.hasClass("active") ? (L = -1, N = "", e.removeClass("active")) : (L = i.index(e), N = e.data("type"), S.children().removeClass("active"), e.addClass("active")), appAdviceSearch(I, P, M, N)
                })
            }
        }

        function a(e) {
            if (!e.length) return _.removeClass("search"), void _.addClass("error");
            _.removeClass("search"), _.addClass("success");
            var t = L >= 0 ? R[L] : D;
            w.text("I've found " + (t > 1 ? "these" : "this only")), C.text(t + (t > 1 ? " hits total" : " single thing"));
            for (var n = 0; n < e.length; n++) k.append(E.clone());
            var i = k.children();
            for (n = 0; n < e.length; n++) {
                var o = i.eq(n).find("[data-replace]");
                o.each(function() {
                    for (var t = $(this), i = t.data("replace").split("+"), o = 0; o < i.length; o++) {
                        var a = i[o].split(";"),
                            s = r(a[0], e[n]);
                        1 === a.length ? t.text(s) : ("href" == a[1] && (-1 != s.indexOf("http://appadvice.com") && (s = s.split("http://appadvice.com")[1]), t.attr("href", s)), "background-image" == a[1] && t.css({
                            "background-image": "url(" + s + ")"
                        }))
                    }
                })
            }
            loadAllImages()
        }
        var s = document.getElementById("js-search-wrapper"),
            l = document.getElementById("js-search-state"),
            c = document.getElementById("js-search-title"),
            u = document.getElementById("js-search-count"),
            d = document.getElementById("js-search-results"),
            h = document.getElementById("js-search-types"),
            p = document.getElementById("js-search-template"),
            f = document.getElementById("js-search-prev"),
            m = document.getElementById("js-search-next"),
            v = document.getElementById("js-search-glass"),
            g = document.getElementById("js-search");
        if (s && d && p && g) {
            var b = $("body"),
                y = $(s),
                _ = $(l),
                w = $(c),
                C = $(u),
                k = $(d),
                S = $(h),
                E = $(p).children(),
                x = $(f),
                T = $(m),
                A = $(v),
                j = $(g),
                O = "https://ormfe745l4.execute-api.us-east-1.amazonaws.com/prod/search/site",
                I = "",
                P = 12,
                M = 0,
                N = "",
                R = [],
                D = 0,
                L = -1;
            e.openSearch = function() {
                b.addClass("aa_noverflow"), y.addClass("open")
            }, e.closeSearch = function() {
                b.removeClass("aa_noverflow"), y.removeClass("open")
            }, e.appAdviceSearch = function(t, n, r, s) {
                t != I && (M = 0, N = ""), n = n || P, r = r || M, s = s || N;
                var l = O + "?query_string=" + t + "&size=" + n + "&from=" + r + "&filter_type=" + s,
                    c = "/search/" + t;
                j.addClass("searching"), _.removeClass("error success"), _.addClass("search"), $.ajax({
                    url: l
                }).done(function(n) {
                    e.history.pushState(null, null, c), I != t && (S.empty(), o(n.aggregations.type.buckets)), k.empty(), a(n.hits.hits), i(), j.removeClass("searching"), I = t, y.scrollTop(0)
                })
            }, A.text("Vestibulum iaculis ligula et accumsan tristique. Nullam et odio id ante feugiat ultricies ut vel orci. Sed finibus faucibus purus quis suscipit."), x.on("click", function() {
                M -= P, appAdviceSearch(I, P, M, N)
            }), T.on("click", function() {
                M += P, appAdviceSearch(I, P, M, N)
            })
        }
    }(window),
    function() {
        function e() {
            w = !0, p.addClass("open"), m.focus(), openSearch()
        }

        function t() {
            _ || (w = !1, p.removeClass("open"), closeSearch())
        }
        var n = this,
            i = document.getElementById("js-nav-app"),
            r = document.getElementsByClassName("js-nav-app-elem"),
            o = document.getElementById("js-nav-app-btn"),
            a = document.getElementById("js-nav-app-sub"),
            s = document.getElementById("js-search-input"),
            l = document.getElementsByClassName("js-search-close");
        if (i) {
            n.hasNavApp = !0;
            var c, u, d = $(i),
                h = $(o),
                p = $(a),
                f = $(r),
                m = $(s),
                v = $(l),
                g = 44,
                b = 0,
                y = g,
                _ = !!d.hasClass("searchpage"),
                w = _;
            n.navAppScrollHandler = function(e) {
                return w ? void(b = e) : (c = Math.abs(e - b) > 5, u = e - b > 0 ? "down" : "up", g - y >= e ? y = g - e : "down" != u && "up" != u || (y -= e - b), y = Math.max(Math.min(y, g), 0), d.css({
                    transform: "translate3d(0,-" + (g - y) + "px,0)"
                }), f.css({
                    opacity: Math.round(y / (g / 2) * 100) / 100 - 1,
                    transform: "scale(" + Math.round(y / g * 100) / 100 + ")"
                }), void(b = e))
            }, navSearch(_, ["iPhone 7", "Apple TV", "iPad Pro", "Apple rumour", "accessories"]), h.on("click", function() {
                y == g && (w ? t() : e())
            }), v.on("click", function(e) {
                e.stopPropagation(), t()
            })
        }
    }(),
    function() {
        var e = $(".js-extend");
        e.children().height() < 460 ? e.addClass("open") : e.on("click", function() {
            e.addClass("open"), e.off("click")
        })
    }(),
    function() {
        function e() {
            i = o.height()
        }
        var t = this,
            n = document.getElementById("js-header-parallax");
        if (n) {
            t.hasHeaderParallax = !0;
            var i, r = $(t),
                o = $(n);
            t.headerParallaxScrollHandler = function(e) {
                o.length && (0 >= e ? o.css({
                    "-webkit-transform": "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)"
                }) : e > 0 && i > e && o.css({
                    "-webkit-transform": "translate3d(0," + e / 8 + "px,0)",
                    transform: "translate3d(0," + e / 8 + "px,0)"
                }))
            }, e(), r.resize(e)
        }
    }(),
    function() {
        function e() {
            T ? (p.removeClass("active"), v.addClass("active"), y.addClass("inactive"), _.removeClass("inactive"), w.addClass("aa_show--xs"), S.removeClass("aa_show--xs")) : (p.addClass("active"), v.removeClass("active"), y.removeClass("inactive"), _.addClass("inactive"), w.removeClass("aa_show--xs"), S.addClass("aa_show--xs")), A ? (f.removeClass("active"), m.addClass("active"), C.addClass("aa_show--m"), k.removeClass("aa_show--m")) : (f.addClass("active"), m.removeClass("active"), C.removeClass("aa_show--m"), k.addClass("aa_show--m")), j ? (g.removeClass("active"), b.addClass("active"), E.addClass("aa_show--m"), x.removeClass("aa_show--m")) : (g.addClass("active"), b.removeClass("active"), E.removeClass("aa_show--m"), x.addClass("aa_show--m"))
        }
        var t = document.getElementById("js-chart-left-top"),
            n = document.getElementById("js-chart-left-sub-left"),
            i = document.getElementById("js-chart-left-sub-right"),
            r = document.getElementById("js-chart-right-top"),
            o = document.getElementById("js-chart-right-sub-left"),
            a = document.getElementById("js-chart-right-sub-right");
        if (t) {
            var s = document.getElementById("js-col-left"),
                l = document.getElementById("js-col-left-sub-left"),
                c = document.getElementById("js-col-left-sub-right"),
                u = document.getElementById("js-col-right"),
                d = document.getElementById("js-col-right-sub-left"),
                h = document.getElementById("js-col-right-sub-right"),
                p = $(t),
                f = $(n),
                m = $(i),
                v = $(r),
                g = $(o),
                b = $(a),
                y = p.parent(),
                _ = v.parent(),
                w = $(s),
                C = $(l),
                k = $(c),
                S = $(u),
                E = $(d),
                x = $(h),
                T = !1,
                A = !1,
                j = !1;
            e(), p.on("click", function() {
                T = !T, e()
            }), v.on("click", function() {
                T = !T, e()
            }), f.on("click", function() {
                A = !A, e()
            }), m.on("click", function() {
                A = !A, e()
            }), g.on("click", function() {
                j = !j, e()
            }), b.on("click", function() {
                j = !j, e()
            })
        }
    }(),
    function() {
        var e = this,
            t = document.getElementsByClassName("js-sticker-demo");
        if (t.length) {
            e.hasMDemo = !0;
            for (var n = 0; n < t.length; n++) {
                var i = t[n].getAttribute("data-size");
                ! function(n) {
                    var r = MDemo(t[n], {
                        gridSize: i
                    });
                    e.messangerDemoScrollHandler = function(e) {
                        r.scrollHandler(e)
                    }
                }(n)
            }
        }
    }(),
    function() {
        var e = this,
            t = SIRIDemo(".js-siri", ".js-siri-text", ".js-siri-canvas");
        t.hasElements() && (e.hasSiriDemo = !0), e.siriDemoScrollhandler = function(e) {
            t.scrollHandler(e)
        }
    }(),
    function() {
        var e = document.getElementsByClassName("js-post-date");
        if (e.length) {
            var t = $(e),
                n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                i = new Date,
                r = 864e5,
                o = i - r,
                a = new Date(o),
                s = n[i.getMonth()],
                l = i.getDate(),
                c = n[a.getMonth()],
                u = a.getDate(),
                d = s + "" + l,
                h = c + "" + u;
            t.eq(0).text().replace(/\s+/g, "") == d ? t.eq(0).text("today") : t.eq(0).text("latest"), t.eq(1).text().replace(/\s+/g, "") == h && t.eq(1).text("yesterday")
        }
    }(),
    function() {
        var e = $(".js-author-btn"),
            t = $(".js-author-nav"),
            n = $(".js-author-apps");
        if (e.length && t.length && n.length) {
            var i = 0,
                r = 0;
            e.on("click", function() {
                var t = $(this),
                    n = e.index(t);
                n != i && (e.eq(i).removeClass("active"), e.eq(n).addClass("active"), i = n)
            }), t.on("click", function() {
                var e = $(this),
                    i = t.index(e);
                i != r && (t.eq(r).removeClass("active"), n.eq(r).removeClass("active"), t.eq(i).addClass("active"), n.eq(i).addClass("active"), r = i)
            })
        }
    }(),
    function() {
        var e, t = this,
            n = $(t),
            i = $(".js-ps");
        i.length && i.each(function() {
            function t() {
                p = 0, e = n.width(), s.each(function() {
                    var t = $(this);
                    t.data("hide") > 0 && t.data("hide") <= e ? t.addClass("aa_hidden") : (t.removeClass("aa_hidden"), p++)
                });
                var t = Math.round(a.length / p);
                d = a.eq(t).offset().left - a.eq(0).offset().left, c = Math.floor(e / d), s.eq(l >= p ? p - 1 : l || 0).trigger("click")
            }

            function i() {
                m || f || (clearTimeout(h), h = setTimeout(function() {
                    m || f || (u = o.scrollLeft(), s.eq(Math.round(u / d)).trigger("click"))
                }, 100))
            }
            var r = $(this),
                o = r.find(".js-ps-scroll"),
                a = o.children(),
                s = r.find(".js-ps-btn");
            if (o.length && a.length && s.length) {
                var l, c, u, d, h, p = 0,
                    f = !1,
                    m = !1;
                s.on("click", function(e) {
                    e.stopPropagation();
                    var t = $(this),
                        n = s.index(t);
                    s.removeClass("active");
                    for (var i = 0; c > i; i++) s.eq(n + i).addClass("active");
                    u = o.scrollLeft(), Math.abs(d * n - u) > 5 && (m = !0, o.animate({
                        scrollLeft: d * n
                    }, "500", "swing", function() {
                        m = !1
                    })), l = n
                }), o.on("touchstart", function() {
                    f = !0
                }), o.on("touchend", function() {
                    f = !1, i()
                }), o.on("scroll", i), t(), n.resize(t)
            }
        })
    }();