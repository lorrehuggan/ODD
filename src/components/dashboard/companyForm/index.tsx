import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../../utils/trpc";

interface Props {
  isLoading: boolean;
}

const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters",
    })
    .max(25, {
      message: "Company name must be at most 25 characters",
    }),
});

type companyFormSchemaType = z.infer<typeof companyFormSchema>;

const CompanyForm = ({ isLoading }: Props) => {
  const createCompany = trpc.company.create.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<companyFormSchemaType>({
    resolver: zodResolver(companyFormSchema),
  });
  const onSubmit = (data: companyFormSchemaType) =>
    createCompany.mutateAsync(data, {
      onSuccess: () => {
        console.log("success");
      },
    });

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center">
      <div className="w-[400px]">
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
            className="rounded border border-white/20 p-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <label className="mr-2" htmlFor="companyName">
                  Name :
                </label>
                <input
                  aria-label="Company name form input"
                  {...register("name")}
                  placeholder="Oddity"
                  className="bg-transparent text-white  focus:outline-none"
                />
              </div>
              <button
                aria-label="Create company submit button "
                className="p-2 hover:text-primary"
              >
                <ArrowSmallRightIcon className="h-4 w-4" />
              </button>
            </div>
            {errors.name && (
              <p className="text-sm text-error">{errors.name.message}</p>
            )}
            {createCompany.error && (
              <p className="text-sm text-error">
                {createCompany.error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
