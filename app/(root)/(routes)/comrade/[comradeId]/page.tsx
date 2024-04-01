import prismadb from "@/lib/prismadb";
import ComradeForm from "./components/comrade-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface ComradeIdpageProps {
  params: {
    comradeId: string;
  };
}
const ComradeIdpage = async ({ params }: ComradeIdpageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  const comrade = await prismadb.comrade.findUnique({
    where: {
      userId,
      id: params.comradeId,
    },
  });
  const categories = await prismadb.category.findMany();

  return <ComradeForm initialdata={comrade} categories={categories} />;
};

export default ComradeIdpage;
