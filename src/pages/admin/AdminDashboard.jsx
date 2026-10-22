import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Calculator, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Plus, 
  ExternalLink, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  Trash2, 
  Edit3, 
  Eye, 
  Filter, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Menu, 
  X,
  FileCheck,
  Check,
  Sparkles,
  RefreshCw,
  FolderKanban
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/nilan.png';
import './AdminDashboard.css';

// Initial Mock Data for Projects
const INITIAL_PROJECTS = [
  {
    id: 'PRJ-101',
    name: 'Skyline Commercial Landmark',
    category: 'commercial',
    client: 'Apex Global Ventures',
    location: 'Avinashi Road, Coimbatore',
    budget: '₹4.80 Cr',
    progress: 85,
    status: 'In Progress',
    deadline: 'Dec 2025'
  },
  {
    id: 'PRJ-102',
    name: 'Serene Haven Luxury Villa',
    category: 'residential',
    client: 'Dr. A. Senthil Nathan',
    location: 'Race Course, Coimbatore',
    budget: '₹1.95 Cr',
    progress: 100,
    status: 'Completed',
    deadline: 'Aug 2025'
  },
  {
    id: 'PRJ-103',
    name: 'Mayflower Corporate Hub',
    category: 'commercial',
    client: 'Mayflower Tech Solutions',
    location: 'Peelamedu, Coimbatore',
    budget: '₹6.20 Cr',
    progress: 45,
    status: 'In Progress',
    deadline: 'Apr 2026'
  },
  {
    id: 'PRJ-104',
    name: 'Green Meadows Gated Community',
    category: 'residential',
    client: 'Greenfield Habitats',
    location: 'Vadavalli, Coimbatore',
    budget: '₹8.50 Cr',
    progress: 60,
    status: 'In Progress',
    deadline: 'Nov 2026'
  },
  {
    id: 'PRJ-105',
    name: 'Arasur Industrial Park Access Road',
    category: 'civil',
    client: 'SIPCOT Industrial Infra',
    location: 'Arasur, Coimbatore',
    budget: '₹3.40 Cr',
    progress: 92,
    status: 'In Progress',
    deadline: 'Jan 2026'
  },
  {
    id: 'PRJ-106',
    name: 'Heritage Residence Renovation',
    category: 'renovation',
    client: 'Mr. & Mrs. Ravichandran',
    location: 'RS Puram, Coimbatore',
    budget: '₹65 Lakhs',
    progress: 100,
    status: 'Completed',
    deadline: 'May 2025'
  }
];

// Initial Mock Inquiries / CRM Leads
const INITIAL_INQUIRIES = [
  {
    id: 'INQ-501',
    name: 'K. Ramachandran',
    phone: '+91 98422 13450',
    email: 'k.ramachandran@gmail.com',
    projectType: 'Residential Construction',
    message: 'Interested in constructing a 4BHK contemporary villa of 3,800 sq.ft at Race Course. Seeking quote and architectural design discussion.',
    date: 'Today, 10:45 AM',
    status: 'New',
    budget: '₹1.50 Cr'
  },
  {
    id: 'INQ-502',
    name: 'Vignesh Sundaram',
    phone: '+91 94432 99821',
    email: 'vignesh.sundaram@textech.in',
    projectType: 'Commercial Construction',
    message: 'Planning G+4 commercial showroom building with glass facade and basement parking on Trichy Road.',
    date: 'Yesterday, 4:20 PM',
    status: 'In Progress',
    budget: '₹4.20 Cr'
  },
  {
    id: 'INQ-503',
    name: 'Dr. Meenakshi Sundaram',
    phone: '+91 98941 77234',
    email: 'drmeenakshi@apollohealth.org',
    projectType: 'Renovation & Remodeling',
    message: 'Renovation of 25-year-old ancestral house including structural retrofitting and modern interior layout redesign.',
    date: '16 Oct 2026',
    status: 'Contacted',
    budget: '₹45 Lakhs'
  },
  {
    id: 'INQ-504',
    name: 'Anandhan Murugesan',
    phone: '+91 97890 55123',
    email: 'anand.infra@murugesangroup.com',
    projectType: 'Civil Infrastructure',
    message: 'Storm water drainage and concrete pavement contract for private logistics park near Eachanari.',
    date: '14 Oct 2026',
    status: 'Converted',
    budget: '₹1.80 Cr'
  }
];

