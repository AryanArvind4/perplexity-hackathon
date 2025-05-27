exports.buildPrompt = (movie, location, budget, days, nights) => {
  return `
You are an AI travel planner.

A user is planning a ${days}-day, ${nights}-night trip to **${location}** inspired by the vibe and scenes from the movie **"${movie}"**. Their total budget is **${budget}**.

Your task is to generate a detailed itinerary that includes:

1. **Specific real-world places to visit**
2. **Morning, Afternoon, Evening breakdown**
3. **Estimated cost** of each activity/meal (in local currency)
4. **Source or website reference** for each price (if available)
5. Keep all suggestions within the user's total budget

🔁 Output format (markdown):

### Morning
- **Visit [PLACE]** (~THB 300). Source: [example.com]
- **Breakfast at [Cafe]** (~THB 150). Source: [restaurant.co.th]

Make sure each item includes an estimated price and a real source if possible. You may browse current websites to help.

End the itinerary with a budget breakdown table.
`;
};
