"use client";
import Announcement from "@/components/user/Announcement";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "WKUCMS | User",
//   description: "This is Home Blog page for WKUCMS User",
//   // other metadata
// };
const clearanceInstructions = [
  "Return all items that you borrowed from the university.",
  "Settle any outstanding fees.",
  "Return university-issued items.",
  "Complete the online clearance application.",
];
export default function Home() {
  const session = useSession();
  const router = useRouter();

  const firstName = session?.data?.user.firstname;
  return (
    <div className="bg-white sm:px-6 px-2 pb-6 dark:bg-black dark:border-black">
      <div className="  pt-4  pb-2 px-4 gap-4 flex flex-col lg:flex-row lg:items-center lg:justify-between ">
        <div className="mt-2 py-4 px-6 lg:w-1/2 w-full bg-gray-2 dark:bg-boxdark flex flex-row gap-8 rounded-md ">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-primary dark:text-bodydark1 md:font-extrabold font-extrabold font-satoshi text-2xl md:text-title-xl">
                Welcome, {firstName}!
              </h2>
              <h2 className="text-primary dark:text-bodydark1 sm:text-base text-base">
                Streamline your clearance journey with us. Experience efficiency
                and ease like never before!
              </h2>
            </div>

            <button
              onClick={() => {
                router.push("/user/myclearance");
              }}
              className="px-4 py-2 rounded-md bg-[#7752FE] text-base flex gap-2 text-white hover:bg-primary/90 max-w-fit"
            >
              Request Clearance <ArrowForwardIcon />
            </button>
          </div>
          <div>
            <Image
              src={"/images/illustration/illustration-reports.png"}
              width={200}
              height={200}
            />
          </div>
        </div>{" "}
        <div class="mt-2 py-3 px-2 lg:w-1/2 w-full rounded-md border border-spacing-0.5 border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
          <div class="border-b border-stroke py-1 px-4 dark:border-strokedark ">
            <h4 class="text-lg font-semibold text-primary  dark:text-white">
              <p>Clearance Preconditons</p>
            </h4>
          </div>
          <div class="px-4 pt-4 pb-2 ">
            {clearanceInstructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-2 mb-1 text-primary dark:text-bodydark1 font-medium"
              >
                <KeyboardArrowRightOutlinedIcon /> <p>{instruction}</p>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 mx-4 py-4 sm:px-6 px-2 bg-gray-2  dark:bg-boxdark rounded-md hidden md:block">
        <h2 className="text-title-xl2 font-bold mb-4 text-primary dark:text-white font-satoshi">
          Overview of clearance Process
        </h2>{" "}
        <div className="max-w-4xl mx-auto my-auto ">
          <div className="relative h-60">
            <div
              className="absolute left-0 bottom-0 bg-[#7752FE] dark:bg-form-strokedark dark:hover:bg-form-strokedark/80 p-4 rounded-lg"
              style={{ width: "180px" }}
            >
              <p className="text-center text-white">
                Ensure you are free from any debt
              </p>
              <div className="absolute left-full bottom-5 transform translate-x-1/2 translate-y-1/2">
                <ReplyAllOutlinedIcon
                  style={{ transform: "rotate(140deg)", color: "#7752FE" }}
                />
              </div>
            </div>
            <div
              className="absolute left-1/4 bottom-7 bg-[#7752FE] dark:bg-form-strokedark dark:hover:bg-form-strokedark/80 p-4 rounded-lg"
              style={{ width: "180px" }}
            >
              <p className="text-center text-white ">
                Request clearance in our unified platform
              </p>
              <div className="absolute left-full bottom-18 transform translate-x-1/2 translate-y-1/2">
                <ReplyAllOutlinedIcon
                  style={{ transform: "rotate(140deg)", color: "#7752FE" }}
                />
              </div>
            </div>
            <div
              className="absolute left-1/2 bottom-24 bg-[#7752FE] dark:bg-form-strokedark dark:hover:bg-form-strokedark/80 p-4 rounded-lg"
              style={{ width: "180px" }}
            >
              <p className="text-center  text-white">
                Track your clearance status on realtime here.
              </p>
              <div className="absolute left-full bottom-15 transform translate-x-1/2 translate-y-1/2">
                <ReplyAllOutlinedIcon
                  style={{ transform: "rotate(140deg)", color: "#7752FE" }}
                />
              </div>
            </div>
            <div
              className="absolute left-3/4 bottom-36 bg-[#7752FE] dark:bg-form-strokedark dark:hover:bg-form-strokedark/80 p-4 rounded-lg"
              style={{ width: "180px" }}
            >
              <p className="text-center text-white">
                Download and print you clearace certificate.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-4 py-4 sm:px-6 px-2 bg-gray-2  dark:bg-boxdark rounded-md ">
        <h2 className="text-title-xl2 font-bold mb-4 text-primary dark:text-white font-satoshi">
          Announcements
        </h2>
        <Announcement />{" "}
      </div>
    </div>
  );
}
