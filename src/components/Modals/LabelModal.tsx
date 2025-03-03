import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Trash2 } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';

interface LabelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LabelModal: React.FC<LabelModalProps> = ({ isOpen, onClose }) => {
  const { labels, addLabel, deleteLabel } = useCalendar();
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#3B82F6');
  
  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      addLabel(newLabelName.trim(), newLabelColor);
      setNewLabelName('');
      setNewLabelColor('#3B82F6');
    }
  };
  
  const handleDeleteLabel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this label?')) {
      deleteLabel(id);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-start">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Manage Labels
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Add new label form */}
          <form onSubmit={handleAddLabel} className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="New label name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <input
                type="color"
                value={newLabelColor}
                onChange={(e) => setNewLabelColor(e.target.value)}
                className="h-9 w-9 p-0 border-0 rounded-md cursor-pointer"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>
          
          {/* Label list */}
          <div className="mt-6 max-h-60 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {labels.map(label => (
                <li key={label.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: label.color }}
                    />
                    <span 
                      className="text-sm font-medium px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${label.color}33`,
                        color: label.color
                      }}
                    >
                      {label.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLabel(label.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {labels.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No labels added yet
            </p>
          )}
          
          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LabelModal;