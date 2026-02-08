"use client";

import { useMemo, useState } from "react";
import type { Game, Genre, QuarterLabel } from "@/data/games";
import { gameGenres, releaseQuarters } from "@/data/games";

const getQuarterLabel = (releaseDate: string) => {
  const date = new Date(releaseDate);
  const month = date.getUTCMonth();
  const quarter = releaseQuarters.find((item) => item.months.includes(month));
  return quarter?.label ?? "Другая дата";
};

const formatDate = (releaseDate: string) =>
  new Date(releaseDate).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

interface GameExplorerProps {
  games: Game[];
}

export function GameExplorer({ games }: GameExplorerProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre | "Все жанры">("Все жанры");
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterLabel | "Все кварталы">("Все кварталы");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchesGenre = selectedGenre === "Все жанры" || game.genres.includes(selectedGenre);
        const matchesQuarter =
          selectedQuarter === "Все кварталы" ||
          getQuarterLabel(game.releaseDate) === selectedQuarter;
        const matchesSearch =
          searchTerm.trim().length === 0 ||
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenre && matchesQuarter && matchesSearch;
      })
      .sort((a, b) => b.hypeScore - a.hypeScore);
  }, [games, selectedGenre, selectedQuarter, searchTerm]);

  const featured = filteredGames.slice(0, 1);
  const others = filteredGames.slice(1);

  return (
    <section className="space-y-10">
      <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-black/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Навигатор по релизам
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Фильтруйте по жанрам, кварталам и ключевым словам, чтобы найти лучшие игры 2026 года.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <label className="block w-full text-sm">
              <span className="sr-only">Поиск</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Поиск по названию или описанию..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-400"
              />
            </label>
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value as Genre | "Все жанры")}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-400 sm:w-auto"
            >
              <option value="Все жанры">Все жанры</option>
              {gameGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={selectedQuarter}
              onChange={(event) => setSelectedQuarter(event.target.value as QuarterLabel | "Все кварталы")}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-400 sm:w-auto"
            >
              <option value="Все кварталы">Все кварталы</option>
              {releaseQuarters.map((quarter) => (
                <option key={quarter.label} value={quarter.label}>
                  {quarter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/60 dark:text-indigo-100">
            <dt className="text-xs uppercase tracking-wide opacity-80">Игры в подборке</dt>
            <dd className="text-2xl font-semibold">{filteredGames.length}</dd>
          </div>
          <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4 text-fuchsia-900 dark:border-fuchsia-900/40 dark:bg-fuchsia-950/60 dark:text-fuchsia-100">
            <dt className="text-xs uppercase tracking-wide opacity-80">Средний рейтинг хайпа</dt>
            <dd className="text-2xl font-semibold">
              {filteredGames.length === 0
                ? "—"
                : Math.round(
                    filteredGames.reduce((sum, game) => sum + game.hypeScore, 0) / filteredGames.length,
                  )}
            </dd>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/60 dark:text-emerald-100">
            <dt className="text-xs uppercase tracking-wide opacity-80">Платформы</dt>
            <dd className="text-2xl font-semibold">
              {filteredGames.length === 0
                ? "—"
                : new Set(filteredGames.flatMap((game) => game.platforms)).size}
            </dd>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/60 dark:text-amber-100">
            <dt className="text-xs uppercase tracking-wide opacity-80">Популярный квартал</dt>
            <dd className="text-base font-semibold">
              {filteredGames.length === 0
                ? "—"
                : (() => {
                    const counts = filteredGames.reduce<Record<string, number>>((acc, game) => {
                      const key = getQuarterLabel(game.releaseDate);
                      acc[key] = (acc[key] ?? 0) + 1;
                      return acc;
                    }, {});
                    const topQuarter = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
                    return topQuarter ?? "Не определено";
                  })()}
            </dd>
          </div>
        </dl>
      </div>

      {featured.length > 0 && (
        <article className="grid gap-6 rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 shadow-sm dark:border-zinc-800 dark:from-indigo-950/80 dark:via-zinc-950 dark:to-purple-950/80">
          <header className="flex flex-col gap-2">
            <span className="inline-flex max-w-max items-center justify-center rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-indigo-500">
              Топ ожидание
            </span>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{featured[0].title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {featured[0].developer} • {formatDate(featured[0].releaseDate)} •{" "}
              {featured[0].platforms.join(", ")}
            </p>
          </header>
          <p className="max-w-3xl text-lg text-zinc-700 dark:text-zinc-300">{featured[0].summary}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {featured[0].highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">{highlight.title}</h4>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-3 py-1 text-white dark:bg-white dark:text-zinc-900">
              Хайп: {featured[0].hypeScore}/100
            </span>
            {featured[0].genres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {genre}
              </span>
            ))}
            {featured[0].website && (
              <a
                href={featured[0].website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1 text-indigo-600 transition hover:bg-indigo-500 hover:text-white dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-400 dark:hover:text-zinc-900"
              >
                Официальный сайт
              </a>
            )}
            {featured[0].trailerUrl && (
              <a
                href={featured[0].trailerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-purple-500 px-3 py-1 text-purple-600 transition hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-400 dark:hover:text-zinc-900"
              >
                Смотреть трейлер
              </a>
            )}
          </div>
        </article>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {others.map((game) => (
          <article
            key={game.title}
            className="flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-black/60"
          >
            <header className="space-y-1">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{game.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {game.developer} • {formatDate(game.releaseDate)} • {game.platforms.join(", ")}
              </p>
            </header>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{game.summary}</p>
            <dl className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-100">
                <dt className="font-semibold uppercase tracking-wide">Хайп</dt>
                <dd>{game.hypeScore}</dd>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                <dt className="font-semibold uppercase tracking-wide">Жанры</dt>
                <dd>{game.genres.join(", ")}</dd>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                <dt className="font-semibold uppercase tracking-wide">Квартал</dt>
                <dd>{getQuarterLabel(game.releaseDate)}</dd>
              </div>
            </dl>
            <div className="grid gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {game.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-700">
                  <strong className="text-zinc-800 dark:text-zinc-200">{highlight.title}</strong>
                  <p>{highlight.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              {game.website && (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1 font-semibold text-indigo-600 transition hover:bg-indigo-500 hover:text-white dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-400 dark:hover:text-zinc-900"
                >
                  Официальный сайт
                </a>
              )}
              {game.trailerUrl && (
                <a
                  href={game.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-purple-500 px-3 py-1 font-semibold text-purple-600 transition hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-400 dark:hover:text-zinc-900"
                >
                  Трейлер
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/50 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-black/40 dark:text-zinc-400">
          Нет игр, удовлетворяющих выбранным фильтрам. Попробуйте изменить критерии поиска.
        </div>
      )}
    </section>
  );
}
