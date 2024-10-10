import UserForm from "@/components/forms/user-form";
import prismadb from "@/lib/prismadb";

export default async function SingleUserPage({ params }: { params: { userId: string } }) {
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId
    },
    select: {
      name: true,
      email: true,
      role: true,
      slug: true,
    }
  })

  return (
    <h1>
      {/* TODO: Arreglar error de tipado */}
      <UserForm initialData={user} />
    </h1>
  );
}