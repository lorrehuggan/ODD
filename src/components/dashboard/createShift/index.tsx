import { FormEvent, useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { TimeRangeInput, TimeInput, DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShiftSchema } from "../../../utils/ZodSchema/shift";
import { trpc } from "../../../utils/trpc";

interface Props {
  companyID: string;
}

type CreateShiftSchemaType = z.infer<typeof createShiftSchema>;

const CreateShift = ({ companyID }: Props) => {
  return (
    <div className="dashboard-container">
      <div className="flex items-center justify-between rounded bg-base-dark-200 p-2">
        <span className="text-sm">Add Shift</span>
        <DialogMenu companyID={companyID} />
      </div>
    </div>
  );
};

export default CreateShift;

const DialogMenu = ({ companyID }: Props) => {
  const now = new Date();
  const then = dayjs(now).add(30, "minutes").toDate();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<{ start: Date; end: Date }>({
    start: now,
    end: then,
  });
  const [date, setDate] = useState<Date | null>(now);
  const [earnings, setEarnings] = useState<string>("1.00");
  const utils = trpc.useContext();
  const createShift = trpc.shift.create.useMutation({
    onSuccess: () => {
      utils.shift.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateShiftSchemaType>({
    resolver: zodResolver(createShiftSchema),
  });

  const onSubmit = (data: CreateShiftSchemaType, e: any) => {
    e.preventDefault();
    const { earnings, start, end, date } = data;

    //createShift.mutate(shift);
    console.log({ data });
    reset();
    setOpen(false);
  };

  function handleOpenModel(e: boolean) {
    setOpen(e);
  }

  function handleEarnings(e: React.ChangeEvent<HTMLInputElement>) {
    setEarnings(e.target.value);
  }

  return (
    <Dialog.Root onOpenChange={handleOpenModel} open={open}>
      <Dialog.Trigger asChild>
        <button className="flex items-center">
          <PlusIcon className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-fade bg-base-dark/60 backdrop-blur-sm" />
        <Dialog.Content className="dashboard-container fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform animate-fade rounded bg-base-light p-4 shadow-md">
          <Dialog.Title asChild>
            <h4 className="font text-lg font-bold text-base-dark-300">
              Create New Shift
            </h4>
          </Dialog.Title>
          <Dialog.Description asChild className="mb-4 text-base-dark-400">
            <p className="text-sm">Enter details to create new shift</p>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="absolute top-5 right-4">
              <XMarkIcon className="color-trans h-5 w-5 text-base-dark-300 md:hover:text-error" />
            </button>
          </Dialog.Close>
          {/* Create shift form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 space-y-2">
              <fieldset className="flex items-center gap-5">
                <label className="w-16 text-right text-xs text-base-dark-300">
                  Earnings
                </label>
                <div className="flex flex-1 items-center rounded border border-neutral-300 pl-2">
                  <CurrencyDollarIcon className="h-5 w-5 text-neutral-400" />
                  <input
                    {...register("earnings", {
                      setValueAs: (v) => parseInt(v),
                    })}
                    className="flex-1 py-2 pr-1 pl-2 text-sm text-base-dark"
                    placeholder="1.89"
                    type="number"
                    value={earnings}
                    onChange={(e) => handleEarnings(e)}
                    min="0.01"
                    step="0.01"
                    max="10000.00"
                  />
                </div>
                {errors.earnings && (
                  <p className="text-xs text-red-500">
                    {errors.earnings.message}
                  </p>
                )}
              </fieldset>
              <fieldset className="flex items-center gap-5">
                <label className="w-16 text-right text-xs text-base-dark-300">
                  Shift Start
                </label>
                {/* time input */}
                <TimeInput
                  {...register("start")}
                  hoursLabel="Hours"
                  minutesLabel="Minutes"
                  clearable
                  name="start"
                  value={time.start}
                  onChange={(e) => setTime({ ...time, start: e })}
                  icon={<ClockIcon className="h-5 w-5" />}
                />
              </fieldset>
              <fieldset className="flex items-center gap-5">
                <label className="w-16 text-right text-xs text-base-dark-300">
                  Shift End
                </label>
                {/* time input */}
                <TimeInput
                  {...register("end")}
                  hoursLabel="Hours"
                  minutesLabel="Minutes"
                  clearable
                  name="end"
                  value={time.end}
                  onChange={(e) => setTime({ ...time, end: e })}
                  icon={<ClockIcon className="h-5 w-5" />}
                />
              </fieldset>
              <fieldset className="flex items-center gap-5">
                <label className="w-16 text-right text-xs text-base-dark-300">
                  Shift Date
                </label>
                {/* date input */}
                <DatePicker
                  {...register("date")}
                  name="date"
                  placeholder="Pick date"
                  value={date}
                  onChange={setDate}
                  icon={<CalendarDaysIcon className="h-5 w-5" />}
                />
              </fieldset>
              <fieldset className="hidden items-center gap-5">
                <label className="w-16 text-right text-xs text-base-dark-300">
                  Shift Date
                </label>
                {/* date input */}
                <input
                  {...register("companyId")}
                  name="companyId"
                  placeholder="Pick date"
                  value={companyID}
                />
              </fieldset>
            </div>
            <div className="flex w-full justify-end gap-2">
              <Dialog.Close asChild>
                <button className="color-trans rounded py-1 px-3 text-sm text-base-dark-400 active:bg-base-dark-400 active:text-white">
                  Cancel
                </button>
              </Dialog.Close>
              <button className="color-trans flex items-center gap-1 rounded bg-primary py-1 px-3 text-sm active:bg-primary-dark">
                <PlusIcon className="h-4 w-4" />
                Add Shift
              </button>
            </div>
          </form>
          <pre className="text-black">{JSON.stringify(watch(), null, 2)}</pre>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
