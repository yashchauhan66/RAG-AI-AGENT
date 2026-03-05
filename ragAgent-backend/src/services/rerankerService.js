function similarity(str1, str2) {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));
    const overlap = [...words1].filter(word => words2.has(word)).length;
    return overlap / Math.max(words1.size, words2.size, 1);
}

export function rerankDocuments(question, docs) {

    return docs
        .map(doc => {
            const textScore = similarity(question, doc.text);
            const finalScore = (doc.score || 0) + textScore;
            return { ...doc, score: finalScore };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

}