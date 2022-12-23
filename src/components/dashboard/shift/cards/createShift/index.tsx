import { PlusIcon } from "@heroicons/react/24/outline";
import CreateShift from "../../create";

const CreateShiftCard = () => {
  return (
    <div className="dashboard-container">
      <div className="flex items-center justify-between rounded bg-base-dark-200 p-2">
        <span className="text-sm">Add Shift</span>
        <CreateShift>
          <PlusIcon className="h-4 w-4" />
        </CreateShift>
      </div>
    </div>
  );
  ("");
};

export default CreateShiftCard;
