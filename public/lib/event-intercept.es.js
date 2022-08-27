import { defineComponent as a, ref as c, watch as g, onMounted as v, onBeforeUnmount as h } from "vue";
const E = a({
  props: {
    ignoreRef: {
      type: Array,
      default: void 0
    },
    bindingEvents: {
      type: Array,
      default: void 0
    },
    bindingRef: {
      type: HTMLElement,
      default: void 0
    }
  },
  setup(o) {
    const r = c([]), u = c([]), s = () => {
      const t = o.bindingRef;
      if (t) {
        const e = o.bindingEvents || [], f = (e == null ? void 0 : e.length) || 0, n = [], d = [];
        for (let i = 0; i < f; i++)
          e[i][0] && e[i][1] && (n.push(e[i][0]), d.push(e[i][1]), t.addEventListener(e[i][0], l));
        d.length > 0 && n.length > 0 && n.length === d.length && (r.value = n, u.value = d);
      }
    };
    g(
      () => o.bindingRef,
      (t, e) => {
        !e && t && s();
      }
    ), v(() => {
    }), h(() => {
      const t = o.bindingRef;
      if (t) {
        const e = o.bindingEvents || [], f = (e == null ? void 0 : e.length) || 0;
        for (let n = 0; n < f; n++)
          e[n][0] && e[n][1] && t.removeEventListener(e[n][0], l);
      }
    });
    const l = (t) => {
      const e = r.value.indexOf(t.type), f = o.ignoreRef;
      if (e > -1 && f) {
        let n = t.target;
        for (; n; ) {
          if (f.findIndex((d) => d === n) >= 0)
            return;
          n = n.parentNode;
        }
        return u.value[e](t);
      }
    };
    return () => null;
  }
});
export {
  E as default
};
