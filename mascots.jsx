/* ===== 5 只小动物吉祥物 SVG ===== */
/* 每只都是圆润的 viewBox 0 0 120 120，可拿来当章节封面 / 章节小头像 */

function MascotBear({ size = 120, mood = "happy" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* ears */}
      <circle cx="32" cy="32" r="14" fill="#C98E60" />
      <circle cx="88" cy="32" r="14" fill="#C98E60" />
      <circle cx="32" cy="32" r="7" fill="#F4C99A" />
      <circle cx="88" cy="32" r="7" fill="#F4C99A" />
      {/* head */}
      <ellipse cx="60" cy="64" rx="38" ry="36" fill="#D9A578" />
      {/* muzzle */}
      <ellipse cx="60" cy="76" rx="20" ry="16" fill="#F4D8B7" />
      {/* eyes */}
      <circle cx="46" cy="58" r="4.5" fill="#3D2E50" />
      <circle cx="74" cy="58" r="4.5" fill="#3D2E50" />
      <circle cx="47.5" cy="56.5" r="1.5" fill="#fff" />
      <circle cx="75.5" cy="56.5" r="1.5" fill="#fff" />
      {/* nose */}
      <ellipse cx="60" cy="72" rx="4" ry="3" fill="#3D2E50" />
      {/* mouth */}
      <path d="M55 80 Q60 84 65 80" stroke="#3D2E50" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="38" cy="72" r="4" fill="#FFB0AF" opacity=".7" />
      <circle cx="82" cy="72" r="4" fill="#FFB0AF" opacity=".7" />
    </svg>
  );
}

function MascotSquirrel({ size = 120 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* tail */}
      <path d="M22 78 Q5 60 15 38 Q25 22 42 32 Q30 48 30 70 Z" fill="#B86F3F" />
      <path d="M22 78 Q12 64 20 46 Q28 32 40 38 Q32 52 32 70 Z" fill="#D58A52" />
      {/* body */}
      <ellipse cx="62" cy="78" rx="26" ry="22" fill="#D58A52" />
      <ellipse cx="62" cy="84" rx="16" ry="12" fill="#F4D2A8" />
      {/* head */}
      <circle cx="68" cy="50" r="26" fill="#D58A52" />
      {/* ears */}
      <path d="M52 30 L48 18 L60 26 Z" fill="#B86F3F" />
      <path d="M84 30 L88 18 L76 26 Z" fill="#B86F3F" />
      {/* eyes */}
      <circle cx="60" cy="48" r="4" fill="#3D2E50" />
      <circle cx="78" cy="48" r="4" fill="#3D2E50" />
      <circle cx="61" cy="47" r="1.4" fill="#fff" />
      <circle cx="79" cy="47" r="1.4" fill="#fff" />
      {/* muzzle */}
      <ellipse cx="69" cy="58" rx="8" ry="6" fill="#F4D2A8" />
      <ellipse cx="69" cy="55" rx="2.2" ry="1.8" fill="#3D2E50" />
      <path d="M65 60 Q69 63 73 60" stroke="#3D2E50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="52" cy="58" r="3" fill="#FFB0AF" opacity=".7" />
      <circle cx="86" cy="58" r="3" fill="#FFB0AF" opacity=".7" />
      {/* acorn in hand */}
      <ellipse cx="44" cy="84" rx="6" ry="7" fill="#8B5A2B" />
      <path d="M38 80 Q44 76 50 80 L48 82 L40 82 Z" fill="#5A3A1B" />
    </svg>
  );
}

function MascotFox({ size = 120 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* head */}
      <path d="M60 18 L36 30 L24 60 L42 86 L78 86 L96 60 L84 30 Z" fill="#F08A4B" />
      {/* ear inside */}
      <path d="M40 28 L50 44 L34 44 Z" fill="#FFB57A" />
      <path d="M80 28 L70 44 L86 44 Z" fill="#FFB57A" />
      {/* face white */}
      <path d="M60 50 L40 74 Q60 90 80 74 Z" fill="#FFF4E5" />
      <path d="M48 36 Q42 50 44 64 Q54 66 60 56 Z" fill="#FFF4E5" />
      <path d="M72 36 Q78 50 76 64 Q66 66 60 56 Z" fill="#FFF4E5" />
      {/* eyes */}
      <circle cx="48" cy="56" r="4" fill="#3D2E50" />
      <circle cx="72" cy="56" r="4" fill="#3D2E50" />
      <circle cx="49" cy="55" r="1.4" fill="#fff" />
      <circle cx="73" cy="55" r="1.4" fill="#fff" />
      {/* nose */}
      <ellipse cx="60" cy="68" rx="3" ry="2.4" fill="#3D2E50" />
      <path d="M60 70 L60 76 M55 78 Q60 82 65 78" stroke="#3D2E50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="42" cy="68" r="3.2" fill="#FFB0AF" opacity=".7" />
      <circle cx="78" cy="68" r="3.2" fill="#FFB0AF" opacity=".7" />
    </svg>
  );
}

