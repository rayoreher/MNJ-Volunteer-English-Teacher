import { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { hCaptchaSiteKey } from "@/lib/variables";
import { useToast } from "@/hooks/use-toast";
import {
  reviewFormSchema,
  ReviewFormType,
} from "@/lib/schemas/review-form.schema";
import { useReviewFormRequest } from "@/hooks/review-form.request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Home() {
  const { toast } = useToast();
  const { isLoading, sendRequest } = useReviewFormRequest();
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
      hcaptchaRef.current?.resetCaptcha();
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
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardDescription>
                    Share your experience with our Volunteer Teaching Project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lime-700">
                              Full Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="border-lime-300 focus:border-lime-500"
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lime-700">
                              Review *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please leave a review about your experience."
                                className="border-lime-300 focus:border-lime-500 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        {form.control.getFieldState("token").invalid ? (
                          <FormLabel className="text-red-600">
                            Captcha Verification *
                          </FormLabel>
                        ) : (
                          <FormLabel className="text-lime-700">
                            Captcha Verification *
                          </FormLabel>
                        )}
                        <HCaptcha
                          sitekey={hCaptchaSiteKey!}
                          onVerify={onCaptchaVerify}
                          onExpire={onCaptchaExpire}
                          ref={hcaptchaRef}
                        />
                        {form.control.getFieldState("token").invalid && (
                          <FormLabel className="text-red-600">
                            Solve captcha required
                          </FormLabel>
                        )}
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="bg-lime-600 hover:bg-lime-700"
                          disabled={isLoading}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default Home;
