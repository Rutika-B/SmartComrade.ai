import Categories from "@/components/Categories";
import Comrades from "@/components/Comrades";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}
const RootPage = async ({ searchParams }: RootPageProps) => {
  const categories = await prismadb.category.findMany();

  const data = await prismadb.comrade.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Comrades data={data}/>
    </div>
  );
};

export default RootPage;
