import {
  Pagination
} from "/build/_shared/chunk-YZLQ6ULB.js";
import {
  DashboardLayout
} from "/build/_shared/chunk-M425YDXV.js";
import "/build/_shared/chunk-5HQ5EFJ4.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-4MQXGPF4.js";
import {
  createHotContext
} from "/build/_shared/chunk-APFOE5QQ.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/MyApplications.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\MyApplications.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\MyApplications.tsx"
  );
  import.meta.hot.lastModified = "1748185184041.2388";
}
var mockApplications = [{
  id: 1,
  jobTitle: "Senior Software Engineer",
  company: "Tech Corp",
  status: "Under Review",
  appliedDate: "2024-02-15",
  lastUpdated: "2024-02-16"
}, {
  id: 2,
  jobTitle: "Frontend Developer",
  company: "Web Solutions Inc",
  status: "Interview Scheduled",
  appliedDate: "2024-02-10",
  lastUpdated: "2024-02-14"
}, {
  id: 3,
  jobTitle: "Full Stack Developer",
  company: "Digital Innovations",
  status: "Rejected",
  appliedDate: "2024-02-01",
  lastUpdated: "2024-02-05"
}];
function MyApplications() {
  _s();
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const [itemsPerPage, setItemsPerPage] = (0, import_react.useState)(10);
  const [filter, setFilter] = (0, import_react.useState)("all");
  const totalPages = Math.ceil(mockApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = mockApplications.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "under review":
        return "bg-yellow-100 text-yellow-800";
      case "interview scheduled":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-900", children: "My Applications" }, void 0, false, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 84,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "all", children: "All Applications" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 87,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "under_review", children: "Under Review" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 88,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "interview", children: "Interview Scheduled" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 89,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "rejected", children: "Rejected" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 90,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 86,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 85,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 83,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 82,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: currentApplications.map((application) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg sm:text-xl font-semibold text-blue-900", children: application.jobTitle }, void 0, false, {
            fileName: "app/components/MyApplications.tsx",
            lineNumber: 101,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: application.company }, void 0, false, {
            fileName: "app/components/MyApplications.tsx",
            lineNumber: 102,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 100,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`, children: application.status }, void 0, false, {
            fileName: "app/components/MyApplications.tsx",
            lineNumber: 105,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-600", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
              "Applied: ",
              application.appliedDate
            ] }, void 0, true, {
              fileName: "app/components/MyApplications.tsx",
              lineNumber: 109,
              columnNumber: 37
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
              "Last Updated: ",
              application.lastUpdated
            ] }, void 0, true, {
              fileName: "app/components/MyApplications.tsx",
              lineNumber: 110,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/MyApplications.tsx",
            lineNumber: 108,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 104,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 99,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer", children: "View Details" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 116,
          columnNumber: 33
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer", children: "Withdraw" }, void 0, false, {
          fileName: "app/components/MyApplications.tsx",
          lineNumber: 119,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 115,
        columnNumber: 29
      }, this) }, void 0, false, {
        fileName: "app/components/MyApplications.tsx",
        lineNumber: 114,
        columnNumber: 25
      }, this)
    ] }, application.id, true, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 98,
      columnNumber: 57
    }, this)) }, void 0, false, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 97,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage, totalPages, onPageChange: handlePageChange, itemsPerPage, onItemsPerPageChange: handleItemsPerPageChange }, void 0, false, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 129,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/MyApplications.tsx",
      lineNumber: 128,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/MyApplications.tsx",
    lineNumber: 80,
    columnNumber: 10
  }, this);
}
_s(MyApplications, "2csvr2UesRqWfiKrBrfoS+E9K+0=");
_c = MyApplications;
var _c;
$RefreshReg$(_c, "MyApplications");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/applications.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\applications.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\applications.tsx"
  );
  import.meta.hot.lastModified = "1747946160868.6875";
}
function Applications() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "My Applications", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MyApplications, {}, void 0, false, {
    fileName: "app/routes/applications.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/applications.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = Applications;
var _c2;
$RefreshReg$(_c2, "Applications");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Applications as default
};
//# sourceMappingURL=/build/routes/applications-VRK6S5DU.js.map
