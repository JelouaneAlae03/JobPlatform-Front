import {
  Pagination
} from "/build/_shared/chunk-YZLQ6ULB.js";
import {
  DashboardLayout,
  c
} from "/build/_shared/chunk-M425YDXV.js";
import {
  api,
  axios_default
} from "/build/_shared/chunk-5HQ5EFJ4.js";
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

// app/components/SavedJobs.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\SavedJobs.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\SavedJobs.tsx"
  );
  import.meta.hot.lastModified = "1749943447883.0513";
}
function SavedJobs() {
  _s();
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const [itemsPerPage, setItemsPerPage] = (0, import_react.useState)(10);
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [savedJobs, setSavedJobs] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)("");
  const [pagination, setPagination] = (0, import_react.useState)({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1
  });
  (0, import_react.useEffect)(() => {
    fetchSavedJobs();
  }, [currentPage, itemsPerPage, searchQuery]);
  const fetchSavedJobs = async () => {
    try {
      setIsLoading(true);
      const token = api.get("access_token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const response = await axios_default.get("http://127.0.0.1:8000/api/saved-offers", {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: searchQuery
        },
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const transformedJobs = response.data.map((saved) => ({
        id: saved.offer.id,
        title: saved.offer.title,
        company: saved.offer.company.name,
        location: saved.offer.company.ville,
        type: saved.offer.jobtype?.name || "",
        salary: "",
        // Add if available in your data
        description: saved.offer.Job_Descriptin,
        requirements: saved.offer.skills ? saved.offer.skills.split(",") : [],
        company_email: saved.offer.company.email,
        created_at: saved.created_at
      }));
      setSavedJobs(transformedJobs);
      setPagination({
        total: response.data.length,
        per_page: itemsPerPage,
        current_page: currentPage,
        last_page: Math.ceil(response.data.length / itemsPerPage)
      });
      setError("");
    } catch (error2) {
      if (error2.response?.status === 401) {
        window.location.href = "/login";
      } else {
        setError(error2.response?.data?.message || "Failed to fetch saved jobs");
        c.error("Failed to fetch saved jobs");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveJob = async (jobId) => {
    try {
      const token = api.get("access_token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      await axios_default.delete(`http://127.0.0.1:8000/api/saved-offers/${jobId}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
      c.success("Job removed from saved jobs");
    } catch (error2) {
      c.error(error2.response?.data?.message || "Failed to remove job");
    }
  };
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
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 131,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 130,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 p-4 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-700", children: error }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 136,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 135,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl sm:text-2xl font-semibold text-blue-900", children: "Saved Jobs" }, void 0, false, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 143,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row gap-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Search saved jobs...", className: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }, void 0, false, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 145,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 144,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 142,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 141,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: savedJobs.map((job) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg sm:text-xl font-semibold text-blue-900", children: job.title }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 155,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: job.company }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 156,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm mt-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Email:" }, void 0, false, {
              fileName: "app/components/SavedJobs.tsx",
              lineNumber: 158,
              columnNumber: 37
            }, this),
            " ",
            job.company_email
          ] }, void 0, true, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 157,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 154,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: job.type }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 162,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm", children: job.location }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 165,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 161,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 153,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: job.description }, void 0, false, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 171,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 flex flex-wrap gap-2", children: job.requirements.map((req, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm", children: req }, index, false, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 173,
          columnNumber: 71
        }, this)) }, void 0, false, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 172,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 170,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-gray-600", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: job.salary }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 180,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mx-2", children: "\u2022" }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 181,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            "Saved on ",
            new Date(job.created_at).toLocaleDateString()
          ] }, void 0, true, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 182,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 179,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer", onClick: () => {
            const subject = `Candidature au poste de ${job.title}`;
            const mailtoLink = `mailto:${job.company_email}?subject=${encodeURIComponent(subject)}`;
            window.location.href = mailtoLink;
          }, children: "Apply Now" }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 185,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer", onClick: () => handleRemoveJob(job.id), children: "Remove" }, void 0, false, {
            fileName: "app/components/SavedJobs.tsx",
            lineNumber: 192,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/SavedJobs.tsx",
          lineNumber: 184,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/SavedJobs.tsx",
        lineNumber: 178,
        columnNumber: 25
      }, this)
    ] }, job.id, true, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 152,
      columnNumber: 39
    }, this)) }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 151,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage: pagination.current_page, totalPages: pagination.last_page, onPageChange: handlePageChange, itemsPerPage: pagination.per_page, onItemsPerPageChange: handleItemsPerPageChange }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 202,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/SavedJobs.tsx",
      lineNumber: 201,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/SavedJobs.tsx",
    lineNumber: 139,
    columnNumber: 10
  }, this);
}
_s(SavedJobs, "79Jq17UDtIUwUvlHAr5vv5RTGxg=");
_c = SavedJobs;
var _c;
$RefreshReg$(_c, "SavedJobs");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/saved.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\saved.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\saved.tsx"
  );
  import.meta.hot.lastModified = "1747946621808.0789";
}
function Saved() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Saved Jobs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(SavedJobs, {}, void 0, false, {
    fileName: "app/routes/saved.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/saved.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = Saved;
var _c2;
$RefreshReg$(_c2, "Saved");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Saved as default
};
//# sourceMappingURL=/build/routes/saved-T6UF43M2.js.map
