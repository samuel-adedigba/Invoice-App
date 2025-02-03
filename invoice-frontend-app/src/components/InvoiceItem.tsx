import React, { useState } from "react";
import Input from "./re-useable/input";

interface Item {
  id: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  price: number;
  amount: number;
}

interface Props {
  items: Item[];
  onItemsChange: (updatedItems: Item[]) => void;
  // onTotalsChange: (totals: {
  //   subtotal: number;
  //   discount: number;
  //   total: number;
  //   currency: string;
  // }) => void;
  values: any
  // onChange({
  //   target: {
  //     name: "reference",
  //     value: reference,
  //   },
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceItem: React.FC<Props> = ({ items, onItemsChange, values, onChange }) => {
  const [currency, setCurrency] = useState("USD"); 
  const [discountRate, setDiscountRate] = useState(0);
  const handleAddItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      itemName: "",
      itemDescription: "",
      quantity: 1,
      price: 0,
      amount: 1 * 0, 
    };    
    onItemsChange([...items, newItem]);
  };
  const handleInputChange = (id: number, field: string, value: string | number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { 
            ...item, 
            [field]: value, 
            amount: field === "quantity" 
              ? Number(value) * item.price 
              : field === "price"
              ? item.quantity * Number(value)
              : item.amount
          }
        : item
    );
    onItemsChange(updatedItems);
  };
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };
  const calculateDiscount = (subtotal: number) => {
    return (subtotal * discountRate) / 100;
  };
  const calculateTotal = (subtotal: number, discount: number) => {
    return subtotal - discount;
  };

  const subTotal = calculateSubtotal();
  const discount = calculateDiscount(subTotal);
  const total = calculateTotal(subTotal, discount);

  // useEffect(() => {
  //   onTotalsChange({ subtotal, discount, total, currency });
  // }, [subtotal, discount, total, currency, onTotalsChange]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="currency" className="mr-2">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="NGN">NGN (₦)</option>
          </select>
        </div>
        <div>
          <label htmlFor="discount" className="mr-2">Discount (%):</label>
          <Input
            name="discount"
            type="number"
            value={discountRate}
            placeholder="Enter discount rate"
            onChange={(e) => setDiscountRate(Number(e.target.value))}
          />
        </div>
      </div>
      <table className="w-full border-collapse mt-10">
        <thead>
          <tr className="border-y-2">
            <th className="text-left py-2">Item Detail</th>
            <th className="text-left py-2">Qty</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2">
                <span>
                  <Input
                    name="itemName"
                    type="text"
                    value={item.itemName}
                    placeholder="e.g. Pepsi"
                    onChange={(e) =>
                      handleInputChange(item.id, "itemName", e.target.value)
                    }
                  />
                </span>
                <span className="text-gray-600 text-sm">
                  <Input
                    name="itemDescription"
                    type="text"
                    value={item.itemDescription}
                    placeholder="e.g. carton pack"
                    onChange={(e) =>
                      handleInputChange(item.id, "itemDescription", e.target.value)
                    }
                  />
                </span>
              </td>
              <td className="py-2">
                <Input
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  placeholder="e.g. 2"
                  onChange={(e) =>
                    handleInputChange(item.id, "quantity", Number(e.target.value))
                  }
                />
              </td>
              <td className="py-2">
                <Input
                  name="price"
                  type="number"
                  value={item.price}
                  placeholder="e.g. 2000"
                  onChange={(e) =>
                    handleInputChange(item.id, "price", Number(e.target.value))
                  }
                />
              </td>
              <td className="py-2">
                {(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
      <button 
  onClick={(e) => {
    e.preventDefault();
    console.log("Add Item Clicked!");
    handleAddItem();
  }} 
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Add Item
</button>

      </div>
      <div className="text-right mt-4 font-semibold text-neutral-600">
        <div className="flex justify-end space-x-28 m-4">
          <span>Subtotal</span>
          <Input
                  name="subTotal"
                  type="text"
                  // value={values.concat(currency).subtotal.toFixed(2)}
                  value={values.subTotal = subTotal.toFixed(2)}
                  placeholder="e.g. 2000"
                  onChange={onChange}
                />
          {/* <span>
            {currency} {subtotal.toFixed(2)}
          </span> */}
        </div>
        <div className="flex justify-end space-x-28 m-5">
          <span>Discount ({discountRate}%)</span>
          <Input
                  name="discount"
                  type="text"
                  // value={values.concat(discount).subtotal.toFixed(2)}
                  value={values.discount = discount.toFixed(2)}
                  placeholder="e.g. 2000"
                  onChange={onChange}
                />
          {/* <span>
            {currency} {discount.toFixed(2)}
          </span> */}
        </div>
        <hr className="my-2" />
        <div className="flex justify-end space-x-28 font-bold text-lg m-6">
          <h1>Total</h1>
          <Input
                  name="total"
                  type="text"
                  // value={values.concat(total).subtotal.toFixed(2)}
                  value={values.total = total.toFixed(2)}
                  placeholder="e.g. 2000"
                  onChange={onChange}
                />
          {/* <span>
            {currency} {total.toFixed(2)}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
