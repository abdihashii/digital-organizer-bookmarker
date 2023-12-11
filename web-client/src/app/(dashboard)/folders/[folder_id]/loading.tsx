import { Loader2 } from 'lucide-react';

export default function LoadingFolderPage() {
  return (
    <article className="flex flex-col gap-8 min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <div>
        <Loader2 className="animate-spin w-12 h-12 text-gray-900 dark:text-gray-100" />
      </div>
    </article>
  );
}
