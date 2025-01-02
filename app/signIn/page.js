import OuterNav from "@/components/Header/OuterNav";
import SignIn from "@/components/auth/SignIn";
import RouteIcon from "@mui/icons-material/Route";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col bg-white h-screen">
        <div className="flex w-full ">
          <OuterNav />{" "}
        </div>{" "}
        <div className="flex  md:flex-row flex-col lg:px-24 md:px-12 md:py-12">
          <div className="md:w-1/2 w-full">
            <div className=" flex flex-col gap-8 pt-8">
              <h1 className="md:text-left text-center text-3xl font-extrabold text-primary dark:text-white    xl:text-title-xxl ">
                Wolkite University Clearance Management System For Employees
              </h1>
              <h1 className="md:text-left text-center text-3xl font-extrabold text-primary dark:text-white    xl:text-title-xxl ">
                "We Made It Easy"
              </h1>{" "}
              <div className="hidden md:block">
                <p class="mb-6 text-base font-medium text-black ">
                  Use our all-in-one solution, enjoy a stress-free clearance
                  process in Wku.
                </p>
                <ul class="flex flex-wrap  gap-4">
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Clear Pathway
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <RouteIcon className="text-meta-4" fontSize="large" />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Efficient
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <AdsClickIcon fontSize="large" className="text-primary" />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Rapid Approval
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <ElectricBoltIcon
                        className="text-meta-1"
                        fontSize="large"
                      />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Seamless Experience
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <AutoFixHighIcon
                        className="text-warning"
                        fontSize="large"
                      />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Transparent Tracking
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <StackedLineChartIcon
                        className="text-black"
                        fontSize="large"
                      />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex mt-6 items-center gap-4"></div>
            </div>
          </div>
          <div className=" lg:mx-16  mx-4 md:my-4 ">
            <SignIn />
          </div>
        </div>
      </div>
    </main>
  );
}
