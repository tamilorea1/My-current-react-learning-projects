/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({origin: true});

exports.getCisaThreats = onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      // Only allow GET requests
      if (request.method !== 'GET') {
        return response.status(405).json({error: 'Method not allowed'});
      }

      // Fetch data from CISA API
      const fetch = (await import('node-fetch')).default;
      const apiResponse = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json');
      
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      
      const data = await apiResponse.json();
      
      logger.info(`Fetched ${data.vulnerabilities?.length || 0} vulnerabilities`);
      
      return response.status(200).json(data);
      
    } catch (error) {
      logger.error('Error fetching CISA data:', error);
      return response.status(500).json({
        error: 'Failed to fetch threat data',
        message: error.message
      });
    }
  });
});


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// //http request 1
// exports.randomNumber = onRequest((request, response) => {
//   const number = Math.round(Math.random() * 100);
  
//   response.json({
//     number: number,
//     message: "Random number generated successfully"
//   });
// });

// //http request 2

// exports.toYoutube = onRequest((request, response) => {

//     response.redirect('https://www.youtube.com/channel/UCSNkafz8nCRAVW_N72exBPg')
// });

