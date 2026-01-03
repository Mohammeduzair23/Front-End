import { Image as ImageIcon, Pill, Edit, Trash2 } from 'lucide-react';

function PrescriptionCard({ record, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      onDelete(record.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <Pill className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-gray-800">
          <p className="text-black-700">
          <span className="font-medium">Medicines:</span> {record.medicine_name}
          </p></h4>         
        </div>       
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {new Date(record.prescription_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <button
            onClick={() => onEdit(record)}
            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition"
            title="Edit prescription"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
            title="Delete prescription"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <p className="text-black-700">
          <span className="font-medium">Hospital Name:</span> {record.hospital}
        </p>
        <p className="text-black-700">
          <span className="font-medium">Doctor:</span> {record.doctor_name}
        </p>
        <p className="text-black-700">
          <span className="font-medium">Dosage:</span> {record.dosage}
        </p>
        <p className="text-black-700">
          <span className="font-medium">Duration:</span> {record.duration}
        </p>
        {record.instructions && (
          <p className="text-black-700 text-sm">
            <span className="font-medium">Instructions:</span> {record.instructions}
          </p>
        )}
        {record.notes && (
          <p className="text-black-700 text-sm">
            <span className="font-medium">Notes:</span> {record.notes}
          </p>
        )}
        <div className="inline-block">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            record.status === 'Active' ? 'bg-green-100 text-green-800' :
            record.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {record.status}
          </span>
        </div>
      </div>

      {record.prescription_image && (
        <a
          href={`http://localhost:5000/${record.prescription_image}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ImageIcon className="w-4 h-4" />
          <span>View Prescription</span>
        </a>
      )}
      
      {!record.prescription_image && (
        <p className="text-red-500 text-sm">No prescription image uploaded</p>
      )}
    </div>
  );
}

export default PrescriptionCard;