"use client";
import React, { useState } from "react";
import Image from "next/image";
import { announcement } from "@/validations/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminBreadcrumb from "@/components/Breadcrumb/adminBreadcrumb";
import { toast } from "react-toastify";

const ManageAnnouncement = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(announcement),
  });

  const [selectedImage, setProfilePic] = useState(null);
  const [selectedImageBase64, setImageBase64] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);

      const base64 = await convertToBase64(selectedFile);
      setImageBase64(base64);
      setProfilePic(imageURL);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onSubmit = async (data) => {
    if (data.title && data.description && selectedImageBase64) {
      try {
        const response = await fetch("/api/postAnnouncement", {
          method: "POST",
          body: JSON.stringify({
            userId: data.adminId,
            title: data.title,
            description: data.description,
            image: selectedImageBase64,
          }),
        });

        if (response.ok) {
          toast.success("Announcement posted  Successfully!");
          reset();
          setProfilePic(null); // Reset selected image state
          setImageBase64(null); // Reset selected image base64 state
        } else {
          toast.error(
            "Some Error occured while posting announcements please retry!"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("First fill all the requied before posting!");
    }
  };

  return (
    <div className="col-span-12 xl:col-span-3">
      <AdminBreadcrumb
        title="Post Announcements"
        mainRoute="Admin"
        subRoute="Announcement"
      />
      <div className="rounded-lg p-8 border border-stroke bg-[#1A1A1D] shadow-default dark:border-strokedark dark:bg-[#1A1A1D]">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="mb-5">
          <label
              for="taskImg"
              class="mb-2.5 block font-medium text-[#EFBF04] dark:text-[#EFBF04]"
            >
              Add Image
            </label>
            <div>
              <div
                id="FileUpload"
                class="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
              >
                <input
                  accept="image/*"
                  class="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
                  type="file"
                  {...register("image", { onChange: handleFileChange })}
                />
                {selectedImage && (
                  <Image
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                    src={selectedImage} // Use the selected image URL
                    width={970}
                    height={260}
                    alt="User"
                  />
                )}
                {!selectedImage && (
                  <div class="flex flex-col items-center justify-center space-y-3">
                    <span class="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_75_12841)">
                          <path
                            d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                            fill="#3C50E0"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_75_12841">
                            <rect width="20" height="20" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <p class="text-xs">
                      <span class="text-primary">Click to upload</span> or drag
                      and drop
                    </p>
                  </div>
                )}
                <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                  <label
                    htmlFor="cover"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      // onChange={handleFileChange}
                      // {...register("profilePic")}

                      {...register("image", { onChange: handleFileChange })}
                    />
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    {selectedImage ? <span>Edit</span> : <span>Pic</span>}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <label
              for="taskTitle"
               class="mb-2.5 block font-medium text-[#EFBF04] dark:text-[#EFBF04]"
            >
              Title
            </label>
            <input
              id="taskTitle"
              placeholder="Enter title here..."
              class="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              type="text"
              name="taskTitle"
              {...register("title")}
            />
          </div>
          <div class="mb-5">
            <label
              for="taskDescription"
               class="mb-2.5 block font-medium text-[#EFBF04] dark:text-[#EFBF04]"
            >
              Anouncement Detail
            </label>
            <textarea
              name="taskDescription"
              id="taskDescription"
              cols="30"
              rows="7"
              placeholder="Write announcement detail here..."
              {...register("description")}
              class="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            class="flex w-full items-center justify-center gap-2 rounded bg-[#EFBF04] px-4.5 py-2.5 font-medium text-black hover:bg-opacity-80"
          >
            <svg
              class="fill-current"
              width="30"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_60_9740)">
                <path
                  d="M18.75 9.3125H10.7187V1.25C10.7187 0.875 10.4062 0.53125 10 0.53125C9.625 0.53125 9.28125 0.84375 9.28125 1.25V9.3125H1.25C0.875 9.3125 0.53125 9.625 0.53125 10.0312C0.53125 10.4062 0.84375 10.75 1.25 10.75H9.3125V18.75C9.3125 19.125 9.625 19.4687 10.0312 19.4687C10.4062 19.4687 10.75 19.1562 10.75 18.75V10.7187H18.75C19.125 10.7187 19.4687 10.4062 19.4687 10C19.4687 9.625 19.125 9.3125 18.75 9.3125Z"
                  fill=""
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_60_9740">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAnnouncement;
