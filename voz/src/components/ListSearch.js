import React from "react";

function ListSearch({ items }) {
  return (
    <div className="card card-body">
      {
        items.source === "google" ?
          items.items.map((item, index) => (
            <div key={index}>
              <a href={item.link} className="h5" rel="noopener noreferrer" target="_blank">
                {item.title}
              </a>
              <p>{item.snippet}</p>
            </div>
          ))
          : (
            <div>
              {
                items.items.map((item, index) => (
                  <div className="row mb-2" key={index}>
                    <div className="col-4">
                      <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className="mw-100 rounded" />
                    </div>
                    <div className="col">
                      <a href={
                        item.id.videoId ? `https://www.youtube.com/watch?v=${item.id.videoId}` : `https://www.youtube.com/channel/${item.id.channelId}`
                      } 
                      className="h5"
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                        {item.snippet.title}
                      </a>
                      {
                        item.id.videoId ?
                          <a className="d-block"
                          href={`https://www.youtube.com/channel/${item.snippet.channelId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          >
                            {item.snippet.channelTitle}
                          </a> : null
                      }
                      <p>{item.snippet.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  );
}

export default ListSearch;