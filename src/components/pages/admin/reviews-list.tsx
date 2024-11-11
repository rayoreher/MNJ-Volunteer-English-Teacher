import { Review, ReviewStatus } from "@/types/review.types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VolunteerDetails from "@/components/VolunteerDetails";
import ReviewDetails from "./review-details";
interface TableReviewsComponentProps {
  data: Review[];
  isFetching: boolean;
  onSaveClicked: (review: Review, newStatus: ReviewStatus) => Promise<void>;
}

export default function ReviewListComponent({
  data = [],
  isFetching,
  onSaveClicked,
}: TableReviewsComponentProps) {
  const columns: ColumnDef<Review>[] = [
    {
      accessorKey: "fullname",
      header: "Fullname",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "",
      header: "Details",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger>Show Details</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <ReviewDetails
                  review={row.original}
                  isFetching={isFetching}
                  onSaveClicked={onSaveClicked}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  return (
    <>
      {isFetching ? (
        <p>Loading volunteers...</p>
      ) : (
        <div className="mx-auto">
          <DataTable columns={columns} data={data} key="id" />
        </div>
      )}
    </>
  );
}
