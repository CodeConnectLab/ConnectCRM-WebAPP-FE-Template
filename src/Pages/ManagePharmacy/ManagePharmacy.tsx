import React, { useState, useEffect } from "react";
import { Button, Tooltip, Modal, Avatar, Image } from "antd";
import { EditOutlined, DeleteOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import PharmacyModal from "./PharmacyModal";
import Heading from "../../components/CommonUI/Heading";

interface Medicine {
  key: string;
  name: string;
  mrp: number;
  offer: number;
  quantity: number;
  image?: string;
}

const dummyMedicines: Medicine[] = [
  {
    key: "1",
    name: "Paracetamol",
    mrp: 50.00,
    offer: 10,
    quantity: 100,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/9/340485452/EZ/FJ/BN/80628472/dolo-paracetamol-tablets-500x500.jpg"
  },
  {
    key: "2",
    name: "Aspirin",
    mrp: 75.00,
    offer: 15,
    quantity: 150,
    image: "https://th.bing.com/th/id/OIP.w9prV7VQWCYLusyxM6t7kQHaEE?rs=1&pid=ImgDetMain"
  }
];

export default function ManagePharmacy() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMedicines(dummyMedicines);
    } catch (error) {
      toast.error("Failed to fetch medicines");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (formData: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMedicine: Medicine = {
        key: Date.now().toString(),
        name: formData.name,
        mrp: Number(formData.mrp),
        offer: Number(formData.offer),
        quantity: Number(formData.quantity),
        image: formData.image ? URL.createObjectURL(formData.image) : undefined
      };

      setMedicines(prev => [...prev, newMedicine]);
      setIsModalOpen(false);
      toast.success("Medicine added successfully!");
    } catch (error) {
      toast.error("Failed to add medicine");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!editingMedicine) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMedicines(prev =>
        prev.map(med =>
          med.key === editingMedicine.key
            ? {
                ...med,
                name: formData.name,
                mrp: Number(formData.mrp),
                offer: Number(formData.offer),
                quantity: Number(formData.quantity),
                image: formData.image ? URL.createObjectURL(formData.image) : med.image
              }
            : med
        )
      );

      setIsModalOpen(false);
      setEditingMedicine(null);
      toast.success("Medicine updated successfully!");
    } catch (error) {
      toast.error("Failed to update medicine");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'Delete Medicine',
      content: 'Are you sure you want to delete this medicine?',
      okText: 'Yes, Delete',
      okButtonProps: { className: 'bg-red-500 hover:bg-red-600' },
      onOk: () => {
        setMedicines(prev => prev.filter(med => med.key !== key));
        toast.success("Medicine deleted successfully!");
      }
    });
  };

  const columns = [
    {
      title: "Medicine",
      key: "medicine",
      render: (record: Medicine) => (
        <div className="flex items-center gap-3">
          {record.image ? (
            <Image
              src={record.image}
              alt={record.name}
              width={40}
              height={40}
              className="rounded-lg object-cover"
              fallback="data:image/png;base64,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"
            />
          ) : (
            <Avatar icon={<MedicineBoxOutlined />} size={40} />
          )}
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: "MRP (₹)",
      dataIndex: "mrp",
      key: "mrp",
      render: (mrp: number) => mrp.toFixed(2),
    },
    {
      title: "Offer (%)",
      dataIndex: "offer",
      key: "offer",
      render: (offer: number) => `${offer}%`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Medicine) => (
        <div className="flex space-x-2">
          <Tooltip title="Edit medicine">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditingMedicine(record);
                setIsModalOpen(true);
              }}
              className="text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Delete medicine">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.key)}
              className="text-red-500"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg bg-white p-4 dark:bg-gray-800 dark:text-white">
      <div className="mb-4 flex items-center justify-between">
        <Heading title="Manage Pharmacy" />
        <ButtonDefault
          label="Add New Medicine"
          onClick={() => {
            setEditingMedicine(null);
            setIsModalOpen(true);
          }}
          variant="primary"
          icon={<MedicineBoxOutlined />}
        />
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={medicines}
        loading={isLoading}
        className="w-full"
      />

      <PharmacyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMedicine(null);
        }}
        onSubmit={editingMedicine ? handleUpdate : handleAdd}
        initialData={editingMedicine}
        isLoading={isLoading}
      />
    </div>
  );
}
