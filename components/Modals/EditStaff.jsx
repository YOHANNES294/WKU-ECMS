"use client";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerOfficerSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CollegeData, DepartmentData, ROLES } from "@/utils/constants";
import * as XLSX from "xlsx";

const EditStaff = ({ userData,onCancel }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(registerOfficerSchema) });

  let keys = [];
  // Mock data for staff types
  const staffTypes = ["ACADEMIC", "ADMIN"];

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedPrevilege, setSelectedPrevilege] = useState(null);
   const [selectedDirector, setSelectedDirector] = useState(null);


  const [searchTerm, setSearchTerm] = useState("");
  const [searchCollege, setSearchCollege] = useState("");
  const [searchPrevilege, setSearchPrevilege] = useState("");
  const [searchStaffType, setSearchStaffType] = useState("");
  const [searchDirector, setSearchDirector] = useState("");

  const [filteredOffices, setFilteredOffices] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredPrevilege, setFilteredPrevilege] = useState([]);
  const [filteredStaffType, setFilteredStaffType] = useState([]);
  const [filteredDirector, setFilteredDirector] = useState(null);


  const [showDropdown, setShowDropdown] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [showPrevilegeDropdown, setShowPrevilegeDropdown] = useState(false);
  const [showStaffType, setShowStaffType] = useState(false);
  const [showDirectorDropdown, setShowDirectorDropdown] = useState(false);


  const collegeDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const previlegeDropdownRef = useRef(null);
  const staffTypeDropdownRef = useRef(null);
  const directorDropdownRef = useRef(null);


  const initialDropdownItems = DepartmentData.slice(0, 1);
  const initialDropdownColleges = CollegeData.slice(0, 1);


  const [Previlege, setPrevilege] = useState([])
  const [staffType, setStaffType] = useState([])
  const [director, setDirector] = useState([])

  // const staffType = ["Acadamic", "Admin"];



 

  const handleSearchInputFocus = () => {
    if (searchTerm) {
      setShowDropdown(true);
    } else {
      setFilteredOffices(initialDropdownItems);
      setShowDropdown(true);
    }
  };

  const handleSearchCollegeFocus = () => {
    if (searchCollege) {
      setShowCollegeDropdown(true);
    } else {
      setFilteredColleges(initialDropdownColleges);
      setShowCollegeDropdown(true);
    }
  };

  const handleSearchPrevilegeFocus = () => {
    if (searchPrevilege) {
      setShowPrevilegeDropdown(true);
    } else {
      setFilteredPrevilege(Previlege);
      setShowPrevilegeDropdown(true);
    }
  };



  const handleSearchStaffTypeChange = (event) => {
    setSearchStaffType(event.target.value);
    setShowStaffType(true);
  };

  const handleSearchDirectorFocus = () => {
    if (searchDirector) {
      setShowDirectorDropdown(true);
    } else {
      setFilteredDirector(director);
      setShowDirectorDropdown(true);  
    }
  };


  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const staffStepType = "STAFF"; // Define your stepType here


       

// searchStaffType
    let fetchData;
        try {
          if(searchStaffType){
            const url = "/api/steps"; // Define the URL
  
  
            const fullUrl = `${url}?stepType=${searchStaffType}`;
            fetchData = await fetch(fullUrl);

          }else{

            fetchData = await fetch(`/api/steps`);
          }
         


          if (!fetchData.ok) {
            throw new Error(`Failed to fetch data. Status: ${fetchData.status}`);
          }
          const data = await fetchData.json();
          const keyValuePairs = {};
          data.forEach((item) => {
            keyValuePairs[item.name] = item.nextSteps;
          });
          keys = Object.keys(keyValuePairs);
          const values = Object.values(keyValuePairs);
          console.log("keys fetch", keys, ">> values", values);
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        }


        const previlege = keys.map((role, index) => ({

          id: (index + 1).toString(),
          name: role,
        }));
        //console.log("previlege",searchStaffType);
        setDirector(previlege);
        setPrevilege(previlege);

      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        // setStepError(error);
      }
    };

    fetchData(); // Fetch data once when component mounts

    if (searchCollege) {
      const filteredResults = CollegeData.filter((college) =>
        college.name.toLowerCase().includes(searchCollege.toLowerCase())
      );
      setFilteredColleges(filteredResults);
    } else {
      setFilteredColleges(initialDropdownColleges);
    }

    if (searchTerm) {
      const filteredResults = DepartmentData.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffices(filteredResults);
    } else {
      setFilteredOffices(initialDropdownItems);
    }

    if (searchPrevilege) {
      // console.log("concatPrevilegeenatedArray",Previlege);
      // console.log("privilegeData",privilegeData);
      const filteredResults = Previlege?.filter((college) =>
        college.name.toLowerCase().includes(searchPrevilege.toLowerCase())
      );
      setFilteredPrevilege(filteredResults);
    }

    if (searchDirector) {
      // console.log("concatPrevilegeenatedArray",Previlege);
      // console.log("privilegeData",privilegeData);
      const filteredResults = director?.filter((college) =>
        college.name.toLowerCase().includes(searchDirector.toLowerCase())
      );
      setFilteredDirector(filteredResults);
    }
    if (searchStaffType) {
      // console.log("concatPrevilegeenatedArray",Previlege);
      // console.log("privilegeData",privilegeData);
      const filteredResults = staffType.filter((college) =>
        college.toLowerCase().includes(searchStaffType.toLowerCase())
      );
      setFilteredStaffType(filteredResults);
    }
    //  else {
    //   setFilteredPrevilege(filteredResults);
    // }

  }, [searchTerm, DepartmentData, searchCollege, searchPrevilege,searchDirector,searchStaffType]);
