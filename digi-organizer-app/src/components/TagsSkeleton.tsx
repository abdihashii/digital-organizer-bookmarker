import { Skeleton } from '@/components/ui/skeleton';

const TagsSkeleton = () => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
      <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
      <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
      <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
      <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
    </div>
  );
};

export default TagsSkeleton;
