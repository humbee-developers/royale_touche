
import Blogs from "@/application_pages/blogPage/page";

export const metadata = {
  title: "Blogs on Plywood & Blockboard | Royale Touche Plywood",
  description: `Know everything about plywood & blockboard with Royale Touche Plywood Blog. Get expert tips, industry insights, and creative inspiration for your next project like .`,
  icons: {
    other: [
     { rel: 'canonical', url: 'https://plywood.royaletouche.com/blogs/' },
    ]
  }
};
const Page = () => {
  return <Blogs />;
};

export default Page;
