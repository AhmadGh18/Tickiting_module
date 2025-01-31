// src/components/ManageStatusesModal.tsx
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeManageStatuses } from "../../../../redux/slices/statusSlice";
import { Divider } from "primereact/divider";

const ManageStatusesModal = () => {
  const dispatch = useDispatch();

  const [newStatus, setNewStatus] = useState({ name: "", color: "", visible: false });
  const [statuses, setStatuses] = useState([
    { id: 1, name: "Open", color: "#FF5733", visible: true },
    { id: 2, name: "In Progress", color: "#FFC300", visible: false },
  ]);

  const handleAddNewStatus = () => {
    setStatuses([...statuses, { ...newStatus, id: statuses.length + 1 }]);
    setNewStatus({ name: "", color: "", visible: false });
  };

  const handleEditStatus = (id: number, updatedStatus: { name: string; color: string; visible: boolean }) => {
    setStatuses(
      statuses.map(status => (status.id === id ? { ...status, ...updatedStatus } : status))
    );
  };
  console.log(statuses);

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"></div>
    <Dialog header="Manage Statuses" visible={true} onHide={() => dispatch(closeManageStatuses())} className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto ">
      {/* Add New Status Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Status</h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Status Name"
              value={newStatus.name}
              onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <input
              type="color"
              value={newStatus.color}
              onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newStatus.visible}
              onChange={(e) => setNewStatus({ ...newStatus, visible: e.target.checked })}
              className="w-5 h-5"
            />
            <label className="text-gray-700">Visible</label>
          </div>
          <Button
            label="Add Status"
            onClick={handleAddNewStatus}
            className="w-full mt-4 py-2 px-4 bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
        </div>
      </div>
<Divider />
      {/* Edit Statuses Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Statuses</h3>
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="w-full">
              <input
                type="text"
                value={status.name}
                onChange={(e) => handleEditStatus(status.id, { ...status, name: e.target.value })}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="ml-4">
              <input
                type="color"
                value={status.color}
                onChange={(e) => handleEditStatus(status.id, { ...status, color: e.target.value })}
                className="w-12 h-12 p-0 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={status.visible}
                onChange={(e) => handleEditStatus(status.id, { ...status, visible: e.target.checked })}
                className="w-5 h-5"
              />
              <label className="text-gray-700">Visible</label>
            </div>
            <div className="ml-4">
              <Button
                label="Save Edits"
                onClick={() => handleEditStatus(status.id, { ...status, name: status.name, color: status.color, visible: status.visible })}
                className="w-24 py-2 px-4 bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              
            
            </div>
          </div>
        ))}
      </div>
    </Dialog>
    </>
  );
};

export default ManageStatusesModal;
