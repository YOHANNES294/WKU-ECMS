import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

const genInfo = [
  {
    title: "Cafteria",
    desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
  },
  {
    title: "Library",
    desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
  },
  {
    title: "Dormitory",
    desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
  },
  {
    title: "Cafteria",
    desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
  },
  {
    title: "Library",
    desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
  },
  {
    title: "Dormitory",
    desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
  },
  {
    title: "Cafteria",
    desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
  },
  {
    title: "Library",
    desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
  },
  {
    title: "Dormitory",
    desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
  },
];
const GeneralInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [generalInfo, setGeneralInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const result = await fetch("/api/office");
      const generalInfoResult = await result.json();
      setGeneralInfo(generalInfoResult);
    };
    fetchInfo();
  }, [generalInfo]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInfo = generalInfo.filter((info) =>
    info.officeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [accordionOpen, setAccordionOpen] = useState(
    Array(filteredInfo.length).fill(false)
  );

  const handleAccordionClick = (index) => {
    const newAccordionState = [...accordionOpen];
    newAccordionState[index] = !newAccordionState[index];
    setAccordionOpen(newAccordionState);
  };

  return (
    <div class="rounded-md border border-stroke bg-white px-5 py-10 shadow-default dark:border-strokedark dark:bg-boxdark ">
      <input
        type="text"
        placeholder="Search office requirement here"
        value={searchTerm}
        onChange={handleSearch}
        className="sm:w-1/3 w-full pt-4 pb-3 px-3 py-4  focus:outline-none text-primary rounded-lg border border-stroke  dark:border-strokedark dark:bg-boxdark  "
      />
      <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 ">
        {filteredInfo.map((info, index) => (
          <div className="flex flex-col gap-6" key={index}>
            <div
              onClick={() => handleAccordionClick(index)}
              className={`py-3 px-4 shadow  shadow-stroke  rounded-md border border-stroke shadow-9 dark:border-strokedark dark:bg-boxdark dark:shadow-none  ${
                accordionOpen[index] ? "bg-gray-2" : ""
              }`}
            >
              <button className="flex w-full items-center gap-1.5 sm:gap-3 xl:gap-6">
                <div
                  className={`flex h-10.5 w-10.5 items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4 ${
                    accordionOpen[index] ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="duration-200 ease-in-out fill-primary stroke-primary dark:fill-white dark:stroke-white"
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.28882 8.43257L8.28874 8.43265L8.29692 8.43985C8.62771 8.73124 9.02659 8.86001 9.41667 8.86001C9.83287 8.86001 10.2257 8.69083 10.5364 8.41713L10.5365 8.41721L10.5438 8.41052L16.765 2.70784L16.771 2.70231L16.7769 2.69659C17.1001 2.38028 17.2005 1.80579 16.8001 1.41393C16.4822 1.1028 15.9186 1.00854 15.5268 1.38489L9.41667 7.00806L3.3019 1.38063L3.29346 1.37286L3.28467 1.36548C2.93287 1.07036 2.38665 1.06804 2.03324 1.41393L2.0195 1.42738L2.00683 1.44184C1.69882 1.79355 1.69773 2.34549 2.05646 2.69659L2.06195 2.70196L2.0676 2.70717L8.28882 8.43257Z"
                      fill=""
                      stroke=""
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg font-satoshi  text-black dark:text-white">
                    {info.officeName}
                  </h4>
                </div>
              </button>

              {accordionOpen[index] && (
                <div className="  mt-5 ml-16.5 duration-200 ease-in-out ">
                  <p className="font-satoshi text-body text-base font-medium text-justify dark:text-bodydark1 leading-8">
                    Prior to requesting approval from {info.officeName}, please
                    return any materials or things associated with this office
                    or fulfil the prerequisit before asking permission from the{" "}
                    {info.officeName} including {info.items}.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfo;
