import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useToast } from "@/hooks/use-toast";
import {
  reviewFormSchema,
  ReviewFormType,
} from "@/lib/schemas/review-form.schema";
import { useReviewFormRequest } from "@/hooks/requests/review-form.request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase-client";
import { Review } from "@/types/review.types";
import CreateReviewComponent from "@/components/pages/reviews/create-review";

export function Home() {
  const [data, setData] = useState<Review[]>([]);
  const { toast } = useToast();
  const { isLoading, sendRequest } = useReviewFormRequest();
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      setData(data || []);
    };

    getSession();
  }, []);
  const hcaptchaRef = useRef<HCaptcha | null>(null);
  const form = useForm<ReviewFormType>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      fullname: "",
      comment: "",
      token: "",
    },
  });
  async function onSubmit(values: ReviewFormType) {
    const result = await sendRequest(values);

    if (result?.success) {
      toast({
        description: "Reques sended successfully.",
        duration: 3000,
        className: "bg-white text-lime-800 text-xl font-semibold border-0",
      });
      form.reset();
      form.clearErrors();
    } else {
      toast({
        variant: "destructive",
        duration: 3000,
        description: "There was a problem with your request.",
        className: "text-xl font-semibold",
      });
    }

    hcaptchaRef.current?.resetCaptcha();
  }

  function onCaptchaVerify(token: string) {
    form.setValue("token", token);
    form.trigger("token");
  }

  function onCaptchaExpire() {
    form.setValue("token", "");
    form.trigger("token");
  }
  return (
    <>
      <Head>
        <title>MNJ Volunteer English Teacher - Vounteer</title>
        <meta
          name="description"
          content="Website for the MNJ Volunteer English Teacher project"
        />
      </Head>
      <div className="min-h-screen bg-lime-50 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white shadow-lg">
            <CardHeader></CardHeader>
            <CardContent>
              <p className="text-lime-900 mb-4">
                Share your experience with The Volunteer Teaching Project! We’d
                love to hear about your time working with the children in Mae
                Najang village. Your feedback helps us improve and inspires
                others to get involved. Thank you for being part of this
                meaningful journey!
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="tab_1" className="w-full mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-lime-100">
              <TabsTrigger
                className="data-[state=active]:bg-lime-500 data-[state=active]:text-white"
                value="tab_1"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-lime-500 data-[state=active]:text-white"
                value="tab_2"
              >
                Leave a Review
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab_1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Card key={1} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl text-lime-700">
                        {"review.title"}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-lime-900 mb-4">{"review.description"}</p>
                  </CardContent>
                </Card>
                <Card key={11} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl text-lime-700">
                        {"review.title"}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-lime-900 mb-4">{"review.description"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tab_2">
              <CreateReviewComponent
                form={form}
                isLoading={isLoading}
                hcaptchaRef={hcaptchaRef}
                onSubmit={onSubmit}
                onCaptchaExpire={onCaptchaExpire}
                onCaptchaVerify={onCaptchaVerify}
              ></CreateReviewComponent>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default Home;
