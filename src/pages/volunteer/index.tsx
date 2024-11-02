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
import * as z from "zod";
import { supabase } from "@/lib/supabase-client";
import Head from "next/head";
import { variables } from "@/lib/variables";

const formSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 17, {
      message: "Age must be 17 or older",
    }),
    nationality: z.string().min(1, "Nationality is required"),
    email: z.string().email().min(1, "Email is required"),
    token: z.string().min(1, "Captcha is required"),
    startDate: z
      .date({
        required_error: "Start date is required",
      })
      .refine(
        (dateTime) => {
          const date = new Date(
            dateTime.getFullYear(),
            dateTime.getMonth(),
            dateTime.getDate(),
          );
          const today = new Date();
          return (
            date >=
            new Date(today.getFullYear(), today.getMonth(), today.getDate())
          );
        },
        {
          message: "Start date cannot be in the past",
        },
      ),
    endDate: z.date({
      required_error: "End date is required",
    }),
    medicalProblems: z.string(),
    foodAllergies: z.string(),
  })
  .refine(
    (data) => {
      return (
        data.endDate > new Date(data.startDate.getTime() + 24 * 60 * 60 * 1000)
      );
    },
    {
      message: "End date must be at least 1 day after start date",
      path: ["endDate"],
    },
  );

export function Home() {
  const { hCaptchaSiteKey } = variables;
  const hcaptchaRef = useRef<HCaptcha | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      token: "",
      age: "",
      nationality: "",
      startDate: new Date(),
      medicalProblems: "",
      foodAllergies: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.from("volunteers").insert({
      fullname: values.fullname,
      email: values.email,
      age: Number(values.age),
      nationality: values.nationality,
      medical_problems: values.medicalProblems,
      allergies: values.foodAllergies,
      start_date: format(values.startDate, "yyyy-MM-dd"),
      end_date: format(values.endDate, "yyyy-MM-dd"),
      status: "pending",
    });
    if (hcaptchaRef.current) {
      hcaptchaRef.current?.resetCaptcha();
    }
    if (error) {
      console.log(error);
    }

    form.reset();
  }
  const startDate = form.watch("startDate");
  useEffect(() => {
    form.setValue("endDate", null as any);
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
        <meta name="description" content="Website for the MNJ Volunteer English Teacher project" />
      </Head>
      <div className="container mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-lime-50">
          <CardHeader>
            <CardTitle>Volunteer Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          <Card className="bg-lime-50">
            <CardHeader>
              <CardTitle>What are you paying for?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The van to go to the village you have to book by yourself.{" "}
                <a
                  href="https://premprachatransports.com/welcome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-700 hover:underline"
                >
                  Book the ticket from Chiang Mai to Khun Yuam here
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-lime-50">
            <CardHeader>
              <CardTitle>What you will get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free accommodation (stay in the school)</li>
                <li>Food 3 meals a day</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-lime-50">
        <CardHeader>
          <CardTitle>Volunteer Application Form</CardTitle>
          <CardDescription>
            Please fill out all required information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                    <FormLabel>Age *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={17}
                        placeholder="Enter your age"
                        {...field}
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
                    <FormLabel>Nationality *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your nationality" {...field} />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
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
                name="medicalProblems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have any medical problems?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe any medical conditions we should be aware of"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foodAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have any food allergies?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe any food allergies"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Captcha Verification *</FormLabel>
                <HCaptcha
                  sitekey={hCaptchaSiteKey!}
                  onVerify={onCaptchaVerify}
                  onExpire={onCaptchaExpire}
                  ref={hcaptchaRef}
                />
                <FormMessage />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-lime-600 hover:bg-lime-700"
                  disabled={!form.formState.isValid}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
export default Home;