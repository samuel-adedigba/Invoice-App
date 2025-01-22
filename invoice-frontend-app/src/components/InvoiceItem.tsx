import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"

// Define props type


const InvoiceItem: React.FC<Props> = ({
  onChange,
  error,
  values,
}) => {
  return (
    <>
 
     <div>

         <table>
            <tr>
            <th className="border border-gray-400 px-4 py-2">Item Description</th>
            <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
             <th className="border border-gray-400 px-4 py-2">Amount</th>
            </tr>
         <tr>
                 <td> 
                <Input
        name="itemName"
        type="text"
        value={values.itemName}
        placeholder=" Item Name "
        error={error?.itemName}
       onChange={onChange}
      />
               <Input
        name="itemDescription"
        type="text"
        value={values.itemDescription}
        placeholder=" Item Description "
        error={error?.itemDescription}
       onChange={onChange}
      />
           </td>        
            <td>   
            <Input
        name="quantity"
        type="text"
        value={values.quantity}
        placeholder=" Item quantity "
        //label="Company Name"
        error={error?.quantity}
       onChange={onChange}
      />
         </td>

            <td>    
            <Input
        name="price"
        type="text"
        value={values.price}
        placeholder=" Item price "
        //label="Company Name"
        error={error?.price}
       onChange={onChange}
      />
           </td>
        
            <td>      
            <Input
        name="amount"
        type="text"
        value={values.amount}
        placeholder=" Item amount "
        //label="Company Name"
        error={error?.amount}
       onChange={onChange}
      /> 
               </td>
            
         </tr>
     


         </table>

         <div>   
            Subtotal
         </div>
         <div>
            Tax 
         </div>
         <div>--------------------------</div>
         <div>
            Total
         </div>


 </div>
    </>
  );
};

export default InvoiceItem;

