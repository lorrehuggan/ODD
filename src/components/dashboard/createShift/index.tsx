import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { TimeInput, DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateShiftSchemaType } from "../../../utils/ZodSchema/shift";
import { trpc } from "../../../utils/trpc";
import { NumberInput } from "@mantine/core";
import currency from "currency.js";

interface Props {
  companyID: string;
}

type _CreateShiftSchemaType = Omit<CreateShiftSchemaType, "companyID">;

// typed function that takes two date arguments to test if the first date is after the second date
const isAfter = (date1: Date, date2: Date) => {
  return dayjs(date1).isAfter(date2);
};

const CreateShift = ({ companyID }: Props) => {
  return (
    <div className="dashboard-container">
      <div className="flex items-center justify-between rounded bg-base-dark-200 p-2">
        <span className="text-sm">Add Shift</span>
        <CreateShiftForm companyID={companyID} />
      </div>
    </div>
  );
  ("");
};

export default CreateShift;

const CreateShiftForm = ({ companyID }: Props) => {
  const now = new Date();
  const then = dayjs(now).subtract(8, "hours").toDate();
  const [open, setOpen] = useState(false);
  const utils = trpc.useContext();
  //TODO mutation
  const createShift = trpc.shift.create.useMutation({
    onSuccess: () => {
      utils.shift.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<_CreateShiftSchemaType>({
    resolver: zodResolver(
      z.object({
        start: z.date(),
        end: z.date(),
        date: z.date(),
        earnings: z.number(),
        companyID: z.string().optional(),
      })
    ),
  });

  const onSubmit = async (data: _CreateShiftSchemaType, e: any) => {
    e.preventDefault();
    try {
      // convert earnings to cents
      const earnings = currency(data.earnings).intValue;
      console.log(earnings);
      // create shift
      await createShift.mutateAsync({
        ...data,
        companyId: companyID,
        earnings,
      });

      if (!createShift.isLoading) {
        setOpen(false);
        reset();
      }
    } catch (e: any) {}
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e)}>
      <Dialog.Trigger asChild>
        <button className="flex items-center">
          <PlusIcon className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-fade bg-base-dark/60 backdrop-blur-sm" />
        <Dialog.Content className="dashboard-container fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform animate-fade rounded bg-base-light p-4 text-base-dark-300 shadow-md">
          <Dialog.Title asChild>
            <h4 className="font text-lg font-bold">Create New Shift</h4>
          </Dialog.Title>
          <Dialog.Description asChild className="mb-4 text-base-dark-400">
            <p className="text-sm">Enter details to create new shift</p>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="absolute top-5 right-4">
              <XMarkIcon className="color-trans h-5 w-5 md:hover:text-error" />
            </button>
          </Dialog.Close>
          {/* Create shift form */}
          <form
            className="space-y-2"
            onSubmit={handleSubmit((data, e) => {
              onSubmit(data, e);
            })}
          >
            <fieldset className="flex items-center gap-5">
              <label className="w-16 text-right text-sm" htmlFor="time">
                Start-End:
              </label>
              <div className="flex gap-8">
                <Controller
                  name="start"
                  defaultValue={then}
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TimeInput
                      icon={<ClockIcon className="w-5s h-5" />}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                <Controller
                  name="end"
                  defaultValue={now}
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TimeInput
                      icon={<ClockIcon className="h-5 w-5 rotate-180" />}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
              </div>
            </fieldset>
            <fieldset className="flex items-center gap-5">
              <label className="w-16 text-right text-sm" htmlFor="date">
                Date:
              </label>
              <Controller
                defaultValue={now}
                name="date"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <DatePicker
                    icon={<CalendarDaysIcon className="h-5 w-5" />}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </fieldset>
            <fieldset className=" flex items-center gap-5">
              <label className="w-16 text-right text-sm" htmlFor="earnings">
                Earnings:
              </label>
              <Controller
                defaultValue={0.5}
                name="earnings"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <NumberInput
                    icon={<CurrencyDollarIcon className="h-5 w-5" />}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    step={0.25}
                    precision={2}
                    stepHoldDelay={500}
                    stepHoldInterval={100}
                    min={0.25}
                    max={100000}
                  />
                )}
              />
            </fieldset>
            <div className="flex items-center justify-end gap-2 pt-8">
              <div className="flex w-full justify-end gap-2">
                <Dialog.Close asChild>
                  <button className="color-trans rounded py-1 px-3 text-sm text-base-dark-400 active:bg-base-dark-400 active:text-white">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="color-trans flex items-center gap-1 rounded bg-primary py-1 px-3 text-sm text-base-light active:bg-primary-dark"
                >
                  {createShift.isLoading ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )}
                  Add Shift
                </button>
              </div>
            </div>
          </form>
          <pre className="text-xs">{JSON.stringify(errors, null, 2)}</pre>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
