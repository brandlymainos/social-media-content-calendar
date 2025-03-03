import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Trash2 } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose }) => {
  const { clients, addClient, deleteClient } = useCalendar();
  const [newClientName, setNewClientName] = useState('');
  
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName.trim()) {
      addClient(newClientName.trim());
      setNewClientName('');
    }
  };
  
  const handleDeleteClient = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client? All associated events will also be deleted.')) {
      deleteClient(id);
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
              Manage Clients
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
          
          {/* Add new client form */}
          <form onSubmit={handleAddClient} className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="New client name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>
          
          {/* Client list */}
          <div className="mt-6 max-h-60 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {clients.map(client => (
                <li key={client.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: client.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{client.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteClient(client.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {clients.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No clients added yet
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

export default ClientModal;