import PrivacyPolicyPage from "@/application_pages/privacyPolicyPage/page";

export const metadata = {
  title: "Privacy Policy | Royale Touche Plywood",
  description: `Read Royale Touche Plywood Privacy policy. Know how we collect, use, and safeguard your personal information to ensure transparency and trust.`,
  icons: {
    other: [
     { rel: 'canonical', url: 'https://plywood.royaletouche.com/privacyPolicy' },
    ]
  }
};
const Page = () => {
  return <PrivacyPolicyPage />;
};

export default Page;
