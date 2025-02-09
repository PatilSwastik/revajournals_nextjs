import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t" id="footer">
      <div className="flex flex-col gap-2 sm:flex-col py-6 w-full shrink-0 items-center px-4 md:px-6 ">
        <div className="w-full flex flex-col gap-4 md:flex-row lg:justify-around">
          <div className="lg:text-center">
            <h3 className="text-medium text-white font-bold">
              Publish with Us
            </h3>
            <ul className="flex flex-col gap-4 md:flex-row lg:gap-8 justify-around">
              <li className="">
                <Link className=" text-sm" href="/submitmanuscript">
                  Publish your research
                </Link>
              </li>
              <li className="">
                <Link className=" text-sm" href="/forauthors/publishing">
                  Open access publishing
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:text-center">
            <h3 className="text-medium text-white font-bold">
              Products & Services
            </h3>
            <ul className="flex flex-col gap-4 md:flex-row lg:gap-8 justify-around">
              <li className="">
                <Link className="  text-sm" href="#">
                  Our products
                </Link>
              </li>
              <li className="">
                <Link className=" text-sm" href="#">
                  Societies
                </Link>
              </li>
              <li className="">
                <Link className=" text-sm" href="#">
                  Partners and advertisers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 sm:flex-row shrink-0 items-center px-4 pt-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Reva Journals. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
