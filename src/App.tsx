import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { Language, LANGUAGES, getTranslations, t as translate } from './i18n/translations';
import {
  STUDENTS, LESSONS, CHALLENGES, MISSIONS, TEAMS, PROJECTS, REWARDS,
  SUBJECTS, SKILLS_CATALOG, DEMO_NOTIFICATIONS, DEMO_SKILL_EVIDENCE, CREDITS_HISTORY,
  Reward, Notification,
} from './data/index';

// ─── Context ────────────────────────────────────────────────────────────────

interface AppState {
  language: Language;
  setLanguage: (l: Language) => void;
  page: string;
  setPage: (p: string) => void;
  credits: number;
  setCredits: (c: number) => void;
  notifications: Notification[];
  markAllRead: () => void;
  redeemedRewards: RedeemedReward[];
  redeemReward: (reward: Reward) => string | null;
  creditsHistory: typeof CREDITS_HISTORY;
  t: (key: string, vars?: Record<string, string | number>) => string;
  isRTL: boolean;
}

interface RedeemedReward {
  rewardId: string;
  code: string;
  date: string;
  creditsSpent: number;
  status: 'Active' | 'Used' | 'Expired';
}

const AppContext = createContext<AppState>(null as any);
const useApp = () => useContext(AppContext);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function genCouponCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'STUDLING-DEMO-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function Avatar({ initials, color = 'bg-indigo-600', size = 'md' }: { initials: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm';
  return <div className={`${s} ${color} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}>{initials}</div>;
}

const AVATAR_COLORS = ['bg-indigo-600', 'bg-purple-600', 'bg-pink-600', 'bg-red-600', 'bg-orange-600', 'bg-amber-600', 'bg-green-600', 'bg-teal-600', 'bg-cyan-600', 'bg-blue-600'];
function avatarColor(id: string) { return AVATAR_COLORS[id.charCodeAt(1) % AVATAR_COLORS.length]; }

function Badge({ text, color = 'bg-blue-100 text-blue-800' }: { text: string; color?: string }) {
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{text}</span>;
}

function DifficultyBadge({ d }: { d: string }) {
  const c = d === 'Easy' ? 'text-green-600' : d === 'Medium' ? 'text-amber-600' : 'text-red-600';
  return <span className={`text-xs font-semibold ${c}`}>{d}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Open: 'bg-green-100 text-green-800',
    Recruiting: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-amber-100 text-amber-800',
    Completed: 'bg-gray-100 text-gray-700',
    Planning: 'bg-purple-100 text-purple-800',
    Testing: 'bg-cyan-100 text-cyan-800',
  };
  return <Badge text={status} color={map[status] || 'bg-gray-100 text-gray-700'} />;
}

function ProgressBar({ value, color = 'bg-[#1e3a8a]' }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

function Card({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-100 transition-all' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, variant = 'primary', className = '', disabled = false }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'outline'; className?: string; disabled?: boolean;
}) {
  const base = 'px-4 py-2 rounded-lg font-semibold text-sm transition-all inline-flex items-center gap-2';
  const variants = {
    primary: 'bg-[#1e3a8a] text-white hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50',
  };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
}

// ─── Layout ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: 'home', icon: '⌂', labelKey: 'nav.home' },
  { key: 'challenges', icon: '◎', labelKey: 'nav.challenges' },
  { key: 'passport', icon: '✦', labelKey: 'nav.skillPassport' },
  { key: 'lessons', icon: '📖', labelKey: 'nav.lessons' },
  { key: 'missions', icon: '🚀', labelKey: 'nav.missions' },
  { key: 'teams', icon: '👥', labelKey: 'nav.teams' },
  { key: 'projects', icon: '🛠', labelKey: 'nav.projects' },
  { key: 'discover', icon: '🔍', labelKey: 'nav.discover' },
  { key: 'subjects', icon: '📋', labelKey: 'nav.subjects' },
  { key: 'skills', icon: '⭐', labelKey: 'nav.skills' },
  { key: 'rewards', icon: '🎁', labelKey: 'nav.rewards' },
  { key: 'credits', icon: '💰', labelKey: 'nav.credits' },
  { key: 'notifications', icon: '🔔', labelKey: 'nav.notifications' },
  { key: 'profile', icon: '👤', labelKey: 'nav.profile' },
  { key: 'settings', icon: '⚙', labelKey: 'nav.settings' },
];

function Sidebar() {
  const { page, setPage, credits, notifications, t } = useApp();
  const unread = notifications.filter(n => !n.read).length;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden fixed top-4 left-4 z-50 bg-[#1e2d4e] text-white p-2 rounded-lg">
        ☰
      </button>

      {open && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setOpen(false)} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1e2d4e] flex flex-col h-screen transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-5 py-6 flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <span className="text-white font-black text-xl tracking-widest">STUDLING</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => { setPage(item.key); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${page === item.key ? 'bg-[#2d4270] text-white' : 'text-[#8fa3c8] hover:bg-[#253761] hover:text-white'}`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{t(item.labelKey)}</span>
              {item.key === 'notifications' && unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{unread}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Credits + Signout */}
        <div className="p-4 space-y-3">
          <div className="bg-[#253761] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#8fa3c8] text-xs font-semibold mb-1">
              <span>💰</span> {t('nav.credits_label')}
            </div>
            <div className="text-white text-3xl font-black">{credits}</div>
            <button onClick={() => setPage('rewards')} className="text-[#8fa3c8] text-sm hover:text-white mt-1">
              {t('home.buyMore')} →
            </button>
          </div>
          <button className="w-full flex items-center gap-2 text-[#8fa3c8] hover:text-white text-sm px-2 py-1 transition-colors">
            <span>↪</span> {t('nav.signOut')}
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

// HOME PAGE
function HomePage() {
  const { t, setPage, credits } = useApp();
  const currentUser = STUDENTS[0];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-[#1e2d4e] rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute right-8 top-4 opacity-10 text-9xl">+</div>
        <p className="text-blue-200 text-sm mb-2">{t('home.welcome')}, {currentUser.name}</p>
        <h1 className="text-white text-3xl font-black mb-3 leading-tight">{t('home.hero.title')}</h1>
        <p className="text-blue-100 text-sm mb-6 max-w-md">{t('home.hero.subtitle')}</p>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => setPage('lessons')} variant="secondary">{t('home.findLesson')} →</Button>
          <button onClick={() => setPage('lessons')} className="flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
            📖 {t('home.becomeTeacher')}
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🚀', label: t('home.missions'), page: 'missions' },
          { icon: '🤖', label: 'AI Mentor', page: 'discover' },
          { icon: '◎', label: t('home.challenges'), page: 'challenges' },
          { icon: '✦', label: t('home.skillPassport'), page: 'passport' },
        ].map(item => (
          <Card key={item.label} onClick={() => setPage(item.page)} className="flex flex-col items-start gap-2">
            <span className="text-2xl">{item.icon}</span>
            <span className="font-bold text-[#1e2d4e] text-sm">{item.label}</span>
          </Card>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card onClick={() => setPage('credits')} className="hover:shadow-md cursor-pointer">
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-1">💰 {t('nav.credits_label')}</div>
          <div className="text-3xl font-black text-[#1e2d4e]">{credits}</div>
          <div className="text-blue-600 text-sm mt-1">{t('home.buyMore')} →</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-1">📖 TEACHER</div>
          <div className="font-bold text-[#1e2d4e]">Active</div>
          <div className="text-blue-600 text-sm mt-1">{t('home.checkStatus')} →</div>
        </Card>
        <Card onClick={() => setPage('missions')} className="hover:shadow-md cursor-pointer">
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-1">⭐ DAILY QUESTS</div>
          <div className="font-bold text-[#1e2d4e]">3 {t('home.live')}</div>
          <div className="text-blue-600 text-sm mt-1">{t('home.earnCredits')} →</div>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-[#1e2d4e] text-lg">{t('home.continueLearning')}</h2>
          <button onClick={() => setPage('lessons')} className="text-blue-600 text-sm hover:underline">{t('home.seeAll')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSONS.slice(0, 3).map(lesson => (
            <Card key={lesson.id} onClick={() => setPage('lessons')}>
              <div className="flex justify-between items-start mb-2">
                <Badge text={lesson.category} color="bg-blue-50 text-blue-700" />
                <DifficultyBadge d={lesson.difficulty} />
              </div>
              <h3 className="font-bold text-[#1e2d4e] text-sm mb-1">{lesson.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-2 mb-3">{lesson.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>⏱ {lesson.duration} {t('lessons.duration')}</span>
                <span>·</span>
                <span>👤 {lesson.teacher}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Challenges */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-[#1e2d4e] text-lg">{t('home.recommendedChallenges')}</h2>
          <button onClick={() => setPage('challenges')} className="text-blue-600 text-sm hover:underline">{t('home.seeAll')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGES.slice(0, 3).map(ch => (
            <Card key={ch.id} onClick={() => setPage('challenges')}>
              <div className="flex justify-between items-start mb-2">
                <Badge text={ch.category} color="bg-purple-50 text-purple-700" />
                <DifficultyBadge d={ch.difficulty} />
              </div>
              <div className="text-xs text-gray-400 mt-2">{ch.duration} {t('challenges.min')} · {ch.questions} ✓</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Students */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-[#1e2d4e] text-lg">{t('home.suggestedStudents')}</h2>
          <button onClick={() => setPage('discover')} className="text-blue-600 text-sm hover:underline">{t('home.seeAll')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STUDENTS.slice(1, 5).map(s => (
            <Card key={s.id} onClick={() => setPage('discover')} className="text-center">
              <Avatar initials={s.avatar} color={avatarColor(s.id)} size="lg" />
              <div className="mt-2 font-bold text-[#1e2d4e] text-sm">{s.name}</div>
              <div className="text-xs text-gray-400">{s.flag} {s.country}</div>
              <div className="flex flex-wrap gap-1 justify-center mt-2">
                {s.skills.slice(0, 2).map(sk => <Badge key={sk} text={sk} color="bg-blue-50 text-blue-700" />)}
              </div>
              <Button variant="outline" className="mt-3 w-full justify-center text-xs">{t('discover.connect')}</Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-black text-[#1e2d4e] text-lg mb-3">{t('home.recentActivity')}</h2>
        <Card>
          <div className="divide-y divide-gray-50">
            {DEMO_NOTIFICATIONS.slice(0, 5).map(n => (
              <div key={n.id} className="py-3 flex gap-3 items-start">
                <span className="text-xl">{n.type === 'credits' ? '💰' : n.type === 'challenge' ? '◎' : n.type === 'mission' ? '🚀' : n.type === 'match' ? '🤝' : n.type === 'passport' ? '✦' : '📖'}</span>
                <div>
                  <div className="text-sm font-semibold text-[#1e2d4e]">{n.title}</div>
                  <div className="text-xs text-gray-500">{n.body}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// CHALLENGES PAGE
function ChallengesPage() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [diff, setDiff] = useState('');
  const [active, setActive] = useState<typeof CHALLENGES[0] | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const cats = Array.from(new Set(CHALLENGES.map(c => c.category)));
  const diffs = ['Easy', 'Medium', 'Hard'];

  const filtered = CHALLENGES.filter(c =>
    (!search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())) &&
    (!cat || c.category === cat) &&
    (!diff || c.difficulty === diff)
  );

  const handleComplete = () => {
    if (active) {
      setCompleted(prev => new Set([...prev, active.id]));
      setSubmitted(false);
      setQuizAnswers({});
      setActive(null);
    }
  };

  if (active) {
    const isCompleted = completed.has(active.id);
    return (
      <div>
        <button onClick={() => setActive(null)} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline text-sm">
          ← {t('general.back')}
        </button>
        <div className="max-w-2xl">
          <div className="flex gap-2 mb-2">
            <Badge text={active.category} color="bg-blue-50 text-blue-700" />
            <DifficultyBadge d={active.difficulty} />
          </div>
          <h1 className="text-2xl font-black text-[#1e2d4e] mb-2">{active.title}</h1>
          <p className="text-gray-600 mb-6">{active.description}</p>

          <Card className="mb-4">
            <h3 className="font-bold text-[#1e2d4e] mb-3">Challenge Questions</h3>
            {Array.from({ length: active.questions }).map((_, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Question {i + 1}: {['Describe your approach to solving a complex problem you haven\'t seen before.', 'Give an example from your experience that demonstrates this skill.', 'How would you apply this in a real-world scenario?'][i % 3]}</p>
                <textarea
                  value={quizAnswers[i] || ''}
                  onChange={e => setQuizAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-blue-400"
                  placeholder="Write your answer here..."
                  disabled={isCompleted}
                />
              </div>
            ))}
          </Card>

          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            ⏱ {active.duration} {t('challenges.min')} · Skills: {active.skillsAwarded.join(', ')}
          </div>

          {isCompleted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 font-semibold">
              ✅ {t('challenges.completed')}! Evidence added to your Skill Passport.
            </div>
          ) : (
            <Button onClick={handleComplete}>{t('challenges.startChallenge')}</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('challenges.title')}</h1>
      <p className="text-gray-500 mb-6">{t('challenges.subtitle')}</p>

      <Card className="mb-6 space-y-3">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t('challenges.search')}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
        />
        <div className="flex gap-3 flex-wrap">
          <select value={cat} onChange={e => setCat(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option value="">{t('challenges.allCategory')}</option>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={diff} onChange={e => setDiff(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option value="">{t('challenges.allDifficulty')}</option>
            {diffs.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ch => (
          <Card key={ch.id} className={completed.has(ch.id) ? 'border-green-200' : ''}>
            <div className="flex justify-between items-start mb-3">
              <Badge text={ch.category} color="bg-blue-50 text-blue-700" />
              <DifficultyBadge d={ch.difficulty} />
            </div>
            <p className="text-xs text-gray-400 mb-3">{ch.duration} {t('challenges.min')} · {ch.questions} ✓</p>
            {completed.has(ch.id) ? (
              <div className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1">✅ {t('challenges.completed')}</div>
            ) : (
              <Button onClick={() => setActive(ch)} className="w-full justify-center">{t('challenges.startChallenge')}</Button>
            )}
          </Card>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-gray-400 text-center py-12">{t('general.noResults')}</div>}
      </div>
    </div>
  );
}

// SKILL PASSPORT PAGE
function SkillPassportPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('passport.title')}</h1>
      <p className="text-gray-500 mb-6">{t('passport.subtitle')}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: '⭐', label: t('passport.demonstratedSkills'), value: DEMO_SKILL_EVIDENCE.length },
          { icon: '🏆', label: t('passport.evidence'), value: DEMO_SKILL_EVIDENCE.length },
          { icon: '◎', label: t('passport.completedChallenges'), value: 8 },
        ].map(stat => (
          <Card key={stat.label} className="text-center">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center justify-center gap-1">
              <span>{stat.icon}</span> {stat.label}
            </div>
            <div className="text-4xl font-black text-[#1e2d4e]">{stat.value}</div>
          </Card>
        ))}
      </div>

      <h2 className="font-black text-[#1e2d4e] text-xl mb-4">Demonstrated Skills</h2>
      <div className="space-y-4 mb-8">
        {DEMO_SKILL_EVIDENCE.map((ev, i) => (
          <Card key={i}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-[#1e2d4e]">{ev.skillName}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge text={ev.level} color={ev.level === 'Expert' ? 'bg-purple-100 text-purple-800' : ev.level === 'Advanced' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} />
                  <Badge text={ev.evidenceType} color="bg-gray-100 text-gray-700" />
                </div>
              </div>
              <span className="text-xs text-gray-400">{ev.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{ev.description}</p>
            <p className="text-xs text-gray-400 mt-1">📎 Source: {ev.source}</p>
          </Card>
        ))}
      </div>

      <h2 className="font-black text-[#1e2d4e] text-xl mb-4">Skill Growth</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_SKILL_EVIDENCE.map((ev, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm text-[#1e2d4e]">{ev.skillName}</span>
              <span className="text-xs text-gray-500">{ev.level}</span>
            </div>
            <ProgressBar value={ev.level === 'Expert' ? 100 : ev.level === 'Advanced' ? 75 : ev.level === 'Intermediate' ? 50 : 25} />
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-black text-[#1e2d4e] text-xl mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🧠', title: 'Deep Thinker', desc: 'Completed 3 Critical Thinking challenges' },
            { icon: '🔢', title: 'Math Expert', desc: 'Expert level in Mathematics' },
            { icon: '🔬', title: 'Researcher', desc: 'Research skill demonstrated' },
            { icon: '🏆', title: 'Mission Contributor', desc: 'Active in 2 missions' },
          ].map(a => (
            <Card key={a.title} className="text-center">
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm text-[#1e2d4e]">{a.title}</div>
              <div className="text-xs text-gray-500 mt-1">{a.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// LESSONS PAGE
function LessonsPage() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'All' | 'Private' | 'Group'>('All');
  const [cat, setCat] = useState('');
  const [active, setActive] = useState<typeof LESSONS[0] | null>(null);

  const cats = Array.from(new Set(LESSONS.map(l => l.category)));
  const filtered = LESSONS.filter(l =>
    (!search || l.title.toLowerCase().includes(search.toLowerCase()) || l.teacher.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase())) &&
    (type === 'All' || (type === 'Private' && l.type === 'private') || (type === 'Group' && l.type === 'group')) &&
    (!cat || l.category === cat)
  );

  if (active) {
    return (
      <div className="max-w-3xl">
        <button onClick={() => setActive(null)} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline text-sm">
          ← {t('general.back')}
        </button>
        <div className="flex gap-2 mb-2">
          <Badge text={active.category} color="bg-blue-50 text-blue-700" />
          <DifficultyBadge d={active.difficulty} />
          <Badge text={active.type === 'private' ? t('lessons.private') : t('lessons.group')} color="bg-gray-100 text-gray-700" />
        </div>
        <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{active.title}</h1>
        <p className="text-gray-500 mb-1">👤 {active.teacher} · ⏱ {active.duration} {t('lessons.duration')}</p>
        <p className="text-gray-600 mb-6">{active.description}</p>

        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-3">Learning Objectives</h3>
          <ul className="space-y-1">
            {active.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span> {obj}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-3">Lesson Content</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{active.content}</p>
        </Card>

        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-2">📋 Activity</h3>
          <p className="text-sm text-gray-700">{active.activity}</p>
        </Card>

        <Card className="mb-6 bg-blue-50 border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">⚡ Mini Challenge</h3>
          <p className="text-sm text-blue-700">{active.miniChallenge}</p>
        </Card>

        <div className="flex gap-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Skills</div>
            <div className="flex flex-wrap gap-1">{active.relatedSkills.map(s => <Badge key={s} text={s} color="bg-blue-50 text-blue-700" />)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Subjects</div>
            <div className="flex flex-wrap gap-1">{active.relatedSubjects.map(s => <Badge key={s} text={s} color="bg-purple-50 text-purple-700" />)}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('lessons.title')}</h1>
      <p className="text-gray-500 mb-6">{t('lessons.subtitle')}</p>

      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <div className="flex-1 relative">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t('lessons.search')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pl-9 text-sm focus:outline-none focus:border-blue-400"
          />
          <span className="absolute left-3 top-3 text-gray-400 text-sm">🔍</span>
        </div>
        <div className="flex gap-1 border border-gray-200 rounded-lg overflow-hidden">
          {(['All', 'Private', 'Group'] as const).map(tp => (
            <button key={tp} onClick={() => setType(tp)} className={`px-4 py-2 text-sm font-semibold transition-colors ${type === tp ? 'bg-[#1e3a8a] text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
              {tp === 'All' ? t('lessons.all') : tp === 'Private' ? t('lessons.private') : t('lessons.group')}
            </button>
          ))}
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
          <option value="">All Categories</option>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lesson => (
          <Card key={lesson.id} onClick={() => setActive(lesson)}>
            <div className="flex justify-between items-start mb-2">
              <Badge text={lesson.category} color="bg-blue-50 text-blue-700" />
              <DifficultyBadge d={lesson.difficulty} />
            </div>
            <h3 className="font-bold text-[#1e2d4e] text-sm mb-1">{lesson.title}</h3>
            <p className="text-gray-500 text-xs line-clamp-2 mb-3">{lesson.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>⏱ {lesson.duration} {t('lessons.duration')} · 👤 {lesson.teacher}</span>
              <Badge text={lesson.type === 'private' ? t('lessons.private') : t('lessons.group')} color="bg-gray-100 text-gray-600" />
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <div className="col-span-3 text-center text-gray-400 py-12">{t('lessons.noLessons')}</div>}
      </div>
    </div>
  );
}

// MISSIONS PAGE
function MissionsPage() {
  const { t } = useApp();
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<typeof MISSIONS[0] | null>(null);
  const statuses = ['All', 'Open', 'Recruiting', 'In Progress', 'Completed'];

  const filtered = MISSIONS.filter(m => filter === 'All' || m.status === filter);

  if (active) {
    return (
      <div className="max-w-3xl">
        <button onClick={() => setActive(null)} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline text-sm">← {t('general.back')}</button>
        <div className="flex gap-2 mb-2">
          <Badge text={active.category} color="bg-green-50 text-green-700" />
          <StatusBadge status={active.status} />
          <DifficultyBadge d={active.difficulty} />
        </div>
        <h1 className="text-3xl font-black text-[#1e2d4e] mb-3">{active.title}</h1>
        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-2">Problem</h3>
          <p className="text-sm text-gray-700">{active.problem}</p>
        </Card>
        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-2">Background</h3>
          <p className="text-sm text-gray-700">{active.background}</p>
        </Card>
        <Card className="mb-4">
          <h3 className="font-bold text-[#1e2d4e] mb-3">Objectives</h3>
          <ul className="space-y-1">{active.objectives.map((o, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-500">→</span>{o}</li>)}</ul>
        </Card>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-2 text-sm">{t('missions.skills')}</h3>
            <div className="flex flex-wrap gap-1">{active.requiredSkills.map(s => <Badge key={s} text={s} color="bg-blue-50 text-blue-700" />)}</div>
          </Card>
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-2 text-sm">Milestones</h3>
            <ul className="space-y-1">{active.milestones.map((m, i) => <li key={i} className="text-xs text-gray-600 flex gap-1"><span className="text-gray-400">○</span>{m}</li>)}</ul>
          </Card>
        </div>
        <div className="flex gap-3">
          <div className="text-sm text-gray-500">{t('missions.teamSize')}: <strong className="text-[#1e2d4e]">{active.teamSize}</strong></div>
        </div>
        <div className="mt-4">
          <Button>{t('missions.joinMission')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('missions.title')}</h1>
      <p className="text-gray-500 mb-6">{t('missions.subtitle')}</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === s ? 'bg-[#1e3a8a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s === 'All' ? 'All' : t(`missions.${s.toLowerCase().replace(' ', '')}`) || s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => (
          <Card key={m.id} onClick={() => setActive(m)}>
            <div className="flex justify-between items-start mb-2">
              <Badge text={m.category} color="bg-green-50 text-green-700" />
              <StatusBadge status={m.status} />
            </div>
            <h3 className="font-bold text-[#1e2d4e] mb-1">{m.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{m.problem}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {m.requiredSkills.slice(0, 3).map(s => <Badge key={s} text={s} color="bg-blue-50 text-blue-700" />)}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>👥 {m.teamSize} · <DifficultyBadge d={m.difficulty} /></span>
              <span className="text-blue-600 font-semibold">{t('missions.viewMission')} →</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// TEAMS PAGE
function TeamsPage() {
  const { t } = useApp();
  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('teams.title')}</h1>
      <p className="text-gray-500 mb-6">{t('teams.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEAMS.map(team => {
          const members = team.members.map(id => STUDENTS.find(s => s.id === id)!).filter(Boolean);
          const mission = MISSIONS.find(m => m.id === team.missionId);
          return (
            <Card key={team.id}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-[#1e2d4e] text-lg">{team.name}</h3>
                <span className="text-sm text-gray-400">{team.progress}%</span>
              </div>
              <ProgressBar value={team.progress} />
              <div className="flex -space-x-2 mt-3 mb-2">
                {members.map(m => <Avatar key={m.id} initials={m.avatar} color={avatarColor(m.id)} size="sm" />)}
              </div>
              <div className="text-xs text-gray-500 mb-2">{t('teams.members')}: {members.map(m => m.name).join(', ')}</div>
              {mission && <div className="text-xs text-gray-500">{t('teams.mission')}: <span className="text-blue-700 font-semibold">{mission.title}</span></div>}
              <div className="flex flex-wrap gap-1 mt-3">
                {team.skills.map(s => <Badge key={s} text={s} color="bg-blue-50 text-blue-700" />)}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// PROJECTS PAGE
function ProjectsPage() {
  const { t } = useApp();
  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('projects.title')}</h1>
      <p className="text-gray-500 mb-6">{t('projects.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map(p => {
          const team = TEAMS.find(t => t.id === p.teamId);
          const mission = MISSIONS.find(m => m.id === p.missionId);
          const completedMilestones = p.milestones.filter(m => m.completed).length;
          return (
            <Card key={p.id}>
              <div className="flex justify-between items-start mb-2">
                <StatusBadge status={p.status} />
                <span className="text-sm text-gray-400">{p.progress}%</span>
              </div>
              <h3 className="font-bold text-[#1e2d4e] text-lg mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{p.solution}</p>
              <ProgressBar value={p.progress} />
              <div className="text-xs text-gray-400 mt-2 mb-3">Milestones: {completedMilestones}/{p.milestones.length}</div>
              {team && <div className="text-xs text-gray-500">Team: <span className="text-blue-700 font-semibold">{team.name}</span></div>}
              {mission && <div className="text-xs text-gray-500">Mission: {mission.title}</div>}
              {p.result && <div className="mt-3 bg-green-50 rounded-lg p-2 text-xs text-green-700">✅ {p.result}</div>}
              <div className="flex flex-wrap gap-1 mt-3">
                {p.skillsUsed.map(s => <Badge key={s} text={s} color="bg-purple-50 text-purple-700" />)}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// DISCOVER PAGE
function DiscoverPage() {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'students' | 'skills' | 'subjects'>('students');
  const [country, setCountry] = useState('');
  const [skill, setSkill] = useState('');

  const countries = Array.from(new Set(STUDENTS.map(s => s.country)));
  const skills = Array.from(new Set(STUDENTS.flatMap(s => s.skills)));

  const filteredStudents = STUDENTS.filter(s =>
    (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase()) || s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()))) &&
    (!country || s.country === country) &&
    (!skill || s.skills.includes(skill))
  );

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('discover.title')}</h1>
      <p className="text-gray-500 mb-6">{t('discover.subtitle')}</p>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex-1 relative min-w-64">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('discover.search')}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pl-9 text-sm focus:outline-none focus:border-blue-400" />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
        <select value={country} onChange={e => setCountry(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="">{t('discover.allCountries')}</option>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={skill} onChange={e => setSkill(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="">{t('discover.allSkills')}</option>
          {skills.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        {[['students', t('discover.students')], ['skills', t('discover.skills')], ['subjects', t('discover.subjects')]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k as any)} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${tab === k ? 'bg-[#1e3a8a] text-white' : 'bg-gray-100 text-gray-600'}`}>{label}</button>
        ))}
      </div>

      {tab === 'students' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(s => (
            <Card key={s.id}>
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={s.avatar} color={avatarColor(s.id)} />
                <div>
                  <div className="font-bold text-[#1e2d4e]">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.flag} {s.country} · {s.availability}</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.bio}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {s.skills.slice(0, 3).map(sk => <Badge key={sk} text={sk} color="bg-blue-50 text-blue-700" />)}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>📚 {s.lessonsCompleted} lessons</span>
                <span>◎ {s.challengesCompleted} challenges</span>
                <span>💰 {s.credits} credits</span>
              </div>
              <Button variant="outline" className="mt-3 w-full justify-center">{t('discover.connect')}</Button>
            </Card>
          ))}
          {filteredStudents.length === 0 && <div className="col-span-3 text-gray-400 text-center py-12">{t('general.noResults')}</div>}
        </div>
      )}

      {tab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_CATALOG.map(sk => (
            <Card key={sk.name}>
              <h3 className="font-bold text-[#1e2d4e] mb-2">{sk.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{sk.description}</p>
              <div className="text-xs text-gray-400">
                {sk.lessons.length} lessons · {sk.challenges.length} challenges
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map(sub => (
            <Card key={sub.id}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${sub.color} mb-3`}>
                <span>{sub.icon}</span> {sub.name}
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>📖 {sub.lessons} lessons</div>
                <div>◎ {sub.challenges} challenges</div>
                <div>🚀 {sub.missions} missions</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// SUBJECTS PAGE
function SubjectsPage() {
  const { t } = useApp();
  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('nav.subjects')}</h1>
      <p className="text-gray-500 mb-6">All school subjects connected to lessons, skills, challenges, and missions.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map(sub => (
          <Card key={sub.id}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${sub.color} mb-3`}>
              <span>{sub.icon}</span> {sub.name}
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>📖 Lessons</span><strong>{sub.lessons}</strong></div>
              <div className="flex justify-between"><span>◎ Challenges</span><strong>{sub.challenges}</strong></div>
              <div className="flex justify-between"><span>🚀 Missions</span><strong>{sub.missions}</strong></div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50">
              <div className="text-xs text-gray-400">Related skills: {SKILLS_CATALOG.slice(0, 2).map(s => s.name).join(', ')}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// SKILLS PAGE
function SkillsPage() {
  const { t } = useApp();
  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('nav.skills')}</h1>
      <p className="text-gray-500 mb-6">A comprehensive catalog of learnable and demonstrable skills on Studling.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS_CATALOG.map(sk => (
          <Card key={sk.name}>
            <h3 className="font-bold text-[#1e2d4e] mb-1">{sk.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{sk.description}</p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>📖 {sk.lessons.length} lessons</span>
              <span>◎ {sk.challenges.length} challenges</span>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Students with this skill:</div>
              <div className="flex -space-x-1">
                {STUDENTS.filter(s => s.skills.includes(sk.name)).slice(0, 5).map(s => (
                  <Avatar key={s.id} initials={s.avatar} color={avatarColor(s.id)} size="sm" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// REWARDS PAGE
function RewardsPage() {
  const { t, credits, redeemReward, redeemedRewards, creditsHistory } = useApp();
  const [tab, setTab] = useState<'marketplace' | 'myRewards'>('marketplace');
  const [confirming, setConfirming] = useState<Reward | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleRedeem = (reward: Reward) => {
    if (credits < reward.creditsRequired) return;
    setConfirming(reward);
    setSuccessCode(null);
  };

  const handleConfirm = () => {
    if (!confirming || busy) return;
    setBusy(true);
    setTimeout(() => {
      const code = redeemReward(confirming);
      setSuccessCode(code);
      setConfirming(null);
      setBusy(false);
    }, 500);
  };

  const catColors: Record<string, string> = {
    'Educational Resources': 'bg-blue-50 text-blue-700',
    'Learning Materials': 'bg-green-50 text-green-700',
    'Student Events': 'bg-purple-50 text-purple-700',
    'Digital Rewards': 'bg-amber-50 text-amber-700',
    Merchandise: 'bg-pink-50 text-pink-700',
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('rewards.title')}</h1>
      <p className="text-gray-500 mb-4">{t('rewards.subtitle')}</p>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#1e2d4e] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
          💰 {credits} {t('general.credits')}
        </div>
        <div className="flex gap-2">
          {[['marketplace', t('rewards.marketplace')], ['myRewards', t('rewards.myRewards')]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k as any)} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${tab === k ? 'bg-[#1e3a8a] text-white' : 'bg-gray-100 text-gray-600'}`}>{label}</button>
          ))}
        </div>
      </div>

      {successCode && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="text-2xl mb-2">🎉</div>
          <h3 className="font-black text-green-800 text-lg mb-1">{t('rewards.success')}</h3>
          <div className="flex items-center gap-3 mt-3">
            <div className="bg-white border border-green-300 rounded-lg px-4 py-2 font-mono font-bold text-green-800">{successCode}</div>
            <button onClick={() => navigator.clipboard.writeText(successCode)} className="text-sm text-green-700 hover:underline">{t('rewards.copy')} 📋</button>
          </div>
          <div className="mt-2 text-xs text-green-600">{t('rewards.demoLabel')} — For demonstration purposes only.</div>
          <button onClick={() => setSuccessCode(null)} className="mt-3 text-sm text-green-700 hover:underline">Dismiss</button>
        </div>
      )}

      {confirming && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-black text-[#1e2d4e] text-xl mb-4">{t('rewards.confirm')}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">{t('rewards.creditsRequired')}</span><strong className="text-[#1e2d4e]">{confirming.creditsRequired}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">{t('rewards.currentBalance')}</span><strong className="text-[#1e2d4e]">{credits}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">{t('rewards.balanceAfter')}</span><strong className="text-green-700">{credits - confirming.creditsRequired}</strong></div>
            </div>
            <div className="text-xs text-amber-600 mb-4 bg-amber-50 rounded-lg p-2">{t('rewards.demoLabel')}</div>
            <div className="flex gap-3">
              <Button onClick={handleConfirm} disabled={busy} className="flex-1 justify-center">{busy ? '...' : t('general.confirm')}</Button>
              <Button variant="secondary" onClick={() => setConfirming(null)} className="flex-1 justify-center">{t('general.cancel')}</Button>
            </div>
          </div>
        </div>
      )}

      {tab === 'marketplace' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map(reward => {
            const canRedeem = credits >= reward.creditsRequired;
            const needed = reward.creditsRequired - credits;
            return (
              <Card key={reward.id}>
                <div className="flex justify-between items-start mb-2">
                  <Badge text={reward.category} color={catColors[reward.category] || 'bg-gray-100 text-gray-700'} />
                  <Badge text={t('rewards.demoLabel')} color="bg-amber-50 text-amber-700" />
                </div>
                <h3 className="font-bold text-[#1e2d4e] mb-1">{reward.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{reward.description}</p>
                <div className="text-[#1e2d4e] font-black text-xl mb-3">💰 {reward.creditsRequired}</div>
                {canRedeem ? (
                  <Button onClick={() => handleRedeem(reward)} className="w-full justify-center">{t('rewards.redeem')}</Button>
                ) : (
                  <div>
                    <Button disabled className="w-full justify-center mb-1">{t('rewards.notEnough')}</Button>
                    <p className="text-xs text-gray-400 text-center">{t('rewards.needMore', { n: needed })}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {tab === 'myRewards' && (
        <div>
          {redeemedRewards.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="text-4xl mb-3">🎁</div>
              <div>No rewards redeemed yet. Start earning Credits!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {redeemedRewards.map((r, i) => {
                const reward = REWARDS.find(rw => rw.id === r.rewardId);
                return (
                  <Card key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-[#1e2d4e]">{reward?.name}</h3>
                        <div className="font-mono text-sm text-blue-700 mt-1 bg-blue-50 inline-block px-3 py-1 rounded-lg">{r.code}</div>
                        <div className="text-xs text-gray-400 mt-2">{t('rewards.dateRedeemed')}: {r.date} · {t('rewards.creditsSpent')}: {r.creditsSpent}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge text={r.status} color={r.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} />
                        <Badge text={t('rewards.demoLabel')} color="bg-amber-50 text-amber-700" />
                        <button onClick={() => navigator.clipboard.writeText(r.code)} className="text-xs text-blue-600 hover:underline">{t('rewards.copy')}</button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// CREDITS PAGE
function CreditsPage() {
  const { t, credits, creditsHistory } = useApp();

  const howToEarn = [
    { icon: '📖', activity: 'Complete a Lesson', amount: '+10' },
    { icon: '◎', activity: 'Complete a Challenge', amount: '+8–15' },
    { icon: '🚀', activity: 'Contribute to a Mission', amount: '+25' },
    { icon: '🛠', activity: 'Deliver a Project Milestone', amount: '+20' },
    { icon: '👥', activity: 'Teach a Classmate', amount: '+12' },
    { icon: '✦', activity: 'Skill Passport Evidence Added', amount: '+5' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-2">{t('credits.title')}</h1>
      <p className="text-gray-500 mb-6">{t('credits.subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="col-span-1 bg-[#1e2d4e] text-white">
          <div className="text-xs font-semibold text-blue-200 mb-2">{t('credits.currentBalance')}</div>
          <div className="text-5xl font-black">{credits}</div>
          <div className="text-blue-200 text-sm mt-1">Credits</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-gray-500 mb-2">Total Earned</div>
          <div className="text-3xl font-black text-[#1e2d4e]">285</div>
          <div className="text-gray-400 text-sm">since joining</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-gray-500 mb-2">Rewards Redeemed</div>
          <div className="text-3xl font-black text-[#1e2d4e]">0</div>
          <div className="text-gray-400 text-sm">rewards used</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-black text-[#1e2d4e] text-xl mb-4">{t('credits.history')}</h2>
          <Card>
            <div className="divide-y divide-gray-50">
              {creditsHistory.map(h => (
                <div key={h.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-[#1e2d4e]">{h.activity}</div>
                    <div className="text-xs text-gray-400">{h.date}</div>
                  </div>
                  <div className={`font-black text-lg ${h.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {h.amount > 0 ? '+' : ''}{h.amount}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="font-black text-[#1e2d4e] text-xl mb-4">{t('credits.howToEarn')}</h2>
          <Card>
            <div className="space-y-3">
              {howToEarn.map(h => (
                <div key={h.activity} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{h.icon}</span>
                    <span className="text-sm text-gray-700">{h.activity}</span>
                  </div>
                  <span className="font-bold text-green-600 text-sm">{h.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// NOTIFICATIONS PAGE
function NotificationsPage() {
  const { t, notifications, markAllRead } = useApp();
  const typeIcon = (type: string) => ({ credits: '💰', challenge: '◎', mission: '🚀', team: '👥', passport: '✦', lesson: '📖', match: '🤝' }[type] || '🔔');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-[#1e2d4e]">{t('notifications.title')}</h1>
        <button onClick={markAllRead} className="text-sm text-blue-600 hover:underline">{t('notifications.markAllRead')}</button>
      </div>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-400 py-12">{t('notifications.empty')}</div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <Card key={n.id} className={!n.read ? 'border-blue-100 bg-blue-50/30' : ''}>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">{typeIcon(n.type)}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-[#1e2d4e] text-sm">{n.title}</div>
                    {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">{n.body}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// PROFILE PAGE
function ProfilePage() {
  const { t, credits } = useApp();
  const student = STUDENTS[0];

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-6">{t('profile.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center text-center">
          <Avatar initials={student.avatar} color={avatarColor(student.id)} size="lg" />
          <h2 className="font-black text-[#1e2d4e] text-xl mt-3">{student.name}</h2>
          <div className="text-gray-500 text-sm">{student.flag} {student.country}</div>
          <div className="text-gray-400 text-xs mt-1">{student.teamRole}</div>
          <p className="text-sm text-gray-500 mt-3">{student.bio}</p>
          <div className="grid grid-cols-2 gap-3 mt-4 w-full text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-black text-[#1e2d4e]">{credits}</div>
              <div className="text-xs text-gray-400">Credits</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-black text-[#1e2d4e]">{student.lessonsCompleted}</div>
              <div className="text-xs text-gray-400">Lessons</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-black text-[#1e2d4e]">{student.challengesCompleted}</div>
              <div className="text-xs text-gray-400">Challenges</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="font-black text-[#1e2d4e]">{student.missions.length}</div>
              <div className="text-xs text-gray-400">Missions</div>
            </div>
          </div>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-3">{t('profile.skills')}</h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map(sk => (
                <div key={sk} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">
                  <span>{sk}</span>
                  <Badge text={student.skillLevels[sk] || 'Beginner'} color="bg-blue-100 text-blue-800" />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-3">{t('profile.interests')}</h3>
            <div className="flex flex-wrap gap-2">{student.interests.map(i => <Badge key={i} text={i} color="bg-purple-50 text-purple-700" />)}</div>
          </Card>
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-3">{t('profile.goals')}</h3>
            <ul className="space-y-1">{student.goals.map(g => <li key={g} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-500">→</span>{g}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="font-bold text-[#1e2d4e] mb-3">Availability</h3>
            <Badge text={student.availability} color="bg-green-100 text-green-700" />
          </Card>
        </div>
      </div>
    </div>
  );
}

// SETTINGS PAGE
function SettingsPage() {
  const { t, language, setLanguage } = useApp();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-[#1e2d4e] mb-6">{t('settings.title')}</h1>
      <div className="max-w-xl space-y-4">
        <Card>
          <h3 className="font-bold text-[#1e2d4e] mb-3">{t('settings.language')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all text-left ${language === lang.code ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {lang.nativeName}
                <span className="text-xs text-gray-400 block">{lang.name}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#1e2d4e] mb-3">{t('settings.notifications')}</h3>
          <div className="space-y-3">
            {['Mission matches', 'Lesson recommendations', 'Challenge completions', 'Credits updates'].map(item => (
              <div key={item} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item}</span>
                <div className="w-10 h-5 bg-[#1e3a8a] rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#1e2d4e] mb-3">{t('settings.privacy')}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">✅ No public phone numbers or addresses</div>
            <div className="flex items-center gap-2">✅ Location is country-level only</div>
            <div className="flex items-center gap-2">✅ Report and block available on all profiles</div>
            <div className="flex items-center gap-2">✅ No unrestricted adult-to-minor messaging</div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleSave}>{saved ? t('settings.saved') + ' ✓' : t('settings.save')}</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Router ──────────────────────────────────────────────────────────────────

function PageRouter() {
  const { page } = useApp();
  const pages: Record<string, React.ReactNode> = {
    home: <HomePage />,
    challenges: <ChallengesPage />,
    passport: <SkillPassportPage />,
    lessons: <LessonsPage />,
    missions: <MissionsPage />,
    teams: <TeamsPage />,
    projects: <ProjectsPage />,
    discover: <DiscoverPage />,
    subjects: <SubjectsPage />,
    skills: <SkillsPage />,
    rewards: <RewardsPage />,
    credits: <CreditsPage />,
    notifications: <NotificationsPage />,
    profile: <ProfilePage />,
    settings: <SettingsPage />,
  };
  return <>{pages[page] || <HomePage />}</>;
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [language, setLanguageFn] = useState<Language>(() => {
    return (localStorage.getItem('studling-lang') as Language) || 'en';
  });
  const [page, setPage] = useState('home');
  const [credits, setCredits] = useState(285);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [redeemedRewards, setRedeemedRewards] = useState<{rewardId: string; code: string; date: string; creditsSpent: number; status: 'Active' | 'Used' | 'Expired'}[]>([]);
  const [creditsHistory, setCreditsHistory] = useState(CREDITS_HISTORY);

  const currentLang = LANGUAGES.find(l => l.code === language);
  const isRTL = currentLang?.rtl || false;

  const setLanguage = useCallback((l: Language) => {
    setLanguageFn(l);
    localStorage.setItem('studling-lang', l);
  }, []);

  const translations = useMemo(() => getTranslations(language), [language]);
  const t = useCallback((key: string, vars?: Record<string, string | number>) => translate(translations, key, vars), [translations]);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const redeemReward = useCallback((reward: Reward): string | null => {
    if (credits < reward.creditsRequired) return null;
    const code = genCouponCode();
    const date = new Date().toISOString().split('T')[0];
    setCredits(prev => prev - reward.creditsRequired);
    setRedeemedRewards(prev => [...prev, { rewardId: reward.id, code, date, creditsSpent: reward.creditsRequired, status: 'Active' }]);
    setCreditsHistory(prev => [{
      id: `h-${Date.now()}`,
      date,
      activity: `Redeemed: ${reward.name}`,
      amount: -reward.creditsRequired,
      balance: credits - reward.creditsRequired,
    }, ...prev]);
    return code;
  }, [credits]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const ctx: AppState = {
    language, setLanguage, page, setPage, credits, setCredits,
    notifications, markAllRead, redeemedRewards, redeemReward,
    creditsHistory, t, isRTL,
  };

  return (
    <AppContext.Provider value={ctx}>
      <div className={`flex h-screen bg-gray-50 overflow-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <PageRouter />
        </main>
      </div>
    </AppContext.Provider>
  );
}
