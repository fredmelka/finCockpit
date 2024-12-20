### _finCockpit_

[![Netlify Status](https://api.netlify.com/api/v1/badges/7f0fe99c-2900-4c49-953a-1f01afaa6fb7/deploy-status)](https://app.netlify.com/sites/fincockpit/deploys)

This project is about shooting a client-side application rehearsing React framework.

**Purpose**

**Technology Stack**
 
front | fetching | server | database | UI
:-:|:-:|:-:|:-:|:-:
React | Axios | Express | Mongo | Ant Design

**Financial data**

All access through free plans.
Watch for endpoints updates and call limits.

[AlphaVantage](https://www.alphavantage.co/) | [Finhubb](https://finnhub.io/) | [FMP](https://site.financialmodelingprep.com/)
:-:|:-:|:-:
<img src='https://www.alphavantage.co/logo.png/' width='50' /> | <img src='https://finnhub.io/static/img/webp/finnhub-logo.webp' width='50' /> | <img src='https://intelligence.financialmodelingprep.com//images/fmp-brain-original.svg' width='50' />

**Log changes** (release v2.0.1)

- Bug fixed after sudden interaction between Antd `Grid` Component (`Row`, `Col`) and CSS `place-items`
- Future flags set for React Router next major release v7. (https://reactrouter.com/upgrading/v6)
- Precision added for live prices
- Code clean-up
- Starify function refactored

**To dos**

- Replace the API
- Implement one single collection database for storage
- Add capture and storage of the spot price along with each stock in watchlist
- Develop one component to monitor stocks performances
- Develop one live intraday graph in Popover window
- Add another hook feature
- Disable _Add-to-watchlist_ button whenever user is not logged