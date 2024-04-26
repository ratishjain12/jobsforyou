import JobListItem from "@/components/base/JobListItem";
import ThemeToggleBtn from "@/components/base/ThemeToggleBtn";
import prisma from "@/lib/prisma";
import companyPlaceholderImage from "@/assets/company-logo-placeholder.png";
export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      {jobs?.map((job) => {
        return <JobListItem key={job.id} job={job} />;
      })}
      <div className="fixed bottom-2 right-2 z-50">
        <ThemeToggleBtn />
      </div>
    </main>
  );
}
