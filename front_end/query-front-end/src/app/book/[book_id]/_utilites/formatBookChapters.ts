export default function formatBookChapters(bookChapters: string[]) {
  const formattedBookChapters: string[] = [];

  bookChapters.forEach((chapterName: string, index: number) => {
    formattedBookChapters.push(`Chapter ${index + 1}: ${chapterName}`);
  });

  return formattedBookChapters;
}
