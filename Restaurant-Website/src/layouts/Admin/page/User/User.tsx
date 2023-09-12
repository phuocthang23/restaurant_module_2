/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from "flowbite-react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { useEffect, useState } from "react";
// import axios from "axios";
import { User } from "../../../../interface/interface";
import { getAllUsers, getOneUser, putOneUser } from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
const User: React.FC = () => {
  //* biến chưa data
  const [data, setData] = useState<User[]>([]);
  // const [loading, setLoading] = useState(true);
  //* fetch data
  useEffect(() => {
    const data = async () => {
      const userAll = await getAllUsers(null);
      setData(userAll);
    };
    data();
  }, []);
  const handleSearch = async (data: any) => {
    const params = data.length > 0 ? { name: data } : null;
    const bb = await getAllUsers(params);
    setData(bb);
  };
  const handleBlock = async (id: number) => {
    const block = await getOneUser(id);
    const activeStatus = { ...block, status: !block.status };

    const putStatus = await putOneUser(activeStatus);
    //* thông báo
    if ((putStatus as any).status === 200) {
      toast.success(
        activeStatus.status === false
          ? "Block user successfully"
          : "Unblock user successfully"
      );
    }
    //* cập nhập lại dữ liệu
    const userAll = await getAllUsers(null);
    setData(userAll);
  };

  return (
    <div>
      <HearderAdmin title="User" handleSearch={handleSearch} />
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((row) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell
                    key={row.id}
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                  >
                    {row.name}
                  </Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                  <Table.Cell>{row.gender}</Table.Cell>
                  <Table.Cell>{row.phone}</Table.Cell>
                  <Table.Cell>{row.address}</Table.Cell>
                  <Table.Cell>{row.role}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`${
                        row.status ? "bg-lime-500" : "bg-red-500"
                      } w-2 h-2 rounded inline-block mr-1`}
                    ></span>
                    {row.status ? "active" : "inactive"}
                  </Table.Cell>

                  <Table.Cell className=" flex gap-2">
                    <Button
                      className="font-medium bg-cyan-600 hover:bg-cyan-300"
                      onClick={() => handleBlock(row.id)}
                    >
                      Block
                    </Button>
                    <Button className="font-medium bg-red-600 hover:bg-red-300">
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;
