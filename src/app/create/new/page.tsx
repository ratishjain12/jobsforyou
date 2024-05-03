import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
  description: "create a new job",
};

const page = () => {
  return (
    <div className="">
      <NewJobForm />
    </div>
  );
};
export default page;
