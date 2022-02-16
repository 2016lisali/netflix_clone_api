import './listitem.scss';
import { useEffect, useState } from 'react';
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownAltOutlined } from '@mui/icons-material'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Listitem = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [movie, setMovie] = useState({});

	useEffect(() => {
		const getMovie = async () => {
			try {
				// the item is the movie_id
				const res = await axios.get("/movies/find/" + item, {
					headers: {
						token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGM1M2JmNzk4NjQ1YWQ5ZGEzY2UzMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDk3NjQwMCwiZXhwIjoxNjQ1NDA4NDAwfQ.sZVqmyTNb0NzXT6Bno1lg1rvWhzDMackKo6usEJ8vts`
					}
				})
				setMovie(res.data)
			} catch (error) {
				console.log(error);
			}
		}
		getMovie()
	}, [item]);
	console.log(movie);
	return (
		<Link to={{ pathname: "/watch", movie: "movie" }}>
			<div
				className='listitem'
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>

				<img src={movie.img} alt="" />
				{isHovered &&
					(<>
						<video autoPlay={true} muted loop src={movie.trailer} />
						<div className="itemInfo">
							<div className="icons">
								<PlayArrow className='icon' />
								<Add className='icon' />
								<ThumbUpAltOutlined className='icon' />
								<ThumbDownAltOutlined className='icon' />
							</div>
							<div className="itemInfoTop">
								<span>{movie.duration}</span>
								<span className='limit'>{movie.limit}</span>
								<span>{movie.year}</span>
							</div>
							<div className="desc">
								{movie.desc}
							</div>
							<div className="genre">{movie.genre}</div>
						</div>
					</>
					)}
			</div>
		</Link>

	)
}
export default Listitem