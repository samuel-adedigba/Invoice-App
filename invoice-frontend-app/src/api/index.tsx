import React from 'react'
import axios from 'axios'
interface invoiceType {
    companyName: string,
    companyEmail: string,
    companyNumber:number,
    companyWebsite: string,
    companyAddress:string,
    streetAddress: string,
    recipientNumber: number ,
    recepientName: string,
    recepientEmail: string,
    recepientAddress: string,
    recepientStreetAddress: string,
    subject: string,
    invoiceNumber: number,
    reference: string,
    invoiceDate: string,
    dueDate: string,
    invoiceValue: number,
    items: [
      {
        itemName: string,
        itemDescription: string,
        quantity: number,
        price: number,
        amount: number,
      },
    ],
}
const base_host= "http://localhost:4001/"
export const getInvoice = async () => {
    try {
        const response = await axios.get<invoiceType>( `${base_host}google/get-invoice/final@example.com` )
    console.log( response)
    return response  
    } catch (error: any) {
        console.log( "error:", error.message)
    }
}

export const createInvoice = async( data:invoiceType ) =>{
    try {
        const response = await axios.post<invoiceType>(`${base_host}google/create-invoice`, data)
        console.log(response)
        return response
    } catch (error) {
        
    }
}