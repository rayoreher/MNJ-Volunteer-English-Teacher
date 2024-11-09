import { Tables } from "./database.types";

export type Volunteer = Tables<'volunteers'>;
export type VolunteerStatus = Volunteer["status"];