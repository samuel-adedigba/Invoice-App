import React, { useState } from "react";
import Input from "./re-useable/input";

interface Item {
  id: number;
  itemName: string;
  itemDescription: string;
  quantity: string;
  price: string;
  amount: string;
}

interface Props {
  items: Item[];
  onItemsChange: (updatedItems: Item[]) => void;
}

const InvoiceItem: React.FC<Props> = ({ items, onItemsChange }) => {
  // Add a new item
  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      itemName: "",
      itemDescription: "",
      quantity: "",
      price: "",
      amount: "",
    };
    onItemsChange([...items, newItem]);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onItemsChange(updatedItems);
  };

  return (
    <div>

<table className="w-full border-collapse mt-10">
          <thead>
            <tr className="border-y-2">
              <th className="text-left py-2">
                Item Detail
                </th>
              <th className="text-left py-2">
                Qty
                </th>
              <th className="text-left py-2">
               Price
                </th>
              <th className="text-left py-2">
                Amount
                </th>
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
                   placeholder=" e.g Pepsi "
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
                  placeholder=" e.g carton pack "
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
                  placeholder=" e.g 2 "
                  onChange={(e) =>
                    handleInputChange(item.id, "quantity", e.target.value)
                  }
                />
                </td>
              <td className="py-2">
               <Input
                  name="price"
                  type="number"
                  value={item.price}
                  placeholder=" e.g 2000 "
                  onChange={(e) =>
                    handleInputChange(item.id, "price", e.target.value)
                  }
                />
                </td>
              <td className="py-2">
               <Input
                  name="amount"
                  type="number"
                  value={item.amount}
                  placeholder=" e.g 4000 "
                  onChange={(e) =>
                    handleInputChange(item.id, "amount", e.target.value)
                  }
                />
                </td>
            </tr>
               ))}
          </tbody>
        </table>
        <div>
        <button onClick={handleAddItem}>Add Item</button>
        </div>
        <div className="text-right mt-4 font-semibold from-neutral-600">
          <div className="flex justify-end space-x-28 m-4">
            <span>Subtotal</span>
            <span>
               $4,500.00
               </span>
          </div>
          <div className="flex justify-end space-x-28 m-5">
            <span>Tax (10%)</span>
            <span>
               $450.00
               </span>
          </div>
          <hr className="my-2 " />
          <div className="flex justify-end space-x-28 font-bold text-lg m-6 ">
            <h1 >Total</h1>
            <span>
               $4,950.00
               </span>
          </div>
        </div>
     {/* <table className="w-full border-collapse mt-10">
        <thead>
        <tr className="border-y-2">
            <th  className="text-left py-2" >Item Name</th>
            <th className="text-left py-2"  >Description</th>
            <th   className="text-left py-2" >Quantity</th>
            <th  className="text-left py-2" >Price</th>
            <th  className="text-left py-2"  >Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2" >
             
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) =>
                    handleInputChange(item.id, "itemName", e.target.value)
                  }
                />  <br />
                 <span className="text-gray-600 text-sm" >
                <input
                  type="text"
                  value={item.itemDescription}
                  onChange={(e) =>
                    handleInputChange(item.id, "itemDescription", e.target.value)
                  }
                />
              </span>
              </td>
              <td  className="py-2" >
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(item.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td  className="py-2" >
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleInputChange(item.id, "price", e.target.value)
                  }
                />
              </td>
              <td  className="py-2"  >
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleInputChange(item.id, "amount", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
     
    </div>
  );
};

export default InvoiceItem;
