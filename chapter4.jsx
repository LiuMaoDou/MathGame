/* ===== 章节 4 · 万数城堡 · 万以内数的认识 ===== */

/* ---------- 第 1 关：计数器拨珠 ---------- */
function Game1_Abacus({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const target = useMemo(() => {
    // 生成一个 100-9999 的数
    return randInt(105, 9999);
    // eslint-disable-next-line
  }, [round]);

  const targetDigits = useMemo(() => {
    const s = String(target).padStart(4, "0");
    return { q: +s[0], b: +s[1], s: +s[2], g: +s[3] };
  }, [target]);

  const [beads, setBeads] = useState({ q: 0, b: 0, s: 0, g: 0 });
  const [locked, setLocked] = useState(false);
  useEffect(() => { setBeads({ q:0, b:0, s:0, g:0 }); setLocked(false); }, [round]);

  const set = (k, v) => {
    if (locked) return;
    setBeads(prev => ({ ...prev, [k]: Math.max(0, Math.min(9, v)) }));
  };

  const current = beads.q*1000 + beads.b*100 + beads.s*10 + beads.g;

  const submit = () => {
    if (locked) return;
    setLocked(true);
    const ok = current === target;
    if (ok) setScore(s => s + 1);
  };

  const cols = [
    { key:"q", name:"千", color:"#B49CE0", deep:"#8B6BC9" },
    { key:"b", name:"百", color:"#6FBDF0", deep:"#3B8FCE" },
    { key:"s", name:"十", color:"#6FD3A8", deep:"#3FA77B" },
    { key:"g", name:"个", color:"#FFC23C", deep:"#E69A15" },
  ];

  return (
    <div className="game-card">
      <ChapterHeader title="第 1 关 · 拨一拨计数器" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotBunny size={84} /></div>
        <div className="bubble">
          请在计数器上拨出 <span className="num" style={{color:"var(--sky-deep)", fontSize:32, marginLeft:6}}>{target}</span>
        </div>
      </div>

      <div style={{
        background:"linear-gradient(180deg,#EFF6FF,#D2E5F8)",
        borderRadius:22, padding:"20px 16px",
        display:"flex", justifyContent:"center", gap:18
      }}>
        {cols.map(c => {
          const v = beads[c.key];
          return (
            <div key={c.key} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6, minWidth:84}}>
              <div className="num" style={{
                fontSize:14, padding:"4px 10px", borderRadius:999,
                background:"#fff", color:c.deep, fontFamily:"var(--font-cn)"
              }}>{c.name}位</div>
              <div style={{
                position:"relative", width:50, height:240,
                background:"#fff", borderRadius:12,
                boxShadow:"inset 0 2px 0 rgba(61,46,80,.1)",
                display:"flex", flexDirection:"column-reverse", alignItems:"center",
                padding:"8px 0", gap:3
              }}>
                {/* rod center line */}
                <div style={{position:"absolute", inset:"8px 24px", background:c.color, borderRadius:3, opacity:.25}} />
                {Array.from({length: 9}).map((_, i) => {
                  const on = i < v;
                  return <div key={i} style={{
                    width: on ? 36 : 30, height: 22,
                    borderRadius: 999,
                    background: on ? c.color : "#F0E6D5",
                    boxShadow: on ? `0 2px 0 ${c.deep}` : "none",
                    transition:"all .15s",
                    zIndex: 1,
                  }} />;
                })}
              </div>
              <div className="num" style={{
                fontSize:32, color:c.deep,
              }}>{v}</div>
              <div style={{display:"flex", gap:6}}>
                <button className="btn ghost sm" disabled={locked} onClick={()=>set(c.key, v-1)} style={{padding:"4px 12px", fontSize:18}}>−</button>
                <button className="btn sm" disabled={locked} onClick={()=>set(c.key, v+1)} style={{background:c.color, boxShadow:`0 3px 0 ${c.deep}`, padding:"4px 12px", fontSize:18}}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{textAlign:"center"}}>
        <div className="num" style={{fontSize:34, color: locked ? (current === target ? "var(--mint-deep)" : "var(--coral-deep)") : "var(--ink)"}}>
          当前：{current}
          {locked && current === target && " ✓"}
          {locked && current !== target && ` ✗ 正确答案：${target}`}
        </div>
      </div>

      <div style={{textAlign:"center"}}>
        <button className="btn btn-sky" onClick={submit} disabled={locked}>就是这个数！</button>
      </div>

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 2 关：数字读法配对 ---------- */
function readChinese(n) {
  if (n === 0) return "零";
  const units = ["", "十", "百", "千"];
  const digits = ["零","一","二","三","四","五","六","七","八","九"];
  const s = String(n);
  const len = s.length;
  let out = "";
  let prevZero = false;
  for (let i = 0; i < len; i++) {
    const d = +s[i];
    const unit = units[len - 1 - i];
    if (d === 0) {
      prevZero = true;
    } else {
      if (prevZero) out += "零";
      out += digits[d] + unit;
      prevZero = false;
    }
  }
  // 处理 "一十xxx" -> 中文数 100 以内简化，但二年级习惯保留"一十"在大数里
  return out;
}

function Game2_Read({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    // mix: 给数字读出来，或给读法选数字
    const n = randInt(100, 9999);
    const correctRead = readChinese(n);
    const askDigits = Math.random() < .5; // 给读法选数字
    if (askDigits) {
      const options = uniqueOptions(n, () => randInt(100, 9999), 4);
      return { ask:"digits", display: correctRead, options, correct: n };
    } else {
      const options = uniqueOptions(correctRead, () => readChinese(randInt(100, 9999)), 4);
      return { ask:"chinese", display: n, options, correct: correctRead };
    }
  }), []);
  const q = questions[round];

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 2 关 · 读一读，写一写" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotBunny size={84} /></div>
        <div className="bubble">
          {q.ask === "digits" ? "这个数读作下面哪一个数？" : "这个数怎么读？"}
        </div>
      </div>

      <div style={{
        background:"linear-gradient(180deg,#E9F4FF,#C6DEF7)",
        borderRadius:22, padding:"30px 20px", textAlign:"center"
      }}>
        <div style={{
          fontFamily: q.ask === "digits" ? "var(--font-cn)" : "var(--font-num)",
          fontSize: q.ask === "digits" ? 48 : 64,
          fontWeight: 700,
          color: "var(--ink)",
          letterSpacing: q.ask === "digits" ? 6 : 4,
        }}>{q.display}</div>
      </div>

      <OptionGrid key={round} options={q.options} correct={q.correct} onResolved={resolve}
        render={(v) => (
          <span style={{
            fontFamily: q.ask === "digits" ? "var(--font-num)" : "var(--font-cn)",
            fontSize: q.ask === "digits" ? 24 : 20,
            letterSpacing: 2,
          }}>{v}</span>
        )}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 3 关：大小比较（大鱼吃小鱼） ---------- */
function Fish({ value, size = "big", color = "#FF7E6B" }) {
  const w = size === "big" ? 220 : 150;
  const h = size === "big" ? 140 : 100;
  return (
    <svg viewBox="0 0 200 130" width={w} height={h}>
      <path d="M170 65 L200 30 L200 100 Z" fill={color} opacity=".85" />
      <ellipse cx="80" cy="65" rx="80" ry="50" fill={color} />
      <ellipse cx="80" cy="60" rx="70" ry="40" fill="#fff" opacity=".25" />
      <circle cx="40" cy="55" r="12" fill="#fff" />
      <circle cx="42" cy="55" r="6" fill="#3D2E50" />
      <circle cx="44" cy="53" r="2" fill="#fff" />
      <path d="M20 80 Q26 86 32 80" stroke="#3D2E50" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="110" y="80" textAnchor="middle"
        fontFamily="Fredoka, Nunito" fontWeight="800" fontSize={size === "big" ? 36 : 28}
        fill="#fff">{value}</text>
    </svg>
  );
}

function Game3_Compare({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    let a, b;
    do {
      a = randInt(100, 9999);
      b = randInt(100, 9999);
    } while (a === b);
    return { a, b };
  }), []);
  const q = questions[round];

  const correct = q.a > q.b ? ">" : "<";

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 3 关 · 大鱼比小鱼" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotBunny size={84} /></div>
        <div className="bubble">
          大鱼要吃小鱼，张开嘴对准谁？选出正确的比较符号！
        </div>
      </div>

      <div style={{
        display:"flex", justifyContent:"center", alignItems:"center", gap:24, flexWrap:"wrap",
        background:"linear-gradient(180deg,#D6EEFC,#A9D8F3)",
        borderRadius:22, padding:"24px 12px", minHeight:180,
      }}>
        <Fish value={q.a} color="#FF7E6B" />
        <div style={{
          fontFamily:"var(--font-num)", fontSize:80, fontWeight:800,
          color:"var(--ink)",
          background:"#fff", borderRadius:18,
          padding:"6px 22px", boxShadow:"var(--shadow-md)",
          minWidth: 80, textAlign:"center"
        }}>?</div>
        <Fish value={q.b} color="#6FD3A8" />
      </div>

      <OptionGrid key={round} options={[">", "<", "="]} correct={correct} onResolved={resolve}
        render={(v) => <span className="num" style={{fontSize:36}}>{v}</span>}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 章节 4 入口 ---------- */
function Chapter4({ onComplete, addReward }) {
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
    <div className="chapter-screen chapter-bg-c4">
      <div className="chapter-body">
        <div className="stage-tabs">
          {["拨计数器", "读与写", "比大小"].map((t, i) => (
            <button key={i} className={`stage-tab ${i === stage ? "active" : ""}`}
              onClick={() => setStage(i)}>
              {i < stage && <StarIcon size={16} />} {t}
            </button>
          ))}
        </div>
        {stage === 0 && <Game1_Abacus  key="g1" onWin={finish} />}
        {stage === 1 && <Game2_Read    key="g2" onWin={finish} />}
        {stage === 2 && <Game3_Compare key="g3" onWin={finish} />}
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

Object.assign(window, { Chapter4 });
