"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createJobSchema, createJobType } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/types";
import LocationInput from "@/components/ui/LocationInput";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/base/TextEditor";
import { draftToMarkdown } from "markdown-draft-js";

import LoadingButton from "@/components/ui/LoadingButton";
const NewJobForm = () => {
  const form: any = useForm<createJobType>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    trigger,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  return (
    <main className="m-auto max-w-3xl">
      <div className="my-3 space-y-3 text-center">
        <h1 className="text-2xl font-bold capitalize">
          Find your perfect developer
        </h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="mx-2 space-y-3 rounded-lg border p-4">
        <div className="">
          <h2 className="font-semibold">Job Details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onsubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Job Title" {...field} />
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select option
                      </option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg. Google" {...field} />
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.["0"];

                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === "Remote") {
                          trigger("location");
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select option
                      </option>
                      {locationTypes.map((locType) => (
                        <option key={locType} value={locType}>
                          {locType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Location</FormLabel>
                  <FormControl>
                    <LocationInput
                      {...field}
                      placeholder="search for a city"
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage className="text-blue-700" />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex items-center gap-2">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          id="applicationEmail"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" text-blue-700" />
                    </FormItem>
                  )}
                />
                <p>or</p>
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-blue-700" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label onClick={() => setFocus("description")}>
                      Description
                    </Label>
                    <FormControl>
                      <TextEditor
                        {...field}
                        onChange={(draft) =>
                          field.onChange(draftToMarkdown(draft))
                        }
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="salary"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="$100,000" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <LoadingButton loading={isSubmitting}>Submit</LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
};
export default NewJobForm;
