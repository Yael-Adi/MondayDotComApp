const axios = require("axios");
 
// === CONFIGURATION ===
const MONDAY_API_KEY = "YOUR_MONDAY_API_KEY_HERE"; // Replace with your Monday.com API key
const BOARD_ID = 9208832153;       // Replace with your board ID

// ====================
(async () => {
  try {
    // Fetch all items with pagination
    let allItems = [];
    let cursor = null;
    let groups = [];
    
    do {
      const query = `
        query {
          boards(ids: [${BOARD_ID}]) {
            items_page(limit: 100${cursor ? `, cursor: "${cursor}"` : ''}) {
              cursor
              items {
                id
                name
                group {
                  id
                  title
                }
              }
            }
            groups {
              id
              title
            }
          }
        }`;

      const res = await axios.post("https://api.monday.com/v2", { query }, {
        headers: { Authorization: MONDAY_API_KEY }
      });

      const board = res.data?.data?.boards?.[0];
      if (!board) {
        console.log("Board not found or API error.", res.data);
        return;
      }

      const pageItems = board.items_page?.items || [];
      allItems = allItems.concat(pageItems);
      cursor = board.items_page?.cursor;
      
      if (groups.length === 0) {
        groups = board.groups || [];
      }
      
    } while (cursor);

    const items = allItems;
 
    if (!groups || groups.length === 0) {
      console.log("No groups found.");
      return;
    }
    
    console.log(`Total items fetched: ${items.length}`);
 
    // --- DEBUG: print items per group using group titles ---
    console.log("=== Items per group ===\n");
    groups.forEach((g, gi) => {
      const itemsInGroup = items.filter(i => i.group?.title === g.title);
      console.log(`Group ${gi + 1}: "${g.title}" (${itemsInGroup.length} items)`);
      itemsInGroup.forEach((i, index) => console.log(`  ${index + 1}. ${i.name}`));
      console.log("\n");
    });
 
    // Get items from first and third groups specifically
    const firstGroupTitle = groups[0].title;
    const thirdGroupTitle = groups[2]?.title;
    
    const firstGroupItems = items.filter(i => i.group?.title === firstGroupTitle);
    const thirdGroupItems = items.filter(i => i.group?.title === thirdGroupTitle);
    const thirdGroupItemNames = thirdGroupItems.map(i => i.name);
 
    const uniqueItems = firstGroupItems.filter(i => !thirdGroupItemNames.includes(i.name));
 
    // Print numbered list of unique items
    console.log(`\nItems in first group ("${firstGroupTitle}") but NOT in third group ("${thirdGroupTitle || 'N/A'}"):\n`);
    uniqueItems.forEach((i, index) => console.log(`${index + 1}. ${i.name}`));
    console.log(`\nTotal unique items: ${uniqueItems.length}`);
    console.log(`First group total: ${firstGroupItems.length}, Third group total: ${thirdGroupItems.length}`);
 
  } catch (err) {
    console.error("Error fetching board data:", err.response?.data || err.message);
  }
})();