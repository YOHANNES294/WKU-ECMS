
import React from 'react'
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { newPasswordSchema } from "@/validations/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import bcrypt from "bcryptjs";
import Link from "next/link";
import { toast } from "react-toastify";
const NewPassword = ({ userData }) => {
    

    // const session = useSession();
    // const Id = session?.user?.id;
    // const userId = session?.user?.userId;
    
   
    const router = useRouter();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(newPasswordSchema),
    });
  
   
    const onSubmit = async (data) => {
        if(data.newPassword===data.confirmPassword){
          const hashedPassword = await bcrypt.hash(data.newPassword, 10);
         
          try {
            const response = await fetch(`/api/user/new/`, {
              method: "PATCH",
              body: JSON.stringify({
                objectId: userData[0]._id,
                userId: userData[0].userId,
                password: hashedPassword,
    
              }),
            });
    
            if (response.ok) {
              toast.success("Password updated Successfully!");
              router.replace("/signIn");
            }
          } catch (error) {
    
            console.log(error);
          }
           
           reset();
         }else{
          toast.error("Password match error!");
    
         }
       
      };
  return (
      <div className="flex items-center justify-center  dark:bg-boxdark-2 dark:text-bodydark">
    <div className=" mt-35 w-1/3 h-1/3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-lg  font-semibold text-primary dark:text-white">
          Reset Password
        </h3>
      </div>

      <div className="p-7">
          {/* <h1>
            Please check your emails for a message with your code. Your code is
            6 numbers long.
          </h1> */}
          {/* <h1> {email}</h1> */}
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Username"
              >
                New Password
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New password"
                {...register("newPassword")}
              />
              <p>{errors.newPassword?.message}</p>
            </div>

            <div className="mb-5.5">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Username"
              >
                Confirm Password
              </label>
              <input
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              <p>{errors.confirmPassword?.message}</p>
            </div>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                type="submit"
              >
                Reset
              </button>
            </div>

            <div className="mt-6 text-right">
              <p>
                <Link href="/signIn" className="text-primary">
                 Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

</div>
    </div>
  )
}

export default NewPassword