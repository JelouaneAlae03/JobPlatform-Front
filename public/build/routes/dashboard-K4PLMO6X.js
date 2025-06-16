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

// app/components/JobListings.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\JobListings.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\JobListings.tsx"
  );
  import.meta.hot.lastModified = "1749943262836.825";
}
function JobListings() {
  _s();
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const [itemsPerPage, setItemsPerPage] = (0, import_react.useState)(10);
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [searchInput, setSearchInput] = (0, import_react.useState)("");
  const [jobs, setJobs] = (0, import_react.useState)([]);
  const [savedOffers, setSavedOffers] = (0, import_react.useState)([]);
  const [pagination, setPagination] = (0, import_react.useState)({
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1
  });
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    setSearchInput(searchQuery);
  }, []);
  (0, import_react.useEffect)(() => {
    fetchJobs();
  }, [currentPage, itemsPerPage, searchQuery]);
  (0, import_react.useEffect)(() => {
    const checkSavedStatus = async () => {
      const token = api.get("access_token");
      if (!token)
        return;
      try {
        const response = await axios_default.get("http://127.0.0.1:8000/api/saved-offers", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const savedOfferIds = response.data.map((saved) => saved.id_offre);
        setSavedOffers(savedOfferIds);
      } catch (error2) {
        console.error("Error fetching saved offers:", error2);
      }
    };
    checkSavedStatus();
  }, []);
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios_default.get("http://127.0.0.1:8000/api/job-listings", {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: searchQuery
        },
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api.get("access_token")}`
        }
      });
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job listings");
      console.error("Error fetching jobs:", err);
    } finally {
      setIsLoading(false);
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
  const handleSaveOffer = async (offerId) => {
    const token = api.get("access_token");
    if (!token) {
      c.error("Please login to save offers");
      window.location.href = "/login";
      return;
    }
    try {
      if (savedOffers.includes(offerId)) {
        const response = await axios_default.delete(`http://127.0.0.1:8000/api/saved-offers/${offerId}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data.saved === false) {
          setSavedOffers((prev) => prev.filter((id) => id !== offerId));
          c.success("Offer unsaved successfully!");
        }
      } else {
        const response = await axios_default.post("http://127.0.0.1:8000/api/saved-offers", {
          id_offre: offerId
        }, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data.saved) {
          setSavedOffers((prev) => [...prev, offerId]);
          c.success("Offer saved successfully!");
        }
      }
    } catch (error2) {
      if (error2.response?.status === 401) {
        c.error("Please login to save offers");
        window.location.href = "/login";
      } else {
        c.error(error2.response?.data?.message || "Failed to save/unsave offer");
      }
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center items-center min-h-[400px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 153,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 152,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 p-4 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-700", children: error }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 158,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 157,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row gap-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 flex gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Search jobs...", className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchInput, onChange: (e) => setSearchInput(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") {
          setSearchQuery(searchInput);
          setCurrentPage(1);
        }
      } }, void 0, false, {
        fileName: "app/components/JobListings.tsx",
        lineNumber: 166,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500", onClick: () => {
        setSearchQuery(searchInput);
        setCurrentPage(1);
      }, children: "Search" }, void 0, false, {
        fileName: "app/components/JobListings.tsx",
        lineNumber: 172,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 165,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 164,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 163,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg sm:text-xl font-semibold text-blue-900", children: job.title }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 187,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: job.company }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 188,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm mt-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Email:" }, void 0, false, {
              fileName: "app/components/JobListings.tsx",
              lineNumber: 190,
              columnNumber: 37
            }, this),
            " ",
            job.company_email
          ] }, void 0, true, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 189,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 186,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: job.type }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 194,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm", children: job.location }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 197,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 193,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/JobListings.tsx",
        lineNumber: 185,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: job.description }, void 0, false, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 203,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 flex flex-wrap gap-2", children: job.requirements.map((req, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm", children: req }, index, false, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 205,
          columnNumber: 71
        }, this)) }, void 0, false, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 204,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/JobListings.tsx",
        lineNumber: 202,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-gray-600", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: job.salary }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 212,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mx-2", children: "\u2022" }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 213,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            "Posted ",
            job.posted
          ] }, void 0, true, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 214,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 211,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer", onClick: () => {
            const subject = `Candidature au poste de ${job.title}`;
            const mailtoLink = `mailto:${job.company_email}?subject=${encodeURIComponent(subject)}`;
            window.location.href = mailtoLink;
          }, children: "Apply Now" }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 217,
            columnNumber: 33
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${savedOffers.includes(job.id) ? "border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500" : "border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500"}`, onClick: () => handleSaveOffer(job.id), children: savedOffers.includes(job.id) ? "Saved" : "Save" }, void 0, false, {
            fileName: "app/components/JobListings.tsx",
            lineNumber: 224,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/JobListings.tsx",
          lineNumber: 216,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/JobListings.tsx",
        lineNumber: 210,
        columnNumber: 25
      }, this)
    ] }, job.id, true, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 184,
      columnNumber: 34
    }, this)) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 183,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage: pagination.current_page, totalPages: pagination.last_page, onPageChange: handlePageChange, itemsPerPage: pagination.per_page, onItemsPerPageChange: handleItemsPerPageChange }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 234,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/JobListings.tsx",
      lineNumber: 233,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/JobListings.tsx",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
_s(JobListings, "HG/gNpoyP1gqRWcoE8l7Bwhk358=");
_c = JobListings;
var _c;
$RefreshReg$(_c, "JobListings");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/dashboard.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\dashboard.tsx"
  );
  import.meta.hot.lastModified = "1747945837115.3662";
}
function Dashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Job Listings", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(JobListings, {}, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = Dashboard;
var _c2;
$RefreshReg$(_c2, "Dashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Dashboard as default
};
//# sourceMappingURL=/build/routes/dashboard-K4PLMO6X.js.map
