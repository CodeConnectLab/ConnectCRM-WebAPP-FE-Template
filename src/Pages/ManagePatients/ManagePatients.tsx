import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { toast } from "react-toastify";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import PatientModal from "./PatientModal";
import { API } from "../../api";
import { END_POINT } from "../../api/UrlProvider";
import MiniLoader from "../../components/CommonUI/Loader/MiniLoader";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import Heading from "../../components/CommonUI/Heading";

interface Patient {
  key: string;
  name: string;
  mobile: string;
  city: string;
  address: string;
  appointmentDate: string;
  doctor: string;
  problem: string;
  avatar?: string;
}

// Dummy data for patients
const dummyPatients: Patient[] = [
  {
    key: "1",
    name: "John Doe",
    mobile: "9876543210",
    city: "New York",
    address: "123 Main St, NY",
    appointmentDate: "2024-02-20T10:30:00",
    doctor: "Dr. Smith",
    problem: "Regular checkup",
    avatar: undefined
  },
  {
    key: "2",
    name: "Jane Smith",
    mobile: "8765432109",
    city: "Los Angeles",
    address: "456 Oak Ave, LA",
    appointmentDate: "2024-02-21T14:15:00",
    doctor: "Dr. Johnson",
    problem: "Fever and cold"
  },
  {
    key: "3",
    name: "Robert Wilson",
    mobile: "7654321098",
    city: "Chicago",
    address: "789 Pine Rd, CH",
    appointmentDate: "2024-02-22T11:00:00",
    doctor: "Dr. Williams",
    problem: "Dental checkup"
  }
];

const ManagePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  const columns = [
    {
      title: "Patient",
      key: "patient",
      render: (record: Patient) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            size={40}
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.mobile}</div>
          </div>
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Appointment",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Patient) => (
        <div className="flex gap-2">
          <Tooltip title="Edit patient">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Delete patient">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(record.key)}
              className="text-red-500"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPatients(dummyPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to fetch patients");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (patientId: string) => {
    setSelectedPatientId(patientId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedPatients = patients.filter(p => p.key !== selectedPatientId);
      setPatients(updatedPatients);
      toast.success("Patient deleted successfully");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (isLoading) {
    return <MiniLoader />;
  }

  return (
    <div className="rounded-lg bg-white p-4 dark:bg-gray-800 dark:text-white">
      <div className="mb-4 flex items-center justify-between">
        <Heading title="Manage Patients" />
        <ButtonDefault
          label="Add New Patient"
          onClick={() => {
            setEditingPatient(null);
            setIsModalOpen(true);
          }}
          variant="primary"
        />
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={patients}
        className="w-full"
      />

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPatient(null);
        }}
        onSubmit={() => {
          setIsModalOpen(false);
          fetchPatients();
        }}
        initialData={editingPatient}
      />

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Patient"
        message="Are you sure you want to delete this patient?"
        type="delete"
      />
    </div>
  );
};

export default ManagePatients;
