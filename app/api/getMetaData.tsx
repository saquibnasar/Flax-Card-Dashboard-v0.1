const getMetaData = async () => {
  const response = await fetch(
    "https://nextjs.org/docs/pages/building-your-application/routing/api-routes"
  );
  const html = await response.text();
  //   const $ = cheerio.load(html);
  console.log(html);
  return "";
};
export default getMetaData;
