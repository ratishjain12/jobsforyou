import JobFilterSidebar from "@/components/base/JobFilterSidebar";
import JobListItem from "@/components/base/JobListItem";
import ThemeToggleBtn from "@/components/base/ThemeToggleBtn";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
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
        <div className="grow ">
          {jobs?.map((job) => {
            return <JobListItem key={job.id} job={job} />;
          })}
        </div>
      </div>
      <div className="fixed bottom-2 right-2 z-50">
        <ThemeToggleBtn />
      </div>
    </main>
  );
}
