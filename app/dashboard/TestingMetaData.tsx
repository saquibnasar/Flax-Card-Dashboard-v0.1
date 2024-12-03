import cheerio from "cheerio";

export const fetchLinkPreview = async (url: string) => {
  //   const response = await fetch("http://localhost:3000/api/getMetaData");
  //   const html = await response.text();
  //   const $ = cheerio.load(html);
  //   console.log(html);
  //   try {
  //     const title = $("title").text();
  //     const description =
  //       $('meta[name="description"]').attr("content") ||
  //       $('meta[property="og:description"]').attr("content");
  //     const image = $('meta[property="og:image"]').attr("content");
  //     return { title, description, image };
  //   } catch (error) {
  //     console.error("Error fetching metadata:", error);
  //     return null;
  //   }
};

const TestingMetaData = () => {
  return <div>TestingMetaData</div>;
};

export default TestingMetaData;
