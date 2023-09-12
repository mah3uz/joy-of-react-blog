import RSS from "rss";
import {BLOG_DESCRIPTION, BLOG_TITLE} from "@/constants";
import {getBlogPostList} from "@/helpers/file-helpers";

export async function GET() {
  const siteUrl = process.env.SITE_URL;

  /* let's create a rss feed */
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/icon.png`,
    author: 'Mahfuz Shaikh',
    copyright: `&copy; ️${new Date().getFullYear()} Mahfuz Shaikh`,
    language: 'en',
    categories: ['Technology', 'Programming', 'Software Development'],
    pubDate: new Date().toUTCString(),
    ttl: '60',
  });

  const posts = await getBlogPostList();

  /* loop over data and add to feed */
  posts.map(({slug, title, abstract, publishedOn}) => {
    feed.item({
      title:  title,
      description: abstract,
      url: `${siteUrl}/${slug}`, // link to the item
      categories: ['Technology', 'Programming', 'Software Development'],
      author: 'Mahfuz Shaikh', // optional - defaults to feed author property
      date: publishedOn, // any format that js Date can parse.
    });
  })

  // cache the xml to send to clients
  const xml = feed.xml({indent: true});

  return new Response(xml, {
      headers: { 'Content-Type': 'application/rss+xml'
    }
  })
}
