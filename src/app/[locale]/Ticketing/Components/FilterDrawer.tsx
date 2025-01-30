import { Dialog } from "@headlessui/react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Filter } from "lucide-react";
import { useState } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, setIsOpen }) => {
  const [transitioning, setTransitioning] = useState(false);

  const closeDialog = () => {
    setTransitioning(true); // Start transition
    setTimeout(() => {
      setIsOpen(false); // Close after transition
    }, 300); // Match duration of the CSS transition
  };
  const [filters, setFilters] = useState({
    assignedBy: [],
    assignee: [],
    priority: [],
    status: [],
    createdAtMin: "",
    createdAtMax: "",
  });

  const users = [
    { name: "User 1", code: "User1" },
    { name: "User 2", code: "User2" },
    { name: "User 3", code: "User3" },
  ];

  const assignees = [
    { name: "User A", code: "UserA" },
    { name: "User B", code: "UserB" },
    { name: "User C", code: "UserC" },
  ];

  const priorities = ["High", "Medium", "Low"];

  const statuses = ["Pending", "In Progress", "Completed"];

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 w-full h-full transition-opacity duration-300 ease-in-out"
    >
      {/* Drawer Panel */}
      <Dialog.Panel
        className={`bg-white p-6 h-full fixed right-0 top-0 shadow-lg w-1/3 max-w-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Modal Header */}
        <Dialog.Title className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Filter className="text-[#FACC15]" size={24} />
          Advanced Filters
        </Dialog.Title>

        {/* Assigned By (MultiSelect) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Assigned By</label>
          <MultiSelect
            value={filters.assignedBy}
            options={users}
            onChange={(e) => setFilters({ ...filters, assignedBy: e.value })}
            optionLabel="name"
            placeholder="Select Assigned By"
            className="w-full mt-2"
            display="chip"
            panelClassName="bg-white shadow-lg border border-gray-300 rounded-md"
          />
        </div>

        {/* Assignee (MultiSelect) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Assignee</label>
          <MultiSelect
            value={filters.assignee}
            options={assignees}
            onChange={(e) => setFilters({ ...filters, assignee: e.value })}
            optionLabel="name"
            placeholder="Select Assignee"
            className="w-full mt-2"
            display="chip"
            panelClassName="bg-white shadow-lg border border-gray-300 rounded-md"

          />
        </div>

        {/* Priority (Checkboxes) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {priorities.map((priority) => (
              <div key={priority} className="flex items-center gap-2">
                <Checkbox
                  inputId={priority}
                  value={priority}
                  onChange={(e) => {
                    const newPriorities = filters.priority.includes(e.value)
                      ? filters.priority.filter((p) => p !== e.value)
                      : [...filters.priority, e.value];
                    setFilters({ ...filters, priority: newPriorities });
                  }}
                  checked={filters.priority.includes(priority)}
                />
                <label htmlFor={priority}>{priority}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Status (Dropdown) */}
        <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700">Status</label>
  <div className="flex flex-wrap gap-3 mt-2">
    {statuses.map((status) => (
      <div key={status} className="flex items-center gap-2">
        <Checkbox
          inputId={status}
          value={status}
          onChange={(e) => {
            const newStatuses = filters.status.includes(e.value)
              ? filters.status.filter((s) => s !== e.value)
              : [...filters.status, e.value];
            setFilters({ ...filters, status: newStatuses });
          }}
          checked={filters.status.includes(status)}
        />
        <label htmlFor={status}>{status}</label>
      </div>
    ))}
  </div>
</div>


        {/* Created At (Min & Max Date) */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <div className="flex gap-3 mt-2">
            <input
              type="date"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#FACC15] focus:outline-none shadow-sm"
              onChange={(e) => setFilters({ ...filters, createdAtMin: e.target.value })}
            />
            <input
              type="date"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#FACC15] focus:outline-none shadow-sm"
              onChange={(e) => setFilters({ ...filters, createdAtMax: e.target.value })}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <Button
            label="Cancel"
            className="p-button-secondary"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label="Apply Filters"
            className="p-button-warning"
            onClick={() => {
              console.log(filters);
              closeDialog();
            }}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default FilterDrawer;
