/* ===== 数学小岛 · 入口 ===== */

function App() {
  const [screen, setScreen] = useState({ kind: "map" }); // {kind:"map"} or {kind:"chapter", id}
  const [progress, setProgress] = useState({}); // { 1: doneStages, 2: ... }
  const [stars, setStars] = useState(0);
  const [coins, setCoins] = useState(0);

  // restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("math-island-state");
      if (raw) {
        const s = JSON.parse(raw);
        setProgress(s.progress || {});
        setStars(s.stars || 0);
        setCoins(s.coins || 0);
      }
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("math-island-state", JSON.stringify({ progress, stars, coins }));
    } catch (e) { /* ignore */ }
  }, [progress, stars, coins]);

  const pick = (island) => setScreen({ kind: "chapter", id: island.id });
  const back = () => setScreen({ kind: "map" });

  const addReward = ({ stars: s = 0, coins: c = 0 }) => {
    setStars(prev => prev + s);
    setCoins(prev => prev + c);
  };

  // when a chapter calls onComplete, we mark its stages done as 3 and go back
  const completeChapter = (id) => {
    setProgress(prev => ({ ...prev, [id]: Math.max(prev[id] || 0, 3) }));
    setScreen({ kind: "map" });
  };

  // increment progress mid-chapter (after each game)
  const markStage = (id) => {
    setProgress(prev => ({ ...prev, [id]: Math.min(3, (prev[id] || 0) + 1) }));
  };

  // wrap addReward to also bump stage
  const addRewardForChapter = (id) => ({ stars: s = 0, coins: c = 0 }) => {
    addReward({ stars: s, coins: c });
    markStage(id);
  };

  let body, title, onBack;
  if (screen.kind === "map") {
    body = <MapScreen progress={progress} onPick={pick} />;
  } else {
    const id = screen.id;
    const island = ISLANDS.find(i => i.id === id);
    title = island?.title;
    onBack = back;
    const props = { onComplete: () => completeChapter(id), addReward: addRewardForChapter(id) };
    if (id === 1) body = <Chapter1 {...props} />;
    else if (id === 2) body = <Chapter2 {...props} />;
    else if (id === 3) body = <Chapter3 {...props} />;
    else if (id === 4) body = <Chapter4 {...props} />;
    else if (id === 5) body = <Chapter5 {...props} />;
  }

  return (
    <>
      <TopBar stars={stars} coins={coins} onBack={onBack} title={title} />
      {body}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
