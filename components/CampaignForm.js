"use client";
import { useState } from 'react';
import { createCampaign, checkAudienceSize } from '../utils/api';
const CampaignForm = () => {
    const [rules, setRules] = useState([]);
    const [newRule, setNewRule] = useState({ field: '', operator: '=', value: '', logic: 'AND' });
    const [message, setMessage] = useState('');
    const [audienceSize, setAudienceSize] = useState(null);

    const handleAddRule = () => {
        if (newRule.field && (newRule.operator || newRule.field !== 'totalSpends') && newRule.value) {
            setRules([...rules, newRule]);
            setNewRule({ field: '', operator: '=', value: '', logic: 'AND' });
        } else {
            alert('Please fill in all rule fields.');
        }
    };
    const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setNewRule((prev) => ({ ...prev, [name]: value }));
    if (name === 'logic' && rules.length > 0) {
        const ruleIndex = rules.length - 1;
        const previousLogic = rules[ruleIndex].logic;
        setNewRule((prev) => ({ ...prev, logic: previousLogic }));
    }
};


    const handleCheckAudienceSize = async () => {
        try {
            const size = await checkAudienceSize(rules);
            setAudienceSize(size);
        } catch (error) {
            console.error('Error checking audience size:', error);
        }
    };

    const handleCreateCampaign = async () => {
        try {
            await createCampaign({ rules, message });
            alert('Campaign created successfully');
            setRules([]);
            setNewRule({ field: '', operator: '=', value: '', logic: 'AND' });
            setMessage('');
            setAudienceSize(null);
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('Error creating campaign');
        }
    };
    

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Field:</label>
                <select
                    name="field"
                    value={newRule.field}
                    onChange={handleRuleChange}
                    className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select Field</option>
                    <option value="totalSpends">Total Spends</option>
                    <option value="visited">Times Visited</option>
                    <option value="activeAt">Active before last duration</option>
                </select>
            </div>
            {newRule.field === 'totalSpends' && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Operator:</label>
                    <select
                        name="operator"
                        value={newRule.operator}
                        onChange={handleRuleChange}
                        className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="=">=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </select>
                </div>
            )}
            {newRule.field === 'visited' && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Operator:</label>
                    <select
                        name="operator"
                        value={newRule.operator}
                        onChange={handleRuleChange}
                        className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    >
                        <option value="=">=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </select>
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Value:</label>
                <input
                    type="text"
                    name="value"
                    value={newRule.value}
                    onChange={handleRuleChange}
                    className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Logic:</label>
                {rules.length === 0 && (
            <select
                name="logic"
                value={newRule.logic}
                onChange={handleRuleChange}
                className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
            )}
            {rules.length > 0 && (
                <select
                    name="logic"
                    value={newRule.logic}
                    onChange={handleRuleChange}
                    className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                    <option value={rules[rules.length - 1].logic}>{rules[rules.length - 1].logic}</option>
                </select>
            )}
            </div>
            <button onClick={handleAddRule} className="bg-blue-500 hover:bg-blue-700  w-full text-white font-bold py-2 px-4 rounded transition duration-300">
                Add Rule
            </button>
            <div className="mt-4">
                <button onClick={handleCheckAudienceSize} className="bg-blue-500  w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Check Audience Size
                </button>
                {audienceSize !== null && <p className="text-gray-800 mt-2 ">Audience Size: {audienceSize}</p>}
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2">Message:</label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border text-black rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mt-4">
                <button onClick={handleCreateCampaign} className="bg-green-500  w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Create Campaign
                </button>
            </div>

            <div className="mt-4">
                <h3 className="text-xl text-gray-800 font-bold mb-2">Added Rules:</h3>
                {rules.map((rule, index) => (
                    <div key={index} className="mb-2 text-gray-700">
                        <span className="font-bold">Field:</span> {rule.field}, 
                        <span className="font-bold"> Operator:</span> {rule.operator}, 
                        <span className="font-bold"> Value:</span> {rule.value}
                        <span className="font-bold"> Logic:</span> {rule.logic}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <a href="/campaigns"><button className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    View Campaign
                </button></a>
            </div>
        </div>
    );
};

export default CampaignForm;
