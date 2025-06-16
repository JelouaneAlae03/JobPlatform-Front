import {
  DashboardLayout,
  Vt
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

// app/components/Profile.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Profile.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Profile.tsx"
  );
  import.meta.hot.lastModified = "1750111036407.3618";
}
function Profile() {
  _s();
  const {
    user
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
    date: "",
    website: "",
    logo: "",
    description: "",
    password: "",
    password_confirmation: ""
  });
  (0, import_react.useEffect)(() => {
    const fetchCompanyData = async () => {
      try {
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api.get("access_token")}`
        };
        const response = await axios_default.get("http://127.0.0.1:8000/api/company/profile", {
          headers
        });
        const formattedData = {
          ...response.data,
          date: response.data.date ? new Date(response.data.date).toISOString().split("T")[0] : ""
        };
        setFormData((prevData) => ({
          ...prevData,
          ...formattedData
        }));
      } catch (error) {
        console.error("Error fetching company data:", error);
        Vt.error("Failed to fetch company information");
      }
    };
    fetchCompanyData();
  }, []);
  const handleInputChange = (e) => {
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
      if (submitData.date) {
        const date = new Date(submitData.date);
        submitData.date = date.toISOString().split("T")[0];
      }
      console.log("Sending update request with data:", submitData);
      const response = await axios_default.put("http://127.0.0.1:8000/api/company/profile", submitData, {
        headers
      });
      console.log("Update response:", response.data);
      if (response.data) {
        Vt.success("Company information updated successfully");
        setFormData((prev) => ({
          ...prev,
          password: "",
          password_confirmation: ""
        }));
      } else {
        Vt.error("No response data received from server");
      }
    } catch (error) {
      console.error("Error updating company info:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        Vt.error(error.response.data.message || "Failed to update company information");
      } else if (error.request) {
        console.error("No response received:", error.request);
        Vt.error("No response received from server");
      } else {
        console.error("Error message:", error.message);
        Vt.error("Error setting up the request");
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-blue-900", children: "Company Information" }, void 0, false, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 147,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-blue-600 mt-1", children: "Update your company details" }, void 0, false, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 148,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Profile.tsx",
      lineNumber: 146,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Company Details" }, void 0, false, {
          fileName: "app/components/Profile.tsx",
          lineNumber: 155,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", className: "block text-sm font-medium text-blue-900", children: "Company Name" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 158,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 159,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 157,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-sm font-medium text-blue-900", children: "Email" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 162,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 163,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 161,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "rc", className: "block text-sm font-medium text-blue-900", children: "RC Number" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 166,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "rc", name: "rc", value: formData.rc, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 167,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 165,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "date", className: "block text-sm font-medium text-blue-900", children: "Date of Creation" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 170,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", id: "date", name: "date", value: formData.date, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 171,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 169,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "domain", className: "block text-sm font-medium text-blue-900", children: "Domain" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 174,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "domain", name: "domain", value: formData.domain, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 175,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 173,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "website", className: "block text-sm font-medium text-blue-900", children: "Website" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 178,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", id: "website", name: "website", value: formData.website, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 179,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 177,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "country", className: "block text-sm font-medium text-blue-900", children: "Country" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 182,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "country", name: "country", value: formData.country, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 183,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 181,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "ville", className: "block text-sm font-medium text-blue-900", children: "City" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 186,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "ville", name: "ville", value: formData.ville, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 187,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 185,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "address", className: "block text-sm font-medium text-blue-900", children: "Address" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 190,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "address", name: "address", value: formData.address, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 191,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 189,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "description", className: "block text-sm font-medium text-blue-900", children: "Company Description" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 194,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, rows: 4, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 195,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 193,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "logo", className: "block text-sm font-medium text-blue-900", children: "Company Logo URL" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 198,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", id: "logo", name: "logo", value: formData.logo, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 199,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 197,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Profile.tsx",
          lineNumber: 156,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 154,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Change Password" }, void 0, false, {
          fileName: "app/components/Profile.tsx",
          lineNumber: 206,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "block text-sm font-medium text-blue-900", children: "New Password" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 209,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 210,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 208,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password_confirmation", className: "block text-sm font-medium text-blue-900", children: "Confirm Password" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 213,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password_confirmation", name: "password_confirmation", value: formData.password_confirmation, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/Profile.tsx",
              lineNumber: 214,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Profile.tsx",
            lineNumber: 212,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Profile.tsx",
          lineNumber: 207,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 205,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer", children: "Save Changes" }, void 0, false, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 221,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/components/Profile.tsx",
        lineNumber: 220,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Profile.tsx",
      lineNumber: 152,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Profile.tsx",
    lineNumber: 144,
    columnNumber: 10
  }, this);
}
_s(Profile, "sIdgtABdDpRbm0JrztGUJr9h8T8=", false, function() {
  return [useAuth, useNavigate];
});
_c = Profile;
var _c;
$RefreshReg$(_c, "Profile");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/profile.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\profile.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\profile.tsx"
  );
  import.meta.hot.lastModified = "1750015476373.2708";
}
function ProfilePage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Company Profile", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Profile, {}, void 0, false, {
    fileName: "app/routes/profile.tsx",
    lineNumber: 25,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/profile.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = ProfilePage;
var _c2;
$RefreshReg$(_c2, "ProfilePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProfilePage as default
};
//# sourceMappingURL=/build/routes/profile-JAWFDRXZ.js.map
