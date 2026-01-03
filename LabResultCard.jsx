import { FileText, TestTube, Edit, Trash2 } from 'lucide-react';

function LabResultCard({ record, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lab result?')) {
      onDelete(record.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <TestTube className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold text-gray-800">{record.hospital_name}</h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {new Date(record.lab_result_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <button
            onClick={() => onEdit(record)}
            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition"
            title="Edit lab result"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
            title="Delete lab result"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <p className="text-gray-700">
          <span className="font-medium">Doctor:</span> {record.doctor_name}
        </p>
        {record.report && (
          <p className="text-gray-700">
            <span className="font-medium">Report:</span> {record.report}
          </p>
        )}
        {record.instructions && (
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Instructions:</span> {record.instructions}
          </p>
        )}
      </div>

      {record.report_path && (
        <a
          href={`http://localhost:5000/${record.report_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <FileText className="w-4 h-4" />
          <span>View Lab Report</span>
        </a>
      )}
      
      {!record.report_path && (
        <p className="text-red-500 text-sm">No lab report uploaded</p>
      )}
    </div>
  );
}

export default LabResultCard;