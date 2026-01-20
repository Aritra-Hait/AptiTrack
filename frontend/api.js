export async function getMultipleQuestions(topic, count = 10) {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/api/questions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, count })
    });

    if (!response.ok) {
        throw new Error("Failed to fetch questions");
    }

    return await response.json();
}
