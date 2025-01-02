import { connectToDB } from "@/utils/database";
import StaffClearnceReq from "@/models/staffClearanceRequest"; // Use the appropriate model
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PATCH = async (request) => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  try {
    const { objectId, reinitiate } = await request.json();

    await connectToDB();

    // Fetch the existing request for STAFF role only
    const existingRequest = await StaffClearnceReq.findById(objectId);

    if (existingRequest !== null) {
      // Remove the reinitiate value from rejections array
      existingRequest.rejections = existingRequest.rejections.filter(
        (item) => item !== reinitiate
      );

      await existingRequest.save();
      return new Response(JSON.stringify(existingRequest), { status: 201 });
    } else {
      return new Response("Request not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to reinitiate the request", { status: 500 });
  }
};