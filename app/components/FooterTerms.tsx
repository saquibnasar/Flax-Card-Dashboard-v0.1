import React from "react";

const FooterTerms = () => {
  return (
    <div className="p-10 md:px-40 md:py-20 space-y-12">
      <div>
        <h1 className="text-3xl md:text-5xl">Terms of Service</h1>
        <p className="text-md md:text-lg">Last updated on 24 November 2023</p>
      </div>
      <p>
        Thank you for choosing Flax for your digital card needs. This Privacy
        Policy outlines how we collect, use, disclose, and safeguard your
        personal information. Your privacy is of utmost importance to us, and we
        are committed to protecting the confidentiality and security of your
        data.
      </p>
      <ol className="space-y-8 md:space-y-16">
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <li key={item} className="space-y-4">
            <h1 className="text-2xl md:text-4xl">1. Information We Collect:</h1>
            <p className="text-md md:text-lg">
              Thank you for choosing Flax for your digital card needs. This
              Privacy Policy outlines how we collect, use, disclose, and
              safeguard your personal information. Your privacy is of utmost
              importance to us, and we are committed to protecting the
              confidentiality and security of your data.
            </p>
          </li>
        ))}
      </ol>

      <div>
        <h1 className="text-4xl md:text-6xl">Contact Us</h1>
        <p className="text-md md:text-lg">
          If you have any questions or comments about this privacy policy
        </p>
      </div>
      <div className="text-md md:text-lg">
        <p className="text-tSecondary">Email Us</p>
        <p>hi@flaxcard.com</p>
      </div>
    </div>
  );
};

export default FooterTerms;
