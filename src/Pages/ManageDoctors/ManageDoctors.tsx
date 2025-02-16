import React, { useState, useEffect } from "react";
import { Button, Tooltip, Modal, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import SwitcherTwo from "../../components/FormElements/Switchers/SwitcherTwo";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "../../components/FormElements/InputGroup";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import FileUploadFillType from "../../components/FormElements/FileUpload/FileUploadFillType";

// Specializations list
const SPECIALIZATIONS = [
  { value: "general", label: "General Physician" },
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "neurology", label: "Neurology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "gynecology", label: "Gynecology" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "dentistry", label: "Dentistry" }
];

// Experience options
const EXPERIENCE_OPTIONS = Array.from({ length: 40 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? 'year' : 'years'}`
}));

interface Doctor {
  key: string;
  name: string;
  clinicName: string;
  mobile: string;
  specialization: string;
  experience: number;
  isActive: boolean;
  avatar?: string;
}

const DoctorModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  isLoading 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void; 
  initialData: Doctor | null;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    clinicName: "",
    mobile: "",
    specialization: "",
    experience: "",
    avatar: null as File | null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        clinicName: initialData.clinicName,
        mobile: initialData.mobile,
        specialization: initialData.specialization,
        experience: initialData.experience.toString(),
        avatar: null,
      });
    } else {
      setFormData({
        name: "",
        clinicName: "",
        mobile: "",
        specialization: "",
        experience: "",
        avatar: null,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter doctor's name");
      return false;
    }
    if (!formData.clinicName.trim()) {
      toast.error("Please enter clinic name");
      return false;
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!formData.specialization) {
      toast.error("Please select specialization");
      return false;
    }
    if (!formData.experience) {
      toast.error("Please select years of experience");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <Modal
      title={initialData ? "Edit Doctor" : "Add New Doctor"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="dark:bg-gray-800"
    >
      <div className="p-4 dark:bg-gray-800">
        <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <InputGroup
            label="Doctor Name"
            name="name"
            type="text"
            placeholder="Enter doctor's name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <InputGroup
            label="Clinic Name"
            name="clinicName"
            type="text"
            placeholder="Enter clinic name"
            value={formData.clinicName}
            onChange={handleInputChange}
            required
          />

          <InputGroup
            label="Mobile Number"
            name="mobile"
            type="tel"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleInputChange}
            required
            maxLength={10}
          />

          <SelectGroupOne
            label="Specialization"
            options={SPECIALIZATIONS}
            selectedOption={formData.specialization}
            setSelectedOption={(value) => handleSelectChange("specialization", value)}
            required
          />

          <SelectGroupOne
            label="Experience (years)"
            options={EXPERIENCE_OPTIONS}
            selectedOption={formData.experience}
            setSelectedOption={(value) => handleSelectChange("experience", value)}
            required
          />

          <div className="col-span-2">
            <FileUploadFillType
              label="Profile Picture"
              onChange={handleFileChange}
              accept="image/*"
              tooltipInfo="Supported formats: JPG, PNG. Max size: 2MB"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <ButtonDefault
            label="Cancel"
            variant="outline"
            onClick={onClose}
          />
          <ButtonDefault
            label={initialData ? "Update Doctor" : "Add Doctor"}
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Simulated data for demonstration
  useEffect(() => {
    setDoctors([
      {
        key: "1",
        name: "Dr. John Smith",
        clinicName: "Wellness Clinic",
        mobile: "9876543210",
        specialization: "cardiology",
        experience: 15,
        isActive: true,
        // avatar: "https://xsgames.co/randomusers/avatar.php?g=male"
      },
      {
        key: "2",
        name: "Dr. Sarah Johnson",
        clinicName: "City Health Center",
        mobile: "9876543211",
        specialization: "pediatrics",
        experience: 8,
        isActive: true,
        // avatar: "https://xsgames.co/randomusers/avatar.php?g=female"
      }
    ]);
  }, []);

  const handleAdd = (formData: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDoctor: Doctor = {
        key: Date.now().toString(),
        name: formData.name,
        clinicName: formData.clinicName,
        mobile: formData.mobile,
        specialization: formData.specialization,
        experience: Number(formData.experience),
        isActive: true,
        avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : undefined
      };

      setDoctors(prev => [...prev, newDoctor]);
      setIsModalOpen(false);
      toast.success("Doctor added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdate = (formData: any) => {
    if (!editingDoctor) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setDoctors(prev =>
        prev.map(doc =>
          doc.key === editingDoctor.key
            ? {
                ...doc,
                name: formData.name,
                clinicName: formData.clinicName,
                mobile: formData.mobile,
                specialization: formData.specialization,
                experience: Number(formData.experience),
                avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : doc.avatar
              }
            : doc
        )
      );

      setIsModalOpen(false);
      setEditingDoctor(null);
      toast.success("Doctor updated successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this doctor?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okButtonProps: { className: 'bg-red-500 hover:bg-red-600' },
      onOk: () => {
        setDoctors(prev => prev.filter(doc => doc.key !== key));
        toast.success("Doctor deleted successfully!");
      }
    });
  };

  const handleToggleStatus = (key: string, newStatus: boolean) => {
    setDoctors(prev =>
      prev.map(doc =>
        doc.key === key
          ? { ...doc, isActive: newStatus }
          : doc
      )
    );
    toast.success(`Doctor ${newStatus ? 'activated' : 'deactivated'} successfully!`);
  };

  const columns = [
    {
      title: "Doctor",
      key: "doctor",
      render: (record: Doctor) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            size={40}
            // className="bg-green"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.clinicName}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      render: (spec: string) => 
        SPECIALIZATIONS.find(s => s.value === spec)?.label || spec,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      render: (exp: number) => `${exp} years`,
    },
    {
      title: "Active",
      key: "status",
      render: (record: Doctor) => (
        <SwitcherTwo
          id={record.key}
          defaultChecked={record.isActive}
          onChange={handleToggleStatus}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Doctor) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => {
              setEditingDoctor(record);
              setIsModalOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Manage Doctors
        </h2>
        <ButtonDefault
          label="Add New Doctor"
          onClick={() => {
            setEditingDoctor(null);
            setIsModalOpen(true);
          }}
          icon={<UserOutlined />}
        />
      </div>

      <div className="rounded-lg border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <CustomAntdTable
          columns={columns}
          dataSource={doctors}
          pagination={false}
          isLoading={isLoading}
        />
      </div>

      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDoctor(null);
        }}
        onSubmit={editingDoctor ? handleUpdate : handleAdd}
        initialData={editingDoctor}
        isLoading={isLoading}
      />
    </div>
  );
}