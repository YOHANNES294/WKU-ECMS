import { useEffect, useState } from "react";
import useSWR from "swr";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

let steps;

let bool = [];
let statusAssigned = [];
let ifInElse = false;
let isApprove = true;

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  }));
  return updatedData;
};

const Status = ({ adminStepData, academicStepData, handleRequest }) => {
  const [day, setDay] = useState(0);
  const { data: userData, error } = useSWR("/api/userStatus", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 2000,
  });

  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState([]);

  useEffect(() => {
    if (userData && userData.length > 0 && userData[0].status != "APPROVED") {
      const currentDate = new Date();
      const requestedDate = new Date(userData[0].dateRequested);
      const date = currentDate.getDate();
      const requested = requestedDate.getDate();
      const dif = date - requested;

      const fetchDay = async () => {
        try {
          const response = await fetch("/api/clearanceDate", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const dayData = await response.json();
            console.log("Day fetched successfully", dayData);
            setDay(dayData[0].day);
          } else {
            console.error("Failed to fetch day");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchDay();

      const deleteRequest = async () => {
        if (dif >= day) {
          try {
            const response = await fetch(`/api/staffRequest`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                objectId: userData[0]._id,
                role: userData[0].role,
              }),
            });

            if (response.ok) {
              toast.success(
                "Sorry, your request has expired, and you can make a new request."
              );
            } else {
              console.error("Failed to delete request:", response.statusText);
            }
          } catch (error) {
            console.error("Error deleting request:", error);
          }
        }
      };
      if (day > 0) {
        deleteRequest();
      }
    }

    if (userData) {
      // Initialize steps as an empty object
      steps = {};

      // Fetch the steps
      if (userData && userData[0]?.staffType == "ACADEMIC") {
        let academicStep = {};
        academicStepData.forEach((data, index) => {
          academicStep[data.name] = data.nextSteps;
        });
        steps = academicStep;
      } else if (userData && userData[0]?.staffType == "ADMIN") {
        let adminStep = {};
        adminStepData.forEach((data, index) => {
          adminStep[data.name] = data.nextSteps;
        });
        steps = { ...adminStep };
        delete steps.Director;
      }

      if (!userData && !error) {
        return <p>Loading...</p>;
      }
      if (error) {
        console.error("Error fetching data:", error);
        return <p>Failed to fetch data</p>;
      }

      // End fetch
      const dataDisplay = [];
      const currentStatus = userData[0]?.status;

      // Ensure steps is an object before using Object.values
      if (steps && typeof steps === "object") {
        // Get an array of all values
        const allValues = Object.values(steps);

        // Get the length of the array of values
        const lengthOfValues = allValues.length - 1;

        Object.keys(steps).forEach((key) => {
          const stepKey = key;
          const approvals = userData[0]?.approvals.map(
            (approval) => approval.role
          );
          const rejections = userData[0]?.rejections;
          const lengthOfApprovals = approvals?.length;

          let status = "Not Started";

          if (approvals && approvals.includes(key)) {
            status = "Approved";
            dataDisplay.push({ name: key, status: status });
            return;
          } else if (rejections && rejections.includes(key)) {
            status = "Rejected";
          } else if (userData[0]?.director && userData[0]?.director == key) {
            status = "Pending";
          } else if (
            key == "Human Resource Management Directorate" &&
            lengthOfValues > lengthOfApprovals &&
            !(
              userData[0]?.status?.length == 1 &&
              userData[0]?.status.includes("Human Resource Management Directorate")
            )
          ) {
            status = "Not Started";
          } else if (currentStatus && currentStatus.includes(key)) {
            ifInElse = true;

            for (const element of currentStatus) {
              let cnt = 0;
              let cn = 0;
              let arr = {};
              bool = [];

              if (
                (steps[element] && steps[element].includes(stepKey)) ||
                (steps[steps[element][0]] &&
                  steps[steps[element][0]].includes(stepKey))
              ) {
                status = "Not Started";
                isApprove = false;
                break;
              } else {
                isApprove = true;
                let countStatus = 0;
                Object.keys(steps).forEach((keys) => {
                  let pend = [];
                  if (steps[keys].includes(element)) {
                    if (approvals.includes(keys)) {
                      bool.push("yes");
                      cn += 1;
                    } else {
                      bool.push("no");
                      cnt += 1;
                    }
                  }
                });

                let stat = bool.includes("no");
                if (bool.includes("no")) {
                  statusAssigned.push("Not Started");
                } else {
                  statusAssigned.push("Pending");
                }
              }
            }
          }
          let finalstatus = statusAssigned[0];

          if (statusAssigned.includes("Pending")) {
            finalstatus = "Pending";
          }
          if (ifInElse && isApprove) {
            dataDisplay.push({ name: key, status: finalstatus });
            ifInElse = false;
          } else {
            dataDisplay.push({ name: key, status: status });
          }
        });

        setRequestStatus(dataDisplay);
      } else {
        console.error("Steps is not an object:", steps);
      }
    }
  }, [userData, adminStepData, academicStepData]);

  const handleReinitate = async (key) => {
    const response = await fetch(`/api/reinitiateRejected`, {
      method: "PATCH",
      body: JSON.stringify({
        reinitiate: requestStatus[key].name,
        objectId: userData[0]._id,
      }),
    });
    if (response.ok) {
      toast.success("Your clearance is reinitiated successfully");
    }
  };

  const handlePrintClearance = () => {
    if (userData && userData.length > 0) {
      const currentDate = new Date();
      const requestedDate = new Date(userData[0].dateRequested);
      const date = currentDate.getDate();
      const requested = requestedDate.getDate();
      const dif = date - requested;

      if (dif >= day) {
        fetch(`/api/staffRequest`, {
          method: "DELETE",
          body: JSON.stringify({
            objectId: userData[0]._id,
            role: userData[0].role,
          }),
        });
      }
    }
    router.push(`/user/PrintClearance?clearanceId=${userData[0]?._id}`);
  };

  return (
    <>
      {userData && userData.length == 0 && (
        <div class="rounded-md border border-stroke bg-white px-5 pt-10 shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div class="mx-auto max-w-[490px]">
            <div class="mt-7.5 mb-3 text-center">
              <h2 class="mb-3 text-2xl font-bold text-black dark:text-white font-satoshi">
                You have not any clearance process in progress!
              </h2>
              <p class="font-medium font-satoshi">
                Thank you so much for choosing us. Please press the button to
                request clearance approval.
              </p>
              <button
                onClick={handleRequest}
                class="mt-7.5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium font-satoshi text-white hover:bg-opacity-90"
              >
                Request Clearance
              </button>
            </div>{" "}
            <Image
              alt="illustration"
              loading="lazy"
              width="400"
              height="200"
              decoding="async"
              data-nimg="1"
              src="/images/illustration/illustration-02.svg"
            />
          </div>
        </div>
      )}
      {userData && userData.length > 0 && userData[0].status != "APPROVED" && (
        <div className="rounded-md border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col ">
            <div className="grid  rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-2">
              <div className="p-2.5 sm:ml-16  text-center xl:p-3">
                <h5 className="text-sm text-black-2 dark:text-whiter font-medium  font-satoshi xsm:text-xl">
                  Offices
                </h5>
              </div>
              <div className="p-2.5 sm:ml-16  text-left xl:p-3">
                <h5 className="text-sm text-black-2  dark:text-whiter font-medium  font-satoshi  xsm:text-xl">
                  Status
                </h5>
              </div>
            </div>

            {requestStatus.map((request, key) => (
              <div
                className={`grid grid-cols-2  ${
                  key === requestStatus.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center  justify-center sm:ml-16 p-2.5 xl:p-5">
                  <p className="text-left text-black  bg-gray-2 dark:bg-body/20 dark:text-white text-base font-semibold font-satoshi">
                    {request.name}
                  </p>
                </div>

                <div className="flex items-center sm:ml-16  justify-start p-2.5 xl:p-5">
                  {request.status === "Approved" ? (
                    <button className="bg-body/90 cursor-default text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white">
                      <BeenhereIcon fontSize="small" />{" "}
                      <div className="hidden md:block font-satoshi">
                        Approved
                      </div>
                    </button>
                  ) : request.status === "Rejected" ? (
                    <div className="flex gap-2 ">
                      <button className="bg-meta-1 cursor-default text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white">
                        <ThumbDownAltIcon fontSize="small" />
                        <div className="hidden md:block font-satoshi">
                          Rejected
                        </div>
                      </button>
                      <button
                        onClick={() => handleReinitate(key)}
                        className="bg-meta-6/90 text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white"
                      >
                        <RestartAltIcon fontSize="small" />
                        <div className="hidden md:block font-satoshi">
                          Reinitiate
                        </div>
                      </button>
                    </div>
                  ) : request.status === "Pending" ? (
                    <button className="bg-meta-1/60 dark:bg-warning cursor-default dark:bg-meta-6/60 text-base px-3 py-1 rounded-lg flex gap-2 items-center text-white">
                      <PendingActionsIcon fontSize="small" />{" "}
                      <div className="hidden md:block font-satoshi">
                        Pending
                      </div>
                    </button>
                  ) : (
                    <button className="bg-primary/70  cursor-default text-base  px-3 py-1 rounded-lg flex gap-2 items-center text-white">
                      <NotStartedIcon fontSize="medium" />{" "}
                      <div className="hidden md:block font-satoshi">
                        Not Started
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {userData && userData.length > 0 && userData[0].status == "APPROVED" && (
        <div class="rounded-md border border-stroke bg-white px-5 pt-10 shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div class="mx-auto max-w-[490px]">
            <div class="mt-7.5 mb-3 text-center">
              <h2 class="mb-3 text-2xl font-bold text-black dark:text-white font-satoshi">
                Your Clearance Is Approved Successfully!
              </h2>
              <p class="font-medium font-satoshi">
                Thank you so much for choosing us. Download the certificate of
                clearance here for further use related with clearance process.
              </p>
              <button
                onClick={handlePrintClearance}
                class="mt-7.5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium font-satoshi text-white hover:bg-opacity-90"
              >
                Print Certificate Of Clearance
              </button>
            </div>{" "}
            <Image
              alt="illustration"
              loading="lazy"
              width="400"
              height="200"
              decoding="async"
              data-nimg="1"
              src="/images/illustration/illustration-02.svg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Status;