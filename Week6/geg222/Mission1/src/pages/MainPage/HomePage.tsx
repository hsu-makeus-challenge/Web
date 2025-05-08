import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useGetLpList from "../../hooks/queries/useGetLpList";
import SortButtons from "../../components/HomePage/SortButtons";
import LpCard from "../../components/HomePage/LpCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { data, isPending, isError } = useGetLpList({ order });

  return (
    <div>
      <SortButtons order={order} setOrder={setOrder} />
      <div className="grid grid-cols-5 gap-4">
        {data?.data.data.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
