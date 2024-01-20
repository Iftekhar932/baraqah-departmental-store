import { useLoaderData } from "react-router-dom";
import Card from "./Product";
import useFirebase from "../hooks/useFirebase";
import LoadingSpinner from "./LoadingSpinner";

const Cards = () => {
  const loadedData = useLoaderData();
  const { loading, setLoading } = useFirebase();
  
  console.log(Boolean(loadedData[0]));
  // setLoading(Boolean(loadedData[0]));

  return (
    <>
      <LoadingSpinner specifiedClass={loading ? "" : "hidden"} />
      <div className="mx-auto my-5 w-4/5 gap-5 grid  mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loadedData?.data?.map((d) => {
          return <Card key={d?._id} productData={d} />;
        })}
      </div>
    </>
  );
};

export default Cards;
