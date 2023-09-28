const getPicBTN = document.querySelector('button');
const picture = document.querySelector('img');
const url = "https://api.unsplash.com/";

// we require the image URLs returned by the API to be directly 
// used or embedded in your applications (generally referred to 
// as hotlinking https://help.unsplash.com/api-guidelines/guideline-hotlinking-images)
// https://unsplash.com/documentation#dynamically-resizable-images
//  By using our CDN and embedding the photo URLs in your application

// All requests receive the v1 version of the API. We encourage you to specifically 
// request this via the Accept-Version header:
// Accept-Version: v1

// HTTP Verbs
// GET	- Retrieving resources.
// POST	- Creating resources.
// PUT	- Updating resources.
// DELETE  - Deleting resources.

// Error messages
// If an error occurs, whether on the server or client side, 
// the error message(s) will be returned in an errors array.
// { "errors": ["Username is missing", "Password cannot be blank"] }

// We use conventional HTTP response codes to indicate the success or 
// failure of an API request.
// Common Status Codes
// 200 - OK	Everything worked as expected
// 400 - Bad Request	The request was unacceptable, often due to missing a required parameter
// 401 - Unauthorized	Invalid Access Token
// 403 - Forbidden	Missing permissions to perform request
// 404 - Not Found	The requested resource doesn’t exist
// 500, 503	Something went wrong on our end

// Authorization
// akey: kohkTo9ZcV19ZIATEKoz3NcmhVAUERsr5At0ENH2GQk
// Most actions can be performed without requiring authentication from a specific user.
// For example, searching, fetching, or downloading a photo does not require a user to log in
// To authenticate requests in this way, pass your application’s access key via the HTTP Authorization header:
// Authorization: Client-ID YOUR_ACCESS_KEY
//
// You can also pass this value using a client_id query parameter:
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
// Most Unsplash API applications use this form of authentication as it doesn't 
// require users to login or join, and it's generally cacheable by our system, 
// resulting in even faster response times.
//
// If only your access key is sent, attempting to perform non-public actions that require user authorization
// will result in a 401 Unauthorized response.

// If you’re building an API application which requires that responses be customized 
// per user (i.e. have they liked a photo, fetch their private collections, etc.) or 
// requires taking actions on behalf of users, then you’ll need to use the user authentication 
// workflow to create individual user bearer tokens for authentication.
// https://unsplash.com/documentation/user-authentication-workflow

// Pagination
// Requests that return multiple items (a list of photos, for example) will be paginated into pages 
// of 10 items by default, up to a maximum of 30. The optional page and per_page query parameters 
// can be supplied to define which page and the number of items per page to be returned, respectively.
// If page is not supplied, the first page will be returned.
// 
// Additional pagination information is returned in the response headers:
// Per-page and Total
// The X-Per-Page and X-Total headers give the number of elements returned 
// on each page and the total number of elements respectively.
// 
// URL’s for the first, last, next, and previous pages are supplied, if applicable. 
// They are comma-separated and differentiated with a rel attribute.
// For example, after requesting page 3 of the photo list:
// 
// Link: <https://api.unsplash.com/photos?page=1>; rel="first",
// <https://api.unsplash.com/photos?page=2>; rel="prev",
// <https://api.unsplash.com/photos?page=346>; rel="last",
// <https://api.unsplash.com/photos?page=4>; rel="next"


// https://unsplash.com/documentation#rate-limiting
