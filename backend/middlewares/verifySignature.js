// middlewares/verifySignature.js
const crypto = require('crypto');
require('dotenv').config();

const secret = process.env.APP_SECRET; // Should come from process.env in real apps
const verifySignature = (req, res, next) => {
  try {
    const bodyString = JSON.stringify(req.body);
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(bodyString)
      .digest('hex');

    const receivedSig = req.headers['x-signature'];
    if (receivedSig !== expectedSig) {
        return res.status(401).json({ error:"Unauthorized to access" });
    }

    next(); // Signature is valid, move on
  } catch (error) {
    return res.status(401).json({ error:"Unauthorized to access" });
  }
};

module.exports = verifySignature;
