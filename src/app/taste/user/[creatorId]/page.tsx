import { MyFoodList } from "../../_components/FoodListDisplay";

async function CreatorFoodPage({ params }: { params: { creatorId: string } }) {
  return (
    <div className="no-scrollbar my-32 h-96 w-full space-y-12 overflow-y-scroll">
      <MyFoodList userId={params.creatorId} />
    </div>
  );
}
export default CreatorFoodPage;