function MascotBunny({ size = 120 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* ears */}
      <ellipse cx="44" cy="26" rx="8" ry="20" fill="#F4F4F8" />
      <ellipse cx="76" cy="26" rx="8" ry="20" fill="#F4F4F8" />
      <ellipse cx="44" cy="28" rx="4" ry="14" fill="#FFC6D2" />
      <ellipse cx="76" cy="28" rx="4" ry="14" fill="#FFC6D2" />
      {/* head */}
      <ellipse cx="60" cy="68" rx="34" ry="32" fill="#FFFFFF" stroke="#E0DAE6" strokeWidth="1.5" />
      {/* eyes */}
      <circle cx="46" cy="64" r="4.5" fill="#3D2E50" />
      <circle cx="74" cy="64" r="4.5" fill="#3D2E50" />
      <circle cx="47.5" cy="62.5" r="1.5" fill="#fff" />
      <circle cx="75.5" cy="62.5" r="1.5" fill="#fff" />
      {/* nose */}
      <path d="M56 76 Q60 80 64 76 Q60 78 60 80 Q56 78 56 76Z" fill="#FFB0AF" />
      <path d="M60 80 L60 84 M56 86 Q60 90 64 86" stroke="#3D2E50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="40" cy="78" r="4" fill="#FFB0AF" opacity=".7" />
      <circle cx="80" cy="78" r="4" fill="#FFB0AF" opacity=".7" />
      {/* tooth */}
      <rect x="58" y="86" width="4" height="6" rx="1" fill="#fff" stroke="#E0DAE6" strokeWidth=".8" />
    </svg>
  );
}

function MascotCat({ size = 120 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* ears */}
      <path d="M30 34 L24 14 L46 26 Z" fill="#9DDAF0" />
      <path d="M90 34 L96 14 L74 26 Z" fill="#9DDAF0" />
      <path d="M32 30 L30 20 L42 28 Z" fill="#FFB0AF" />
      <path d="M88 30 L90 20 L78 28 Z" fill="#FFB0AF" />
      {/* head */}
      <ellipse cx="60" cy="64" rx="36" ry="34" fill="#9DDAF0" />
      {/* stripe */}
      <path d="M44 38 Q50 46 46 54" stroke="#7FC2DD" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M76 38 Q70 46 74 54" stroke="#7FC2DD" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx="46" cy="60" rx="5" ry="6" fill="#3D2E50" />
      <ellipse cx="74" cy="60" rx="5" ry="6" fill="#3D2E50" />
      <circle cx="47.5" cy="58" r="1.5" fill="#fff" />
      <circle cx="75.5" cy="58" r="1.5" fill="#fff" />
      {/* nose */}
      <path d="M56 74 L64 74 L60 78 Z" fill="#FFB0AF" />
      <path d="M60 78 L60 82 M55 84 Q60 87 65 84" stroke="#3D2E50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M30 74 L46 76 M30 80 L46 80" stroke="#7FC2DD" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M90 74 L74 76 M90 80 L74 80" stroke="#7FC2DD" strokeWidth="1.6" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="40" cy="78" r="4" fill="#FFB0AF" opacity=".6" />
      <circle cx="80" cy="78" r="4" fill="#FFB0AF" opacity=".6" />
    </svg>
  );
}

const MASCOTS = {
  bear: MascotBear,
  squirrel: MascotSquirrel,
  fox: MascotFox,
  bunny: MascotBunny,
  cat: MascotCat,
};

function Mascot({ kind, size = 120 }) {
  const C = MASCOTS[kind] || MascotBear;
  return <C size={size} />;
}

Object.assign(window, {
  MascotBear, MascotSquirrel, MascotFox, MascotBunny, MascotCat, Mascot,
});
