import { jobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface filterVal {
  filters: jobFilterValues;
}

const JobResults = async ({
  filters: { q, type, location, Remote, Hybrid, Onsite },
}: filterVal) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type !== "All types" ? { type } : {},
      location !== "All locations" ? { location } : {},
      {
        OR: [
          Remote ? { locationType: "Remote" } : {},
          Hybrid ? { locationType: "Hybrid" } : {},
          Onsite ? { locationType: "Onsite" } : {},
        ],
      },
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where: where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-3">
      {jobs?.map((job) => {
        return <JobListItem key={job.id} job={job} />;
      })}
      {jobs.length === 0 && (
        <p className="mt-6 text-center text-2xl">
          No Jobs Found. Try adjusting filters...
        </p>
      )}
    </div>
  );
};
export default JobResults;
