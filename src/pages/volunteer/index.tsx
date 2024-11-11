import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { hCaptchaSiteKey } from "@/lib/variables";
import { vlunteerFormSchema, VolunteerFormType } from "@/lib/schemas/volunteer-form.schema";
import { useVolunteerFormRequest } from "@/hooks/vounteer-form.request";
import { useToast } from "@/hooks/use-toast";

export function Home() {
  const { toast } = useToast()
  const { isLoading, sendRequest } = useVolunteerFormRequest();
  const hcaptchaRef = useRef<HCaptcha | null>(null);
  const form = useForm<VolunteerFormType>({
    resolver: zodResolver(vlunteerFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      token: "",
      age: "",
      nationality: "",
      start_date: new Date(),
      medical_problems: "",
      allergies: "",
    },
  });
  async function onSubmit(values: VolunteerFormType) {
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

  const startDate = form.watch("start_date");
  useEffect(() => {
    form.setValue("end_date", null as any);
  }, [form, startDate]);
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

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-lime-700">Volunteer Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-lime-900 space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>17 years of age or older</li>
                <li>
                  Ability to communicate in English or full intention to try
                </li>
                <li>Enjoy working with children</li>
                <li>Motivation</li>
                <li>Positive Thinking</li>
                <li>Open Mind</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-lime-700">What are you paying for?</CardTitle>
              </CardHeader>
              <CardContent className="text-lime-900 space-y-4">
                <p>
                  The van to go to the village you have to book by yourself.{" "}
                  Book the ticket from Chiang Mai to Khun Yuam {" "}
                  <a
                    href="https://premprachatransports.com/welcome/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-500 hover:underline"
                  >
                    here
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-lime-700">What you will get</CardTitle>
              </CardHeader>
              <CardContent className="text-lime-900 space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free accommodation (stay in the school)</li>
                  <li>Food 3 meals a day</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-lime-700">Volunteer Application Form</CardTitle>
            <CardDescription>
              Please fill out all required information below
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
                      <FormLabel className="text-lime-700">Full Name *</FormLabel>
                      <FormControl>
                        <Input className="border-lime-300 focus:border-lime-500" placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lime-700">Age *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={17}
                          placeholder="Enter your age"
                          {...field}
                          className="border-lime-300 focus:border-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lime-700">Nationality *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your nationality"
                          {...field}
                          className="border-lime-300 focus:border-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lime-700">Email *</FormLabel>
                      <FormControl>
                        <Input className="border-lime-300 focus:border-lime-500" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-lime-700">Start Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "border-lime-300 focus:border-lime-500 pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(dateTime) => {
                                const date = new Date(
                                  dateTime.getFullYear(),
                                  dateTime.getMonth(),
                                  dateTime.getDate(),
                                );
                                const today = new Date();
                                return (
                                  date <
                                  new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate(),
                                  )
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-lime-700">End Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "border-lime-300 focus:border-lime-500 pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <= (startDate || new Date())
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="medical_problems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lime-700">Do you have any medical problems?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe any medical conditions we should be aware of"
                          className="border-lime-300 focus:border-lime-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lime-700">Do you have any food allergies?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe any food allergies"
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
                    <FormLabel className="text-red-600">Captcha Verification *</FormLabel>
                  ) : (
                    <FormLabel className="text-lime-700">Captcha Verification *</FormLabel>
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
                    Submit Application
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
export default Home;