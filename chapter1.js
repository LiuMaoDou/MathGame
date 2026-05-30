/* ===== 章节 1 · 时间小岛 · 认识钟表 ===== */

/* ---------- 钟表 SVG ---------- */
function Clock({
  hour,
  minute,
  second,
  size = 240,
  interactive = false,
  onChange,
  drag = "minute",
  showSeconds = true
}) {
  // hour: 1..12, minute: 0..59, second: 0..59 (静止)
  // 0° = 指向 12（上方），顺时针为正
  const cx = 100,
    cy = 100,
    r = 92;
  const hourDeg = (hour % 12 + minute / 60) * 30;
  const minDeg = minute * 6;
  const secDeg = (second || 0) * 6;
  const hasSec = showSeconds && typeof second === "number";
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const handle = e => {
    if (!interactive) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * 200;
    const py = (e.clientY - rect.top) / rect.height * 200;
    const dx = px - cx,
      dy = py - cy;
    // 0 at 12 (up)，顺时针
    let ang = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    if (ang < 0) ang += 360;
    if (drag === "minute") {
      const m = Math.round(ang / 6) % 60;
      onChange && onChange({
        hour,
        minute: m
      });
    } else {
      const h = Math.round(ang / 30) % 12;
      const newH = h === 0 ? 12 : h;
      onChange && onChange({
        hour: newH,
        minute
      });
    }
  };
  const onDown = e => {
    dragging.current = true;
    handle(e);
  };
  const onMove = e => {
    if (dragging.current) handle(e);
  };
  const onUp = () => {
    dragging.current = false;
  };
  useEffect(() => {
    if (!interactive) return;
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [interactive]);
  return /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    viewBox: "0 0 200 200",
    width: size,
    height: size,
    onMouseDown: onDown,
    onMouseMove: onMove,
    onMouseUp: onUp,
    onTouchStart: e => {
      const t = e.touches[0];
      onDown({
        clientX: t.clientX,
        clientY: t.clientY
      });
    },
    onTouchMove: e => {
      const t = e.touches[0];
      onMove({
        clientX: t.clientX,
        clientY: t.clientY
      });
    },
    style: {
      cursor: interactive ? "grab" : "default",
      touchAction: "none"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r + 6,
    fill: "#FFE7A3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "#FFFBF2",
    stroke: "#E69A15",
    strokeWidth: "4"
  }), Array.from({
    length: 60
  }).map((_, i) => {
    const a = (i * 6 - 90) * Math.PI / 180;
    const big = i % 5 === 0;
    const r1 = big ? r - 10 : r - 5;
    const r2 = r - 2;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx + Math.cos(a) * r1,
      y1: cy + Math.sin(a) * r1,
      x2: cx + Math.cos(a) * r2,
      y2: cy + Math.sin(a) * r2,
      stroke: big ? "#3D2E50" : "#B6A88B",
      strokeWidth: big ? 3 : 1.5,
      strokeLinecap: "round"
    });
  }), Array.from({
    length: 12
  }).map((_, i) => {
    const num = i + 1;
    const a = (num * 30 - 90) * Math.PI / 180;
    const rr = r - 22;
    return /*#__PURE__*/React.createElement("text", {
      key: num,
      x: cx + Math.cos(a) * rr,
      y: cy + Math.sin(a) * rr + 7,
      textAnchor: "middle",
      fontFamily: "Fredoka, Nunito",
      fontWeight: "700",
      fontSize: "22",
      fill: "#3D2E50"
    }, num);
  }), /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${hourDeg} ${cx} ${cy})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: cx - 3,
    y: cy - 44,
    width: "6",
    height: "56",
    rx: "3",
    fill: "#3D2E50"
  })), /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${minDeg} ${cx} ${cy})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: cx - 2.5,
    y: cy - 72,
    width: "5",
    height: "84",
    rx: "2.5",
    fill: "#FF7E6B"
  })), hasSec && /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${secDeg} ${cx} ${cy})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: cx - 0.8,
    y: cy - 80,
    width: "1.6",
    height: "94",
    fill: "#3FA77B"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy - 70,
    r: "3.4",
    fill: "#3FA77B"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "6",
    fill: "#3D2E50"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "2",
    fill: "#FFC23C"
  }));
}
const fmtTime = (h, m, s) => s !== undefined && s !== null ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${h}:${String(m).padStart(2, "0")}`;

/* ---------- 第 1 关：读时间（选择题） ---------- */
function Game1_ReadClock({
  onWin
}) {
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const [round, setRound] = useState(0);
  const TOTAL = 9;
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const h = randInt(1, 12);
    // 二年级主要读半时和整时；这一关混合整时/半时/15分/45分；秒针指向 5 的倍数刻度
    const opts = [0, 15, 30, 45];
    const secOpts = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const m = opts[randInt(0, 3)];
    const s = secOpts[randInt(0, secOpts.length - 1)];
    const correct = fmtTime(h, m, s);
    const options = uniqueOptions(correct, () => {
      const hh = randInt(1, 12);
      const mm = opts[randInt(0, 3)];
      const ss = secOpts[randInt(0, secOpts.length - 1)];
      return fmtTime(hh, mm, ss);
    }, 4);
    return {
      h,
      m,
      s,
      correct,
      options
    };
  }), []);
  const q = questions[round];
  const resolve = ok => {
    if (ok) setScore(s => s + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "game-card"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    title: `第 1 关 · 现在几点啦？`,
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotBear, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, "\u5C0F\u718A\u6307\u7740\u949F\u8868\u95EE\uFF1A\u73B0\u5728\u662F\u51E0\u70B9\uFF1F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    hour: q.h,
    minute: q.m,
    second: q.s,
    size: 240
  })), /*#__PURE__*/React.createElement(OptionGrid, {
    key: round,
    options: q.options,
    correct: q.correct,
    onResolved: resolve,
    render: v => /*#__PURE__*/React.createElement("span", {
      className: "num"
    }, v),
    initialPick: picks[round],
    onPick: v => setPicks(p => ({
      ...p,
      [round]: v
    }))
  }), /*#__PURE__*/React.createElement(RoundNav, {
    round: round,
    total: TOTAL,
    setRound: setRound,
    onFinish: () => onWin(score, TOTAL)
  }));
}

/* ---------- 第 2 关：拨钟（拖指针） ---------- */
function Game2_SetClock({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const target = useMemo(() => {
    const h = randInt(1, 12);
    const m = [0, 15, 30, 45][randInt(0, 3)];
    return {
      h,
      m
    };
    // eslint-disable-next-line
  }, [round]);
  const [state, setState] = useState({
    hour: 12,
    minute: 0
  });
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  useEffect(() => {
    setState({
      hour: 12,
      minute: 0
    });
    setLocked(false);
    setFeedback(null);
  }, [round]);
  const submit = () => {
    if (locked) return;
    setLocked(true);
    const ok = state.hour === target.h && state.minute === target.m;
    setFeedback(ok ? "ok" : "bad");
    if (ok) setScore(s => s + 1);
  };

  // 拖动模式：先拨分针，再拨时针
  const [mode, setMode] = useState("minute");
  useEffect(() => setMode("minute"), [round]);
  return /*#__PURE__*/React.createElement("div", {
    className: "game-card"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    title: `第 2 关 · 拨一拨指针`,
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotBear, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, "\u8BF7\u628A\u949F\u8868\u62E8\u5230 ", /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      color: "var(--coral-deep)",
      fontSize: 28
    }
  }, fmtTime(target.h, target.m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    hour: state.hour,
    minute: state.minute,
    second: 0,
    size: 260,
    interactive: !locked,
    drag: mode,
    onChange: v => setState(s => ({
      ...s,
      ...v
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn sm ${mode === "hour" ? "btn-sun" : "ghost"}`,
    disabled: locked,
    onClick: () => setMode("hour")
  }, "\u62E8\u65F6\u9488"), /*#__PURE__*/React.createElement("button", {
    className: `btn sm ${mode === "minute" ? "btn-sun" : "ghost"}`,
    disabled: locked,
    onClick: () => setMode("minute")
  }, "\u62E8\u5206\u9488")), /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      fontSize: 26,
      color: feedback === "ok" ? "var(--mint-deep)" : feedback === "bad" ? "var(--coral-deep)" : "var(--ink)"
    }
  }, "\u5F53\u524D\uFF1A", fmtTime(state.hour, state.minute), feedback === "ok" && " ✓", feedback === "bad" && ` ✗ 正确答案：${fmtTime(target.h, target.m)}`), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-mint",
    disabled: locked,
    onClick: submit
  }, "\u5C31\u662F\u8FD9\u4E2A\u65F6\u95F4\uFF01")), /*#__PURE__*/React.createElement(RoundNav, {
    round: round,
    total: TOTAL,
    setRound: setRound,
    onFinish: () => onWin(score, TOTAL)
  }));
}

