import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Parse the URL to get the path segments
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  // Handle different HTTP methods
  if (req.method === 'GET') {
    // If no specific quiz is requested, return all available quizzes
    if (pathSegments.length === 1) {
      const quizzes = {
        licence1: ['algèbre-linéaire', 'calculus', 'logique'],
        licence2: ['algèbre-linéaire', 'équations-différentielles', 'probabilités'],
        licence3: ['analyse-complexe', 'analyse-fonctionnelle', 'statistiques'],
        master1: ['analyse-avancée', 'topologie', 'théorie-des-nombres'],
        master2: ['méthodes-de-recherche', 'cryptographie', 'sujets-spécialisés']
      };
      
      return new Response(JSON.stringify(quizzes), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // If a specific level and topic are requested
    if (pathSegments.length >= 3) {
      const level = pathSegments[1];
      const topic = pathSegments[2];
      
      // Mock quiz data based on the popular-quizzes topics
      let quizData = {
        title: `${topic} Quiz for ${level}`,
        questions: []
      };
      
      // Add appropriate questions based on topic
      if (topic === 'algèbre-linéaire') {
        quizData.questions = [
          {
            id: 1,
            text: "Quelle est la dimension de l'espace vectoriel R³?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2
          },
          {
            id: 2,
            text: "Une matrice carrée est inversible si et seulement si?",
            options: ["Son déterminant est non nul", "Elle est symétrique", "Elle est diagonale", "Sa trace est non nulle"],
            correctAnswer: 0
          }
        ];
      } else if (topic === 'probabilités') {
        quizData.questions = [
          {
            id: 1,
            text: "Quelle est l'espérance d'une variable aléatoire suivant une loi normale N(μ,σ²)?",
            options: ["0", "1", "μ", "σ²"],
            correctAnswer: 2
          },
          {
            id: 2,
            text: "Deux événements A et B sont indépendants si:",
            options: ["P(A∩B) = P(A)P(B)", "P(A∩B) = 0", "P(A|B) = P(A)", "A et B sont disjoints"],
            correctAnswer: 0
          }
        ];
      } else if (topic === 'analyse-fonctionnelle') {
        quizData.questions = [
          {
            id: 1,
            text: "Dans un espace de Hilbert, deux vecteurs sont orthogonaux si:",
            options: ["Leur produit scalaire est nul", "Leur somme est nulle", "Leur norme est égale", "Ils sont colinéaires"],
            correctAnswer: 0
          },
          {
            id: 2,
            text: "Le théorème de représentation de Riesz s'applique à:",
            options: ["Tout espace de Hilbert", "Uniquement les espaces de dimension finie", "Les espaces de Banach", "Les espaces métriques"],
            correctAnswer: 0
          }
        ];
      } else if (topic === 'théorie-des-nombres') {
        quizData.questions = [
          {
            id: 1,
            text: "Deux entiers a et b sont congrus modulo n si:",
            options: ["a - b est divisible par n", "a + b est divisible par n", "a × b est divisible par n", "a / b est un entier"],
            correctAnswer: 0
          },
          {
            id: 2,
            text: "Le petit théorème de Fermat stipule que si p est premier et a n'est pas divisible par p, alors:",
            options: ["a^(p-1) ≡ 1 (mod p)", "a^p ≡ a (mod p)", "a^p ≡ 0 (mod p)", "a^p ≡ 1 (mod p)"],
            correctAnswer: 0
          }
        ];
      } else if (topic === 'cryptographie') {
        quizData.questions = [
          {
            id: 1,
            text: "Dans le système RSA, la clé publique est composée de:",
            options: ["n et e", "p et q", "d et n", "e et d"],
            correctAnswer: 0
          },
          {
            id: 2,
            text: "La sécurité du système RSA repose sur la difficulté de:",
            options: ["Factoriser de grands nombres", "Résoudre des équations différentielles", "Calculer des logarithmes", "Trouver des racines carrées modulaires"],
            correctAnswer: 0
          }
        ];
      } else {
        // Default questions for other topics
        quizData.questions = [
          {
            id: 1,
            text: "Quelle est la dérivée de f(x) = x²?",
            options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
            correctAnswer: 1
          },
          {
            id: 2,
            text: "Résoudre l'équation: 2x + 5 = 15",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 5/2"],
            correctAnswer: 0
          }
        ];
      }
      
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
