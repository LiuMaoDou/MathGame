/* ===== 章节 3 · 倍数草原 · 数量间的乘除关系 ===== */

/* 在二年级教学里，"几倍" 是核心概念：
   - 已知一倍数和倍数，求几倍数（乘）
   - 已知几倍数和一倍数，求是几倍（除）
   - 已知几倍数和倍数，求一倍数（除） */

/* ---------- 小道具：成行的小花/小果 ---------- */
function Row({ count, color = "#FF7E6B", icon }) {
  return (
    <div style={{
      display:"flex", gap:6, padding:"6px 12px",
      background:"#fff", borderRadius:18,
      boxShadow:"0 2px 0 rgba(61,46,80,.1)",
      alignItems:"center",
      border:`2px solid ${color}33`,
      minHeight:48,
    }}>
      {Array.from({length: count}).map((_, i) => (
        <span key={i} style={{fontSize:24, lineHeight:1}}>{icon}</span>
      ))}
    </div>
  );
}

/* ---------- 第 1 关：几倍是多少（看图） ---------- */
function Game1_HowManyTimes({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const items = ["🌸","🍓","🍎","🌻","🍇","🍑"];
  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    const base = randInt(2, 5);
    const times = randInt(2, 5);
    const correct = base * times;
    const a = items[randInt(0, items.length - 1)];
    let b = items[randInt(0, items.length - 1)];
    while (b === a) b = items[randInt(0, items.length - 1)];
    const options = uniqueOptions(correct, () => base * randInt(2, 6), 4);
    return { base, times, correct, a, b, options };
  }), []);
  const q = questions[round];

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 1 关 · 是几倍？" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotFox size={84} /></div>
        <div className="bubble">
          <span style={{fontSize:24}}>{q.a}</span> 有 <b className="num" style={{color:"var(--coral-deep)"}}>{q.base}</b> 个，
          <span style={{fontSize:24}}>{q.b}</span> 是 <span style={{fontSize:24}}>{q.a}</span> 的 <b className="num" style={{color:"var(--coral-deep)"}}>{q.times}</b> 倍。
          那么 <span style={{fontSize:24}}>{q.b}</span> 有多少个？
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:10, alignItems:"flex-start", padding:"0 20px"}}>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <span className="num" style={{width:50, color:"var(--berry-deep)"}}>1 份</span>
          <Row count={q.base} icon={q.a} color="#F47CA8" />
        </div>
        {Array.from({length: q.times}).map((_, i) => (
          <div key={i} style={{display:"flex", gap:12, alignItems:"center"}}>
            <span className="num" style={{width:50, color:"var(--sky-deep)"}}>{i === 0 ? `${q.times} 份` : ""}</span>
            <Row count={q.base} icon={q.b} color="#6FBDF0" />
          </div>
        ))}
      </div>

      <div className="num" style={{textAlign:"center", fontSize:30}}>
        {q.base} × {q.times} = ?
      </div>

      <OptionGrid key={round} options={q.options} correct={q.correct} onResolved={resolve}
        render={(v)=> <span className="num">{v}</span>}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 2 关：求是几倍 ---------- */
function Game2_HowManyMultiple({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const items = ["🐝","🦋","🐞","🐌","🐛"];
  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    const base = randInt(2, 5);
    const times = randInt(2, 5);
    const total = base * times;
    const a = items[randInt(0, items.length - 1)];
    let b = items[randInt(0, items.length - 1)];
    while (b === a) b = items[randInt(0, items.length - 1)];
    const options = uniqueOptions(times, () => randInt(2, 7), 4);
    return { base, times, total, a, b, options };
  }), []);
  const q = questions[round];

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 2 关 · 是几倍呢？" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotFox size={84} /></div>
        <div className="bubble">
          <span style={{fontSize:24}}>{q.a}</span> 有 <b className="num" style={{color:"var(--berry-deep)"}}>{q.base}</b> 个，
          <span style={{fontSize:24}}>{q.b}</span> 有 <b className="num" style={{color:"var(--sky-deep)"}}>{q.total}</b> 个。
          <span style={{fontSize:24}}>{q.b}</span> 的个数是 <span style={{fontSize:24}}>{q.a}</span> 的多少倍？
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:10, padding:"0 20px"}}>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <span className="num" style={{width:60, color:"var(--berry-deep)"}}>1 份</span>
          <Row count={q.base} icon={q.a} color="#F47CA8" />
        </div>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <span className="num" style={{width:60, color:"var(--sky-deep)"}}>? 份</span>
          <div style={{display:"flex", gap:6, flexWrap:"wrap", maxWidth:520}}>
            {Array.from({length: q.times}).map((_, i) => (
              <Row key={i} count={q.base} icon={q.b} color="#6FBDF0" />
            ))}
          </div>
        </div>
      </div>

      <div className="num" style={{textAlign:"center", fontSize:30}}>
        {q.total} ÷ {q.base} = ?
      </div>

      <OptionGrid key={round} options={q.options} correct={q.times} onResolved={resolve}
        render={(v)=> <span className="num">{v} 倍</span>}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 3 关：综合应用 ---------- */
