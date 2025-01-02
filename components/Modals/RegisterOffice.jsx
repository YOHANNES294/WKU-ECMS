import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerOfficeSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

const RegisterOffice = ({ onCancel }) => {
  const [stepData, setStepData] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerOfficeSchema) });

  // Updated the programs array to remove "STUDENT"
  const programs = ["ACADEMIC", "ADMIN"];

  const onSubmit = async (data) => {
    const fromFirstName = data.officeName.toLowerCase();

    // Generate a random number between 100 and 999
    const password = `${fromFirstName}@office`;

    try {
      // first fetch the steps from step model start
      const stepType = data.program; // Define your stepType here
      const url = "/api/steps"; // Define the URL
      const fullUrl = `${url}?stepType=${stepType}`;
      const responsed = await fetch(fullUrl);

      if (!responsed.ok) {
        throw new Error("Network responsed was not ok");
      }
      const data2 = await responsed.json();
      const updatedData = data2.map((user) => ({
        ...user,
        id: user._id,
      }));

      setStepData(data2[0]?.nextSteps);
      const UpdatedSteps = [...data2[0]?.nextSteps];

      const response = await fetch("/api/office", {
        method: "POST",
        body: JSON.stringify({
          officeId: data.officeId,
          officeName: data.officeName,
          password: password,
          location: data.location,
          items: data.items,
          type: stepType,
          status: "active",
        }),
      });

      if (response.ok) {
        const insertIndex = UpdatedSteps.length - 1;

        // Insert data.officeName at the specified index
        UpdatedSteps.splice(insertIndex, 0, data.officeName);
        console.log("data.officeName", data.officeName);

        const response = await fetch(`/api/steps`, {
          method: "POST",
          body: JSON.stringify({
            key: data.officeName,
            value: [],
            stepType: stepType,
          }),
        });

        // Check if step insertion was successful
        if (response.ok) {
          toast.success("Office and Steps registered Successfully!");
        } else {
          toast.error("Steps Not registered Successfully!");
        }
      }
    } catch (error) {
      toast.error("Office Not registered Successfully!");
      console.log(error);
    }

    reset();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 dark:bg-boxdark md:py-15 md:px-8.5">
      <h3 className="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
        Register Office
      </h3>
      <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="emailAddress"
          >
            Office Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="officeName"
              id="officeName"
              placeholder="Office name"
              {...register("officeName")}
            />
          </div>
          <p>{errors.officeName?.message}</p>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              Office ID
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="officeId"
              id="officeId"
              placeholder="Office id"
              {...register("officeId")}
            />
            <p>{errors.officeId?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Location
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="location"
                id="location"
                placeholder="B-00"
                {...register("location")}
              />
            </div>
          </div>
        </div>
        <div className="mb-5.5">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="Username"
          >
            Items to be checked
          </label>
          <textarea
            className="w-full cols rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="items"
            id="items"
            placeholder="Write items to be checked here ..."
            cols={40}
            rows={4}
            {...register("items")}
          />
        </div>

        {/* Choose the step type (updated) */}
        <div className="relative ">
          <label className=" block text-sm font-medium text-black dark:text-white">
            Choose the step type
          </label>
          <div className="grid grid-cols-4">
            {programs.map((item) => (
              <div key={item} className="flex pt-4 min-w-47.5">
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center">
                  <input
                    className="text-primary"
                    type="radio"
                    name="program"
                    id={`program${item}`}
                    value={item}
                    {...register("program")}
                  />
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary dark:text-gray">
                    {item}
                  </p>
                </div>
              </div>
            ))} 
          </div>
        </div>

        <div className="-mx-3 mt-10 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>

          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={handleCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterOffice;
