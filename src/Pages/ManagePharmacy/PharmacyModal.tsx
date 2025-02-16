import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import InputGroup from "../../components/FormElements/InputGroup";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import FileUploadFillType from "../../components/FormElements/FileUpload/FileUploadFillType";

interface PharmacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
  isLoading: boolean;
}

const PharmacyModal: React.FC<PharmacyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    offer: "",
    quantity: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        mrp: initialData.mrp?.toString() || "",
        offer: initialData.offer?.toString() || "",
        quantity: initialData.quantity?.toString() || "",
        image: null,
      });
    } else {
      setFormData({
        name: "",
        mrp: "",
        offer: "",
        quantity: "",
        image: null,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter medicine name");
      return false;
    }
    if (!formData.mrp || isNaN(Number(formData.mrp)) || Number(formData.mrp) <= 0) {
      toast.error("Please enter a valid MRP");
      return false;
    }
    if (!formData.offer || isNaN(Number(formData.offer)) || Number(formData.offer) < 0 || Number(formData.offer) > 100) {
      toast.error("Please enter a valid offer percentage (0-100)");
      return false;
    }
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      toast.error("Please enter a valid quantity");
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
      title={initialData ? "Edit Medicine" : "Add New Medicine"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="grid grid-cols-1 gap-4">
        <InputGroup
          label="Medicine Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <InputGroup
          label="MRP (₹)"
          name="mrp"
          type="number"
          value={formData.mrp}
          onChange={handleInputChange}
          required
        //   min={0}
        //   step={0.01}
        />
        <InputGroup
          label="Offer (%)"
          name="offer"
          type="number"
          value={formData.offer}
          onChange={handleInputChange}
          required
        //   min={0}
        //   max={100}
        />
        <InputGroup
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        //   min={0}
        />
        <FileUploadFillType
          label="Medicine Picture"
          onChange={handleFileChange}
          accept="image/*"
          tooltipInfo="Supported formats: JPG, PNG. Max size: 2MB"
        />
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

export default PharmacyModal;