function Game3_Apply({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    const variants = [
      // 求几倍数
      () => {
        const a = randInt(3, 8), t = randInt(2, 6);
        return {
          text: <>果园里苹果树有 <b className="num">{a}</b> 棵，梨树是苹果树的 <b className="num">{t}</b> 倍，梨树有多少棵？</>,
          expr: `${a} × ${t} = ?`, correct: a * t, gen: () => a * randInt(2, 7),
        };
      },
      // 求一倍数
      () => {
        const a = randInt(3, 6), t = randInt(2, 5);
        const tot = a * t;
        return {
          text: <>小狐狸采了 <b className="num">{tot}</b> 朵花，是小兔子采的花的 <b className="num">{t}</b> 倍，小兔子采了多少朵？</>,
          expr: `${tot} ÷ ${t} = ?`, correct: a, gen: () => randInt(2, 9),
        };
      },
      // 求是几倍
      () => {
        const a = randInt(2, 5), t = randInt(2, 5);
        const tot = a * t;
        return {
          text: <>小熊有 <b className="num">{tot}</b> 块饼干，小猫有 <b className="num">{a}</b> 块。小熊的饼干是小猫的几倍？</>,
          expr: `${tot} ÷ ${a} = ?`, correct: t, gen: () => randInt(2, 7),
        };
      },
    ];
    const v = variants[randInt(0, variants.length - 1)]();
    const options = uniqueOptions(v.correct, v.gen, 4);
    return { ...v, options };
  }), []);
  const q = questions[round];

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 3 关 · 草原应用题" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotFox size={84} /></div>
        <div className="bubble">{q.text}</div>
      </div>

      <div style={{
        background:"linear-gradient(180deg,#FFE9F2,#FFCEE0)",
        borderRadius:22, padding:"24px 20px", textAlign:"center"
      }}>
        <div className="num" style={{fontSize:46, color:"var(--berry-deep)"}}>{q.expr}</div>
      </div>

      <OptionGrid key={round} options={q.options} correct={q.correct} onResolved={resolve}
        render={(v)=> <span className="num">{v}</span>}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 章节 3 入口 ---------- */
function Chapter3({ onComplete, addReward }) {
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);

  const finish = (correct, total) => {
    const stars = correct === total ? 3 : correct >= total * 0.7 ? 2 : 1;
    addReward({ stars, coins: correct * 3 });
    setResult({ stars, correct, total });
  };
  const next = () => {
    setResult(null);
    if (stage + 1 >= 3) onComplete();
    else setStage(s => s + 1);
  };

  return (
    <div className="chapter-screen chapter-bg-c3">
      <div className="chapter-body">
        <div className="stage-tabs">
          {["求几倍数", "求是几倍", "应用题"].map((t, i) => (
            <button key={i} className={`stage-tab ${i === stage ? "active" : ""}`}
              onClick={() => setStage(i)}>
              {i < stage && <StarIcon size={16} />} {t}
            </button>
          ))}
        </div>
        {stage === 0 && <Game1_HowManyTimes     key="g1" onWin={finish} />}
        {stage === 1 && <Game2_HowManyMultiple  key="g2" onWin={finish} />}
        {stage === 2 && <Game3_Apply            key="g3" onWin={finish} />}
      </div>
      {result && (
        <FeedbackModal
          kind={result.stars === 3 ? "perfect" : "win"}
          stars={result.stars}
          message={`这一关答对 ${result.correct}/${result.total} 题，获得 ${result.correct * 3} 枚金币！`}
          onNext={next}
          nextLabel={stage + 1 >= 3 ? "返回地图" : "下一关"}
        />
      )}
    </div>
  );
}

Object.assign(window, { Chapter3 });
