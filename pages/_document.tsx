import Document, { Html, Head, Main, NextScript } from 'next/document'
import GoogleAnalytics from '../components/google-analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <GoogleAnalytics GATag="UA-66779618-7" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
