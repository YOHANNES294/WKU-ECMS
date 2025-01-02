import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (request, { params }) => {
  try {
    // Get the user session
    // const session = await getServerSession();
    // console.log("session from studentApproval", session?.user?.privilege);
    // console.log("userId lemn gn", params.id)
    await connectToDB();
    const users = await User.findOne({ _id: params.id });
    // console.log("users ", users)
    // console.log("ojjbshvcxcgzxcvg",users);
    // Return a success response with the users data
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return an error response
    return new Response("Failed to fetch users", { status: 500 });
  }
};




// const fetchStudent=await User.find({ userId: userId });
// console.log("fetchStudent for dorm",privilege);


// const requests =collegeName && departmentName
//     ?await StudentClearnceReq.find({ status: privilege, collegeName: collegeName, departmentName: departmentName})
//     : collegeName
//     ? await StudentClearnceReq.find({ status: privilege, collegeName: collegeName })
//     :privilege=="Dormitory"
//     ? await StudentClearnceReq.find({ status: privilege,blockNo: fetchStudent[0].blockNo})
//     : await StudentClearnceReq.find({ status: privilege });
//     console.log("requests ",requests); const fetchStudent=await User.find({ userId: userId });
// console.log("fetchStudent for dorm",privilege);


