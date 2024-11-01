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
import VolunteerDetails, { Volunteer } from "@/components/VolunteerDetails";

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
  const [data, setData] = useState<Volunteer[]>([]);
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });
      setData(data || []);
    };

    getSession();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} key="id" />
    </div>
  );
};

export default withAuth(AdminDashboard);
