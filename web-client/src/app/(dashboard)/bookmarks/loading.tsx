import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingBookmarksPage() {
  return (
    <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <div className="flex flex-col gap-8 lg:w-10/12">
        <section className="flex w-full flex-row items-stretch">
          <Skeleton className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-6 dark:bg-gray-800" />

          <Skeleton className="group flex w-16 cursor-pointer items-center justify-center rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-gray-300 bg-white dark:bg-gray-800" />
        </section>

        {/* Featured Bookmarks List */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Featured Bookmarks
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
          </div>
        </section>

        <hr className="border-gray-400" />

        {/* Rest of Bookmarks List */}
        <section className="flex w-full flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Bookmarks
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
            <Skeleton className="h-32 rounded-md border border-gray-300 p-4" />
          </div>
        </section>
      </div>
    </article>
  );
}
