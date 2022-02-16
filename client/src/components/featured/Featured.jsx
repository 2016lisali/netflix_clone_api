import { InfoOutlined, PlayArrow } from "@mui/icons-material"
import "./featured.scss"
const Featured = ({ type }) => {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img width="100%" src="https://cdn.pixabay.com/photo/2020/05/07/22/08/lotus-5143420_1280.jpg" alt="" />
      <div className="info">
        <img src="https://cdn.pixabay.com/photo/2020/02/07/14/22/dream-4827288_1280.jpg" alt="" />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A
          ssumenda rem odit voluptate error dicta, autem explicabo
          sint fugiat eligendi nam. Ea sit voluptates similique numqu
          am incidunt. Perspiciatis nesciunt quae nisi!
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>

    </div>
  )
}
export default Featured