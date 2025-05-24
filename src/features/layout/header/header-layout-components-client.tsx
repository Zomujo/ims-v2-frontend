"use client";
import { useState } from "react";
import { ImsButton } from "@/features/shared/components/ims-button";
import { HeadsetIcon } from "lucide-react";
import { DialogComponent } from "@/features/ui/dialog";
import { Button } from "@/features/ui/button";
import { z } from "zod";
import { Form } from "@/features/ui/form";
import HookFormField from "@/features/shared/components/hook-form-filed";
import { Input } from "@/features/ui/input";
import useHookForm from "@/features/shared/hooks/use-hook-form";
import { ImsSelect } from "@/features/shared/components/ims-select";
import { Textarea } from "@/features/ui/textarea";
import { handleRequestState } from "@/lib/utils";
import { addComplaint } from "@/features/shared/actions/complaint.actions";
import { PermissionModules } from "@/features/shared/types/auth-action.types";

const incidentSchema = z.object({
  feature: z.string().min(1, "Feature is required"),
  complaint: z.string().min(10, "Complaint must be at least 10 characters"),
  dateTimeIssueOccured: z.string().datetime(),
  errorMessage: z.string().optional(),
});

export function ReportIncidentButton() {
  const [open, setOpen] = useState(false);

  const featureOptions = [
    {
      label: "Items",
      value: PermissionModules.ITEMS,
    },
    {
      label: "Items Categories",
      value: PermissionModules.ITEMS_CATEGORIES,
    },
    {
      label: "Suppliers",
      value: PermissionModules.SUPPLIERS,
    },
    {
      label: "Reports",
      value: PermissionModules.REPORTS,
    },

    {
      label: "Stock Adjustments",
      value: PermissionModules.STOCK_ADJUSTMENT,
    },
    {
      label: "Departments",
      value: PermissionModules.DEPARTMENTS,
    },
    {
      label: "Departments Requests",
      value: PermissionModules.DEPARTMENT_REQUESTS,
    },
  ];

  const form = useHookForm({
    resolver: incidentSchema,
    defaultValues: {
      feature: "",
      complaint: "",
      dateTimeIssueOccured: new Date().toISOString(),
      errorMessage: "",
    },
  });

  async function onSubmit(incidentComplaint: unknown) {
    const incidentData = incidentComplaint as z.infer<typeof incidentSchema>;
    const res = addComplaint(incidentData);
    handleRequestState({ res, loadingMsg: "Lodging complaint ...." });
    await res;
    form.reset();
    setOpen(false);
  }
  return (
    <DialogComponent
      title="Report an Incident"
      open={open}
      onOpenChange={setOpen}
      dialogTrigger={
        <ImsButton
          color="primary"
          className="cursor-pointer bg-[#FDF4E8] text-[#794716] hover:bg-[#FDF4E8]"
          endIcon={<HeadsetIcon size={24} />}
        >
          Report Incident
        </ImsButton>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <HookFormField
            formControl={form.control}
            name="feature"
            label="Feature"
            renderInput={({ field }) => (
              <ImsSelect
                moduleName="the feature with an issue"
                {...field}
                options={featureOptions}
              />
            )}
          />
          <HookFormField
            formControl={form.control}
            name="dateTimeIssueOccured"
            label="When did it occur?"
            renderInput={({ field }) => (
              <Input
                type="datetime-local"
                {...field}
                value={field.value.substring(0, 16)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  field.onChange(date.toISOString());
                }}
              />
            )}
          />
          <HookFormField
            formControl={form.control}
            name="complaint"
            label="Complaint"
            renderInput={({ field }) => (
              <Textarea
                placeholder="Describe your issue in details..."
                className="min-h-[100px] resize-none"
                {...field}
              />
            )}
          />
          <HookFormField
            formControl={form.control}
            name="errorMessage"
            label="Error Message (Optional)"
            renderInput={({ field }) => (
              <Input
                placeholder="Paste any error message you received"
                {...field}
                value={field.value || ""}
              />
            )}
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#FDF4E8] text-[#794716] hover:bg-[#FDF4E8]/90"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Submit Report
            </Button>
          </div>
        </form>
      </Form>
    </DialogComponent>
  );
}
