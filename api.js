export async function getMultipleQuestions(url, count = 10) {
    let questions = [];

    for (let i = 0; i < count; i++) {
        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const formattedData = Array.isArray(data) ? data : [data];

        questions.push(...formattedData);
    }

    return questions;
}
