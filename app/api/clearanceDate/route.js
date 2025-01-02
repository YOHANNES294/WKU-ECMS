import ClearanceDay from "@/models/clearanceDay";
import { connectToDB } from "@/utils/database";


export const PATCH = async (request) => {
 
 
  try {
    const { day } = await request.json();

    await connectToDB();
    const fetchDay = await ClearanceDay.find();
    const objectId = fetchDay[0]._id;
    const updateDays = await ClearanceDay.findByIdAndUpdate(objectId,{day:day} );

    if(updateDays){
      return new Response(JSON.stringify({message: 'Day updated successfully'}), { status: 200 });
    }
    return new Response("Failed to update day", { status: 500 });
    }
    catch (error) {
        console.error("Error updating day:", error);
        return new Response("Failed to update day", {
            status: 500,
        });
        }
}

export const GET = async () => {
  try {
    await connectToDB();
    const fetchDay = await ClearanceDay.find();
    console.log("fetchDay",fetchDay);
    if(fetchDay){
      return new Response(JSON.stringify(fetchDay), { status: 200 });
    }
    return new Response("Failed to fetch day", { status: 500 });
  } catch (error) {
    console.error("Error fetching day:", error);
    return new Response("Failed to fetch day", { status: 500 });
  }
};


// add post method to create clearance day
export const POST = async (request) => {
  const { day } = await request.json();
  console.log("day",day);
  try {
    await connectToDB();
    const newDay = new ClearanceDay({day:day});
    await newDay.save();
    return new Response(`Day created successfully`, { status: 201 });
  } catch (error) {
    console.error("Error creating day:", error);
    return new Response("Failed to create day", { status: 500 });
  }
};