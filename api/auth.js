export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  // Sənin real domeninlə callback URL-i sabitləyirik
  const redirect_uri = `https://www.haliyikamamerkezi.online/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${redirect_uri}`;
  res.redirect(url);
}
