import { MutableRefObject, useEffect, useRef, useState } from "react";
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
import { useForm, UseFormReturn } from "react-hook-form";
import Head from "next/head";
import { hCaptchaSiteKey } from "@/lib/variables";
import { useToast } from "@/hooks/use-toast";
import {
  reviewFormSchema,
  ReviewFormType,
} from "@/lib/schemas/review-form.schema";
import { useReviewFormRequest } from "@/hooks/requests/review-form.request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase-client";
import { Review } from "@/types/review.types";

interface CreateReviewProps {
  form: UseFormReturn<ReviewFormType>;
  isLoading: boolean;
  hcaptchaRef: MutableRefObject<HCaptcha | null>;
  onSubmit: (values: ReviewFormType) => Promise<void>;
  onCaptchaExpire: () => void;
  onCaptchaVerify: (token: string) => void;
}

export default function CreateReviewComponent({
  form,
  isLoading,
  hcaptchaRef,
  onSubmit,
  onCaptchaExpire,
  onCaptchaVerify,
}: CreateReviewProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardDescription>
          Share your experience with our Volunteer Teaching Project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lime-700">Full Name *</FormLabel>
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
                  <FormLabel className="text-lime-700">Review *</FormLabel>
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
  );
}