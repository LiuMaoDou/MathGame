/* ===== 章节 5 · 加减集市 · 万以内加减法 =====
   重点：让孩子真正"会算"，不是猜答案。
   - 关 1：逐位进位加法，孩子从个位开始一格一格填，进位"1"动画飞上去
   - 关 2：逐位退位减法，被借位的数字被划掉并变小，看得见"借 1"
   - 关 3：集市购物，把算法用到生活场景里
*/

/* ---------- 数字键盘（0-9 + 确认） ---------- */
function NumPad({ onPick, disabled }) {
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"repeat(5, 1fr)",
      gap:8, width:"100%", maxWidth:420, margin:"0 auto"
    }}>
      {[0,1,2,3,4,5,6,7,8,9].map(n => (
        <button key={n} className="btn ghost"
          disabled={disabled}
          onClick={()=>onPick(n)}
          style={{padding:"10px 0", fontFamily:"var(--font-num)", fontWeight:800, fontSize:28, borderRadius:14}}>
          {n}
        </button>
      ))}
    </div>
  );
}

/* ---------- 共用：竖式格子（一格一格填） ----------
   digits[place]    -> 该位的结果数字 (个位 = 0)
   carries[place]   -> 该位上方"进位 1"小框里填的数字（孩子自己点上去）
   active = { kind: "digit", place }
   onToggleCarry(place) -> 点上方空地，自己加 +1（再点取消）
*/
function VerticalBoard({ a, b, op, width, digits, carries, active, error, onToggleCarry, wrongFlags, onCellClick, result }) {
  const A = String(a).padStart(width, " ");
  const B = String(b).padStart(width, " ");
  const dw = 44;
  return (
    <div style={{
      display:"inline-block",
      background:"#FFFBF2",
      borderRadius:18,
      padding:"14px 28px 22px",
      boxShadow:"var(--shadow-md)",
      fontFamily:"var(--font-num)", fontWeight:700, color:"var(--ink)",
    }}>
      {/* carry row - 每个位的上方都有一个虚线小占位框，孩子自己点上去填 +1 */}
      <div style={{display:"flex", justifyContent:"flex-end", height:32, alignItems:"flex-end", marginBottom:2}}>
        <span style={{width:dw}} />
        {Array.from({length: width}).map((_, idx) => {
          const placeFromRight = width - 1 - idx;
          // 个位上方不需要进位（个位没有"上一位"），其它位都给一个占位框
          const allowClick = placeFromRight > 0;
          const carry = carries[placeFromRight];
          return (
            <span key={idx}
              onClick={() => allowClick && onToggleCarry && onToggleCarry(placeFromRight)}
              style={{
                width:dw - 8, height:26, margin:"0 4px",
                cursor: allowClick ? "pointer" : "default",
                display:"grid", placeItems:"center",
                fontSize:16, fontFamily:"var(--font-num)", fontWeight:800,
                color: carry !== undefined ? "var(--coral-deep)" : "#D9C9AE",
                background: carry !== undefined ? "#FFE0D4" : "transparent",
                border: carry !== undefined
                  ? "2px solid var(--coral)"
                  : (allowClick ? "2px dashed #E0D7C2" : "none"),
                borderRadius:8,
                transition:"background .15s, border-color .15s",
              }}
              onMouseEnter={(e) => { if (allowClick && carry === undefined) { e.currentTarget.style.background = "rgba(255,194,60,.15)"; e.currentTarget.style.borderColor = "var(--sun-deep)"; } }}
              onMouseLeave={(e) => { if (allowClick && carry === undefined) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#E0D7C2"; } }}
            >
              {carry !== undefined ? `+${carry}` : "\u00A0"}
            </span>
          );
        })}
      </div>

      {/* row A */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:42}}>
        <span style={{width:dw}} />
        {A.split("").map((c, i) => (
          <span key={i} style={{width:dw, textAlign:"center"}}>{c.trim()}</span>
        ))}
      </div>
      {/* row B */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:42, marginTop:4}}>
        <span style={{width:dw, textAlign:"center", fontSize:36, color:"var(--coral-deep)"}}>{op}</span>
        {B.split("").map((c, i) => (
          <span key={i} style={{width:dw, textAlign:"center"}}>{c.trim()}</span>
        ))}
      </div>

      {/* rule */}
      <div style={{
        height:0, borderTop:"3px solid var(--ink)",
        margin:"6px 0 8px",
        width: (width + 1) * dw,
      }} />

      {/* answer row */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:44}}>
        <span style={{width:dw}} />
        {Array.from({length: width}).map((_, idx) => {
          const placeFromRight = width - 1 - idx;
          const filled = digits[placeFromRight];
          const isActive = active && active.kind === "digit" && active.place === placeFromRight;
          const clickable = !!onCellClick;
          // 决定颜色：result === correct → 绿，result === wrong → 红，否则 → 中性
          let bg, borderColor, color;
          if (filled !== undefined) {
            if (result === "correct") {
              bg = "#E7F8EC"; borderColor = "var(--mint-deep)"; color = "var(--mint-deep)";
            } else if (result === "wrong") {
              bg = "#FFD0CC"; borderColor = "var(--coral-deep)"; color = "var(--coral-deep)";
            } else {
              bg = "#FFFBF2"; borderColor = "#C9BFA6"; color = "var(--ink)";
            }
          } else {
            bg = isActive ? "#FFEFC9" : "transparent";
            borderColor = isActive ? "var(--sun-deep)" : "#E0D7C2";
            color = "var(--ink-soft)";
          }
          return (
            <span key={idx}
              onClick={() => clickable && onCellClick(placeFromRight)}
              style={{
                width:dw - 6, height:54,
                margin:"0 3px",
                borderRadius:10,
                display:"grid", placeItems:"center",
                background: bg,
                border: filled !== undefined ? `3px solid ${borderColor}` : `3px dashed ${borderColor}`,
                color,
                fontFamily:"var(--font-num)", fontWeight:800,
                cursor: clickable ? "pointer" : "default",
                animation: isActive && filled === undefined ? "pulse 1.2s infinite" : "none",
              }}>
              {filled !== undefined ? filled : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 第 1 关：进位加法（孩子自己想着写进位 1）---------- */
function Game1_AddStep({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    const a = randInt(248, 4899);
    const b = randInt(248, 4899);
    return { a, b, sum: a + b, width: Math.max(String(a + b).length, 4) };
  }), [seed]);
  const q = questions[round];

  // 预计算每一位的标准答案 + 进位
  const cols = useMemo(() => {
    const sA = String(q.a);
    const sB = String(q.b);
    const arr = [];
    let carry = 0;
    for (let i = 0; i < q.width; i++) {
      const da = +sA[sA.length-1-i] || 0;
      const db = +sB[sB.length-1-i] || 0;
      const s = da + db + carry;
      arr.push({ place: i, da, db, carryIn: carry, digit: s % 10, carryOut: Math.floor(s/10) });
      carry = Math.floor(s/10);
    }
    return arr;
  }, [q]);

  const [filled, setFilled] = useState({});
  const [carries, setCarries] = useState({});   // 孩子自己点上去的进位标记
  const [active, setActive] = useState(0);       // 当前要填第几位（0 = 个位）
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);    // null | "correct" | "wrong"

  useEffect(() => {
    setFilled({}); setCarries({}); setActive(0); setDone(false); setResult(null);
  }, [round, seed]);

  const reroll = () => { if (!done) setSeed(s => s + 1); };

  const toggleCarry = (place) => {
    if (done) return;
    setCarries(c => {
      const next = { ...c };
      if (next[place] === undefined) next[place] = 1;
      else delete next[place];
      return next;
    });
  };

  const evaluate = (filledMap) => {
    let computed = 0;
    for (let i = 0; i < q.width; i++) {
      computed += (filledMap[i] || 0) * Math.pow(10, i);
    }
    if (computed === q.sum) {
      setDone(true);
      setResult("correct");
      setScore(s => s + 1);
    } else {
      setResult("wrong");
    }
  };

  const handlePick = (n) => {
    if (done) return;
    const p = active;
    const newFilled = { ...filled, [p]: n };
    setFilled(newFilled);
    setResult(null);
    // 自动跳到下一位（个位 → 十位 → 百位 → 千位）。最后一位不再前进。
    if (p + 1 < q.width) {
      setActive(p + 1);
    }
    // 所有位都填了 → 自动判分
    const allFilled = Array.from({length: q.width}).every((_, i) => newFilled[i] !== undefined);
    if (allFilled) evaluate(newFilled);
  };

  const clickCell = (p) => {
    if (done) return;
    setActive(p);
  };

  const placeNames = ["个","十","百","千","万"];
  // 当前位的 a/b 数字
  const sA = String(q.a).padStart(q.width, "0");
  const sB = String(q.b).padStart(q.width, "0");
  const curDa = +sA[q.width - 1 - active];
  const curDb = +sB[q.width - 1 - active];

  let hint = null;
  if (done) {
    hint = <>🎉 答对啦！<span className="num">{q.a} + {q.b} = {q.sum}</span></>;
  } else if (result === "wrong") {
    hint = (
      <>
        <b style={{color:"var(--coral-deep)"}}>哎呀，算错啦～</b>
        点框框里的数字可以重新填。
        <span style={{display:"block", fontSize:14, color:"var(--ink-soft)", marginTop:4}}>
          💡 提示：满 10 别忘了在上面写一个小 +1
        </span>
      </>
    );
  } else {
    hint = (
      <>
        算 <b style={{color:"var(--berry-deep)"}}>{placeNames[active]}位</b>：
        <span className="num">{curDa}</span>{" + "}<span className="num">{curDb}</span>
        {" = ?"}
        <span style={{display:"block", fontSize:14, color:"var(--ink-soft)", marginTop:4}}>
          💡 如果两位相加满了 10，记得自己在上面写一个小 +1，再去算下一位
        </span>
      </>
    );
  }

  return (
    <div className="game-card">
      <ChapterHeader title="第 1 关 · 一位一位加" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotCat size={84} /></div>
        <div className="bubble">{hint}</div>
      </div>

      <div style={{textAlign:"center"}}>
        <VerticalBoard
          a={q.a} b={q.b} op="+" width={q.width}
          digits={filled} carries={carries}
          active={done ? null : { kind: "digit", place: active }}
          onToggleCarry={toggleCarry}
          onCellClick={clickCell}
          result={result}
        />
      </div>

      <div style={{textAlign:"center", color:"var(--ink-soft)", fontSize:13, fontFamily:"var(--font-cn)", letterSpacing:1}}>
        点上方空白处可以自己加 <span className="num" style={{color:"var(--coral-deep)"}}>+1</span> 提醒进位 · 答案可以从个位开始填，也可以点框框跳到任意一位
      </div>

      <NumPad onPick={handlePick} disabled={done} />

      <div style={{textAlign:"center"}}>
        <button className="btn ghost sm" disabled={done} onClick={reroll}>🔄 换一题</button>
      </div>

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 2 关：退位减法（一位一位算）---------- */
function VerticalBoardSub({ a, b, width, digits, borrows, strikes, activeCol, error, wrongFlags, onLendClick, onCellClick, result }) {
  const A = String(a).padStart(width, " ");
  const B = String(b).padStart(width, " ");
  const dw = 44;
  return (
    <div style={{
      display:"inline-block",
      background:"#FFFBF2", borderRadius:18,
      padding:"14px 28px 22px",
      boxShadow:"var(--shadow-md)",
      fontFamily:"var(--font-num)", fontWeight:700, color:"var(--ink)",
    }}>
      {/* "借 1" 上标行 */}
      <div style={{display:"flex", justifyContent:"flex-end", height:26, marginBottom:0}}>
        <span style={{width:dw}} />
        {Array.from({length: width}).map((_, idx) => {
          const placeFromRight = width - 1 - idx;
          const strike = strikes[placeFromRight];
          return (
            <span key={idx} style={{
              width:dw, textAlign:"center", fontSize:18,
              color:"var(--coral-deep)",
              opacity: strike !== undefined ? 1 : 0,
              transition:"opacity .2s",
              fontFamily:"var(--font-num)", fontWeight:800,
            }}>
              {strike !== undefined ? strike : ""}
            </span>
          );
        })}
      </div>

      {/* row A — clickable to "lend" */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:42}}>
        <span style={{width:dw}} />
        {A.split("").map((c, i) => {
          const placeFromRight = width - 1 - i;
          const struck = strikes[placeFromRight] !== undefined;
          const clickable = onLendClick && placeFromRight >= 1 && c.trim() !== "";
          return (
            <span key={i}
              onClick={() => clickable && onLendClick(placeFromRight)}
              style={{
                width:dw, textAlign:"center",
                position:"relative",
                color: struck ? "var(--ink-soft)" : "var(--ink)",
                cursor: clickable ? "pointer" : "default",
                borderRadius: 8,
                transition: "background .15s",
              }}
              onMouseEnter={(e) => { if (clickable) e.currentTarget.style.background = "rgba(255,194,60,.18)"; }}
              onMouseLeave={(e) => { if (clickable) e.currentTarget.style.background = "transparent"; }}
            >
              {c.trim()}
              {struck && (
                <span style={{
                  position:"absolute", left:8, right:8, top:"52%",
                  borderTop:"3px solid var(--coral-deep)",
                  transform:"rotate(-8deg)",
                  pointerEvents: "none",
                }} />
              )}
            </span>
          );
        })}
      </div>
      {/* "借给我 10" 标识 */}
      <div style={{display:"flex", justifyContent:"flex-end", height:18, marginTop:0}}>
        <span style={{width:dw}} />
        {Array.from({length: width}).map((_, idx) => {
          const placeFromRight = width - 1 - idx;
          const borrowed = borrows[placeFromRight];
          return (
            <span key={idx} style={{
              width:dw, textAlign:"center", fontSize:14,
              color:"var(--coral-deep)", letterSpacing:0,
              opacity: borrowed ? 1 : 0,
              fontFamily:"var(--font-cn)",
            }}>
              {borrowed ? "+10" : ""}
            </span>
          );
        })}
      </div>
      {/* row B */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:42, marginTop:0}}>
        <span style={{width:dw, textAlign:"center", fontSize:36, color:"var(--coral-deep)"}}>−</span>
        {B.split("").map((c, i) => (
          <span key={i} style={{width:dw, textAlign:"center"}}>{c.trim()}</span>
        ))}
      </div>
      <div style={{ height:0, borderTop:"3px solid var(--ink)", margin:"6px 0 8px", width:(width+1)*dw }} />
      {/* answer */}
      <div style={{display:"flex", justifyContent:"flex-end", fontSize:44}}>
        <span style={{width:dw}} />
        {Array.from({length: width}).map((_, idx) => {
          const placeFromRight = width - 1 - idx;
          const f = digits[placeFromRight];
          const isActive = activeCol === placeFromRight;
          const clickable = !!onCellClick;
          let bg, borderColor, color;
          if (f !== undefined) {
            if (result === "correct") {
              bg = "#E7F8EC"; borderColor = "var(--mint-deep)"; color = "var(--mint-deep)";
            } else if (result === "wrong") {
              bg = "#FFD0CC"; borderColor = "var(--coral-deep)"; color = "var(--coral-deep)";
            } else {
              bg = "#FFFBF2"; borderColor = "#C9BFA6"; color = "var(--ink)";
            }
          } else {
            bg = isActive ? "#FFEFC9" : "transparent";
            borderColor = isActive ? "var(--sun-deep)" : "#E0D7C2";
            color = "var(--ink-soft)";
          }
          return (
            <span key={idx}
              onClick={() => clickable && onCellClick(placeFromRight)}
              style={{
                width:dw - 6, height:54, margin:"0 3px",
                borderRadius:10,
                display:"grid", placeItems:"center",
                background: bg,
                border: f !== undefined ? `3px solid ${borderColor}` : `3px dashed ${borderColor}`,
                color,
                fontFamily:"var(--font-num)", fontWeight:800,
                cursor: clickable ? "pointer" : "default",
                animation: isActive && f === undefined ? "pulse 1.2s infinite" : "none",
              }}>{f !== undefined ? f : ""}</span>
          );
        })}
      </div>
    </div>
  );
}

function Game2_SubStep({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    // 让题目大概率有退位
    let a = randInt(1500, 9200);
    let b = randInt(380, a - 200);
    // 推动有退位：保证至少个位 a<b 或十位 a<b
    return { a, b, diff: a - b, width: Math.max(String(a).length, 4) };
  }), [seed]);
  const q = questions[round];

  // 数字数组
  const sA = useMemo(() => String(q.a).padStart(q.width, "0").split("").map(Number), [q]);
  const sB = useMemo(() => String(q.b).padStart(q.width, "0").split("").map(Number), [q]);
  // sA/sB 按 placeFromRight 索引方便：placeFromRight=0 是个位
  const topAt   = (p) => sA[q.width - 1 - p];
  const botAt   = (p) => sB[q.width - 1 - p];

  const [filled, setFilled] = useState({});
  const [lent,   setLent]   = useState({});
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setFilled({}); setLent({}); setActive(0); setDone(false); setResult(null);
  }, [round, seed]);

  const reroll = () => { if (!done) setSeed(s => s + 1); };

  // 计算每一位"当前"的有效顶部值（包含借入和借出）
  const effectiveTop = (p) => topAt(p) + (lent[p + 1] ? 10 : 0) - (lent[p] ? 1 : 0);

  const strikes = useMemo(() => {
    const out = {};
    for (let p = 0; p < q.width; p++) {
      if (lent[p]) out[p] = effectiveTop(p);
    }
    return out;
    // eslint-disable-next-line
  }, [lent, q]);
  const borrows = useMemo(() => {
    const out = {};
    for (let p = 0; p < q.width; p++) {
      if (lent[p + 1]) out[p] = true;
    }
    return out;
  }, [lent, q]);

  const toggleLent = (p) => {
    if (done) return;
    if (p < 1) return;
    if (lent[p]) {
      const newBelow = topAt(p - 1) + 0 - (lent[p - 1] ? 1 : 0);
      if (newBelow < 0) return;
      setLent(L => { const N = { ...L }; delete N[p]; return N; });
    } else {
      if (effectiveTop(p) < 1) return;
      setLent(L => ({ ...L, [p]: true }));
    }
  };

  const evaluate = (filledMap) => {
    let computed = 0;
    for (let i = 0; i < q.width; i++) {
      computed += (filledMap[i] || 0) * Math.pow(10, i);
    }
    if (computed === q.diff) {
      setDone(true);
      setResult("correct");
      setScore(s => s + 1);
    } else {
      setResult("wrong");
    }
  };

  const handlePick = (n) => {
    if (done) return;
    const p = active;
    const newFilled = { ...filled, [p]: n };
    setFilled(newFilled);
    setResult(null);
    if (p + 1 < q.width) {
      setActive(p + 1);
    }
    const allFilled = Array.from({length: q.width}).every((_, i) => newFilled[i] !== undefined);
    if (allFilled) evaluate(newFilled);
  };

  const clickCell = (p) => {
    if (done) return;
    setActive(p);
  };

  const placeNames = ["个","十","百","千","万"];
  let hint = null;
  if (done) {
    hint = <>🎉 答对啦！<span className="num">{q.a} − {q.b} = {q.diff}</span></>;
  } else if (result === "wrong") {
    hint = (
      <>
        <b style={{color:"var(--coral-deep)"}}>哎呀，算错啦～</b>
        点框框里的数字可以重新填。
        <span style={{display:"block", fontSize:14, color:"var(--ink-soft)", marginTop:4}}>
          💡 如果某一位不够减，需要从左边一位 "借 1" 哦
        </span>
      </>
    );
  } else {
    const top = effectiveTop(active);
    const bot = botAt(active);
    hint = (
      <>
        算 <b style={{color:"var(--berry-deep)"}}>{placeNames[active]}位</b>：
        <span className="num">{top}</span>{" − "}<span className="num">{bot}</span>
        {" = ?"}
        {top < bot && (
          <span style={{display:"block", fontSize:14, color:"var(--ink-soft)", marginTop:4}}>
            💡 数字不够减，可以点上面那一位的数字 "借 1" 哦（也可以先随便填，最后一起检查）
          </span>
        )}
      </>
    );
  }

  return (
    <div className="game-card">
      <ChapterHeader title="第 2 关 · 一位一位减" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotCat size={84} /></div>
        <div className="bubble">{hint}</div>
      </div>
      <div style={{textAlign:"center"}}>
        <VerticalBoardSub
          a={q.a} b={q.b} width={q.width}
          digits={filled} strikes={strikes} borrows={borrows}
          activeCol={done ? -1 : active}
          onLendClick={toggleLent}
          onCellClick={clickCell}
          result={result}
        />
      </div>
      <div style={{textAlign:"center", color:"var(--ink-soft)", fontSize:13, fontFamily:"var(--font-cn)", letterSpacing:1}}>
        点上面那一行的数字可以<b style={{color:"var(--coral-deep)"}}>"借 1"</b>到下一位 · 答案可以从个位开始填，也可以点框框跳到任意一位
      </div>
      <NumPad onPick={handlePick} disabled={done} />
      <div style={{textAlign:"center"}}>
        <button className="btn ghost sm" disabled={done} onClick={reroll}>🔄 换一题</button>
      </div>

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 第 3 关：集市购物（应用） ---------- */
const SHOP_ITEMS = [
  { name: "面包",   emoji: "🥖", priceRange: [120, 380] },
  { name: "玩具熊", emoji: "🧸", priceRange: [380, 1200] },
  { name: "故事书", emoji: "📖", priceRange: [180, 680] },
  { name: "水果篮", emoji: "🧺", priceRange: [260, 980] },
  { name: "蛋糕",   emoji: "🎂", priceRange: [320, 1280] },
  { name: "魔方",   emoji: "🧩", priceRange: [150, 580] },
];

function Tag({ emoji, name, price }) {
  return (
    <div style={{
      background:"#fff", borderRadius:18, padding:"10px 14px",
      display:"flex", flexDirection:"column", alignItems:"center", gap:4,
      boxShadow:"0 3px 0 rgba(61,46,80,.1)", minWidth:100,
    }}>
      <span style={{fontSize:40, lineHeight:1}}>{emoji}</span>
      <span style={{fontFamily:"var(--font-cn)", fontSize:16, color:"var(--ink-soft)"}}>{name}</span>
      <span className="num" style={{fontSize:24, color:"var(--coral-deep)"}}>{price} 元</span>
    </div>
  );
}

function MoneyBill({ amount }) {
  return (
    <div style={{
      width: 130, height: 70, borderRadius: 10,
      background:"linear-gradient(135deg,#FFE8C9,#FFCB87)",
      border:"3px solid #C28938",
      display:"grid", placeItems:"center",
      fontFamily:"var(--font-num)", fontWeight:800, fontSize:28,
      color:"#7A4A14", boxShadow:"var(--shadow-md)",
      position:"relative", transform:"rotate(-3deg)"
    }}>
      <span>¥ {amount}</span>
      <span style={{position:"absolute", left:6, top:4, fontSize:10, color:"#7A4A14", letterSpacing:1}}>BANK</span>
    </div>
  );
}

function Game3_Shopping({ onWin }) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => Array.from({length: TOTAL}, () => {
    const mode = Math.random() < .5 ? "sum" : "change";
    if (mode === "sum") {
      let pickA = SHOP_ITEMS[randInt(0, SHOP_ITEMS.length - 1)];
      let pickB = SHOP_ITEMS[randInt(0, SHOP_ITEMS.length - 1)];
      while (pickB === pickA) pickB = SHOP_ITEMS[randInt(0, SHOP_ITEMS.length - 1)];
      const a = randInt(pickA.priceRange[0], pickA.priceRange[1]);
      const b = randInt(pickB.priceRange[0], pickB.priceRange[1]);
      const result = a + b;
      const options = uniqueOptions(result, () => result + randInt(-150, 150), 4);
      return { mode, pickA, pickB, a, b, result, options };
    } else {
      const pick = SHOP_ITEMS[randInt(0, SHOP_ITEMS.length - 1)];
      const price = randInt(pick.priceRange[0], pick.priceRange[1]);
      const bills = [500, 1000, 2000, 5000];
      const paid = bills.find(b => b > price + 50) || 5000;
      const result = paid - price;
      const options = uniqueOptions(result, () => result + randInt(-150, 150), 4);
      return { mode, pick, price, paid, result, options };
    }
  }), [seed]);
  const q = questions[round];

  const reroll = () => setSeed(s => s + 1);

  const resolve = (ok) => {
    if (ok) setScore(s => s + 1);
  };

  return (
    <div className="game-card">
      <ChapterHeader title="第 3 关 · 集市买东西" progress={round} total={TOTAL} />
      <div className="game-prompt">
        <div className="mascot-sm"><MascotCat size={84} /></div>
        <div className="bubble">
          {q.mode === "sum"
            ? "小猫买了两件东西，请帮它算一共多少钱（可以心里画一画竖式哦）"
            : "小猫付了一张大钞票，应该找回多少元？"}
        </div>
      </div>

      {q.mode === "sum" ? (
        <div style={{
          display:"flex", justifyContent:"center", alignItems:"center", gap:16,
          background:"#FFF6E0", borderRadius:22, padding:"22px 14px", flexWrap:"wrap"
        }}>
          <Tag emoji={q.pickA.emoji} name={q.pickA.name} price={q.a} />
          <span className="num" style={{fontSize:36, color:"var(--coral-deep)"}}>+</span>
          <Tag emoji={q.pickB.emoji} name={q.pickB.name} price={q.b} />
          <span className="num" style={{fontSize:36}}>=</span>
          <span className="num" style={{fontSize:36, color:"var(--mint-deep)"}}>? 元</span>
        </div>
      ) : (
        <div style={{
          display:"flex", justifyContent:"center", alignItems:"center", gap:16,
          background:"#FFF6E0", borderRadius:22, padding:"22px 14px", flexWrap:"wrap"
        }}>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6}}>
            <div style={{fontFamily:"var(--font-cn)", color:"var(--ink-soft)"}}>付了</div>
            <MoneyBill amount={q.paid} />
          </div>
          <span className="num" style={{fontSize:36, color:"var(--coral-deep)"}}>−</span>
          <Tag emoji={q.pick.emoji} name={q.pick.name} price={q.price} />
          <span className="num" style={{fontSize:36}}>=</span>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6}}>
            <div style={{fontFamily:"var(--font-cn)", color:"var(--ink-soft)"}}>找回</div>
            <span className="num" style={{fontSize:36, color:"var(--mint-deep)"}}>? 元</span>
          </div>
        </div>
      )}

      <OptionGrid key={round} options={q.options} correct={q.result} onResolved={resolve}
        render={(v) => <span className="num">{v} 元</span>}
        initialPick={picks[round]}
        onPick={(v) => setPicks(p => ({ ...p, [round]: v }))}
      />

      <div style={{textAlign:"center"}}>
        <button className="btn ghost sm" onClick={reroll}>🔄 换一题</button>
      </div>

      <RoundNav round={round} total={TOTAL} setRound={setRound} onFinish={() => onWin(score, TOTAL)} />
    </div>
  );
}

/* ---------- 章节 5 入口 ---------- */
function Chapter5({ onComplete, addReward }) {
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
    <div className="chapter-screen chapter-bg-c5">
      <div className="chapter-body">
        <div className="stage-tabs">
          {["进位加法", "退位减法", "集市购物"].map((t, i) => (
            <button key={i} className={`stage-tab ${i === stage ? "active" : ""}`}
              onClick={() => setStage(i)}>
              {i < stage && <StarIcon size={16} />} {t}
            </button>
          ))}
        </div>
        {stage === 0 && <Game1_AddStep  key="g1" onWin={finish} />}
        {stage === 1 && <Game2_SubStep  key="g2" onWin={finish} />}
        {stage === 2 && <Game3_Shopping key="g3" onWin={finish} />}
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

Object.assign(window, { Chapter5 });
