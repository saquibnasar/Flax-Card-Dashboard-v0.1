import Script from "next/script";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        id="google-analytics"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NLLJXJXQMQ"
      />
      <Script id="google-analytics-script">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NLLJXJXQMQ');
`}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
