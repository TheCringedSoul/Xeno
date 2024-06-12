export const createCampaign = async (campaignData) => {
    const response = await fetch(`http://localhost:5000/api/campaigns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
    });
    const data = await response.json();
    return data;
};

export const checkAudienceSize = async (rules) => {
    const response = await fetch(`http://localhost:5000/api/audienceSize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules }),
    });
    const data = await response.json();
    return data.size;
};

export const getCampaigns = async () => {
    const response = await fetch(`http://localhost:5000/api/campaigns`);
    const data = await response.json();
    return data;
};
