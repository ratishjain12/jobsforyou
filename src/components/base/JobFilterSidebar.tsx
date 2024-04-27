import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";

async function filterjobs(formData: FormData) {
  "use server";
}

const JobFilterSidebar = () => {
  return (
    <aside className="sticky top-0 z-10 mx-1 h-fit rounded-lg border bg-background p-2 md:w-[250px]">
      <form action={filterjobs} className="space-y-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="q">Search</Label>
          <Input id="q" name="q" placeholder="Title,company,etc..." />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Select id="location" name="location">
            <option>All locations</option>
          </Select>
        </div>
      </form>
    </aside>
  );
};
export default JobFilterSidebar;
