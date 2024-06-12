const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaignModel');
const CommunicationLog = require('../models/communicationLogModel');
const Customer = require('../models/customerModel');
router.post('/campaigns', async (req, res) => {
    try {
        const { rules, message } = req.body;
        const audience = await getAudience(rules);
        const campaign = new Campaign({
            rules,
            message,
            audienceSize: audience.length,
            sent: 0,
            failed: 0,
        });
        await campaign.save();
        await sendMessages(campaign, audience);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/audienceSize', async (req, res) => {
    try {
        const { rules } = req.body;
        const audience = await getAudience(rules);
        res.json({ size: audience.length });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getAudience = async (rules) => {
    let query;
    let isFirstRule = true;
    let orFlag = false;
    console.log('Received Rules:', rules);
    rules.forEach((rule) => {
        const { field, operator, value, logic } = rule;
        console.log('Applying Rule:', rule);
        if (isFirstRule) {
            query = Customer.find();
            isFirstRule = false;
        }

        if (logic === 'OR') {
            orFlag = true;
        } else if (logic === 'AND') {
            orFlag = false;
        }

        let condition = {};
        switch (field) {
            case 'totalSpends':
                switch (operator) {
                    case '>':
                        condition[field] = { $gt: value };
                        break;
                    case '<':
                        condition[field] = { $lt: value };
                        break;
                    case '=':
                        condition[field] = value;
                        break;
                }
                break;
            case 'visited':
                switch (operator) {
                    case '>':
                        condition[field] = { $gt: value };
                        break;
                    case '<':
                        condition[field] = { $lt: value };
                        break;
                    case '=':
                        condition[field] = value;
                        break;
                }
                break;
            case 'activeAt':
                const monthsAgo = new Date();
                monthsAgo.setMonth(monthsAgo.getMonth() - value);
                condition[field] = { $lt: monthsAgo };
                break;
        }

        if (orFlag) {
            query.or([condition]);
        } else {
            query.and([condition]);
        }
    });

    const compiledQuery = query.getQuery();
    console.log("Compiled Query: ", compiledQuery);
    return await query.exec();
};

const sendMessages = async (campaign, audience) => {
    for (const customer of audience) {
        const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
        const greetings = ['Hi', 'Hello', 'Howdy', 'Heyo'];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        const personalizedMessage = `${randomGreeting}, ${customer.name}, ${campaign.message}`;

        await CommunicationLog.create({
            campaignId: campaign._id,
            customerId: customer._id,
            status,
            message: personalizedMessage,
        });

        if (status === 'SENT') {
            campaign.sent += 1;
        } else {
            campaign.failed += 1;
        }
    }
    await campaign.save();
};
module.exports = router;
