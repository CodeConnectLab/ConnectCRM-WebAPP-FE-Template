import React, { useState, useEffect } from "react";
import { Button, Tooltip, Modal, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PrinterOutlined, FileAddOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import Heading from "../../components/CommonUI/Heading";

interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Bill {
  key: string;
  billNumber: string;
  patientName: string;
  patientMobile: string;
  date: string;
  items: BillItem[];
  total: number;
  discount: number;
  finalAmount: number;
  status: 'paid' | 'pending' | 'cancelled';
}

const dummyBills: Bill[] = [
  {
    key: "1",
    billNumber: "BILL-001",
    patientName: "John Doe",
    patientMobile: "9876543210",
    date: "2024-02-20",
    items: [
      { id: "1", name: "Consultation", quantity: 1, price: 500, total: 500 },
      { id: "2", name: "Blood Test", quantity: 1, price: 800, total: 800 }
    ],
    total: 1300,
    discount: 100,
    finalAmount: 1200,
    status: 'paid'
  },
  {
    key: "2",
    billNumber: "BILL-002",
    patientName: "Jane Smith",
    patientMobile: "8765432109",
    date: "2024-02-21",
    items: [
      { id: "1", name: "X-Ray", quantity: 1, price: 1200, total: 1200 },
      { id: "2", name: "Medicine", quantity: 2, price: 300, total: 600 }
    ],
    total: 1800,
    discount: 200,
    finalAmount: 1600,
    status: 'pending'
  }
];

const BillingModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: Bill | null;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<any>({
    patientName: "",
    patientMobile: "",
    items: [],
    discount: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        patientName: initialData.patientName,
        patientMobile: initialData.patientMobile,
        items: initialData.items,
        discount: initialData.discount
      });
    } else {
      setFormData({
        patientName: "",
        patientMobile: "",
        items: [],
        discount: 0
      });
    }
  }, [initialData]);

  const addItem = () => {
    setFormData((prev: { items: BillItem[] }) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), name: "", quantity: 1, price: 0, total: 0 }]
    }));
  };

  const removeItem = (id: string) => {
    setFormData((prev: { items: BillItem[] }) => ({
      ...prev,
      items: prev.items.filter((item: BillItem) => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setFormData((prev: { items: BillItem[] }) => ({
      ...prev,
      items: prev.items.map((item: BillItem) => {
        if (item.id === id) {
          const updatedItem: BillItem = { ...item, [field]: value };
          updatedItem.total = updatedItem.quantity * updatedItem.price;
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum: number, item: BillItem) => sum + item.total, 0);
    return subtotal - (formData.discount || 0);
  };

  return (
    <Modal
      title={initialData ? "Edit Bill" : "Create New Bill"}
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={() => onSubmit({ ...formData, finalAmount: calculateTotal() })}
        >
          {initialData ? "Update Bill" : "Create Bill"}
        </Button>
      ]}
    >
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            className="rounded border p-2"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="rounded border p-2"
            value={formData.patientMobile}
            onChange={(e) => setFormData({ ...formData, patientMobile: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Items</h3>
            <Button type="dashed" onClick={addItem} icon={<FileAddOutlined />}>
              Add Item
            </Button>
          </div>

          {formData.items.map((item: BillItem) => (
            <div key={item.id} className="grid grid-cols-5 gap-2">
              <input
                type="text"
                placeholder="Item name"
                className="rounded border p-2"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="rounded border p-2"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="Price"
                className="rounded border p-2"
                value={item.price}
                onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value))}
              />
              <div className="flex items-center">₹{item.total}</div>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeItem(item.id)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <div>
            <span className="mr-2">Discount:</span>
            <input
              type="number"
              className="w-24 rounded border p-2"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
            />
          </div>
          <div className="text-xl font-bold">
            Total: ₹{calculateTotal()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default function Billing() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  useEffect(() => {
    setBills(dummyBills);
  }, []);

  const handleCreateBill = (formData: any) => {
    setIsLoading(true);
    const newBill: Bill = {
      key: Date.now().toString(),
      billNumber: `BILL-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      patientName: formData.patientName,
      patientMobile: formData.patientMobile,
      date: new Date().toISOString().split('T')[0],
      items: formData.items,
      total: formData.items.reduce((sum: number, item: BillItem) => sum + item.total, 0),
      discount: formData.discount,
      finalAmount: formData.finalAmount,
      status: 'pending'
    };

    setTimeout(() => {
      setBills(prev => [...prev, newBill]);
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success("Bill created successfully!");
    }, 1000);
  };

  const handleUpdateBill = (formData: any) => {
    if (!editingBill) return;
    setIsLoading(true);

    setTimeout(() => {
      setBills(prev =>
        prev.map(bill =>
          bill.key === editingBill.key
            ? {
                ...bill,
                patientName: formData.patientName,
                patientMobile: formData.patientMobile,
                items: formData.items,
                total: formData.items.reduce((sum: number, item: BillItem) => sum + item.total, 0),
                discount: formData.discount,
                finalAmount: formData.finalAmount
              }
            : bill
        )
      );
      setIsModalOpen(false);
      setEditingBill(null);
      setIsLoading(false);
      toast.success("Bill updated successfully!");
    }, 1000);
  };

  const handlePrint = (bill: Bill) => {
    // Implement print functionality
    toast.info("Printing bill...");
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: 'Delete Bill',
      content: 'Are you sure you want to delete this bill?',
      okText: 'Yes, Delete',
      okButtonProps: { className: 'bg-red-500 hover:bg-red-600' },
      onOk: () => {
        setBills(prev => prev.filter(bill => bill.key !== key));
        toast.success("Bill deleted successfully!");
      }
    });
  };

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "Patient Details",
      key: "patient",
      render: (record: Bill) => (
        <div>
          <div className="font-medium">{record.patientName}</div>
          <div className="text-sm text-gray-500">{record.patientMobile}</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      key: "amount",
      render: (record: Bill) => (
        <div>
          <div>₹{record.finalAmount}</div>
          {record.discount > 0 && (
            <div className="text-sm text-gray-500">
              Discount: ₹{record.discount}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (record: Bill) => (
        <Tag
          color={
            record.status === 'paid'
              ? 'success'
              : record.status === 'pending'
              ? 'warning'
              : 'error'
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Bill) => (
        <div className="flex space-x-2">
          <Button
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record)}
            className="bg-green-500 text-white hover:bg-green-600"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingBill(record);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            className="bg-red-500 text-white hover:bg-red-600"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg bg-white p-4 dark:bg-gray-800 dark:text-white">
      <div className="mb-4 flex items-center justify-between">
        <Heading title="Billing Management" />
        <ButtonDefault
          label="Create New Bill"
          onClick={() => {
            setEditingBill(null);
            setIsModalOpen(true);
          }}
          variant="primary"
          icon={<FileAddOutlined />}
        />
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={bills}
        loading={isLoading}
        className="w-full"
      />

      <BillingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBill(null);
        }}
        onSubmit={editingBill ? handleUpdateBill : handleCreateBill}
        initialData={editingBill}
        isLoading={isLoading}
      />
    </div>
  );
}
