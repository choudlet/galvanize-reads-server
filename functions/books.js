function formatBookData(bookData) {
    let cleanArray = []
    let bookLocation;
    bookData.forEach((item, index) => {
        let inArray = false;
        for (i = 0; i < cleanArray.length; i++) {
            if (cleanArray[i].book_id === item.book_id) {
                inArray = true;
                bookLocation = i;
            }

        }
        if (!inArray) {
            return cleanArray.push({
                book_id: item.book_id,
                title: item.title,
                genre: item.genre,
                description: item.description,
                cover_url: item.cover_url,
                authors: [{
                    author_id: item.author_id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    biography: item.biography,
                    portrait_url: item.portrait_url
                }]
            });
        } else {
            cleanArray[bookLocation].authors.push({
                author_id: item.author_id,
                first_name: item.first_name,
                last_name: item.last_name,
                biography: item.biography,
                portrait_url: item.portrait_url
            });
        };
    });
  return cleanArray;
}
module.exports = {
    formatBookData
}
