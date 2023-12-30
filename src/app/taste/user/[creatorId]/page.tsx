import { UserFoodList } from "../../_components/FoodListDisplay";

async function CreatorFoodPage({ params }: { params: { creatorId: string } }) {
  return (
    <div className="no-scrollbar my-32 h-screen w-full space-y-12 overflow-y-scroll pb-40">
      <UserFoodList userId={params.creatorId} />
    </div>
  );
}
export default CreatorFoodPage;
