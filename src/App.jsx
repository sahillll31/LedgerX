import React, { useState, useRef } from 'react';

export default function App() {
  const [docs, setDocs] = useState({
    identity: null,
    salary: null,
    banking: null,
    tax80c: null,
  });

  const [salaryAmt, setSalaryAmt] = useState('');
  const [invest80c, setInvest80c] = useState('');
  const [sales, setSales] = useState('');
  const [expenses, setExpenses] = useState('');
  const [activePage, setActivePage] = useState('home');

  const fileRefs = useRef({});

  const handleFileChange = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      setDocs({ ...docs, [key]: file.name });
    }
  };

  const handleReset = () => {
    setDocs({ identity: null, salary: null, banking: null, tax80c: null });
    setSalaryAmt(''); setInvest80c(''); setSales(''); setExpenses('');
  };

  const calculateTax = () => {
    const s = parseFloat(salaryAmt) || 0;
    const i = parseFloat(invest80c) || 0;
    if (s === 0) return null;
    const standardDeduction = 50000;
    const capped80c = Math.min(i, 150000);
    const taxable = s - standardDeduction - capped80c;
    return taxable > 0 ? taxable : 0;
  };

  const calculatePnL = () => {
    const sl = parseFloat(sales) || 0;
    const ex = parseFloat(expenses) || 0;
    if (sl === 0 && ex === 0) return null;
    const profit = sl - ex;
    const margin = sl > 0 ? (profit / sl) * 100 : 0;
    
    let insight = '';
    let insightColor = '';
    
    if (margin > 20) {
      insight = 'Excellent Health';
      insightColor = '#00ba7c';
    } else if (margin >= 0) {
      insight = 'Review Costs';
      insightColor = '#f59e0b';
    } else {
      insight = 'Critical Loss';
      insightColor = '#ef4444';
    }
    return { profit, margin: margin.toFixed(1), insight, insightColor };
  };

  const currentTax = calculateTax();
  const currentPnL = calculatePnL();

  return (
    <>
      <style>{`
        :root {
            --bg: #0a0a0a; --card: #111111; --blue: #1d9bf0; --blue-l: #60c4ff;
            --t1: #e7e9ea; --t2: #71767b; --border: rgba(255,255,255,0.1); --green: #00ba7c;
        }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--t1); margin: 0; padding-bottom: 80px; }
        .page { display: none; padding: 20px; animation: fadeIn 0.3s ease; }
        .page.active { display: block; }
        
        .checklist-card { background: var(--card); border-radius: 16px; padding: 20px; border: 1px solid var(--border); margin-bottom: 20px; }
        .check-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; }
        .check-ic { font-size: 22px; color: var(--t2); }
        .check-ic.done { color: var(--green); }
        .check-txt { font-size: 14px; flex: 1; font-weight: 500; display: flex; flex-direction: column; }
        .check-hint { font-size: 11px; color: var(--green); margin-top: 4px; }
        
        #topnav { position: sticky; top: 0; height: 60px; background: rgba(10,10,10,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid var(--border); z-index: 1000; justify-content: space-between; }
        .bottom-nav { position: fixed; bottom: 0; width: 100%; height: 70px; background: #111; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid var(--border); padding-bottom: env(safe-area-inset-bottom); z-index: 1000; }
        .nav-btn { background: none; border: none; color: var(--t2); display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 10px; cursor: pointer; }
        .nav-btn.active { color: var(--blue); }
        .btn-up { background: var(--blue); border: none; color: #fff; border-radius: 6px; font-size: 11px; padding: 6px 12px; font-weight: 700; cursor: pointer; }
        .btn-up.done { background: rgba(0,186,124,0.1); color: var(--green); }

        .lx-input { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--t1); box-sizing: border-box; font-family: inherit; font-size: 14px; }
        .lx-result { margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 13px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <nav id="topnav">
        <div style={{fontFamily:'Syne', fontWeight:800, fontSize:'1.4rem'}}>Ledger<span style={{color:'var(--blue)'}}>X</span></div>
        <div id="user-init" style={{width:'32px', height:'32px', background:'var(--blue)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'bold'}}>U</div>
      </nav>

      <div className={`page ${activePage === 'home' ? 'active' : ''}`} id="page-home">
        <h2 style={{fontFamily:'Syne', letterSpacing:'-1px', marginTop: 0}}>Filing Journey</h2>

        <div className="checklist-card">
          <div style={{fontSize:'12px', color:'var(--t2)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'15px', fontWeight:700}}>Required Documents</div>
          
          {[
            { id: 'identity', label: 'Identity (PAN & Aadhaar)' },
            { id: 'salary', label: 'Income (Form 16 / Slips)' },
            { id: 'banking', label: 'Banking (Statements)' },
            { id: 'tax80c', label: 'Investments (Section 80C)' },
          ].map((item) => (
            <div className="check-item" key={item.id} onClick={() => fileRefs.current[item.id].click()}>
              <i className={`ph ph-circle check-ic ${docs[item.id] ? 'ph-fill ph-check-circle done' : ''}`}></i>
              <div className="check-txt">
                {item.label}
                {docs[item.id] && <span className="check-hint">Verified: {docs[item.id]}</span>}
              </div>
              <input 
                type="file" 
                style={{display: 'none'}} 
                ref={el => fileRefs.current[item.id] = el}
                onChange={(e) => handleFileChange(item.id, e)}
              />
              <button className={`btn-up ${docs[item.id] ? 'done' : ''}`}>
                {docs[item.id] ? 'Verified' : 'Upload'}
              </button>
            </div>
          ))}
        </div>

        <div className="checklist-card" style={{borderColor: 'var(--blue)', background: 'rgba(29,155,240,0.05)'}}>
          <h4 style={{margin:0, fontSize:'14px', color:'var(--blue-l)', display: 'flex', alignItems: 'center', gap: '6px'}}><i className="ph-fill ph-sparkle"></i> AI Assistant Tip</h4>
          <p style={{fontSize:'12px', color:'var(--t2)', marginTop:'8px', lineHeight:1.5}}>I can see you've started your ITR. Uploading your Form 26AS helps me verify your tax credits automatically!</p>
        </div>

        {/* 2. Tax Estimator */}
        <div className="checklist-card">
          <div style={{fontSize:'12px', color:'var(--green)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'15px', fontWeight:700}}>🧮 TAX ESTIMATOR</div>
          <div style={{display:'flex', gap:'10px'}}>
            <div style={{flex:1}}>
              <label style={{fontSize:'11px', color:'var(--t2)'}}>Salary (₹)</label>
              <input type="number" className="lx-input" value={salaryAmt} onChange={(e)=>setSalaryAmt(e.target.value)} placeholder="0" />
            </div>
            <div style={{flex:1}}>
              <label style={{fontSize:'11px', color:'var(--t2)'}}>80C (₹)</label>
              <input type="number" className="lx-input" value={invest80c} onChange={(e)=>setInvest80c(e.target.value)} placeholder="0" />
            </div>
          </div>
          {currentTax !== null && (
            <div className="lx-result"><span>Taxable Income:</span> <span style={{color:'var(--green)'}}>₹{currentTax.toLocaleString('en-IN')}</span></div>
          )}
        </div>

        {/* 3. AI P&L Generator */}
        <div className="checklist-card">
          <div style={{fontSize:'12px', color:'var(--blue)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'15px', fontWeight:700}}>🤖 AI P&L GENERATOR</div>
          <div style={{display:'flex', gap:'10px'}}>
            <div style={{flex:1}}>
              <label style={{fontSize:'11px', color:'var(--t2)'}}>Sales (₹)</label>
              <input type="number" className="lx-input" value={sales} onChange={(e)=>setSales(e.target.value)} placeholder="0" />
            </div>
            <div style={{flex:1}}>
              <label style={{fontSize:'11px', color:'var(--t2)'}}>Expenses (₹)</label>
              <input type="number" className="lx-input" value={expenses} onChange={(e)=>setExpenses(e.target.value)} placeholder="0" />
            </div>
          </div>
          {currentPnL && (
            <div className="lx-result" style={{borderLeft: `4px solid ${currentPnL.insightColor}`}}>
              <span style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                <span>Profit: ₹{currentPnL.profit.toLocaleString('en-IN')}</span>
                <span style={{fontSize:'11px', color: currentPnL.insightColor}}>{currentPnL.insight} ({currentPnL.margin}%)</span>
              </span>
            </div>
          )}
        </div>

        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
          <button onClick={handleReset} style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', color:'var(--t2)', padding:'10px 24px', borderRadius:'8px', fontSize:'12px', fontWeight:'bold', cursor:'pointer'}}>
            RESET ALL DATA
          </button>
        </div>
      </div>

      <div className={`page ${activePage === 'experts' ? 'active' : ''}`} id="page-experts">
        <h2 style={{fontFamily:'Syne', letterSpacing:'-1px', marginTop: 0}}>Verified CAs</h2>
        <div className="checklist-card"><div className="check-txt">Experts list coming soon...</div></div>
      </div>

      <div className="bottom-nav">
          <button className={`nav-btn ${activePage === 'home' ? 'active' : ''}`} onClick={() => setActivePage('home')}><i className="ph-fill ph-house" style={{fontSize: '24px'}}></i><span>Home</span></button>
          <button className={`nav-btn ${activePage === 'experts' ? 'active' : ''}`} onClick={() => setActivePage('experts')}><i className="ph-fill ph-users" style={{fontSize: '24px'}}></i><span>Experts</span></button>
          <button className="nav-btn" onClick={() => alert('TaxBot Opening...')}><i className="ph-fill ph-robot" style={{fontSize: '24px'}}></i><span>TaxBot</span></button>
          <button className="nav-btn"><i className="ph-fill ph-user" style={{fontSize: '24px'}}></i><span>Profile</span></button>
      </div>
    </>
  );
}