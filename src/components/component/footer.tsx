import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <div className=" mt-6 flex w-full items-center justify-center gap-4 bg-blue-950 p-4">
      <span>
        <Briefcase size={21} className="text-white" />
      </span>
      <p className="text-xl font-bold text-white">Jobs For You</p>
    </div>
  );
};
export default Footer;
