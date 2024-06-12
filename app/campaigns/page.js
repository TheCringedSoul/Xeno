import CampaignList from "@/components/CampaignList";
const Campaigns = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8">Past Campaigns</h1>
            <CampaignList />
        </div>
    );
};

export default Campaigns;
