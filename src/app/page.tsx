import JobFilterSidebar from "@/components/base/JobFilterSidebar";
import JobResults from "@/components/base/JobResults";
import { jobFilterValues } from "@/lib/validation";

interface pageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    hybrid?: string;
    onsite?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, hybrid, onsite },
}: pageProps) {
  const filters: jobFilterValues = {
    q,
    type,
    location,
    Remote: remote === "true",
    Hybrid: hybrid === "true",
    Onsite: onsite === "true",
  };

  return (
    <main className="m-auto max-w-4xl">
      <div className="my-4 space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Developer Jobs
        </h1>
        <p className="text-muted-foreground"> Find your dream job</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <JobFilterSidebar />
        <JobResults filters={filters} />
      </div>
    </main>
  );
}
