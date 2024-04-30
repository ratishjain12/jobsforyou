import prisma from "@/lib/prisma";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { jobTypes, locationTypes } from "@/types";
import { jobFilterSchema, jobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

async function filterjobs(formData: FormData) {
  "use server";
  const data = Object.fromEntries(formData.entries());

  const { q, type, location, Remote, Hybrid, Onsite }: jobFilterValues =
    jobFilterSchema.parse(data);

  const search = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type: type.trim() }),
    ...(location && { location: location.trim() }),
    ...(Remote && { remote: "true" }),
    ...(Hybrid && { hybrid: "true" }),
    ...(Onsite && { onsite: "true" }),
  });

  redirect(`/?${search.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: jobFilterValues;
}
const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) => {
      let location = locations.map(({ location }) => {
        return location;
      });
      location = location.filter(Boolean);
      return location;
    })) as string[];

  return (
    <aside className="z-10 mx-1 h-fit rounded-lg border bg-background p-2 md:sticky md:top-0 md:w-[250px]">
      <form
        action={filterjobs}
        className="space-y-2"
        key={JSON.stringify(defaultValues)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            name="q"
            placeholder="Title,company,etc..."
            defaultValue={defaultValues.q || ""}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type</Label>
          <Select id="type" name="type" defaultValue={defaultValues.type || ""}>
            <option>All types</option>
            {jobTypes.map((jobtype) => {
              return (
                <option key={jobtype} value={jobtype}>
                  {jobtype}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="location">Location</Label>
          <Select
            id="location"
            name="location"
            defaultValue={defaultValues.location || ""}
          >
            <option>All locations</option>
            {distinctLocations.map((location) => {
              return (
                <option key={location} value={location}>
                  {location}
                </option>
              );
            })}
          </Select>
        </div>
        {locationTypes.map((locationType) => {
          return (
            <div
              key={locationType}
              className="flex flex-row items-center gap-2"
            >
              <input
                id={locationType}
                name={locationType}
                type="checkbox"
                defaultChecked={
                  defaultValues.Remote ||
                  defaultValues.Hybrid ||
                  defaultValues.Onsite
                }
              />
              <Label htmlFor={locationType}>{locationType} Jobs</Label>
            </div>
          );
        })}

        <FormSubmitButton>Filter</FormSubmitButton>
      </form>
    </aside>
  );
};
export default JobFilterSidebar;