// Initial Blog Articles
const INITIAL_BLOGS = [
  {
    id: 1,
    title: 'Top 7 Construction Trends Transforming Coimbatore in 2025',
    category: 'Architecture & Tech',
    date: '12 Oct 2026',
    status: 'Published',
    views: '1,420'
  },
  {
    id: 2,
    title: 'Why High-Grade Fe 550D TMT Steel is Critical for Earthquake Resilience',
    category: 'Engineering',
    date: '04 Oct 2026',
    status: 'Published',
    views: '980'
  },
  {
    id: 3,
    title: 'Cost Estimation Guide: Building Your Dream Villa in Coimbatore',
    category: 'Planning & Finance',
    date: '28 Sep 2026',
    status: 'Published',
    views: '2,890'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Active view tab
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // App Data State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);

  // Filter & Search states
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Notification Toast
  const [toast, setToast] = useState(null);

  // Modals state
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // New Project Form
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'residential',
    client: '',
    location: '',
    budget: '',
    progress: 10,
    status: 'In Progress',
    deadline: ''
  });

  // New Lead Form
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential Construction',
    message: '',
    budget: ''
  });

  // Quotation Estimator State
  const [calcData, setCalcData] = useState({
    clientName: 'K. Ramachandran',
    phone: '+91 98422 13450',
    email: 'k.ramachandran@gmail.com',
    location: 'Race Course, Coimbatore',
    projectType: 'Residential Villa',
    sqft: 2500,
    floors: 'G+1 (2 Floors)',
    grade: 'Premium', // Standard, Premium, Luxury
    ratePerSqFt: 2450
  });

  // Show toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    document.title = "Nilan Infra | Executive Admin Dashboard";
  }, []);

  // Update sqft rate when grade changes
  useEffect(() => {
    let rate = 2100;
    if (calcData.grade === 'Premium') rate = 2550;
    if (calcData.grade === 'Ultra-Luxury') rate = 3200;
    setCalcData(prev => ({ ...prev, ratePerSqFt: rate }));
  }, [calcData.grade]);

  // Derived calculations for Quotation
  const totalEstimatedCost = calcData.sqft * calcData.ratePerSqFt;
  const foundationCost = Math.round(totalEstimatedCost * 0.35);
  const brickCost = Math.round(totalEstimatedCost * 0.20);
  const finishingCost = Math.round(totalEstimatedCost * 0.20);
  const mepCost = Math.round(totalEstimatedCost * 0.15);
  const architecturalCost = Math.round(totalEstimatedCost * 0.10);

  // Format currency in Indian Lakhs / Crores
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Generate and Download PDF Quotation using jsPDF + autoTable
  const handleGeneratePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header brand
      doc.setFillColor(234, 88, 12); // Nilan Orange
      doc.rect(0, 0, 210, 28, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('NILAN INFRA LIMITED', 14, 18);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('PREMIER INFRASTRUCTURE & CONSTRUCTION IN COIMBATORE', 14, 24);
      doc.text('ESTIMATION & BILLING DESK', 140, 18);

      // Metadata box
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('OFFICIAL PROJECT ESTIMATION PROPOSAL', 14, 38);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Ref No: NILAN-EST-${Math.floor(1000 + Math.random() * 9000)}`, 14, 44);
      doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 14, 49);
      doc.text(`GSTIN: 33AVHPN1794J2Z8`, 14, 54);

      // Client Info Box
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 60, 182, 30, 3, 3, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.text('CLIENT & PROJECT DETAILS', 20, 68);
      doc.setFont('helvetica', 'normal');
      doc.text(`Client Name: ${calcData.clientName}`, 20, 75);
      doc.text(`Contact: ${calcData.phone} | ${calcData.email}`, 20, 81);
      doc.text(`Site Location: ${calcData.location}`, 20, 87);

      doc.text(`Project Type: ${calcData.projectType}`, 115, 75);
      doc.text(`Built-up Area: ${calcData.sqft.toLocaleString()} Sq.Ft (${calcData.floors})`, 115, 81);
      doc.text(`Finishing Grade: ${calcData.grade} Spec`, 115, 87);

      // Items Table
      const tableData = [
        ['1', 'Substructure & RCC Foundation', 'Excavation, PCC, RCC Footings, Plinth Beam, Anti-termite treatment (35%)', formatINR(foundationCost)],
        ['2', 'Superstructure & Brick Masonry', 'Fe 550D TMT, Concrete Columns, Solid Blocks, Dual Plastering (20%)', formatINR(brickCost)],
        ['3', 'Flooring, Tiles & Premium Joinery', 'Vitrified/Granite flooring, Teak wood main door, UPVC sliding windows (20%)', formatINR(finishingCost)],
        ['4', 'MEP (Electrical & Sanitary Plumbing)', 'Concealed Finolex wiring, Legrand modular, Astral PVC, Kohler fixtures (15%)', formatINR(mepCost)],
        ['5', 'Architectural, Elevation & Paint', 'Asian Paints Ultima Apex, Elevation louvers, Waterproofing warranty (10%)', formatINR(architecturalCost)],
      ];

      autoTable(doc, {
        startY: 96,
        head: [['S.No', 'Scope of Work', 'Material & Quality Specifications', 'Estimated Amount']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [234, 88, 12],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 8.5
        },
        columnStyles: {
          0: { cellWidth: 14, halign: 'center' },
          1: { cellWidth: 50, fontStyle: 'bold' },
          2: { cellWidth: 78 },
          3: { cellWidth: 40, halign: 'right' }
        }
      });

      // Summary
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFillColor(255, 247, 237);
      doc.roundedRect(110, finalY, 86, 26, 2, 2, 'F');
      
      doc.setFont('helvetica', 'normal');
      doc.text('Base Rate Per Sq.Ft:', 115, finalY + 8);
      doc.text(`₹${calcData.ratePerSqFt} / sq.ft`, 175, finalY + 8, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(234, 88, 12);
      doc.text('Total Estimated Project Value:', 115, finalY + 18);
      doc.text(formatINR(totalEstimatedCost), 190, finalY + 18, { align: 'right' });

      // Terms & Sign
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('* Quote valid for 30 calendar days from date of issue.', 14, finalY + 35);
      doc.text('* Final billing subject to soil test report and customized architectural CAD drawings.', 14, finalY + 40);
      doc.text('* Payment milestones linked with stage-wise site engineering inspection sign-offs.', 14, finalY + 45);

      doc.setFont('helvetica', 'bold');
      doc.text('For NILAN INFRA LIMITED', 140, finalY + 42);
      doc.text('Authorized Signatory & Chief Project Engineer', 140, finalY + 54);

      doc.save(`Nilan_Infra_Estimate_${calcData.clientName.replace(/\s+/g, '_')}.pdf`);
      showToast('Official PDF Quotation generated and downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate PDF. Please try again.', 'error');
    }
  };

  // Add New Project Action
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.budget.trim()) {
      showToast('Please provide a project name and budget.', 'error');
      return;
    }

    const createdProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: newProject.name,
      category: newProject.category,
      client: newProject.client || 'Direct Client',
      location: newProject.location || 'Coimbatore, Tamil Nadu',
      budget: newProject.budget.startsWith('₹') ? newProject.budget : `₹${newProject.budget}`,
      progress: Number(newProject.progress) || 10,
      status: newProject.status,
      deadline: newProject.deadline || 'Q4 2026'
    };

    setProjects([createdProject, ...projects]);
    setShowAddProjectModal(false);
    setNewProject({
      name: '',
      category: 'residential',
      client: '',
      location: '',
      budget: '',
      progress: 10,
      status: 'In Progress',
      deadline: ''
    });
    showToast(`Project "${createdProject.name}" added successfully!`);
  };

  // Add New Lead Action
  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLead.name.trim() || !newLead.phone.trim()) {
      showToast('Please fill out the contact name and phone.', 'error');
      return;
    }

    const createdLead = {
      id: `INQ-${Math.floor(500 + Math.random() * 500)}`,
      name: newLead.name,
      phone: newLead.phone,
      email: newLead.email || 'pending@contact.in',
      projectType: newLead.projectType,
      message: newLead.message || 'Direct offline phone consultation inquiry.',
      date: 'Just now',
      status: 'New',
      budget: newLead.budget || 'To be estimated'
    };

    setInquiries([createdLead, ...inquiries]);
    setShowAddLeadModal(false);
    setNewLead({
      name: '',
      phone: '',
      email: '',
      projectType: 'Residential Construction',
      message: '',
      budget: ''
    });
    showToast(`New inquiry for "${createdLead.name}" logged successfully!`);
  };

  // Delete Project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    showToast('Project deleted from registry.', 'info');
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = (id, newStatus) => {
    setInquiries(inquiries.map(item => item.id === id ? { ...item, status: newStatus } : item));
    showToast(`Inquiry status updated to "${newStatus}"!`);
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id) => {
    setInquiries(inquiries.filter(i => i.id !== id));
    showToast('Inquiry removed.', 'info');
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // Filtered Projects
  const filteredProjects = projects.filter(p => {
    const matchesCategory = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.location.toLowerCase().includes(projectSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(i => {
    const matchesStatus = inquiryStatusFilter === 'all' || i.status.toLowerCase() === inquiryStatusFilter.toLowerCase();
    const matchesSearch = i.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          i.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          i.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          i.projectType.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-dashboard-layout">

      {/* Floating Action Toast Notification */}
      {toast && (
        <div className={`admin-toast-banner ${toast.type}`}>
          {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Mobile Backdrop */}
      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* =========================================================
          LEFT SIDEBAR NAVIGATION
          ========================================================= */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo-link">
            <img src={logo} alt="Nilan Infra Logo" className="sidebar-logo-img" />
          </Link>
          <div className="sidebar-brand-text">
            <h2>NILAN INFRA</h2>
            <span>Admin Suite</span>
          </div>
          <button 
            type="button" 
            className="sidebar-close-mobile" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-nav-container">
          <div className="nav-section-title">CORE MANAGEMENT</div>
          <ul className="sidebar-nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
              >
                <LayoutDashboard size={18} />
                <span>Overview & Analytics</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}
              >
                <Building2 size={18} />
                <span>Projects Registry</span>
                <span className="nav-badge-pill">{projects.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                onClick={() => { setActiveTab('inquiries'); setSidebarOpen(false); }}
              >
                <Users size={18} />
                <span>Leads & Inquiries</span>
                <span className="nav-badge-pill highlight">{inquiries.filter(i => i.status === 'New').length} New</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'quotes' ? 'active' : ''}`}
                onClick={() => { setActiveTab('quotes'); setSidebarOpen(false); }}
              >
                <Calculator size={18} />
                <span>Quote & Cost Estimator</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                onClick={() => { setActiveTab('blogs'); setSidebarOpen(false); }}
              >
                <FileText size={18} />
                <span>Blog & Articles</span>
              </button>
            </li>
          </ul>

          <div className="nav-section-title">SYSTEM & SECURITY</div>
          <ul className="sidebar-nav-list">
            <li>
              <button
                type="button"
                className={`nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
              >
                <Settings size={18} />
                <span>Settings & Profile</span>
              </button>
            </li>
            <li>
              <Link to="/" target="_blank" className="nav-item-btn external-link">
                <ExternalLink size={18} />
                <span>View Public Website</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* User Profile Card at bottom of sidebar */}
        <div className="sidebar-footer">
          <div className="admin-user-card">
            <div className="user-avatar-circle">
              {currentUser?.avatar || 'NI'}
            </div>
            <div className="user-details">
              <h4>{currentUser?.name || 'Nilan Administrator'}</h4>
              <p>{currentUser?.email || 'nilan.infralimited@gmail.com'}</p>
              <span className="role-tag">Super Admin</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleLogout} 
            className="sidebar-logout-btn" 
            title="Log Out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN CONTENT AREA
          ========================================================= */}
      <main className="admin-main">
        
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button 
              type="button" 
              className="mobile-menu-trigger" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="breadcrumb-box">
              <span className="portal-tag">Nilan Admin Portal</span>
              <ChevronRight size={14} className="crumb-sep" />
              <h1 className="topbar-view-title">
                {activeTab === 'overview' && 'Executive Overview & Analytics'}
                {activeTab === 'projects' && 'Infrastructure & Projects Registry'}
                {activeTab === 'inquiries' && 'Client Inquiries & CRM Leads'}
                {activeTab === 'quotes' && 'Instant Construction Quotation Generator'}
                {activeTab === 'blogs' && 'News & Construction Editorial Hub'}
                {activeTab === 'settings' && 'System Security & Administrator Profile'}
              </h1>
            </div>
          </div>

          <div className="topbar-right">
            {/* Live Operational status */}
            <div className="system-status-indicator">
              <span className="status-dot-pulse"></span>
              <span>All Systems Live • Coimbatore</span>
            </div>

            {/* Notification Bell */}
            <div className="notification-wrapper">
              <button 
                type="button" 
                className="notification-btn"
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              >
                <Bell size={19} />
                <span className="notification-badge">{inquiries.filter(i => i.status === 'New').length}</span>
              </button>

              {showNotificationsDropdown && (
                <div className="notification-dropdown">
                  <div className="notif-dropdown-header">
                    <h4>Recent Inquiries ({inquiries.length})</h4>
                    <button 
                      type="button" 
                      onClick={() => setShowNotificationsDropdown(false)}
                      className="close-dropdown-btn"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="notif-dropdown-list">
                    {inquiries.slice(0, 4).map(item => (
                      <div 
                        key={item.id} 
                        className="notif-item"
                        onClick={() => {
                          setActiveTab('inquiries');
                          setShowNotificationsDropdown(false);
                        }}
                      >
                        <div className="notif-icon-circle">
                          <Users size={14} />
                        </div>
                        <div className="notif-text">
                          <p className="notif-sender">{item.name} <span>({item.projectType})</span></p>
                          <p className="notif-time">{item.date}</p>
                        </div>
                        {item.status === 'New' && <span className="notif-new-dot"></span>}
                      </div>
                    ))}
                  </div>
                  <div className="notif-dropdown-footer">
                    <button 
                      type="button" 
                      onClick={() => {
                        setActiveTab('inquiries');
                        setShowNotificationsDropdown(false);
                      }}
                    >
                      View All Leads & Inquiries →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout shortcut */}
            <button 
              type="button" 
              onClick={handleLogout} 
              className="quick-logout-btn"
              title="Secure Logout"
            >
              <LogOut size={16} />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Tab Rendering */}
        <div className="dashboard-content-body">
          
          {/* =========================================================
              VIEW 1: OVERVIEW & ANALYTICS
              ========================================================= */}
          {activeTab === 'overview' && (
            <div className="overview-view-container">
              
              {/* Quick Hero Banner */}
              <div className="admin-welcome-hero">
                <div className="welcome-text">
                  <h2>Welcome back, Nilan Infra Operations</h2>
                  <p>
                    Here is what’s happening with your civil construction sites, client inquiries, and budget estimations in Coimbatore today.
                  </p>
                </div>
                <div className="welcome-quick-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowAddProjectModal(true)} 
                    className="hero-action-btn primary"
                  >
                    <Plus size={16} />
                    <span>New Project</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('quotes')} 
                    className="hero-action-btn secondary"
                  >
                    <Calculator size={16} />
                    <span>Instant Quote</span>
                  </button>
                </div>
              </div>

              {/* KPI Stat Cards */}
              <div className="kpi-cards-grid">
                
                <div className="kpi-card">
                  <div className="kpi-icon-wrapper orange">
                    <Building2 size={24} />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Active Construction Sites</span>
                    <h3 className="kpi-value">{projects.filter(p => p.status === 'In Progress').length} Ongoing</h3>
                    <div className="kpi-trend positive">
                      <TrendingUp size={14} />
                      <span>{projects.length} Total Projects In Registry</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-wrapper amber">
                    <Users size={24} />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Client Inquiries & Leads</span>
                    <h3 className="kpi-value">{inquiries.length} Active</h3>
                    <div className="kpi-trend warning">
                      <span>{inquiries.filter(i => i.status === 'New').length} require response</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-wrapper green">
                    <DollarSign size={24} />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Contract Portfolio Value</span>
                    <h3 className="kpi-value">₹24.85 Cr</h3>
                    <div className="kpi-trend positive">
                      <TrendingUp size={14} />
                      <span>+14.2% YoY growth</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-wrapper blue">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="kpi-content">
                    <span className="kpi-label">Quality & Safety Compliance</span>
                    <h3 className="kpi-value">99.4%</h3>
                    <div className="kpi-trend positive">
                      <CheckCircle2 size={14} />
                      <span>ISO 9001:2015 Standards</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Two-Column Layout: Project Tracker & Inquiries Feed */}
              <div className="overview-columns-grid">
                
                {/* Column 1: Ongoing Projects Progress Tracker */}
                <div className="dashboard-widget-card">
                  <div className="widget-header">
                    <div>
                      <h3>Active Projects Milestones</h3>
                      <p>Real-time completion percentage by site</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('projects')} 
                      className="widget-view-all"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="project-progress-list">
                    {projects.slice(0, 4).map(project => (
                      <div key={project.id} className="project-progress-item">
                        <div className="prog-title-row">
                          <div>
                            <h4>{project.name}</h4>
                            <span className="project-loc">{project.location}</span>
                          </div>
                          <span className={`status-pill ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {project.status}
                          </span>
                        </div>

                        <div className="prog-meta-row">
                          <span className="prog-budget">Budget: <strong>{project.budget}</strong></span>
                          <span className="prog-percent">{project.progress}% completed</span>
                        </div>

                        <div className="progress-bar-track">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Recent Customer Inquiries Feed */}
                <div className="dashboard-widget-card">
                  <div className="widget-header">
                    <div>
                      <h3>Recent Inquiries & CRM Leads</h3>
                      <p>Direct requests from website visitors</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('inquiries')} 
                      className="widget-view-all"
                    >
                      Manage Leads →
                    </button>
                  </div>

                  <div className="inquiry-feed-list">
                    {inquiries.slice(0, 4).map(lead => (
                      <div key={lead.id} className="inquiry-feed-item">
                        <div className="lead-header-row">
                          <div className="lead-avatar-initials">
                            {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="lead-info">
                            <h4>{lead.name}</h4>
                            <span className="lead-type">{lead.projectType} • {lead.budget}</span>
                          </div>
                          <span className={`lead-status-badge ${lead.status.toLowerCase()}`}>
                            {lead.status}
                          </span>
                        </div>

                        <p className="lead-snippet-message">"{lead.message}"</p>

                        <div className="lead-action-row">
                          <span className="lead-timestamp">{lead.date}</span>
                          <div className="quick-lead-buttons">
                            <a href={`tel:${lead.phone}`} className="lead-quick-btn call" title="Call Client">
                              <Phone size={13} />
                              <span>Call</span>
                            </a>
                            <a 
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="lead-quick-btn whatsapp" 
                              title="WhatsApp"
                            >
                              <MessageSquare size={13} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================
              VIEW 2: PROJECTS REGISTRY
              ========================================================= */}
          {activeTab === 'projects' && (
            <div className="projects-view-container">
              
              <div className="view-toolbar">
                <div className="toolbar-search">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search by project name, client or location..."
                  />
                  {projectSearch && (
                    <button type="button" onClick={() => setProjectSearch('')} className="clear-search">
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="toolbar-filters">
                  <div className="category-filter-pills">
                    {['all', 'residential', 'commercial', 'civil', 'renovation'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`filter-pill-btn ${projectCategoryFilter === cat ? 'active' : ''}`}
                        onClick={() => setProjectCategoryFilter(cat)}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setShowAddProjectModal(true)} 
                    className="add-new-btn"
                  >
                    <Plus size={16} />
                    <span>Add Project</span>
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="projects-cards-grid">
                {filteredProjects.map(project => (
                  <div key={project.id} className="project-management-card">
                    
                    <div className="pm-card-header">
                      <span className="pm-category-pill">{project.category}</span>
                      <span className={`status-pill ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="pm-title">{project.name}</h3>
                    <p className="pm-location">{project.location}</p>

                    <div className="pm-details-box">
                      <div className="pm-detail-item">
                        <span className="pm-label">Client</span>
                        <strong className="pm-value">{project.client}</strong>
                      </div>
                      <div className="pm-detail-item">
                        <span className="pm-label">Contract Value</span>
                        <strong className="pm-value highlight">{project.budget}</strong>
                      </div>
                      <div className="pm-detail-item">
                        <span className="pm-label">Target Handover</span>
                        <strong className="pm-value">{project.deadline}</strong>
                      </div>
                    </div>

                    <div className="pm-progress-section">
                      <div className="pm-progress-labels">
                        <span>Work Completed</span>
                        <strong>{project.progress}%</strong>
                      </div>
                      <div className="progress-bar-track">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="pm-card-footer">
                      <span className="pm-id-tag">{project.id}</span>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteProject(project.id)} 
                        className="pm-delete-btn"
                        title="Delete project"
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>
                ))}

                {filteredProjects.length === 0 && (
                  <div className="empty-state-card">
                    <FolderKanban size={48} className="empty-icon" />
                    <h3>No projects match your search criteria</h3>
                    <p>Try clearing filters or search keywords.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* =========================================================
              VIEW 3: CLIENT INQUIRIES & LEADS (CRM)
              ========================================================= */}
          {activeTab === 'inquiries' && (
            <div className="inquiries-view-container">
              
              <div className="view-toolbar">
                <div className="toolbar-search">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search leads by name, phone, email or project type..."
                  />
                  {inquirySearch && (
                    <button type="button" onClick={() => setInquirySearch('')} className="clear-search">
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="toolbar-filters">
                  <div className="category-filter-pills">
                    {['all', 'new', 'in progress', 'contacted', 'converted'].map(status => (
                      <button
                        key={status}
                        type="button"
                        className={`filter-pill-btn ${inquiryStatusFilter === status ? 'active' : ''}`}
                        onClick={() => setInquiryStatusFilter(status)}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setShowAddLeadModal(true)} 
                    className="add-new-btn"
                  >
                    <Plus size={16} />
                    <span>Log Offline Lead</span>
                  </button>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="table-wrapper-card">
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Contact Info</th>
                      <th>Requirement & Message</th>
                      <th>Status</th>
                      <th>Date Received</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(inq => (
                      <tr key={inq.id}>
                        <td>
                          <div className="table-client-name">
                            <strong>{inq.name}</strong>
                            <span className="client-id-sub">{inq.id}</span>
                          </div>
                        </td>
                        <td>
                          <div className="table-contact-info">
                            <a href={`tel:${inq.phone}`} className="contact-link">
                              <Phone size={13} /> {inq.phone}
                            </a>
                            <a href={`mailto:${inq.email}`} className="contact-link email">
                              <Mail size={13} /> {inq.email}
                            </a>
                          </div>
                        </td>
                        <td>
                          <div className="table-message-box">
                            <span className="project-type-tag">{inq.projectType}</span>
                            <p>{inq.message}</p>
                          </div>
                        </td>
                        <td>
                          <select 
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className={`table-status-select ${inq.status.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <span className="table-date">{inq.date}</span>
                        </td>
                        <td>
                          <div className="table-action-buttons">
                            <a 
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="tbl-icon-btn whatsapp"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={16} />
                            </a>
                            <button 
                              type="button" 
                              onClick={() => handleDeleteInquiry(inq.id)} 
                              className="tbl-icon-btn delete"
                              title="Remove Inquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredInquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" className="table-empty-row">
                          No inquiries found for this filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* =========================================================
              VIEW 4: QUOTATION & COST ESTIMATOR
              ========================================================= */}
          {activeTab === 'quotes' && (
            <div className="quote-calculator-view">
              
              <div className="calculator-layout-grid">
                
                {/* Form Controls */}
                <div className="calc-inputs-card">
                  <div className="card-heading-group">
                    <Calculator size={22} className="card-heading-icon" />
                    <div>
                      <h3>Civil Construction Cost Estimator</h3>
                      <p>Generate precise stage-wise estimation and export client PDF proposal</p>
                    </div>
                  </div>

                  <div className="calc-form-grid">
                    
                    <div className="calc-field">
                      <label>Client Full Name</label>
                      <input
                        type="text"
                        value={calcData.clientName}
                        onChange={(e) => setCalcData({ ...calcData, clientName: e.target.value })}
                        placeholder="e.g. Dr. K. Ramachandran"
                      />
                    </div>

                    <div className="calc-field">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={calcData.phone}
                        onChange={(e) => setCalcData({ ...calcData, phone: e.target.value })}
                        placeholder="+91 98422 13450"
                      />
                    </div>

                    <div className="calc-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={calcData.email}
                        onChange={(e) => setCalcData({ ...calcData, email: e.target.value })}
                        placeholder="client@gmail.com"
                      />
                    </div>

                    <div className="calc-field">
                      <label>Site Location (Coimbatore)</label>
                      <input
                        type="text"
                        value={calcData.location}
                        onChange={(e) => setCalcData({ ...calcData, location: e.target.value })}
                        placeholder="e.g. Race Course / RS Puram / Vadavalli"
                      />
                    </div>

                    <div className="calc-field">
                      <label>Project Type</label>
                      <select
                        value={calcData.projectType}
                        onChange={(e) => setCalcData({ ...calcData, projectType: e.target.value })}
                      >
                        <option value="Residential Villa">Residential Villa Construction</option>
                        <option value="Commercial Complex">Commercial Hub / Office Complex</option>
                        <option value="Civil Infrastructure">Road & Civil Works</option>
                        <option value="Renovation & Remodeling">Turnkey Renovation</option>
                      </select>
                    </div>

                    <div className="calc-field">
                      <label>Number of Floors</label>
                      <select
                        value={calcData.floors}
                        onChange={(e) => setCalcData({ ...calcData, floors: e.target.value })}
                      >
                        <option value="Ground Floor Only">Ground Floor Only (G)</option>
                        <option value="G+1 (2 Floors)">G + 1 (2 Floors)</option>
                        <option value="G+2 (3 Floors)">G + 2 (3 Floors)</option>
                        <option value="G+3 (4 Floors)">G + 3 (4 Floors)</option>
                      </select>
                    </div>

                    <div className="calc-field full-width">
                      <div className="slider-label-row">
                        <label>Total Built-up Area: <strong>{calcData.sqft.toLocaleString()} Sq.Ft</strong></label>
                      </div>
                      <input
                        type="range"
                        min="800"
                        max="15000"
                        step="100"
                        value={calcData.sqft}
                        onChange={(e) => setCalcData({ ...calcData, sqft: Number(e.target.value) })}
                        className="sqft-range-slider"
                      />
                    </div>

                    <div className="calc-field full-width">
                      <label>Construction Specification Grade</label>
                      <div className="grade-selector-grid">
                        
                        <div 
                          className={`grade-card ${calcData.grade === 'Standard' ? 'active' : ''}`}
                          onClick={() => setCalcData({ ...calcData, grade: 'Standard' })}
                        >
                          <h4>Standard Spec</h4>
                          <span className="grade-price">₹2,100 / sq.ft</span>
                          <p>TMT Fe 500, Vitrified 2x2, standard bath fittings & paint.</p>
                        </div>

                        <div 
                          className={`grade-card ${calcData.grade === 'Premium' ? 'active' : ''}`}
                          onClick={() => setCalcData({ ...calcData, grade: 'Premium' })}
                        >
                          <span className="best-badge">POPULAR</span>
                          <h4>Premium Spec</h4>
                          <span className="grade-price">₹2,550 / sq.ft</span>
                          <p>Fe 550D TMT, Granite stairs, 4x2 GVT tiles, Kohler/Jaguar fixtures.</p>
                        </div>

                        <div 
                          className={`grade-card ${calcData.grade === 'Ultra-Luxury' ? 'active' : ''}`}
                          onClick={() => setCalcData({ ...calcData, grade: 'Ultra-Luxury' })}
                        >
                          <h4>Ultra-Luxury</h4>
                          <span className="grade-price">₹3,200 / sq.ft</span>
                          <p>Italian marble, Teak wood, automated smart home, structural facade.</p>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                {/* Estimate Summary & PDF Generation Card */}
                <div className="calc-summary-card">
                  <div className="summary-header">
                    <h3>Estimated Project Value</h3>
                    <div className="summary-big-total">
                      {formatINR(totalEstimatedCost)}
                    </div>
                    <span className="rate-subtext">@ ₹{calcData.ratePerSqFt}/sq.ft for {calcData.sqft.toLocaleString()} sq.ft</span>
                  </div>

                  <div className="cost-breakdown-list">
                    <h4>Stage-wise Budget Allocation</h4>

                    <div className="breakdown-item">
                      <span>Substructure & Foundation (35%)</span>
                      <strong>{formatINR(foundationCost)}</strong>
                    </div>

                    <div className="breakdown-item">
                      <span>Superstructure & Masonry (20%)</span>
                      <strong>{formatINR(brickCost)}</strong>
                    </div>

                    <div className="breakdown-item">
                      <span>Flooring, Joinery & Finishing (20%)</span>
                      <strong>{formatINR(finishingCost)}</strong>
                    </div>

                    <div className="breakdown-item">
                      <span>MEP Electrical & Plumbing (15%)</span>
                      <strong>{formatINR(mepCost)}</strong>
                    </div>

                    <div className="breakdown-item">
                      <span>Architectural Elevation & Paint (10%)</span>
                      <strong>{formatINR(architecturalCost)}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGeneratePDF}
                    className="generate-pdf-btn"
                  >
                    <Download size={18} />
                    <span>Download Branded PDF Quotation</span>
                  </button>

                  <div className="pdf-guarantee-note">
                    <CheckCircle2 size={15} />
                    <span>PDF includes Nilan Infra GSTIN, payment stages & ISO terms</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================
              VIEW 5: BLOG ARTICLES MANAGEMENT
              ========================================================= */}
          {activeTab === 'blogs' && (
            <div className="blogs-view-container">
              <div className="view-toolbar">
                <div className="toolbar-info">
                  <h3>Published Articles & Insights</h3>
                  <p>Manage thought leadership pieces visible on the Nilan Infra Blog</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => showToast('Blog article creator opened.')} 
                  className="add-new-btn"
                >
                  <Plus size={16} />
                  <span>New Article</span>
                </button>
              </div>

              <div className="table-wrapper-card">
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Article Title</th>
                      <th>Category</th>
                      <th>Date Published</th>
                      <th>Total Reads</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map(blog => (
                      <tr key={blog.id}>
                        <td>
                          <strong>{blog.title}</strong>
                        </td>
                        <td>
                          <span className="project-type-tag">{blog.category}</span>
                        </td>
                        <td>{blog.date}</td>
                        <td>{blog.views} views</td>
                        <td>
                          <span className="status-pill completed">{blog.status}</span>
                        </td>
                        <td>
                          <div className="table-action-buttons">
                            <Link to="/blog" target="_blank" className="tbl-icon-btn whatsapp" title="View Article">
                              <ExternalLink size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              VIEW 6: SETTINGS & SECURITY
              ========================================================= */}
          {activeTab === 'settings' && (
            <div className="settings-view-container">
              
              <div className="settings-grid">
                
                {/* Admin Profile Box */}
                <div className="settings-box">
                  <h3>Administrator Profile</h3>
                  <div className="profile-info-row">
                    <div className="large-profile-avatar">NI</div>
                    <div className="profile-meta">
                      <h4>Nilan Administrator</h4>
                      <p>nilan.infralimited@gmail.com</p>
                      <span className="badge-superadmin">Master Super Administrator</span>
                    </div>
                  </div>

                  <div className="settings-fields-group">
                    <div className="set-field">
                      <label>Authorized Admin Email</label>
                      <input type="text" value="nilan.infralimited@gmail.com" readOnly />
                    </div>
                    <div className="set-field">
                      <label>Headquarters Location</label>
                      <input type="text" value="Vadavalli, Coimbatore – 641046" readOnly />
                    </div>
                  </div>
                </div>

                {/* System Security Box */}
                <div className="settings-box">
                  <h3>Security & Sessions</h3>
                  
                  <div className="security-status-indicator">
                    <ShieldCheck size={28} className="shield-ok" />
                    <div>
                      <h4>Session is Encrypted & Guarded</h4>
                      <p>Last authenticated: {new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>

                  <div className="audit-items-list">
                    <div className="audit-item">
                      <span>Active Session Device</span>
                      <strong>Current Browser (Windows)</strong>
                    </div>
                    <div className="audit-item">
                      <span>Registered Login ID</span>
                      <code>nilan.infralimited@gmail.com</code>
                    </div>
                    <div className="audit-item">
                      <span>Encrypted Master Password</span>
                      <code>Nilan@321</code>
                    </div>
                  </div>

                  <div className="settings-btn-row">
                    <button 
                      type="button" 
                      onClick={() => showToast('System logs and cache refreshed!')} 
                      className="refresh-cache-btn"
                    >
                      <RefreshCw size={15} />
                      <span>Refresh System Cache</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={handleLogout} 
                      className="signout-settings-btn"
                    >
                      <LogOut size={15} />
                      <span>End Active Session</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* =========================================================
          MODAL: ADD NEW PROJECT
          ========================================================= */}
      {showAddProjectModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddProjectModal(false)}>
          <div className="admin-modal-box large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <Building2 size={20} className="modal-icon" />
                <h3>Add New Infrastructure Project</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowAddProjectModal(false)}
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject}>
              <div className="modal-body modal-form-grid">
                
                <div className="modal-form-field full">
                  <label>Project Name *</label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="e.g. Sapphire Residency Gated Community"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="civil">Civil Infrastructure</option>
                    <option value="renovation">Renovation & Remodeling</option>
                  </select>
                </div>

                <div className="modal-form-field">
                  <label>Contract Budget (₹) *</label>
                  <input
                    type="text"
                    required
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    placeholder="e.g. ₹2.80 Cr"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Client Name / Entity</label>
                  <input
                    type="text"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. S. Karthikeyan"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Location (Coimbatore)</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. Gandhipuram / Thudiyalur"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Initial Progress ({newProject.progress}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newProject.progress}
                    onChange={(e) => setNewProject({ ...newProject, progress: e.target.value })}
                  />
                </div>

                <div className="modal-form-field">
                  <label>Target Handover Deadline</label>
                  <input
                    type="text"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    placeholder="e.g. March 2026"
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddProjectModal(false)}
                  className="modal-secondary-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-primary-btn"
                >
                  Add Project to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: LOG OFFLINE LEAD
          ========================================================= */}
      {showAddLeadModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddLeadModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <Users size={20} className="modal-icon" />
                <h3>Log Offline Client Lead</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowAddLeadModal(false)}
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddLead}>
              <div className="modal-body modal-form-grid">
                
                <div className="modal-form-field full">
                  <label>Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. S. Balasubramaniam"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98422 00000"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="client@gmail.com"
                  />
                </div>

                <div className="modal-form-field">
                  <label>Requirement Type</label>
                  <select
                    value={newLead.projectType}
                    onChange={(e) => setNewLead({ ...newLead, projectType: e.target.value })}
                  >
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Civil Infrastructure">Civil Infrastructure</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                  </select>
                </div>

                <div className="modal-form-field">
                  <label>Estimated Budget</label>
                  <input
                    type="text"
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    placeholder="e.g. ₹85 Lakhs"
                  />
                </div>

                <div className="modal-form-field full">
                  <label>Notes / Requirements</label>
                  <textarea
                    rows="3"
                    value={newLead.message}
                    onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                    placeholder="Details about plot size, location, requirements..."
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setShowAddLeadModal(false)}
                  className="modal-secondary-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-primary-btn"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
