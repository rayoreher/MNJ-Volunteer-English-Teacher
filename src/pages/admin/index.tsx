import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import withAuth from "@/hooks/with-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VolunteerDetails from "@/components/VolunteerDetails";
import { Volunteer } from "@/types/volunteer.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Review, ReviewStatus } from "@/types/review.types";
import ReviewListComponent from "@/components/pages/admin/reviews-list";
import { toast } from "@/hooks/use-toast";

export const columns: ColumnDef<Volunteer>[] = [
  {
    accessorKey: "fullname",
    header: "Fullname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "",
    header: "Details",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger>Show Details</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{row.original.fullname}</DialogTitle>
            <DialogDescription>
              <VolunteerDetails {...row.original} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
];

const AdminDashboard = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const handleReviewUpdate = async (review: Review, newStatus: ReviewStatus) => {
    setIsFetching(true);
    const { data, error } = await supabase
      .from("reviews")
      .update({ status:  newStatus})
      .eq("id", review.id)
      .select();

    if (error) {
      toast({
        variant: "destructive",
        duration: 3000,
        description: "There was a problem with your request.",
        className: "text-xl font-semibold",
      });
    } else {
      toast({
        description: "Changes saved successfully.",
        duration: 3000,
        className: "bg-white text-lime-800 text-xl font-semibold border-0",
      });
      await getReviews();
    }

    setIsFetching(false);
  };

  useEffect(() => {
    getVolunteers();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  const getVolunteers = async () => {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });
    setVolunteers(data || []);
  };

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(data || []);
  };

  return (
    <Tabs defaultValue="tab_1" className="container w-full mx-auto">
      <TabsList className="w-full bg-lime-100 flex justify-start">
        <TabsTrigger
          className="data-[state=active]:bg-lime-500 data-[state=active]:text-white"
          value="tab_1"
        >
          Volunteers
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-lime-500 data-[state=active]:text-white"
          value="tab_2"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab_1">
        {isFetching ? (
          <p>Loading volunteers...</p>
        ) : (
          <div className="mx-auto">
            <DataTable columns={columns} data={volunteers} key="id" />
          </div>
        )}
      </TabsContent>
      <TabsContent value="tab_2">
        <ReviewListComponent data={reviews} isFetching={isFetching} onSaveClicked={handleReviewUpdate}></ReviewListComponent>
      </TabsContent>
    </Tabs>
  );
};

export default withAuth(AdminDashboard);
