import { useEffect, useState} from "react";
import { axiosInstance } from "../services/axios-instance";
import { API_CONFIG } from "../utils/api-path";
import { useParams } from "react-router-dom";

interface  IData {
    firstname: string
    lastname: string
    totalprice: number
    depositpaid: boolean
    bookingdates: Bookingdates
    additionalneeds: string
  }
  export interface Bookingdates {
    checkin: string
    checkout: string
  }



const BookingView = () => {
  const [data, setData] = useState<IData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { bookingId } = useParams()

  console.log(bookingId)
  console.log(data?.depositpaid
  )

  useEffect(()=> {
    const getBookinData = async()=> {
      if(bookingId){
        try{
          const response = await axiosInstance.get(`${API_CONFIG.path.booking}/${bookingId}`);
            console.log("respone", response?.data)
            setData(response?.data);
         }catch(error){
           console.log(error)
         }finally{
          setLoading(false)
         }
        }
      }
    getBookinData();
  },[bookingId])


  return (
    <>
    {loading && <div className="flex justify-center items-center h-[80vh]"><h1>Loding...</h1></div>}
    {!loading &&  <div className="w-full flex flex-col justify-between items-start gap-5">
    <div className="w-full flex sm:flex-row flex-col justify-between sm:items-center items-start gap-5">
      <div>
       <h1 className="font-bold">First Name</h1>
       <p>{data?.firstname}</p>
      </div>
      <div>
       <h1 className="font-bold">Lat Name</h1>
       <p>{data?.lastname}</p>
      </div>
      <div>
       <h1 className="font-bold">Total Price</h1>
       <p>{data?.totalprice}</p>
      </div>
      <div>
       <h1 className="font-bold">Additional Needs</h1>
       <p>{data?.additionalneeds}</p>
      </div>
      <div>
       <h1 className="font-bold">Deposit Paid</h1>
       <p>{data?.depositpaid ? "Yes" : "No"}</p>
      </div>
    </div>
    <div>
    </div>
      <h1 className="font-bold">Booking Dates</h1>
      <div className="w-full flex sm:flex-row flex-col sm:items-center items-start gap-5">
      <div>
       <h1 className="font-bold">Check In</h1>
       <p>{data?.bookingdates?.checkin}</p>
      </div>
      <div>
       <h1 className="font-bold">Check Out</h1>
       <p>{data?.bookingdates?.checkout}</p>
      </div>
    </div>
    </div>}
    </>
  )
}

export default BookingView;