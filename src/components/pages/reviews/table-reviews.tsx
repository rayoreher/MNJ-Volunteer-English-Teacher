// import { DataTable } from "@/components/ui/data-table";
// import { ColumnDef } from "@tanstack/react-table";
// import withAuth from "@/hooks/with-auth";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase-client";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import VolunteerDetails from "@/components/VolunteerDetails";
// import { Volunteer } from "@/types/volunteer.types";
// import { Review } from "@/types/review.types";

// export const columns: ColumnDef<Review>[] = [
//   {
//     accessorKey: "fullname",
//     header: "Fullname",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "age",
//     header: "Age",
//   },
//   {
//     accessorKey: "nationality",
//     header: "Nationality",
//   },
//   {
//     accessorKey: "",
//     header: "Details",
//     cell: ({ row }) => (
//       <Dialog>
//         <DialogTrigger>Show Details</DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{row.original.fullname}</DialogTitle>
//             <DialogDescription>

//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     ),
//   },
// ];

// interface TableReviewsComponentProps {
//   data: Review[];
// }

// export default function TableReviewsComponent({ data }: TableReviewsComponentProps) {
//   return (
//       <DataTable columns={columns} data={data} key="id" />
//   );
// };
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//     <Card key={1} className="flex flex-col h-full">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-2xl text-lime-700">
//             {"review.title"}
//           </CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <p className="text-lime-900 mb-4">{"review.description"}</p>
//       </CardContent>
//     </Card>
//     <Card key={11} className="flex flex-col h-full">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-2xl text-lime-700">
//             {"review.title"}
//           </CardTitle>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <p className="text-lime-900 mb-4">{"review.description"}</p>
//       </CardContent>
//     </Card>
//   </div>
import { Review } from "@/types/review.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableReviewsComponentProps {
  data: Review[];
}

export default function TableReviewsComponent({
  data = [],
}: TableReviewsComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.map((review) => (
            <Card key={review.id} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-lime-700">
                  {review.fullname}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lime-900 mb-4">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
