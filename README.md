# API Gateway Test Consumers Missing in Production

A professional dashboard that identifies API Gateway consumers present in Test environment but missing in Production environment, helping ensure deployment consistency.

## Features

- 📊 Real-time data from Monday.com board
- 📱 Responsive design
- ⚡ Fast loading with pagination support
- 🚀 Hosted on GitHub Pages

## Setup

1. **API Configuration**: The Monday.com API key is already configured
2. **Board ID**: Currently set to 9208832153
3. **GitHub Pages**: Enable in repository settings under Pages section

## Usage

The dashboard automatically:
1. Fetches data from Monday.com board
2. Compares first group (Test) vs third group (Production)
3. Displays count of missing consumers, including their names

**Groups Analyzed:**
- **Test Environment**: First group in the board
- **Production Environment**: Third group in the board

## Live Dashboard

Once deployed, access at: `https://yael-adi.github.io/MondayDotComApp/`

## Technical Details

- Uses Monday.com GraphQL API
- Handles pagination for large datasets
- Client-side JavaScript (no server required)
- Works with any Monday.com board structure