import React from 'react';
import { Leaf, ShieldCheck, Award, Globe, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <button 
              onClick={() => onNavigate('landing')} 
              className="brand-logo"
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div className="brand-icon-wrapper">
                <Leaf size={24} />
              </div>
              <span>EcoTrace<span className="gradient-text">.AI</span></span>
            </button>
            <p className="footer-brand-desc">
              Built on Indian Architecture & AI Innovation from Pragya's Uttar Pradesh. Empowering global circular economy through vision classification, dynamic valuation, and doorstep logistics.
            </p>
            <div style={{ display: 'flex', gap: '14px', color: 'var(--text-secondary)' }}>
              <a href="#" style={{ color: 'inherit' }} aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" style={{ color: 'inherit' }} aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" style={{ color: 'inherit' }} aria-label="GitHub"><Github size={20} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('platform')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>AI Vision Scanner</button></li>
              <li><button onClick={() => onNavigate('platform')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Valuation Engine</button></li>
              <li><button onClick={() => onNavigate('platform')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>CO₂ Impact Tracker</button></li>
              <li><button onClick={() => onNavigate('platform')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Digital Passport</button></li>
              <li><button onClick={onOpenConsumerApp} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Mobile PWA App</button></li>
            </ul>
          </div>

          {/* Methodology & Solutions */}
          <div>
            <h4 className="footer-col-title">Methodology</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('methodology')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>PCB Material Breakdown</button></li>
              <li><button onClick={() => onNavigate('methodology')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Rare Metal Recovery</button></li>
              <li><button onClick={() => onNavigate('methodology')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>CPCB Guidelines</button></li>
              <li><button onClick={onOpenRecyclerDash} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Recycler Portal</button></li>
            </ul>
          </div>

          {/* Company & Mission */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('mission')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Our Mission & Founders</button></li>
              <li><button onClick={() => onNavigate('company')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Enterprise ESG</button></li>
              <li><button onClick={() => onNavigate('blog')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Press & Articles</button></li>
              <li><button onClick={() => onNavigate('community')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Community Drives</button></li>
            </ul>
          </div>

          {/* Sustainability & Compliance Badges */}
          <div>
            <h4 className="footer-col-title">Compliance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="badge badge-emerald" style={{ width: 'fit-content' }}>
                <ShieldCheck size={14} />
                <span>ISO 14001 Certified</span>
              </div>
              <div className="badge badge-blue" style={{ width: 'fit-content' }}>
                <Award size={14} />
                <span>E-Waste Rules 2026</span>
              </div>
              <div className="badge badge-purple" style={{ width: 'fit-content' }}>
                <Globe size={14} />
                <span>Zero Landfill Alliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Bar */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Subscribe to EcoTrace Enterprise Insights</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get monthly reports on circular economy trends and urban mining benchmarks.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flex: '1', maxWidth: '420px' }}>
            <input 
              type="email" 
              placeholder="Enter your corporate email" 
              style={{
                flex: '1',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button className="btn btn-primary btn-sm">
              <span>Subscribe</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EcoTrace AI Technologies Inc. Developed in Uttar Pradesh, India (PS-33).</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Security Whitepaper</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
