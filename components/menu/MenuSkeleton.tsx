export function MenuSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-5 py-8 sm:space-y-14 sm:py-10">
      {[1, 2].map((section) => (
        <section key={section} className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded-full bg-white/5" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass flex flex-col gap-3 overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] w-full animate-pulse bg-white/5" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
