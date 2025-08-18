# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended for personal use):
   - **Gmail**: Select "Gmail" and connect your Gmail account
   - **Outlook**: Select "Outlook" if you prefer Microsoft email
   - **Other**: You can also use other providers like Yahoo, etc.
4. Give your service a name (e.g., "Portfolio Contact")
5. Copy the **Service ID** (you'll need this for the .env file)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message: {{subject}}

**Body:**
```
Hello Jaime,

You have received a new message through your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply to: {{reply_to}}
```

4. Save the template and copy the **Template ID**

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** in the API Keys section
3. Copy this key

## Step 5: Update Environment Variables
Edit the `.env` file in your project root with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email (office.jaimedelacruziii@gmail.com) for the message

## Important Notes:
- EmailJS free plan allows 200 emails per month
- All emails will be sent to: office.jaimedelacruziii@gmail.com
- The form collects: name, email, subject, and message
- Users will see success/error messages after submission
- Make sure to add `.env` to your `.gitignore` to keep your keys secure

## Troubleshooting:
- If emails aren't being received, check your spam folder
- Verify all environment variables are set correctly
- Make sure the EmailJS service is active in your dashboard
- Check the browser console for any error messages
