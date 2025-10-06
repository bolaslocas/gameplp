export default function Home() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/geewa.html" />
        <title>Redirecting to Pool Live Plus...</title>
      </head>
      <body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontFamily: "system-ui, sans-serif",
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Loading Pool Live Plus...</h1>
            <p>
              If you are not redirected automatically,{" "}
              <a href="/geewa.html" style={{ color: "#4a9eff" }}>
                click here
              </a>
              .
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
