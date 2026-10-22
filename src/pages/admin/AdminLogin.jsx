import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, ADMIN_CREDENTIALS } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      const target = location.state?.from?.pathname || '/admin/dashboard';
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    document.title = "Admin Login | Nilan Infra Management System";
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const emailVal = (email || document.getElementById('admin-email')?.value || '').trim();
    const passVal = password || document.getElementById('admin-password')?.value || '';

    if (!emailVal) {
      setErrorMessage('Please enter your admin login ID.');
      return;
    }
    if (!passVal) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = login(emailVal, passVal, rememberMe);
      setIsLoading(false);

      if (result.success) {
        const target = location.state?.from?.pathname || '/admin/dashboard';
        navigate(target, { replace: true });
      } else {
        setErrorMessage(result.error);
      }
    }, 300);
  };

  const handleQuickFill = (autoSubmit = false) => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    const emailEl = document.getElementById('admin-email');
    const passEl = document.getElementById('admin-password');
    if (emailEl) emailEl.value = ADMIN_CREDENTIALS.email;
    if (passEl) passEl.value = ADMIN_CREDENTIALS.password;
    setErrorMessage('');

    if (autoSubmit) {
      setIsLoading(true);
      setTimeout(() => {
        const result = login(ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password, rememberMe);
        setIsLoading(false);
        if (result.success) {
          const target = location.state?.from?.pathname || '/admin/dashboard';
          navigate(target, { replace: true });
        }
      }, 300);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        
        {/* Left Side: Brand & Lottie Animation */}
        <div className="admin-login-left">
          <div className="admin-left-decorative-circle"></div>
          
          <div className="admin-lottie-wrapper">
            <DotLottieReact
              src="/Nilan.lottie"
              loop
              autoplay
              className="admin-lottie-player"
            />
          </div>

          <div className="admin-brand-info">
            <h1 className="admin-brand-title">NILAN INFRA</h1>
            <p className="admin-brand-subtitle">
                Website Management portal
            </p>
          </div>
        </div>

        {/* Right Side: Login Credentials Card */}
        <div className="admin-login-right">
          <div className="admin-login-card">
            
            {/* Secure Admin Access Badge */}
            <div className="admin-secure-badge">
              <ShieldCheck size={16} className="badge-icon" />
              <span>SECURE ADMIN ACCESS</span>
            </div>

            {/* Header Titles */}
            <div className="admin-login-header">
              <h2 className="admin-login-title">WELCOME BACK</h2>
              <p className="admin-login-subtitle">
                Please enter your credentials to access the admin dashboard.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="admin-error-banner">
                <AlertCircle size={18} className="error-icon" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="admin-login-form">
              
              {/* Username / Email Field */}
              <div className="admin-form-group">
                <label htmlFor="admin-email" className="admin-label">
                  USERNAME
                </label>
                <div className="admin-input-wrapper">
                  <User size={18} className="input-leading-icon" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="nilan.infralimited@gmail.com"
                    className="admin-input"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="admin-form-group">
                <label htmlFor="admin-password" className="admin-label">
                  PASSWORD
                </label>
                <div className="admin-input-wrapper">
                  <Lock size={18} className="input-leading-icon" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="••••••••••••"
                    className="admin-input"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="admin-form-meta">
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-checkbox"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="https://tecnzo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forgot-password-link"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="admin-submit-btn"
              >
                {isLoading ? (
                  <span className="btn-loading-content">
                    <span className="spinner-dots"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={18} className="btn-arrow" />
                  </>
                )}
              </button>
            </form>

            {/* Help & IT Support */}
            <div className="admin-card-footer">
              <div className="support-link-wrapper">
                <HelpCircle size={15} className="support-icon" />
                <span>Having trouble logging in? </span>
                <a
                  href="https://tecnzo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-action-link"
                >
                  Contact IT Support
                </a>
              </div>

              <div className="admin-system-version">
                <span>v2.4.0 — NILAN SYSTEMS</span>
                <span className="dot-sep">•</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
