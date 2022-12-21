import CreateShift from "../../create";

interface Props {
  companyID: string;
}

const CreateShiftCard = ({ companyID }: Props) => {
  return (
    <div className="dashboard-container">
      <div className="flex items-center justify-between rounded bg-base-dark-200 p-2">
        <span className="text-sm">Add Shift</span>
        <CreateShift companyID={companyID} />
      </div>
    </div>
  );
  ("");
};

export default CreateShiftCard;
