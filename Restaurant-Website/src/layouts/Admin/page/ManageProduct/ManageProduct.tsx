/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "flowbite-react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { Button } from "@material-tailwind/react";
import { deleteProducts, getAllProducts } from "../../../../api";
import { useEffect, useState } from "react";
import Create from "../../components/modal/create/Create";
import { ToastContainer, toast } from "react-toastify";
import Update from "../../components/modal/update/Update";

// interface ProductData {
//   name: string;
//   category: string;
//   most: string;
//   price: string;
//   image1: string;
//   image2: string;
//   image3: string;
//   stock: string;
// }
const ManageProduct = () => {
  const [user, setUser] = useState<any>([]);
  // const [user, setUser] = useState<ProductData[]>([]);
  useEffect(() => {
    const data = async () => {
      const userAll = await getAllProducts(null);
      setUser(userAll);
    };
    data();
  }, []);
  //^ --------------------------------------------------(delete)----------------------------------
  const handleDelete = (productId: number) => {
    console.log(productId);
    //Gọi API hoặc thực hiện xóa sản phẩm tại đây
    const data = async () => {
      const response = await deleteProducts(productId);
      console.log(response);
      if ((response as any).status === 200) {
        toast.success("delete product successfully");
      }
      const dellProduct = await getAllProducts(null);
      setUser(dellProduct);
    };
    data();
  };
  const handleUpdate = async (data: any) => {
    if (data) {
      const bb = await getAllProducts(null);
      console.log(bb);
      setUser(bb);
    }
  };
  const handleSearch = async (data: any) => {
    const params = data.length > 0 ? { name: data } : null;
    const bb = await getAllProducts(params);
    setUser(bb);
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <HearderAdmin title="Product" handleSearch={handleSearch} />
        <div className="mt-4">
          <Create handleUpdate={handleUpdate} />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>image</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {user.map((item: any) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={item?.images !== undefined && item?.images[0]?.url}
                  className="w-20 h-20"
                />
              </Table.Cell>
              <Table.Cell>{item.stock}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell className="flex">
                <Update id={item.id} />
                <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <Button
                    className="font-medium bg-red-600"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default ManageProduct;
