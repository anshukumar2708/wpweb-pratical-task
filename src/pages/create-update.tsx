import { Button, Card,  DatePicker,  Divider, Form, Input, message, Select, Typography } from "antd";
import { formatDate } from "../utils/date";
import { API_CONFIG } from "../utils/api-path";
import { axiosInstance } from "../services/axios-instance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export interface IValues {
  firstname: string;
  lastname: string;
  totalprice: string;
  depositpaid: string;
  checkin: string;
  checkout: string;
  additionalneeds: string
}

interface  IBookingData {
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


const CreateUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [bookingData, setBookingData] = useState<IBookingData | null>(null)
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { bookingId } = useParams()
  const isEdit = !!bookingId
 

  const onFormSubmitHandler = async(values : IValues)=> {
    const payLoad = {
      firstname: values?.firstname,
      lastname: values?.lastname,
      totalprice: values?.totalprice,
      depositpaid: values?.depositpaid,
     bookingdates: {
      checkin: values.checkin ?  formatDate(values.checkin, "YYYY-MM-DD") : null, 
      checkout: values.checkout ? formatDate(values.checkin, "YYYY-MM-DD") : null, 
    },
      additionalneeds: values?.additionalneeds
    }
    setLoading(true);
    try {
      let response;
      if(bookingId){
        response = await axiosInstance.put(`${API_CONFIG.path.booking}/${bookingId}`, payLoad)
      }else{
        response = await axiosInstance.post(`${API_CONFIG.path.booking}`, payLoad)
      }
      if(response){
        message.success(`Booking ${isEdit ? "Update" : "Created" } Successfull`)
        navigate("/")
      }
    } catch (err) {
      console.error('Error logging in:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    const getBookinData = async()=> {
      if(bookingId){
        try{
          const response = await axiosInstance.get(`${API_CONFIG.path.booking}/${bookingId}`);
            console.log("respone", response?.data)
            setBookingData(response?.data);
         }catch(error){
           console.log(error)
         }finally{
          setLoading(false)
         }
        }
      }
    getBookinData();
  },[bookingId])

  useEffect(() => {
    if (bookingData && isEdit) {
      form.setFieldsValue({
        firstname: bookingData?.firstname,
        lastname: bookingData?.lastname,
        totalprice: bookingData?.totalprice,
        depositpaid: bookingData?.depositpaid,
        checkin:  dayjs(bookingData?.bookingdates?.checkin),
        checkout: dayjs(bookingData?.bookingdates?.checkout),
        additionalneeds: bookingData?.additionalneeds,
      });
    }
  }, [bookingData, isEdit, form]);


  return (
    <> 
    <Card>
    <Typography.Title level={3} className=" font-medium">
      {isEdit ? "Update" : "Create"} Booking
    </Typography.Title>
    <Divider />
    <Form
      layout="vertical"
      form={form}
      onFinish={onFormSubmitHandler}
      autoComplete="off"
    >
     
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-5">
            <Form.Item
              name="firstname"
              label="First Name"
              className="mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: "First Name is required!",
                },
              ]}
            >
              <Input
                placeholder="First Name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              className="mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: "Last Name is required!",
                },
              ]}
            >
              <Input
                placeholder="Last Name"
                size="large"
              />
            </Form.Item>
        </div>

        <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-5">
         
         <Form.Item
           name="totalprice"
           label="Total Price"
           className="mb-2 w-full"
           rules={[
             {
               required: true,
               message: "Total Price is required!",
             },
           ]}
         >
           <Input
             type="number"
             placeholder="Total Price"
             size="large"
           />
         </Form.Item>

         <Form.Item
              name="depositpaid"
              label="Deposit Paid"
              className="mb-2 text-lef w-full"
              rules={[
                {
                  required: true,
                  message: "Deposit Paid is required!",
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                className="text-left"
                placeholder="Select a Deposit Paid"
                optionFilterProp="children"
                options={[ 
                  {
                  value: true,
                  label: "Yes",
                },
                {
                  value: false,
                  label: "No",
                },
              ]}
              />
         </Form.Item>
       </div>

       <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-5">
            <Form.Item
              name="checkin"
              label="Check In"
              className="mb-2 w-full" 
              rules={[
                {
                  required: true,
                  message: "Check In is required!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                size="large"
                className="w-full"
              />
            </Form.Item>
         
            <Form.Item
              name="checkout"
              label="Check Out"
              className="mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: "Check Out is required!",
                },
              ]}
            >
               <DatePicker
                format="YYYY-MM-DD"
                size="large"
                className="w-full"
              />
            </Form.Item>
       </div>

       <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-5">
         <Form.Item
           name="additionalneeds"
           label="Additional Needs"
           className="mb-2 w-full"
           rules={[
             {
               required: true,
               message: "Additional Needs is required!",
             },
           ]}
         >
           <Input
             placeholder="Additional Needs"
             size="large"
           />
         </Form.Item>
      </div>

        <div className="mt-4 flex justify-center items-center">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}
            >
           { isEdit ? "Update" :  "Submit"}
            </Button>
        </div>
    </Form>
  </Card>
  </>
  )
}

export default CreateUpdate

        