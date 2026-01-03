import { useState } from 'react';
import { FileText, Image as ImageIcon, Edit, Trash2 } from 'lucide-react';

function MedicalRecordCard({ record, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const hasLongContent =
    (record.description && record.description.length > 10) ||
    (record.details && record.details.length > 15);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this medical record?')) {
      onDelete(record.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-200">
        <h4 className="font-semibold text-black-800">
          {record.record_type}
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {new Date(record.record_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <button
            onClick={() => onEdit(record)}
            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition"
            title="Edit record"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
            title="Delete record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-black-700">
        <span className="font-medium">Doctor : </span> {record.doctor_name}
      </p>

      {record.description && (
        <p className="text-black-700 mb-1">
          <span className="font-medium">Description : </span>
          {expanded || !hasLongContent
            ? record.description
            : `${record.description.substring(0, 10)}...`}
        </p>
      )}

      {record.details && (
        <p className="text-black bold-600 mb-3">
          <span className="font-medium">Details : </span>
          {expanded || !hasLongContent
            ? record.details
            : `${record.details.substring(0, 15)}...`}
        </p>
      )}

      {/**/}

      <div className="flex space-x-4 mt-3">
        {record.softcopy_path && (
          <a
            href={`http://localhost:5000/${record.softcopy_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            <FileText className="w-4 h-4" />
            <span>View Report</span>
          </a>
        )}

        {record.prescription_path && (
          <a
            href={`http://localhost:5000/${record.prescription_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm"
          >
            <ImageIcon className="w-4 h-4" />
            <span>View Prescription</span>
          </a>
        )}
      </div>
      {hasLongContent && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default MedicalRecordCard;