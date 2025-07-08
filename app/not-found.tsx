import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 md:py-32">
      <SearchX className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>
      <Button asChild size="lg" className="mt-8 btn-gradient">
        <Link href="/">
          Go Back Home
        </Link>
      </Button>
    </div>
  );
}
