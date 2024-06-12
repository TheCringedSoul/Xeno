"use client";
import { useEffect, useState } from 'react';
import { getCampaigns } from '../utils/api';
const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    useEffect(() => {
        fetchCampaigns();
    }, []);
    const fetchCampaigns = async () => {
        try {
            const data = await getCampaigns();
            setCampaigns(data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 ease-in-out transition-transform duration-300 max-w-full">
                        <h2 className="text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">Campaign ID: {campaign.id}</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Audience Criteria:</h3>
                            <ul className="list-disc list-inside">
                                {campaign.rules.map((rule) => (
                                    <li key={rule._id} className="mb-1">
                                        <p className="text-gray-700"><strong>Field:</strong> {rule.field}</p>
                                        <p className="text-gray-700"><strong>Operator:</strong> {rule.operator}</p>
                                        <p className="text-gray-700"><strong>Value:</strong> {rule.value}</p>
                                        <p className="text-gray-700"><strong>Logic:</strong> {rule.logic}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-gray-700 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <strong>Message:</strong> {campaign.message}</p>
                        <p className="text-gray-700 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <strong>Audience Size:</strong> {campaign.audienceSize}</p>                        
                        <p className="text-gray-700 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <strong>Sent:</strong> {campaign.sent}</p>                        
                        <p className="text-gray-700 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <strong>Failed:</strong> {campaign.failed}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CampaignList;
