import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Panel } from "primereact/panel";



interface FilterData {
  assignedBy: string[];
  assignees: string[];
  priority: string[];
  status: string[];
  dateRange: { min: Date | null; max: Date | null };
}

const FilterDrawer = ({ isOpen, onClose, onApply }: { isOpen: boolean; onClose: () => void; onApply: (filterData: FilterData) => void }) => {


  
  const [formData, setFormData] = useState<FilterData>({
    assignedBy: [],
    assignees: [],
    priority: [],
    status: [],
    dateRange: { min: null, max: null },
  });

  const convertToFormData = (filterData: FilterData): FormData => {
    const formData = new FormData();
  
    // Convert FilterData properties to FormData entries
    formData.append('assignedBy', JSON.stringify(filterData.assignedBy));
    formData.append('assignees', JSON.stringify(filterData.assignees));
    formData.append('priority', JSON.stringify(filterData.priority));
    formData.append('status', JSON.stringify(filterData.status));
    formData.append('dateRange', JSON.stringify(filterData.dateRange));
  
    return formData;
  };
  
  

  const priorities = ["High", "Medium", "Low"];
  const statuses = ["Open", "In Progress", "Closed"];
  const users = ["User1", "User2", "User3"];
  const assignees = ["Assignee1", "Assignee2", "Assignee3"];

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-5 transition-transform ${
        isOpen ? "translate-x-0 z-50" : "translate-x-full"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Advanced Filters</h2>

      {/* Assigned By Filter */}
      <Panel header="Assigned By" toggleable>
        <MultiSelect
          value={formData.assignedBy}
          options={users}
          onChange={(e) => setFormData({ ...formData, assignedBy: e.value })}
          placeholder="Select Assigned By"
          display="chip"
          className="w-full"
          checkboxIcon="none"
          panelClassName="bg-gray-100"
          filter
          filterPlaceholder="Search user..."
          virtualScrollerOptions={{ itemSize: 38 }}
          // Custom Dropdown Items
          itemTemplate={(option) => {
            const isSelected = formData.assignedBy.includes(option);

            return (
              <div
                className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer 
        ${isSelected ? "bg-yellow-200" : "hover:bg-gray-200"}`}
                onClick={() => {
                  const newSelection = isSelected
                    ? formData.assignedBy.filter((user) => user !== option)
                    : [...formData.assignedBy, option];
                  setFormData({ ...formData, assignedBy: newSelection });
                }}
              >
                <span className="text-gray-800 font-medium">{option}</span>
              </div>
            );
          }}
        />
      </Panel>

      {/* Assignees Filter */}
      <Panel header="Assignees" toggleable>
        <MultiSelect
          value={formData.assignees}
          options={assignees}
          onChange={(e) => setFormData({ ...formData, assignees: e.value })}
          placeholder="Select Assignees"
          display="chip"
          className="w-full"
          panelClassName="bg-gray-100"
          checkboxIcon="none"
          filter
          filterPlaceholder="Search assignee..."
          virtualScrollerOptions={{ itemSize: 38 }}
          itemTemplate={(option) => {
            const isSelected = formData.assignees.includes(option);

            return (
              <div
                className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer 
        ${isSelected ? "bg-yellow-200" : "hover:bg-gray-200"}`}
                onClick={() => {
                  const newSelection = isSelected
                    ? formData.assignees.filter((user) => user !== option)
                    : [...formData.assignees, option];
                  setFormData({ ...formData, assignees: newSelection });
                }}
              >
                <span className="text-gray-800 font-medium">{option}</span>
              </div>
            );
          }}
        />
      </Panel>

      {/* Priority Filter */}
      <Panel header="Priority" toggleable>
        {priorities.map((priority) => (
          <div key={priority} className="flex items-center gap-2">
            <Checkbox
              inputId={priority}
              checked={formData.priority.includes(priority)}
              onChange={(e) => {
                const newPriority = e.checked
                  ? [...formData.priority, priority]
                  : formData.priority.filter((p) => p !== priority);
                setFormData({ ...formData, priority: newPriority });
              }}
              icon="none"
            />
            <label htmlFor={priority}>{priority}</label>
          </div>
        ))}
      </Panel>

      {/* Status Filter */}
      <Panel header="Status" toggleable>
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <Checkbox
              inputId={status}
              checked={formData.status.includes(status)}
              onChange={(e) => {
                const newStatus = e.checked
                  ? [...formData.status, status]
                  : formData.status.filter((s) => s !== status);
                setFormData({ ...formData, status: newStatus });
              }}
              icon="none"
            />
            <label htmlFor={status}>{status}</label>
          </div>
        ))}
      </Panel>

      {/* Date Range Filter */}
      <Panel header="Date Range" toggleable>
        <div className="flex gap-2">
          <Calendar
            value={formData.dateRange.min}
            onChange={(e) =>
              setFormData({
                ...formData,
                dateRange: { ...formData.dateRange, min: e.value ? new Date(e.value) : null }, // Convert to Date
              })
            }
            placeholder="Min Date"
            className="w-1/2"
            showIcon
            panelClassName=" bg-gray-100"
          />
          <Calendar
            value={formData.dateRange.max}
            onChange={(e) =>
              setFormData({
                ...formData,
                dateRange: { ...formData.dateRange, max: e.value ? new Date(e.value) : null }, // Convert to Date
              })
            }
            placeholder="Max Date"
            className="w-1/2"
            showIcon
            panelClassName=" bg-gray-100"
          />
        </div>
      </Panel>

      {/* Apply & Close Buttons */}
      <div className="mt-5 flex gap-3">
        <Button
          label="Apply"
          onClick={() => onApply(formData)}
          
          className="w-full bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-10 transition-all duration-300 ease-in-out"
        />
        <Button
          label="Close"
          severity="secondary"
          onClick={onClose}
          className="w-full bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-10 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="mt-5 flex gap-3">
        <Button
          label="Clear All Filters"
          severity="secondary"
          onClick={() =>
            setFormData({
              assignedBy: [],
              assignees: [],
              priority: [],
              status: [],
              dateRange: { min: null, max: null },
            })
          }
          className="w-full bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-10 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};


export default FilterDrawer;
