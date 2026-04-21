export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('Error: No code provided');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    const provider = 'github';

    // Decap CMS expects a specific message format
    const content = `
      <!DOCTYPE html>
      <html>
      <head><title>Authorizing...</title></head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("Receive message:", e);
              if (e.data === "authorizing:github") {
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({ token, provider })}',
                  e.origin
                );
              }
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })()
        </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}
