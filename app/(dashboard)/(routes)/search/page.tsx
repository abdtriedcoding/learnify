import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";

const SearchPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <>
      <Categories />
    </>
  );
};

export default SearchPage;
