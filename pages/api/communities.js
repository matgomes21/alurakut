import { SiteClient } from 'datocms-client';

export default async function getCommunities(req, res) {
  const { title, imageUrl, creatorSlug } = req.body;

  const TOKEN = process.env.API_FULL_ACCESS_TOKEN;

  if(req.method === 'POST'){
    const client = new SiteClient(TOKEN);
  
    const community = await client.items.create({
      itemType: '1045180',
      title,
      imageUrl,
      creatorSlug,
    });
  
    return res.status(201).json({
      community,
    });
  }

  return res.status(404).json({
    message: 'GET method not implemented.'
  });
}