import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-APFOE5QQ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/Pagination.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Pagination.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Pagination.tsx"
  );
  import.meta.hot.lastModified = "1747948476470.0403";
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange
}) {
  const pageSizeOptions = [5, 10, 20, 50];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center space-y-4 mt-6", children: [
    totalPages > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center space-x-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, className: `px-6 py-2 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}`, children: "Previous" }, void 0, false, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 32,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-900", children: [
        "Page ",
        currentPage,
        " of ",
        totalPages
      ] }, void 0, true, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 36,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, className: `px-6 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}`, children: "Next" }, void 0, false, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 40,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Pagination.tsx",
      lineNumber: 31,
      columnNumber: 32
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-blue-900", children: "Items per page:" }, void 0, false, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 47,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: itemsPerPage, onChange: (e) => onItemsPerPageChange(Number(e.target.value)), className: "px-2 py-1 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm", children: pageSizeOptions.map((size) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: size, children: size }, size, false, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 49,
        columnNumber: 50
      }, this)) }, void 0, false, {
        fileName: "app/components/Pagination.tsx",
        lineNumber: 48,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Pagination.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Pagination.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_c = Pagination;
var _c;
$RefreshReg$(_c, "Pagination");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Pagination
};
//# sourceMappingURL=/build/_shared/chunk-YZLQ6ULB.js.map
