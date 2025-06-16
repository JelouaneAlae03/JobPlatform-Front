import {
  ProtectedRoute_default
} from "/build/_shared/chunk-YOGAN3OE.js";
import {
  DashboardLayout
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

// app/components/ProfileSearch.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\ProfileSearch.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\ProfileSearch.tsx"
  );
  import.meta.hot.lastModified = "1749681034389.9048";
}
function ProfileSearch() {
  _s();
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [filters, setFilters] = (0, import_react.useState)({
    skills: "",
    location: ""
  });
  const [profiles, setProfiles] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const fetchRandomProfiles = async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${api.get("access_token")}`
      };
      const response = await axios_default.get("http://127.0.0.1:8000/api/profiles/random", {
        headers
      });
      const profiles2 = response.data.profiles || [];
      setProfiles(profiles2);
    } catch (error) {
      console.error("Error fetching random profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };
  (0, import_react.useEffect)(() => {
    fetchRandomProfiles();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProfiles([]);
    try {
      const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${api.get("access_token")}`
      };
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.append("name", searchQuery.trim());
      }
      if (filters.skills.trim()) {
        const skillsArray = filters.skills.split(",").map((skill) => skill.trim()).filter((skill) => skill);
        skillsArray.forEach((skill) => {
          params.append("skills[]", skill);
        });
      }
      let response;
      if (!params.toString()) {
        response = await axios_default.get("http://127.0.0.1:8000/api/profiles/random", {
          headers
        });
      } else {
        response = await axios_default.get(`http://127.0.0.1:8000/api/profiles?${params.toString()}`, {
          headers
        });
      }
      const profiles2 = response.data.profiles || [];
      setProfiles(profiles2);
    } catch (error) {
      console.error("Error searching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Nom et Pr\xE9nom", className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 106,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 105,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Comp\xE9tences (s\xE9par\xE9es par des virgules)", className: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", value: filters.skills, onChange: (e) => setFilters((prev) => ({
          ...prev,
          skills: e.target.value
        })) }, void 0, false, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 109,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isLoading, className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? "Recherche..." : "Rechercher" }, void 0, false, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 113,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 108,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ProfileSearch.tsx",
      lineNumber: 104,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/ProfileSearch.tsx",
      lineNumber: 103,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-blue-900 mb-4", children: "R\xE9sultats de la recherche" }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 122,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: "Recherche en cours..." }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 124,
        columnNumber: 34
      }, this) : profiles.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-4", children: profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0", children: profile.profile_picture ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: profile.profile_picture, alt: `${profile.first_name} ${profile.last_name}`, className: "w-full h-full object-cover" }, void 0, false, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 129,
          columnNumber: 72
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-2xl", children: [
          profile.first_name[0],
          profile.last_name[0]
        ] }, void 0, true, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 129,
          columnNumber: 202
        }, this) }, void 0, false, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 128,
          columnNumber: 41
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-blue-900", children: [
                profile.first_name,
                " ",
                profile.last_name
              ] }, void 0, true, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 138,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: profile.email }, void 0, false, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 141,
                columnNumber: 53
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ProfileSearch.tsx",
              lineNumber: 137,
              columnNumber: 49
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleContact(profile.email), className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors", children: "Contacter" }, void 0, false, {
              fileName: "app/components/ProfileSearch.tsx",
              lineNumber: 143,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ProfileSearch.tsx",
            lineNumber: 136,
            columnNumber: 45
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3 space-y-2", children: [
            profile.phone && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }, void 0, false, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 151,
                columnNumber: 61
              }, this) }, void 0, false, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 150,
                columnNumber: 57
              }, this),
              profile.phone
            ] }, void 0, true, {
              fileName: "app/components/ProfileSearch.tsx",
              lineNumber: 149,
              columnNumber: 67
            }, this),
            profile.ville && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }, void 0, false, {
                  fileName: "app/components/ProfileSearch.tsx",
                  lineNumber: 157,
                  columnNumber: 61
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" }, void 0, false, {
                  fileName: "app/components/ProfileSearch.tsx",
                  lineNumber: 158,
                  columnNumber: 61
                }, this)
              ] }, void 0, true, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 156,
                columnNumber: 57
              }, this),
              profile.ville,
              ", ",
              profile.country
            ] }, void 0, true, {
              fileName: "app/components/ProfileSearch.tsx",
              lineNumber: 155,
              columnNumber: 67
            }, this),
            profile.skills && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm font-medium text-gray-700", children: "Comp\xE9tences: " }, void 0, false, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 163,
                columnNumber: 57
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-600", children: profile.skills }, void 0, false, {
                fileName: "app/components/ProfileSearch.tsx",
                lineNumber: 164,
                columnNumber: 57
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/ProfileSearch.tsx",
              lineNumber: 162,
              columnNumber: 68
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/ProfileSearch.tsx",
            lineNumber: 148,
            columnNumber: 45
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/ProfileSearch.tsx",
          lineNumber: 135,
          columnNumber: 41
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 126,
        columnNumber: 37
      }, this) }, profile.id, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 125,
        columnNumber: 54
      }, this)) }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 124,
        columnNumber: 113
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: "Recherchez des profils pour voir les r\xE9sultats ici." }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 170,
        columnNumber: 34
      }, this) }, void 0, false, {
        fileName: "app/components/ProfileSearch.tsx",
        lineNumber: 123,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ProfileSearch.tsx",
      lineNumber: 121,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ProfileSearch.tsx",
    lineNumber: 101,
    columnNumber: 10
  }, this);
}
_s(ProfileSearch, "MbIt0ceqLmi01R4hiDeOrFWZqoc=");
_c = ProfileSearch;
var _c;
$RefreshReg$(_c, "ProfileSearch");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/profile-search.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\profile-search.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\profile-search.tsx"
  );
  import.meta.hot.lastModified = "1749588719294.766";
}
function ProfileSearchRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProtectedRoute_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Profile Search", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProfileSearch, {}, void 0, false, {
    fileName: "app/routes/profile-search.tsx",
    lineNumber: 27,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "app/routes/profile-search.tsx",
    lineNumber: 26,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/profile-search.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
}
_c2 = ProfileSearchRoute;
var _c2;
$RefreshReg$(_c2, "ProfileSearchRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProfileSearchRoute as default
};
//# sourceMappingURL=/build/routes/profile-search-HMSYBJBK.js.map
