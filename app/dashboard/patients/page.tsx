'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Upload, Eye, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { DataTable } from '@/components/dashboard/DataTable';

interface Patient {
  _id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  contactNumber: string;
  email?: string;
  address?: string;
  medicalHistory?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }
      const user = JSON.parse(userData);

      const response = await fetch(`/api/patients?uploadedBy=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setPatients(data.patients);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading patients:', error);
      setIsLoading(false);
    }
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleUploadImages = (patientId: string) => {
    router.push(`/dashboard/upload?patientId=${patientId}`);
  };

  const tableColumns = [
    { key: 'patientId', label: 'Patient ID' },
    {
      key: 'name',
      label: 'Name',
      render: (_: any, row: Patient) => `${row.firstName} ${row.lastName}`,
    },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => <StatusBadge status={value as any} />,
    },
    {
      key: 'createdAt',
      label: 'Registered',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Patients"
          description="View and manage all registered patients"
        />
        <Card>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading patients...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="View and manage all registered patients"
      />

      {showPatientDetails && selectedPatient ? (
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Patient Details
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowPatientDetails(false);
                  setSelectedPatient(null);
                }}
              >
                ← Back to List
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPatient.patientId}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="text-lg text-gray-900">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-lg text-gray-900">{selectedPatient.gender}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact Number</p>
                    <p className="text-lg text-gray-900">{selectedPatient.contactNumber}</p>
                  </div>
                </div>
                {selectedPatient.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg text-gray-900">{selectedPatient.email}</p>
                    </div>
                  </div>
                )}
                {selectedPatient.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-lg text-gray-900">{selectedPatient.address}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registered Date</p>
                    <p className="text-lg text-gray-900">
                      {new Date(selectedPatient.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {selectedPatient.medicalHistory && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Medical History</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                  {selectedPatient.medicalHistory}
                </p>
              </div>
            )}

            {selectedPatient.notes && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                  {selectedPatient.notes}
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t">
              <Button
                variant="primary"
                onClick={() => handleUploadImages(selectedPatient._id)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload MRI Images
              </Button>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Status:</p>
                <StatusBadge status={selectedPatient.status as any} />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {patients.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Patients Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by registering a new patient and uploading their MRI images
                </p>
                <Button
                  variant="primary"
                  onClick={() => router.push('/dashboard/upload')}
                >
                  Register New Patient
                </Button>
              </div>
            </Card>
          ) : (
            <Card title={`All Patients (${patients.length})`}>
              <DataTable
                columns={tableColumns}
                data={patients.map(p => ({ ...p, name: `${p.firstName} ${p.lastName}`, id: p._id }))}
                actionButton={{
                  label: 'View Details',
                  onClick: (row: any) => {
                    const patient = patients.find(p => p._id === (row.id || row._id));
                    if (patient) handleViewDetails(patient);
                  },
                }}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}
