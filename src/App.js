import React, { Component, useState, useEffect} from "react";

const App = () => {
  // State needed
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  // Method to fetch news
  const fetchNews = () => {
    // Setting loading to true and changing it to false when data is fetched
    setLoading(true)
    fetch(url)
    .then(result => result.json()) 
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  //calling the fetchNews  method
  useEffect( () => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
      setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }

  //organizing the methods from return
  const showLoading = () => (loading ? <h2>loading....</h2> : "");
  const searchForm = () => (
          <form onSubmit={handleSubmit}>
          <input type="text" value={searchQuery} onChange={handleChange} />
          <button>Search</button>
          </form>);
  const showNews = () => ( news.map((n, i) => (
    <p key={i}>{n.title}</p> )))

  
  
 
  return (
    <div>
      <h2>News from Hacker News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  );
};

export default App;
