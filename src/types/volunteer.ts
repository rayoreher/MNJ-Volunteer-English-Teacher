import { Database } from "./database.types";

export type Volunteer = Database["public"]["Tables"]["volunteers"]["Row"];
export type VolunteerStatus = Volunteer["status"];