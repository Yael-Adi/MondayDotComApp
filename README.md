# API Gateway Test Consumers Missing in Production

A dashboard that shows API Gateway consumers that exist in Test environment but are missing in Production environment.

## Features

- 📊 Real-time data from Monday.com board
- 🔄 Auto-refreshes every 5 minutes
- 📱 Responsive design
- 🚀 Hosted on GitHub Pages

## Setup

1. Replace `YOUR_MONDAY_API_KEY_HERE` in `index.html` with your Monday.com API key
2. Update `BOARD_ID` if needed (currently set to 9208832153)
3. Enable GitHub Pages in repository settings

## Usage

The dashboard compares:
- **First Group**: "Consumers - Test" 
- **Third Group**: "Consumers - Prod"

Shows consumers that exist in Test but are missing in Production.

## Live Dashboard

Once deployed, access at: `https://yael-adi.github.io/MondayDotComApp/`

## Technical Details

- Uses Monday.com GraphQL API
- Handles pagination for large datasets
- Client-side JavaScript (no server required)
- Works with any Monday.com board structure