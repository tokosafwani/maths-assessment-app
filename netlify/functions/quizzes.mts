import type { Context } from "@netlify/functions";
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const mongoClient = new MongoClient(process.env.MONGODB_URI || '');
const clientPromise = mongoClient.connect();

export default async (req: Request, context: Context) => {
  // Parse the URL to get the path segments
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('.netlify/functions/quizzes/').filter(Boolean);
  
  const database = (await clientPromise).db('mdj');
      const collection = database.collection('quizzes');

  // Handle different HTTP methods
  if (req.method === 'GET') {
    
    // If no specific quiz is requested, return all available quizzes
    if (pathSegments.length === 1) {
      
      const quizzes = await collection.find({}).toArray();
      return new Response(JSON.stringify(quizzes), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // If a specific level and topic are requested
    if (pathSegments.length >= 2&&pathSegments[1].split("/").length>=2) {
      const level = pathSegments[1].split("/")[0];
      const topic = pathSegments[1].split("/")[1];
      
      // Mock quiz data based on the popular-quizzes topics
      let quizData = {
        title: `${topic} Quiz for ${level}`,
        questions: []
      };
      
      const quiz = await collection.findOne({ level: level, topicCanonical: topic });
       
      quizData.questions = quiz?.questions || [];
      return new Response(JSON.stringify(quizData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  // Handle POST requests (e.g., for submitting quiz answers)
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      
      // Process the submitted answers
      const result = {
        success: true,
        message: "Réponses du quiz reçues",
        score: "70%", // Mock score
        feedback: "Bon travail ! Revoyez la question 2."
      };
      
      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Corps de requête invalide" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  // Handle unsupported methods
  return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Allow': 'GET, POST'
    }
  });
}
