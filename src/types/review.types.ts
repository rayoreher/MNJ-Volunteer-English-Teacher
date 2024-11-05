import { Tables } from "./database.types";

export type Review = Tables<'reviews'>;
export type ReviewStatus = Review["status"];