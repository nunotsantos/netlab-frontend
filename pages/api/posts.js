export default async function handler(req, res) {
  try {
    const response = await fetch('http://netlab.ct.ws/wp-json/wp/v2/posts');
    if (!response.ok) {
      throw new Error(`WordPress API error! status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}