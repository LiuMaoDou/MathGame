/* ===== 章节 2 · 余数森林 · 有余数的除法 ===== */

/* ---------- 第 1 关：分松果到盘子 ---------- */
function Game1_ShareAcorns({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const divisor = randInt(3, 5);
    const quotient = randInt(2, 5);
    const remainder = randInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;
    return {
      dividend,
      divisor,
      quotient,
      remainder
    };
  }), []);
  const q = questions[round];

  // user drags acorns; we simulate by clicking acorns to send to next plate
  const [placed, setPlaced] = useState([]); // array of plate indices for each acorn (or -1 for tray)
  useEffect(() => {
    setPlaced(Array.from({
      length: q.dividend
    }, () => -1));
  }, [q]);
  const placeNext = () => {
    setPlaced(prev => {
      // count current plates fill levels
      const counts = Array.from({
        length: q.divisor
      }, () => 0);
      prev.forEach(p => {
        if (p >= 0) counts[p]++;
      });
      // find first plate that has fewer than (Math.floor(dividend/divisor)+1) but distribute evenly
      // simpler: place into plate with min count, that has < quotient items
      let target = -1;
      for (let i = 0; i < q.divisor; i++) {
        if (counts[i] < q.quotient) {
          target = i;
          break;
        }
      }
      if (target === -1) return prev; // remainder stays in tray
      const idx = prev.findIndex(p => p === -1);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = target;
      return next;
    });
  };
  const reset = () => setPlaced(Array.from({
    length: q.dividend
  }, () => -1));
  const trayAcorns = placed.filter(p => p === -1).length;
  const allPlacedToCapacity = placed.filter(p => p >= 0).length === q.divisor * q.quotient;
  const correctAnswer = `${q.quotient} 余 ${q.remainder}`;
  const options = useMemo(() => uniqueOptions(correctAnswer, () => `${randInt(1, 6)} 余 ${randInt(1, 4)}`, 4), [q]);
  const resolve = ok => {
    if (ok) setScore(s => s + 1);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "game-card"
  }, /*#__PURE__*/React.createElement(ChapterHeader, {
    title: `第 1 关 · 帮小松鼠分松果`,
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotSquirrel, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, "\u4E00\u5171 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.dividend), " \u4E2A\u677E\u679C\uFF0C \u5E73\u5747\u653E\u8FDB ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.divisor), " \u4E2A\u76D8\u5B50\uFF0C \u6BCF\u76D8 ", /*#__PURE__*/React.createElement("b", null, "\u540C\u6837\u591A"), "\u3002\u70B9\u677E\u679C\u628A\u5B83\u4EEC\u653E\u8FDB\u76D8\u5B50\u91CC\uFF01")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFEFD8",
      borderRadius: 24,
      padding: 16,
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "center",
      minHeight: 80,
      border: "3px dashed #D9B074"
    }
  }, placed.map((p, i) => p === -1 && /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: placeNext,
    style: {
      border: "none",
      background: "none",
      padding: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Acorn, {
    size: 42
  }))), trayAcorns === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-soft)",
      fontFamily: "var(--font-cn)"
    }
  }, "\u7BEE\u5B50\u7A7A\u5566\uFF01")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  }, Array.from({
    length: q.divisor
  }).map((_, plateIdx) => {
    const items = placed.filter(p => p === plateIdx).length;
    return /*#__PURE__*/React.createElement("div", {
      key: plateIdx,
      style: {
        width: 110,
        minHeight: 130,
        background: "linear-gradient(180deg, #fff 0%, #FFEACE 100%)",
        borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
        boxShadow: "0 4px 0 rgba(61,46,80,.12), inset 0 -8px 0 rgba(217,176,116,.4)",
        padding: "14px 6px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3,
        maxWidth: 90
      }
    }, Array.from({
      length: items
    }).map((_, k) => /*#__PURE__*/React.createElement(Acorn, {
      key: k,
      size: 26
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sun sm",
    onClick: placeNext,
    disabled: trayAcorns === 0 || allPlacedToCapacity && trayAcorns === q.remainder
  }, "\u653E\u4E00\u4E2A \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost sm",
    onClick: reset
  }, "\u91CD\u65B0\u653E")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF6DC",
      borderRadius: 18,
      padding: "14px 20px",
      textAlign: "center",
      fontFamily: "var(--font-cn)",
      fontSize: 22,
      letterSpacing: 1
    }
  }, "\u6BCF\u76D8\u6709 ", /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      color: "var(--coral-deep)",
      fontSize: 28
    }
  }, "?"), " \u4E2A\uFF0C \u8FD8\u5269 ", /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      color: "var(--coral-deep)",
      fontSize: 28
    }
  }, "?"), " \u4E2A"), /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      textAlign: "center",
      fontSize: 24
    }
  }, q.dividend, " \xF7 ", q.divisor, " = ?"), /*#__PURE__*/React.createElement(OptionGrid, {
    key: round,
    options: options,
    correct: correctAnswer,
    onResolved: resolve,
    render: v => /*#__PURE__*/React.createElement("span", {
      className: "num",
      style: {
        fontSize: 24
      }
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
function Acorn({
  size = 32
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "16",
    cy: "20",
    rx: "9",
    ry: "10",
    fill: "#B86F3F"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "16",
    cy: "19",
    rx: "5",
    ry: "6",
    fill: "#D58A52",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12 Q16 6 26 12 L24 16 L8 16 Z",
    fill: "#5A3A1B"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 12 Q16 8 24 12",
    fill: "none",
    stroke: "#3D2E50",
    strokeWidth: "1",
    opacity: ".5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "4",
    width: "2",
    height: "5",
    rx: "1",
    fill: "#5A3A1B"
  }));
}

/* ---------- 第 2 关：算式填空 ---------- */
function Game2_FillRemainder({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const divisor = randInt(3, 9);
    const quotient = randInt(2, 8);
    const remainder = randInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;
    // alternate: ask for quotient OR remainder
    const askWhat = Math.random() < .5 ? "quotient" : "remainder";
    const correct = askWhat === "quotient" ? quotient : remainder;
    const options = uniqueOptions(correct, () => randInt(1, 9), 4);
    return {
      dividend,
      divisor,
      quotient,
      remainder,
      askWhat,
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
    title: "\u7B2C 2 \u5173 \xB7 \u7B97\u5F0F\u586B\u7A7A",
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotSquirrel, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, "\u770B\u4E00\u770B\uFF0C\u7B97\u4E00\u7B97\uFF01", q.askWhat === "quotient" ? "商是几？" : "余数是几？")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(180deg,#FFF6DC,#FFE8B5)",
      borderRadius: 24,
      padding: "30px 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      fontSize: 54,
      letterSpacing: 4,
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("span", null, q.dividend), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 14px",
      color: "var(--coral-deep)"
    }
  }, "\xF7"), /*#__PURE__*/React.createElement("span", null, q.divisor), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 14px"
    }
  }, "="), /*#__PURE__*/React.createElement("span", {
    style: {
      color: q.askWhat === "quotient" ? "var(--coral-deep)" : "var(--ink)"
    }
  }, q.askWhat === "quotient" ? "?" : q.quotient), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 14px",
      fontSize: 34,
      color: "var(--ink-soft)"
    }
  }, "\u4F59"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: q.askWhat === "remainder" ? "var(--coral-deep)" : "var(--ink)"
    }
  }, q.askWhat === "remainder" ? "?" : q.remainder))), /*#__PURE__*/React.createElement(OptionGrid, {
    key: round,
    options: q.options,
    correct: q.correct,
    onResolved: resolve,
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

/* ---------- 第 3 关：故事题 ---------- */
const STORIES = [{
  who: "小松鼠",
  icon: "🐿️",
  thing: "松果",
  emoji: "🌰",
  verb: "分给"
}, {
  who: "小兔子",
  icon: "🐰",
  thing: "胡萝卜",
  emoji: "🥕",
  verb: "分给"
}, {
  who: "小熊",
  icon: "🐻",
  thing: "蜂蜜罐",
  emoji: "🍯",
  verb: "分给"
}, {
  who: "小狐狸",
  icon: "🦊",
  thing: "草莓",
  emoji: "🍓",
  verb: "分给"
}];
function Game3_Story({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const s = STORIES[randInt(0, STORIES.length - 1)];
    const divisor = randInt(3, 6);
    const quotient = randInt(2, 5);
    const remainder = randInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;
    const friends = divisor;
    const askWhat = Math.random() < .5 ? "quotient" : "remainder";
    const correct = `${askWhat === "quotient" ? quotient : remainder}`;
    const options = uniqueOptions(correct, () => `${randInt(1, 8)}`, 4);
    return {
      s,
      dividend,
      divisor: friends,
      quotient,
      remainder,
      askWhat,
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
    title: "\u7B2C 3 \u5173 \xB7 \u68EE\u6797\u6545\u4E8B",
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotSquirrel, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, q.s.who, " ", q.s.icon, " \u6709 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.dividend), " \u4E2A ", q.s.thing, q.s.emoji, "\uFF0C", q.s.verb, " ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.s.divisor), " \u4E2A\u5C0F\u4F19\u4F34\uFF0C\u6BCF\u4EBA\u5206\u5F97 ", /*#__PURE__*/React.createElement("b", null, "\u540C\u6837\u591A"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, Array.from({
    length: q.dividend
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 30
    }
  }, q.s.emoji))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF6DC",
      borderRadius: 18,
      padding: "14px 20px",
      textAlign: "center",
      fontFamily: "var(--font-cn)",
      fontSize: 22
    }
  }, q.askWhat === "quotient" ? /*#__PURE__*/React.createElement(React.Fragment, null, "\u6BCF\u4E2A\u5C0F\u4F19\u4F34\u5206\u5230 ", /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      color: "var(--coral-deep)",
      fontSize: 28
    }
  }, "?"), " \u4E2A") : /*#__PURE__*/React.createElement(React.Fragment, null, "\u8FD8\u5269\u4E0B ", /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      color: "var(--coral-deep)",
      fontSize: 28
    }
  }, "?"), " \u4E2A")), /*#__PURE__*/React.createElement(OptionGrid, {
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

/* ---------- 章节 2 入口 ---------- */
function Chapter2({
  onComplete,
  addReward
}) {
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);
  const finish = (correct, total) => {
    const stars = correct === total ? 3 : correct >= total * 0.7 ? 2 : 1;
    addReward({
      stars,
      coins: correct * 3
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
    className: "chapter-screen chapter-bg-c2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chapter-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-tabs"
  }, ["分松果", "算式填空", "森林故事"].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `stage-tab ${i === stage ? "active" : ""}`,
    onClick: () => setStage(i)
  }, i < stage && /*#__PURE__*/React.createElement(StarIcon, {
    size: 16
  }), " ", t))), stage === 0 && /*#__PURE__*/React.createElement(Game1_ShareAcorns, {
    key: "g1",
    onWin: finish
  }), stage === 1 && /*#__PURE__*/React.createElement(Game2_FillRemainder, {
    key: "g2",
    onWin: finish
  }), stage === 2 && /*#__PURE__*/React.createElement(Game3_Story, {
    key: "g3",
    onWin: finish
  })), result && /*#__PURE__*/React.createElement(FeedbackModal, {
    kind: result.stars === 3 ? "perfect" : "win",
    stars: result.stars,
    message: `这一关答对 ${result.correct}/${result.total} 题，获得 ${result.correct * 3} 枚金币！`,
    onNext: next,
    nextLabel: stage + 1 >= 3 ? "返回地图" : "下一关"
  }));
}
Object.assign(window, {
  Chapter2
});
