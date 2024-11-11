import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { Review, ReviewStatus } from "@/types/review.types";
import { useState } from "react";
interface ReviewDetailsProps {
  review: Review;
  isFetching: boolean;
  onSaveClicked: (review: Review, newStatus: ReviewStatus) => Promise<void>;
}
export default function ReviewDetails({review, isFetching, onSaveClicked }: ReviewDetailsProps) {
  const [newStatus, setNewStatus] = useState(review.status);
  return (
    <Card key={review.id} className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-gray-900">
            {review.fullname}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-800 mb-4">{review.comment}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Status:</div>
          <Select
            defaultValue={review.status}
            onValueChange={(evt: ReviewStatus) => setNewStatus(evt)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex pt-4 justify-end">
          <Button
            type="submit"
            className="bg-lime-600 hover:bg-lime-700"
            onClick={(evt) => {
              evt.preventDefault();
              onSaveClicked(review, newStatus);
            }}
            disabled={review.status === newStatus || isFetching}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
