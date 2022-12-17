import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@utils/trpc";
import FormInput from "./FormInput";
import { createCompanySchema } from "@utils/ZodSchema/company";

interface Props {
  isLoading: boolean;
}

type companyFormSchemaType = z.infer<typeof createCompanySchema>;

const CreateCompanyForm = ({ isLoading }: Props) => {
  const utils = trpc.useContext();
  const createCompany = trpc.company.create.useMutation({
    // invalidates the query when the mutation is successful
    onSuccess: () => {
      utils.company.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<companyFormSchemaType>({
    resolver: zodResolver(createCompanySchema),
  });
  const onSubmit = (data: companyFormSchemaType) =>
    createCompany.mutateAsync(data);

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center">
      <div className="dashboard-container sm:w-[340px]">
        <h2 className="mb-4 text-center text-3xl">Create Company</h2>
        <p className="text-center text-sm text-base-light/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          doloremque aspernatur ad voluptate quae ipsum temporibus sint? Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Eos voluptates ea.
        </p>
        <div className="mt-4">
          <form
            aria-label="Create Company Form"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
            className="flex flex-col gap-2 rounded"
          >
            <FormInput
              name="name"
              register={{ ...register("name") }}
              placeholder="Oddity"
              error={errors.name?.message}
            />
            <FormInput
              name="role"
              register={{ ...register("role") }}
              placeholder="Manager"
              error={errors.role?.message}
            />

            <button
              aria-label="Create company submit button "
              className="flex w-full items-center justify-center rounded bg-primary py-2 pr-2 transition-colors hover:bg-secondary"
            >
              <ArrowSmallRightIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCompanyForm;
