/* ===== 主地图：5 个海岛 ===== */

const ISLANDS = [
  { id: 1, code: "c1", mascot: "bear",     title: "时间小岛",     sub: "认识钟表 · 读时间", stages: 3 },
  { id: 2, code: "c2", mascot: "squirrel", title: "余数森林",     sub: "有余数的除法",     stages: 3 },
  { id: 3, code: "c3", mascot: "fox",      title: "倍数草原",     sub: "数量间的乘除关系", stages: 3 },
  { id: 4, code: "c4", mascot: "bunny",    title: "万数城堡",     sub: "万以内数的认识",   stages: 3 },
  { id: 5, code: "c5", mascot: "cat",      title: "加减集市",     sub: "万以内加减法",     stages: 3 },
];

function Cloud({ x, y, scale = 1, opacity = .9 }) {
  return (
    <svg className="cloud" style={{ left: x, top: y, transform: `scale(${scale})`, opacity }}
      width="160" height="64" viewBox="0 0 160 64">
      <ellipse cx="40" cy="42" rx="32" ry="20" fill="#fff" />
      <ellipse cx="76" cy="32" rx="30" ry="22" fill="#fff" />
      <ellipse cx="112" cy="42" rx="34" ry="20" fill="#fff" />
    </svg>
  );
}

function IslandCard({ island, doneCount, onPick }) {
  const Mc = MASCOTS[island.mascot];
  return (
    <div className={`island ${island.code}`} onClick={() => onPick(island)}>
      <div className="island-num">0{island.id}</div>
      <div className="island-mascot"><Mc size={110} /></div>
      <h3>{island.title}</h3>
      <p>{island.sub}</p>
      <div className="island-foot">
        <div className="stage-pips">
          {Array.from({ length: island.stages }).map((_, i) => (
            <span key={i} className={`pip ${i < doneCount ? "done" : ""}`} />
          ))}
        </div>
        <span className="go">出发 →</span>
      </div>
    </div>
  );
}

function MapScreen({ progress, onPick }) {
  return (
    <div className="map-screen">
      {/* clouds */}
      <Cloud x={40} y={70} scale={.9} opacity={.85} />
      <Cloud x="60%" y={40} scale={1.2} opacity={.7} />
      <Cloud x="78%" y={200} scale={.8} opacity={.8} />
      <Cloud x={20} y={420} scale={1} opacity={.6} />
      <Cloud x="50%" y={620} scale={.9} opacity={.55} />

      <div className="map-inner">
        <h1 className="map-title">数学小岛 · 二年级</h1>
        <p className="map-sub">和小动物伙伴一起出发，闯过 5 座神奇的小岛！</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 22,
        }}>
          <div style={{ gridColumn: "1 / span 2" }}>
            <IslandCard island={ISLANDS[0]} doneCount={progress[1] || 0} onPick={onPick} />
          </div>
          <div style={{ gridColumn: "3 / span 2", marginTop: 38 }}>
            <IslandCard island={ISLANDS[1]} doneCount={progress[2] || 0} onPick={onPick} />
          </div>
          <div style={{ gridColumn: "5 / span 2" }}>
            <IslandCard island={ISLANDS[2]} doneCount={progress[3] || 0} onPick={onPick} />
          </div>
          <div style={{ gridColumn: "2 / span 2", marginTop: 14 }}>
            <IslandCard island={ISLANDS[3]} doneCount={progress[4] || 0} onPick={onPick} />
          </div>
          <div style={{ gridColumn: "4 / span 2", marginTop: 14 }}>
            <IslandCard island={ISLANDS[4]} doneCount={progress[5] || 0} onPick={onPick} />
          </div>
        </div>

        {/* footer hint */}
        <div style={{textAlign:"center", marginTop:40, color:"#6E5E80", fontSize:16}}>
          <span style={{display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.7)", padding:"10px 20px", borderRadius:999, boxShadow:"0 2px 0 rgba(61,46,80,.08)"}}>
            <StarIcon size={20} />
            每过一关都能赚星星和金币，集齐 3 颗星就能完美通关哦！
          </span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ISLANDS, MapScreen });
