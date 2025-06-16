import {
  useAuth
} from "/build/_shared/chunk-5HQ5EFJ4.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  Navigate,
  useLocation
} from "/build/_shared/chunk-4MQXGPF4.js";
import {
  createHotContext
} from "/build/_shared/chunk-APFOE5QQ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/auth/ProtectedRoute.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\auth\\\\ProtectedRoute.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\auth\\ProtectedRoute.tsx"
  );
  import.meta.hot.lastModified = "1750111050975.4924";
}
var ProtectedRoute = ({
  children,
  requiredRole
}) => {
  _s();
  const {
    user,
    loading
  } = useAuth();
  const location = useLocation();
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Loading..." }, void 0, false, {
      fileName: "app/components/auth/ProtectedRoute.tsx",
      lineNumber: 36,
      columnNumber: 12
    }, this);
  }
  if (!user) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigate, { to: "/login", state: {
      from: location
    }, replace: true }, void 0, false, {
      fileName: "app/components/auth/ProtectedRoute.tsx",
      lineNumber: 40,
      columnNumber: 12
    }, this);
  }
  if (requiredRole && user.role !== requiredRole) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigate, { to: `/${user.role}/dashboard`, replace: true }, void 0, false, {
      fileName: "app/components/auth/ProtectedRoute.tsx",
      lineNumber: 46,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children }, void 0, false, {
    fileName: "app/components/auth/ProtectedRoute.tsx",
    lineNumber: 48,
    columnNumber: 10
  }, this);
};
_s(ProtectedRoute, "zPafkKLdz6KrRvMe2id3iDpNU34=", false, function() {
  return [useAuth, useLocation];
});
_c = ProtectedRoute;
var ProtectedRoute_default = ProtectedRoute;
var _c;
$RefreshReg$(_c, "ProtectedRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  ProtectedRoute_default
};
//# sourceMappingURL=/build/_shared/chunk-YOGAN3OE.js.map
