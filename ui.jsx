/* ====== 共享 UI 组件 ====== */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------- 图标 ---------- */
function StarIcon({ size = 24, color = "#FFC23C", stroke = "#E69A15" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.4l-5.8 3 1.1-6.47L2.6 9.35l6.5-.95L12 2.5z"
        fill={color} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CoinIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <circle cx="12" cy="12" r="10" fill="#FFC23C" stroke="#E69A15" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" fill="#FFD96E" stroke="#E69A15" strokeWidth="1" />
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700"
        fill="#E69A15" fontFamily="Fredoka, Nunito, sans-serif">¥</text>
    </svg>
  );
}

function HeartIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M12 21s-7-4.6-9.2-9.1C1.1 8.1 3.8 4 7.4 4c1.9 0 3.5 1 4.6 2.4C13.1 5 14.7 4 16.6 4c3.6 0 6.3 4.1 4.6 7.9C19 16.4 12 21 12 21z"
        fill="#FF7E6B" stroke="#E85A47" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- 顶部状态条 ---------- */
function TopBar({ stars, coins, onBack, title }) {
  return (
    <div className="topbar">
      {onBack ? (
        <button className="back" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 5l-7 7 7 7" fill="none" stroke="#3D2E50" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          地图
        </button>
      ) : (
        <div className="brand">
          <span className="brand-mark">8</span>
          数学小岛
        </div>
      )}
      {title && <div className="brand" style={{fontSize: 22}}>{title}</div>}
      <div className="spacer" />
      <div className="stat" title="星星"><StarIcon /> {stars}</div>
      <div className="stat" title="金币"><CoinIcon /> {coins}</div>
    </div>
  );
}

/* ---------- 答题选项卡片 ---------- */
function OptionGrid({ options, correct, onResolved, render, initialPick = null, onPick }) {
  const [pick, setPick] = useState(initialPick);
  // 用值对比，避免父组件每次渲染传入新数组导致选中状态被重置
  const optionsKey = JSON.stringify(options);
  const correctKey = JSON.stringify(correct);
  useEffect(() => { setPick(initialPick ?? null); }, [optionsKey, correctKey]);

  const handle = (v) => {
    if (pick !== null) return;
    setPick(v);
    onPick && onPick(v);
    const ok = v === correct;
    setTimeout(() => onResolved && onResolved(ok), 700);
  };

  return (
    <div className="option-row">
      {options.map((v, i) => {
        let cls = "opt";
        if (pick !== null) {
          if (v === correct) cls += " correct";
          else if (v === pick) cls += " wrong";
          else cls += " disabled";
        }
        return (
          <button key={i} className={cls} onClick={() => handle(v)}>
            {render ? render(v) : v}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- 胜利 / 失败 弹窗 ---------- */
function FeedbackModal({ kind, stars, message, onNext, onRetry, nextLabel = "继续" }) {
  return (
    <div className="feedback">
      <div className="card">
        <div style={{fontSize: 60, lineHeight: 1}}>
          {kind === "win" ? "🎉" : kind === "perfect" ? "🏆" : "💪"}
        </div>
        <h2>{kind === "perfect" ? "完美通关！" : kind === "win" ? "做得真棒！" : "再试一次"}</h2>
        <div className="stars-big">
          {[0,1,2].map(i => (
            <StarIcon key={i} size={56}
              color={i < stars ? "#FFC23C" : "#EFE3D0"}
              stroke={i < stars ? "#E69A15" : "#D9C9AE"} />
          ))}
        </div>
        <p>{message}</p>
        <div style={{display:"flex", gap:12, justifyContent:"center"}}>
          {onRetry && <button className="btn ghost" onClick={onRetry}>再玩一次</button>}
          {onNext && <button className="btn btn-sun" onClick={onNext}>{nextLabel}</button>}
        </div>
      </div>
    </div>
  );
}

/* ---------- 章节关卡进度条 ---------- */
function ChapterHeader({ title, progress, total }) {
  const pct = total > 0 ? (progress / total) * 100 : 0;
  return (
    <div className="chap-header">
      <h2 className="chap-title">{title}</h2>
      <div className="progress"><i style={{ width: pct + "%" }} /></div>
      <span className="num" style={{fontSize: 18}}>{progress}/{total}</span>
    </div>
  );
}

/* ---------- 浮动奖励数字 ---------- */
function Floater({ x, y, text, color = "#E69A15" }) {
  return (
    <div className="floater" style={{ left: x, top: y, color }}>
      {text}
    </div>
  );
}

/* ---------- 工具函数 ---------- */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uniqueOptions(correct, gen, n = 4) {
  const set = new Set([correct]);
  let safety = 50;
  while (set.size < n && safety-- > 0) set.add(gen());
  return shuffle([...set]);
}

/* ---------- 上一题 / 下一题导航 ---------- */
function RoundNav({ round, total, setRound, onFinish }) {
  const isLast = round >= total - 1;
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:10, marginTop:6}}>
      <button className="btn ghost sm"
        disabled={round <= 0}
        onClick={() => setRound(Math.max(0, round - 1))}
        style={{padding:"6px 14px"}}>← 上一题</button>
      <span style={{
        fontFamily:"var(--font-num)", fontWeight:700, color:"var(--ink-soft)",
        padding:"6px 14px", background:"rgba(255,255,255,.7)",
        borderRadius:999, fontSize:15, boxShadow:"0 1px 0 rgba(61,46,80,.06)"
      }}>第 {round + 1} / {total} 题</span>
      {isLast && onFinish ? (
        <button className="btn btn-sun sm" onClick={onFinish}
          style={{padding:"6px 14px"}}>完成本关 ✓</button>
      ) : (
        <button className="btn ghost sm"
          disabled={isLast}
          onClick={() => setRound(Math.min(total - 1, round + 1))}
          style={{padding:"6px 14px"}}>下一题 →</button>
      )}
    </div>
  );
}

/* ---------- 暴露到 window ---------- */
Object.assign(window, {
  StarIcon, CoinIcon, HeartIcon,
  TopBar, OptionGrid, FeedbackModal, ChapterHeader, Floater, RoundNav,
  randInt, shuffle, uniqueOptions,
});
