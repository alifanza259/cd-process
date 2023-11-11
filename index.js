const express = require("express")
const crypto = require("crypto")
const shell = require("shelljs")

const app = express()

app.use(express.json())

app.post("/webhook", (req, res) => {
	const payload = JSON.stringify(req.body);
	const signature = req.get('X-Hub-Signature');

	if (!signature) {
		console.error('No X-Hub-Signature found in the request');
		return res.status(403).send('Unauthorized');
	}
	// Calculate the expected HMAC using the secret key
	const expectedSignature = `sha1=${crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET).update(payload).digest('hex')}`;

	// Compare the calculated signature with the one from GitHub
	if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
		console.log('Signature is valid');
		// Process the GitHub webhook payload here
		shell.exec("/var/www/webhook/script.sh")
		res.status(200).json({ status: 'success' });
	} else {
		console.error('Invalid signature');
		res.status(403).send('Unauthorized');
	}
});

app.listen(4001, () => { console.log("Running on 4001") })
