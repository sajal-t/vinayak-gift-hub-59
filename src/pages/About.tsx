import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Vinayak Supermarket | Surat Hazira</title>
        <meta name="description" content="Learn about Vinayak Supermarket in Surat Hazira – our mission, values, and commitment to quality and convenience." />
        <link rel="canonical" href="/about" />
      </Helmet>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">About Vinayak Supermarket</h1>
        <p className="text-muted-foreground mb-4">
          Based in Surat Hazira, Vinayak Supermarket has been serving the community with fresh produce, daily essentials, and quality brands. We are committed to delivering convenience and value to every household.
        </p>
        <p className="text-muted-foreground">
          This online store brings our friendly, reliable service to your fingertips. Browse our catalog, place orders at your comfort, and experience fast local fulfillment.
        </p>
      </section>
    </>
  );
};

export default About;
