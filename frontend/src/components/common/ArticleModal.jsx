import React from 'react';
import { X, Calendar, User, Clock, Tag, BookOpen, ShieldCheck, Leaf } from 'lucide-react';

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="article-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close article">
          <X size={20} />
        </button>

        {/* Article Category & Title */}
        <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
          <Tag size={12} />
          <span>{article.category || 'AI E-Waste Research'}</span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1.25', marginBottom: '20px' }}>
          {article.title}
        </h1>

        {/* Article Meta Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          paddingBottom: '20px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-color)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} color="var(--emerald-primary)" />
            <span>By {article.author || 'EcoTrace Research Team'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} color="var(--emerald-primary)" />
            <span>{article.date || 'August 2026'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--emerald-primary)" />
            <span>{article.readTime || '6 min read'}</span>
          </div>
        </div>

        {/* Real Cover Image Hero Header Box */}
        <div style={{
          width: '100%',
          height: '320px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '36px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}>
          <img 
            src={article.coverImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"} 
            alt={article.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.9) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1.1rem' }}>
              EcoTrace Deep-Dive Technical Paper
            </div>
          </div>
        </div>

        {/* Comprehensive Multi-Paragraph Article Content (Requires 2-3 Scroll Turns) */}
        <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '16px' }}>
            1. Executive Summary & Problem Context
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {article.summary || "Electronic waste represents the fastest-growing domestic waste stream globally. Over 50 million metric tons of e-waste are discarded each year, containing critical rare-earth metals, gold, copper, and hazardous chemical compounds. Standard municipal waste systems are ill-equipped to segment component-level materials, resulting in severe environmental toxicity and massive economic loss."}
          </p>

          <p style={{ marginBottom: '24px' }}>
            Through advanced multi-label deep learning vision models trained on tens of thousands of electronic component datasets, EcoTrace introduces real-time material classification at the point of consumer disposal. By automatically computing component purity, market resale values, and carbon offset benchmarks, the platform converts discarded scrap into valuable urban mining feeds.
          </p>

          {/* Key Findings Box */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--emerald-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} />
              <span>Key Analytical Takeaways</span>
            </h3>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><strong>Gold Yield Concentration:</strong> Printed Circuit Boards (PCBs) contain up to 250 grams of gold per ton—over 40x the concentration found in natural gold ore.</li>
              <li><strong>Carbon Abatement Impact:</strong> Recycling 1 metric ton of mixed e-waste prevents approximately 2.8 tons of CO₂ equivalent emissions compared to primary mining extraction.</li>
              <li><strong>Extended Producer Responsibility (EPR):</strong> Compliance guidelines under the E-Waste Management Rules require verified end-to-end digital tracking from donor to smelter.</li>
            </ul>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>
            2. System Architecture & Technological Methodology
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {article.fullContentSection2 || "The neural vision pipeline utilizes a customized Convolutional Neural Network (CNN) paired with Vision Transformers (ViT) to perform multi-task classification. Upon camera shutter trigger, the model segments the device body, identifies structural damage, and estimates the volumetric composition of internal printed circuit boards, copper wire windings, lithium polymer battery cells, and glass substrates."}
          </p>

          <p style={{ marginBottom: '24px' }}>
            Pricing algorithms reference live commodity index data from global metal exchanges, adjusting estimated payouts based on component weight, purity coefficient, and regional recycler demand. This ensures transparent, market-driven valuation for consumers while supplying authorized recyclers with pre-sorted, high-yield material inventory.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>
            3. Environmental Impact & Future Roadmap
          </h2>
          <p style={{ marginBottom: '20px' }}>
            {article.fullContentSection3 || "Integrating localized doorstep collection logistics directly with authorized smelters eliminates informal backyard burning and toxic acid leaching practices. Every item collected generates a digital ESG certificate tracking carbon credits, heavy metal containment, and certified material recovery rates."}
          </p>

          <p style={{ marginBottom: '32px' }}>
            As urban centers scale smart waste infrastructure, AI-driven sorting platforms like EcoTrace form the foundational backbone for municipal circular economy initiatives, keeping critical metals within national supply chains.
          </p>

          {/* Article Footer & Action */}
          <div style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Leaf size={18} color="var(--emerald-primary)" />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>EcoTrace Certified Environmental Paper</span>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              <span>Close & Return to Platform</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