/* ---------- 第 3 关：生活场景配对 ---------- */
const SCENES = [{
  time: "7:00",
  emoji: "🌅",
  text: "起床啦！"
}, {
  time: "8:00",
  emoji: "📚",
  text: "去学校"
}, {
  time: "12:00",
  emoji: "🍚",
  text: "吃午饭"
}, {
  time: "15:00",
  emoji: "⚽",
  text: "操场玩耍"
}, {
  time: "18:30",
  emoji: "🛁",
  text: "洗澡澡"
}, {
  time: "21:00",
  emoji: "😴",
  text: "睡觉觉"
}];
function Game3_MatchScene({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const item = SCENES[randInt(0, SCENES.length - 1)];
    const [h, m] = item.time.split(":").map(Number);
    // generate 4 different scene options including the correct one
    const others = shuffle(SCENES.filter(s => s.time !== item.time)).slice(0, 3);
    return {
      h,
      m,
      correct: item.text,
      options: shuffle([item, ...others]).map(o => o.text),
      source: item
    };
  }), []);
  const q = questions[round];
  const resolve = ok => {
    if (ok) setScore(s => s + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "game-card"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    title: `第 3 关 · 这个时间在做什么`,
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotBear, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, "\u770B\u770B\u949F\u8868\u4E0A\u7684\u65F6\u95F4\uFF0C\u5C0F\u670B\u53CB\u8FD9\u65F6\u5019\u4E00\u822C\u5728\u505A\u4EC0\u4E48\u5462\uFF1F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    hour: q.h,
    minute: q.m,
    second: 0,
    size: 200
  }), /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      fontSize: 48,
      color: "var(--coral-deep)"
    }
  }, fmtTime(q.h, q.m))), /*#__PURE__*/React.createElement(OptionGrid, {
    key: round,
    options: q.options,
    correct: q.correct,
    onResolved: resolve,
    render: v => {
      const item = SCENES.find(s => s.text === v);
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--font-cn)",
          fontSize: 20
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 34
        }
      }, item?.emoji), v);
    },
    initialPick: picks[round],
    onPick: v => setPicks(p => ({
      ...p,
      [round]: v
    }))
  }), /*#__PURE__*/React.createElement(RoundNav, {
    round: round,
    total: TOTAL,
    setRound: setRound,
    onFinish: () => onWin(score, TOTAL)
  }));
}

