// server/server.js commented for clarity
// const express = require("express");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom/server");
// const path = require("path");
// const fs = require("fs");
// const compression = require("compression");
// const fetch = require("node-fetch");
// const App = require("../src/App").default;

// const app = express();
// const PORT = process.env.PORT || 3001;

// Enable gzip compression commented for clarity
// app.use(compression());

// Serve static assets from build folder commented for clarity
// app.use(express.static(path.resolve(__dirname, "../build"), { 
//   maxAge: "1y",
//   index: false
// }));

// Serve public folder assets commented for clarity
// app.use(express.static(path.resolve(__dirname, "../public"), { 
//   maxAge: "1y",
//   index: false
// }));

// Fetch initial data for SSR commented for clarity
// async function fetchInitialData() {
//   try {
//     const response = await fetch("https://harsh7541.pythonanywhere.com/admin1/homepagedata", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
    
//     if (!response.ok) {
//       console.error(`API responded with status: ${response.status}`);
//       return null;
//     }
    
//     const data = await response.json();
//     console.log("✅ API Data fetched successfully");
//     return data?.status ? data.homePageSettings : null;
//   } catch (err) {
//     console.error("❌ Error fetching initial data:", err.message);
//     return null;
//   }
// }

// Catch-all SSR route commented for clarity
// app.get("*", async (req, res) => {
  // Skip SSR for static files commented for clarity
  // const staticFileExtensions = /\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|pdf)$/;
  // if (staticFileExtensions.test(req.path)) {
  //   return res.status(404).send("Not Found");
  // }

  // console.log(`\n📄 SSR Request: ${req.url}`);

  // try {
  //   const context = {};
  //   const initialData = await fetchInitialData();

  //   console.log(`📊 Initial Data: ${initialData ? 'Loaded' : 'NULL'}`);

    // Render React app to string commented for clarity
    // let appString = "";
    // try {
    //   appString = ReactDOMServer.renderToString(
    //     React.createElement(
    //       StaticRouter,
    //       { location: req.url, context: context },
    //       React.createElement(App)
    //     )
    //   );
    //   console.log(`✅ React rendered successfully (${appString.length} chars)`);
    // } catch (renderError) {
    //   console.error("❌ React rendering error:", renderError);
    //   appString = "<div>Loading...</div>";
    // }

    // Handle redirects commented for clarity
    // if (context.url) {
    //   console.log(`↪️  Redirecting to: ${context.url}`);
    //   return res.redirect(301, context.url);
    // }

    // Read the built index.html commented for clarity
    // const indexFile = path.resolve(__dirname, "../build/index.html");
    
    // fs.readFile(indexFile, "utf8", (err, htmlData) => {
    //   if (err) {
    //     console.error("❌ Error reading index.html:", err);
    //     return res.status(500).send("Internal Server Error");
    //   }

      // Inject SSR content and initial data commented for clarity
//       const html = htmlData
//         .replace(
//           '<div id="root"></div>',
//           `<div id="root">${appString}</div>`
//         )
//         .replace(
//           '</body>',
//           `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, "\\u003c")};</script></body>`
//         );

//       console.log("✅ HTML sent to client\n");
//       res.send(html);
//     });
//   } catch (err) {
//     console.error("❌ SSR Error:", err);
//     res.status(500).send("Server Error");
//   }
// });

// Start server commented for clarity
// app.listen(PORT, () => {
//   console.log(`\n🚀 SSR Server running on http://localhost:${PORT}\n`);
// });

// server/server.js
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const { HelmetProvider } = require("react-helmet-async");
const path = require("path");
const fs = require("fs");
const compression = require("compression");
const fetch = require("node-fetch");

const App = require("../src/App").default;

const app = express();
const PORT = process.env.PORT || 3001;

/* -------------------- MIDDLEWARE -------------------- */

// Enable gzip compression
app.use(compression());

// Serve build static assets
app.use(
  express.static(path.resolve(__dirname, "../build"), {
    maxAge: "1y",
    index: false,
  })
);

// Serve public assets
app.use(
  express.static(path.resolve(__dirname, "../public"), {
    maxAge: "1y",
    index: false,
  })
);

/* -------------------- SSR DATA FETCH -------------------- */

async function fetchInitialData() {
  try {
    const response = await fetch(
      "https://harsh7541.pythonanywhere.com/admin1/homepagedata",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error(`❌ API responded with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log("✅ API Data fetched successfully");

    return data?.status ? data.homePageSettings : null;
  } catch (err) {
    console.error("❌ Error fetching initial data:", err.message);
    return null;
  }
}

/* -------------------- SSR ROUTE -------------------- */

app.get("*", async (req, res) => {
  // Skip static files
  const staticFileRegex =
    /\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|pdf)$/;

  if (staticFileRegex.test(req.path)) {
    return res.status(404).send("Not Found");
  }

  console.log(`\n📄 SSR Request: ${req.url}`);

  try {
    const initialData = await fetchInitialData();
    const helmetContext = {};
    const routerContext = {};

    /* ----------- RENDER REACT APP ----------- */
    let appString = "";

    try {
      appString = ReactDOMServer.renderToString(
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            StaticRouter,
            { location: req.url, context: routerContext },
            React.createElement(App)
          )
        )
      );

      console.log(`✅ React rendered (${appString.length} chars)`);
    } catch (renderError) {
      console.error("❌ React render error:", renderError);
      appString = "<div>Loading...</div>";
    }

    // Handle redirects
    if (routerContext.url) {
      console.log(`↪️ Redirecting to: ${routerContext.url}`);
      return res.redirect(301, routerContext.url);
    }

    const { helmet } = helmetContext;

    /* ----------- READ INDEX.HTML ----------- */
    const indexFile = path.resolve(__dirname, "../build/index.html");

    fs.readFile(indexFile, "utf8", (err, htmlData) => {
      if (err) {
        console.error("❌ Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }

      /* ----------- INJECT SSR + SEO ----------- */
      const html = htmlData
        .replace("<html", "<html lang='en'")
        .replace(
          "</head>",
          `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${helmet.script.toString()}
        </head>`
        )
        .replace(
          '<div id="root"></div>',
          `<div id="root">${appString}</div>`
        )
        .replace(
          "</body>",
          `<script>
            window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(
              /</g,
              "\\u003c"
            )}
          </script></body>`
        );

      console.log("✅ HTML sent to client\n");
      res.send(html);
    });
  } catch (err) {
    console.error("❌ SSR Fatal Error:", err);
    res.status(500).send("Server Error");
  }
});

/* -------------------- START SERVER -------------------- */

app.listen(PORT, () => {
  console.log(`\n🚀 SSR Server running at http://localhost:${PORT}\n`);
});
