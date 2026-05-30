/* ===== 章节 3 · 倍数草原 · 数量间的乘除关系 ===== */

/* 在二年级教学里，"几倍" 是核心概念：
   - 已知一倍数和倍数，求几倍数（乘）
   - 已知几倍数和一倍数，求是几倍（除）
   - 已知几倍数和倍数，求一倍数（除） */

/* ---------- 小道具：成行的小花/小果 ---------- */
function Row({
  count,
  color = "#FF7E6B",
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "6px 12px",
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 2px 0 rgba(61,46,80,.1)",
      alignItems: "center",
      border: `2px solid ${color}33`,
      minHeight: 48
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 24,
      lineHeight: 1
    }
  }, icon)));
}

/* ---------- 第 1 关：几倍是多少（看图） ---------- */
function Game1_HowManyTimes({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const items = ["🌸", "🍓", "🍎", "🌻", "🍇", "🍑"];
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const base = randInt(2, 5);
    const times = randInt(2, 5);
    const correct = base * times;
    const a = items[randInt(0, items.length - 1)];
    let b = items[randInt(0, items.length - 1)];
    while (b === a) b = items[randInt(0, items.length - 1)];
    const options = uniqueOptions(correct, () => base * randInt(2, 6), 4);
    return {
      base,
      times,
      correct,
      a,
      b,
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
    title: "\u7B2C 1 \u5173 \xB7 \u662F\u51E0\u500D\uFF1F",
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotFox, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.a), " \u6709 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.base), " \u4E2A\uFF0C", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.b), " \u662F ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.a), " \u7684 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--coral-deep)"
    }
  }, q.times), " \u500D\u3002 \u90A3\u4E48 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.b), " \u6709\u591A\u5C11\u4E2A\uFF1F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-start",
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      width: 50,
      color: "var(--berry-deep)"
    }
  }, "1 \u4EFD"), /*#__PURE__*/React.createElement(Row, {
    count: q.base,
    icon: q.a,
    color: "#F47CA8"
  })), Array.from({
    length: q.times
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      width: 50,
      color: "var(--sky-deep)"
    }
  }, i === 0 ? `${q.times} 份` : ""), /*#__PURE__*/React.createElement(Row, {
    count: q.base,
    icon: q.b,
    color: "#6FBDF0"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      textAlign: "center",
      fontSize: 30
    }
  }, q.base, " \xD7 ", q.times, " = ?"), /*#__PURE__*/React.createElement(OptionGrid, {
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

/* ---------- 第 2 关：求是几倍 ---------- */
function Game2_HowManyMultiple({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const items = ["🐝", "🦋", "🐞", "🐌", "🐛"];
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const base = randInt(2, 5);
    const times = randInt(2, 5);
    const total = base * times;
    const a = items[randInt(0, items.length - 1)];
    let b = items[randInt(0, items.length - 1)];
    while (b === a) b = items[randInt(0, items.length - 1)];
    const options = uniqueOptions(times, () => randInt(2, 7), 4);
    return {
      base,
      times,
      total,
      a,
      b,
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
    title: "\u7B2C 2 \u5173 \xB7 \u662F\u51E0\u500D\u5462\uFF1F",
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotFox, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.a), " \u6709 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--berry-deep)"
    }
  }, q.base), " \u4E2A\uFF0C", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.b), " \u6709 ", /*#__PURE__*/React.createElement("b", {
    className: "num",
    style: {
      color: "var(--sky-deep)"
    }
  }, q.total), " \u4E2A\u3002", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.b), " \u7684\u4E2A\u6570\u662F ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, q.a), " \u7684\u591A\u5C11\u500D\uFF1F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      width: 60,
      color: "var(--berry-deep)"
    }
  }, "1 \u4EFD"), /*#__PURE__*/React.createElement(Row, {
    count: q.base,
    icon: q.a,
    color: "#F47CA8"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "num",
    style: {
      width: 60,
      color: "var(--sky-deep)"
    }
  }, "? \u4EFD"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      maxWidth: 520
    }
  }, Array.from({
    length: q.times
  }).map((_, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    count: q.base,
    icon: q.b,
    color: "#6FBDF0"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      textAlign: "center",
      fontSize: 30
    }
  }, q.total, " \xF7 ", q.base, " = ?"), /*#__PURE__*/React.createElement(OptionGrid, {
    key: round,
    options: q.options,
    correct: q.times,
    onResolved: resolve,
    render: v => /*#__PURE__*/React.createElement("span", {
      className: "num"
    }, v, " \u500D"),
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

/* ---------- 第 3 关：综合应用 ---------- */
function Game3_Apply({
  onWin
}) {
  const TOTAL = 9;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState({});
  const questions = useMemo(() => Array.from({
    length: TOTAL
  }, () => {
    const variants = [
    // 求几倍数
    () => {
      const a = randInt(3, 8),
        t = randInt(2, 6);
      return {
        text: /*#__PURE__*/React.createElement(React.Fragment, null, "\u679C\u56ED\u91CC\u82F9\u679C\u6811\u6709 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, a), " \u68F5\uFF0C\u68A8\u6811\u662F\u82F9\u679C\u6811\u7684 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, t), " \u500D\uFF0C\u68A8\u6811\u6709\u591A\u5C11\u68F5\uFF1F"),
        expr: `${a} × ${t} = ?`,
        correct: a * t,
        gen: () => a * randInt(2, 7)
      };
    },
    // 求一倍数
    () => {
      const a = randInt(3, 6),
        t = randInt(2, 5);
      const tot = a * t;
      return {
        text: /*#__PURE__*/React.createElement(React.Fragment, null, "\u5C0F\u72D0\u72F8\u91C7\u4E86 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, tot), " \u6735\u82B1\uFF0C\u662F\u5C0F\u5154\u5B50\u91C7\u7684\u82B1\u7684 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, t), " \u500D\uFF0C\u5C0F\u5154\u5B50\u91C7\u4E86\u591A\u5C11\u6735\uFF1F"),
        expr: `${tot} ÷ ${t} = ?`,
        correct: a,
        gen: () => randInt(2, 9)
      };
    },
    // 求是几倍
    () => {
      const a = randInt(2, 5),
        t = randInt(2, 5);
      const tot = a * t;
      return {
        text: /*#__PURE__*/React.createElement(React.Fragment, null, "\u5C0F\u718A\u6709 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, tot), " \u5757\u997C\u5E72\uFF0C\u5C0F\u732B\u6709 ", /*#__PURE__*/React.createElement("b", {
          className: "num"
        }, a), " \u5757\u3002\u5C0F\u718A\u7684\u997C\u5E72\u662F\u5C0F\u732B\u7684\u51E0\u500D\uFF1F"),
        expr: `${tot} ÷ ${a} = ?`,
        correct: t,
        gen: () => randInt(2, 7)
      };
    }];
    const v = variants[randInt(0, variants.length - 1)]();
    const options = uniqueOptions(v.correct, v.gen, 4);
    return {
      ...v,
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
    title: "\u7B2C 3 \u5173 \xB7 \u8349\u539F\u5E94\u7528\u9898",
    progress: round,
    total: TOTAL
  }), /*#__PURE__*/React.createElement("div", {
    className: "game-prompt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mascot-sm"
  }, /*#__PURE__*/React.createElement(MascotFox, {
    size: 84
  })), /*#__PURE__*/React.createElement("div", {
    className: "bubble"
  }, q.text)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(180deg,#FFE9F2,#FFCEE0)",
      borderRadius: 22,
      padding: "24px 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "num",
    style: {
      fontSize: 46,
      color: "var(--berry-deep)"
    }
  }, q.expr)), /*#__PURE__*/React.createElement(OptionGrid, {
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

/* ---------- 章节 3 入口 ---------- */
function Chapter3({
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
    className: "chapter-screen chapter-bg-c3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chapter-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-tabs"
  }, ["求几倍数", "求是几倍", "应用题"].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `stage-tab ${i === stage ? "active" : ""}`,
    onClick: () => setStage(i)
  }, i < stage && /*#__PURE__*/React.createElement(StarIcon, {
    size: 16
  }), " ", t))), stage === 0 && /*#__PURE__*/React.createElement(Game1_HowManyTimes, {
    key: "g1",
    onWin: finish
  }), stage === 1 && /*#__PURE__*/React.createElement(Game2_HowManyMultiple, {
    key: "g2",
    onWin: finish
  }), stage === 2 && /*#__PURE__*/React.createElement(Game3_Apply, {
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
  Chapter3
});
