import {
  DashboardLayout,
  Oe,
  c
} from "/build/_shared/chunk-M425YDXV.js";
import {
  api,
  axios_default,
  useAuth
} from "/build/_shared/chunk-5HQ5EFJ4.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  useNavigate
} from "/build/_shared/chunk-4MQXGPF4.js";
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

// app/components/Settings.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Settings.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Settings.tsx"
  );
  import.meta.hot.lastModified = "1750111041712.9575";
}
function Settings() {
  _s();
  const {
    user,
    company
  } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = (0, import_react.useState)({
    name: "",
    email: "",
    domain: "",
    address: "",
    country: "",
    ville: "",
    rc: "",
    password: "",
    password_confirmation: ""
  });
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [isFetching, setIsFetching] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    const fetchCompanyData = async () => {
      if (!user?.id) {
        c.error("Please log in to access company settings");
        navigate("/login");
        return;
      }
      try {
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api.get("access_token")}`
        };
        const response = await axios_default.get("http://127.0.0.1:8000/api/company/profile", {
          headers
        });
        const companyData = response.data;
        setFormData((prev) => ({
          ...prev,
          name: companyData.name || "",
          email: companyData.email || "",
          domain: companyData.domain || "",
          address: companyData.address || "",
          country: companyData.country || "",
          ville: companyData.ville || "",
          rc: companyData.rc || ""
        }));
      } catch (error) {
        console.error("Error fetching company data:", error);
        if (error.response?.status === 401) {
          c.error("Please log in to access company settings");
          navigate("/login");
        } else {
          c.error(error.response?.data?.message || "Failed to fetch company information");
        }
      } finally {
        setIsFetching(false);
      }
    };
    fetchCompanyData();
  }, [user?.id, navigate]);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api.get("access_token")}`
      };
      const submitData = {
        ...formData
      };
      if (!submitData.password) {
        delete submitData.password;
        delete submitData.password_confirmation;
      }
      const response = await axios_default.put("http://127.0.0.1:8000/api/company/profile", submitData, {
        headers
      });
      c.success("Company information updated successfully");
      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: ""
      }));
    } catch (error) {
      console.error("Error updating company information:", error);
      if (error.response?.status === 401) {
        c.error("Please log in to update company settings");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errorMessages) => {
          c.error(errorMessages[0]);
        });
      } else {
        c.error(error.response?.data?.message || "Failed to update company information");
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (isFetching) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 151,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-3 text-blue-600", children: "Loading company information..." }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 152,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 150,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 149,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 148,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Oe, { position: "top-right" }, void 0, false, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 158,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-blue-900", children: "Company Settings" }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 162,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-blue-600 mt-1", children: "Update your company information" }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 163,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 161,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Company Information" }, void 0, false, {
          fileName: "app/components/Settings.tsx",
          lineNumber: 169,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", className: "block text-sm font-medium text-blue-900", children: "Company Name" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 172,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 173,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 171,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-sm font-medium text-blue-900", children: "Email" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 176,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 177,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 175,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "domain", className: "block text-sm font-medium text-blue-900", children: "Domain" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 180,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "domain", name: "domain", value: formData.domain, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 181,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 179,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "rc", className: "block text-sm font-medium text-blue-900", children: "RC Number" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 184,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "rc", name: "rc", value: formData.rc, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 185,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 183,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "address", className: "block text-sm font-medium text-blue-900", children: "Address" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 188,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "address", name: "address", value: formData.address, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 189,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 187,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "country", className: "block text-sm font-medium text-blue-900", children: "Country" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 192,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "country", name: "country", value: formData.country, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 193,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 191,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "ville", className: "block text-sm font-medium text-blue-900", children: "City" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 196,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "ville", name: "ville", value: formData.ville, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 197,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 195,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Settings.tsx",
          lineNumber: 170,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 168,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Change Password" }, void 0, false, {
          fileName: "app/components/Settings.tsx",
          lineNumber: 203,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "block text-sm font-medium text-blue-900", children: "New Password" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 206,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 207,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 205,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password_confirmation", className: "block text-sm font-medium text-blue-900", children: "Confirm New Password" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 210,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password_confirmation", name: "password_confirmation", value: formData.password_confirmation, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Settings.tsx",
              lineNumber: 211,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Settings.tsx",
            lineNumber: 209,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Settings.tsx",
          lineNumber: 204,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 202,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isLoading, className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? "Saving..." : "Save Changes" }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 217,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/components/Settings.tsx",
        lineNumber: 216,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Settings.tsx",
      lineNumber: 167,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Settings.tsx",
    lineNumber: 157,
    columnNumber: 10
  }, this);
}
_s(Settings, "TStVsmA3SHlj6M4AScLA1EdqVE0=", false, function() {
  return [useAuth, useNavigate];
});
_c = Settings;
var _c;
$RefreshReg$(_c, "Settings");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/settings.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\settings.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\settings.tsx"
  );
  import.meta.hot.lastModified = "1747946981131.2122";
}
function SettingsPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Settings", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Settings, {}, void 0, false, {
    fileName: "app/routes/settings.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/settings.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = SettingsPage;
var _c2;
$RefreshReg$(_c2, "SettingsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  SettingsPage as default
};
//# sourceMappingURL=/build/routes/settings-NCTS7NLH.js.map
