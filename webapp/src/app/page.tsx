import { GameExplorer } from "@/components/GameExplorer";
import { games2026, releaseQuarters } from "@/data/games";

export default function Home() {
  const topHype = [...games2026].sort((a, b) => b.hypeScore - a.hypeScore).slice(0, 3);
  const quarterRoadmap = releaseQuarters.map((quarter) => ({
    label: quarter.label,
    games: games2026.filter((game) => {
      const month = new Date(game.releaseDate).getUTCMonth();
      return quarter.months.includes(month);
    }),
  }));
  const platformStats = games2026.reduce<Record<string, number>>((acc, game) => {
    game.platforms.forEach((platform) => {
      acc[platform] = (acc[platform] ?? 0) + 1;
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-indigo-50 font-sans text-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 dark:text-zinc-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        <header className="grid gap-10 rounded-4xl border border-white/60 bg-white/80 p-10 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="space-y-6">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow">
              Гейминг 2026
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
              Лучшие игры 2026 года: гид по самым ожидаемым релизам
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              Мы отобрали ключевые релизы 2026 года, которые формируют повестку индустрии: от блокбастеров ААА до
              инди-сенсаций и спортивных хитов. Изучайте прогнозы, планируйте покупки и анализируйте тренды, которые
              определят следующий виток гейминга.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topHype.map((game) => (
              <div
                key={game.title}
                className="flex flex-col gap-3 rounded-3xl border border-indigo-200/50 bg-indigo-50/80 p-5 text-indigo-900 shadow-inner dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-100"
              >
                <span className="text-xs uppercase tracking-wide opacity-80">Хайп-рейтинг</span>
                <div className="flex items-baseline gap-3">
                  <strong className="text-3xl font-semibold">{game.hypeScore}</strong>
                  <span className="font-medium">{game.title}</span>
                </div>
                <p className="text-sm text-indigo-800/80 dark:text-indigo-100/80">{game.summary}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 rounded-4xl border border-zinc-200 bg-white/90 p-8 shadow-md dark:border-zinc-800 dark:bg-black/40">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Квартальный дайджест</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {quarterRoadmap.map((quarter) => (
              <div
                key={quarter.label}
                className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  {quarter.label}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {quarter.games.length > 0 ? (
                    quarter.games.map((game) => (
                      <li key={game.title}>
                        <strong className="block text-zinc-900 dark:text-zinc-100">{game.title}</strong>
                        <span className="block text-xs uppercase tracking-wide text-zinc-500">
                          {new Date(game.releaseDate).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "short",
                          })}{" "}
                          • {game.genres.join(", ")}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-zinc-400">Пока без громких анонсов</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-4xl border border-zinc-200 bg-white/80 p-8 shadow-md dark:border-zinc-800 dark:bg-black/40 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Тренды 2026</h2>
            <div className="grid gap-4 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="rounded-3xl border border-purple-200 bg-purple-50/80 p-5 dark:border-purple-800 dark:bg-purple-950/40">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300">
                  Кооператив и социальное взаимодействие
                </h3>
                <p className="mt-2">
                  Почти каждый блокбастер включает продвинутые кооперативные режимы, создавая ощущение “сезонных
                  приключений” с друзьями и сообществами.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-800 dark:bg-emerald-950/40">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                  Устойчивое развитие и экология
                </h3>
                <p className="mt-2">
                  На волне экотрендов выделяется новая волна симуляторов, где игроки управляют экосистемами и получают
                  реальные знания о климате.
                </p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-800 dark:bg-amber-950/40">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-300">
                  Возвращение аркадных гонок
                </h3>
                <p className="mt-2">
                  Неоновые города, кастомизация и комьюнити-контент поднимают интерес к соревновательным гонкам,
                  вдохновленным классикой 2000-х.
                </p>
              </div>
            </div>
          </div>
          <aside className="space-y-4 rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Платформенный баланс
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {Object.entries(platformStats)
                .sort((a, b) => b[1] - a[1])
                .map(([platform, count]) => (
                  <li key={platform} className="flex items-center justify-between">
                    <span>{platform}</span>
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-200">
                      {count} релизов
                    </span>
                  </li>
                ))}
            </ul>
          </aside>
        </section>

        <GameExplorer games={games2026} />

        <footer className="rounded-4xl border border-white/60 bg-white/80 p-8 text-center shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Подготовьтесь к самому громкому игровому сезону
          </h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            Следите за обновлениями, сохраняйте релизы в календарь и собирайте команды заранее: 2026 год обещает мощный
            микс крупных сюрпризов и инноваций для всех жанров.
          </p>
        </footer>
      </main>
    </div>
  );
}
