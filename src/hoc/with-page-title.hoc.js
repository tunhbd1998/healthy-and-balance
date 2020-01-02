import React from "react";
import Helmet from "react-helmet";

export function withPageTitle(ComposedComponent, pageTitle) {
  console.log("with page title");
  function WrappedComponent({ ...props }) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <ComposedComponent {...props} />
      </>
    );
  }

  return WrappedComponent;
}
