import { JobList } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import companyPlaceholderImage from "@/assets/company-logo-placeholder.png";
import {
  Banknote,
  Briefcase,
  Building2Icon,
  Earth,
  MapPin,
} from "lucide-react";
import { formatDate, formatMoney } from "@/lib/utils";

const JobListItem = ({
  job: {
    title,
    companyName,
    type,
    location,
    locationType,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobList) => {
  return (
    <div className="m-4">
      <Card className=" relative flex flex-col justify-center sm:flex-row sm:justify-normal">
        <Image
          src={companyLogoUrl || companyPlaceholderImage}
          alt={`${companyName} logo`}
          height={200}
          width={200}
          className="self-center rounded-lg object-contain"
          //   layout="responsive"
        />

        <div>
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{formatDate(createdAt)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2">
              <Building2Icon size={19} />
              {companyName}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-1">
            {location && (
              <p className="flex items-center gap-2">
                <Earth size={19} />
                {location}
              </p>
            )}
            <p className="flex items-center gap-2">
              <MapPin size={19} />
              {locationType}
            </p>
            <p className="mt-1 flex items-center gap-2">
              <Banknote size={19} />
              {formatMoney(salary)}
            </p>
          </CardFooter>
          <div className="p-6 pt-0">
            <Button>See Job</Button>
          </div>
        </div>
        <div className="absolute left-2 top-2 flex items-center gap-2 rounded-md bg-muted p-2">
          <Briefcase size={19} />
          <p>{type}</p>
        </div>
      </Card>
    </div>
  );
};
export default JobListItem;
