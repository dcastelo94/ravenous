const apiKey = "omIqScTAVBOt_aoEM_WHhEHychv14rXFzFY7eYmvQ_CSnlxU_62DhEjaFPN1jYvUnmXgMXS9B3zgAVlxeszsL80S9uCTZG-C9kRB2alZu8f9JMqCDHTED8OurGZzX3Yx";

const Yelp = {
    search(term, location, sortBy) {
        if (!location) {
            location = "worldwide";
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
        { headers: { Authorization: `Bearer ${apiKey}` } }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }));
            }
        });
    }
};

export default Yelp;