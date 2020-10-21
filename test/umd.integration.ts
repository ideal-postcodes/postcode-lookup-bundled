declare var IdealPostcodes: any;
const { PostcodeLookup } = IdealPostcodes;
const doc = new DOMParser().parseFromString(
  `
    <html>
      <head></head>
      <body><div id="postcode_lookup"></div></body>
    </html>
  `,
  "text/html"
);

describe("Postcode Lookup", () => {
  it("creates postcode lookup tools", (done) => {
    PostcodeLookup.setup({
      scope: doc,
      context: "#postcode_lookup",
      apiKey: "iddqd",
      onLoaded: () => {
        const result = doc.querySelector(".idpc-input");
        if (result === null) return done(Error("Postcode lookup not found"));
        done();
      },
    });
  });
});
