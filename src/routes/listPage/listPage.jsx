// import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  // const data = listData;
  const posts = useLoaderData();

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
         <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={posts.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => postResponse.data.map((post)=>(
                <Card key={post.id} item={post}/>
              ))}
            </Await>
          </Suspense>
        {/* {posts.map(item=>(
          <Card key={item.id} item={item}/>
        ))} */}
      </div>
    </div>
    <div className="mapContainer">
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={posts.postResponse}
          errorElement={<p>Error loading posts!</p>}
        >
          {(postResponse) => <Map items={postResponse.data} />}
        </Await>
      </Suspense>
    </div>
  </div>;
}

export default ListPage;
