import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import InputGroup from "../../components/FormElements/InputGroup";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import { API } from "../../api";
import TextAreaCustom from "../../components/FormElements/TextArea/TextAreaCustom";
import AntDateTimePicker from "../../components/FormElements/DatePicker/AntDateTimePicker";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData: any;
}

// Dummy data for doctors
const dummyDoctors = [
  { value: "dr_smith", label: "Dr. Smith" },
  { value: "dr_johnson", label: "Dr. Johnson" },
  { value: "dr_williams", label: "Dr. Williams" },
  { value: "dr_brown", label: "Dr. Brown" },
  { value: "dr_davis", label: "Dr. Davis" }
];

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<{ value: string; label: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
    address: "",
    appointmentDate: "",
    doctor: "",
    problem: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        mobile: initialData.mobile || "",
        city: initialData.city || "",
        address: initialData.address || "",
        appointmentDate: initialData.appointmentDate || "",
        doctor: initialData.doctor || "",
        problem: initialData.problem || "",
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        city: "",
        address: "",
        appointmentDate: "",
        doctor: "",
        problem: "",
      });
    }
    fetchDoctors();
  }, [initialData]);

  const fetchDoctors = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setDoctors(dummyDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (_: Date[], dateStr: string) => {
    setFormData((prev) => ({ ...prev, appointmentDate: dateStr }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        initialData ? "Patient updated successfully" : "Patient added successfully"
      );
      onSubmit();
    } catch (error: any) {
      toast.error(error.message || "Failed to save patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={initialData ? "Edit Patient" : "Add New Patient"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="dark:bg-gray-800"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 dark:bg-gray-800">
        <InputGroup
          label="Patient Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <InputGroup
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          required
          maxLength={10}
        />
        <InputGroup
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <SelectGroupOne
          label="Select Doctor"
          options={doctors}
          selectedOption={formData.doctor}
          setSelectedOption={(value) =>
            setFormData((prev) => ({ ...prev, doctor: value }))
          }
          required
        />
        <div className="col-span-1 md:col-span-2">
          <InputGroup
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <AntDateTimePicker
          label="Appointment Date & Time"
          onChange={handleDateChange}
          defaultValue={formData.appointmentDate}
          enableTime
          required
        />
        <div className="col-span-1 md:col-span-2">
          <TextAreaCustom
            label="Patient Problem"
            name="problem"
            value={formData.problem}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, problem: e.target.value }))
            }
            required
            rows={3}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <ButtonDefault
          label="Cancel"
          onClick={onClose}
          variant="secondary"
          customClasses="bg-gray-300"
        />
        <ButtonDefault
          label={isLoading ? "Saving..." : "Save"}
          onClick={handleSubmit}
          variant="primary"
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default PatientModal;
