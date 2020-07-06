export default function GoogleAnalytics({ GATag }: { GATag: string }): JSX.Element {
  if (!GATag || process.env.NODE_ENV !== 'production') return <></>;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GATag}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${GATag});
            `,
        }}
      />
    </>
  )
}
