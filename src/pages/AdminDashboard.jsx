import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("messages"); // messages, projects, experiences
  const [loading, setLoading] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Data states
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Modals / Editing states
  const [projectModal, setProjectModal] = useState({ open: false, mode: "add", data: null });
  const [experienceModal, setExperienceModal] = useState({ open: false, mode: "add", data: null });

  // Form states for adding/editing projects
  const [projectForm, setProjectForm] = useState({
    name: "",
    domain: "",
    description: "",
    github: "",
    live: "",
    image: "",
    bgImage: "",
    frameworks: "", // Comma-separated list for easy input
  });

  // Form states for adding/editing experiences
  const [experienceForm, setExperienceForm] = useState({
    name: "",
    pos: "",
    duration: "",
    title: "",
    icon: "/assets/placeholder.svg",
    animation: "victory",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Check and verify token on load
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  // Fetch tab data when token/user/tab changes
  useEffect(() => {
    if (token && user) {
      const loadTabData = async () => {
        setTabLoading(true);
        const startTime = Date.now();
        try {
          if (activeTab === "messages") await fetchMessages();
          if (activeTab === "projects") await fetchProjects();
          if (activeTab === "experiences") await fetchExperiences();
        } catch (err) {
          console.error("Tab data loading failed:", err);
        } finally {
          const elapsed = Date.now() - startTime;
          const delay = Math.max(0, 800 - elapsed);
          setTimeout(() => {
            setTabLoading(false);
          }, delay);
        }
      };

      loadTabData();
    }
  }, [token, user, activeTab]);

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error("Token verification error:", err);
      handleLogout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setUser(data);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setUser(null);
    setMessages([]);
    setProjects([]);
    setExperiences([]);
  };

  // FETCHING DATA FUNCTIONS
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/experiences`);
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  // DELETE OPERATIONS
  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const deleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/experiences/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setExperiences(experiences.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  // UPDATE MESSAGE STATUS
  const toggleMessageStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages(messages.map((m) => (m._id === id ? { ...m, status: newStatus } : m)));
      }
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  // PROJECT SAVE (CREATE & UPDATE)
  const openProjectModal = (mode, data = null) => {
    if (mode === "edit" && data) {
      setProjectForm({
        name: data.name,
        domain: data.domain,
        description: data.description,
        github: data.github || "",
        live: data.live || "",
        image: data.image || "",
        bgImage: data.bgImage || "",
        frameworks: data.frameworks ? data.frameworks.map((f) => f.name).join(", ") : "",
      });
      setProjectModal({ open: true, mode: "edit", data });
    } else {
      setProjectForm({
        name: "",
        domain: "",
        description: "",
        github: "",
        live: "",
        image: "",
        bgImage: "",
        frameworks: "",
      });
      setProjectModal({ open: true, mode: "add", data: null });
    }
  };

  const saveProject = async (e) => {
    e.preventDefault();
    const frameworksArray = projectForm.frameworks
      ? projectForm.frameworks.split(",").map((f) => ({ name: f.trim() })).filter((f) => f.name)
      : [];

    const payload = {
      ...projectForm,
      frameworks: frameworksArray,
    };

    try {
      let res;
      if (projectModal.mode === "edit") {
        res = await fetch(`${API_BASE_URL}/projects/${projectModal.data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        fetchProjects();
        setProjectModal({ open: false, mode: "add", data: null });
      } else {
        alert("Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving project.");
    }
  };

  // EXPERIENCE SAVE (CREATE & UPDATE)
  const openExperienceModal = (mode, data = null) => {
    if (mode === "edit" && data) {
      setExperienceForm({
        name: data.name,
        pos: data.pos,
        duration: data.duration,
        title: data.title,
        icon: data.icon || "/assets/placeholder.svg",
        animation: data.animation || "victory",
      });
      setExperienceModal({ open: true, mode: "edit", data });
    } else {
      setExperienceForm({
        name: "",
        pos: "",
        duration: "",
        title: "",
        icon: "/assets/placeholder.svg",
        animation: "victory",
      });
      setExperienceModal({ open: true, mode: "add", data: null });
    }
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (experienceModal.mode === "edit") {
        res = await fetch(`${API_BASE_URL}/experiences/${experienceModal.data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(experienceForm),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/experiences`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(experienceForm),
        });
      }

      if (res.ok) {
        fetchExperiences();
        setExperienceModal({ open: false, mode: "add", data: null });
      } else {
        alert("Failed to save experience.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving experience.");
    }
  };

  // RENDER LOGIN SCREEN
  if (!token || !user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-20">
        <Helmet>
          <title>Admin Login - Dhiraj Gogoi</title>
        </Helmet>
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light tracking-tight text-white">Admin Portal</h1>
            <p className="mt-2 text-xs text-white/40">Log in to manage your portfolio content.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Email Address</label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.1rem] text-white/40">Password</label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 transition-all focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg border border-white/20 bg-white py-3 text-[11px] font-bold uppercase tracking-[0.15rem] text-black transition-all hover:bg-black hover:text-white hover:border-white/40 disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>

            <Link to="/" className="text-center text-xs text-white/30 hover:text-white/60 transition-colors mt-2">
              &larr; Back to Portfolio
            </Link>
          </form>
        </div>
      </section>
    );
  }

  // RENDER MAIN DASHBOARD
  return (
    <section className="min-h-screen bg-[#050505] text-white px-4 py-28 md:px-10 lg:px-16">
      <Helmet>
        <title>Admin Dashboard - Dhiraj Gogoi</title>
      </Helmet>
      
      <div className="mx-auto max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-white/40 mt-1">Logged in as {user.name} ({user.email})</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white/75 transition hover:bg-white/[0.05]">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-500/30 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-400 transition hover:bg-rose-500/10"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex gap-3 border-b border-white/5 pb-4">
          {[
            { id: "messages", label: "Messages", count: messages.length },
            { id: "projects", label: "Projects", count: projects.length },
            { id: "experiences", label: "Experiences", count: experiences.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "bg-white/[0.02] text-white/50 border border-white/5 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {tab.label} <span className="ml-1 opacity-40">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <div className="flex flex-col gap-6">
              {tabLoading ? (
                /* Messages Skeletons */
                [1, 2].map((n) => (
                  <div key={n} className="rounded-xl border border-white/5 bg-white/[0.01] p-6 animate-pulse flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <div className="h-6 w-32 bg-white/10 rounded" />
                        <div className="h-4 w-44 bg-white/10 rounded" />
                      </div>
                      <div className="h-6 w-20 bg-white/10 rounded" />
                    </div>
                    <div className="h-16 w-full bg-white/10 rounded mt-2" />
                  </div>
                ))
              ) : messages.length === 0 ? (
                <div className="text-center py-20 text-white/30 text-sm">No contact messages received yet.</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`rounded-xl border p-6 transition-all ${
                      msg.status === "unread" ? "bg-white/[0.03] border-white/20" : "bg-transparent border-white/10 opacity-70"
                    }`}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium">{msg.name}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            msg.status === "unread" ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white/40"
                          }`}>
                            {msg.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mt-1">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/30">{new Date(msg.createdAt).toLocaleString()}</span>
                        <button
                          onClick={() => toggleMessageStatus(msg._id, msg.status)}
                          title={msg.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                          className="p-2 rounded bg-white/5 hover:bg-white/10 transition text-white/60 hover:text-white"
                        >
                          <Icon icon={msg.status === "unread" ? "lucide:check-square" : "lucide:square"} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          title="Delete Message"
                          className="p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 transition text-rose-400"
                        >
                          <Icon icon="lucide:trash-2" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/30 mb-2">Subject: {msg.subject}</div>
                      <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light">Manage Projects</h2>
                <button
                  onClick={() => openProjectModal("add")}
                  className="flex items-center gap-2 rounded-lg border border-white/25 bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
                >
                  <Icon icon="lucide:plus" className="w-4 h-4" /> Add Project
                </button>
              </div>

              {tabLoading ? (
                /* Projects skeletons grid */
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="rounded-xl border border-white/10 bg-white/[0.01] p-6 flex flex-col gap-4 animate-pulse">
                      <div className="h-4 w-16 bg-white/10 rounded" />
                      <div className="h-6 w-2/3 bg-white/10 rounded" />
                      <div className="h-12 w-full bg-white/10 rounded" />
                      <div className="flex gap-2">
                        <div className="h-4 w-12 bg-white/10 rounded" />
                        <div className="h-4 w-10 bg-white/10 rounded" />
                      </div>
                      <div className="h-8 w-full bg-white/10 rounded mt-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p) => (
                    <div key={p._id} className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.01] p-6">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{p.domain}</div>
                        <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-6">
                          {p.frameworks?.map((fw, i) => (
                            <span key={i} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/60">
                              {fw.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 border-t border-white/5 pt-4 mt-auto">
                        <button
                          onClick={() => openProjectModal("edit", p)}
                          className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition"
                        >
                          <Icon icon="lucide:edit" className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => deleteProject(p._id)}
                          className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition ml-4"
                        >
                          <Icon icon="lucide:trash-2" className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === "experiences" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light">Manage Experience</h2>
                <button
                  onClick={() => openExperienceModal("add")}
                  className="flex items-center gap-2 rounded-lg border border-white/25 bg-white text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
                >
                  <Icon icon="lucide:plus" className="w-4 h-4" /> Add Experience
                </button>
              </div>

              {tabLoading ? (
                /* Experiences lists skeleton */
                <div className="flex flex-col gap-6">
                  {[1, 2].map((n) => (
                    <div key={n} className="rounded-xl border border-white/10 bg-white/[0.01] p-6 flex flex-col gap-3 animate-pulse">
                      <div className="h-6 w-1/3 bg-white/10 rounded" />
                      <div className="h-4 w-1/4 bg-white/10 rounded mt-1" />
                      <div className="h-16 w-full bg-white/10 rounded mt-3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {experiences.map((exp) => (
                    <div key={exp._id} className="flex justify-between items-start rounded-xl border border-white/10 bg-white/[0.01] p-6 flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold">{exp.name}</h3>
                          <span className="text-xs text-white/40">at {exp.pos}</span>
                          <span className="text-xs bg-white/5 rounded px-2 py-0.5 text-white/60">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap border-l border-white/15 pl-4 mt-3">{exp.title}</p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => openExperienceModal("edit", exp)}
                          className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition"
                        >
                          <Icon icon="lucide:edit" className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => deleteExperience(exp._id)}
                          className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition"
                        >
                          <Icon icon="lucide:trash-2" className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PROJECT ADD/EDIT MODAL */}
      {projectModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h3 className="text-xl font-light">{projectModal.mode === "edit" ? "Edit Project" : "Add New Project"}</h3>
              <button
                onClick={() => setProjectModal({ open: false, mode: "add", data: null })}
                className="text-white/40 hover:text-white"
              >
                <Icon icon="lucide:x" className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={saveProject} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    placeholder="E.g., AI Scam Detector"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Domain / Category *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.domain}
                    onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })}
                    placeholder="E.g., AI / Machine Learning"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Description *</label>
                <textarea
                  required
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Summarize the project goals and features..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">GitHub Link</label>
                  <input
                    type="url"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Live Demo Link</label>
                  <input
                    type="url"
                    value={projectForm.live}
                    onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Image Path / URL</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/assets/projects/..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Background Image Path / URL</label>
                  <input
                    type="text"
                    value={projectForm.bgImage}
                    onChange={(e) => setProjectForm({ ...projectForm, bgImage: e.target.value })}
                    placeholder="/assets/backgrounds/..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Frameworks / Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={projectForm.frameworks}
                  onChange={(e) => setProjectForm({ ...projectForm, frameworks: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg border border-white/20 bg-white py-3 text-[11px] font-bold uppercase tracking-[0.15rem] text-black hover:bg-black hover:text-white transition"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE ADD/EDIT MODAL */}
      {experienceModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h3 className="text-xl font-light">{experienceModal.mode === "edit" ? "Edit Experience" : "Add Experience"}</h3>
              <button
                onClick={() => setExperienceModal({ open: false, mode: "add", data: null })}
                className="text-white/40 hover:text-white"
              >
                <Icon icon="lucide:x" className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={saveExperience} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Role Name (Title) *</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.name}
                    onChange={(e) => setExperienceForm({ ...experienceForm, name: e.target.value })}
                    placeholder="E.g., Full Stack Developer"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.pos}
                    onChange={(e) => setExperienceForm({ ...experienceForm, pos: e.target.value })}
                    placeholder="E.g., ANOVAS"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Duration *</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.duration}
                    onChange={(e) => setExperienceForm({ ...experienceForm, duration: e.target.value })}
                    placeholder="E.g., Oct 2024 – Dec 2025"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Animation Key</label>
                  <input
                    type="text"
                    value={experienceForm.animation}
                    onChange={(e) => setExperienceForm({ ...experienceForm, animation: e.target.value })}
                    placeholder="E.g., victory"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Icon Path / URL</label>
                <input
                  type="text"
                  value={experienceForm.icon}
                  onChange={(e) => setExperienceForm({ ...experienceForm, icon: e.target.value })}
                  placeholder="/assets/placeholder.svg"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Details / Achievements (use bullet points starting with •) *</label>
                <textarea
                  required
                  rows="4"
                  value={experienceForm.title}
                  onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                  placeholder="• Developed and deployed 5+ production-level web applications.&#10;• Built REST APIs with Node.js."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none font-mono"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg border border-white/20 bg-white py-3 text-[11px] font-bold uppercase tracking-[0.15rem] text-black hover:bg-black hover:text-white transition"
              >
                Save Experience
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
