import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ArticleModal } from '../components/common/ArticleModal';
import { 
  BookOpen, 
  Cpu, 
  Leaf, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  User, 
  ArrowRight
} from 'lucide-react';

export const BlogPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // 12 Comprehensive Articles with Real Cover Images
  const articles = [
    {
      id: 1,
      category: 'AI Vision Tech',
      title: 'How Deep Learning Classifies PCB Components in under 200 Milliseconds',
      summary: 'Exploring the computer vision architecture, neural attention heads, and custom datasets behind EcoTrace’s multi-label component recognition engine.',
      author: 'Rahul Kushwaha',
      date: 'August 10, 2026',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      category: 'AI Vision Tech',
      title: 'Automated Battery Chemistry Detection using Edge Neural Networks',
      summary: 'Distinguishing Lithium-Ion, LiPo, and NiMH battery cells safely through surface thermal imaging and visual bounding boxes.',
      author: 'Ayush Yadav',
      date: 'August 05, 2026',
      readTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      category: 'AI Vision Tech',
      title: 'Dataset Curation Benchmarks for India’s Informal E-Waste Market',
      summary: 'How 45,000 localized electronic items were captured, labeled, and validated across Uttar Pradesh tech hubs.',
      author: 'Rishika Singh',
      date: 'July 28, 2026',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      category: 'Environmental Policy',
      title: 'E-Waste Rules 2026: Extended Producer Responsibility Guidelines in India',
      summary: 'A definitive breakdown of new CPCB regulatory compliance mandates for consumer electronic manufacturers and corporate IT parks.',
      author: 'Ashmit Verma',
      date: 'August 08, 2026',
      readTime: '9 min read',
      coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      category: 'Environmental Policy',
      title: 'Mitigating Heavy Metal Toxicity in Groundwater through Smart Collection',
      summary: 'Tracing the bio-accumulation of lead, cadmium, and mercury from illegal dumping sites to municipal water tables.',
      author: 'Md. Umar Zahid',
      date: 'August 02, 2026',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      category: 'Environmental Policy',
      title: 'Calculating Audit-Ready ESG Carbon Credits for Corporate IT Assets',
      summary: 'Mathematical models converting avoided virgin ore mining into verified scope 3 greenhouse gas reduction certificates.',
      author: 'Tanay Singh',
      date: 'July 22, 2026',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 7,
      category: 'Urban Mining',
      title: 'The Economics of PCB Gold & Copper Extraction in 2026',
      summary: 'Why urban mining yields up to 50x higher gold concentrations per ton than traditional primary gold mining.',
      author: 'Md. Umar Zahid',
      date: 'August 11, 2026',
      readTime: '10 min read',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 8,
      category: 'Urban Mining',
      title: 'Rare Earth Element Recovery from Neodymium Magnets & Hard Drives',
      summary: 'Extracting critical dysprosium and neodymium from discarded server storage drives to secure national supply chains.',
      author: 'Ayush Yadav',
      date: 'August 01, 2026',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 9,
      category: 'Urban Mining',
      title: 'Algorithmic Pricing Benchmarks for Local Recycler Bidding Networks',
      summary: 'How live commodity indices dynamically compute cash offers for everyday donors and collection hubs.',
      author: 'Tanay Singh',
      date: 'July 20, 2026',
      readTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 10,
      category: 'E-Waste Innovations',
      title: 'Building Progressive Web Apps (PWAs) for Low-Bandwidth E-Waste Collection',
      summary: 'Optimizing Service Workers, local JSON fallbacks, and offline caching for field collection agents in rural districts.',
      author: 'Rahul Kushwaha',
      date: 'August 12, 2026',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 11,
      category: 'E-Waste Innovations',
      title: 'The Role of University Hackathons in Scaling National E-Waste Awareness',
      summary: 'How Smart India Hackathon initiatives in Uttar Pradesh inspired a student team to build an enterprise platform.',
      author: 'Ashmit Verma',
      date: 'August 04, 2026',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 12,
      category: 'E-Waste Innovations',
      title: 'Future Trends: Automated Robotic Dismantling of Consumer Electronics',
      summary: 'Integrating AI vision feeds with robotic arm grippers for high-speed unscrewing and PCB extraction.',
      author: 'Ayush Yadav',
      date: 'July 15, 2026',
      readTime: '9 min read',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const categories = ['All', 'AI Vision Tech', 'Environmental Policy', 'Urban Mining', 'E-Waste Innovations'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="blog" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '60px 0 100px' }}>
        <div className="container">
          
          {/* Header */}
          <div className="section-header">
            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <BookOpen size={14} />
              <span>EcoTrace Knowledge Hub (12 Visual Articles)</span>
            </div>
            <h1 className="section-title">Research Papers, Policy & AI Insights</h1>
            <p className="section-description">
              Explore in-depth technical analysis, urban mining benchmarks, and environmental policy guidelines written by the EcoTrace research team.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 12 Articles Grid with Cover Images */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="blog-grid">
            {filteredArticles.map((article) => (
              <div 
                key={article.id} 
                className="blog-card"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="blog-img-wrapper" style={{ height: '220px' }}>
                  <img src={article.coverImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blog-content">
                  <div className="blog-tag">{article.category}</div>
                  <h3 className="blog-title">{article.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                    {article.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <div style={{ marginTop: '14px', color: 'var(--emerald-primary)', fontWeight: '600', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Read Full Article (Expanded Modal)</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Large Article Reader Popup Modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};
