import { useMemo, useState } from "react";
import {
  Search,
  Clock3,
  CheckCircle2,
  CirclePlay,
  ListFilter,
  ArrowUpDown,
} from "lucide-react";

const videos = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    channel: "Code Academy",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg",
    duration: "48:25",
    completed: true,
  },
  {
    id: "2",
    title: "JavaScript Functions Explained",
    channel: "Programming Tutorials",
    thumbnail: "https://img.youtube.com/vi/N8ap4k_1QEQ/mqdefault.jpg",
    duration: "32:18",
    completed: false,
  },
  {
    id: "3",
    title: "Understanding React Hooks",
    channel: "React Learning",
    thumbnail: "https://img.youtube.com/vi/TNhaISOUy6Q/mqdefault.jpg",
    duration: "25:40",
    completed: false,
  },
  {
    id: "4",
    title: "Learn CSS Grid Layout",
    channel: "Frontend Masters",
    thumbnail: "https://img.youtube.com/vi/EiNiSFIPIQE/mqdefault.jpg",
    duration: "18:35",
    completed: true,
  },
  {
    id: "5",
    title: "Mastering JavaScript Arrays",
    channel: "Code Academy",
    thumbnail: "https://img.youtube.com/vi/R8rmfD9Y5-c/mqdefault.jpg",
    duration: "41:12",
    completed: false,
  },
  {
    id: "6",
    title: "React Components for Beginners",
    channel: "React Learning",
    thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg",
    duration: "36:50",
    completed: false,
  },
];

export default function VideoPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [completedIds, setCompletedIds] = useState(
    () => videos.filter((video) => video.completed).map((video) => video.id)
  );

  const filteredVideos = useMemo(() => {
    const result = videos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.channel.toLowerCase().includes(search.toLowerCase());

      const isCompleted = completedIds.includes(video.id);

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && isCompleted) ||
        (filter === "pending" && !isCompleted);

      return matchesSearch && matchesFilter;
    });

    if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, filter, sort, completedIds]);

  function toggleComplete(id) {
    setCompletedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <section className="min-h-screen bg-[#0b1020] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-violet-400">
            YOUR LEARNING LIBRARY
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Playlist Lectures
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Keep track of your lectures and study at your own pace.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search lectures or channels..."
              aria-label="Search lectures or channels"
              className="w-full rounded-xl border border-slate-800 bg-[#131a2b] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-none">
              <ListFilter
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter videos"
                className="w-full appearance-none rounded-xl border border-slate-800 bg-[#131a2b] py-3 pl-9 pr-8 text-sm outline-none focus:border-violet-500"
              >
                <option value="all">All videos</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="relative flex-1 sm:flex-none">
              <ArrowUpDown
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort videos"
                className="w-full appearance-none rounded-xl border border-slate-800 bg-[#131a2b] py-3 pl-9 pr-8 text-sm outline-none focus:border-violet-500"
              >
                <option value="default">Default order</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-200">
              {filteredVideos.length}
            </span>{" "}
            lectures
          </p>

          <p className="text-sm text-slate-400">
            {completedIds.length} completed
          </p>
        </div>

        {/* Video grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video) => {
              const isCompleted = completedIds.includes(video.id);

              return (
                <article
                  key={video.id}
                  className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#131a2b] transition duration-200 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl hover:shadow-black/20"
                >
                  {/* Thumbnail */}
                  <a
                    href={`https://www.youtube.com/watch?v=${getYoutubeId(video.thumbnail)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-video overflow-hidden bg-slate-800"
                    aria-label={`Watch ${video.title}`}
                  >
                    <img
                      src={video.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <span className="absolute bottom-2 right-2 rounded-md bg-black/85 px-2 py-1 text-xs font-medium text-white">
                      {video.duration}
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                      <CirclePlay
                        size={44}
                        className="scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                      />
                    </span>
                  </a>

                  {/* Video details */}
                  <div className="space-y-4 p-4">
                    <div className="min-h-16">
                      <h2 className="line-clamp-2 text-sm font-semibold leading-6 text-slate-100 transition group-hover:text-violet-300">
                        {video.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-400">
                        {video.channel}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          isCompleted
                            ? "text-emerald-400"
                            : "text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Clock3 size={15} />
                        )}
                        {isCompleted ? "Completed" : "Not completed"}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleComplete(video.id)}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                          isCompleted
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-violet-600 text-white hover:bg-violet-500"
                        }`}
                      >
                        {isCompleted ? "Undo" : "Mark done"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
            <Search className="mx-auto mb-3 text-slate-500" size={32} />
            <h2 className="font-semibold">No lectures found</h2>
            <p className="mt-2 text-sm text-slate-400">
              Try another search term or change your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Demo helper: extracts the YouTube ID from the thumbnail URL.
function getYoutubeId(thumbnailUrl) {
  return thumbnailUrl.split("/vi/")[1]?.split("/")[0] ?? "";
}