// searchTerm, DepartmentData, searchCollege, searchPrevilege,searchDirector

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        collegeDropdownRef.current &&
        !collegeDropdownRef.current.contains(event.target)
      ) {
        setShowCollegeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (collegeDropdownRef.current &&
          !collegeDropdownRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
        setShowCollegeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (previlegeDropdownRef.current &&
          !previlegeDropdownRef.current.contains(event.target)) ||
        (previlegeDropdownRef.current &&
          !previlegeDropdownRef.current.contains(event.target))
      ) {
        setShowPrevilegeDropdown(false);
        setShowPrevilegeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (directorDropdownRef.current &&
          !directorDropdownRef.current.contains(event.target)) ||
        (directorDropdownRef.current &&
          !directorDropdownRef.current.contains(event.target))
      ) {
        setShowDirectorDropdown(false);
        setShowDirectorDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        staffTypeDropdownRef.current &&
        !staffTypeDropdownRef.current.contains(event.target)
      ) {
        setShowStaffType(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Filter staff types based on search term
    const filteredResults = staffTypes.filter((type) =>
      type.toLowerCase().includes(searchStaffType.toLowerCase())
    );
    setFilteredStaffType(filteredResults);
  }, [searchStaffType]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleSearchPrevilegeChange = (event) => {
    setSearchPrevilege(event.target.value);
    setShowPrevilegeDropdown(true);
  };
  const handleSearchDirectorChange = (event) => {
    setSearchDirector(event.target.value);
    setShowDirectorDropdown(true);
  };
  const handleSearchStaffType = () => {
    setShowStaffType(true);
  };


  const handleDropdownItemClick = (office) => {
    setValue("departmentName", office.name);
    setValue("departmentId", office.id);
    setSelectedCollege(office);

    setSearchTerm(office.name);
    setShowDropdown(false);
  };

  const handleDropdownPrevilegeItemClick = (office) => {
    setValue("previlegeName", office.name);
    setValue("previlegeId", office.id);
    setSelectedPrevilege(office);

    setSearchPrevilege(office.name);
    setShowPrevilegeDropdown(false);
  };

  const handleDropdownDirectorItemClick = (office) => {
    setValue("directorName", office.name);
    setValue("directorId", office.id);
    setSelectedDirector(office);

    setSearchDirector(office.name);
    setShowDirectorDropdown(false);
  };


  const handleDropdownStaffTypeItemClick = (staffType) => {
    setSearchStaffType(staffType);
    setShowStaffType(false);
  };

  const handleSearchCollegeChange = (event) => {
    setSearchCollege(event.target.value);
    setShowCollegeDropdown(true);
  };

  const handleDropdownCollegeClick = (college) => {
    setValue("collegeName", college.name);
    setValue("collegeId", college.id);
    setSelectedCollege(college);
    setSearchCollege(college.name);
    setShowCollegeDropdown(false);
  };
  // console.log(console.log("directorprevilege",Previlege));
  // console.log(console.log("director",director));


  const onSubmit = async (data) => {
    // const fromFirstName = data.firstName.toLowerCase();
    // const fromMiddleName = data.middleName.charAt(0).toLowerCase();
    // const password = `${fromFirstName}@${fromMiddleName}1234`;
    console.log("check", data.previlegeName, "and", userData[0].privilege);
    if (
      (data.previlegeName !== userData[0].privilege &&
      data.previlegeName != undefined )||
      (data.directorName !== userData[0].director &&
      data.directorName != undefined)||
      (data.blockNo !== userData[0].blockNo &&
      data.blockNo != undefined)
      

    ) {
      try {
        const response = await fetch(`/api/user/new/staff`, {
          method: "PATCH",
          body: JSON.stringify({
            objectId: userData[0]._id,
            userId: userData[0].userId,
            privilege: data.previlegeName,
            college: selectedCollege?.id,
            department: selectedDepartment?.id,
            director:data.directorName,
            blockNo: data.blockNo,
          }),
        });


        if (response.ok) {
          toast.success("Officer Updated Successfully!");
        }
      } catch (error) {
        console.log(error);
      }
      setSearchCollege("");
      reset();
    } else {
      toast.error("First update the previlege before updating!");
    }
  };


  const handleCancel = () => {
    onCancel();
  };

  const handleDownload = () => {
    // Constructing a temporary link element
    const link = document.createElement("a");
    link.href = "/files/studentsTrial.xlsx";
    link.setAttribute("download", "studentsTrial.xlsx");
    // Simulating a click event to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="relative w-full max-w-142.5 rounded-lg bg-white py-12 px-8  dark:bg-boxdark md:py-15 md:px-8.5">
      <button
        onClick={handleDownload}
        className="absolute top-6 right-12 text-sm text-primary font-satoshi "
      >
        Get Importing Format
      </button>
      <div className="flex flex-row place-content-between">
        <div>
          <h3 className="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
            Edit Staff previlege
          </h3>
          <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="firstName"
              id="firstName"
              value={userData[0].firstname}
              readOnly
              placeholder="student's name"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="middleName"
            >
              Middle Name
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="middleName"
                id="middleName"
                value={userData[0].middlename}
                readOnly  
                placeholder="Father's name"
                {...register("middleName")}
              />
              <p>{errors.middleName?.message}</p>
            </div>
          </div>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="lastName"
              id="lastName"
              value={userData[0].lastname}
              readOnly
              placeholder="Grand father's Name"
              {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="studentId"
            >
              user Id
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="studentId"
              id="studentId"
              value={userData[0].userId}
              readOnly
              placeholder=".../..../.."
              {...register("studentId")}
            />
            <p>{errors.studentId?.message}</p>
          </div>
        </div>

        {/*  */}
        {userData[0].staffType && userData[0].staffType == "ACADEMIC" && (
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

            <div className="w-full sm:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                College
              </label>
              <input
                type="text"
                name="collegeName"
                id="collegeName"
                value={userData[0].collegeName}
               
                placeholder="Search for a college..."
                readOnly
                onFocus={handleSearchCollegeFocus}
                onChange={handleSearchCollegeChange}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

              />

              <p>{errors.collegeName?.message}</p>

              {showCollegeDropdown && (
                <div
                  ref={collegeDropdownRef} // Use the college dropdown ref
                  className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                >
                  {filteredColleges.map((college) => (
                    <div
                      key={college.id}
                      onClick={() => handleDropdownCollegeClick(college)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                    >
                      {college.name}
                    </div>
                  ))}
                </div>
              )}
            </div>


            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="phoneNumber"
              >
                Department
              </label>
              <input
                type="text"
                name="departmentName"
                id="departmentName"
                placeholder="Search for an office..."
                value={userData[0].departmentName}
                readOnly
                onFocus={handleSearchInputFocus}
                onChange={handleSearchInputChange}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              //  {...register("departmentName")}
              />
              <input
                type="hidden"
                name="departmentId"
                id="departmentId"
                value={selectedDepartment ? selectedDepartment.id : ""}
              />

              <p>{errors.departmentName?.message}</p>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                >
                  {filteredOffices.map((office) => (
                    <div
                      key={office.id}
                      onClick={() => handleDropdownItemClick(office)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                    >
                      {office.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}


        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

    
          <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Previlege
            </label>
            <input
              type="text"
              name="previlegeName"
              id="previlegeName"
              placeholder={userData[0].privilege}
              value={searchPrevilege}
              
              defaultValue={userData?.privilege}
              onFocus={handleSearchPrevilegeFocus}
              onChange={handleSearchPrevilegeChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

            />


            <p>{errors.collegeName?.message}</p>

            {showPrevilegeDropdown && (
              <div
                ref={previlegeDropdownRef} // Use the college dropdown ref
                className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                {filteredPrevilege?.map((previlege) => (
                  <div
                    key={previlege.id}
                    onClick={() => handleDropdownPrevilegeItemClick(previlege)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                  >
                    {previlege.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {userData[0].staffType && userData[0].staffType == "ADMIN" && (
            
            <div className="w-full sm:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Director
            </label>
            <input
              type="text"
              name="directorName"
              id="directorName"
              placeholder={userData[0].director}
              value={searchDirector}
              onFocus={handleSearchDirectorFocus}
              onChange={handleSearchDirectorChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

            />


            <p>{errors.collegeName?.message}</p>

            {showDirectorDropdown && (
              <div
                ref={directorDropdownRef} // Use the college dropdown ref
                className="w-full py-1 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                {filteredDirector?.map((director) => (
                  <div
                    key={director.id}
                    onClick={() => handleDropdownDirectorItemClick(director)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:bg-bodydark1 dark:hover:bg-body"
                  >
                    {director.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          )}
  {userData[0].blockNo &&( userData[0].privilege=="Dormitory" ||searchPrevilege=="Dormitory" )&&  (
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="blockNo"
              >
                Dorm Block
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="blockNo"
                id="blockNo"
                placeholder={userData[0].blockNo}
                
                {...register("blockNo")}
              />
              <p>{errors.blockNo?.message}</p>
            </div>
          )}

        </div>



        {/*  */}
        

       



        <div className="-mx-3 mt-10 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>

          <div onClick={handleCancel} className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStaff;

