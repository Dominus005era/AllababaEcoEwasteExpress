import React from 'react';
import { X, Calendar, User, Clock, Tag, BookOpen, ShieldCheck, Leaf } from 'lucide-react';

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay article-modal-backdrop animate-fadeIn" onClick={onClose}>
      <div className="article-modal-container animate-scaleUp" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header Bar with Badge & Responsive Close Button */}
        <div className="article-modal-top-bar">
          <div className="badge badge-emerald">
            <Tag size={12} />
            <span>{article.category || 'AI E-Waste Research'}</span>
          </div>
          <button className="article-modal-close-btn" onClick={onClose} aria-label="Close article">
            <X size={18} />
          </button>
        </div>

        {/* Article Title */}
        <h1 className="article-modal-title">
          {article.title}
        </h1>

        {/* Article Meta Row */}
        <div className="article-modal-meta-row">
          <div className="article-meta-item">
            <User size={15} color="var(--emerald-primary)" />
            <span>By {article.author || 'EcoTrace Research Team'}</span>
          </div>
          <div className="article-meta-item">
            <Calendar size={15} color="var(--emerald-primary)" />
            <span>{article.date || 'August 2026'}</span>
          </div>
          <div className="article-meta-item">
            <Clock size={15} color="var(--emerald-primary)" />
            <span>{article.readTime || '6 min read'}</span>
          </div>
        </div>

        {/* Cover Image Header Box */}
        <div className="article-modal-hero-img-box">
          <img 
            src={article.coverImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"} 
            alt={article.title} 
            className="article-modal-hero-img"
          />
          <div className="article-modal-hero-overlay">
            <div className="hero-paper-badge">
              EcoTrace Deep-Dive Technical Paper
            </div>
          </div>
        </div>

        {/* Article Multi-Section Content */}
        <div className="article-modal-content-body">
          
          <h2 className="article-section-heading">
            1. Executive Summary &amp; Problem Context
          </h2>
          <p className="article-paragraph">
            {article.summary || "Electronic waste represents the fastest-growing domestic waste stream globally. Over 50 million metric tons of e-waste are discarded each year, containing critical rare-earth metals, gold, copper, and hazardous chemical compounds. Standard municipal waste systems are ill-equipped to segment component-level materials, resulting in severe environmental toxicity and massive economic loss."}
          </p>

          <p className="article-paragraph">
            Through advanced multi-label deep learning vision models trained on tens of thousands of electronic component datasets, EcoTrace introduces real-time material classification at the point of consumer disposal. By automatically computing component purity, market resale values, and carbon offset benchmarks, the platform converts discarded scrap into valuable urban mining feeds.
          </p>

          {/* Key Findings Box */}
          <div className="article-modal-takeaway-box">
            <h3 className="takeaway-title">
              <ShieldCheck size={18} />
              <span>Key Analytical Takeaways</span>
            </h3>
            <ul className="takeaway-list">
              <li><strong>Gold Yield Concentration:</strong> Printed Circuit Boards (PCBs) contain up to 250 grams of gold per ton—over 40x the concentration found in natural gold ore.</li>
              <li><strong>Carbon Abatement Impact:</strong> Recycling 1 metric ton of mixed e-waste prevents approximately 2.8 tons of CO₂ equivalent emissions compared to primary mining extraction.</li>
              <li><strong>Extended Producer Responsibility (EPR):</strong> Compliance guidelines under the E-Waste Management Rules require verified end-to-end digital tracking from donor to smelter.</li>
            </ul>
          </div>

          <h2 className="article-section-heading">
            2. System Architecture &amp; Technological Methodology
          </h2>
          <p className="article-paragraph">
            {article.fullContentSection2 || "The neural vision pipeline utilizes a customized Convolutional Neural Network (CNN) paired with Vision Transformers (ViT) to perform multi-task classification. Upon camera shutter trigger, the model segments the device body, identifies structural damage, and estimates the volumetric composition of internal printed circuit boards, copper wire windings, lithium polymer battery cells, and glass substrates."}
          </p>

          <p className="article-paragraph">
            Pricing algorithms reference live commodity index data from global metal exchanges, adjusting estimated payouts based on component weight, purity coefficient, and regional recycler demand. This ensures transparent, market-driven valuation for consumers while supplying authorized recyclers with pre-sorted, high-yield material inventory.
          </p>

          <h2 className="article-section-heading">
            3. Environmental Impact &amp; Future Roadmap
          </h2>
          <p className="article-paragraph">
            {article.fullContentSection3 || "Integrating localized doorstep collection logistics directly with authorized smelters eliminates informal backyard burning and toxic acid leaching practices. Every item collected generates a digital ESG certificate tracking carbon credits, heavy metal containment, and certified material recovery rates."}
          </p>

          <p className="article-paragraph">
            As urban centers scale smart waste infrastructure, AI-driven sorting platforms like EcoTrace form the foundational backbone for municipal circular economy initiatives, keeping critical metals within national supply chains.
          </p>

          {/* Article Footer & Action */}
          <div className="article-modal-footer">
            <div className="footer-cert-label">
              <Leaf size={16} color="var(--emerald-primary)" />
              <span>EcoTrace Certified Environmental Paper</span>
            </div>
            <button className="btn btn-primary article-modal-return-btn" onClick={onClose}>
              <span>Close &amp; Return to Platform</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
