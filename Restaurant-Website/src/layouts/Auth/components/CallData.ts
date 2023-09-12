import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api";
import { User } from "../../../interface/interface";

const CallDataUser = () => {
  //*gọi lại api
  const [data, setData] = useState<User[]>([]);
  //* fetch data
  useEffect(() => {
    //* gọi lại data
    const data = async () => {
      const userAll = await getAllUsers(null);
      setData(userAll);
    };
    data();
  }, []);
  return data;
};

export default CallDataUser;
