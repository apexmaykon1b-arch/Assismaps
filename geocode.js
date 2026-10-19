// Vercel serverless proxy for Nominatim. Respect the provider's usage policy.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const q = String(req.query.q || '').trim();
  if (!q || q.length > 200) return res.status(400).json({ error: 'Parâmetro q obrigatório (máx. 200 caracteres)' });
  try {
    const upstream = await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&accept-language=pt-BR&q=' + encodeURIComponent(q), {
      headers: { 'User-Agent': 'AssisMaps/9.0 (route geocoding; contact: project maintainer)', 'Accept': 'application/json' }
    });
    if (!upstream.ok) return res.status(502).json({ error: 'Geocodificador indisponível', providerStatus: upstream.status });
    return res.status(200).json(await upstream.json());
  } catch (e) { return res.status(502).json({ error: 'Falha no geocodificador' }); }
}
