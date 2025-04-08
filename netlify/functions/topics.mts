import type { Context } from "@netlify/functions";

import { MongoClient } from "mongodb";
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

export default async (req: Request, context: Context) => {
  // Parse the URL to get the path segments
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  // Handle GET requests
  if (req.method === 'GET') { 
    const database = (await clientPromise).db("mdj");
      const collection = database.collection("topics");
    // If a specific level is requested
    if (pathSegments.length >= 2) {
      const level = pathSegments[1];
      
      
     
      const topics = await collection.find({ level: level }).toArray();
      // Return topics for the requested level
      return new Response(JSON.stringify(topics), {
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

