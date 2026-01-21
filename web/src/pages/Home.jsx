import FamilyHeader from "../components/home/FamilyHeader";
import MealPlanCard from "../components/home/MealPlanCard";
import ShoppingCard from "../components/home/ShoppingCard";
import TasksCard from "../components/home/TasksCard";
import TopTabs from "../components/home/TopTabs";
import UpcomingEventsCard from "../components/home/UpcomingEventsCard";

function Home() {
    return (
        <div className="page-container">
            <TopTabs />
            <div className="home-page-container">
                <FamilyHeader/>
                <UpcomingEventsCard />
                <TasksCard />
                <ShoppingCard />
                <MealPlanCard />
            </div>
        </div>
    );
}

export default Home;