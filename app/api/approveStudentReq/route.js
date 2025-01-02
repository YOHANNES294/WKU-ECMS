import { connectToDB } from "@/utils/database";
import StaffClearanceReq from "@/models/staffClearanceRequest"; // Replace with the appropriate model
import History from "@/models/history";
import DynamicSteps from "@/models/DynamicSteps";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PATCH = async (request) => {
  const session = await getServerSession(authOptions);
  const privilege = session?.user?.privilege;

  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();

    const staffType = "STAFF"; // Changed from "STUDENT" to "STAFF" or another relevant type

    // Fetch dynamic steps for the staff type
    const requests = await DynamicSteps.find({ stepType: staffType });

    let staffSteps = {};
    requests.forEach((data) => {
      staffSteps[data.name] = data.nextSteps;
    });

    const existingRequest = await StaffClearanceReq.findById(objectId); // Use the appropriate model

    if (existingRequest) {
      const currentStatus = existingRequest.status;
      const nextApprovers = staffSteps[privilege];
      const approvalTime = new Date(); // Get the current time for approval

      if (!existingRequest.approvals) {
        existingRequest.approvals = []; // Initialize approvals array if it doesn't exist
      }

      if (Array.isArray(currentStatus) && currentStatus.length > 1) {
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
        if (currentStatus.indexOf(nextApprovers[0]) == -1) {
          currentStatus.push(nextApprovers[0]);
        }
        const newStatus = currentStatus.filter((item) => item !== privilege);
        existingRequest.status = newStatus;
      } else if (nextApprovers && nextApprovers.length == 1) {
        existingRequest.status = nextApprovers[0];
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
      } else if (nextApprovers && nextApprovers.length > 1) {
        existingRequest.status = nextApprovers;
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
      }

      await existingRequest.save();

      // Create new document in History collection if status is APPROVED
      if (existingRequest.status.includes("APPROVED")) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        });

        const clearanceReq = new History({
          userId: existingRequest.userId,
          firstname: existingRequest.firstname,
          middlename: existingRequest.middlename,
          reason: existingRequest.reason,
          status: "APPROVED",
          role: existingRequest.role,
          dateApproved: formattedDate,
          dateRequested: existingRequest.dateRequested,
          clearanceId: existingRequest._id,
        });
        await clearanceReq.save();
      }

      return new Response(`Approved successfully ${arrLength} requests`, {
        status: 201,
      });
    } else {
      return new Response("Request not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to update the request status", { status: 500 });
  }
};