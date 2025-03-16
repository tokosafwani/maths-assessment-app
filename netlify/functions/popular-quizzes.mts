import { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  // Handle GET requests
  if (req.method === 'GET') {
    // Mock data for popular quizzes
    // In a real application, this would come from a database
    const popularQuizzes = [
      {
        id: 1,
        level: 'licence1',
        topic: 'algèbre-linéaire',
        title: 'Espaces vectoriels',
        popularity: 95
      },
      {
        id: 2,
        level: 'licence2',
        topic: 'probabilités',
        title: 'Variables aléatoires',
        popularity: 87
      },
      {
        id: 3,
        level: 'licence3',
        topic: 'analyse-fonctionnelle',
        title: 'Espaces de Hilbert',
        popularity: 82
      },
      {
        id: 4,
        level: 'master1',
        topic: 'théorie-des-nombres',
        title: 'Congruences',
        popularity: 78
      },
      {
        id: 5,
        level: 'master2',
        topic: 'cryptographie',
        title: 'Cryptographie à clé publique',
        popularity: 90
      }
    ];

    // Parse the URL to get query parameters
    const url = new URL(req.url);
    const levelFilter = url.searchParams.get('level');
    
    // Filter quizzes by level if specified
    const filteredQuizzes = levelFilter 
      ? popularQuizzes.filter(quiz => quiz.level === levelFilter)
      : popularQuizzes;

    // Return the popular quizzes
    return new Response(JSON.stringify({
      quizzes: filteredQuizzes
    }), {
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
