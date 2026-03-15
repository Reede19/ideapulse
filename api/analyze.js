export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1200,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.choices[0].message.content;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

4. Scroll down → click **Commit new file**
5. You should now see an `api` folder in your repo with `analyze.js` inside ✅

---

## PHASE 3 — DEPLOY LIVE WITH VERCEL

1. Go to **vercel.com**
2. Click **Sign Up → Continue with GitHub**
3. Click **Authorize Vercel** when GitHub asks
4. Click **Add New... → Project**
5. Find `ideapulse` in the list → click **Import**
6. Leave every single setting at default
7. Click **Deploy**
8. Wait 30–60 seconds for the "Congratulations!" screen
9. Click **Continue to Dashboard**
10. Click your live URL (something like `ideapulse-xyz.vercel.app`) — your site is live ✅

**Add your Groq key to Vercel (hidden and safe):**
1. In Vercel, click your IdeaPulse project
2. Click the **Settings** tab at the top
3. Click **Environment Variables** in the left sidebar
4. In the **Key** field type: `GROQ_API_KEY`
5. In the **Value** field paste your `gsk_...` key from your Notes app
6. Make sure all three boxes are checked: Production ✓ Preview ✓ Development ✓
7. Click **Save**
8. Click the **Deployments** tab → find the top deployment → click the three dots `...` → **Redeploy**
9. Wait for the green "Ready" status

**Test it:**
1. Go to your live URL
2. Type any business idea in the box
3. Click **Analyze My Idea**
4. You should see results appear with no key popup ✅

---

## PHASE 4 — GET A CUSTOM DOMAIN (Optional, ~$12/year)

1. Go to **namecheap.com** → search `ideapulse.com` or `getideapulse.com`
2. Add to cart → checkout (~$10–15/year)
3. Back in Vercel → your project → **Settings → Domains**
4. Type your domain → click **Add**
5. Vercel gives you 2 DNS records:
   - Type `A` | Name `@` | Value `76.76.21.21`
   - Type `CNAME` | Name `www` | Value `cname.vercel-dns.com`
6. Go to Namecheap → **Dashboard → Manage → Advanced DNS**
7. Delete any existing A or CNAME records
8. Add both records exactly as shown
9. Back in Vercel → click **Verify**
10. Live within 30 minutes ✅

---

## PHASE 5 — SET UP STRIPE (Taking Real Payments)

1. Go to **stripe.com → Start now**
2. Enter email, full name, country, password → verify your email
3. Click **Activate your account** and fill out:
   - Business type: **Individual / Sole proprietor**
   - Your legal name and date of birth
   - Last 4 digits of your SSN
   - Home address and phone number
   - Bank account routing + account number (for payouts)
4. Leave it in **Test Mode** for now

**Create your 6 products:**

Go to left sidebar → **Product catalog → + Add product** and create each one:

| Name | Price | Type |
|---|---|---|
| IdeaPulse Pro | $19.00 | Monthly |
| IdeaPulse Founder | $49.00 | Monthly |
| Deep Report | $4.99 | One-time |
| PDF Export | $2.99 | One-time |
| AI Business Plan | $9.99 | One-time |
| Market Intel Report | $7.99 | One-time |

For each: enter name → click **Add a price** → enter amount → set billing period → **Save product**

**Create Payment Links:**

For each product: **Payment Links → + New → Add line item → select product → Create link → copy the link**

Save them all in Notes like this:
```
Pro:           https://buy.stripe.com/test_xxxx
Founder:       https://buy.stripe.com/test_xxxx
Deep Report:   https://buy.stripe.com/test_xxxx
PDF Export:    https://buy.stripe.com/test_xxxx
Business Plan: https://buy.stripe.com/test_xxxx
Market Report: https://buy.stripe.com/test_xxxx
