import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Parse the URL to get the path segments
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  
  // Handle GET requests
  if (req.method === 'GET') {
    // If a specific level is requested
    if (pathSegments.length >= 2) {
      const level = pathSegments[1];
      
      // Define topics for each level based on French university curriculum
      const topics = {
        licence1: ['algèbre-linéaire', 'analyse-réelle', 'logique-mathématique', 'arithmétique', 'géométrie-euclidienne'],
        licence2: ['algèbre-bilinéaire', 'équations-différentielles', 'probabilités', 'topologie', 'analyse-complexe'],
        licence3: ['théorie-des-groupes', 'analyse-fonctionnelle', 'statistiques', 'calcul-différentiel', 'géométrie-différentielle'],
        master1: ['théorie-de-galois', 'analyse-harmonique', 'processus-stochastiques', 'géométrie-algébrique', 'théorie-des-nombres'],
        master2: ['théorie-des-représentations', 'analyse-numérique-avancée', 'probabilités-avancées', 'cryptographie', 'théorie-des-systèmes-dynamiques']
      };
      
      // Return topics for the requested level
      return new Response(JSON.stringify(topics), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // If no specific level is requested, return all topics
    return new Response(JSON.stringify({
      licence1: ['algèbre-linéaire', 'analyse-réelle', 'logique-mathématique', 'arithmétique', 'géométrie-euclidienne'],
      licence2: ['algèbre-bilinéaire', 'équations-différentielles', 'probabilités', 'topologie', 'analyse-complexe'],
      licence3: ['théorie-des-groupes', 'analyse-fonctionnelle', 'statistiques', 'calcul-différentiel', 'géométrie-différentielle'],
      master1: ['théorie-de-galois', 'analyse-harmonique', 'processus-stochastiques', 'géométrie-algébrique', 'théorie-des-nombres'],
      master2: ['théorie-des-représentations', 'analyse-numérique-avancée', 'probabilités-avancées', 'cryptographie', 'théorie-des-systèmes-dynamiques']
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

