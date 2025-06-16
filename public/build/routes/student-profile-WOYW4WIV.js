import {
  ProtectedRoute_default
} from "/build/_shared/chunk-YOGAN3OE.js";
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

// app/components/student/StudentProfile.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\student\\\\StudentProfile.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\student\\StudentProfile.tsx"
  );
  import.meta.hot.lastModified = "1750111047267.532";
}
function StudentProfile() {
  _s();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = (0, import_react.useState)({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    ville: "",
    address: "",
    date_of_birth: "",
    sex: "",
    skills: [],
    profile_picture: "",
    password: "",
    password_confirmation: ""
  });
  const [currentSkill, setCurrentSkill] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    const fetchStudentData = async () => {
      try {
        const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api.get("access_token")}`
        };
        const response = await axios_default.get("http://127.0.0.1:8000/api/student/profile", {
          headers
        });
        const skills = response.data.skills ? response.data.skills.split(",").map((skill) => skill.trim()) : [];
        setFormData((prevData) => ({
          ...prevData,
          ...response.data,
          skills
        }));
      } catch (error) {
        console.error("Error fetching student data:", error);
        Vt.error("Failed to fetch student information");
      }
    };
    fetchStudentData();
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
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const skill = currentSkill.trim();
      if (skill && !formData.skills.includes(skill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skill]
        }));
        setCurrentSkill("");
      }
    }
  };
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove)
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
      if (submitData.skills) {
        submitData.skills = submitData.skills.join(",");
      }
      console.log("Sending update request with data:", submitData);
      const response = await axios_default.put("http://127.0.0.1:8000/api/student/profile", submitData, {
        headers
      });
      console.log("Update response:", response.data);
      if (response.data) {
        Vt.success("Student information updated successfully");
        setFormData((prev) => ({
          ...prev,
          password: "",
          password_confirmation: ""
        }));
      } else {
        Vt.error("No response data received from server");
      }
    } catch (error) {
      console.error("Error updating student info:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        Vt.error(error.response.data.message || "Failed to update student information");
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
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-blue-900", children: "Student Information" }, void 0, false, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 160,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-blue-600 mt-1", children: "Update your student details" }, void 0, false, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 161,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/student/StudentProfile.tsx",
      lineNumber: 159,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Personal Details" }, void 0, false, {
          fileName: "app/components/student/StudentProfile.tsx",
          lineNumber: 168,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "first_name", className: "block text-sm font-medium text-blue-900", children: "First Name" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 171,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "first_name", name: "first_name", value: formData.first_name, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 172,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 170,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "last_name", className: "block text-sm font-medium text-blue-900", children: "Last Name" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 175,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "last_name", name: "last_name", value: formData.last_name, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 176,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 174,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-sm font-medium text-blue-900", children: "Email" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 179,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 180,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 178,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "phone", className: "block text-sm font-medium text-blue-900", children: "Phone" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 183,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 184,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 182,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "date_of_birth", className: "block text-sm font-medium text-blue-900", children: "Date of Birth" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 187,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", id: "date_of_birth", name: "date_of_birth", value: formData.date_of_birth, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 188,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 186,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "sex", className: "block text-sm font-medium text-blue-900", children: "Gender" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 191,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "sex", name: "sex", value: formData.sex, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select Gender" }, void 0, false, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 193,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "M", children: "Male" }, void 0, false, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 194,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "F", children: "Female" }, void 0, false, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 195,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 192,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 190,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "country", className: "block text-sm font-medium text-blue-900", children: "Country" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 199,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "country", name: "country", value: formData.country, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 200,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 198,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "ville", className: "block text-sm font-medium text-blue-900", children: "City" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 203,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "ville", name: "ville", value: formData.ville, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 204,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 202,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "address", className: "block text-sm font-medium text-blue-900", children: "Address" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 207,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "address", name: "address", value: formData.address, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 208,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 206,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "profile_picture", className: "block text-sm font-medium text-blue-900", children: "Profile Picture URL" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 211,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "url", id: "profile_picture", name: "profile_picture", value: formData.profile_picture, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 212,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 210,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "skills", className: "block text-sm font-medium text-blue-900", children: "Skills" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 215,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2 mb-2", children: formData.skills.map((skill, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800", children: [
                skill,
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => removeSkill(skill), className: "ml-2 text-blue-600 hover:text-blue-800", children: "\xD7" }, void 0, false, {
                  fileName: "app/components/student/StudentProfile.tsx",
                  lineNumber: 220,
                  columnNumber: 45
                }, this)
              ] }, index, true, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 218,
                columnNumber: 76
              }, this)) }, void 0, false, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 217,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", value: currentSkill, onChange: (e) => setCurrentSkill(e.target.value), onKeyDown: handleSkillKeyDown, placeholder: "Type a skill and press Enter or Space", className: "block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
                fileName: "app/components/student/StudentProfile.tsx",
                lineNumber: 225,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 216,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 214,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/student/StudentProfile.tsx",
          lineNumber: 169,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 167,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-md border border-blue-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-semibold text-blue-900 mb-4", children: "Change Password" }, void 0, false, {
          fileName: "app/components/student/StudentProfile.tsx",
          lineNumber: 233,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", className: "block text-sm font-medium text-blue-900", children: "New Password" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 236,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 237,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 235,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password_confirmation", className: "block text-sm font-medium text-blue-900", children: "Confirm Password" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 240,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", id: "password_confirmation", name: "password_confirmation", value: formData.password_confirmation, onChange: handleInputChange, className: "mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }, void 0, false, {
              fileName: "app/components/student/StudentProfile.tsx",
              lineNumber: 241,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/student/StudentProfile.tsx",
            lineNumber: 239,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/student/StudentProfile.tsx",
          lineNumber: 234,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 232,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer", children: "Save Changes" }, void 0, false, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 248,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/components/student/StudentProfile.tsx",
        lineNumber: 247,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/student/StudentProfile.tsx",
      lineNumber: 165,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/student/StudentProfile.tsx",
    lineNumber: 157,
    columnNumber: 10
  }, this);
}
_s(StudentProfile, "sq9NRxhfZUscCRED9ad5yqBSjEM=", false, function() {
  return [useAuth, useNavigate];
});
_c = StudentProfile;
var _c;
$RefreshReg$(_c, "StudentProfile");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/student-profile.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\student-profile.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\student-profile.tsx"
  );
  import.meta.hot.lastModified = "1750017625391.7205";
}
function StudentProfileRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProtectedRoute_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DashboardLayout, { title: "Student Profile", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(StudentProfile, {}, void 0, false, {
    fileName: "app/routes/student-profile.tsx",
    lineNumber: 27,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "app/routes/student-profile.tsx",
    lineNumber: 26,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/student-profile.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
}
_c2 = StudentProfileRoute;
var _c2;
$RefreshReg$(_c2, "StudentProfileRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  StudentProfileRoute as default
};
//# sourceMappingURL=/build/routes/student-profile-WOYW4WIV.js.map
