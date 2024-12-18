import { Button, Card, Flex, message, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG } from "../utils/api-path";
import { axiosInstance } from "../services/axios-instance";
import { useUserContext } from "../context/userContext";

// Logical operators:
// Logical operators in javascript, unlike operators in other programming languages, do not return true or false. They always return one of the operands.
// OR ( | | ) operator - If the first value is truthy, then the first value is returned. Otherwise, always the second value gets returned
// AND ( && ) operator - If both the values are truthy, always the second value is returned. If the first value is falsy then the first value is returned or if the second value is falsy then the second value is returned.
// isNaN("Hello")  Returns true
// isNaN(345)    Returns false
// isNaN('1')   Returns false, since '1' is converted to Number type which results in 0 ( a number) 
// isNaN(true)  Returns false, since true converted to Number type results in 1 ( a number)
// isNaN(false)  Returns false
// isNaN(undefined)  Returns true

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  console.log(user, setUser);

  useEffect(() => {
    const getBookinData = async () => {
      try {
        const response = await axiosInstance.get(`${API_CONFIG.path.booking}`);
        console.log("respone", response?.data);
        setData(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBookinData();
  }, []);

  const deleteHandler = async (id: number) => {
    console.log("id", id);
    try {
      const response = await axiosInstance.delete(
        `${API_CONFIG.path.booking}/${id}`
      );
      if (response) {
        message.success("Booking Delete Successful");
      }
    } catch (error) {
      console.log("Error deleting booking:", error);
      message.error("Failed to delete booking");
    }
  };

  const columns = [
    {
      title: "BookingId",
      dataIndex: "bookingid",
      key: "bookingid",
    },
    {
      title: "Action",
      key: "action",
      render: (record: { bookingid: number }) => {
        return (
          <>
            <div className="flex gap-5">
              <Link to={`/view-booking/${record.bookingid}`}>View Booking</Link>
              {/* <Link
                to={`/create-booking`}
              >
               Create Booking
              </Link> */}
              <Link to={`/update-booking/${record.bookingid}`}>
                Update Booking
              </Link>
              <button onClick={() => deleteHandler(record.bookingid)}>
                Delete Booking
              </button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-[80vh]">
          <h1>Loding...</h1>
        </div>
      )}
      {!loading && (
        <Card
          title={
            <Flex justify="space-between" align="center">
              <h3>Booking Managment</h3>
              <Flex align="center">
                {/* <Input.Search
                style={{
                  marginRight: 10,
                }}
                placeholder="Search"
              /> */}
                <Button
                  type="primary"
                  onClick={() => navigate("/create-booking")}
                >
                  Create Booking
                </Button>
              </Flex>
            </Flex>
          }
        >
          <Table columns={columns} dataSource={data} bordered />
        </Card>
      )}
    </>
  );
};

export default Home;
