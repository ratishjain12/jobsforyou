import { User } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex items-center justify-between bg-blue-950 px-4 py-3 text-white sm:px-6 lg:px-8">
      <Link className="flex items-center space-x-2" href="/">
        <BriefcaseIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Jobs For You</span>
      </Link>
      <nav className="flex items-center space-x-4">
        <Link
          aria-current="page"
          className="rounded-md px-2 py-1 transition-colors hover:bg-gray-800 data-[active=true]:bg-gray-800 data-[active=true]:font-medium"
          href="/"
        >
          Home
        </Link>

        <Link
          className="rounded-md px-2 py-1 transition-colors hover:bg-gray-800 data-[active=true]:bg-gray-800 data-[active=true]:font-medium"
          href="#"
        >
          Post a Job
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-gray-800 data-[active=true]:bg-gray-800 data-[active=true]:font-medium"
          href="#"
        >
          <span>
            <User size={16} />
          </span>
          Account
        </Link>
      </nav>
    </header>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