/* ---------- 章节 1 主入口 ---------- */
function Chapter1({
  onComplete,
  onBack,
  addReward
}) {
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);
  const finishStage = (correct, total) => {
    const stars = correct === total ? 3 : correct >= total * 0.7 ? 2 : 1;
    const coins = correct * 3;
    addReward({
      stars,
      coins
    });
    setResult({
      stars,
      correct,
      total
    });
  };
  const next = () => {
    setResult(null);
    if (stage + 1 >= 3) onComplete();else setStage(s => s + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "chapter-screen chapter-bg-c1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chapter-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-tabs"
  }, ["读时间", "拨指针", "时间&场景"].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `stage-tab ${i === stage ? "active" : ""}`,
    onClick: () => setStage(i)
  }, i < stage && /*#__PURE__*/React.createElement(StarIcon, {
    size: 16
  }), " ", t))), stage === 0 && /*#__PURE__*/React.createElement(Game1_ReadClock, {
    key: "g1",
    onWin: finishStage
  }), stage === 1 && /*#__PURE__*/React.createElement(Game2_SetClock, {
    key: "g2",
    onWin: finishStage
  }), stage === 2 && /*#__PURE__*/React.createElement(Game3_MatchScene, {
    key: "g3",
    onWin: finishStage
  })), result && /*#__PURE__*/React.createElement(FeedbackModal, {
    kind: result.stars === 3 ? "perfect" : "win",
    stars: result.stars,
    message: `这一关答对 ${result.correct}/${result.total} 题，获得 ${result.correct * 3} 枚金币！`,
    onNext: next,
    nextLabel: stage + 1 >= 3 ? "返回地图" : "下一关"
  }));
}
Object.assign(window, {
  Chapter1,
  Clock
});
