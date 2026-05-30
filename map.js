/* ===== 主地图：5 个海岛 ===== */

const ISLANDS = [{
  id: 1,
  code: "c1",
  mascot: "bear",
  title: "时间小岛",
  sub: "认识钟表 · 读时间",
  stages: 3
}, {
  id: 2,
  code: "c2",
  mascot: "squirrel",
  title: "余数森林",
  sub: "有余数的除法",
  stages: 3
}, {
  id: 3,
  code: "c3",
  mascot: "fox",
  title: "倍数草原",
  sub: "数量间的乘除关系",
  stages: 3
}, {
  id: 4,
  code: "c4",
  mascot: "bunny",
  title: "万数城堡",
  sub: "万以内数的认识",
  stages: 3
}, {
  id: 5,
  code: "c5",
  mascot: "cat",
  title: "加减集市",
  sub: "万以内加减法",
  stages: 3
}];
function Cloud({
  x,
  y,
  scale = 1,
  opacity = .9
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "cloud",
    style: {
      left: x,
      top: y,
      transform: `scale(${scale})`,
      opacity
    },
    width: "160",
    height: "64",
    viewBox: "0 0 160 64"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "40",
    cy: "42",
    rx: "32",
    ry: "20",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "76",
    cy: "32",
    rx: "30",
    ry: "22",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "112",
    cy: "42",
    rx: "34",
    ry: "20",
    fill: "#fff"
  }));
}
function IslandCard({
  island,
  doneCount,
  onPick
}) {
  const Mc = MASCOTS[island.mascot];
  return /*#__PURE__*/React.createElement("div", {
    className: `island ${island.code}`,
    onClick: () => onPick(island)
  }, /*#__PURE__*/React.createElement("div", {
    className: "island-num"
  }, "0", island.id), /*#__PURE__*/React.createElement("div", {
    className: "island-mascot"
  }, /*#__PURE__*/React.createElement(Mc, {
    size: 110
  })), /*#__PURE__*/React.createElement("h3", null, island.title), /*#__PURE__*/React.createElement("p", null, island.sub), /*#__PURE__*/React.createElement("div", {
    className: "island-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-pips"
  }, Array.from({
    length: island.stages
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `pip ${i < doneCount ? "done" : ""}`
  }))), /*#__PURE__*/React.createElement("span", {
    className: "go"
  }, "\u51FA\u53D1 \u2192")));
}
function MapScreen({
  progress,
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "map-screen"
  }, /*#__PURE__*/React.createElement(Cloud, {
    x: 40,
    y: 70,
    scale: .9,
    opacity: .85
  }), /*#__PURE__*/React.createElement(Cloud, {
    x: "60%",
    y: 40,
    scale: 1.2,
    opacity: .7
  }), /*#__PURE__*/React.createElement(Cloud, {
    x: "78%",
    y: 200,
    scale: .8,
    opacity: .8
  }), /*#__PURE__*/React.createElement(Cloud, {
    x: 20,
    y: 420,
    scale: 1,
    opacity: .6
  }), /*#__PURE__*/React.createElement(Cloud, {
    x: "50%",
    y: 620,
    scale: .9,
    opacity: .55
  }), /*#__PURE__*/React.createElement("div", {
    className: "map-inner"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "map-title"
  }, "\u6570\u5B66\u5C0F\u5C9B \xB7 \u4E8C\u5E74\u7EA7"), /*#__PURE__*/React.createElement("p", {
    className: "map-sub"
  }, "\u548C\u5C0F\u52A8\u7269\u4F19\u4F34\u4E00\u8D77\u51FA\u53D1\uFF0C\u95EF\u8FC7 5 \u5EA7\u795E\u5947\u7684\u5C0F\u5C9B\uFF01"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / span 2"
    }
  }, /*#__PURE__*/React.createElement(IslandCard, {
    island: ISLANDS[0],
    doneCount: progress[1] || 0,
    onPick: onPick
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "3 / span 2",
      marginTop: 38
    }
  }, /*#__PURE__*/React.createElement(IslandCard, {
    island: ISLANDS[1],
    doneCount: progress[2] || 0,
    onPick: onPick
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "5 / span 2"
    }
  }, /*#__PURE__*/React.createElement(IslandCard, {
    island: ISLANDS[2],
    doneCount: progress[3] || 0,
    onPick: onPick
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "2 / span 2",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(IslandCard, {
    island: ISLANDS[3],
    doneCount: progress[4] || 0,
    onPick: onPick
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "4 / span 2",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(IslandCard, {
    island: ISLANDS[4],
    doneCount: progress[5] || 0,
    onPick: onPick
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 40,
      color: "#6E5E80",
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,.7)",
      padding: "10px 20px",
      borderRadius: 999,
      boxShadow: "0 2px 0 rgba(61,46,80,.08)"
    }
  }, /*#__PURE__*/React.createElement(StarIcon, {
    size: 20
  }), "\u6BCF\u8FC7\u4E00\u5173\u90FD\u80FD\u8D5A\u661F\u661F\u548C\u91D1\u5E01\uFF0C\u96C6\u9F50 3 \u9897\u661F\u5C31\u80FD\u5B8C\u7F8E\u901A\u5173\u54E6\uFF01"))));
}
Object.assign(window, {
  ISLANDS,
  MapScreen
});
