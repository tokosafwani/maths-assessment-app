import type { Context } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const mongoClient = new MongoClient(process.env.MONGODB_URI || '');
const clientPromise = mongoClient.connect();

export default async (req: Request, context: Context) => {
	// Parse the URL to get the path segments
	const url = new URL(req.url);
	const pathSegments = url.pathname.split('.netlify/functions/topics/').filter(Boolean);

	// Handle GET requests
	if (req.method === 'GET') {
		const database = (await clientPromise).db('mdj');
		const collection = database.collection('topics');

		// If a specific level is requested
		if (pathSegments.length >= 2&&!pathSegments[1].startsWith("byname")) {
			const level = pathSegments[1];
			const topics = await collection.find({ level: level }).toArray();

			// Return topics for the requested level
			return new Response(JSON.stringify(topics), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}else if(pathSegments.length >= 2&&pathSegments[1].startsWith("byname")){
      const topic = pathSegments[1].split("/")[1];  
      const topicData = await collection.findOne({ name: topic });
      return new Response(JSON.stringify(topicData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

		// If no specific level is requested, return all topics
		const topics = await collection.find({}).toArray();
		return new Response(JSON.stringify(topics), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	// Handle other HTTP methods
	return new Response('Méthode non autorisée', {
		status: 405,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
