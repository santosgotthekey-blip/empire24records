# 🚀 Empire24Records - Deployment Guide

Complete step-by-step guide to deploy your Empire24Records website with your custom domain.

---

## 📋 Prerequisites

- [x] Website files ready (`index.html`, `styles.css`, `script.js`)
- [x] A custom domain you own
- [x] A GitHub account (free)
- [x] An email address for contact form (e.g., Gmail)

---

## 📁 Project Structure

```
empire24records-website/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactive features
└── README.md       # This file
```

---

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click **Sign up**
3. Enter your email, choose a username, and password
4. Verify your email address
5. Complete the setup

---

## Step 2: Create a New Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `empire24records`
   - **Description**: `Empire24Records - Independent Sound. Empire Mindset.`
   - **Visibility**: ✅ Public (required for free GitHub Pages)
   - **Initialize**: ❌ Leave unchecked (we'll upload our own files)
3. Click **Create repository**
4. You'll see an empty repository page - this is normal!

---

## Step 3: Upload Website Files

### Option A: Using the GitHub Web Interface (Easiest)

1. In your new repository, click **Add file** → **Upload files**
2. Open your `empire24records-website` folder on your computer
3. Drag and drop these 3 files:
   - `index.html`
   - `styles.css`
   - `script.js`
4. In the "Commit changes" box, type: `Initial website upload`
5. Click **Commit changes**

### Option B: Using Git Command Line

```bash
# Open terminal in the empire24records-website folder
cd C:\Users\SANTOS\Desktop\empire24records-website

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial website upload"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/empire24records.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** tab
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your site will be available at:
   ```
   https://YOUR_USERNAME.github.io/empire24records
   ```

---

## Step 5: Connect Your Custom Domain

### 5.1: Add Domain in GitHub Pages Settings

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain:
   - For `www.empire24records.com`: enter `www.empire24records.com`
   - For `empire24records.com`: enter `empire24records.com`
3. Click **Save**
4. ✅ Check **Enforce HTTPS** (wait a few minutes for SSL certificate)

### 5.2: Configure DNS Settings

Go to your **domain registrar** (where you bought your domain) and update DNS records:

#### For `www.empire24records.com` (Recommended):

Add a **CNAME record**:
| Type | Host/Name | Value |
|------|-----------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

#### For root domain `empire24records.com`:

Add **A records** (4 records):
| Type | Host/Name | Value |
|------|-----------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

#### Recommended: Add both

For best results, configure **both**:
- A records for root domain
- CNAME for www subdomain

Then in your repository, create a file named `CNAME` (no extension) with content:
```
www.empire24records.com
```

### 5.3: Common Domain Registrars

#### GoDaddy:
1. Go to **My Products** → **DNS**
2. Add the records above
3. Wait up to 48 hours (usually 1-2 hours)

#### Namecheap:
1. Go to **Domain List** → **Manage** → **Advanced DNS**
2. Add the records above
3. Wait for propagation

#### Cloudflare:
1. Go to your domain → **DNS**
2. Add the records above
3. Set proxy status to **DNS only** (not proxied)

#### Aruba.it:
1. Go to **Pannello di controllo** → **DNS**
2. Add the records above
3. Wait for propagation

---

## Step 6: Set Up Contact Form Emails (Formspree)

Your contact form needs Formspree to actually send emails to you.

### 6.1: Create Formspree Account

1. Go to https://formspree.io/register
2. Sign up with your email (e.g., `empire24records@gmail.com`)
3. Verify your email address

### 6.2: Create a Form

1. Click **New Form**
2. Name it: `Empire24Records Contact`
3. Set **Send emails to**: your email address
4. Click **Create Form**

### 6.3: Get Your Form Endpoint

After creating the form, you'll see:
- Form endpoint: `https://formspree.io/f/xxxxxxxx`
- Copy the form ID (the part after `/f/`)

### 6.4: Update Your Website

1. Open `index.html` in a text editor
2. Find this line (around line 430):
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/abc12345" method="POST">
   ```
4. Save the file
5. Upload the updated `index.html` to GitHub (same as Step 3)

### 6.5: Test the Form

1. Visit your website
2. Fill out the contact form
3. Click "Invia Messaggio"
4. Check your email - you should receive the submission!

---

## Step 7: Verify Everything Works

### Checklist:

- [ ] Website loads at `https://YOUR_USERNAME.github.io/empire24records`
- [ ] Website loads at your custom domain (e.g., `www.empire24records.com`)
- [ ] HTTPS is working (padlock icon in browser)
- [ ] Contact form sends emails to you
- [ ] All sections work (Home, Chi Siamo, Beats, Artisti, Servizi, Contatti)
- [ ] Mobile responsive (test on phone)

---

## 🔧 Troubleshooting

### Website not loading on GitHub Pages

1. Wait 2-5 minutes after uploading files
2. Check that files are in the repository root (not in a subfolder)
3. Go to Settings → Pages and verify source is set correctly

### Custom domain not working

1. DNS changes can take up to 48 hours (usually 1-4 hours)
2. Check DNS propagation: https://dnschecker.org
3. Make sure you added the correct DNS records
4. Try clearing browser cache or using incognito mode

### HTTPS not working on custom domain

1. In GitHub Pages settings, check **Enforce HTTPS**
2. Wait up to 24 hours for SSL certificate
3. Make sure your CNAME file exists in the repository

### Contact form not sending emails

1. Verify Formspree form ID is correct in `index.html`
2. Check that your Formspree account is verified
3. Check spam folder for form submissions
4. Test with a simple message first

### Formspree free tier limits

- 50 submissions per month (free)
- Upgrade to paid for more submissions
- You'll get an email notification when approaching limit

---

## 📊 Optional: Add Analytics

To track visitors, add Google Analytics:

1. Go to https://analytics.google.com
2. Create a property for your website
3. Get your tracking ID (e.g., `G-XXXXXXXXXX`)
4. Add this to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
5. Replace `G-XXXXXXXXXX` with your actual ID

---

## 🔄 Updating Your Website

To make changes:

1. Edit the files locally (`index.html`, `styles.css`, or `script.js`)
2. Upload the changed files to GitHub:
   - Go to your repository
   - Click the file name
   - Click the edit (pencil) icon
   - Make changes → Commit changes
3. Changes go live in 1-2 minutes

---

## 📱 Social Media Links

Update the social media links in `index.html` with your actual URLs:

- Instagram: `https://www.instagram.com/empire24records`
- Instagram (Santos): `https://www.instagram.com/santosgotthekey`
- YouTube, Spotify, SoundCloud: Add your links

---

## 🎵 Future: Adding Audio to Beats

To add actual audio playback:

1. Upload your beat MP3 files to the repository
2. Update `script.js` to use the HTML5 Audio API
3. Or integrate with BeatStars/Airbit for a professional beat store

---

## 📞 Support

If you need help:
- GitHub Pages docs: https://pages.github.com
- Formspree docs: https://help.formspree.io
- Custom domains: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

---

**Built for Empire24Records** 🎵  
*Independent Sound. Empire Mindset.*